import { PHASES } from '../data'

const STYLES = {
  sky: { bg: 'bg-sky-50', badge: 'bg-sky-300' },
  amber: { bg: 'bg-amber-50', badge: 'bg-amber-300' },
  violet: { bg: 'bg-violet-50', badge: 'bg-violet-300' },
}

export default function Phases() {
  return (
    <div className="grid md:grid-cols-3 gap-5">
      {PHASES.map((p) => {
        const s = STYLES[p.color]
        return (
          <div key={p.id} className={`nb nb-hover ${s.bg} p-5 flex flex-col gap-3`}>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 border-2 border-neutral-900 rounded font-mono text-xs font-bold ${s.badge}`}>
                {p.weeks}
              </span>
              <span className="font-mono text-xs text-neutral-500">階段 {p.id}</span>
            </div>
            <div>
              <h3 className="font-display text-xl font-black">{p.name}</h3>
              <div className="text-sm text-neutral-600">{p.subtitle}</div>
            </div>
            <p className="text-sm text-neutral-700 leading-relaxed">{p.desc}</p>
            <div className="text-sm font-bold">目標：{p.goal}</div>
            <div className="mt-auto pt-3 border-t-2 border-neutral-900/15">
              <div className="font-mono text-xs text-neutral-500 mb-1">AI 規則</div>
              <p className="text-sm leading-relaxed">{p.aiRule}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
