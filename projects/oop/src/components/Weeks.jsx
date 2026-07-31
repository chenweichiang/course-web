import { WEEKS } from '../data'
import WeekSketch from './WeekSketch'

const DOT = { I: 'bg-sky-400', II: 'bg-amber-400', III: 'bg-violet-500' }
const FLAG = { 檢核: 'bg-neutral-900 text-white', 發表: 'bg-amber-400 text-black', 展演: 'bg-violet-600 text-white' }

export default function Weeks() {
  return (
    <div>
      <ol className="relative border-l-2 border-neutral-900 ml-3">
        {WEEKS.map((wk) => (
          <li key={wk.w} className="relative pl-6 py-2.5 flex items-center gap-4">
            <span className={`absolute -left-[7px] w-3 h-3 border-2 border-neutral-900 ${DOT[wk.phase]}`} />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-sm text-neutral-400 w-10 shrink-0">W{wk.w}</span>
                <span className="font-bold">{wk.title}</span>
                {wk.flag && (
                  <span className={`px-2 py-0.5 border-2 border-neutral-900 rounded-full text-xs font-bold ${FLAG[wk.flag]}`}>
                    {wk.flag}
                  </span>
                )}
              </div>
              <div className="sm:pl-[3.25rem] text-sm text-neutral-500 mt-0.5">{wk.note}</div>
            </div>
            <WeekSketch week={wk.w} phase={wk.phase} />
          </li>
        ))}
      </ol>
      <p className="mt-4 ml-3 pl-6 font-mono text-xs text-neutral-400">
        {'// 右邊每格小動畫都是那一週會學的概念——用最普通的 canvas 就畫得出來'}
      </p>
    </div>
  )
}
