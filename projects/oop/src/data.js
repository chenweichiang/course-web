// 課程內容資料（單一來源：改內容改這裡）
// 對齊備課專案「202608 課程 清大物件導向程式設計」課綱草案 v2
// 文案守則：台灣慣用語；破折號與分號不用；「然而／不過」不起句；長句以逗號串接

// 期末專案：整個專案就是這門課
export const PROJECT = {
  name: '後未來動物園',
  questions: [
    '人類消失之後，地球會長出怎樣的生物？',
    '牠們還會是碳基生物嗎？還是矽基、塑膠代謝、金屬呼吸？',
    '牠們靠什麼存活？能量從哪裡來、怎麼繁衍、怎麼面對這顆被人類改造過的星球？',
  ],
  statement:
    '每位學生培育自己的物種，從世界觀研究、物種設定，一路做到透過程式讓牠活起來，會動、會繁衍、成群、對觀眾有反應，學期末全班的物種聚合成「後未來動物園」公開展演，你以該物種首席研究員的身分導覽，並回答關於牠的任何問題：牠的世界、牠的習性，以及你的每個選擇。',
  motto: '一人一物種，全班一座動物園。完成里程碑就是完成專案，沒有週進度表，只有你的物種一步步活起來。',
}

// 進行方法：研究先行迴圈，每個里程碑都跑同一套
export const METHOD_STEPS = [
  {
    t: '① 深度研究',
    d: '把想做的事交給你的 AI，但別只丟「幫我做 X」一句話，而是給脈絡、要比較、要來源，可以這樣開場：「我的物種是＿＿，我想做＿＿的效果，請比較兩三種做法，各自的優缺點、難度，並附上參考來源。」接著來回追問，追到你能用自己的話轉述為止。',
  },
  {
    t: '② 選型',
    d: '從 AI 給的選項裡挑，原則是開源、穩定、熱門者優先，判斷方式很具體：看它的 GitHub 星數夠不夠多、最近半年是否仍有更新、文件是否完整、教學是否夠多。曇花一現的玩具與黑盒服務，遇到問題時你會求助無門。',
  },
  {
    t: '③ 查證',
    d: 'AI 的整理只是路標，並非事實，關鍵主張，例如「矽基生命理論上可行」或「這個函式庫支援某功能」，都要回到原始出處確認，官方文件、原論文、原始 repo 都算，查證過的事實才能寫進研究報告，並附上點得開的連結。',
  },
  {
    t: '④ 動手與驗證',
    d: '照研究結論動手，但每次只做一步：先要「最小可跑版」，親眼看它跑起來、確認牠的行為符合你的設定，再加下一個功能，不對勁就回頭調整或砍掉重來。',
  },
]

export const METHOD_RHYTHM = [
  '卡關三十分鐘法則：卡超過三十分鐘，就把完整的錯誤訊息與你試過的方法交給 AI，仍然解不開，帶著紀錄來 studio time。',
  '揭露隨手記：每次用 AI 做了什麼，當下就記進交付的 AI 揭露欄，事後補記一定會漏。',
  '物種日誌：每完成一段，用自己的話寫下牠這次多了什麼能力、你為什麼這樣選，這些筆記就是最後導覽的底稿。',
  '每站的交付都是四件套：可執行的程式碼、截圖或影片、一百至兩百字反思（自己寫）、AI 揭露欄。',
]

