// 渲染層
//
// 兩條路徑：
//   fast — 每幀重畫、有風動。粗枝畫左右不對稱的漸細多邊形＋明暗帶，細枝退化成線段
//   ink  — 靜態高品質，毛邊＋筆毛條紋＋墨積，畫進 buffer 只算一次
//
// 枝幹寬度一律取自節點的 rA / rB（左右各自的輪廓半徑），不是單一 radius——
// 左右對稱地縮放同一個半徑，畫出來永遠是平滑的紡錘體。

const THICK = 1.1; // 低於此半徑的枝條用線段畫，視覺等價但便宜得多

function renderTree(g, sk, P, ink) {
  computePerps(sk);
  drawRoots(g, sk, P); // 畫在樹幹之前，樹幹本體蓋住根的內端＝自然的接合
  // 由後往前，一層一層畫。每一層都要跑完「枝幹 → 花葉」一整條管線再進下一層——
  // 一階段一階段掃全樹的話，後面那層的輪廓線會蓋在前面那層的填色上
  const buckets = sk.depthBuckets || [sk.nodes];
  for (const bucket of buckets) {
    if (ink) drawBranchesInk(g, sk, P, bucket);
    else drawBranchesFast(g, sk, P, bucket);
    drawLeaves(g, sk, P, ink, bucket);
  }
  if (!ink && P.showTargets && P.entry !== undefined && P.entry < 1) {
    drawEntryTargets(g, sk, P);
  }
  drawCanopyAO(g, sk, P);
  cutGround(g, sk, P);
  // 陰影躺在地面上，要畫在裁切之後——畫在之前會被地面線切掉下半部，
  // 留下一條硬邊，看起來像基部插了一片深色楔子。
  // 蓋到樹幹底端的那一點正好就是接觸處的環境遮蔽。
  drawGround(g, sk, P);
  drawLitter(g, sk, P); // 碎屑跨在地面線上打斷它
}

// 表面根：鰭狀，近幹端寬厚、遠端窄薄沒入地面。
// 鰭要有自己的上下緣（厚度），若下緣一路填回樹幹中心，幾條根會疊成一塊實心三角裙。
function drawRoots(g, sk, P) {
  if (!sk.roots) return;
  const [r, gr, b] = P.bark;
  g.noStroke();
  const N = 10;
  for (const rt of sk.roots) {
    const top = [];
    const bot = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const x = rt.dir * rt.len * Math.pow(t, 0.7);
      const wob = (noise(t * 2.6 + rt.seed, 3.1) - 0.5) * rt.w * 0.5;
      const yTop = -rt.rise * Math.pow(1 - t, 1.6) + wob;
      const th = rt.w * Math.pow(1 - t, 0.55) + rt.w * 0.15;
      top.push([x, yTop]);
      bot.push([x, yTop + th]);
    }
    g.fill(r * 0.92, gr * 0.92, b * 0.94);
    g.beginShape();
    for (const [x, y] of top) g.vertex(sk.root.x + x, sk.root.y + y);
    for (let i = N; i >= 0; i--) g.vertex(sk.root.x + bot[i][0], sk.root.y + bot[i][1]);
    g.endShape(CLOSE);
    // 根之間的凹槽：沿上緣壓一條暗邊，避免相鄰的根糊成一片
    g.noFill();
    g.stroke(r * 0.62, gr * 0.62, b * 0.66, 120);
    g.strokeWeight(Math.max(0.4, rt.w * 0.16));
    g.beginShape();
    for (const [x, y] of top) g.vertex(sk.root.x + x, sk.root.y + y);
    g.endShape();
    g.noStroke();
  }
}

// 樹冠遮蔽。天花板做法（Hegeman 2006）不是逐葉光追，而是用幾層球殼／橢球
// 近似整個樹冠的體積遮蔽——「用少數全域參數代表大量幾何的光學效果」。
// 2D 上就是幾個橢圓疊半透明暗色，幾乎免費。
function drawCanopyAO(g, sk, P) {
  if ((!P.leaf && !P.flower) || !P.canopyAO || !sk.tips.length) return;
  let minX = 1e9;
  let maxX = -1e9;
  let minY = 1e9;
  let maxY = -1e9;
  for (const t of sk.tips) {
    minX = Math.min(minX, t.x);
    maxX = Math.max(maxX, t.x);
    minY = Math.min(minY, t.y);
    maxY = Math.max(maxY, t.y);
  }
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const rx = Math.max(1, (maxX - minX) / 2);
  const ry = Math.max(1, (maxY - minY) / 2);
  const ctx = g.drawingContext;
  // 遮蔽色要跟樹冠實際上是什麼顏色一致：盛花期的樹冠是粉的，用葉綠去暗它會發灰
  const bl = P.flower ? (P.bloom === undefined ? 1 : P.bloom) : 0;
  const cc = [0, 1, 2].map((i) => {
    const lv = P.leaf ? P.leaf.color[i] : P.flower.color[i];
    const fv = P.flower ? P.flower.color[i] : lv;
    return lv + (fv - lv) * bl;
  });
  const [r, gg, b] = shadeColor(cc[0], cc[1], cc[2]);
  // 遮蔽中心偏向背光側與下方（光從上方進不去的地方最暗）
  const ox = cx + LIGHT.x * rx * 0.3;
  const oy = cy - LIGHT.y * ry * 0.28;
  const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, Math.max(rx, ry));
  grad.addColorStop(0, `rgba(${r | 0},${gg | 0},${b | 0},${0.3 * P.canopyAO})`);
  grad.addColorStop(0.6, `rgba(${r | 0},${gg | 0},${b | 0},${0.1 * P.canopyAO})`);
  grad.addColorStop(1, `rgba(${r | 0},${gg | 0},${b | 0},0)`);
  ctx.save();
  ctx.translate(ox, oy);
  ctx.scale(1, ry / Math.max(rx, ry) || 1);
  ctx.translate(-ox, -oy);
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(ox, oy, Math.max(rx, ry), 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// 接點圓形會讓樹幹底端凸出成膠囊狀，用背景色把地面線以下切平。
// 交界線帶小幅擾動——razor 般的直線是「死板」的直接來源。
function cutGround(g, sk, P) {
  const R = Math.max(sk.rootRadius * 6, 40);
  const amp = Math.min(sk.rootRadius * 0.3, 12);
  const y0 = sk.root.y;
  g.noStroke();
  g.fill(P.bg[0], P.bg[1], P.bg[2]);
  g.beginShape();
  g.vertex(sk.root.x - 1e5, y0);
  const N = 40;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const x = sk.root.x - R + 2 * R * t;
    g.vertex(x, y0 + Math.abs(noise(t * 13 + 17.3, 9.1) - 0.5) * 2.4 * amp);
  }
  g.vertex(sk.root.x + 1e5, y0);
  g.vertex(sk.root.x + 1e5, y0 + 1e5);
  g.vertex(sk.root.x - 1e5, y0 + 1e5);
  g.endShape(CLOSE);
}

