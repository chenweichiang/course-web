import { useEffect, useRef } from 'react'

// 里程碑小 sketch（vanilla Canvas2D；hover 才動）。圖像＝該里程碑的核心概念。
// 座標畫在 64×64 邏輯空間，依格寬縮放。

const S = 64
const INK = '#1A1917'
const SEAL = '#C3272B'
const PAPER = '#FDFCF9'
const GRAY = '#C6C4BD'

function draw(ctx, index, t) {
  const c = S / 2
  ctx.clearRect(0, 0, S, S)
  ctx.fillStyle = PAPER
  ctx.fillRect(0, 0, S, S)
  ctx.lineWidth = 2
  ctx.strokeStyle = INK

  const dot = (x, y, r, col = INK) => {
    ctx.fillStyle = col
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  switch (index) {
    case 0: {
      // M0 裝備／先懂 AI：一排一樣的東西裡，有一個一本正經地錯了（幻覺）
      const bad = Math.floor(t * 0.9) % 9
      for (let i = 0; i < 9; i++) {
        const x = 14 + (i % 3) * 18
        const y = 14 + Math.floor(i / 3) * 18
        if (i === bad) {
          ctx.fillStyle = SEAL
          ctx.fillRect(x - 5, y - 5, 10, 10)
        } else {
          ctx.beginPath()
          ctx.arc(x, y, 5.5, 0, Math.PI * 2)
          ctx.stroke()
        }
      }
      break
    }
    case 1: {
      // M1 世界：傾頹的廢墟地平線＋往上長的新生命
      ctx.beginPath()
      ctx.moveTo(4, 48)
      ctx.lineTo(60, 48)
      ctx.stroke()
      // 三座下沉的廢墟
      ctx.save()
      ctx.fillStyle = GRAY
      ctx.translate(16, 48)
      ctx.rotate(-0.12)
      ctx.fillRect(-5, -18, 10, 18)
      ctx.restore()
      ctx.save()
      ctx.fillStyle = INK
      ctx.translate(34, 48)
      ctx.rotate(0.08)
      ctx.fillRect(-4, -26, 8, 26)
      ctx.restore()
      ctx.save()
      ctx.fillStyle = GRAY
      ctx.translate(50, 48)
      ctx.rotate(0.2)
      ctx.fillRect(-4, -12, 8, 12)
      ctx.restore()
      // 新生命：從地縫往上飄的紅點
      for (let i = 0; i < 5; i++) {
        const y = 48 - (((t * 6 + i * 11) % 34))
        dot(10 + i * 11, y, 1.6 + (i % 2) * 0.6, i % 2 ? SEAL : INK)
      }
      break
    }
    case 2: {
      // M2 物種：會呼吸的細胞——膜＋核，第一次動起來
      const r = 15 + 3.5 * Math.sin(t * 2)
      ctx.beginPath()
      ctx.arc(c, c, r, 0, Math.PI * 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(c, c, r + 5 + 1.5 * Math.sin(t * 2 + 1), 0, Math.PI * 2)
      ctx.strokeStyle = GRAY
      ctx.lineWidth = 1.2
      ctx.stroke()
      ctx.strokeStyle = INK
      ctx.lineWidth = 2
      dot(c + 4 * Math.sin(t), c + 3 * Math.cos(t * 1.3), 3.5, SEAL)
      break
    }
    case 3: {
      // M3 個體：柵欄裡一隻活的（動物園的第一個住客）
      ctx.strokeRect(8, 8, 48, 48)
      const bx = c + 19 * Math.sin(t * 1.7)
      const by = c + 19 * Math.abs(Math.sin(t * 2.3)) - 9
      for (let i = 4; i > 0; i--) {
        dot(c + 19 * Math.sin((t - i * 0.06) * 1.7), c + 19 * Math.abs(Math.sin((t - i * 0.06) * 2.3)) - 9, 3.5 - i * 0.6, GRAY)
      }
      dot(bx, by, 4, SEAL)
      break
    }
    case 4: {
      // M4 族群：一小群跟著游走的重心（flocking）
      const cx = c + 12 * Math.sin(t * 0.8)
      const cy = c + 10 * Math.cos(t * 1.1)
      for (let i = 0; i < 13; i++) {
        const a = (i / 13) * Math.PI * 2 + t * (1 + (i % 3) * 0.25)
        const r = 7 + 6 * Math.sin(t * 1.4 + i * 1.9)
        dot(cx + r * Math.cos(a), cy + r * Math.sin(a), 2, i % 6 === 0 ? SEAL : INK)
      }
      break
    }
    case 5: {
      // M5 棲地：觀眾的手伸進來（ml5 手勢）
      const wx = c
      const wy = 52
      for (let f = 0; f < 5; f++) {
        const spread = (f - 2) * (0.28 + 0.07 * Math.sin(t * 1.6))
        const a = -Math.PI / 2 + spread
        const j1x = wx + 16 * Math.cos(a)
        const j1y = wy + 16 * Math.sin(a)
        const j2x = wx + 30 * Math.cos(a + 0.06 * Math.sin(t * 2 + f))
        const j2y = wy + 30 * Math.sin(a + 0.06 * Math.sin(t * 2 + f))
        ctx.strokeStyle = INK
        ctx.beginPath()
        ctx.moveTo(wx, wy)
        ctx.lineTo(j1x, j1y)
        ctx.lineTo(j2x, j2y)
        ctx.stroke()
        dot(j1x, j1y, 2)
        dot(j2x, j2y, 2.4, f === 2 ? SEAL : INK)
      }
      dot(wx, wy, 3.5)
      break
    }
    case 6: {
      // M6 開園：黑場中移動的聚光燈——動物園開園
      ctx.fillStyle = INK
      ctx.fillRect(6, 6, 52, 52)
      const lx = c + 13 * Math.sin(t * 0.9)
      const ly = c + 9 * Math.cos(t * 1.3)
      ctx.save()
      ctx.beginPath()
      ctx.arc(lx, ly, 13, 0, Math.PI * 2)
      ctx.clip()
      ctx.fillStyle = PAPER
      ctx.fillRect(6, 6, 52, 52)
      for (let i = 0; i < 9; i++) dot(14 + ((i * 23) % 38), 14 + ((i * 15) % 36), 2, i % 3 === 0 ? SEAL : INK)
      ctx.restore()
      break
    }
    default:
      break
  }
}

export default function MilestoneSketch({ index, active = false }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const tRef = useRef(1.2) // 記住停格時間，hover 續播不跳格

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const setup = () => {
      const size = wrap.offsetWidth
      if (!size) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = size * dpr
      canvas.height = size * dpr
      const ctx = canvas.getContext('2d')
      ctx.setTransform((size * dpr) / S, 0, 0, (size * dpr) / S, 0, 0)
      draw(ctx, index, tRef.current)
    }
    setup()
    const ro = new ResizeObserver(setup)
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [index])

  useEffect(() => {
    if (!active) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let last = performance.now()
    const loop = (now) => {
      tRef.current += (now - last) / 1000
      last = now
      draw(ctx, index, tRef.current)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [active, index])

  return (
    <div ref={wrapRef} className="w-full aspect-square border border-neutral-900/15 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  )
}
