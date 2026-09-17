import { WEEKS, CALENDAR, SESSION_FLOW } from '../data'

// 上課日（週四）前後三天都算「這一週」，用來標出本週
function weekState(dateStr, now) {
  const d = new Date(`${dateStr}T00:00:00+08:00`)
  const start = new Date(d.getTime() - 3 * 86400000)
  const end = new Date(d.getTime() + 4 * 86400000)
  if (now < start) return 'future'
  if (now >= end) return 'past'
  return 'current'
}

function fmt(dateStr) {
  const [, m, d] = dateStr.split('-')
  return `${Number(m)}/${Number(d)}`
}

export default function WeekPlan() {
  const now = new Date()
  const current = WEEKS.find((wk) => weekState(wk.date, now) === 'current')

  return (
    <div>
      <div className="border border-neutral-900 bg-paper p-6 mb-8">
        <div className="font-mono text-xs text-neutral-500 mb-3">學期節奏</div>
        <p className="heti text-sm text-neutral-700 leading-relaxed max-w-3xl">{CALENDAR.intro}</p>
        <p className="heti text-sm text-neutral-600 leading-relaxed max-w-3xl mt-2.5">{CALENDAR.offdays}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-neutral-500">
          <span className="flex items-center gap-1.5">
            <span className="font-mono font-bold text-paper bg-seal px-1.5 py-0.5">報告站</span>
            每個人都要上台
          </span>
          {current && (
            <a href={`#week-${current.w}`} className="underline decoration-seal decoration-2 underline-offset-2 hover:text-seal">
              跳到本週（第 {current.w} 週，{fmt(current.date)}）↓
            </a>
          )}
        </div>
      </div>

      {/* 每次上課怎麼進行 */}
      <div className="mb-8">
        <h3 className="font-display text-xl tracking-wide mb-2">每次上課怎麼進行</h3>
        <p className="heti text-sm text-neutral-600 leading-relaxed max-w-3xl mb-4">{SESSION_FLOW.intro}</p>
        <p className="heti text-sm text-neutral-700 leading-relaxed max-w-3xl mb-4 border-l-4 border-seal pl-3">{SESSION_FLOW.prep}</p>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-neutral-900 list-none">
          {SESSION_FLOW.steps.map((st, i) => (
            <li key={st.t} className="min-w-0 border-b border-r border-neutral-900 bg-paper p-5">
              <div className="flex items-baseline justify-between gap-2 mb-2">
                <span className="font-display text-2xl text-seal select-none" aria-hidden="true">{i + 1}</span>
                <span className="font-mono text-xs text-neutral-500">{st.time}</span>
              </div>
              <h4 className="font-bold mb-1">{st.t}</h4>
              <p className="heti text-sm text-neutral-600 leading-relaxed">{st.d}</p>
            </li>
          ))}
        </ol>
        <p className="heti text-sm text-neutral-500 leading-relaxed max-w-3xl mt-3">{SESSION_FLOW.station}</p>
      </div>

      <ol className="border-t border-neutral-900 list-none">
        {WEEKS.map((wk) => {
          const state = weekState(wk.date, now)
          return (
            <li
              key={wk.w}
              id={`week-${wk.w}`}
              className={`scroll-mt-24 border-b border-neutral-900/80 grid gap-x-6 gap-y-3 py-5 px-4 sm:px-5 grid-cols-1 md:grid-cols-[8.5rem_minmax(0,1fr)_minmax(0,1fr)] ${
                state === 'current' ? 'bg-seal/[0.06] border-l-4 border-l-seal' : 'bg-paper'
              }`}
            >
              {/* 週次＋日期＋里程碑 */}
              <div className="flex md:flex-col items-baseline md:items-start gap-x-3 gap-y-1.5 flex-wrap">
                <div className="font-display text-2xl leading-none">
                  <span className={state === 'past' ? 'text-neutral-400' : ''}>{fmt(wk.date)}</span>
                  <span className="text-sm text-neutral-500 ml-1">週四</span>
                </div>
                <div className="font-mono text-xs text-neutral-500">
                  第 {wk.w} 週 ·{' '}
                  <a href={`#${wk.m.toLowerCase()}`} className="hover:text-seal underline-offset-2 hover:underline">
                    {wk.m}
                  </a>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {wk.station && (
                    <span className="font-mono text-xs font-bold text-paper bg-seal px-1.5 py-0.5">{wk.station}</span>
                  )}
                  {state === 'current' && (
                    <span className="font-mono text-xs font-bold text-seal border border-seal px-1.5 py-0.5">本週</span>
                  )}
                </div>
              </div>

              {/* 課堂：討論與解決問題 */}
              <div>
                <h3 className="font-bold mb-2 leading-snug">{wk.title}</h3>
                {wk.bring && (
                  <div className="mb-3 border border-seal/60 bg-paper px-3 py-2">
                    <div className="font-mono text-xs text-seal mb-1">課前準備</div>
                    <ul className="space-y-1 list-none">
                      {wk.bring.map((b) => (
                        <li key={b} className="heti text-sm text-neutral-700 leading-relaxed">{b}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="font-mono text-xs text-neutral-500 mb-1.5">課堂上討論與解決</div>
                <ul className="space-y-1.5 list-none">
                  {wk.inClass.map((it, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span className="mt-[0.6em] w-1.5 h-1.5 bg-neutral-900 shrink-0" aria-hidden="true" />
                      <span className="heti text-sm text-neutral-700 leading-relaxed">{it}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 回家推進 */}
              <div className="md:border-l md:border-neutral-900/15 md:pl-6">
                <div className="font-mono text-xs text-seal mb-1.5">下次上課前（課外）</div>
                <p className="heti text-sm text-neutral-600 leading-relaxed">{wk.after}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