function drawLitter(g, sk, P) {
  if (!sk.litter) return;
  const [r, gr, b] = P.bark;
  g.noStroke();
  for (const p of sk.litter) {
    const k = p.dark ? 0.55 : 0.85;
    g.fill(Math.min(255, r * k), Math.min(255, gr * k), Math.min(255, b * k), p.alpha);
    g.push();
    g.translate(sk.root.x + p.x, sk.root.y + p.y);
    g.rotate(p.rot);
    g.ellipse(0, 0, p.w * 3.2, p.w * 0.8);
    g.pop();
  }
}

// 接地陰影。少了緊貼基部的那一圈，樹會像貼紙貼在平面上——生態學（根周落葉堆積）
// 與繪畫技法（contact shadow 把物體焊進地面）兩條線索都指向同一件事。
// 用樹自己的（已含大氣透視的）樹皮色，遠景的樹影才不會比樹本身還深。
function drawGround(g, sk, P) {
  const r = Math.min(sk.rootRadius, 90);
  const [br, bg, bb] = P.bark;
  const ctx = g.drawingContext;
  // 用徑向漸層，平塗會留下一圈硬邊，讀起來像地上放了一片圓盤而不是陰影
  const shade = (cx, cy, rx, ry, a) => {
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rx);
    grad.addColorStop(0, `rgba(${br | 0},${bg | 0},${bb | 0},${a})`);
    grad.addColorStop(0.55, `rgba(${br | 0},${bg | 0},${bb | 0},${a * 0.45})`);
    grad.addColorStop(1, `rgba(${br | 0},${bg | 0},${bb | 0},0)`);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(1, ry / rx);
    ctx.translate(-cx, -cy);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, rx, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };
  shade(sk.root.x - LIGHT.x * r * 1.6, sk.root.y + r * 0.05, r * 2.8, r * 0.38, 0.11);
  shade(sk.root.x, sk.root.y + r * 0.02, r * 1.25, r * 0.24, 0.34);
}

// 疊層填色：每個色塊由「底層加深 + 主色 + 兩層錯位半透明」疊出。
// 單層精確填色在資料模型上就是向量圖——人眼判讀「顏料堆疊」靠的是層與層邊界的不對齊，
// 不是漸層做得多細。這是脫離向量圖感唯一的結構性改動，其餘特效都疊在它之上。
// 兩層已足以改變資料模型（單層精確填色 → 筆觸堆疊）；第三層邊際效益低於成本
//
// 🔴 錯位層的內縮量必須大於偏移量，否則它會從輪廓的左下緣露出來。
// 露出來的那條半透明色帶就是一道**投影**——枝條看起來像貼在背景上的紙片，
// 在枝條末端整塊突出時更明顯（看起來像斷了一截的鈍角方塊）。
// 偏移 √(0.9²+0.85²) ≈ 1.24，內縮 1.35 才包得住。
const FILL_LAYERS = [
  { dx: 0, dy: 0, a: 255, grow: 0, k: 1 }, // 主色
  { dx: -0.9, dy: 0.85, a: 78, grow: -1.35, k: 0.94 },
];

