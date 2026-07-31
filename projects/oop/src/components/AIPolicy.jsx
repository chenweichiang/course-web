import { AI_RULES } from '../data'

export default function AIPolicy() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {AI_RULES.map((r, i) => (
          <div key={r.t} className="nb nb-hover bg-white p-5">
            <div className="font-mono text-sm text-neutral-400 mb-2">規則 {i + 1}</div>
            <h3 className="font-display font-black mb-2">{r.t}</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">{r.d}</p>
          </div>
        ))}
        <div className="nb bg-amber-100 p-5">
          <div className="font-mono text-sm text-amber-700 mb-2">為什麼這樣設計</div>
          <p className="text-sm leading-relaxed text-neutral-800">
            「用這些工具自動化無聊的部分，但保護有趣、有意義的部分——那種摩擦感正是滋養創造力之處。」
            <span className="block mt-1 font-mono text-xs text-neutral-600">— Zach Lieberman</span>
          </p>
        </div>
      </div>
      <p className="mt-6 text-sm text-neutral-500 max-w-3xl">
        把這一頁的網址貼給你的 AI，它會讀到本課的助教規範：各階段能幫什麼、不能幫什麼。
        它不會替你寫反思、不會替你決定概念——那些是你的。
      </p>
    </div>
  )
}
