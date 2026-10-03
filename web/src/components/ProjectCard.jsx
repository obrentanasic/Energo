import { Link } from 'react-router-dom'
import ImageSlot from './ImageSlot'
import Meta from './Meta'

export default function ProjectCard({ p, className = '' }) {
  return (
    <Link to={`/projekti/${p.slug}`} className={`proj-card ${className}`}>
      <h3>{p.title}</h3>
      <Meta parts={[p.location, p.sector]} />
      <ImageSlot className="ar-4-3" src={p.image} alt={p.title} placeholder="Fotografija projekta" />
    </Link>
  )
}