// 里程碑指南：詳細步驟、完成清單、常見卡點
export const MILESTONE_GUIDE = [
  {
    id: 'M0', name: '裝備', flag: null,
    goal: '把工具全部就位，並且親眼看過 AI 出錯，之後你才有資格說「驗證是我的工作」。',
    steps: [
      '照「準備」小節申請四個帳號，GitHub 學生驗證需要審核天數，最先辦它。',
      '從[課程 template repo](https://github.com/chenweichiang/oop-portfolio-template) 按「Use this template」開出自己的 repo，開啟 Codespace，照 [README 用法說明](https://github.com/chenweichiang/oop-portfolio-template#readme)跑「第一次試跑」，看到會呼吸的圓，環境就緒。',
      '在終端機輸入 claude 登入（[README 的登入 SOP](https://github.com/chenweichiang/oop-portfolio-template#readme) 有完整步驟與排錯）。',
      '請你的 AI 解釋給你聽：「請用比喻解釋 LLM 的 token、預測下一個字、context window，以及為什麼會幻覺，每講完一段就問我問題，確認我懂了。」',
      '進行「讓 AI 出錯」實驗，至少一種：問不存在的論文細節、給模稜兩可的指令，或請它計算長算式再自己驗算，把它一本正經出錯的樣子截圖存下來。',
      '打開 repo 裡的 CLAUDE.md，在「我的工作流」區寫下至少三條自己的規則，開始養成你的工作流。',
    ],
    checks: [
      'Codespace 能開、試跑的動畫會動',
      'claude 能對話',
      '完成「讓 AI 出錯」實驗並留下截圖',
      'CLAUDE.md 有至少三條自己的規則',
      'm0-outfit/ 四件套已 push',
    ],
    pitfalls: '登入卡關就看 [template README](https://github.com/chenweichiang/oop-portfolio-template#readme) 的排錯（在網址上連點三下再複製），出錯實驗不要拿真實個資或危險主題去試，問不存在的論文最安全。',
  },
  {
    id: 'M1', name: '世界', flag: '簽核',
    goal: '透過研究先行迴圈的第一次完整實戰，把「沒有人類之後」從想像變成有根據的世界，你的物種能不能成立，全看這一站打的地基。',
    steps: [
      '選時間尺度：先問你的 AI「人類消失後 50 年、500 年、5 萬年，地球環境各會是什麼樣子？請列出關鍵差異與依據來源」，從中挑出你有感覺的尺度。',
      '深挖你的角落：城市廢墟、深海熱泉、核電廠遺址、塑膠環流帶都是候選，請 AI 比較其中兩三個棲地的環境條件，溫度、化學物質、能量來源、危險各是什麼。',
      '查證至少三個關鍵事實，例如「混凝土多久會崩解」「輻射區的真實生態（車諾比案例）」，回到原始出處，把連結存下來。',
      '用一句話定案：「我的世界是人類消失後＿＿年的＿＿，這裡最大的生存挑戰是＿＿。」',
      '寫成世界觀研究報告（建議結構：時間點與棲地、環境條件表、三個查證過的事實與來源、對物種設計的啟示），放進 m1-world/ 並 push。',
      '把報告交給老師簽核，通過才開始設計物種。',
    ],
    checks: [
      '有明確的時間點與棲地',
      '至少五個點得開的來源連結',
      '三個事實標明查證出處',
      'AI 揭露欄完整',
      '簽核通過',
    ],
    pitfalls: '最常見的死法是直接把 AI 的整理貼上，簽核時老師會跟你聊來源，聊不下去就得重寫。查證並非儀式，而是你對自己世界的主權。',
  },
  {
    id: 'M2', name: '物種', flag: '檢核',
    goal: '在你的世界裡長出站得住腳的物種，並讓牠第一次動起來，親手寫或全用你的工作流都可以，重點是你能說出牠是什麼、為什麼這樣設計。',
    steps: [
      '從世界推物種：問你的 AI「在我的世界（貼上你的一句話定案），生命可能的能量來源有哪些？碳基還撐得住嗎？矽基、塑膠代謝、金屬呼吸的科學根據與困難各是什麼？請附來源。」',
      '查證關鍵設定：你選的代謝方式，至少要找到正經討論過的文獻，天體生物學(Astrobiology)、極端環境微生物都是好關鍵字。',
      '寫物種設定書五欄：型態（長怎樣、多大）、代謝（吃什麼、能量從哪來）、繁衍（怎麼複製自己）、行為（天性、怕什麼、追什麼）、威脅（什麼會殺死牠），每欄都要附一句根據。',
      'p5.js 快速入門：請你的 AI 用十五分鐘帶你認識 setup/draw、座標與圖形，之後你至少要讀得懂牠的身體是怎麼畫出來的，順手看一眼圖鑑的 noise 條目。',
      '讓牠第一次動起來：做最小雛形（會動、有生命感的形體），想親手寫很好，全用工作流也完全可以，重要的是牠長得像你設定書裡的那隻。',
      '把設定書與會動的雛形放進 m2-species/ 並 push，當場檢核。',
    ],
    checks: [
      '設定書五欄齊全、每欄有根據',
      '代謝方式有至少一個查證來源',
      '有會動的雛形，且對得上設定書',
      '能一句話回答「牠憑什麼在你的世界活下來」',
    ],
    pitfalls: '雛形不求像、求活，會呼吸的圓就夠格。先想清楚牠該怎麼動再動手，雛形對不上設定書，發表會就少了故事。',
  },
  {
    id: 'M3', name: '個體', flag: '發表',
    goal: '把設定書翻譯成程式，做出活的、行為對得上設定書的個體，並在物種發表會亮相。',
    steps: [
      '先設計後寫碼：把設定書交給 AI，「請把這個物種設計成 p5.js 的程式，牠有哪些特徵、哪些天性？先給設計清單，先不要寫碼」，透過來回討論把設計吵清楚。',
      '最小可跑版：只做「一隻會動的」，跑通了才加料。',
      '對照關：把跑起來的行為和設定書逐欄對照，牠的天性是否真的來自你的設定，不符的地方回頭調整。',
      '長出天性：從圖鑑的行為類挑一兩個（steering 的追與逃、Braitenberg 的性格、IK 觸手），讓牠的行為對得上設定書。',
      '發表會準備三分鐘：你的世界三十秒、牠是什麼一分鐘、現場跑加導讀你最得意的段落一分半。',
      '交付 m3-creature/ 四件套並 push，參加物種發表會。',
    ],
    checks: [
      '牠至少有三個特徵、三種行為，且每個都對應設定書',
      '說得出每個行為對應設定書的哪一欄',
      '行為用了圖鑑至少一個演算法',
      '發表會完成、拿到同學回饋',
    ],
    pitfalls: '最大的陷阱是一次要太多功能。記住節奏：最小可跑、確認像牠、再加一個，功能塞太多，故事反而說不清楚。',
  },
  {
    id: 'M4', name: '族群', flag: null,
    goal: '一隻不算生態，要讓牠成群、帶變異、會生會死，族群跑起來，你世界的法則才算數。',
    steps: [
      '成群：先十隻再往上加，每隻出生就帶隨機基因，大小、速度、顏色都給變異範圍。',
      '生與死：定義你世界的法則，壽命、能量耗盡、被吃掉、繁殖條件都算，讓族群有出生也有死亡。',
      '演化：子代繼承親代基因並帶一點突變，跑久一點，觀察族群往哪個方向漂。',
      '群體行為：從圖鑑挑一個族群級演算法（boids 群集、生命遊戲的規則改造、掠食者與獵物），讓一群有一群的樣子。',
      '效能檢查：一百隻還流暢嗎？卡頓就先問 AI 怎麼改善，別急著加隻數。',
      '交付 m4-population/ 四件套並 push。',
    ],
    checks: [
      '至少三十隻同時活動且流暢',
      '個體之間看得出變異',
      '有出生也有死亡，世界法則說得出來',
      '群體行為明顯、用了圖鑑至少一個演算法',
    ],
    pitfalls: '參數一調就全滅或爆量？這並非失敗，而是生態學，把崩潰的參數記下來，發表時它會是好故事。效能卡頓先減隻數再改善，別硬撐。',
  },
  {
    id: 'M5', name: '棲地', flag: null,
    goal: '給族群一個世界，接著讓觀眾走進來，透過鏡頭把面前的人變成環境刺激。這個世界已經沒有人類，那觀眾是誰？',
    steps: [
      '造景：從圖鑑的棲地類挑工具（noise 地形與流場、space colonization 藤蔓、WFC 廢墟）做出環境，族群要活在場景裡，而非白底上。',
      '接上感官：到[感測互動](#sensing)小節挑工具，handPose 或 faceMesh 起步最穩，先做最小版，畫面上看到自己的手骨架就算通。',
      '定義觀眾：這個沒有人類的世界，鏡頭前的是誰？時間旅人、外星訪客、最後的倖存者都行，用一句話寫進設定，這決定生物怎麼回應。',
      '刺激與反應：設計兩三條規則（觀眾靠近就散開、揮手就好奇聚過來、沒有人就回到自己的節奏），接進族群的行為。',
      '實地測試：換光線、換距離都試過，鏡頭互動在展場的可靠度就是作品的可靠度。',
      '交付 m5-habitat/ 四件套並 push。',
    ],
    checks: [
      '有環境場景，而非白底',
      '鏡頭互動穩定可靠',
      '至少兩條「觀眾對生物」的反應規則',
      '「觀眾是誰」有一句話敘事',
    ],
    pitfalls: 'ml5 模型第一次載入需要幾秒，記得做載入畫面，別讓觀眾看白屏。鏡頭權限要允許，環境太暗偵測會失準，先在教室實測。',
  },
  {
    id: 'M6', name: '開園', flag: '開園',
    goal: '後未來動物園開園，你的物種入住園區，你以首席研究員的身分導覽，說出牠的世界、牠的一生，以及你的每個選擇。',
    steps: [
      '打磨：沒人操作三十秒也要好看（idle 狀態）、重新整理能重來、當機要能快速復原。',
      '上線：把最終版放進 m6-zoo/，開 GitHub Pages（請 AI 帶你設定），拿到公開網址。',
      '入住動物園：把物種名、一句話介紹、作品網址交給老師，你的物種就會出現在[園區](https://course.interaction.tw/oop/gallery/)。',
      '導覽稿三分鐘：這個世界（哪一年、哪個角落）、這個物種（憑什麼活）、看牠活著（現場互動）、設計導讀（你最想講的那個選擇）。',
      '導覽練習：用三分鐘把牠的一生說給同學或你的 AI 聽，聽的人有疑問，就把答案補進導覽稿。',
      '開園日：展演、導覽、回答任何提問。',
    ],
    checks: [
      '公開網址在別人的電腦也打得開',
      '每個設計選擇都說得出理由',
      '三分鐘導覽至少練過一次',
      '四件套齊全，含完整 AI 揭露',
    ],
    pitfalls: '展場網路難以預料，準備離線備援，也就是本機能跑的版本。導覽最動人的往往不是功能清單，而是牠為什麼活成這樣。',
  },
]

