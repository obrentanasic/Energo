export default function Tabs({ items, value, onChange, rule = false }) {
  return (
    <div role="tablist" className={`tabs${rule ? ' rule' : ''}`}>
      {items.map(label => (
        <div className="tab-wrap" key={label}>
          <button role="tab" className="tab" aria-selected={label === value} onClick={() => onChange(label)}>{label}</button>
          <span className="div" />
        </div>
      ))}
    </div>
  )
}
