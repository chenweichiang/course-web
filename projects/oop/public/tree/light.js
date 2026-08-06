// 光
//
// 第一原則：全場只有一個光向量。樹幹的明暗帶、草、光柱、最後的色調疊加
// 全部查同一份 LIGHT，否則各元素各自打光，比完全不打光更破壞真實感。
//
// 第二原則：光柱不做即時遮罩。場景本來就是由遠到近畫的，把光柱插進深度序列裡，
// 近景樹冠的不透明剪影自然蓋掉它——遮罩是免費的。
// 螢幕空間 raymarch／occlusion buffer 是 3D 的技法，搬進 2D 分層場景會直接吃光預算。

// Tanner Helland 的黑體色溫分段擬合（資料源自 Mitchell Charity 的實測表，
// 1000–40000K，各段 R²>0.987）。有物理依據，不用手猜 RGB。
function kelvinToRGB(kelvin) {
  const t = kelvin / 100;
  const cl = (v) => Math.max(0, Math.min(255, v));
  const r = t <= 66 ? 255 : 329.698727446 * Math.pow(t - 60, -0.1332047592);
  const g =
    t <= 66
      ? 99.4708025861 * Math.log(t) - 161.1195681661
      : 288.1221695283 * Math.pow(t - 60, -0.0755148492);
  const b =
    t >= 66 ? 255 : t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  return [cl(r), cl(g), cl(b)];
}

const LIGHT = {
  // 指向光源的單位向量（晨光自左上方來）
  x: -0.46,
  y: -0.89,
  sunX: 0.17, // 相對畫面寬
  sunY: 0.03,
  kelvin: 3400, // 晨光／golden hour 落在 3000–3500K
  warm: kelvinToRGB(3400),
  cool: kelvinToRGB(11000), // 天空補光偏冷
};

// 陰影不是單純調暗——Morimoto et al. 2025 用雙光源實測確認是
// 「變暗＋變藍＋去飽和」三件事同時發生（陰影區只受天光照亮）
function shadeColor(r, g, b) {
  const lum = 0.3 * r + 0.59 * g + 0.11 * b;
  const c = LIGHT.cool;
  const f = (v, i) => {
    const d = (v + (lum - v) * 0.4) * 0.55; // 去飽和後變暗
    return d + (c[i] * 0.5 - d) * 0.24; // 往天光色微偏
  };
  return [f(r, 0), f(g, 1), f(b, 2)];
}

function litColor(r, g, b) {
  const w = LIGHT.warm;
  const f = (v, i) => Math.min(255, v * 1.42 + 26 + (w[i] - 235) * 0.14);
  return [f(r, 0), f(g, 1), f(b, 2)];
}

// 深度→色彩／密度的連續 1D 查找表（Firewatch 手法）。
// 這是把 Bruneton/Hillaire 的多維大氣查找表降維——2D 側視裡相機高度與視角都固定，
// 唯一還在變的只有深度。比離散分層平滑，且調一條曲線比調每層透明度直觀。
let depthLUT = null;
function buildDepthLUT(bg) {
  const N = 64;
  const lut = [];
  const c = LIGHT.cool;
  for (let i = 0; i < N; i++) {
    const d = i / (N - 1);
    const mix = 1 - Math.exp(-2.0 * Math.pow(d, 1.25)); // Beer-Lambert
    // 遠處除了褪色還要略偏冷（Rayleigh 讓遠景偏藍）
    const cool = Math.pow(d, 1.4) * 0.28;
    lut.push({
      mix,
      col: [
        bg[0] + (c[0] - bg[0]) * cool,
        bg[1] + (c[1] - bg[1]) * cool,
        bg[2] + (c[2] - bg[2]) * cool,
      ],
    });
  }
  depthLUT = lut;
  return lut;
}
function depthSample(d) {
  if (!depthLUT) return { mix: 0, col: [255, 255, 255] };
  const i = Math.max(0, Math.min(depthLUT.length - 1, Math.round(d * (depthLUT.length - 1))));
  return depthLUT[i];
}