// 演算法圖鑑（起手式可一鍵複製；主參照 Nature of Code 免費線上版）
export const ALGO_GROUPS = [
  {
    cat: '形態，牠長什麼樣子', hint: 'M2 物種 · M3 個體',
    items: [
      { name: 'Perlin / Simplex Noise', zh: '雜訊', what: '自然界的連續隨機，可以理解成不會跳動的亂數', use: '身體輪廓的呼吸感、觸手擺動、移動的自然遊走，幾乎所有看起來活的東西底層都有它', lv: 1, prompt: '用 p5.js 的 noise() 畫一隻輪廓會緩慢起伏、像在呼吸的不定形生物，只用線條，並解釋 noise 和 random 差在哪。', ref: 'Nature of Code Ch.0' },
      { name: 'Reaction-Diffusion', zh: '反應擴散（圖靈斑紋）', what: '兩種化學物質互相反應與擴散，生物斑紋因此長出來', use: '豹紋、斑馬紋、珊瑚腦紋，皮膚花紋的生成過程本身就是演出', lv: 3, prompt: '用 p5.js 實作 Gray-Scott reaction-diffusion，低解析度即可，讓我調 feed/kill 參數看斑紋變化，並說明哪些參數組合會出現豹斑、哪些會出現條紋。', ref: 'Karl Sims 教學頁' },
      { name: 'L-System', zh: '林登麥爾系統', what: '透過改寫規則長出枝狀結構，可以理解成植物的生長文法', use: '角、骨架、觸鬚、珊瑚，每一代帶變異，同樣的基因便長出不同個體', lv: 2, prompt: '用 p5.js 做 L-system 畫蕨類，接著把規則改成每一代帶一點隨機變異，我要看同樣的基因長出不同個體。', ref: 'Nature of Code Ch.8' },
      { name: 'Metaballs', zh: '融球', what: '會互相融合的圓，軟體與液態的邊界', use: '阿米巴、史萊姆、細胞分裂的黏連感', lv: 2, prompt: '用 p5.js 畫 metaballs：三顆會游動的融球黏成軟體生物，靠近會融合、遠離會分開，先給最簡單的閾值版。', ref: 'Coding Train "Metaballs"' },
      { name: 'Voronoi', zh: '沃羅諾伊圖', what: '空間按「離誰最近」切分，細胞組織的幾何', use: '龜甲、翅膀翅脈、細胞壁質感，也適合棲地的乾裂地面', lv: 2, prompt: '用 p5.js 畫 Voronoi 細胞，種子點用 noise 緩慢漂移，讓整片組織看起來在蠕動。', ref: 'd3-delaunay（開源標準庫）' },
      { name: 'DLA', zh: '擴散限制聚集', what: '隨機遊走的粒子碰到就黏住，結晶與珊瑚的長法', use: '矽基與礦物系生物的身體生成，廢墟上長出的結晶群落', lv: 2, prompt: '用 p5.js 做 DLA：粒子從邊緣隨機遊走、碰到中心種子就固定，長成珊瑚狀，並按年齡染色，讓人看得出生長順序。', ref: 'Paul Bourke DLA 頁' },
    ],
  },
  {
    cat: '行為，牠怎麼動、怎麼想', hint: 'M3 個體',
    items: [
      { name: 'Random Walk', zh: '隨機漫步', what: '一步一步的隨機決定，最簡單的生命痕跡', use: '覓食軌跡、細菌游動，也就是牠閒晃時的樣子', lv: 1, prompt: '用 p5.js 做三種 random walk 並排比較：純隨機、帶偏向的、用 noise 的，並說明哪一種看起來最像活的、為什麼。', ref: 'Nature of Code Ch.0' },
      { name: 'Steering Behaviors', zh: '轉向行為', what: '追、逃、抵達、徘徊，生物移動的意圖', use: '對食物、威脅、同類的反應方式，可以理解成牠的性格', lv: 2, prompt: '用 p5.js 向量做 seek 和 flee，組合成好奇但膽小的生物：會靠近滑鼠，太近就逃，並解釋每個力怎麼疊加。', ref: 'Nature of Code Ch.5' },
      { name: 'Braitenberg Vehicles', zh: '布萊滕貝格車', what: '兩個感測器直接接兩個馬達，極簡的大腦', use: '沒有 AI 卻像有情緒，怕光、趨光、攻擊性都做得出來', lv: 2, prompt: '用 p5.js 做 Braitenberg vehicle：滑鼠是光源，做出恐懼和攻擊兩種接線，並解釋為什麼交叉接線會改變性格。', ref: '《Vehicles》原書概念' },
      { name: 'Spring-Mass', zh: '彈簧質點（軟體）', what: '質點加彈簧，會晃、會回彈的軟身體', use: '水母搏動、果凍生物、被觀眾戳了會晃的身體', lv: 2, prompt: '用 p5.js 手寫最簡彈簧質點鏈做一條會擺動的觸手，並比較什麼情況該改用 matter.js 這類物理引擎。', ref: 'Nature of Code Ch.3/6' },
      { name: 'Inverse Kinematics', zh: '反向運動學', what: '多節肢體伸向目標的解算', use: '追著目標的觸手、蛇、多節腿，接 ml5 手部位置最適合', lv: 2, prompt: '用 p5.js 實作 FABRIK：十二節的觸手追著滑鼠，並加上 noise 讓它沒事做的時候也在微微捲動。', ref: 'Coding Train IK 系列' },
    ],
  },
  {
    cat: '族群，一群牠會發生什麼', hint: 'M4 族群',
    items: [
      { name: "Conway's Game of Life", zh: '康威生命遊戲', what: '四條生死規則湧現出不可預測的複雜，生命的最小模型', use: '微生物型族群本體，也可以把規則改成你世界的生存法則，例如塑膠濃度決定生死', lv: 1, prompt: '用 p5.js 做康威生命遊戲，做成可即時切換規則的版本：誕生條件從 3 改成 2 會怎樣？我要找出我的世界的物理法則。', ref: 'Nature of Code Ch.7' },
      { name: 'Boids / Flocking', zh: '群集', what: '分離、對齊、聚合三條規則就成了鳥群魚群', use: '課程頁背景就是它，你的族群怎麼一起活著', lv: 2, prompt: '用 p5.js 做 boids，並加上第四條規則「躲避滑鼠」，接著說明三個權重怎麼調會從魚群變成蚊群。', ref: 'Nature of Code Ch.5' },
      { name: 'Physarum', zh: '黏菌模擬', what: '單細胞的覓食網絡，沒有大腦卻會解迷宮', use: '菌絲型物種，廢墟之間長出的交通系統', lv: 3, prompt: '用 p5.js 做簡化版 physarum：agents 留下費洛蒙、轉向費洛蒙濃的方向，先做五百隻低解析度版，並解釋為什麼會長出網絡。', ref: 'Sage Jenson physarum 頁' },
      { name: 'Predator–Prey', zh: '掠食者與獵物', what: '吃與被吃的數量動態，生態學基本模型', use: '你的物種吃什麼、被什麼吃，也可以試試把同學的物種放進同一棲地', lv: 2, prompt: '用 p5.js 做 agent 版掠食者與獵物：草、兔、狐三層，餓了會死，跑五分鐘觀察數量怎麼震盪，並找出讓生態崩潰的參數。', ref: 'Nature of Code 生態系專案' },
      { name: 'Genetic Algorithm', zh: '遺傳演算法', what: '突變、選擇、繁殖，可以理解成演化本身', use: 'M4 的演化玩真的，族群在你的法則下自己變形', lv: 3, prompt: '用 p5.js 做遺傳演算法：基因是體型、速度、顏色，適應度是在我的規則下活多久，跑五十代，把每代最強的排成演化史。', ref: 'Nature of Code Ch.9' },
    ],
  },
  {
    cat: '棲地，牠的世界長什麼樣', hint: 'M5 棲地',
    items: [
      { name: 'Flow Field', zh: 'Noise 地形與流場', what: '透過雜訊生成地形或風場，環境的呼吸', use: '起伏地景、洋流、輻射塵飄移，族群順著環境流動', lv: 2, prompt: '用 p5.js 做 noise flow field，粒子順著場漂流，接著把場當成輻射濃度，讓我的生物只在低輻射區聚集。', ref: 'Nature of Code Ch.5' },
      { name: 'Space Colonization', zh: '空間拓殖', what: '枝條朝吸引點生長，葉脈與根系的算法', use: '爬滿廢墟的藤蔓、血管網、根系', lv: 3, prompt: '用 p5.js 做 space colonization 長一棵樹，接著把吸引點改成廢墟照片的邊緣，讓藤蔓爬滿那棟建築。', ref: 'Coding Train 有完整實作' },
      { name: 'Wave Function Collapse', zh: '波函數塌縮', what: '從局部規則拼出全局一致的地圖', use: '無限延伸的廢墟園區，每次重整都不同的棲地', lv: 3, prompt: '先解釋 WFC 的直覺，再用 p5.js 做最簡 tile 版：五種廢墟 tile，生成每次都不同但接縫合理的地圖。', ref: 'mxgmn/WaveFunctionCollapse' },
    ],
  },
]

