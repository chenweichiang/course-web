import { useEffect, useRef } from 'react'

// 演算法圖鑑的迷你動態範例——每一格都是「真的」該演算法的最小實作（vanilla Canvas2D）。
// 與里程碑小圖同一套模式：預設停格（init 時先暖身跑出好看的一幀），hover 才動。
// 邏輯座標一律 64×64，依卡片寬縮放。

const S = 64
const INK = '#1A1917'
const SEAL = '#C3272B'
const PAPER = '#FDFCF9'
const GRAY = '#B8B6AF'

// ── 小工具：確定性 hash 與 2D value noise（p5 noise 的迷你替身）──
function hash2(ix, iy, seed) {
  let h = ix * 374761393 + iy * 668265263 + seed * 974711
  h = (h ^ (h >> 13)) * 1274126177
  return ((h ^ (h >> 16)) >>> 0) / 4294967295
}
const smooth = (t) => t * t * (3 - 2 * t)
function vnoise(x, y, seed = 0) {
  const ix = Math.floor(x)
  const iy = Math.floor(y)
  const fx = smooth(x - ix)
  const fy = smooth(y - iy)
  const a = hash2(ix, iy, seed)
  const b = hash2(ix + 1, iy, seed)
  const c = hash2(ix, iy + 1, seed)
  const d = hash2(ix + 1, iy + 1, seed)
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy
}
const dot = (ctx, x, y, r, col = INK) => {
  ctx.fillStyle = col
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fill()
}
const bg = (ctx) => {
  ctx.clearRect(0, 0, S, S)
  ctx.fillStyle = PAPER
  ctx.fillRect(0, 0, S, S)
}

// ── 19 個演算法（順序＝圖鑑卡片攤平順序）──
const SK = []

// 0 Perlin/Value Noise：會呼吸的不定形生物
SK[0] = {
  init: () => ({}),
  step: () => {},
  render: (ctx, st, t) => {
    bg(ctx)
    ctx.strokeStyle = INK
    ctx.lineWidth = 2
    ctx.beginPath()
    for (let i = 0; i <= 60; i++) {
      const a = (i / 60) * Math.PI * 2
      const r = 16 + 9 * (vnoise(Math.cos(a) * 1.2 + 10, Math.sin(a) * 1.2 + t * 0.6, 7) - 0.5) * 2
      const x = 32 + r * Math.cos(a)
      const y = 32 + r * Math.sin(a)
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
    }
    ctx.closePath()
    ctx.stroke()
    dot(ctx, 32 + 3 * Math.sin(t), 32 + 2 * Math.cos(t * 1.3), 2.5, SEAL)
  },
}

// 1 Reaction-Diffusion（Gray-Scott，36×36 真實模擬）
SK[1] = {
  init: () => {
    const N = 36
    const A = new Float32Array(N * N).fill(1)
    const B = new Float32Array(N * N)
    for (let y = 14; y < 22; y++) for (let x = 14; x < 22; x++) B[y * N + x] = 1
    const st = { N, A, B, A2: new Float32Array(N * N), B2: new Float32Array(N * N) }
    for (let i = 0; i < 260; i++) SK[1].step(st, 0.016)
    return st
  },
  step: (st) => {
    const { N, A, B, A2, B2 } = st
    const f = 0.0545
    const k = 0.062
    for (let it = 0; it < 4; it++) {
      for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
          const i = y * N + x
          const xm = y * N + ((x + N - 1) % N)
          const xp = y * N + ((x + 1) % N)
          const ym = ((y + N - 1) % N) * N + x
          const yp = ((y + 1) % N) * N + x
          const la = A[xm] + A[xp] + A[ym] + A[yp] - 4 * A[i]
          const lb = B[xm] + B[xp] + B[ym] + B[yp] - 4 * B[i]
          const abb = A[i] * B[i] * B[i]
          A2[i] = A[i] + (0.23 * la - abb + f * (1 - A[i]))
          B2[i] = B[i] + (0.11 * lb + abb - (k + f) * B[i])
        }
      }
      A.set(A2)
      B.set(B2)
    }
  },
  render: (ctx, st) => {
    bg(ctx)
    const { N, B } = st
    const c = S / N
    for (let y = 0; y < N; y++)
      for (let x = 0; x < N; x++) {
        const v = B[y * N + x]
        if (v > 0.17) {
          ctx.fillStyle = v > 0.34 ? SEAL : INK
          ctx.fillRect(x * c, y * c, c + 0.5, c + 0.5)
        }
      }
  },
}

