// 樹種預設
//
// ez-tree 星數遠勝 proctree.js 的主因之一就是有 preset：15+ 個抽象參數盲調
// 很難得到可信的樹形。這裡把參數收成五組具名樹種，數字鍵切換。
//
// 單位注意：curl 與 tropismK 是「每 px 枝長的轉角（弧度）」，會乘上 stepLen。

const BASE = {
  // 骨架
  trunkFrac: 0.24,     // 主幹長度佔畫面高度
  stepLen: 9,          // 每段折線長度（越小越平滑、節點越多）
  curl: 0.006,         // 噪聲曲率（rad/px）
  curlScale: 0.030,    // 噪聲取樣尺度（越小彎曲越舒緩）
  tropismDir: -Math.PI / 2, // 向性目標方向（-π/2 = 向上）
  tropismK: 0.004,     // 向性強度（rad/px）
  tropismFromOrder: 0, // 從第幾階起套用 tropismDir，之前一律向上
  apical: 0.45,        // 頂端優勢：主幹延續主軸的機率
  apicalLateral: 0.35, // 側枝延續主軸的機率（通常遠低於主幹）
  axisDecay: 0.90,     // 主軸延續的長度衰減
  forkAngle: 0.42,     // 分叉張角
  forkDecay: 0.76,
  trifurcate: 0.18,    // 分三叉的機率
  lateralAngle: 0.85,  // 側枝張角
  lateralRate: 0.010,  // 每 px 枝長冒出側枝的機率
  lateralDecay: 0.52,
  lateralStart: 0.25,  // 枝條前 25% 不長側枝
  angleJitter: 0.28,
  maxOrder: 10,
  minLen: 8,
  budget: 9000,
  leafBudget: 6000,

  // 粗細（達文西 pipe model）
  pipeExp: 2.2,
  tipRadius: 0.5,
  segTaper: 0.012,

  // 樹幹形態（見 docs/RESEARCH.md 第五節）
  axisTaper: 0.38,     // 每條軸從基部到末端的收分比例（Weber-Penn Taper）
  flare: 1.0,          // 基部外張倍率（Weber-Penn Flare，指數衰減）
  buttress: 0.55,      // 板根稜的起伏深度：0 = 平滑圓錐面，愈大稜溝愈明顯
  ribFreq: 0.018,      // 板根稜沿高度的頻率：太高會變成瓦楞，要是幾個寬隆起
  barkRough: 0.085,    // 輪廓左右不對稱擾動幅度（相對半徑）
  barkScale: 0.022,    // 輪廓噪聲沿枝長的取樣尺度
  collar: 0.5,         // 枝領隆起量（相對側枝半徑）
  rootScale: 1,        // 表面根的整體尺度（櫻這種薄皮小喬木要調小）
  lenticels: 0,        // 橫向皮目密度（Prunus 屬特徵；0 = 改畫縱紋）
  gloss: 0,            // 樹皮光澤：0 = 霧面，1 = 光滑反光
  trunkCurve: 0.30,    // 樹幹前半段彎曲總角度（弧度）
  trunkCurveBack: 0.42, // 後半段反向彎曲，形成 S 形
  trunkStepScale: 0.5, // 樹幹分段細度（相對 stepLen）
  trunkUpright: 0.010, // 主幹回正強度（rad/px），與側枝向性分開
  trunkCurlScale: 0.4, // 主幹的噪聲曲率折減（隨機漫步在長主幹上會累積成歪倒）
  roots: true,         // 基部表面根（鰭狀）與碎屑帶
  contour: 1,          // 輪廓線風格化強度（樹林模式會依深度遞減）
  canopyAO: 1,         // 樹冠體積遮蔽（Hegeman 球殼近似的 2D 版）
  season: 0,           // 0=夏 1=深秋（葉綠素分解進度）
  bloom: 0,            // 花期相位：1 = 只有花沒有葉，0 = 只有葉。需要 flower 才有作用
  flower: null,        // 花的外觀（與 leaf 分開的第二個通道）
  cluster: null,       // 花序：長花柄 + 一節多朵。null = 沿末梢灑點（原行為）

  // 外觀
  bg: [244, 241, 234],
  bark: [58, 48, 40],
  windAmp: 0.030,

  // space colonization 樹冠
  crownW: 0.62,        // 佔畫面寬
  crownH: 0.48,        // 佔畫面高
  crownY: 0.37,        // 樹冠中心離畫面頂端的比例（越大樹冠越低、裸幹越短）
  attractors: 700,
  influence: 130,
  killDist: 15,
  scStep: 8,

  leaf: {
    shape: 'blob',
    color: [96, 122, 78],
    size: 7,
    clump: 6,
    spread: 11,
    alpha: 165,
  },
};

