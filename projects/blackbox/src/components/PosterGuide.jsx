import { useState } from 'react'

const PALETTE = [
  { name: '主黑 Primary',   hex: '#0A0A0A', cmyk: 'C0  M0  Y0  K100', usage: '主標題、邊框、主要文字' },
  { name: '瑞士紅 Swiss Red', hex: '#CC0000', cmyk: 'C0  M100  Y100  K20', usage: '強調色、章節編號' },
  { name: '深灰 Dark',      hex: '#3F3F46', cmyk: 'C0  M0  Y0  K75',  usage: '次要標題' },
  { name: '中灰 Mid',       hex: '#71717A', cmyk: 'C0  M0  Y0  K56',  usage: '說明文字' },
  { name: '淺灰 Light',     hex: '#D4D4D8', cmyk: 'C0  M0  Y0  K17',  usage: '分隔線、邊框' },
  { name: '紙白 White',     hex: '#FFFFFF', cmyk: 'C0  M0  Y0  K0',   usage: '底色、反色文字' },
]

// ─────────────────────────────────────────────
// Clean structural diagram of A3 landscape poster.
// Shows zones, dimensions, and optional overlays
// (12-column grid / 3mm bleed / 5mm safe area).
// No simulated content — pure spec visualization.
// ─────────────────────────────────────────────
function LayoutDiagram({ showGrid, showBleed, showSafe }) {
  const W_MM = 420, H_MM = 297
  const PW = 700
  const PH = Math.round(PW * H_MM / W_MM)  // 495
  const SC = PW / W_MM                      // 1.667 px/mm

  const TOP_H  = Math.round(19 * SC)        // 32 — Header strip 19mm
  const INFO_H = Math.round(26 * SC)        // 43 — Info bar 26mm
  const BOT_H  = Math.round(14 * SC)        // 23 — Footer strip 14mm
  const MAIN_H = PH - TOP_H - INFO_H - BOT_H

  const MAIN_Y = TOP_H
  const INFO_Y = MAIN_Y + MAIN_H
  const BOT_Y  = INFO_Y + INFO_H

  const SPLIT_X = Math.round(PW * 0.53)

  const M = 20 * SC          // margin 20mm
  const G = 5 * SC           // gutter 5mm
  const COLS = 12
  const COL_W = (PW - 2*M - (COLS-1)*G) / COLS

  const BLEED = 3 * SC       // 3mm bleed
  const SAFE  = 5 * SC       // 5mm safe area

  // Info bar 4-col field structure (template, not simulated content)
  const INFO_COLS = [
    { label: 'ENTRY',      placeholder: '類別 · 編號' },
    { label: 'CONCEPT',    placeholder: '設計概念（一句話）' },
    { label: 'STUDENTS',   placeholder: '姓名 · 學號' },
    { label: 'UNIVERSITY', placeholder: '學校 · 系所' },
  ]
  const IC = PW / 4

  // Zone labels outside poster (left side)
  const ZONES = [
    { label: '上帶',   y: TOP_H/2 },
    { label: '主視覺', y: MAIN_Y + MAIN_H/2 },
    { label: '資訊列', y: INFO_Y + INFO_H/2 },
    { label: '下帶',   y: BOT_Y + BOT_H/2 },
  ]

  return (
    <div className="overflow-x-auto bg-zinc-50 p-6 lg:p-10">
      <svg
        viewBox={`-50 -50 ${PW+140} ${PH+100}`}
        width="100%"
        style={{ maxWidth: PW + 140, display: 'block', margin: '0 auto', height: 'auto' }}
      >
        <defs>
          <marker id="dimArr" markerWidth="6" markerHeight="6" refX="2.5" refY="3" orient="auto-start-reverse">
            <path d="M0,0 L6,3 L0,6 Z" fill="#9CA3AF" />
          </marker>
        </defs>

        {/* ════ 1. Bleed (outside poster) ════ */}
        {showBleed && (
          <>
            <rect
              x={-BLEED} y={-BLEED} width={PW + 2*BLEED} height={PH + 2*BLEED}
              fill="none" stroke="#fb923c" strokeWidth="0.8" strokeDasharray="6,3"
            />
            <text x={-BLEED} y={-BLEED - 8} fontSize="10" fill="#f97316"
              fontFamily="'IBM Plex Mono', monospace" fontWeight="700">
              出血 BLEED · +3mm
            </text>
          </>
        )}

        {/* ════ 2. Poster white background ════ */}
        <rect x="0" y="0" width={PW} height={PH} fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="1.5" />

        {/* ════ 3. Zone fills ════ */}
        {/* Top strip */}
        <rect x="0" y="0" width={PW} height={TOP_H} fill="#0A0A0A" />
        {/* Main zone left/right */}
        <rect x="0" y={MAIN_Y} width={SPLIT_X} height={MAIN_H} fill="#FAFAFA" />
        <rect x={SPLIT_X} y={MAIN_Y} width={PW - SPLIT_X} height={MAIN_H} fill="#EEEEEE" />
        <line x1={SPLIT_X} y1={MAIN_Y} x2={SPLIT_X} y2={INFO_Y}
          stroke="#CBD0D6" strokeWidth="1" strokeDasharray="4,3" />
        {/* Info bar */}
        <rect x="0" y={INFO_Y} width={PW} height={INFO_H} fill="#F4F4F4" />
        {/* Bottom strip */}
        <rect x="0" y={BOT_Y} width={PW} height={BOT_H} fill="#0A0A0A" />

        {/* ════ 4. Top strip content ════ */}
        <text x={M} y={TOP_H/2 + 4} fontSize="10" fill="#FFFFFF"
          fontFamily="'IBM Plex Mono', monospace" letterSpacing="0.14em">
          INTERACTION DESIGN  ·  BLACK BOX PROJECT
        </text>
        <text x={PW - M} y={TOP_H/2 + 4} textAnchor="end" fontSize="10" fill="#CC0000"
          fontFamily="'IBM Plex Mono', monospace" letterSpacing="0.14em">
          GROUP  ##   ·   2025
        </text>

        {/* ════ 5. Main zone labels ════ */}
        {!showGrid && (
          <text x={PW/2} y={MAIN_Y + 22} textAnchor="middle" fontSize="10" fill="#A0A0A0"
            fontFamily="'IBM Plex Mono', monospace" letterSpacing="0.08em">
            主視覺 MAIN ZONE  ·  420 × 238 mm  ·  80%
          </text>
        )}
        {/* LEFT */}
        <text x={SPLIT_X/2} y={MAIN_Y + MAIN_H/2 - 22} textAnchor="middle" fontSize="15" fill="#0A0A0A" fontWeight="700">
          主視覺 LEFT
        </text>
        <text x={SPLIT_X/2} y={MAIN_Y + MAIN_H/2 - 4} textAnchor="middle" fontSize="11" fill="#71717A">
          文字說明區
        </text>
        <text x={SPLIT_X/2} y={MAIN_Y + MAIN_H/2 + 14} textAnchor="middle" fontSize="10" fill="#9CA3AF"
          fontFamily="'IBM Plex Mono', monospace">
          ≈ 223 × 238 mm
        </text>
        <text x={SPLIT_X/2} y={MAIN_Y + MAIN_H/2 + 38} textAnchor="middle" fontSize="20" fill="#CC0000" fontWeight="800"
          fontFamily="'IBM Plex Mono', monospace">
          53%
        </text>
        {/* RIGHT */}
        <text x={(SPLIT_X + PW)/2} y={MAIN_Y + MAIN_H/2 - 22} textAnchor="middle" fontSize="15" fill="#0A0A0A" fontWeight="700">
          主視覺 RIGHT
        </text>
        <text x={(SPLIT_X + PW)/2} y={MAIN_Y + MAIN_H/2 - 4} textAnchor="middle" fontSize="11" fill="#71717A">
          作品照片區
        </text>
        <text x={(SPLIT_X + PW)/2} y={MAIN_Y + MAIN_H/2 + 14} textAnchor="middle" fontSize="10" fill="#9CA3AF"
          fontFamily="'IBM Plex Mono', monospace">
          ≈ 197 × 238 mm
        </text>
        <text x={(SPLIT_X + PW)/2} y={MAIN_Y + MAIN_H/2 + 38} textAnchor="middle" fontSize="20" fill="#CC0000" fontWeight="800"
          fontFamily="'IBM Plex Mono', monospace">
          47%
        </text>

        {/* ════ 6. Info bar 4-column field structure ════ */}
        {INFO_COLS.map((col, i) => {
          const cx = i * IC
          return (
            <g key={i}>
              {i > 0 && (
                <line x1={cx} y1={INFO_Y + 8} x2={cx} y2={INFO_Y + INFO_H - 8}
                  stroke="#C8CCD2" strokeWidth="0.6" />
              )}
              <text x={cx + 12} y={INFO_Y + 14} fontSize="8" fill="#9CA3AF"
                fontFamily="'IBM Plex Mono', monospace" letterSpacing="0.20em" fontWeight="700">
                {col.label}
              </text>
              <text x={cx + 12} y={INFO_Y + 30} fontSize="10" fill="#404040">
                {col.placeholder}
              </text>
            </g>
          )
        })}

        {/* ════ 7. Bottom strip content ════ */}
        <text x={M} y={BOT_Y + BOT_H/2 + 4} fontSize="9" fill="#FFFFFF"
          fontFamily="'IBM Plex Mono', monospace" letterSpacing="0.10em">
          國立臺北商業大學  ·  創意科技與產品設計系  ·  互動設計
        </text>
        <text x={PW - M} y={BOT_Y + BOT_H/2 + 4} textAnchor="end" fontSize="9" fill="#CC0000"
          fontFamily="'IBM Plex Mono', monospace" letterSpacing="0.10em">
          A3  ·  420 × 297 MM
        </text>

        {/* ════ 8. Grid overlay (on top of zones, semi-transparent) ════ */}
        {showGrid && (
          <>
            {/* 12 column overlays */}
            {Array.from({ length: COLS }, (_, i) => (
              <rect key={`g-${i}`}
                x={M + i*(COL_W+G)} y={MAIN_Y}
                width={COL_W} height={MAIN_H}
                fill="rgba(204,0,0,0.08)" stroke="rgba(204,0,0,0.55)" strokeWidth="0.5"
              />
            ))}
            {/* Column numbers 01-12 at top */}
            {Array.from({ length: COLS }, (_, i) => (
              <text key={`n-${i}`}
                x={M + i*(COL_W+G) + COL_W/2}
                y={MAIN_Y + 14}
                textAnchor="middle" fontSize="9" fill="#CC0000" fontWeight="700"
                fontFamily="'IBM Plex Mono', monospace">
                {String(i + 1).padStart(2, '0')}
              </text>
            ))}
            {/* Top dimension ruler — first margin · col · gutter · col sample */}
            <g transform={`translate(0, ${MAIN_Y + 38})`}>
              {/* M (left margin) */}
              <line x1="0" y1="0" x2={M} y2="0" stroke="#CC0000" strokeWidth="0.6" />
              <line x1="0" y1="-3" x2="0" y2="3" stroke="#CC0000" strokeWidth="0.6" />
              <line x1={M} y1="-3" x2={M} y2="3" stroke="#CC0000" strokeWidth="0.6" />
              <text x={M/2} y="-5" textAnchor="middle" fontSize="7" fill="#CC0000"
                fontFamily="'IBM Plex Mono', monospace" fontWeight="700">M 20</text>
              {/* COL 1 */}
              <line x1={M} y1="0" x2={M + COL_W} y2="0" stroke="#CC0000" strokeWidth="0.6" />
              <line x1={M + COL_W} y1="-3" x2={M + COL_W} y2="3" stroke="#CC0000" strokeWidth="0.6" />
              <text x={M + COL_W/2} y="-5" textAnchor="middle" fontSize="7" fill="#CC0000"
                fontFamily="'IBM Plex Mono', monospace" fontWeight="700">COL 27.1</text>
              {/* GUTTER */}
              <line x1={M + COL_W} y1="0" x2={M + COL_W + G} y2="0" stroke="#CC0000" strokeWidth="0.6" />
              <line x1={M + COL_W + G} y1="-3" x2={M + COL_W + G} y2="3" stroke="#CC0000" strokeWidth="0.6" />
              <text x={M + COL_W + G/2} y="-5" textAnchor="middle" fontSize="6" fill="#CC0000"
                fontFamily="'IBM Plex Mono', monospace" fontWeight="700">G 5</text>
              {/* Unit indicator */}
              <text x={M + 2*COL_W + G + 8} y="2" fontSize="7" fill="#CC0000"
                fontFamily="'IBM Plex Mono', monospace">mm</text>
            </g>
            {/* Bottom legend bar */}
            <rect x={M} y={MAIN_Y + MAIN_H - 26} width={PW - 2*M} height="18" fill="#CC0000" />
            <text x={PW/2} y={MAIN_Y + MAIN_H - 14} textAnchor="middle"
              fontSize="9" fill="#FFFFFF" fontFamily="'IBM Plex Mono', monospace"
              fontWeight="700" letterSpacing="0.10em">
              12 COLUMNS  ·  COL 27.1 mm  ·  GUTTER 5 mm  ·  MARGIN 20 mm  ·  TYPE AREA 380 × 257 mm
            </text>
          </>
        )}

        {/* ════ 9. Safe area outline (topmost — dashed) ════ */}
        {showSafe && (
          <>
            <rect
              x={SAFE} y={SAFE} width={PW - 2*SAFE} height={PH - 2*SAFE}
              fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4,3"
            />
            <text x={SAFE + 5} y={SAFE + 14} fontSize="10" fill="#2563eb"
              fontFamily="'IBM Plex Mono', monospace" fontWeight="700">
              安全區 SAFE · −5mm
            </text>
          </>
        )}

        {/* ════ 10. Zone labels (outside poster, left side) ════ */}
        {ZONES.map((z, i) => (
          <text key={i}
            x="-8" y={z.y + 3} textAnchor="end" fontSize="9" fill="#A0A0A0"
            fontFamily="'IBM Plex Mono', monospace" letterSpacing="0.06em" fontWeight="600">
            {z.label}
          </text>
        ))}

        {/* ════ 11. Outside dimensions ════ */}
        {/* 420 mm width */}
        <line x1="0" y1="-18" x2="0" y2="-30" stroke="#9CA3AF" strokeWidth="0.6" />
        <line x1={PW} y1="-18" x2={PW} y2="-30" stroke="#9CA3AF" strokeWidth="0.6" />
        <line x1="0" y1="-24" x2={PW} y2="-24" stroke="#9CA3AF" strokeWidth="0.6"
          markerStart="url(#dimArr)" markerEnd="url(#dimArr)" />
        <text x={PW/2} y="-30" textAnchor="middle" fontSize="11" fill="#525252"
          fontFamily="'IBM Plex Mono', monospace" fontWeight="600">
          420 mm
        </text>
        {/* 297 mm height */}
        <line x1={PW + 18} y1="0" x2={PW + 30} y2="0" stroke="#9CA3AF" strokeWidth="0.6" />
        <line x1={PW + 18} y1={PH} x2={PW + 30} y2={PH} stroke="#9CA3AF" strokeWidth="0.6" />
        <line x1={PW + 24} y1="0" x2={PW + 24} y2={PH} stroke="#9CA3AF" strokeWidth="0.6"
          markerStart="url(#dimArr)" markerEnd="url(#dimArr)" />
        <text x={PW + 32} y={PH/2} fontSize="11" fill="#525252"
          fontFamily="'IBM Plex Mono', monospace" fontWeight="600" dominantBaseline="middle">
          297 mm
        </text>
      </svg>
    </div>
  )
}