// 2 L-System／碎形樹：逐代長出、微微搖曳
SK[2] = {
  init: () => ({}),
  step: () => {},
  render: (ctx, st, t) => {
    bg(ctx)
    ctx.strokeStyle = INK
    const depthMax = Math.min(6, 1 + Math.floor((t % 8) * 1.1))
    const branch = (x, y, ang, len, d) => {
      if (d === 0 || len < 1.5) {
        dot(ctx, x, y, 1.3, SEAL)
        return
      }
      const x2 = x + len * Math.cos(ang)
      const y2 = y + len * Math.sin(ang)
      ctx.lineWidth = Math.max(0.7, d * 0.45)
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x2, y2)
      ctx.stroke()
      const sway = 0.06 * Math.sin(t * 1.6 + d)
      branch(x2, y2, ang - 0.48 + sway, len * 0.7, d - 1)
      branch(x2, y2, ang + 0.42 + sway, len * 0.7, d - 1)
    }
    branch(32, 60, -Math.PI / 2, 15, depthMax)
  },
}

// 3 Metaballs：閾值場的融合
SK[3] = {
  init: () => ({}),
  step: () => {},
  render: (ctx, st, t) => {
    bg(ctx)
    const balls = [
      { x: 32 + 12 * Math.sin(t * 0.9), y: 32 + 9 * Math.cos(t * 1.1), r: 9 },
      { x: 32 + 11 * Math.cos(t * 0.7), y: 32 + 11 * Math.sin(t * 0.8), r: 7 },
      { x: 32 + 8 * Math.sin(t * 1.3 + 2), y: 32 + 12 * Math.cos(t * 0.6 + 1), r: 6 },
    ]
    const N = 32
    const c = S / N
    ctx.fillStyle = INK
    for (let gy = 0; gy < N; gy++)
      for (let gx = 0; gx < N; gx++) {
        const px = (gx + 0.5) * c
        const py = (gy + 0.5) * c
        let f = 0
        for (const b of balls) {
          const dx = px - b.x
          const dy = py - b.y
          f += (b.r * b.r) / (dx * dx + dy * dy + 0.001)
        }
        if (f > 1) ctx.fillRect(gx * c, gy * c, c + 0.5, c + 0.5)
      }
    for (const b of balls) dot(ctx, b.x, b.y, 1.6, SEAL)
  },
}

// 4 Voronoi：漂移種子的細胞邊界
SK[4] = {
  init: () => ({ seeds: Array.from({ length: 8 }, (_, i) => i) }),
  step: () => {},
  render: (ctx, st, t) => {
    bg(ctx)
    const pts = st.seeds.map((i) => ({
      x: 32 + 24 * (vnoise(i * 3.1, t * 0.25, 11) - 0.5) * 2,
      y: 32 + 24 * (vnoise(i * 3.1 + 50, t * 0.25, 11) - 0.5) * 2,
    }))
    const N = 40
    const c = S / N
    ctx.fillStyle = INK
    for (let gy = 0; gy < N; gy++)
      for (let gx = 0; gx < N; gx++) {
        const px = (gx + 0.5) * c
        const py = (gy + 0.5) * c
        let d1 = 1e9
        let d2 = 1e9
        for (const p of pts) {
          const d = (px - p.x) ** 2 + (py - p.y) ** 2
          if (d < d1) {
            d2 = d1
            d1 = d
          } else if (d < d2) d2 = d
        }
        if (Math.sqrt(d2) - Math.sqrt(d1) < 1.1) ctx.fillRect(gx * c, gy * c, c + 0.5, c + 0.5)
      }
    pts.forEach((p, i) => dot(ctx, p.x, p.y, 1.5, i === 0 ? SEAL : GRAY))
  },
}

