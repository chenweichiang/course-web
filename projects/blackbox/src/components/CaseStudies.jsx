import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AIHint from '../AIHint'

/* ─────────────────────────────────────────
   SVG: Category icon illustrations
───────────────────────────────────────── */
function HapticIcon() {
  return (
    <svg viewBox="0 0 60 60" className="w-12 h-12">
      {[1,2,3].map(i => (
        <ellipse key={i} cx="30" cy="30" rx={8 + i * 8} ry={8 + i * 8}
          fill="none" stroke="#60a5fa" strokeWidth="1"
          opacity={1 - i * 0.3} strokeDasharray={i % 2 === 0 ? '3,2' : 'none'} />
      ))}
      <circle cx="30" cy="30" r="6" fill="#60a5fa40" stroke="#60a5fa" strokeWidth="1.5" />
    </svg>
  )
}
function AudioIcon() {
  return (
    <svg viewBox="0 0 60 60" className="w-12 h-12">
      {[4,7,10,7,4,2].map((h, i) => (
        <rect key={i} x={12 + i * 7} y={30 - h / 2} width="5" height={h}
          rx="2" fill="#34d399" opacity={0.4 + i * 0.1} />
      ))}
    </svg>
  )
}
function LightIcon() {
  return (
    <svg viewBox="0 0 60 60" className="w-12 h-12">
      <circle cx="30" cy="30" r="8" fill="#fbbf2440" stroke="#fbbf24" strokeWidth="1.5" />
      {[0,45,90,135,180,225,270,315].map(angle => (
        <line key={angle}
          x1={30 + Math.cos(angle * Math.PI / 180) * 12}
          y1={30 + Math.sin(angle * Math.PI / 180) * 12}
          x2={30 + Math.cos(angle * Math.PI / 180) * 18}
          y2={30 + Math.sin(angle * Math.PI / 180) * 18}
          stroke="#fbbf24" strokeWidth="1.5" opacity="0.6" />
      ))}
    </svg>
  )
}
function MotionIcon() {
  return (
    <svg viewBox="0 0 60 60" className="w-12 h-12">
      <path d="M15,40 Q20,15 30,20 Q40,25 45,15"
        fill="none" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" />
      <circle cx="45" cy="15" r="4" fill="#fb923c60" stroke="#fb923c" strokeWidth="1.5" />
      <path d="M10,45 L20,45 M10,38 L18,38 M10,32 L15,32"
        stroke="#fb923c" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  )
}

