import { Link } from 'react-router-dom'
import ImageSlot from '../components/ImageSlot'
import Counters from '../components/Counters'
import ContactForm from '../components/ContactForm'
import Meta from '../components/Meta'
import ProjectCard from '../components/ProjectCard'
import { contactIntro, hero, intro, sectors, sustainability } from '../content/site'
import { heroImages } from '../content/images'
import { fmtDate, latestReports, newsList, notices, pages, projectList } from '../data'

const MON = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec']
const latestNotices = notices.slice(0, 3)
const assemblies = notices.filter(n => n.noticeKind === 'Skupština').slice(0, 3)
const annual = latestReports.find(r => r.type === 'Godišnji' && !r.consolidated) || latestReports[0]
const pick = sector => projectList.find(p => p.image && p.sectors[0] === sector)
const featured = {
  big: [pick('Energetika'), pick('Infrastruktura')].filter(Boolean),
  small: [pick('Visokogradnja'), pick('Vodoprivreda'), pick('Industrija')].filter(Boolean),
}
const highlight = assemblies[0]
const altBlocks = [
  { title: 'Publikacije', text: pages.about.publikacije[0], cta: { label: 'Pogledajte publikacije', to: '/o-nama' }, image: heroImages.publications, placeholder: 'Publikacije' },
  { title: 'Godišnji izveštaj', text: annual ? annual.title : 'Godišnji izveštaji Energoprojekt Holdinga.', cta: { label: 'Preuzmite izveštaj', href: annual?.pdf, to: '/investitori' }, image: heroImages.investors, placeholder: 'Godišnji izveštaj' },
]
const Cta = ({ cta }) => (cta.href
  ? <a href={cta.href} target="_blank" rel="noopener noreferrer" className="btn">{cta.label}</a>
  : <Link to={cta.to} className="btn">{cta.label}</Link>)

