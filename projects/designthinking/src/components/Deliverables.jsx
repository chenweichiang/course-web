import { useState } from 'react'
import { DELIVERABLES, DEMO } from '../deliverables'
import { MILESTONE_GUIDE } from '../data'

function Item({ d, open, onToggle }) {
  return (
    <div className="border-b border-neutral-900">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full text-left px-5 py-4 flex items-baseline gap-4 hover:bg-neutral-900/4"
      >
        <span className={`font-mono text-xs w-4 shrink-0 transition-transform ${open ? 'rotate-90' : ''}`} aria-hidden="true">▶</span>
        <span className="font-display text-lg leading-snug">{d.name}</span>
        <span className="font-mono text-xs text-neutral-500 ml-auto shrink-0 text-right">{d.form} · {d.size}</span>
      </button>
      {open && (
        <div className="px-5 pb-6 pl-13 grid lg:grid-cols-[1fr_1.3fr] gap-6">
          <div>
            <p className="heti text-sm text-neutral-700 leading-relaxed">{d.what}</p>
            <div className="font-mono text-xs text-plan mt-4 mb-2">要有的欄位</div>
            <ol className="list-decimal pl-5 space-y-1">
              {d.fields.map((f) => (
                <li key={f} className="text-sm text-neutral-700 leading-relaxed">{f}</li>
              ))}
            </ol>
            {d.tips && (
              <p className="heti text-sm text-neutral-600 leading-relaxed mt-4 border-l-2 border-plan pl-3">{d.tips}</p>
            )}
          </div>
          <div>
            <div className="font-mono text-xs text-plan mb-2">填好的樣子（{DEMO.name}）</div>
            <pre className="heti whitespace-pre-wrap font-sans text-sm text-neutral-800 leading-relaxed bg-neutral-900/4 border border-neutral-900/20 p-4">{d.example}</pre>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Deliverables() {
  const [open, setOpen] = useState(() => new Set())
  const toggle = (key) =>
    setOpen((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  const all = DELIVERABLES.map((d) => `${d.ms}-${d.name}`)
  const allOpen = open.size === all.length
  const groups = MILESTONE_GUIDE.map((m) => ({ m, items: DELIVERABLES.filter((d) => d.ms === m.id) })).filter((g) => g.items.length)

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <p className="heti text-sm text-neutral-600 leading-loose max-w-3xl">{DEMO.note}</p>
        <button
          type="button"
          onClick={() => setOpen(allOpen ? new Set() : new Set(all))}
          className="plan-btn px-3 py-1 text-sm font-bold whitespace-nowrap"
        >
          {allOpen ? '全部收起' : '全部展開'}
        </button>
      </div>
      {groups.map(({ m, items }) => (
        <div key={m.id}>
          <div className="flex items-baseline gap-3 mb-3">
            <span className="font-mono text-sm text-neutral-400">{m.id}</span>
            <h3 className="font-display text-xl tracking-wide">{m.name}</h3>
            <span className="font-mono text-xs text-neutral-500">{items.length} 份</span>
          </div>
          <div className="border-t border-l border-r border-neutral-900 bg-paper">
            {items.map((d) => {
              const key = `${d.ms}-${d.name}`
              return <Item key={key} d={d} open={open.has(key)} onToggle={() => toggle(key)} />
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
