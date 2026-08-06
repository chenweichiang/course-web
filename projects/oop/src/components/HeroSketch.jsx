import { useEffect, useRef } from 'react'

// Hero 背景：程序化生成的樹林。
//
// 為什麼是這個：這門課的核心隱喻是「class ＝ 物種、繼承 ＝ 演化」，而一棵樹正好是
// 那個隱喻最短的示範——同一個 Tree 類別，換一組 SPECIES 參數就長成不同的樹。
// 底下的 Node / Skeleton / SPECIES 是刻意寫給學生讀的：
//   Node     ＝ 最小單位（存「相對父節點」的長度與角度，不是世界座標）
//   Skeleton ＝ 一棵樹（負責把節點組起來、算粗細、每幀推算世界座標）
//   SPECIES  ＝ 物種參數表（同一套演算法，不同的長法）
//
// 演算法依據見 chenweichiang/202608-research-p5-tree（達文西 pipe model、
// Weber-Penn 的指數基部外張、每軸沿長度收分、風擺沿枝條累積傳遞）。
//
// 視覺紀律：這是背景不是主角——全域淡墨灰、遠景溶進紙色，朱紅留給頁面本身。
// 效能：遠景一次畫進 buffer 不重畫，只有最近兩棵跟著風動；
// 離開視窗暫停；prefers-reduced-motion 只畫一幀。

const PAPER = [253, 252, 249] // 與 --color-paper 同步
const INK = [26, 25, 23] // 與 --color-ink 同步

