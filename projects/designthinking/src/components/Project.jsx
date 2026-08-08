import { PROJECT } from '../data'

export default function Project() {
  return (
    <div className="grid lg:grid-cols-[3fr_2fr] gap-8 items-start">
      <div>
        <div className="card-ink p-7">
          <div className="font-mono text-xs text-neutral-500 mb-4">三個起點問題</div>
          <ul className="space-y-4">
            {PROJECT.questions.map((q, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-display text-2xl text-plan leading-none shrink-0">{'一二三'[i]}</span>
                <p className="heti leading-relaxed text-neutral-800">{q}</p>
              </li>
            ))}
          </ul>
        </div>
        <p className="heti mt-6 leading-loose text-neutral-700 max-w-2xl">{PROJECT.statement}</p>
      </div>
      <div className="space-y-6">
        <div className="border-2 border-neutral-900 bg-plan text-paper p-6">
          <div className="font-mono text-xs opacity-70 mb-2">課程一句話</div>
          <p className="heti font-bold leading-relaxed">{PROJECT.motto}</p>
        </div>
        <div className="card-ink p-6">
          <div className="font-mono text-xs text-neutral-500 mb-2">走過的路</div>
          <p className="heti text-sm text-neutral-600 leading-loose">
            訊號 → 世界 → 人 → 矛盾 → 問題 → 構想 → 敘事 → 批判，
            上半學期把問題找對，下半學期把解法做對，兩顆鑽石之間隔著期中發表這道閘門。
          </p>
        </div>
      </div>
    </div>
  )
}
