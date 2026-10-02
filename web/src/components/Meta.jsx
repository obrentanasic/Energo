export default function Meta({ parts }) {
  return (
    <div className="meta">
      {parts.map((p, i) => [i > 0 && <span key={`s${i}`} className="sep" />, <span key={i}>{p}</span>])}
    </div>
  )
}
