import { READINGS, READING_NOTE } from '../readings'

const LANG = { zh: '中文', en: '英文' }

// 延伸閱讀：每一筆都在 2026-09-17 實際打開核對過（資料在 src/readings.js）
export default function FurtherReading({ id, compact = false }) {
  const items = READINGS[id]
  if (!items || items.length === 0) return null
  return (
    <details className={`group border border-neutral-900 bg-paper ${compact ? 'mt-0' : 'mt-10'}`}>
      <summary className="cursor-pointer select-none list-none px-5 py-3 flex items-center justify-between gap-3 hover:bg-neutral-900/5">
        <span className="font-bold text-sm">
          延伸閱讀與參考資料
          <span className="ml-2 font-mono text-xs text-neutral-500">{items.length} 筆</span>
        </span>
        <span className="font-mono text-xs text-neutral-500 group-open:hidden">展開 ＋</span>
        <span className="font-mono text-xs text-neutral-500 hidden group-open:inline">收合 －</span>
      </summary>
      <ul className="list-none border-t border-neutral-900/15 divide-y divide-neutral-900/10">
        {items.map((r) => (
          <li key={r.url} className="px-5 py-3 grid gap-x-4 gap-y-1 sm:grid-cols-[5.5rem_minmax(0,1fr)]">
            <div className="flex sm:flex-col gap-1.5 items-start">
              <span className="font-mono text-[0.7rem] px-1.5 py-0.5 border border-neutral-300 text-neutral-600 whitespace-nowrap">{r.type}</span>
              <span className="font-mono text-[0.7rem] text-neutral-400">{LANG[r.lang] || r.lang}</span>
            </div>
            <div className="min-w-0">
              <a
                href={r.url}
                target="_blank"
                rel="noopener"
                className="font-bold text-sm underline decoration-neutral-300 underline-offset-2 hover:decoration-seal hover:text-seal break-words"
              >
                {r.title} ↗
              </a>
              <span className="ml-2 text-xs text-neutral-500">
                {r.by}
                {r.year ? `，${r.year}` : ''}
              </span>
              <p className="heti text-sm text-neutral-600 leading-relaxed mt-0.5">{r.note}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="px-5 py-2.5 border-t border-neutral-900/15 text-xs text-neutral-400">{READING_NOTE}</p>
    </details>
  )
}