function drawBranchesFast(g, sk, P, order) {
  const [r, gr, b] = P.bark;
  g.noStroke();
  // 罩色＝背景與樹冠色的中間值（穿過花層散射進來的光）
  const cc = P.flower && P.bloom ? P.flower.color : P.leaf ? P.leaf.color : P.bg;
  const veilR = (P.bg[0] + cc[0]) / 2;
  const veilG = (P.bg[1] + cc[1]) / 2;
  const veilB = (P.bg[2] + cc[2]) / 2;

  // 邊緣加深：填色之下先畫一圈略粗的深色。canvas 沒有原生卷積，
  // 這是水彩 edge darkening 最便宜的近似。
  // 🔴 試過「在前面的枝條往光的反方向投一份暗色」來強化前後，撤掉了：
  // canvas 沒有便宜的模糊，硬邊的偏移暗色就是投影——而「有投影的東西讀成貼紙」
  // 正是這一輪一開始要拆掉的東西。缺模糊的話這條路不通，前後靠色調分離與
  // 接合區的揉合去講。

  for (const n of order) {
    if (!n.parent || n.radius < THICK) continue;
    // 接合區不畫邊緣加深：那條深邊會沿著分枝的輪廓在母枝上切出一刀
    const u = n.union || 0;
    if (u > 0.75) continue;
    g.fill(r * 0.62, gr * 0.62, b * 0.66, 95 * (1 - u));
    bandQuad(g, n.parent, n, -1, 1, 0.75);
  }

  // 底色三層疊加；沿高度做暖冷漸層
  for (const L of FILL_LAYERS) {
    g.push();
    g.translate(L.dx, L.dy);
    for (const n of order) {
      if (!n.parent || n.radius < THICK) continue;
      const warm = 1 - Math.min(1, -n.y / sk.treeHeight);
      // 樹冠深處的枝條要被前面那層花散射的光罩淡一階。少了這一步，
      // 枝幹與樹冠是兩個各自飽和的圖層疊著，不是同一個空間裡的東西
      const vv = n.veil || 0;
      // 前後的色調分離：在前面的略亮、在後面的略暗。少了這一階，一根橫過樹幹的
      // 細枝跟樹幹同一個顏色，就只會讀成樹皮上的一道裂痕而不是「在前面的枝條」
      const dz = 1 + (n.depth || 0) * 0.11;
      g.fill(
        ((r + warm * 9) + (veilR - r) * vv) * L.k * dz,
        ((gr + warm * 5) + (veilG - gr) * vv) * L.k * dz,
        ((b + warm * 1) + (veilB - b) * vv) * L.k * dz,
        L.a
      );
      bandQuad(g, n.parent, n, -1, 1, L.grow);
      if (n.radius > 2 && n.children.length > 1) g.ellipse(n.x, n.y, n.radius * 2, n.radius * 2);
    }
    g.pop();
  }

  // 圓柱明暗：沿橫剖面切成數條，逐條算 Lambert 再疊。
  //
  // 原本是「一條陰影帶 + 一條高光帶」的兩塊硬邊四邊形——邊界銳利，而且側別由
  // 離散的 ±1 決定，枝條轉過臨界角時整塊跳到另一邊。改成沿剖面連續取樣之後：
  //   邊界自己糊掉（相鄰兩條的 alpha 只差一點）
  //   明暗與高光的位置隨枝條方向連續移動（perp·L 進了 Lambert 項）
  //   枝條愈朝著光，明暗對比愈弱；愈側對光，終止線愈明顯——這是圓柱該有的行為
  //
  // t = sinθ 是剖面參數（±1 = 輪廓邊緣，0 = 正中）。法線在畫面內的分量是
  // perp·t，朝向觀者的分量是 √(1−t²)；Lz 是光源朝向觀者的分量，少了它，
  // 正對光的枝條會整根同一個亮度。
  const [sr, sg, sb] = shadeColor(r, gr, b);
  const [hr, hg, hb] = litColor(r, gr, b);
  const gloss = P.gloss || 0;
  const Lz = 0.5;
  for (const n of order) {
    if (!n.parent || n.radius < 2.8) continue; // 再細就只有一兩像素寬，切幾條都一樣
    const pl = n.perpX * LIGHT.x + n.perpY * LIGHT.y;
    // 粗枝才付得起細分；細枝三條就夠（畫出來只有幾像素寬）
    const NB = n.radius > 22 ? 12 : n.radius > 9 ? 8 : n.radius > 4.5 ? 5 : 3;
    // 樹皮的不勻：讓同一根枝條上的明暗沿長度起伏，不是一條等寬的帶子
    // 接合區把明暗收掉：分枝有自己的垂直向量，明暗方向與母枝不同，
    // 在母枝上就是一塊調子不接的色塊。收掉之後分枝基部自然採用母枝的調子
    const mott = (0.82 + 0.36 * noise(n.pathLen * 0.02, n.bseed + 51.3)) * (1 - (n.union || 0) * 0.9);
    for (let k = 0; k < NB; k++) {
      const t0 = -1 + (2 * k) / NB;
      const t1 = -1 + (2 * (k + 1)) / NB;
      const tm = (t0 + t1) / 2;
      const lam = pl * tm + Lz * Math.sqrt(Math.max(0, 1 - tm * tm));
      if (lam < 0.34) {
        const a = (0.34 - lam) * 108 * mott;
        if (a < 3) continue;
        g.fill(sr, sg, sb, a);
        bandQuad(g, n.parent, n, t0, t1);
      } else if (lam > 0.52) {
        // 光澤＝高次方的窄高光。gloss=0 時退回寬而弱的漫反射亮面
        const w = gloss ? Math.pow((lam - 0.52) / 0.48, 1.6) * 132 : (lam - 0.52) * 96;
        const a = w * mott;
        if (a < 3) continue;
        g.fill(hr, hg, hb, a);
        bandQuad(g, n.parent, n, t0, t1);
      }
    }
  }

  if (P.lenticels) {
    drawLenticels(g, sk, P, order);
  } else {
    // 樹皮縱紋（多數樹種）
    g.noFill();
    g.strokeWeight(0.7);
    g.stroke(r * 0.5, gr * 0.5, b * 0.55, 26);
    for (const n of order) {
      if (!n.parent || n.radius < 6) continue;
      for (let i = 0; i < 2; i++) {
        const t = (((n.bseed * 7.13 + i * 2.71) % 1) - 0.5) * 1.5;
        bandLine(g, n.parent, n, t);
      }
    }
  }

  drawContour(g, sk, P, order);

  // 細枝：線段。顏色要跟著朝向走——一律同一個暗色的話，橫過樹幹的細枝會讀成
  // 刮痕而不是「一根在前面的枝條」。粗枝有整套圓柱明暗，細枝至少要有方向感
  g.noFill();
  g.strokeCap(ROUND);
  let last = -1;
  let lastC = -99;
  for (const n of order) {
    if (!n.parent || n.radius >= THICK) continue;
    const w = Math.max(0.35, Math.round(n.radius * 4) / 4);
    if (w !== last) {
      g.strokeWeight(w);
      last = w;
    }
    // 枝條軸向與光的夾角：迎光的細枝偏亮、背光的偏暗
    const ax = n.x - n.parent.x;
    const ay = n.y - n.parent.y;
    const m = Math.hypot(ax, ay) || 1;
    const f = Math.abs((ax / m) * LIGHT.y - (ay / m) * LIGHT.x); // |axis × L| = 有多側對光
    // 併入前後：在樹幹前面的細枝要比樹幹亮一階才不會讀成裂痕
    const q = Math.round((f + (n.depth || 0) * 0.5) * 4) / 4; // 量化，減少 stroke 切換
    if (q !== lastC) {
      const k = 0.86 + 0.42 * q;
      g.stroke(Math.min(255, r * k), Math.min(255, gr * k), Math.min(255, b * k), 232);
      lastC = q;
    }
    g.line(n.parent.x, n.parent.y, n.x, n.y);
  }
}

