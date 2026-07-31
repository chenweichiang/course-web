import { ASSESSMENT } from '../data'

export default function Assessment() {
  return (
    <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
      <div className="space-y-3">
        {ASSESSMENT.map((a) => (
          <div key={a.item} className="rounded-xl border border-neutral-200 p-4">
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="font-bold">{a.item}</span>
              <span className="font-mono font-bold text-lg whitespace-nowrap">{a.pct}%</span>
            </div>
            <div className="h-2 rounded-full bg-neutral-100 overflow-hidden mb-2">
              <div className="h-full bg-neutral-900 rounded-full" style={{ width: `${a.pct * 2.5}%` }} />
            </div>
            <p className="text-sm text-neutral-500">{a.note}</p>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <div className="rounded-xl bg-neutral-900 text-white p-5">
          <div className="font-mono text-xs text-neutral-400 mb-2">沒有考試</div>
          <p className="text-sm leading-relaxed">
            評量的對象是<strong>作品與過程</strong>，不是對錯。完成度採三級制（完成／部分完成／未完成），
            每一次發表都含口頭說明——你要能講出自己的每一個決定。
          </p>
        </div>
        <div className="rounded-xl border border-neutral-200 p-5">
          <div className="font-mono text-xs text-neutral-400 mb-2">作業四件套</div>
          <ul className="text-sm space-y-1.5">
            <li>① 程式碼（可執行）</li>
            <li>② 作品截圖或影片</li>
            <li>③ 100–200 字反思</li>
            <li>④ AI 揭露欄（沒用到就寫「未使用」）</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
