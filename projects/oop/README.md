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

## Hero 背景：程序化生成的一棵櫻

`public/tree/` 底下的 `skeleton.js` / `presets.js` / `recursive.js` / `render.js` / `light.js`
是從研究專案 [chenweichiang/202608-research-p5-tree](https://github.com/chenweichiang/202608-research-p5-tree)
**原封不動複製**過來的，⚠️ **不要在這裡改**——要改演算法回研究專案改，再重新複製：

```bash
SRC=~/Documents/Developer/"202608 研究 p5畫樹"
for f in skeleton presets recursive render light; do cp "$SRC/src/$f.js" public/tree/; done
```

只有 `public/tree/hero.js` 是本站專用的驅動：挑物種（櫻）、改成適合當背景的配色、決定取景。
每次載入換一個 seed，所以每次重新整理都是不同的一棵——這是課程「同一個類別、不同實例」
隱喻的現場示範。

**為什麼用 p5 全域模式**：那五個檔是為全域模式寫的（直接呼叫 `noise` / `random` /
`beginShape`…）。改成 instance 模式要逐一加 `p.` 前綴，等於分岔出第二份程式碼，
研究專案一改就失去同步。`new p5()` 不帶參數即進入全域模式，原始碼一行都不用動。
`HeroSketch.jsx` 只負責依序注入 script 與生命週期（離開視窗暫停、unmount 清理）。

## 標題字：朱雀仿宋（自架子集）

- 檔案：`public/fonts/ZhuqueFangsong-subset.woff2`（226KB，涵蓋全站用字＋ASCII＋常用標點）
- 來源：[TrionesType/zhuque](https://github.com/TrionesType/zhuque) v0.212，OFL 1.1
- **改了頁面文字後若標題出現 fallback 明體字（少數字換了字型），需重新子集化**：

```bash
# 1. 下載原始字體（release zip 解出 ZhuqueFangsong-Regular.ttf）
# 2. 把全站中文字＋ASCII 收進 subset_text.txt（可用 python 掃 src/ 與兩個 html）
uvx --from fonttools --with brotli pyftsubset ZhuqueFangsong-Regular.ttf \
  --text-file=subset_text.txt --flavor=woff2 --layout-features='*' \
  --output-file=public/fonts/ZhuqueFangsong-subset.woff2
```

排版增強：Heti（`heti/umd/heti.min.css`＋addon 標點擠壓）只套在 `.heti` 段落，字體字級一律繼承本站設定（覆寫在 `src/index.css`）。跨頁轉場用原生 View Transitions（三個頁面的 CSS 各有 `@view-transition`）。
