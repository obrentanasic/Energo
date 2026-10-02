import { useEffect, useState } from 'react'
import ImageSlot from '../components/ImageSlot'
import Select from '../components/Select'
import { careers } from '../content/pages'

const EMPTY = { ime: '', email: '', cv: '', consent: false }

function JobDrawer({ job, onClose }) {
  const [f, setF] = useState(EMPTY)
  const [err, setErr] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const onKey = e => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.classList.add('no-scroll')
    return () => { document.removeEventListener('keydown', onKey); document.body.classList.remove('no-scroll') }
  }, [onClose])

  const submit = e => {
    e.preventDefault()
    const ok = f.ime.trim() && /^\S+@\S+\.\S+$/.test(f.email) && f.cv && f.consent
    if (ok) setSent(true); else setErr(true)
  }
  const bad = k => err && !f[k]

  return (
    <div className="drawer-back" onClick={onClose}>
      <div className="drawer" role="dialog" aria-modal="true" aria-label={job.title} onClick={e => e.stopPropagation()}>
        <div className="drawer-head">
          <span className="eyebrow">{job.sector} | {job.location}</span>
          <button className="close-btn" onClick={onClose} aria-label="Zatvori">×</button>
        </div>
        <h2>{job.title}</h2>
        <div className="deadline">Rok za prijavu: {job.deadline}</div>
        <p className="lead" style={{ marginBottom: 32 }}>{careers.jobText}</p>
        {sent ? (
          <div className="success-box" role="status">
            <div className="t">Prijava je poslata</div>
            <p className="lead" style={{ fontSize: 17 }}>Hvala na interesovanju. Kontaktiraćemo vas nakon isteka roka za prijavu.</p>
          </div>
        ) : (
          <form className="apply-form" noValidate onSubmit={submit}>
            <label className={`field${bad('ime') ? ' invalid' : ''}`}><span className="field-label">Ime i prezime*</span>
              <input value={f.ime} onChange={e => setF({ ...f, ime: e.target.value })} /></label>
            <label className={`field${bad('email') ? ' invalid' : ''}`}><span className="field-label">E-mail*</span>
              <input type="email" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} /></label>
            <label className="file-drop"><span className="ic">↑</span><span>{f.cv || 'Priložite CV (PDF ili DOC, do 5 MB)'}</span>
              <input type="file" accept=".pdf,.doc,.docx" onChange={e => setF({ ...f, cv: e.target.files[0]?.name || '' })} /></label>
            <label className="consent">
              <input type="checkbox" checked={f.consent} onChange={e => setF({ ...f, consent: e.target.checked })} />
              <span>Saglasan/na sam sa obradom podataka u svrhu selekcije.</span>
            </label>
            {err && <span className="field-err">Popunite obavezna polja, priložite CV i potvrdite saglasnost.</span>}
            <div><button type="submit" className="btn" style={{ padding: '16px 32px' }}>Pošalji prijavu</button></div>
          </form>
        )}
      </div>
    </div>
  )
}

export default function Karijera() {
  const [loc, setLoc] = useState('Sve lokacije')
  const [sec, setSec] = useState('Svi sektori')
  const [job, setJob] = useState(null)
  const jobs = careers.jobs.filter(j => (loc === 'Sve lokacije' || j.location === loc) && (sec === 'Svi sektori' || j.sector === sec))
  const toJobs = e => { e.preventDefault(); document.getElementById('poslovi')?.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <main>
      <section className="kar-hero">
        <div className="bg"><ImageSlot placeholder={careers.hero.placeholder} /></div>
        <div className="card">
          <div className="eyebrow">Karijera</div>
          <h1 className="h1">{careers.hero.title}</h1>
          <p className="lead" style={{ marginBottom: 24 }}>{careers.hero.text}</p>
          <a href="#poslovi" className="btn" onClick={toJobs}>Slobodna radna mesta</a>
        </div>
      </section>

      <section className="section big">
        <h2 className="h2 mb">Zašto Energoprojekt</h2>
        <div className="cols-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))' }}>
          {careers.why.map(([t, x]) => <div className="rule-card" key={t}><h3>{t}</h3><p>{x}</p></div>)}
        </div>
      </section>

      <section className="bg-grey">
        <div className="section">
          <h2 className="h2 mb">Priče zaposlenih</h2>
          <div className="story-grid">
            {careers.stories.map(s => (
              <article className="story" key={s.name}>
                <div className="ph"><ImageSlot placeholder="Portret zaposlenog" alt={s.name} /></div>
                <q>„{s.q}“</q>
                <div style={{ fontSize: 17, fontWeight: 500 }}>{s.name}</div>
                <div className="person-role" style={{ fontSize: 15 }}>{s.role}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section no-bottom split">
        <div className="ar-3-2"><ImageSlot placeholder="Studenti na praksi" /></div>
        <div>
          <h2 className="h2" style={{ marginBottom: 16 }}>Praksa i stipendije</h2>
          <p className="lead" style={{ marginBottom: 24 }}>{careers.internship}</p>
          <a href="#poslovi" className="btn-outline" onClick={toJobs}>Saznajte više</a>
        </div>
      </section>

      <section id="poslovi" className="section">
        <h2 className="h2 mb-md">Slobodna radna mesta</h2>
        <div className="filters" style={{ marginBottom: 32 }}>
          <Select label="Lokacija" options={careers.locations} value={loc} onChange={setLoc} />
          <Select label="Sektor" options={careers.sectors} value={sec} onChange={setSec} />
          <button className="btn-outline" onClick={() => { setLoc('Sve lokacije'); setSec('Svi sektori') }}>Poništi filtere</button>
        </div>
        <div className="jobs-wrap">
          <table className="jobs">
            <thead><tr><th>Naziv</th><th>Uloga</th><th>Lokacija</th><th>Rok</th><th /></tr></thead>
            <tbody>
              {jobs.map(j => (
                <tr key={j.title}>
                  <td className="name">{j.title}</td><td>{j.sector}</td><td>{j.location}</td><td>{j.deadline}</td>
                  <td className="act"><button aria-label={`Detalji oglasa: ${j.title}`} onClick={() => setJob(j)}>→</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!jobs.length && <div className="empty-box" style={{ marginTop: 16 }}>Nema otvorenih pozicija za izabrane filtere.</div>}
      </section>

      {job && <JobDrawer key={job.title} job={job} onClose={() => setJob(null)} />}
    </main>
  )
}
