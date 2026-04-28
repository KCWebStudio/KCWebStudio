/* =====================================================
   KC.WEBSTUDIO — script.js
   ===================================================== */

/* ---- CUSTOM CURSOR ---- */
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

if (cursor && cursorTrail) {
    document.addEventListener('mousemove', e => {
        cursor.style.left      = e.clientX + 'px';
        cursor.style.top       = e.clientY + 'px';
        cursorTrail.style.left = e.clientX + 'px';
        cursorTrail.style.top  = e.clientY + 'px';
    });

    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width  = '14px';
            cursor.style.height = '14px';
            cursor.style.background = 'var(--accent-dim)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width  = '8px';
            cursor.style.height = '8px';
            cursor.style.background = 'var(--accent)';
        });
    });
}

/* ---- SMOOTH SCROLL ---- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            document.getElementById('navLinks').classList.remove('open');
        }
    });
});

/* ---- MOBILE NAV ---- */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}

/* ---- FADE IN ON SCROLL ---- */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.12 });

document.querySelectorAll('.section, .service-card, .work-card, .pricing-card, .process-step, .contact-card').forEach(el => {
    el.classList.add('fade');
    observer.observe(el);
});

/* ---- ACTIVE NAV ON SCROLL ---- */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
    });
    navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
}, { passive: true });

/* ---- NAV SHADOW ON SCROLL ---- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    if (nav) nav.style.borderBottomColor = window.scrollY > 50 ? 'var(--border-lit)' : 'var(--border)';
}, { passive: true });

/* ---- LANGUAGE TOGGLE ---- */
const langBtns = document.querySelectorAll('.lang-btn');
let currentLang = 'it';

function setLang(lang) {
    currentLang = lang;
    langBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
    document.querySelectorAll(`[data-${lang}]`).forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) el.innerHTML = text;
    });
}

langBtns.forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
});
