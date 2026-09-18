# Development · 開發慣例與工作流

> 給開發者（人類或 AI）參考的工作模式、設計慣例、部署流程。

---

## 環境需求

- **Node.js**：18+
- **npm**：建議搭配 Node 安裝
- **作業系統**：開發在 macOS（Apple Silicon），但無平台依賴
- **編輯器**：任意（VS Code / Antigravity / Cursor）

```bash
node --version    # 確認 18+
npm --version
git --version
```

---

## 日常指令

```bash
# 啟動開發伺服器（hot reload）
npm run dev
# → http://localhost:5173

# 生產建置（產出 dist/）
npm run build

# 預覽生產建置（測試 build 結果）
npm run preview
# → http://localhost:4173

# （build 就是部署的第一步：輸出直接落在上線路徑 course-web/interactiondesign/blackbox/）
```

**典型部署一氣呵成**

```bash
npm run build && cd ../.. && git add -A interactiondesign/blackbox projects/blackbox && git commit -m "更新黑盒子頁" && git push origin main
```

---

## 部署

### 部署座標

| 項目 | 值 |
|---|---|
| **正式網址** | https://course.interaction.tw/interactiondesign/blackbox/ |
| **代管** | GitHub Pages（repo `chenweichiang/course-web`，自訂網域 course.interaction.tw） |
| **本專案位置** | `course-web/projects/blackbox/`（原始碼） |
| **build 輸出** | `course-web/interactiondesign/blackbox/`（上線目錄，vite `base` 與 `outDir` 已設好） |
| **HTTPS** | GitHub Pages 自動簽發與更新 |

> 沿革：2026-07 以前本頁掛在自架 VPS `work.interaction.tw`，用 rsync 推 `dist/`、由 Caddy serve。
> 該網域已除役（DNS 現在查不到），舊的 rsync／Caddy／SSH 部署流程全部作廢，不要再照著做。

### 前置設定

只要能 push 到 `chenweichiang/course-web` 即可，不需要 SSH 到任何伺服器。

### 部署步驟

```bash
# 1. 進原始碼目錄
cd ~/Developer/course-web/projects/blackbox

# 2. 確認本地 dev 看起來正常
npm run dev
# → http://localhost:5173 (Ctrl-C 結束)

# 3. 建置（直接輸出到 ../../interactiondesign/blackbox/）
npm run build

# 4. commit + push，GitHub Pages 幾分鐘後自動上線
cd ~/Developer/course-web
git add -A interactiondesign/blackbox projects/blackbox
git commit -m "更新黑盒子頁"
git push origin main

# 5. 開瀏覽器確認（Cmd-Shift-R 強制重新整理，避開舊的 assets 快取）
open https://course.interaction.tw/interactiondesign/blackbox/
```

### 安全 / 操作注意

- **部署就是 git push**——GitHub Pages 讀 repo 上的 `interactiondesign/blackbox/`，所以 build 產物要進版控
- build 用 `emptyOutDir`，會清掉上線目錄裡不在這次 build 內的檔案，**確認 build 完整再 commit**
- push 後不是立刻生效，GitHub Pages 要幾分鐘；瀏覽器也會沿用舊的 `assets/*.js`，驗收一律強制重新整理
- course-web 是公開 repo，不要把任何私密資訊寫進這個專案

### 故障排除

| 症狀 | 排查 |
|---|---|
| push 完但網頁沒更新 | GitHub Pages 要幾分鐘；再 Cmd-Shift-R；確認 `interactiondesign/blackbox/` 的新檔真的進了 commit |
| 頁面停在舊版 | 比對線上 `index.html` 引用的 `assets/*.js` 檔名與本地 build 是否一致 |
| HTTPS 憑證錯誤 | GitHub Pages 自動處理；確認 repo 根目錄 `CNAME` 還在 |
| 樣式 / JS 路徑 404 | 檢查 `vite.config.js` 的 `base` 設定是否對應 `/interactiondesign/blackbox/` |

