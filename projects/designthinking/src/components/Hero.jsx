import { motion } from 'framer-motion'
import HeroSketch from './HeroSketch'

const CHIPS = ['不以週次計', '一組一個 2050', '期中不講產品', 'AI 揭露制']

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
          <div className="font-mono text-sm text-neutral-500 mb-6">一學期的推測設計專案 · 北商創產系 115-1</div>

          {/* 行動版：橫排標題 */}
          <h1 className="md:hidden font-display text-6xl leading-tight tracking-tight mb-6">
            設計思考
          </h1>

          <p className="text-xl sm:text-2xl font-bold max-w-2xl leading-relaxed">
            這門課不做「好賣」的產品，
            <br className="hidden sm:block" />
            做「<span className="underline decoration-4 decoration-plan underline-offset-4">對明天的世界提出疑問</span>」的產品。
          </p>
          <p className="heti mt-5 text-neutral-600 max-w-xl leading-loose text-[0.95rem]">
            推測設計不是用來預測未來，而是幫助我們思考自己想要或不想要什麼樣的未來，因此這個專案教三件事：把時間拉遠（從 2026 的微弱訊號推演 2050 的世界，每一條推演都要有真實的根）、看見脈絡的力量（產品從來不存在於真空中，先讓世界裡長出具體的人與他的矛盾）、建立批判性思維（科技進步不一定帶來美好生活，誠實面對你設計的產品的陰影面）。
          </p>
          <p className="heti mt-5 font-bold max-w-xl">
            整學期只做一件事，就是<a href="#project" className="underline decoration-plan decoration-2 underline-offset-4 hover:text-plan">期末專案「2050 未來產品的脈絡設計」</a>：推演一個世界，讓一個人活進去，為他的矛盾設計一件產品。
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {CHIPS.map((c) => (
              <span key={c} className="px-3 py-1 border border-neutral-400 rounded-full bg-paper/85 font-mono text-[0.8rem] text-neutral-600">
                {c}
              </span>
            ))}
          </div>
          <div className="mt-10 font-mono text-xs text-neutral-400 max-w-xl">
            {'// 這個背景是課程方法本身：左緣的微弱訊號放大、碰撞，長成通往右緣 2050 的影響鏈，每次重新整理都是一個不同的未來'}
          </div>
        </motion.div>

        {/* 右：直排大標＋落款印 */}
        <motion.div
          className="hidden md:flex flex-col items-center justify-center gap-8 pr-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <h1 className="vertical-title font-display text-[clamp(3.5rem,9vh,5.5rem)] leading-none">
            設計思考
          </h1>
          <div
            className="grid grid-cols-2 w-16 h-16 bg-plan text-paper font-display text-sm leading-none place-items-center select-none"
            aria-hidden="true"
          >
            <span>設</span>
            <span>計</span>
            <span>思</span>
            <span>考</span>
          </div>
        </motion.div>
      </div>
    </header>
  )
}