// 5 DLA：隨機遊走粒子的聚集生長
SK[5] = {
  init: () => {
    const g = new Uint8Array(S * S)
    g[32 * S + 32] = 1
    const st = { g, maxR: 2, ages: [[32, 32]] }
    for (let i = 0; i < 140; i++) SK[5].step(st)
    return st
  },
  step: (st) => {
    const { g } = st
    for (let w = 0; w < 3; w++) {
      // 經典優化：出生半徑貼著結晶走、走失即棄，黏著率才夠
      const born = Math.min(28, st.maxR + 6)
      const kill = Math.min(31, st.maxR + 11)
      const a = Math.random() * Math.PI * 2
      let x = Math.round(32 + born * Math.cos(a))
      let y = Math.round(32 + born * Math.sin(a))
      for (let s = 0; s < 900; s++) {
        x += Math.random() < 0.5 ? -1 : 1
        y += Math.random() < 0.5 ? -1 : 1
        const dr = Math.hypot(x - 32, y - 32)
        if (dr > kill || x < 1 || x > S - 2 || y < 1 || y > S - 2) break
        if (g[y * S + x + 1] || g[y * S + x - 1] || g[(y + 1) * S + x] || g[(y - 1) * S + x]) {
          g[y * S + x] = 1
          st.ages.push([x, y])
          st.maxR = Math.max(st.maxR, dr)
          if (st.ages.length > 900) return
          break
        }
      }
    }
  },
  render: (ctx, st) => {
    bg(ctx)
    const recent = st.ages.length - 24
    st.ages.forEach(([x, y], i) => {
      ctx.fillStyle = i > recent ? SEAL : INK
      ctx.fillRect(x, y, 1.6, 1.6)
    })
  },
}

// 6 Random Walk：三種步伐並排
SK[6] = {
  init: () => ({ a: [[16, 32]], b: [[32, 32]], c: [[48, 32]] }),
  step: (st, dt, t) => {
    const push = (arr, nx, ny) => {
      arr.push([Math.max(2, Math.min(62, nx)), Math.max(2, Math.min(62, ny))])
      if (arr.length > 70) arr.shift()
    }
    const [ax, ay] = st.a[st.a.length - 1]
    push(st.a, ax + (Math.random() - 0.5) * 3, ay + (Math.random() - 0.5) * 3)
    const [bx, by] = st.b[st.b.length - 1]
    push(st.b, bx + (Math.random() - 0.35) * 3, by + (Math.random() - 0.5) * 3)
    const [cx, cy] = st.c[st.c.length - 1]
    const na = vnoise(cx * 0.1, t, 3) * Math.PI * 4
    push(st.c, cx + Math.cos(na) * 1.4, cy + Math.sin(na) * 1.4)
  },
  render: (ctx, st) => {
    bg(ctx)
    const line = (arr, col) => {
      ctx.strokeStyle = col
      ctx.lineWidth = 1
      ctx.beginPath()
      arr.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)))
      ctx.stroke()
      const [hx, hy] = arr[arr.length - 1]
      dot(ctx, hx, hy, 2, SEAL)
    }
    line(st.a, GRAY)
    line(st.b, GRAY)
    line(st.c, INK)
  },
}

// 7 Steering：seek 一個遊走的目標
SK[7] = {
  init: () => ({ x: 32, y: 32, vx: 0, vy: 0, trail: [] }),
  step: (st, dt, t) => {
    const tx = 32 + 20 * (vnoise(t * 0.35, 0, 5) - 0.5) * 2
    const ty = 32 + 20 * (vnoise(0, t * 0.35, 9) - 0.5) * 2
    let dx = tx - st.x
    let dy = ty - st.y
    const d = Math.hypot(dx, dy) || 1
    const speed = Math.min(1.8, d * 0.08)
    st.vx += (dx / d) * speed - st.vx * 0.1
    st.vy += (dy / d) * speed - st.vy * 0.1
    st.x += st.vx * 0.5
    st.y += st.vy * 0.5
    st.tx = tx
    st.ty = ty
    st.trail.push([st.x, st.y])
    if (st.trail.length > 40) st.trail.shift()
  },
  render: (ctx, st) => {
    bg(ctx)
    ctx.strokeStyle = GRAY
    ctx.lineWidth = 1
    ctx.beginPath()
    st.trail.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)))
    ctx.stroke()
    dot(ctx, st.tx ?? 32, st.ty ?? 32, 2.2, SEAL)
    dot(ctx, st.x, st.y, 3.2, INK)
  },
}

