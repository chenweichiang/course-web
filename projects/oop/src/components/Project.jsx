import { PROJECT } from '../data'

export default function Project() {
  return (
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
  )
}
