// Renders {t:'h'|'ev'|'p'|'ul'} blocks produced by toBlocks().
export default function Blocks({ blocks, headingLevel = 2 }) {
  const H = `h${headingLevel}`
  const Sub = `h${Math.min(headingLevel + 1, 6)}`
  return blocks.map((b, i) => {
    if (b.t === 'h') return <H key={i}>{b.text}</H>
    if (b.t === 'ev') return <div key={i} className="event-head"><div className="eyebrow">{b.date}</div><Sub>{b.text}</Sub></div>
    if (b.t === 'p') return <p key={i}>{b.text}</p>
    return <ul key={i} className="bullets">{b.items.map(x => <li key={x}>{x}</li>)}</ul>
  })
}
