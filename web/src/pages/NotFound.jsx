import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="page-wrap" style={{ minHeight: '50vh' }}>
      <div className="eyebrow" style={{ marginBottom: 16 }}>404</div>
      <h1 className="h1">Stranica nije pronađena</h1>
      <p className="lead" style={{ marginBottom: 28 }}>Stranica koju tražite ne postoji ili je premeštena.</p>
      <Link to="/" className="btn">Početna</Link>
    </main>
  )
}
