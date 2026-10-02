// Turns e-mail addresses and web addresses inside a text line into links.
const RE = /([\w.+-]+@[\w-]+(?:\.[\w-]+)+|(?:https?:\/\/|www\.)[\w./-]+[\w/])/g

export default function Linkify({ text }) {
  return text.split(RE).map((part, i) => {
    if (i % 2 === 0) return part
    const href = part.includes('@') ? `mailto:${part}` : part.startsWith('http') ? part : `http://${part}`
    return <a key={i} href={href} target={part.includes('@') ? undefined : '_blank'} rel="noopener noreferrer">{part}</a>
  })
}
