import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Crumbs from '../components/Crumbs'
import ProjectCard from '../components/ProjectCard'
import Select from '../components/Select'
import Tabs from '../components/Tabs'
import { projectList, projectTabs } from '../data'

const PAGE = 10
const REGIONS = ['Svi regioni', 'Evropa', 'Afrika', 'Bliski istok', 'Azija', 'Južna Amerika']

export default function Projekti() {
  const preset = useLocation().state?.sector
  const [tab, setTab] = useState(projectTabs.includes(preset) ? preset : 'Sve')
  const [region, setRegion] = useState('Svi regioni')
  const [q, setQ] = useState('')
  const [n, setN] = useState(PAGE)

  const needle = q.trim().toLowerCase()
  const list = projectList.filter(p =>
    (tab === 'Sve' || p.sectors.includes(tab)) &&
    (region === 'Svi regioni' || p.regions.includes(region)) &&
    (!needle || `${p.title} ${p.country} ${p.client}`.toLowerCase().includes(needle)))
  const reset = () => { setTab('Sve'); setRegion('Svi regioni'); setQ(''); setN(PAGE) }

  return (
    <main className="page-wrap">
      <Crumbs trail={[['Projekti']]} />
      <div className="page-head mb" style={{ marginBottom: 56 }}>
        <h1 className="h1">Projekti</h1>
        <p className="lead">Izbor od {projectList.length} referenci iz energetike, visokogradnje, infrastrukture, vodoprivrede i industrije. Energoprojekt je realizovao projekte u više od 70 zemalja širom sveta.</p>
      </div>
      <div className="toolbar">
        <Tabs items={projectTabs} value={tab} onChange={t => { setTab(t); setN(PAGE) }} />
        <div className="filters">
          <Select label="Region" options={REGIONS} value={region} onChange={v => { setRegion(v); setN(PAGE) }} />
          <label className="search-field">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5L21 21" /></svg>
            <input value={q} onChange={e => { setQ(e.target.value); setN(PAGE) }} placeholder="Pretraži projekte" aria-label="Pretraži projekte" />
          </label>
        </div>
      </div>
      {!list.length && (
        <div className="empty-box center">
          <div className="t">Nema projekata za izabrane kriterijume</div>
          <button className="btn-outline" style={{ marginTop: 16 }} onClick={reset}>Poništi filtere</button>
        </div>
      )}
      <div className="proj-list">{list.slice(0, n).map(p => <ProjectCard key={p.slug} p={p} />)}</div>
      {list.length > n && (
        <div className="load-more">
          <button className="btn-outline" onClick={() => setN(v => v + PAGE)}>Učitaj još ({list.length - n})</button>
        </div>
      )}
    </main>
  )
}
