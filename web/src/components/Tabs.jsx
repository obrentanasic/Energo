import { useEffect, useRef } from 'react'

export default function Tabs({ items, value, onChange, rule = false }) {
  const ref = useRef(null)
  // On phones the row scrolls sideways; keep the selected tab in view (e.g. when a sector is preset).
  useEffect(() => {
    const box = ref.current
    const sel = box?.querySelector('[aria-selected="true"]')
    if (!box || !sel || box.scrollWidth <= box.clientWidth) return
    const l = sel.offsetLeft - box.offsetLeft
    if (l < box.scrollLeft || l + sel.offsetWidth > box.scrollLeft + box.clientWidth) box.scrollLeft = l - 16
  }, [value])
  return (
    <div role="tablist" ref={ref} className={`tabs${rule ? ' rule' : ''}`}>
      {items.map(label => (
        <div className="tab-wrap" key={label}>
          <button role="tab" className="tab" aria-selected={label === value} onClick={() => onChange(label)}>{label}</button>
          <span className="div" />
        </div>
      ))}
    </div>
  )
}
