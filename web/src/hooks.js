import { useEffect } from 'react'

const TARGETS = '.proj-card, .news-card, .news-list > article, .stat-grid > div, .rule-card, .person-grid > div, .report, .teaser, .ir-card, .story, .entity, .values > div, .timeline li'

// Fades + lifts below-the-fold blocks in once (opacity/transform, 320ms ease-out, 50ms stagger).
// Anything already in the first screen is left alone so content never waits on the animation.
export function useReveal(key) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    const seen = new WeakSet()
    const io = new IntersectionObserver(entries => {
      let i = 0
      for (const e of entries) {
        if (!e.isIntersecting) continue
        e.target.style.setProperty('--d', `${Math.min(i++, 5) * 50}ms`)
        e.target.classList.add('in')
        io.unobserve(e.target)
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 })
    const scan = () => {
      document.querySelectorAll(TARGETS).forEach(el => {
        if (seen.has(el)) return
        seen.add(el)
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return
        el.classList.add('reveal')
        io.observe(el)
      })
    }
    scan()
    const mo = new MutationObserver(scan) // load-more / tab changes add new cards
    mo.observe(document.getElementById('root'), { childList: true, subtree: true })
    return () => { io.disconnect(); mo.disconnect() }
  }, [key])
}
