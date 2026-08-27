# designthinking — 設計思考 課程頁

北商創意科技與產品設計系 115-1「設計思考」的課程頁原始碼（Vite + React + Tailwind 4）。

- 上線網址：<https://course.interaction.tw/designthinking/>
- build 直接輸出到 `course-web/designthinking/`（`vite.config.js` 已設 base 與 outDir）
- 課程內容單一來源＝`src/data.js`（里程碑／方法卡／評量／AI 公約都在這，改內容改它）
- 課程設計依據＝備課專案 `~/Developer/202608 課程 設計思考/`（課綱草案＋114-2 知識庫）
- `index.html` 給 AI 讀的協作規範有兩層：`<div id="root">` 裡的**靜態正文**（抓取器真正讀到的那份，React 掛載後被整段取代；2026-08-27 實測 HTML 註解會被 AI 抓取器剝掉、單頁應用原始 HTML 只剩標題，所以必須放正文）＋頂端的 AI ASSISTANT CONTEXT 註解（給讀原始碼的人／AI）——改 AI 政策時**三處**要同步（靜態正文、註解、`src/data.js`）。驗證法：`curl -sL https://course.interaction.tw/designthinking/` 剝掉註解與 script 後仍應有 >1000 字
- 課程小助教 MIRA 的連結在 `src/data.js` 的 `MIRA`，權威來源＝wiki 首頁的 MIRA 區塊

```bash
npm install   # 第一次
npm run build # 輸出到 ../../designthinking/
cd ../.. && git add -A && git commit && git push   # push 後 GitHub Pages 自動上線
```

## Hero 背景：微弱訊號長成影響鏈

`src/components/HeroSketch.jsx` 是自包含的 p5（instance 模式）：左緣的 2026 微弱訊號（小點）
其中幾個被放大成往右生長的推演線，線與線靠近處出現碰撞點（方框），最後抵達右緣的 2050
（空心圓）。對應 M1 的三個動作：放大與極端化、尋找碰撞點、建構未來情境。
每次載入換 seed，每次重新整理都是一個不同的未來。`prefers-reduced-motion` 直接呈現完成狀態。

## 標題字：朱雀仿宋（自架子集）

- 檔案：`public/fonts/ZhuqueFangsong-subset.woff2`（涵蓋本站全部用字＋ASCII＋常用標點）
- 來源：[TrionesType/zhuque](https://github.com/TrionesType/zhuque) v0.212，OFL 1.1
- **改了頁面文字後若標題出現 fallback 明體字，需重新子集化**：

```bash
# 1. 下載原始字體（release zip 解出 ZhuqueFangsong-Regular.ttf）
# 2. 收集全站用字（掃 src/ 與 index.html 全部字元）
python3 -c "
import glob, string
chars = set(string.printable)
for f in glob.glob('src/**/*.js*', recursive=True) + ['index.html']:
    chars.update(open(f, encoding='utf-8').read())
chars.update('，。、；：？！「」『』（）《》〈〉—…·・★☆◆✓⭐🔴↗ ')
open('subset_text.txt', 'w', encoding='utf-8').write(''.join(sorted(c for c in chars if not c.isspace() or c == ' ')))"
# 3. 子集化
uvx --from fonttools --with brotli pyftsubset ZhuqueFangsong-Regular.ttf \
  --text-file=subset_text.txt --flavor=woff2 --layout-features='*' \
  --output-file=public/fonts/ZhuqueFangsong-subset.woff2
```

排版增強：Heti（標點擠壓）只套 `.heti` 段落，字體字級一律繼承本站設定（覆寫在 `src/index.css`）。
重點色＝藍晒圖藍 `#1D4FA5`（`--color-plan`），硬陰影只給可點擊元素（`.plan-btn`）。
