import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { megaMenu, nav, offices, searchIndex } from '../content/site'

function CloseButton({ onClick, small }) {
  return (
    <button type="button" className="close-btn" aria-label="Zatvori" onClick={onClick}
      style={small ? { width: 44, height: 44, fontSize: 24 } : undefined}>×</button>
  )
}

function SearchOverlay({ onClose }) {
  const [q, setQ] = useState('')
  const needle = q.trim().toLowerCase()
  const groups = searchIndex
    .map(g => ({ ...g, items: needle ? g.items.filter(i => i.toLowerCase().includes(needle)) : g.items.slice(0, 3) }))
    .filter(g => g.items.length)

  return (
    <div className="overlay search-ov" role="dialog" aria-modal="true" aria-label="Pretraga">
      <div className="search-panel"><div>
        <div className="search-head">
          <span className="eyebrow">Pretraga</span>
          <CloseButton onClick={onClose} />
        </div>
        <input className="search-input" type="search" autoFocus placeholder="Šta tražite?" aria-label="Šta tražite?"
          value={q} onChange={e => setQ(e.target.value)} />
        {needle && !groups.length && (
          <p className="search-empty">Nema rezultata za „{q}“. Pokušajte sa drugim pojmom, npr. „hidroelektrana“ ili „izveštaj“.</p>
        )}
        <div className="search-results">
          {groups.map(g => (
            <div key={g.group}>
              <div className="eyebrow search-group-title">{g.group} ({g.items.length})</div>
              {g.items.map(item => <Link key={item} to={g.to}>{item}</Link>)}
            </div>
          ))}
        </div>
      </div></div>
    </div>
  )
}

function MegaMenu({ onClose }) {
  const closeRef = useRef(null)
  useEffect(() => closeRef.current?.focus(), [])
  return (
    <div className="overlay mega" role="dialog" aria-modal="true" aria-label="Meni">
      <div className="mega-top">
        <img src="assets/logo.png" alt="Energoprojekt" />
        <button ref={closeRef} type="button" className="close-btn" aria-label="Zatvori" onClick={onClose}>×</button>
      </div>
      <div className="mega-grid">
        {megaMenu.map(col => (
          <div className="mega-col" key={col.label}>
            <Link to={col.to}>{col.label}</Link>
            <ul>{col.items.map(it => <li key={it}><Link to={col.to}>{it}</Link></li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  )
}

function OfficesModal({ onClose }) {
  return (
    <div className="overlay offices-ov" role="dialog" aria-modal="true" aria-labelledby="offices-title"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="offices-card">
        <div className="offices-list">
          <div className="head"><h2 id="offices-title">Naše kancelarije</h2><CloseButton small onClick={onClose} /></div>
          {offices.map(o => <div className="office-row" key={o.city}><span>{o.city}</span><span>{o.country}</span></div>)}
        </div>
        <div className="offices-map eyebrow">Mapa lokacija</div>
      </div>
    </div>
  )
}

export default function Header() {
  // Overlay is tied to the path it was opened on, so navigating away closes it.
  const [opened, setOpened] = useState(null) // { name: 'mega' | 'search' | 'offices', path }
  const [scrolled, setScrolled] = useState(false)
  const triggerRef = useRef(null)
  const { pathname } = useLocation()
  const overlay = opened && opened.path === pathname ? opened.name : null

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('no-scroll', !!overlay)
    if (!overlay) return
    const onKey = e => { if (e.key === 'Escape') setOpened(null) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [overlay])

  const open = (name, e) => { triggerRef.current = e.currentTarget; setOpened({ name, path: pathname }) }
  const close = () => { setOpened(null); triggerRef.current?.focus() }

  return (
    <>
      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <div className="header-inner">
          <Link to="/" className="logo" aria-label="Energoprojekt početna"><img src="assets/logo.png" alt="Energoprojekt" /></Link>
          <nav className="main-nav" aria-label="Glavna navigacija">
            {nav.map(n => (
              <NavLink key={n.label} to={n.to}>{n.label}</NavLink>
            ))}
          </nav>
          <div className="header-tools">
            <button className="icon-btn" type="button" aria-label="Kancelarije" aria-haspopup="dialog" onClick={e => open('offices', e)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.6" aria-hidden="true"><path d="M12 22s7-7.2 7-12.5A7 7 0 0 0 5 9.5C5 14.8 12 22 12 22z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
            </button>
            <button className="icon-btn" type="button" aria-label="Pretraga" aria-haspopup="dialog" onClick={e => open('search', e)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5L21 21" /></svg>
            </button>
            <button className="icon-btn dark" type="button" aria-label="Meni" aria-haspopup="dialog" onClick={e => open('mega', e)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>
      {overlay === 'mega' && <MegaMenu onClose={close} />}
      {overlay === 'search' && <SearchOverlay onClose={close} />}
      {overlay === 'offices' && <OfficesModal onClose={close} />}
    </>
  )
}
