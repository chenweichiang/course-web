import { useState } from 'react'
import { motion } from 'framer-motion'

const SHOTS = [
  {
    id: 'showcase',
    index: '01',
    title: '作品展示',
    duration: '20–30 秒',
    color: '#a78bfa',
    desc: '讓觀眾第一眼就看清楚盒子的整體樣貌。',
    shots: [
      { label: '正面靜態', detail: '盒子放在桌上，固定機位，畫面穩定。讓盒子「存在」5 秒——不要急著動它。' },
      { label: '環繞特寫', detail: '緩慢移動鏡頭（或轉動盒子）拍攝四個角度，讓材質、接縫、表面質地都清晰可見。' },
      { label: '手持入鏡', detail: '一隻手緩緩拿起盒子，感受重量。鏡頭跟著手移動，呈現盒子的份量感。' },
    ],
    note: '燈光要打在盒子正面，避免逆光。材質細節是這段的重點。',
  },
  {
    id: 'operation',
    index: '02',
    title: '操作方法',
    duration: '30–40 秒',
    color: '#60a5fa',
    desc: '清楚示範使用者如何啟動、操作這個裝置。',
    shots: [
      { label: '俯拍手部操作', detail: '從上方 45° 角拍攝雙手操作盒子的過程。讓按鈕、感測器、介面都在畫面裡。' },
      { label: '側拍全程', detail: '側面固定機位，完整記錄一次操作週期——從靜止狀態，到觸發，到反應，到結束。' },
      { label: '細節特寫', detail: '針對最關鍵的互動點（按鍵、感測區域、輸出元件）近距離拍攝。讓觀眾清楚看到「怎麼觸發」。' },
    ],
    note: '這段要拍到「觸發瞬間」的前後——靜止→啟動→反應。不要剪掉等待時間。',
  },
  {
    id: 'experience',
    index: '03',
    title: '使用情境體驗',
    duration: '40–50 秒',
    color: '#34d399',
    desc: '用真實使用者的反應呈現盒子傳遞的感受，這是影片最核心的一段。',
    shots: [
      { label: '盲測重現', detail: '找一個沒有看過作品的人，在不解釋的情況下接觸盒子。拍攝他們的第一反應——臉部表情、身體動作、猶豫還是立即反應。' },
      { label: '正面臉部特寫', detail: '另一台裝置拍攝使用者的臉。不要引導他們的表情，捕捉真實的感受時刻。' },
      { label: '手與盒子的關係', detail: '拍攝使用者的手如何與盒子互動——是輕輕觸碰、緊握、還是想放開？這些細節傳遞的資訊比語言更直接。' },
    ],
    note: '不要請使用者「假裝有感受」。真實的困惑、遲疑或驚喜，比完美的反應更有說服力。',
  },
  {
    id: 'internals',
    index: '04',
    title: '作品內部構造',
    duration: '25–35 秒',
    color: '#fb923c',
    desc: '展示工程實現的方式，讓評審看到技術如何服務設計意圖。',
    shots: [
      { label: '打開盒蓋', detail: '緩慢打開盒子，鏡頭跟著蓋子移動，讓內部元件從暗到亮逐漸浮現。' },
      { label: '俯拍內部全貌', detail: '從正上方拍攝內部整體配置——Arduino、電源、感測器、輸出元件的位置關係。' },
      { label: '元件特寫', detail: '依序特寫每個關鍵元件：主控板 → 感測器 → 輸出機制（馬達/喇叭/LED 等）。配合口頭說明功能。' },
      { label: '運作中的內部', detail: '盒子開著蓋子運作一次，拍攝元件實際動作的樣子——LED 亮起、馬達震動、喇叭發聲。' },
    ],
    note: '如果內部接線複雜，可以在拍攝前整理走線，讓畫面清晰。這段是工程誠意的呈現。',
  },
]

