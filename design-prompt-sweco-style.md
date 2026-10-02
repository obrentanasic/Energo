Redesign the corporate website of ENERGOPROJEKT HOLDING (Serbian engineering and construction group, founded 1951, ~810 employees, projects in 15 countries) in the visual and structural style of swecogroup.com: calm, editorial, large photography, generous whitespace, one soft green accent, flat rectangular UI with no shadows or rounded corners. Deliver desktop (1440px) and mobile (390px) designs plus a small design system, so every page reuses the same components. Content is in Serbian (Cyrillic, with a SR Latin / EN switch); use realistic placeholder copy.

=== DESIGN SYSTEM (derived from Sweco) ===
Colors
- Text and ink: #111111
- Page background: #FFFFFF; alternate section background: #F2F2F2
- Accent (ONE only): soft green #87BE73 for buttons, arrow squares, active-filter underline, link underline, check-marks
- Footer and dark UI: #575656 (footer), #444444 (menu button); overlays rgba(0,0,0,0.4-0.7)
- Hairline dividers #E1E1E1. No gradients, no shadows, border-radius 0 everywhere.
- For Energoprojekt: keep this structure, but replace the green with the brand red from the Energoprojekt logo (or keep green if the client prefers; make the accent a single token).
Typography
- One humanist/condensed-feeling sans with Cyrillic support (Sweco uses a custom "Sweco Sans"; use e.g. "Barlow Semi Condensed" or "IBM Plex Sans Condensed" as a stand-in), weight 400 for headings (light, airy), 500-600 only for button and link labels.
- Scale: H1 56px, H2 40px, H3 28px, body 16-18px at 1.5 line-height, small meta 14px, eyebrow label uppercase 14px with letter-spacing 0.08em, big stat numbers 120px+ in light weight.
Layout
- 12-column grid, content max-width ~1184px with 128px left margin on large screens; narrow reading column 840px for articles; full-bleed images allowed.
- Section vertical rhythm 96-128px. Alternate white and #F2F2F2 bands.
Components
- Buttons: flat green rectangle, 16px 24px padding, 18px #111 label, no radius. Secondary: white with 2px green border. Icon button: 56x56 green square with a thin black arrow →.
- Text link: #111 with a 2px green underline offset 4px.
- Cards (news, project): image on top (4:3 or 16:9), meta row "Category | Date" in grey 14px with a thin vertical separator, 28px title, 3-line excerpt, "Read more" link. Project card: title and then location | sector tags ABOVE the image.
- Filter bar: text-only tabs separated by thin vertical lines, active tab underlined in green (no pills). Dropdown selects with 1px border, 48px high.
- Document row: green square PDF icon + bold file name, grouped under date | type meta and a title, rows divided by a hairline.
- Data table: bold header row, hairline row dividers, last column a green arrow square.
- Form: underlined fields (bottom border only), floating labels, checkbox with consent text, green Submit.
- Contact person block: grey card with name, italic role, outlined "Show contact information" button that expands.
- Breadcrumbs: small 14px "Home / Section / Page" above the page title.
- Cookie consent modal: centered white box, 3 buttons (View preferences outlined, Deny, Accept).

