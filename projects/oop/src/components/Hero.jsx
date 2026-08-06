import { motion } from 'framer-motion'
import HeroSketch from './HeroSketch'

const CHIPS = ['零基礎可修', '研究先行', 'AI 揭露制', '一人一物種']

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
          <div className="font-mono text-sm text-neutral-500 mb-6">一學期的造物專案 · 16 週</div>

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
            AI 可以替你寫碼，但它是機率性的，會一本正經地錯，它不能替你驗證結果，也不能替你在 critique 時說明每個決定，因此這個專案教三件事：看懂 AI（它怎麼運作、會出什麼問題）、指揮 AI（建構自己的工作流，動手前先讓它進行深度研究，開源穩定熱門工具優先）、為你的物種負責（揭露、驗證、把牠完整呈現出來）。
          </p>
          <p className="heti mt-5 font-bold max-w-xl">
            整學期只做一件事，就是<a href="#project" className="underline decoration-seal decoration-2 underline-offset-4 hover:text-seal">期末專案「後未來動物園」</a>：培育沒有人類之後的物種，直到牠開園。
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {CHIPS.map((c) => (
              <span key={c} className="px-3 py-1 border border-neutral-400 rounded-full bg-paper/85 font-mono text-[0.8rem] text-neutral-600">
                {c}
              </span>
            ))}
          </div>
          <div className="mt-10 font-mono text-xs text-neutral-400 max-w-xl">
            {'// 這個背景是程序化生成的櫻林：同一個類別、同一組物種參數，長出來的每一棵都不一樣'}
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
            <span>物</span>
            <span>件</span>
            <span>導</span>
            <span>向</span>
          </div>
        </motion.div>
      </div>
    </header>
  )
}
