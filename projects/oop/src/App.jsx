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
  { id: 'weeks', num: '02', navLabel: '16 週', label: '16 週地圖', summary: '從第一張畫布到期末展演，每一週在做什麼、為什麼', Component: Weeks },
  { id: 'assessment', num: '03', navLabel: '評量', label: '評量方式', summary: '零考試：課堂檢核＋文件化作業＋critique＋口頭答辯', Component: Assessment },
  { id: 'ai-policy', num: '04', navLabel: 'AI 政策', label: 'AI 使用政策', summary: '本課獎勵透明，不獎勵僥倖——五條規則，開學就講明白', Component: AIPolicy },
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
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <a href="#top" className="font-black tracking-tight whitespace-nowrap">
            物件導向程式設計
            <span className="hidden sm:inline text-neutral-400 font-mono font-medium text-xs ml-2">NTHU · 115-1</span>
          </a>
          <div className="flex items-center gap-1 overflow-x-auto">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`px-2.5 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                  active === s.id ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {s.navLabel}
              </a>
            ))}
            <a href="gallery/" className="ml-1 px-2.5 py-1.5 rounded-full text-sm whitespace-nowrap border border-neutral-300 hover:border-neutral-900 transition-colors">
              作業牆 ↗
            </a>
          </div>
        </div>
      </nav>

      <main id="top">
        <Hero />
        {SECTIONS.map(({ id, num, label, summary, Component }) => (
          <section key={id} id={id} className="max-w-6xl mx-auto px-4 py-16 border-t border-neutral-200">
            <div className="mb-8">
              <div className="font-mono text-sm text-neutral-400 mb-1">{num}</div>
              <h2 className="text-3xl font-black tracking-tight">{label}</h2>
              <p className="text-neutral-500 mt-2 max-w-2xl">{summary}</p>
            </div>
            <Component />
          </section>
        ))}
      </main>

      <footer className="border-t border-neutral-200 mt-8">
        <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-neutral-500 flex flex-wrap gap-x-6 gap-y-2 items-center">
          <span>清華大學 科技藝術跨域學士班 · 115-1</span>
          <span>授課教師：江振維</span>
          <a href="https://course.interaction.tw/" className="hover:text-neutral-900">course.interaction.tw</a>
          <a href="gallery/" className="hover:text-neutral-900">作業牆</a>
        </div>
      </footer>
    </div>
  )
}
