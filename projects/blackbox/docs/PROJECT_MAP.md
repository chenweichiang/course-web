# Project Map · 檔案責任地圖

> 給 AI 工具和新進開發者用的檔案逐一說明。每個檔案的「責任 / 依賴 / 修改要點 / 常見陷阱」。

---

## 根目錄

### `index.html`
- **責任**：Vite 入口 HTML，掛載 React app 到 `#root`
- **包含**：
  - Google Fonts CDN：Inter / Noto Sans TC / IBM Plex Mono
  - AI 上下文 meta tags + 大段 HTML comment（給 AI 助手讀）
- **修改要點**：
  - 若要換字型，**同時**修改：
    - `index.html` 的 `<link>` href
    - `src/index.css` 的 `body` font-family
    - `src/index.css` 的 `@theme` 設定
    - `src/components/PosterGuide.jsx` 內所有 SVG `fontFamily` 字串

### `vite.config.js`
- **責任**：Vite 設定，含 React plugin + Tailwind 4 plugin
- **少動**：架構穩定，除非要加 alias 或自訂建置選項

### `package.json`
- **dependencies**：Vite 8 / React 19 / Tailwind 4 / Framer Motion 12
- **scripts**：`dev` / `build` / `preview`
- **注意**：Tailwind 4 不再需要 `tailwind.config.js`，設定走 CSS `@theme`

### `.gitignore`
- 忽略：`node_modules/` `dist/` `.DS_Store` `*.local` `.claude/`

---

## `src/` 結構

### `src/main.jsx`
- **責任**：React 入口，掛載 `<App />` 到 `#root`
- **少動**：不需要修改

### `src/index.css`
- **責任**：全域 CSS
- **包含**：
  - `@import "tailwindcss"`
  - `@theme` 設定：`--font-sans` / `--font-mono`（覆寫 Tailwind 預設）
  - `body` font-family + 螢幕字型平滑
  - `html` scroll-behavior + `scroll-padding-top: 64px`（避免 fixed nav 蓋住錨點）
  - `.scene` / `.cube` / `.cube-face` — Hero 立方體 3D CSS
  - `.mono` class — IBM Plex Mono + tabular numbers
  - Scrollbar 樣式（webkit-only，4px 寬細條）
  - `@keyframes float` + `.animate-float`
  - `input[type='range']` 自訂樣式

### `src/AIHint.jsx`
- **責任**：隱形元件，在 DOM 裡塞入 `display:none` 的 div，內容為給 AI 助手讀的指令
- **用法**：在元件最上層放 `<AIHint>...</AIHint>`
- **用意**：當學生把網頁分享給 AI 時，AI 能讀到「該如何協助學生」的明確規則

### `src/App.jsx` ⭐
- **責任**：應用主結構 + 響應式 nav + footer
- **匯出**：`App` (default)
- **內部元件**：
  - `TopNav({ items })` — 響應式頂部導覽
    - 桌面 (≥ lg)：橫向連結
    - 行動 (< lg)：漢堡按鈕 → 抽屜選單
    - useState for `open` + useEffect for Esc 鍵 + body scroll lock
  - `SectionRow({ id, num, label, summary, Component })` — 可摺疊段落
    - 用 `<button>` 切換 `open` state
    - Framer Motion `<motion.div>` height auto 動畫
- **常數**：
  - `SECTIONS`：12 段陣列，每段含 `id` / `num` / `navLabel` / `label` / `summary` / `Component`
  - `NAV`：從 `SECTIONS` 過濾出有 `navLabel` 的 9 項，供頂部選單使用
- **加新章節**：在 `SECTIONS` 加一筆，並 import 對應元件

---

## `src/components/` ⭐

12 個章節元件，每個對應 App.jsx 的 `SECTIONS` 一筆。

### `Hero.jsx`
- **章節**：00（Hero）
- **內部元件**：`RotatingCube` — CSS 3D 立方體
  - 6 面以 `transform: translateZ(...) rotateY(...)` 排列
  - 滑鼠拖曳旋轉、自動旋轉（鬆開 2 秒後恢復）
  - 點擊展開後顯示六面感官標籤
- **視覺**：白底，盒子純黑 `#0A0A0A`，加 `drop-shadow`
- **修改要點**：立方體顏色在 `style={{ background: '#0A0A0A' }}`；邊光在 `borderColor`

### `FeelingExplorer.jsx`
- **章節**：01 感受
- **核心互動**：情緒詞 → 感官語言拆解 → 物理機制建議

### `DesignProcess.jsx`
- **章節**：02 設計流程
- **內容**：五步驟（感受定義 → 感官屬性 → 輸出機制 → 材料 → 結構）

