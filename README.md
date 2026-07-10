# course-web — 課程網站總站

江振維（Chiang Chenwei）課程頁面的統一發佈站。所有課程／作業展示頁與其原始碼都收在這一個 repo，
掛在同一個網域 `course.interaction.tw` 底下的不同子路徑，由 GitHub Pages 免費代管（自訂網域 + HTTPS）。

## 課程網址

總站首頁：<https://course.interaction.tw/>

| 課程 | 頁面 | 網址 | 原始碼 |
|------|------|------|--------|
| 互動設計 | 黑盒子 · 期末專案 | <https://course.interaction.tw/interactiondesign/blackbox/> | `projects/blackbox/`（Vite + React） |

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
