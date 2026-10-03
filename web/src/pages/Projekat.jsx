import { Link, useParams } from 'react-router-dom'
import Crumbs from '../components/Crumbs'
import ImageSlot from '../components/ImageSlot'
import ProjectCard from '../components/ProjectCard'
import { projectList } from '../data'
import NotFound from './NotFound'

export default function Projekat() {
  const { slug } = useParams()
  const p = projectList.find(x => x.slug === slug)
  if (!p) return <NotFound />

  const facts = [
    ['Klijent', p.client], ['Zemlja', p.country], ['Region', p.regions.join(', ')],
    ['Sektor', p.sectors.join(', ')], ['Status', p.status],
  ].filter(([, v]) => v)
  const related = projectList.filter(x => x.slug !== slug && x.sectors.some(s => p.sectors.includes(s)) && x.image).slice(0, 3)

  return (
    <main>
      <div className="page-top">
        <Crumbs trail={[['Projekti', '/projekti'], [p.title]]} />
        <div className="eyebrow" style={{ marginBottom: 16 }}>{p.sector}{p.location ? ` | ${p.location}` : ''}</div>
        <div className="page-head">
          <h1 className="h1" style={{ fontSize: "clamp(30px, 3.6vw, 44px)" }}>{p.title}</h1>
          {p.service && <p className="lead">{p.service}</p>}
        </div>
      </div>
      {p.image && (p.imageW >= 1400
        ? <div className="wide-hero"><ImageSlot src={p.image} alt={p.title} /></div>
        : <div className="section no-bottom" style={{ paddingTop: 0 }}><div className="contained-hero"><ImageSlot src={p.image} alt={p.title} /></div></div>)}

      <section className="bg-grey">
        <dl className="facts">{facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      </section>

      {p.tech && (
        <article className="prose top">
          <h2>Tehnički podaci</h2>
          <p>{p.tech}</p>
          {p.service && <><h2>Usluga</h2><p>{p.service}</p></>}
        </article>
      )}

      {p.gallery.length > 0 && (
        <section className="gallery">
          {p.gallery.map((g, i) => <div className="ar-4-3" key={g}><ImageSlot src={g} alt={`${p.title} – fotografija ${i + 2}`} /></div>)}
        </section>
      )}

      {related.length > 0 && (
        <section className="bg-grey" style={{ marginTop: p.tech && !p.gallery.length ? 'var(--section-y)' : 0, borderTop: !p.tech && !p.gallery.length ? '1px solid var(--rule)' : undefined }}>
          <div className="section">
            <h2 className="h2 mb">Povezani projekti</h2>
            <div className="related-grid">{related.map(r => <ProjectCard key={r.slug} p={r} />)}</div>
          </div>
        </section>
      )}
      <section className="cta-band">
        <h2 className="h2">Planirate sličan projekat?</h2>
        <Link to="/kontakt" className="btn">Kontaktirajte nas</Link>
      </section>
    </main>
  )
}
