import { WEEKS } from '../data'

const DOT = { I: 'bg-sky-500', II: 'bg-amber-500', III: 'bg-violet-500' }
const FLAG = { 檢核: 'bg-neutral-900 text-white', 發表: 'bg-amber-500 text-white', 展演: 'bg-violet-600 text-white' }

export default function Weeks() {
  return (
    <ol className="relative border-l-2 border-neutral-200 ml-3 space-y-0">
      {WEEKS.map((wk) => (
        <li key={wk.w} className="relative pl-6 py-3 group">
          <span className={`absolute -left-[7px] top-5 w-3 h-3 rounded-full ${DOT[wk.phase]}`} />
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-mono text-sm text-neutral-400 w-10">W{wk.w}</span>
            <span className="font-bold">{wk.title}</span>
            {wk.flag && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${FLAG[wk.flag]}`}>{wk.flag}</span>
            )}
          </div>
          <div className="pl-13 sm:pl-[3.25rem] text-sm text-neutral-500 mt-0.5">{wk.note}</div>
        </li>
      ))}
    </ol>
  )
}
