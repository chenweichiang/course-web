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

# 部署到 Vultr VPS
rsync -avz --delete dist/ research-server:/home/ccw/server/work/interactiondesign/114-2/
```

**典型部署一氣呵成**

```bash
npm run build && rsync -avz --delete dist/ research-server:/home/ccw/server/work/interactiondesign/114-2/
```

---

## 部署

### 部署座標

| 項目 | 值 |
|---|---|
| **正式網址** | https://work.interaction.tw/interactiondesign/114-2/ |
| **網域** | `work.interaction.tw` |
| **伺服器路徑** | `/home/ccw/server/work/interactiondesign/114-2/` |
| **SSH alias** | `research-server` |
| **服務軟體** | Caddy（系統級 systemd 服務） |
| **HTTPS** | 自動由 Caddy 簽發與更新 |

Caddy 設定關鍵片段（讀者參考用，**不要在這裡修改**，要改伺服器端）：

```caddy
work.interaction.tw {
  handle /interactiondesign/114-2/* {
    root * /home/ccw/server/work
    file_server
  }
}
```

### 前置設定（首次部署需要）

要在 `~/.ssh/config` 加 `research-server` alias。SSH 連線細節（HostName / User / IdentityFile）由維護者私下提供，本文件**不公開隱私資訊**。

配好之後驗證連線：

```bash
ssh research-server "ls /home/ccw/server/work/interactiondesign/"
# 預期輸出：114-2
```

### 部署步驟

```bash
# 1. 開發本機目錄
cd ~/Documents/Developer/interaction_design_finalwork

# 2. 確認本地 dev 看起來正常
npm run dev
# → http://localhost:5173 (Ctrl-C 結束)

# 3. 建置生產版本
npm run build
ls dist/    # 確認有 index.html / assets/ / *.jpg / *.png

# 4. 推送到伺服器
rsync -avz --delete dist/ research-server:/home/ccw/server/work/interactiondesign/114-2/

# 5. 開瀏覽器確認
open https://work.interaction.tw/interactiondesign/114-2/
```

### 安全 / 操作注意

- **絕對不透過 git push 觸發部署**——沒有 CI/CD，git 只是版本管理
- `--delete` 旗標會刪除伺服器上 dist 沒有的檔案，**確認 build 完整再執行**
- 部署立刻生效（Caddy 直接從目錄 serve 檔案，無需重啟）
- 不要把 SSH 私鑰、`~/.ssh/config` 內的伺服器 IP / Port / User 寫進任何 commit 或公開文件

### 故障排除

| 症狀 | 排查 |
|---|---|
| `ssh research-server` 失敗 | 檢查 `~/.ssh/config`、私鑰權限（`chmod 600`）、防火牆 |
| `rsync` 完成但網頁沒更新 | Cmd-Shift-R 強制重新整理；確認 build 是最新 |
| HTTPS 憑證錯誤 | Caddy 會自動處理，若持續可 SSH 進去 `sudo systemctl status caddy` |
| 樣式 / JS 路徑 404 | 檢查 `vite.config.js` 的 `base` 設定是否對應 `/interactiondesign/114-2/` |

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
- **co-authored**：AI 協作的 commit 加 `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`

範例：

```
新增海報規範區段、全站字體統一、行動裝置 UIUX 改善

- 新增 08 海報規範 (PosterGuide.jsx)
- 全站字體改為 Inter + Noto Sans TC + IBM Plex Mono
- 頂部 nav 行動裝置改 hamburger 抽屜選單
...

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

### Remote

```bash
# 已設定
origin   https://github.com/chenweichiang/course-interaction.git

# Push（不會觸發部署，純版控）
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

### 5. 不要 commit `dist/`

`dist/` 已在 `.gitignore`。若不慎被加入索引：

```bash
git rm -r --cached dist/
git commit -m "從版控移除 dist/"
```

### 6. macOS rsync 路徑有空格

部署路徑沒空格，但本機開發路徑 `~/Documents/Developer/interaction_design_finalwork/` 也沒有，問題不大。
若改名含空格，所有 cd / rsync 都要 quote。

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

### rsync 部署後沒生效

1. 確認 `dist/` 內容是最新 build（不是舊的）
2. 確認部署目標路徑正確
3. 確認 server 端 Caddy 服務正常（可 SSH 進去 `docker ps`）

---

## 進階：本地預覽生產建置

```bash
npm run build
npm run preview
# → http://localhost:4173
```

`preview` 模擬生產環境 serve，可測試是否所有資源（圖片、字型）路徑正確。
若 `dev` 看起來正常但 `preview` 壞了，通常是路徑問題。
