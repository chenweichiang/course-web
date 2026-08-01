// 課程內容資料（單一來源：改課程內容改這裡）
// 內容對齊備課專案「202608 課程 清大物件導向程式設計」課綱草案 v1

export const PHASES = [
  {
    id: '壹',
    weeks: 'W1–4',
    name: '先懂 AI',
    subtitle: '問題、原理、工作流',
    goal: '看清工具的本質，把它變成自己的工作流',
    aiRule: 'W4（唯一手 key 週）課堂內不用 AI；其餘開放使用並揭露。',
    desc: '幻覺、同質化、著作權——先認識 AI 的問題與它在電腦中怎麼運作，再建構自己的工作流：動手前先讓 AI 做深度研究，開源穩定熱門工具優先，查證來源。',
  },
  {
    id: '貳',
    weeks: 'W5–11',
    name: '物件導向＝指揮 AI 的語言',
    subtitle: 'class／繼承／多型／群集',
    goal: '用對詞彙指揮，看懂每一段碼',
    aiRule: '全程用工作流創作並完整揭露；讀不懂的碼不准交——你要能解釋每個 class 的決定。',
    desc: '物件導向不是為了手寫，是指揮 AI 的精確詞彙：用工作流做粒子系統、繼承與多型、flocking，你負責讀懂、調參、驗證與 critique。',
  },
  {
    id: '參',
    weeks: 'W12–16',
    name: '研究先行做專題',
    subtitle: '研究→選型→製作→答辯',
    goal: '完整走一次研究先行的創作流程',
    aiRule: '期末研究報告（開源穩定熱門優先＋來源查證）簽核後才准動工；答辯講不出來的段落不計分。',
    desc: '題目定案後先讓你的 AI 做深度研究：做法比較、工具選型、風險備案。簽核通過才動工，ml5.js 與生成模型供專題選用，期末公開展演＋口頭答辯。',
  },
]

export const WEEKS = [
  { w: 1, phase: '壹', title: '導論＋AI 的問題', note: '幻覺、同質化、偏見、著作權——看清工具再上路' },
  { w: 2, phase: '壹', title: 'AI 怎麼運作', note: 'token、預測下一個字、機率性；現場實驗讓 AI 出錯' },
  { w: 3, phase: '壹', title: '建構自己的工作流', note: '研究先行示範：深度研究→開源穩定熱門優先→查證' },
  { w: 4, phase: '壹', title: 'p5.js 一日通', note: '唯一手 key 週：setup/draw、函式觀念、親手做一個動畫', flag: '檢核' },
  { w: 5, phase: '貳', title: '讀碼與 OOP 詞彙', note: 'class、物件、屬性、方法——看懂 AI 給你的碼' },
  { w: 6, phase: '貳', title: '一顆到一千顆粒子', note: '用工作流建粒子系統：煙、雨、雪、星塵' },
  { w: 7, phase: '貳', title: '繼承與多型', note: '請 AI 重構出三種行為，你 critique 它的架構' },
  { w: 8, phase: '貳', title: '向量、力與群集', note: 'flocking 魚群鳥群——這頁的背景就是它' },
  { w: 9, phase: '貳', title: '工作流實作檢核', note: '當場：研究→prompt→驗證→口頭說明每段碼', flag: '檢核' },
  { w: 10, phase: '貳', title: '期中專題製作', note: '一對一 studio time：物件導向生成藝術小品' },
  { w: 11, phase: '貳', title: '期中發表', note: '現場跑作品＋口頭 critique：class 設計與 AI 用在哪', flag: '發表' },
  { w: 12, phase: '參', title: '期末專題研究報告', note: '深度研究＋選型＋查證——簽核通過才准動工', flag: '簽核' },
  { w: 13, phase: '參', title: 'AI 當媒材', note: 'ml5.js 手勢／姿態偵測，身體變成控制器' },
  { w: 14, phase: '參', title: '重混與改造', note: 'fork 別人的碼（包括 AI 的碼），揭露倫理' },
  { w: 15, phase: '參', title: '期末專題製作', note: '一對一 studio time' },
  { w: 16, phase: '參', title: '期末展演＋答辯', note: '公開展示；講不出來的段落不計分', flag: '展演' },
]

export const ASSESSMENT = [
  { item: '課堂實作檢核 ×2（W4 手寫動畫、W9 工作流）', pct: 15, note: '當場完成；完成度三級制，非對錯評分' },
  { item: '研究報告 ×2（W3 小型選型、W12 專題研究）', pct: 15, note: '深度、選型理由（開源穩定熱門）、來源查證紀錄' },
  { item: '週作業＋文件化', pct: 20, note: '每份含碼＋截圖＋100–200 字反思＋AI 揭露欄' },
  { item: '期中作品＋critique（W11）', pct: 15, note: '四件套交付＋口頭說明 class 設計' },
  { item: '期末專題＋口頭答辯（W16）', pct: 30, note: '作品 20%＋答辯 10%' },
  { item: '出席與 critique 參與', pct: 5, note: '給同學回饋的品質' },
]