### `HardwareGuide.jsx`
- **章節**：03 硬體
- **內容**：Arduino Uno Q（3.3V GPIO）與 Raspberry Pi 5 規格、接線、相容性
- **重要 fact**：Arduino Uno Q 是 3.3V GPIO，**不是** 5V 像傳統 Uno

### `StateMachine.jsx`
- **章節**：04 程式
- **內容**：State machine 四狀態框架（IDLE → SENSING → ACTIVE → RELEASE）
- **含**：SVG 流程圖元件 + 動畫展示

### `BoxVisualization.jsx`
- **章節**：05 盒子
- **內容**：15cm 立方體剖面圖、材料選擇

### `MultiBoxSystem.jsx`
- **章節**：06 跨組串聯（選擇性加分）

### `AIWorkflow.jsx`
- **章節**：07 AI 協作
- **內容**：Antigravity IDE + GitHub 備份工作流

### `PosterGuide.jsx` ⭐ (最大檔案)
- **章節**：08 海報規範
- **5 個 tab**：
  - `layout` 版面規格 → `LayoutDiagram` 元件（純規格 SVG 示意圖，含 grid/bleed/safe 切換）
  - `content` 必填內容 → 五大內容區檢核
  - `grid` 格線系統 → 完整教學（歷史 + 原理 + 規格）
  - `type` 字型層級 → 印刷+螢幕字型規劃
  - `color` 色彩規範 → CMYK 色板 + 對比度
- **常數**：
  - `PALETTE` — 6 色色板（主黑 / 瑞士紅 / 三階灰 / 紙白）
- **元件**：
  - `LayoutDiagram({ showGrid, showBleed, showSafe })` — A3 版面 SVG 示意圖（11 個編號繪製層）
  - `PosterGuide` (default export) — 主元件含 tabs 切換
- **修改要點**：
  - `LayoutDiagram` 的繪製順序很重要（grid / safe overlay 必須在 zone fills 之後才會浮在最上層）
  - 若要切換配色方案，編輯各色變數即可——但目前永久使用 Swiss Grid 配色

### `DocumentationGuide.jsx`
- **章節**：（已併入 08 或保留為獨立）
- **內容**：三份必交文件詳細說明（設計概要 / 材料說明 / 系統說明）

### `BlindTest.jsx`
- **章節**：09 盲測
- **內容**：盲測指引 + 模擬問卷

### `CaseStudies.jsx`
- **章節**：10 案例
- **四大類**：震動 · 聲音 · 光 · 動作

### `Rubrics.jsx`
- **章節**：11 評分
- **內容**：5 項評分標準 + 學生自評功能

### `VideoGuide.jsx`
- **章節**：12 影片
- **內容**：2-3 分鐘作品記錄影片橫式拍攝指南

---

## `public/`

### `if-poster-reference.png`
- **用途**：iF Design Award MINUS Food Scale System 海報參考
- **目前狀態**：未在程式中引用（保留備用）

### `poster-reference.jpg`
- **用途**：黑盒子主題的示範海報（Gemini 生成）
- **引用處**：`PosterGuide.jsx` 的版面規格 tab 底部

---

## 常見修改模式

### 1. 加新章節
1. 在 `src/components/` 新建 `MyNewSection.jsx`，預設 export 一個 React 元件
2. 在 `src/App.jsx` import 並加入 `SECTIONS` 陣列
3. 若要在頂部導覽顯示，給它 `navLabel`

### 2. 換字型
（見 `index.html` 段落 → 「修改要點」）

### 3. 換配色強調色
- 全站搜尋 `#CC0000`（瑞士紅）→ 統一替換
- 注意：色彩規範 tab 的 `PALETTE` 也要同步

### 4. 加新檔案到 public
- 直接放進 `public/`
- 在 JSX 用 `` `${import.meta.env.BASE_URL}filename.ext` `` 引用（不要硬編碼 `/filename.ext`，會在子路徑部署時壞掉）

---

## 不該動的地方

- `index.html` 內的 AI ASSISTANT CONTEXT comment：那是給 AI 工具讀的，移掉會讓助教辨識 AI 生成的功能消失
- `src/AIHint.jsx`：同上
- Tailwind 4 `@import` + `@theme`：不能改回 Tailwind 3 寫法
- `.gitignore` 內的 `dist/`：絕對不要 commit `dist/`，部署走 rsync

---

## 部署相關

- 來源 → 目標：本地 `dist/` → `research-server:/home/ccw/server/work/interactiondesign/114-2/`
- 工具：`rsync -avz --delete`
- 詳見 [`DEVELOPMENT.md`](DEVELOPMENT.md) → 部署流程
