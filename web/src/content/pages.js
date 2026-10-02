// Content for the inner pages. Text comes from the Claude Design prototypes (project/*.dc.html);
// replace with the real energoprojekt.rs copy and set `image` fields once the old site is scraped.

export const projectTabs = ['Sve', 'Energetika', 'Visokogradnja', 'Infrastruktura', 'Vodoprivreda', 'Industrija']

export const projectList = [
  { slug: 'he-gornja-drina', title: 'HE Gornja Drina', location: 'BiH', sector: 'Energetika' },
  { slug: 'autoput-pakovrace-pozega', title: 'Autoput Pakovraće – Požega', location: 'Srbija', sector: 'Infrastruktura' },
  { slug: 'poslovni-centar-usce-2', title: 'Poslovni centar Ušće 2', location: 'Beograd', sector: 'Visokogradnja' },
  { slug: 'vodovod-kampala', title: 'Vodovod Kampala', location: 'Uganda', sector: 'Vodoprivreda' },
  { slug: 'trafostanica-doha-south', title: 'Trafostanica Doha South', location: 'Katar', sector: 'Energetika' },
  { slug: 'most-sava-obrenovac', title: 'Most preko Save, Obrenovac', location: 'Srbija', sector: 'Infrastruktura' },
  { slug: 'fabrika-cementa-novi-popovac', title: 'Fabrika cementa Novi Popovac', location: 'Srbija', sector: 'Industrija' },
  { slug: 'kosa-kvart', title: 'Kosa Kvart', location: 'Beograd', sector: 'Visokogradnja' },
  { slug: 'brana-bujagali', title: 'Brana Bujagali', location: 'Uganda', sector: 'Vodoprivreda' },
  { slug: 'aerodrom-lagos-terminal', title: 'Aerodrom Lagos – terminal', location: 'Nigerija', sector: 'Visokogradnja' },
].map(p => ({ ...p, image: null }))

// Full case study (only one is written in the design); other projects fall back to a short summary.
export const projectDetails = {
  'he-gornja-drina': {
    headline: 'HE Gornja Drina: četiri hidroelektrane na jednom slivu',
    summary: 'Projektovanje i izgradnja kaskadnog sistema od četiri protočne hidroelektrane ukupne snage 118 MW, sa pratećom infrastrukturom i dalekovodima.',
    facts: [['Klijent', 'Elektroprivreda RS'], ['Lokacija', 'Foča, BiH'], ['Godina', '2023–2027'], ['Vrednost', '€ 210 mil.'], ['Kapacitet', '118 MW'], ['Naša uloga', 'EPC izvođač']],
    challenge: [
      'Teren u kanjonu gornjeg toka Drine zahtevao je pristupne puteve dužine 34 km, prilagođavanje rokova sezonskim vodostajima i strogu zaštitu rečnog ekosistema tokom svih faza gradnje.',
      'Energoprojekt je preuzeo kompletno projektovanje, nabavku opreme i izgradnju, uz koordinaciju sa lokalnim podizvođačima i nadzorom investitora.',
    ],
    quote: { text: 'Kaskadni sistem daje 420 GWh čiste energije godišnje, dovoljno za oko 100.000 domaćinstava.', by: 'Marko Petrović, direktor projekta' },
    solution: 'Primenom prefabrikovanih betonskih elemenata i paralelnog rada na četiri lokacije, rok izgradnje skraćen je za osam meseci u odnosu na prvobitni plan.',
    related: ['trafostanica-doha-south', 'brana-bujagali', 'fabrika-cementa-novi-popovac'],
  },
}

export const newsTabs = ['Sve', 'Energetika', 'Infrastruktura', 'Vodoprivreda', 'Održivost', 'Saopštenja', 'Mediji']

export const newsList = [
  { slug: 'ugovor-hidroelektrana-uganda', title: 'Potpisan ugovor za izgradnju hidroelektrane u Ugandi', cat: 'Energetika', date: '28. sep 2026.', text: 'Ugovor vredan 84 miliona evra obuhvata hidroelektranu snage 42 MW i dalekovod dužine 60 km.' },
  { slug: 'rezultati-prvo-polugodiste-2026', title: 'Rezultati poslovanja za prvo polugodište 2026.', cat: 'Saopštenja', date: '15. sep 2026.', text: 'Konsolidovani poslovni prihodi grupe porasli su za 12% u odnosu na isti period prošle godine.' },
  { slug: 'stipendije-studentima', title: 'Uručene stipendije studentima tehničkih fakulteta', cat: 'Održivost', date: '2. sep 2026.', text: 'Dvadeset studenata dobilo je stipendiju i mentorstvo naših inženjera tokom školske godine.' },
  { slug: 'zavrsena-prva-faza-autoputa', title: 'Završena prva faza autoputa Pakovraće – Požega', cat: 'Infrastruktura', date: '20. avg 2026.', text: 'Pušteno je u saobraćaj 11 km deonice sa dva tunela i šest mostova.' },
  { slug: 'vodovod-kampala-zavrsna-faza', title: 'Rekonstrukcija vodovoda u Kampali ulazi u završnu fazu', cat: 'Vodoprivreda', date: '5. avg 2026.', text: 'Novi cevovod obezbediće pitku vodu za dodatnih 300.000 stanovnika.' },
  { slug: 'odluka-o-isplati-dividende-2025', title: 'Odluka o isplati dividende za 2025.', cat: 'Saopštenja', date: '1. jul 2026.', text: 'Skupština akcionara usvojila je odluku o isplati dividende od 18 dinara po akciji.' },
  { slug: 'sajam-gradjevinarstva', title: 'Energoprojekt na Međunarodnom sajmu građevinarstva', cat: 'Energetika', date: '14. apr 2026.', text: 'Na štandu su predstavljeni projekti iz oblasti obnovljivih izvora energije.' },
].map(n => ({ ...n, image: null }))

