import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function RotatingCube({ isOpen, onClick }) {
  const [rotation, setRotation] = useState({ x: -20, y: 30 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef(null)
  const animFrame = useRef(null)
  const autoRotate = useRef(true)
  const rotRef = useRef({ x: -20, y: 30 })

  useEffect(() => {
    let frame
    const loop = () => {
      if (autoRotate.current && !isDragging) {
        rotRef.current.y += 0.3
        setRotation({ x: rotRef.current.x, y: rotRef.current.y })
      }
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [isDragging])

  const handleMouseDown = (e) => {
    setIsDragging(true)
    autoRotate.current = false
    dragStart.current = { x: e.clientX, y: e.clientY, rx: rotRef.current.x, ry: rotRef.current.y }
  }
  const handleMouseMove = (e) => {
    if (!isDragging || !dragStart.current) return
    const dx = e.clientX - dragStart.current.x
    const dy = e.clientY - dragStart.current.y
    rotRef.current.y = dragStart.current.ry + dx * 0.4
    rotRef.current.x = dragStart.current.rx - dy * 0.4
    setRotation({ x: rotRef.current.x, y: rotRef.current.y })
  }
  const handleMouseUp = () => {
    setIsDragging(false)
    setTimeout(() => { autoRotate.current = true }, 2000)
  }

  const size = 160
  const half = size / 2

  const faces = [
    { transform: `translateZ(${half}px)`, label: '觸覺' },
    { transform: `translateZ(-${half}px) rotateY(180deg)`, label: '聽覺' },
    { transform: `rotateY(90deg) translateZ(${half}px)`, label: '視覺' },
    { transform: `rotateY(-90deg) translateZ(${half}px)`, label: '嗅覺' },
    { transform: `rotateX(90deg) translateZ(${half}px)`, label: '動覺' },
    { transform: `rotateX(-90deg) translateZ(${half}px)`, label: '溫覺' },
  ]

  return (
    <div
      className="scene select-none"
      style={{ width: size, height: size, cursor: isDragging ? 'grabbing' : 'grab' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="cube"
        style={{
          width: size,
          height: size,
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
        onClick={onClick}
      >
        {faces.map((face, i) => (
          <div
            key={i}
            className="cube-face flex items-center justify-center"
            style={{
              width: size,
              height: size,
              transform: face.transform,
              background: '#0A0A0A',
              borderColor: isOpen ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.08)',
            }}
          >
            {isOpen && (
              <span className="text-zinc-300 text-xs mono">{face.label}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 3000)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white">
      {/* 15cm label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute top-8 right-8 mono text-zinc-300 text-xs tracking-widest"
      >
        15 × 15 × 15 cm
      </motion.div>

      {/* Course label */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-8 left-8 mono text-zinc-400 text-xs tracking-widest"
      >
        互動設計 114-2 · 期末專案
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* Cube */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="animate-float"
          style={{ filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.25)) drop-shadow(0 10px 15px rgba(0,0,0,0.15))' }}
        >
          <RotatingCube isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-7xl font-black tracking-tighter text-zinc-900 mb-4">
            黑盒子
          </h1>
          <p className="text-zinc-400 text-lg font-light tracking-widest">
            BLACK BOX
          </p>
        </motion.div>

        {/* Tagline */}
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              key="open"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center max-w-md"
            >
              <p className="text-zinc-700 text-xl leading-relaxed">
                一個 <span className="text-zinc-900 font-medium">15cm 正立方體</span>，<br />
                裡面裝著你想傳遞給陌生人的<br />
                <span className="text-zinc-900 font-medium">一個感受</span>。
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6 text-zinc-400 text-sm mono"
              >
                拖曳旋轉盒子 · 向下捲動開始設計
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="closed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <p className="text-zinc-400 text-base">
                {showHint ? '點擊盒子' : '　'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll indicator */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-px h-16 bg-gradient-to-b from-transparent to-zinc-300" />
            <span className="text-xs mono tracking-widest text-zinc-300">SCROLL</span>
          </motion.div>
        )}
      </div>

      {/* Stats bar bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-0 left-0 right-0 border-t-2 border-zinc-900 flex bg-white"
      >
        {[
          { label: '尺寸', value: '15cm³ 正立方體' },
          { label: '預算', value: 'NT$ 1,000' },
          { label: '核心', value: '傳遞一個感受' },
        ].map((item, i) => (
          <div
            key={i}
            className="flex-1 py-4 px-6 border-r border-zinc-200 last:border-r-0"
          >
            <div className="mono text-zinc-400 text-xs mb-1">{item.label}</div>
            <div className="text-zinc-900 text-sm font-medium">{item.value}</div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
