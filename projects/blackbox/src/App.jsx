import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Hero from './components/Hero'
import FeelingExplorer from './components/FeelingExplorer'
import DesignProcess from './components/DesignProcess'
import HardwareGuide from './components/HardwareGuide'
import StateMachine from './components/StateMachine'
import BoxVisualization from './components/BoxVisualization'
import MultiBoxSystem from './components/MultiBoxSystem'
import AIWorkflow from './components/AIWorkflow'
import DocumentationGuide from './components/DocumentationGuide'
import BlindTest from './components/BlindTest'
import CaseStudies from './components/CaseStudies'
import Rubrics from './components/Rubrics'
import VideoGuide from './components/VideoGuide'

const SECTIONS = [
  {
    id: 'feeling',
    num: '01',
    navLabel: '感受',
    label: '感受探索器',
    summary: '把情緒詞拆解成感官語言，找到可以用硬體傳遞的物理機制',
    Component: FeelingExplorer,
  },
  {
    id: 'design-process',
    num: '02',
    navLabel: '設計流程',
    label: '設計流程',
    summary: '五步驟讓每個設計決策有書面理由：感受定義 → 感官屬性 → 輸出機制 → 材料 → 結構',
    Component: DesignProcess,
  },
  {
    id: 'hardware',
    num: '03',
    navLabel: '硬體',
    label: '硬體指南',
    summary: 'Arduino Uno Q（3.3V 雙核）與 Raspberry Pi 5 的規格、接線圖與元件相容性',
    Component: HardwareGuide,
  },
  {
    id: 'statemachine',
    num: '04',
    navLabel: '程式',
    label: '程式架構',
    summary: 'State machine 四狀態框架（IDLE → SENSING → ACTIVE → RELEASE）——先看懂架構，再把模板交給 AI 實作',
    Component: StateMachine,
  },
  {
    id: 'box',
    num: '05',
    navLabel: '盒子',
    label: '盒子設計',
    summary: '15cm 正立方體的限制、材料選擇與內部結構安排方式',
    Component: BoxVisualization,
  },
  {
    id: 'multibox',
    num: '06',
    label: '跨組串聯（選擇性）',
    summary: '非必要，但做了會加分。如果你們的概念跟另一組有關聯，可以討論讓兩個盒子互相串聯',
    Component: MultiBoxSystem,
  },
  {
    id: 'ai',
    num: '07',
    navLabel: 'AI 協作',
    label: 'AI 協作工作流',
    summary: 'Antigravity + GitHub 備份、怎麼寫好 prompt、CLI 指令速查、AI 輔助除錯',
    Component: AIWorkflow,
  },
  {
    id: 'docs',
    num: '08',
    navLabel: '文件',
    label: '海報規範 & 必交文件',
    summary: 'A3 橫式海報版面規範（五種設計流派配色）· 必交三份文件：設計概要 · 材料說明 · 系統說明，含好壞範例對比',
    Component: DocumentationGuide,
  },
  {
    id: 'blindtest',
    num: '09',
    label: '盲測',
    summary: '找 3+ 人在不解釋設計的情況下使用盒子，誠實記錄感受與意圖的落差',
    Component: BlindTest,
  },
  {
    id: 'cases',
    num: '10',
    navLabel: '案例',
    label: '參考案例',
    summary: '震動 · 聲音 · 光 · 動作，四大類真實設計案例與搜尋關鍵字',
    Component: CaseStudies,
  },
  {
    id: 'rubrics',
    num: '11',
    navLabel: '評分',
    label: '評分標準',
    summary: '設計邏輯 · 形式一致 · 工程完整 · 盲測 · 反思，五個面向的評審標準說明',
    Component: Rubrics,
  },
  {
    id: 'video',
    num: '12',
    navLabel: '影片',
    label: '作品記錄影片',
    summary: '2-3 分鐘橫式拍攝指南：作品展示 · 操作方法 · 使用情境 · 內部構造',
    Component: VideoGuide,
  },
]

const NAV = SECTIONS.filter(s => s.navLabel).map(s => ({
  href: `#${s.id}`,
  label: s.navLabel,
  num: s.num,
}))

