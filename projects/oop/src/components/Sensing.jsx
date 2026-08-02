import { useState } from 'react'
import { SENSING } from '../data'
import AlgoSketch from './AlgoSketch'
import { CopyButton } from './Algorithms'

const LV = ['★', '★★', '★★★']
const SKETCH_OFFSET = 19 // AlgoSketch 內感測範例的起始索引

export default function Sensing() {
  const [hovered, setHovered] = useState(null)

  return (
    <div className="space-y-10">
      <p className="heti text-neutral-600 max-w-3xl leading-loose">{SENSING.intro}</p>

      {/* 訊號設計四步 */}
      <div>
        <h3 className="font-display text-xl tracking-wide mb-4">從感測到刺激，訊號設計四步</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-neutral-900">
          {SENSING.method.map((m) => (
            <div key={m.t} className="border-b border-r border-neutral-900 bg-paper p-5">
              <h4 className="font-display text-lg tracking-wide mb-1.5">{m.t}</h4>
              <p className="heti text-sm text-neutral-600 leading-relaxed">{m.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 工具卡片 */}
      <div>
        <h3 className="font-display text-xl tracking-wide mb-4">開源感測工具</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-neutral-900">
          {SENSING.tools.map((a, i) => (
            <div
              key={a.name}
              className="border-b border-r border-neutral-900 bg-paper p-5 flex flex-col gap-2.5"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-mono text-sm font-bold leading-snug">{a.name}</div>
                  <div className="font-display text-lg">{a.zh}</div>
                </div>
                <span className="font-mono text-xs text-seal shrink-0 mt-1" title="難度">{LV[a.lv - 1]}</span>
              </div>
              <AlgoSketch index={SKETCH_OFFSET + i} active={hovered === i} />
              <p className="heti text-xs text-neutral-500 leading-relaxed">{a.what}</p>
              <p className="heti text-sm text-neutral-700 leading-relaxed">
                <span className="font-mono text-xs text-seal mr-1">用在</span>
                {a.use}
              </p>
              <div className="mt-auto pt-2 flex items-center justify-between gap-2">
                <span className="font-mono text-[0.7rem] text-neutral-400 truncate" title={a.ref}>{a.ref}</span>
                <CopyButton text={a.prompt} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 展場守則 */}
      <div className="card-ink p-6">
        <div className="font-mono text-xs text-seal mb-3">展場五件事</div>
        <ul className="grid lg:grid-cols-2 gap-x-8 gap-y-2.5">
          {SENSING.venue.map((v) => (
            <li key={v} className="heti text-sm text-neutral-700 leading-relaxed flex gap-2">
              <span className="text-seal shrink-0" aria-hidden="true">◆</span>
              {v}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
