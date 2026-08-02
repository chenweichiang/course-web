import { useState } from 'react'
import { MILESTONES } from '../data'
import MilestoneSketch from './MilestoneSketch'

// 里程碑＝課程主結構（順序固定、節奏彈性、不用週次）。滑到哪格，那格的小動畫才醒來。
export default function Milestones() {
  const [hovered, setHovered] = useState(null)

  return (
    <div>
      <ol className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-neutral-900">
        {MILESTONES.map((m, i) => (
          <li
            key={m.id}
            className="border-b border-r border-neutral-900 p-4 flex flex-col gap-3 bg-paper"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-sm text-neutral-400">
                {m.id} <span className="text-neutral-300">·</span> <span className="font-display text-base text-neutral-900">{m.name}</span>
              </span>
              {m.flag && (
                <span className="font-mono text-[0.7rem] font-bold text-paper bg-seal px-1.5 py-0.5">{m.flag}</span>
              )}
            </div>
            <MilestoneSketch index={i} active={hovered === i} />
            <div>
              <div className="font-bold leading-snug">{m.q}</div>
              <div className="heti text-xs text-neutral-500 mt-1.5 leading-relaxed">{m.learn}</div>
              <div className="heti text-xs mt-1.5 leading-relaxed">
                <span className="font-mono text-seal">交付</span> {m.deliver}
              </div>
            </div>
          </li>
        ))}
        {/* 第 8 格：格線補滿＋一句話 */}
        <li className="border-b border-r border-neutral-900 p-4 bg-neutral-900 text-paper flex flex-col justify-center">
          <p className="heti text-sm leading-loose">
            順序固定、節奏彈性——可以超前，落後有 studio time 一對一救援。
            <span className="block mt-2 font-mono text-xs text-neutral-400">// 完成里程碑＝完成課程</span>
          </p>
        </li>
      </ol>
    </div>
  )
}
