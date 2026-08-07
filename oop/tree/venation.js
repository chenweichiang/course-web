// 葉脈
//
// Runions et al. (2005), Modeling and Visualization of Leaf Venation Patterns。
// 這跟 spacecol.js 用的 Runions 2007 樹木 space colonization **是同一個演算法**——
// 差別只在吸引點雲的形狀（葉片輪廓內 vs 樹冠橢球）與尺度。所以這裡不需要新的
// 演算法，只需要一份不綁 Skeleton／不綁 P 的精簡版。
//
// 用的是「開放脈序」（open venation）：脈不互相接合成網。多數雙子葉植物其實是
// 閉鎖脈序（有網眼），但在葉片只有十幾像素大的尺度上，網眼一個像素都佔不到，
// 付不起那個複雜度。
//
// 一片葉子算一次，全樹共用——同一棵樹上每片葉子的脈都一樣，但沒有人會在
// 十幾像素的圖元上發現這件事。

function insidePoly(pts, x, y) {
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i];
    const [xj, yj] = pts[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

// outline：正規化到約 [-1,1] 的葉片輪廓。回傳 [{x0,y0,x1,y1,w}]，同一個座標系
function buildVenation(outline, opts) {
  const o = opts || {};
  const count = o.count || 150;
  const step = o.step || 0.075;
  const influence = o.influence || 0.55;
  const kill = o.kill || 0.09;

  let minX = 1e9;
  let maxX = -1e9;
  let minY = 1e9;
  let maxY = -1e9;
  for (const [x, y] of outline) {
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }
  // 葉柄在長軸的一端。取錯軸的話主脈會橫著長，整片葉子讀起來像被切開。
  // 起點要往葉身內縮一小段：卵形的葉柄末端只有百分之一寬，從那個針尖起步的話
  // 每一步都會落在輪廓外被判出界，結果一條脈都長不出來（實際踩過）
  const horiz = maxX - minX >= maxY - minY;
  const base = horiz
    ? [minX + (maxX - minX) * 0.12, (minY + maxY) / 2]
    : [(minX + maxX) / 2, minY + (maxY - minY) * 0.12];

  // 吸引點用內縮的輪廓，脈才不會直接頂在葉緣上
  const inner = outline.map((p) => [p[0] * 0.9, p[1] * 0.9]);
  const att = [];
  let guard = 0;
  while (att.length < count && guard++ < count * 40) {
    const x = minX + Math.random() * (maxX - minX);
    const y = minY + Math.random() * (maxY - minY);
    if (insidePoly(inner, x, y)) att.push({ x, y, dead: false });
  }
  if (!att.length) return null;

  const nodes = [{ x: base[0], y: base[1], parent: null, kids: 0 }];
  for (let iter = 0; iter < 120; iter++) {
    const pull = new Map();
    let alive = 0;
    for (const a of att) {
      if (a.dead) continue;
      alive++;
      let best = null;
      let bestD = influence;
      for (const n of nodes) {
        const d = Math.hypot(a.x - n.x, a.y - n.y);
        if (d < bestD) {
          bestD = d;
          best = n;
        }
      }
      if (!best) continue;
      const v = pull.get(best) || { x: 0, y: 0 };
      const len = bestD || 1;
      v.x += (a.x - best.x) / len;
      v.y += (a.y - best.y) / len;
      pull.set(best, v);
    }
    if (!alive || !pull.size) break;

    const fresh = [];
    for (const [node, v] of pull) {
      const m = Math.hypot(v.x, v.y) || 1;
      const nx = node.x + (v.x / m) * step;
      const ny = node.y + (v.y / m) * step;
      if (!insidePoly(outline, nx, ny)) continue;
      const child = { x: nx, y: ny, parent: node, kids: 0 };
      nodes.push(child);
      fresh.push(child);
    }
    if (!fresh.length) break;
    for (const n of fresh) {
      for (const a of att) {
        if (!a.dead && Math.hypot(a.x - n.x, a.y - n.y) < kill) a.dead = true;
      }
    }
    if (nodes.length > 900) break;
  }

  // 脈寬＝子樹末端數（Runions 原文：所有子脈對母脈寬度的貢獻相等）。
  // 這跟枝幹的 pipe model 是同一條規則，只是指數不同
  for (const n of nodes) n.kids = 0;
  for (let i = nodes.length - 1; i >= 0; i--) {
    const n = nodes[i];
    if (n.kids === 0) n.kids = 1;
    if (n.parent) n.parent.kids += n.kids;
  }
  const maxKids = Math.max(1, nodes[0].kids);

  const segs = [];
  for (const n of nodes) {
    if (!n.parent) continue;
    segs.push({
      x0: n.parent.x,
      y0: n.parent.y,
      x1: n.x,
      y1: n.y,
      w: Math.pow(n.kids / maxKids, 0.42),
    });
  }
  return segs;
}
