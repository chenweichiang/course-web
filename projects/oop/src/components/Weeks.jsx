import { useState } from 'react'
import { WEEKS } from '../data'
import WeekSketch from './WeekSketch'

const DOT = { I: 'bg-sky-400', II: 'bg-amber-400', III: 'bg-violet-500' }

export default function Weeks() {
  const [hovered, setHovered] = useState(null)

  return (
    <div>
      <ol className="relative border-l-2 border-neutral-900 ml-3">
        {WEEKS.map((wk) => (
          <li
            key={wk.w}
            className="relative pl-6 py-2.5 flex items-center gap-4 group"
            onMouseEnter={() => setHovered(wk.w)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className={`absolute -left-[7px] w-3 h-3 border-2 border-neutral-900 ${DOT[wk.phase]}`} />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-sm text-neutral-400 w-10 shrink-0">W{wk.w}</span>
                <span className="font-bold">{wk.title}</span>
                {wk.flag && (
                  <span className="px-2 py-0.5 border border-neutral-900 rounded-full text-xs font-bold bg-white">
                    {wk.flag}
                  </span>
                )}
              </div>
              <div className="sm:pl-[3.25rem] text-sm text-neutral-500 mt-0.5">{wk.note}</div>
            </div>
            <WeekSketch week={wk.w} phase={wk.phase} active={hovered === wk.w} />
          </li>
        ))}
      </ol>
      <p className="mt-4 ml-3 pl-6 font-mono text-xs text-neutral-400">
        {'// 滑到某一週，右邊的小格會動起來——那就是那一週要學的概念'}
      </p>
    </div>
  )
}
