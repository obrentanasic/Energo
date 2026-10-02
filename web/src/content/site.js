// All site content in one place. Text comes from the Claude Design handoff; replace with the
// real energoprojekt.rs copy and set `image` fields (paths under /public/images) once scraped.

export const nav = [
  { label: 'O nama', to: '/o-nama' },
  { label: 'Za investitore', to: '/investitori' },
  { label: 'Održivost', to: '/odrzivost' },
  { label: 'Projekti', to: '/projekti' },
  { label: 'Karijera', to: '/karijera' },
  { label: 'Vesti', to: '/vesti' },
  { label: 'Kontakt', to: '/kontakt' },
]

export const megaMenu = [
  { label: 'O nama', to: '/o-nama', items: ['Ko smo', 'Misija, vizija, vrednosti', 'Istorijat', 'Organizacija', 'Tržišta', 'Publikacije'] },
  { label: 'Usluge', to: '/usluge', items: ['Energetika', 'Visokogradnja', 'Infrastruktura', 'Vodoprivreda', 'Industrija', 'Real estate'] },
  { label: 'Za investitore', to: '/investitori', items: ['Finansijski izveštaji', 'Akcije i Beogradska berza', 'Skupština', 'Korporativno upravljanje', 'Finansijski kalendar', 'Obaveštenja akcionarima'] },
  { label: 'Projekti', to: '/projekti', items: ['Svi projekti', 'Izdvojeni projekti', 'Real estate – Kosa Kvart'] },
  { label: 'Karijera', to: '/karijera', items: ['Zašto Energoprojekt', 'Slobodna radna mesta', 'Praksa i stipendije', 'Priče zaposlenih'] },
  { label: 'Vesti', to: '/vesti', items: ['Sve vesti', 'Saopštenja', 'Mediji'] },
  { label: 'Kontakt', to: '/kontakt', items: ['Sedište', 'Zavisna društva', 'Regionalne kancelarije'] },
]

export const sectors = ['Energetika', 'Visokogradnja', 'Infrastruktura', 'Vodoprivreda', 'Industrija']

export const hero = {
  eyebrow: 'Od 1951.',
  title: 'Gradimo zajedno',
  text: 'Inženjering, projektovanje i izgradnja energetskih, infrastrukturnih i objekata visokogradnje u Srbiji i svetu.',
  placeholder: 'Hero fotografija',
}

export const intro = {
  title: 'Najveća srpska kompanija u oblasti izgradnje, inženjeringa i upravljanja projektima',
  counters: [
    { value: 810, label: 'Zaposlenih' },
    { value: 75, label: 'Godina iskustva' },
    { value: 15, label: 'Zemalja' },
  ],
}

export const sustainability = {
  title: 'Održivo poslovanje i ISO standardi',
  text: 'Integrisani sistem menadžmenta po standardima ISO 9001, 14001 i 45001 garantuje kvalitet, zaštitu životne sredine i bezbednost na svakom gradilištu.',
  cta: { label: 'Politika održivosti', to: '/odrzivost' },
  image: null,
  placeholder: 'Održivost – fotografija',
}

export const contactIntro = {
  title: 'Povežimo se',
  text: 'Imate pitanje o našim uslugama, projektima ili saradnji? Popunite formular i odgovorićemo u roku od dva radna dana.',
}

export const footer = {
  tagline: 'Energoprojekt je od 1951. godine vodeća srpska kompanija u oblasti inženjeringa i izgradnje, sa projektima u 15 zemalja sveta.',
  columns: [
    { title: 'Kompanija', links: [['O nama', '/o-nama'], ['Projekti', '/projekti'], ['Karijera', '/karijera'], ['Kontakt', '/kontakt']] },
    { title: 'Usluge', links: [['Energetika', '/usluge'], ['Visokogradnja', '/usluge'], ['Infrastruktura', '/usluge'], ['Vodoprivreda', '/usluge']] },
    { title: 'Investitori i mediji', links: [['Finansijski izveštaji', '/investitori'], ['Obaveštenja akcionarima', '/investitori'], ['Saopštenja', '/vesti'], ['Vesti', '/vesti']] },
  ],
  hq: { street: 'Bulevar Mihajla Pupina 12', city: '11070 Beograd, Srbija', phone: '+381 11 3101010', phoneHref: 'tel:+381113101010', email: 'ep@energoprojekt.rs' },
}
