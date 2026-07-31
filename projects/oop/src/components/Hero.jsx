import { motion } from 'framer-motion'
import HeroSketch from './HeroSketch'
import SplitHeading from './SplitHeading'

const CHIPS = ['16 週', '零基礎可修', 'p5.js', '零考試', 'AI 揭露制']

export default function Hero() {
  return (
    <header className="relative overflow-hidden">
      <HeroSketch />
      {/* 讓文字區維持可讀：由左往右的白色漸層墊在 sketch 上、內容下 */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-4 pt-32 pb-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="font-mono text-sm text-neutral-500 mb-4">清華大學 科技藝術跨域學士班 · 115-1</div>
          <SplitHeading as="h1" scroll={false} delay={0.15} className="font-display text-5xl sm:text-7xl font-black tracking-tight leading-tight">
            物件導向
            <br />
            程式設計
          </SplitHeading>
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
              <span key={c} className="px-3 py-1 rounded-full border border-neutral-300 bg-white/80 font-mono text-sm text-neutral-600">
                {c}
              </span>
            ))}
          </div>
          <div className="mt-10 font-mono text-xs text-neutral-400">
            {'// 這個背景是一個 flocking 群集系統，用 p5.js 寫的——第 10 週你會親手寫出它'}
          </div>
        </motion.div>
      </div>
    </header>
  )
}