=== GLOBAL HEADER / FOOTER ===
Header (96px tall, white, sticky, subtle bottom shadow only on scroll): logo left; menu: O nama v | Za investitore v | Održivost v | Projekti | Karijera v | Vesti v | Kontakt; far right two stacked square buttons: location pin (offices) and magnifier (search); a dark #444 square hamburger opening a full-screen mega menu with all sub pages in columns. Dropdowns are simple lists with 3 levels. Mobile: logo, pin, search, hamburger only; full-screen accordion.
Search overlay: big input, grouped results (Projects, News, Documents).
Footer (dark #575656): short company description in italics (left), 3 link columns (Company, Services, Investors/Press), social links, address block (Bulevar Mihajla Pupina 12, 11070 Beograd, +381 11 3101010, ep@energoprojekt.rs), bottom bar with (c), policy links, and a white logo at the right.

=== PAGES TO DESIGN ===
1. HOME (follow Sweco's home order exactly)
   a. Full-viewport hero image/video (e.g. wind farm or bridge). A white text panel overlaps the hero's right half: H1 "Градимо заједно" style tagline + one-line subtitle. At the bottom of the hero, a translucent dark strip with 4-5 sector links with green arrows: Energetika, Visokogradnja, Infrastruktura, Vodoprivreda, Industrija.
   b. Intro band: left H2 statement ("Водећа српска компанија у области инжењеринга и изградње"), right giant animated number (810 / 75 / 15 as three counters in a row) with uppercase caption.
   c. Highlight band on #F2F2F2: image left (650px), right a heading + bold lead + 2 green check-mark links (e.g. "Позив на седницу скупштине", "Пријава за вебкаст").
   d. "Priče vredne pažnje" / News: 3 cards in a row + green "Sve vesti" button.
   e. Feature block: centered image (712px wide) with H3 title, paragraph, green button (e.g. Sustainability / ISO policy).
   f. Alternating image/text feature blocks (image left then right) with green buttons (e.g. publications / reports).
   g. THREE info boxes on #F2F2F2 in a row: "Najnovija saopštenja" (list with title, date | type, Read more), "Finansijski kalendar" (title + date), "Najnoviji finansijski izveštaji" (PDF icon + title). Each box ends with a green arrow square in its bottom-right corner.
   h. "Izdvojeni projekti": 2-up large cards (title, location | sector above, huge image) then a 3-up row; link "Svi projekti".
   i. Wide landscape photo, then three teaser columns (Za investitore, Karijera, Publikacije) each with heading, one-line text, green arrow square, and image.
   j. "Povežimo se" contact form: left heading + sentence, right form (Ime*, E-mail*, Kompanija, Zemlja, Telefon, Pitanje, consent checkbox, Submit).
2. O NAMA / KO SMO (editorial page: eyebrow, H1, lead text right column, full-bleed image, text sections, key figures)
   + Misija, vizija, vrednosti; Istorijat (vertical timeline 1951 -> today); Organizacija (org chart + Nadzorni i Izvršni odbor person cards); Tržišta (world map + region tabs); Publikacije (cover grid + PDF download).
3. USLUGE / OBLASTI DELOVANJA: overview page with 5-6 big image tiles; service detail page with full-bleed dark hero (white H1 over image), intro, sub-services list, related projects slider, key people, CTA "Kontaktirajte nas".
4. PROJEKTI (Portfolio): H1 + intro, "Filter by service" tabs (Sve, Energetika, Visokogradnja, Infrastruktura, Vodoprivreda, Industrija) + Search field, then a masonry-style grid of project cards (2-up large, then 3-up), "Učitaj još".
5. PROJEKAT (detail): breadcrumbs, eyebrow tagline, H1, short intro on the right, full-bleed hero image, fact sheet (klijent, lokacija, godina, vrednost, kapacitet, naša uloga), long-form text blocks with wide images, quote, gallery, related projects, contact CTA.
6. VESTI (Topical news): H1 + intro, category filter as text tabs in wrapped rows (Sve, Energetika, Infrastruktura, Vodoprivreda, Održivost, Saopštenja...), list rows with 224x166 thumbnail left and title, date + category, excerpt + "Read more", pagination or "Učitaj još". News detail: narrow 840px article column, hero image, share links, related news.
7. ZA INVESTITORE: landing with 4 key-figure charts (prihod, dobit, ugovaranje 2021-2025), links to subpages; "Finansijski izveštaji": two dropdown filters (vrsta izveštaja, godina), then year headings with report entries on #F2F2F2: date | type, H3 title, two columns "Priloženi dokumenti" and "Prezentacije" with green PDF squares; plus pages: Akcije i Beogradska berza, Skupština (pozivi, zapisnici, odluke), Korporativno upravljanje (statut, kodeksi), Finansijski kalendar, Obaveštenja akcionarima.
8. ODRŽIVOST: policy statement, three-perspective cards, ISO 9001/14001/45001 certificate cards with PDF download, CSR stories (humanitarian actions, scholarships, culture and sport) as image + text blocks.
9. REAL ESTATE: intro (800,000 m2), process steps, current project KOSA KVART, completed complexes as project cards, inquiry form; detail page like Project detail.
10. KARIJERA: landing (hero with person photo, "Zašto Energoprojekt", employee stories as 3 cards, internship/stipendije block); "Slobodna radna mesta": filter (Lokacija, Sektor) + Search jobs / Clear filter buttons, table with columns Naziv, Uloga, Lokacija, Rok (closing date) and a green arrow square per row; job detail with apply form (ime, e-mail, CV upload PDF/DOC, saglasnost) and success state.
11. KONTAKT: H1 "Povežite se sa nama", HQ card (adresa, telefon, mejl) next to a map card, grey person-cards list with "Prikaži kontakt" expanders (Press/PR, Investor relations, HR), tabs per subsidiary (Hidroinženjering, Urbanizam i arhitektura, Entel, Industrija, Visokogradnja, Izgradnja, Niskogradnja), "Srbija / Svet" regional offices, contact form.
12. OFFICES popup (pin icon): list of locations with a map.
13. SEARCH RESULTS, 404, Cookie/Privacy, Pristupačnost (Accessibility) pages.

=== INTERACTION & STATES ===
Hover: link underline thickens, cards zoom image 3%, arrow squares shift 4px right. Focus: 2px #111 outline offset 2px. Counters animate on scroll. Hero parallax subtle. Provide hover/focus/empty/error/loading/success states for filters, forms, search.

=== DELIVERABLES ===
1. Design-system page (tokens, type scale, buttons, links, cards, filters, tables, forms, doc rows, header/footer, cookie modal).
2. All pages above in desktop + mobile, using auto-layout, components and variables.
3. Clickable prototype of the main navigation and CTAs.
4. Accessibility: AA contrast (note #87BE73 with #111 text passes; never put white text on the green), min 44px targets, visible focus, alt text placeholders.
