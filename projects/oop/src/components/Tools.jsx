import { TOOLS } from '../data'

export default function Tools() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4">
        {TOOLS.map((t) => (
          <div key={t.name} className={`rounded-xl border p-5 ${t.main ? 'border-neutral-900' : 'border-neutral-200'}`}>
            <div className="flex items-center justify-between gap-3 mb-1">
              <h3 className="font-black">{t.name}</h3>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-neutral-100 whitespace-nowrap">{t.cost}</span>
            </div>
            <div className="text-sm text-neutral-500 mb-2">{t.role}</div>
            <p className="text-sm text-neutral-600 leading-relaxed">{t.note}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-neutral-500 max-w-3xl">
        階段 I 用不到 AI 工具（也不該用），所以 <strong>W7 之後再訂閱就好</strong>。
        經濟上不方便訂閱的同學：免費保底方案功能足以完成本課所有要求，不會因為工具吃虧——有狀況直接找老師。
      </p>
    </div>
  )
}
