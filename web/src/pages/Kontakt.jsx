import { useState } from 'react'
import Crumbs from '../components/Crumbs'
import Tabs from '../components/Tabs'
import { contact as c } from '../content/pages'
import { footer } from '../content/site'

function Person({ p }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="person-card">
      <div className="eyebrow">{p.dept}</div>
      <div className="person-name">{p.name}</div>
      <div className="person-role">{p.role}</div>
      <button className="btn-outline sm" aria-expanded={open} onClick={() => setOpen(o => !o)}>{open ? 'Sakrij kontakt' : 'Prikaži kontakt'}</button>
      {open && (
        <div className="reveal">
          <a href={`tel:${p.tel.replace(/\s/g, '')}`}>{p.tel}</a>
          <a href={`mailto:${p.mail}`}>{p.mail}</a>
        </div>
      )}
    </div>
  )
}

export default function Kontakt() {
  const names = c.subsidiaries.map(s => s[0])
  const [sub, setSub] = useState(names[0])
  const [region, setRegion] = useState('Srbija')
  const idx = names.indexOf(sub)
  const { hq } = footer

  return (
    <main className="page-wrap">
      <Crumbs trail={[['Kontakt']]} />
      <h1 className="h1" style={{ marginBottom: 48 }}>Povežite se sa nama</h1>

      <div className="contact-top">
        <div className="hq-card">
          <div className="eyebrow">{c.hq.dept}</div>
          <h2>{c.hq.name}</h2>
          <div className="addr">{hq.street}<br />{hq.city}</div>
          <div className="link-stack"><a href={hq.phoneHref}>{hq.phone}</a><a href={`mailto:${hq.email}`}>{hq.email}</a></div>
        </div>
        <div className="map-box dark">Mapa – Novi Beograd</div>
      </div>

      <h2 className="h2 mb-md">Kontakt osobe</h2>
      <div className="people-grid">{c.people.map(p => <Person key={p.name} p={p} />)}</div>

      <h2 className="h2 mb-sm">Zavisna društva</h2>
      <Tabs rule items={names} value={sub} onChange={setSub} />
      <div className="sub-info" style={{ marginTop: 32 }}>
        <div><div className="big">Energoprojekt {sub}</div><div>{hq.street}, Beograd</div></div>
        <div><div className="eyebrow">Telefon</div>+381 11 3101 {500 + idx * 10}</div>
        <div><div className="eyebrow">E-mail</div>{c.subsidiaries[idx][1]}@energoprojekt.rs</div>
      </div>

      <h2 className="h2 mb-sm">Regionalne kancelarije</h2>
      <div className="segmented">
        {Object.keys(c.offices).map(r => <button key={r} aria-pressed={r === region} onClick={() => setRegion(r)}>{r}</button>)}
      </div>
      <div className="office-grid">
        {c.offices[region].map(([city, addr]) => <div className="office" key={city}><div className="c">{city}</div><div className="a">{addr}</div></div>)}
      </div>
    </main>
  )
}
