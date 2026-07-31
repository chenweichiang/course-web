import { PHASES } from '../data'

const STYLES = {
  sky: { bar: 'bg-sky-500', badge: 'bg-sky-100 text-sky-800', border: 'border-sky-200' },
  amber: { bar: 'bg-amber-500', badge: 'bg-amber-100 text-amber-800', border: 'border-amber-200' },
  violet: { bar: 'bg-violet-500', badge: 'bg-violet-100 text-violet-800', border: 'border-violet-200' },
}

export default function Phases() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {PHASES.map((p) => {
        const s = STYLES[p.color]
        return (
          <div key={p.id} className={`rounded-2xl border ${s.border} overflow-hidden flex flex-col`}>
            <div className={`h-1.5 ${s.bar}`} />
            <div className="p-5 flex flex-col gap-3 flex-1">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded font-mono text-xs font-bold ${s.badge}`}>{p.weeks}</span>
                <span className="font-mono text-xs text-neutral-400">階段 {p.id}</span>
              </div>
              <div>
                <h3 className="text-xl font-black">{p.name}</h3>
                <div className="text-sm text-neutral-500">{p.subtitle}</div>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">{p.desc}</p>
              <div className="text-sm font-bold">目標：{p.goal}</div>
              <div className="mt-auto pt-3 border-t border-neutral-100">
                <div className="font-mono text-xs text-neutral-400 mb-1">AI 規則</div>
                <p className="text-sm leading-relaxed">{p.aiRule}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
