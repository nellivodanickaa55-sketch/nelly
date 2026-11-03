/* ================================================================
   js/stats.js — графики строятся из js/data.js
   ================================================================ */
(function(){
'use strict';
const d = window.MODEL_DATA;
const ins = d && d.insights;
if (!ins) { console.error('stats.js: нет данных insights в js/data.js'); return; }

const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmtK = n => n >= 1000 ? Math.round(n / 1000) + 'K' : String(n);
const pct = n => String(n).replace('.', ',') + '%';

// Горизонтальные бары: ширина от максимума, подпись — реальное значение
function bars(id, rows, show) {
  const el = document.getElementById(id);
  if (!el || !rows || !rows.length) return;
  const max = Math.max(...rows.map(r => r.value)) || 1;
  el.innerHTML = rows.map(r => `
    <div class="hbar">
      <span class="hbar-label">${esc(r.label)}</span>
      <div class="hbar-track"><div class="hbar-fill" style="--w:${(r.value / max * 100).toFixed(1)}%"></div></div>
      <span class="hbar-val">${show(r.value)}</span>
    </div>`).join('');
}

bars('typeBars',    (ins.byType || []).map(([label, value]) => ({ label, value })), fmtK);
bars('ageBars',     (ins.age || []).map(([label, value]) => ({ label, value })), pct);
bars('countryBars', (ins.countries || []).map(([flag, name, value]) => ({ label: flag + ' ' + name, value })), pct);
bars('langBars',    (ins.languages || []).map(([label, value]) => ({ label, value })), pct);

const split = document.getElementById('splitA');
if (split) split.style.setProperty('--w', ins.followersPct + '%');

const donut = document.getElementById('genderDonut');
if (donut && ins.gender) donut.style.setProperty('--target', ins.gender.men);

const fit = document.getElementById('fitGrid');
if (fit) {
  const lang = window.I18N && window.I18N.current === 'en' ? 'en' : 'ru';
  const data = lang === 'en' && d.audienceFitEn ? d.audienceFitEn : d.audienceFit;
  if (data && data.length) {
    fit.innerHTML = data.map(([icon, title, text]) => `
      <article class="fit-card">
        <div class="fit-icon" aria-hidden="true">${icon}</div>
        <h3>${esc(title)}</h3><p>${esc(text)}</p>
      </article>`).join('');
  }
}

// Анимация заполнения, когда панель появилась на экране
const obs = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
}), { threshold: 0.3 });
document.querySelectorAll('.panel').forEach(p => obs.observe(p));
})();