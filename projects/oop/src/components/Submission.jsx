import { SUBMIT_STEPS } from '../data'

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
      <div className="mt-8 flex flex-wrap items-center gap-5">
        <a href="gallery/" className="seal-btn inline-block px-6 py-2.5 font-bold text-sm">
          看全班作品牆 →
        </a>
        <span className="text-sm text-neutral-500">
          從 <a href="https://github.com/chenweichiang/oop-portfolio-template" target="_blank" rel="noopener" className="underline hover:text-seal">課程 template</a> 開自己的 repo，詳細步驟見上一節「開課準備」。
        </span>
      </div>
    </div>
  )
}