// 橫向皮目。位置在 skeleton.assignLenticels 就算好了（快路徑每幀重畫，
// 在這裡 random 會逐幀跳動）。
//
// 兩件事讓它從「橫線」變成「皮目」：
//   1. 深線下方壓一條淡線——皮目是隆起的，會接光。日文辨識資料形容成
//      「イボのような横縞」（疣狀橫紋），只有一條深線讀起來像刻痕
//   2. 靠近輪廓邊緣時線變短也變淡——那是曲面繞過去的部分。座標已經在
//      assignLenticels 用 sin(θ) 投影過，這裡再補上淡出
function drawLenticels(g, sk, P, order) {
  const [r, gr, b] = P.bark;
  const [hr, hg, hb] = litColor(r, gr, b);
  g.noFill();
  g.strokeCap(SQUARE);
  for (const n of order) {
    if (!n.lent) continue;
    const f = baseFrame(n.parent, n);
    const w = Math.max(0.45, Math.min(n.radius * 0.11, 1.3));
    // 軸向單位向量（perp 轉 −90°）
    const sx = f.perpY;
    const sy = -f.perpX;
    const uf = 1 - (n.union || 0) * 0.8; // 接合區的皮目會橫跨接縫，很假
    for (const [t0, t1, axOff] of n.lent) {
      // 中點愈靠近輪廓（|t| 大），愈是側面繞過去的部分 → 淡出
      const edge = 1 - Math.pow(Math.abs((t0 + t1) / 2), 2.2);
      const a = 104 * edge * uf;
      if (a < 6) continue;
      const ox = sx * axOff * n.len;
      const oy = sy * axOff * n.len;
      const x0 = n.x + f.perpX * sideOffset(n, t0) + ox;
      const y0 = n.y + f.perpY * sideOffset(n, t0) + oy;
      const x1 = n.x + f.perpX * sideOffset(n, t1) + ox;
      const y1 = n.y + f.perpY * sideOffset(n, t1) + oy;
      // 隆起的受光面：淡線緊貼在深線上方。推太遠會讀成兩道獨立的刻痕
      if (n.radius > 4) {
        g.stroke(hr, hg, hb, a * 0.34);
        g.strokeWeight(w * 0.6);
        g.line(x0 - sx * w * 0.55, y0 - sy * w * 0.55, x1 - sx * w * 0.55, y1 - sy * w * 0.55);
      }
      g.stroke(r * 0.5, gr * 0.44, b * 0.46, a);
      g.strokeWeight(w);
      g.line(x0, y0, x1, y1);
    }
  }
  g.strokeCap(ROUND);
  g.noStroke();
}

// 輪廓線風格化三件套：沿線噪聲調變粗細、法線方向抖動、隨機斷續。
// 程序化生成的圖形不需要邊緣偵測（拓樸已知），功課是風格化這些已知的線。
function drawContour(g, sk, P, order) {
  if (!P.contour) return;
  const [r, gr, b] = P.bark;
  g.noFill();
  g.strokeCap(ROUND);
  g.stroke(r * 0.45, gr * 0.45, b * 0.5, 105);
  for (const n of order) {
    if (!n.parent || n.radius < 3.6) continue;
    if ((n.union || 0) > 0.25) continue; // 接合區沒有輪廓：那裡不是邊，是同一塊木頭
    // 斷續：缺口比例約一成，太多會變虛線而非速寫線
    if (noise(n.pathLen * 0.05, n.bseed + 88.1) > 0.88) continue;
    const w = 0.5 + noise(n.pathLen * 0.03, n.bseed + 12.7) * 1.3;
    g.strokeWeight(w * P.contour);
    for (const side of [1, -1]) {
      const j = (noise(n.pathLen * 0.06, n.bseed + (side > 0 ? 5 : 60)) - 0.5) * 1.6;
      bandLine(g, n.parent, n, side * (1 + j * 0.06));
    }
  }
  g.noStroke();
}

