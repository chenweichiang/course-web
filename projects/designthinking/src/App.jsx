import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import Project from './components/Project'
import Method from './components/Method'
import MilestoneGuide from './components/MilestoneGuide'
import Deliverables from './components/Deliverables'
import Toolkit from './components/Toolkit'
import Assessment from './components/Assessment'
import AIPolicy from './components/AIPolicy'

const SECTIONS = [
  { id: 'project', num: '01', navLabel: '期末專案', label: '期末專案：2050 未來產品的脈絡設計', summary: '整個專案只做一件事：推演一個 2050 的世界，讓一個人活進去，為他的矛盾設計一件產品，並誠實面對它的陰影', Component: Project },
  { id: 'method', num: '02', navLabel: '方法', label: '方法骨架', summary: '五步驟是動作、雙鑽石是節奏、推測設計是視角，循環經濟是整學期的隱藏軸線', Component: Method },
  { id: 'milestones', num: '03', navLabel: '里程碑', label: '里程碑指南', summary: '照著做就能走完的七站，每站都有步驟、完成清單（會記住你的進度）與卡點提醒', Component: MilestoneGuide },
  { id: 'deliverables', num: '04', navLabel: '交付物', label: '交付物規格', summary: '每一份要交的東西長什麼樣、要填哪些欄、填好是什麼樣子，依里程碑排好，範例用同一個示範專案從頭貫穿到尾', Component: Deliverables },
  { id: 'toolkit', num: '05', navLabel: '方法卡', label: '方法卡', summary: '課程方法卡分五組，每張都有起手式，複製給你的 AI 就能開工', Component: Toolkit },
  { id: 'assessment', num: '06', navLabel: '發表', label: '發表與評量', summary: '期中只講世界與問題，期末講完整的敘事與批判，沒有紙筆考試', Component: Assessment },
  { id: 'ai-policy', num: '07', navLabel: 'AI 公約', label: 'AI 公約', summary: '本課程獎勵透明，不獎勵僥倖', Component: AIPolicy },
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
            設計思考
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
            <a href="https://wiki.interaction.tw/index.php/Course:115-1/設計思考" className="plan-btn ml-2 px-3 py-1 text-sm font-bold whitespace-nowrap">
              知識庫 ↗
            </a>
          </div>
        </div>
      </nav>

      <main id="top">
        <Hero />
        {SECTIONS.map(({ id, num, label, summary, Component }, i) => (
          <section key={id} id={id} className={`max-w-6xl mx-auto px-5 py-20 ${i > 0 ? 'border-t border-neutral-900/15' : ''}`}>
            <div className="mb-10 flex items-baseline gap-5">
              <div className="font-mono text-sm text-plan shrink-0">{num}</div>
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
          <div className="font-display text-lg tracking-widest">設計思考</div>
          <div className="mt-3 font-mono text-xs text-neutral-500 leading-relaxed">
            授課教師 江振維 · <a href="https://course.interaction.tw/" className="hover:text-neutral-900">course.interaction.tw</a> · <a href="https://wiki.interaction.tw/index.php/Course:115-1/設計思考" className="hover:text-neutral-900">課程知識庫</a>
          </div>
          <div className="mt-5 mx-auto grid grid-cols-2 w-10 h-10 bg-plan text-paper font-display text-[0.6rem] leading-none place-items-center select-none" aria-hidden="true">
            <span>設</span><span>計</span><span>思</span><span>考</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
