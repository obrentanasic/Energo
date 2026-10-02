import { Link } from 'react-router-dom'
import Crumbs from '../components/Crumbs'
import ImageSlot from '../components/ImageSlot'
import { sustainabilityPage as s } from '../content/pages'

export default function Odrzivost() {
  return (
    <main>
      <div className="page-top">
        <Crumbs trail={[['Održivost']]} />
        <div className="eyebrow" style={{ marginBottom: 16 }}>{s.eyebrow}</div>
        <div className="page-head">
          <h1 className="h1">{s.title}</h1>
          <p className="lead">{s.text}</p>
        </div>
      </div>
      <div className="wide-hero"><ImageSlot placeholder="Održivost – fotografija" /></div>
      <section className="section big">
        <div className="cols-3">
          {s.pillars.map(([iso, t, x]) => (
            <div className="rule-card" key={iso}><div className="eyebrow" style={{ marginBottom: 8 }}>{iso}</div><h3>{t}</h3><p>{x}</p></div>
          ))}
        </div>
      </section>
      <section className="bg-grey">
        <div className="section split">
          <div className="ar-3-2"><ImageSlot placeholder="Zajednica – fotografija" /></div>
          <div>
            <p className="lead" style={{ marginBottom: 24 }}>{s.closing}</p>
            <Link to="/karijera" className="btn">Praksa i stipendije</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
