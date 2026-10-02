import { Link, useParams } from 'react-router-dom'
import Crumbs from '../components/Crumbs'
import ImageSlot from '../components/ImageSlot'
import Meta from '../components/Meta'
import { newsList } from '../content/pages'
import NotFound from './NotFound'

// No article design exists in the handoff; this reuses the case-study layout. Body copy is the list teaser
// until the real article text is scraped from energoprojekt.rs.
export default function Vest() {
  const { slug } = useParams()
  const n = newsList.find(x => x.slug === slug)
  if (!n) return <NotFound />
  const more = newsList.filter(x => x.slug !== slug).slice(0, 3)
  return (
    <main>
      <div className="page-top">
        <Crumbs trail={[['Vesti', '/vesti'], [n.title]]} />
        <Meta parts={[n.date, n.cat]} />
        <h1 className="h1" style={{ marginTop: 16, maxWidth: 900 }}>{n.title}</h1>
      </div>
      <div className="wide-hero"><ImageSlot src={n.image} alt={n.title} placeholder="Fotografija vesti" /></div>
      <article className="prose top">
        <p className="lead" style={{ fontSize: 22 }}>{n.text}</p>
      </article>
      <section className="bg-grey" style={{ marginTop: 'var(--section-y)' }}>
        <div className="section">
          <h2 className="h2 mb">Još vesti</h2>
          <div className="related-grid">
            {more.map(x => (
              <Link key={x.slug} to={`/vesti/${x.slug}`} className="proj-card">
                <h3>{x.title}</h3><Meta parts={[x.date, x.cat]} />
                <ImageSlot className="ar-4-3" placeholder="Fotografija vesti" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
