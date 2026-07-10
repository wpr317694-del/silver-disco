// ===== Language Toggle (中文 / English) =====
const LANG_KEY = 'preferred-lang';

function applyLanguage(lang) {
    document.querySelectorAll('[data-en][data-zh]').forEach(el => {
        const value = el.getAttribute('data-' + lang);
        if (value !== null) {
            el.innerHTML = value;
        }
    });

    document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
    document.body.classList.toggle('lang-zh', lang === 'zh');
    document.body.classList.toggle('lang-en', lang === 'en');

    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
    });

    localStorage.setItem(LANG_KEY, lang);
}

function initLanguage() {
    let lang = localStorage.getItem(LANG_KEY);
    if (!lang) {
        lang = (navigator.language || '').toLowerCase().startsWith('zh') ? 'zh' : 'en';
    }
    applyLanguage(lang);

    const toggle = document.getElementById('lang-toggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            const current = localStorage.getItem(LANG_KEY) || 'zh';
            applyLanguage(current === 'zh' ? 'en' : 'zh');
        });
    }
}

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        const id = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===== Scroll Animations =====
function initScrollAnimations() {
    const elements = document.querySelectorAll('.box, .hero-container');
    elements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(el => observer.observe(el));
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initScrollAnimations();
    updateActiveNav();
});
