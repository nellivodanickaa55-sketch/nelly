/* ================================================================
   js/main.js — общая логика всех страниц
   ================================================================ */
(function(){
'use strict';

const d = window.MODEL_DATA;
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
let loaderTimer, cursorDot, cursorRing, mx=0, my=0, cx=0, cy=0;

/* ---------- Прелоадер ---------- */
function initLoader() {
  const bar = document.getElementById('preloaderBar');
  const pct = document.getElementById('preloaderPct');
  let p = 0;
  loaderTimer = setInterval(() => {
    p += Math.random() * 12 + 3;
    if (p >= 100) {
      p = 100;
      clearInterval(loaderTimer);
      setTimeout(() => {
        document.documentElement.classList.add('loaded');
        window.__ok = true;
      }, 400);
    }
    if (bar) bar.style.transform = `scaleX(${p/100})`;
    if (pct) pct.textContent = Math.round(p) + '%';
  }, 180);
}

/* ---------- Кастомный курсор ---------- */
function initCursor() {
  if (isMobile) return;
  document.documentElement.classList.add('has-cursor');
  cursorDot = document.querySelector('.cursor-dot');
  cursorRing = document.querySelector('.cursor-ring');
  if (!cursorDot || !cursorRing) return;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  document.querySelectorAll('a, button, summary, [data-tilt]').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
  });

  gsap.ticker.add(() => {
    cx += (mx - cx) * 0.25;
    cy += (my - cy) * 0.25;
    if (cursorDot) {
      cursorDot.style.transform = `translate(${mx}px, ${my}px)`;
    }
    if (cursorRing) {
      cursorRing.style.transform = `translate(${cx}px, ${cy}px)`;
    }
  });
}

/* ---------- Навигация ---------- */
function initNav() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  let scrollY = 0;

  window.addEventListener('scroll', () => {
    scrollY = window.pageYOffset;
    nav.classList.toggle('scrolled', scrollY > 80);
  });

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('menu-open');
      toggle.classList.toggle('active', open);
      toggle.setAttribute('aria-expanded', open);
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('menu-open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', false);
      });
    });
  }
}

