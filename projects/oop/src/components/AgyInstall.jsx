import { useState } from 'react'
import { AGY_INSTALL } from '../data'
import { CopyButton } from './Algorithms'

function Cmd({ text }) {
  return (
    <div className="mt-2 flex items-stretch border border-neutral-900 bg-ink">
      <code className="flex-1 min-w-0 overflow-x-auto px-3 py-2.5 font-mono text-[0.82rem] leading-relaxed text-paper whitespace-pre">
        {text}
      </code>
      <div className="shrink-0 flex items-center px-2 bg-paper border-l border-neutral-900">
        <CopyButton text={text} label="複製" />
      </div>
    </div>
  )
}

export default function AgyInstall() {
  const [os, setOs] = useState(() => {
    try {
      return /Windows/i.test(navigator.userAgent) ? 'Windows' : 'Mac'
    } catch {
      return 'Mac'
    }
  })
  const p = AGY_INSTALL.platforms.find((x) => x.os === os)

  return (
    <div className="border border-neutral-900 bg-paper">
      <div className="p-6 border-b border-neutral-900">
        <h3 className="font-display text-xl tracking-wide mb-2">在自己的筆電裝 agy</h3>
        <p className="heti text-sm text-neutral-600 leading-relaxed max-w-3xl">{AGY_INSTALL.intro}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr]">
        {/* 左：安裝步驟（依作業系統切換） */}
        <div className="min-w-0 p-6 border-b lg:border-b-0 lg:border-r border-neutral-900">
          <div className="flex gap-0 mb-5" role="tablist" aria-label="選擇作業系統">
            {AGY_INSTALL.platforms.map((x) => (
              <button
                key={x.os}
                type="button"
                role="tab"
                aria-selected={os === x.os}
                onClick={() => setOs(x.os)}
                className={`px-4 py-1.5 border border-neutral-900 -ml-px first:ml-0 font-mono text-sm transition-colors ${
                  os === x.os ? 'bg-neutral-900 text-paper' : 'bg-paper text-neutral-600 hover:bg-neutral-900/8'
                }`}
              >
                {x.os}
              </button>
            ))}
          </div>

          <p className="heti text-sm text-neutral-700 leading-relaxed mb-4">{p.open}</p>
          <ol className="space-y-4 list-none">
            {p.steps.map((st, i) => (
              <li key={st.cmd} className="flex gap-3">
                <span className="font-mono text-sm text-seal shrink-0 w-5 pt-0.5">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="heti text-sm text-neutral-700 leading-relaxed">{st.t}</div>
                  <Cmd text={st.cmd} />
                </div>
              </li>
            ))}
          </ol>
          {p.alt && (
            <div className="mt-5 pt-4 border-t border-neutral-900/15">
              <div className="heti text-sm text-neutral-600 leading-relaxed">{p.alt.t}</div>
              <Cmd text={p.alt.cmd} />
            </div>
          )}
          <p className="heti mt-4 text-xs text-neutral-500 leading-relaxed">{p.where}</p>
        </div>

        {/* 右：第一次啟動與排錯 */}
        <div className="min-w-0 p-6">
          <div className="font-mono text-xs text-neutral-500 mb-3">第一次啟動，和最常卡住的地方</div>
          <dl className="divide-y divide-neutral-900/15">
            {AGY_INSTALL.firstRun.map((f) => (
              <div key={f.t} className="py-3 first:pt-0">
                <dt className="font-bold text-sm mb-1">{f.t}</dt>
                <dd className="heti text-sm text-neutral-600 leading-relaxed">{f.d}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-neutral-500 leading-relaxed">
            {AGY_INSTALL.source}
            <a href={AGY_INSTALL.sourceUrl} target="_blank" rel="noopener" className="ml-1 underline hover:text-seal">
              官方安裝說明 ↗
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
