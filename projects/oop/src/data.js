// 課程內容資料（單一來源：改課程內容改這裡）
// 內容對齊備課專案「202608 課程 清大物件導向程式設計」課綱草案 v1

// 期末專案：整門課＝完成它
export const PROJECT = {
  name: '後未來動物園',
  questions: [
    '人類消失之後，地球會長出怎樣的生物？',
    '牠們還會是碳基生物嗎？——矽基？塑膠代謝？金屬呼吸？',
    '牠們靠什麼存活？能量從哪來、怎麼繁衍、怎麼面對這顆被人類改造過的星球？',
  ],
  statement:
    '每位學生培育一個物種：從世界觀研究、物種設定，到用程式讓牠活起來——會動、會繁衍、成群、對觀眾有反應。學期末，全班的物種聚合成一座「後未來動物園」公開展演；你以該物種首席研究員的身分導覽，並回答關於牠的任何問題——包括任何一段碼。',
  mapping: [
    ['class', '物種'],
    ['屬性', '基因'],
    ['方法', '行為'],
    ['繼承', '演化'],
    ['多型', '變異'],
    ['flocking', '群體'],
    ['ml5', '觀眾'],
  ],
  motto: '一人一物種，全班一座動物園。完成里程碑＝完成課程：沒有週進度表，只有你的物種一步步活起來。',
}

export const MILESTONES = [
  { id: 'M0', name: '裝備', q: '先懂 AI，建好自己的工作流', learn: 'AI 的問題（幻覺／同質化／著作權）與運作原理（token、機率性）；prompt 基本功；帳號與 Codespace 就位', deliver: 'AI 出錯實驗紀錄＋工作流 CLAUDE.md 初版' },
  { id: 'M1', name: '世界', q: '沒有人類之後的地球長什麼樣？', learn: '研究先行工作流第一次完整實戰：深度研究→開源穩定熱門優先→來源查證', deliver: '世界觀研究報告——你的生物要住在哪個角落', flag: '簽核' },
  { id: 'M2', name: '物種', q: '牠還是碳基生物嗎？憑什麼活下來？', learn: '物種設定方法（科幻要有科學根據）；p5.js 一日通：setup/draw、圖形、函式觀念', deliver: '物種設定書＋唯一手 key：親手讓牠第一次動起來（課堂內、不用 AI）', flag: '檢核' },
  { id: 'M3', name: '個體', q: 'class 就是物種：屬性＝基因、方法＝行為', learn: 'class／constructor；讀懂 AI 給的碼；用工作流把個體做到會動會反應', deliver: '活的個體＋物種發表會（期中 critique）', flag: '發表' },
  { id: 'M4', name: '族群', q: '一隻到一群：族群才是生態', learn: '繼承＝演化、多型＝變異、flocking＝群體行為；物件陣列與生滅', deliver: '族群生態——成群、帶變異、有群體行為' },
  { id: 'M5', name: '棲地', q: '這世界沒有人類——那觀眾是誰？', learn: 'ml5.js 手勢／姿態／臉部偵測：觀眾的靠近與注視成為環境刺激', deliver: '可互動棲地——觀眾動作改變族群行為' },
  { id: 'M6', name: '開園', q: '後未來動物園，正式開園', learn: '展演與導覽；答辯＝以首席研究員身分回答任何問題——包括任何一段碼', deliver: '公開展演＋口頭答辯（講不出來的段落不計分）', flag: '開園' },
]

export const ASSESSMENT = [
  { item: '世界觀研究報告（M1 簽核）', pct: 10, note: '深度、科學根據、來源查證紀錄' },
  { item: '物種設定書（M2）', pct: 10, note: '型態／代謝／繁衍／生存策略＋根據' },
  { item: '唯一手 key 原型（M2 當場檢核）', pct: 10, note: '課堂內親手完成；完成度三級制' },
  { item: '物種發表會（M3 期中 critique）', pct: 15, note: '現場跑作品＋口頭說明基因與天性的設計' },
  { item: '族群＋棲地交付（M4–M5）', pct: 15, note: '文件化四件套：碼＋影像＋反思＋AI 揭露' },
  { item: '開園展演＋口頭答辯（M6）', pct: 30, note: '作品 20%＋答辯 10%' },
  { item: '出席與 critique 參與', pct: 10, note: '給同學物種的回饋品質' },
]

export const AI_RULES = [
  { t: '研究先行', d: '動手做之前，先讓你的 AI 做深度研究：比較做法與工具、開源穩定熱門優先，並查證來源——AI 的合成答案只當路標，關鍵事實回原始出處確認。' },
  { t: '驗證是你的工作', d: 'AI 是機率性的，會一本正經地錯。它給的每段碼、每個事實，跑過、查過才算數。' },
  { t: '完整揭露', d: '每份作業註明工具／日期／prompt 摘要／採用範圍；沒用到就寫「未使用」。未揭露而查獲＝該次作業零分；誠實揭露永遠不扣分。' },
  { t: '答辯定生死', d: '你要能解釋物種身上任何一段碼與每個決定；講不出來的段落不計分。' },
  { t: '唯一手寫（M2）', d: '那一堂課不用 AI：親手接生你的生物一次，你才知道 AI 替你做了什麼。' },
]

export const TOOLS = [
  { name: 'p5.js 網頁編輯器', role: '創作環境（M2 手寫＋全程閱讀對象）', cost: '免費', note: 'editor.p5js.org——瀏覽器開了就寫，全課程用它', main: true },
  { name: 'Claude Pro（自行訂閱）', role: '你的工作流主力', cost: '約 US$20/月', note: 'M0 建工作流就要用——開學前兩三週內完成訂閱，一學期約 3–4 個月', main: true },
  { name: 'Gemini 免費層', role: '免費保底', cost: '免費', note: '個人 Google 帳號即可，額度足以完成所有課程要求', main: false },
  { name: 'GitHub（Education 驗證）', role: '作業繳交＋作品集', cost: '免費', note: 'W1 完成註冊與學生驗證；Copilot Free 含終端機版可當備援', main: false },
]

export const SETUP_ACCOUNTS = [
  {
    t: 'GitHub 帳號＋學生驗證',
    d: '到 github.com 註冊 → 再到 github.com/education 用學校信箱＋學生證申請學生驗證（審核數天到數週，開學第一週就辦）。驗證後 Codespaces 額度升級（每月 180 core-hours）＋整包 Student Pack。',
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
  { t: '開自己的作品集 repo', d: '從課程 template 建立，一人一個、整學期用同一個——這裡就是你物種的培育艙。' },
  { t: '交付放進里程碑資料夾', d: '每個里程碑一個資料夾（m1-world、m2-species…），內含四件套：碼＋影像＋反思＋AI 揭露。不會終端機沒關係——網頁上傳就好。' },
  { t: 'Deadline 前 push', d: 'commit 時間戳＝繳交紀錄；你的每一步嘗試都是過程的證據。' },
  { t: '作品自動上線', d: 'GitHub Pages 讓每個交付變成一個網址——動物園的每座棲地都連向你的活體展示。' },
]