// 8 Braitenberg：兩感測器直結馬達，撲向光
SK[8] = {
  init: () => ({ x: 20, y: 40, a: 0 }),
  step: (st, dt, t) => {
    const lx = 32 + 16 * Math.cos(t * 0.7)
    const ly = 32 + 16 * Math.sin(t * 0.9)
    const sense = (side) => {
      const sa = st.a + side * 0.5
      const sx = st.x + 4 * Math.cos(sa)
      const sy = st.y + 4 * Math.sin(sa)
      const d = Math.hypot(lx - sx, ly - sy)
      return 1 / (d * d + 1)
    }
    const L = sense(-1)
    const R = sense(1)
    st.a += (R - L) * 55 // 交叉接線＝攻擊性：撲向光
    st.x += Math.cos(st.a) * 1.3
    st.y += Math.sin(st.a) * 1.3
    if (st.x < 2) st.x = 62
    if (st.x > 62) st.x = 2
    if (st.y < 2) st.y = 62
    if (st.y > 62) st.y = 2
    st.lx = lx
    st.ly = ly
  },
  render: (ctx, st) => {
    bg(ctx)
    ctx.fillStyle = 'rgba(195,39,43,0.15)'
    ctx.beginPath()
    ctx.arc(st.lx ?? 32, st.ly ?? 32, 8, 0, Math.PI * 2)
    ctx.fill()
    dot(ctx, st.lx ?? 32, st.ly ?? 32, 2.5, SEAL)
    ctx.save()
    ctx.translate(st.x, st.y)
    ctx.rotate(st.a)
    ctx.fillStyle = INK
    ctx.beginPath()
    ctx.moveTo(5, 0)
    ctx.lineTo(-4, 3.5)
    ctx.lineTo(-4, -3.5)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  },
}

// 9 Spring-Mass：垂墜擺動的觸手（Verlet）
SK[9] = {
  init: () => {
    const pts = Array.from({ length: 8 }, (_, i) => ({ x: 20 + i * 3.4, y: 12 + i * 5, px: 20 + i * 3.4, py: 12 + i * 5 }))
    return { pts }
  },
  step: (st, dt, t) => {
    const { pts } = st
    for (let i = 1; i < pts.length; i++) {
      const p = pts[i]
      const vx = (p.x - p.px) * 0.985
      const vy = (p.y - p.py) * 0.985
      p.px = p.x
      p.py = p.y
      p.x += vx + (i === pts.length - 1 ? Math.sin(t * 1.8) * 0.12 : 0)
      p.y += vy + 0.09
    }
    for (let k = 0; k < 4; k++)
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1]
        const b = pts[i]
        const dx = b.x - a.x
        const dy = b.y - a.y
        const d = Math.hypot(dx, dy) || 1
        const diff = (d - 6.2) / d
        const wa = i === 1 ? 0 : 0.5
        a.x += dx * diff * wa * 0.5
        a.y += dy * diff * wa * 0.5
        b.x -= dx * diff * (1 - wa * 0.5)
        b.y -= dy * diff * (1 - wa * 0.5)
      }
    pts[0].x = 20
    pts[0].y = 12
  },
  render: (ctx, st) => {
    bg(ctx)
    ctx.strokeStyle = INK
    ctx.lineWidth = 2
    ctx.beginPath()
    st.pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)))
    ctx.stroke()
    st.pts.forEach((p, i) => dot(ctx, p.x, p.y, i ? 1.6 : 2.6, i === st.pts.length - 1 ? SEAL : INK))
  },
}

// 10 IK（FABRIK）：多節觸手追目標
SK[10] = {
  init: () => ({ pts: Array.from({ length: 9 }, (_, i) => ({ x: 32, y: 60 - i * 6 })) }),
  step: (st, dt, t) => {
    const L = 6
    const pts = st.pts
    const tx = 32 + 20 * Math.sin(t * 0.9) + 3 * Math.sin(t * 3)
    const ty = 26 + 14 * Math.sin(t * 1.4)
    // forward
    pts[pts.length - 1].x = tx
    pts[pts.length - 1].y = ty
    for (let i = pts.length - 2; i >= 0; i--) {
      const dx = pts[i].x - pts[i + 1].x
      const dy = pts[i].y - pts[i + 1].y
      const d = Math.hypot(dx, dy) || 1
      pts[i].x = pts[i + 1].x + (dx / d) * L
      pts[i].y = pts[i + 1].y + (dy / d) * L
    }
    // backward（根固定）
    pts[0].x = 32
    pts[0].y = 60
    for (let i = 1; i < pts.length; i++) {
      const dx = pts[i].x - pts[i - 1].x
      const dy = pts[i].y - pts[i - 1].y
      const d = Math.hypot(dx, dy) || 1
      pts[i].x = pts[i - 1].x + (dx / d) * L
      pts[i].y = pts[i - 1].y + (dy / d) * L
    }
    st.tx = tx
    st.ty = ty
  },
  render: (ctx, st, t) => {
    bg(ctx)
    ctx.strokeStyle = INK
    ctx.lineWidth = 2
    ctx.beginPath()
    st.pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)))
    ctx.stroke()
    st.pts.forEach((p) => dot(ctx, p.x, p.y, 1.5))
    if (Math.floor(t * 2) % 2 === 0) dot(ctx, st.tx ?? 32, st.ty ?? 26, 2.4, SEAL)
  },
}