function drawBranchesInk(g, sk, P, order) {
  const [r, gr, b] = P.bark;
  computeInkJitter(sk);
  g.noStroke();

  // 底墨：邊緣逐點擾動（不是整段位移——整段位移只會變成疊影方塊）
  g.fill(r, gr, b, 210);
  for (const n of order) {
    if (!n.parent) continue;
    roughQuad(g, n.parent, n, 1);
    if (n.radius > 1.6 && n.children.length > 1) g.ellipse(n.x, n.y, n.radius * 2, n.radius * 2);
  }

  // 內層濃淡：略微內縮再疊一層，製造墨色不均
  g.fill(r * 0.8, gr * 0.8, b * 0.8, 48);
  for (const n of order) {
    if (!n.parent || random() < 0.25) continue;
    roughQuad(g, n.parent, n, 0.86);
  }

  // 筆毛條紋：沿枝幹內部拉細線，這才是「筆觸」的來源
  g.noFill();
  g.strokeCap(ROUND);
  for (const n of order) {
    if (!n.parent || n.radius < 1.6) continue;
    const strokes = n.radius > 5 ? 3 : 2;
    for (let i = 0; i < strokes; i++) {
      if (random() < 0.3) continue; // 飛白
      const dark = random() < 0.5;
      g.stroke(
        dark ? r * 0.55 : r * 1.25,
        dark ? gr * 0.55 : gr * 1.25,
        dark ? b * 0.55 : b * 1.25,
        random(22, 55)
      );
      g.strokeWeight(random(0.4, 1.1));
      bandLine(g, n.parent, n, random(-0.72, 0.72));
    }
  }

  // 墨積：分岔處墨色略聚，只比枝幹略大一點
  g.noStroke();
  g.fill(r * 0.6, gr * 0.6, b * 0.6, 42);
  for (const n of order) {
    if (n.children.length < 2 || n.radius < 2) continue;
    const s = ((n.rA + n.rB) / 2) * (0.9 + random() * 0.25);
    g.ellipse(n.x, n.y, s * 2, s * 1.8);
  }
}

// --- 幾何工具 ---------------------------------------------------------------
// t ∈ [-1, 1]：+1 = rA 側邊緣，-1 = rB 側邊緣，0 = 中心線

function sideOffset(n, t) {
  return t >= 0 ? n.rA * t : n.rB * t;
}

// 新軸的第一段，起點要用「子枝自己的」半徑。
// 用母枝的半徑會沿著**子枝的**垂直方向撐出去——母枝粗、子枝細，於是在分岔處
// 戳出一塊超出輪廓的三角楔子。底色跟母枝同色所以看不出來，明暗帶一疊上去
// 就顯影成一塊淡色的角。
function sideOffsetAt(p, n, t) {
  return n.order > p.order ? sideOffset(n, t) : sideOffset(p, t);
}

// 每個節點算一條「斜接」垂直向量：進入方向與離開方向的角平分線。
// 若每一段各用自己的方向算垂直向量，同一節點的兩條邊不會對齊，
// 彎曲處會裂出楔形縫隙——半徑愈大（基部外張）縫愈明顯。
// 共用節點邊緣點才是正解，用圓形去補只是把縫蓋住。
function computePerps(sk) {
  for (const n of sk.nodes) {
    let ax;
    let ay;
    if (n.parent) {
      ax = n.x - n.parent.x;
      ay = n.y - n.parent.y;
    } else {
      const c = n.children[0];
      ax = c ? c.x - n.x : 0;
      ay = c ? c.y - n.y : -1;
    }
    let m = Math.hypot(ax, ay) || 1;
    ax /= m;
    ay /= m;

    const kid = n.children.find((c) => c.order <= n.order) || n.children[0];
    let bx = ax;
    let by = ay;
    if (kid) {
      bx = kid.x - n.x;
      by = kid.y - n.y;
      const m2 = Math.hypot(bx, by) || 1;
      bx /= m2;
      by /= m2;
    }

    let sx = ax + bx;
    let sy = ay + by;
    const ms = Math.hypot(sx, sy);
    if (ms < 1e-6) {
      sx = ax;
      sy = ay;
    } else {
      sx /= ms;
      sy /= ms;
    }
    n.perpX = -sy; // 螢幕座標（y 向下）旋轉 +90°
    n.perpY = sx;
  }
}

// 側枝的起點要用側枝自己的垂直向量，否則近乎垂直分出的枝條
// 起始邊會沿著自己的軸向攤平，變成退化的三角形
function baseFrame(p, n) {
  return n.order > p.order ? n : p;
}

// 沿枝幹取一條縱向帶（t0 到 t1），用來畫本體、陰影帶、高光帶
function bandQuad(g, p, n, t0, t1, grow) {
  const f = baseFrame(p, n);
  const e = grow || 0;
  const ep = (t) => sideOffsetAt(p, n, t) + (t >= 0 ? e : -e);
  const op = (nd, t) => sideOffset(nd, t) + (t >= 0 ? e : -e);
  g.beginShape();
  g.vertex(p.x + f.perpX * ep(t1), p.y + f.perpY * ep(t1));
  g.vertex(n.x + n.perpX * op(n, t1), n.y + n.perpY * op(n, t1));
  g.vertex(n.x + n.perpX * op(n, t0), n.y + n.perpY * op(n, t0));
  g.vertex(p.x + f.perpX * ep(t0), p.y + f.perpY * ep(t0));
  g.endShape(CLOSE);
}

