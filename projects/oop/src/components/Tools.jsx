import { TOOLS } from '../data'

export default function Tools() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 border-t border-l border-neutral-900">
        {TOOLS.map((t) => (
          <div key={t.name} className="border-b border-r border-neutral-900 bg-paper p-5">
            <div className="flex items-center justify-between gap-3 mb-1">
              <h3 className="font-display text-lg flex items-center gap-2 tracking-wide">
                {t.main && <span className="w-2.5 h-2.5 bg-seal shrink-0" aria-hidden="true" />}
                {t.name}
              </h3>
              <span className="font-mono text-xs px-2 py-0.5 border border-neutral-300 whitespace-nowrap text-neutral-600">
                {t.cost}
              </span>
            </div>
            <div className="font-mono text-xs text-neutral-500 mb-2">{t.role}</div>
            <p className="heti text-sm text-neutral-600 leading-relaxed">{t.note}</p>
          </div>
        ))}
      </div>
      <p className="heti mt-5 text-sm text-neutral-500 max-w-3xl leading-loose">
        <span className="inline-block w-2.5 h-2.5 bg-seal mr-1.5 align-baseline" aria-hidden="true" />
        為專案主力。第 2 週（9/17）課堂上一起安裝 agy，<strong>上課帶充好電的筆電與可以登入的個人 Google 帳號</strong>。
        訂閱是選配，先用 agy 免費帳號的額度上手，常常不夠再訂，訂的話學期訂三四個月即可，經濟上不方便的同學不會因為工具吃虧，有狀況直接找老師。
      </p>
    </div>
  )
}
