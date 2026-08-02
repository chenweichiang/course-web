import { PROJECT } from '../data'

export default function Project() {
  return (
    <div className="grid lg:grid-cols-[3fr_2fr] gap-8 items-start">
      <div>
        {/* 三個核心問題：引文式排版 */}
        <div className="border-l-2 border-seal pl-6 space-y-4">
          {PROJECT.questions.map((q) => (
            <p key={q} className="heti font-display text-xl sm:text-2xl leading-relaxed">
              {q}
            </p>
          ))}
        </div>
        <p className="heti mt-8 text-neutral-600 leading-loose max-w-2xl">{PROJECT.statement}</p>
        <p className="heti mt-4 font-bold max-w-2xl">{PROJECT.motto}</p>
      </div>
      <div className="card-ink p-6">
        <div className="font-mono text-xs text-neutral-500 mb-4">物件導向＝造物的語言</div>
        <dl className="space-y-2.5">
          {PROJECT.mapping.map(([code, life]) => (
            <div key={code} className="flex items-baseline gap-3">
              <dt className="font-mono text-sm w-24 shrink-0 text-neutral-600">{code}</dt>
              <dd className="font-display text-lg">
                <span className="text-seal mr-2" aria-hidden="true">＝</span>
                {life}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
