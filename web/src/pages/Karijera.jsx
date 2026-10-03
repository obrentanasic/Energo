import { useState } from 'react'
import ImageSlot from '../components/ImageSlot'
import { pages } from '../data'
import { heroImages } from '../content/images'

const ls = pages.careers
const WHY = [['Naši stručnjaci', ls[2]], ['Pravi ljudi', ls[3]], ['Stalno usavršavanje', ls[4]]]

function ApplyForm() {
  const [f, setF] = useState({ ime: '', email: '', cv: '', consent: false })
  const [err, setErr] = useState(false)
  const [sent, setSent] = useState(false)
  const submit = e => {
    e.preventDefault()
    const ok = f.ime.trim() && /^\S+@\S+\.\S+$/.test(f.email) && f.cv && f.consent
    if (ok) setSent(true); else setErr(true)
  }
  const bad = k => err && !f[k]

  if (sent) {
    return (
      <div className="success-box" role="status">
        <div className="t">Prijava je poslata</div>
        <p className="lead" style={{ fontSize: 17 }}>Hvala na interesovanju, {f.ime}. Kontaktiraćemo vas ako imamo poziciju koja odgovara vašem profilu.</p>
      </div>
    )
  }
  return (
    <form className="apply-form apply-inline" noValidate onSubmit={submit}>
      <label className={`field${bad('ime') ? ' invalid' : ''}`}><span className="field-label">Vaše ime*</span>
        <input value={f.ime} onChange={e => setF({ ...f, ime: e.target.value })} autoComplete="name" /></label>
      <label className={`field${bad('email') ? ' invalid' : ''}`}><span className="field-label">Vaš e-mail*</span>
        <input type="email" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} autoComplete="email" /></label>
      <label className="file-drop"><span className="ic">↑</span><span>{f.cv || 'Priložite CV (PDF ili DOC)'}</span>
        <input type="file" accept=".pdf,.doc,.docx" onChange={e => setF({ ...f, cv: e.target.files[0]?.name || '' })} /></label>
      <label className="consent">
        <input type="checkbox" checked={f.consent} onChange={e => setF({ ...f, consent: e.target.checked })} />
        <span>Saglasan/na sam sa obradom podataka u svrhu selekcije.</span>
      </label>
      {err && <span className="field-err">Popunite obavezna polja, priložite CV i potvrdite saglasnost.</span>}
      <div><button type="submit" className="btn" style={{ padding: '16px 32px' }}>Pošalji prijavu</button></div>
    </form>
  )
}

export default function Karijera() {
  const toForm = e => { e.preventDefault(); document.getElementById('prijava')?.scrollIntoView({ behavior: 'smooth' }) }
  return (
    <main>
      <section className="kar-hero">
        <div className="bg"><ImageSlot src={heroImages.careers} placeholder="Fotografija sa gradilišta" /></div>
        <div className="card">
          <div className="eyebrow">Karijera</div>
          <h1 className="h1">Gradite karijeru koja ostaje</h1>
          <p className="lead" style={{ marginBottom: 24 }}>{ls[0]} {ls[1]}</p>
          <a href="#prijava" className="btn" onClick={toForm}>Pošaljite CV</a>
        </div>
      </section>

      <section className="section big">
        <h2 className="h2 mb">Zašto Energoprojekt</h2>
        <div className="cols-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))' }}>
          {WHY.map(([t, x]) => <div className="rule-card" key={t}><h3>{t}</h3><p>{x}</p></div>)}
        </div>
      </section>

      <section id="prijava" className="bg-grey">
        <div className="section split" style={{ alignItems: 'start' }}>
          <div>
            <h2 className="h2" style={{ marginBottom: 16 }}>Otvorena prijava</h2>
            <p className="lead">{ls[5]}</p>
          </div>
          <ApplyForm />
        </div>
      </section>
    </main>
  )
}
