import { useState } from 'react'

const FIELDS = [
  { key: 'ime', label: 'Ime i prezime*', autoComplete: 'name' },
  { key: 'email', label: 'E-mail*', type: 'email', autoComplete: 'email' },
  { key: 'kompanija', label: 'Kompanija', autoComplete: 'organization' },
  { key: 'zemlja', label: 'Zemlja', autoComplete: 'country-name' },
  { key: 'telefon', label: 'Telefon', type: 'tel', autoComplete: 'tel' },
  { key: 'pitanje', label: 'Vaše pitanje', full: true },
]

const EMPTY = { ime: '', email: '', kompanija: '', zemlja: '', telefon: '', pitanje: '', consent: false }

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [consentErr, setConsentErr] = useState(false)
  const [sent, setSent] = useState(false)

  const onField = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    setErrors(er => ({ ...er, [name]: null }))
  }

  const submit = e => {
    e.preventDefault()
    const er = {}
    if (!form.ime.trim()) er.ime = 'Unesite ime.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = 'Unesite ispravnu e-mail adresu.'
    setErrors(er)
    setConsentErr(!form.consent)
    // Presentation build: no backend, just show the confirmation.
    if (!Object.keys(er).length && form.consent) setSent(true)
  }

  if (sent) {
    return (
      <div className="contact-success" role="status">
        <div className="title">Hvala, {form.ime}.</div>
        <p className="lead">Vaša poruka je poslata. Odgovor ćete dobiti na {form.email}.</p>
      </div>
    )
  }

  return (
    <form className="contact-form" noValidate onSubmit={submit}>
      {FIELDS.map(f => (
        <label key={f.key} className={`field${f.full ? ' full' : ''}${errors[f.key] ? ' invalid' : ''}`}>
          <span className="field-label">{f.label}</span>
          <input name={f.key} type={f.type || 'text'} autoComplete={f.autoComplete} value={form[f.key]}
            onChange={onField} aria-invalid={!!errors[f.key]} />
          {errors[f.key] && <span className="field-err">{errors[f.key]}</span>}
        </label>
      ))}
      <label className="consent">
        <input type="checkbox" checked={form.consent}
          onChange={e => { setForm(f => ({ ...f, consent: e.target.checked })); setConsentErr(false) }} />
        <span>Saglasan/na sam da Energoprojekt obrađuje moje podatke u skladu sa Politikom privatnosti.</span>
      </label>
      {consentErr && <span className="consent-err">Potrebna je saglasnost.</span>}
      <div className="form-actions"><button type="submit" className="btn">Pošalji</button></div>
    </form>
  )
}
