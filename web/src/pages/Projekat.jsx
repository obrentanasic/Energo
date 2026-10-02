import { Link, useParams } from 'react-router-dom'
import Crumbs from '../components/Crumbs'
import ImageSlot from '../components/ImageSlot'
import ProjectCard from '../components/ProjectCard'
import { projectDetails, projectList } from '../content/pages'
import NotFound from './NotFound'

export default function Projekat() {
  const { slug } = useParams()
  const p = projectList.find(x => x.slug === slug)
  if (!p) return <NotFound />
  const d = projectDetails[slug]
  const related = d ? d.related.map(s => projectList.find(x => x.slug === s)) : projectList.filter(x => x.sector === p.sector && x.slug !== slug).slice(0, 3)
  const headline = d?.headline ?? p.title
  const summary = d?.summary ?? `${p.sector} · ${p.location}. Detaljan opis projekta biće dodat.`

  return (
    <main>
      <div className="page-top">
        <Crumbs trail={[['Projekti', '/projekti'], [p.title]]} />
        <div className="eyebrow" style={{ marginBottom: 16 }}>{p.sector} | {p.location}</div>
        <div className="page-head">
          <h1 className="h1">{headline}</h1>
          <p className="lead">{summary}</p>
        </div>
      </div>
      <div className="wide-hero"><ImageSlot src={p.image} placeholder="Hero fotografija projekta" /></div>

      {d && (
        <>
          <section className="bg-grey">
            <dl className="facts">
              {d.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
          </section>
          <article className="prose top">
            <h2>Izazov</h2>
            {d.challenge.map(t => <p key={t}>{t}</p>)}
          </article>
          <div className="section" style={{ paddingTop: 56, paddingBottom: 56 }}>
            <div className="ar-16-9"><ImageSlot placeholder="Široka fotografija projekta" /></div>
          </div>
          <article className="prose">
            <blockquote>„{d.quote.text}“<footer>{d.quote.by}</footer></blockquote>
            <h2>Rešenje</h2>
            <p>{d.solution}</p>
          </article>
          <section className="gallery">
            {[1, 2, 3].map(i => <div className="ar-4-3" key={i}><ImageSlot placeholder={`Galerija ${i}`} /></div>)}
          </section>
        </>
      )}

      {related.length > 0 && (
        <section className="bg-grey">
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
