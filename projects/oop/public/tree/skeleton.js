// 樹骨架資料結構
//
// 節點只存「相對父節點」的幾何（len + angle），世界座標每幀由 resolve() 推算。
// 這樣風擺才能沿著枝條累積傳遞：子枝繼承父枝的擺動，末梢自然擺得最大。

class TreeNode {
  constructor(parent, len, angle, order, bseed) {
    this.parent = parent;
    this.children = [];
    this.len = len;       // 到父節點的距離
    this.angle = angle;   // 相對父節點方向的夾角（弧度）
    this.order = order;   // 分枝階數（0 = 主幹）
    this.bseed = bseed;   // 該枝條專屬的噪聲相位（同枝共用、異枝獨立）
    this.radius = 0;      // 由 pipe model 回推（結構半徑）
    this.rA = 0;          // 輪廓半徑：垂直方向的正側
    this.rB = 0;          // 輪廓半徑：負側
    this.pathLen = parent ? parent.pathLen + len : 0;
    this.leaves = null;   // 末梢葉簇（局部座標）
    // resolve() 每幀寫入
    this.x = 0;
    this.y = 0;
    this.dir = 0;
  }
}

class Skeleton {
  constructor() {
    this.root = new TreeNode(null, 0, -Math.PI / 2, 0, 0); // 朝上
    this.nodes = [this.root];
    this.tips = [];
    this.maxPathLen = 1;
    this.rootRadius = 1;
  }

  add(parent, len, angle, order, bseed) {
    const n = new TreeNode(parent, len, angle, order, bseed === undefined ? parent.bseed : bseed);
    parent.children.push(n);
    this.nodes.push(n);
    return n;
  }

  get size() {
    return this.nodes.length;
  }

  // 生成完成後呼叫：算末梢、路徑長、半徑、左右輪廓
  finalize(P) {
    this.tips = this.nodes.filter((n) => n.children.length === 0);
    this.maxPathLen = Math.max(1, ...this.nodes.map((n) => n.pathLen));
    this.applyPipeModel(P);
    this.applyAxisTaper(P);
    this.enforceMonotone();
    this.resolve(0, 0, 0, 0); // 基部外張要用世界高度，不能用 pathLen（樹幹會彎）
    this.treeHeight = Math.max(1, -Math.min(...this.nodes.map((n) => n.y)));
    this.applySides(P);
    this.assignUnion();
    this.assignDepth();
    this.assignCanopyBox();
    this.assignLenticels(P);
    this.assignWindPhase();
    this.assignResonance(P);
  }

  // 接合區：新軸離開母枝的頭幾節，還壓在母枝的輪廓範圍內。
  //
  // 這一段要跟母枝「揉在一起」而不是疊上去。分枝是獨立的圓柱，有自己的垂直向量、
  // 自己的明暗、自己的輪廓線——在母枝上就切出一條銳利的邊，讀起來是另一片紙疊上去，
  // 而不是從樹幹長出來的。真實的接合處是同一塊木頭（枝領）。
  //
  // 存 0..1 的權重，渲染端用它把該段的明暗、邊緣加深、輪廓線、皮目全部淡出。
  assignUnion() {
    for (const n of this.nodes) n.union = 0;
    for (const n of this.nodes) {
      if (!n.parent || n.order <= n.parent.order) continue;
      const R = Math.max(n.parent.rA, n.parent.rB) * 1.2;
      if (R <= 0) continue;
      let cur = n;
      let d = 0;
      let guard = 0;
      while (cur && d < R && guard++ < 40) {
        cur.union = Math.max(cur.union, 1 - d / R);
        const nx = cur.children.find((c) => c.order <= cur.order);
        if (!nx) break;
        d += nx.len;
        cur = nx;
      }
    }
  }