export default function HeroSketch() {
  const hostRef = useRef(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    let instance = null
    let observer = null
    let cancelled = false

    import('p5').then(({ default: p5 }) => {
      if (cancelled) return
      p5.disableFriendlyErrors = true
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const sketch = (p) => {
        // ── 資料結構 ───────────────────────────────────────────────
        // 節點存的是「相對父節點」的幾何，世界座標每幀由 resolve() 推算。
        // 這樣風擺才能沿著枝條累積：子枝繼承父枝的擺動，末梢自然擺得最大。
        class Node {
          constructor(parent, len, angle, order) {
            this.parent = parent
            this.children = []
            this.len = len
            this.angle = angle
            this.order = order
            this.pathLen = parent ? parent.pathLen + len : 0
            this.r = 0 // 結構半徑
            this.rA = 0 // 左右各自的輪廓半徑：對稱縮放同一個半徑只會得到紡錘體
            this.rB = 0
            this.x = 0
            this.y = 0
          }
        }

        class Skeleton {
          constructor() {
            this.root = new Node(null, 0, -p.HALF_PI, 0)
            this.nodes = [this.root]
          }

          add(parent, len, angle, order) {
            const n = new Node(parent, len, angle, order)
            parent.children.push(n)
            this.nodes.push(n)
            return n
          }

          // 達文西 pipe model：r^n = Σ r_child^n，由末梢往根回推。
          // 研究證實這個粗細比例是人眼辨識「這是一棵樹」最關鍵的單一線索。
          pipeModel(S) {
            const walk = (node) => {
              if (!node.children.length) {
                node.r = S.tipR
                return node.r
              }
              let sum = 0
              for (const c of node.children) {
                // 沿枝長線性增厚（加法；乘法會沿長鏈複利爆掉）
                sum += Math.pow(walk(c) + S.segTaper * c.len, S.pipeExp)
              }
              node.r = Math.pow(sum, 1 / S.pipeExp)
              return node.r
            }
            walk(this.root)
          }

          // 每條軸從基部往末端收分（Weber-Penn 的 Taper）。
          // pipe model 只在有分枝離開時才變細，所以一段沒分枝的長主幹會維持等粗——
          // 那正是樹幹看起來像圓柱的主因。
          axisTaper(S) {
            const starts = this.nodes.filter((n) => !n.parent || n.order > n.parent.order)
            for (const start of starts) {
              const chain = []
              let cur = start
              while (cur) {
                chain.push(cur)
                cur = cur.children.find((c) => c.order <= cur.order) || null
              }
              let total = 0
              for (let i = 1; i < chain.length; i++) total += chain[i].len
              if (total <= 0) continue
              let d = 0
              for (let i = 0; i < chain.length; i++) {
                if (i > 0) d += chain[i].len
                chain[i].r *= 1 - S.axisTaper * (d / total)
              }
            }
          }

          // 左右輪廓：低頻噪聲各自擾動，再加基部外張。
          // 基部外張是指數衰減（Weber-Penn）：在靠近地面的一小段內就收完，
          // 線性放大會像「柱子底下墊了一塊」。
          silhouette(S) {
            this.resolve(0, 0)
            for (const n of this.nodes) {
              const soft = Math.min(1, n.r / 2)
              const s = n.pathLen * 0.022
              n.rA = n.r * (1 + (p.noise(s, n.order * 3.1) - 0.5) * 0.16 * soft)
              n.rB = n.r * (1 + (p.noise(s, n.order * 3.1 + 137.7) - 0.5) * 0.16 * soft)
            }
            const zone = Math.max(S.trunkLen * 0.16, this.root.r * 2.6)
            for (const n of this.nodes) {
              if (n.order !== 0) continue
              const h = -n.y
              if (h > zone) continue
              const y = Math.max(0, 1 - h / zone)
              const amount = (S.flare * (Math.pow(100, y) - 1)) / 100
              n.rA *= 1 + amount
              n.rB *= 1 + amount
            }
            // 平滑：外張是逐節點加的，不平滑會在相鄰節點戳出尖刺
            for (let pass = 0; pass < 2; pass++) {
              const a = this.nodes.map((n) => n.rA)
              const b = this.nodes.map((n) => n.rB)
              this.nodes.forEach((n, i) => {
                if (!n.parent) return
                const kid = n.children.find((c) => c.order <= n.order)
                if (!kid) return
                const pi = this.nodes.indexOf(n.parent)
                const ki = this.nodes.indexOf(kid)
                n.rA = (a[i] * 2 + a[pi] + a[ki]) / 4
                n.rB = (b[i] * 2 + b[pi] + b[ki]) / 4
              })
            }
            this.rootR = Math.max((this.root.rA + this.root.rB) / 2, 0.001)
          }

          // 共振頻率 f = 2.55·L^(−0.59)（Coder 2000）：粗枝慢擺、細枝快抖。
          // 決定真實感的是頻譜對不對，不是有沒有做物理積分。
          resonance() {
            const walk = (n) => {
              let far = 0
              for (const c of n.children) far = Math.max(far, c.len + walk(c))
              n.tipDist = far
              return far
            }
            walk(this.root)
            const h = Math.max(1, -Math.min(...this.nodes.map((n) => n.y)))
            for (const n of this.nodes) {
              n.freq = 2.55 * Math.pow(Math.max(0.08, n.tipDist / (h / 10)), -0.59)
            }
          }

          resolve(t, windAmp) {
            const stack = [[this.root, 0, 0, 0]]
            while (stack.length) {
              const [n, px, py, pdir] = stack.pop()
              let a = n.angle
              if (windAmp > 0 && n.parent) {
                const thin = 1 - Math.min(n.r / (this.rootR || 1), 1)
                const flex = thin * (n.pathLen / 400)
                a += (p.noise(n.pathLen * 0.012 + n.order * 7.3, t * (n.freq || 1) * 0.55) - 0.5) * 2 * windAmp * flex
              }
              const dir = pdir + a
              const x = px + Math.cos(dir) * n.len
              const y = py + Math.sin(dir) * n.len
              n.x = x
              n.y = y
              for (const c of n.children) stack.push([c, x, y, dir])
            }
          }
        }

        // ── 物種：同一套演算法，換一組參數就長成不同的樹 ───────────────
        const SPECIES = [
          { name: '合軸', apical: 0.2, apicalLat: 0.2, forkAngle: 0.5, forkDecay: 0.79, curl: 0.008, trunkFrac: 0.2, latRate: 0.008 },
          { name: '單軸', apical: 0.92, apicalLat: 0.22, forkAngle: 0.46, forkDecay: 0.76, curl: 0.004, trunkFrac: 0.3, latRate: 0.016, latAngle: 1.3 },
          { name: '開展', apical: 0.4, apicalLat: 0.3, forkAngle: 0.56, forkDecay: 0.8, curl: 0.008, trunkFrac: 0.18, latRate: 0.018 },
          { name: '扭曲', apical: 0.35, apicalLat: 0.3, forkAngle: 0.6, forkDecay: 0.74, curl: 0.016, trunkFrac: 0.24, latRate: 0.007, jitter: 0.55 },
        ]
        const BASE = {
          stepLen: 10,
          curlScale: 0.03,
          trunkUpright: 0.01,
          trunkCurlScale: 0.4,
          tropismK: 0.004,
          axisDecay: 0.9,
          trifurcate: 0.2,
          latAngle: 0.85,
          latDecay: 0.52,
          latStart: 0.25,
          jitter: 0.28,
          maxOrder: 9,
          minLen: 10,
          budget: 900,
          pipeExp: 2.2,
          tipR: 0.5,
          segTaper: 0.012,
          axisTaper: 0.38,
          flare: 1.0,
          trunkCurve: 0.3,
          trunkCurveBack: 0.42,
        }

        // ── 生成 ───────────────────────────────────────────────────
        function growAxis(sk, S, parent, pdir, turn0, len, order, x0, y0) {
          if (len < S.minLen || order > S.maxOrder || sk.nodes.length > S.budget) return
          const step = order === 0 ? S.stepLen * 0.5 : S.stepLen
          const steps = Math.max(2, Math.round(len / step))
          const sl = len / steps
          let dir = pdir + turn0
          let pending = turn0
          let node = parent
          let x = x0
          let y = y0
          for (let i = 0; i < steps; i++) {
            const nz = p.noise(node.pathLen * S.curlScale + S.seed, S.seed * 0.37)
            const curl = S.curl * (order === 0 ? S.trunkCurlScale : 1)
            let turn = (nz - 0.5) * 2 * curl * sl
            const k = order === 0 ? S.trunkUpright : S.tropismK
            turn += Math.sin(-p.HALF_PI - dir) * k * sl
            // 樹幹 S 形（Weber-Penn 的 Curve / CurveBack）：完全筆直會被看成幾何體
            if (order === 0) {
              const amount = i >= steps / 2 ? -S.trunkCurveBack : S.trunkCurve
              turn += (amount * S.side) / (steps / 2)
            }
            dir += turn
            x += Math.cos(dir) * sl
            y += Math.sin(dir) * sl
            if (y > 0 && order > 0) return
            node = sk.add(node, sl, pending + turn, order)
            pending = 0
            const t = (i + 1) / steps
            if (t > S.latStart && order < S.maxOrder && p.random() < S.latRate * sl && sk.nodes.length < S.budget) {
              const side = p.random() < 0.5 ? 1 : -1
              growAxis(sk, S, node, dir, side * (S.latAngle + (p.random() - 0.5) * S.jitter), len * S.latDecay * (0.65 + 0.7 * p.random()), order + 1, x, y)
            }
          }
          if (sk.nodes.length > S.budget) return
          // 頂端優勢決定延續主軸或分叉；側枝的優勢遠低於主幹，
          // 否則整棵樹會變成一束不分岔的長弧
          const apical = order === 0 ? S.apical : S.apicalLat
          if (p.random() < apical) {
            growAxis(sk, S, node, dir, (p.random() - 0.5) * 0.25, len * S.axisDecay, order, x, y)
          } else {
            const nf = p.random() < S.trifurcate ? 3 : 2
            // 優勢枝隨機挑一支：固定挑同一側，偏斜會沿每次分叉累積成整棵樹倒向一邊
            const dom = Math.floor(p.random(nf))
            for (let i = 0; i < nf; i++) {
              const spread = nf === 1 ? 0 : (i / (nf - 1)) * 2 - 1
              const a = spread * S.forkAngle + (p.random() - 0.5) * S.jitter
              growAxis(sk, S, node, dir, a, len * S.forkDecay * (i === dom ? 1 : 0.72) * (0.85 + 0.3 * p.random()), order + 1, x, y)
            }
          }
        }

        function grow(S) {
          const sk = new Skeleton()
          growAxis(sk, S, sk.root, -p.HALF_PI, 0, S.trunkLen, 0, 0, 0)
          sk.pipeModel(S)
          sk.axisTaper(S)
          sk.silhouette(S)
          sk.resonance()
          return sk
        }

        // ── 渲染 ───────────────────────────────────────────────────
        // 相鄰枝段共用節點的邊緣點（斜接）。若每段各自算垂直向量，
        // 同一節點的兩條邊不對齊，彎曲處會裂出楔形縫隙，基部外張處尤其明顯。
        function perps(sk) {
          for (const n of sk.nodes) {
            let ax
            let ay
            if (n.parent) {
              ax = n.x - n.parent.x
              ay = n.y - n.parent.y
            } else {
              const c = n.children[0]
              ax = c ? c.x - n.x : 0
              ay = c ? c.y - n.y : -1
            }
            let m = Math.hypot(ax, ay) || 1
            ax /= m
            ay /= m
            const kid = n.children.find((c) => c.order <= n.order) || n.children[0]
            let bx = ax
            let by = ay
            if (kid) {
              bx = kid.x - n.x
              by = kid.y - n.y
              const m2 = Math.hypot(bx, by) || 1
              bx /= m2
              by /= m2
            }
            let sx = ax + bx
            let sy = ay + by
            const ms = Math.hypot(sx, sy)
            if (ms > 1e-6) {
              sx /= ms
              sy /= ms
            }
            n.px = -sy
            n.py = sx
          }
        }

        const off = (n, t) => (t >= 0 ? n.rA * t : n.rB * t)

        function quad(g, a, b, t0, t1, grow) {
          const f = b.order > a.order ? b : a
          const e = grow || 0
          const o = (n, t) => off(n, t) + (t >= 0 ? e : -e)
          g.beginShape()
          g.vertex(a.x + f.px * o(a, t1), a.y + f.py * o(a, t1))
          g.vertex(b.x + b.px * o(b, t1), b.y + b.py * o(b, t1))
          g.vertex(b.x + b.px * o(b, t0), b.y + b.py * o(b, t0))
          g.vertex(a.x + f.px * o(a, t0), a.y + f.py * o(a, t0))
          g.endShape(g.CLOSE)
        }

        // 色塊由兩層錯位半透明形狀疊出，不是單層精確填色。
        // 單層填色在資料模型上就是向量圖——人眼判讀「畫出來的」靠的是
        // 層與層邊界的不對齊，不是漸層做得多細。
        const LAYERS = [
          { dx: 0, dy: 0, a: 255, grow: 0 },
          { dx: -0.9, dy: 0.9, a: 70, grow: -0.35 },
        ]

        function drawTree(g, tr) {
          const sk = tr.sk
          perps(sk)
          g.push()
          g.translate(tr.x, tr.y)
          g.scale(tr.s)
          g.noStroke()

          // 邊緣加深：填色之下先鋪一圈略粗的深色（canvas 沒有原生卷積，這是最便宜的近似）
          g.fill(tr.col[0] * 0.955, tr.col[1] * 0.955, tr.col[2] * 0.955, 90)
          for (const n of sk.nodes) {
            if (!n.parent || n.r < 1.1) continue
            quad(g, n.parent, n, -1, 1, 0.7)
          }

          for (const L of LAYERS) {
            g.push()
            g.translate(L.dx, L.dy)
            g.fill(tr.col[0], tr.col[1], tr.col[2], L.a)
            for (const n of sk.nodes) {
              if (!n.parent || n.r < 1.1) continue
              quad(g, n.parent, n, -1, 1, L.grow)
              if (n.r > 2 && n.children.length > 1) g.ellipse(n.x, n.y, n.r * 2, n.r * 2)
            }
            g.pop()
          }

          // 受光側：晨光自左上，暗側留給右下
          g.fill(tr.col[0] * 0.93, tr.col[1] * 0.93, tr.col[2] * 0.95, 70)
          for (const n of sk.nodes) {
            if (!n.parent || n.r < 2.4) continue
            quad(g, n.parent, n, 0.3, 1)
          }

          // 細枝：線段（視覺等價但便宜得多）
          g.noFill()
          g.stroke(tr.col[0], tr.col[1], tr.col[2], 225)
          g.strokeCap(g.ROUND)
          let last = -1
          for (const n of sk.nodes) {
            if (!n.parent || n.r >= 1.1) continue
            const w = Math.max(0.35, Math.round(n.r * 4) / 4)
            if (w !== last) {
              g.strokeWeight(w)
              last = w
            }
            g.line(n.parent.x, n.parent.y, n.x, n.y)
          }
          g.noStroke()

          // 地面線以下切平，再補一道柔邊接觸陰影。
          // 陰影要畫在切平之後：畫在之前會被地面線切掉下半部，留下硬邊。
          g.fill(...PAPER)
          g.rect(-1e4, 0, 2e4, 1e4)
          const rr = Math.min(sk.rootR, 60)
          const ctx = g.drawingContext
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, rr * 2.4)
          const c = tr.col.map((v) => Math.round(v))
          grad.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},0.28)`)
          grad.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`)
          ctx.save()
          ctx.scale(1, 0.26)
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(0, 0, rr * 2.4, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
          g.pop()
        }

        // ── 場景 ───────────────────────────────────────────────────
        let trees = []
        let buffer = null

        function build() {
          p.randomSeed(20260807)
          p.noiseSeed(20260807)
          trees = []
          const count = p.width < 720 ? 5 : 9
          const slots = [...Array(count).keys()]
          for (let i = slots.length - 1; i > 0; i--) {
            const j = Math.floor(p.random(i + 1))
            ;[slots[i], slots[j]] = [slots[j], slots[i]]
          }
          for (let i = 0; i < count; i++) {
            // 深度分層：遠的小、地平線高、顏色溶進紙色
            // 深度不從 0 起算：最近的樹也要留一點距離，否則會有巨大樹幹壓在文字上
            const d = p.constrain(0.14 + ((i + 0.5) / count) * 0.86 + p.random(-0.4, 0.4) / count, 0, 1)
            const base = SPECIES[Math.floor(p.random(SPECIES.length))]
            const S = { ...BASE, ...base }
            S.trunkLen = p.height * S.trunkFrac
            S.seed = p.random(1000)
            S.side = p.random() < 0.5 ? 1 : -1
            S.minLen = BASE.minLen * (1 + 2.2 * d)
            S.stepLen = BASE.stepLen * (1 + 1.5 * d)
            S.budget = Math.round(BASE.budget * (1 - 0.55 * d))
            const sk = grow(S)
            if (sk.nodes.length < 6) continue
            const top = -Math.min(...sk.nodes.map((n) => n.y))
            const target = p.height * (0.6 - 0.4 * d) * p.random(0.85, 1.15)
            // 大氣透視：淡墨灰往紙色靠，這是最強的深度線索
            const mix = 1 - Math.exp(-2.0 * Math.pow(d, 1.25))
            // 大面積色塊必須比原本的 flocking 墨點更淡：那些是 2px 的點，
            // 這是整棵樹的量體，同樣的灰階會直接壓過文字
            // 行動版的文字密度更高、樹的相對面積更大，再淡一階
            const g0 = p.width < 720 ? 218 : 206
            const ink = [g0, g0 - 2, g0 - 8]
            trees.push({
              sk,
              d,
              s: target / Math.max(top, 1),
              x: ((slots[i] + 0.5) / count + p.random(-0.6, 0.6) / count) * p.width * 1.2 - p.width * 0.1,
              y: p.height * (0.99 - 0.3 * d),
              col: ink.map((v, k) => v + (PAPER[k] - v) * mix * 0.9),
              live: false,
            })
          }
          trees.sort((a, b) => b.d - a.d) // 由遠到近畫
          // 只有最近兩棵跟著風動，其餘一次畫進 buffer 不重畫
          for (let i = trees.length - 1; i >= 0 && i >= trees.length - 2; i--) trees[i].live = true
          bake()
        }

        function bake() {
          buffer = p.createGraphics(p.width, p.height)
          buffer.clear()
          for (const tr of trees) {
            if (tr.live) continue
            tr.sk.resolve(0, 0)
            drawTree(buffer, tr)
          }
        }

        p.setup = () => {
          p.createCanvas(host.offsetWidth, host.offsetHeight)
          p.pixelDensity(Math.min(window.devicePixelRatio || 1, 2))
          build()
          // noLoop() 之後 p5 不會自動跑 draw()，要顯式 redraw 一次才有畫面
          if (reduced) {
            p.noLoop()
            p.redraw()
          }
        }

        p.draw = () => {
          p.background(...PAPER)
          if (buffer) p.image(buffer, 0, 0)
          const t = p.frameCount * 0.006
          for (const tr of trees) {
            if (!tr.live) continue
            tr.sk.resolve(t, 0.03)
            drawTree(p, tr)
          }
        }

        p.windowResized = () => {
          p.resizeCanvas(host.offsetWidth, host.offsetHeight)
          build()
          if (reduced) p.redraw()
        }
      }

      instance = new p5(sketch, host)

      if (!reduced) {
        observer = new IntersectionObserver(([e]) => {
          if (!instance) return
          if (e.isIntersecting) instance.loop()
          else instance.noLoop()
        })
        observer.observe(host)
      }
    })

    return () => {
      cancelled = true
      observer?.disconnect()
      instance?.remove()
    }
  }, [])

  return <div ref={hostRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />
}
