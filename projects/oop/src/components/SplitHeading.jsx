import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

// 標題逐字進場（GSAP SplitText，2025 起免費）。
// scroll=true 捲到再播（once）；scroll=false 掛載即播（hero 用）。
export default function SplitHeading({ as: Tag = 'h2', className = '', scroll = true, delay = 0, children }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let split
    let tween
    let alive = true
    document.fonts.ready.then(() => {
      if (!alive || !el) return
      split = new SplitText(el, { type: 'chars', mask: 'chars' })
      tween = gsap.from(split.chars, {
        yPercent: 115,
        duration: 0.55,
        ease: 'power3.out',
        stagger: 0.035,
        delay,
        scrollTrigger: scroll ? { trigger: el, start: 'top 88%', once: true } : undefined,
      })
    })
    return () => {
      alive = false
      tween?.scrollTrigger?.kill()
      tween?.kill()
      split?.revert()
    }
  }, [scroll, delay])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