  // 前後深度。
  //
  // 側視圖裡沒有 z，但真實的樹枝有一半朝著觀者、一半朝著背面。全部照 nodes
  // 陣列順序畫的話，每一根細枝都會壓在樹幹上——包含那些明明長在樹背面的，
  // 於是樹幹上永遠橫著幾條不該出現的線。
  //
  // 每開一條新軸抽一個深度、軸內共用（同一根枝條不能一半在前一半在後），
  // 並且從母枝的深度出發：從樹幹背面長出來的枝條，它的子枝也在背面。
  // 主幹恆為 0，前後各半。
  assignDepth() {
    this.root.depth = 0;
    for (const n of this.nodes) {
      if (!n.parent) continue;
      if (n.order <= n.parent.order) {
        n.depth = n.parent.depth;
        continue;
      }
      // 每開一條新軸就「明確地」離開母枝的深度，而不是小幅抖動：抖動會讓子枝
      // 停在 0 附近，於是一根枝條的母枝在樹幹後面、子枝卻在前面，看起來像
      // 從樹幹裡穿出來。位移量隨階數遞減——細枝不該再大幅換邊。
      const step = 0.30 + random() * 0.5;
      const dir = random() < 0.5 ? -1 : 1;
      const fall = 1 / (1 + n.order * 0.55);
      n.depth = Math.max(-1, Math.min(1, n.parent.depth + dir * step * fall));
    }
    // 由後往前的繪製順序。深度相同時維持原順序（同一條軸不會被打散）
    const ordered = this.nodes.map((n, i) => [n, i]);
    ordered.sort((a, b) => a[0].depth - b[0].depth || a[1] - b[1]);
    this.drawOrder = ordered.map((e) => e[0]);

    // 🔴 切成數層，每層各自跑完一整條繪製管線。
    // 只有排序是不夠的：渲染是一階段一階段掃過全部節點（填色 → 明暗 → 皮目 →
    // 輪廓線 → 細枝線），所以樹幹的填色在第二階段就畫完了，而樹幹**後面**那些
    // 枝條的輪廓線與細枝線要到第五、六階段才畫——照樣蓋在樹幹上。
    // 排序只在同一階段內有效；跨階段的遮擋要靠分層。
    const NL = 6;
    this.depthBuckets = [];
    for (let i = 0; i < NL; i++) {
      const a = Math.floor((this.drawOrder.length * i) / NL);
      const b = Math.floor((this.drawOrder.length * (i + 1)) / NL);
      this.depthBuckets.push(this.drawOrder.slice(a, b));
    }
  }

  // 樹冠的外接橢圓，給樹冠元素的受光與遮蔽用（見 render.js 的 shadeCanopy）
  assignCanopyBox() {
    let minX = 1e9;
    let maxX = -1e9;
    let minY = 1e9;
    let maxY = -1e9;
    for (const t of this.tips) {
      minX = Math.min(minX, t.x);
      maxX = Math.max(maxX, t.x);
      minY = Math.min(minY, t.y);
      maxY = Math.max(maxY, t.y);
    }
    this.canopy = {
      cx: (minX + maxX) / 2,
      cy: (minY + maxY) / 2,
      rx: Math.max(1, (maxX - minX) / 2),
      ry: Math.max(1, (maxY - minY) / 2),
    };
  }

  // 橫向皮目（Prunus 屬第一辨識特徵）。位置在生成時就算好存進節點——
  // 快路徑每幀重畫，若在畫的時候 random() 皮目會逐幀跳動；用 noise 也不夠，
  // 因為要的是離散的「某些節點有、某些沒有」而不是連續場。
  //
  // 皮目只環繞樹幹的一部分周長，不是整圈的箍。用圓柱角 θ 取樣再投影成
  // t = sin(θ)：同樣的弧長在接近輪廓邊緣時自然被壓縮，這就是曲面透視。
  assignLenticels(P) {
    if (!P.lenticels) return;
    for (const node of this.nodes) {
      node.lent = null;
      if (!node.parent || node.radius < 1.2) continue;
      // 密度要高：真實的櫻皮是「一道接一道」的橫紋，稀疏幾條只會讀成刮痕
      const pick = noise(node.pathLen * 0.75, node.bseed + 21.7);
      if (pick > 0.32 + 0.36 * P.lenticels) continue;
      const arr = [];
      const n = pick < 0.14 ? 3 : pick < 0.26 ? 2 : 1;
      for (let i = 0; i < n; i++) {
        const th0 = (noise(node.pathLen * 0.9 + i * 4.4, node.bseed + 63.1) - 0.5) * 2.6;
        // 短：單一皮目只環繞一小段周長。太長會變成整圈的箍，那是樺木不是櫻
        // 長度差距要大：全部一樣長會排成梯子。真實的皮目從一個點到半圈都有
        const ln = noise(node.pathLen * 1.3 + i * 7.7, node.bseed + 91.5);
        const dth = 0.06 + ln * ln * 0.66;
        // 沿軸散開。範圍要大於一個節段，否則間距跟節點一樣規律＝條碼
        const ax = (noise(node.pathLen * 2.1 + i * 11.3, node.bseed + 5.9) - 0.5) * 2.4;
        arr.push([Math.sin(th0 - dth), Math.sin(th0 + dth), ax]);
      }
      node.lent = arr;
    }
  }

