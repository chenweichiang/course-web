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
  motto: '一人一物種，全班一座動物園。完成里程碑就是完成專案，週進度表讓你知道每次上課做什麼，你的物種就照著這個節奏一步步活起來。',
}

// 想你的生物：把物種想成住在自己的養殖箱（案例事實 2026-09-17 查證）
export const CREATURE = {
  intro:
    '把你的生物想成住在一個養殖箱裡，箱子裡的條件由你決定，但每一條都要有根據。順序很重要，年代決定環境，環境決定牠怎麼生存、住在哪、怎麼繁殖，先畫出一隻很酷的生物再回頭硬湊牠住哪裡，是最常見的死法。五個問題的答案先寫進 M1 的研究報告，到 M2 再展開成物種設定書。',
  box: [
    {
      k: '年代',
      q: ['人類消失後多久？幾十年、幾萬年，還是幾千萬年', '地形與氣候變了多少', '人造物還剩下什麼，塑膠、混凝土、金屬各自變成什麼樣子'],
      ask: '人類消失後 50 年、5 萬年、5,000 萬年，地球的氣候、地形與人造物各會變成什麼樣子？請列出關鍵差異，每一點附上可以點開的來源。',
    },
    {
      k: '環境',
      q: ['溫度範圍多大、有沒有光', '水、空氣、化學物質的狀態', '最大的危險是什麼'],
      ask: '我的世界是人類消失後＿＿年的＿＿，請列出這裡的溫度範圍、光照、水與化學物質、殘留的人造物與主要危險，每一項附上來源。',
    },
    {
      k: '生存',
      q: ['能量從哪裡來', '吃什麼、被誰吃', '最怕什麼，什麼會殺死牠'],
      ask: '在這樣的環境，生物可能的能量來源有哪些？請舉地球上真實存在、生活在類似極端環境的生物當例子，說明牠們怎麼活下來，並附來源。',
    },
    {
      k: '棲息',
      q: ['住在哪一層，地底、水裡、廢墟裡還是空中', '群居還是獨居', '白天晚上各在做什麼、會不會遷移'],
      ask: '在這樣的環境，生物住在哪裡最安全？群居和獨居各有什麼好處與代價？請舉真實動物的例子並附來源。',
    },
    {
      k: '繁殖',
      q: ['怎麼生下一代，分裂、產卵、還是別的方式', '多久一代、一次生幾隻', '下一代像誰，會不會變異'],
      ask: '在資源＿＿的環境，生物用什麼方式繁殖比較划算？一次生很多還是生少但照顧久？請舉真實生物的例子說明，並附來源。',
    },
  ],
  exchange: {
    intro:
      '一人一物種，全班一座動物園，動物園裡的生物有沒有關係，可以由全班一起決定。下面這些留給全班討論後再決定，想清楚了，M4 的族群跟 M6 的開園就能真的接在一起。',
    questions: [
      '大家是不是活在同一個年代、同一個世界？不一樣的話，牠們要在哪裡相遇',
      '牠們能交換什麼，訊號（顏色、聲音、動作）、食物、地盤，還是基因',
      '差不多的物種能不能生出下一代？下一代長什麼樣，還能不能再生',
      '交流要有共同的語言，全班要先約好訊號與基因用什麼格式記錄',
    ],
    rules: [
      { t: '相遇的地方', d: '每個人的年代與環境不同，要不要設一個交界區讓牠們相遇' },
      { t: '交換的東西', d: '訊號、食物、地盤，還是基因，交換之後雙方各自會改變什麼' },
      { t: '基因的寫法', d: '要混種，基因就要用同一種寫法，例如幾個數字分別代表大小、速度、顏色' },
      { t: '相容的規則', d: '怎樣算差不多的物種，不相容的時候會發生什麼事' },
      { t: '下一代歸誰', d: '混出來的後代住在誰的養殖箱，由誰記錄牠的一生' },
    ],
    ask: '我的生物是＿＿（貼上設定），同學的生物是＿＿，如果牠們相遇，可能交換什麼？能不能混種？請用真實生物的例子說明相容的條件與可能的結果，並附來源。',
  },
  caseGroups: [
    {
      cat: '環境決定生存',
      items: [
        {
          name: '深海熱泉的生物群聚',
          img: 'vent-community.jpg',
          imgCredit: 'WHOI（攝影 John M. Edmond），1977 年加拉巴哥裂谷',
          video: 'https://www.youtube.com/watch?v=rFHtVRKoaUM',
          fact: '1977 年研究團隊潛到加拉巴哥裂谷 2,500 公尺深處，在熱泉口發現大片生物，牠們不靠光合作用，靠硫氧化細菌的化學合成取得能量。',
          url: 'https://doi.org/10.1126/science.203.4385.1073',
          src: 'Corliss et al. 1979, Science',
        },
        {
          name: '熱泉管蟲的共生細菌',
          img: 'tubeworm-symbiont.jpg',
          imgCredit: 'WHOI（攝影 Amy Nevala），2005 年加拉巴哥裂谷探勘採到的巨型管蟲',
          video: 'https://www.youtube.com/watch?v=8W_ywzhkR90',
          fact: '管蟲體內有能氧化硫、自己合成養分的共生細菌，研究者推測牠的養分就來自這些細菌。',
          url: 'https://doi.org/10.1126/science.213.4505.340',
          src: 'Cavanaugh et al. 1981, Science',
        },
        {
          name: '櫻花鉤吻鮭（台灣）',
          img: 'formosan-salmon.jpg',
          imgCredit: '雪霸國家公園',
          video: 'https://www.youtube.com/watch?v=WGYVtCrK67E',
          fact: '冰河期時被留在大甲溪，演化後失去洄游能力，喜歡水溫 10 到 16°C、清澈沒有污染的溪水。',
          url: 'https://www.trimt-nsa.gov.tw/zh-tw/ecology/58/',
          src: '交通部觀光署參山國家風景區管理處',
        },
        {
          name: 'Biosphere 2',
          img: 'biosphere2.jpg',
          imgCredit: '亞利桑那大學',
          video: 'https://www.youtube.com/watch?v=l8ulXtBe658',
          fact: '亞利桑那州的密閉玻璃建築，封閉後頭 16 個月氧氣從 21% 降到 14%，原因是土壤裡的有機物被微生物分解耗掉氧氣。',
          url: 'https://doi.org/10.1029/94EO00285',
          src: 'Severinghaus et al. 1994, Eos',
        },
        {
          name: '吃塑膠的細菌',
          img: 'plastic-bacteria.jpg',
          imgCredit: 'Kohei Oda（京都工藝纖維大學），刊於慶應義塾大學研究介紹頁',
          fact: '研究團隊從大阪一家寶特瓶回收工廠採了 250 份樣本，找到能分解並利用 PET 的細菌，2016 年發表，人造物也可能變成食物。',
          url: 'https://doi.org/10.1126/science.aad6359',
          src: 'Yoshida et al. 2016, Science',
        },
      ],
    },
    {
      cat: '前人怎麼從環境推出生物',
      items: [
        {
          name: 'Dougal Dixon《After Man》',
          img: 'after-man.jpg',
          imgCredit: 'Breakdown Press 書封',
          fact: '1981 年出版，把場景設在大約 5,000 萬年後，替未來的地球推想出一整套動物。',
          url: 'https://www.breakdownpress.com/store/after-man',
          src: 'Breakdown Press（出版社）',
        },
        {
          name: '《The Future Is Wild》',
          img: 'future-is-wild.jpg',
          imgCredit: 'The Future Is Wild 官網',
          video: 'https://www.youtube.com/watch?v=vm3LOneRR98',
          fact: '三集紀錄片，分別是 500 萬年後的冰河世界、1 億年後的溫室世界、2 億年後的新世界。',
          url: 'https://www.thefutureiswild.com/documentary/',
          src: 'The Future Is Wild 官方網站',
        },
        {
          name: 'Karl Sims《Evolved Virtual Creatures》',
          img: 'karl-sims.jpg',
          imgCredit: 'Karl Sims 官網',
          video: 'https://www.youtube.com/watch?v=RZtZia4ZkX8',
          fact: '1994 年的研究，生物在模擬的水中或陸地上接受游泳、行走、跳躍等考驗，表現好的才留下來繼續演化，官網有影片。',
          url: 'https://www.karlsims.com/evolved-virtual-creatures.html',
          src: 'Karl Sims 官方網站',
        },
      ],
    },
    {
      cat: '自然界的交流與混種',
      items: [
        {
          name: '菌根網路',
          img: 'mycorrhiza.jpg',
          imgCredit: 'Mother Tree Project',
          video: 'https://www.youtube.com/watch?v=Un2yBgIAxYs',
          fact: '在野外，不同種的樹之間會透過地下的菌根真菌傳遞碳，交流不一定要見面。',
          url: 'https://doi.org/10.1038/41557',
          src: 'Simard et al. 1997, Nature',
        },
        {
          name: '細菌交換基因',
          img: 'bacteria-recombination.jpg',
          imgCredit: 'Joshua Lederberg，洛克斐勒大學百年紀念網站',
          fact: '1946 年發現不同菌株的大腸桿菌之間會重組基因，雙方的遺傳性狀可以組合在一起。',
          url: 'https://doi.org/10.1038/158558a0',
          src: 'Lederberg & Tatum 1946, Nature',
        },
        {
          name: '發光細菌',
          img: 'luminous-bacteria.jpg',
          imgCredit: '費氏弧菌的宿主夏威夷短尾烏賊，McFall-Ngai Lab',
          video: 'https://www.youtube.com/watch?v=KXWurAmtf78',
          fact: '剛接種時不發光，等族群長大、培養液被細菌改變之後，才大量合成發光酵素。',
          url: 'https://doi.org/10.1128/jb.104.1.313-322.1970',
          src: 'Nealson et al. 1970, J. Bacteriology',
        },
        {
          name: '騾',
          img: 'mule.jpg',
          imgCredit: '1942 年的馱運騾隊，USDA ARS（Historic Fort Reno）',
          fact: '馬（2n＝64）和驢（2n＝62）的後代，有 63 條染色體，科學上認為牠無法自然交配生下後代。',
          url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9778318/',
          src: 'Ren et al. 2022, Genes',
        },
        {
          name: '雜頭翁（台灣）',
          img: 'zatouweng.jpg',
          imgCredit: '烏頭翁，陳王時攝，農業部農業知識入口網',
          fact: '烏頭翁和白頭翁原本被地理隔開，人為開發與放生讓牠們在野外雜交，後代還能繁殖。',
          url: 'https://www.tbri.gov.tw/view.php?id=239&subtheme=&theme=qa',
          src: '農業部生物多樣性研究所',
        },
      ],
    },
    {
      cat: '遊戲與作品怎麼做交流',
      items: [
        {
          name: 'Tamagotchi 連線版',
          img: 'tamagotchi.jpg',
          imgCredit: 'BANDAI 2004 年新聞稿',
          video: 'https://www.youtube.com/watch?v=jAJITJHVwI4',
          fact: '2004 年 Bandai 推出，用紅外線跟別台連線，交朋友、交換禮物，感情夠好就結婚生下第二代。',
          url: 'https://www.bandai.co.jp/releases/images/3/14090.pdf',
          src: 'Bandai 2004 新聞稿（日文）',
        },
        {
          name: '《Creatures》',
          img: 'creatures.jpg',
          imgCredit: 'Steam 官方商店頁（Creatures: The Albian Years）',
          fact: '1996 年的遊戲，父母的基因在基因邊界交叉拼接並加上突變，生物還能用電子郵件從一台電腦寄到另一台。',
          url: 'https://doi.org/10.1145/267658.267663',
          src: 'Grand et al. 1997, Agents ’97',
        },
        {
          name: '寶可夢《紅／綠》',
          img: 'pokemon-rg.jpg',
          imgCredit: 'The Pokémon Company 官網',
          fact: '1996 年發售，用 Game Boy 專用通信線和朋友交換寶可夢。',
          url: 'https://www.pokemon.co.jp/game/other/gb-rg/',
          src: 'The Pokémon Company（日文）',
        },
        {
          name: 'A-Volve',
          img: 'a-volve.jpg',
          imgCredit: 'Sommerer & Mignonneau，林茲藝術大學官網',
          video: 'https://www.youtube.com/watch?v=0WG45k93pCA',
          fact: 'Christa Sommerer & Laurent Mignonneau，1994，與人工生命研究者 Thomas Ray 合作完成。觀眾畫出外形，生物就在玻璃水池裡游動、生下後代，強的吃掉弱的，觀眾的手也能保護牠們。',
          url: 'https://www.ntticc.or.jp/en/archive/works/a-volve/',
          src: 'NTT ICC',
        },
        {
          name: 'Electric Sheep',
          img: 'electric-sheep.jpg',
          imgCredit: 'Electric Sheep 官網',
          video: 'https://www.youtube.com/watch?v=ipw4A6AXokk',
          fact: 'Scott Draves，1999。連網的電腦一起算動畫「羊」，觀眾投票，受歡迎的羊活得久，並依基因演算法繁殖。',
          url: 'https://electricsheep.org/',
          src: 'Electric Sheep 官方網站',
        },
      ],
    },
  ],
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
  '卡關三十分鐘法則：卡超過三十分鐘，就把完整的錯誤訊息與你試過的方法交給 AI，仍然解不開，帶著紀錄在上課的「創作與個別討論」時段找老師。',
  '揭露隨手記：每次用 AI 做了什麼，當下就記進交付的 AI 揭露欄，事後補記一定會漏。',
  '物種日誌：每完成一段，用自己的話寫下牠這次多了什麼能力、你為什麼這樣選，這些筆記就是最後導覽的底稿，寫在當站資料夾的 notes.md。',
  '每站的交付都是四件套：可執行的程式碼、截圖或影片、一百至兩百字反思（自己寫），以及 AI 揭露欄（工具、日期、prompt 摘要、採用範圍），反思與揭露欄都寫在該站資料夾的 README.md，格式照 template 的 README。',
  '報告站（M1、M2、M3、M6）每個人都要上台簡報：針對該站進度講清楚你做了什麼、為什麼這樣選、卡過哪裡怎麼解，三分鐘、做重點不做逐字稿，簡報檔放進該站資料夾一起 push。',
]

// 學期節奏：每週四上課，16 次（依本學期行事曆排定）
export const CALENDAR = {
  intro:
    '每週四上課，共 16 次，從 9/10 到 12/24，每次三小時。課程仍以里程碑為主，作品在課外推進，課堂拿來討論與解決問題，這張表告訴你每次上課討論什麼、下次上課前要推進到哪，全班同步的報告站有四個：10/1 世界簡報、10/15 物種簡報、11/12 物種發表會、12/24 開園。期末考週（12/21 到 12/24）本課不考試，開園展演就排在 12/24 那堂課。',
  offdays:
    '學期內的停課日（中秋節 9/25、教師節 9/28、國慶日補假 10/9、光復節補假 10/26、全校運動大會 11/11）都不在週四，16 次上課照常進行，臨時異動以課堂公告為準。',
}

