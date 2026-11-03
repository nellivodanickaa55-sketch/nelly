/* ================================================================
   js/i18n.js — переводы русский/английский
   ================================================================ */
window.I18N = {
  current: 'ru',
  
  strings: {
    ru: {
      // Nav
      nav_home: 'Главная',
      nav_stats: 'Статистика',
      nav_portfolio: 'Портфолио',
      nav_about: 'Обо мне',
      nav_collab: 'Сотрудничество',
      
      // Hero (главная)
      hero_available: 'Открыта для коллабораций',
      hero_title_1: 'Превращаю',
      hero_title_2: 'внимание',
      hero_title_3: 'в продажи',
      hero_desc: 'Модель и контент-креатор. Создаю нативный контент для брендов — такой, которому верят.',
      hero_btn_stats: 'Смотреть статистику',
      hero_btn_contact: 'Обсудить проект',
      hero_stat_views: 'просмотров / мес',
      hero_stat_interactions: 'взаимодействий',
      hero_stat_new: 'новых зрителей',
      hero_badge_viewers: 'зрителей за месяц',
      
      // Marquee
      marquee_fashion: 'Fashion',
      marquee_beauty: 'Beauty',
      marquee_lifestyle: 'Lifestyle',
      marquee_ugc: 'UGC',
      marquee_reels: 'Reels',
      marquee_shoots: 'Съёмки',
      
      // Manifest (цитаты)
      manifest_tag: 'Философия',
      
      // Features
      features_tag: 'Почему я',
      features_title: 'Контент, который',
      features_title_highlight: 'работает',
      features_subtitle: 'Бренды приходят за красивой картинкой, а остаются за результатом.',
      
      feature1_title: 'Живая аудитория',
      feature1_desc: 'Подписчики, которые комментируют, сохраняют и покупают по рекомендациям. Статистика открыта.',
      feature1_tag: 'Без накруток',
      
      feature2_title: 'Съёмка под ключ',
      feature2_desc: 'Идея, образ, локация, свет и монтаж. Вы получаете готовый контент, а не просто публикацию.',
      feature2_tag: 'Фото + видео',
      
      feature3_title: 'Нативная подача',
      feature3_desc: 'Продукт встраивается в ленту естественно, поэтому реклама не выглядит рекламой.',
      feature3_tag: 'Доверие',
      
      feature4_title: 'Отчёт в цифрах',
      feature4_desc: 'После публикации — статистика: охваты, просмотры, переходы, сохранения.',
      feature4_tag: 'Прозрачно',
      
      // Process
      process_tag: 'Как мы работаем',
      process_title: 'Четыре шага до',
      process_title_highlight: 'результата',
      
      step1_num: '01',
      step1_title: 'Бриф',
      step1_desc: 'Вы рассказываете о продукте, задаче и сроках. Две минуты в форме на сайте.',
      
      step2_num: '02',
      step2_title: 'Концепция',
      step2_desc: 'Предлагаю идею, формат, образ и сценарий под вашу аудиторию.',
      
      step3_num: '03',
      step3_title: 'Съёмка',
      step3_desc: 'Снимаю, монтирую и согласовываю материал с вами до публикации.',
      
      step4_num: '04',
      step4_title: 'Публикация и отчёт',
      step4_desc: 'Выход контента по графику и подробная статистика по итогам.',
      
      // Showreel
      showreel_tag: 'Showreel',
      showreel_title: 'Минута, которая',
      showreel_title_highlight: 'говорит больше',
      showreel_title_end: 'резюме',
      showreel_soon: 'Шоурил в монтаже',
      
      // CTA общие
      cta_tag: 'Готовы начать?',
      cta_title: 'Создадим контент,<br>который',
      cta_title_highlight: 'запомнят',
      cta_text: 'Опишите задачу — отвечу в течение дня и предложу формат под ваш бюджет.',
      cta_btn_brief: 'Заполнить бриф',
      cta_btn_telegram: 'Написать в Telegram',
      
      cta_views: 'Просмотры за 30 дней',
      cta_new_viewers: 'новые зрители',
      
      // Footer
      footer_tagline: 'Модель · Контент-креатор',
      footer_rights: 'Все права защищены',
      
      // Stats page
      stats_tag: 'Instagram Insights',
      stats_title: 'Статистика',
      stats_title_highlight: 'без фильтров',
      stats_subtitle: 'Официальные данные Instagram за период',
      stats_verified: 'Скриншоты статистики — по запросу бренда',
      
      stats_kpi_views: 'Просмотры',
      stats_kpi_views_sub: 'за 30 дней',
      stats_kpi_viewers: 'Уникальные зрители',
      stats_kpi_viewers_sub: 'аккаунтов',
      stats_kpi_interactions: 'Взаимодействия',
      stats_kpi_interactions_sub: 'лайки, комментарии, сохранения',
      stats_kpi_engagement: 'Вовлечённость',
      stats_kpi_engagement_sub: 'от всех просмотров',
      
      stats_who_watches: 'Кто смотрит контент',
      stats_followers: 'Подписчики',
      stats_new_viewers: 'Новые зрители',
      stats_note_reach: '8 из 10 просмотров — люди, которые ещё не подписаны. Интеграция выходит далеко за пределы блога.',
      
      stats_by_format: 'Просмотры по форматам',
      stats_note_reels: 'Reels дают больше 60% просмотров — лучший формат для рекламы.',
      
      stats_gender: 'Пол',
      stats_men: 'Мужчины',
      stats_women: 'Женщины',
      
      stats_age: 'Возраст',
      stats_countries: 'Топ стран',
      stats_languages: 'Топ языков',
      
      stats_fit_tag: 'Для кого',
      stats_fit_title: 'Кому подходит',
      stats_fit_title_highlight: 'эта аудитория',
      
      stats_cta_title: 'Покажем ваш бренд<br>',
      stats_cta_title_highlight: 'новой аудитории',
      stats_cta_text: 'Расскажите о продукте — предложу формат и прогноз охвата.',
      
      // Contact page
      contact_title: 'Создадим контент<br>вместе',
      contact_subtitle: 'Расскажите о задаче — отвечу в течение 24 часов и предложу формат под ваш бюджет.',
      
      contact_telegram: 'Telegram',
      contact_telegram_desc: 'Самый быстрый способ. Отвечаю в течение нескольких часов.',
      contact_telegram_btn: 'Написать в Telegram',
      contact_telegram_perks: '⚡ Быстро 💬 Удобно',
      
      contact_instagram: 'Instagram Direct',
      contact_instagram_desc: 'Напишите в директ — также быстро отвечу.',
      contact_instagram_btn: 'Написать в Instagram',
      contact_instagram_perks: '📸 Портфолио',
      
      contact_email: 'Email',
      contact_email_desc: 'Для официальных предложений и детального обсуждения.',
      contact_email_btn: 'Написать Email',
      
      contact_brief_tag: 'Или заполните бриф',
      contact_brief_title: 'Расскажите о проекте',
      contact_brief_subtitle: 'Чем подробнее опишете задачу, тем точнее будет предложение. Все поля необязательные, но желательные.',
      
      form_brand: 'Название бренда',
      form_brand_placeholder: 'Например: Fashion House',
      form_name: 'Ваше имя',
      form_name_placeholder: 'Как к вам обращаться',
      form_email: 'Email',
      form_telegram: 'Telegram',
      form_telegram_placeholder: '@username',
      form_format: 'Формат сотрудничества',
      form_format_choose: 'Выберите формат',
      form_format_integration: 'Рекламная интеграция (пост + Stories)',
      form_format_ugc: 'UGC контент для ваших соцсетей',
      form_format_photoshoot: 'Съёмка для каталога/сайта',
      form_format_ambassador: 'Амбассадорство (долгосрочное)',
      form_format_event: 'Участие в мероприятии',
      form_format_other: 'Другое (опишу ниже)',
      form_description: 'Описание проекта',
      form_description_placeholder: 'Расскажите о продукте, задаче, целевой аудитории. Чем подробнее — тем лучше.',
      form_description_hint: 'Например: нужен контент для запуска новой коллекции одежды, ЦА — девушки 18-25 лет.',
      form_budget: 'Бюджет',
      form_budget_choose: 'Выберите диапазон',
      form_budget_under50k: 'До 50 000 ₽',
      form_budget_50k100k: '50 000 – 100 000 ₽',
      form_budget_100k200k: '100 000 – 200 000 ₽',
      form_budget_200k: 'От 200 000 ₽',
      form_budget_discuss: 'Обсудим индивидуально',
      form_deadline: 'Желаемые сроки',
      form_deadline_placeholder: 'Например: до конца месяца',
      form_referral: 'Как узнали обо мне?',
      form_referral_choose: 'Выберите вариант',
      form_referral_instagram: 'Instagram',
      form_referral_tiktok: 'TikTok',
      form_referral_telegram: 'Telegram',
      form_referral_recommendation: 'Рекомендация',
      form_referral_search: 'Поиск в интернете',
      form_referral_other: 'Другое',
      form_submit: 'Отправить бриф в Telegram',
      form_footer: 'Нажимая кнопку, вы соглашаетесь с обработкой данных. Отвечу в течение 24 часов.',
      
      form_success_title: 'Остался один шаг',
      form_success_text: 'Открылся Telegram с готовым сообщением. Нажмите «Отправить», и бриф у Нелли. Если текст не подставился, вставьте его в чат: он уже скопирован.',
      form_success_btn: 'Открыть Telegram ещё раз',
      
      faq_tag: 'FAQ',
      faq_title: 'Частые вопросы',
      
      // Portfolio
      portfolio_title: 'Избранные',
      portfolio_title_highlight: 'проекты',
      portfolio_subtitle: 'Коллаборации с брендами. Каждый проект — история, рассказанная визуально.',
      portfolio_all: 'Все работы',
      portfolio_fashion: 'Fashion',
      portfolio_beauty: 'Beauty',
      portfolio_lifestyle: 'Lifestyle',
      portfolio_commercial: 'Коммерция',
      portfolio_more_tag: 'Больше работ',
      portfolio_more_title: 'Полное портфолио<br>в',
      portfolio_more_title_highlight: 'Instagram',
      portfolio_more_btn: 'Смотреть в Instagram',
      
      // About
      about_tag: 'Обо мне',
      about_title: 'Привет, я',
      about_title_highlight: 'Нелли',
      about_lead: 'Модель и контент-креатор. Снимаю контент для брендов моды, красоты и lifestyle — такой, который хочется сохранить, а не пролистать.',
      about_text_1: 'Начинала с фотосессий для друзей и небольших шоурумов. Со временем поняла главное: людям интересна не реклама, а история. Поэтому каждый продукт я встраиваю в свою жизнь, а не просто держу в кадре.',
      about_text_2: 'Сегодня я сама продумываю концепцию, образ и сценарий, снимаю и монтирую. Бренд получает готовый контент и живую реакцию аудитории.',
      about_badge_exp: 'лет в кадре',
      
      compcard_tag: 'Композитка',
      compcard_title: 'Параметры',
      compcard_subtitle: 'Модельная карта для агентств, фотографов и кастингов. Можно сохранить в PDF.',
      compcard_save: 'Сохранить композитку в PDF',
      
      timeline_tag: 'Путь',
      timeline_title: 'От первых кадров до',
      timeline_title_highlight: 'брендов',
      
      values_tag: 'Ценности',
      values_title: 'На чём держится',
      values_title_highlight: 'работа',
      
      about_cta_tag: 'Познакомимся?',
      about_cta_title: 'Расскажите о бренде,<br>а я — о',
      about_cta_title_highlight: 'идее',
      about_cta_text: 'Отвечу в течение дня и предложу формат под вашу задачу.',
      about_cta_audience: 'Общая аудитория',
      about_cta_platforms: 'на',
      about_cta_platforms_end: 'площадках',
      timeline_tag: 'Путь',
      timeline_title: 'От первых кадров до',
      timeline_title_highlight: 'брендов',
      timeline_2020: '2020',
      timeline_2020_title: 'Первые съёмки',
      timeline_2020_text: 'Тест-съёмки с фотографами, поиск своего стиля и образа в кадре.',
      timeline_2022: '2022',
      timeline_2022_title: 'Запуск блога',
      timeline_2022_text: 'Instagram и TikTok: lifestyle, мода, закулисье съёмок.',
      timeline_2024: '2024',
      timeline_2024_title: 'Коммерческие проекты',
      timeline_2024_text: 'Первые интеграции и UGC-контент для брендов одежды и косметики.',
      timeline_now: 'Сейчас',
      timeline_now_title: 'Долгосрочные коллаборации',
      timeline_now_text: 'Амбассадорство, съёмки под ключ и контент с измеримым результатом.',
      
      values_tag: 'Ценности',
      values_title: 'На чём держится',
      values_title_highlight: 'работа',
      value1_title: 'Честность',
      value1_desc: 'Рекламирую только то, чем пользовалась бы сама. Поэтому аудитория верит рекомендациям.',
      value1_tag: 'Доверие',
      value2_title: 'Эстетика',
      value2_desc: 'Свет, цвет, композиция и образ продуманы заранее. Контент выглядит дорого, даже если снят на телефон.',
      value2_tag: 'Визуал',
      value3_title: 'Результат',
      value3_desc: 'Красивая картинка — это только начало. Важно, сколько людей увидели, сохранили и купили.',
      value3_tag: 'Цифры',
      
      compcard_tag: 'Композитка',
      compcard_title: 'Параметры',
      compcard_subtitle: 'Модельная карта для агентств, фотографов и кастингов. Можно сохранить в PDF.',
      compcard_save: 'Сохранить композитку в PDF',
      compcard_height: 'Рост',
      compcard_bust: 'Грудь',
      compcard_waist: 'Талия',
      compcard_hips: 'Бёдра',
      compcard_size: 'Размер',
      compcard_shoes: 'Обувь',
      compcard_hair: 'Волосы',
      compcard_eyes: 'Глаза',
      compcard_location: 'Model & Content Creator · Москва'
    },

en: {
      nav_home: 'Home',
      nav_stats: 'Statistics',
      nav_portfolio: 'Portfolio',
      nav_about: 'About',
      nav_collab: 'Collaboration',
      
      hero_available: 'Available for collaborations',
      hero_title_1: 'Turning',
      hero_title_2: 'attention',
      hero_title_3: 'into sales',
      hero_desc: 'Model and content creator. I create native content for brands that people actually trust.',
      hero_btn_stats: 'View statistics',
      hero_btn_contact: 'Discuss project',
      hero_stat_views: 'views / month',
      hero_stat_interactions: 'interactions',
      hero_stat_new: 'new viewers',
      hero_badge_viewers: 'viewers per month',
      
      marquee_fashion: 'Fashion',
      marquee_beauty: 'Beauty',
      marquee_lifestyle: 'Lifestyle',
      marquee_ugc: 'UGC',
      marquee_reels: 'Reels',
      marquee_shoots: 'Shoots',
      
      manifest_tag: 'Philosophy',
      
      features_tag: 'Why me',
      features_title: 'Content that',
      features_title_highlight: 'works',
      features_subtitle: 'Brands come for beautiful visuals, stay for results.',
      
      feature1_title: 'Real audience',
      feature1_desc: 'Followers who comment, save, and buy based on recommendations. Stats are open.',
      feature1_tag: 'No bots',
      
      feature2_title: 'Full production',
      feature2_desc: 'Concept, styling, location, lighting, and editing. You get ready content, not just a post.',
      feature2_tag: 'Photo + video',
      
      feature3_title: 'Native integration',
      feature3_desc: 'The product fits naturally into the feed, so ads do not look like ads.',
      feature3_tag: 'Trust',
      
      feature4_title: 'Data-driven reports',
      feature4_desc: 'After publishing: reach, views, clicks, saves.',
      feature4_tag: 'Transparent',
      
      process_tag: 'How we work',
      process_title: 'Four steps to',
      process_title_highlight: 'results',
      
      step1_num: '01',
      step1_title: 'Brief',
      step1_desc: 'You describe the product, task, and timeline. Two minutes in the form on the site.',
      
      step2_num: '02',
      step2_title: 'Concept',
      step2_desc: 'I suggest an idea, format, styling, and scenario tailored to your audience.',
      
      step3_num: '03',
      step3_title: 'Production',
      step3_desc: 'I shoot, edit, and coordinate the material with you before publishing.',
      
      step4_num: '04',
      step4_title: 'Publishing and report',
      step4_desc: 'Content goes live on schedule with detailed performance statistics.',
      
      showreel_tag: 'Showreel',
      showreel_title: 'One minute that says',
      showreel_title_highlight: 'more',
      showreel_title_end: 'than a resume',
      showreel_soon: 'Showreel in production',
      
      cta_tag: 'Ready to start?',
      cta_title: 'Let us create content<br>they will',
      cta_title_highlight: 'remember',
      cta_text: 'Describe your task. I will respond within a day and suggest a format within your budget.',
      cta_btn_brief: 'Submit brief',
      cta_btn_telegram: 'Message on Telegram',
      cta_views: 'Views in 30 days',
      cta_new_viewers: 'new viewers',
      
      footer_tagline: 'Model · Content Creator',
      footer_rights: 'All rights reserved',
      
      stats_tag: 'Instagram Insights',
      stats_title: 'Statistics',
      stats_title_highlight: 'unfiltered',
      stats_subtitle: 'Official Instagram data for period',
      stats_verified: 'Screenshot of statistics upon request',
      
      stats_kpi_views: 'Views',
      stats_kpi_views_sub: 'in 30 days',
      stats_kpi_viewers: 'Unique viewers',
      stats_kpi_viewers_sub: 'accounts',
      stats_kpi_interactions: 'Interactions',
      stats_kpi_interactions_sub: 'likes, comments, saves',
      stats_kpi_engagement: 'Engagement',
      stats_kpi_engagement_sub: 'of all views',
      
      stats_who_watches: 'Who watches content',
      stats_followers: 'Followers',
      stats_new_viewers: 'New viewers',
      stats_note_reach: '8 out of 10 views are from non-followers. The integration reaches far beyond the blog.',
      
      stats_by_format: 'Views by format',
      stats_note_reels: 'Reels drive over 60 percent of views, the best format for ads.',
      
      stats_gender: 'Gender',
      stats_men: 'Men',
      stats_women: 'Women',
      stats_age: 'Age',
      stats_countries: 'Top countries',
      stats_languages: 'Top languages',
      
      stats_fit_tag: 'Who is this for',
      stats_fit_title: 'Who this audience',
      stats_fit_title_highlight: 'fits',
      
      stats_cta_title: 'Show your brand to<br>',
      stats_cta_title_highlight: 'new audience',
      stats_cta_text: 'Describe the product. I will suggest a format and reach forecast.',
      
      contact_title: 'Let us create content<br>together',
      contact_subtitle: 'Tell me about your task. I will respond within 24 hours and suggest a format within your budget.',
      
      contact_telegram: 'Telegram',
      contact_telegram_desc: 'The fastest way. I respond within hours.',
      contact_telegram_btn: 'Message on Telegram',
      contact_telegram_perks: '⚡ Fast 💬 Easy',
      
      contact_instagram: 'Instagram Direct',
      contact_instagram_desc: 'Send a DM. I will respond just as fast.',
      contact_instagram_btn: 'Message on Instagram',
      contact_instagram_perks: '📸 Portfolio',
      
      contact_email: 'Email',
      contact_email_desc: 'For official proposals and detailed discussions.',
      contact_email_btn: 'Send email',
      
      contact_brief_tag: 'Or submit a brief',
      contact_brief_title: 'Tell me about the project',
      contact_brief_subtitle: 'The more details you provide, the more accurate the proposal. All fields optional but recommended.',
      
      form_brand: 'Brand name',
      form_brand_placeholder: 'e.g., Fashion House',
      form_name: 'Your name',
      form_name_placeholder: 'How should I address you',
      form_email: 'Email',
      form_telegram: 'Telegram',
      form_telegram_placeholder: '@username',
      form_format: 'Collaboration format',
      form_format_choose: 'Choose format',
      form_format_integration: 'Ad integration (post + Stories)',
      form_format_ugc: 'UGC content for your socials',
      form_format_photoshoot: 'Catalog/website shoot',
      form_format_ambassador: 'Ambassadorship (long-term)',
      form_format_event: 'Event participation',
      form_format_other: 'Other (I will describe below)',
      form_description: 'Project description',
      form_description_placeholder: 'Tell me about the product, task, target audience. More details mean better proposal.',
      form_description_hint: 'Example: need content for launching a new clothing collection, target audience: women 18-25.',
      form_budget: 'Budget',
      form_budget_choose: 'Choose range',
      form_budget_under50k: 'Up to $700',
      form_budget_50k100k: '$700 – $1400',
      form_budget_100k200k: '$1400 – $2800',
      form_budget_200k: 'Over $2800',
      form_budget_discuss: 'Open to discussion',
      form_deadline: 'Desired timeline',
      form_deadline_placeholder: 'e.g., by end of month',
      form_referral: 'How did you find me?',
      form_referral_choose: 'Choose option',
      form_referral_instagram: 'Instagram',
      form_referral_tiktok: 'TikTok',
      form_referral_telegram: 'Telegram',
      form_referral_recommendation: 'Recommendation',
      form_referral_search: 'Search',
      form_referral_other: 'Other',
      form_submit: 'Send brief to Telegram',
      form_footer: 'By submitting, you agree to data processing. I will respond within 24 hours.',
      
      form_success_title: 'One step left',
      form_success_text: 'Telegram opened with a ready message. Tap Send and the brief reaches Nelly. If text did not paste, insert it manually: it is already copied.',
      form_success_btn: 'Open Telegram again',
      
      faq_tag: 'FAQ',
      faq_title: 'Frequently asked questions',
      
      portfolio_title: 'Selected',
      portfolio_title_highlight: 'projects',
      portfolio_subtitle: 'Brand collaborations. Each project is a story told visually.',
      portfolio_all: 'All work',
      portfolio_fashion: 'Fashion',
      portfolio_beauty: 'Beauty',
      portfolio_lifestyle: 'Lifestyle',
      portfolio_commercial: 'Commercial',
      portfolio_more_tag: 'More work',
      portfolio_more_title: 'Full portfolio<br>on',
      portfolio_more_title_highlight: 'Instagram',
      portfolio_more_btn: 'View on Instagram',
      
      about_tag: 'About',
      about_title: 'Hi, I am',
      about_title_highlight: 'Nelly',
      about_lead: 'Model and content creator. I shoot content for fashion, beauty, and lifestyle brands. Content people want to save, not scroll past.',
      about_text_1: 'I started with photoshoots for friends and small boutiques. Over time, I realized: people care about stories, not ads. That is why I integrate every product into my life instead of just holding it up to the camera.',
      about_text_2: 'Today I design the concept, styling, and scenario myself, shoot, and edit. The brand gets ready-made content and genuine audience reaction.',
      about_badge_exp: 'years on camera',
      
      compcard_tag: 'Comp card',
      compcard_title: 'Measurements',
      compcard_subtitle: 'Model card for agencies, photographers, and castings. Can be saved as PDF.',
      compcard_save: 'Save comp card as PDF',
      compcard_height: 'Height',
      compcard_bust: 'Bust',
      compcard_waist: 'Waist',
      compcard_hips: 'Hips',
      compcard_size: 'Size',
      compcard_shoes: 'Shoes',
      compcard_hair: 'Hair',
      compcard_eyes: 'Eyes',
      compcard_location: 'Model & Content Creator · Moscow',
      
      timeline_tag: 'Journey',
      timeline_title: 'From first shots to',
      timeline_title_highlight: 'brands',
      timeline_2020: '2020',
      timeline_2020_title: 'First shoots',
      timeline_2020_text: 'Test shoots with photographers, finding my style and image on camera.',
      timeline_2022: '2022',
      timeline_2022_title: 'Blog launch',
      timeline_2022_text: 'Instagram and TikTok: lifestyle, fashion, behind-the-scenes.',
      timeline_2024: '2024',
      timeline_2024_title: 'Commercial projects',
      timeline_2024_text: 'First integrations and UGC content for clothing and beauty brands.',
      timeline_now: 'Now',
      timeline_now_title: 'Long-term collaborations',
      timeline_now_text: 'Ambassadorships, turnkey shoots, and content with measurable results.',
      
      values_tag: 'Values',
      values_title: 'What drives',
      values_title_highlight: 'my work',
      value1_title: 'Honesty',
      value1_desc: 'I only promote what I would use myself. That is why the audience trusts recommendations.',
      value1_tag: 'Trust',
      value2_title: 'Aesthetics',
      value2_desc: 'Light, color, composition, and styling are planned in advance. Content looks expensive even when shot on a phone.',
      value2_tag: 'Visuals',
      value3_title: 'Results',
      value3_desc: 'A beautiful picture is just the beginning. What matters is how many saw, saved, and bought.',
      value3_tag: 'Numbers',
      
      about_cta_tag: 'Get in touch?',
      about_cta_title: 'Tell me about your brand,<br>I will share my',
      about_cta_title_highlight: 'vision',
      about_cta_text: 'I will respond within a day and suggest a format for your task.'
    }
  },

  t(key) {
    return this.strings[this.current]?.[key] || this.strings.ru[key] || key;
  },

  setLang(lang) {
    if (!['ru', 'en'].includes(lang)) lang = 'ru';
    this.current = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    this.update();
  },

  getLang() {
    const saved = localStorage.getItem('lang');
    if (saved && ['ru', 'en'].includes(saved)) return saved;
    return navigator.language.startsWith('en') ? 'en' : 'ru';
  },

  update() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = this.t(key);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else {
        el.innerHTML = text;
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.I18N.setLang(window.I18N.getLang());
});