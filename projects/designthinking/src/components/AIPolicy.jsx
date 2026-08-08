import { AI_RULES, MIRA } from '../data'

const NUMS = ['第一條', '第二條', '第三條', '第四條']

export default function AIPolicy() {
  return (
    <div className="grid lg:grid-cols-[2fr_1fr] gap-8 items-start">
      {/* 公約條文 */}
      <div className="card-ink divide-y divide-neutral-900/15">
        {AI_RULES.map((r, i) => (
          <div key={r.t} className="p-5 flex gap-5">
            <div className="font-display text-plan whitespace-nowrap shrink-0 w-16">{NUMS[i]}</div>
            <div>
              <h3 className="font-bold mb-1">{r.t}</h3>
              <p className="heti text-sm text-neutral-600 leading-loose">{r.d}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-6">
        <div className="border-2 border-neutral-900 bg-paper p-6">
          <div className="flex items-baseline justify-between gap-2 mb-2">
            <h3 className="font-display text-xl tracking-wide">找 MIRA 討論</h3>
            <span className="font-mono text-xs text-plan">課程小助教</span>
          </div>
          <p className="heti text-sm text-neutral-600 leading-loose">{MIRA.intro}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {MIRA.links.map((l) => (
              <a key={l.name} href={l.url} target="_blank" rel="noopener" className="plan-btn px-3 py-1.5 text-sm font-bold">
                {l.name} ↗
              </a>
            ))}
          </div>
          <a href={MIRA.guide} className="mt-3 inline-block font-mono text-xs text-neutral-500 underline underline-offset-2 hover:text-neutral-900">
            MIRA 能力說明 →
          </a>
        </div>
        <div className="card-ink p-6">
          <div className="font-mono text-xs text-neutral-500 mb-2">為什麼這樣設計</div>
          <p className="heti text-sm leading-loose text-neutral-700">
            「推測設計幫我們解開對現實的束縛，去想像其他的可能性。它不是用來預測未來，而是用來幫助我們思考我們想要（或不想要）什麼樣的未來。」
          </p>
          <div className="mt-2 font-mono text-xs text-neutral-500">— Dunne & Raby</div>
        </div>
        <p className="heti text-sm text-neutral-500 leading-loose px-1">
          把這一頁的網址交給你的 AI，它會讀到本課程的協作規範，知道該怎麼陪你們推演、怎麼扮演你們的角色、怎麼提醒你們查證，它不會替你們想產品，也不會在期中前讓你們偷跑講解法，那些是你們的。
        </p>
      </div>
    </div>
  )
}
