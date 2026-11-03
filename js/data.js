/* ================================================================
   js/data.js — реальные данные Нелли
   ================================================================ */
window.MODEL_DATA = {
  name: "Нелли",
  isDemoData: false,
  metrikaId: 12345678,

  social: {
    instagram: { 
      handle: "@Nelly_Vod", 
      url: "https://www.instagram.com/nelly_vod",
      followers: 17500 
    },
    tiktok: { 
      handle: "@Nelly_Vod", 
      url: "https://www.tiktok.com/@nelly_vod",
      followers: 10000
    },
    telegram: { 
      handle: "@Nelly_Vod", 
      url: "https://t.me/Nelly_Vod",
      followers: 1300
    }
  },

  insights: {
    period: "16 сентября — 15 октября",
    views: 429510,
    viewers: 162236,
    interactions: 20092,
    followersPct: 19.5,
    nonFollowersPct: 80.5,
    get engagementPct() { return +(this.interactions / this.views * 100).toFixed(1); },
    byType: [["Reels", 266000], ["Stories", 99000], ["Публикации", 64000]],
    gender: { men: 67.3, women: 32.7 },
    age: [["13–17", 1.8], ["18–24", 33.8], ["25–34", 42.8], ["35–44", 14.2], ["45–54", 4.5], ["55–64", 1.8], ["65+", 1.1]],
    countries: [["🇷🇺", "Россия", 19.1], ["🇮🇳", "Индия", 7.4], ["🇹🇷", "Турция", 6.6], ["🇺🇸", "США", 5.4], ["🇮🇶", "Ирак", 4.0]],
    languages: [["Английский", 25.1], ["Русский", 23.9], ["Арабский", 15.8], ["Испанский", 8.5], ["Турецкий", 6.1]]
  },

 audienceFit: [
    ["⌚", "Мужские бренды", "Одежда, часы, парфюм, аксессуары. 67% аудитории — мужчины 25–34 с покупательской силой."],
    ["💍", "Подарки для неё", "Ювелирка, цветы, косметика в подарок: мужская аудитория, которая покупает для женщин."],
    ["🌍", "Международные бренды", "Зрители говорят на английском, русском и арабском. Один пост работает на несколько рынков."],
    ["✈️", "Travel и сервисы", "Отели, авиа, приложения, гаджеты, авто. Reels приводят 80% новых зрителей."]
  ],

  audienceFitEn: [
    ["⌚", "Men's brands", "Clothing, watches, perfume, accessories. 67% of the audience are men 25–34 with purchasing power."],
    ["💍", "Gifts for her", "Jewelry, flowers, cosmetics as gifts: male audience buying for women."],
    ["🌍", "International brands", "Viewers speak English, Russian, and Arabic. One post works across multiple markets."],
    ["✈️", "Travel and services", "Hotels, airlines, apps, gadgets, cars. Reels bring 80% new viewers."]
  ],

  contact: {
    tgUser: "Nelly_Vod",
    get tgDm() {
      return "https://t.me/" + this.tgUser + "?text=" +
        encodeURIComponent("Здравствуйте, Нелли! Пишу с вашего сайта по поводу сотрудничества.");
    },
    instaDm: "https://ig.me/m/nelly_vod",
    instaDmText: "Здравствуйте, Нелли! Пишу с вашего сайта по поводу сотрудничества.",
email: "nellivodanickaa55@gmail.com"
  },

 quotes: [
    "Аутентичность продаёт лучше любой рекламы.",
    "Восемь из десяти зрителей — новые люди. Ваш бренд увидят те, кто о нём ещё не знает.",
    "Бренды приходят за красивой картинкой, а остаются за результатом.",
    "Доверие аудитории нельзя купить, его можно только заработать."
  ],

  quotesEn: [
    "Authenticity sells better than any ad.",
    "Eight out of ten viewers are new people. Your brand will be seen by those who don't know about it yet.",
    "Brands come for beautiful visuals, stay for results.",
    "Trust can't be bought, only earned."
  ],
};