// 每次上課怎麼進行：創作在課外，課堂時間拿來討論與解決問題（報告站那週以上台與提問為主）
export const SESSION_FLOW = {
  intro:
    '每次上課三小時，作品主要靠你自己在課外推進，課堂時間拿來討論和解決問題。老師的講解不固定，每週看大家帶來的問題再補充需要的觀念或工具，所以帶著問題來，收穫最多。',
  steps: [
    { t: '進度巡迴', time: '約 20 分鐘', d: '每個人用一兩句話說這週做到哪、卡在哪，老師把卡點記在卡點牆上。' },
    { t: '共同討論', time: '約 30 分鐘', d: '從卡點牆挑出最多人遇到的一兩個問題，或當週的討論題，全班一起想、一起解，老師視情況補充短講。' },
    { t: '創作與個別討論', time: '約 90 分鐘', d: '各自做自己的物種，老師與助教巡迴，卡住就來排隊討論，也可以找同學一起看。' },
    { t: '分享與收尾', time: '約 30 分鐘', d: '兩三位同學展示這週的進度或解法，每個人寫下下次上課前要推進的一件事。' },
  ],
  prep: '每週都有「課前準備」，分成看、讀、寫、帶。要寫的部分寫在當週那一站資料夾的 notes.md（第幾週屬於哪一站，看每週進度標的里程碑，例如第 2 週寫在 m0-outfit/notes.md），檔案不存在就自己建一個。上課前一天把卡點用截圖加一句話貼到課程 Discord 的「物件導向程式設計」頻道，老師上課前會先看過，討論時間就能直接切進問題。準備得越完整，課堂上能討論得越深。',
  station: '報告站那一週（10/1、10/15、11/12、12/24）以上台報告與提問為主，每個人報告完，台下至少有一個人問「這個選擇的根據是什麼」。',
}

// 每週進度：date＝上課日（週四），m＝所在里程碑，station＝報告站；inClass＝課堂上討論與解決的事
export const WEEKS = [
  {
    w: 1, date: '2026-09-10', m: 'M0', title: '開學：認識後未來動物園',
    bring: [
      '看：課程頁的「期末專案」與「想你的生物」兩節',
      '想：一部你看過、出現「沒有人類的世界」的電影、動畫或遊戲，它的世界靠什麼規則運作',
      '帶：自己的筆電（若有）',
    ],
    inClass: [
      '課程導覽：後未來動物園要做什麼、七個里程碑怎麼走、四件套與報告站怎麼運作',
      'AI 公約五條與揭露方式',
      '選課程助教，說明要準備的帳號',
    ],
    after: '辦 GitHub 學生驗證（審核要好幾天，最先辦），確認自己的個人 Google 帳號，第二週帶自己的筆電來。',
  },
  {
    w: 2, date: '2026-09-17', m: 'M0', title: '裝好工作環境，開始想你的世界',
    bring: [
      '帶：自己的筆電（充好電）、可以登入的個人 Google 帳號與 GitHub 帳號',
      '看：3Blue1Brown〈Transformers, the tech behind LLMs〉（延伸閱讀 M0）',
      '想：你用 AI 時遇過它一本正經講錯的例子，準備一分鐘講給同學聽',
    ],
    inClass: [
      '在自己的筆電裝 agy，用個人 Google 帳號登入，Mac 與 Windows 的步驟都在開工準備',
      '開作品集 repo，用 GitHub Desktop 下載到筆電，在 repo 資料夾裡啟動 agy，確認它讀到 AGENTS.md 的課堂公約',
      '終端機基本功：打開終端機、cd 進資料夾、第一次對話，改檔前先看懂它給你的差異',
      '讓 AI 出錯實驗，親眼看它一本正經地錯',
      '討論：用「想你的生物」一節的養殖箱五個問題，分組聊聊各自想像的年代與環境，再想牠怎麼生存、棲息、繁殖',
    ],
    after: '完成 M0 四件套並 push（內容見里程碑 M0），把 repo 網址貼到課程 Discord 的「物件導向程式設計」頻道。在 m0-outfit/notes.md 寫下三件事：三個你有感覺的「沒有人類之後」的世界候選、今天互相追問時答不出來的那一題、一件你的作品最需要 AI 動手的事。',
  },
  {
    w: 3, date: '2026-09-24', m: 'M1', title: '世界研究：第一次完整跑研究迴圈',
    bring: [
      '看：《Life After People》官方播放清單任選一段（官方剪輯，5 到 9 分鐘），再看《The Future Is Wild》官方預告片（兩者連結都在案例庫「沒有人類之後」），注意它們怎麼用時間軸推演，用案例庫的四個問題寫進 notes.md',
      '讀：Mike Caulfield 的 SIFT 四步驟（延伸閱讀「方法」）',
      '寫：三個世界候選，每個一句話，各附一個你追到原始出處的事實與連結，上週答不出來的那一題也補上你查到的根據',
      '帶：第一次簡報（世界簡報）要用的資料，或做到一半的簡報，紙本、螢幕、草稿都可以',
      '帶：上週裝 agy 或使用時卡住的畫面截圖',
    ],
    inClass: [
      '逐一討論：每個人都要跟老師討論到你的世界材料與簡報方向，這是這週唯一硬性要求',
      '討論：分組互看上週寫下的三個世界候選，互相追問「這個世界的根據在哪裡」',
      '全班一起解：挑一兩位同學的例子，示範怎麼把 AI 給的事實追回原始出處',
      '創作與個別討論：各自跑研究迴圈，比較時間尺度與棲地，卡住就來討論',
    ],
    after: '寫出世界的一句話定案，找齊至少三個查證過的事實，研究報告寫出初稿，世界簡報做好。',
  },
  {
    w: 4, date: '2026-10-01', m: 'M1', station: '世界簡報', title: '世界簡報與確認',
    bring: [
      '做：世界簡報（PDF 放進 m1-world/）與研究報告',
      '讀：Deryabina et al. 2015 與 Møller & Mousseau 2015 的摘要，看同一個車諾比，兩篇研究怎麼得到不同結論（延伸閱讀 M1）',
      '寫：你的世界裡最沒把握的一個事實，以及你打算怎麼補證據',
      '準備：預想同學會問你「根據是什麼」的三個問題',
    ],
    inClass: [
      '每人三分鐘世界簡報，台下同學針對根據提問',
      '研究報告當場確認，老師會跟你聊來源',
      '收尾討論：大家的世界有哪些共同點，哪幾個世界有機會相鄰',
    ],
    after: '通過確認就開始從世界推物種，還沒通過的照回饋補強，再找老師確認。',
  },
  {
    w: 5, date: '2026-10-08', m: 'M2', title: '從世界推出你的物種',
    bring: [
      '讀：「想你的生物」的真實世界案例，挑兩個跟你的世界最接近的',
      '寫：物種的三個初步想像（能量從哪來、住在哪、怎麼繁殖），各附一種真實生物當參照',
      '做：p5.js 官方教學的第一個單元（延伸閱讀 M2）',
      '帶：你世界的一句話定案',
    ],
    inClass: [
      '討論：用「想你的生物」的養殖箱五問兩兩互相追問，找出設定裡最站不住的一環',
      '小組互看物種設定書五欄（型態、代謝、繁衍、行為、威脅），每人指出對方根據最弱的一欄',
      '全班一起解：p5.js 起步最常卡的地方（畫不出來、動不起來、座標搞混），從大家的問題裡挑來解',
      '創作與個別討論：做會動、有生命感的最小雛形',
    ],
    after: '設定書初稿完成，做出一個會動、有生命感的最小雛形，物種簡報做好。',
  },
  {
    w: 6, date: '2026-10-15', m: 'M2', station: '物種簡報', title: '物種簡報與檢核',
    bring: [
      '做：物種簡報、設定書五欄，以及可以現場跑的雛形',
      '看：Karl Sims《Evolved Virtual Creatures》官方影片，注意牠們的身體怎麼配合水中或陸地',
      '寫：你的雛形跟設定書哪一欄最對不上，打算怎麼改',
    ],
    inClass: [
      '每人三分鐘物種簡報，現場跑會動的雛形，台下同學提問',
      '檢核當場進行：設定書跟雛形對不對得上',
      '收尾討論：哪些物種的能量來源或繁殖方式有機會互相影響',
    ],
    after: '照回饋修設定書，想好牠的三個特徵與三種行為。',
  },
  {
    w: 7, date: '2026-10-22', m: 'M3', title: '先設計，再寫碼',
    bring: [
      '讀：Nature of Code 第 5 章 Autonomous Agents 的開頭（延伸閱讀 M3）',
      '寫：「牠有哪些特徵、哪些行為」清單，各至少三項，每項標出對應設定書的哪一欄',
      '帶：依回饋修過的設定書',
      '想：Braitenberg《Vehicles》用最簡單的線路長出「性格」，你的生物最簡單的性格是什麼',
    ],
    inClass: [
      '討論：把設定書翻成「牠有哪些特徵、哪些行為」，兩兩互看設計清單，先不寫碼',
      '全班一起解：怎麼請 AI 先給設計、比較兩三種做法，看懂了再請它寫碼',
      '創作與個別討論：做出最小可跑版，一隻會動的就好',
    ],
    after: '最小可跑版 push 上去，確認牠長得像設定書裡的那隻。',
  },
  {
    w: 8, date: '2026-10-29', m: 'M3', title: '讓行為對上設定書',
    bring: [
      '帶：最小可跑版的網址或錄影',
      '寫：一個卡住的問題，附完整錯誤訊息或截圖，加上你已經試過的方法',
      '讀：Craig Reynolds〈Steering Behaviors〉，挑一種行為想想牠會不會用到（延伸閱讀 M3）',
      '想：觀眾第一眼看到牠，哪一個動作最能讓人認出牠是誰',
    ],
    inClass: [
      '互看討論：兩兩交換，找出對方跑起來的行為哪裡跟設定書對不上',
      '全班一起解：從大家的程式挑一兩個常見卡點，例如動作不自然、一直跑出畫面',
      '創作與個別討論：從演算法圖鑑的行為類挑一兩個，讓牠長出第一個天性',
    ],
    after: '從圖鑑挑一兩個演算法，讓牠長出第一個天性。',
  },
  {
    w: 9, date: '2026-11-05', m: 'M3', title: '長出天性，準備發表',
    bring: [
      '帶：目前的程式與發表簡報草稿',
      '寫：最多三個卡點，寫清楚想要的效果和現在的樣子',
      '看：案例庫「人工生命藝術」挑一件作品，用案例庫的四個問題寫進 notes.md，再想想作者會怎麼用三分鐘介紹它',
      '練：自己計時講一次三分鐘發表',
    ],
    inClass: [
      '卡點診所：逐一討論每個人的卡點，同學可以旁聽別人的解法',
      '發表預演：小組內三分鐘試講，每個人給對方一個具體建議',
      '創作與個別討論：補齊三個特徵、三種行為與發表簡報',
    ],
    after: '三個特徵、三種行為都做出來，發表簡報完成，m3-creature/ 四件套 push。',
  },
  {
    w: 10, date: '2026-11-12', m: 'M3', station: '物種發表會', title: '物種發表會（期中）',
    bring: [
      '做：發表簡報與可以現場跑的程式',
      '準備：兩個想問同學的問題，關於他們的世界或物種',
    ],
    inClass: [
      '每人三分鐘發表，現場跑再加上導讀，台下同學提問',
      '同學互相回饋：每人寫一張回饋給兩位同學',
      '收尾討論：成群之後，誰的物種最可能跟誰相遇',
    ],
    after: '整理回饋，想想牠成群之後會是什麼樣子。',
  },
  {
    w: 11, date: '2026-11-19', m: 'M4', title: '成群、變異、生與死',
    bring: [
      '讀：Craig Reynolds〈Boids〉頁面（延伸閱讀「圖鑑」）與 Volterra 1926 的摘要（延伸閱讀 M4）',
      '寫：你世界的生死法則草稿（壽命、能量、被吃、繁殖條件）',
      '想：你的物種要不要跟同學的物種相遇？寫下一個支持或反對的理由（參考「想你的生物」的全班約定表）',
      '看：案例庫「遊戲裡的生態」挑一款遊戲的官方影片，看它怎麼把繁殖寫成規則，用案例庫的四個問題寫進 notes.md',
    ],
    inClass: [
      '討論：你世界的生死法則是什麼（壽命、能量、被吃、繁殖條件），跟同學的法則比一比',
      '全班決定：動物園裡的物種要不要相遇、怎麼交流，參考「想你的生物」的全班約定表',
      '全班一起解：族群一多就變慢、全滅或爆量時怎麼調',
      '創作與個別討論：先十隻再往上加，讓族群有出生也有死亡',
    ],
    after: '族群跑起來，有出生也有死亡。',
  },
  {
    w: 12, date: '2026-11-26', m: 'M4', title: '演化與群體行為',
    bring: [
      '帶：族群跑一段時間後的錄影或截圖',
      '寫：族群往哪個方向漂，你怎麼解釋',
      '讀：Nature of Code 第 9 章演化運算（延伸閱讀 M4）',
      '若全班決定交流：帶你物種的基因與訊號寫法',
    ],
    inClass: [
      '討論：你的族群跑久了往哪個方向漂，為什麼',
      '若全班決定交流：定好基因與訊號的寫法，兩兩試著讓物種相遇',
      '全班一起解：一百隻還順不順，效能卡住時先從哪裡查',
      '創作與個別討論：演化與群體行為',
    ],
    after: 'm4-population/ 四件套 push，把讓族群崩潰過的參數記下來。',
  },
  {
    w: 13, date: '2026-12-03', m: 'M5', title: '造景，接上感官',
    bring: [
      '看：teamLab《Graffiti Nature》與《A-Volve》的官方資料，觀察觀眾怎麼變成環境的一部分',
      '讀：ml5.js handPose 或 faceMesh 官方文件（延伸閱讀 M5）',
      '帶：棲地草圖或參考圖，以及你想用的感測方式和理由',
    ],
    inClass: [
      '討論：你的棲地長什麼樣，跟 M1 的世界觀對不對得上',
      '全班一起解：鏡頭權限、模型載入太慢、光線不足這類常見問題',
      '創作與個別討論：造景，接上 handPose 或 faceMesh 最小版',
    ],
    after: '棲地場景完成，鏡頭互動能跑。',
  },
  {
    w: 14, date: '2026-12-10', m: 'M5', title: '觀眾是誰',
    bring: [
      '讀：個人資料保護法第 2 條（延伸閱讀「感測」），想想鏡頭拍到觀眾時要注意什麼',
      '寫：「觀眾是誰」的一句話，以及兩三條刺激與反應規則',
      '帶：可以讓同學試玩的版本',
    ],
    inClass: [
      '討論：這個沒有人類的世界，鏡頭前的觀眾是誰，分組互相追問',
      '互測：交換電腦試玩彼此的互動，記下哪裡看不懂、哪裡沒反應',
      '全班一起解：互動規則不穩、換光線換距離就失靈的問題',
      '創作與個別討論：調整刺激與反應規則',
    ],
    after: 'm5-habitat/ 四件套 push，互動規則要穩。',
  },
  {
    w: 15, date: '2026-12-17', m: 'M6', title: '開園準備與彩排',
    bring: [
      '讀：V&A 的展覽文字寫作指南（延伸閱讀 M6）',
      '寫：三分鐘導覽稿草稿',
      '帶：上線網址與展演需要的設備清單',
    ],
    inClass: [
      '彩排：小組內完整導覽一次，同學扮觀眾提問',
      '卡點診所：GitHub Pages 上線、別台電腦打不開、離線備援',
      '展場討論：全班一起排動線、設備與誰顧哪一區',
    ],
    after: '導覽簡報完成，另外準備一份本機能跑的離線備援。',
  },
  {
    w: 16, date: '2026-12-24', m: 'M6', station: '開園', title: '後未來動物園開園',
    bring: [
      '帶：作品、導覽簡報與本機能跑的離線備援版本',
      '提早到場架設，先在展演的電腦上試跑一次',
    ],
    inClass: [
      '展演與導覽：你以物種首席研究員的身分帶大家看牠',
      '回答關於牠的任何提問',
      '收尾：全班一起看整座動物園，說說哪兩個物種最該相遇',
    ],
    after: '四件套加導覽簡報齊全，含完整 AI 揭露。',
  },
]

