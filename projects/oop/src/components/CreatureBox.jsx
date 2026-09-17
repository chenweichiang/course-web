import { CREATURE } from '../data'
import { CopyButton } from './Algorithms'
import CaseImage from './CaseImage'

const ARROW = '→'

function AskBox({ text, flush = false }) {
  return (
    <div className={flush ? '' : 'mt-4 pt-3 border-t border-neutral-900/15'}>
      <div className="flex items-center justify-between gap-3 mb-1.5">
        <span className="font-mono text-xs text-seal">問你的 AI</span>
        <CopyButton text={text} label="複製提問" />
      </div>
      <p className="heti text-xs text-neutral-500 leading-relaxed">{text}</p>
    </div>
  )
}

export default function CreatureBox() {
  const { intro, box, exchange, caseGroups } = CREATURE
  return (
    <div className="space-y-14">
      <p className="heti text-neutral-700 leading-loose max-w-3xl">{intro}</p>

      {/* 養殖箱五個問題 */}
      <div>
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-4 font-display text-xl tracking-wide">
          {box.map((b, i) => (
            <span key={b.k} className="flex items-baseline gap-2">
              {i > 0 && <span className="text-neutral-400 text-base">{ARROW}</span>}
              {b.k}
            </span>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 border-t border-l border-neutral-900">
          {box.map((b, i) => (
            <div key={b.k} className="min-w-0 border-b border-r border-neutral-900 bg-paper p-5 flex flex-col">
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-mono text-sm text-seal">{i + 1}</span>
                <h3 className="font-display text-2xl tracking-wide">{b.k}</h3>
              </div>
              <ul className="space-y-1.5 list-none">
                {b.q.map((q) => (
                  <li key={q} className="flex gap-2">
                    <span className="mt-[0.6em] w-1.5 h-1.5 bg-neutral-900 shrink-0" aria-hidden="true" />
                    <span className="heti text-sm text-neutral-700 leading-relaxed">{q}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <AskBox text={b.ask} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 交流與繁殖 */}
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div>
          <h3 className="font-display text-xl tracking-wide mb-2">你的生物，會遇見別人的生物嗎</h3>
          <p className="heti text-sm text-neutral-600 leading-relaxed mb-4">{exchange.intro}</p>
          <ol className="space-y-2.5 list-none">
            {exchange.questions.map((q, i) => (
              <li key={q} className="flex gap-3">
                <span className="font-mono text-sm text-seal shrink-0 w-5">{i + 1}</span>
                <span className="heti text-sm text-neutral-700 leading-relaxed">{q}</span>
              </li>
            ))}
          </ol>
          <div className="border border-neutral-900 bg-paper p-5 mt-5">
            <AskBox text={exchange.ask} flush />
          </div>
        </div>
        <div>
          <div className="font-mono text-xs text-neutral-500 mb-3">全班要先約好的事（討論題）</div>
          <dl className="card-ink divide-y divide-neutral-900/15">
            {exchange.rules.map((r) => (
              <div key={r.t} className="p-4 grid grid-cols-[6.5rem_1fr] gap-3">
                <dt className="font-bold text-sm">{r.t}</dt>
                <dd className="heti text-sm text-neutral-600 leading-relaxed">{r.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* 真實世界的參考 */}
      <div>
        <h3 className="font-display text-xl tracking-wide mb-4">真實世界怎麼回答這些問題</h3>
        <div className="space-y-8">
          {caseGroups.map((g) => (
            <div key={g.cat}>
              <div className="font-mono text-xs text-seal mb-2">{g.cat}</div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-neutral-900">
                {g.items.map((c) => (
                  <div
                    key={c.name}
                    className="min-w-0 border-b border-r border-neutral-900 bg-paper p-5 flex flex-col"
                  >
                    <CaseImage img={c.img} credit={c.imgCredit} alt={c.name} />
                    <h4 className="font-bold text-sm mb-1.5">
                      <a href={c.url} target="_blank" rel="noopener" className="hover:text-seal transition-colors">
                        {c.name} ↗
                      </a>
                    </h4>
                    <p className="heti text-sm text-neutral-600 leading-relaxed">{c.fact}</p>
                    <div className="mt-auto pt-2 flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-[0.7rem] text-neutral-400">{c.src}</span>
                      {c.video && (
                        <a
                          href={c.video}
                          target="_blank"
                          rel="noopener"
                          className="font-mono text-xs px-2 py-0.5 border border-seal text-seal hover:bg-seal hover:text-paper transition-colors"
                        >
                          看影片 ↗
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
