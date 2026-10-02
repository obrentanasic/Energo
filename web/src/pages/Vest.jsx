import { Link, useParams } from 'react-router-dom'
import Crumbs from '../components/Crumbs'
import ImageSlot from '../components/ImageSlot'
import Meta from '../components/Meta'
import { newsList } from '../data'
import NotFound from './NotFound'

export default function Vest() {
  const { slug } = useParams()
  const n = newsList.find(x => x.slug === slug)
  if (!n) return <NotFound />
  const more = newsList.filter(x => x.slug !== slug && x.image).slice(0, 3)
  return (
    <main>
      <div className="page-top">
        <Crumbs trail={[['Vesti', '/vesti'], [n.title]]} />
        <Meta parts={[n.dateLabel, n.cat]} />
        <h1 className="h1" style={{ marginTop: 16, maxWidth: 900 }}>{n.title}</h1>
      </div>
      {n.image && (n.imageW >= 1400
        ? <div className="wide-hero"><ImageSlot src={n.image} alt={n.title} /></div>
        : <div className="section no-bottom" style={{ paddingTop: 0 }}><div className="contained-hero"><ImageSlot src={n.image} alt={n.title} /></div></div>)}
      <article className="prose top">
        {n.body.map((t, i) => <p key={i}>{t}</p>)}
      </article>
      <section className="bg-grey" style={{ marginTop: 'var(--section-y)' }}>
        <div className="section">
          <h2 className="h2 mb">Još vesti</h2>
          <div className="related-grid">
            {more.map(x => (
              <Link key={x.slug} to={`/vesti/${x.slug}`} className="proj-card">
                <h3>{x.title}</h3><Meta parts={[x.dateLabel, x.cat]} />
                <ImageSlot className="ar-4-3" src={x.image} alt={x.title} placeholder="Fotografija vesti" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
