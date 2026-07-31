import { useEffect, useRef } from 'react'

// Hero 背景：真的 p5.js flocking 群集系統（W10 課堂內容）。
// p5 動態載入（不進主 bundle）；離開視窗暫停、prefers-reduced-motion 只畫一幀。
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
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const sketch = (p) => {
        const N = 56
        const boids = []
        // 單色墨點：安靜的群集，不搶文字
        const INK = ['#e5e5e5', '#d4d4d4', '#d4d4d4', '#c4c4c4', '#a3a3a3']

        const mk = () => ({
          pos: p.createVector(p.random(p.width), p.random(p.height)),
          vel: p5.Vector.random2D().mult(p.random(1, 2)),
          col: p.random(INK),
          r: p.random(1.5, 3),
        })

        const steer = (b) => {
          const sep = p.createVector()
          const ali = p.createVector()
          const coh = p.createVector()
          let n = 0
          for (const o of boids) {
            if (o === b) continue
            const d = b.pos.dist(o.pos)
            if (d < 64) {
              n++
              ali.add(o.vel)
              coh.add(o.pos)
              if (d < 26) sep.add(p5.Vector.sub(b.pos, o.pos).div(Math.max(d, 0.01)))
            }
          }
          if (n > 0) {
            ali.div(n).setMag(0.04)
            coh.div(n).sub(b.pos).setMag(0.03)
            b.vel.add(ali).add(coh)
          }
          b.vel.add(sep.mult(0.12))
          // 滑鼠斥力：游標經過群會讓開
          const m = p.createVector(p.mouseX, p.mouseY)
          const dm = b.pos.dist(m)
          if (dm < 110 && dm > 0.01) b.vel.add(p5.Vector.sub(b.pos, m).setMag(0.25 * (1 - dm / 110)))
          b.vel.limit(2.2)
        }

        p.setup = () => {
          p.createCanvas(host.offsetWidth, host.offsetHeight)
          p.pixelDensity(Math.min(window.devicePixelRatio || 1, 2))
          for (let i = 0; i < N; i++) boids.push(mk())
          p.background(255)
          if (reduced) {
            for (let i = 0; i < 240; i++) step(false)
            p.noLoop()
          }
        }

        const step = (fade = true) => {
          if (fade) p.background(255, 28)
          p.noStroke()
          for (const b of boids) {
            steer(b)
            b.pos.add(b.vel)
            if (b.pos.x < -8) b.pos.x = p.width + 8
            if (b.pos.x > p.width + 8) b.pos.x = -8
            if (b.pos.y < -8) b.pos.y = p.height + 8
            if (b.pos.y > p.height + 8) b.pos.y = -8
            p.fill(b.col)
            p.circle(b.pos.x, b.pos.y, b.r * 2)
          }
        }

        p.draw = () => step(true)

        p.windowResized = () => {
          p.resizeCanvas(host.offsetWidth, host.offsetHeight)
          p.background(255)
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