// 感測互動：臉、手、身體如何變成棲地的輸入（M5）
export const SENSING = {
  intro:
    '鏡頭是棲地的感官，觀眾的臉、手、身體透過它變成環境刺激。以下工具全部在瀏覽器本機推論，影像不會上傳到任何伺服器，這點在展場也值得說給觀眾聽。',
  method: [
    { t: '① 取點', d: '感測模型給你的是關鍵點(landmark)，臉 478 點、手 21 點、身體 17 點，先把點畫出來，看懂資料長什麼樣。' },
    { t: '② 算訊號', d: '把點變成數字：兩點距離（嘴巴開合、手指捏合）、點的速度（揮手快慢）、骨架大小（人靠多近）、角度（頭轉向哪），這些數字才是生物能理解的刺激。' },
    { t: '③ 映射', d: '設計訊號與行為的對應：靠近就散開、揮手就聚過來、張嘴就餵食，一條訊號接一條行為，寫成你世界的規則。' },
    { t: '④ 平滑', d: '原始訊號會抖，用 lerp 濾波讓數值滑順，再用閾值加遲滯(hysteresis)避免狀態狂切，生物的反應才顯得從容。' },
  ],
  venue: [
    '載入畫面：ml5 模型第一次載入需要幾秒，空白畫面會讓觀眾以為作品壞了。',
    '光線實測：展場的光跟教室不同，太暗或逆光偵測都會失準，佈展時先實測。',
    '多人情境：展場常常同時很多人入鏡，先決定只追蹤最近的人，或讓每個人都算數。',
    '隱私聲明：影像在瀏覽器本機處理、不上傳，在展場立牌寫清楚，觀眾才安心。',
    '備援方案：鏡頭臨時罷工時，保留滑鼠或鍵盤也能觸發的版本，展演不中斷。',
  ],
  tools: [
    { name: 'ml5.js faceMesh', zh: '臉部網格', what: '478 個臉部關鍵點，眉眼口鼻全都有座標', use: '嘴巴開合當餵食、眨眼觸發事件、頭轉向控制視線，臉的大小可以理解成距離', lv: 2, prompt: '用 ml5.js 的 faceMesh 在 p5.js 顯示我的臉部關鍵點，接著計算嘴巴開合程度，變成 0 到 1 的訊號印在畫面上。', ref: 'ml5js.org（官方文件）' },
    { name: 'ml5.js handPose', zh: '手部骨架', what: '每隻手 21 個關鍵點，指尖、指節、手腕全都可讀', use: '捏合抓取、揮手驚擾、指尖軌跡畫線、手掌張合餵食', lv: 2, prompt: '用 ml5.js 的 handPose 在 p5.js 畫出我的手部骨架，接著計算拇指尖與食指尖的距離，做成捏合訊號。', ref: 'ml5js.org（官方文件）' },
    { name: 'MediaPipe Gesture Recognizer', zh: '手勢分類', what: '內建八種手勢直接辨識，握拳、張掌、比讚、比 V 都免訓練', use: '特定手勢觸發特定事件，例如張掌餵食、握拳驚嚇、比讚繁殖', lv: 2, prompt: '用 MediaPipe 的 Gesture Recognizer（JavaScript 版）辨識我的手勢，並在 p5.js 印出目前手勢名稱與信心值。', ref: 'MediaPipe（Google 開源）' },
    { name: 'ml5.js bodyPose', zh: '全身骨架', what: 'MoveNet 模型，17 個全身關鍵點，支援多人', use: '走近與離開（骨架大小）、揮臂、下蹲，多位觀眾同時互動', lv: 2, prompt: '用 ml5.js 的 bodyPose 在 p5.js 畫出全身骨架，接著用肩寬估計人離鏡頭多近，做成靠近訊號。', ref: 'ml5js.org（官方文件）' },
    { name: 'ml5.js bodySegmentation', zh: '人形剪影', what: '把人從背景分離出來，得到即時的輪廓遮罩', use: '觀眾的剪影直接成為棲地地形，生物沿著輪廓聚集或迴避', lv: 2, prompt: '用 ml5.js 的 bodySegmentation 取得我的人形遮罩，讓 p5.js 的粒子只在剪影邊緣聚集。', ref: 'ml5js.org（官方文件）' },
    { name: 'Frame Differencing', zh: '影格差（無模型）', what: '比較前後兩張影格的像素差，哪裡在動一目瞭然', use: '零載入、零模型、最穩定的動作偵測，生物避開有動靜的區域，經典創作手法', lv: 1, prompt: '用 p5.js 直接讀取攝影機畫面，比較前後影格的像素差，把運動量畫成格狀熱區，不要用任何機器學習模型。', ref: 'Golan Levin〈Computer Vision for Artists〉' },
    { name: 'Teachable Machine', zh: '自訓分類器', what: 'Google 的免費工具，拖拉樣本就能訓練自己的影像、姿勢、聲音分類器', use: '想辨識特定教具、姿勢或自訂手勢時，自己訓練，匯出後接 ml5 使用', lv: 2, prompt: '我用 Teachable Machine 訓練了姿勢分類模型（貼上匯出網址），請用 ml5.js 載入它，並在 p5.js 依分類結果切換生物的行為。', ref: 'teachablemachine.withgoogle.com' },
  ],
}


