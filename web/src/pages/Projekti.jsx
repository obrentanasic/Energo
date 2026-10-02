import { useState } from 'react'
import Crumbs from '../components/Crumbs'
import ProjectCard from '../components/ProjectCard'
import Tabs from '../components/Tabs'
import { projectList, projectTabs } from '../content/pages'

const PAGE = 5

export default function Projekti() {
  const [tab, setTab] = useState('Sve')
  const [q, setQ] = useState('')
  const [n, setN] = useState(PAGE)
  const [loading, setLoading] = useState(false)

  const list = projectList.filter(p => (tab === 'Sve' || p.sector === tab) && (!q || p.title.toLowerCase().includes(q.toLowerCase())))
  const loadMore = () => { setLoading(true); setTimeout(() => { setLoading(false); setN(v => v + PAGE) }, 600) }
  const reset = () => { setTab('Sve'); setQ(''); setN(PAGE) }

  return (
    <main className="page-wrap">
      <Crumbs trail={[['Projekti']]} />
      <div className="page-head mb" style={{ marginBottom: 56 }}>
        <h1 className="h1">Projekti</h1>
        <p className="lead">Više od 7.000 realizovanih projekata u 70 zemalja: od hidroelektrana i autoputeva do poslovnih kompleksa i vodovoda.</p>
      </div>
      <div className="toolbar">
        <Tabs items={projectTabs} value={tab} onChange={t => { setTab(t); setN(PAGE) }} />
        <label className="search-field">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5L21 21" /></svg>
          <input value={q} onChange={e => { setQ(e.target.value); setN(PAGE) }} placeholder="Pretraži projekte" aria-label="Pretraži projekte" />
        </label>
      </div>
      {!list.length && (
        <div className="empty-box center">
          <div className="t">Nema projekata za izabrane kriterijume</div>
          <button className="btn-outline" style={{ marginTop: 16 }} onClick={reset}>Poništi filtere</button>
        </div>
      )}
      <div className="proj-list">{list.slice(0, n).map(p => <ProjectCard key={p.slug} p={p} />)}</div>
      {list.length > n && (
        <div className="load-more"><button className="btn-outline" onClick={loadMore}>{loading ? 'Učitavanje…' : 'Učitaj još'}</button></div>
      )}
    </main>
  )
}