export const about = {
  hero: { eyebrow: 'Ko smo', title: 'Sedam decenija inženjerstva bez granica', text: 'Energoprojekt je osnovan 1951. kao projektni biro za elektroprivredu. Danas je holding sa 810 zaposlenih i projektima u 15 zemalja.', image: null, placeholder: 'Sedište kompanije – fotografija' },
  stats: [['1951', 'Godina osnivanja'], ['810', 'Zaposlenih'], ['15', 'Zemalja'], ['7000+', 'Projekata']],
  pillars: [
    ['Misija', 'Projektujemo i gradimo pouzdanu infrastrukturu koja unapređuje život zajednica u kojima radimo.'],
    ['Vizija', 'Da budemo prvi izbor za složene inženjerske projekte u regionu i na tržištima u razvoju.'],
    ['Vrednosti', 'Stručnost, odgovornost, bezbednost na radu i dugoročna partnerstva.'],
  ],
  timeline: [
    ['1951', 'Osnovan projektni biro za izgradnju elektroenergetskih objekata.'],
    ['1958', 'Prvi inostrani ugovor: hidroelektrana u Gani.'],
    ['1970-ih', 'Širenje na tržišta Afrike, Bliskog istoka i Južne Amerike.'],
    ['1991', 'Transformacija u holding sa zavisnim društvima.'],
    ['2008', 'Uvođenje integrisanog sistema menadžmenta ISO 9001, 14001 i 45001.'],
    ['2026', 'Projekti u 15 zemalja i fokus na obnovljive izvore energije.'],
  ],
  board: [
    ['Dragan Nikolić', 'Generalni direktor'],
    ['Snežana Pavlović', 'Finansijski direktor'],
    ['Vladimir Kostić', 'Direktor za inženjering'],
    ['Marija Stojanović', 'Direktorka za korporativne poslove'],
  ],
  markets: {
    'Evropa': ['Srbija', 'Bosna i Hercegovina', 'Crna Gora', 'Rusija'],
    'Afrika': ['Uganda', 'Nigerija', 'Alžir', 'Gana', 'Zambija'],
    'Bliski istok': ['Katar', 'UAE', 'Oman'],
    'Azija i Amerika': ['Kazahstan', 'Peru'],
  },
}

const bars = (t, vals) => ({ title: t, vals })
export const investors = {
  intro: 'Akcije Energoprojekt holdinga kotiraju se na Prime Listing tržištu Beogradske berze pod oznakom ENHL.',
  kpis: [
    bars('Poslovni prihodi', [28400, 31200, 33900, 36100, 40450]),
    bars('Neto dobit', [1210, 1480, 1390, 1720, 2010]),
    bars('Ugovoreni poslovi', [35000, 41800, 38600, 47200, 52900]),
    bars('EBITDA', [2900, 3350, 3420, 3980, 4560]),
  ],
  subpages: ['Akcije i Beogradska berza', 'Skupština akcionara', 'Korporativno upravljanje', 'Finansijski kalendar', 'Obaveštenja akcionarima', 'Finansijski izveštaji'],
  reportTypes: ['Sve vrste', 'Godišnji', 'Polugodišnji', 'Kvartalni'],
  reportYears: ['Sve godine', '2026', '2025', '2024'],
  reports: [
    { year: '2026', date: '28. avg 2026.', type: 'Polugodišnji', title: 'Polugodišnji izveštaj 2026', docs: ['Konsolidovani izveštaj', 'Izveštaj revizora'] },
    { year: '2026', date: '29. maj 2026.', type: 'Kvartalni', title: 'Kvartalni izveštaj Q1 2026', docs: ['Konsolidovani izveštaj'] },
    { year: '2025', date: '30. apr 2026.', type: 'Godišnji', title: 'Godišnji izveštaj 2025', docs: ['Godišnji izveštaj', 'Izveštaj revizora'] },
    { year: '2025', date: '28. avg 2025.', type: 'Polugodišnji', title: 'Polugodišnji izveštaj 2025', docs: ['Konsolidovani izveštaj'] },
    { year: '2024', date: '30. apr 2025.', type: 'Godišnji', title: 'Godišnji izveštaj 2024', docs: ['Godišnji izveštaj', 'Izveštaj revizora'] },
  ],
}