// 里程碑指南：詳細步驟、完成清單、常見卡點
export const MILESTONE_GUIDE = [
  {
    id: 'M0', name: '裝備', flag: null, when: '第 1–2 週（9/10、9/17）', due: '9/24（四）上課前弄好，這一站不卡遲交，10/1 跟 M1 一起收',
    goal: '把工具全部就位，並且親眼看過 AI 出錯，之後你才有資格說「驗證是我的工作」。',
    steps: [
      '照[開工準備](#setup)申請帳號，GitHub 學生驗證需要審核天數，最先辦它。',
      '從[課程 template repo](https://github.com/chenweichiang/oop-portfolio-template) 按「Use this template」開出自己的 repo（記得選 Public，老師才看得到），再用 GitHub Desktop 把它下載到筆電，步驟在[開工準備](#setup)。',
      '在自己的筆電裝 agy，進到 repo 資料夾啟動，用個人 Google 帳號登入，Mac 與 Windows 的步驟都在[開工準備](#setup)。已經有 Claude 或 ChatGPT 帳號的同學，也可以改用 Claude Code 或 Codex，裝法在同一節。',
      '請你的 AI 解釋給你聽：「請用比喻解釋 LLM 的 token、預測下一個字、context window，以及為什麼會幻覺，每講完一段就問我問題，確認我懂了。」',
      '進行「讓 AI 出錯」實驗，至少一種：問不存在的論文細節、給模稜兩可的指令，或請它計算長算式再自己驗算，把它一本正經出錯的樣子截圖存下來。',
      '打開 repo 裡的 AGENTS.md，在「我的工作流」區寫下至少三條自己的規則，開始養成你的工作流。agy 與 Codex 啟動時會自動讀這個檔，Claude Code 透過 CLAUDE.md 讀到它。比較早開 repo、裡面只有 CLAUDE.md 的同學，請你的 AI 把 CLAUDE.md 複製一份成 AGENTS.md。',
      '在 repo 裡建 m0-outfit/ 資料夾，放進 M0 四件套：程式碼用 [template README](https://github.com/chenweichiang/oop-portfolio-template#readme)「第一次試跑」那顆會呼吸的圓（index.html 加 sketch.js，可以請你的 AI 帶你做），截圖放「讓 AI 出錯」實驗的畫面，README.md 寫一百到兩百字反思（你看到 AI 怎麼出錯、之後打算怎麼驗證）並填 AI 揭露欄。',
      '把 repo 網址貼到課程 Discord 的「物件導向程式設計」頻道，交一次就好，這是老師整學期看你進度的入口，怎麼交付與傳簡報詳見[繳交](#submission)一節。',
    ],
    checks: [
      'agy 裝好、能登入（或 Claude Code、Codex 其中一個能用）',
      '能在終端機跟你的 AI 代理對話',
      'repo 是公開的、已下載到筆電、網址已貼到 Discord',
      '完成「讓 AI 出錯」實驗並留下截圖',
      'AGENTS.md 有至少三條自己的規則',
      'm0-outfit/ 四件套已 push',
    ],
    pitfalls: 'agy 裝好卻說找不到指令，先關掉終端機重開，從 GitHub Desktop 開的終端機要把 GitHub Desktop 也關掉重開，其他狀況看[開工準備](#setup)的排錯。Codespace 登入卡關看 [template README](https://github.com/chenweichiang/oop-portfolio-template#readme) 的排錯（在網址上連點三下再複製）。出錯實驗不要拿真實個資或危險主題去試，問不存在的論文最安全。',
  },
  {
    id: 'M1', name: '世界', flag: '確認', when: '第 3–4 週（9/24、10/1），第 2 週先寫世界候選，10/1 世界簡報與確認', due: '10/1（四）上課前',
    goal: '透過研究先行迴圈的第一次完整實戰，把「沒有人類之後」從想像變成有根據的世界，你的物種能不能成立，全看這一站打的地基。',
    steps: [
      '9/24 上課帶著你手上的材料來跟老師討論：三個世界候選、查到的資料、做到一半的簡報都可以，這是這一站唯一一定要到的關卡。材料不強制上傳，建議先丟進 m1-world/notes.md，10/1 寫報告時直接用得上。',
      '選時間尺度：先問你的 AI「人類消失後 50 年、5 萬年、5,000 萬年，地球環境各會是什麼樣子？請列出關鍵差異與依據來源」，從中挑出你有感覺的尺度。',
      '深挖你的角落：城市廢墟、深海熱泉、核電廠遺址、塑膠環流帶都是候選，請 AI 比較其中兩三個棲地的環境條件，溫度、化學物質、能量來源、危險各是什麼。',
      '查證至少三個關鍵事實，例如「混凝土多久會崩解」「輻射區的真實生態（車諾比案例）」，回到原始出處，把連結存下來，研究報告全篇至少附五個點得開的來源連結。',
      '用一句話定案：「我的世界是人類消失後＿＿年的＿＿，這裡最大的生存挑戰是＿＿。」',
      '寫成世界觀研究報告，建議結構：時間點與棲地（對應養殖箱的年代）、環境條件表（對應環境）、三個查證過的事實與來源、對物種設計的啟示（先寫下生存、棲息、繁殖的初步想法），放進 m1-world/ 並 push。',
      '世界簡報三分鐘：四到六頁，每個人都要上台報告這一站的進度。第一頁就放你的一句話定案，接著是環境條件、三個查證過的事實與來源、這個世界對物種設計的啟示，最後一頁講你卡過哪裡、怎麼解的。講不清楚的地方，就是報告還沒寫透的地方。',
      '報告完把研究報告交給老師確認，通過才開始設計物種，簡報檔一併放進 m1-world/。',
    ],
    checks: [
      '9/24 已經跟老師討論過材料或簡報方向',
      '有明確的時間點與棲地',
      '至少五個點得開的來源連結',
      '三個事實標明查證出處',
      '世界簡報報告完成、簡報檔已放進 m1-world/',
      'm1-world/ 四件套已 push，README.md 有反思與 AI 揭露欄',
      '確認通過',
    ],
    pitfalls: '最常見的死法是直接把 AI 的整理貼上，確認時老師會跟你聊來源，聊不下去就得重寫。查證是你對自己世界的主權。',
  },
  {
    id: 'M2', name: '物種', flag: '檢核', when: '第 5–6 週（10/8、10/15），10/15 物種簡報與檢核', due: '10/15（四）上課前',
    goal: '在你的世界裡長出站得住腳的物種，並讓牠第一次動起來，親手寫或全用你的工作流都可以，重點是你能說出牠是什麼、為什麼這樣設計。',
    steps: [
      '從世界推物種：問你的 AI「在我的世界（貼上你的一句話定案），生命可能的能量來源有哪些？碳基還撐得住嗎？矽基、塑膠代謝、金屬呼吸的科學根據與困難各是什麼？請附來源。」',
      '查證關鍵設定：你選的代謝方式，至少要找到正經討論過的文獻，天體生物學（Astrobiology）、極端環境微生物都是好關鍵字。',
      '把養殖箱的生存、棲息、繁殖三問展開成物種設定書五欄：型態（長怎樣、多大）、代謝（吃什麼、能量從哪來）、繁衍（怎麼複製自己）、行為（天性、怕什麼、追什麼）、威脅（什麼會殺死牠），每欄都要附一句根據。',
      'p5.js 快速入門：請你的 AI 用十五分鐘帶你認識 setup/draw、座標與圖形，之後你至少要讀得懂牠的身體是怎麼畫出來的，順手看一眼圖鑑的 noise 條目。',
      '讓牠第一次動起來：做最小雛形（會動、有生命感的形體），想親手寫很好，全用工作流也完全可以，重要的是牠長得像你設定書裡的那隻。',
      '物種簡報三分鐘：四到六頁，每個人都要上台報告這一站的進度。世界一句話回顧、設定書五欄各一句加上根據、現場跑你會動的雛形、下一站想讓牠長出什麼天性，檢核就在你報告完當場進行。',
      '把設定書、會動的雛形與簡報放進 m2-species/ 並 push。',
    ],
    checks: [
      '設定書五欄齊全、每欄有根據',
      '代謝方式有至少一個查證來源',
      '有會動的雛形，且對得上設定書',
      '物種簡報報告完成、簡報檔已放進 m2-species/',
      '能一句話回答「牠憑什麼在你的世界活下來」',
      'm2-species/ 四件套已 push，README.md 有反思與 AI 揭露欄',
    ],
    pitfalls: '雛形不求像、求活，會呼吸的圓就夠格。先想清楚牠該怎麼動再動手，雛形對不上設定書，發表會就少了故事。',
  },
  {
    id: 'M3', name: '個體', flag: '發表', when: '第 7–10 週（10/22–11/12），11/12 物種發表會', due: '11/12（四）上課前',
    goal: '把設定書翻譯成程式，做出活的、行為對得上設定書的個體，並在物種發表會亮相。',
    steps: [
      '先設計後寫碼：把設定書交給 AI，「請把這個物種設計成 p5.js 的程式，牠有哪些特徵、哪些天性？先給設計清單，先不要寫碼」，透過來回討論把設計吵清楚。',
      '最小可跑版：只做「一隻會動的」，跑通了才加料。',
      '對照關：把跑起來的行為和設定書逐欄對照，牠的天性是否真的來自你的設定，不符的地方回頭調整。',
      '長出天性：從圖鑑的行為類挑一兩個（steering 的追與逃、Braitenberg 的性格、IK 觸手），讓牠的行為對得上設定書。',
      '發表簡報三分鐘：五到八頁，每個人都要上台報告這一站的進度。你的世界三十秒、牠是什麼一分鐘、現場跑加導讀你最得意的段落一分半，並說清楚這一站你做了哪些選擇、AI 用在哪裡。簡報做重點不做逐字稿。',
      '交付 m3-creature/ 四件套加發表簡報並 push，參加物種發表會。',
    ],
    checks: [
      '牠至少有三個特徵、三種行為，且每個都對應設定書',
      '說得出每個行為對應設定書的哪一欄',
      '行為用了圖鑑至少一個演算法',
      '發表簡報已放進 m3-creature/',
      '發表會完成、拿到同學回饋',
      'm3-creature/ 四件套已 push，README.md 有反思與 AI 揭露欄',
    ],
    pitfalls: '最大的陷阱是一次要太多功能。記住節奏：最小可跑、確認像牠、再加一個，功能塞太多，故事反而說不清楚。',
  },
  {
    id: 'M4', name: '族群', flag: null, when: '第 11–12 週（11/19、11/26）', due: '12/3（四）上課前',
    goal: '一隻不算生態，要讓牠成群、帶變異、會生會死，族群跑起來，你世界的法則才算數。',
    steps: [
      '成群：先十隻再往上加，每隻出生就帶隨機基因，大小、速度、顏色都給變異範圍。',
      '生與死：定義你世界的法則，壽命、能量耗盡、被吃掉、繁殖條件都算，讓族群有出生也有死亡。',
      '演化：子代繼承親代基因並帶一點突變，跑久一點，觀察族群往哪個方向漂。',
      '群體行為：從圖鑑挑一個族群級演算法（boids 群集、生命遊戲的規則改造、掠食者與獵物），讓一群有一群的樣子。',
      '效能檢查：至少三十隻要流暢，這是完成門檻，再試到一百隻，卡頓就先問 AI 怎麼改善，別急著加隻數。',
      '交付 m4-population/ 四件套並 push。',
    ],
    checks: [
      '至少三十隻同時活動且流暢',
      '個體之間看得出變異',
      '有出生也有死亡，世界法則說得出來',
      '群體行為明顯、用了圖鑑至少一個演算法',
      'm4-population/ 四件套已 push，README.md 有反思與 AI 揭露欄',
    ],
    pitfalls: '參數一調就全滅或爆量？這也是生態學，把崩潰的參數記下來，發表時它會是好故事。效能卡頓先減隻數再改善，別硬撐。',
  },
  {
    id: 'M5', name: '棲地', flag: null, when: '第 13–14 週（12/3、12/10）', due: '12/17（四）上課前',
    goal: '給族群一個世界，接著讓觀眾走進來，透過鏡頭把面前的人變成環境刺激。這個世界已經沒有人類，那觀眾是誰？',
    steps: [
      '造景：從圖鑑的棲地類挑工具（noise 地形與流場、space colonization 藤蔓、WFC 廢墟）做出環境，族群要活在場景裡，不要留在白底上。',
      '接上感官：到[感測互動](#sensing)小節挑工具，handPose 或 faceMesh 起步最穩，先做最小版，畫面上看到自己的手骨架就算通。',
      '定義觀眾：這個沒有人類的世界，鏡頭前的是誰？時間旅人、外星訪客、最後的倖存者都行，用一句話寫進設定，這決定生物怎麼回應。',
      '刺激與反應：設計兩三條規則（觀眾靠近就散開、揮手就好奇聚過來、沒有人就回到自己的節奏），接進族群的行為。',
      '實地測試：換光線、換距離都試過，鏡頭互動在展場的可靠度就是作品的可靠度。',
      '交付 m5-habitat/ 四件套並 push。',
    ],
    checks: [
      '背景是環境場景，不留白底',
      '鏡頭互動穩定可靠',
      '至少兩條「觀眾對生物」的反應規則',
      '「觀眾是誰」有一句話敘事',
      'm5-habitat/ 四件套已 push，README.md 有反思與 AI 揭露欄',
    ],
    pitfalls: 'ml5 模型第一次載入需要幾秒，記得做載入畫面，別讓觀眾看白屏。鏡頭權限要允許，環境太暗偵測會失準，先在教室實測。',
  },
  {
    id: 'M6', name: '開園', flag: '開園', when: '第 15–16 週（12/17、12/24），12/24 開園', due: '12/24（四）開園前 push 作品與導覽簡報，反思與 AI 揭露當天 23:59 前補齊',
    goal: '後未來動物園開園，你的物種入住園區，你以首席研究員的身分導覽，說出牠的世界、牠的一生，以及你的每個選擇。',
    steps: [
      '打磨：沒人操作三十秒也要好看（idle 狀態）、重新整理能重來、當機要能快速復原。',
      '上線：把最終版放進 m6-zoo/，開 GitHub Pages（請 AI 帶你設定），拿到公開網址。',
      '入住動物園：把物種名、一句話介紹、作品網址貼到課程 Discord 的「物件導向程式設計」頻道，老師更新園區名單後，你的物種就會出現在[園區](https://course.interaction.tw/oop/gallery/)。',
      '導覽簡報三分鐘：這個世界（哪一年、哪個角落）、這個物種（憑什麼活）、看牠活著（現場互動）、設計導讀（你最想講的那個選擇），簡報只是導覽的背景，觀眾要看的是牠活著。',
      '導覽練習：用三分鐘把牠的一生說給同學或你的 AI 聽，聽的人有疑問，就把答案補進導覽稿。',
      '開園日：展演、導覽、回答任何提問。',
    ],
    checks: [
      '公開網址在別人的電腦也打得開',
      '每個設計選擇都說得出理由',
      '三分鐘導覽至少練過一次',
      '四件套加導覽簡報齊全，含完整 AI 揭露',
    ],
    pitfalls: '展場網路難以預料，準備離線備援，也就是本機能跑的版本。導覽最動人的往往是牠為什麼活成這樣。',
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
      { name: 'Boids / Flocking', zh: '群集', what: '分離、對齊、聚合三條規則就成了鳥群魚群', use: '魚群、鳥群、蟲群，你的族群怎麼一起活著', lv: 2, prompt: '用 p5.js 做 boids，並加上第四條規則「躲避滑鼠」，接著說明三個權重怎麼調會從魚群變成蚊群。', ref: 'Nature of Code Ch.5' },
      { name: 'Physarum', zh: '黏菌模擬', what: '單細胞的覓食網絡，沒有大腦卻會解迷宮', use: '菌絲型物種，廢墟之間長出的交通系統', lv: 3, prompt: '用 p5.js 做簡化版 physarum：agents 留下費洛蒙、轉向費洛蒙濃的方向，先做五百隻低解析度版，並解釋為什麼會長出網絡。', ref: 'Sage Jenson physarum 頁' },
      { name: 'Predator–Prey', zh: '掠食者與獵物', what: '吃與被吃的數量動態，生態學基本模型', use: '你的物種吃什麼、被什麼吃，也可以試試把同學的物種放進同一棲地', lv: 2, prompt: '用 p5.js 做 agent 版掠食者與獵物：草、兔、狐三層，餓了會死，跑五分鐘觀察數量怎麼震盪，並找出讓生態崩潰的參數。', ref: 'Nature of Code 生態系專案' },
      { name: 'Genetic Algorithm', zh: '遺傳演算法', what: '突變、選擇、繁殖，可以理解成演化本身', use: 'M4 的演化玩真的，族群在你的法則下自己變形', lv: 3, prompt: '用 p5.js 做遺傳演算法：基因是體型、速度、顏色，適應度是在我的規則下活多久，跑五十代，把每代最強的排成演化史。', ref: 'Nature of Code Ch.9' },
    ],
  },
  {
    cat: '棲地，牠的世界長什麼樣', hint: 'M5 棲地',
    items: [
      { name: 'Flow Field', zh: 'Noise 地形與流場', what: '透過雜訊生成地形或風場，環境的呼吸', use: '起伏地景、洋流、輻射塵飄移，族群順著環境流動', lv: 2, prompt: '用 p5.js 做 noise flow field，粒子順著場漂流，接著把場當成輻射濃度，讓我的生物只在低輻射區聚集。', ref: 'Nature of Code Ch.5' },
      { name: 'Space Colonization', zh: '空間拓殖', what: '枝條朝吸引點生長，葉脈與根系的演算法', use: '爬滿廢墟的藤蔓、血管網、根系', lv: 3, prompt: '用 p5.js 做 space colonization 長一棵樹，接著把吸引點改成廢墟照片的邊緣，讓藤蔓爬滿那棟建築。', ref: 'Coding Train 有完整實作' },
      { name: 'Wave Function Collapse', zh: '波函數塌縮', what: '從局部規則拼出全局一致的地圖', use: '無限延伸的廢墟園區，每次重整都不同的棲地', lv: 3, prompt: '先解釋 WFC 的直覺，再用 p5.js 做最簡 tile 版：五種廢墟 tile，生成每次都不同但接縫合理的地圖。', ref: 'mxgmn/WaveFunctionCollapse' },
    ],
  },
]

