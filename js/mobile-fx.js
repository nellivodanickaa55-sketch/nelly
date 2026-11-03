/* ================================================================
   js/mobile-fx.js — эффекты для телефонов и планшетов
   Работает только на сенсорных экранах, на компьютере не запускается.
   ================================================================ */
(function(){
'use strict';
const touch = matchMedia('(hover: none)').matches;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!touch || reduce) return; // уважаем настройку «уменьшить движение»

/* ---------- 1. Отклик на касание ---------- */
const PRESS = '.btn, .feature-card, .fit-card, .portfolio-item, .contact-card, .kpi, .filter-btn';
document.addEventListener('touchstart', e => {
  const el = e.target.closest(PRESS);
  if (el) el.classList.add('is-pressed');
}, { passive: true });
['touchend', 'touchcancel'].forEach(type =>
  document.addEventListener(type, () =>
    document.querySelectorAll('.is-pressed').forEach(el => el.classList.remove('is-pressed')),
  { passive: true }));



function onOrient(e) {
  if (e.beta == null || e.gamma == null) return;
  gx = Math.max(-1, Math.min(1, e.gamma / 30));        // наклон влево-вправо
  gy = Math.max(-1, Math.min(1, (e.beta - 45) / 30));  // 45° — обычный угол, под которым держат телефон
  if (!raf) raf = requestAnimationFrame(applyTilt);
}
function applyTilt() {
  raf = null;
  const vh = innerHeight;
  tiltEls.forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > vh) return; // двигаем только то, что на экране
    el.style.transform = `perspective(900px) rotateY(${(gx * 6).toFixed(2)}deg) rotateX(${(-gy * 6).toFixed(2)}deg)`;
  });
}
function startGyro() { addEventListener('deviceorientation', onOrient, { passive: true }); }

if (tiltEls.length) {
  const needsPermission = typeof DeviceOrientationEvent !== 'undefined' &&
                          typeof DeviceOrientationEvent.requestPermission === 'function';
  if (needsPermission) {
    // iPhone спрашивает разрешение, и только после касания экрана
    addEventListener('touchend', function ask() {
      removeEventListener('touchend', ask);
      DeviceOrientationEvent.requestPermission()
        .then(state => { if (state === 'granted') startGyro(); })
        .catch(() => {});
    });
  } else {
    startGyro(); // Android — без запроса
  }
}

/* ---------- 3. Параллакс фото в портфолио ---------- */
const imgs = [...document.querySelectorAll('.portfolio-image img')];
let ticking = false;
function parallax() {
  ticking = false;
  const vh = innerHeight;
  imgs.forEach(img => {
    const r = img.parentNode.getBoundingClientRect();
    if (r.bottom < 0 || r.top > vh) return;
    const p = (r.top + r.height / 2 - vh / 2) / vh; // от -1 до 1
    // scale(1.12) — запас, чтобы при сдвиге не появлялись пустые края
    img.style.transform = `scale(1.12) translateY(${(p * -5).toFixed(2)}%)`;
  });
}
if (imgs.length) {
  addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(parallax); }
  }, { passive: true });
  parallax();
}
})();