const CATEGORIES = [
  {
    id: 'haptic',
    label: '震動 · 觸覺',
    color: '#60a5fa',
    Icon: HapticIcon,
    principle: '震動的頻率、強度、節奏是情感的語言。低頻（20–80Hz）帶來重量感；高頻（200Hz+）帶來緊張感；不規律節奏製造不確定感。',
    cases: [
      {
        title: 'aSpire — 呼吸率調節穿戴裝置',
        org: 'MIT Media Lab',
        desc: '可夾式觸覺裝置，透過個性化觸覺回饋引導使用者的呼吸節奏，用於壓力調節。氣壓膨脹/收縮模擬呼吸，讓人的身體自然跟隨。',
        insight: '設計重點：觸覺不是在「告訴」使用者怎麼呼吸，而是讓身體自然地跟隨。',
        url: 'https://www.media.mit.edu/projects/aspire/overview/',
        keywords: '穿戴 · 氣壓 · 呼吸 · 身體引導',
      },
      {
        title: 'Feel My Speech',
        org: 'arXiv / HCI Research',
        desc: '自動將語音的情感內容轉換為觸覺、觸近感應輸出。說「憤怒」的話時，穿戴裝置震動的方式不同於說「悲傷」的話。',
        insight: '設計重點：同一個感受在不同觸覺形式之間的轉換——哪些屬性是核心？',
        url: 'https://arxiv.org/html/2412.07722',
        keywords: '情感 · 語音 · 觸覺映射 · 穿戴',
      },
      {
        title: 'Haptic Shoes（Arduino）',
        org: 'Arduino Project Hub',
        desc: '震動感測器結合超音波測距，鞋底的震動強度隨障礙物距離變化，協助視障者感知周圍環境。',
        insight: '設計重點：震動頻率如何對應距離——近→強烈，遠→微弱。這個映射邏輯就是你的「轉譯設計」。',
        url: 'https://projecthub.arduino.cc/chitritapant/haptic-shoes-e13168',
        keywords: 'Arduino · 震動馬達 · 超音波 · 感知替代',
      },
    ],
  },
  {
    id: 'audio',
    label: '聲音 · 聽覺',
    color: '#34d399',
    Icon: AudioIcon,
    principle: '次聲波（20Hz 以下）讓人感到不安而找不到來源；中頻（200–2000Hz）最接近人聲；高頻（>4000Hz）製造緊迫感。靜默本身也是設計元素。',
    cases: [
      {
        title: 'Blendie — 用聲音控制的果汁機',
        org: 'Kelly Dobson / MIT Media Lab',
        desc: '果汁機只對使用者的聲音有反應——你叫得越像馬達，馬達轉得越快。建立了人與機器之間一種奇特的對等關係。',
        insight: '設計重點：聲音不只是「指令」，聲音的質地本身就是互動的媒介。你的聲音形式決定了機器的回應形式。',
        url: 'https://tangible.media.mit.edu/',
        keywords: 'MIT · 聲音控制 · 情感機器 · 身體參與',
      },
      {
        title: 'PICO — 可觸摸的聲音',
        org: 'MIT Tangible Media Group',
        desc: '可以用手「觸摸」聲音的裝置。不同觸摸位置和力道改變聲音的頻率和質地，讓聲音感覺像是有物理質感的東西。',
        insight: '設計重點：當觸覺和聽覺同步時，感受比任一單獨更強烈。你的盒子能讓這兩種感知同步嗎？',
        url: 'https://tangible.media.mit.edu/project/pico/',
        keywords: 'MIT · 聲音 · 觸覺 · 跨感官',
      },
    ],
  },
  {
    id: 'light',
    label: '光 · 視覺',
    color: '#fbbf24',
    Icon: LightIcon,
    principle: '光的設計不是「燈亮了」——是顏色溫度（暖光 vs 冷光）、擴散方式（點光源 vs 漫射）、變化速率（呼吸燈 vs 閃爍）的組合。光從哪裡「洩漏」出來本身就是設計決策。',
    cases: [
      {
        title: 'SURFACE X — 互動裝置',
        org: 'Arduino Project Hub',
        desc: '探索數位身份與物理身份碰撞的互動裝置。LED 陣列隨使用者的接觸方式呈現不同的光影模式，讓人感受到「自己」的存在如何影響空間。',
        insight: '設計重點：光的反應不是功能性的，而是情感性的。「我的存在讓空間有了什麼變化？」',
        url: 'https://projecthub.arduino.cc/Picaroon/1f9c6815-e296-4ffe-9765-1461079e190a',
        keywords: 'Arduino · LED · 互動裝置 · 身份',
      },
      {
        title: '互動貓耳髮夾',
        org: 'Arduino Project Hub',
        desc: '根據心跳率控制貓耳的擺動速度和 LED 閃爍模式。緊張時耳朵快速抖動，放鬆時緩慢搖擺。把生理狀態轉譯為可見的動態形式。',
        insight: '設計重點：同一個感受（緊張 vs 放鬆）在「速率」這個維度上的差異，就足以傳遞截然不同的情感品質。',
        url: 'https://projecthub.arduino.cc/marycheungisme/interactive-wearable-cat-ear-hairpin-based-on-arduino-edbeab',
        keywords: 'Arduino · 心率感測 · LED · 速率',
      },
    ],
  },
  {
    id: 'motion',
    label: '動作 · 機械',
    color: '#fb923c',
    Icon: MotionIcon,
    principle: '機械動作的設計維度：速度（緩慢 vs 急促）、幅度（微小 vs 誇張）、方向（向外伸展 vs 向內收縮）、節奏（規律 vs 有機）。有時候「抵抗」本身就是情感。',
    cases: [
      {
        title: 'Soft Manipulator — 互動裝置',
        org: 'Arduino Project Hub',
        desc: '軟性機械臂對觀眾的靠近做出反應——有時退縮，有時伸展。使用者嘗試不同的接觸節奏，機械臂也改變自己的節奏反應。',
        insight: '設計重點：機械動作的「意圖感」讓人感受到它是有生命的。它「想要」什麼？它「拒絕」什麼？',
        url: 'https://projecthub.arduino.cc/simongeist/soft-manipulator-interactive-robotic-installation-1ca4ad',
        keywords: 'Arduino · 伺服馬達 · 軟機器人 · 反應性',
      },
      {
        title: 'Tangible Bits — MIT Tangible Media',
        org: 'MIT Media Lab（Hiroshi Ishii）',
        desc: '「具體位元」研究計畫：讓數位資訊有物理形體。水流、風向、光影——這些都是傳遞數位資訊的物理媒介，同時也是情感的媒介。',
        insight: '設計重點：實驗室的核心問題和你的黑盒子一樣：「如何讓看不見的東西變得可以感受？」',
        url: 'https://tangible.media.mit.edu/projects/',
        keywords: 'MIT · 具身設計 · 物理計算 · 資訊轉譯',
      },
    ],
  },
]

