// Energoprojekt — page behaviour: header overlays, search, counters, contact form.
(() => {
  'use strict';

  /* ---------- Header shadow on scroll ---------- */
  const header = document.querySelector('[data-header]');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Overlays: mega menu, search, offices ---------- */
  let openOverlay = null;
  let lastTrigger = null;

  function open(id, trigger) {
    const el = document.getElementById(id);
    if (!el) return;
    if (openOverlay) close();
    el.hidden = false;
    openOverlay = el;
    lastTrigger = trigger || null;
    document.body.classList.add('no-scroll');
    if (id === 'search') {
      searchInput.value = '';
      renderSearch();
      searchInput.focus();
    } else {
      el.querySelector('[data-close]')?.focus();
    }
  }

  function close() {
    if (!openOverlay) return;
    openOverlay.hidden = true;
    openOverlay = null;
    document.body.classList.remove('no-scroll');
    lastTrigger?.focus();
  }

  document.querySelectorAll('[data-open]').forEach(btn =>
    btn.addEventListener('click', () => open(btn.dataset.open, btn)));
  document.querySelectorAll('[data-close]').forEach(btn =>
    btn.addEventListener('click', close));
  document.querySelectorAll('[data-backdrop-close]').forEach(el =>
    el.addEventListener('click', e => { if (e.target === el) close(); }));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  /* ---------- Search ---------- */
  const SEARCH_DATA = [
    { group: 'Projekti', href: 'projekat.html', items: ['HE Gornja Drina', 'Autoput Pakovraće – Požega', 'Poslovni kompleks Ušće Tower 2', 'Kosa Kvart, Beograd', 'Vodovod Kampala', 'Trafostanica Doha South'] },
    { group: 'Vesti', href: 'vesti.html', items: ['Potpisan ugovor za hidroelektranu u Ugandi', 'Energoprojekt na Sajmu građevinarstva', 'Rezultati poslovanja za prvo polugodište', 'Uručene stipendije studentima'] },
    { group: 'Dokumenti', href: 'investitori.html', items: ['Godišnji izveštaj 2025 (PDF)', 'Polugodišnji izveštaj 2026 (PDF)', 'Poziv na sednicu skupštine (PDF)', 'Statut društva (PDF)'] }
  ];
  const searchInput = document.querySelector('[data-search-input]');
  const searchEmpty = document.querySelector('[data-search-empty]');
  const searchResults = document.querySelector('[data-search-results]');

  function renderSearch() {
    if (!searchInput) return;
    const raw = searchInput.value;
    const q = raw.trim().toLowerCase();
    const groups = SEARCH_DATA
      .map(g => ({ ...g, items: q ? g.items.filter(i => i.toLowerCase().includes(q)) : g.items.slice(0, 3) }))
      .filter(g => g.items.length);

    searchResults.replaceChildren(...groups.map(g => {
      const col = document.createElement('div');
      const title = document.createElement('div');
      title.className = 'eyebrow search-group-title';
      title.textContent = `${g.group} (${g.items.length})`;
      col.append(title);
      g.items.forEach(item => {
        const a = document.createElement('a');
        a.href = g.href;
        a.textContent = item;
        col.append(a);
      });
      return col;
    }));

    const none = q && !groups.length;
    searchEmpty.hidden = !none;
    if (none) searchEmpty.textContent = `Nema rezultata za „${raw}“. Pokušajte sa drugim pojmom, npr. „hidroelektrana“ ili „izveštaj“.`;
  }
  searchInput?.addEventListener('input', renderSearch);

  /* ---------- Animated counters (ease-out cubic, 1.6s, once at 40% visibility) ---------- */
  const counters = document.querySelector('[data-counters]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (counters && 'IntersectionObserver' in window && !reduceMotion) {
    const vals = [...counters.querySelectorAll('[data-count]')];
    vals.forEach(v => { v.textContent = '0'; });
    const io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = t => {
        const p = Math.min(1, (t - t0) / 1600);
        const eased = 1 - Math.pow(1 - p, 3);
        vals.forEach(v => { v.textContent = String(Math.round(Number(v.dataset.count) * eased)); });
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(counters);
  }

  /* ---------- Contact form ---------- */
  const form = document.querySelector('[data-contact-form]');
  if (form) {
    const success = document.querySelector('[data-success]');
    const consentErr = form.querySelector('[data-consent-err]');
    const consent = form.elements.consent;

    const setError = (name, msg) => {
      const field = form.querySelector(`[data-field="${name}"]`);
      const err = field.querySelector('.field-err');
      field.classList.toggle('invalid', !!msg);
      field.querySelector('input').setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (err) { err.hidden = !msg; err.textContent = msg || ''; }
    };

    form.addEventListener('input', e => {
      if (e.target.name && e.target.name !== 'consent') setError(e.target.name, null);
    });
    consent.addEventListener('change', () => { consentErr.hidden = true; });

    form.addEventListener('submit', e => {
      e.preventDefault();
      const ime = form.elements.ime.value;
      const email = form.elements.email.value;
      const errors = {};
      if (!ime.trim()) errors.ime = 'Unesite ime.';
      if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Unesite ispravnu e-mail adresu.';
      setError('ime', errors.ime);
      setError('email', errors.email);
      consentErr.hidden = consent.checked;

      const firstInvalid = form.querySelector('[aria-invalid="true"]') || (!consent.checked && consent);
      if (firstInvalid) { firstInvalid.focus(); return; }

      // TODO: send to backend endpoint once available.
      success.querySelector('[data-success-name]').textContent = ime;
      success.querySelector('[data-success-email]').textContent = email;
      form.hidden = true;
      success.hidden = false;
    });
  }
})();
