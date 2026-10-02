import { Link } from 'react-router-dom'

// Stand-in for pages not built yet.
export default function ComingSoon({ title }) {
  return (
    <main className="wrap" style={{ padding: 'var(--section-y) var(--gutter)', minHeight: '50vh' }}>
      <div className="eyebrow" style={{ marginBottom: 16 }}>U pripremi</div>
      <h1 className="h1">{title}</h1>
      <p className="lead" style={{ marginBottom: 28 }}>Ova stranica je u izradi.</p>
      <Link to="/" className="btn">Početna</Link>
    </main>
  )
}