  // 達文西面積守恆（pipe model）：r^n = Σ r_child^n，由末梢往根回推。
  // 人眼辨識「這是一棵樹」最關鍵的單一線索就是這個粗細比例。
  applyPipeModel(P) {
    const n = P.pipeExp;
    const walk = (node) => {
      if (node.children.length === 0) {
        node.radius = P.tipRadius;
        return node.radius;
      }
      let sum = 0;
      for (const c of node.children) {
        const r = walk(c);
        // 沿枝長線性增厚（加法，不是乘法——乘法會沿長鏈複利爆掉）
        sum += Math.pow(r + P.segTaper * c.len, n);
      }
      node.radius = Math.pow(sum, 1 / n);
      return node.radius;
    };
    walk(this.root);
    this.rootRadius = Math.max(this.root.radius, 0.001);
  }

  // 每條軸從基部往末端收分（Weber & Penn 的 Taper）。
  // pipe model 只在「有分枝離開」時才變細，所以一段沒有分枝的長主幹會維持等粗——
  // 這正是樹幹看起來像圓柱的主因。真實樹幹在裸幹段也持續收分（早年落枝留下的痕跡），
  // 所以要在 pipe model 之上再疊一層沿軸的乘法收分。
  applyAxisTaper(P) {
    if (!P.axisTaper) return;
    const starts = this.nodes.filter((n) => !n.parent || n.order > n.parent.order);
    for (const start of starts) {
      const chain = [];
      let cur = start;
      while (cur) {
        chain.push(cur);
        cur = cur.children.find((c) => c.order <= cur.order) || null;
      }
      let total = 0;
      for (let i = 1; i < chain.length; i++) total += chain[i].len;
      if (total <= 0) continue;
      let d = 0;
      for (let i = 0; i < chain.length; i++) {
        if (i > 0) d += chain[i].len;
        chain[i].radius *= 1 - P.axisTaper * (d / total);
      }
    }
    this.rootRadius = Math.max(this.root.radius, 0.001);
  }

  // 🔴 單調收斂：任何一節都不得比它長出來的那一節粗。
  //
  // applyAxisTaper 把每條軸從基部到末端收分 38%，但**每開一條新軸就重置回 1.0**。
  // 於是主幹末端被收掉 38%、從它長出來的側枝卻是全尺寸——接縫處憑空胖一截。
  // 實測 23% 的節點比父節點粗，最嚴重的一處是主幹 17.4 接出 26.7 的側枝。
  //
  // 為什麼是「夾住」而不是「把父節點的收分量繼承給子軸」：繼承會逐階複利
  // （0.62^階數），十階之後末梢細到消失。真實的樹確實是「子枝比母枝細且各自收分」，
  // 但每軸收 38% 這個量體只適合一兩階，不適合複利十階。
  // 夾住則同時滿足兩件事：接縫連續，且不複利。
  //
  // 前提：nodes 陣列保證父節點排在子節點之前（sk.add 一定在 parent 存在後才呼叫）。
  enforceMonotone() {
    for (const n of this.nodes) {
      if (!n.parent) continue;
      if (n.radius > n.parent.radius) n.radius = n.parent.radius;
    }
    this.rootRadius = Math.max(this.root.radius, 0.001);
  }

  // 左右兩側各自的輪廓半徑（rA = 垂直方向的正側，rB = 負側）。
  // 三件事疊在一起，都是「柱子感」的解方：
  //   1. 左右獨立的低頻噪聲 —— 對稱地縮放同一個半徑只會得到平滑的紡錘體
  //   2. 基部外張 + 板根稜 —— 真實根盤是幾條粗細不等的稜夾著凹槽，不是平滑圓錐面
  //   3. 枝領隆起 —— 側枝離開處主幹會鼓起一塊，這是真實的體積而非表面紋理
  applySides(P) {
    for (const node of this.nodes) {
      const soft = Math.min(1, node.radius / 2); // 細枝不做輪廓擾動，1px 上看不出來
      const s = node.pathLen * P.barkScale;
      const na = noise(s, node.bseed);
      const nb = noise(s, node.bseed + 137.7);
      node.rA = node.radius * (1 + (na - 0.5) * 2 * P.barkRough * soft);
      node.rB = node.radius * (1 + (nb - 0.5) * 2 * P.barkRough * soft);
    }
    this.applyFlare(P);
    this.applyCollars(P);
    this.smoothSides();
    // 輪廓也要單調收斂。枝領的隆起是加在「母枝」上的，那是對的；
    // 但幾個側枝的隆起疊在一起、或樹皮噪聲剛好同向時，子節點的輪廓仍可能鼓過母枝。
    // 留 8% 餘裕給枝領與樹皮起伏，超過就等比壓回去
    for (const node of this.nodes) {
      if (!node.parent) continue;
      const mine = (node.rA + node.rB) / 2;
      const cap = ((node.parent.rA + node.parent.rB) / 2) * 1.08;
      if (mine > cap && mine > 0) {
        const k = cap / mine;
        node.rA *= k;
        node.rB *= k;
      }
    }
    for (const node of this.nodes) {
      node.rA = Math.max(node.rA, 0.2);
      node.rB = Math.max(node.rB, 0.2);
    }
    this.rootRadius = Math.max((this.root.rA + this.root.rB) / 2, 0.001);
    this.buildRoots(P);
  }