// 案例庫：期末專案的參照系（取得管道 2026-08 全查證）
export const CASE_GROUPS = [
  {
    cat: '沒有人類之後', hint: 'M1 世界',
    items: [
      { name: '人類滅絕後', by: 'Dougal Dixon，1981', type: '書', what: '人類消失後五千萬年的動物誌，本專案題目的開山之作，整本書就是一座後未來動物園', get: '繁中版《人類滅絕後：未來地球的假想動物圖鑑》，台灣東販，圖書館與二手書可得' },
      { name: '沒有我們的世界', by: 'Alan Weisman，2007', type: '書', what: '人類消失後城市與生態如何演變的科普經典，世界觀研究的底本', get: '繁中版，木馬文化，新書庫存有限，建議二手或圖書館' },
      { name: 'Life After People', by: 'History Channel', type: '影集', what: '人類消失後 1 天到 1 萬年的推演，把時間尺度視覺化', get: 'History 官方 YouTube 播放清單免費看', url: 'https://www.youtube.com/playlist?list=PLob1mZcVWOagLL-shJOp-d5_qJOG2MvCJ' },
      { name: 'The Future Is Wild', by: '2002 紀錄片', type: '影集', what: '五百萬年到兩億年後的推測演化，科學顧問陣容完整', get: '官方 YouTube 頻道全 13 集免費', url: 'https://www.youtube.com/@OfficialTheFutureIsWild' },
    ],
  },
  {
    cat: '想像另一種生命', hint: 'M2 物種',
    items: [
      { name: 'All Tomorrows', by: 'C.M. Kosemen，2006', type: '書', what: '十億年尺度的人類後裔演化史，邪典級推測生物學', get: '無繁中版，2025 年底出正式紙本後作者官網已不再提供免費 PDF，引用網路流傳版本時要交代這個轉折' },
      { name: 'Expedition', by: 'Wayne Barlowe，1990', type: '書', what: '外星星球 Darwin IV 的生態調查圖鑑，畫家親手建構整套食物鏈', get: '英文原版絕版，合法免費管道為 Internet Archive 借閱', url: 'https://archive.org/details/expeditionbeinga0000barl' },
      { name: 'Scavengers Reign', by: '2023 動畫影集', type: '影集', what: '異星生態動畫，近年最完整的「生態先於劇情」示範', get: '原 HBO Max 獨家，在台灣請於 Max App 內搜尋確認' },
      { name: '風之谷', by: '宮崎駿', type: '動畫與漫畫', what: '腐海生態系，文明毀滅後的菌類森林與王蟲，最容易進入的參照', get: '動畫與漫畫在台灣皆易取得' },
    ],
  },
  {
    cat: '另一種感官與心智', hint: 'M2 設定 · M5 觀眾',
    items: [
      { name: '章魚，心智，演化', by: 'Peter Godfrey-Smith', type: '書', what: '從章魚追問心智的另一種可能，設計非人心智的思想資源', get: '繁中版，紅樹林' },
      { name: '真菌微宇宙', by: 'Merlin Sheldrake', type: '書', what: '真菌網絡如何連結萬物，菌絲型物種的科學底本', get: '繁中版，果力文化，2021 與 2025 兩版副標不同，是同一本書' },
      { name: '五感之外的世界', by: 'Ed Yong，2022', type: '書', what: '動物的環境界(Umwelt)，每種生物感知到的世界都不同，直接回答「你的生物怎麼感覺觀眾」', get: '繁中版，臉譜' },
    ],
  },
  {
    cat: '人工生命藝術', hint: 'M3 到 M6 的同行前輩',
    items: [
      { name: 'Evolved Virtual Creatures', by: 'Karl Sims，1994', type: '作品', what: '演化出泳姿與步態的虛擬生物，人工生命藝術的原點，也是遺傳演算法的祖師爺', get: '官方頁與原始影片', url: 'https://www.karlsims.com/evolved-virtual-creatures.html' },
      { name: 'A-Volve', by: 'Sommerer & Mignonneau，1994', type: '作品', what: '觀眾畫的生物在水池裡游動、覓食、交配，互動人工生命的里程碑，概念與本專案幾乎同構', get: '官方頁已遷至林茲藝術大學', url: 'https://interface.ufg.ac.at/christa-laurent/A-Volve.html' },
      { name: 'Strandbeest', by: 'Theo Jansen', type: '作品', what: '風力驅動的海灘巨獸，用物理材料做的新物種，造物不限於螢幕', get: '官方網站', url: 'https://www.strandbeest.com' },
      { name: 'Neural Zoo', by: 'Sofia Crespo', type: '作品', what: '用神經網路生成的不存在生物，AI 時代的自然史圖鑑', get: '官方網站', url: 'https://sofiacrespo.com/neural-zoo' },
      { name: 'Emissaries', by: 'Ian Cheng', type: '作品', what: '自己會一直演下去的活體模擬，作品是生態系而非畫面', get: 'MoMA PS1 展覽頁', url: 'https://www.moma.org/calendar/exhibitions/3656' },
      { name: 'fishdraw', by: 'Lingdong Huang', type: '開源', what: '程序生成的魚類素描，開源可讀，示範一套規則長出一族生物', get: 'GitHub，MIT 授權', url: 'https://github.com/LingDong-/fishdraw' },
      { name: 'Graffiti Nature', by: 'teamLab', type: '作品', what: '觀眾畫的動植物進入共同生態系，彼此捕食與繁衍，可以理解成全班一座動物園的實體版', get: '官方作品頁，京都與新加坡常設展出', url: 'https://www.team-lab.art/w/graffitinature/' },
    ],
  },
  {
    cat: '遊戲裡的生態', hint: '把生態當主角的遊戲',
    items: [
      { name: 'Rain World', by: 'Videocult', type: '遊戲', what: '整個世界是真的生態系，每隻生物有自己的生存目標，玩家只是食物鏈一環', get: 'Steam 上架中', url: 'https://store.steampowered.com/app/312520' },
      { name: 'Spore', by: 'Will Wright，2008', type: '遊戲', what: '生物創造器加演化階段，把造物做成遊戲的先驅', get: 'Steam 上架中', url: 'https://store.steampowered.com/app/17390' },
      { name: 'Everything', by: 'David OReilly', type: '遊戲', what: '你可以成為任何東西，從細菌到星系，尺度與視角的哲學遊戲', get: 'Steam 上架中', url: 'https://store.steampowered.com/app/582270' },
    ],
  },
]

