import { PHASES } from '../data'

const BAR = { sky: 'bg-sky-400', amber: 'bg-amber-400', violet: 'bg-violet-500' }

export default function Phases() {
  return (
    <div className="grid md:grid-cols-3 gap-5">
      {PHASES.map((p) => (
        <div key={p.id} className="border-2 border-neutral-900 rounded-lg overflow-hidden bg-white flex flex-col">
          <div className={`h-1 ${BAR[p.color]}`} />
          <div className="p-5 flex flex-col gap-3 flex-1">
            <div className="font-mono text-xs text-neutral-500">
              階段 {p.id} · {p.weeks}
            </div>
            <div>
              <h3 className="font-display text-xl font-black">{p.name}</h3>
              <div className="text-sm text-neutral-500">{p.subtitle}</div>
            </div>
            <p className="heti text-sm text-neutral-600 leading-relaxed">{p.desc}</p>
            <div className="text-sm font-bold">目標：{p.goal}</div>
            <div className="mt-auto pt-3 border-t border-neutral-200">
              <div className="font-mono text-xs text-neutral-400 mb-1">AI 規則</div>
              <p className="text-sm leading-relaxed">{p.aiRule}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