---

## 設計慣例

### 色彩

```
主黑     #0A0A0A    主標題、邊框、主要文字
瑞士紅   #CC0000    強調色、章節編號、紅色字
深灰     #3F3F46    次要標題（Tailwind zinc-700）
中灰     #71717A    說明文字（Tailwind zinc-500）
淺灰     #D4D4D8    分隔線、邊框（Tailwind zinc-300）
紙白     #FFFFFF    底色、反色文字
```

加新色票時：

1. 用 Tailwind 內建 zinc / red 階層優先
2. 自訂色用 `[#HEX]` 寫法（`bg-[#CC0000]` `text-[#CC0000]`）
3. 同步更新 `PosterGuide.jsx` 的 `PALETTE` 常數

### 字型

```
font-sans   Inter + Noto Sans TC + PingFang TC + 微軟正黑體
font-mono   IBM Plex Mono + Menlo
.mono       同 font-mono（自訂 class）
```

**使用準則**

- 中文內文：`font-sans`（自動選用 Noto Sans TC）
- 技術標籤 / 編號 / 規格：`.mono` 或 `font-mono`
- 章節標題：`font-black` 或 `font-bold`
- 全大寫英文小標：`mono` + `tracking-widest` + `text-xs`

### 動畫

統一使用 **Framer Motion**，避免 CSS transition 不一致。

**標準淡入**

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
```

**展開摺疊**

```jsx
<motion.div
  initial={{ height: 0, opacity: 0 }}
  animate={{ height: 'auto', opacity: 1 }}
  exit={{ height: 0, opacity: 0 }}
  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
  style={{ overflow: 'hidden' }}
>
```

**列表項依序淡入**

```jsx
{items.map((item, i) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.05 + i * 0.025 }}
  >
))}
```

### 響應式策略

斷點對齊 Tailwind 預設：

| 斷點 | 寬度 | 用途 |
|---|---|---|
| `sm:` | 640px | 大型手機 |
| `md:` | 768px | 平板 |
| `lg:` | 1024px | 桌面 |
| `xl:` | 1280px | 大桌面 |

**頂部 nav** 在 `lg:` 切換橫向 / 漢堡——因為 9 個導覽連結需要 ≥1024px 才能舒適排列。

**內容區塊** 多數在 `md:` 切換單欄 / 多欄。

### 互動回饋

- 桌面：`hover:` 顏色加深 / 邊框變化
- 手機：`active:` 背景變化（hover 在 touch 不可靠）
- 觸控區：至少 44 × 44 px（Apple HIG）
- 鍵盤可達性：互動元素都用 `<button>` 或 `<a>`，不要在 `<div>` 上掛 onClick

---

## 程式慣例

### 註解

- 預設不寫註解
- 只有「為什麼」非顯而易見時才寫（特殊情況、避坑紀錄）
- 不要寫「做了什麼」的註解——命名好就能說明

### 元件結構

```jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import AIHint from '../AIHint'

const CONSTANT_DATA = [...]   // 模組頂層的靜態資料

function SubComponent() {...}  // 內部用元件

export default function MySection() {
  const [state, setState] = useState(false)
  return (
    <section className="min-h-screen py-24 px-6 bg-white">
      <AIHint>...</AIHint>
      <div className="max-w-5xl mx-auto">
        {/* content */}
      </div>
    </section>
  )
}
```

### Tailwind class 寫順序

不嚴格要求，但建議：
`定位 → 顯示 → 尺寸 → 間距 → 邊框 → 背景 → 文字 → 互動`

例：
```jsx
className="fixed top-0 z-50 flex items-center px-5 py-4 border-b-2 bg-white text-zinc-900 hover:bg-zinc-50"
```

---

## Git 工作流

### 分支策略

- 教學網站不需要分支策略，**直接在 `main` 上開發**
- 重大實驗用 `feature/xxx` 分支，完成後 merge 回 main

### Commit 規範

- **訊息語言**：繁體中文
- **格式**：第一行為摘要（< 50 字），空一行後寫詳細變更
- **不加 AI 署名**：commit 不寫任何 AI 協作標記或生成標記

範例：

```
新增海報規範區段、全站字體統一、行動裝置 UIUX 改善