export const CASE_NOTE =
  '使用建議：M1 開工前先看 Life After People 任一集加《沒有我們的世界》任一章，時間尺度的直覺就有了。M2 卡關時翻《人類滅絕後》或《All Tomorrows》，看別人怎麼用規則推物種，再回來推自己的。M5 設計互動前讀《五感之外的世界》序章，先想牠的環境界(Umwelt)，再想牠怎麼感覺人。案例是參照系而非模板，看完要回答的問題始終是：在你的世界，牠憑什麼活下來。'

export const AI_RULES = [
  { t: '研究先行', d: '動手做之前，先讓你的 AI 進行深度研究：比較做法與工具、開源穩定熱門優先，並查證來源，合成答案只當路標，關鍵事實回原始出處確認。' },
  { t: '驗證是你的工作', d: 'AI 是機率性的，會一本正經地錯，它給的每段程式碼、每個事實，跑過、查過才算數。' },
  { t: '完整揭露', d: '每份交付註明工具、日期、prompt 摘要、採用範圍，沒用到就寫「未使用」。本專案獎勵透明，不獎勵僥倖，誠實揭露永遠不是問題。' },
  { t: '把牠說完整', d: '最後你要能完整說出你的物種：牠活在怎樣的世界、為什麼長成這樣、你做了哪些選擇，以及牠最後呈現出什麼樣子。這個專案看重的是你怎麼思考牠的生命、做得多完整、呈現出什麼。' },
]

