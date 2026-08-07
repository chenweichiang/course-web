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
  shadeCanopy(sk, P); // 要等 finalize 解出世界座標，才知道每個花／葉落在樹冠的哪裡
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
//
// serrate / teeth：鋸齒緣。用三角波乘在半徑上，不是加——加法在葉尖（r 小）
// 會做出跟葉基一樣大的齒，看起來像結霜。齒在葉基與葉尖都要收掉：
// 真實的鋸齒緣在葉柄附近是平滑的。
function gielisOutline(m, n1, n2, n3, a, b, steps, serrate, teeth) {
  const pts = [];
  for (let i = 0; i < steps; i++) {
    const phi = (i / steps) * Math.PI * 2;
    const t1 = Math.pow(Math.abs(Math.cos((m * phi) / 4) / a), n2);
    const t2 = Math.pow(Math.abs(Math.sin((m * phi) / 4) / b), n3);
    let r = Math.pow(t1 + t2, -1 / n1);
    if (!isFinite(r)) continue;
    if (serrate) {
      const tri = Math.abs(((phi * (teeth || 20)) / (Math.PI * 2)) % 1 * 2 - 1);
      // sin(phi) 在葉基／葉尖為 0 → 齒自動收掉
      r *= 1 + serrate * (tri - 0.5) * Math.abs(Math.sin(phi));
    }
    pts.push([Math.cos(phi) * r, Math.sin(phi) * r]);
  }
  // 正規化到單位寬度
  let mx = 0;
  for (const p of pts) mx = Math.max(mx, Math.abs(p[0]), Math.abs(p[1]));
  return pts.map((p) => [p[0] / mx, p[1] / mx]);
}

// 卵形葉（ovate）的輪廓控制點。
//
// 取自 friggog/tree-gen 的 `leaf_shapes.py`（Weber-Penn 的 Blender 完整實作，
// GPL-3.0，10 種葉形的第 1 種）。這是美術手調的定點，不是解析曲線——
// 試過用 Gielis 超公式湊卵形，m=2 那一族出來的都是圓球：超公式擅長對稱的
// 花瓣族，但做不出「基部圓、先端漸尖」這種不對稱的縱向輪廓。
//
// 座標 [across, along]，along 0 = 葉柄、1 = 葉尖。
const OVATE = [
  [0.005, 0], [0.005, 0.1], [0.15, 0.15], [0.25, 0.3], [0.2, 0.6], [0, 1],
  [-0.2, 0.6], [-0.25, 0.3], [-0.15, 0.15], [-0.005, 0.1], [-0.005, 0],
];

// 沿周長重新取樣並加鋸齒。齒必須沿「外法線」推出去，不是沿半徑——
// 卵形不是以原點為中心的星狀多邊形，用半徑推會讓葉尖的齒全部歪向一邊。
function ovateOutline(serrate, teeth, sub) {
  const pts = [];
  const n = OVATE.length;
  for (let i = 0; i < n; i++) {
    const [x0, y0] = OVATE[i];
    const [x1, y1] = OVATE[(i + 1) % n];
    for (let k = 0; k < sub; k++) {
      const t = k / sub;
      pts.push([x0 + (x1 - x0) * t, y0 + (y1 - y0) * t]);
    }
  }
  const m = pts.length;
  const out = [];
  for (let i = 0; i < m; i++) {
    const [px, py] = pts[(i - 1 + m) % m];
    const [x, y] = pts[i];
    const [nx, ny] = pts[(i + 1) % m];
    let ex = ny - py;
    let ey = -(nx - px); // 外法線（多邊形是逆時針）
    const len = Math.hypot(ex, ey) || 1;
    ex /= len;
    ey /= len;
    let d = 0;
    if (serrate) {
      const tri = Math.abs(((i * (teeth || 20)) / m) % 1 * 2 - 1);
      // 葉柄那一小段不長齒（真實鋸齒緣在基部是平滑的）
      const gate = Math.min(1, y * 4);
      d = serrate * (tri - 0.5) * gate;
    }
    out.push([x + ex * d, y - 0.5 + ey * d]); // y 平移到以葉身中段為原點
  }
  let mx = 0;
  for (const p of out) mx = Math.max(mx, Math.abs(p[0]), Math.abs(p[1]));
  return out.map((p) => [p[0] / mx, p[1] / mx]);
}