  // 基部外張（Weber & Penn 1995 §4.4）
  //   y = max(0, 1 − h/zone)；flare = Flare·(100^y − 1)/100 + 1
  // 關鍵在 100^y：外張是指數衰減，在靠近地面的一小段內就收完。線性放大、
  // 或只把 root 節點乘粗，看起來都會像「柱子底下墊了一塊」。
  applyFlare(P) {
    if (!P.flare) return;
    const zone = Math.max(P.trunkLen * 0.16, this.root.radius * 2.6);
    for (const node of this.nodes) {
      if (node.order !== 0) continue; // 只作用於樹幹
      const h = -node.y;
      if (h > zone) continue;
      const y = Math.max(0, 1 - h / zone);
      const amount = (P.flare * (Math.pow(100, y) - 1)) / 100;
      // 板根稜：外張量沿高度用低頻噪聲調變，左右獨立 → 幾條粗細不等的稜
      const ribA = 1 + P.buttress * (noise(h * P.ribFreq, 11.3) - 0.5) * 2;
      const ribB = 1 + P.buttress * (noise(h * P.ribFreq, 71.9) - 0.5) * 2;
      node.rA *= 1 + amount * Math.max(0, ribA);
      node.rB *= 1 + amount * Math.max(0, ribB);
    }
  }

  // 枝領：側枝離開處，母枝在該側鼓起一塊，沿軸向前後衰減
  applyCollars(P) {
    if (!P.collar) return;
    for (const node of this.nodes) {
      for (const child of node.children) {
        if (child.order <= node.order) continue; // 主軸延續沒有明顯枝領
        // 隆起量要克制：真實枝領只鼓起一成多，過大會讓每個分岔變成一顆球
        const bump = Math.min(P.collar * child.radius * 0.35, node.radius * 0.3);
        const span = Math.max(child.radius * 3, node.radius * 1.2);
        const near = child.angle >= 0 ? 'rA' : 'rB';
        const far = child.angle >= 0 ? 'rB' : 'rA';
        // 往母枝上下游各走一段，加上二次衰減的隆起。
        // 枝領實際上是一整圈，只加單側會讓相鄰節點落差過大而戳出尖刺
        for (const dir of [-1, 1]) {
          let cur = node;
          let dist = 0;
          let guard = 0;
          while (cur && dist < span && guard++ < 40) {
            const f = 1 - dist / span;
            cur[near] += bump * f * f;
            cur[far] += bump * f * f * 0.35;
            if (dir < 0) {
              dist += cur.len;
              cur = cur.parent;
            } else {
              const next = cur.children.find((c) => c.order <= cur.order) || null;
              if (!next) break;
              dist += next.len;
              cur = next;
            }
          }
        }
      }
    }
  }