// 11 康威生命遊戲：真實規則，新生格帶紅
SK[11] = {
  init: () => {
    const N = 26
    const g = new Uint8Array(N * N)
    for (let i = 0; i < N * N; i++) g[i] = hash2(i % N, Math.floor(i / N), 42) < 0.32 ? 1 : 0
    const st = { N, g, born: new Uint8Array(N * N), acc: 0 }
    for (let i = 0; i < 6; i++) SK[11].tick(st)
    return st
  },
  tick: (st) => {
    const { N, g } = st
    const ng = new Uint8Array(N * N)
    const nb = new Uint8Array(N * N)
    for (let y = 0; y < N; y++)
      for (let x = 0; x < N; x++) {
        let n = 0
        for (let dy = -1; dy <= 1; dy++)
          for (let dx = -1; dx <= 1; dx++) {
            if (!dx && !dy) continue
            n += g[((y + dy + N) % N) * N + ((x + dx + N) % N)]
          }
        const i = y * N + x
        if (g[i]) ng[i] = n === 2 || n === 3 ? 1 : 0
        else {
          ng[i] = n === 3 ? 1 : 0
          nb[i] = ng[i]
        }
      }
    st.g = ng
    st.born = nb
  },
  step: (st, dt) => {
    st.acc += dt
    if (st.acc > 0.22) {
      st.acc = 0
      SK[11].tick(st)
    }
  },
  render: (ctx, st) => {
    bg(ctx)
    const { N, g, born } = st
    const c = S / N
    for (let y = 0; y < N; y++)
      for (let x = 0; x < N; x++) {
        const i = y * N + x
        if (g[i]) {
          ctx.fillStyle = born[i] ? SEAL : INK
          ctx.fillRect(x * c + 0.4, y * c + 0.4, c - 0.8, c - 0.8)
        }
      }
  },
}

// 12 Boids：真實三規則群集
SK[12] = {
  init: () => ({
    bs: Array.from({ length: 15 }, (_, i) => ({
      x: hash2(i, 1, 8) * 64,
      y: hash2(i, 2, 8) * 64,
      vx: (hash2(i, 3, 8) - 0.5) * 2,
      vy: (hash2(i, 4, 8) - 0.5) * 2,
    })),
  }),
  step: (st) => {
    const bs = st.bs
    for (const b of bs) {
      let sx = 0
      let sy = 0
      let ax = 0
      let ay = 0
      let cx = 0
      let cy = 0
      let n = 0
      for (const o of bs) {
        if (o === b) continue
        const dx = o.x - b.x
        const dy = o.y - b.y
        const d = Math.hypot(dx, dy)
        if (d < 18) {
          n++
          ax += o.vx
          ay += o.vy
          cx += o.x
          cy += o.y
          if (d < 8 && d > 0.01) {
            sx -= dx / d
            sy -= dy / d
          }
        }
      }
      if (n) {
        b.vx += ((ax / n) - b.vx) * 0.04 + ((cx / n) - b.x) * 0.004
        b.vy += ((ay / n) - b.vy) * 0.04 + ((cy / n) - b.y) * 0.004
      }
      b.vx += sx * 0.06
      b.vy += sy * 0.06
      const sp = Math.hypot(b.vx, b.vy) || 1
      const lim = Math.min(sp, 1.5) / sp
      b.vx *= lim
      b.vy *= lim
      b.x = (b.x + b.vx + 64) % 64
      b.y = (b.y + b.vy + 64) % 64
    }
  },
  render: (ctx, st) => {
    bg(ctx)
    st.bs.forEach((b, i) => {
      ctx.save()
      ctx.translate(b.x, b.y)
      ctx.rotate(Math.atan2(b.vy, b.vx))
      ctx.fillStyle = i === 0 ? SEAL : INK
      ctx.beginPath()
      ctx.moveTo(3.4, 0)
      ctx.lineTo(-2.4, 1.8)
      ctx.lineTo(-2.4, -1.8)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    })
  },
}

