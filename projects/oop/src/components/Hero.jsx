import { motion } from 'framer-motion'

const CHIPS = ['16 週', '零基礎可修', 'p5.js', '零考試', 'AI 揭露制']

export default function Hero() {
  return (
    <header className="max-w-6xl mx-auto px-4 pt-32 pb-16">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="font-mono text-sm text-neutral-500 mb-4">清華大學 科技藝術跨域學士班 · 115-1</div>
        <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-tight">
          物件導向
          <br />
          程式設計
        </h1>
        <p className="mt-6 text-xl sm:text-2xl font-bold max-w-3xl">
          這門課不跟 AI 搶「寫程式」，
          <br className="hidden sm:block" />
          跟它搶「<span className="underline decoration-4 decoration-amber-400">知道自己在做什麼</span>」。
        </p>
        <p className="mt-4 text-neutral-600 max-w-3xl leading-relaxed">
          AI 可以替你寫碼，但不能替你知道你想做什麼、不能替你看出畫面哪裡不對、不能替你在
          critique 時說明每一個決定。前段我們刻意保護「掙扎的過程」——那種摩擦感正是滋養創造力之處；
          後段我們把 AI 正式請進課堂，學怎麼指揮它、驗證它、揭露它。理解基礎，讓你從被動使用者變成主動創作者。
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {CHIPS.map((c) => (
            <span key={c} className="px-3 py-1.5 rounded-full border border-neutral-300 font-mono text-sm">
              {c}
            </span>
          ))}
        </div>
      </motion.div>
    </header>
  )
}
