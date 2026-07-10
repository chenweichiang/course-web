# 黑盒子 · 互動設計期末專案教學網站

> 由授課教師 **江振維** 建立的單頁應用程式，引導學生完成「黑盒子」期末作品設計與繳交流程。

![Tech](https://img.shields.io/badge/Vite-8.0-purple) ![React](https://img.shields.io/badge/React-19.2-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4.3-cyan) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.38-ec4899)

---

## 專案性質

- **課程**：互動設計（國立臺北商業大學 · 創意科技與產品設計系）
- **教師**：江振維（Chiang Chenwei）
- **目的**：引導學生理解、執行、交付「黑盒子」期末作品
- **形式**：12 段式互動單頁應用，包含理論說明、互動工具、檢核表

## 課程核心

**作業名稱**：黑盒子（Black Box）

**核心挑戰**：設計一個能向陌生人傳遞特定「感受」的實體裝置——不能透過文字或解說，只能靠物件本身的形式、材質、行為。

**規格限制**

| 項目 | 限制 |
|---|---|
| 尺寸 | 15 × 15 × 15 cm 正立方體 |
| 邊界 | 任何物件（線材、按鍵、插頭、天線）不可超出盒體 |
| 材料 | 不可使用紙板/瓦楞紙，除非有明確設計理由 |
| 平台 | Arduino Uno（含 Uno Q）或 Raspberry Pi 5 |
| 預算 | NT$ 1,000 |

**評分權重**

| 比重 | 項目 |
|---:|---|
| 30% | 設計邏輯清晰度 |
| 25% | 形式與感受的一致性 |
| 20% | 工程完整性 |
| 15% | 盲測結果呈現 |
| 10% | 反思報告品質 |

---

## 網站章節

12 段獨立可摺疊區段。完整的目錄與檔案對應見 [`docs/PROJECT_MAP.md`](docs/PROJECT_MAP.md)。

```
00 Hero               黑盒子 · 開場旋轉立方體（CSS 3D）
01 感受               感受探索器（情緒詞 → 感官語言 → 物理機制）
02 設計流程           五步驟設計流程
03 硬體               Arduino Uno Q + Raspberry Pi 5 規格與接線
04 程式               State machine 四狀態框架
05 盒子               15cm 正立方體結構與材料
06 跨組串聯           多盒系統動畫（選擇性加分）
07 AI 協作            Antigravity + GitHub 工作流
08 海報規範           A3 海報版面、格線、字型、色彩、必交文件
09 盲測               盲測指引 + 模擬問卷
10 案例               震動 · 聲音 · 光 · 動作 四大類案例
11 評分               評分標準（含自評功能）
12 影片               2-3 分鐘作品記錄影片拍攝指南
```

---

## 技術架構

```
Vite 8 + React 19 + Tailwind CSS 4 + Framer Motion 12
```

**字型系統**（全站統一，螢幕 + 印刷雙重最佳化）

- **拉丁 / UI**：Inter（400–900）
- **中文**：Noto Sans TC（400–900）+ PingFang TC / 微軟正黑體（系統備援）
- **等寬**：IBM Plex Mono（400–700）

**色彩系統**

- 主黑 `#0A0A0A` · 瑞士紅 `#CC0000` · 紙白 `#FFFFFF`
- 灰階：zinc-200 / 300 / 400 / 500 / 700 / 900
- 詳見 `src/components/PosterGuide.jsx` → 色彩規範 tab

---

## 快速開始

```bash
# 安裝依賴
npm install

# 開發伺服器 → http://localhost:5173
npm run dev

# 生產建置 → dist/
npm run build

# 預覽生產版本
npm run preview
```

## 部署

> ⚠️ 2026-07 起本專案已併入課程總站 **course-web**，改由 GitHub Pages 發佈（舊的 rsync 到
> `work.interaction.tw` 已除役失效）。以下 `docs/` 內若仍有舊部署座標，以本段為準。

| 項目 | 值 |
|---|---|
| **正式網址** | https://course.interaction.tw/interactiondesign/blackbox/ |
| **代管** | GitHub Pages（repo `chenweichiang/course-web`，自訂網域 course.interaction.tw） |
| **本專案位置** | `course-web/projects/blackbox/` |
| **build 輸出** | `course-web/interactiondesign/blackbox/`（vite `base` + `outDir` 已設好） |

```bash
# 在 course-web/projects/blackbox/ 下
npm run build          # 直接輸出到 ../../interactiondesign/blackbox/
cd ../.. && git add -A && git commit -m "更新黑盒子頁" && git push
```

push 後 GitHub Pages 自動上線。詳見 course-web 根目錄 `README.md`。

---

## 目錄結構

```
.
├── README.md              ← 本檔案（專案總覽）
├── CHANGELOG.md           ← 變更歷史
├── CLAUDE.md              ← AI 協作者規則（必讀）
├── docs/
│   ├── PROJECT_MAP.md     ← 檔案逐一說明（給 AI 工具用）
│   └── DEVELOPMENT.md     ← 開發慣例與工作流
├── public/
│   ├── if-poster-reference.png    ← iF Award 參考海報
│   └── poster-reference.jpg       ← 黑盒子示範海報
├── src/
│   ├── App.jsx            ← 主應用 + 響應式 nav + footer
│   ├── AIHint.jsx         ← 隱形 AI 上下文注入元件
│   ├── index.css          ← Tailwind import + 字型 + 全域 CSS
│   ├── main.jsx           ← React 入口
│   └── components/        ← 12 個章節元件
├── index.html             ← Vite entry + Google Fonts + AI meta tags
├── package.json
└── vite.config.js
```

完整檔案責任對應見 [`docs/PROJECT_MAP.md`](docs/PROJECT_MAP.md)。

---

## 相關文件

| 檔案 | 用途 | 讀者 |
|---|---|---|
| [`CLAUDE.md`](CLAUDE.md) | AI 協作規則、語言偏好、不可違反的原則 | AI 工具（Claude / Gemini） |
| [`docs/PROJECT_MAP.md`](docs/PROJECT_MAP.md) | 每個檔案的責任、依賴、修改要點 | AI 工具 + 新進開發者 |
| [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) | 開發慣例、響應式策略、deploy 流程 | 開發者（人類或 AI） |
| [`CHANGELOG.md`](CHANGELOG.md) | 版本變更歷史 | 所有人 |

---

## License

教學用途，僅供互動設計課程學生參考使用。
程式碼開放閱讀與學習，圖像素材保留所有權利。

---

🤖 部分內容由 [Claude Code](https://claude.com/claude-code) 協作產生。