const TIMELINE = [
  { time: '0:00–0:05', label: '靜態開場', desc: '盒子安靜放著，讓觀眾看清楚它的存在' },
  { time: '0:05–0:30', label: '作品展示', desc: '環繞拍攝，材質特寫，手持入鏡' },
  { time: '0:30–1:10', label: '操作方法', desc: '俯拍操作，側拍全程，觸發細節' },
  { time: '1:10–2:00', label: '使用情境', desc: '真實使用者接觸，臉部反應，手部互動' },
  { time: '2:00–2:35', label: '內部構造', desc: '打開盒蓋，元件全貌，運作中的內部' },
  { time: '2:35–3:00', label: '收尾', desc: '回到靜態，盒子蓋上，淡出' },
]

const RULES = [
  {
    icon: '⟺',
    title: '一定要橫式拍攝',
    desc: '手機或相機務必橫放（16:9 或 2.35:1）。豎拍影片交出去會直接失去影片品質的評分。',
    bad: true,
  },
  {
    icon: '▣',
    title: '固定機位為主',
    desc: '除非刻意移動鏡頭，否則把手機/相機放在三腳架或穩定的桌面上。手持晃動影像讓評審無法專注在作品上。',
    bad: true,
  },
  {
    icon: '◎',
    title: '環境光要充足',
    desc: '白天在窗邊拍攝，或使用補光燈。暗到看不清楚材質和元件，等於浪費拍攝時間。',
  },
  {
    icon: '♪',
    title: '收音或配樂',
    desc: '如果有操作聲音（馬達聲、蜂鳴、震動聲），讓麥克風收進去。也可以在後製加入低調的背景音樂。',
  },
  {
    icon: '⌛',
    title: '控制在 2–3 分鐘',
    desc: '太短（< 1:30）表示沒有完整呈現；太長（> 3:30）評審的注意力會下降。剪接時要有取捨。',
  },
  {
    icon: '✂',
    title: '後製只做基本剪接',
    desc: '不需要酷炫的轉場或特效。剪掉等待時間、抖動畫面、失誤片段，讓節奏清晰就夠了。',
  },
]