// 沿枝幹內部畫一條縱線（樹皮紋理／筆毛條紋）
function bandLine(g, p, n, t) {
  const f = baseFrame(p, n);
  g.line(
    p.x + f.perpX * sideOffsetAt(p, n, t),
    p.y + f.perpY * sideOffsetAt(p, n, t),
    n.x + n.perpX * sideOffset(n, t),
    n.y + n.perpY * sideOffset(n, t)
  );
}

// 毛邊擾動存在節點上，相鄰兩段才會共用同一個擾動後的頂點。
// 若在每個四邊形裡各自 random，段與段之間會裂開成一條條白縫（條碼狀）。
function computeInkJitter(sk) {
  for (const n of sk.nodes) {
    const jA = Math.min(0.16 * n.rA, 1.5) + 0.25;
    const jB = Math.min(0.16 * n.rB, 1.5) + 0.25;
    n.jax = random(-jA, jA);
    n.jay = random(-jA, jA);
    n.jbx = random(-jB, jB);
    n.jby = random(-jB, jB);
  }
}

// scale 調整粗細（<1 表示內縮再疊一層，製造墨色不均）
function roughQuad(g, p, n, scale) {
  const f = baseFrame(p, n);
  const pa = Math.max(0.25, p.rA * scale);
  const pb = Math.max(0.25, p.rB * scale);
  const na = Math.max(0.2, n.rA * scale);
  const nb = Math.max(0.2, n.rB * scale);
  g.beginShape();
  g.vertex(p.x + f.perpX * pa + p.jax, p.y + f.perpY * pa + p.jay);
  g.vertex(n.x + n.perpX * na + n.jax, n.y + n.perpY * na + n.jay);
  g.vertex(n.x - n.perpX * nb + n.jbx, n.y - n.perpY * nb + n.jby);
  g.vertex(p.x - f.perpX * pb + p.jbx, p.y - f.perpY * pb + p.jby);
  g.endShape(CLOSE);
}

function drawLeaves(g, sk, P, ink, nodes) {
  if (!P.leaf && !P.flower) return;
  if (P.cluster && P.flower) {
    drawClusters(g, sk, P, ink, nodes);
    return;
  }
  const [lr, lg, lb] = P.leaf.color;

  if (P.leaf.shape === 'needle') {
    g.noFill();
    g.strokeCap(ROUND);
    for (const tip of nodes) {
      if (!tip.leaves) continue;
      const c = Math.cos(tip.dir);
      const s = Math.sin(tip.dir);
      for (const lf of tip.leaves) {
        const x = tip.x + c * lf.d - s * lf.off;
        const y = tip.y + s * lf.d + c * lf.off;
        if (ink) g.stroke(lr + lf.shade, lg + lf.shade, lb + lf.shade, lf.alpha);
        else g.stroke(lr, lg, lb, P.leaf.alpha);
        g.strokeWeight(ink ? 1.1 : 1);
        for (let k = -1; k <= 1; k++) {
          const a = lf.rot + k * 0.28;
          g.line(x, y, x + Math.cos(a) * lf.w, y + Math.sin(a) * lf.w);
        }
      }
    }
    return;
  }

  g.noStroke();
  for (const tip of nodes) {
    if (!tip.leaves) continue;
    const c = Math.cos(tip.dir);
    const s = Math.sin(tip.dir);
    for (const lf of tip.leaves) {
      const x = tip.x + c * lf.d - s * lf.off;
      const y = tip.y + s * lf.d + c * lf.off;
      const lc = lf.col || [lr, lg, lb];
      g.fill(lc[0], lc[1], lc[2], ink ? lf.alpha : P.leaf.alpha);
      if (ink) {
        g.push();
        g.translate(x, y);
        g.rotate(lf.rot);
        g.ellipse(0, 0, lf.w, lf.w * 0.62);
        g.pop();
      } else if (P.leaf.shapePts && lf.w > 4.5) {
        // 近景用 Gielis 葉形；遠景太小看不出形狀，維持橢圓比較便宜
        g.push();
        g.translate(x, y);
        g.rotate(lf.rot);
        g.beginShape();
        for (const p of P.leaf.shapePts) g.vertex(p[0] * lf.w * 0.62, p[1] * lf.w * 0.62);
        g.endShape(CLOSE);
        g.pop();
      } else {
        g.ellipse(x, y, lf.w, lf.w * 0.8);
      }
    }
  }
}

// 花序模式：長花柄 + 柄端成簇。畫的順序＝柄、葉、花，花蓋住柄端就是自然的著生點
// 入場進度 → 單一元素的位移／旋轉／不透明度。
// ent = 0..1 全域進度，lf.fd 是這一片的先後，回傳 e = 0(還在畫面外) .. 1(就位)
function entryEase(ent, fd) {
  // 兩個窗口要一起調：fd 那一段決定「一片一片陸續到」，除數那一段決定
  // 「單獨一片飛多久」。只拉長總時長而不拉長單片的飛行窗口，每一片還是咻一下
  const t = Math.min(1, Math.max(0, (ent - fd * 0.42) / 0.58));
  return 1 - Math.pow(1 - t, 2.2); // 收得比 cubic 緩，少一點「煞車」感
}