// 感測互動：臉、手、身體如何變成棲地的輸入（M5）
export const SENSING = {
  intro:
    '鏡頭是棲地的感官，觀眾的臉、手、身體透過它變成環境刺激。以下工具全部在瀏覽器本機推論，影像不會上傳到任何伺服器，這點在展場也值得說給觀眾聽。',
  method: [
    { t: '① 取點', d: '感測模型給你的是關鍵點（landmark），臉 468 點（開啟 refineLandmarks 時加上虹膜共 478 點）、手 21 點、身體 17 點，先把點畫出來，看懂資料長什麼樣。' },
    { t: '② 算訊號', d: '把點變成數字：兩點距離（嘴巴開合、手指捏合）、點的速度（揮手快慢）、骨架大小（人靠多近）、角度（頭轉向哪），這些數字才是生物能理解的刺激。' },
    { t: '③ 映射', d: '設計訊號與行為的對應：靠近就散開、揮手就聚過來、張嘴就餵食，一條訊號接一條行為，寫成你世界的規則。' },
    { t: '④ 平滑', d: '原始訊號會抖，用 lerp 濾波讓數值滑順，再用門檻值加遲滯（hysteresis）避免狀態狂切，生物的反應才顯得從容。' },
  ],
  venue: [
    '載入畫面：ml5 模型第一次載入需要幾秒，空白畫面會讓觀眾以為作品壞了。',
    '光線實測：展場的光跟教室不同，太暗或逆光偵測都會失準，佈展時先實測。',
    '多人情境：展場常常同時很多人入鏡，先決定只追蹤最近的人，或讓每個人都算數。',
    '隱私聲明：影像在瀏覽器本機處理、不上傳，在展場立牌寫清楚，觀眾才安心。',
    '備援方案：鏡頭臨時罷工時，保留滑鼠或鍵盤也能觸發的版本，展演不中斷。',
  ],
  tools: [
    { name: 'ml5.js faceMesh', zh: '臉部網格', what: '468 個臉部關鍵點（開啟 refineLandmarks 時 478 個），眉眼口鼻全都有座標', use: '嘴巴開合當餵食、眨眼觸發事件、頭轉向控制視線，臉的大小可以理解成距離', lv: 2, prompt: '用 ml5.js 的 faceMesh 在 p5.js 顯示我的臉部關鍵點，接著計算嘴巴開合程度，變成 0 到 1 的訊號印在畫面上。', ref: 'ml5js.org（官方文件）' },
    { name: 'ml5.js handPose', zh: '手部骨架', what: '每隻手 21 個關鍵點，指尖、指節、手腕全都可讀', use: '捏合抓取、揮手驚擾、指尖軌跡畫線、手掌張合餵食', lv: 2, prompt: '用 ml5.js 的 handPose 在 p5.js 畫出我的手部骨架，接著計算拇指尖與食指尖的距離，做成捏合訊號。', ref: 'ml5js.org（官方文件）' },
    { name: 'MediaPipe Gesture Recognizer', zh: '手勢分類', what: '內建七種手勢直接辨識（另有一類代表無法辨識），握拳、張掌、比讚、比 V 都免訓練', use: '特定手勢觸發特定事件，例如張掌餵食、握拳驚嚇、比讚繁殖', lv: 2, prompt: '用 MediaPipe 的 Gesture Recognizer（JavaScript 版）辨識我的手勢，並在 p5.js 印出目前手勢名稱與信心值。', ref: 'MediaPipe（Google 開源）' },
    { name: 'ml5.js bodyPose', zh: '全身骨架', what: 'MoveNet 模型，17 個全身關鍵點，支援多人', use: '走近與離開（骨架大小）、揮臂、下蹲，多位觀眾同時互動', lv: 2, prompt: '用 ml5.js 的 bodyPose 在 p5.js 畫出全身骨架，接著用肩寬估計人離鏡頭多近，做成靠近訊號。', ref: 'ml5js.org（官方文件）' },
    { name: 'ml5.js bodySegmentation', zh: '人形剪影', what: '把人從背景分離出來，得到即時的輪廓遮罩', use: '觀眾的剪影直接成為棲地地形，生物沿著輪廓聚集或迴避', lv: 2, prompt: '用 ml5.js 的 bodySegmentation 取得我的人形遮罩，讓 p5.js 的粒子只在剪影邊緣聚集。', ref: 'ml5js.org（官方文件）' },
    { name: 'Frame Differencing', zh: '影格差（無模型）', what: '比較前後兩張影格的像素差，哪裡在動一目瞭然', use: '零載入、零模型、最穩定的動作偵測，生物避開有動靜的區域，經典創作手法', lv: 1, prompt: '用 p5.js 直接讀取攝影機畫面，比較前後影格的像素差，把運動量畫成格狀熱區，不要用任何機器學習模型。', ref: 'Golan Levin〈Computer Vision for Artists〉' },
    { name: 'Teachable Machine', zh: '自訓分類器', what: 'Google 的免費工具，拖拉樣本就能訓練自己的影像、姿勢、聲音分類器', use: '想辨識特定教具、姿勢或自訂手勢時，自己訓練，匯出後接 ml5 使用', lv: 2, prompt: '我用 Teachable Machine 訓練了姿勢分類模型（貼上匯出網址），請用 ml5.js 載入它，並在 p5.js 依分類結果切換生物的行為。', ref: 'teachablemachine.withgoogle.com' },
  ],
}


