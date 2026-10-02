import { useState } from 'react'
import Crumbs from '../components/Crumbs'
import Meta from '../components/Meta'
import Select from '../components/Select'
import { investors } from '../content/pages'
import { fmtDate, notices, reportYears, reports } from '../data'

function Kpi({ k }) {
  const max = Math.max(...k.vals)
  return (
    <div className="kpi">
      <div className="t">{k.title}</div>
      <div className="v">{k.vals[4].toLocaleString('sr-RS')}</div>
      <div className="u">u 000 EUR, 2025.</div>
      <div className="bars">
        {k.vals.map((v, i) => <div key={i} title={v.toLocaleString('sr-RS')} style={{ height: `${Math.round(v / max * 100)}%` }} />)}
      </div>
      <div className="bar-years">{['21', '22', '23', '24', '25'].map(y => <span key={y}>{y}</span>)}</div>
    </div>
  )
}

const Pdf = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="doc-link"><span className="pdf-badge">PDF</span>{children}</a>
)

const NOTICE_PAGE = 10
const YEAR_PAGE = 3 // report years shown before "Učitaj starije"

export default function Investitori() {
  const [type, setType] = useState('Sve vrste')
  const [year, setYear] = useState('Sve godine')
  const [kind, setKind] = useState('Sva obaveštenja')
  const [n, setN] = useState(NOTICE_PAGE)
  const [ny, setNy] = useState(YEAR_PAGE)
  const [touched, setTouched] = useState(false)

  const list = reports.filter(r => (type === 'Sve vrste' || r.type === type) && (year === 'Sve godine' || r.year === year))
  const allYears = [...new Set(list.map(r => r.year))]
  const years = allYears.slice(0, ny)
  const hiddenReports = list.filter(r => !years.includes(r.year)).length
  const nlist = notices.filter(x => kind === 'Sva obaveštenja' || x.noticeKind === kind)
  const go = id => e => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }

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
          <h2 className="h2 mb">Poslovni rezultati 2021–2025</h2>
          <div className="kpi-grid">{investors.kpis.map(k => <Kpi key={k.title} k={k} />)}</div>
        </div>
      </section>

      <section className="section tight-top sub-links">
        {[['Finansijski izveštaji', 'izvestaji'], ['Obaveštenja akcionarima', 'obavestenja']].map(([s, id]) => (
          <a key={id} href={`#${id}`} onClick={go(id)}>{s}<span className="box" aria-hidden="true">→</span></a>
        ))}
      </section>

      <section id="izvestaji" className="section">
        <h2 className="h2 mb-md">Finansijski izveštaji</h2>
        <div className="filters" style={{ marginBottom: 48 }}>
          <Select label="Vrsta izveštaja" options={investors.reportTypes} value={type} onChange={v => { setType(v); setNy(YEAR_PAGE) }} />
          <Select label="Godina" options={['Sve godine', ...reportYears]} value={year} onChange={v => { setYear(v); setNy(YEAR_PAGE) }} />
        </div>
        {!list.length && <div className="empty-box">Nema izveštaja za izabrane filtere.</div>}
        {years.map(y => (
          <div className="report-year" key={y}>
            <h3>{y}</h3>
            <div className="report-stack">
              {list.filter(r => r.year === y).map(r => (
                <div className="report" key={r.pdf}>
                  <Meta parts={[r.type, r.consolidated ? 'Konsolidovani' : 'Pojedinačni']} />
                  <h4 style={{ marginBottom: 12 }}>{r.title}</h4>
                  <Pdf href={r.pdf}>Preuzmite izveštaj</Pdf>
                </div>
              ))}
            </div>
          </div>
        ))}
        {hiddenReports > 0 && (
          <div className="load-more"><button className="btn-outline" onClick={() => setNy(v => v + YEAR_PAGE)}>Starije godine ({hiddenReports})</button></div>
        )}
      </section>

      <section id="obavestenja" className="bg-grey">
        <div className="section">
          <h2 className="h2 mb-md">Obaveštenja akcionarima</h2>
          <div className="filters" style={{ marginBottom: 32 }}>
            <Select label="Vrsta" options={investors.noticeKinds} value={kind} onChange={v => { setKind(v); setN(NOTICE_PAGE); setTouched(true) }} />
          </div>
          <div className="report-stack">
            {nlist.slice(0, n).map(x => (
              <div className={`report${touched ? ' enter' : ''}`} style={{ background: 'var(--white)' }} key={x.slug}>
                <Meta parts={[fmtDate(x.date), x.noticeKind]} />
                <h4 style={{ margin: '6px 0 12px', fontSize: 20 }}>{x.title}</h4>
                {x.pdf && <Pdf href={x.pdf}>Preuzmite dokument</Pdf>}
              </div>
            ))}
          </div>
          {nlist.length > n && (
            <div className="load-more"><button className="btn-outline" onClick={() => { setN(v => v + NOTICE_PAGE); setTouched(true) }}>Učitaj još ({nlist.length - n})</button></div>
          )}
        </div>
      </section>
    </main>
  )
}