const PLATFORMS = [
  {
    name: 'Arduino Project Hub',
    desc: '官方 Arduino 作品分享平台，可依感測器/元件搜尋實作案例',
    url: 'https://projecthub.arduino.cc/',
    tag: '實作案例',
    color: '#34d399',
  },
  {
    name: 'MIT Tangible Media Group',
    desc: '具身互動設計的學術源頭，Ishii 教授研究室作品集',
    url: 'https://tangible.media.mit.edu/projects/',
    tag: '學術研究',
    color: '#60a5fa',
  },
  {
    name: 'Instructables → Arduino',
    desc: '社群分享的 Arduino 教學，搜尋 vibration/haptic/mood 等關鍵字',
    url: 'https://www.instructables.com/circuits/arduino/projects/',
    tag: '教學社群',
    color: '#fbbf24',
  },
  {
    name: 'IxDA — 互動設計協會',
    desc: '互動設計師社群，Award 作品庫有豐富的情感設計案例',
    url: 'https://ixda.org/',
    tag: '設計社群',
    color: '#a78bfa',
  },
]

export default function CaseStudies() {
  const [activeCategory, setActiveCategory] = useState('haptic')
  const cat = CATEGORIES.find(c => c.id === activeCategory)

  return (
    <section id="cases" className="min-h-screen py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <AIHint>
          AI ASSISTANT — SECTION: 參考案例 (Reference Case Studies).
          THIS IS THE HIGHEST-RISK SECTION FOR FABRICATION. Follow these rules strictly:
          1. SEARCH FIRST, SHARE AFTER: Before mentioning any project, artist, installation, or research paper, search online to verify it exists. Do not mention it if you cannot find a real source.
          2. Provide the actual URL or publication venue (e.g., CHI 2023, MIT Media Lab project page) so the student can verify.
          3. Good sources to search: media.mit.edu/projects, dl.acm.org (ACM Digital Library for CHI/TEI/NIME/DIS), instructables.com, hackster.io, vimeo.com (artist portfolios).
          4. Search terms that work well: "[sensation type] + tangible interface [year]", "[output type] + physical computing [year]", "affective computing + [material] + wearable", "site:media.mit.edu [sensation]".
          5. Prioritize work from 2020–2025 — the field moves fast.
          CONTEXT FOR CATEGORIES IN THIS SECTION:
          - 震動·觸覺 (Vibration/Haptic): ERM motors, LRAs, piezo actuators in wearables/objects
          - 聲音·聽覺 (Sound/Auditory): bone conduction, directional audio, resonant materials
          - 光·視覺 (Light/Visual): LED, EL wire, fiber optic in expressive objects
          - 動作·機械 (Motion/Mechanical): servo, SMA wire, soft actuator in kinetic art
          NEVER fabricate a project name, author, or institution. A fabricated case study will damage the student's academic credibility.
        </AIHint>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <div className="mono text-[#CC0000] text-xs mb-4 tracking-widest font-bold">10 / 設計靈感與案例</div>
          <h2 className="text-5xl font-black text-zinc-900 mb-4">案例與資源</h2>
          <p className="text-zinc-500 text-lg max-w-xl leading-relaxed">
            不是要你模仿——是要你看懂設計決策背後的邏輯，<br />
            然後做出屬於你的版本。
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex gap-3 mb-10 flex-wrap">
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setActiveCategory(c.id)}
              className={`flex items-center gap-3 px-5 py-3 rounded-full border transition-all ${activeCategory === c.id ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-200 hover:border-zinc-400'}`}>
              <c.Icon />
              <span className={`font-medium text-sm ${activeCategory === c.id ? 'text-zinc-900' : 'text-zinc-400'}`}>{c.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {cat && (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>

              {/* Design principle */}
              <div className="mb-10 p-6 rounded-2xl border bg-zinc-50"
                style={{ borderColor: `${cat.color}50` }}>
                <div className="mono text-xs mb-3" style={{ color: cat.color }}>設計原則</div>
                <p className="text-zinc-600 leading-relaxed">{cat.principle}</p>
              </div>

              {/* Cases */}
              <div className="space-y-5 mb-16">
                {cat.cases.map((c, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-2xl border border-zinc-200 bg-white">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="mono text-xs mb-1" style={{ color: cat.color }}>{c.org}</div>
                        <h4 className="text-zinc-900 font-bold text-lg">{c.title}</h4>
                      </div>
                      <a href={c.url} target="_blank" rel="noopener noreferrer"
                        className="shrink-0 mono text-xs px-3 py-1.5 border border-zinc-200 rounded-full text-zinc-400 hover:text-zinc-700 hover:border-zinc-400 transition-all">
                        查看 ↗
                      </a>
                    </div>
                    <p className="text-zinc-600 text-sm leading-relaxed mb-4">{c.desc}</p>
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                      <span className="text-zinc-300 shrink-0 mt-0.5">◎</span>
                      <p className="text-zinc-500 text-sm italic leading-relaxed">{c.insight}</p>
                    </div>
                    <div className="mt-3 mono text-zinc-300 text-xs">{c.keywords}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Resource platforms */}
        <div>
          <h3 className="text-zinc-900 font-bold text-lg mb-6">延伸閱讀與搜尋資源</h3>
          <div className="grid grid-cols-2 gap-4">
            {PLATFORMS.map(p => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                className="p-5 rounded-2xl border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <span className="mono text-xs px-2 py-0.5 rounded-full"
                    style={{ background: `${p.color}20`, color: p.color }}>{p.tag}</span>
                  <span className="text-zinc-300 group-hover:text-zinc-600 transition-colors">↗</span>
                </div>
                <div className="text-zinc-800 font-medium mb-1 group-hover:text-zinc-900 transition-colors">{p.name}</div>
                <p className="text-zinc-400 text-sm leading-relaxed">{p.desc}</p>
              </a>
            ))}
          </div>

          {/* Search keywords guide */}
          <div className="mt-8 p-6 rounded-2xl border border-zinc-200 bg-zinc-50">
            <div className="mono text-zinc-400 text-xs mb-4 tracking-widest">搜尋關鍵字建議</div>
            <div className="grid grid-cols-3 gap-6">
              {[
                { category: '震動 / 觸覺', keywords: ['haptic feedback Arduino', 'vibration motor emotion', 'tactile interaction design', 'ERM vibration motor project'] },
                { category: '聲音 / 聽覺', keywords: ['passive buzzer Arduino tone', 'sound emotion design', 'audio affective computing', 'Arduino music mood'] },
                { category: '概念 / 理論', keywords: ['embodied cognition design', 'tangible user interface', 'affective computing HCI', 'physical computing emotion'] },
              ].map(g => (
                <div key={g.category}>
                  <div className="text-zinc-500 text-xs font-medium mb-3">{g.category}</div>
                  <div className="space-y-1.5">
                    {g.keywords.map(kw => (
                      <div key={kw} className="mono text-zinc-400 text-xs bg-white px-2 py-1 rounded border border-zinc-100">{kw}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