// 入場期間，在每個「等著接花」的落點上標記號與座標。
//
// 落點有四千多個，四千個座標一起畫會疊成一團糊，而且文字是很貴的圖元。
// 所以：記號每個都畫（兩條線，便宜），座標一個網格只放一個——
// 密的地方自然只留下代表點，疏的地方每個都標得到。
// 座標用樹的局部座標系（根在原點、向上為負），不是螢幕座標——
// 螢幕座標會隨取景改變，標了也沒有意義。
function drawEntryTargets(g, sk, P) {
  const ent = P.entry;
  const lod = P.lodScale || 1;
  const cell = 46 / lod; // 網格邊長換算成樹的座標
  const used = new Set();
  const m = 2.2 / lod;
  // 標籤往樹冠外側拉開，用引線指回落點——壓在枝條上的字讀不到，
  // 而且會跟樹皮的明暗糊在一起
  const C = sk.canopy || { cx: 0, cy: 0 };
  g.push();
  g.textFont('monospace');
  g.textSize(7 / lod);
  for (const n of sk.nodes) {
    if (!n.clusters) continue;
    const c = Math.cos(n.dir);
    const s2 = Math.sin(n.dir);
    for (const cl of n.clusters) {
      const bx = n.x + c * cl.d - s2 * cl.off;
      const by = n.y + s2 * cl.d + c * cl.off;
      for (const lf of cl.items) {
        const e = entryEase(ent, lf.fd);
        if (e >= 0.999) continue; // 已經就位的不用再標
        const ox = lf.atBase ? bx : bx + cl.pdx;
        const oy = lf.atBase ? by : by + cl.pdy;
        const x = ox + lf.dx;
        const y = oy + lf.dy;
        const a = (1 - e) * (1 - e) * 210; // 花愈接近就愈淡，接上的瞬間剛好消失
        if (a < 6) continue;
        g.stroke(96, 84, 76, a);
        g.strokeWeight(0.7 / lod);
        g.line(x - m, y, x + m, y);
        g.line(x, y - m, x, y + m);
        const key = Math.floor(x / cell) + ',' + Math.floor(y / cell);
        if (used.has(key)) continue;
        used.add(key);
        // 往樹冠中心的反方向拉。拉的距離每個點不同（用座標當雜湊）——
        // 一律等距的話標籤會排成一圈同心圓，反而更容易互相疊住
        let ux = x - C.cx;
        let uy = y - C.cy;
        const um = Math.hypot(ux, uy) || 1;
        ux /= um;
        uy /= um;
        const ext = (46 + (Math.abs(x * 7.3 + y * 13.1) % 62)) / lod;
        const lx = x + ux * ext;
        const ly = y + uy * ext;
        g.stroke(96, 84, 76, a * 0.5);
        g.strokeWeight(0.45 / lod);
        g.line(x + ux * m * 2, y + uy * m * 2, lx - ux * (3 / lod), ly - uy * (3 / lod));
        g.noStroke();
        g.fill(96, 84, 76, a * 0.85);
        // 字往外側展開，才不會又蓋回樹上
        g.textAlign(ux >= 0 ? LEFT : RIGHT, CENTER);
        g.text((x | 0) + ',' + (y | 0), lx, ly);
      }
    }
  }
  g.pop();
}

function drawClusters(g, sk, P, ink, nodes) {
  const S = sk.shapes || {};
  const F = P.flower;
  const C = P.cluster;
  const lod = P.lodScale || 1; // driver 把畫面縮放倍率餵進來
  const ent = P.entry === undefined ? 1 : P.entry;
  const edist = P.entryDist || 0;

  g.noFill();
  g.strokeCap(ROUND);
  const stem = C.stem || [128, 112, 92];
  for (const tip of nodes) {
    if (!tip.clusters) continue;
    const c = Math.cos(tip.dir);
    const s = Math.sin(tip.dir);
    for (const cl of tip.clusters) {
      if (!cl.hasFlower) continue;
      // 花還在飛的時候不該有花柄——柄是花到了才長出來的
      const ce = ent >= 1 ? 1 : entryEase(ent, cl.items.length ? cl.items[0].fd : 0);
      if (ce < 0.05) continue;
      const bx = tip.x + c * cl.d - s * cl.off;
      const by = tip.y + s * cl.d + c * cl.off;
      // 花柄要有弧度也要跟著明暗走。等長等粗的直桿＋固定顏色＝把花別在樹上的圖釘
      const k = 0.55 + 0.45 * cl.z;
      g.stroke(stem[0] * k, stem[1] * k, stem[2] * k, (ink ? 190 : 168) * (0.7 + 0.3 * cl.z) * ce);
      g.strokeWeight(Math.max(0.35, F.size * 0.05 * (0.7 + 0.5 * cl.z)));
      const ex = bx + cl.pdx;
      const ey = by + cl.pdy;
      // 中點往側向讓一點，柄就有了自重造成的彎；直線是植物身上最不可能的形狀
      const mx = (bx + ex) / 2 - cl.pdy * cl.sag;
      const my = (by + ey) / 2 + cl.pdx * cl.sag;
      // 🔴 手算二次貝茲，不用 quadraticVertex()：本專案釘 p5 1.11.3，但這份
      // 程式碼會被複製到用 npm p5 2.x 的地方，而 2.x 拿掉了 quadraticVertex。
      // 共用的檔案只能用兩邊都有的 API（踩過：整個 drawClusters 拋例外，
      // 那一幀只畫到一半，畫面上剩幾根沒有花的枯枝）
      g.noFill();
      g.beginShape();
      for (let i = 0; i <= 4; i++) {
        const t = i / 4;
        const u = 1 - t;
        g.vertex(u * u * bx + 2 * u * t * mx + t * t * ex, u * u * by + 2 * u * t * my + t * t * ey);
      }
      g.endShape();
    }
  }
  g.noStroke();

  for (const tip of nodes) {
    if (!tip.clusters) continue;
    const c = Math.cos(tip.dir);
    const s = Math.sin(tip.dir);
    for (const cl of tip.clusters) {
      const bx = tip.x + c * cl.d - s * cl.off;
      const by = tip.y + s * cl.d + c * cl.off;
      for (const lf of cl.items) {
        // 葉留在基部（同一個芽），花在柄端
        const ox = lf.atBase ? bx : bx + cl.pdx;
        const oy = lf.atBase ? by : by + cl.pdy;
        let x = ox + lf.dx;
        let y = oy + lf.dy;
        let rot = lf.rot;
        if (ent < 1) {
          const e = entryEase(ent, lf.fd);
          if (e <= 0) continue; // 還在畫面外，不用畫
          const k = 1 - e;
          x += lf.fx * edist * k;
          y += lf.fy * edist * k;
          rot += lf.spin * k * k; // 飛行中打轉，落定前轉速收斂
        }
        if (lf.kind === 'flower') drawFlower(g, S, F, lf, x, y, lod, rot);
        else drawLeafItem(g, S, P.leaf, lf, x, y, lod, rot);
      }
    }
  }
}

