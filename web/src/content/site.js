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
  { label: 'Usluge', to: '/projekti', items: ['Energetika', 'Visokogradnja', 'Infrastruktura', 'Vodoprivreda', 'Industrija', 'Real estate'] },
  { label: 'Za investitore', to: '/investitori', items: ['Finansijski izveštaji', 'Akcije i Beogradska berza', 'Skupština', 'Korporativno upravljanje', 'Finansijski kalendar', 'Obaveštenja akcionarima'] },
  { label: 'Projekti', to: '/projekti', items: ['Svi projekti', 'Izdvojeni projekti', 'Real estate – Kosa Kvart'] },
  { label: 'Karijera', to: '/karijera', items: ['Zašto Energoprojekt', 'Slobodna radna mesta', 'Praksa i stipendije', 'Priče zaposlenih'] },
  { label: 'Vesti', to: '/vesti', items: ['Sve vesti', 'Saopštenja', 'Mediji'] },
  { label: 'Kontakt', to: '/kontakt', items: ['Sedište', 'Zavisna društva', 'Regionalne kancelarije'] },
]

export const offices = [
  { city: 'Beograd (sedište)', country: 'Srbija' },
  { city: 'Kampala', country: 'Uganda' },
  { city: 'Doha', country: 'Katar' },
  { city: 'Lagos', country: 'Nigerija' },
  { city: 'Lima', country: 'Peru' },
  { city: 'Moskva', country: 'Rusija' },
  { city: 'Astana', country: 'Kazahstan' },
  { city: 'Alžir', country: 'Alžir' },
]

export const sectors = ['Energetika', 'Visokogradnja', 'Infrastruktura', 'Vodoprivreda', 'Industrija']

export const hero = {
  eyebrow: 'Od 1951.',
  title: 'Gradimo zajedno',
  text: 'Inženjering, projektovanje i izgradnja energetskih, infrastrukturnih i objekata visokogradnje u Srbiji i svetu.',
  image: null,
  placeholder: 'Hero fotografija – vetropark ili most',
}

export const intro = {
  title: 'Vodeća srpska kompanija u oblasti inženjeringa i izgradnje',
  counters: [
    { value: 810, label: 'Zaposlenih' },
    { value: 75, label: 'Godina iskustva' },
    { value: 15, label: 'Zemalja' },
  ],
}

export const investorHighlight = {
  eyebrow: 'Za investitore',
  title: 'Redovna sednica skupštine akcionara 2026.',
  text: 'Sednica će biti održana 26. juna 2026. u sedištu kompanije, uz mogućnost praćenja putem vebkasta.',
  links: [
    { label: 'Poziv na sednicu skupštine', to: '/investitori' },
    { label: 'Prijava za vebkast', to: '/investitori' },
  ],
  image: null,
  placeholder: 'Skupština akcionara – fotografija',
}

export const news = [
  { slug: 'ugovor-hidroelektrana-uganda', cat: 'Energetika', date: '28. sep 2026.', title: 'Potpisan ugovor za izgradnju hidroelektrane u Ugandi', text: 'Energoprojekt Niskogradnja potpisala je ugovor vredan 84 miliona evra za izgradnju male hidroelektrane i pratećeg dalekovoda u zapadnom delu zemlje.', image: null },
  { slug: 'rezultati-prvo-polugodiste-2026', cat: 'Saopštenja', date: '15. sep 2026.', title: 'Rezultati poslovanja za prvo polugodište 2026.', text: 'Konsolidovani poslovni prihodi grupe porasli su za 12% u odnosu na isti period prošle godine, uz stabilan portfolio ugovorenih poslova.', image: null },
  { slug: 'stipendije-studentima', cat: 'Održivost', date: '2. sep 2026.', title: 'Uručene stipendije studentima tehničkih fakulteta', text: 'Dvadeset studenata građevinskog, mašinskog i elektrotehničkog fakulteta dobilo je stipendiju i mentorstvo naših inženjera.', image: null },
]

export const sustainability = {
  title: 'Održivo poslovanje i ISO standardi',
  text: 'Integrisani sistem menadžmenta po standardima ISO 9001, 14001 i 45001 garantuje kvalitet, zaštitu životne sredine i bezbednost na svakom gradilištu.',
  cta: { label: 'Politika održivosti', to: '/odrzivost' },
  image: null,
  placeholder: 'Održivost – fotografija',
}