const PRESETS = [
  {
    ...BASE,
    name: '櫻',
    // 合軸分枝：主軸不延續，反覆分叉成開展的傘形樹冠。
    // 物種特徵的依據全部在 docs/SAKURA_REALISM.md，動這一組之前先讀。
    apical: 0.18,
    apicalLateral: 0.20,
    forkAngle: 0.50,
    forkDecay: 0.79,
    trifurcate: 0.25,
    curl: 0.008,
    lateralRate: 0.008,
    trunkFrac: 0.19,
    maxOrder: 11,
    // 花是全畫面數量最多的圖元，一朵要一組頂點呼叫；6000 朵時光是花就吃掉
    // 19.6ms／幀。樹冠的視覺密度在四千朵左右就飽和了
    leafBudget: 4200,

    // 樹皮：「光滑、有光澤的紅褐色，帶明顯橫向皮目；樹皮薄而易損」
    // ——所以粗糙度趨近零、板根稜幾乎沒有、紋理方向是橫的不是縱的。
    bark: [82, 51, 45], // 深紅褐／桃花心木（仍是 Prunus 的紅棕調，只是壓暗）
    barkRough: 0.018,
    lenticels: 1,
    gloss: 1,
    flare: 0.78,
    buttress: 0.05, // 櫻不是榕
    contour: 0.55, // 光滑樹皮不該有粗黑的輪廓線
    rootScale: 0.55,

    // 花與葉是兩個通道。染井吉野開花時無葉 → 預設 bloom = 1
    bloom: 1,
    flower: {
      color: [238, 178, 198],
      throat: [206, 122, 152], // 花心較深，花瓣邊緣較淡
      stamen: [250, 226, 150],
      size: 8,
      spread: 6.5,
      alpha: 176,
      petals: 5,
      notch: 0.088, // 花瓣先端的切口深度；再深就讀成情人節愛心（sakura-idle 實測）
    },
    // 花柄長、一節 3–5 朵成簇下垂——這是櫻 vs 梅（無花柄）vs 桃（短柄兩朵）的判準
    cluster: { pedicel: 12, count: [3, 5], droop: 0.8, jitter: 0.5, stem: [132, 116, 94] },

    // 葉：互生、卵形至披針形、鋸齒緣、先端漸尖
    leaf: {
      shape: 'ovate', // 卵形至披針形、先端漸尖——Gielis 那一族做不出來，見 recursive.js
      color: [104, 132, 84],
      size: 11,
      clump: 5,
      spread: 11,
      alpha: 172,
      serrate: 0.055,
      teeth: 26,
      vein: 1,
    },
  },
  {
    ...BASE,
    name: '松',
    // 單軸分枝：主幹貫通到頂，側枝近水平層層輪生成扁平枝盤
    flare: 1.25,
    buttress: 0.6,
    barkRough: 0.11,
    trunkCurve: 0.22,
    trunkCurveBack: 0.30,
    apical: 0.94,
    apicalLateral: 0.22,
    axisDecay: 0.93,
    forkAngle: 0.46,
    lateralAngle: 1.35,
    lateralRate: 0.018,
    lateralDecay: 0.42,
    lateralStart: 0.45,
    curl: 0.004,
    tropismK: 0.003,
    trunkFrac: 0.30,
    pipeExp: 2.4,
    segTaper: 0.010,
    bark: [72, 56, 44],
    maxOrder: 9,
    leaf: { shape: 'needle', color: [64, 94, 66], size: 11, clump: 10, spread: 8, alpha: 175 },
  },
  {
    ...BASE,
    name: '榕',
    // 濃密開展：側枝多、樹冠寬、主幹粗（pipeExp 小 → 父枝更粗）
    flare: 2.3,
    buttress: 0.8,
    ribFreq: 0.022,
    barkRough: 0.10,
    collar: 0.7,
    apical: 0.40,
    forkAngle: 0.56,
    forkDecay: 0.80,
    lateralRate: 0.019,
    lateralAngle: 1.00,
    lateralDecay: 0.50,
    trunkFrac: 0.16,
    pipeExp: 2.05,
    segTaper: 0.013,
    curl: 0.008,
    maxOrder: 11,
    budget: 11000,
    crownW: 0.78,
    crownH: 0.40,
    attractors: 850,
    bark: [66, 54, 45],
    leaf: { shape: 'blob', color: [74, 106, 66], size: 6, clump: 8, spread: 12, alpha: 175, m: 2, n1: 0.6, n2: 1.1, n3: 2.2 }, // 卵形（榕）
  },
  {
    ...BASE,
    name: '柳',
    // 下垂：側枝向性目標朝下，長而細軟
    flare: 1.0,
    buttress: 0.5,
    barkRough: 0.08,
    apical: 0.72,
    apicalLateral: 0.45,
    tropismDir: Math.PI / 2,
    tropismFromOrder: 2,
    tropismK: 0.022,
    lateralAngle: 0.60,
    lateralRate: 0.020,
    lateralDecay: 0.55,
    forkAngle: 0.35,
    curl: 0.005,
    trunkFrac: 0.30,
    stepLen: 8,
    pipeExp: 2.6,
    tipRadius: 0.32,
    segTaper: 0.003,
    maxOrder: 9,
    windAmp: 0.055,
    crownH: 0.46,
    bark: [78, 68, 52],
    leaf: { shape: 'needle', color: [122, 142, 78], size: 7, clump: 5, spread: 10, alpha: 140 },
  },
  {
    ...BASE,
    name: '枯木',
    // 無葉、扭曲、稀疏：純看骨架與 taper
    flare: 1.15,
    buttress: 0.7,
    barkRough: 0.15,
    collar: 0.75,
    trunkCurve: 0.40,
    trunkCurveBack: 0.55,
    apical: 0.35,
    curl: 0.016,
    curlScale: 0.055,
    angleJitter: 0.55,
    forkAngle: 0.60,
    forkDecay: 0.74,
    lateralRate: 0.007,
    trifurcate: 0.30,
    tropismK: 0.003,
    trunkFrac: 0.24,
    maxOrder: 9,
    budget: 6500,
    bark: [92, 84, 74],
    bg: [238, 235, 228],
    windAmp: 0.016,
    crownW: 0.55,
    attractors: 520,
    leaf: null,
  },
];