// 13 Physarum：agents＋費洛蒙場
SK[13] = {
  init: () => {
    const N = 48
    const st = {
      N,
      field: new Float32Array(N * N),
      ags: Array.from({ length: 80 }, (_, i) => ({
        x: 24 + hash2(i, 1, 3) * 0.1 * N * 0.5,
        y: 24 + hash2(i, 2, 3) * 0.1 * N * 0.5,
        a: hash2(i, 3, 3) * Math.PI * 2,
      })),
    }
    for (let i = 0; i < 120; i++) SK[13].step(st)
    return st
  },
  step: (st) => {
    const { N, field, ags } = st
    const at = (x, y) => field[((Math.round(y) + N) % N) * N + ((Math.round(x) + N) % N)]
    for (const g of ags) {
      const F = at(g.x + Math.cos(g.a) * 3.2, g.y + Math.sin(g.a) * 3.2)
      const L = at(g.x + Math.cos(g.a - 0.5) * 3.2, g.y + Math.sin(g.a - 0.5) * 3.2)
      const R = at(g.x + Math.cos(g.a + 0.5) * 3.2, g.y + Math.sin(g.a + 0.5) * 3.2)
      if (L > F && L > R) g.a -= 0.32
      else if (R > F && R > L) g.a += 0.32
      else if (F < 0.01) g.a += (Math.random() - 0.5) * 0.6
      g.x = (g.x + Math.cos(g.a) * 0.9 + N) % N
      g.y = (g.y + Math.sin(g.a) * 0.9 + N) % N
      field[Math.round(g.y) % N * N + (Math.round(g.x) % N)] += 0.55
    }
    for (let i = 0; i < field.length; i++) field[i] *= 0.93
  },
  render: (ctx, st) => {
    bg(ctx)
    const { N, field } = st
    const c = S / N
    for (let y = 0; y < N; y++)
      for (let x = 0; x < N; x++) {
        const v = field[y * N + x]
        if (v > 0.08) {
          const k = Math.min(1, v * 0.6)
          ctx.fillStyle = `rgba(26,25,23,${k})`
          ctx.fillRect(x * c, y * c, c + 0.4, c + 0.4)
        }
      }
    st.ags.slice(0, 6).forEach((g) => dot(ctx, (g.x / N) * S, (g.y / N) * S, 1, SEAL))
  },
}

// 14 掠食者—獵物
SK[14] = {
  init: () => ({
    prey: Array.from({ length: 13 }, (_, i) => ({ x: hash2(i, 5, 6) * 64, y: hash2(i, 6, 6) * 64, flash: 0 })),
    pred: [
      { x: 10, y: 10 },
      { x: 54, y: 54 },
    ],
  }),
  step: (st, dt, t) => {
    for (const p of st.prey) {
      const a = vnoise(p.x * 0.08, p.y * 0.08 + t * 0.4, 13) * Math.PI * 4
      p.x = (p.x + Math.cos(a) * 0.9 + 64) % 64
      p.y = (p.y + Math.sin(a) * 0.9 + 64) % 64
      if (p.flash > 0) p.flash -= dt
    }
    for (const pr of st.pred) {
      let best = null
      let bd = 1e9
      for (const p of st.prey) {
        const d = Math.hypot(p.x - pr.x, p.y - pr.y)
        if (d < bd) {
          bd = d
          best = p
        }
      }
      if (best) {
        pr.x += ((best.x - pr.x) / (bd || 1)) * 1.25
        pr.y += ((best.y - pr.y) / (bd || 1)) * 1.25
        if (bd < 3) {
          best.x = Math.random() * 64
          best.y = Math.random() * 64
          best.flash = 0.5
        }
      }
    }
  },
  render: (ctx, st) => {
    bg(ctx)
    for (const p of st.prey) dot(ctx, p.x, p.y, 1.8, p.flash > 0 ? GRAY : INK)
    for (const pr of st.pred) dot(ctx, pr.x, pr.y, 3.4, SEAL)
  },
}

