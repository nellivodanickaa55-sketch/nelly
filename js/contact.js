/* ================================================================
   js/contact.js — бриф уходит в личные сообщения Telegram
   ================================================================ */
(function(){
'use strict';
const d = window.MODEL_DATA;

const LABELS = {
  projectType: { integration:'Рекламная интеграция', ugc:'UGC контент', photoshoot:'Съёмка для каталога',
                 ambassador:'Амбассадорство', event:'Участие в мероприятии', other:'Другое' },
  budget: { under50k:'До 50 000 ₽', '50k-100k':'50 000 – 100 000 ₽', '100k-200k':'100 000 – 200 000 ₽',
            '200k+':'От 200 000 ₽', discuss:'Обсудим индивидуально' },
  referral: { instagram:'Instagram', tiktok:'TikTok', telegram:'Telegram',
              recommendation:'Рекомендация', search:'Поиск', other:'Другое' }
};
const label = (k, v) => (LABELS[k] && LABELS[k][v]) || v;

// Email-кнопка
const emailLink = document.getElementById('emailLink');
if (emailLink && d.contact.email) {
  emailLink.href = 'mailto:' + d.contact.email + '?subject=' + encodeURIComponent('Предложение о сотрудничестве');
}

const form = document.getElementById('briefForm');
const ok = document.getElementById('formSuccess');
if (!form) return;

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!form.reportValidity()) return; // браузер сам подсветит пустые обязательные поля

  const f = Object.fromEntries(new FormData(form));
  const lines = [
    'Здравствуйте, Нелли! Отправляю бриф с вашего сайта.', '',
    '🏷 Бренд: ' + f.brandName,
    '👤 Контакт: ' + f.contactPerson,
    f.email ? '✉️ Email: ' + f.email : null,
    f.telegram ? '💬 Telegram: ' + f.telegram : null,
    '📌 Формат: ' + label('projectType', f.projectType),
    f.budget ? '💰 Бюджет: ' + label('budget', f.budget) : null,
    f.deadline ? '⏱ Сроки: ' + f.deadline : null,
    f.referral ? '🔎 Откуда узнали: ' + label('referral', f.referral) : null,
    '', '📝 Задача:', f.description.trim().slice(0, 2500)
  ].filter(l => l !== null);
  const msg = lines.join('\n');

  // Копия в буфер — на случай, если Telegram не подставит текст
  if (navigator.clipboard) navigator.clipboard.writeText(msg).catch(() => {});

  const url = 'https://t.me/' + d.contact.tgUser + '?text=' + encodeURIComponent(msg);
  const win = window.open(url, '_blank');
  if (win) win.opener = null; else location.href = url; // если браузер заблокировал вкладку

  if (typeof gtag !== 'undefined') gtag('event', 'brief_to_telegram', { project_type: f.projectType });
  form.hidden = true;
  ok.hidden = false;
  ok.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
})();