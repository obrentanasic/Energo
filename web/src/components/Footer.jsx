import { Link } from 'react-router-dom'
import { footer } from '../content/site'

export default function Footer() {
  const { tagline, columns, hq } = footer
  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <p className="footer-tagline">{tagline}</p>
        {columns.map(col => (
          <div className="footer-col" key={col.title}>
            <div className="eyebrow">{col.title}</div>
            {col.links.map(([label, to]) => <Link key={label} to={to}>{label}</Link>)}
          </div>
        ))}
        <div className="footer-hq">
          <div className="eyebrow">Sedište</div>
          <span>{hq.street}</span>
          <span>{hq.city}</span>
          <a href={hq.phoneHref}>{hq.phone}</a>
          <a href={`mailto:${hq.email}`}>{hq.email}</a>
          <div className="socials">
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="YouTube">▶</a>
          </div>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© 2026 Energoprojekt holding a.d.</span>
        <a href="#">Politika privatnosti</a>
        <a href="#">Kolačići</a>
        <a href="#">Pristupačnost</a>
        <img src="assets/logo-white.png" alt="Energoprojekt" />
      </div>
    </footer>
  )
}
