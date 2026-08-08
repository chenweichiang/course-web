import { ASSESSMENT } from '../data'

export default function Assessment() {
  const { midterm, final, notes } = ASSESSMENT
  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-6 items-stretch">
        {/* 期中 */}
        <div className="card-ink flex flex-col">
          <div className="p-6 border-b border-neutral-900">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-display text-2xl tracking-wide">{midterm.name}</h3>
              <span className="font-mono text-xs font-bold text-paper bg-plan px-2 py-0.5">⭐ 閘門</span>
            </div>
            <p className="heti mt-2 font-bold text-plan">{midterm.rule}</p>
            <p className="heti mt-2 text-sm text-neutral-600 leading-loose">{midterm.desc}</p>
          </div>
          <div className="p-6">
            <div className="font-mono text-xs text-neutral-500 mb-3">評分重點</div>
            <ul className="space-y-2.5">
              {midterm.items.map((it) => (
                <li key={it.t} className="flex items-baseline gap-3">
                  <span className="font-mono text-sm text-plan w-11 shrink-0 text-right">{it.w}</span>
                  <div>
                    <span className="font-bold text-sm">{it.t}</span>
                    <span className="heti text-sm text-neutral-600">：{it.d}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* 期末 */}
        <div className="card-ink flex flex-col">
          <div className="p-6 border-b border-neutral-900">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-display text-2xl tracking-wide">{final.name}</h3>
              <span className="font-mono text-xs font-bold text-paper bg-neutral-900 px-2 py-0.5">🔴 閘門</span>
            </div>
            <p className="heti mt-2 font-bold">{final.rule}</p>
            <p className="heti mt-2 text-sm text-neutral-600 leading-loose">{final.desc}</p>
          </div>
          <div className="p-6 mt-auto">
            <div className="font-mono text-xs text-neutral-500 mb-3">期末的完整敘事</div>
            <p className="heti text-sm text-neutral-700 leading-loose">
              2050 的世界發生了什麼變化 → 誰活在裡面、他真實的困境是什麼 → 你們的產品是什麼、它如何回應痛點 → 它對未來社會提出了什麼質問。四段講完，剛好就是你們的設計理念稿。
            </p>
          </div>
        </div>
      </div>
      <ul className="grid sm:grid-cols-3 gap-4">
        {notes.map((n) => (
          <li key={n} className="border border-neutral-900/30 bg-paper/70 p-4 heti text-sm text-neutral-600 leading-relaxed">
            {n}
          </li>
        ))}
      </ul>
    </div>
  )
}