export const AI_RULES = [
  { t: '研究先行', d: '動手做之前，先讓你的 AI 做深度研究：比較做法與工具、開源穩定熱門優先，並查證來源——AI 的合成答案只當路標，關鍵事實回原始出處確認。' },
  { t: '驗證是你的工作', d: 'AI 是機率性的，會一本正經地錯。它給的每段碼、每個事實，跑過、查過才算數。' },
  { t: '完整揭露', d: '每份作業註明工具／日期／prompt 摘要／採用範圍；沒用到就寫「未使用」。未揭露而查獲＝該次作業零分；誠實揭露永遠不扣分。' },
  { t: '答辯定生死', d: '你要能解釋作品裡任何一段碼與每個決定；講不出來的段落不計分。' },
  { t: '唯一手寫週（W4）', d: '那一堂課不用 AI：親手讓電腦聽話一次，你才知道 AI 替你做了什麼。' },
]

export const TOOLS = [
  { name: 'p5.js 網頁編輯器', role: '創作環境（W4 手寫＋全程閱讀對象）', cost: '免費', note: 'editor.p5js.org——瀏覽器開了就寫，全課程用它', main: true },
  { name: 'Claude Pro（自行訂閱）', role: '你的工作流主力', cost: '約 US$20/月', note: 'W3 建工作流就要用——建議 W2–3 完成訂閱，一學期約 3–4 個月', main: true },
  { name: 'Gemini 免費層', role: '免費保底', cost: '免費', note: '個人 Google 帳號即可，額度足以完成所有課程要求', main: false },
  { name: 'GitHub（Education 驗證）', role: '作業繳交＋作品集', cost: '免費', note: 'W1 完成註冊與學生驗證；Copilot Free 含終端機版可當備援', main: false },
]

export const SETUP_ACCOUNTS = [
  {
    t: 'GitHub 帳號＋學生驗證',
    d: '到 github.com 註冊 → 再到 github.com/education 用學校信箱＋學生證申請學生驗證（審核數天到數週，W1 就辦）。驗證後 Codespaces 額度升級（每月 180 core-hours）＋整包 Student Pack。',
    url: 'https://github.com/education',
  },
  {
    t: 'Claude 帳號',
    d: '到 claude.ai 註冊。W2–3 再訂閱 Pro（約 US$20/月，一學期訂 3–4 個月即可）；經濟上不方便的同學用免費保底方案，直接找老師。',
    url: 'https://claude.ai',
  },
  {
    t: 'Google 帳號',
    d: 'Gemini 免費層是全班保底（每天 1,000 次請求）——多數人已經有 Google 帳號，確認能登入 gemini.google.com 即可。',
    url: 'https://gemini.google.com',
  },
  {
    t: 'p5.js 網頁編輯器',
    d: '到 editor.p5js.org 用 GitHub 帳號直接登入——草稿存雲端，任何電腦打開都在。',
    url: 'https://editor.p5js.org',
  },
]

export const SETUP_USAGE = [
  { t: '複製課程 template', d: '打開課程 template repo → 按「Use this template」→ 建立你自己的作品集 repo。這一顆 repo 會裝下你整學期的作品和工作流。' },
  { t: '開啟雲端環境', d: '你的 repo → 綠色 Code 按鈕 → Codespaces → Create codespace。幾十秒後瀏覽器出現 VS Code——這就是你的工作室，學校電腦被還原也不影響（它根本不在那台電腦上）。' },
  { t: '登入 Claude Code', d: '下方終端機打 claude → 在登入網址上「連點三下」全選複製 → 新分頁授權 → 把授權碼貼回終端機。只需登入一次，之後環境都記得你。' },
  { t: '做作業、交作業', d: '每次作業開一個資料夾（四件套：碼＋截圖＋反思＋AI 揭露）→ commit → push＝繳交。commit 時間戳就是紀錄。' },
  { t: '三個習慣', d: '固定用 2-core 機型（額度才夠）；做完一定 push（閒置 30 天 codespace 會被回收，repo 裡的東西才是永遠的）；離開前關掉 codespace 省額度。' },
]

export const SUBMIT_STEPS = [
  { t: '開自己的作品集 repo', d: '從課程 template 建立，一人一個、整學期用同一個，每週一個資料夾。' },
  { t: '作業放進當週資料夾', d: '程式碼＋截圖＋README 四件套（作品說明、反思、AI 揭露）。不會終端機沒關係——網頁上傳就好。' },
  { t: 'Deadline 前 push', d: 'commit 時間戳＝繳交紀錄；你的每一步嘗試都是過程的證據。' },
  { t: '作品自動上線', d: 'GitHub Pages 讓每份作業變成一個網址，作業牆連向全班作品。' },
]
