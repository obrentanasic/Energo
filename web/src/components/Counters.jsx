import { useEffect, useRef, useState } from 'react'

// Counts up (ease-out cubic, 1.6s) the first time 40% of the block is visible.
export default function Counters({ items }) {
  const ref = useRef(null)
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [p, setP] = useState(reduceMotion ? 1 : 0)

  useEffect(() => {
    if (reduceMotion || !ref.current) return
    let raf
    const io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = t => {
        const k = Math.min(1, (t - t0) / 1600)
        setP(1 - Math.pow(1 - k, 3))
        if (k < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    io.observe(ref.current)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [reduceMotion])

  return (
    <div className="counters" ref={ref}>
      {items.map(c => (
        <div key={c.label}>
          <div className="counter-val">{Math.round(c.value * p)}</div>
          <div className="counter-label eyebrow">{c.label}</div>
        </div>
      ))}
    </div>
  )
}
