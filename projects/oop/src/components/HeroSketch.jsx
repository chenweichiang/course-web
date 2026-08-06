import { useEffect, useRef } from 'react'

// Hero 背景：單棵櫻。
//
// 演算法**不在這個檔案裡**——`public/tree/` 底下的 skeleton / presets / recursive /
// render / light 是從研究專案 chenweichiang/202608-research-p5-tree 原封不動複製的，
// 只有 `public/tree/hero.js` 是本站專用的驅動（挑物種、配色、取景）。
//
// 為什麼用 p5 全域模式而不是 instance 模式：那些檔案是為全域模式寫的
// （直接呼叫 noise / random / beginShape…）。改成 instance 模式要逐一加 `p.` 前綴，
// 等於分岔出第二份程式碼，之後研究專案一改就失去同步。用 `new p5()` 不帶參數
// 即進入全域模式，原始碼一行都不用動。
//
// 同步方式：研究專案改了演算法後，重新複製那五個檔即可（見 README）。

const FILES = ['skeleton.js', 'presets.js', 'recursive.js', 'render.js', 'light.js', 'hero.js']

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[data-tree="${src}"]`)) return resolve()
    const el = document.createElement('script')
    el.src = src
    el.async = false // 依序執行：後面的檔案依賴前面的定義
    el.dataset.tree = src
    el.onload = resolve
    el.onerror = () => reject(new Error(`載入失敗: ${src}`))
    document.head.appendChild(el)
  })
}

export default function HeroSketch() {
  const hostRef = useRef(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    let instance = null
    let cancelled = false
    let observer = null

    ;(async () => {
      const { default: p5 } = await import('p5')
      if (cancelled) return
      p5.disableFriendlyErrors = true
      window.p5 = p5 // 全域模式需要

      for (const f of FILES) {
        await loadScript(`${import.meta.env.BASE_URL}tree/${f}`)
        if (cancelled) return
      }

      // 不帶參數 = 全域模式，會接管 window 上的 setup / draw / windowResized
      instance = new p5()

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        observer = new IntersectionObserver(([e]) => {
          if (!instance) return
          if (e.isIntersecting) instance.loop()
          else instance.noLoop()
        })
        observer.observe(host)
      }
    })().catch((err) => {
      // 背景動畫失敗不該讓頁面掛掉——靜默降級成純紙色背景
      if (import.meta.env.DEV) console.warn('[HeroSketch]', err)
    })

    return () => {
      cancelled = true
      observer?.disconnect()
      instance?.remove()
    }
  }, [])

  return <div ref={hostRef} id="hero-sketch" className="absolute inset-0 pointer-events-none" aria-hidden="true" />
}
