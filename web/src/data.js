// Adapters over the content imported from the old energoprojekt.rs site (see scripts/import_content.py).
import projectsRaw from './content/data/projects.json'
import newsRaw from './content/data/news.json'
import noticesRaw from './content/data/notices.json'
import reportsRaw from './content/data/reports.json'
import pagesRaw from './content/data/pages.json'

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec']
export function fmtDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d}. ${MONTHS[m - 1]} ${y}.`
}

const img = p => (p ? p : null)

// ---------------- projects
export const projectSectors = ['Energetika', 'Visokogradnja', 'Infrastruktura', 'Vodoprivreda', 'Industrija', 'Real estate']
export const projectTabs = ['Sve', ...projectSectors]
export const projectList = projectsRaw.map(p => ({
  ...p,
  location: p.country || p.regions[0] || '',
  sector: p.sectors[0],
  image: img(p.image),
}))

// ---------------- news (stories + PDF notices)
const COMPANIES = [
  [/hidro/i, 'Hidroinženjering'], [/entel/i, 'Entel'], [/urbaniz/i, 'Urbanizam i arhitektura'], [/industrij/i, 'Industrija'],
  [/visokogradnj/i, 'Visokogradnja'], [/niskogradnj/i, 'Niskogradnja'], [/izgradnj/i, 'Izgradnja'],
]
const company = c => (COMPANIES.find(([re]) => re.test(c)) || [null, 'Holding'])[1]
const excerpt = (parts, n = 220) => {
  const t = parts.find(x => x.length > 40) || parts[0] || ''
  if (t.length <= n) return t
  return t.slice(0, n).replace(/\s+\S*$/, '') + '…'
}

const shorten = (t, n = 130) => (t.length <= n ? t : t.slice(0, n).replace(/\s+\S*$/, '') + '…')

const stories = newsRaw.map(n => ({
  slug: n.slug, title: shorten(n.title), cat: company(n.company), date: n.date, dateLabel: fmtDate(n.date),
  text: excerpt(n.body), body: n.body, image: img(n.image), kind: 'story',
}))
export const notices = noticesRaw.map(n => ({
  slug: n.slug, title: shorten(n.title), cat: 'Saopštenja', date: n.date, dateLabel: fmtDate(n.date),
  text: '', pdf: n.pdf, kind: 'notice', noticeKind: n.kind, image: null,
}))
export const newsList = stories
export const allNews = [...stories, ...notices].sort((a, b) => (a.date < b.date ? 1 : -1))
export const newsTabs = ['Sve', 'Saopštenja', 'Holding', 'Hidroinženjering', 'Entel', 'Urbanizam i arhitektura', 'Industrija', 'Visokogradnja', 'Niskogradnja']

// ---------------- reports
export const reports = reportsRaw
export const reportYears = [...new Set(reportsRaw.map(r => r.year))]

// ---------------- pages
export const pages = pagesRaw

// ---------------- contact (parsed from the old /kontakt page text)
const COUNTRIES = ['Bosna i Hercegovina', 'Crna Gora', 'Rusija', 'Alžir', 'Gana', 'Gvineja', 'Uganda', 'Zimbabve', 'Zambija', 'Peru', 'Katar', 'Oman', 'UAE', 'Bahrein', 'Kazahstan']
const ENTITY_START = /^(Energoprojekt|ENERGO|Energo |Predstavništvo|Filijala|D\.O\.O|ENHISA)/
const DETAIL = /^(Direktor|Kontakt osoba|E-mail|Е-mail|Fax|Tel|Mob|web|http|www|…)/i

function parseContact(ls) {
  const domestic = []
  const abroad = []
  let country = null
  let cur = null
  for (const l of ls) {
    if (COUNTRIES.includes(l)) { country = l; cur = null; continue }
    const startsNew = ENTITY_START.test(l) && (!cur || cur.lines.some(x => DETAIL.test(x)))
    if (!cur || startsNew) {
      cur = { name: l, lines: [] }
      ;(country ? abroad : domestic).push(country ? { ...cur, country } : cur)
      cur = (country ? abroad : domestic).at(-1)
      continue
    }
    cur.lines.push(l)
  }
  return { domestic, abroad }
}
export const contactData = parseContact(pages.contact)
export const abroadCountries = [...new Set(contactData.abroad.map(e => e.country))]
export const offices = abroadCountries.map(c => ({ city: c, country: contactData.abroad.find(e => e.country === c).name }))

// ---------------- content blocks (headings / paragraphs / lists) from plain lines
export function toBlocks(ls) {
  const blocks = []
  let list = null
  for (const l of ls) {
    const isHead = l.length < 70 && /[A-ZČĆŽŠĐ]/.test(l) && l === l.toUpperCase() && !/\d{3}/.test(l)
    const isPara = l.length > 110 || (/[.!?:]$/.test(l) && l.length > 50)
    if (isHead) { blocks.push({ t: 'h', text: l }); list = null }
    else if (isPara) { blocks.push({ t: 'p', text: l }); list = null }
    else {
      if (!list) { list = { t: 'ul', items: [] }; blocks.push(list) }
      list.items.push(l)
    }
  }
  return blocks
}

// ---------------- search index
export const searchIndex = [
  { group: 'Projekti', items: projectList.map(p => ({ label: p.title, to: `/projekti/${p.slug}` })) },
  { group: 'Vesti', items: stories.map(n => ({ label: n.title, to: `/vesti/${n.slug}` })) },
  { group: 'Dokumenti', items: [...reportsRaw.map(r => ({ label: r.title, href: r.pdf })), ...noticesRaw.filter(n => n.pdf).map(n => ({ label: n.title, href: n.pdf }))] },
]

// Latest items used on the home page.
export const latestReports = [...reportsRaw].sort((a, b) => (a.year < b.year ? 1 : 0)).slice(0, 3)
