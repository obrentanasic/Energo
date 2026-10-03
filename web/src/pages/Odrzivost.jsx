import Blocks from '../components/Blocks'
import Crumbs from '../components/Crumbs'
import ImageSlot from '../components/ImageSlot'
import { pages, toBlocks } from '../data'
import { heroImages } from '../content/images'

export default function Odrzivost() {
  const ls = pages.sustainability
  return (
    <main>
      <div className="page-top">
        <Crumbs trail={[['Održivost']]} />
        <div className="eyebrow" style={{ marginBottom: 16 }}>Održivost</div>
        <div className="page-head">
          <h1 className="h1">Politika integrisanog sistema menadžmenta</h1>
          <p className="lead">Standardi ISO 9001:2015, ISO 14001:2015 i ISO 45001:2018 – kvalitet, zaštita životne sredine i bezbednost i zdravlje na radu.</p>
        </div>
      </div>
      <div className="wide-hero"><ImageSlot src={heroImages.sustainability} placeholder="Održivost – fotografija" /></div>
      <article className="prose top" style={{ paddingBottom: 'var(--section-y)' }}>
        <Blocks blocks={toBlocks(ls)} headingLevel={2} />
      </article>
    </main>
  )
}
