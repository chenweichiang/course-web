import { useState } from 'react'
import { ALGO_GROUPS } from '../data'
import AlgoSketch from './AlgoSketch'

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
        done ? 'border-seal text-seal' : 'border-neutral-400 text-neutral-500 hover:border-neutral-900 hover:text-neutral-900'
      }`}
    >
      {done ? '已複製 ✓' : '複製起手式'}
    </button>
  )
}

export default function Algorithms() {
  const [hovered, setHovered] = useState(null)
  let flat = -1
  return (
    <div className="space-y-12">
      {ALGO_GROUPS.map((g) => (
        <div key={g.cat}>
          <div className="flex items-baseline gap-3 mb-4">
            <h3 className="font-display text-xl tracking-wide">{g.cat}</h3>
            <span className="font-mono text-xs text-seal">{g.hint}</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-neutral-900">
            {g.items.map((a) => {
              flat += 1
              const idx = flat
              return (
              <div
                key={a.name}
                className="border-b border-r border-neutral-900 bg-paper p-5 flex flex-col gap-2.5"
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-mono text-sm font-bold leading-snug">{a.name}</div>
                    <div className="font-display text-lg">{a.zh}</div>
                  </div>
                  <span className="font-mono text-xs text-seal shrink-0 mt-1" title="難度">{LV[a.lv - 1]}</span>
                </div>
                <AlgoSketch index={idx} active={hovered === idx} />
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
              )
            })}
          </div>
        </div>
      ))}
      <p className="heti text-sm text-neutral-500 max-w-3xl leading-loose">
        使用守則：先要「最小可跑版」看懂再加料（讀不懂的碼過不了答辯）；AI 給的參數只是起點，
        「什麼參數像我的物種」只有你能回答；<strong>組合才是作品</strong>——斑紋＋軟身體＋群集＋演化，
        你的物種是演算法的生態系。主參照《The Nature of Code》全書免費線上（natureofcode.com），
        每一條都有原典，研究報告記得引用。
      </p>
    </div>
  )
}