export default function VideoGuide() {
  const [activeShot, setActiveShot] = useState(null)
  const shot = SHOTS.find(s => s.id === activeShot)

  return (
    <section className="min-h-screen py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <div className="mono text-[#CC0000] text-xs mb-4 tracking-widest font-bold">12 / 作品記錄影片</div>
          <h2 className="text-5xl font-black text-zinc-900 mb-4">怎麼拍這支影片</h2>
          <p className="text-zinc-500 text-lg max-w-xl leading-relaxed">
            2–3 分鐘，橫式拍攝。<br />
            讓沒有看過你作品的人，透過影片理解它在做什麼、感受什麼。
          </p>
        </motion.div>

        {/* Landscape warning banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 border-2 border-zinc-900 p-6 flex items-center gap-6"
        >
          {/* Phone mockup — landscape vs portrait */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Portrait — wrong */}
            <div className="relative">
              <div className="w-8 h-14 border-2 border-zinc-300 rounded-lg flex items-center justify-center">
                <div className="w-5 h-9 bg-zinc-100 rounded" />
              </div>
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#CC0000] rounded-full flex items-center justify-center">
                <span className="text-white text-[10px] font-bold leading-none">✕</span>
              </div>
              <div className="mono text-[9px] text-zinc-400 text-center mt-1">豎拍</div>
            </div>
            <div className="text-zinc-200 text-xl">→</div>
            {/* Landscape — correct */}
            <div className="relative">
              <div className="w-14 h-8 border-2 border-zinc-900 rounded-lg flex items-center justify-center">
                <div className="w-9 h-5 bg-zinc-100 rounded" />
              </div>
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-zinc-900 rounded-full flex items-center justify-center">
                <span className="text-white text-[10px] font-bold leading-none">✓</span>
              </div>
              <div className="mono text-[9px] text-zinc-900 text-center mt-1 font-bold">橫拍</div>
            </div>
          </div>
          <div>
            <div className="font-black text-zinc-900 text-base mb-1">手機橫放，永遠橫放</div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              豎拍影片（9:16）交出去，兩側會出現大片黑邊，作品被壓縮在畫面中央，細節完全看不清楚。<br />
              所有拍攝段落都用橫式（16:9）。沒有例外。
            </p>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <div className="mono text-[10px] text-zinc-400 tracking-widest mb-4">整體時間軸</div>
          <div className="border border-zinc-200 overflow-hidden">
            {TIMELINE.map((t, i) => (
              <div key={i} className={`flex items-center gap-0 ${i < TIMELINE.length - 1 ? 'border-b border-zinc-100' : ''}`}>
                <div className="mono text-[10px] text-zinc-400 w-28 shrink-0 px-4 py-3 border-r border-zinc-100">{t.time}</div>
                <div className="w-1 self-stretch" style={{ background: SHOTS[Math.min(i - 1, SHOTS.length - 1)]?.color ?? '#e4e4e7' }} />
                <div className="px-5 py-3 flex-1">
                  <span className="font-semibold text-zinc-900 text-sm">{t.label}</span>
                  <span className="text-zinc-400 text-xs ml-3">{t.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Shot sections */}
        <div className="mono text-[10px] text-zinc-400 tracking-widest mb-4">拍攝段落</div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {SHOTS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveShot(activeShot === s.id ? null : s.id)}
              className={`p-6 border text-left transition-all ${
                activeShot === s.id ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-200 hover:border-zinc-400'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="mono text-[10px] font-bold" style={{ color: s.color }}>{s.index}</span>
                <span className="mono text-[10px] text-zinc-300 border border-zinc-200 px-2 py-0.5">{s.duration}</span>
              </div>
              <div className="font-bold text-zinc-900 text-sm mb-1">{s.title}</div>
              <div className="text-zinc-400 text-xs leading-relaxed">{s.desc}</div>
            </button>
          ))}
        </div>

        {/* Shot detail */}
        {shot && (
          <motion.div
            key={shot.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="border border-zinc-200 p-8 mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 shrink-0" style={{ background: shot.color }} />
              <h3 className="font-bold text-zinc-900 text-lg">{shot.title}</h3>
              <span className="mono text-[10px] text-zinc-400 ml-auto">{shot.duration}</span>
            </div>
            <div className="space-y-4 mb-6">
              {shot.shots.map((sh, i) => (
                <div key={i} className="flex gap-4 border-b border-zinc-100 pb-4 last:border-0 last:pb-0">
                  <div className="mono text-[10px] text-zinc-300 w-4 shrink-0 pt-0.5">{i + 1}</div>
                  <div>
                    <div className="font-semibold text-zinc-900 text-sm mb-1">{sh.label}</div>
                    <div className="text-zinc-500 text-sm leading-relaxed">{sh.detail}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-zinc-50 border border-zinc-200 px-5 py-4">
              <span className="mono text-[10px] text-zinc-400 tracking-widest">注意 · </span>
              <span className="text-zinc-600 text-sm">{shot.note}</span>
            </div>
          </motion.div>
        )}

        {/* Rules */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="mono text-[10px] text-zinc-400 tracking-widest mb-4">拍攝原則</div>
          <div className="grid grid-cols-2 gap-0 border border-zinc-200">
            {RULES.map((r, i) => (
              <div
                key={i}
                className={`p-6 ${i % 2 === 0 ? 'border-r border-zinc-200' : ''} ${i < RULES.length - 2 ? 'border-b border-zinc-200' : ''}`}
              >
                <div className="flex items-start gap-3 mb-2">
                  <span className="mono text-base text-zinc-300 shrink-0">{r.icon}</span>
                  <div>
                    <div className={`font-bold text-sm mb-1 ${r.bad ? 'text-zinc-900' : 'text-zinc-900'}`}>
                      {r.bad && <span className="inline-block w-2 h-2 rounded-full bg-[#CC0000] mr-2 align-middle" />}
                      {r.title}
                    </div>
                    <p className="text-zinc-500 text-xs leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Final note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 border border-zinc-200 bg-zinc-50 text-center"
        >
          <p className="text-zinc-500 text-lg leading-relaxed max-w-2xl mx-auto">
            影片的目標只有一個：<br />
            <span className="text-zinc-900 font-medium">讓沒有親手碰過你的盒子的人，看完影片後能感受到它想傳遞的東西。</span>
          </p>
        </motion.div>

      </div>
    </section>
  )
}