export const altBlocks = [
  { title: 'Publikacije', text: 'Monografije, brošure i katalozi referenci koji prate više od sedam decenija rada kompanije.', cta: { label: 'Pogledajte publikacije', to: '/o-nama' }, image: null, placeholder: 'Publikacije – fotografija' },
  { title: 'Godišnji izveštaj 2025', text: 'Pregled poslovanja, finansijskih rezultata i ključnih projekata Energoprojekt grupe u protekloj godini.', cta: { label: 'Preuzmite izveštaj', to: '/investitori' }, image: null, placeholder: 'Godišnji izveštaj – fotografija' },
]

export const releases = [
  { title: 'Obaveštenje o sticanju sopstvenih akcija', date: '30. sep 2026.', kind: 'Saopštenje' },
  { title: 'Odluka o isplati dividende za 2025.', date: '1. jul 2026.', kind: 'Skupština' },
  { title: 'Promena u sastavu Izvršnog odbora', date: '12. jun 2026.', kind: 'Saopštenje' },
]

export const calendar = [
  { day: '30', mon: 'okt', title: 'Objava kvartalnog izveštaja Q3 2026' },
  { day: '12', mon: 'nov', title: 'Konferencija za investitore, Beograd' },
  { day: '27', mon: 'feb', title: 'Preliminarni rezultati za 2026.' },
]

export const reports = ['Polugodišnji izveštaj 2026', 'Kvartalni izveštaj Q1 2026', 'Godišnji izveštaj 2025']

export const projects = [
  { slug: 'he-gornja-drina', title: 'HE Gornja Drina', location: 'Bosna i Hercegovina', sector: 'Energetika', featured: 'big', image: null },
  { slug: 'autoput-pakovrace-pozega', title: 'Autoput Pakovraće – Požega', location: 'Srbija', sector: 'Infrastruktura', featured: 'big', image: null },
  { slug: 'poslovni-centar-usce-2', title: 'Poslovni centar Ušće 2', location: 'Beograd', sector: 'Visokogradnja', featured: 'small', image: null },
  { slug: 'vodovod-kampala', title: 'Vodovod Kampala', location: 'Uganda', sector: 'Vodoprivreda', featured: 'small', image: null },
  { slug: 'trafostanica-doha-south', title: 'Trafostanica Doha South', location: 'Katar', sector: 'Energetika', featured: 'small', image: null },
]

export const wideImage = { image: null, placeholder: 'Široka pejzažna fotografija – gradilište' }

export const teasers = [
  { title: 'Za investitore', text: 'Izveštaji, akcije i skupština.', to: '/investitori', image: null },
  { title: 'Karijera', text: 'Gradite karijeru sa nama.', to: '/karijera', image: null },
  { title: 'Publikacije', text: 'Monografije i katalozi referenci.', to: '/o-nama', image: null },
]

export const contactIntro = {
  title: 'Povežimo se',
  text: 'Imate pitanje o našim uslugama, projektima ili saradnji? Popunite formular i odgovorićemo u roku od dva radna dana.',
}

export const searchIndex = [
  { group: 'Projekti', to: '/projekti', items: ['HE Gornja Drina', 'Autoput Pakovraće – Požega', 'Poslovni kompleks Ušće Tower 2', 'Kosa Kvart, Beograd', 'Vodovod Kampala', 'Trafostanica Doha South'] },
  { group: 'Vesti', to: '/vesti', items: ['Potpisan ugovor za hidroelektranu u Ugandi', 'Energoprojekt na Sajmu građevinarstva', 'Rezultati poslovanja za prvo polugodište', 'Uručene stipendije studentima'] },
  { group: 'Dokumenti', to: '/investitori', items: ['Godišnji izveštaj 2025 (PDF)', 'Polugodišnji izveštaj 2026 (PDF)', 'Poziv na sednicu skupštine (PDF)', 'Statut društva (PDF)'] },
]

export const footer = {
  tagline: 'Energoprojekt je od 1951. godine vodeća srpska kompanija u oblasti inženjeringa i izgradnje, sa projektima u 15 zemalja sveta.',
  columns: [
    { title: 'Kompanija', links: [['O nama', '/o-nama'], ['Projekti', '/projekti'], ['Karijera', '/karijera'], ['Kontakt', '/kontakt']] },
    { title: 'Usluge', links: [['Energetika', '/projekti'], ['Visokogradnja', '/projekti'], ['Infrastruktura', '/projekti'], ['Vodoprivreda', '/projekti']] },
    { title: 'Investitori i mediji', links: [['Finansijski izveštaji', '/investitori'], ['Skupština', '/investitori'], ['Saopštenja', '/vesti'], ['Vesti', '/vesti']] },
  ],
  hq: { street: 'Bulevar Mihajla Pupina 12', city: '11070 Beograd, Srbija', phone: '+381 11 3101010', phoneHref: 'tel:+381113101010', email: 'ep@energoprojekt.rs' },
}