- 新增 08 海報規範 (PosterGuide.jsx)
- 全站字體改為 Inter + Noto Sans TC + IBM Plex Mono
- 頂部 nav 行動裝置改 hamburger 抽屜選單
...
```

### Remote

```bash
# 已設定（本專案沒有自己的 remote，跟著課程總站 course-web 一起版控）
origin   https://github.com/chenweichiang/course-web.git

# Push（GitHub Pages 會在幾分鐘後自動上線）
git push origin main
```

---

## 常見陷阱

### 1. Tailwind 4 不用 `tailwind.config.js`

設定走 CSS：

```css
@import "tailwindcss";
@theme {
  --font-sans: 'Inter', ...;
}
```

別誤建 `tailwind.config.js`，會被忽略且造成困惑。

### 2. SVG `fontFamily` 用 JSX 語法

SVG 內的 `fontFamily` 屬性用駝峰命名（不是 `font-family`）：

```jsx
<text fontFamily="'IBM Plex Mono', monospace">
```

### 3. SVG 繪製順序 = z-index

SVG 沒有 `z-index`。後寫的會疊在先寫的上面。需要疊加層次時，注意元素順序。

`PosterGuide.jsx` 的 `LayoutDiagram` 即用編號 1-11 標出嚴格繪製順序。

### 4. `import.meta.env.BASE_URL` 引用 public

```jsx
<img src={`${import.meta.env.BASE_URL}poster-reference.jpg`} />
```

不要硬編碼 `/poster-reference.jpg`——子路徑部署時會壞。

### 5. build 產物要進版控，但不是 `dist/`

vite 的 `outDir` 已改成 `../../interactiondesign/blackbox`，那份**要 commit**（GitHub Pages 服務的就是它）。
`dist/` 仍留在 `.gitignore`，是舊流程的殘留；若不慎產生並被加入索引：

```bash
git rm -r --cached dist/
git commit -m "從版控移除 dist/"
```

### 6. 本機路徑含空格與中文

本專案位於 `~/Developer/course-web/projects/blackbox/`，路徑沒有空格；但 `~/Developer` 底下多數專案是
中文帶空格的資料夾名，跨專案複製素材時所有 `cd` / `cp` 都要 quote。

---

## 故障排除

### `npm run dev` 啟動失敗

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### 字型沒套用

- 開瀏覽器 DevTools → Network → 確認 Google Fonts CSS 載入成功（status 200）
- 若被擋（如校園網路），加 `@font-face` 或 self-host 字型
- 確認 `body` font-family 串列含 fallback（`'Inter', 'Noto Sans TC', ...`）

### Framer Motion 動畫卡頓

- 大量 `motion` 元素同時動畫 → 用 `viewport={{ once: true }}` 只執行一次
- 拖曳卡頓 → 確認用 `useRef` 而非 `useState` 儲存高頻更新值

### push 後線上沒生效

1. 確認 `interactiondesign/blackbox/` 的新檔真的進了 commit（`git show --stat`）
2. 確認 GitHub Pages 已跑完（repo 的 Actions／Pages 頁）
3. 強制重新整理，並比對線上 `index.html` 引用的 `assets/*.js` 檔名

---

## 進階：本地預覽生產建置

```bash
npm run build
npm run preview
# → http://localhost:4173
```

`preview` 模擬生產環境 serve，可測試是否所有資源（圖片、字型）路徑正確。
若 `dev` 看起來正常但 `preview` 壞了，通常是路徑問題。