// 櫻花輪廓：五瓣，每瓣先端有淺切口。
//
// 「花びらの先が割れている」是櫻 vs 梅（先端圓）vs 桃（先端尖）的第一判準，
// 也是把 Gielis 五瓣玫瑰形變成「櫻花」的唯一一件事。
//
// 兩個實測參數抄自 sakura-idle 並附上它的失敗紀錄：切口深 0.088、寬 0.21。
// 深 0.165 刻在近乎平的瓣頂會做出兩片肥大的裂片，**每一片花瓣都讀成情人節愛心**。
// 所以瓣形要先是「圓頂」（下面的 1 − 0.58u²），切口才有東西可以刻。
function sakuraOutline(petals, notch, steps) {
  const pts = [];
  const slot = (Math.PI * 2) / petals;
  for (let i = 0; i < steps; i++) {
    const phi = (i / steps) * Math.PI * 2;
    const k = phi / slot;
    const u = (k - Math.floor(k)) * 2 - 1; // −1 / +1 = 兩瓣交界，0 = 瓣尖
    let r = 1 - 0.58 * u * u; // 圓頂瓣
    r -= notch * Math.exp(-(u / 0.21) * (u / 0.21));
    pts.push([Math.cos(phi) * r, Math.sin(phi) * r]);
  }
  let mx = 0;
  for (const p of pts) mx = Math.max(mx, Math.abs(p[0]), Math.abs(p[1]));
  return pts.map((p) => [p[0] / mx, p[1] / mx]);
}

// 把受光與遮蔽烤進每個樹冠元素的顏色裡。
//
// 為什麼是「烤進去」而不是每幀算：位置在生成後就固定了（風只移動幾個像素，
// 對打光沒有影響），而樹冠元素是全畫面數量最多的圖元——每幀為四千朵花各算一次
// shadeColor／litColor 是純粹的浪費。
//
// 兩個因子相乘：
//   facing 朝向光源的一側亮、背側暗
//   rim    離樹冠中心愈遠愈亮——光進不到樹冠內部。這一項是「體積」的來源，
//          少了它整片樹冠會是同一個明度，也就是一張色紙
function shadeCanopy(sk, P) {
  const C = sk.canopy;
  if (!C) return;
  const apply = (lf, x, y, z) => {
    const u = (x - C.cx) / C.rx;
    const v = (y - C.cy) / C.ry;
    const facing = u * LIGHT.x + v * LIGHT.y;
    const rim = Math.min(1, Math.hypot(u, v));
    let t = (0.5 + 0.5 * facing) * (0.32 + 0.68 * rim);
    // 前層離觀者近＝多接一點光，後層再壓暗一階（大氣透視的近距離版）
    t = Math.min(1, Math.max(0, t * (0.72 + 0.5 * z)));
    const c = lf.col;
    // 🔴 以原色為基準往兩側各拉一段，不是在 shade↔lit 之間整段內插。
    // shadeColor 是為樹皮（暗色）校準的：它做的是「去飽和 55% 再壓暗」，
    // 整段內插套在亮粉花瓣上會把整片樹冠洗成灰紫色，物種辨識度直接歸零。
    const pullDark = lf.kind === 'flower' ? 0.5 : 0.62; // 花瓣半透明，陰影裡不會那麼暗
    const pullLit = lf.kind === 'flower' ? 0.5 : 0.4;
    let out;
    if (t < 0.5) {
      const k = (0.5 - t) * 2 * pullDark;
      const sh = shadeColor(c[0], c[1], c[2]);
      out = [c[0] + (sh[0] - c[0]) * k, c[1] + (sh[1] - c[1]) * k, c[2] + (sh[2] - c[2]) * k];
    } else {
      const k = (t - 0.5) * 2 * pullLit;
      const li = litColor(c[0], c[1], c[2]);
      out = [c[0] + (li[0] - c[0]) * k, c[1] + (li[1] - c[1]) * k, c[2] + (li[2] - c[2]) * k];
    }
    lf.col = out;
    lf.lit = t;
  };
  // 枝條被樹冠罩住的程度＝「前面擋著多少花」。兩個因子：
  //   樹冠內部愈深，前面的花愈多
  //   愈細的枝愈可能被埋在樹冠裡；主幹與主枝在整片樹冠之前，幾乎不該被罩
  // 少了第二項會把主幹一起洗白，樹就沒有骨架了
  const thinRef = Math.max(1, sk.rootRadius * 0.3);
  for (const n of sk.nodes) {
    const u = (n.x - C.cx) / C.rx;
    const v = (n.y - C.cy) / C.ry;
    const rim = Math.hypot(u, v);
    const thin = 1 - Math.min(1, n.radius / thinRef);
    n.veil = rim < 1 ? (1 - rim) * thin * 0.3 : 0;
  }
  for (const n of sk.nodes) {
    if (n.clusters) {
      for (const cl of n.clusters) {
        // 花的前後跟著它長在哪根枝條上——不然會出現「枝條在樹幹後面、
        // 花卻浮在樹幹前面」這種拆開的畫面
        if (n.depth !== undefined) cl.back = n.depth < 0;
        const bx = n.x + Math.cos(n.dir) * cl.d - Math.sin(n.dir) * cl.off;
        const by = n.y + Math.sin(n.dir) * cl.d + Math.cos(n.dir) * cl.off;
        for (const lf of cl.items) {
          const ox = lf.atBase ? bx : bx + cl.pdx;
          const oy = lf.atBase ? by : by + cl.pdy;
          apply(lf, ox + lf.dx, oy + lf.dy, cl.z);
        }
      }
    }
    if (n.leaves) {
      const z = n.leafBack ? 0.25 : 0.8;
      for (const lf of n.leaves) apply(lf, n.x + lf.off, n.y + lf.d, z);
    }
  }
}

