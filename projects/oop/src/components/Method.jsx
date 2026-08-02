import { METHOD_STEPS, METHOD_RHYTHM } from '../data'

export default function Method() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 border-t border-l border-neutral-900">
        {METHOD_STEPS.map((m) => (
          <div key={m.t} className="border-b border-r border-neutral-900 bg-paper p-6">
            <h3 className="font-display text-xl tracking-wide mb-2">{m.t}</h3>
            <p className="heti text-sm text-neutral-600 leading-loose">{m.d}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 card-ink p-6">
        <div className="font-mono text-xs text-neutral-500 mb-3">工作節奏（貼在心上）</div>
        <ul className="grid lg:grid-cols-2 gap-x-8 gap-y-2.5">
          {METHOD_RHYTHM.map((r) => (
            <li key={r} className="heti text-sm text-neutral-700 leading-relaxed flex gap-2">
              <span className="text-seal shrink-0" aria-hidden="true">◆</span>
              {r}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