export const careers = {
  hero: { title: 'Gradite karijeru koja ostaje', text: 'Pridružite se timu od 810 inženjera, arhitekata i stručnjaka koji rade na projektima u 15 zemalja.', placeholder: 'Portret inženjerke na gradilištu' },
  why: [
    ['Projekti širom sveta', 'Rad na gradilištima u Africi, Bliskom istoku, Južnoj Americi i Evropi.'],
    ['Mentorstvo', 'Svaki novi inženjer dobija iskusnog mentora za prvu godinu rada.'],
    ['Licence i obuke', 'Finansiramo stručne ispite, licence i specijalističke kurseve.'],
  ],
  stories: [
    { q: 'Za tri godine radila sam na dva kontinenta i naučila više nego za deset.', name: 'Jelena Marković', role: 'Inženjerka konstrukcija' },
    { q: 'Mentor mi je pomogao da položim licencu već posle prve godine.', name: 'Stefan Ilić', role: 'Inženjer hidrotehnike' },
    { q: 'Ponosan sam kad prođem autoputem koji smo gradili.', name: 'Nikola Jovanović', role: 'Rukovodilac gradilišta' },
  ],
  internship: 'Letnja praksa za studente završnih godina i stipendije za najbolje studente tehničkih fakulteta. Prijave su otvorene do 15. novembra.',
  locations: ['Sve lokacije', 'Beograd', 'Uganda', 'Katar', 'Peru'],
  sectors: ['Svi sektori', 'Projektovanje', 'Izgradnja', 'Finansije'],
  jobs: [
    { title: 'Vodeći inženjer hidrotehnike', sector: 'Projektovanje', location: 'Beograd', deadline: '31. okt 2026.' },
    { title: 'Rukovodilac gradilišta', sector: 'Izgradnja', location: 'Uganda', deadline: '15. nov 2026.' },
    { title: 'Inženjer elektroenergetike', sector: 'Projektovanje', location: 'Katar', deadline: '20. nov 2026.' },
    { title: 'Finansijski analitičar', sector: 'Finansije', location: 'Beograd', deadline: '30. okt 2026.' },
    { title: 'Geodeta', sector: 'Izgradnja', location: 'Peru', deadline: '1. dec 2026.' },
  ],
  jobText: 'Tražimo kolegu sa najmanje pet godina iskustva i licencom Inženjerske komore Srbije, spremnog za rad u multidisciplinarnom timu.',
}

export const contact = {
  hq: { dept: 'Sedište', name: 'Energoprojekt holding a.d.' },
  people: [
    { dept: 'Odnosi sa javnošću', name: 'Ana Simić', role: 'Rukovodilac PR-a', tel: '+381 11 3101 210', mail: 'pr@energoprojekt.rs' },
    { dept: 'Odnosi sa investitorima', name: 'Milan Đorđević', role: 'Direktor za odnose sa investitorima', tel: '+381 11 3101 330', mail: 'ir@energoprojekt.rs' },
    { dept: 'Ljudski resursi', name: 'Ivana Popović', role: 'Menadžerka za zapošljavanje', tel: '+381 11 3101 415', mail: 'karijera@energoprojekt.rs' },
  ],
  subsidiaries: [
    ['Hidroinženjering', 'hidro'], ['Urbanizam i arhitektura', 'urbanizam'], ['Entel', 'entel'], ['Industrija', 'industrija'],
    ['Visokogradnja', 'visokogradnja'], ['Izgradnja', 'izgradnja'], ['Niskogradnja', 'niskogradnja'],
  ],
  offices: {
    'Srbija': [['Beograd', 'Bulevar Mihajla Pupina 12'], ['Novi Sad', 'Bulevar oslobođenja 30'], ['Niš', 'Obrenovićeva 18']],
    'Svet': [['Kampala, Uganda', 'Plot 14, Kololo Hill'], ['Doha, Katar', 'West Bay, Tower 3'], ['Lagos, Nigerija', 'Victoria Island'], ['Lima, Peru', 'Av. Javier Prado 450'], ['Moskva, Rusija', 'Tverskaja 22'], ['Astana, Kazahstan', 'Kabanbaj Batir 11']],
  },
}

// No design exists for this page; built in the same visual language from the home-page sustainability copy.
export const sustainabilityPage = {
  eyebrow: 'Održivost',
  title: 'Održivo poslovanje i ISO standardi',
  text: 'Integrisani sistem menadžmenta po standardima ISO 9001, 14001 i 45001 garantuje kvalitet, zaštitu životne sredine i bezbednost na svakom gradilištu.',
  pillars: [
    ['ISO 9001', 'Kvalitet', 'Jedinstveni procesi projektovanja i izgradnje na svim projektima grupe.'],
    ['ISO 14001', 'Životna sredina', 'Zaštita ekosistema u svim fazama gradnje, od planiranja do puštanja u rad.'],
    ['ISO 45001', 'Bezbednost na radu', 'Sistematsko upravljanje rizicima i obuka svih zaposlenih na gradilištima.'],
  ],
  closing: 'Stipendije, mentorstvo i ulaganje u lokalne zajednice deo su svakog projekta na kome radimo.',
}