// 15 遺傳演算法：族群向目標收斂（半徑＝基因）
SK[15] = {
  init: () => ({
    pop: Array.from({ length: 12 }, (_, i) => ({ r: 2 + hash2(i, 7, 4) * 14 })),
    gen: 0,
    acc: 0,
    target: 9,
  }),
  step: (st, dt) => {
    st.acc += dt
    if (st.acc < 0.8) return
    st.acc = 0
    st.gen++
    st.pop.sort((a, b) => Math.abs(a.r - st.target) - Math.abs(b.r - st.target))
    const parents = st.pop.slice(0, 4)
    st.pop = Array.from({ length: 12 }, (_, i) => {
      const p = parents[i % 4]
      return { r: Math.max(1.5, p.r + (Math.random() - 0.5) * (i < 4 ? 0.6 : 3)) }
    })
    if (st.gen % 9 === 0) st.target = 4 + Math.random() * 10 // 環境變了，重新演化
  },
  render: (ctx, st) => {
    bg(ctx)
    ctx.strokeStyle = SEAL
    ctx.lineWidth = 1
    ctx.setLineDash([2, 2])
    ctx.beginPath()
    ctx.arc(10, 12, st.target, 0, Math.PI * 2)
    ctx.stroke()
    ctx.setLineDash([])
    st.pop.forEach((ind, i) => {
      const x = 12 + (i % 4) * 14
      const y = 14 + Math.floor(i / 4) * 17
      ctx.strokeStyle = Math.abs(ind.r - st.target) < 1 ? SEAL : INK
      ctx.lineWidth = 1.6
      ctx.beginPath()
      ctx.arc(x, y, ind.r, 0, Math.PI * 2)
      ctx.stroke()
    })
  },
}

// 16 Flow Field：粒子順著雜訊場漂流
SK[16] = {
  init: () => ({
    ps: Array.from({ length: 46 }, (_, i) => ({ x: hash2(i, 8, 2) * 64, y: hash2(i, 9, 2) * 64, tr: [] })),
  }),
  step: (st, dt, t) => {
    for (const p of st.ps) {
      const a = vnoise(p.x * 0.045, p.y * 0.045 + t * 0.08, 17) * Math.PI * 4
      p.x += Math.cos(a) * 1.1
      p.y += Math.sin(a) * 1.1
      if (p.x < 0 || p.x > 64 || p.y < 0 || p.y > 64) {
        p.x = Math.random() * 64
        p.y = Math.random() * 64
        p.tr = []
      }
      p.tr.push([p.x, p.y])
      if (p.tr.length > 7) p.tr.shift()
    }
  },
  render: (ctx, st) => {
    bg(ctx)
    st.ps.forEach((p, i) => {
      ctx.strokeStyle = i % 8 === 0 ? SEAL : 'rgba(26,25,23,0.55)'
      ctx.lineWidth = 1
      ctx.beginPath()
      p.tr.forEach(([x, y], j) => (j ? ctx.lineTo(x, y) : ctx.moveTo(x, y)))
      ctx.stroke()
    })
  },
}

// 17 Space Colonization：枝條朝吸引點生長
SK[17] = {
  init: () => {
    const st = {
      atts: Array.from({ length: 46 }, (_, i) => ({
        x: 8 + hash2(i, 11, 9) * 48,
        y: 4 + hash2(i, 12, 9) * 40,
        done: false,
      })),
      nodes: [{ x: 32, y: 60, parent: -1, fresh: 0 }],
    }
    for (let i = 0; i < 26; i++) SK[17].step(st, 0.1)
    return st
  },
  step: (st) => {
    const { atts, nodes } = st
    const grow = new Map()
    for (const a of atts) {
      if (a.done) continue
      let bi = -1
      let bd = 1e9
      nodes.forEach((n, i) => {
        const d = Math.hypot(a.x - n.x, a.y - n.y)
        if (d < bd) {
          bd = d
          bi = i
        }
      })
      if (bd < 3.2) {
        a.done = true
        continue
      }
      if (bd < 26) {
        const g = grow.get(bi) || { x: 0, y: 0, n: 0 }
        g.x += (a.x - nodes[bi].x) / bd
        g.y += (a.y - nodes[bi].y) / bd
        g.n++
        grow.set(bi, g)
      }
    }
    for (const [bi, g] of grow) {
      const n = nodes[bi]
      const len = Math.hypot(g.x, g.y) || 1
      if (nodes.length < 220)
        nodes.push({ x: n.x + (g.x / len) * 3, y: n.y + (g.y / len) * 3, parent: bi, fresh: 1 })
    }
    for (const n of nodes) if (n.fresh > 0) n.fresh -= 0.05
  },
  render: (ctx, st) => {
    bg(ctx)
    for (const a of st.atts) if (!a.done) dot(ctx, a.x, a.y, 0.9, GRAY)
    ctx.lineWidth = 1.4
    for (const n of st.nodes) {
      if (n.parent < 0) continue
      const p = st.nodes[n.parent]
      ctx.strokeStyle = n.fresh > 0.4 ? SEAL : INK
      ctx.beginPath()
      ctx.moveTo(p.x, p.y)
      ctx.lineTo(n.x, n.y)
      ctx.stroke()
    }
  },
}

