import { SUBMIT_STEPS } from '../data'

export default function Submission() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SUBMIT_STEPS.map((s, i) => (
          <div key={s.t} className="border-2 border-neutral-900 rounded-lg bg-white p-5">
            <div className="font-mono text-2xl font-bold text-neutral-300 mb-2">{i + 1}</div>
            <h3 className="font-display font-black mb-2">{s.t}</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">{s.d}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a
          href="gallery/"
          className="nb nb-hover inline-block px-5 py-2.5 bg-amber-400 text-neutral-900 font-bold text-sm"
        >
          看全班作品牆 →
        </a>
        <span className="text-sm text-neutral-500">課程 template repo 與詳細繳交步驟，開學第一週公布。</span>
      </div>
    </div>
  )
}
