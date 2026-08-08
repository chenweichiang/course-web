import { useState } from 'react'
import { MILESTONE_GUIDE, CALENDAR } from '../data'

// 步驟文字支援 [文字](網址) 內嵌連結
function renderLinks(text) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g)
  return parts.map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (m) {
      const ext = !m[2].startsWith('#')
      return (
        <a
          key={i}
          href={m[2]}
          {...(ext ? { target: '_blank', rel: 'noopener' } : {})}
          className="underline decoration-plan decoration-2 underline-offset-2 hover:text-plan"
        >
          {m[1]}
        </a>
      )
    }
    return part
  })
}

// 可勾選的完成清單：進度存 localStorage，學生回來還在
function CheckItem({ id, children }) {
  const [on, setOn] = useState(() => {
    try {
      return localStorage.getItem(id) === '1'
    } catch {
      return false
    }
  })
  const toggle = () => {
    const next = !on
    setOn(next)
    try {
      localStorage.setItem(id, next ? '1' : '0')
    } catch {}
  }
  return (
    <li>
      <button
        type="button"
        onClick={toggle}
        className="flex items-start gap-2.5 text-left w-full group"
        aria-pressed={on}
      >
        <span
          className={`mt-0.5 w-4 h-4 shrink-0 border-2 border-neutral-900 grid place-items-center text-[0.65rem] leading-none ${
            on ? 'bg-plan text-paper' : 'bg-paper group-hover:bg-neutral-900/5'
          }`}
          aria-hidden="true"
        >
          {on ? '✓' : ''}
        </span>
        <span className={`heti text-sm leading-relaxed ${on ? 'text-neutral-400 line-through' : 'text-neutral-700'}`}>
          {children}
        </span>
      </button>
    </li>
  )
}

// 每站的小圖：雙鑽石上的位置標記（第幾站落在哪一顆鑽石的哪個階段）
function DiamondMark({ index }) {
  // 七站在雙鑽石上的水平位置（0~1）：M0 起點、M1-M3 第一顆、M4-M6 第二顆
  const xs = [0.03, 0.18, 0.32, 0.48, 0.62, 0.78, 0.95]
  const x = xs[index] * 100
  return (
    <svg viewBox="0 0 100 34" className="w-full" aria-hidden="true">
      {/* 兩顆鑽石的輪廓 */}
      <path d="M6 17 L27 5 L48 17 L27 29 Z" fill="none" stroke="#1A1917" strokeWidth="1" opacity="0.3" />
      <path d="M52 17 L73 5 L94 17 L73 29 Z" fill="none" stroke="#1A1917" strokeWidth="1" opacity="0.3" />
      {/* 目前位置 */}
      <line x1={x} y1="3" x2={x} y2="31" stroke="#1D4FA5" strokeWidth="2" />
      <circle cx={x} cy="17" r="3.5" fill="#1D4FA5" />
    </svg>
  )
}

export default function MilestoneGuide() {
  return (
    <div className="space-y-14">
      {/* 總覽帶 */}
      <div className="flex flex-wrap gap-2">
        {MILESTONE_GUIDE.map((m) => (
          <a
            key={m.id}
            href={`#${m.id.toLowerCase()}`}
            className="px-3 py-1.5 border border-neutral-900 bg-paper font-mono text-sm hover:bg-neutral-900 hover:text-paper transition-colors"
          >
            {m.id} {m.name}
            {m.flag && <span className="ml-1.5 text-plan font-bold">·{m.flag}</span>}
          </a>
        ))}
      </div>

      {/* 學期節奏：里程碑是主軸 */}
      <div className="border border-neutral-900 bg-paper p-6">
        <div className="font-mono text-xs text-neutral-500 mb-3">學期節奏</div>
        <p className="heti text-sm text-neutral-700 leading-relaxed max-w-3xl">{CALENDAR.intro}</p>
        <p className="heti text-sm text-neutral-600 leading-relaxed max-w-3xl mt-2.5">{CALENDAR.offdays}</p>
      </div>

      {/* 各里程碑詳解 */}
      {MILESTONE_GUIDE.map((m, i) => (
        <article key={m.id} id={m.id.toLowerCase()} className="scroll-mt-24">
          <div className="flex items-start gap-5 mb-5">
            <div className="w-16 sm:w-24 shrink-0 pt-2">
              <DiamondMark index={i} />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-3 flex-wrap">
                <h3 className="font-display text-2xl sm:text-3xl tracking-wide">
                  <span className="font-mono text-lg text-neutral-400 mr-2">{m.id}</span>
                  {m.name}
                </h3>
                {m.flag && (
                  <span className="font-mono text-xs font-bold text-paper bg-plan px-2 py-0.5">{m.flag}</span>
                )}
                {m.when && <span className="font-mono text-xs text-neutral-500">{m.when}</span>}
              </div>
              <p className="heti text-neutral-600 mt-1.5 leading-relaxed max-w-2xl">{m.goal}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-[3fr_2fr] border-t border-l border-neutral-900">
            <div className="border-b border-r border-neutral-900 bg-paper p-6">
              <div className="font-mono text-xs text-neutral-500 mb-3">怎麼做</div>
              <ol className="space-y-2.5 list-none">
                {m.steps.map((st, si) => (
                  <li key={si} className="flex gap-3">
                    <span className="font-mono text-sm text-plan shrink-0 w-5">{si + 1}</span>
                    <span className="heti text-sm text-neutral-700 leading-relaxed">{renderLinks(st)}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="border-b border-r border-neutral-900 bg-paper p-6 flex flex-col gap-5">
              <div>
                <div className="font-mono text-xs text-neutral-500 mb-3">完成了嗎（點一下打勾，進度會記住）</div>
                <ul className="space-y-2">
                  {m.checks.map((c, ci) => (
                    <CheckItem key={ci} id={`dt-${m.id}-${ci}`}>
                      {c}
                    </CheckItem>
                  ))}
                </ul>
              </div>
              <div className="mt-auto pt-4 border-t border-neutral-900/15">
                <div className="font-mono text-xs text-plan mb-1.5">卡點提醒</div>
                <p className="heti text-sm text-neutral-600 leading-relaxed">{renderLinks(m.pitfalls)}</p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
