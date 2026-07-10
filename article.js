// ===== Shared Language Toggle for Article Pages =====
// Uses the same localStorage key as the homepage so the choice is remembered.
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

document.addEventListener('DOMContentLoaded', initLanguage);