// 18 WFC（最簡 tile 版）：逐格放入與左/上相容的管線 tile
const WFC_TILES = [
  // [N, E, S, W] 邊是否有接口
  [0, 0, 0, 0],
  [0, 1, 0, 1],
  [1, 0, 1, 0],
  [0, 1, 1, 0],
  [0, 0, 1, 1],
  [1, 1, 0, 0],
  [1, 0, 0, 1],
  [1, 1, 1, 1],
]
SK[18] = {
  init: () => {
    const st = { N: 8, cells: [], acc: 0, seed: Math.floor(Math.random() * 1e4) }
    for (let i = 0; i < 20; i++) SK[18].place(st)
    return st
  },
  place: (st) => {
    const { N, cells } = st
    if (cells.length >= N * N) {
      st.cells = []
      st.seed = Math.floor(Math.random() * 1e4)
      return
    }
    const i = cells.length
    const x = i % N
    const y = Math.floor(i / N)
    const left = x > 0 ? cells[i - 1] : null
    const top = y > 0 ? cells[i - N] : null
    const ok = WFC_TILES.filter(
      (tl) => (left === null || tl[3] === left[1]) && (top === null || tl[2] === top[0]),
    )
    cells.push(ok[Math.floor(Math.random() * ok.length)] || WFC_TILES[0])
  },
  step: (st, dt) => {
    st.acc += dt
    if (st.acc > 0.09) {
      st.acc = 0
      SK[18].place(st)
    }
  },
  render: (ctx, st) => {
    bg(ctx)
    const { N, cells } = st
    const c = S / N
    ctx.lineWidth = 1.8
    cells.forEach((tl, i) => {
      const x = (i % N) * c
      const y = Math.floor(i / N) * c
      const mx = x + c / 2
      const my = y + c / 2
      ctx.strokeStyle = i === cells.length - 1 ? SEAL : INK
      ctx.beginPath()
      if (tl[0]) {
        ctx.moveTo(mx, y)
        ctx.lineTo(mx, my)
      }
      if (tl[1]) {
        ctx.moveTo(mx, my)
        ctx.lineTo(x + c, my)
      }
      if (tl[2]) {
        ctx.moveTo(mx, my)
        ctx.lineTo(mx, y + c)
      }
      if (tl[3]) {
        ctx.moveTo(x, my)
        ctx.lineTo(mx, my)
      }
      if (!tl[0] && !tl[1] && !tl[2] && !tl[3]) dot(ctx, mx, my, 0.8, GRAY)
      ctx.stroke()
    })
  },
}

export default function AlgoSketch({ index, active = false }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const stRef = useRef(null)
  const tRef = useRef(3.0)

  // 建立 state＋依卡片寬縮放；resize 重畫當前停格
  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const sk = SK[index]
    if (!wrap || !canvas || !sk) return
    if (!stRef.current) {
      stRef.current = sk.init()
      // 通用暖身：讓停格就有故事（軌跡、群形、生長都先跑出來）
      for (let i = 0; i < 90; i++) {
        tRef.current += 1 / 60
        sk.step(stRef.current, 1 / 60, tRef.current)
      }
    }
    const setup = () => {
      const size = wrap.offsetWidth
      if (!size) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = size * dpr
      canvas.height = size * dpr
      const ctx = canvas.getContext('2d')
      ctx.setTransform((size * dpr) / S, 0, 0, (size * dpr) / S, 0, 0)
      sk.render(ctx, stRef.current, tRef.current)
    }
    setup()
    const ro = new ResizeObserver(setup)
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [index])

  // hover 才動；離開停在當下畫格
  useEffect(() => {
    if (!active) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = canvasRef.current
    const sk = SK[index]
    if (!canvas || !sk) return
    const ctx = canvas.getContext('2d')
    let raf
    let last = performance.now()
    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      tRef.current += dt
      sk.step(stRef.current, dt, tRef.current)
      sk.render(ctx, stRef.current, tRef.current)
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
