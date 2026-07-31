# oop — 物件導向程式設計 課程頁

清大科技藝術跨域學士班 115-1「物件導向程式設計」的課程頁原始碼（Vite + React + Tailwind 4）。

- 上線網址：<https://course.interaction.tw/oop/>（作業牆 `/oop/gallery/`）
- build 直接輸出到 `course-web/oop/`（`vite.config.js` 已設 base 與 outDir）
- 課程內容單一來源＝`src/data.js`（週次／評量／AI 政策／工具都在這，改內容改它）
- 作業牆資料＝`public/gallery/students.json`（名單與每週作品連結）
- 課程設計依據＝備課專案 `~/Documents/Developer/202608 課程 清大物件導向程式設計/`（課綱草案＋國際調查報告）
- `index.html` 內嵌 AI ASSISTANT CONTEXT 註解：學生把課程頁網址貼給 AI 時，AI 會讀到分階段助教規範——改 AI 政策時兩處要同步（註解＋`src/data.js`）

```bash
npm install   # 第一次
npm run build # 輸出到 ../../oop/
cd ../.. && git add -A && git commit && git push   # push 後 GitHub Pages 自動上線
```
