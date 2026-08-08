import { useState } from 'react'
import { TOOLKIT_GROUPS, TOOLKIT_NOTE } from '../data'

const LV = ['★', '★★', '★★★']

function CopyButton({ text }) {
  const [done, setDone] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setDone(true)
      setTimeout(() => setDone(false), 1600)
    } catch {}
  }
  return (
    <button
      type="button"
      onClick={copy}
      className={`font-mono text-xs px-2 py-1 border transition-colors ${
        done ? 'border-plan text-plan' : 'border-neutral-400 text-neutral-500 hover:border-neutral-900 hover:text-neutral-900'
      }`}
    >
      {done ? '已複製 ✓' : '複製起手式'}
    </button>
  )
}

export default function Toolkit() {
  return (
    <div className="space-y-12">
      {TOOLKIT_GROUPS.map((g) => (
        <div key={g.cat}>
          <div className="flex items-baseline gap-3 mb-4">
            <h3 className="font-display text-xl tracking-wide">{g.cat}</h3>
            <span className="font-mono text-xs text-plan">{g.hint}</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-neutral-900">
            {g.items.map((a) => (
              <div key={a.name} className="border-b border-r border-neutral-900 bg-paper p-5 flex flex-col gap-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-display text-lg leading-snug">{a.name}</div>
                    <div className="font-mono text-xs text-neutral-500">{a.zh}</div>
                  </div>
                  <span className="font-mono text-xs text-plan shrink-0 mt-1" title="上手難度">{LV[a.lv - 1]}</span>
                </div>
                <p className="heti text-xs text-neutral-500 leading-relaxed">{a.what}</p>
                <p className="heti text-sm text-neutral-700 leading-relaxed">
                  <span className="font-mono text-xs text-plan mr-1">用在</span>
                  {a.use}
                </p>
                <div className="mt-auto pt-2 flex justify-end">
                  <CopyButton text={a.prompt} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <p className="heti text-sm text-neutral-500 max-w-3xl leading-loose">{TOOLKIT_NOTE}</p>
    </div>
  )
}
