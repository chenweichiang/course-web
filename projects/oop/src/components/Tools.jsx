import { TOOLS } from '../data'

export default function Tools() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 border-t border-l border-neutral-900">
        {TOOLS.map((t) => (
          <div key={t.name} className="border-b border-r border-neutral-900 bg-paper p-5">
            <div className="flex items-center justify-between gap-3 mb-1">
              <h3 className="font-display text-lg flex items-center gap-2 tracking-wide">
                {t.main && <span className="w-2.5 h-2.5 bg-seal shrink-0" aria-hidden="true" />}
                {t.name}
              </h3>
              <span className="font-mono text-xs px-2 py-0.5 border border-neutral-300 whitespace-nowrap text-neutral-600">
                {t.cost}
              </span>
            </div>
            <div className="font-mono text-xs text-neutral-500 mb-2">{t.role}</div>
            <p className="heti text-sm text-neutral-600 leading-relaxed">{t.note}</p>
          </div>
        ))}
      </div>
      <p className="heti mt-5 text-sm text-neutral-500 max-w-3xl leading-loose">
        <span className="inline-block w-2.5 h-2.5 bg-seal mr-1.5 align-baseline" aria-hidden="true" />
        ＝課程主力。階段壹用不到 AI 工具（也不該用），所以 <strong>W7 之後再訂閱就好</strong>。
        經濟上不方便訂閱的同學：免費保底方案功能足以完成本課所有要求，不會因為工具吃虧——有狀況直接找老師。
      </p>
    </div>
  )
}
