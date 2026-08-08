import { useEffect, useRef } from 'react'

// Hero 背景：課程方法本身的視覺化。
// 左緣是 2026 的微弱信號（小點），其中幾個被「放大」成往右生長的推演線（趨勢），
// 線與線靠近處出現「碰撞點」（方框節點，兩個信號結合成新趨勢），
// 最後抵達右緣的 2050（空心圓端點，未來情境）。
// 對應 M1 的三個動作：放大與極端化、尋找碰撞點、建構未來情境。
// 每次載入換一個 seed，每次重新整理都是一個不同的未來。
// prefers-reduced-motion 時直接呈現完成狀態，不播生長動畫。

const INK = [26, 25, 23]
const PLAN = [29, 79, 165]

function buildSketch(host) {
  return (p) => {
    let paths = [] // 每條推演線：{pts, main, born}
    let idle = [] // 沒被放大的信號點
    let nodes = [] // 碰撞點：{x, y, at}
    let total = 0 // 生長動畫總幀數
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function rebuild() {
      const W = p.width
      const H = p.height
      paths = []
      idle = []
      nodes = []
      p.noiseSeed(p.random(100000))

      // 左緣信號帶：24 個微弱信號
      const signals = []
      for (let i = 0; i < 24; i++) {
        signals.push({ x: p.random(0.02, 0.09) * W, y: p.random(0.08, 0.95) * H })
      }
      // 其中 7 個被放大成推演線
      const chosen = p.shuffle(signals).slice(0, 7)
      idle = signals.filter((s) => !chosen.includes(s))

      chosen.forEach((s, pi) => {
        const pts = [{ x: s.x, y: s.y }]
        const steps = 64
        const seed = pi * 37.7
        let y = s.y
        for (let i = 1; i <= steps; i++) {
          const x = s.x + ((W * 1.02 - s.x) * i) / steps
          // noise 漂移，越往右擺動越大（趨勢的不確定性放大）
          y += (p.noise(seed, i * 0.09) - 0.5) * H * 0.028 * (0.4 + i / steps)
          y = p.constrain(y, H * 0.04, H * 0.97)
          pts.push({ x, y })
        }
        paths.push({ pts, main: pi < 3, born: pi * 26 })
      })

      // 碰撞點：兩條線在同一步靠得很近的地方（最多 3 個）
      for (let a = 0; a < paths.length && nodes.length < 3; a++) {
        for (let b = a + 1; b < paths.length && nodes.length < 3; b++) {
          for (let i = 12; i < 60; i += 2) {
            const pa = paths[a].pts[i]
            const pb = paths[b].pts[i]
            if (pa && pb && p.abs(pa.y - pb.y) < H * 0.02) {
              nodes.push({ x: (pa.x + pb.x) / 2, y: (pa.y + pb.y) / 2, at: i })
              break
            }
          }
        }
      }
      total = 320
    }

    p.setup = () => {
      const c = p.createCanvas(host.offsetWidth, host.offsetHeight)
      c.parent(host)
      p.pixelDensity(Math.min(2, window.devicePixelRatio || 1))
      rebuild()
      if (still) {
        p.noLoop()
      } else {
        p.frameRate(30)
      }
    }

    p.windowResized = () => {
      p.resizeCanvas(host.offsetWidth, host.offsetHeight)
      rebuild()
      if (still) p.redraw()
    }

    p.draw = () => {
      p.clear()
      const t = still ? total : Math.min(p.frameCount, total)

      // 閒置的微弱信號：極小的墨點
      p.noStroke()
      for (const s of idle) {
        const tw = still ? 1 : 0.75 + 0.25 * p.sin(p.frameCount * 0.02 + s.y)
        p.fill(INK[0], INK[1], INK[2], 70 * tw)
        p.circle(s.x, s.y, 3)
      }

      // 推演線：生長中
      p.noFill()
      for (const path of paths) {
        const prog = p.constrain((t - path.born) / 190, 0, 1)
        if (prog <= 0) continue
        const eased = 1 - Math.pow(1 - prog, 3)
        const upto = Math.floor(eased * (path.pts.length - 1))
        const col = path.main ? PLAN : INK
        const alpha = path.main ? 150 : 45

        p.beginShape()
        for (let i = 0; i <= upto; i++) {
          const pt = path.pts[i]
          // 線越往右越粗：趨勢在放大
          p.stroke(col[0], col[1], col[2], alpha)
          p.strokeWeight(0.6 + (i / path.pts.length) * (path.main ? 1.4 : 0.6))
          p.vertex(pt.x, pt.y)
        }
        p.endShape()

        // 起點：實心信號點
        p.noStroke()
        p.fill(col[0], col[1], col[2], path.main ? 200 : 90)
        p.circle(path.pts[0].x, path.pts[0].y, path.main ? 5 : 3.5)

        // 端點：抵達 2050 的空心情境節點
        if (prog >= 1) {
          const end = path.pts[path.pts.length - 1]
          const pulse = still ? 0 : p.sin(p.frameCount * 0.03 + path.born) * 1
          p.noFill()
          p.stroke(col[0], col[1], col[2], path.main ? 190 : 70)
          p.strokeWeight(1.2)
          p.circle(end.x, end.y, (path.main ? 9 : 6) + pulse)
        }
        p.noFill()
      }

      // 碰撞點：方框節點（兩個信號結合成新趨勢）
      for (const n of nodes) {
        if (t / total < n.at / 70) continue
        p.noFill()
        p.stroke(PLAN[0], PLAN[1], PLAN[2], 170)
        p.strokeWeight(1.2)
        p.rectMode(p.CENTER)
        p.square(n.x, n.y, 7)
      }

      // 時間軸標籤
      p.noStroke()
      p.fill(INK[0], INK[1], INK[2], 90)
      p.textFont('IBM Plex Mono, monospace')
      p.textSize(11)
      p.textAlign(p.LEFT, p.BOTTOM)
      p.text('2026', 8, p.height - 8)
      p.textAlign(p.RIGHT, p.BOTTOM)
      p.text('2050', p.width - 8, p.height - 8)
    }
  }
}

export default function HeroSketch() {
  const hostRef = useRef(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    let instance = null
    let observer = null
    let cancelled = false

    ;(async () => {
      const { default: p5 } = await import('p5')
      if (cancelled) return
      p5.disableFriendlyErrors = true
      instance = new p5(buildSketch(host))

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        observer = new IntersectionObserver(([e]) => {
          if (!instance) return
          if (e.isIntersecting) instance.loop()
          else instance.noLoop()
        })
        observer.observe(host)
      }
    })().catch((err) => {
      // 背景動畫失敗不該讓頁面掛掉——靜默降級成純紙色背景
      if (import.meta.env.DEV) console.warn('[HeroSketch]', err)
    })

    return () => {
      cancelled = true
      observer?.disconnect()
      instance?.remove()
    }
  }, [])

  return <div ref={hostRef} className="absolute inset-0 pointer-events-none opacity-70" aria-hidden="true" />
}
