(function navHamburger() {
    const btn = document.getElementById('menu-toggle');
    const nav = document.getElementById('primary-nav');
    if (!btn || !nav) return;

    const open = () => { nav.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); btn.textContent = '✕'; };
    const close = () => { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); btn.textContent = '☰'; };
    const toggle = () => nav.classList.contains('open') ? close() : open();

    btn.addEventListener('click', (e) => { e.preventDefault(); toggle(); });

    // Close-on-resize
    let wasMobile = matchMedia('(max-width: 767.98px)').matches;
    addEventListener('resize', () => {
        const isMobile = matchMedia('(max-width: 767.98px)').matches;
        if (!isMobile && wasMobile) close();
        wasMobile = isMobile;
    });
})();

(function filtering() {
    const nav = document.getElementById('primary-nav');
    const cards = Array.from(document.querySelectorAll('.gallery .card'));
    if (!nav || !cards.length) return;

    const showAll = () => cards.forEach(c => c.style.display = "");
    const filterBy = (key) => {
        document.querySelector('.page-heading').textContent = key
        if (key === 'home') { showAll(); return; }
        const attr = (key === 'old' || key === 'new') ? 'era' : 'size';
        cards.forEach(c => {
            const val = c.dataset[attr];
            c.style.display = (val === key) ? "" : "none";
        });

    };

    nav.addEventListener('click', (e) => {
        const a = e.target.closest('a[data-filter]');
        if (!a) return;
        e.preventDefault();

        // active state
        nav.querySelectorAll('.nav-link').forEach(x => x.classList.remove('is-current'));
        a.classList.add('is-current');

        filterBy(a.dataset.filter);
    });
})();

(function footerMeta() {
    const yearEl = document.getElementById('year');
    const lmEl = document.getElementById('last-modified');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (lmEl) lmEl.textContent = document.lastModified;
})();