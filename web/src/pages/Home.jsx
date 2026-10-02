import { Link } from 'react-router-dom'
import ImageSlot from '../components/ImageSlot'
import Counters from '../components/Counters'
import ContactForm from '../components/ContactForm'
import Meta from '../components/Meta'
import ProjectCard from '../components/ProjectCard'
import {
  altBlocks, calendar, contactIntro, hero, intro, investorHighlight, news, projects,
  releases, reports, sectors, sustainability, teasers, wideImage,
} from '../content/site'

export default function Home() {
  return (
    <main>
      <section className="hero" aria-label="Uvod">
        <div className="hero-bg"><ImageSlot src={hero.image} placeholder={hero.placeholder} /></div>
        <div className="hero-body">
          <div className="hero-card">
            <div className="eyebrow">{hero.eyebrow}</div>
            <h1 className="h1">{hero.title}</h1>
            <p className="lead">{hero.text}</p>
          </div>
        </div>
        <nav className="sector-bar" aria-label="Sektori">
          {sectors.map(s => <Link key={s} to="/projekti">{s}<span aria-hidden="true">→</span></Link>)}
        </nav>
      </section>

      <section className="wrap intro">
        <h2 className="h2">{intro.title}</h2>
        <Counters items={intro.counters} />
      </section>

      <section className="bg-grey">
        <div className="highlight">
          <div className="highlight-media ar-4-3">
            <ImageSlot src={investorHighlight.image} placeholder={investorHighlight.placeholder} />
          </div>
          <div>
            <div className="eyebrow">{investorHighlight.eyebrow}</div>
            <h2 className="h2">{investorHighlight.title}</h2>
            <p className="lead-strong">{investorHighlight.text}</p>
            <div className="check-links">
              {investorHighlight.links.map(l => (
                <Link key={l.label} to={l.to} className="link-u"><span aria-hidden="true">✓</span>{l.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="wrap news">
        <h2 className="h2">Priče vredne pažnje</h2>
        <div className="news-grid">
          {news.slice(0, 3).map(n => (
            <article className="news-card" key={n.slug}>
              <ImageSlot className="ar-4-3" src={n.image} alt={n.title} placeholder="Fotografija vesti" />
              <Meta parts={[n.cat, n.date]} />
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
          <ImageSlot className="ar-16-9" src={sustainability.image} placeholder={sustainability.placeholder} />
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
              <Link to={b.cta.to} className="btn">{b.cta.label}</Link>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-grey">
        <div className="wrap ir-cards">
          <div className="ir-card">
            <h3>Najnovija saopštenja</h3>
            {releases.map(r => (
              <div className="ir-row" key={r.title}><div className="t">{r.title}</div><Meta parts={[r.date, r.kind]} /></div>
            ))}
            <Link to="/vesti" className="arrow-btn" aria-label="Sva saopštenja">→</Link>
          </div>
          <div className="ir-card">
            <h3>Finansijski kalendar</h3>
            {calendar.map(c => (
              <div className="ir-row cal-row" key={c.title}>
                <div className="cal-day">{c.day}<div>{c.mon}</div></div>
                <div className="t">{c.title}</div>
              </div>
            ))}
            <Link to="/investitori" className="arrow-btn" aria-label="Finansijski kalendar">→</Link>
          </div>
          <div className="ir-card">
            <h3>Najnoviji finansijski izveštaji</h3>
            {reports.map(r => (
              <Link to="/investitori" className="ir-row pdf-row" key={r}><span className="pdf-badge">PDF</span><span className="t">{r}</span></Link>
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
          {projects.filter(p => p.featured === 'big').map(p => <ProjectCard key={p.slug} p={p} />)}
        </div>
        <div className="proj-grid-small">
          {projects.filter(p => p.featured === 'small').map(p => <ProjectCard key={p.slug} p={p} />)}
        </div>
      </section>

      <section>
        <div className="wide-media"><ImageSlot src={wideImage.image} placeholder={wideImage.placeholder} /></div>
        <div className="wrap teasers">
          {teasers.map(t => (
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
