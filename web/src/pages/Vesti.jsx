import { useState } from 'react'
import { Link } from 'react-router-dom'
import Crumbs from '../components/Crumbs'
import ImageSlot from '../components/ImageSlot'
import Meta from '../components/Meta'
import Tabs from '../components/Tabs'
import { newsList, newsTabs } from '../content/pages'

const PAGE = 5

export default function Vesti() {
  const [tab, setTab] = useState('Sve')
  const [n, setN] = useState(PAGE)
  const [loading, setLoading] = useState(false)
  const list = newsList.filter(x => tab === 'Sve' || x.cat === tab)
  const loadMore = () => { setLoading(true); setTimeout(() => { setLoading(false); setN(v => v + PAGE) }, 600) }

  return (
    <main className="page-wrap">
      <Crumbs trail={[['Vesti']]} />
      <div className="page-head mb">
        <h1 className="h1">Vesti</h1>
        <p className="lead">Novosti sa naših projekata, saopštenja za javnost i priče o ljudima koji grade Energoprojekt.</p>
      </div>
      <Tabs rule items={newsTabs} value={tab} onChange={t => { setTab(t); setN(PAGE) }} />
      <div className="news-list">
        {list.slice(0, n).map(x => (
          <article key={x.slug}>
            <div className="thumb"><ImageSlot src={x.image} alt={x.title} placeholder="Fotografija vesti" /></div>
            <div className="body">
              <Meta parts={[x.date, x.cat]} />
              <h2>{x.title}</h2>
              <p>{x.text}</p>
              <Link to={`/vesti/${x.slug}`} className="link-u">Pročitajte više</Link>
            </div>
          </article>
        ))}
      </div>
      {!list.length && <div className="empty-box">Trenutno nema vesti u ovoj kategoriji.</div>}
      {list.length > n && (
        <div className="load-more"><button className="btn-outline" onClick={loadMore}>{loading ? 'Učitavanje…' : 'Učitaj još'}</button></div>
      )}
    </main>
  )
}
