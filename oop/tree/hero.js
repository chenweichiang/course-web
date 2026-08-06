// Hero 背景的驅動：單棵櫻。
//
// ⚠️ 同目錄的 skeleton / presets / recursive / render / light 是從研究專案
// chenweichiang/202608-research-p5-tree 原封不動複製過來的，**請勿在這裡改它們**。
// 要改演算法就回研究專案改，再重新複製（複製指令見 README）。
// 這個檔只做三件事：挑物種、改成適合當背景的配色、決定取景。
//
// 用 p5 全域模式（`new p5()` 不帶參數）跑，因為那些檔案是為全域模式寫的；
// 改成 instance 模式要逐一加 `p.` 前綴，等於分岔出第二份程式碼，日後必然失同步。

/* global PRESETS, growRecursive, renderTree, buildDepthLUT, LIGHT */

const PAPER = [253, 252, 249] // 與 --color-paper 同步

let heroP = null
let heroSk = null
let heroView = { s: 1, tx: 0, ty: 0 }
let heroReduced = false

// 背景用的配色：研究專案的櫻是深樹皮＋飽和花色（那是主角的配色），
// 當背景會壓過文字。這裡把樹皮提到淡墨灰、花壓到極低飽和度——
// 朱印是全站唯一重點色，花不能跟它搶。
function heroParams() {
  const base = PRESETS[0] // 0 = 櫻
  const P = { ...base, leaf: { ...base.leaf } }
  P.trunkLen = height * 0.19
  P.budget = Math.round(base.budget * 0.55)
  P.leafBudget = Math.round(base.leafBudget * 0.55)
  P.curlSeed = random(1000)
  P.curveSide = random() < 0.5 ? 1 : -1
  P.season = 0
  P.bg = PAPER
  // 行動版的文字幾乎滿版、沒有留白區可放樹，只能整體再淡一階
  const narrow = width < 720
  P.bark = narrow ? [206, 201, 195] : [176, 170, 163] // 淡墨灰
  P.leaf = {
    ...P.leaf,
    color: narrow ? [240, 224, 227] : [232, 206, 211], // 極淡櫻色
    alpha: narrow ? 96 : 132,
    gielis: true,
  }
  P.contour = narrow ? 0.35 : 0.7
  P.canopyAO = narrow ? 0.25 : 0.5
  return P
}

// 依骨架實際範圍取景。單棵樹要留白，不能塞滿——
// 這是背景，構圖上它是配角。
function heroFit(P, sk) {
  sk.resolve(0, 0, 0, 0)
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  const margin = P.leaf ? P.leaf.spread + P.leaf.size : 2
  for (const n of sk.nodes) {
    const m = n.children.length === 0 ? margin : n.radius
    minX = Math.min(minX, n.x - m)
    maxX = Math.max(maxX, n.x + m)
    minY = Math.min(minY, n.y - m)
    maxY = Math.max(maxY, n.y + m)
  }
  const bw = Math.max(maxX - minX, 1)
  const bh = Math.max(maxY - minY, 1)
  const narrow = width < 720
  // 樹高佔畫面的比例；手機留更多空間給文字
  const fit = Math.min((width * (narrow ? 0.92 : 0.62)) / bw, (height * (narrow ? 0.5 : 0.86)) / bh, 1.4)
  // 橫向落點：桌機偏右（左邊是正文），手機置中偏右
  const cx = width * (narrow ? 0.62 : 0.72)
  heroView.s = fit
  heroView.tx = cx - ((minX + maxX) / 2) * fit
  heroView.ty = height * 0.985 - maxY * fit
}

function heroBuild() {
  // 每次載入換一個 seed：同一個類別、同一組櫻的參數，
  // 每次實例化長出來的都不一樣——這正是這門課的核心隱喻，
  // 讓它在頁面上真的發生，而不是只寫在文案裡。
  const seed = Math.floor(Math.random() * 1e9)
  randomSeed(seed)
  noiseSeed(seed)
  buildDepthLUT(PAPER)
  const P = heroParams()
  heroSk = growRecursive(P)
  heroSk.P = P
  heroFit(P, heroSk)
}

function setup() {
  const host = document.getElementById('hero-sketch')
  const c = createCanvas(host.offsetWidth, host.offsetHeight)
  c.parent(host)
  pixelDensity(Math.min(window.devicePixelRatio || 1, 2))
  heroReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  heroBuild()
  if (heroReduced) {
    noLoop()
    redraw() // noLoop 之後 p5 不會自動跑 draw，要顯式呼叫才有畫面
  }
}

function draw() {
  background(PAPER[0], PAPER[1], PAPER[2])
  if (!heroSk) return
  const P = heroSk.P
  heroSk.resolve(0, 0, frameCount * 0.006, heroReduced ? 0 : P.windAmp * 0.7)
  push()
  translate(heroView.tx, heroView.ty)
  scale(heroView.s)
  renderTree(window, heroSk, P, false)
  pop()
}

function windowResized() {
  const host = document.getElementById('hero-sketch')
  if (!host) return
  resizeCanvas(host.offsetWidth, host.offsetHeight)
  heroBuild()
  if (heroReduced) redraw()
}
