import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Crumbs from '../components/Crumbs'
import ImageSlot from '../components/ImageSlot'
import Meta from '../components/Meta'
import Tabs from '../components/Tabs'
import { allNews, newsTabs } from '../data'

const PAGE = 8

export default function Vesti() {
  const preset = useLocation().state?.tab
  const [tab, setTab] = useState(newsTabs.includes(preset) ? preset : 'Sve')
  const [n, setN] = useState(PAGE)
  const [touched, setTouched] = useState(false)
  const list = allNews.filter(x => tab === 'Sve' || x.cat === tab)

  return (
    <main className="page-wrap">
      <Crumbs trail={[['Vesti']]} />
      <div className="page-head mb">
        <h1 className="h1">Vesti</h1>
        <p className="lead">Novosti sa naših projekata, saopštenja za javnost i obaveštenja akcionarima Energoprojekt holdinga i zavisnih društava.</p>
      </div>
      <Tabs rule items={newsTabs} value={tab} onChange={t => { setTab(t); setN(PAGE); setTouched(true) }} />
      <div className="news-list">
        {list.slice(0, n).map(x => (
          <article key={x.kind + x.slug} className={touched ? 'enter' : ''}>
            {x.kind === 'notice'
              ? <div className="thumb doc" aria-hidden="true"><span className="pdf-badge">PDF</span><span>{x.noticeKind}</span></div>
              : <div className="thumb"><ImageSlot src={x.image} alt={x.title} placeholder="Fotografija vesti" /></div>}
            <div className="body">
              <Meta parts={[x.dateLabel, x.cat]} />
              <h2>{x.title}</h2>
              {x.text && <p>{x.text}</p>}
              {x.kind === 'notice'
                ? <a href={x.pdf} target="_blank" rel="noopener noreferrer" className="link-u">Preuzmite PDF</a>
                : <Link to={`/vesti/${x.slug}`} className="link-u">Pročitajte više</Link>}
            </div>
          </article>
        ))}
      </div>
      {!list.length && <div className="empty-box">Trenutno nema vesti u ovoj kategoriji.</div>}
      {list.length > n && (
        <div className="load-more"><button className="btn-outline" onClick={() => { setN(v => v + PAGE); setTouched(true) }}>Učitaj još ({list.length - n})</button></div>
      )}
    </main>
  )
}