// 案例庫：期末專案的參照系（取得管道 2026-08 全查證）
export const CASE_GROUPS = [
  {
    cat: "沒有人類之後", hint: "M1 世界",
    items: [
      { name: "人類滅絕後", img: "book-after-man-tw.jpg", imgCredit: "台灣東販書封", by: "Dougal Dixon，1981", type: "書", what: "英文原書1981年出版，描繪人類滅絕後五千萬年地球動物演化的想像圖鑑", get: "繁中版台灣東販2020年出版，官網現無此書頁，圖書館或二手可尋", teach: "作者替每一種棲地推出一種動物。你的世界裡，哪一個棲地最空，最需要一種新生物？", facts: "Dougal Dixon的《After Man: A Zoology of the Future》1981年由St. Martin's Press出版，描繪人類滅絕五千萬年後地球哺乳類與鳥類演化出的假想動物。繁體中文版《人類滅絕後：未來地球的假想動物圖鑑》曾由台灣東販於2020年8月26日出版（譯者黃品玟），但現查證出版社官網該書頁已下架。", sources: ["https://openlibrary.org/search.json?q=After+Man+A+Zoology+of+the+Future+Dougal+Dixon", "https://www.abebooks.com/9780312011628/After-Man-Zoology-Future-Dougal-0312011628/plp"] },
      { name: "沒有我們的世界", img: "book-world-without-us.jpg", imgCredit: "Alan Weisman 官網（英文版書封）", by: "Alan Weisman，2007", type: "書", what: "英文原書2007年出版，探討人類消失後城市與生態系統將如何演變", get: "有繁中譯本，可到圖書館查詢借閱", teach: "人類消失後，你的城市裡哪一種建材最先崩壞、哪一種撐最久？這會留下什麼樣的棲地？", facts: "Alan Weisman的《The World Without Us》2007年由Thomas Dunne Books/St. Martin's Press在美國出版，透過訪談工程師、氣候學家等專家推演人類消失後基礎建設與生態系統的變化。繁體中文版確有譯本流通，但本次查證未能在出版社官方通路上找到書目紀錄，出版社名稱待國家圖書館書目資料庫進一步確認。", sources: ["https://openlibrary.org/books/OL24096382M/The_World_Without_Us", "https://www.bookrep.com.tw/index.php?md=gwindex&cl=press&at=press"] },
      { name: "Life After People", img: "life-after-people.jpg", imgCredit: "HISTORY 官網", video: "https://www.youtube.com/watch?v=ssi1SqVpUUw", videoTitle: "Life After People: Shaky Bridges | History", by: "HISTORY（History Channel）", type: "影集", what: "HISTORY頻道影集，推演人類全部消失後世界與建物的變化，共3季28集", get: "HISTORY官方YouTube播放清單（官方剪輯18段，台灣可看；官方另一份FULL EPISODES清單台灣被鎖區）", url: "https://www.youtube.com/playlist?list=PLob1mZcVWOaioqL7walgL9p5tPhyYYem0", teach: "影集用時間軸推演。你的世界在 10 年、100 年、1 萬年後，各長什麼樣子？", facts: "《Life After People》是HISTORY頻道製播的節目，前提為「如果地球上每個人類都消失了會發生什麼」，全系列共3季28集（history.com官方節目頁）。卡片提供的YouTube播放清單經oembed資料確認擁有頻道為官方帳號HISTORY（@HISTORY），清單內21部影片2026-09-18於台灣逐部實測，18部可播放，3部133分鐘的合輯版被鎖區。HISTORY另有一份FULL EPISODES播放清單，其中13部在台灣全數顯示「上傳者並未允許這部影片在你的國家/地區播放」，另13部已下架，故不採用。", sources: ["https://www.history.com/shows/life-after-people", "https://www.youtube.com/oembed?url=https://www.youtube.com/playlist?list=PLob1mZcVWOaioqL7walgL9p5tPhyYYem0&format=json"] },
      { name: "The Future Is Wild", img: "future-is-wild-series.jpg", imgCredit: "The Future Is Wild 官網", video: "https://www.youtube.com/watch?v=vm3LOneRR98", videoTitle: "The FUTURE is WILD Official Trailer", by: "The Future Is Wild 製作團隊", type: "影集", what: "官方稱3集紀錄片，各1小時，分述500萬、1億、2億年後三個時代的推測演化", get: "官方網站超連結確認為此YouTube官方頻道", url: "https://www.youtube.com/@OfficialTheFutureIsWild", teach: "三個時間點的生物差很多。你的物種如果再過一億年，會變成什麼？", facts: "官方網站documentary頁自述為3集、每集1小時，分別描繪500萬年（ICE WORLD）、1億年（HOTHOUSE WORLD）、2億年（NEW WORLD）後的地球，由BBC、ZDF、NHK、Animal Planet等頻道播出。官網另一頁面提及本企劃將於2026年12月屆滿30週年，但官方頁面未直接寫明電視首播年份為2002年，此點待進一步查證。", sources: ["https://www.thefutureiswild.com/documentary/", "https://www.thefutureiswild.com/elementor-1797/"] },
      { name: "《Stray》", img: "stray.jpg", imgCredit: "Annapurna Interactive 官方網站", video: "https://www.youtube.com/watch?v=4uP2MyUL49s", videoTitle: "STRAY | Launch Trailer", by: "BlueTwelve Studio，2022", type: "遊戲", what: "玩家操作一隻走失的貓，穿越只剩機器人的地下賽博城市尋路回家。", get: "Steam、PlayStation 等平台付費購買，台灣可直接結帳。", url: "https://annapurnainteractive.com/en/games/stray", teach: "如果讓觀眾扮演你的物種，牠的移動方式、視線高度、碰得到的東西，會跟人類有什麼不同？", facts: "《Stray》由法國團隊 BlueTwelve Studio 開發、Annapurna Interactive 發行，2022 年 7 月 19 日上市，使用 Unreal Engine 4 製作。故事設定在一座長年封閉的地下城市，人類已經消失，居民全是機器人，玩家扮演一隻與家人失散的貓，靠一台無人機夥伴 B-12 協助解謎逃脫。", sources: ["https://annapurnainteractive.com/en/games/stray", "https://store.steampowered.com/app/1332010/Stray"] },
      { name: "《Horizon Zero Dawn》", img: "horizon-zero-dawn.jpg", imgCredit: "PlayStation 官方網站（© Sony Interactive Entertainment LLC）", video: "https://www.youtube.com/watch?v=wzx96gYA8ek", videoTitle: "Horizon Zero Dawn - Launch Trailer | PS4", by: "Guerrilla Games，2017", type: "遊戲", what: "人類文明崩壞數百年後，機械化的野生動物取代真實動物成為生態系主角。", get: "PlayStation、Steam、Epic 付費購買，台灣有中文版。", url: "https://www.playstation.com/en-us/games/horizon-zero-dawn", teach: "把真實動物換成機械獸之後，誰吃誰、怎麼成群都要重新想。你的物種換了材質，獵食關係要怎麼改？", facts: "《Horizon Zero Dawn》由荷蘭阿姆斯特丹的 Guerrilla Games 開發，2017 年 2 月 28 日於 PS4 首發，是該工作室首款動作角色扮演遊戲。世界設定在遙遠未來，機械巨獸取代已滅絕的動物，倖存人類退回部落社會，玩家操作獵人愛洛伊（Aloy）追查文明毀滅的真相。", sources: ["https://www.playstation.com/en-us/games/horizon-zero-dawn", "https://www.guerrilla-games.com"] },
    ],
  },
  {
    cat: "想像另一種生命", hint: "M2 物種",
    items: [
      { name: "All Tomorrows", img: "all-tomorrows.jpg", imgCredit: "Eye Books Group（Wilton Square Books）書封", by: "C.M. Kosemen，2006", type: "書", what: "推測近未來到十億年後人類演化為多物種的命運，2006年由作者網路自行發表", get: "精裝版2025年11至12月出版，作者官網已下架免費全文，無繁中版", url: "https://www.eyebooksgroup.com/products/all-tomorrows", teach: "如果你的物種是人類的後代，牠還保留了人類的哪一個特徵？為什麼留下來？", facts: "《All Tomorrows》最早於2006年由作者C. M. Kösemen（當時筆名Nemo Ramjet）在個人網站自行發布PDF，內容推測人類演化為多個後裔物種、時間尺度上看跨越十億年。2025年英國Wilton Square Books將其製成精裝紙本正式出版，作者官網同時把原本免費下載的連結改為向出版社購買。", sources: ["http://www.cmkosemen.com/books.html", "https://web.archive.org/web/20061124141617/http://www.nemoramjet.com/alltomorrows.pdf", "https://www.eyebooksgroup.com/products/all-tomorrows"] },
      { name: "Expedition", img: "expedition.jpg", imgCredit: "Wayne Barlowe 官網（Daggerwrist）", by: "Wayne Barlowe，1990", type: "書", what: "1990年出版，描繪外星球Darwin IV生態的圖文書，作者身兼探勘畫家", get: "1990年原版已絕版，現有Echo Point重新發行版，亦可線上借閱", url: "https://waynebarlowe.com/artwork/expedition/", teach: "作者替整個星球設計食物鏈。你的物種在食物鏈的哪一層？誰吃牠、牠吃誰？", facts: "Wayne Barlowe的《Expedition: Being an Account in Words and Artwork of the 2358 A.D. Voyage to Darwin IV》1990年由Workman Publishing出版，以假想的2358年星際考察為敘事框架描繪外星球Darwin IV的生態系。原版長期絕版，作者官方網站明確寫著該書現由Echo Point Books and Media重新發行；Internet Archive也收藏1990年版原書全文供借閱：https://archive.org/details/expeditionbeinga0000barl。", sources: ["https://waynebarlowe.com/artwork/expedition/", "https://archive.org/details/expeditionbeinga0000barl"] },
      { name: "Scavengers Reign", img: "scavengers-reign.jpg", imgCredit: "HBO Max 官網", video: "https://www.youtube.com/watch?v=NWQH8cMpWTU", videoTitle: "Scavengers Reign | Official Trailer | Max", by: "2023 動畫影集", type: "影集", what: "講述貨運太空船船員受困外星球，呈現該星球的生態系", get: "原為Max（HBO Max）獨家影集，官方台灣站目錄查無此劇，應尚未在台上架", url: "https://www.titmouse.net/portfolio-item/scavengers-reign/", teach: "作品裡的生物彼此依存。你的物種要靠哪一種別的生物，才活得下去？", facts: "《Scavengers Reign》由Joseph Bennett與Charles Huettner共同創作，Titmouse, Inc.為Max（當時稱HBO Max）製作，2023年10月19日在Max首播。查證Max台灣官網，此劇專屬頁面回傳404、台灣站完整劇集目錄頁也未列出，判斷目前應未在台灣Max上架。", sources: ["https://www.titmouse.net/portfolio-item/scavengers-reign/", "https://www.hbomax.com/tw/zh/shows"] },
      { name: "風之谷", img: "nausicaa.jpg", imgCredit: "吉卜力工作室官網劇照（© 1984 Studio Ghibli・H）", video: "https://www.youtube.com/watch?v=zaskbIZtfxQ", videoTitle: "NAUSICAÄ OF THE VALLEY OF THE WIND | Official English Trailer", by: "宮崎駿", type: "動畫與漫畫", what: "腐海生態系，文明毀滅後菌類森林與王蟲共生，1984年宮崎駿執導動畫上映", get: "漫畫由台灣東販代理，電影由甲上娛樂發行（2025年在台重映）", url: "https://www.ghibli.jp/works/nausicaa/", teach: "腐海會改變它所在的土地。你的物種對牠的環境有沒有影響？是變好還是變壞？", facts: "《風の谷のナウシカ》電影版於1984年3月11日在日本上映，由宮崎駿原作、編劇、監督（Studio Ghibli官方作品頁所載，當時Studio Ghibli尚未成立）。台灣代理方面，漫畫由台灣東販發行，電影則由甲上娛樂於2025年3月6日在台重新上映。", sources: ["https://www.ghibli.jp/works/nausicaa/", "https://www.tohan.com.tw/product.php?act=view&id=1753"] },
      { name: "《Kunstformen der Natur》（自然界的藝術形態）", img: "haeckel.jpg", imgCredit: "Biodiversity Heritage Library（公有領域掃描）", by: "Ernst Haeckel，1904", type: "圖鑑", what: "海克爾繪製一百幅生物圖版，把水母、放射蟲等微小生物畫成對稱裝飾圖案。", get: "BHL 全書掃描公開瀏覽，公有領域，免費下載，不必借閱。", url: "https://www.biodiversitylibrary.org/bibliography/102214", teach: "海克爾把顯微鏡下的生物畫成對稱圖案。你的物種有哪些細節要保留，哪些可以簡化？", facts: "《Kunstformen der Natur》原以 10 期分冊在 1899 至 1904 年間出版，1904 年集結成書，共 100 幅石版印刷圖版，取材自海克爾自己的顯微鏡觀察與航海採集紀錄。圖中第 88 版名為〈Discomedusae〉（水母綱），呈現多種水母的傘狀與觸手構造，強調生物形態本身的幾何對稱。", sources: ["https://www.biodiversitylibrary.org/bibliography/102214", "https://www.biodiversitylibrary.org/page/33543670"] },
      { name: "《Codex Seraphinianus》", img: "codex-seraphinianus.jpg", imgCredit: "Rizzoli New York 官方書頁", by: "Luigi Serafini，1981", type: "書", what: "義大利藝術家自繪的百科全書，用無法破解的文字描述虛構世界的動植物。", get: "Rizzoli 官方書頁有介紹與購買資訊，台灣需代購或館際借閱", url: "https://www.rizzoliusa.com/book/9780847842131", teach: "這本書的文字沒人讀得懂，讀者只能靠圖認識生物。如果不能用文字，你要怎麼讓觀眾看懂你的物種？", facts: "《Codex Seraphinianus》1981 年由米蘭的 Franco Maria Ricci 首度出版，作者 Luigi Serafini 是建築師出身的藝術家，全書以自創的無法翻譯文字寫成，內容包含虛構的動物、植物、機械與人體構造圖。Rizzoli 於 2013 年推出重新設計的英文市場版，2021 年再推 40 週年紀念版。", sources: ["https://www.rizzoliusa.com/book/9780847842131", "https://www.rizzoliusa.com/book/9780847871049"] },
    ],
  },
  {
    cat: "另一種感官與心智", hint: "M2 設定 · M5 觀眾",
    items: [
      { name: "章魚，心智，演化", img: "book-octopus.jpg", imgCredit: "紅樹林出版書封", video: "https://www.youtube.com/watch?v=iENXfnOobzw", videoTitle: "The Octopus, the Sea, and the Deep Origins of Consciousness | Peter Godfrey Smith | Talks at Google", by: "Peter Godfrey-Smith", type: "書", what: "以章魚的演化與行為，探問心智與意識起源的另一種可能", get: "紅樹林出版繁體中文版，2017年9月，譯者王惟芬", teach: "如果思考不一定集中在頭部，你的物種的「判斷」發生在身體的哪裡？", facts: "原書英文書名為《Other Minds: The Octopus, the Sea, and the Deep Origins of Consciousness》，2016年由Farrar, Straus and Giroux出版（作者官網確認）。繁體中文版《章魚，心智，演化：探尋大海及意識的起源》由紅樹林出版，2017年9月發行，譯者王惟芬（國家圖書館ISBN全國新書資訊網CIP書目紀錄確認）。", sources: ["https://petergodfreysmith.com/publications", "https://us.macmillan.com/books/9780374537197/otherminds/"] },
      { name: "真菌微宇宙", img: "book-entangled-life.jpg", imgCredit: "果力文化書封", video: "https://www.youtube.com/watch?v=ZRFmCXBv5R4", videoTitle: "Merlin Sheldrake - How Fungi Make our Worlds", by: "Merlin Sheldrake", type: "書", what: "真菌地下網路連結生態與心智，可作菌絲型物種設計參考", get: "繁體中文版由果力文化出版，2021年與2025年各出一版，副標不同", url: "https://www.azothbooks.com/shop/rc0016r", teach: "真菌靠菌絲連成一大片。你的物種是一個一個的個體，還是一整片網路？", facts: "原書英文書名為《Entangled Life: How Fungi Make Our Worlds, Change Our Minds and Shape Our Futures》，2020年出版（作者官網確認）。繁體中文版由果力文化出版、周沛郁翻譯，國家圖書館CIP資料庫顯示先有2021年8月版（副標「看生態煉金師如何驅動世界、推展生命，連結地球萬物」），後有2025年6月版（副標「地球上最高生存智慧的『類神經』網絡，最優雅的生態鍊金師」），確為同一本書的改版重出。", sources: ["https://www.merlinsheldrake.com/entangled-life", "https://www.azothbooks.com/shop/rc0016r"] },
      { name: "五感之外的世界", img: "book-immense-world.jpg", imgCredit: "臉譜出版書封", video: "https://www.youtube.com/watch?v=dVPN165wz1Y", videoTitle: "The hidden world of animal senses – with Ed Yong", by: "Ed Yong，2022", type: "書", what: "動物各有獨特感知世界（Umwelt），可用來設計你的生物如何感受觀眾", get: "繁體中文版由臉譜出版，2023年8月，譯者孟令函", teach: "寫下一種你的物種有、人類沒有的感官。牠會用這個感官怎麼感覺到觀眾？", facts: "原書英文書名為《An Immense World: How Animal Senses Reveal the Hidden Realms Around Us》，2022年6月由Random House出版（作者官網與出版社官方書頁確認）。繁體中文版《五感之外的世界》由臉譜出版，2023年8月發行，譯者孟令函（國家圖書館CIP紀錄確認）。", sources: ["https://edyong.me/an-immense-world", "https://www.penguinrandomhouse.com/books/616914/an-immense-world-by-ed-yong/"] },
      { name: "黏菌解出東京鐵路網", img: "physarum-tokyo.jpg", imgCredit: "科学技術振興機構（JST）官方新聞稿", by: "Tero, A. 等，2010", type: "論文", what: "研究者讓沒有大腦的黏菌在仿關東地形的培養皿上覓食，長出的網路效率與東京鐵路網相當", get: "論文需訂閱下載，JST 官方新聞稿可免費讀圖文摘要。", url: "https://www.jst.go.jp/pr/info/info708/index.html", teach: "黏菌沒有大腦，只靠簡單規則一再重複就長出好用的網路。你的物種最簡單的判斷規則是什麼？", facts: "Tero 等人 2010 年發表於 Science（doi:10.1126/science.1177894）。研究者在培養皿上依關東地形擺放燕麥片代表城市，讓多頭絨泡黏菌從東京的位置向外生長，長出的管狀網路在成本、效率與抗斷線能力上與東京鐵路網相當。", sources: ["https://www.jst.go.jp/pr/info/info708/index.html", "https://api.crossref.org/works/10.1126/science.1177894"] },
      { name: "《A Foray into the Worlds of Animals and Humans》", img: "uexkull.jpg", imgCredit: "University of Minnesota Press 官方書頁", by: "Jakob von Uexküll，1934（2010 英譯本）", type: "書", what: "生物學家提出環境界概念，主張每種動物只活在牠感官能及的那部分世界。", get: "University of Minnesota Press 官方書頁，可館際借閱", url: "https://www.upress.umn.edu/9780816659005/a-foray-into-the-worlds-of-animals-and-humans", teach: "你的物種能感覺到什麼、感覺不到什麼？這條界線會怎麼改變牠的行為與外形？", facts: "原著《Streifzüge durch die Umwelten von Tieren und Menschen》由愛沙尼亞出生的生物學家 Jakob von Uexküll（1864–1944）於 1934 年出版，明尼蘇達大學出版社 2010 年推出 Joseph D. O'Neil 的新英譯本，收錄於 Posthumanities 系列。書中以蜱蟲為例，說明蜱蟲只感知光、體溫與汗酸氣味三種訊號，牠所建構的「環境界」與人類所見的世界完全不同。", sources: ["https://www.upress.umn.edu/9780816659005/a-foray-into-the-worlds-of-animals-and-humans"] },
    ],
  },
  {
    cat: "人工生命藝術", hint: "M3 到 M6 的同行前輩",
    items: [
      { name: "河口洋一郎《Growth Model》", img: "kawaguchi.jpg", imgCredit: "河口洋一郎作品，東京大學總合研究博物館小石川分館《BIOMECANICA》展（2011），出處intermediatheque.jp", by: "河口洋一郎，1982起", type: "作品", what: "河口洋一郎提出Growth Model演算法，讓造形依規則自動增殖生長", get: "ACM SIGGRAPH 歷史檔案人物頁與東京大學博物館展覽紀錄", url: "https://history.siggraph.org/person/yoichiro-kawaguchi", teach: "如果你的生物造形也用固定演算法生長，要怎麼讓觀眾在30秒內看出它正在「生長」？", facts: "河口洋一郎1982年在SIGGRAPH發表論文〈A morphological study of the form of nature〉，提出以幾何級數規則生成貝殼、獸角等自然造形的GROWTH演算法（DOI 10.1145/965145.801284，經Crossref核實，刊於SIGGRAPH Computer Graphics 16卷3期223–232頁）。他自1998年起任東京大學教授至2018年退休，2010年獲ACM SIGGRAPH Distinguished Artist Award for Lifetime Achievement in Digital Art（東京大學情報學環官方頁iii.u-tokyo.ac.jp、ACM SIGGRAPH History Archives official bio）。", sources: ["https://api.crossref.org/works/10.1145/965145.801284", "https://history.siggraph.org/person/yoichiro-kawaguchi", "https://www.intermediatheque.jp/ja/schedule/view/index/preevents/mode/PREEVENT/id/P_EVE0012", "https://www.iii.u-tokyo.ac.jp/research/180322ykawaguchi"] },
      { name: "William Latham《Mutator》", img: "latham.jpg", imgCredit: "Seaq1, William Latham, IBM, 1992，出處mutatorvr.co.uk", video: "https://vimeo.com/413899416", videoTitle: "Evolution of Form", by: "William Latham與Stephen Todd，1987–1993（IBM UK）", type: "作品", what: "William Latham與IBM工程師合作，讓造形依類基因規則在螢幕上一代代演化", get: "Latham 官方網站 mutatorvr.co.uk 的 IBM 專頁與官方影片", url: "https://mutatorvr.co.uk/ibm/", teach: "Mutator讓觀眾挑選喜歡的造形來決定下一代演化方向，你的物種設定要不要也讓觀眾的選擇改變生長或演化的走向？", facts: "mutatorvr.co.uk官方IBM專頁記載，William Latham與Stephen Todd自1987至1993年在英國溫徹斯特IBM UK Scientific Centre合作發展這套演化造形系統，同頁列出《Evolutionary Art and Computers》即Stephen Todd與William Latham於1992年出版的專書（OpenLibrary記錄OL3990144W）。Latham現為Goldsmiths, University of London電腦系教授，官方頁面列出Mutator VR（2016–2020）曾在龐畢度中心（2020）、林茲Ars Electronica藝術節（2017）展出（gold.ac.uk教職員頁）。", sources: ["https://mutatorvr.co.uk/ibm/", "https://www.gold.ac.uk/computing/people/w-latham", "https://openlibrary.org/works/OL3990144W", "https://doi.org/10.1162/leon_a_01857"] },
      { name: "Strandbeest", img: "strandbeest.jpg", imgCredit: "Theo Jansen 官網（攝影 Loek van der Klis）", video: "https://www.youtube.com/watch?v=C97kMKwZ2-g", videoTitle: "STRANDBEEST EVOLUTION 2021", by: "Theo Jansen", type: "作品", what: "風力驅動的塑膠管海灘生物，1990年起演化至今，已分12個演化期", get: "官方網站，含族譜與12個演化期介紹", url: "https://www.strandbeest.com", teach: "這些生物用風和管子活在沙灘上。你的物種一定要待在螢幕裡嗎？", facts: "Theo Jansen自1990年起以黃色塑膠管打造骨架，做出靠風力行走的Strandbeest，迄今已演化出12個時期（依官網Evolution頁的結構特徵分期）。官網族譜也記載最早的生命形式Vermiculus Antramentum（1989）原本只存在電腦螢幕上，之後才發展成實體海灘生物。", sources: ["https://www.strandbeest.com"] },
      { name: "Evolved Virtual Creatures", img: "case-karl-sims.jpg", imgCredit: "Karl Sims 官網", video: "https://www.youtube.com/watch?v=RZtZia4ZkX8", videoTitle: "Evolved Virtual Creatures (1994)", by: "Karl Sims，1994", type: "作品", what: "用遺傳演算法演化虛擬生物的游泳、行走、跳躍等行為，1994年SIGGRAPH發表", get: "官方頁，含1994年SIGGRAPH原始影片連結", url: "https://www.karlsims.com/evolved-virtual-creatures.html", teach: "如果讓電腦演化你的物種，你會出什麼考驗題？考驗改了，身體會怎麼跟著變？", facts: "Karl Sims於1994年在SIGGRAPH發表論文與影片《Evolving Virtual Creatures》，在電腦中建立數百隻虛擬生物族群，用遺傳演算法反覆選拔、複製、突變其虛擬基因，演化出游泳、行走、跳躍、追逐與爭奪方塊等行為。遺傳演算法本身是John Holland於1970年代提出的既有技術，Sims是應用者而非發明者。", sources: ["https://www.karlsims.com/evolved-virtual-creatures.html"] },
      { name: "A-Volve", img: "case-a-volve.jpg", imgCredit: "Sommerer & Mignonneau，林茲藝術大學官網", video: "https://www.youtube.com/watch?v=0WG45k93pCA", videoTitle: "A-Volve", by: "Sommerer & Mignonneau，1994", type: "作品", what: "觀眾用觸控螢幕畫形狀，生物在水池中游動、掠食與交配，1994年東京ICC首展", get: "官方頁，現由林茲藝術大學（UfG Linz）典藏", url: "https://interface.ufg.ac.at/christa-laurent/A-Volve.html", teach: "觀眾畫出生物、把手伸進水裡保護牠。你的作品裡，觀眾能改變什麼？", facts: "A-Volve由Christa Sommerer與Laurent Mignonneau於1994年在東京ICC-NTT Intercommunication Gallery首展。觀眾在觸控螢幕手繪二維形狀，系統即時生成對應的虛擬三維生物放進實體水池中依外形游動，生物可因觸摸逃離、可交配產生帶雙親基因的後代，也可能因飢餓、死亡或被掠食而消亡。", sources: ["https://interface.ufg.ac.at/christa-laurent/A-Volve.html"] },
      { name: "Karl Sims《Galápagos》", img: "sims-galapagos.jpg", imgCredit: "© Karl Sims，karlsims.com（Galápagos 於東京 ICC 展場實景）", by: "Karl Sims，1997", type: "作品", what: "觀眾踩踏感應墊為螢幕上的虛擬生物投票，中選者存活、交配、產生突變後代", get: "官方頁 karlsims.com/galapagos，裝置已下展", url: "https://www.karlsims.com/galapagos/", teach: "這件作品讓觀眾的喜好決定誰活下來。如果你的動物園也讓觀眾挑選，牠們會往哪個方向演化？", facts: "Karl Sims於1997年為東京NTT ICC打造《Galápagos》，十二台電腦各自演化一隻3D虛擬生物並顯示於弧形排列的螢幕。觀眾站上感應踏墊選擇喜歡的生物，中選者存活、交配並產生帶隨機突變的後代，未中選者遭淘汰後由新後代取代。裝置1997至2000年於ICC展出，1999年也在美國DeCordova美術館展出。", sources: ["https://www.karlsims.com/galapagos/", "https://www.karlsims.com/galapagos/decordova-text.html"] },
      { name: "Emissaries", img: "emissaries.jpg", imgCredit: "Ian Cheng 官網", video: "https://www.youtube.com/watch?v=XFmMrcW2ZsM", videoTitle: "Ian Cheng: BOB, Emissaries | Serpentine", by: "Ian Cheng", type: "作品", what: "MoMA官方形容為會自己玩下去的電子遊戲，模擬持續演化為自成一體的生態系", get: "MoMA PS1展覽頁，2017年4至9月於紐約展出的Emissary三部曲", url: "https://www.moma.org/calendar/exhibitions/3656", teach: "作品沒人看的時候也在繼續演。你的動物園沒有觀眾時，生物在做什麼？", facts: "MoMA PS1於2017年4月9日至9月24日展出Ian Cheng首次美國美術館個展《Emissaries》，呈現以電玩引擎製作的Emissary三部曲（2015–17）。MoMA官方頁面形容作品是「a video game that plays itself」，模擬會無限演化成自成一體的生態系，三部曲已由MoMA典藏。", sources: ["https://www.moma.org/calendar/exhibitions/3656"] },
      { name: "林珮淳《夏娃克隆創造計畫 I》", img: "lin-eve-clone.jpg", imgCredit: "林珮淳提供，linpeychwen.com", by: "林珮淳，2016", type: "作品", what: "以3D動畫重現創造夏娃克隆的過程，將維特魯威人與人獸合體美女疊合演變", get: "官方頁 linpeychwen.com作品頁，9分鐘錄像裝置，無公開線上播放", url: "https://linpeychwen.com/making-of-eve-clone-i/", teach: "這件作品把身體被創造的過程做成作品。你的物種被設計出來的過程，有哪一段值得讓觀眾看見？", facts: "林珮淳2016年完成《Making of Eve Clone I》，是一件片長9分鐘的3D動畫暨聲音裝置。作品挪用達文西《維特魯威人》，畫面從線稿逐步旋轉演變成人形皮膚、金屬皮膚、全像式綠光皮膚，最後成為《但以理書》所述金頭銀身銅腹鐵腿的巨像身體，比喻科技文明以人形創造夏娃克隆。該作2019年獲義大利佛羅倫斯雙年展新媒體藝術類首獎。", sources: ["https://linpeychwen.com/making-of-eve-clone-i/"] },
      { name: "池上高志、石黒浩《Alter》", img: "ikegami-alter.jpg", imgCredit: "Alter, 2018, 出處Ars Electronica S+T+ARTS Prize官方頁ars.electronica.art", video: "https://www.youtube.com/watch?v=lhIASPh94yE", videoTitle: "パネルトーク　～生命らしさを持つ機械人間「オルタ(Alter)」", by: "池上高志、石黒浩，2016", type: "作品", what: "池上高志與石黒浩合作機器人，靠中樞模式產生器與類神經網路即時生成動作", get: "Ars Electronica 官方作品頁與日本科學未來館官方影片", url: "https://ars.electronica.art/starts-prize/en/alter", teach: "Alter靠感測器訊號即時牽動類神經網路產生動作，沒有固定動作腳本，你的生物要不要也拿掉『固定動畫循環』改成即時規則生成？", facts: "Ars Electronica S+T+ARTS Prize官方頁記載，Alter由大阪大學石黒浩、東京大學池上高志、小川浩平、土井樹輝共同開發，機身42組氣動致動器由中樞模式產生器（CPG）與模擬1000個神經細胞的類神經網路即時驅動，動作不預先寫定，2018年獲S+T+ARTS Prize卓越獎（Award of Distinction）。日本科學未來館官方YouTube頻道（MiraikanChannel）2016年9月上傳的座談影片說明，該座談於2016年8月6日在科學未來館舉行，主題即為Alter開發團隊對談。", sources: ["https://ars.electronica.art/starts-prize/en/alter", "https://www.youtube.com/watch?v=lhIASPh94yE", "https://www.sacral.c.u-tokyo.ac.jp/project/art-projects", "https://www.miraikan.jst.go.jp/lab/facilities/AndroidALTER/"] },
      { name: "Graffiti Nature", img: "graffiti-nature.jpg", imgCredit: "teamLab 官網", video: "https://www.youtube.com/watch?v=OomhbW3bffs", videoTitle: "Graffiti Nature", by: "teamLab", type: "作品", what: "官方描述為觀眾所繪生物構成的生態系，彼此捕食與繁衍，吃不夠或被吃掉就會消失", get: "teamLab官方作品頁，常設展於京都與新加坡", url: "https://www.teamlab.art/w/graffitinature/", teach: "觀眾畫的生物會進入同一個生態系。你的動物園要不要讓觀眾也放生物進來？", facts: "teamLab的《Graffiti Nature》（2016年起）是由觀眾繪製的生物構成的互動生態系，觀眾在紙上畫生物並掃描，生物會投影到展場中彼此捕食與繁衍，吃不夠或被吃掉就會消失。根據官方頁面的關聯展覽資訊，目前常設展出於日本teamLab Biovortex Kyoto（2025年10月起）與新加坡ArtScience Museum的Future World常設展（2016年3月起）。", sources: ["https://www.teamlab.art/w/graffitinature/"] },
      { name: "Pierre Huyghe《After ALife Ahead》", img: "huyghe-after-alife.jpg", imgCredit: "攝影 Ola Rindal，Esther Schipper 畫廊提供", by: "Pierre Huyghe，2017", type: "作品", what: "把停業溜冰場改造成會隨時間演化的生物科技系統，內含培養細胞、蜂巢與水族箱", get: "官方典藏頁 skulptur-projekte-archiv.de，裝置已不存在", url: "https://skulptur-projekte-archiv.de/en-us/2017/projects/186", teach: "這件作品裡的環境本身是活的，展期間一直在變。你的棲地裡，有哪些東西是你也控制不了的？", facts: "2017年明斯特雕塑計畫展中，法國藝術家Pierre Huyghe把明斯特Steinfurterstraße 113–115一座2016年停業的室內溜冰場改造成裝置《After ALife Ahead》。他鑿開混凝土地面，底下設有培養中的人類癌細胞、細菌與藻類群落、蜂巢，以及內含GloFish與芋螺的水族箱，並用擴增實境與可自動開闔的天花板玻璃裝置串連這些生命歷程。裝置僅在展覽期間存在，如今已不存在。", sources: ["https://skulptur-projekte-archiv.de/en-us/2017/projects/186", "https://www.estherschipper.com/exhibitions/448-after-alife-ahead-pierre-huyghe"] },
      { name: "Neural Zoo", img: "neural-zoo.jpg", imgCredit: "Sofia Crespo 官網", video: "https://www.youtube.com/watch?v=80LCWXh4FfM", videoTitle: "AI-Generated Creatures That Stretch the Boundaries of Imagination | Sofia Crespo | TED", by: "Sofia Crespo", type: "作品", what: "用卷積神經網路生成的想像生物影像，創作期間2018至2022年，探討自然與資料重組", get: "官方網站，含作品年份與技術說明", url: "https://sofiacrespo.com/neural-zoo", teach: "用 AI 生成的生物，怎麼判斷牠合不合理？你會用什麼標準檢查自己的物種？", facts: "Sofia Crespo的Neural Zoo創作於2018至2022年間，用卷積神經網路（CNN）生成外觀類似自然生物、實為重新排列的想像影像，探討創意是否只是已知元素的重組。", sources: ["https://sofiacrespo.com/neural-zoo"] },
      { name: "fishdraw", img: "fishdraw.jpg", imgCredit: "Lingdong Huang，GitHub fishdraw（MIT）", by: "Lingdong Huang", type: "開源", what: "程序生成的魚類插畫程式，輸出折線供繪圖機使用，單一檔案無外部依賴", get: "GitHub repo，LICENSE檔標示MIT授權，2021年首次提交", url: "https://github.com/LingDong-/fishdraw", teach: "一套規則畫出一整族魚。你的物種要靠哪幾個參數，才能生出彼此不同的個體？", facts: "GitHub帳號LingDong-（Lingdong Huang）於2021年建立fishdraw repo，README描述為程序生成魚類插畫程式，可輸出svg/json/csv等折線格式，單一檔案無外部依賴，以繪圖機（plotter）為主要用途。LICENSE檔確認為MIT授權，著作權標示Copyright (c) 2021 Lingdong Huang。", sources: ["https://github.com/LingDong-/fishdraw", "https://raw.githubusercontent.com/LingDong-/fishdraw/master/LICENSE"] },
    ],
  },
  {
    cat: "遊戲裡的生態", hint: "把生態當主角的遊戲",
    items: [
      { name: "Rain World", img: "rain-world.jpg", imgCredit: "Steam 官方商店頁", video: "https://www.youtube.com/watch?v=kMfWWQJx0dE", videoTitle: "Rain World Trailer | Fate of a Slugcat | Adult Swim Games", by: "Videocult", type: "遊戲", what: "整個世界是模擬生態系，每隻生物各有生存目標，玩家只是食物鏈一環", get: "Steam 商店頁目前上架販售，發行商為 Akupara Games", url: "https://store.steampowered.com/app/312520/Rain_World/", teach: "每隻生物都有自己的生存目標。觀眾不在時，你的物種在追求什麼？", facts: "Rain World由Videocult開發，2017年3月28日發售，Steam商店頁標示發行商為Akupara Games。目前該商店頁仍可購買，有基礎版、豪華版與含DLC合集等選項在架上。", sources: ["https://store.steampowered.com/app/312520/Rain_World/"] },
      { name: "Spore", img: "spore.jpg", imgCredit: "Steam 官方商店頁", video: "https://www.youtube.com/watch?v=zi2GvqboQfY", videoTitle: "Spore Trailer", by: "Maxis／Electronic Arts，2008", type: "遊戲", what: "生物創造工具加五個演化階段：細胞、生物、部落、文明、太空", get: "Steam 商店頁目前上架販售，開發商為 Maxis，發行商為 EA", url: "https://store.steampowered.com/app/17390/SPORE/", teach: "遊戲把演化分成幾個階段。你的物種從出生到死亡，分成哪幾個階段？", facts: "SPORE由Maxis開發、Electronic Arts發行，2008年12月19日發售，Steam官方頁面列出五個演化階段：Cell、Creature、Tribe、Civilization、Space。", sources: ["https://store.steampowered.com/app/17390/SPORE/", "https://www.ea.com/games/spore"] },
      { name: "Everything", img: "everything.jpg", imgCredit: "Steam 官方商店頁", video: "https://www.youtube.com/watch?v=aIMlcRCjjPw", videoTitle: "Double Fine Presents: Everything by David OReilly - Launch Trailer", by: "David OReilly", type: "遊戲", what: "你可以化身宇宙萬物，從細菌到星系，由 Alan Watts 的哲學旁白貫穿", get: "Steam 商店頁目前上架，發行為 David OReilly、PLAYISM", url: "https://store.steampowered.com/app/582270/Everything/", teach: "視角可以從細菌切到星系。你的動物園要用什麼尺度讓觀眾看牠？", facts: "Everything由David OReilly開發，2017年最初以Double Fine Presents旗下作品名義發行，同年4月21日登上Steam。Steam商店頁「About This Game」原文寫道遊戲由Alan Watts的哲學旁白貫穿（narrated by the inspiring philosophy of Alan Watts），目前Steam頁面列出的發行方為David OReilly本人與PLAYISM（Japan）。", sources: ["https://store.steampowered.com/app/582270/Everything/", "https://www.doublefine.com/news/everything-from-david-oreilly-is-out-on-march-21st"] },
      { name: "《Niche》", img: "niche.jpg", imgCredit: "Stray Fawn Studio，Steam 官方商店頁遊戲截圖", video: "https://www.youtube.com/watch?v=nKOao3U-QVQ", videoTitle: "Niche - a genetic survival game, Gameplay Teaser", by: "Stray Fawn Studio，2017", type: "遊戲", what: "依真實孟德爾遺傳學交配選育貓狐熊犬混合外貌物種，撐過天災與掠食者", get: "Steam 與 Nintendo Switch 上架販售", url: "https://store.steampowered.com/app/440650/Niche__a_genetics_survival_game", teach: "這款遊戲把繁殖寫成可以計算的基因規則。你的物種的基因要用哪幾個數字記錄？", facts: "Stray Fawn Studio的《Niche - a genetics survival game》2016年由Kickstarter集資、於2017年9月21日正式發售。玩家依真實遺傳學機制（顯性隱性、共顯性、基因流動、遺傳漂變、天擇與性擇）替一群貓狐熊犬混合外貌的動物選育基因，讓牠們撐過掠食者、氣候變遷與疾病，物種滅絕遊戲就結束。", sources: ["https://store.steampowered.com/app/440650/Niche__a_genetics_survival_game", "https://strayfawnstudio.com/presskit/sheet.php?p=niche_a_genetics_survival_game"] },
      { name: "《Thrive》", img: "thrive.jpg", imgCredit: "Revolutionary Games Studio，Steam 官方商店頁遊戲截圖", video: "https://www.youtube.com/watch?v=LmIwSBvXGQA", videoTitle: "Thrive Microbe Stage Trailer", by: "Revolutionary Games Studio，2013起", type: "開源", what: "從潮池單細胞開始，玩家編輯自己物種身體並在多階段中持續演化求生", get: "官方網站與 GitHub 免費下載，原始碼 GPL 授權，也有 Steam 版", url: "https://revolutionarygamesstudio.com/", teach: "這款遊戲讓玩家一塊一塊編輯身體。你的物種的身體可以拆成哪幾個部分，各由哪個基因決定？", facts: "Revolutionary Games Studio自2013年起開發《Thrive》，是一款完全免費、開源（GPL授權）的演化模擬遊戲，玩家從潮池中的單細胞開始，親自編輯物種的身體構造，並經歷細胞、多細胞等預定九個演化階段。目前只有微生物階段（Microbe Stage）完整可玩，原始碼公開在GitHub的Revolutionary-Games組織下。", sources: ["https://revolutionarygamesstudio.com/", "https://github.com/Revolutionary-Games/Thrive", "https://store.steampowered.com/app/1779200/Thrive"] },
      { name: "《Equilinox》", img: "equilinox.jpg", imgCredit: "ThinMatrix，Steam 官方商店頁遊戲截圖", video: "https://www.youtube.com/watch?v=XuTXzLZMLUE", videoTitle: "Equilinox - Launch Trailer", by: "ThinMatrix，2018", type: "遊戲", what: "在沙盒地圖種植與飼養上百種動植物，基因改造物種讓生態系持續演化", get: "Steam 上架販售", url: "https://store.steampowered.com/app/853550/Equilinox", teach: "玩家像園丁一樣調整生態平衡。你的動物園裡，觀眾能調整哪一個參數？", facts: "獨立開發者ThinMatrix的《Equilinox》於2018年11月23日在Steam發售，售價US$9.99。玩家在沙盒地圖上栽種與飼養上百種動植物，經營一個會自行演化的生態系，也能在創作模式基因改造物種的顏色、大小與行為做出變種。", sources: ["https://store.steampowered.com/app/853550/Equilinox", "https://www.youtube.com/watch?v=XuTXzLZMLUE"] },
    ],
  },
]

