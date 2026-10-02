// Renders {t:'h'|'p'|'ul'} blocks produced by toBlocks().
export default function Blocks({ blocks, headingLevel = 2 }) {
  const H = `h${headingLevel}`
  return blocks.map((b, i) => {
    if (b.t === 'h') return <H key={i}>{b.text}</H>
    if (b.t === 'p') return <p key={i}>{b.text}</p>
    return <ul key={i} className="bullets">{b.items.map(x => <li key={x}>{x}</li>)}</ul>
  })
}
