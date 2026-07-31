import { useEffect, useRef } from 'react'

// 16 週時間軸的每週主題小 sketch（vanilla Canvas2D，輕量；只在進入視窗時動）。
// 每週一個 case：圖像＝該週要學的概念。

const PHASE_INK = { I: '#38bdf8', II: '#f59e0b', III: '#8b5cf6' }
const S = 64 // 邏輯尺寸

function draw(ctx, week, phase, t) {
  const c = S / 2
  const ink = '#0a0a0a'
  const tint = PHASE_INK[phase]
  ctx.clearRect(0, 0, S, S)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, S, S)
  ctx.lineWidth = 2
  ctx.strokeStyle = ink

  const dot = (x, y, r, col = ink) => {
    ctx.fillStyle = col
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  switch (week) {
    case 1: {
      // 第一張畫布：一個會呼吸的圓
      ctx.beginPath()
      ctx.arc(c, c, 15 + 3.5 * Math.sin(t * 2), 0, Math.PI * 2)
      ctx.stroke()
      dot(c, c, 2.5, tint)
      break
    }
    case 2: {
      // 變數與互動：追著看不見的滑鼠跑的點（Lissajous）
      const x = c + 20 * Math.sin(t * 1.3)
      const y = c + 16 * Math.sin(t * 2.1 + 1)
      for (let i = 5; i > 0; i--) {
        const px = c + 20 * Math.sin((t - i * 0.09) * 1.3)
        const py = c + 16 * Math.sin((t - i * 0.09) * 2.1 + 1)
        dot(px, py, 4 - i * 0.55, '#d4d4d4')
      }
      dot(x, y, 4, tint)
      break
    }
    case 3: {
      // 條件與事件：兩種狀態切換（if/else）
      const on = Math.floor(t) % 2 === 0
      ctx.fillStyle = on ? ink : '#ffffff'
      ctx.beginPath()
      ctx.roundRect(14, 14, 36, 36, 6)
      ctx.fill()
      ctx.stroke()
      dot(c, c, 5, on ? tint : ink)
      break
    }
    case 4: {
      // 迴圈：4×4 網格各自呼吸
      for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++) {
          const r = 3.2 + 1.8 * Math.sin(t * 2 + (i + j) * 0.7)
          ctx.fillStyle = (i + j) % 3 === 0 ? tint : ink
          ctx.fillRect(11 + i * 14 - r / 2, 11 + j * 14 - r / 2, r, r)
        }
      break
    }
    case 5: {
      // 函式：參數化的花（petal 數固定、長度是參數）
      const petals = 6
      const len = 16 + 5 * Math.sin(t * 1.5)
      ctx.save()
      ctx.translate(c, c)
      ctx.rotate(t * 0.4)
      for (let i = 0; i < petals; i++) {
        ctx.rotate((Math.PI * 2) / petals)
        ctx.beginPath()
        ctx.ellipse(len / 2 + 4, 0, len / 2, 5, 0, 0, Math.PI * 2)
        ctx.stroke()
      }
      ctx.restore()
      dot(c, c, 3.5, tint)
      break
    }
    case 6: {
      // 陣列：一排點記住一條波
      for (let i = 0; i < 12; i++) {
        const x = 8 + i * 4.3
        const y = c + 14 * Math.sin(t * 2.2 + i * 0.55)
        dot(x, y, 2.4, i === 11 ? tint : ink)
      }
      break
    }
    case 7: {
      // 一顆粒子的誕生：在盒子裡彈跳
      ctx.strokeRect(8, 8, 48, 48)
      const bx = c + 19 * Math.sin(t * 1.7)
      const by = c + 19 * Math.abs(Math.sin(t * 2.3)) - 9
      for (let i = 4; i > 0; i--) {
        dot(c + 19 * Math.sin((t - i * 0.06) * 1.7), c + 19 * Math.abs(Math.sin((t - i * 0.06) * 2.3)) - 9, 3.5 - i * 0.6, '#d4d4d4')
      }
      dot(bx, by, 4, tint)
      break
    }
    case 8: {
      // 一千顆粒子：下雪
      for (let i = 0; i < 22; i++) {
        const x = ((i * 137.5) % S) + 3 * Math.sin(t + i)
        const y = (i * 29 + t * (10 + (i % 5) * 4)) % (S + 8) - 4
        dot(x, y, 1.6 + (i % 3) * 0.7, i % 6 === 0 ? tint : ink)
      }
      break
    }
    case 9: {
      // 繼承與多型：同一條路徑，三種形狀各自表述
      const shapes = [0, 1, 2]
      for (const sIdx of shapes) {
        const a = t * 1.1 + (sIdx * Math.PI * 2) / 3
        const x = c + 18 * Math.cos(a)
        const y = c + 18 * Math.sin(a)
        ctx.fillStyle = sIdx === 0 ? tint : ink
        if (sIdx === 0) dot(x, y, 4.5, tint)
        else if (sIdx === 1) ctx.fillRect(x - 4, y - 4, 8, 8)
        else {
          ctx.beginPath()
          ctx.moveTo(x, y - 5)
          ctx.lineTo(x + 4.5, y + 3.5)
          ctx.lineTo(x - 4.5, y + 3.5)
          ctx.fill()
        }
      }
      break
    }
    case 10: {
      // 群集：一小群跟著游走的重心
      const cx = c + 12 * Math.sin(t * 0.8)
      const cy = c + 10 * Math.cos(t * 1.1)
      for (let i = 0; i < 13; i++) {
        const a = (i / 13) * Math.PI * 2 + t * (1 + (i % 3) * 0.25)
        const r = 7 + 6 * Math.sin(t * 1.4 + i * 1.9)
        dot(cx + r * Math.cos(a), cy + r * Math.sin(a), 2, i % 5 === 0 ? tint : ink)
      }
      break
    }
    case 11: {
      // 期中發表：畫框裡的生成小品
      ctx.lineWidth = 3
      ctx.strokeRect(10, 8, 44, 48)
      ctx.lineWidth = 2
      for (let i = 0; i < 8; i++) {
        const x = 16 + ((i * 31 + t * 6) % 32)
        const y = 15 + ((i * 17) % 34)
        dot(x, y, 1.8, i % 4 === 0 ? tint : ink)
      }
      break
    }
    case 12: {
      // prompt：終端機打字游標
      ctx.font = 'bold 13px "IBM Plex Mono", monospace'
      ctx.fillStyle = ink
      ctx.fillText('>', 10, 26)
      const n = Math.floor(t * 3) % 7
      for (let i = 0; i < n; i++) ctx.fillRect(20 + i * 5, 22, 3.5, 3)
      if (Math.floor(t * 2) % 2 === 0) {
        ctx.fillStyle = tint
        ctx.fillRect(14, 36, 8, 14)
      }
      break
    }
    case 13: {
      // 重混：兩層網格疊出 moiré
      ctx.save()
      ctx.translate(c, c)
      for (const [rot, col] of [
        [t * 0.12, '#a3a3a3'],
        [-t * 0.09, tint],
      ]) {
        ctx.save()
        ctx.rotate(rot)
        ctx.strokeStyle = col
        ctx.lineWidth = 1.2
        for (let i = -4; i <= 4; i++) {
          ctx.beginPath()
          ctx.moveTo(i * 7, -30)
          ctx.lineTo(i * 7, 30)
          ctx.stroke()
        }
        ctx.restore()
      }
      ctx.restore()
      break
    }
    case 14: {
      // ml5 手勢：五指骨架擺動
      const wx = c
      const wy = 52
      for (let f = 0; f < 5; f++) {
        const spread = (f - 2) * (0.28 + 0.07 * Math.sin(t * 1.6))
        const a = -Math.PI / 2 + spread
        const j1x = wx + 16 * Math.cos(a)
        const j1y = wy + 16 * Math.sin(a)
        const j2x = wx + 30 * Math.cos(a + 0.06 * Math.sin(t * 2 + f))
        const j2y = wy + 30 * Math.sin(a + 0.06 * Math.sin(t * 2 + f))
        ctx.beginPath()
        ctx.moveTo(wx, wy)
        ctx.lineTo(j1x, j1y)
        ctx.lineTo(j2x, j2y)
        ctx.stroke()
        dot(j1x, j1y, 2)
        dot(j2x, j2y, 2.4, f === 2 ? tint : ink)
      }
      dot(wx, wy, 3.5)
      break
    }
    case 15: {
      // 專題製作週：三條進度不同的 bar
      for (let i = 0; i < 3; i++) {
        const y = 16 + i * 14
        ctx.strokeRect(10, y, 44, 8)
        const p = (Math.sin(t * (0.6 + i * 0.3) + i * 2) + 1) / 2
        ctx.fillStyle = i === 1 ? tint : ink
        ctx.fillRect(12, y + 2, 40 * p, 4)
      }
      break
    }
    case 16: {
      // 期末展演：黑場中移動的聚光燈
      ctx.fillStyle = ink
      ctx.fillRect(6, 6, 52, 52)
      const lx = c + 13 * Math.sin(t * 0.9)
      const ly = c + 9 * Math.cos(t * 1.3)
      ctx.save()
      ctx.beginPath()
      ctx.arc(lx, ly, 13, 0, Math.PI * 2)
      ctx.clip()
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(6, 6, 52, 52)
      for (let i = 0; i < 9; i++) dot(14 + ((i * 23) % 38), 14 + ((i * 15) % 36), 2, i % 3 === 0 ? tint : ink)
      ctx.restore()
      break
    }
    default:
      break
  }
}

export default function WeekSketch({ week, phase, active = false }) {
  const canvasRef = useRef(null)
  const tRef = useRef(1.2) // 記住停格時間，hover 續播不跳格

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = S * dpr
    canvas.height = S * dpr
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)
    draw(ctx, week, phase, tRef.current) // 預設靜止：停在一個畫格
  }, [week, phase])

  useEffect(() => {
    // 只有 hover（active）時才動；離開就停在當下畫格
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
      draw(ctx, week, phase, tRef.current)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [active, week, phase])

  return (
    <div
      className={`shrink-0 overflow-hidden bg-white border-2 rounded-md transition-colors ${
        active ? 'border-neutral-900' : 'border-neutral-300'
      }`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} style={{ width: S, height: S, display: 'block' }} />
    </div>
  )
}