export const CASE_NOTE =
  '看每一個案例時，問自己四件事：它的世界規則是什麼（時間、環境、能量從哪裡來）？它的生物怎麼活、怎麼繁殖、怎麼跟別的東西互動？觀眾或玩家在裡面扮演什麼角色？有哪一個做法可以直接拿回你的物種或動物園用？使用建議：M1 開工前先看 Life After People 任一集與 The Future Is Wild 預告片，時間尺度的直覺就有了，有空再讀《沒有我們的世界》任一章。M2 卡關時翻《人類滅絕後》或《All Tomorrows》，看別人怎麼用規則推物種，再回來推自己的。M5 設計互動前讀《五感之外的世界》序章，先想牠的環境界（Umwelt），再想牠怎麼感覺人。案例用來參照，看完要回答的問題始終是：在你的世界，牠憑什麼活下來。'

export const AI_RULES = [
  { t: '研究先行', d: '動手做之前，先讓你的 AI 進行深度研究：比較做法與工具、開源穩定熱門優先，並查證來源，合成答案只當路標，關鍵事實回原始出處確認。' },
  { t: '驗證是你的工作', d: 'AI 是機率性的，會一本正經地錯，它給的每段程式碼、每個事實，跑過、查過才算數。' },
  { t: '完整揭露', d: '每份交付註明工具、日期、prompt 摘要、採用範圍，沒用到就寫「未使用」。本專案獎勵透明，不獎勵僥倖，誠實揭露永遠不是問題。' },
  { t: '把牠說完整', d: '最後你要能完整說出你的物種：牠活在怎樣的世界、為什麼長成這樣、你做了哪些選擇，以及牠最後呈現出什麼樣子。這個專案看重的是你怎麼思考牠的生命、做得多完整、呈現出什麼。' },
  { t: '反思自己寫', d: '反思、設計理由、研究報告的結論要是你自己的想法，AI 只能幫你調整結構與文句。' },
]