export default function PosterGuide() {
  const [showGrid,  setShowGrid]  = useState(false)
  const [showBleed, setShowBleed] = useState(false)
  const [showSafe,  setShowSafe]  = useState(false)
  const [activeTab, setActiveTab] = useState('layout')

  const tabs = [
    { id: 'layout',  label: '版面規格' },
    { id: 'content', label: '必填內容' },
    { id: 'grid',    label: '格線系統' },
    { id: 'type',    label: '字型層級' },
    { id: 'color',   label: '色彩規範' },
  ]

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="border-b-2 border-zinc-900 pb-6 mb-8 flex items-end justify-between">
        <div>
          <p className="mono text-[#CC0000] text-xs font-bold tracking-widest mb-2">POSTER FORMAT</p>
          <h2 className="text-2xl font-black text-zinc-900 tracking-tight">A3 橫式海報規範</h2>
          <p className="text-zinc-500 text-sm mt-1">420 × 297 mm · 橫式 · 四區塊版面</p>
        </div>
        <div className="mono text-xs text-zinc-400 text-right leading-relaxed">
          <div>420 × 297 mm</div>
          <div>4961 × 3508 px @ 300 dpi</div>
          <div>CMYK / PDF/X-1a</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border border-zinc-200 w-fit mb-8">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`mono text-xs px-5 py-2.5 transition-colors border-r border-zinc-200 last:border-r-0 ${
              activeTab === tab.id ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── 版面規格 ── */}
      {activeTab === 'layout' && (
        <div>
          {/* Preview toggles */}
          <div className="flex gap-4 mb-4 flex-wrap">
            {[
              { label: '顯示格線',  state: showGrid,  set: setShowGrid  },
              { label: '顯示出血',  state: showBleed, set: setShowBleed },
              { label: '顯示安全區', state: showSafe,  set: setShowSafe  },
            ].map(({ label, state, set }) => (
              <button key={label} onClick={() => set(v => !v)}
                className={`mono text-xs px-4 py-2 border transition-colors ${
                  state ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 text-zinc-500 hover:border-zinc-900'
                }`}>
                {state ? '✓ ' : ''}{label}
              </button>
            ))}
          </div>
          <div className="border border-zinc-200 overflow-hidden bg-zinc-50">
            <LayoutDiagram showGrid={showGrid} showBleed={showBleed} showSafe={showSafe} />
          </div>

          {/* Basic A3 specs */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-0 border border-zinc-200">
            {[
              { label: '紙張尺寸', value: '420 × 297 mm', sub: 'A3 Landscape（橫式）' },
              { label: '解析度',   value: '300 dpi',       sub: '4961 × 3508 px（最小值）' },
              { label: '出血',     value: '3 mm 各邊',     sub: '裁切後成品 426 × 303mm' },
              { label: '安全區',   value: '內縮 5 mm',     sub: '重要內容不可超出此範圍' },
            ].map((item, i) => (
              <div key={i} className={`p-5 ${i < 3 ? 'border-r border-zinc-200' : ''}`}>
                <div className="mono text-[10px] text-zinc-400 mb-1 tracking-widest uppercase">{item.label}</div>
                <div className="font-bold text-zinc-900 text-base">{item.value}</div>
                <div className="text-zinc-400 text-xs mt-0.5">{item.sub}</div>
              </div>
            ))}
          </div>

          {/* A3 four-zone breakdown */}
          <div className="mt-8">
            <p className="mono text-[10px] text-zinc-400 tracking-widest mb-4">A3 四區塊比例分配（總高 297 mm）</p>
            <div className="grid grid-cols-4 gap-0 border border-zinc-200">
              {[
                { zone: '上帶', en: 'Header Strip',  size: '420 × 19 mm',  pct: '≈ 6%',  role: '課程名稱 · 組別 · 學期',               bg: 'bg-zinc-900', text: 'text-white'   },
                { zone: '主視覺', en: 'Main Zone',   size: '420 × 238 mm', pct: '≈ 80%', role: '左：文字說明 53%\n右：作品照片 47%',   bg: 'bg-white',    text: 'text-zinc-900' },
                { zone: '資訊列', en: 'Info Bar',    size: '420 × 26 mm',  pct: '≈ 9%',  role: '作品名稱 · 概念 · 學生 · 學校',        bg: 'bg-zinc-100', text: 'text-zinc-700' },
                { zone: '下帶', en: 'Footer Strip',  size: '420 × 14 mm',  pct: '≈ 5%',  role: 'A3 · 420×297 MM · 學校系所',           bg: 'bg-zinc-900', text: 'text-white'   },
              ].map((item, i) => (
                <div key={i} className={`p-4 border-r border-zinc-200 last:border-r-0 ${item.bg}`}>
                  <div className={`mono text-[10px] font-bold mb-0.5 ${item.text}`}>{item.zone}</div>
                  <div className={`mono text-[9px] mb-2 opacity-60 ${item.text}`}>{item.en}</div>
                  <div className={`mono text-[11px] font-bold mb-1 ${item.text}`}>{item.size}</div>
                  <div className={`mono text-[9px] mb-2 opacity-50 ${item.text}`}>{item.pct} of height</div>
                  <div className={`text-[11px] leading-relaxed whitespace-pre-line ${item.text} opacity-80`}>{item.role}</div>
                </div>
              ))}
            </div>
            {/* Main zone detail */}
            <div className="grid grid-cols-2 gap-0 border border-zinc-200 border-t-0">
              <div className="p-4 border-r border-zinc-200">
                <div className="mono text-[9px] text-zinc-400 mb-1">主視覺 LEFT — 文字說明區 53%</div>
                <div className="mono text-[10px] font-bold text-zinc-900 mb-1">≈ 223 × 238 mm</div>
                <div className="text-xs text-zinc-500 leading-relaxed">作品名稱（大標）· 設計意圖兩行 · 三欄並列文件區（設計概要 / 材料說明 / 系統說明）· 步驟圖帶 · 盲測摘要</div>
              </div>
              <div className="p-4">
                <div className="mono text-[9px] text-zinc-400 mb-1">主視覺 RIGHT — 作品照片區 47%</div>
                <div className="mono text-[10px] font-bold text-zinc-900 mb-1">≈ 197 × 238 mm</div>
                <div className="text-xs text-zinc-500 leading-relaxed">作品實體照片（推薦）或等角透視插圖 · 元件標注線 · 尺寸標示（150mm）</div>
              </div>
            </div>
          </div>

          {/* Reference image — demo poster example */}
          <div className="mt-10 border-t border-zinc-200 pt-8">
            <p className="mono text-[10px] text-zinc-400 tracking-widest mb-1">版面結構參考 REFERENCE</p>
            <p className="text-xs text-zinc-500 mb-5">
              以黑盒子主題的示範海報，觀察各區塊的配置邏輯：標題 / 步驟流程 / 問題與解法 / 主視覺與元件標注 / 資訊列。
            </p>
            <div className="border border-zinc-200 overflow-hidden bg-zinc-50">
              <img
                src={`${import.meta.env.BASE_URL}poster-reference.jpg`}
                alt="黑盒子示範海報參考 — 版面結構示意"
                className="w-full block"
              />
            </div>
            <p className="mono text-[10px] text-zinc-300 mt-2">
              示意海報：以黑盒子作品概念製作的版面參考圖（非實際印刷規格，僅供結構參考）
            </p>
          </div>
        </div>
      )}

      {/* ── 必填內容 ── */}
      {activeTab === 'content' && (
        <div>
          <div className="mb-8 p-4 border-l-2 border-[#CC0000] bg-zinc-50">
            <p className="text-xs text-zinc-600 leading-relaxed">
              海報必須完整呈現三份核心文件的內容，加上競賽格式必備的識別資訊。
              缺少任何一項視為不完整。
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                num: '01', title: '設計概要', en: 'Design Brief', color: '#a78bfa',
                zone: '主視覺 LEFT — 上方',
                items: [
                  { label: '作品名稱（中英文）', desc: '大標題，建議 24pt 以上，放在海報最顯眼位置' },
                  { label: '感受定義', desc: '用感官語言（不是情緒詞）描述要傳遞的感受，例：「胸口微緊、呼吸變淺的等待感」' },
                  { label: '設計意圖', desc: '一句話說明為什麼設計這個盒子、希望使用者感受到什麼' },
                  { label: '感官屬性', desc: '頻率、強度、節奏、方向——量化你的感受，例：0.25Hz · 不規律節奏' },
                  { label: '輸出機制選擇理由', desc: '為什麼選這個輸出方式？為什麼不是別的？（需說明被排除的選項）' },
                ],
              },
              {
                num: '02', title: '材料說明', en: 'Material Justification', color: '#fb923c',
                zone: '主視覺 LEFT — 中段',
                items: [
                  { label: '每種材料名稱與規格', desc: '精確描述，例：2mm 黑色 PLA · 霧面磨砂處理' },
                  { label: '材料感官特性', desc: '觸感、重量、溫度、敲擊聲音——描述與使用者的接觸體驗' },
                  { label: '設計理由', desc: '這些感官特性如何支持你要傳遞的感受？必須有明確的因果關係' },
                  { label: '替代方案比較', desc: '考慮過哪些其他材料？為什麼最終沒有選？' },
                ],
              },
              {
                num: '03', title: '系統說明', en: 'System Documentation', color: '#34d399',
                zone: '主視覺 LEFT — 下段',
                items: [
                  { label: '系統架構（技術層面）', desc: 'INPUT → PROCESS → OUTPUT 流程，含所有元件型號（Arduino Uno · TTP223 · 8520 馬達等）' },
                  { label: '狀態機說明', desc: 'IDLE → SENSING → ACTIVE → RELEASE 四狀態，各狀態的觸發條件與輸出行為' },
                  { label: '體驗流程（使用者層面）', desc: '使用者拿起 → 接觸 → 感受什麼 → 離開後什麼改變，從人的視角描述，不是技術語言' },
                  { label: '設計驗證', desc: '如何確認輸出的物理形式真的傳達了目標感受（可連結盲測結果）' },
                ],
              },
              {
                num: '04', title: '作品視覺', en: 'Product Visual', color: '#60a5fa',
                zone: '主視覺 RIGHT — 全高',
                items: [
                  { label: '作品實體照片（優先）', desc: '真實照片比繪製插圖更有說服力，至少 300 dpi，建議純色或深色背景' },
                  { label: '等角透視圖（替代）', desc: '無法拍照時，可用精確等角插圖代替，需呈現三個面' },
                  { label: '尺寸標注', desc: '標示 150mm 邊長，確認符合 15cm 正立方體規格' },
                  { label: '元件標注線', desc: '指向關鍵元件（感測器、輸出裝置、指示燈）的虛線標注，附型號' },
                ],
              },
              {
                num: '05', title: '識別資訊', en: 'Identity Information', color: '#f472b6',
                zone: '資訊列 + 上下帶',
                items: [
                  { label: '資訊列欄 1：作品名稱 / 類別', desc: '作品中英文名稱，作品類別標示' },
                  { label: '資訊列欄 2：設計概念', desc: '一句話概念說明，20 字以內' },
                  { label: '資訊列欄 3：學生', desc: '所有組員姓名 / 學號' },
                  { label: '資訊列欄 4：學校 / 系所', desc: '國立臺北商業大學 · 創意科技與產品設計系' },
                  { label: '下帶：尺寸標示', desc: 'A3 · 420 × 297 MM（右側）' },
                ],
              },
            ].map((sec) => (
              <div key={sec.num} className="border border-zinc-200 overflow-hidden">
                <div className="flex items-center gap-4 px-6 py-4 border-b border-zinc-100 bg-zinc-50">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: sec.color + '22', border: `1.5px solid ${sec.color}` }}>
                    <span className="mono font-bold text-xs" style={{ color: sec.color }}>{sec.num}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-zinc-900 text-sm">{sec.title}</div>
                    <div className="mono text-[10px] text-zinc-400 mt-0.5">{sec.en}</div>
                  </div>
                  <div className="mono text-[9px] text-zinc-400 text-right">
                    <div className="mb-0.5">配置位置</div>
                    <div className="font-medium text-zinc-600">{sec.zone}</div>
                  </div>
                  <div className="mono text-[9px] px-2 py-1 bg-[#CC0000] text-white shrink-0">必填</div>
                </div>
                <div className="p-6 space-y-3">
                  {sec.items.map((item, j) => (
                    <div key={j} className="flex gap-3">
                      <div className="w-1 rounded-full shrink-0 mt-1.5" style={{ background: sec.color, minHeight: 12 }} />
                      <div>
                        <span className="text-zinc-800 font-medium text-xs">{item.label}</span>
                        <span className="text-zinc-400 text-xs"> — {item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Pre-submission checklist */}
          <div className="mt-8 p-6 border-2 border-zinc-900">
            <p className="mono text-xs font-bold text-zinc-900 mb-5 tracking-widest">PRE-SUBMISSION CHECKLIST</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {[
                '作品名稱（中英文）在海報最顯眼位置，24pt 以上',
                '感受定義使用感官語言，不是情緒詞',
                '每種材料都有感官特性 + 設計理由說明',
                '系統架構含所有元件型號',
                '體驗流程以使用者視角描述（非技術語言）',
                '作品照片或等角插圖清晰，解析度 ≥ 300dpi',
                '資訊列四欄完整填寫',
                '海報方向：橫式（寬 420 > 高 297）',
                '尺寸確認：420 × 297 mm（A3）——非其他尺寸',
                '出血已設定 3mm，安全區 5mm，重要內容在安全區內',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="mono text-zinc-300 text-xs mt-0.5 shrink-0">□</span>
                  <span className="text-xs text-zinc-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── 格線系統 ── */}
      {activeTab === 'grid' && (
        <div className="space-y-12">

          {/* ── INTRO ── */}
          <div className="border-l-4 border-[#CC0000] bg-zinc-50 p-6">
            <p className="mono text-[10px] text-[#CC0000] font-bold tracking-widest mb-3">什麼是格線系統？</p>
            <p className="text-sm text-zinc-700 leading-relaxed mb-3">
              <strong className="text-zinc-900">格線系統（Grid System）</strong>是排版下方一張看不見的「對齊骨架」。
              所有文字、圖片、區塊都以格線為基準對齊，整體版面就會有秩序感、可讀性與視覺節奏。
            </p>
            <p className="text-sm text-zinc-600 leading-relaxed">
              想像沒有格線時，每張內容都歪一點點，整張海報像被風吹過的便條紙。
              有格線後，所有元素被放在隱形軌道上，讀者的視線可以沿著預期的路徑流動，資訊就被清楚傳達。
              格線本身不會被印出來——它是工作時的<strong>輔助結構</strong>，不是最終視覺。
            </p>
          </div>

          {/* ── HISTORY ── */}
          <div>
            <p className="mono text-[10px] text-zinc-400 tracking-widest mb-4">歷史脈絡 HISTORY ——</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  era: '1920s',
                  title: '包浩斯 BAUHAUS',
                  place: '德國威瑪',
                  text: '德國 Bauhaus 學校的設計師（Herbert Bayer、László Moholy-Nagy）首次把建築的模組化思維帶進排版，用幾何方塊組織頁面，奠定「設計可以系統化」的基本信念。',
                },
                {
                  era: '1950s',
                  title: '瑞士國際主義 SWISS STYLE',
                  place: '蘇黎世 · 巴塞爾',
                  text: 'Josef Müller-Brockmann、Emil Ruder、Karl Gerstner 等人系統化了格線設計，發展出「版心 + 欄 + 欄間距 + 基線格」四要素，並寫成教材傳遍世界，奠定現代視覺設計基礎。',
                },
                {
                  era: 'NOW',
                  title: '所有螢幕與印刷',
                  place: '全球',
                  text: 'Bootstrap 12 欄、Material Design、Apple HIG、Tailwind CSS、所有報紙雜誌——你今天看到的一切「看起來專業」的版面，都建立在 70 年前瑞士人定下的格線系統上。',
                },
              ].map((item, i) => (
                <div key={i} className="border border-zinc-200 p-5 bg-white">
                  <div className="mono text-[10px] text-[#CC0000] font-bold tracking-widest mb-2">{item.era}</div>
                  <div className="font-bold text-zinc-900 text-sm mb-1">{item.title}</div>
                  <div className="mono text-[10px] text-zinc-400 mb-3">{item.place}</div>
                  <p className="text-xs text-zinc-600 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
            <p className="mono text-[10px] text-zinc-300 mt-3 leading-relaxed">
              業界經典：Josef Müller-Brockmann《Grid Systems in Graphic Design》(1981) 至今仍是設計學院基本教材。
            </p>
          </div>

          {/* ── WHY ── */}
          <div>
            <p className="mono text-[10px] text-zinc-400 tracking-widest mb-4">為什麼需要格線 WHY GRIDS MATTER ——</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  num: '01',
                  title: '視覺秩序',
                  text: '人類視覺對「對齊」極度敏感。元素只要差個 1mm，看起來就是「亂」。格線消除這種無意識的不安。',
                },
                {
                  num: '02',
                  title: '建立資訊階層',
                  text: '主標題占 6 欄、副標題占 4 欄、內文占 3 欄——欄寬本身就在告訴讀者「哪個更重要」。',
                },
                {
                  num: '03',
                  title: '加速設計決策',
                  text: '你不再需要每個元素都從零思考要放在哪。格線給你預設答案：對齊欄線就對了，省下無謂的判斷。',
                },
                {
                  num: '04',
                  title: '看起來「專業」',
                  text: '大部分「看起來很 pro」的設計感都來自隱形格線。學生作品與專業作品的差別，常常就在這一點。',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-5 border border-zinc-200">
                  <div className="mono text-3xl font-black text-[#CC0000] shrink-0 leading-none">{item.num}</div>
                  <div>
                    <div className="font-bold text-zinc-900 text-sm mb-1.5">{item.title}</div>
                    <p className="text-xs text-zinc-600 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CORE ELEMENTS ── */}
          <div>
            <p className="mono text-[10px] text-zinc-400 tracking-widest mb-4">核心元素 FOUR COMPONENTS ——</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  cn: '版心',
                  en: 'TYPE AREA / MARGIN',
                  text: '紙張內側可放內容的範圍。本課程設定四邊各內縮 20mm，留白讓版面呼吸，也避免重要元素被印刷裁切到。',
                  spec: 'A3 海報：四邊各 20mm 邊距 → 版心 380 × 257 mm',
                },
                {
                  cn: '欄',
                  en: 'COLUMN',
                  text: '把版心垂直切成的細長區塊。內容（文字、圖片）以欄為單位排列。一個元素可以占 1 欄、2 欄、3 欄……',
                  spec: '本課程：12 欄 · 每欄約 27.1 mm 寬',
                },
                {
                  cn: '欄間距',
                  en: 'GUTTER',
                  text: '欄與欄之間的留白。讓相鄰欄位的內容不會擠在一起。內容絕對不能跨進 Gutter——這是視覺呼吸的關鍵。',
                  spec: '本課程：5 mm Gutter · 共 11 條',
                },
                {
                  cn: '基線格',
                  en: 'BASELINE GRID',
                  text: '水平方向的隱形線，所有文字行的底部對齊這些線。讓不同欄的文字在水平也對齊，創造節奏感。',
                  spec: '本課程：8 mm 基線 · 內文行距至少 10 mm',
                },
              ].map((item, i) => (
                <div key={i} className="p-5 border border-zinc-200">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-2xl font-black text-zinc-900">{item.cn}</span>
                    <span className="mono text-[10px] text-zinc-400 tracking-widest">{item.en}</span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed mb-3">{item.text}</p>
                  <div className="mono text-[10px] text-[#CC0000] bg-red-50 px-3 py-1.5 inline-block">
                    {item.spec}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── WHY 12 ── */}
          <div>
            <p className="mono text-[10px] text-zinc-400 tracking-widest mb-4">為什麼是 12 欄 WHY 12 ——</p>
            <div className="border border-zinc-200 p-6 bg-zinc-50">
              <p className="text-sm text-zinc-700 leading-relaxed mb-2">
                <strong className="text-zinc-900">因為 12 可以被 2、3、4、6 整除。</strong>
              </p>
              <p className="text-xs text-zinc-600 leading-relaxed mb-6">
                這給設計師最多的彈性。無論你想做兩欄、三欄、四欄、六欄的內容，12 欄系統都能完美對應，不會出現除不盡的小數。這也是 Bootstrap、Material UI、Tailwind 都選擇 12 欄的原因。
              </p>
              <div className="space-y-2.5">
                {[
                  { divs: 12, label: '12 等分　— 元件標注、欄位細節、最細粒度' },
                  { divs: 6,  label: '6 等分（每塊 2 欄）　— 雙欄文字、左右對照' },
                  { divs: 4,  label: '4 等分（每塊 3 欄）　— 三段並列說明、卡片列表' },
                  { divs: 3,  label: '3 等分（每塊 4 欄）　— 三段並列說明（較寬）' },
                  { divs: 2,  label: '2 等分（每塊 6 欄）　— 主視覺左右分割（≈本課程）' },
                  { divs: 1,  label: '1 等分（滿版 12 欄）— 上帶、資訊列、下帶、滿版圖' },
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="mono text-[10px] text-zinc-400 w-8 shrink-0 font-bold">×{row.divs}</span>
                    <div className="flex-1 grid gap-px max-w-md" style={{ gridTemplateColumns: `repeat(${row.divs}, 1fr)` }}>
                      {Array.from({ length: row.divs }).map((_, j) => (
                        <div key={j} className="h-6 bg-[#CC0000]" style={{ opacity: 0.75 - (j % 2) * 0.15 }} />
                      ))}
                    </div>
                    <span className="text-[11px] text-zinc-500 flex-1">{row.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── SPEC TABLE + COLUMN ASSIGNMENT ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-zinc-900 mb-4 text-sm">本課程 A3 格線規格</h3>
              <div className="border border-zinc-200">
                {[
                  ['紙張尺寸',     '420 × 297 mm（A3 橫式）'],
                  ['版心邊距',     '20 mm（上下左右均等）'],
                  ['版心寬',       '380 mm（420 − 40）'],
                  ['版心高',       '257 mm（297 − 40）'],
                  ['欄數',         '12 欄（Column）'],
                  ['欄間距 Gutter','5 mm（共 11 條）'],
                  ['欄寬',         '≈ 27.1 mm（(380 − 55) ÷ 12）'],
                  ['基線格',       '8 mm（Baseline Grid）'],
                  ['最小行距',     '10 mm（內文建議）'],
                ].map(([k, v], i) => (
                  <div key={i} className={`flex items-start px-4 py-3 ${i % 2 === 0 ? 'bg-white' : 'bg-zinc-50'}`}>
                    <span className="mono text-xs text-zinc-500 w-32 shrink-0 mt-0.5">{k}</span>
                    <span className="mono text-xs font-bold text-zinc-900">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 mb-4 text-sm">欄位配置建議</h3>
              <div className="space-y-4">
                {[
                  { cols: '1–6',     role: '左側文字區',  desc: '設計概要、步驟說明、材料 / 系統說明（對應主視覺左 ≈ 53%）', fill: 'bg-zinc-300' },
                  { cols: '7–12',    role: '右側圖片區',  desc: '作品照片或插圖，可延伸至版心邊（對應主視覺右 ≈ 47%）',      fill: 'bg-zinc-700' },
                  { cols: '1–12',    role: '全版帶狀',    desc: '上帶、資訊列、下帶——橫跨全版寬',                            fill: 'bg-zinc-900' },
                  { cols: '1–3',     role: '邊欄備用',    desc: '小圖說、技術標注、元件清單、尺寸箭頭',                       fill: 'bg-[#CC0000]' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`mono text-[10px] text-white px-2 py-1 shrink-0 ${item.fill}`}
                      style={{ minWidth: '4.5rem', textAlign: 'center' }}>{item.cols}</div>
                    <div>
                      <div className="font-semibold text-zinc-900 text-xs">{item.role}</div>
                      <div className="text-zinc-400 text-xs mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── PRINCIPLES ── */}
          <div className="border-2 border-zinc-900 p-6">
            <p className="mono text-xs text-zinc-900 font-bold tracking-widest mb-5">格線使用五原則 ——</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {[
                ['先建格線，再排版',         '把格線當底圖打開，所有元素才有錨點。即使要打破，也必須有「我正在打破」的意識。'],
                ['對齊欄線或欄間距中線',     '元素邊緣不可隨意放置，要對到既定的線上。Figma / Illustrator 開啟 Snap to Grid。'],
                ['文字頂部對齊基線格',       '8mm 的倍數，讓不同欄的文字水平也整齊。'],
                ['Gutter 是聖地',           '欄間距內絕對不放任何內容。留白本身就是設計，不是浪費。'],
                ['知道規則才有資格打破規則', '專業設計才有資格刻意違規。新手請先嚴守，等熟練後再考慮例外。'],
              ].map(([title, desc], i) => (
                <div key={i} className="flex gap-3">
                  <span className="mono text-sm text-[#CC0000] font-bold shrink-0 mt-0.5">0{i+1}</span>
                  <div>
                    <div className="font-semibold text-zinc-900 text-xs">{title}</div>
                    <div className="text-zinc-500 text-[11px] mt-0.5 leading-relaxed">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ── 字型層級 ── */}
      {activeTab === 'type' && (
        <div>
          <div className="mb-6 p-4 border-l-2 border-[#CC0000] bg-zinc-50">
            <p className="text-xs text-zinc-600 leading-relaxed">
              A3 橫式海報（420 × 297mm）正常閱讀距離約 <strong>60–80cm</strong>，展覽牆面可達 <strong>1–2m</strong>。
              主標題必須在 2m 外清楚辨識。以下尺寸以
              <span className="mono font-bold"> 72pt = 25.4mm（1 英寸）</span> 換算，基準 300dpi。
            </p>
          </div>
          <div className="border border-zinc-200 overflow-hidden mb-8">
            <div className="grid grid-cols-12 bg-zinc-900 text-white mono text-[10px] px-4 py-2">
              <div className="col-span-3">角色 Role</div>
              <div className="col-span-2">尺寸 Size</div>
              <div className="col-span-2">字重 Weight</div>
              <div className="col-span-2">字距 Tracking</div>
              <div className="col-span-3">範例 / 用途說明</div>
            </div>
            {[
              { role: '作品名稱 Display', size: 72, weight: '900', tracking: '-0.02em', example: '黑盒子', note: '主標題，2m 可辨識' },
              { role: '副標題 H1',        size: 48, weight: '700', tracking: '-0.01em', example: 'Black Box', note: '英文對應標題' },
              { role: '段落標題 H2',      size: 28, weight: '600', tracking: '0em',     example: '設計說明', note: '各區塊小標' },
              { role: '標籤 Label',       size: 14, weight: '500', tracking: '0.08em',  example: 'SECTION 01', note: '全大寫標注，技術標籤' },
              { role: '內文 Body',        size: 11, weight: '400', tracking: '0.01em',  example: '感受定義', note: '說明文字，最小可用值' },
              { role: '圖說 Caption',     size: 9,  weight: '400', tracking: '0.04em',  example: 'TTP223', note: '元件標注線文字，極限值' },
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-12 px-4 py-4 items-center border-t border-zinc-100 ${i % 2 === 1 ? 'bg-zinc-50' : 'bg-white'}`}>
                <div className="col-span-3">
                  <div className="text-xs text-zinc-700 font-medium">{row.role}</div>
                  <div className="mono text-[9px] text-zinc-400 mt-0.5">{row.note}</div>
                </div>
                <div className="col-span-2 mono text-xs font-bold text-zinc-900">{row.size}pt</div>
                <div className="col-span-2 mono text-xs text-zinc-500">{row.weight}</div>
                <div className="col-span-2 mono text-xs text-zinc-500">{row.tracking}</div>
                <div className="col-span-3 text-zinc-800 truncate"
                  style={{ fontSize: Math.min(row.size * 0.28, 28) + 'px', fontWeight: row.weight, letterSpacing: row.tracking, lineHeight: 1.1 }}>
                  {row.example}
                </div>
              </div>
            ))}
          </div>
          {/* Font recommendations — print + screen consideration */}
          <div className="mb-6 p-5 border-l-4 border-zinc-900 bg-zinc-50">
            <p className="mono text-[10px] text-zinc-900 font-bold tracking-widest mb-2">海報字型規劃原則</p>
            <p className="text-xs text-zinc-600 leading-relaxed">
              海報同時要在<strong>螢幕設計階段</strong>（80cm 觀看距離）與<strong>印刷成品</strong>（展場 1–2m 觀看距離）兩種情境下易讀。
              全部使用<strong>無襯線字體（Sans-Serif）</strong>，避免細襯線在印刷縮放時消失。
              字面寬（字寬與字高比例）大、x-height 高的字型在小尺寸下辨識度最佳。
              本網站本身也使用以下相同字型——你在預覽中看到的效果即為印刷後的視覺。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-zinc-200 p-5">
              <p className="mono text-[10px] text-zinc-900 font-bold tracking-widest mb-4">推薦字型組合</p>
              <div className="space-y-4">
                {[
                  {
                    lang: '中文',
                    font: 'Noto Sans TC',
                    sub: '思源黑體（Google 開源）',
                    use: '所有中文內容。九種字重（100–900）支援強烈視覺層次。字面寬大、印刷與螢幕都清晰。免費商用。',
                  },
                  {
                    lang: '英文 / 數字',
                    font: 'Inter',
                    sub: 'UI 介面字體（Google 開源）',
                    use: 'Rasmus Andersson 設計，為螢幕閱讀優化。高 x-height、字面開放，小尺寸（9pt）仍可清晰辨識。印刷品質同樣優秀。',
                  },
                  {
                    lang: '技術標注 / 等寬',
                    font: 'IBM Plex Mono',
                    sub: 'IBM 企業設計系統（Google 開源）',
                    use: '元件型號（TTP223）、規格數字、章節標籤。比 Space Mono 字面更寬、辨識度更高，行動裝置上閱讀效果好。',
                  },
                  {
                    lang: '備援字型',
                    font: 'PingFang TC / 微軟正黑體',
                    sub: 'System Fallback',
                    use: '若主字型未載入，使用系統黑體（macOS PingFang TC、Windows 微軟正黑體）作為備援，確保任何裝置都能正常顯示。',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 pb-3 border-b border-zinc-100 last:border-b-0 last:pb-0">
                    <span className="mono text-[9px] text-zinc-400 w-24 shrink-0 mt-0.5">{item.lang}</span>
                    <div className="flex-1">
                      <div className="mono text-[11px] font-bold text-zinc-900">{item.font}</div>
                      <div className="text-[10px] text-zinc-400 mt-0.5 mb-1">{item.sub}</div>
                      <div className="text-[11px] text-zinc-500 leading-relaxed">{item.use}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-zinc-900 text-zinc-100">
                <p className="mono text-[9px] text-zinc-400 mb-1.5 tracking-widest">CSS / GOOGLE FONTS</p>
                <p className="mono text-[10px] leading-relaxed break-all">
                  family=Inter:wght@400..900<br/>
                  family=Noto+Sans+TC:wght@400..900<br/>
                  family=IBM+Plex+Mono:wght@400..700
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="border border-zinc-200 p-5">
                <p className="mono text-[10px] text-zinc-900 font-bold tracking-widest mb-4">組合策略</p>
                <div className="space-y-3 text-xs text-zinc-600 leading-relaxed">
                  {[
                    ['粗細對比建立層次', '主標題用 Noto Sans TC 900 (Black)、副標 700 (Bold)、內文 400 (Regular)。粗細跨度越大，視覺層級越清楚。'],
                    ['中英文同時排版', '中文與英文採同一基線。Inter + Noto Sans TC 設計風格相近、x-height 接近，混排不會視覺斷裂。'],
                    ['等寬字限定使用', 'IBM Plex Mono 只用在「需要強調技術感」的位置：章節編號、元件型號、規格數字、URL。不要用在大段內文。'],
                    ['控制在三種字型內', '海報全版面只用 Inter + Noto Sans TC + IBM Plex Mono 三種。再多就破碎。'],
                  ].map(([title, text], i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="mono text-[9px] text-[#CC0000] font-bold mt-1 shrink-0">0{i+1}</span>
                      <div>
                        <div className="text-xs font-medium text-zinc-900">{title}</div>
                        <div className="text-[11px] text-zinc-500 mt-0.5">{text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-zinc-200 p-5">
                <p className="mono text-[10px] text-zinc-900 font-bold tracking-widest mb-4">常見錯誤</p>
                <div className="space-y-3">
                  {[
                    ['內文小於 9pt',           '印刷後無法辨識，不管版面多精緻都沒用'],
                    ['用襯線字體做標題',         '展場 2m 距離下細部會糊掉，永遠用無襯線'],
                    ['使用超過 3 種字型',       '版面破碎，失去設計感'],
                    ['標題與內文大小差距不足',   '無法建立閱讀層次，評審找不到重點'],
                    ['全部置中對齊',            '大量文字不適合置中，用左對齊並統一邊距'],
                  ].map(([bad, note], i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-red-500 text-xs mt-0.5 shrink-0">✗</span>
                      <div>
                        <div className="text-xs font-medium text-zinc-800">{bad}</div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">{note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 色彩規範 ── */}
      {activeTab === 'color' && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border border-zinc-200 mb-8">
            {PALETTE.map((c, i) => (
              <div key={i} className={`border-b border-r border-zinc-200 ${i%3===2?'border-r-0':''} ${i>=3?'border-b-0':''}`}>
                <div className="h-20 w-full" style={{ background: c.hex, border: c.hex==='#FFFFFF'?'1px solid #E4E4E7':'none' }} />
                <div className="p-4">
                  <div className="font-bold text-zinc-900 text-xs mb-1">{c.name}</div>
                  <div className="mono text-[10px] text-zinc-500 mb-0.5">{c.hex}</div>
                  <div className="mono text-[10px] text-zinc-400 mb-2">{c.cmyk}</div>
                  <div className="text-[11px] text-zinc-500">{c.usage}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-zinc-200 p-5">
              <p className="mono text-[10px] text-[#CC0000] font-bold tracking-widest mb-4">強調色使用原則</p>
              <div className="space-y-3 text-xs text-zinc-600 leading-relaxed">
                {[
                  ['bg-[#CC0000]', '強調色最多出現 3 個位置：章節號、強調字、色塊邊線。不要用紅色做大面積背景。'],
                  ['bg-zinc-900',  '紅色面積不超過版面的 10%，否則失去強調效果，整張海報看起來很吵。'],
                  ['bg-zinc-400',  '灰色系做漸進層次（深灰主標 → 中灰說明 → 淺灰圖說），避免純黑以外的彩色作背景。'],
                ].map(([dot, text], i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className={`w-2 h-2 rounded-full ${dot} mt-1 shrink-0`} />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-zinc-200 p-5">
              <p className="mono text-[10px] text-zinc-400 font-bold tracking-widest mb-4">對比度（WCAG AA）</p>
              <div className="space-y-3">
                {[
                  { fg: '#FFF',    bg: '#0A0A0A', label: '白字 on 主黑',   ratio: '18.7:1' },
                  { fg: '#0A0A0A', bg: '#FFF',    label: '主黑 on 白底',   ratio: '18.7:1' },
                  { fg: '#FFF',    bg: '#CC0000', label: '白字 on 瑞士紅', ratio: '5.1:1'  },
                  { fg: '#71717A', bg: '#FFF',    label: '中灰 on 白底',   ratio: '4.6:1'  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-16 h-7 border border-zinc-200 flex items-center justify-center rounded-sm shrink-0 text-[11px] font-bold"
                      style={{ background: item.bg, color: item.fg }}>Aa</div>
                    <div className="flex-1 text-xs text-zinc-600">{item.label}</div>
                    <div className="mono text-[10px] px-2 py-0.5 bg-zinc-900 text-white">{item.ratio}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 繳交規格（always visible）── */}
      <div className="mt-10 border-t-2 border-zinc-900 pt-6">
        <p className="mono text-[10px] text-zinc-400 tracking-widest mb-4">繳交規格 SUBMISSION</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-zinc-200">
          {[
            {
              num: 'A', title: 'PDF 向量檔',
              specs: ['A3 橫式（420 × 297 mm）', 'PDF/X-1a 或 PDF/X-4（印刷標準）', '含出血 3mm（成品 426 × 303 mm）', '所有字型嵌入（Embed Fonts）', 'CMYK 色彩模式', '影像解析度 ≥ 300dpi'],
            },
            {
              num: 'B', title: 'PNG 高解析',
              specs: ['300 dpi（4961 × 3508 px）', 'RGB 色彩模式', '壓縮品質最高（無損）', '檔案大小 < 20 MB', '不含出血，裁切至成品尺寸即可'],
            },
            {
              num: 'C', title: '原始檔案',
              specs: ['Figma / Illustrator / InDesign', '所有字型另存為獨立資料夾', '使用的圖片全部一起附上', '圖層整齊命名（以區塊命名）', 'Readme.txt 說明軟體版本'],
            },
          ].map((item, i) => (
            <div key={i} className={`p-6 ${i < 2 ? 'border-r border-zinc-200' : ''}`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="mono text-[#CC0000] text-xs font-bold">{item.num}</span>
                <span className="font-bold text-zinc-900 text-sm">{item.title}</span>
              </div>
              <ul className="space-y-1.5">
                {item.specs.map((s, j) => (
                  <li key={j} className="text-xs text-zinc-500 flex items-start gap-2">
                    <span className="text-zinc-300 mt-0.5 shrink-0">—</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 border border-amber-200 bg-amber-50">
          <p className="mono text-[10px] text-amber-700 font-bold mb-1">繳交前最後確認</p>
          <p className="text-xs text-amber-800">
            在 Figma／Illustrator 以「實際大小（100%）」預覽，確認所有文字清晰可讀。
            印刷前建議先輸出一張 A4 縮小版確認版面比例正確。
          </p>
        </div>
      </div>
    </div>
  )
}