  // 表面根：3–6 條鰭狀根從基部扇出，是「輪廓外張」與「地面陰影」之間缺的中間尺度結構。
  // 沒有它，基部外張只讀成樹幹本身的形變，而不是長出來的構造。
  // 形態依 iForest 板根研究：剖面近三角／鰭狀（近幹端寬厚、遠端窄薄），非圓柱。
  buildRoots(P) {
    if (!P.roots) return;
    const r = this.rootRadius;
    // 樹種尺度：櫻是薄皮小喬木，根領溫和；榕才有那種扇出的板根
    const k = P.rootScale === undefined ? 1 : P.rootScale;
    const n = floor(random(4, 8) * Math.max(0.5, k));
    const roots = [];
    // 角度先分格再抖動，純隨機會擠成一邊
    for (let i = 0; i < n; i++) {
      const side = ((i + 0.5) / n) * 2 - 1; // -1..1
      const dir = side * random(0.8, 1.2); // 往左右扇出，不朝正下方
      roots.push({
        dir,
        // 可見延伸長度＝1.5–3 倍樹幹直徑（更長的部分沒入地下）
        len: r * random(1.1, 2.5) * k,
        // 起始高度：基部以上 0–1 倍樹幹直徑
        rise: r * random(0.22, 0.72) * k,
        w: r * random(0.1, 0.22) * k,
        droop: random(0.5, 1.0),
        seed: random(1000),
      });
    }
    this.roots = roots;

    // 基部碎屑：落葉腐殖層在樹幹基部堆積最厚，成分由近而遠從樹皮碎屑轉為落葉。
    // 作用是打斷樹幹與地面那條乾淨的交界線（繪畫上的反「相切」原則）。
    this.litter = [];
    const spread = r * 2.6;
    for (let i = 0; i < 40; i++) {
      const t = random(-1, 1) * Math.abs(random(-1, 1));
      this.litter.push({
        x: t * spread,
        y: random(-r * 0.14, r * 0.1),
        w: r * random(0.03, 0.085) * (1 - Math.abs(t) * 0.4),
        rot: random(-0.5, 0.5),
        dark: random() < 0.7,
        alpha: random(40, 105) * (1 - Math.abs(t) * 0.6),
      });
    }
  }

  // 沿主軸平滑左右半徑：枝領與板根是逐節點加上去的，不平滑會在相鄰節點間
  // 產生落差，四邊形邊緣互相交叉戳出尖刺
  smoothSides() {
    const idx = new Map(this.nodes.map((n, i) => [n, i]));
    for (let pass = 0; pass < 2; pass++) {
      const a = this.nodes.map((n) => n.rA);
      const b = this.nodes.map((n) => n.rB);
      for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        if (!node.parent) continue;
        const kid = node.children.find((c) => c.order <= node.order);
        if (!kid) continue;
        const p = idx.get(node.parent);
        const k = idx.get(kid);
        node.rA = (a[i] * 2 + a[p] + a[k]) / 4;
        node.rB = (b[i] * 2 + b[p] + b[k]) / 4;
      }
    }
  }

  // 沿路徑相關的噪聲相位：同一枝上的節點擺動連續，不同枝各自獨立
  assignWindPhase() {
    for (const node of this.nodes) {
      node.windPhase = node.pathLen * 0.012 + node.bseed;
    }
  }

  // 共振頻率 f = 2.55·L^(−0.59)（Coder 2000，經 Habel et al. EG2009 引用）。
  // Habel 整篇論文的論點是：決定真實感的是「振動頻譜是否正確」，不是積分器種類——
  // 頻譜對了，查表式運動學與真的積分阻尼諧振子在視覺上等價。
  // 所以擺動的「頻率」要依枝長算出來，不能只調振幅。
  assignResonance(P) {
    // 樹高當作約 10 公尺，把 px 換算成公尺才能套經驗公式
    const pxPerM = Math.max(1, this.treeHeight) / 10;
    // 每個節點到其子樹末端的距離＝該枝條的有效長度
    const walk = (node) => {
      let far = 0;
      for (const c of node.children) far = Math.max(far, c.len + walk(c));
      node.tipDist = far;
      return far;
    };
    walk(this.root);
    for (const node of this.nodes) {
      const Lm = Math.max(0.08, node.tipDist / pxPerM);
      node.freq = 2.55 * Math.pow(Lm, -0.59);
    }
  }

  // 推算世界座標；windAmp = 0 即靜態
  resolve(originX, originY, t, windAmp) {
    const stack = [[this.root, originX, originY, 0]];
    const gust = windAmp > 0 ? gustEnvelope5_3(t) : 0;
    while (stack.length) {
      const [node, px, py, pdir] = stack.pop();
      let a = node.angle;
      if (windAmp > 0 && node.parent) {
        // 細枝比主幹軟，末梢比根部擺得多
        const thin = 1 - Math.min(node.radius / this.rootRadius, 1);
        const along = node.pathLen / this.maxPathLen;
        const flex = thin * along;
        // 噪聲的時間軸依該枝條的共振頻率推進：粗枝慢擺、細枝快抖
        const tt = t * (node.freq || 1) * 0.55;
        a += (noise(node.windPhase, tt) - 0.5) * 2 * windAmp * flex * gust;
      }
      const dir = pdir + a;
      const x = px + Math.cos(dir) * node.len;
      const y = py + Math.sin(dir) * node.len;
      node.x = x;
      node.y = y;
      node.dir = dir;
      for (const c of node.children) stack.push([c, x, y, dir]);
    }
  }
}