/* ---------- Заполнение данных ---------- */
function fillData() {
  // Плашка "Демо-данные"
  if (d.isDemoData) {
    const notice = document.querySelector('.stats-notice, .hero-label');
    if (notice && !notice.querySelector('svg')) {
      notice.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg> Демо-данные — замени в js/data.js`;
      notice.style.cssText = 'border-color:rgba(255,190,90,.5);background:rgba(255,190,90,.1);color:#ffbe5a';
    }
  }

  // Значения [data-value]
  document.querySelectorAll('[data-value]').forEach(el => {
    const path = el.getAttribute('data-value').split('.');
    let val = d;
    for (let k of path) val = val?.[k];
    if (val == null) return;

    const fmt = el.getAttribute('data-format');
    const suffix = el.getAttribute('data-suffix') || '';
    
    let display = val;
    if (fmt === 'k') {
      display = val >= 1000 ? (val/1000).toFixed(1).replace('.0','') + 'K' : val;
    } else if (!isNaN(val)) {
      display = parseFloat(val).toLocaleString('ru');
    }
    
    el.textContent = display + suffix;
  });

  // Ссылки [data-link]
  document.querySelectorAll('[data-link]').forEach(el => {
    const key = el.getAttribute('data-link');
    const url = d.contact[key];
    if (url) {
      el.href = url;
      // Instagram: копируем текст
      if (key === 'instaDm') {
        el.addEventListener('click', e => {
          e.preventDefault();
          const txt = d.contact.instaDmText;
          if (navigator.clipboard) {
            navigator.clipboard.writeText(txt).then(() => {
              alert('Текст скопирован! Сейчас откроется Instagram — вставьте сообщение.');
              window.open(url, '_blank');
            });
          } else {
            window.open(url, '_blank');
          }
        });
      }
    }
  });

  // Соцсети
  // Соцсети: если число подписчиков не указано, показываем @ник
  const heroSoc = document.getElementById('heroSocials');
  const footerSoc = document.getElementById('footerSocials');
  const fmtK = n => n >= 1000 ? (n / 1000).toFixed(1).replace('.0', '') + 'K' : String(n);
  const socHTML = Object.entries(d.social).map(([key, s]) =>
    `<a href="${s.url}" target="_blank" rel="noopener" class="social-link" aria-label="${key}">
      ${getSocialIcon(key)}<b>${s.followers ? fmtK(s.followers) : s.handle}</b>
    </a>`).join('');
  if (heroSoc) heroSoc.innerHTML = socHTML;
  if (footerSoc) footerSoc.innerHTML = socHTML;

  // Год
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Ссылка на автора
  const devLink = document.getElementById('devLink');
  if (devLink) {
    devLink.textContent = 'ваше имя';
    devLink.href = 'https://t.me/yourusername'; // замени
  }
}

function getSocialIcon(platform) {
  const icons = {
    instagram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>',
    telegram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/></svg>'
  };
  const svg = icons[platform] || '';
  return `<span data-icon="${platform}">${svg}</span>`;
}

/* ---------- Ротатор цитат: автосмена, прогресс-бар, счётчик ---------- */
function initQuotes() {
  const rotator = document.getElementById('quoteRotator');
  const dots = document.getElementById('quoteDots');
  if (!rotator || !dots || !d.quotes || !d.quotes.length) return;
  const quotes = window.I18N && window.I18N.current === 'en' && d.quotesEn ? d.quotesEn : d.quotes;
  const counter = document.getElementById('quoteCounter');
  const DELAY = 6000; // совпадает с длительностью прогресс-бара в CSS
  let idx = 0, timer = null;

  dots.innerHTML = quotes.map((_, i) => `<button type="button" aria-label="Цитата ${i + 1}"><i></i></button>`).join('');
  const btns = [...dots.querySelectorAll('button')];

  function show(i, animate) {
    idx = (i + quotes.length) % quotes.length;
    btns.forEach((b, k) => b.classList.toggle('active', k === idx));
    if (counter) counter.textContent = String(idx + 1).padStart(2, '0') + ' / ' + String(quotes.length).padStart(2, '0');
    if (!animate) { rotator.textContent = quotes[idx]; return; }
    rotator.classList.add('swap');
    setTimeout(() => { rotator.textContent = quotes[idx]; rotator.classList.remove('swap'); }, 450);
  }
  function restart() {
    clearInterval(timer);
    timer = setInterval(() => show(idx + 1, true), DELAY);
  }
  btns.forEach((b, i) => b.addEventListener('click', () => {
    if (i === idx) return;
    show(i, true);
    restart();
  }));
  show(0, false);
  restart();
}

/* ---------- Reveal при скролле ---------- */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

  els.forEach(el => obs.observe(el));
}

/* ---------- Tilt (3D наклон карточек) ---------- */
function initTilt() {
  if (isMobile) return;
  document.querySelectorAll('[data-tilt]').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(el, {
        rotateY: x * 10,
        rotateX: -y * 10,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power2.out' });
    });
  });
}

/* ---------- Magnetic (лёгкое притяжение, максимум 6px) ---------- */
function initMagnetic() {
  if (isMobile) return;
  const MAX = 6; // сдвиг в пикселях, больше не ставь — кнопки начнут наезжать
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      gsap.to(btn, { x: x * MAX, y: y * MAX, duration: 0.4, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' });
    });
  });
}

/* ---------- Three.js фон (главная) ---------- */
function init3D() {
  const canvas = document.getElementById('webgl-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const geometry = new THREE.IcosahedronGeometry(1, 4);
  const material = new THREE.MeshStandardMaterial({
    color: 0xE9A568,
    wireframe: true,
    emissive: 0xB9783F,
    emissiveIntensity: 0.2
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const light = new THREE.PointLight(0xffffff, 1, 100);
  light.position.set(10, 10, 10);
  scene.add(light);

  const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
  scene.add(ambientLight);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = -(e.clientY / window.innerHeight - 0.5) * 2;
    gsap.to(mesh.rotation, { x: y * 0.3, y: x * 0.3, duration: 1.5 });
  });

  function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.z += 0.002;
    renderer.render(scene, camera);
  }
  animate();
}

/* ---------- Fallback для картинок ---------- */
function initImageFallback() {
  document.querySelectorAll('img[data-fallback]').forEach(img => {
    img.addEventListener('error', () => {
      const parent = img.closest('.portrait, .portfolio-image');
      if (parent) parent.classList.add('no-img');
    });
  });
}

/* ---------- Аналитика (замокал) ---------- */
/* ---------- Аналитика: клики по кнопкам с data-track → цели Метрики ---------- */
function track(event) {
  if (typeof ym === 'function' && d.metrikaId) ym(d.metrikaId, 'reachGoal', event);
}

document.querySelectorAll('[data-track]').forEach(el => {
  el.addEventListener('click', () => {
    track(el.getAttribute('data-track'));
  });
});

/* ---------- Иконки SVG ---------- */
const ICONS = {
  arrow: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
  telegram: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>'
};

document.querySelectorAll('[data-icon]').forEach(el => {
  const key = el.getAttribute('data-icon');
  if (ICONS[key] && !el.innerHTML.trim()) {
    el.innerHTML = ICONS[key];
  }
});

/* ---------- Инициализация ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNav();
  fillData();
  initQuotes();
  initReveal();
  initTilt();
  initMagnetic();
  initImageFallback();
});
 /* ---------- Переключатель языков ---------- */
if (window.I18N) {
  const syncLang = () => document.querySelectorAll('.lang-btn')
    .forEach(b => b.classList.toggle('active', b.dataset.lang === window.I18N.current));
  document.querySelectorAll('.lang-btn').forEach(btn =>
    btn.addEventListener('click', () => { window.I18N.setLang(btn.dataset.lang); syncLang(); }));
  document.addEventListener('DOMContentLoaded', syncLang);
  syncLang();
}

})();