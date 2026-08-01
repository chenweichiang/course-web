import { ASSESSMENT } from '../data'

export default function Assessment() {
  return (
    <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
      <div className="card-ink divide-y divide-neutral-900/15">
        {ASSESSMENT.map((a) => (
          <div key={a.item} className="p-4">
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="font-bold text-sm sm:text-base">{a.item}</span>
              <span className="font-mono font-bold text-lg whitespace-nowrap">{a.pct}%</span>
            </div>
            <div className="h-2 bg-neutral-900/8 overflow-hidden mb-1.5">
              <div className="h-full bg-seal" style={{ width: `${a.pct * 2.5}%` }} />
            </div>
            <p className="text-sm text-neutral-500">{a.note}</p>
          </div>
        ))}
      </div>
      <div className="space-y-6">
        <div className="bg-neutral-900 text-paper p-6">
          <div className="font-mono text-xs text-neutral-400 mb-2">沒有考試</div>
          <p className="heti text-sm leading-loose">
            評量的對象是<strong>作品與過程</strong>，不是對錯。完成度採三級制（完成／部分完成／未完成），
            每一次發表都含口頭說明——你要能講出自己的每一個決定。
          </p>
        </div>
        <div className="card-ink p-6">
          <div className="font-mono text-xs text-neutral-500 mb-3">作業四件套</div>
          <ol className="text-sm space-y-2 list-none">
            <li><span className="font-mono text-seal mr-2">一</span>程式碼（可執行）</li>
            <li><span className="font-mono text-seal mr-2">二</span>作品截圖或影片</li>
            <li><span className="font-mono text-seal mr-2">三</span>100–200 字反思</li>
            <li><span className="font-mono text-seal mr-2">四</span>AI 揭露欄（沒用到就寫「未使用」）</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
