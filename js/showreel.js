/* ================================================================
   js/showreel.js — превью без звука, полный просмотр со звуком.
   Если видео не открылось — слайдшоу из фото и причина в консоли.
   ================================================================ */
(function(){
'use strict';
const reel = document.getElementById('reel');
if (!reel) return;

const video = document.getElementById('reelPreview');
const playBtn = document.getElementById('reelPlay');
const timeEl = document.getElementById('reelTime');
const source = video.querySelector('source');
const SRC = (source && source.getAttribute('src')) || video.getAttribute('src') || 'images/showreel.mp4';
const FULL_URL = new URL(SRC, location.href).href;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const SLIDES = ['images/hero.jpg', 'images/portfolio/01.jpg', 'images/portfolio/02.jpg',
                'images/portfolio/03.jpg', 'images/portfolio/04.jpg', 'images/portfolio/05.jpg'];
let hasVideo = true;

/* ---------- Почему видео не открылось: понятный текст по коду ошибки ---------- */
function reason(code) {
  if (code === 2) return 'загрузка оборвалась (сеть или неполный файл).';
  if (code === 3) return 'файл повреждён или кодек не поддерживается. Перекодируй в H.264.';
  if (code === 4) return 'файла нет по этому адресу ИЛИ формат не поддерживается (часто HEVC/H.265).';
  return 'неизвестная ошибка.';
}

/* ---------- Запасной режим: слайдшоу с эффектом Кена Бёрнса ---------- */
function fallback(text) {
  if (!hasVideo) return;
  hasVideo = false;
  console.warn('[Шоурил] Видео не запустилось: ' + text + '\nАдрес файла: ' + FULL_URL);

  // На сервере уточняем: файла нет или он есть, но не играет
  if (/^https?:/.test(location.protocol)) {
    fetch(SRC, { method: 'HEAD' }).then(r => console.warn('[Шоурил] Ответ сервера: ' + r.status +
      (r.ok ? '. Файл на месте, значит дело в кодеке: перекодируй в H.264.' : '. Файла нет по этому адресу: проверь папку и имя.')))
      .catch(() => {});
  }

  reel.classList.add('no-video');
  video.remove();
  const box = document.getElementById('reelSlides');
  SLIDES.forEach(src => {
    const img = new Image();
    img.src = src; img.alt = '';
    img.onerror = () => img.remove();
    box.appendChild(img);
  });
  let i = 0;
  const tick = () => {
    const imgs = box.querySelectorAll('img');
    if (!imgs.length) return;
    imgs.forEach(im => im.classList.remove('active'));
    imgs[i % imgs.length].classList.add('active');
    i++;
  };
  setTimeout(tick, 100);
  if (!reduce) setInterval(tick, 4000);
}

/* ---------- Подключаем видео сами: сначала обработчики, потом файл ---------- */
if (source) source.remove();
video.addEventListener('error', () => fallback(reason(video.error ? video.error.code : 0)));
video.addEventListener('loadeddata', () => console.info('[Шоурил] Видео загружено: ' + FULL_URL), { once: true });
video.src = SRC;
video.load();

/* ---------- Превью играет только когда видно на экране ---------- */
if (!reduce) {
  new IntersectionObserver(([e]) => {
    if (!hasVideo) return;
    e.isIntersecting ? video.play().catch(() => {}) : video.pause();
  }, { threshold: 0.35 }).observe(reel);
}
video.addEventListener('timeupdate', () => {
  const s = Math.floor(video.currentTime);
  timeEl.textContent = String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
});

/* ---------- Полный просмотр со звуком ---------- */
const modal = document.createElement('div');
modal.className = 'reel-modal';
modal.setAttribute('role', 'dialog');
modal.setAttribute('aria-modal', 'true');
modal.setAttribute('aria-label', 'Шоурил');
modal.innerHTML = '<button class="reel-modal-close" aria-label="Закрыть">×</button>' +
  '<video controls playsinline preload="none"></video>';
document.body.appendChild(modal);
const full = modal.querySelector('video');

function open() {
  if (!hasVideo) return;
  if (!full.src) full.src = SRC;
  video.pause();
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  full.currentTime = 0;
  full.play().catch(() => {});
  modal.querySelector('.reel-modal-close').focus();
  const d = window.MODEL_DATA;
  if (typeof ym === 'function' && d && d.metrikaId) ym(d.metrikaId, 'reachGoal', 'showreel_play');
}
function close() {
  full.pause();
  modal.classList.remove('open');
  document.body.style.overflow = '';
  playBtn.focus();
}
playBtn.addEventListener('click', open);
modal.addEventListener('click', e => { if (e.target === modal || e.target.closest('.reel-modal-close')) close(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });
})();