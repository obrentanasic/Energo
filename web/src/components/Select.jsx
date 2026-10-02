export default function Select({ label, options, value, onChange }) {
  return (
    <label className="select-field">{label}
      <select value={value} onChange={e => onChange(e.target.value)}>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </label>
  )
}
