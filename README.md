# 黑盒子 — 互動設計 114-2 期末專案簡報

國立臺北商業大學 互動設計課程（114-2, Spring 2026）期末專案「黑盒子」的設計簡報頁。
授課教師：江振維 Chiang Chenwei。

## 正式網址

<https://course.interaction.tw/interactiondesign/blackbox/>

由 GitHub Pages 代管（自訂網域 `course.interaction.tw`，免費 HTTPS）。

## 結構

```
CNAME                              # 自訂網域（GitHub Pages 用，勿刪）
.nojekyll                          # 停用 Jekyll，直接以靜態檔服務
interactiondesign/blackbox/
├── index.html                     # 頁面本體（React SPA，Vite 打包）
├── assets/                        # 打包後的 JS / CSS
├── poster-reference.jpg           # 海報參考圖
└── if-poster-reference.png
```

資源路徑皆為相對路徑，故整包位於子目錄下仍能正確載入。

## 更新方式

改好檔案 → `git push`，GitHub Pages 幾分鐘後自動重新部署，無需碰伺服器。

> 沿革：原掛於自架伺服器 `work.interaction.tw/interactiondesign/114-2/`，
> 2026-07 遷至本 GitHub Pages repo，`work.interaction.tw` 已除役。
