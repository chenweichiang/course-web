import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import Phases from './components/Phases'
import Weeks from './components/Weeks'
import Assessment from './components/Assessment'
import AIPolicy from './components/AIPolicy'
import Tools from './components/Tools'
import Submission from './components/Submission'

const SECTIONS = [
  { id: 'phases', num: '01', navLabel: '三段式', label: '三段式架構', summary: '保護掙扎 → 物件導向＝創作媒材 → AI 課綱化：每個階段有自己的 AI 規則', Component: Phases },
  { id: 'weeks', num: '02', navLabel: '16 週', label: '十六週課表', summary: '從第一張畫布到期末展演。滑到某一格，小動畫會告訴你那週在學什麼', Component: Weeks },
  { id: 'assessment', num: '03', navLabel: '評量', label: '評量方式', summary: '零考試：課堂檢核＋文件化作業＋critique＋口頭答辯', Component: Assessment },
  { id: 'ai-policy', num: '04', navLabel: 'AI 公約', label: '課堂 AI 公約', summary: '本課獎勵透明，不獎勵僥倖——五條，開學就講明白', Component: AIPolicy },
  { id: 'tools', num: '05', navLabel: '工具', label: '工具配置', summary: 'p5.js 網頁編輯器＋分階段進場的 AI 工具', Component: Tools },
  { id: 'submission', num: '06', navLabel: '繳交', label: '作業繳交', summary: 'GitHub 作品集 repo：作業繳交＝作品上線', Component: Submission },
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
            <span className="hidden sm:inline text-neutral-400 font-mono text-xs ml-3">NTHU 115-1</span>
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
              作業牆 ↗
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
            清華大學 科技藝術跨域學士班 · 115-1
            <br />
            授課教師 江振維 · <a href="https://course.interaction.tw/" className="hover:text-neutral-900">course.interaction.tw</a> · <a href="gallery/" className="hover:text-neutral-900">作業牆</a>
          </div>
          <div className="mt-5 mx-auto grid grid-cols-2 w-10 h-10 bg-seal text-paper font-display text-[0.6rem] leading-none place-items-center select-none" aria-hidden="true">
            <span>清</span><span>大</span><span>科</span><span>藝</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
