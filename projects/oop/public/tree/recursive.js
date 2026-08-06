// 生成核心 A：有機遞迴生長
//
// 與教科書版遞迴分形樹的差別（見 docs/RESEARCH.md）：
//   1. 枝條是多段折線，每段用噪聲彎曲——不是直線段
//   2. 頂端優勢（apical）決定延續主軸或分叉，左右不等權——不是對稱二分叉
//   3. 側枝沿枝長隨機冒出——不是只在端點分叉
//   4. 生長方向疊加向性（重力／向光）——不是純隨機游走

function growRecursive(P) {
  const sk = new Skeleton();
  growAxis(sk, P, sk.root, -Math.PI / 2, 0, P.trunkLen, 0, 0, 0, 0);
  attachLeaves(sk, P);
  sk.finalize(P);
  return sk;
}

// parentDir = 父節點世界方向；initialTurn = 這條軸相對父節點的起始偏角
// bseed = 這條軸專屬的噪聲相位（不同枝要取不同的噪聲切片，否則會集體朝同方向彎）
// px, py = 起點世界座標，只用來做地面裁切（root 在 y=0，向上為負）
function growAxis(sk, P, parent, parentDir, initialTurn, len, order, bseed, px, py) {
  if (len < P.minLen || order > P.maxOrder || sk.size > P.budget) return;

  // 樹幹用較細的分段：基部外張是指數曲線，取樣太疏會退化成一階階梯
  const step = order === 0 ? P.stepLen * P.trunkStepScale : P.stepLen;
  const steps = Math.max(2, Math.round(len / step));
  const stepLen = len / steps;
  const curveSide = P.curveSide;
  let dir = parentDir + initialTurn;
  let pending = initialTurn; // 起始偏角要併進第一個節點的相對角
  let node = parent;
  let x = px;
  let y = py;

  for (let i = 0; i < steps; i++) {
    // 曲率：沿枝長取噪聲，讓彎曲連續而非逐段抖動
    const nz = noise(node.pathLen * P.curlScale + bseed, P.curlSeed + bseed * 0.37);
    // 主幹的噪聲曲率要收斂：這是隨機漫步，在長主幹上會累積成整棵樹歪倒
    const curl = P.curl * (order === 0 ? P.trunkCurlScale : 1);
    let turn = (nz - 0.5) * 2 * curl * stepLen;

    // 向性：朝目標方向施加轉矩。下垂型（柳）只作用在高階細枝——
    // 若連主幹也往下拉，整棵樹會彎成拱門
    const droop = order >= P.tropismFromOrder;
    const tDir = droop ? P.tropismDir : -Math.PI / 2;
    // 主幹用獨立的挺立強度，不跟著側枝的向性走（柳的側枝要下垂，主幹仍要站直）
    const k = order === 0 ? P.trunkUpright : P.tropismK;
    turn += Math.sin(tDir - dir) * k * stepLen;

    // 樹幹整體彎曲（Weber-Penn 的 Curve / CurveBack）：前半段朝一側、後半段反向，
    // 形成 S 形。完全筆直的樹幹本身就會被看成幾何體
    if (order === 0) {
      const back = i >= steps / 2;
      const amount = back ? -P.trunkCurveBack : P.trunkCurve;
      turn += (amount * curveSide) / (steps / 2);
    }

    dir += turn;
    x += Math.cos(dir) * stepLen;
    y += Math.sin(dir) * stepLen;
    if (y > 0 && order > 0) return; // 不長到地面以下
    node = sk.add(node, stepLen, pending + turn, order, bseed);
    pending = 0;

    // 側枝沿枝長冒出，不是只在端點
    const t = (i + 1) / steps;
    if (
      t > P.lateralStart &&
      order < P.maxOrder &&
      random() < P.lateralRate * stepLen &&
      sk.size < P.budget
    ) {
      const side = random() < 0.5 ? 1 : -1;
      const a = side * (P.lateralAngle + (random() - 0.5) * P.angleJitter);
      const childLen = len * P.lateralDecay * (0.65 + 0.7 * random());
      growAxis(sk, P, node, dir, a, childLen, order + 1, random(1000), x, y);
    }
  }

  if (sk.size > P.budget) return;

  // 軸的終點：延續主軸（monopodial）或分叉（sympodial）
  // 頂端優勢主要作用在主幹；側枝若也照抄，整棵樹會變成一束不分岔的長弧
  const apical = order === 0 ? P.apical : P.apicalLateral;
  if (random() < apical) {
    growAxis(sk, P, node, dir, (random() - 0.5) * 0.25, len * P.axisDecay, order, random(1000), x, y);
  } else {
    const nfork = random() < P.trifurcate ? 3 : 2;
    // 優勢枝隨機挑一支——若固定挑同一側，偏斜會沿著每次分叉累積，整棵樹倒向一邊
    const dominantIdx = Math.floor(random(nfork));
    for (let i = 0; i < nfork; i++) {
      const spread = nfork === 1 ? 0 : (i / (nfork - 1)) * 2 - 1;
      const a = spread * P.forkAngle + (random() - 0.5) * P.angleJitter;
      // 不等權：其中一支明顯較強，避免左右鏡射的扇形
      const dominant = i === dominantIdx ? 1 : 0.72;
      const childLen = len * P.forkDecay * dominant * (0.85 + 0.3 * random());
      growAxis(sk, P, node, dir, a, childLen, order + 1, random(1000), x, y);
    }
  }
}