// 紙紋：一次性烤好，每幀只做一次 multiply 疊圖。
// 🔴 逐像素 grain 每幀重算（getImageData/putImageData 全畫布）在 60fps 下必掉幀。
// ⚠️ 強度直接烤進貼圖，不用 p5 的 tint()——tint 內部走 getImageData，
// 在 file:// 下每個檔案是獨立安全來源，會觸發 canvas 汙染錯誤。
let paperTex = null;
let paperTexStrength = -1;
function ensurePaperTexture(strength) {
  if (paperTex && paperTexStrength === strength) return paperTex;
  paperTexStrength = strength;
  const w = 512;
  const g = createGraphics(w, w);
  g.loadPixels();
  for (let y = 0; y < w; y++) {
    for (let x = 0; x < w; x++) {
      // 纖維感：長短不一的方向性噪聲疊上細顆粒
      // 各向同性為主、只帶一點點方向性；振幅要小，否則貼圖接縫會看得出來
      const fiber = noise(x * 0.045, y * 0.055) * 0.5 + noise(x * 0.09, y * 0.02) * 0.5;
      const grain = noise(x * 0.75, y * 0.75);
      const dev = (fiber - 0.5) * 9 + (grain - 0.5) * 7;
      const v = 255 + dev * strength - 2.5 * strength;
      const i = 4 * (y * w + x);
      g.pixels[i] = v;
      g.pixels[i + 1] = v;
      g.pixels[i + 2] = v;
      g.pixels[i + 3] = 255;
    }
  }
  g.updatePixels();
  paperTex = g;
  return g;
}

function drawPaperPass(g, strength) {
  if (strength <= 0) return;
  const tex = ensurePaperTexture(strength);
  const s = 512;
  g.push();
  g.blendMode(MULTIPLY);
  for (let y = 0; y < height; y += s) {
    for (let x = 0; x < width; x += s) g.image(tex, x, y);
  }
  g.pop();
}

// 色調分離：讓漸層不再是數學平滑，而是有「被選過」的色階感。
// 逐像素，只在靜態 buffer 上做——即時模式每幀跑會掉幀。
function posterize(g, steps) {
  if (!steps) return;
  g.loadPixels();
  const px = g.pixels;
  const q = 255 / steps;
  for (let i = 0; i < px.length; i += 4) {
    if (px[i + 3] === 0) continue;
    px[i] = Math.round(px[i] / q) * q;
    px[i + 1] = Math.round(px[i + 1] / q) * q;
    px[i + 2] = Math.round(px[i + 2] / q) * q;
  }
  g.updatePixels();
}

// 陣風包絡：低通濾白噪聲逼近 P(f) ∝ v/(1+f/v)^(5/3)。
// 這個 −5/3 尾與風工程的 Kaimal 譜同族（Kolmogorov 慣性副區的標誌指數），
// 是圖學界從樹木動態反推、與大氣邊界層實測獨立收斂的交叉驗證點。
// 單一 sin 的陣風太規律，聽起來像節拍器。
function gustEnvelope5_3(t) {
  let v = 0;
  let amp = 1;
  let f = 1;
  let norm = 0;
  for (let i = 0; i < 4; i++) {
    v += amp * (noise(t * f * 0.3, 99.7 + i * 17.3) - 0.5);
    norm += amp;
    amp *= 0.561; // 2^(−5/6)：PSD ∝ f^(−5/3) 對應振幅 ∝ f^(−5/6)
    f *= 2;
  }
  return 0.6 + 1.35 * (v / norm);
}

function lightSideOf(perpX, perpY) {
  return perpX * LIGHT.x + perpY * LIGHT.y >= 0 ? 1 : -1;
}

