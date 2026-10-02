import { Link } from 'react-router-dom'
import Blocks from '../components/Blocks'
import Crumbs from '../components/Crumbs'
import ImageSlot from '../components/ImageSlot'
import { pages, toBlocks } from '../data'
import { heroImages } from '../content/images'

const s = pages.services
const SECTIONS = ['ENERGETIKA', 'VISOKOGRADNJA', 'INFRASTRUKTURA', 'VODOPRIVREDA I ZAŠTITA ŽIVOTNE SREDINE', 'INDUSTRIJA']
const TAB = { ENERGETIKA: 'Energetika', VISOKOGRADNJA: 'Visokogradnja', INFRASTRUKTURA: 'Infrastruktura', 'VODOPRIVREDA I ZAŠTITA ŽIVOTNE SREDINE': 'Vodoprivreda', INDUSTRIJA: 'Industrija' }

// Split the long page text into [intro, ...sections] at the sector headings.
function split(ls) {
  const out = { intro: [], sections: [] }
  for (const l of ls) {
    if (SECTIONS.includes(l)) out.sections.push({ head: l, lines: [] })
    else (out.sections.at(-1)?.lines ?? out.intro).push(l)
  }
  return out
}

export default function Usluge() {
  const { intro, sections } = split(s.usluge)
  const re = s.real_estate
  return (
    <main>
      <div className="page-top">
        <Crumbs trail={[['Usluge i oblasti delovanja']]} />
        <div className="page-head top">
          <h1 className="h1">Usluge i oblasti delovanja</h1>
          <p className="lead">{intro[0]}</p>
        </div>
      </div>
      <div className="wide-hero"><ImageSlot src={heroImages.services} placeholder="Fotografija" /></div>
      <article className="prose top"><p>{intro[1]}</p><Blocks blocks={toBlocks(intro.slice(2))} /></article>

      {sections.map((sec, i) => (
        <section key={sec.head} className={i % 2 === 0 ? 'bg-grey' : ''} style={{ marginTop: 'var(--section-y)' }}>
          <div className="prose" style={{ padding: 'clamp(48px,6vw,80px) var(--gutter)' }}>
            <h2>{sec.head.charAt(0) + sec.head.slice(1).toLowerCase()}</h2>
            <Blocks blocks={toBlocks(sec.lines.filter(l => l !== 'Reference'))} headingLevel={3} />
            <Link to="/projekti" state={{ sector: TAB[sec.head] }} className="link-u">Reference – {TAB[sec.head]}</Link>
          </div>
        </section>
      ))}

      <section id="real-estate" className="section">
        <div className="prose" style={{ padding: 0 }}>
          <h2>Real estate</h2>
          <Blocks blocks={toBlocks(re)} headingLevel={3} />
          <Link to="/projekti" state={{ sector: 'Real estate' }} className="link-u">Reference – Real estate</Link>
        </div>
      </section>
    </main>
  )
}
