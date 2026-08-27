# course-web — 課程網站總站

江振維（Chiang Chenwei）課程頁面的統一發佈站。所有課程／作業展示頁與其原始碼都收在這一個 repo，
掛在同一個網域 `course.interaction.tw` 底下的不同子路徑，由 GitHub Pages 免費代管（自訂網域 + HTTPS）。

## 課程網址

總站首頁：<https://course.interaction.tw/>

| 課程 | 頁面 | 網址 | 原始碼 |
|------|------|------|--------|
| 設計思考（北商創科 115-1） | 課程主頁 | <https://course.interaction.tw/designthinking/> | `projects/designthinking/`（Vite + React；課程內容單一來源 `src/data.js`） |
| 脈絡設計與實踐（北商創科 115-1） | 課程主頁 | <https://course.interaction.tw/contextdesign/> | `contextdesign/`（純手寫靜態 HTML；標題字子集 `contextdesign/fonts/`；「交付物規格」區段由備課 repo `202608 課程 脈絡設計與實踐/scripts/build_web.py` 從 `教材/*.md` 生成，SPECS 標記內勿手改） |
| 互動設計 | 黑盒子 · 期末專案 | <https://course.interaction.tw/interactiondesign/blackbox/> | `projects/blackbox/`（Vite + React） |
| 物件導向程式設計（清大科藝 115-1） | 課程主頁 | <https://course.interaction.tw/oop/> | `projects/oop/`（Vite + React；課程內容單一來源 `src/data.js`） |
| 物件導向程式設計（清大科藝 115-1） | 作業牆 | <https://course.interaction.tw/oop/gallery/> | 同上（名單資料 `projects/oop/public/gallery/students.json`） |
| 研究寫作套件（公開工具箱） | 專案頁 | <https://course.interaction.tw/research-writing-kit/> | `research-writing-kit/`（純手寫靜態 HTML；repo 本體在 [chenweichiang/research-writing-kit](https://github.com/chenweichiang/research-writing-kit)） |
| 研究寫作套件（英文版） | 專案頁 | <https://course.interaction.tw/research-writing-kit/en/> | `research-writing-kit/en/`（同上；兩頁 hreflang 互連） |

根目錄 `index.html`＝課程總覽首頁（原為轉址頁，2026-08 改版；新增課程記得補卡片）。首頁標題字用自己的子集 `fonts/ZhuqueFangsong-subset.woff2`——**首頁文字改動後要重新子集化**（SOP 見 `projects/designthinking/README.md`，來源文字改掃根目錄 `index.html`），否則新字會 fallback 成明體。

## 結構

```
CNAME                          # 自訂網域 course.interaction.tw（GitHub Pages 用，勿刪）
.nojekyll                      # 停用 Jekyll，直接以靜態檔服務
<課程>/<專案>/                  # ← 上線頁面（GitHub Pages 服務這些；build 成品或手寫靜態檔）
└── index.html + assets/ ...
projects/<專案>/                # ← 原始碼（打包型頁面才有；build 會輸出到對應上線路徑）
```

上線頁面與原始碼分開放：`projects/` 是原始碼、根目錄下的 `<課程>/<專案>/` 是實際被服務的成品。

## 更新既有頁面（以黑盒子為例）

```bash
cd projects/blackbox
npm install          # 第一次才需要
npm run build        # 直接輸出到 ../../interactiondesign/blackbox/（vite base 已設好）
cd ../..
git add -A && git commit -m "更新黑盒子頁" && git push
```

push 後 GitHub Pages 幾分鐘自動上線，無需碰伺服器。

## 加一個新課程頁面

- **打包型（Vite/React 等）**：在 `projects/<新專案>/` 放原始碼，`vite.config.js` 設
  `base: '/<課程>/<專案>/'` 且 `build.outDir` 指向 `../../<課程>/<專案>`，build → commit → push。
- **純手寫 HTML**：直接在根目錄開 `<課程>/<專案>/` 放 `index.html`（資源用相對路徑），commit → push。

網址一律 = `course.interaction.tw/<課程>/<專案>/`。**新增後記得把網址補進上面「課程網址」表。**

> 沿革：黑盒子頁原掛於自架伺服器 `work.interaction.tw/interactiondesign/114-2/`；2026-07 `work.interaction.tw`
> 除役，頁面與其原始碼（原獨立專案 `202605 課程 互動設計黑盒子作業`）一併併入本總站，路徑改為 `/interactiondesign/blackbox/`。