export const TOOLS = [
  { name: 'p5.js 網頁編輯器', role: '創作環境，全程的畫布與閱讀對象', cost: '免費', note: 'editor.p5js.org，瀏覽器打開就能寫，全程用它', main: true },
  { name: 'agy（Google Antigravity CLI）', role: '終端機裡的 AI 代理，上課用它', cost: '免費起', note: '個人 Google 帳號登入就能用，免費帳號額度每週重置，第 2 週（9/17）課堂上一起安裝，步驟見開工準備', main: true },
  { name: 'AI 訂閱（選配）', role: '額度不夠時再加', cost: '免費起，Google AI Pro NT$650/月', note: '先用 agy 免費帳號上手，額度常常不夠再訂 Google AI Pro，agy 額度會改成每五小時重置。已經有 Claude Pro 或 ChatGPT 帳號的同學不用再訂，終端機改用 Claude Code 或 Codex', main: false },
  { name: 'GitHub（Education 驗證）', role: '交付與作品集', cost: '免費', note: '最先辦註冊與學生驗證，交付用 GitHub Desktop，Copilot Free 含終端機版可當備援', main: false },
]

export const SETUP_ACCOUNTS = [
  {
    t: 'GitHub 帳號與學生驗證',
    d: '到 github.com 註冊，再到 github.com/education 用學校信箱與學生證申請學生驗證，審核需要數天到數週，最先辦。驗證後 Codespaces 額度升級為每月 180 core-hours，並附整包 Student Pack。',
    url: 'https://github.com/education',
  },
  {
    t: '個人 Google 帳號（登入 agy 用）',
    d: '用個人帳號，學校信箱的 Google 帳號可能登不進去。免費帳號就能先用，常用再訂 Google AI Pro（NT$650/月），經濟上不方便的同學直接找老師。',
    url: 'https://gemini.google/tw/subscriptions/',
  },
  {
    t: 'Claude 或 ChatGPT（已經有帳號才需要）',
    d: '已經在用 Claude 或 ChatGPT 的同學，可以改用 Claude Code（要 Claude Pro 以上）或 Codex（ChatGPT 免費與 Go 方案可做輕量任務）當終端機代理，安裝指令在本節下方，沒有的不用另外申請。',
    url: 'https://claude.ai',
  },
  {
    t: 'Discord 課程頻道',
    d: '公告、卡點與交 repo 網址都在課程 Discord 的「物件導向程式設計」頻道。還沒加入或看不到這個頻道，上課時直接跟老師或助教說。',
    url: 'https://discord.com/download',
  },
  {
    t: 'p5.js 網頁編輯器',
    d: '到 editor.p5js.org 用 GitHub 帳號直接登入，草稿存在雲端，任何電腦打開都在。',
    url: 'https://editor.p5js.org',
  },
]

// 每個人都要做：開作品集 repo，用 GitHub Desktop 下載到筆電（選單名稱依 GitHub Desktop 原始碼核對，2026-09-17）
export const REPO_SETUP = [
  { t: '從課程 template 開 repo', d: '打開課程 template repo，按「Use this template」再選「Create a new repository」，選 Public，名字自己取。整學期的物種、工作流與交付都放在這裡。', url: 'https://github.com/chenweichiang/oop-portfolio-template' },
  { t: '裝 GitHub Desktop 並登入', d: '下載安裝 GitHub Desktop，用你的 GitHub 帳號登入。它負責把 repo 下載到筆電，也負責把作品交上去，全程不用打 git 指令。', url: 'https://desktop.github.com/' },
  { t: '把 repo 下載到筆電', d: '在 GitHub Desktop 選 File → Clone repository，挑你剛開的 repo，存放位置用預設的「文件」裡的 GitHub 資料夾，按 Clone。agy 之後就在這個資料夾裡工作。' },
  { t: '做完就交上去', d: '回到 GitHub Desktop，左下角寫一句這次做了什麼，按藍色的 Commit 按鈕（上面會寫 to main），再按上方的 Push origin，到 repo 網頁按重新整理，看到檔案就是交付完成。' },
]

// 已經有 Claude 或 ChatGPT 帳號的同學：指令依官方文件（code.claude.com/docs/en/setup、github.com/openai/codex README，2026-09-17 核對）
export const OTHER_CLI = {
  intro: '已經在用 Claude 或 ChatGPT 的同學，可以改用 Claude Code 或 Codex，一樣在作品集 repo 資料夾裡啟動。三個工具都讀得到課堂公約：agy 與 Codex 會讀 AGENTS.md，Claude Code 會讀 CLAUDE.md，template 的 CLAUDE.md 第一行就把 AGENTS.md 接進來。',
  tools: [
    { name: 'Claude Code', need: '要 Claude Pro 以上的訂閱，免費方案不能用', mac: 'curl -fsSL https://claude.ai/install.sh | bash', win: 'irm https://claude.ai/install.ps1 | iex', run: 'claude', url: 'https://code.claude.com/docs/en/setup' },
    { name: 'Codex', need: '用 ChatGPT 帳號登入，免費與 Go 方案可做輕量任務，常用要 Plus 以上', mac: 'curl -fsSL https://chatgpt.com/codex/install.sh | sh', win: 'powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"', run: 'codex', url: 'https://github.com/openai/codex' },
  ],
  source: '指令依 Anthropic 與 OpenAI 官方文件整理（2026-09-17 核對），Windows 指令在 PowerShell 執行，官方若有更新以官方頁為準。',
}

