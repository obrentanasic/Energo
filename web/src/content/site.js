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

// Only items that have real content on the site. `id` scrolls to that section after navigation.
export const megaMenu = [
  { label: 'O nama', to: '/o-nama', items: [
    { label: 'Ko smo', to: '/o-nama' }, { label: 'Misija, vizija, vrednosti', to: '/o-nama', id: 'misija' },
    { label: 'Istorijat', to: '/o-nama', id: 'istorijat' }, { label: 'Organi upravljanja', to: '/o-nama', id: 'organizacija' },
    { label: 'Tržišta', to: '/o-nama', id: 'trzista' }, { label: 'Publikacije', to: '/o-nama', id: 'publikacije' }] },
  { label: 'Usluge', to: '/usluge', items: [
    { label: 'Energetika', to: '/usluge', id: 'energetika' }, { label: 'Visokogradnja', to: '/usluge', id: 'visokogradnja' },
    { label: 'Infrastruktura', to: '/usluge', id: 'infrastruktura' }, { label: 'Vodoprivreda', to: '/usluge', id: 'vodoprivreda' },
    { label: 'Industrija', to: '/usluge', id: 'industrija' }, { label: 'Real estate', to: '/usluge', id: 'real-estate' }] },
  { label: 'Za investitore', to: '/investitori', items: [
    { label: 'Finansijski izveštaji', to: '/investitori', id: 'izvestaji' }, { label: 'Obaveštenja akcionarima', to: '/investitori', id: 'obavestenja' }] },
  { label: 'Projekti', to: '/projekti', items: [
    { label: 'Svi projekti', to: '/projekti' }, { label: 'Kosa Kvart', to: '/projekti/stambeni-kompleks-kosa-kvart-blok-24-bezanijska-kosa-beograd' }] },
  { label: 'Karijera', to: '/karijera', items: [
    { label: 'Zašto Energoprojekt', to: '/karijera' }, { label: 'Otvorena prijava', to: '/karijera', id: 'prijava' }] },
  { label: 'Vesti', to: '/vesti', items: [
    { label: 'Sve vesti', to: '/vesti' }, { label: 'Saopštenja', to: '/vesti', tab: 'Saopštenja' }] },
  { label: 'Kontakt', to: '/kontakt', items: [
    { label: 'Sedište', to: '/kontakt' }, { label: 'Zavisna društva', to: '/kontakt', id: 'drustva' },
    { label: 'Predstavništva u inostranstvu', to: '/kontakt', id: 'inostranstvo' }] },
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
