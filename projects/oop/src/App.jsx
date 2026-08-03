import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import Project from './components/Project'
import Method from './components/Method'
import MilestoneGuide from './components/MilestoneGuide'
import Algorithms from './components/Algorithms'
import Sensing from './components/Sensing'
import Cases from './components/Cases'
import AIPolicy from './components/AIPolicy'
import Tools from './components/Tools'
import Setup from './components/Setup'
import Submission from './components/Submission'

const SECTIONS = [
  { id: 'project', num: '01', navLabel: '期末專案', label: '期末專案：後未來動物園', summary: '整個專案只做一件事：培育沒有人類之後的物種，直到牠開園', Component: Project },
  { id: 'method', num: '02', navLabel: '方法', label: '進行方法', summary: '研究先行迴圈，每個里程碑都跑同一套：研究、選型、查證、動手驗證', Component: Method },
  { id: 'milestones', num: '03', navLabel: '里程碑', label: '里程碑指南', summary: '照著做就能走完的七站，每站都有步驟、完成清單（會記住你的進度）與卡點提醒', Component: MilestoneGuide },
  { id: 'algorithms', num: '04', navLabel: '圖鑑', label: '演算法圖鑑', summary: '19 個造物演算法，挑一個複製起手式交給你的 AI，看牠能長出什麼', Component: Algorithms },
  { id: 'sensing', num: '05', navLabel: '感測', label: '感測互動', summary: '臉、手、身體都是棲地的輸入，開源感測工具與訊號設計方法都在這', Component: Sensing },
  { id: 'cases', num: '06', navLabel: '案例', label: '案例庫', summary: '看別人怎麼想像沒有人類的世界與另一種生命，二十三個案例分五類，取得管道都查證過', Component: Cases },
  { id: 'ai-policy', num: '07', navLabel: 'AI 公約', label: 'AI 公約', summary: '本專案獎勵透明，不獎勵僥倖', Component: AIPolicy },
  { id: 'tools', num: '08', navLabel: '工具', label: '工具配置', summary: 'p5.js 網頁編輯器，加上你的 AI 工作流主力與保底', Component: Tools },
  { id: 'setup', num: '09', navLabel: '準備', label: '開工準備', summary: '四個帳號與帶著走的工作室，學校電腦每次被還原也不怕', Component: Setup },
  { id: 'submission', num: '10', navLabel: '繳交', label: '交付方式', summary: 'GitHub 作品集 repo，每個里程碑一個資料夾，push 就算交付', Component: Submission },
]

export default function App() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div>
      <nav className="fixed top-0 inset-x-0 z-50 bg-paper/92 backdrop-blur border-b border-neutral-900/80">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
          <a href="#top" className="font-display text-lg whitespace-nowrap tracking-wide">
            物件導向程式設計
          </a>
          <div className="flex items-center gap-1 overflow-x-auto">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`px-2.5 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                  active === s.id ? 'bg-neutral-900 text-paper' : 'text-neutral-600 hover:bg-neutral-900/8'
                }`}
              >
                {s.navLabel}
              </a>
            ))}
            <a href="gallery/" className="seal-btn ml-2 px-3 py-1 text-sm font-bold whitespace-nowrap">
              動物園 ↗
            </a>
          </div>
        </div>
      </nav>

      <main id="top">
        <Hero />
        {SECTIONS.map(({ id, num, label, summary, Component }, i) => (
          <section key={id} id={id} className={`max-w-6xl mx-auto px-5 py-20 ${i > 0 ? 'border-t border-neutral-900/15' : ''}`}>
            <div className="mb-10 flex items-baseline gap-5">
              <div className="font-mono text-sm text-seal shrink-0">{num}</div>
              <div>
                <h2 className="font-display text-3xl sm:text-4xl tracking-wide">{label}</h2>
                <p className="heti text-neutral-500 mt-2 max-w-2xl text-[0.95rem]">{summary}</p>
              </div>
            </div>
            <Component />
          </section>
        ))}
      </main>

      {/* 版權頁（colophon） */}
      <footer className="border-t border-neutral-900/80 mt-4">
        <div className="max-w-6xl mx-auto px-5 py-12 text-center">
          <div className="font-display text-lg tracking-widest">物件導向程式設計</div>
          <div className="mt-3 font-mono text-xs text-neutral-500 leading-relaxed">
            授課教師 江振維 · <a href="https://course.interaction.tw/" className="hover:text-neutral-900">course.interaction.tw</a> · <a href="gallery/" className="hover:text-neutral-900">動物園</a>
          </div>
          <div className="mt-5 mx-auto grid grid-cols-2 w-10 h-10 bg-seal text-paper font-display text-[0.6rem] leading-none place-items-center select-none" aria-hidden="true">
            <span>物</span><span>件</span><span>導</span><span>向</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
