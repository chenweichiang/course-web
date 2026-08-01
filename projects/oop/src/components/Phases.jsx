import { PHASES } from '../data'

export default function Phases() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {PHASES.map((p) => (
        <div key={p.id} className="card-ink flex flex-col">
          <div className="flex items-start justify-between p-5 pb-0">
            <div className="font-display text-6xl text-seal leading-none select-none" aria-hidden="true">
              {p.id}
            </div>
            <span className="font-mono text-xs text-neutral-500 mt-1">{p.weeks}</span>
          </div>
          <div className="p-5 flex flex-col gap-3 flex-1">
            <div>
              <h3 className="font-display text-2xl tracking-wide">{p.name}</h3>
              <div className="font-mono text-xs text-neutral-500 mt-1">{p.subtitle}</div>
            </div>
            <p className="heti text-sm text-neutral-600 leading-loose">{p.desc}</p>
            <div className="text-sm font-bold">目標：{p.goal}</div>
            <div className="mt-auto pt-3 border-t border-neutral-900/15">
              <div className="font-mono text-xs text-neutral-400 mb-1">AI 規則</div>
              <p className="heti text-sm leading-relaxed">{p.aiRule}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
