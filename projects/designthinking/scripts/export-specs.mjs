#!/usr/bin/env node
// 交付物規格匯出：src/deliverables.js（唯一來源）→ 備課專案 教材/交付物規格.md ＋ wiki 原始碼
// 用法：node scripts/export-specs.mjs            → 寫 md 到備課 repo、wiki 到 /tmp/dt-specs.wiki
//       node scripts/export-specs.mjs --wiki-only
import { DELIVERABLES, DEMO, MIRO } from '../src/deliverables.js'
import { MILESTONE_GUIDE } from '../src/data.js'
import { writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

const MD_OUT = join(homedir(), 'Developer/202608 課程 設計思考/教材/交付物規格.md')
const WIKI_OUT = '/tmp/dt-specs.wiki'
const groups = MILESTONE_GUIDE.map((m) => ({ m, items: DELIVERABLES.filter((d) => d.ms === m.id) })).filter((g) => g.items.length)
const today = new Date().toISOString().slice(0, 10)

// ---------- markdown ----------
let md = `# 設計思考 115-1 交付物規格\n\n> 由 course-web \`projects/designthinking/src/deliverables.js\` 匯出（唯一來源，改內容改那裡再重跑 \`node scripts/export-specs.mjs\`）。${today}。\n> 共 ${DELIVERABLES.length} 張，每張九欄：形式與篇幅、要回答什麼、欄位、填好的範例、怎麼做、驗收標準、常見錯誤（提醒）、下一站誰用它、AI 可以幫什麼。格式對齊同學期脈絡設計課。\n\n## ${MIRO.title}\n\n${MIRO.rules.map((r, i) => `${i + 1}. ${r}`).join('\n')}\n\n## 示範專案\n\n**${DEMO.name}**。${DEMO.note}\n\n`
for (const { m, items } of groups) {
  md += `\n---\n\n## ${m.id} ${m.name}（${m.when}）\n\n| # | 交付物 |\n|---|---|\n`
  items.forEach((d, i) => { md += `| ${i + 1} | ${d.name} |\n` })
  items.forEach((d, i) => {
    md += `\n### ${i + 1}. ${d.name}\n\n**形式與篇幅**：${d.form}，${d.size}。\n\n**要回答什麼**：${d.what}\n\n**欄位**\n`
    d.fields.forEach((f, j) => { md += `${j + 1}. ${f}\n` })
    md += `\n**填好的範例（${DEMO.name}）**\n\`\`\`\n${d.example}\n\`\`\`\n`
    if (d.how) { md += `\n**怎麼做**\n`; d.how.forEach((f, j) => { md += `${j + 1}. ${f}\n` }) }
    if (d.accept) { md += `\n**驗收標準**\n`; d.accept.forEach((f) => { md += `- [ ] ${f}\n` }) }
    if (d.tips) md += `\n**提醒**：${d.tips}\n`
    if (d.next) md += `\n**下一站誰用它**：${d.next}\n`
    if (d.ai) md += `\n**AI 可以幫什麼**：${d.ai}\n`
  })
}

// ---------- wiki ----------
const w = (s) => s.replace(/\*\*(.+?)\*\*/g, "'''$1'''")
let wiki = `<templatestyles src="設計系統2/styles.css" />\n<div class="ds-root">\n<div class="ds-hero">\n<div class="kicker">115 學年度第 1 學期 · 設計思考</div>\n<div class="title">交付物規格</div>\n<div class="meta"><span><b>授課教師</b>江振維</span><span><b>卡片</b>${DELIVERABLES.length} 張（M0–M6）</span><span><b>版本</b>${today}</span></div>\n</div>\n\n[[Course:115-1/設計思考|課程主頁]]點名的每一份交付物，這裡一張一張說清楚：長什麼樣、要填哪些欄、填好是什麼樣子、怎麼做、做到什麼程度算過、下一站誰會用它、AI 可以幫什麼。全部用同一個示範專案貫穿。格式對齊同學期[[Course:115-1/脈絡設計與實踐/交付物規格|脈絡設計課的規格卡]]。\n\n''本頁由課程網頁的 <code>deliverables.js</code> 生成（<code>node scripts/export-specs.mjs</code>），改內容請改來源檔再重新同步，不要直接改本頁。''\n\n== ${MIRO.title} ==\n\n${MIRO.rules.map((r) => `# ${r}`).join('\n')}\n\n'''${DEMO.name}'''。${DEMO.note}\n\n__TOC__\n`
for (const { m, items } of groups) {
  wiki += `\n== ${m.id} ${m.name}（${m.when}） ==\n\n{| class="wikitable"\n! # !! 交付物\n`
  items.forEach((d, i) => { wiki += `|-\n| ${i + 1} || ${d.name}\n` })
  wiki += `|}\n`
  items.forEach((d, i) => {
    wiki += `\n=== ${i + 1}. ${d.name} ===\n\n'''形式與篇幅'''：${d.form}，${d.size}。\n\n'''要回答什麼'''：${d.what}\n\n'''欄位'''\n\n`
    d.fields.forEach((f) => { wiki += `# ${w(f)}\n` })
    wiki += `\n'''填好的範例（${DEMO.name}）'''\n\n<pre>${d.example}</pre>\n`
    if (d.how) { wiki += `\n'''怎麼做'''\n\n`; d.how.forEach((f) => { wiki += `# ${w(f)}\n` }) }
    if (d.accept) { wiki += `\n'''驗收標準'''\n\n`; d.accept.forEach((f) => { wiki += `* ☐ ${w(f)}\n` }) }
    if (d.tips) wiki += `\n'''提醒'''：${d.tips}\n`
    if (d.next) wiki += `\n'''下一站誰用它'''：${d.next}\n`
    if (d.ai) wiki += `\n'''AI 可以幫什麼'''：${d.ai}\n`
  })
}
wiki += `\n</div>\n\n[[Category:課程]]\n[[Category:115-1 課程]]\n`

if (!process.argv.includes('--wiki-only')) { writeFileSync(MD_OUT, md); console.log('md  →', MD_OUT, md.length) }
writeFileSync(WIKI_OUT, wiki); console.log('wiki →', WIKI_OUT, wiki.length)
if (wiki.includes('../')) console.warn('⚠️ 內容含 ../，wiki WAF 會擋')
