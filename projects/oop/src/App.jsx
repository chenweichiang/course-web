import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import Project from './components/Project'
import Milestones from './components/Milestones'
import Assessment from './components/Assessment'
import AIPolicy from './components/AIPolicy'
import Tools from './components/Tools'
import Setup from './components/Setup'
import Submission from './components/Submission'

const SECTIONS = [
  { id: 'project', num: '01', navLabel: '期末專案', label: '期末專案：後未來動物園', summary: '整門課只做一件事——培育一個沒有人類之後的物種，直到牠開園', Component: Project },
  { id: 'milestones', num: '02', navLabel: '里程碑', label: '七個里程碑', summary: '不用週次——完成里程碑＝完成課程。滑到某一格，小動畫會告訴你那一站在做什麼', Component: Milestones },
  { id: 'assessment', num: '03', navLabel: '評量', label: '評量方式', summary: '零考試：課堂檢核＋文件化作業＋critique＋口頭答辯', Component: Assessment },
  { id: 'ai-policy', num: '04', navLabel: 'AI 公約', label: '課堂 AI 公約', summary: '本課獎勵透明，不獎勵僥倖——五條，開學就講明白', Component: AIPolicy },
  { id: 'tools', num: '05', navLabel: '工具', label: '工具配置', summary: 'p5.js 網頁編輯器＋分階段進場的 AI 工具', Component: Tools },
  { id: 'setup', num: '06', navLabel: '準備', label: '開課準備', summary: '四個帳號＋一間帶著走的工作室——學校電腦每次被還原也不怕', Component: Setup },
  { id: 'submission', num: '07', navLabel: '繳交', label: '作業繳交', summary: 'GitHub 作品集 repo：作業繳交＝作品上線', Component: Submission },
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
