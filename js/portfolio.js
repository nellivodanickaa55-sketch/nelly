/* ================================================================
   js/portfolio.js — фильтры и окно проекта
   ================================================================ */
(function(){
'use strict';

/* ЗАМЕНИ на реальные проекты. В results указывай только настоящие цифры:
   бренды часто просят скрин статистики. Пустой results — блок не покажется. */
const PROJECTS = {
  1: { tag:'Fashion', title:'Модная редакция', img:'images/portfolio/01.jpg',
       text:'Редакционная съёмка в концепции «Modern Elegance»: минимализм, мягкий свет, акцент на силуэт.',
       meta:{ 'Клиент':'Журнал (пример)', 'Год':'2025', 'Роль':'Модель', 'Формат':'Фото' }, results:[] },
  2: { tag:'Коммерция', title:'Рекламная кампания', img:'images/portfolio/02.jpg',
       text:'UGC-контент к запуску новой коллекции: Reels, Stories и фото для карточек товара.',
       meta:{ 'Клиент':'Бренд одежды (пример)', 'Год':'2025', 'Роль':'Модель, креатор', 'Формат':'UGC, Reels' },
       results:[['+250%','охват'],['12.5%','ER']] },
  3: { tag:'Beauty', title:'Beauty кампания', img:'images/portfolio/03.jpg',
       text:'Контент для линии уходовой косметики: крупные планы, текстуры, ритуал ухода.',
       meta:{ 'Клиент':'Косметический бренд (пример)', 'Год':'2025', 'Роль':'Модель', 'Формат':'Фото, видео' }, results:[] },
  4: { tag:'Lifestyle', title:'Travel серия', img:'images/portfolio/04.jpg',
       text:'Коллаборация с отелем: серия публикаций и фото для сайта и соцсетей отеля.',
       meta:{ 'Клиент':'Отель (пример)', 'Год':'2024', 'Роль':'Креатор', 'Формат':'Пост, Stories' }, results:[] },
  5: { tag:'Fashion', title:'Модный портрет', img:'images/portfolio/05.jpg',
       text:'Персональная съёмка для лукбука: студийный свет, монохромная палитра.',
       meta:{ 'Клиент':'Лукбук (пример)', 'Год':'2024', 'Роль':'Модель', 'Формат':'Фото' }, results:[] },
  6: { tag:'Beauty', title:'Skincare амбассадор', img:'images/portfolio/06.jpg',
       text:'Долгосрочное сотрудничество с брендом натуральной косметики: регулярный контент и обзоры.',
       meta:{ 'Клиент':'Skincare-бренд (пример)', 'Год':'2025', 'Роль':'Амбассадор', 'Формат':'Контракт' },
       results:[['3 мес.','контракт']] }
};

const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const grid = document.getElementById('portfolioGrid');
if (!grid) return;
const items = [...grid.querySelectorAll('.portfolio-item')];

// 3D-наклон карточек: main.js подхватит атрибут при загрузке страницы
items.forEach(it => it.setAttribute('data-tilt', ''));

/* ---------- Фильтры ---------- */
const buttons = [...document.querySelectorAll('.filter-btn')];
buttons.forEach(btn => {
  btn.setAttribute('aria-pressed', btn.classList.contains('active'));
  btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    buttons.forEach(b => {
      const on = b === btn;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on);
    });
    let n = 0;
    items.forEach(it => {
      const show = f === '*' || it.dataset.category === f;
      it.classList.toggle('is-hidden', !show);
      it.classList.remove('is-entering');
      if (show) {
        void it.offsetWidth; // перезапуск анимации
        it.style.animationDelay = (n++ * 0.07) + 's';
        it.classList.add('is-entering');
      }
    });
  });
});

/* ---------- Окно проекта ---------- */
const modal = document.createElement('div');
modal.className = 'modal';
modal.setAttribute('role', 'dialog');
modal.setAttribute('aria-modal', 'true');
modal.setAttribute('aria-labelledby', 'modalTitle');
modal.innerHTML = `
  <div class="modal-backdrop" data-close></div>
  <div class="modal-dialog">
    <button class="modal-close" data-close aria-label="Закрыть">×</button>
    <div class="modal-media"><img id="modalImg" alt=""></div>
    <div class="modal-body">
      <span class="section-tag" id="modalTag"></span>
      <h2 class="modal-title" id="modalTitle"></h2>
      <p class="modal-text" id="modalText"></p>
      <dl class="modal-meta" id="modalMeta"></dl>
      <div class="modal-results" id="modalResults"></div>
      <div class="modal-nav">
        <button type="button" data-step="-1">← Предыдущий</button>
        <button type="button" data-step="1">Следующий →</button>
      </div>
      <a href="contact.html" class="btn btn-primary" data-track="portfolio_modal_cta">Хочу похожий проект</a>
    </div>
  </div>`;
document.body.appendChild(modal);

const $ = s => modal.querySelector(s);
let current = null, lastFocus = null;

function visibleIds() {
  return items
    .filter(it => !it.classList.contains('is-hidden'))
    .map(it => it.querySelector('[data-modal]')?.dataset.modal)
    .filter(Boolean);
}
// Берём фото из карточки в сетке, чтобы окно и сетка всегда совпадали
function gridImg(id) {
  const btn = grid.querySelector(`[data-modal="${id}"]`);
  const pic = btn && btn.closest('.portfolio-item') && btn.closest('.portfolio-item').querySelector('img');
  return pic ? (pic.currentSrc || pic.src) : '';
}
function render(id) {
  const p = PROJECTS[id];
  if (!p) return;
  current = id;
  const media = $('.modal-media');
  const img = $('#modalImg');
  media.classList.remove('no-img');
  img.onerror = () => media.classList.add('no-img');
  img.src = gridImg(id) || p.img;
  img.alt = p.title;
  $('#modalTag').textContent = p.tag;
  $('#modalTitle').textContent = p.title;
  $('#modalText').textContent = p.text;
  $('#modalMeta').innerHTML = Object.entries(p.meta || {})
    .map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');
  const res = $('#modalResults');
  const list = p.results || [];
  res.innerHTML = list.map(([v, l]) => `<div class="result-badge"><strong>${esc(v)}</strong>${esc(l)}</div>`).join('');
  res.hidden = !list.length;
}

function open(id) {
  lastFocus = document.activeElement;
  render(id);
  modal.classList.add('open');
  document.body.classList.add('modal-lock');
  $('.modal-close').focus();
}

function close() {
  modal.classList.remove('open');
  document.body.classList.remove('modal-lock');
  if (lastFocus) lastFocus.focus();
}

function step(dir) {
  const ids = visibleIds();
  const i = ids.indexOf(current);
  if (i < 0) return;
  render(ids[(i + dir + ids.length) % ids.length]);
}

// Клик по любой части карточки открывает проект (удобно на телефоне)
grid.addEventListener('click', e => {
  const btn = e.target.closest('.portfolio-item')?.querySelector('[data-modal]');
  if (btn) open(btn.dataset.modal);
});

modal.addEventListener('click', e => {
  if (e.target.closest('[data-close]')) close();
  const s = e.target.closest('[data-step]');
  if (s) step(+s.dataset.step);
});

document.addEventListener('keydown', e => {
  if (!modal.classList.contains('open')) return;
  if (e.key === 'Escape') close();
  if (e.key === 'ArrowRight') step(1);
  if (e.key === 'ArrowLeft') step(-1);
});

})();