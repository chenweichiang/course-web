# course-web — 課程網站總站

江振維（Chiang Chenwei）課程頁面的統一發佈站。所有課程／作業展示頁都累積在這個 repo，
掛在同一個網域 `course.interaction.tw` 底下的不同子路徑，由 GitHub Pages 免費代管（自訂網域 + HTTPS）。

## 正式網址

<https://course.interaction.tw/>

## 目前收錄

| 子路徑 | 內容 | 原始碼 |
|--------|------|--------|
| [`/interactiondesign/blackbox/`](https://course.interaction.tw/interactiondesign/blackbox/) | 互動設計 114-2 期末專案「黑盒子」設計簡報頁 | Vite 專案 `202605 課程 互動設計黑盒子作業`（build 成品置於此） |

## 結構

```
CNAME                          # 自訂網域 course.interaction.tw（GitHub Pages 用，勿刪）
.nojekyll                      # 停用 Jekyll，直接以靜態檔服務
<課程>/<專案>/                  # 每個課程頁面一個子資料夾
└── index.html + assets/ ...
```

## 怎麼加一個新課程頁面

1. 在 repo 根目錄開一個子資料夾，路徑就是它的網址，例如 `interactiondesign/newproject/`。
2. 把該頁面的靜態檔（`index.html` + `assets/` …）放進去。
   - **純手寫 HTML**：直接放，資源用相對路徑即可。
   - **Vite / React 等打包專案**：在它自己的原始碼專案 build，把 `dist/` 內容放進來；
     資源路徑要能在該子路徑下解析（把 `vite.config.js` 的 `base` 設成 `'/<課程>/<專案>/'`，
     或改用相對路徑）。
3. `git push` → GitHub Pages 幾分鐘後自動上線，網址 = `course.interaction.tw/<課程>/<專案>/`。

> 沿革：黑盒子頁原掛於自架伺服器 `work.interaction.tw/interactiondesign/114-2/`，
> 2026-07 隨 `work.interaction.tw` 除役，遷入本 GitHub Pages 總站並改路徑為 `/interactiondesign/blackbox/`。
