import { AI_RULES } from '../data'

const NUMS = ['第一條', '第二條', '第三條', '第四條', '第五條']

export default function AIPolicy() {
  return (
    <div className="grid lg:grid-cols-[2fr_1fr] gap-8 items-start">
      {/* 公約條文 */}
      <div className="card-ink divide-y divide-neutral-900/15">
        {AI_RULES.map((r, i) => (
          <div key={r.t} className="p-5 flex gap-5">
            <div className="font-display text-seal whitespace-nowrap shrink-0 w-16">{NUMS[i]}</div>
            <div>
              <h3 className="font-bold mb-1">{r.t}</h3>
              <p className="heti text-sm text-neutral-600 leading-loose">{r.d}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-6">
        <div className="card-ink p-6">
          <div className="font-mono text-xs text-neutral-500 mb-2">為什麼這樣設計</div>
          <p className="heti text-sm leading-loose text-neutral-700">
            「用這些工具自動化無聊的部分，但保護有趣、有意義的部分，那種摩擦感正是滋養創造力之處。」
          </p>
          <div className="mt-2 font-mono text-xs text-neutral-500">— Zach Lieberman</div>
        </div>
        <p className="heti text-sm text-neutral-500 leading-loose px-1">
          把這一頁的網址交給你的 AI，它會讀到本專案的助教規範，知道該怎麼陪你研究、怎麼提醒你驗證，
          它不會替你寫反思、不會替你決定概念，那些是你的。
        </p>
      </div>
    </div>
  )
}