// 樹冠元素在骨架末端之外還能伸出多遠——取景要用它，否則加了花柄會出框
function canopyMargin(P) {
  let m = 2;
  if (P.leaf) m = Math.max(m, P.leaf.spread + P.leaf.size);
  if (P.flower) m = Math.max(m, P.flower.spread + P.flower.size);
  if (P.cluster) m += P.cluster.pedicel;
  return m;
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

// 樹冠圖元的形狀只算一次，掛在骨架上而不是 P 上——
// P.flower / P.cluster 在各 driver 裡是從 PRESETS 淺拷貝來的，寫進去會污染預設值
function prepareCanopyShapes(sk, P) {
  const L = P.leaf;
  // 葉片是數量最多的圖元：多邊形取代橢圓約 8 倍呼叫成本，
  // 只有近景值得——遠景葉片幾像素大，形狀根本看不出來
  const ovate = L && L.shape === 'ovate';
  const leafPts = !L
    ? null
    : ovate
      ? ovateOutline(0, 0, 1) // 11 點原始控制點，遠景夠用
      : L.shape === 'blob' && L.gielis !== false
        ? gielisOutline(L.m || 2, L.n1 || 1, L.n2 || 1.7, L.n3 || 1.7, 1, 1, 9)
        : null;
  // 鋸齒緣需要遠高於 11 的取樣數（齒數 22 → 至少 3 倍），成本只有近景付得起
  const leafPtsHi =
    L && L.serrate ? (ovate ? ovateOutline(L.serrate, L.teeth, 9) : gielisOutline(L.m || 2, L.n1 || 1, L.n2 || 1.7, L.n3 || 1.7, 1, 1, 96, L.serrate, L.teeth)) : null;
  const F = P.flower;
  sk.shapes = {
    leaf: leafPts,
    leafHi: leafPtsHi,
    // 切口寬 0.21（瓣內正規化座標），60 步時每步約 0.1 → 剛好解析得出來；
    // 低階版只留得住瓣形，切口會被取樣掉，所以只給小尺寸用。
    // 14 點是實測下限：再少五瓣會退化成星形
    flowerHi: F ? sakuraOutline(F.petals || 5, F.notch || 0, 60) : null,
    flower: F ? sakuraOutline(F.petals || 5, 0, 14) : null,
    veins: L && L.vein && leafPtsHi ? buildVenation(leafPtsHi) : null,
  };
}

function attachLeaves(sk, P) {
  if (!P.leaf && !P.flower) return;
  const tips = sk.nodes.filter((n) => n.children.length === 0);
  if (!tips.length) return;
  prepareCanopyShapes(sk, P);
  if (P.cluster && P.flower) attachClusters(sk, P, tips);
  else attachScatter(sk, P, tips);
}

// 原行為：沿末梢灑點。四個非櫻樹種走這條
function attachScatter(sk, P, tips) {
  const clump = Math.max(1, Math.min(P.leaf.clump, Math.floor(P.leafBudget / tips.length)));
  if (clump < 1) return;
  const col = seasonColor(P.leaf.color, P.season || 0);
  let phyllo = 0;
  for (const tip of tips) {
    const arr = [];
    for (let i = 0; i < clump; i++) {
      phyllo += GOLDEN_ANGLE; // 葉序沿枝遞增，避免相鄰葉簇規律重疊
      const fa = random(Math.PI * 2);
      arr.push({
        squash: 0.32 + 0.68 * random(),
        fx: Math.cos(fa) * 1.75,
        fy: Math.sin(fa) * 0.8 - 0.3,
        fd: random(),
        spin: random(-7, 7),
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
    tip.leafBack = random() < 0.4;
  }
}

// 櫻的花序：一個節點長出一條長花柄，柄端 3–5 朵成簇。
//
// 「桜：長い花柄があり、房状に咲く（ぶら下がるように見える）」——花柄是櫻與梅
// （無柄、貼枝）、桃（短柄、兩朵）的分野。灑點永遠做不出那個下垂感，因為
// 下垂來自「花離開枝條一段距離」這件事本身。
//
// 花柄的方向存世界座標而不是枝條局部座標：它是被重力決定的，不該跟著枝條轉。
// 風吹時基部會動、花跟著飄，但柄始終朝下——這是對的。
function attachClusters(sk, P, tips) {
  const F = P.flower;
  const C = P.cluster;
  const bloom = P.bloom === undefined ? 1 : P.bloom;
  const [lo, hi] = C.count;
  const budget = P.leafBudget; // 預算單位是「朵」，不是「簇」
  const leafCol = P.leaf ? seasonColor(P.leaf.color, P.season || 0) : [90, 120, 80];
  let made = 0;
  let phyllo = 0;

  // 盛花的櫻是整條枝條都開，不是只有末端一點。只掛在 tip 上會留下一大片
  // 光禿的細枝——這在真實的滿開狀態下不存在
  const sites = tips.slice();
  for (const n of sk.nodes) {
    if (n.children.length === 0 || n.radius > 1.3 || n.order < 3) continue;
    if (random() < 0.45) sites.push(n);
  }

  for (const tip of sites) {
    if (made > budget) break;
    const n = Math.round(lo + random() * (hi - lo));
    // 花柄：以正下方為基準左右擺一點。純朝下會排成一列梳子
    const ang = Math.PI / 2 + (random() - 0.5) * 1.5 * C.jitter;
    const back = random() < 0.45;
    const plen = C.pedicel * (0.65 + random() * 0.7) * C.droop * (back ? 0.85 : 1);
    const items = [];
    for (let i = 0; i < n; i++) {
      phyllo += GOLDEN_ANGLE;
      const isFlower = random() < bloom;
      const src = isFlower ? F : P.leaf;
      if (!src) continue;
      const base = isFlower ? F.color : leafCol;
      const a = phyllo + random(-0.3, 0.3);
      // 花繞著柄端散開；葉留在基部（同一個芽長出來，但葉不掛在花柄上）
      const rad = isFlower ? F.spread * (0.25 + 0.75 * random()) : P.leaf.spread * 0.5 * random();
      // 入場：每片各自從畫面外的一個方向飛進來。
      // 方向壓扁成橫向、再往上偏一點——花瓣是被風吹進來後落下的，不是從四面
      // 均勻收縮進來（均勻收縮會讀成「圖層縮放」而不是「飛進來」）
      const fa = random(Math.PI * 2);
      items.push({
        kind: isFlower ? 'flower' : 'leaf',
        atBase: !isFlower,
        fx: Math.cos(fa) * 1.75,
        fy: Math.sin(fa) * 0.8 - 0.3,
        fd: random(), // 到達時刻的先後
        spin: random(-7, 7),
        // 隨機的面向：真實花朵朝四面八方，正對觀者的是少數。全部畫成正圓
        // 就是「貼紙」最直接的來源——一整片同樣大小同樣圓的粉紅色塊
        squash: 0.32 + 0.68 * random(),
        dx: Math.cos(a) * rad,
        dy: Math.sin(a) * rad * 0.8,
        // 後層的花略小：同樣大小的圖元散在整片樹冠上，前後就只剩明暗在講話
        w: src.size * (0.68 + 0.62 * random()) * (back ? 0.84 : 1.06),
        rot: a + random(-0.4, 0.4),
        alpha: src.alpha * (0.7 + 0.5 * random()),
        col: [base[0] + random(-14, 14), base[1] + random(-14, 14), base[2] + random(-10, 10)],
      });
      made++;
    }
    tip.clusters = [
      {
        // 前後分層：樹冠有一部分要畫在枝幹「之前」，被枝條擋住。
        // 全部畫在枝幹之上時，整片樹冠是平貼在枝幹層上的一張色紙——
        // 沒有任何一朵被擋住，體積就不存在
        back,
        z: back ? random() * 0.45 : 0.55 + random() * 0.45,
        sag: (random() - 0.5) * 0.34, // 花柄的自重彎曲，左右不定
        // 沒有花就沒有花柄：葉是從同一個芽長出來的，但不掛在花柄上。
        // 少了這個判斷，全葉期會留下一根根空的細桿
        hasFlower: items.some((it) => !it.atBase),
        d: (random() - 0.4) * 4,
        off: (random() - 0.5) * 4,
        pdx: Math.cos(ang) * plen,
        pdy: Math.sin(ang) * plen,
        items,
      },
    ];
  }
}
