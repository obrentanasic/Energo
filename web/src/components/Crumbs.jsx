import { Link } from 'react-router-dom'

// trail: [[label, to?], ...] after the implicit "Početna"; the last item is the current page.
export default function Crumbs({ trail }) {
  return (
    <nav className="crumbs" aria-label="Putanja">
      <Link to="/">Početna</Link>
      {trail.map(([label, to], i) => [
        <span key={`s${i}`}>/</span>,
        to ? <Link key={i} to={to}>{label}</Link> : <span key={i} aria-current="page">{label}</span>,
      ])}
    </nav>
  )
}
