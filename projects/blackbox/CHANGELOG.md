# Changelog

本檔案記錄專案各次重要變更。格式參考 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.1.0/)，使用日期紀年（非 SemVer），因為這是教學網站而非函式庫。

---

## [Unreleased]

> 尚未提交的工作會列在這裡，提交後移到對應日期區段。

---

## 2026-05-13 — 海報規範、字體統一、行動裝置 UIUX

### 新增 Added

- **08 海報規範** (`src/components/PosterGuide.jsx`)：A3 橫式海報的完整規範
  - **版面規格** tab：純規格示意圖（無模擬內容），含 grid / bleed / safe 三種切換覆蓋層
    - 顯示格線時：欄編號 01-12、頂部尺寸標尺（M 20 / COL 27.1 / G 5）、底部規格列
  - **必填內容** tab：五大內容區的必填項目 + 繳交前檢核表（10 項）
  - **格線系統** tab：完整入門教學
    - 什麼是格線系統（紅色強調引言）
    - 歷史脈絡（1920s 包浩斯 → 1950s 瑞士國際主義 → NOW）
    - 為什麼需要格線（4 個原因）
    - 核心四元素（版心 / 欄 / 欄間距 / 基線格）
    - 為什麼是 12 欄（×2 ×3 ×4 ×6 整除性視覺化）
    - A3 規格表 + 欄位配置建議
    - 格線使用五原則
  - **字型層級** tab：印刷 + 螢幕雙重考量
    - 推薦字型組合（中文 Noto Sans TC / 拉丁 Inter / 等寬 IBM Plex Mono / 系統備援 PingFang TC）
    - CSS / Google Fonts 載入語法
    - 組合策略四原則
    - 常見錯誤
  - **色彩規範** tab：CMYK 色板 + 強調色使用原則 + WCAG AA 對比度
  - **繳交規格** 區（恆顯示）：PDF / PNG / 原始檔三種繳交格式
- **12 作品記錄影片** (`src/components/VideoGuide.jsx`)：拍攝指南
- **公開素材**：`public/poster-reference.jpg`（黑盒子示範海報）

### 變更 Changed

- **全站字體系統替換**
  - 拉丁 / UI：`Inter`（取代原本未指定的 fallback）
  - 中文：`Noto Sans TC`（保留，加上 PingFang TC / 微軟正黑體系統備援）
  - 等寬：`IBM Plex Mono`（取代 `Space Mono`，字面寬、行動裝置易讀）
  - Tailwind 4 `@theme` 設定同步 `--font-sans` / `--font-mono`
- **頂部導覽列**（`src/App.jsx` → `TopNav`）行動裝置 UIUX 重做
  - 桌面 (≥ lg)：維持橫向選單
  - 行動 (< lg)：右上漢堡按鈕 → 下拉抽屜選單
  - 44×44 px 觸控區（符合 Apple HIG）
  - 紅色編號（01-12）+ 章節名稱 + ↗ 箭頭
  - 列表項依序淡入動畫
  - 漢堡圖示 ↔ X 圖示動畫
  - 半透明背景遮罩（30% 黑）
  - Escape 鍵關閉、抽屜開啟時鎖 body scroll
  - 完整 ARIA 屬性（`aria-expanded` / `aria-controls` / `aria-label`）
- **頁尾**（`src/App.jsx` footer）行動裝置改垂直堆疊
  - 加「EXTERNAL DOCS ——」分區小標
  - 外部連結加大觸控區（`py-2.5`）+ 細虛線分隔
  - 行動色彩 zinc-400（取代 zinc-300，提升可讀性）
- **Hero 首頁區**（`src/components/Hero.jsx`）
  - 移除背景格線（淡灰網格紙）
  - 旋轉立方體改為純黑 `#0A0A0A`（原本透明灰）
  - 加 `drop-shadow` 立體投影
  - 點擊展開後白色細邊光 + 六面感官標籤（觸覺/聽覺/視覺/嗅覺/動覺/溫覺）
- **錨點滾動修正**：加 `scroll-padding-top: 64px`，避免 fixed nav 蓋住目標區段

### 修正 Fixed

- 版面規格 SVG「297 mm」尺寸標籤被 viewBox 右邊緣裁切的問題（viewBox 從 `PW+100` 擴張到 `PW+140`）
- 「顯示格線 / 顯示出血 / 顯示安全區」三個切換按鈕點擊無反應的問題（原因：grid / safe 圖層在 zone fill 之前繪製，被覆蓋；重新編排為 11 個編號層級的繪製順序）

### 移除 Removed

- 版面規格 tab 內整張模擬海報（凝滯 / SUSPENDED / 假學生編號 / 假感官數據 / 假步驟內容）
- 為 PosterPreview 服務的 5 種配色方案 (`THEMES` 常數)、`Dim` SVG helper、未使用的 `TYPE_SCALE` 常數、module-level 海報尺寸常數
- 配色方案切換器（單一配色，不再切換）
- iF Award 海報參考圖中關於「不是 A3」的橘色警告區塊（已換成黑盒子主題的示範海報）

### 其他元件整理

- `BlindTest.jsx` / `BoxVisualization.jsx` / `CaseStudies.jsx` / `DesignProcess.jsx` / `DocumentationGuide.jsx` / `FeelingExplorer.jsx` / `HardwareGuide.jsx` / `MultiBoxSystem.jsx` / `Rubrics.jsx` / `StateMachine.jsx` / `AIWorkflow.jsx`：多項排版微調、字型統一、內容整理

### Commit

- `58c8a9c`：19 files changed, +2097 / -812
- Push 至 `https://github.com/chenweichiang/course-interaction`

---

## 2025-XX-XX — 初始提交

### 新增 Added

- 專案基底（Vite + React + Tailwind + Framer Motion）
- 12 段教學單頁應用基本架構
- 課程核心概念、評分標準、感受探索器
- `CLAUDE.md`：AI 工具規則

### Commit

- `755259b`：初始提交
