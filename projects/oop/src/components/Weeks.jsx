import { useState } from 'react'
import { WEEKS } from '../data'
import WeekSketch from './WeekSketch'

// 十六週＝4×4 課表格（行動版 2 欄）。滑到哪格，那格的小動畫才醒來。
export default function Weeks() {
  const [hovered, setHovered] = useState(null)

  return (
    <div>
      <ol className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-neutral-900">
        {WEEKS.map((wk) => (
          <li
            key={wk.w}
            className="border-b border-r border-neutral-900 p-4 flex flex-col gap-3 bg-paper"
            onMouseEnter={() => setHovered(wk.w)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-sm text-neutral-400">
                W{wk.w} <span className="text-neutral-300">·</span> <span className="text-[0.7rem]">階段{wk.phase}</span>
              </span>
              {wk.flag && (
                <span className="font-mono text-[0.7rem] font-bold text-paper bg-seal px-1.5 py-0.5">{wk.flag}</span>
              )}
            </div>
            <WeekSketch week={wk.w} active={hovered === wk.w} />
            <div>
              <div className="font-bold leading-snug">{wk.title}</div>
              <div className="heti text-xs text-neutral-500 mt-1 leading-relaxed">{wk.note}</div>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-4 font-mono text-xs text-neutral-400">
        {'// 每格小動畫都是那一週會學的概念——用最普通的 canvas 就畫得出來'}
      </p>
    </div>
  )
}
