import { SUBMIT_STEPS, SUBMIT_HOWTO, REPO_TREE } from '../data'

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
      {/* repo 資料夾結構：template 與各 repo 的 issue 用同一份規格 */}
      <div className="mt-10 border border-neutral-900 bg-paper">
        <div className="p-6 border-b border-neutral-900">
          <h3 className="font-display text-xl tracking-wide mb-2">你的 repo 長什麼樣</h3>
          <p className="heti text-sm text-neutral-600 leading-relaxed max-w-3xl">{REPO_TREE.intro}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr]">
          <div className="min-w-0 p-6 border-b lg:border-b-0 lg:border-r border-neutral-900 overflow-x-auto">
            <pre className="font-mono text-[0.8rem] leading-relaxed text-neutral-700 whitespace-pre">{REPO_TREE.tree}</pre>
          </div>
          <div className="min-w-0 p-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-900/30 text-left">
                  <th className="pb-2 font-mono text-xs text-neutral-500 font-normal">資料夾</th>
                  <th className="pb-2 font-mono text-xs text-neutral-500 font-normal">里程碑</th>
                  <th className="pb-2 font-mono text-xs text-neutral-500 font-normal">截止</th>
                  <th className="pb-2 font-mono text-xs text-neutral-500 font-normal"></th>
                </tr>
              </thead>
              <tbody>
                {REPO_TREE.rows.map((r) => (
                  <tr key={r.f} className="border-b border-neutral-900/10">
                    <td className="py-2 font-mono text-xs">{r.f}</td>
                    <td className="py-2">{r.m}</td>
                    <td className="py-2 font-mono text-xs">{r.due}</td>
                    <td className="py-2 text-xs text-seal">{r.talk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul className="mt-4 space-y-2">
              {REPO_TREE.notes.map((n) => (
                <li key={n} className="heti text-sm text-neutral-600 leading-relaxed">{n}</li>
              ))}
            </ul>
          </div>
        </div>
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
          從 <a href="https://github.com/chenweichiang/oop-portfolio-template" target="_blank" rel="noopener" className="underline hover:text-seal">課程 template</a> 開自己的 repo，詳細步驟見上一節「開工準備」。
        </span>
      </div>
    </div>
  )
}