// 花瓣的「紙感」不靠貼圖：底色 → 較深的花心 → 雄蕊，三層疊出來。
// 平塗一個粉紅五瓣形永遠讀成貼紙，因為真實花瓣的深淺是徑向的
// （心深、緣淡），單一填色沒有這個訊息。
function drawFlower(g, S, F, lf, x, y, lod, rot) {
  // 門檻看的是「畫出來幾像素」，不是模型單位——放大之後細節要跟著升級
  const es = lf.w * lod;
  const pts = es > 9 ? S.flowerHi : S.flower;
  if (!pts || es < 3.2) {
    g.fill(lf.col[0], lf.col[1], lf.col[2], lf.alpha);
    g.ellipse(x, y, lf.w * 0.85, lf.w * 0.8);
    return;
  }
  const k = lf.w * 0.5;
  // 壓扁直接乘在頂點上，不用 g.scale()——每朵花一次矩陣運算，四千朵就是四千次，
  // 而這裡只要十四次乘法（實測花是全畫面最貴的圖元，省得掉就要省）
  const ky = k * (lf.squash || 1);
  g.push();
  g.translate(x, y);
  g.rotate(lf.rot);
  g.fill(lf.col[0], lf.col[1], lf.col[2], lf.alpha);
  g.beginShape();
  for (const p of pts) g.vertex(p[0] * k, p[1] * ky);
  g.endShape(CLOSE);

  // 花心用橢圓不用第二個五瓣多邊形：花心本來就是圓的，而多邊形要價一整組
  // 頂點呼叫——花是全畫面數量最多的圖元（實測佔 19.6ms 中的大半）
  if (es > 6.5 && F.throat) {
    g.fill(F.throat[0], F.throat[1], F.throat[2], lf.alpha * 0.4);
    g.ellipse(0, 0, k * 0.72, ky * 0.66);
  }
  // 雄蕊：櫻的花心是看得見的一叢黃蕊，是「這是一朵花」而不是「一個粉紅圖案」
  // 的訊息來源。只有近景付得起
  if (es > 13 && F.stamen) {
    // 收斂：滿版的黃色星芒在近景會讀成剪貼藝術。蕊要短、要淡、要少
    g.stroke(F.stamen[0], F.stamen[1], F.stamen[2], lf.alpha * 0.5);
    g.strokeWeight(Math.max(0.35, lf.w * 0.03));
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + lf.rot * 0.7;
      g.line(0, 0, Math.cos(a) * k * 0.22, Math.sin(a) * ky * 0.22);
    }
    g.noStroke();
  }
  g.pop();
}

function drawLeafItem(g, S, L, lf, x, y, lod, rot) {
  const es = lf.w * lod;
  const hi = es > 8.5 && S.leafHi;
  const pts = hi ? S.leafHi : S.leaf;
  if (!pts || es < 3.2) {
    g.fill(lf.col[0], lf.col[1], lf.col[2], lf.alpha);
    g.ellipse(x, y, lf.w, lf.w * 0.62);
    return;
  }
  const k = lf.w * 0.62;
  const ky = k * (lf.squash || 1);
  g.push();
  g.translate(x, y);
  g.rotate(rot === undefined ? lf.rot : rot);
  g.fill(lf.col[0], lf.col[1], lf.col[2], lf.alpha);
  g.beginShape();
  for (const p of pts) g.vertex(p[0] * k, p[1] * ky);
  g.endShape(CLOSE);
  // 葉脈只有夠大才畫得出來，小葉上只會糊成一團髒點
  if (hi && es > 13 && S.veins) {
    g.noFill();
    g.stroke(lf.col[0] * 0.62, lf.col[1] * 0.66, lf.col[2] * 0.6, lf.alpha * 0.55);
    for (const v of S.veins) {
      const w = v.w * lf.w * 0.06;
      if (w < 0.22) continue;
      g.strokeWeight(w);
      g.line(v.x0 * k, v.y0 * ky, v.x1 * k, v.y1 * ky);
    }
    g.noStroke();
  }
  g.pop();
}
