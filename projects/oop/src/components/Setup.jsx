import { SETUP_ACCOUNTS, SETUP_USAGE } from '../data'

const NUMS = ['一', '二', '三', '四', '五']

export default function Setup() {
  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <div>
        <h3 className="font-display text-xl tracking-wide mb-4">申請四個帳號（W1 完成）</h3>
        <div className="card-ink divide-y divide-neutral-900/15">
          {SETUP_ACCOUNTS.map((a) => (
            <div key={a.t} className="p-5">
              <h4 className="font-bold mb-1">
                <a href={a.url} target="_blank" rel="noopener" className="hover:text-seal transition-colors">
                  {a.t} ↗
                </a>
              </h4>
              <p className="heti text-sm text-neutral-600 leading-relaxed">{a.d}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-display text-xl tracking-wide mb-4">帶著走的工作室（環境用法）</h3>
        <div className="card-ink divide-y divide-neutral-900/15">
          {SETUP_USAGE.map((s, i) => (
            <div key={s.t} className="p-5 flex gap-4">
              <div className="font-display text-2xl text-seal shrink-0 select-none" aria-hidden="true">{NUMS[i]}</div>
              <div>
                <h4 className="font-bold mb-1">{s.t}</h4>
                <p className="heti text-sm text-neutral-600 leading-relaxed">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <a
            href="https://github.com/chenweichiang/nthu-oop-portfolio-template"
            target="_blank"
            rel="noopener"
            className="seal-btn inline-block px-5 py-2.5 font-bold text-sm"
          >
            課程 template repo ↗
          </a>
          <span className="text-sm text-neutral-500">詳細步驟與登入排錯都寫在 template 的 README 裡。</span>
        </div>
      </div>
    </div>
  )
}