function makeRays(strength) {
  if (strength <= 0) return [];
  const rays = [];
  const n = floor(random(4, 7));
  for (let i = 0; i < n; i++) {
    // 深度落在中段：會被近景樹擋住、又蓋得住遠景，縱深感才對
    const d = random(0.3, 0.62);
    rays.push({
      kind: 'ray',
      d,
      spread: random(0.018, 0.055), // 張角
      offset: random(-0.15, 0.75), // 落點沿畫面寬
      len: random(0.85, 1.3),
      alpha: random(0.03, 0.075) * strength,
      phase: random(1000),
      wob: random(0.004, 0.012),
    });
  }
  return rays;
}

// 一道光柱：自光源發散的梯形，沿長度用指數衰減（Beer-Lambert 的視覺近似），
// 兩側邊緣各自羽化
function drawRay(g, ray, animate) {
  const ctx = g.drawingContext;
  const sx = width * LIGHT.sunX;
  const sy = height * LIGHT.sunY;
  const t = animate ? frameCount * 0.004 : 0;
  // 每道光柱各自的相位，否則整組會同步呼吸成機械感
  const drift = (noise(ray.phase, t) - 0.5) * ray.wob;

  const dirX = ray.offset + drift - LIGHT.sunX;
  const dirY = ray.len;
  const m = Math.hypot(dirX, dirY) || 1;
  const ux = dirX / m;
  const uy = dirY / m;
  const px = -uy;
  const py = ux;
  const L = height * ray.len * 1.25;
  const w0 = width * 0.012;
  const w1 = width * ray.spread * 1.6;

  const ex = sx + ux * L;
  const ey = sy + uy * L;
  const c = LIGHT.warm;

  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  // canvas 的漸層是一維的，長度方向能衰減、寬度方向不能。
  // 疊幾層漸窄的梯形讓中心累積、邊緣單薄，等效於橫向羽化——
  // 單一梯形會留下清楚的三角形硬邊。
  const LAYERS = 5;
  for (let k = 0; k < LAYERS; k++) {
    const f = 1 - k / LAYERS;
    const a = (ray.alpha / LAYERS) * 1.35;
    const grad = ctx.createLinearGradient(sx, sy, ex, ey);
    grad.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},${a})`);
    grad.addColorStop(0.45, `rgba(${c[0]},${c[1]},${c[2]},${a * 0.5})`);
    grad.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`);
    ctx.fillStyle = grad;
    const a0 = w0 * f;
    const a1 = w1 * f;
    ctx.beginPath();
    ctx.moveTo(sx + px * a0, sy + py * a0);
    ctx.lineTo(ex + px * a1, ey + py * a1);
    ctx.lineTo(ex - px * a1, ey - py * a1);
    ctx.lineTo(sx - px * a0, sy - py * a0);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

// 全域色調：整場畫完後疊一層，讓霧、草、樹幹共用同一份色溫與方向資訊。
// 受光側暖、背光側冷——但幅度要小，過頭就變成廉價濾鏡。
function drawLightPass(g, strength) {
  if (strength <= 0) return;
  const ctx = g.drawingContext;
  const sx = width * LIGHT.sunX;
  const sy = height * LIGHT.sunY;

  ctx.save();
  // 冷側：與光源相反的方向壓一點天空色
  const lin = ctx.createLinearGradient(sx, sy, width - sx, height);
  const w = LIGHT.warm;
  const c = LIGHT.cool;
  lin.addColorStop(0, `rgba(${w[0]},${w[1]},${w[2]},${0.07 * strength})`);
  lin.addColorStop(0.55, `rgba(${w[0]},${w[1]},${w[2]},0)`);
  lin.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},${0.08 * strength})`);
  ctx.fillStyle = lin;
  ctx.fillRect(0, 0, width, height);

  // 光源附近的暈光
  const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, height * 0.95);
  glow.addColorStop(0, `rgba(${w[0]},${w[1]},${w[2]},${0.1 * strength})`);
  glow.addColorStop(0.4, `rgba(${w[0]},${w[1]},${w[2]},${0.03 * strength})`);
  glow.addColorStop(1, `rgba(${w[0]},${w[1]},${w[2]},0)`);
  ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}
