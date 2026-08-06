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

// 登場：由下往上一塊一塊掀開。
// 做法是「蓋住尚未輪到的橫帶」，不是重寫渲染——public/tree/ 的檔案不能改，
// 而且樹本來就整棵畫好了，遮罩比逐節點播放便宜得多，風也照吹。
const REVEAL_BANDS = 12
const REVEAL_STAGGER = 110 // ms，每塊之間的間隔
// 單塊淡入要比間隔短：長於間隔會有兩三塊同時在變，前緣糊成一道漸層，
// 看起來像抹除而不是一塊一塊。短於間隔則同時只有一塊在動，界線讀得出來
const REVEAL_FADE = 90
let heroReveal = { active: false, t0: 0, top: 0 }

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
  // 掀開的範圍：樹冠頂端到畫布底（底部要含地面與落葉，那些節點不在 bbox 裡）
  heroReveal.top = heroView.ty + minY * fit
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
  } else {
    heroReveal.active = true
    heroReveal.t0 = millis()
  }
}

// 蓋住尚未輪到的橫帶。邊界取整數並讓相鄰兩帶共用同一條界線——
// 若各自 round 會差半像素：留縫會露出樹的一條線，重疊則因為半透明疊加
// 在接縫處變得更不透明，兩種都會在動畫中看見水平條紋。
function drawReveal() {
  const el = millis() - heroReveal.t0
  if (el >= REVEAL_STAGGER * (REVEAL_BANDS - 1) + REVEAL_FADE) {
    heroReveal.active = false
    return
  }
  const top = heroReveal.top
  const bh = (height - top) / REVEAL_BANDS
  push()
  noStroke()
  let y1 = height // 由下往上：k = 0 是最底下那塊
  for (let k = 0; k < REVEAL_BANDS; k++) {
    const y0 = Math.round(height - (k + 1) * bh)
    const a = Math.min(1, Math.max(0, (el - k * REVEAL_STAGGER) / REVEAL_FADE))
    if (a < 1) {
      const e = a * a * (3 - 2 * a) // smoothstep：線性淡入的頭尾會看到硬切
      fill(PAPER[0], PAPER[1], PAPER[2], 255 * (1 - e))
      rect(0, y0, width, y1 - y0)
    }
    y1 = y0
  }
  pop()
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
  if (heroReveal.active) drawReveal()
}

function windowResized() {
  const host = document.getElementById('hero-sketch')
  if (!host) return
  resizeCanvas(host.offsetWidth, host.offsetHeight)
  heroBuild()
  if (heroReduced) redraw()
}
