// 課程內容資料（單一來源：改課程內容改這裡）
// 內容對齊備課專案「202608 課程 清大物件導向程式設計」課綱草案

export const PHASES = [
  {
    id: 'I',
    weeks: 'W1–6',
    name: '保護掙扎期',
    subtitle: 'p5.js 手寫基礎',
    color: 'sky',
    goal: '建立「我能讓電腦聽話」的身體感',
    aiRule: 'AI 生成的程式碼禁止直接提交；參考了 AI 的說明，須逐行手打並在文件中註明。',
    desc: '那種摩擦感正是滋養創造力之處。前六週我們刻意保護掙扎的過程——畫布、變數、條件、迴圈、函式、陣列，全部親手寫。',
  },
  {
    id: 'II',
    weeks: 'W7–11',
    name: '物件導向＝創作媒材',
    subtitle: 'class／繼承／多型',
    color: 'amber',
    goal: '一個粒子是 class，一千個粒子是作品',
    aiRule: 'AI 可用於除錯與解釋錯誤訊息，不可代寫整段功能；使用須在作業的 AI 揭露欄註明。',
    desc: '物件導向不用工程範例教，用創作教：粒子系統、繼承與多型、向量與群集行為（flocking），期中交一件物件導向生成藝術小品。',
  },
  {
    id: 'III',
    weeks: 'W12–16',
    name: 'AI 課綱化',
    subtitle: '從防 AI 到指揮 AI',
    color: 'violet',
    goal: '知道自己在做什麼，然後指揮 AI',
    aiRule: '全面開放 AI 協作，但須完整揭露（工具／日期／prompt 摘要／採用範圍），且期末答辯要能解釋任何一段碼——解釋不出來的段落不計分。',
    desc: 'prompt→驗證→逐行手打、讀碼與重混、ml5.js 把身體接進作品，期末專題以揭露制＋口頭 critique 收尾。',
  },
]

export const WEEKS = [
  { w: 1, phase: 'I', title: '導論：AI 時代為什麼還要學寫程式', note: 'p5.js 第一張畫布：setup/draw、座標、圖形、色彩' },
  { w: 2, phase: 'I', title: '變數與互動', note: 'mouseX/mouseY、random()、會呼吸的圖形' },
  { w: 3, phase: 'I', title: '條件與事件', note: 'if/else、滑鼠鍵盤事件、狀態切換' },
  { w: 4, phase: 'I', title: '迴圈與重複之美', note: 'for 迴圈、網格、一行迴圈長出一整面牆' },
  { w: 5, phase: 'I', title: '函式：封裝自己的視覺語彙', note: '參數化：把「一朵花」變成「任何一朵花」' },
  { w: 6, phase: 'I', title: '陣列＋課堂實作檢核 ①', note: '當場限時完成小題，只能查官方文件', flag: '檢核' },
  { w: 7, phase: 'II', title: '物件與類別：一顆粒子的誕生', note: 'class、constructor、update()/display()' },
  { w: 8, phase: 'II', title: '一千顆粒子：陣列 × 物件', note: '粒子系統：煙、雨、雪、星塵' },
  { w: 9, phase: 'II', title: '繼承與多型：各自表述', note: 'extends/super，同一個系統三種行為' },
  { w: 10, phase: 'II', title: '向量、力與群集', note: 'p5.Vector、吸引排斥、flocking 魚群鳥群' },
  { w: 11, phase: 'II', title: '期中發表', note: '物件導向生成藝術小品＋口頭 critique', flag: '發表' },
  { w: 12, phase: 'III', title: 'AI 協作第一課', note: 'prompt→驗證→逐行手打；建立 AI 使用紀錄', flag: '檢核' },
  { w: 13, phase: 'III', title: '重混與改造', note: 'fork 別人的碼（包括 AI 的碼），揭露倫理' },
  { w: 14, phase: 'III', title: 'AI 當媒材：ml5.js 進場', note: '手勢／姿態偵測，身體變成控制器' },
  { w: 15, phase: 'III', title: '期末專題製作週', note: '一對一 studio time' },
  { w: 16, phase: 'III', title: '期末展演＋口頭答辯', note: '公開展示；解釋你的碼＋AI 用在哪', flag: '展演' },
]

export const ASSESSMENT = [
  { item: '課堂實作檢核 ×2（W6、W12）', pct: 20, note: '當場完成；完成度三級制，非對錯評分' },
  { item: '週作業＋文件化', pct: 25, note: '每份含碼＋截圖＋100–200 字反思＋AI 揭露欄' },
  { item: '期中作品＋critique（W11）', pct: 20, note: '四件套交付＋口頭說明 class 設計' },
  { item: '期末專題＋口頭答辯（W16）', pct: 30, note: '作品 20%＋答辯 10%' },
  { item: '出席與 critique 參與', pct: 5, note: '給同學回饋的品質' },
]

export const AI_RULES = [
  { t: '求助順序', d: '先問 3 個同學 → 再問 AI → 再問老師。' },
  { t: '階段 I（W1–6）', d: '作業禁止提交 AI 生成的程式碼。參考了 AI 的說明，須逐行手打並註明。' },
  { t: '階段 II（W7–11）', d: 'AI 可用於除錯與解釋，不可代寫整段功能；使用須在 AI 揭露欄註明。' },
  { t: '階段 III（W12–16）', d: '全面開放協作：完整揭露（工具／日期／prompt／採用範圍）＋答辯時能解釋任何一段碼。解釋不出來的段落不計分。' },
  { t: '誠實優先', d: '未揭露而查獲＝該次作業零分；誠實揭露永遠不扣分——本課獎勵透明，不獎勵僥倖。' },
]

export const TOOLS = [
  { name: 'p5.js 網頁編輯器', role: '主要創作環境', cost: '免費', note: 'editor.p5js.org——瀏覽器開了就寫，全課程用它', main: true },
  { name: 'Claude Pro（自行訂閱）', role: '階段 II–III 的 AI 夥伴', cost: '約 US$20/月', note: 'W7 之後再訂閱即可，一學期約訂 2–3 個月', main: true },
  { name: 'Gemini 免費層', role: '免費保底', cost: '免費', note: '個人 Google 帳號即可，額度足以完成所有課程要求', main: false },
  { name: 'GitHub（Education 驗證）', role: '作業繳交＋作品集', cost: '免費', note: 'W1 完成註冊與學生驗證；Copilot Free 含終端機版可當備援', main: false },
]

export const SUBMIT_STEPS = [
  { t: '開自己的作品集 repo', d: '從課程 template 建立，一人一個、整學期用同一個，每週一個資料夾。' },
  { t: '作業放進當週資料夾', d: '程式碼＋截圖＋README 四件套（作品說明、反思、AI 揭露）。不會終端機沒關係——網頁上傳就好。' },
  { t: 'Deadline 前 push', d: 'commit 時間戳＝繳交紀錄；你的每一步嘗試都是過程的證據。' },
  { t: '作品自動上線', d: 'GitHub Pages 讓每份作業變成一個網址，作業牆連向全班作品。' },
]
