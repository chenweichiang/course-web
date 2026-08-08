import { SUBMIT_STEPS, SUBMIT_HOWTO } from '../data'

const NUMS = ['一', '二', '三', '四']

export default function Submission() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-neutral-900">
        {SUBMIT_STEPS.map((s, i) => (
          <div key={s.t} className="border-b border-r border-neutral-900 bg-paper p-5">
            <div className="font-display text-3xl text-seal mb-3 select-none" aria-hidden="true">{NUMS[i]}</div>
            <h3 className="font-bold mb-2">{s.t}</h3>
            <p className="heti text-sm text-neutral-600 leading-relaxed">{s.d}</p>
          </div>
        ))}
      </div>
      {/* GitHub 實務：老師怎麼看到、檔案怎麼上去、簡報怎麼傳 */}
      <div className="mt-10 grid lg:grid-cols-3 border-t border-l border-neutral-900">
        {SUBMIT_HOWTO.map((b) => (
          <div key={b.t} className="border-b border-r border-neutral-900 bg-paper p-6">
            <h3 className="font-bold mb-4">{b.t}</h3>
            <ol className="space-y-3 list-none">
              {b.items.map((it, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-mono text-sm text-seal shrink-0 w-5">{i + 1}</span>
                  <span className="heti text-sm text-neutral-600 leading-relaxed">{it}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <a href="gallery/" className="seal-btn inline-block px-6 py-2.5 font-bold text-sm">
          參觀動物園 →
        </a>
        <span className="text-sm text-neutral-500">
          從 <a href="https://github.com/chenweichiang/oop-portfolio-template" target="_blank" rel="noopener" className="underline hover:text-seal">課程 template</a> 開自己的 repo，詳細步驟見上一節「開課準備」。
        </span>
      </div>
    </div>
  )
}