// 末梢葉簇。三件事：
//   1. Gielis 超公式（2003）單一極座標方程即可生成從橢圓、披針形到心形的連續葉形族群，
//      取代噪聲橢圓——葉形從「隨機圓球」變成有物種辨識度的形狀
//   2. 葉序用黃金角遞增。重點不是 137.5° 這個數字本身，而是避開任何會造成
//      週期性重疊的簡單分數角（Strauss 2019：黃金角接近最優但非唯一解）
//   3. 秋色是兩條獨立通道，不是單一色相插值——見 seasonColor()
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5)); // ≈137.5°

// r(φ) = [ |cos(mφ/4)/a|^n2 + |sin(mφ/4)/b|^n3 ]^(-1/n1)
function gielisOutline(m, n1, n2, n3, a, b, steps) {
  const pts = [];
  for (let i = 0; i < steps; i++) {
    const phi = (i / steps) * Math.PI * 2;
    const t1 = Math.pow(Math.abs(Math.cos((m * phi) / 4) / a), n2);
    const t2 = Math.pow(Math.abs(Math.sin((m * phi) / 4) / b), n3);
    const r = Math.pow(t1 + t2, -1 / n1);
    if (!isFinite(r)) continue;
    pts.push([Math.cos(phi) * r, Math.sin(phi) * r]);
  }
  // 正規化到單位寬度
  let mx = 0;
  for (const p of pts) mx = Math.max(mx, Math.abs(p[0]), Math.abs(p[1]));
  return pts.map((p) => [p[0] / mx, p[1] / mx]);
}

// 秋色：葉綠素分解只是「揭露」原本就在的類胡蘿蔔素（不是新增黃色）；
// 花青素則是全新合成，且要等葉綠素掉到 50% 之後才觸發。兩條獨立曲線。
function seasonColor(base, season) {
  if (!season) return base.slice();
  const CAROT = [214, 168, 70]; // 類胡蘿蔔素（一直都在，被綠色蓋住）
  const ANTHO = [176, 68, 62]; // 花青素（新合成）
  const loss = Math.min(1, season); // 葉綠素分解進度
  const antho = Math.max(0, (loss - 0.5) / 0.5); // 50% 之後才啟動
  const out = [];
  for (let i = 0; i < 3; i++) {
    let v = base[i] + (CAROT[i] - base[i]) * loss;
    v += (ANTHO[i] - v) * antho * 0.75;
    out.push(v);
  }
  return out;
}

function attachLeaves(sk, P) {
  if (!P.leaf) return;
  const tips = sk.nodes.filter((n) => n.children.length === 0);
  const clump = Math.max(1, Math.min(P.leaf.clump, Math.floor(P.leafBudget / Math.max(tips.length, 1))));
  if (clump < 1) return;

  const col = seasonColor(P.leaf.color, P.season || 0);
  // 葉片是數量最多的圖元：多邊形取代橢圓約 8 倍呼叫成本，
  // 只有近景值得——遠景葉片幾像素大，形狀根本看不出來
  P.leaf.shapePts =
    P.leaf.shape === 'blob' && P.leaf.gielis !== false
      ? gielisOutline(
          P.leaf.m || 2,
          P.leaf.n1 || 1,
          P.leaf.n2 || 1.7,
          P.leaf.n3 || 1.7,
          1,
          1,
          9
        )
      : null;

  let phyllo = 0;
  for (const tip of tips) {
    const arr = [];
    for (let i = 0; i < clump; i++) {
      phyllo += GOLDEN_ANGLE; // 葉序沿枝遞增，避免相鄰葉簇規律重疊
      arr.push({
        d: (random() - 0.35) * P.leaf.spread,
        off: (random() - 0.5) * P.leaf.spread * 1.4,
        w: P.leaf.size * (0.6 + 0.8 * random()),
        rot: phyllo + random(-0.25, 0.25),
        shade: random(-28, 28),
        alpha: P.leaf.alpha * (0.65 + 0.55 * random()),
        col: [col[0] + random(-16, 16), col[1] + random(-16, 16), col[2] + random(-12, 12)],
      });
    }
    tip.leaves = arr;
  }
}
