import { motion } from 'framer-motion'
import HeroSketch from './HeroSketch'

const CHIPS = ['16 週', '零基礎可修', 'p5.js', '零考試', 'AI 揭露制']

export default function Hero() {
  return (
    <header className="relative overflow-hidden border-b border-neutral-900/80">
      <HeroSketch />
      <div className="relative max-w-6xl mx-auto px-5 pt-28 pb-14 md:min-h-[88vh] flex items-stretch gap-8">
        {/* 左：內容 */}
        <motion.div
          className="flex-1 flex flex-col justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="font-mono text-sm text-neutral-500 mb-6">清華大學 科技藝術跨域學士班 · 115-1 · 選修 3 學分</div>

          {/* 行動版：橫排標題 */}
          <h1 className="md:hidden font-display text-6xl leading-tight tracking-tight mb-6">
            物件導向
            <br />
            程式設計
          </h1>

          <p className="text-xl sm:text-2xl font-bold max-w-2xl leading-relaxed">
            這門課不跟 AI 搶「寫程式」，
            <br className="hidden sm:block" />
            跟它搶「<span className="underline decoration-4 decoration-seal underline-offset-4">知道自己在做什麼</span>」。
          </p>
          <p className="heti mt-5 text-neutral-600 max-w-xl leading-loose text-[0.95rem]">
            AI 可以替你寫碼，但不能替你知道你想做什麼、不能替你看出畫面哪裡不對、不能替你在critique時說明每一個決定。前段我們刻意保護「掙扎的過程」——那種摩擦感正是滋養創造力之處；後段我們把 AI 正式請進課堂，學怎麼指揮它、驗證它、揭露它。
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {CHIPS.map((c) => (
              <span key={c} className="px-3 py-1 border border-neutral-400 rounded-full bg-paper/85 font-mono text-[0.8rem] text-neutral-600">
                {c}
              </span>
            ))}
          </div>
          <div className="mt-10 font-mono text-xs text-neutral-400 max-w-xl">
            {'// 這個背景是一個 flocking 群集系統，用 p5.js 寫的——第 10 週你會親手寫出它'}
          </div>
        </motion.div>

        {/* 右：直排大標（活字書卷的原生排法）＋落款印 */}
        <motion.div
          className="hidden md:flex flex-col items-center justify-center gap-8 pr-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <h1 className="vertical-title font-display text-[clamp(3.5rem,9vh,5.5rem)] leading-none">
            物件導向<br />程式設計
          </h1>
          <div
            className="grid grid-cols-2 w-16 h-16 bg-seal text-paper font-display text-sm leading-none place-items-center select-none"
            aria-hidden="true"
          >
            <span>清</span>
            <span>大</span>
            <span>科</span>
            <span>藝</span>
          </div>
        </motion.div>
      </div>
    </header>
  )
}