export const SETUP_USAGE = [
  { t: '什麼時候用', d: '筆電不在身邊、要在學校電腦上工作時，用瀏覽器開雲端工作室，學校電腦被還原也不受影響。Codespace 目前只預裝 Claude Code，要有 Claude 訂閱才能在裡面用 AI 代理。' },
  { t: '開啟雲端環境', d: '進入你的 repo，按綠色 Code 按鈕，選 Codespaces 並建立，幾十秒後瀏覽器出現 VS Code，這就是你的工作室。' },
  { t: '登入 Claude Code', d: '在下方終端機輸入 claude，在登入網址上連點三下全選複製，開新分頁授權，再把授權碼貼回終端機，登入一次之後環境都記得你。' },
  { t: '在 Codespace 裡交付', d: '左側 Source Control（樹枝圖示）寫一句這次做了什麼，按 Commit，再按 Sync Changes。回到筆電時，在 GitHub Desktop 按 Fetch origin 再按 Pull origin，把雲端做的拿回來。' },
  { t: '三個習慣', d: '固定用 2-core 機型額度才夠，做完一定交付，因為閒置三十天 codespace 會被回收，repo 裡的東西才會留下來，離開前記得關掉 codespace 節省額度。沒有筆電、也沒有 Claude 訂閱的同學，上課時直接找老師個別安排。' },
]

// agy（Google Antigravity CLI）安裝：指令依官方文件 antigravity.google/docs/cli/install（2026-09-17 核對）
export const AGY_INSTALL = {
  intro:
    '本學期上課用 agy（Google Antigravity CLI），它是終端機裡的 AI 代理，會自己讀檔、改檔、跑指令，用個人 Google 帳號登入就能用。Gemini CLI 從 2026 年 6 月 18 日起不再服務個人帳號，網路上教 npm install -g @google/gemini-cli 的舊教學都不要照做。agy 要在作品集 repo 資料夾裡啟動，才讀得到 AGENTS.md 裡的課堂公約，所以先照上面把 repo 下載到筆電。',
  platforms: [
    {
      os: 'Mac',
      shell: '終端機',
      open: '打開「終端機」：在「應用程式」的「工具程式」資料夾裡，或按 ⌘＋空白鍵搜尋 Terminal。',
      steps: [
        { t: '安裝：整行複製、貼上，按 Enter', cmd: 'curl -fsSL https://antigravity.google/cli/install.sh | bash' },
        { t: '關掉終端機視窗，重開一個新的，出現版本號就是裝好了', cmd: 'agy --version' },
        { t: '進到作品集 repo 資料夾：在 GitHub Desktop 選 Repository → Open in Terminal，終端機會直接開在 repo 裡，可以跳到第 4 步。想自己進去就輸入下面這行，把「你的repo名」換成自己的', cmd: 'cd ~/Documents/GitHub/你的repo名' },
        { t: '啟動 agy，第一次會請你登入', cmd: 'agy' },
      ],
      where: '裝在 ~/.local/bin/agy，只動你自己的家目錄，不用輸入系統管理員密碼，Apple 晶片與 Intel 的 Mac 都支援。',
    },
    {
      os: 'Windows',
      shell: 'PowerShell',
      open: '打開 PowerShell：按開始功能表搜尋 PowerShell，一般權限打開就好，不用「以系統管理員身分執行」。',
      steps: [
        { t: '安裝：整行複製、貼上，按 Enter', cmd: 'irm https://antigravity.google/cli/install.ps1 | iex' },
        { t: '關掉 PowerShell，重開一個新的，出現版本號就是裝好了', cmd: 'agy --version' },
        { t: '進到作品集 repo 資料夾：在 GitHub Desktop 選 Repository → Open in Command Prompt，視窗會直接開在 repo 裡，可以跳到第 4 步。想在 PowerShell 自己進去就輸入下面這行，把「你的repo名」換成自己的（「文件」被 OneDrive 接管的電腦路徑不同，用選單最保險）', cmd: 'cd "$HOME\\Documents\\GitHub\\你的repo名"' },
        { t: '啟動 agy，第一次會請你登入', cmd: 'agy' },
      ],
      alt: {
        t: '習慣用「命令提示字元」（CMD）的話，第 1 步改貼這一行',
        cmd: 'curl -fsSL https://antigravity.google/cli/install.cmd -o install.cmd && install.cmd && del install.cmd',
      },
      where: '裝在 %LOCALAPPDATA%\\agy\\bin，裝在自己的使用者資料夾，x64 與 ARM 的 64 位元 Windows 都支援。',
    },
  ],
  firstRun: [
    { t: '第一次輸入 agy', d: '依序選配色、登入方式選 Google OAuth、在跳出的瀏覽器登入個人 Google 帳號（畫面若給你一串授權碼，就複製貼回終端機），最後確認信任這個資料夾。' },
    { t: '說找不到 agy 這個指令', d: '先關掉終端機重開，從 GitHub Desktop 開的視窗要把 GitHub Desktop 也關掉重開。還是不行就把安裝位置加進 PATH，Mac 是 ~/.local/bin，Windows 是 %LOCALAPPDATA%\\agy\\bin，卡住就帶著畫面來找老師。' },
    { t: '它有沒有讀到課堂公約', d: 'agy 啟動時會自動讀 repo 最上層的 AGENTS.md。開工先問它「AGENTS.md 裡的課堂公約有哪幾條」，答得出來就是讀到了。比較早開 repo、只有 CLAUDE.md 的同學，請它把 CLAUDE.md 複製一份成 AGENTS.md，再交上去。' },
    { t: '改檔前會先給你看', d: 'agy 預設在改檔、建檔前先顯示差異，等你同意才動手。按 Shift+Tab 會在預設、自動接受修改、先規劃三種模式之間切換，第一週維持預設，看懂它每一步再放手。' },
    { t: '學校信箱的 Google 帳號登不進去', d: '改用個人 Google 帳號，這是老師實際遇過的狀況。' },
    { t: '想先看它打算怎麼做', d: '輸入 /plan 請它先給計畫，輸入 /help 可以看所有指令與快捷鍵。' },
    { t: '額度還剩多少', d: '輸入 /usage 查看。免費帳號每週重置，訂 Google AI Pro 之後改成每五小時重置，到每週上限為止。' },
    { t: '離開、登出、更新', d: '輸入 /quit 或連按兩次 Ctrl+D 離開，/logout 登出。agy 會自己在背景更新，也可以輸入 agy update。' },
  ],
  source: '安裝、執行模式與 AGENTS.md 的說明依 Google 官方文件整理（2026-09-17 核對），官方若有更新以官方頁為準。',
  sourceUrl: 'https://antigravity.google/docs/cli/install/',
}

// Windows 的終端機與 shell 分層（Microsoft 官方部落格與各專案 repo，2026-09-18 核對）
export const WIN_TERMINAL = {
  intro:
    '很多人以為「終端機」就是 PowerShell，其實是兩層：視窗是一層，讀你指令的程式是另一層。知道這件事，換工具的時候才不會換錯地方。',
  layers: [
    {
      t: '終端機（那個視窗）',
      d: '負責顯示與操作：分頁、切割視窗、字型大小、複製貼上。',
      pick:
        'Windows Terminal 是微軟自己做的開源軟體（MIT 授權），Windows 11 從 22H2 起就是預設的那個。想換別的也可以，Rio、WezTerm、Alacritty 都是開源、Mac 與 Windows 都能裝。',
    },
    {
      t: 'shell（讀指令的程式）',
      d: '真正讀懂你打進去的每一行字，決定指令怎麼執行。',
      pick:
        'Windows 預設是 PowerShell。不想用它的話，可以換 Git Bash（裝 Git for Windows 就有）、WSL 裡的 bash，或適合看資料的 Nushell。',
    },
    {
      t: 'WSL（選配，之後有興趣再裝）',
      d: '在 Windows 裡開一整套 Linux，檔案與指令都照 Linux 的規矩走。',
      pick:
        '微軟自己維護，2025 年 5 月起用 MIT 開源。裝了它，網路上以 Mac 或 Linux 為準的教學就能照著做，不用自己換算成 Windows 的寫法。',
    },
  ],
  course:
    '這門課不用挑：Windows Terminal 開 PowerShell 就夠用，agy、Claude Code、Codex 在這個組合下都正常。Mac 的對照是「終端機」或 Ghostty 是視窗，zsh 是 shell。',
  source: '依 Microsoft 官方部落格（Windows Terminal is now the Default in Windows 11）與 microsoft/terminal、microsoft/WSL、rio、wezterm、nushell 各 repo 整理，2026-09-18 核對。',
}

// GitHub 實務指南：老師怎麼看到你、檔案怎麼上去、簡報怎麼傳
export const SUBMIT_HOWTO = [
  {
    t: '讓老師看到你的東西，三個條件',
    items: [
      'repo 保持公開（public）：從課程 template 建立時選 Public，老師和同學才看得到，作品也才能入住動物園。想確認就開一個無痕視窗貼上你的 repo 網址，看得到內容就是公開。',
      'M0 就把 repo 網址交給老師：網址長得像 github.com/你的帳號/你的repo名，貼到課程 Discord 的「物件導向程式設計」頻道，交一次就好，之後老師都從這個網址看你的進度，不用每站另外通知。',
      '東西要 push 上去才算存在：檔案只放在自己電腦或 Codespace 裡，老師看不到，push 之後到 repo 網頁上按重新整理、親眼看到檔案出現，才算交付完成，commit 的時間戳就是交付紀錄。',
    ],
  },
  {
    t: '把檔案放上 GitHub，三種方法挑一種',
    items: [
      'GitHub Desktop（筆電上工作的同學，推薦）：左下角寫一句這次做了什麼 → 按藍色的 Commit 按鈕 → 按上方的 Push origin，全程不碰指令，做完到 repo 網頁確認檔案在。',
      '網頁直接上傳：打開你的 repo → 點進該站資料夾 → Add file → Upload files → 把檔案拖進去 → 按 Commit changes。資料夾還不存在的話，先 Add file → Create new file，檔名打「m1-world/README.md」，斜線會自動建出資料夾。用網頁上傳之後，回到筆電在 GitHub Desktop 按 Fetch origin 再按 Pull origin，兩邊才會一致。',
      'Codespace 或終端機：Codespace 在左側 Source Control（樹枝圖示）寫訊息，按 Commit 再按 Sync Changes。會用指令的人可以 git add -A、git commit -m "訊息"、git push，交出來的東西跟前兩種方法一模一樣。',
    ],
  },
  {
    t: '簡報怎麼傳上 GitHub 讓老師看',
    items: [
      '一律匯出成 PDF 再上傳：PowerPoint、Keynote、Google Slides、Canva 都有「匯出 PDF」，GitHub 網頁能直接翻頁預覽 PDF，老師點開就能看。pptx 傳上去只能下載、不能預覽，別用。',
      '放對位置、取對名字：簡報放進該站資料夾，檔名用里程碑代號加「-簡報.pdf」，例如 m1-world/m1-簡報.pdf、m3-creature/m3-簡報.pdf，老師一眼就找得到。',
      '大小上限 25MB（網頁上傳）：超過幾乎都是簡報裡塞了影片，把影片抽出來另外放進資料夾，簡報裡留截圖就好。',
      '用 Google Slides 報告的人，PDF 照傳一份，另外想附雲端連結的話，記得開「知道連結的使用者皆可檢視」再把連結寫進該站資料夾的 README.md，連結會失效、PDF 不會，所以 PDF 才是交付本體。',
    ],
  },
]

// repo 的資料夾結構（單一來源；template 與各 repo 的 issue 用的是同一份規格）
export const REPO_TREE = {
  intro:
    '整學期七站的作品都累積在同一個 repo，老師從同樣的七個資料夾看你的進度。從課程 template 開的 repo 已經有這七個資料夾，每個裡面都有一份 README.md 寫著那一站要交什麼。比較早自己開 repo 的同學，你的 repo 裡有一個 issue，裡面有一段可以直接貼給 AI 的指令，照著做就會補齊。',
  tree: `你的 repo/
├── AGENTS.md
├── CLAUDE.md
├── m0-outfit/
│   ├── README.md
│   ├── index.html
│   └── sketch.js
├── m1-world/
│   ├── README.md
│   └── m1-簡報.pdf
├── m2-species/
├── m3-creature/
├── m4-population/
├── m5-habitat/
└── m6-zoo/`,
  rows: [
    { f: 'm0-outfit', m: 'M0 裝備', due: '9/24 建議', talk: '' },
    { f: 'm1-world', m: 'M1 世界', due: '10/1', talk: '報告站' },
    { f: 'm2-species', m: 'M2 物種', due: '10/15', talk: '報告站' },
    { f: 'm3-creature', m: 'M3 個體', due: '11/12', talk: '報告站' },
    { f: 'm4-population', m: 'M4 族群', due: '12/3', talk: '' },
    { f: 'm5-habitat', m: 'M5 棲地', due: '12/17', talk: '' },
    { f: 'm6-zoo', m: 'M6 開園', due: '12/24', talk: '報告站' },
  ],
  notes: [
    '資料夾名稱不要改、不要搬位置，老師整學期都從這七個資料夾看你的進度。',
    '作品檔案直接放進該站資料夾，README.md 填反思與 AI 揭露欄（範本已經在裡面），過程筆記與物種日誌寫 notes.md。',
    '報告站的簡報一律轉 PDF，檔名照「站名-簡報.pdf」，例如 m1-world/m1-簡報.pdf。',
    'repo 要保持 Public，老師與同學看得到才算交付。',
  ],
}

export const SUBMIT_STEPS = [
  { t: '開自己的作品集 repo', d: '從課程 template 建立，用 GitHub Desktop 下載到筆電，一人一個、整學期用同一個，可以理解成你物種的培育艙。' },
  { t: '交付放進里程碑資料夾', d: '資料夾名稱照這七個：m0-outfit、m1-world、m2-species、m3-creature、m4-population、m5-habitat、m6-zoo。每個資料夾放四件套：程式碼、截圖或影片、README.md（反思與 AI 揭露欄），報告站（M1、M2、M3、M6）另加簡報 PDF。不會用終端機也沒關係，GitHub Desktop 或網頁上傳都可以。' },
  { t: '截止前交上去', d: '各站截止：M1 10/1、M2 10/15、M3 11/12、M4 12/3、M5 12/17，都是當天上課前（15:30）。M0 建議 9/24 前弄好，不卡遲交，10/1 跟 M1 一起收；9/24 那天一定要跟老師討論你的世界材料或簡報草稿，材料不強制上傳。M6 在 12/24 開園前交作品與導覽簡報，反思與 AI 揭露當天 23:59 前補齊。commit 的時間戳就是交付紀錄，你的每一步嘗試都是過程的證據。' },
  { t: '作品上線', d: '在 repo 的 Settings → Pages 開啟 GitHub Pages，每個有 index.html 的資料夾就有自己的網址，例如 你的帳號.github.io/你的repo名/m6-zoo/。M6 把網址貼到 Discord，老師更新園區名單後，你的物種就會入住動物園。' },
]