export const TOOLS = [
  { name: 'p5.js 網頁編輯器', role: '創作環境，全程的畫布與閱讀對象', cost: '免費', note: 'editor.p5js.org，瀏覽器打開就能寫，全程用它', main: true },
  { name: 'Claude Pro（自行訂閱）', role: '你的工作流主力', cost: '約 US$20/月', note: 'M0 建工作流就要用，建議開學前兩三週內完成訂閱，學期訂三四個月即可', main: true },
  { name: 'Gemini 免費層', role: '免費保底', cost: '免費', note: '個人 Google 帳號即可使用，額度足以完成所有專案要求', main: false },
  { name: 'GitHub（Education 驗證）', role: '交付與作品集', cost: '免費', note: '開學第一週完成註冊與學生驗證，Copilot Free 含終端機版可當備援', main: false },
]

export const SETUP_ACCOUNTS = [
  {
    t: 'GitHub 帳號與學生驗證',
    d: '到 github.com 註冊，再到 github.com/education 用學校信箱與學生證申請學生驗證，審核需要數天到數週，開學第一週就辦。驗證後 Codespaces 額度升級為每月 180 core-hours，並附整包 Student Pack。',
    url: 'https://github.com/education',
  },
  {
    t: 'Claude 帳號',
    d: '到 claude.ai 註冊，接著訂閱 Pro，約 US$20/月，學期訂三四個月即可，經濟上不方便的同學改用免費保底方案，直接找老師。',
    url: 'https://claude.ai',
  },
  {
    t: 'Google 帳號',
    d: 'Gemini 免費層是全班保底，每天 1,000 次請求，多數人已經有 Google 帳號，確認能登入 gemini.google.com 即可。',
    url: 'https://gemini.google.com',
  },
  {
    t: 'p5.js 網頁編輯器',
    d: '到 editor.p5js.org 用 GitHub 帳號直接登入，草稿存在雲端，任何電腦打開都在。',
    url: 'https://editor.p5js.org',
  },
]

