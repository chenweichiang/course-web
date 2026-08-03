import { CASE_GROUPS, CASE_NOTE } from '../data'

export default function Cases() {
  return (
    <div className="space-y-12">
      {CASE_GROUPS.map((g) => (
        <div key={g.cat}>
          <div className="flex items-baseline gap-3 mb-4">
            <h3 className="font-display text-xl tracking-wide">{g.cat}</h3>
            <span className="font-mono text-xs text-seal">{g.hint}</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-neutral-900">
            {g.items.map((c) => (
              <div key={c.name} className="border-b border-r border-neutral-900 bg-paper p-5 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-display text-lg leading-snug">
                    {c.url ? (
                      <a href={c.url} target="_blank" rel="noopener" className="hover:text-seal transition-colors">
                        {c.name} ↗
                      </a>
                    ) : (
                      c.name
                    )}
                  </h4>
                  <span className="font-mono text-[0.7rem] text-paper bg-neutral-900 px-1.5 py-0.5 shrink-0 mt-1">{c.type}</span>
                </div>
                <div className="font-mono text-xs text-neutral-400">{c.by}</div>
                <p className="heti text-sm text-neutral-700 leading-relaxed">{c.what}</p>
                <p className="heti text-xs text-neutral-500 leading-relaxed mt-auto pt-1.5 border-t border-neutral-900/10">
                  <span className="font-mono text-seal mr-1">取得</span>
                  {c.get}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <p className="heti text-sm text-neutral-500 max-w-3xl leading-loose">{CASE_NOTE}</p>
    </div>
  )
}