export default function Home() {
  return (
    <main>
      <section className="hero" aria-label="Uvod">
        <div className="hero-bg"><ImageSlot src={heroImages.home} mobileSrc={heroImages.homeMobile} eager alt="" placeholder={hero.placeholder} /></div>
        <div className="hero-body">
          <div className="hero-card">
            <div className="eyebrow">{hero.eyebrow}</div>
            <h1 className="h1">{hero.title}</h1>
            <p className="lead">{hero.text}</p>
          </div>
        </div>
        <nav className="sector-bar" aria-label="Sektori">
          {sectors.map(s => <Link key={s} to="/projekti" state={{ sector: s }}>{s}<span aria-hidden="true">→</span></Link>)}
        </nav>
      </section>

      <section className="wrap intro">
        <h2 className="h2">{intro.title}</h2>
        <Counters items={intro.counters} />
      </section>

      {highlight && (
        <section className="bg-grey">
          <div className="highlight">
            <div className="highlight-media ar-4-3">
              <ImageSlot src={heroImages.investors} placeholder="Skupština akcionara" />
            </div>
            <div>
              <div className="eyebrow">Za investitore</div>
              <h2 className="h2">{highlight.title}</h2>
              <p className="lead-strong">{fmtDate(highlight.date)} · Obaveštenja akcionarima Energoprojekt Holdinga.</p>
              <div className="check-links">
                {highlight.pdf && <a href={highlight.pdf} target="_blank" rel="noopener noreferrer" className="link-u"><span aria-hidden="true">✓</span>Preuzmite dokument</a>}
                <Link to="/investitori" className="link-u"><span aria-hidden="true">✓</span>Sva obaveštenja akcionarima</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="wrap news">
        <h2 className="h2">Priče vredne pažnje</h2>
        <div className="news-grid">
          {newsList.filter(n => n.image).slice(0, 3).map(n => (
            <article className="news-card" key={n.slug}>
              <ImageSlot className="ar-4-3" src={n.image} alt={n.title} placeholder="Fotografija vesti" />
              <Meta parts={[n.cat, n.dateLabel]} />
              <h3>{n.title}</h3>
              <p>{n.text}</p>
              <Link to={`/vesti/${n.slug}`} className="link-u">Pročitajte više</Link>
            </article>
          ))}
        </div>
        <Link to="/vesti" className="btn">Sve vesti</Link>
      </section>

      <section className="feature">
        <div>
          <ImageSlot className="ar-16-9" src={heroImages.sustainability} placeholder={sustainability.placeholder} />
          <h3 className="h3">{sustainability.title}</h3>
          <p className="lead">{sustainability.text}</p>
          <Link to={sustainability.cta.to} className="btn">{sustainability.cta.label}</Link>
        </div>
      </section>

      <section className="wrap alts">
        {altBlocks.map((b, i) => (
          <div key={b.title} className={`alt-row${i % 2 ? ' reverse' : ''}`}>
            <div className="alt-media ar-4-3"><ImageSlot src={b.image} placeholder={b.placeholder} /></div>
            <div className="alt-text">
              <h3 className="h3">{b.title}</h3>
              <p className="lead">{b.text}</p>
              <Cta cta={b.cta} />
            </div>
          </div>
        ))}
      </section>

      <section className="bg-grey">
        <div className="wrap ir-cards">
          <div className="ir-card">
            <h3>Najnovija saopštenja</h3>
            {latestNotices.map(r => (
              <a className="ir-row" key={r.slug} href={r.pdf} target="_blank" rel="noopener noreferrer">
                <div className="t">{r.title}</div><Meta parts={[fmtDate(r.date), r.noticeKind]} />
              </a>
            ))}
            <Link to="/vesti" className="arrow-btn" aria-label="Sva saopštenja">→</Link>
          </div>
          <div className="ir-card">
            <h3>Skupština akcionara</h3>
            {assemblies.map(c => {
              const [, m, d] = c.date.split('-')
              return (
                <a className="ir-row cal-row" key={c.slug} href={c.pdf} target="_blank" rel="noopener noreferrer">
                  <div className="cal-day">{Number(d)}<div>{MON[Number(m) - 1]}</div></div>
                  <div className="t">{c.title}</div>
                </a>
              )
            })}
            <Link to="/investitori" className="arrow-btn" aria-label="Obaveštenja akcionarima">→</Link>
          </div>
          <div className="ir-card">
            <h3>Najnoviji finansijski izveštaji</h3>
            {latestReports.map(r => (
              <a href={r.pdf} target="_blank" rel="noopener noreferrer" className="ir-row pdf-row" key={r.pdf}><span className="pdf-badge">PDF</span><span className="t">{r.title}</span></a>
            ))}
            <Link to="/investitori" className="arrow-btn after-list" aria-label="Svi izveštaji">→</Link>
          </div>
        </div>
      </section>

      <section className="wrap projects">
        <div className="projects-head">
          <h2 className="h2">Izdvojeni projekti</h2>
          <Link to="/projekti" className="link-u">Svi projekti</Link>
        </div>
        <div className="proj-grid-big">
          {featured.big.map(p => <ProjectCard key={p.slug} p={p} />)}
        </div>
        <div className="proj-grid-small">
          {featured.small.map(p => <ProjectCard key={p.slug} p={p} />)}
        </div>
      </section>

      <section>
        <div className="wide-media"><ImageSlot src={heroImages.wide} placeholder="Fotografija sa gradilišta" /></div>
        <div className="wrap teasers">
          {[
            { title: 'Za investitore', text: 'Izveštaji, akcije i obaveštenja akcionarima.', to: '/investitori', image: heroImages.investors },
            { title: 'Karijera', text: 'Gradite karijeru sa nama.', to: '/karijera', image: heroImages.careers },
            { title: 'Publikacije', text: 'Promotivni i informativni materijali.', to: '/o-nama', image: heroImages.publications },
          ].map(t => (
            <div className="teaser" key={t.title}>
              <div className="teaser-head">
                <div><h3>{t.title}</h3><p>{t.text}</p></div>
                <Link to={t.to} className="arrow-btn" aria-label={t.title}>→</Link>
              </div>
              <ImageSlot className="ar-3-2" src={t.image} alt={t.title} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-grey">
        <div className="wrap contact">
          <div>
            <h2 className="h2">{contactIntro.title}</h2>
            <p className="lead">{contactIntro.text}</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  )
}
