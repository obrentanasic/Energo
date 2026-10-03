import { useState } from 'react'
import Crumbs from '../components/Crumbs'
import ImageSlot from '../components/ImageSlot'
import Tabs from '../components/Tabs'
import OfficeMap from '../components/OfficeMap'
import { pages, projectList } from '../data'
import { heroImages } from '../content/images'
import { OFFICE_PINS } from '../content/worldmap'

const about = pages.about
const REGIONS = ['Evropa', 'Afrika', 'Bliski istok', 'Azija', 'Južna Amerika']
const countriesIn = r => [...new Set(projectList.filter(p => p.regions.includes(r)).flatMap(p => p.country.split(/,| i /).map(c => c.trim())).filter(Boolean))].sort()

// "Naziv društva / Usluge / Oblasti delovanja" table: rows start at lines beginning with "Energoprojekt ".
function subsidiaryRows(ls) {
  const start = ls.indexOf('Oblasti delovanja') + 1
  const rows = []
  for (const l of ls.slice(start)) {
    if (/^Energoprojekt /.test(l)) rows.push({ name: l, rest: [] })
    else rows.at(-1)?.rest.push(l)
  }
  return rows.map(r => ({ name: r.name.replace(/^Energoprojekt /, ''), service: r.rest[0] || '', areas: r.rest.slice(1) }))
}

// "Profesionalnost:" followed by its description, repeated.
function values(ls) {
  const out = []
  ls.forEach((l, i) => { if (/^[\wČĆŽŠĐčćžšđ ]+:$/.test(l) && ls[i + 1]) out.push([l.slice(0, -1), ls[i + 1]]) })
  return out
}

export default function ONama() {
  const [region, setRegion] = useState('Afrika')
  const [pin, setPin] = useState(null)
  const intro = about.ko_smo[0]
  const rows = subsidiaryRows(about.ko_smo)
  const vals = values(about.vizija)
  const prose = about.ko_smo.slice(1, about.ko_smo.indexOf('Naziv društva'))
  const board = about.board

  return (
    <main>
      <div className="page-top">
        <Crumbs trail={[['O nama']]} />
        <div className="eyebrow" style={{ marginBottom: 16 }}>Ko smo</div>
        <div className="page-head">
          <h1 className="h1">Sedam decenija inženjerstva bez granica</h1>
          <p className="lead">{intro}</p>
        </div>
      </div>
      <div className="wide-hero"><ImageSlot src={heroImages.about} placeholder="Sedište kompanije – fotografija" /></div>

      <section className="section big stat-grid">
        {[['1951', 'Godina osnivanja'], ['810', 'Zaposlenih'], ['15', 'Zemalja poslovanja'], ['70+', 'Zemalja realizovanih projekata']].map(([n, l]) => (
          <div key={l}><div className="stat-num">{n}</div><div className="stat-label">{l}</div></div>
        ))}
      </section>

      <section className="section narrow no-bottom" style={{ paddingTop: 0 }}>
        <div className="prose" style={{ padding: 0 }}>{prose.map(t => <p key={t}>{t}</p>)}</div>
      </section>

      <section className="section">
        <h2 className="h2 mb-md">Sistem Energoprojekt</h2>
        <div className="jobs-wrap">
          <table className="org-table">
            <thead><tr><th>Naziv društva</th><th>Usluge</th><th>Oblasti delovanja</th></tr></thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.name}><td>{r.name}</td><td>{r.service}</td><td>{r.areas.map(a => <div key={a}>{a}</div>)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="misija" className="bg-grey">
        <div className="section">
          <div className="cols-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))' }}>
            <div><h2>Misija</h2><p>{about.vizija[0]}</p></div>
            <div><h2>Vizija</h2><p>{about.vizija[1]}</p></div>
          </div>
          {vals.length > 0 && (
            <>
              <h2 className="h2 mb-sm" style={{ marginTop: 72 }}>Vrednosti</h2>
              <dl className="values" style={{ marginTop: 0 }}>{vals.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            </>
          )}
        </div>
      </section>

      <section id="istorijat" className="section narrow big">
        <h2 className="h2 mb">Istorijat</h2>
        <ol className="timeline">
          {about.istorijat.map(t => (
            <li key={t.year}><div className="y">{t.year}</div>{t.text.map(x => <p key={x}>{x}</p>)}</li>
          ))}
        </ol>
      </section>

      {board.length > 0 && (
        <section id="organizacija" className="bg-grey">
          <div className="section">
            <h2 className="h2 mb">Organi upravljanja</h2>
            <div className="person-grid">
              {board.map(b => (
                <div className="person-card2" key={b.name}>
                  <div className="ph"><ImageSlot src={b.photo} alt={b.name} placeholder="Portret" /></div>
                  <div className="person-name">{b.name}</div>
                  {b.role && <div className="person-role">{b.role}</div>}
                  <details><summary>Biografija</summary>{b.bio.map(t => <p key={t}>{t}</p>)}</details>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="trzista" className="section">
        <h2 className="h2 mb-sm">Tržišta</h2>
        <p className="lead" style={{ marginBottom: 32, maxWidth: 840 }}>{about.trzista[1]}</p>
        <Tabs rule items={REGIONS} value={region} onChange={setRegion} />
        <div className="markets">
          <div>
            <OfficeMap region={region} active={pin} onActive={setPin} className="framed" />
            <div className="map-legend">
              <span className="eyebrow">Kancelarije u regionu</span>
              {OFFICE_PINS.filter(p => p.region === region).map(p => (
                <button type="button" key={p.city} className={`chip${pin === p.city ? ' on' : ''}`}
                  onMouseEnter={() => setPin(p.city)} onMouseLeave={() => setPin(null)} onFocus={() => setPin(p.city)} onBlur={() => setPin(null)}>
                  {p.city}, {p.country}{p.city === 'Beograd' ? ' (sedište)' : ''}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ color: 'var(--muted)', marginBottom: 4 }}>Zemlje u kojima smo radili</div>
            {countriesIn(region).map(c => <div className="list-row" key={c}>{c}</div>)}
          </div>
        </div>
      </section>

      <section id="publikacije" className="bg-grey">
        <div className="section narrow">
          <h2 className="h2 mb-sm">Publikacije</h2>
          <div className="prose" style={{ padding: 0 }}>{about.publikacije.map(t => <p key={t}>{t}</p>)}</div>
        </div>
      </section>
    </main>
  )
}
