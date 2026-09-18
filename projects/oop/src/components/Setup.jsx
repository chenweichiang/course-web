import { SETUP_ACCOUNTS, SETUP_USAGE, REPO_SETUP, OTHER_CLI, WIN_TERMINAL } from '../data'
import AgyInstall, { Cmd } from './AgyInstall'

const NUMS = ['一', '二', '三', '四', '五']

// 帶國字編號的步驟清單；有 url 的步驟標題可以點
function NumList({ items }) {
  return (
    <div className="card-ink divide-y divide-neutral-900/15">
      {items.map((s, i) => (
        <div key={s.t} className="p-5 flex gap-4">
          <div className="font-display text-2xl text-seal shrink-0 select-none" aria-hidden="true">{NUMS[i]}</div>
          <div className="min-w-0">
            <h4 className="font-bold mb-1">
              {s.url ? (
                <a href={s.url} target="_blank" rel="noopener" className="hover:text-seal transition-colors">
                  {s.t} ↗
                </a>
              ) : (
                s.t
              )}
            </h4>
            <p className="heti text-sm text-neutral-600 leading-relaxed">{s.d}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// 終端機與 shell 是兩層：接在 agy 安裝卡之後，解釋剛剛打開的那個視窗是什麼
function TerminalLayers() {
  return (
    <div>
      <h3 className="font-display text-xl tracking-wide mb-2">終端機是視窗，shell 才是讀你指令的程式</h3>
      <p className="heti text-sm text-neutral-600 leading-relaxed max-w-3xl mb-4">{WIN_TERMINAL.intro}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {WIN_TERMINAL.layers.map((l) => (
          <div key={l.t} className="card-ink p-5">
            <h4 className="font-bold mb-1">{l.t}</h4>
            <p className="heti text-sm text-neutral-600 leading-relaxed">{l.d}</p>
            <p className="heti text-sm text-neutral-600 leading-relaxed mt-2">{l.pick}</p>
          </div>
        ))}
      </div>
      <p className="heti mt-4 text-sm text-neutral-700 leading-relaxed">{WIN_TERMINAL.course}</p>
      <p className="mt-2 text-xs text-neutral-500 leading-relaxed">{WIN_TERMINAL.source}</p>
    </div>
  )
}

export default function Setup() {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="min-w-0">
          <h3 className="font-display text-xl tracking-wide mb-4">要準備的帳號（GitHub 學生驗證最先辦）</h3>
          <div className="card-ink divide-y divide-neutral-900/15">
            {SETUP_ACCOUNTS.map((a) => (
              <div key={a.t} className="p-5">
                <h4 className="font-bold mb-1">
                  <a href={a.url} target="_blank" rel="noopener" className="hover:text-seal transition-colors">
                    {a.t} ↗
                  </a>
                </h4>
                <p className="heti text-sm text-neutral-600 leading-relaxed">{a.d}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-xl tracking-wide mb-4">每個人都要做：開作品集 repo，下載到筆電</h3>
          <NumList items={REPO_SETUP} />
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <a
              href="https://github.com/chenweichiang/oop-portfolio-template"
              target="_blank"
              rel="noopener"
              className="seal-btn inline-block px-5 py-2.5 font-bold text-sm"
            >
              課程 template repo ↗
            </a>
            <span className="text-sm text-neutral-500">四件套的格式、第一次試跑的程式與簡報上傳方式，都寫在 template 的 README 裡。</span>
          </div>
        </div>
      </div>

      <AgyInstall />

      <TerminalLayers />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="min-w-0">
          <h3 className="font-display text-xl tracking-wide mb-4">已經有 Claude 或 ChatGPT 帳號的同學</h3>
          <div className="card-ink p-5">
            <p className="heti text-sm text-neutral-600 leading-relaxed">{OTHER_CLI.intro}</p>
            <div className="mt-4 space-y-6">
              {OTHER_CLI.tools.map((t) => (
                <div key={t.name} className="pt-4 border-t border-neutral-900/15">
                  <h4 className="font-bold">
                    <a href={t.url} target="_blank" rel="noopener" className="hover:text-seal transition-colors">
                      {t.name} ↗
                    </a>
                  </h4>
                  <p className="heti text-sm text-neutral-600 leading-relaxed mt-1">{t.need}</p>
                  <div className="mt-3 font-mono text-xs text-neutral-500">Mac（終端機）</div>
                  <Cmd text={t.mac} />
                  <div className="mt-3 font-mono text-xs text-neutral-500">Windows（PowerShell）</div>
                  <Cmd text={t.win} />
                  <p className="heti text-sm text-neutral-600 leading-relaxed mt-3">
                    裝好後關掉視窗重開，進到作品集 repo 資料夾，輸入 <code className="font-mono">{t.run}</code> 啟動，第一次會請你登入。
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-neutral-500 leading-relaxed">{OTHER_CLI.source}</p>
          </div>
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-xl tracking-wide mb-4">備援：雲端工作室（Codespaces）</h3>
          <NumList items={SETUP_USAGE} />
          <p className="mt-5 text-sm text-neutral-500">Codespace 的登入步驟與排錯寫在 template 的 README 裡，卡住就先翻它。</p>
        </div>
      </div>
    </div>
  )
}
