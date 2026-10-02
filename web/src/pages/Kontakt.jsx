import { useState } from 'react'
import Crumbs from '../components/Crumbs'
import Linkify from '../components/Linkify'
import Tabs from '../components/Tabs'
import { abroadCountries, contactData } from '../data'

const [hq, ...subs] = contactData.domestic
const short = n => n.replace(/^Energoprojekt /, '').replace(/ (a\.d\.|d\.o\.o\.)$/, '')

function Entity({ e }) {
  return (
    <div className="entity">
      <div className="n">{e.name}</div>
      {e.lines.map((l, i) => <div key={i}><Linkify text={l} /></div>)}
    </div>
  )
}

export default function Kontakt() {
  const [sub, setSub] = useState(short(subs[0].name))
  const [country, setCountry] = useState(abroadCountries[0])
  const current = subs.find(s => short(s.name) === sub)

  return (
    <main className="page-wrap">
      <Crumbs trail={[['Kontakt']]} />
      <h1 className="h1" style={{ marginBottom: 48 }}>Povežite se sa nama</h1>

      <div className="contact-top">
        <div className="hq-card">
          <div className="eyebrow">Sedište</div>
          <h2>{hq.name}</h2>
          <div className="addr">{hq.lines.slice(0, 2).map(l => <div key={l}>{l}</div>)}</div>
          <div className="link-stack">
            <a href="tel:+381113101010">+381 11 3101010</a>
            <a href="mailto:ep@energoprojekt.rs">ep@energoprojekt.rs</a>
          </div>
        </div>
        <div className="map-box dark">Mapa – Novi Beograd</div>
      </div>

      <h2 className="h2 mb-md">Mediji</h2>
      <div className="people-grid">
        <div className="person-card">
          <div className="eyebrow">Zahtev za intervju</div>
          <p className="lead" style={{ fontSize: 17, marginBottom: 16 }}>Zahtev za intervju sa generalnim direktorom, izvršnim direktorima, direktorima preduzeća iz Sistema Energoprojekt i članovima Nadzornog odbora pošaljite na e-mail.</p>
          <a className="btn-outline sm" href="mailto:pr@energoprojekt.rs">pr@energoprojekt.rs</a>
        </div>
        <div className="person-card">
          <div className="eyebrow">Zahtev za snimanje</div>
          <p className="lead" style={{ fontSize: 17, marginBottom: 16 }}>Novinari i foto i filmske ekipe zainteresovane za snimanje poslovne zgrade, objekata u vlasništvu Energoprojekta ili gradilišta šalju zahtev za svako pojedinačno snimanje.</p>
          <a className="btn-outline sm" href="mailto:pr@energoprojekt.rs">pr@energoprojekt.rs</a>
        </div>
      </div>

      <h2 className="h2 mb-sm">Zavisna društva</h2>
      <Tabs rule items={subs.map(s => short(s.name))} value={sub} onChange={setSub} />
      <div className="entity-grid" style={{ marginBottom: 'var(--section-y)' }}>{current && <Entity e={current} />}</div>

      <h2 className="h2 mb-sm">Predstavništva i filijale u inostranstvu</h2>
      <Tabs rule items={abroadCountries} value={country} onChange={setCountry} />
      <div className="entity-grid">
        {contactData.abroad.filter(e => e.country === country).map(e => <Entity key={e.name + e.lines[0]} e={e} />)}
      </div>
    </main>
  )
}
