# STATUS — where work left off (2026-10-02)

Goal from the user: a **React presentation** of the new Energoprojekt website in the new design
(`project/*.dc.html`), with **all the content of the old site (energoprojekt.rs)** — its pages,
stories/news, project references and photos — but in the new look.

## Done
- `web/` — Vite + React 19 + react-router (HashRouter, `base: './'` so `dist/` works on any static host).
  - Run: `cd web && npm install && npm run dev` · Build: `npm run build` · Lint: `npx oxlint src`
  - **Home page** (`src/pages/Home.jsx`) built to match `project/Home.dc.html` exactly, plus
    `Header` (sticky, scroll shadow, mega menu, search overlay, offices modal; nav links show ≥1180px)
    and `Footer`. `ContactForm` (validation + success state, no backend) and `Counters` (count-up on scroll).
  - **All copy and image paths live in `src/content/site.js`.** Every `image: null` shows a grey
    captioned placeholder (`ImageSlot`). Put photos in `web/public/images/` and set `image: 'images/…'`.
  - Smoke-tested in headless Chromium: overlays, navigation, counters, form, no horizontal scroll at 390px.
- `site/` — earlier plain HTML/CSS/JS version of Home. Superseded by `web/`; can be deleted.
- Design decision: image corners are square (brief says "flat edges"), not the prototype slot's 12px radius.

## Blocked
- **energoprojekt.rs is blocked by this cloud environment's network policy** (curl and WebFetch both
  refused). Fix: environment settings → Network access → allow `energoprojekt.rs` and
  `www.energoprojekt.rs` (or a broader level). Alternative: upload the texts/photos manually.

## Update (inner pages built)
- All routes now render real pages from the designs: `ONama`, `Investitori`, `Projekti`, `Projekat`, `Vesti`,
  `Karijera` (job filters + application drawer), `Kontakt`. Added pages without a design in the same visual
  language: `Odrzivost`, `Vest` (news article), `NotFound` (404). `ComingSoon` was removed.
- Inner-page copy lives in `web/src/content/pages.js` (placeholder text from the prototypes), styles in
  `web/src/pages.css`, shared bits in `components/` (`Crumbs`, `Tabs`, `Select`, `Meta`, `ProjectCard`).
- Only `he-gornja-drina` has a full case study; other projects show the short template. News articles show the teaser only.
- Smoke-tested all routes at 1280px and 390px (no horizontal scroll, filters/load-more/forms work).

## Next steps
1. Allow `energoprojekt.rs` in the network policy, then crawl: sitemap, page texts, news, project references, photos
   (to `web/public/images/`).
2. Replace placeholder content in `content/site.js` and `content/pages.js` with the real content; set `image` fields.
3. Add any old-site pages not covered yet (Usluge, Real estate, full search results page).
4. Work lives on branch `feat/home-page` (draft PR open). Continue there.

---

# CODING AGENTS: READ THIS FIRST

This is a **handoff bundle** from Claude Design (claude.ai/design).

A user mocked up designs in HTML/CSS/JS using an AI design tool, then exported this bundle so a coding agent can implement the designs for real.

## What you should do — IMPORTANT

**Read the chat transcripts first.** There are 1 chat transcript(s) in `chats/`. The transcripts show the full back-and-forth between the user and the design assistant — they tell you **what the user actually wants** and **where they landed** after iterating. Don't skip them. The final HTML files are the output, but the chat is where the intent lives.

**Read `project/Home.dc.html` in full.** The user had this file open when they triggered the handoff, so it's almost certainly the primary design they want built. Read it top to bottom — don't skim. Then **follow its imports**: open every file it pulls in (shared components, CSS, scripts) so you understand how the pieces fit together before you start implementing.

**If anything is ambiguous, ask the user to confirm before you start implementing.** It's much cheaper to clarify scope up front than to build the wrong thing.

## About the design files

The design medium is **HTML/CSS/JS** — these are prototypes, not production code. Your job is to **recreate them pixel-perfectly** in whatever technology makes sense for the target codebase (React, Vue, native, whatever fits). Match the visual output; don't copy the prototype's internal structure unless it happens to fit.

**Don't render these files in a browser or take screenshots unless the user asks you to.** Everything you need — dimensions, colors, layout rules — is spelled out in the source. Read the HTML and CSS directly; a screenshot won't tell you anything they don't.

## Bundle contents

- `README.md` — this file
- `chats/` — conversation transcripts (read these!)
- `project/` — the `Design project setup` project files (HTML prototypes, assets, components)
