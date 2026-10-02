import { useState } from 'react'
import Crumbs from '../components/Crumbs'
import ImageSlot from '../components/ImageSlot'
import Tabs from '../components/Tabs'
import { about } from '../content/pages'

export default function ONama() {
  const regions = Object.keys(about.markets)
  const [region, setRegion] = useState('Afrika')
  return (
    <main>
      <div className="page-top">
        <Crumbs trail={[['O nama']]} />
        <div className="eyebrow" style={{ marginBottom: 16 }}>{about.hero.eyebrow}</div>
        <div className="page-head">
          <h1 className="h1">{about.hero.title}</h1>
          <p className="lead">{about.hero.text}</p>
        </div>
      </div>
      <div className="wide-hero"><ImageSlot src={about.hero.image} placeholder={about.hero.placeholder} /></div>

      <section className="section big stat-grid">
        {about.stats.map(([n, l]) => <div key={l}><div className="stat-num">{n}</div><div className="stat-label">{l}</div></div>)}
      </section>

      <section className="bg-grey">
        <div className="section cols-3">
          {about.pillars.map(([t, x]) => <div key={t}><h2>{t}</h2><p>{x}</p></div>)}
        </div>
      </section>

      <section className="section narrow big">
        <h2 className="h2 mb">Istorijat</h2>
        <ol className="timeline">
          {about.timeline.map(([y, d]) => <li key={y}><div className="y">{y}</div><p>{d}</p></li>)}
        </ol>
      </section>

      <section className="bg-grey">
        <div className="section">
          <h2 className="h2 mb">Izvršni odbor</h2>
          <div className="person-grid">
            {about.board.map(([n, r]) => (
              <div key={n}>
                <div className="ph"><ImageSlot placeholder="Portret" alt={n} /></div>
                <div className="person-name">{n}</div><div className="person-role">{r}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="h2 mb-sm">Tržišta</h2>
        <Tabs rule items={regions} value={region} onChange={setRegion} />
        <div className="markets">
          <div className="map-box">Mapa sveta – {region}</div>
          <div>{about.markets[region].map(c => <div className="list-row" key={c}>{c}</div>)}</div>
        </div>
      </section>
    </main>
  )
}
