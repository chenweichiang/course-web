import { useEffect, useRef } from 'react'

// 十六週課表格的每週主題小 sketch（vanilla Canvas2D，輕量；hover 才動）。
// 每週一個 case：圖像＝該週要學的概念（對齊課綱 v1）。座標畫在 64×64 邏輯空間，依格寬縮放。

const S = 64
const INK = '#1A1917'
const SEAL = '#C3272B'
const PAPER = '#FDFCF9'
const GRAY = '#C6C4BD'

function draw(ctx, week, t) {
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

  switch (week) {
    case 1: {
      // AI 的問題：一排一樣的東西裡，有一個一本正經地錯了（幻覺）
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
    case 2: {
      // AI 怎麼運作：預測下一個 token——已生成的方塊＋閃爍的「下一格」
      const total = 10
      const nGen = Math.floor(t * 2.2) % (total + 1)
      for (let i = 0; i < total; i++) {
        const x = 10 + (i % 5) * 10
        const y = 22 + Math.floor(i / 5) * 14
        if (i < nGen) {
          ctx.fillStyle = INK
          ctx.fillRect(x, y, 7, 9)
        } else if (i === nGen && (t * 2) % 1 > 0.45) {
          ctx.strokeStyle = SEAL
          ctx.strokeRect(x, y, 7, 9)
          ctx.strokeStyle = INK
        }
      }
      break
    }
    case 3: {
      // 建構工作流：終端機打字游標（prompt）
      ctx.font = 'bold 13px "IBM Plex Mono", monospace'
      ctx.fillStyle = INK
      ctx.fillText('>', 10, 26)
      const n = Math.floor(t * 3) % 7
      for (let i = 0; i < n; i++) ctx.fillRect(20 + i * 5, 22, 3.5, 3)
      if (Math.floor(t * 2) % 2 === 0) {
        ctx.fillStyle = SEAL
        ctx.fillRect(14, 36, 8, 14)
      }
      break
    }
    case 4: {
      // p5.js 一日通：親手寫的第一個動畫——會呼吸的圓
      ctx.beginPath()
      ctx.arc(c, c, 15 + 3.5 * Math.sin(t * 2), 0, Math.PI * 2)
      ctx.stroke()
      dot(c, c, 2.5, SEAL)
      break
    }
    case 5: {
      // 讀碼與 OOP 詞彙：一顆有個性的球（class 的第一課）
      ctx.strokeRect(8, 8, 48, 48)
      const bx = c + 19 * Math.sin(t * 1.7)
      const by = c + 19 * Math.abs(Math.sin(t * 2.3)) - 9
      for (let i = 4; i > 0; i--) {
        dot(c + 19 * Math.sin((t - i * 0.06) * 1.7), c + 19 * Math.abs(Math.sin((t - i * 0.06) * 2.3)) - 9, 3.5 - i * 0.6, GRAY)
      }
      dot(bx, by, 4, SEAL)
      break
    }
    case 6: {
      // 一顆到一千顆：下雪（粒子系統）
      for (let i = 0; i < 22; i++) {
        const x = ((i * 137.5) % S) + 3 * Math.sin(t + i)
        const y = (i * 29 + t * (10 + (i % 5) * 4)) % (S + 8) - 4
        dot(x, y, 1.6 + (i % 3) * 0.7, i % 7 === 0 ? SEAL : INK)
      }
      break
    }
    case 7: {
      // 繼承與多型：同一條路徑，三種形狀各自表述
      for (const sIdx of [0, 1, 2]) {
        const a = t * 1.1 + (sIdx * Math.PI * 2) / 3
        const x = c + 18 * Math.cos(a)
        const y = c + 18 * Math.sin(a)
        if (sIdx === 0) dot(x, y, 4.5, SEAL)
        else if (sIdx === 1) {
          ctx.fillStyle = INK
          ctx.fillRect(x - 4, y - 4, 8, 8)
        } else {
          ctx.fillStyle = INK
          ctx.beginPath()
          ctx.moveTo(x, y - 5)
          ctx.lineTo(x + 4.5, y + 3.5)
          ctx.lineTo(x - 4.5, y + 3.5)
          ctx.fill()
        }
      }
      break
    }
    case 8: {
      // 群集：一小群跟著游走的重心（就是 hero 背景）
      const cx = c + 12 * Math.sin(t * 0.8)
      const cy = c + 10 * Math.cos(t * 1.1)
      for (let i = 0; i < 13; i++) {
        const a = (i / 13) * Math.PI * 2 + t * (1 + (i % 3) * 0.25)
        const r = 7 + 6 * Math.sin(t * 1.4 + i * 1.9)
        dot(cx + r * Math.cos(a), cy + r * Math.sin(a), 2, i % 6 === 0 ? SEAL : INK)
      }
      break
    }
    case 9: {
      // 工作流實作檢核：當場一氣呵成的一條波
      for (let i = 0; i < 12; i++) {
        const x = 8 + i * 4.3
        const y = c + 14 * Math.sin(t * 2.2 + i * 0.55)
        dot(x, y, 2.4, i === 11 ? SEAL : INK)
      }
      break
    }
    case 10: {
      // 期中製作：三條進度不同的 bar
      for (let i = 0; i < 3; i++) {
        const y = 16 + i * 14
        ctx.strokeRect(10, y, 44, 8)
        const p = (Math.sin(t * (0.6 + i * 0.3) + i * 2) + 1) / 2
        ctx.fillStyle = i === 1 ? SEAL : INK
        ctx.fillRect(12, y + 2, 40 * p, 4)
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
        dot(x, y, 1.8, i % 4 === 0 ? SEAL : INK)
      }
      break
    }
    case 12: {
      // 研究先行：紅框逐格掃描比較（選型研究）
      const scan = Math.floor(t * 2.5) % 16
      for (let i = 0; i < 16; i++) {
        const x = 12 + (i % 4) * 14
        const y = 12 + Math.floor(i / 4) * 14
        dot(x, y, 2, i <= scan && Math.floor(scan / 16) === 0 ? INK : GRAY)
      }
      const sx = 12 + (scan % 4) * 14
      const sy = 12 + Math.floor(scan / 4) * 14
      ctx.strokeStyle = SEAL
      ctx.strokeRect(sx - 6.5, sy - 6.5, 13, 13)
      ctx.strokeStyle = INK
      break
    }
    case 13: {
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
    case 14: {
      // 重混：兩層網格疊出 moiré
      ctx.save()
      ctx.translate(c, c)
      for (const [rot, col] of [
        [t * 0.12, GRAY],
        [-t * 0.09, SEAL],
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
    case 15: {
      // 一對一 studio：兩點之間的往返對話
      const p1 = { x: 14, y: c }
      const p2 = { x: 50, y: c }
      ctx.strokeStyle = GRAY
      ctx.beginPath()
      ctx.moveTo(p1.x, p1.y)
      ctx.lineTo(p2.x, p2.y)
      ctx.stroke()
      ctx.strokeStyle = INK
      const k = (Math.sin(t * 2) + 1) / 2
      dot(p1.x + (p2.x - p1.x) * k, c - 6 * Math.sin(k * Math.PI), 2.5, SEAL)
      ctx.beginPath()
      ctx.arc(p1.x, p1.y, 6 + 1.2 * Math.sin(t * 3), 0, Math.PI * 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(p2.x, p2.y, 6 + 1.2 * Math.cos(t * 3), 0, Math.PI * 2)
      ctx.stroke()
      break
    }
    case 16: {
      // 期末展演：黑場中移動的聚光燈
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

export default function WeekSketch({ week, active = false }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const tRef = useRef(1.2) // 記住停格時間，hover 續播不跳格

  // 依格寬縮放 64 邏輯空間；resize 重畫當前停格
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
      draw(ctx, week, tRef.current)
    }
    setup()
    const ro = new ResizeObserver(setup)
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [week])

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
      draw(ctx, week, tRef.current)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [active, week])

  return (
    <div ref={wrapRef} className="w-full aspect-square border border-neutral-900/15 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  )
}