export const SETUP_USAGE = [
  { t: '複製課程 template', d: '打開課程 template repo，按「Use this template」建立自己的作品集 repo，它會裝下你整學期的物種與工作流。' },
  { t: '開啟雲端環境', d: '進入你的 repo，按綠色 Code 按鈕，選 Codespaces 並建立，幾十秒後瀏覽器出現 VS Code，這就是你的工作室，學校電腦被還原也不受影響，因為它根本不在那台電腦上。' },
  { t: '登入 Claude Code', d: '在下方終端機輸入 claude，在登入網址上連點三下全選複製，開新分頁授權，再把授權碼貼回終端機，登入一次之後環境都記得你。' },
  { t: '完成交付', d: '每個里程碑開一個資料夾放四件套（程式碼、影像、反思、AI 揭露），commit 之後 push 就算交付，commit 的時間戳就是紀錄。' },
  { t: '三個習慣', d: '固定用 2-core 機型額度才夠，做完一定 push，因為閒置三十天 codespace 會被回收，repo 裡的東西才是永遠的，離開前記得關掉 codespace 節省額度。' },
]

export const SUBMIT_STEPS = [
  { t: '開自己的作品集 repo', d: '從課程 template 建立，一人一個、整學期用同一個，可以理解成你物種的培育艙。' },
  { t: '交付放進里程碑資料夾', d: '每個里程碑一個資料夾（m1-world、m2-species），內含四件套：程式碼、截圖或影片、反思、AI 揭露。不會用終端機也沒關係，網頁上傳就好。' },
  { t: 'Deadline 前 push', d: 'commit 的時間戳就是交付紀錄，你的每一步嘗試都是過程的證據。' },
  { t: '作品自動上線', d: 'GitHub Pages 讓每個交付都有自己的網址，動物園的每座棲地都連向你的活體展示。' },
]