function TopNav({ items }) {
  const [open, setOpen] = useState(false)

  // Close on Escape; lock body scroll while drawer open
  useEffect(() => {
    if (!open) return
    const handleKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', handleKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-zinc-900">
        {/* Bar */}
        <div className="flex items-center justify-between px-5 lg:px-8 h-14 lg:h-[58px]">
          <a
            href="#"
            onClick={() => setOpen(false)}
            className="mono text-zinc-700 text-xs tracking-widest font-semibold hover:text-zinc-900 transition-colors"
          >
            黑盒子 · 期末專案
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex gap-5">
            {items.map(item => (
              <a
                key={item.href}
                href={item.href}
                className="mono text-zinc-400 text-xs hover:text-zinc-900 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? '關閉選單' : '開啟選單'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="lg:hidden relative w-11 h-11 flex items-center justify-center -mr-2.5 active:scale-95 transition-transform"
          >
            <span className="relative w-5 h-3.5 block">
              <motion.span
                aria-hidden="true"
                className="absolute left-0 top-0 w-5 h-0.5 bg-zinc-900 rounded-full origin-center"
                animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                aria-hidden="true"
                className="absolute left-0 top-1/2 -mt-px w-5 h-0.5 bg-zinc-900 rounded-full"
                animate={{ opacity: open ? 0 : 1, x: open ? -8 : 0 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                aria-hidden="true"
                className="absolute left-0 bottom-0 w-5 h-0.5 bg-zinc-900 rounded-full origin-center"
                animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </span>
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              key="drawer"
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              className="lg:hidden overflow-hidden bg-white border-t border-zinc-100"
            >
              <div className="max-h-[calc(100vh-56px)] overflow-y-auto py-1">
                {items.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.025, duration: 0.18 }}
                    className="flex items-center gap-4 px-5 py-3.5 border-b border-zinc-100 last:border-b-0 active:bg-zinc-100 transition-colors"
                  >
                    <span className="mono text-[10px] text-[#CC0000] font-bold w-6 shrink-0 tracking-widest">
                      {item.num}
                    </span>
                    <span className="text-zinc-800 text-[15px] flex-1 leading-none">{item.label}</span>
                    <span className="mono text-zinc-300 text-xs shrink-0">→</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Backdrop (mobile only) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
            className="lg:hidden fixed inset-0 bg-black/30 z-40"
          />
        )}
      </AnimatePresence>
    </>
  )
}

function SectionRow({ id, num, label, summary, Component, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div id={id} className="border-t border-zinc-200">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-5 px-8 py-5 text-left hover:bg-zinc-50 transition-colors group"
      >
        <span className="mono text-[#CC0000] text-xs font-bold w-5 shrink-0">{num}</span>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-zinc-800 text-sm mb-0.5 group-hover:text-zinc-900 transition-colors">
            {label}
          </div>
          <div className="text-zinc-400 text-xs leading-relaxed">{summary}</div>
        </div>
        <span
          className="mono text-zinc-300 text-xs transition-transform duration-200 shrink-0"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          ↓
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <Component />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  return (
    <div className="">
      <TopNav items={NAV} />

      <main className="pt-0">
        <section id="hero"><Hero /></section>

        <div className="border-b border-zinc-200">
          {SECTIONS.map(s => (
            <SectionRow key={s.id} {...s} />
          ))}
        </div>
      </main>

      <footer className="px-5 lg:px-8 py-10 lg:py-12 border-t border-zinc-200 bg-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-6">
          <p className="mono text-zinc-400 text-xs tracking-wide">
            互動設計 · 黑盒子期末專案
          </p>

          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-6 gap-0 -mx-2 lg:mx-0">
            <p className="mono text-[10px] text-zinc-300 tracking-widest font-bold mb-1 lg:hidden px-2">
              EXTERNAL DOCS ——
            </p>
            {[
              { href: 'https://docs.arduino.cc/hardware/uno-q/', label: 'Arduino Uno Q 文件' },
              { href: 'https://www.raspberrypi.com/documentation/', label: 'Raspberry Pi 文件' },
              { href: 'https://tangible.media.mit.edu/projects/', label: 'MIT Tangible Media' },
            ].map(link => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mono text-zinc-400 lg:text-zinc-300 text-xs py-2.5 px-2 lg:py-0 lg:px-0 hover:text-zinc-900 active:text-zinc-700 transition-colors flex items-center justify-between lg:justify-start gap-2 border-b border-zinc-100 lg:border-b-0 last:border-b-0"
              >
                <span>{link.label}</span>
                <span className="text-zinc-300 lg:ml-0.5">↗</span>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
