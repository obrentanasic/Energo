import { useState } from 'react'
import { Link } from 'react-router-dom'
import Crumbs from '../components/Crumbs'
import Meta from '../components/Meta'
import Select from '../components/Select'
import { investors } from '../content/pages'

function Kpi({ k }) {
  const max = Math.max(...k.vals)
  return (
    <div className="kpi">
      <div className="t">{k.title}</div>
      <div className="v">{k.vals[4].toLocaleString('sr-RS')}</div>
      <div className="u">mil. RSD, 2025.</div>
      <div className="bars">
        {k.vals.map((v, i) => <div key={i} title={v} style={{ height: `${Math.round(v / max * 100)}%` }} />)}
      </div>
      <div className="bar-years">{['21', '22', '23', '24', '25'].map(y => <span key={y}>{y}</span>)}</div>
    </div>
  )
}

const Pdf = ({ children }) => (
  <a href="#/investitori" className="doc-link"><span className="pdf-badge">PDF</span>{children}</a>
)

export default function Investitori() {
  const [type, setType] = useState('Sve vrste')
  const [year, setYear] = useState('Sve godine')
  const list = investors.reports.filter(r => (type === 'Sve vrste' || r.type === type) && (year === 'Sve godine' || r.year === year))
  const years = [...new Set(list.map(r => r.year))]

  return (
    <main>
      <div className="page-top">
        <Crumbs trail={[['Za investitore']]} />
        <div className="page-head top">
          <h1 className="h1">Za investitore</h1>
          <p className="lead">{investors.intro}</p>
        </div>
      </div>

      <section className="bg-grey">
        <div className="section" style={{ paddingTop: 'clamp(56px,7vw,96px)', paddingBottom: 'clamp(56px,7vw,96px)' }}>
          <h2 className="h2 mb">Ključni pokazatelji 2021–2025</h2>
          <div className="kpi-grid">{investors.kpis.map(k => <Kpi key={k.title} k={k} />)}</div>
        </div>
      </section>

      <section className="section tight-top sub-links">
        {investors.subpages.map(s => (
          <a key={s} href="#izvestaji" onClick={e => { e.preventDefault(); document.getElementById('izvestaji')?.scrollIntoView({ behavior: 'smooth' }) }}>
            {s}<span className="box" aria-hidden="true">→</span>
          </a>
        ))}
      </section>

      <section id="izvestaji" className="section">
        <h2 className="h2 mb-md">Finansijski izveštaji</h2>
        <div className="filters" style={{ marginBottom: 48 }}>
          <Select label="Vrsta izveštaja" options={investors.reportTypes} value={type} onChange={setType} />
          <Select label="Godina" options={investors.reportYears} value={year} onChange={setYear} />
        </div>
        {!list.length && <div className="empty-box">Nema izveštaja za izabrane filtere.</div>}
        {years.map(y => (
          <div className="report-year" key={y}>
            <h3>{y}</h3>
            <div className="report-stack">
              {list.filter(r => r.year === y).map(r => (
                <div className="report" key={r.title}>
                  <Meta parts={[r.date, r.type]} />
                  <h4>{r.title}</h4>
                  <div className="report-cols">
                    <div><div className="eyebrow">Priloženi dokumenti</div>{r.docs.map(d => <Pdf key={d}>{d}</Pdf>)}</div>
                    <div><div className="eyebrow">Prezentacije</div><Pdf>Prezentacija rezultata</Pdf></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <Link to="/kontakt" className="link-u">Pitanja za odnose sa investitorima</Link>
      </section>
    </main>
  )
}
