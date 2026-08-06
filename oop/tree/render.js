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
  if (ink) {
    drawBranchesInk(g, sk, P);
  } else {
    drawBranchesFast(g, sk, P);
  }
  drawLeaves(g, sk, P, ink);
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
  if (!P.leaf || !P.canopyAO || !sk.tips.length) return;
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
  const [r, gg, b] = shadeColor(P.leaf.color[0], P.leaf.color[1], P.leaf.color[2]);
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
const FILL_LAYERS = [
  { dx: 0, dy: 0, a: 255, grow: 0, k: 1 }, // 主色
  { dx: -1.05, dy: 1.0, a: 74, grow: -0.4, k: 0.94 },
];

function drawBranchesFast(g, sk, P) {
  const [r, gr, b] = P.bark;
  g.noStroke();

  // 邊緣加深：填色之下先畫一圈略粗的深色。canvas 沒有原生卷積，
  // 這是水彩 edge darkening 最便宜的近似。
  g.fill(r * 0.62, gr * 0.62, b * 0.66, 95);
  for (const n of sk.nodes) {
    if (!n.parent || n.radius < THICK) continue;
    bandQuad(g, n.parent, n, -1, 1, 0.75);
  }

  // 底色三層疊加；沿高度做暖冷漸層
  for (const L of FILL_LAYERS) {
    g.push();
    g.translate(L.dx, L.dy);
    for (const n of sk.nodes) {
      if (!n.parent || n.radius < THICK) continue;
      const warm = 1 - Math.min(1, -n.y / sk.treeHeight);
      g.fill((r + warm * 9) * L.k, (gr + warm * 5) * L.k, (b + warm * 1) * L.k, L.a);
      bandQuad(g, n.parent, n, -1, 1, L.grow);
      if (n.radius > 2 && n.children.length > 1) g.ellipse(n.x, n.y, n.radius * 2, n.radius * 2);
    }
    g.pop();
  }

  // 陰影／高光的側別由全域光向量決定。陰影不是單純調暗——實測是
  // 變暗＋變藍＋去飽和三件事同時發生（Morimoto et al. 2025）
  const [sr, sg, sb] = shadeColor(r, gr, b);
  g.fill(sr, sg, sb, 76);
  for (const n of sk.nodes) {
    if (!n.parent || n.radius < 2.5) continue;
    const lit = lightSideOf(n.perpX, n.perpY);
    bandQuad(g, n.parent, n, -lit, -lit * 0.32);
  }

  for (const n of sk.nodes) {
    if (!n.parent || n.radius < 2.5) continue;
    const v = noise(n.pathLen * 0.018, n.bseed + 51.3);
    const a = Math.max(0, 0.6 - v) * 130;
    if (a < 3) continue;
    const lit = lightSideOf(n.perpX, n.perpY);
    const [hr, hg, hb] = litColor(r, gr, b);
    g.fill(hr, hg, hb, a);
    bandQuad(g, n.parent, n, lit * 0.18, lit * 0.62);
  }

  // 樹皮縱紋
  g.noFill();
  g.strokeWeight(0.7);
  g.stroke(r * 0.5, gr * 0.5, b * 0.55, 26);
  for (const n of sk.nodes) {
    if (!n.parent || n.radius < 6) continue;
    for (let i = 0; i < 2; i++) {
      const t = (((n.bseed * 7.13 + i * 2.71) % 1) - 0.5) * 1.5;
      bandLine(g, n.parent, n, t);
    }
  }

  drawContour(g, sk, P);

  // 細枝：線段
  g.noFill();
  g.stroke(r, gr, b, 232);
  g.strokeCap(ROUND);
  let last = -1;
  for (const n of sk.nodes) {
    if (!n.parent || n.radius >= THICK) continue;
    const w = Math.max(0.35, Math.round(n.radius * 4) / 4);
    if (w !== last) {
      g.strokeWeight(w);
      last = w;
    }
    g.line(n.parent.x, n.parent.y, n.x, n.y);
  }
}

// 輪廓線風格化三件套：沿線噪聲調變粗細、法線方向抖動、隨機斷續。
// 程序化生成的圖形不需要邊緣偵測（拓樸已知），功課是風格化這些已知的線。
function drawContour(g, sk, P) {
  if (!P.contour) return;
  const [r, gr, b] = P.bark;
  g.noFill();
  g.strokeCap(ROUND);
  g.stroke(r * 0.45, gr * 0.45, b * 0.5, 105);
  for (const n of sk.nodes) {
    if (!n.parent || n.radius < 3.6) continue;
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

function drawBranchesInk(g, sk, P) {
  const [r, gr, b] = P.bark;
  computeInkJitter(sk);
  g.noStroke();

  // 底墨：邊緣逐點擾動（不是整段位移——整段位移只會變成疊影方塊）
  g.fill(r, gr, b, 210);
  for (const n of sk.nodes) {
    if (!n.parent) continue;
    roughQuad(g, n.parent, n, 1);
    if (n.radius > 1.6 && n.children.length > 1) g.ellipse(n.x, n.y, n.radius * 2, n.radius * 2);
  }

  // 內層濃淡：略微內縮再疊一層，製造墨色不均
  g.fill(r * 0.8, gr * 0.8, b * 0.8, 48);
  for (const n of sk.nodes) {
    if (!n.parent || random() < 0.25) continue;
    roughQuad(g, n.parent, n, 0.86);
  }

  // 筆毛條紋：沿枝幹內部拉細線，這才是「筆觸」的來源
  g.noFill();
  g.strokeCap(ROUND);
  for (const n of sk.nodes) {
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
  for (const n of sk.nodes) {
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
  const op = (nd, t) => sideOffset(nd, t) + (t >= 0 ? e : -e);
  g.beginShape();
  g.vertex(p.x + f.perpX * op(p, t1), p.y + f.perpY * op(p, t1));
  g.vertex(n.x + n.perpX * op(n, t1), n.y + n.perpY * op(n, t1));
  g.vertex(n.x + n.perpX * op(n, t0), n.y + n.perpY * op(n, t0));
  g.vertex(p.x + f.perpX * op(p, t0), p.y + f.perpY * op(p, t0));
  g.endShape(CLOSE);
}

// 沿枝幹內部畫一條縱線（樹皮紋理／筆毛條紋）
function bandLine(g, p, n, t) {
  const f = baseFrame(p, n);
  g.line(
    p.x + f.perpX * sideOffset(p, t),
    p.y + f.perpY * sideOffset(p, t),
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

function drawLeaves(g, sk, P, ink) {
  if (!P.leaf) return;
  const [lr, lg, lb] = P.leaf.color;

  if (P.leaf.shape === 'needle') {
    g.noFill();
    g.strokeCap(ROUND);
    for (const tip of sk.tips) {
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
  for (const tip of sk.tips) {
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
