import { useState } from "react";

const menuData: Record<string, { name: string; weight: string; price: string }[]> = {
  "Супы": [
    { name: "Суп куриный с лапшой (домашний)", weight: "300 мл", price: "250 ₽" },
    { name: "Борщ с говядиной и сметаной", weight: "300 мл", price: "320 ₽" },
    { name: "Суп рыбный с лососем и укропом", weight: "300 мл", price: "290 ₽" },
    { name: "Суп-пюре из тыквы с семечками", weight: "300 мл", price: "220 ₽" },
  ],
  "Второе": [
    { name: "Картофельное пюре с котлетой по-домашнему", weight: "300 г", price: "350 ₽" },
    { name: "Гречка с печенью по-строгановски", weight: "300 г", price: "380 ₽" },
    { name: "Паста с курицей в сливочном соусе", weight: "300 г", price: "420 ₽" },
    { name: "Рис с запечённым лососем и овощами", weight: "300 г", price: "550 ₽" },
    { name: "Треска, запечённая с лимонником и сливочным маслом", weight: "300 г", price: "530 ₽" },
  ],
  "Салаты": [
    { name: "Цезарь с курицей и сухариками", weight: "200 г", price: "380 ₽" },
    { name: "Салат с тунцом, яйцом и свежими огурцами", weight: "200 г", price: "420 ₽" },
    { name: "Греческий с фетой и оливками", weight: "200 г", price: "350 ₽" },
    { name: "Салат из сезонных овощей с домашней заправкой", weight: "200 г", price: "250 ₽" },
    { name: "Салат с кальмаром и авокадо", weight: "200 г", price: "450 ₽" },
  ],
  "Выпечка": [
    { name: "Круассан классический", weight: "80 г", price: "150 ₽" },
    { name: "Круассан с шоколадом", weight: "90 г", price: "180 ₽" },
    { name: "Пирожок с картошкой и грибами", weight: "100 г", price: "120 ₽" },
    { name: "Пирожок с капустой", weight: "100 г", price: "100 ₽" },
    { name: "Булочка с корицей (синабон)", weight: "100 г", price: "180 ₽" },
    { name: "Блины с творогом и сметаной", weight: "200 г", price: "220 ₽" },
    { name: "Блины с мёдом", weight: "150 г", price: "200 ₽" },
    { name: "Бриошь с камчатским крабом и авокадо", weight: "150 г", price: "380 ₽" },
  ],
  "Напитки": [
    { name: "Американо", weight: "200 мл", price: "150 ₽" },
    { name: "Капучино", weight: "200 мл", price: "180 ₽" },
    { name: "Латте", weight: "200 мл", price: "190 ₽" },
    { name: "Раф", weight: "200 мл", price: "210 ₽" },
    { name: "Добавка (корица, сироп)", weight: "", price: "+30 ₽" },
    { name: "Чай чёрный/зелёный", weight: "250 мл", price: "100 ₽" },
    { name: "Какао", weight: "200 мл", price: "160 ₽" },
    { name: "Авторский лимонад", weight: "300 мл", price: "220 ₽" },
    { name: "Морс клюквенный", weight: "300 мл", price: "180 ₽" },
  ],
  "Десерты": [
    { name: "Медовик", weight: "150 г", price: "280 ₽" },
    { name: "Чизкейк классический", weight: "150 г", price: "290 ₽" },
    { name: "Наполеон", weight: "150 г", price: "300 ₽" },
    { name: "Панкейки с фруктами и мёдом", weight: "200 г", price: "350 ₽" },
    { name: "Жареное мороженое", weight: "150 г", price: "290 ₽" },
    { name: "Десерт дня", weight: "100–120 г", price: "200–250 ₽" },
  ],
  "Комбо": [
    { name: "Бизнес-ланч (суп + второе + салат + компот/чай)", weight: "", price: "550–650 ₽" },
    { name: "Обед + кофе (бизнес-ланч + капучино/латте)", weight: "", price: "750–850 ₽" },
    { name: "Кофе + десерт", weight: "", price: "350–450 ₽" },
    { name: "Семейный завтрак (блины + круассан + 2 кофе + морс)", weight: "", price: "890 ₽" },
  ],
};

const tabIcons: Record<string, string> = {
  "Супы": "🍜",
  "Второе": "🍽️",
  "Салаты": "🥗",
  "Выпечка": "🥐",
  "Напитки": "☕",
  "Десерты": "🏠",
  "Комбо": "⭐",
};

const vacancies = [
  {
    emoji: "🥐", title: "Пекарь", places: 2, salary: "55 000 ₽/мес",
    desc: "Замес теста, формовка, выпечка круассанов, булочек, пирожков. Работа с наставником.",
    schedule: "5 дней в неделю, утренняя смена",
    req: "Опыт не обязателен — обучаем с нуля",
  },
  {
    emoji: "🍳", title: "Повар", places: 2, salary: "60 000 ₽/мес",
    desc: "Приготовление первых и вторых блюд, салатов по домашним рецептам. Работа в паре с наставником.",
    schedule: "5–6 дней в неделю, дневная смена",
    req: "Желание готовить вкусно. Опыт приветствуется, но не обязателен",
  },
  {
    emoji: "🤝", title: "Официант", places: 2, salary: "40 000 ₽/мес",
    desc: "Обслуживание гостей, приём заказов, поддержание уюта в зале.",
    schedule: "Гибкий, 5 дней в неделю",
    req: "Дружелюбность, внимательность. Опыт не нужен",
  },
  {
    emoji: "📋", title: "Администратор", places: 1, salary: "60 000 ₽/мес",
    desc: "Координация работы смены, касса, работа с гостями, контроль качества.",
    schedule: "5 дней в неделю, полный день",
    req: "Ответственность, умение общаться с людьми. Обучаем с нуля",
  },
  {
    emoji: "🎓", title: "Стажёр", places: 4, salary: "20 000 ₽/мес",
    desc: "Помощь на кухне или в зале, освоение одной из специальностей (пекарь, повар, официант) под руководством наставника.",
    schedule: "Гибкий, обсуждается индивидуально",
    req: "Без требований. Принимаем выпускников детских домов, подростков 14–18 лет, людей с инвалидностью",
  },
  {
    emoji: "✨", title: "Уборщик", places: 1, salary: "35 000 ₽/мес",
    desc: "Поддержание чистоты в зале и на кухне, работа с инвентарём.",
    schedule: "Утренняя и/или вечерняя смена",
    req: "Ответственность и аккуратность. Опыт не нужен",
  },
];

const trainingSteps = [
  { step: "01", title: "Направление кандидатов", who: "Центр занятости, детские дома, школы", duration: "" },
  { step: "02", title: "Собеседование", who: "Администратор", duration: "1 день" },
  { step: "03", title: "Подписание договора о стажировке", who: "Юрист, родители для подростков", duration: "1 день" },
];

const S = {
  bg: "#f5f0e8",
  dark: "#1a1a1a",
  primary: "#b83232",
  accent: "#1a1a1a",
  border: "2px solid #1a1a1a",
  text: "#1a1a1a",
  muted: "#666",
};

export default function Index() {
  const [activeTab, setActiveTab] = useState("Супы");
  const [expandedVacancy, setExpandedVacancy] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", position: "", category: "", comment: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
    setFormData({ name: "", phone: "", position: "", category: "", comment: "" });
  };

  return (
    <div style={{ background: S.bg, color: S.dark, fontFamily: "'Montserrat', sans-serif", minHeight: "100vh" }}>

      {/* HEADER */}
      <header style={{
        background: "white",
        borderBottom: S.border,
        padding: "0 40px",
        height: "72px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 800, fontSize: "20px", letterSpacing: "-0.5px", lineHeight: 1.1 }}>
          НАБЕРЕЖНАЯ ДОБРА
        </div>
        <nav style={{ display: "flex", gap: "32px" }}>
          {[["#apply","СТАЖЁРАМ"],["#vacancies","ВАКАНСИИ"],["#contacts","КОНТАКТЫ"]].map(([href, label]) => (
            <a key={href} href={href} style={{ color: S.dark, textDecoration: "none", fontWeight: 700, fontSize: "13px", letterSpacing: "0.5px" }}>
              {label}
            </a>
          ))}
        </nav>
      </header>

      {/* HERO */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "580px", borderBottom: S.border }}>
        <div style={{ padding: "60px 60px", display: "flex", flexDirection: "column", justifyContent: "center", background: S.bg }}>
          <h1 style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 800, fontSize: "clamp(42px, 5vw, 72px)", lineHeight: 1, marginBottom: "16px" }}>
            НАБЕРЕЖНАЯ
          </h1>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(42px, 5vw, 72px)", color: S.primary, lineHeight: 1, marginBottom: "8px" }}>
            ДОБРА —
          </h1>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(22px, 3vw, 38px)", color: S.dark, marginBottom: "32px", lineHeight: 1.2 }}>
            там, где сердцу тепло
          </h2>
          <p style={{ fontSize: "15px", lineHeight: 1.7, color: S.accent, maxWidth: "420px", marginBottom: "36px" }}>
            Домашняя кухня и своя пекарня во Владивостоке. Каждый обед здесь — это чей-то первый рабочий опыт. Средний чек 850 Р.
          </p>
          <div style={{ display: "flex", gap: "16px" }}>
            <a href="#menu" style={{
              background: S.primary, color: "white", padding: "14px 28px",
              border: S.border, fontWeight: 800, fontSize: "13px", textDecoration: "none",
              letterSpacing: "1px", textTransform: "uppercase",
            }}>
              СМОТРЕТЬ МЕНЮ
            </a>
            <a href="#about" style={{
              background: "white", color: S.dark, padding: "14px 28px",
              border: S.border, fontWeight: 800, fontSize: "13px", textDecoration: "none",
              letterSpacing: "1px", textTransform: "uppercase",
            }}>
              О НАС
            </a>
          </div>
        </div>

        <div style={{ position: "relative", overflow: "hidden" }}>
          <img
            src="https://cdn.poehali.dev/projects/05b0b7de-7dfd-4211-88ef-00b974e4c49e/files/e721b67c-adfd-431a-b331-6cbc5d19e11d.jpg"
            alt="Круассаны и булочки в кафе"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{
            position: "absolute", top: "24px", left: "24px",
            background: "white", border: S.border,
            borderRadius: "999px", padding: "10px 20px",
            fontWeight: 700, fontSize: "13px",
          }}>
            #ДОБРОЕДЕЛО
          </div>
          <div style={{
            position: "absolute", bottom: "40%", right: "24px",
            background: "white", border: S.border,
            borderRadius: "999px", padding: "10px 20px",
            fontWeight: 700, fontSize: "13px",
          }}>
            ТЕПЛО
          </div>
          <div style={{
            position: "absolute", bottom: "24px", right: "24px",
            background: S.accent, border: S.border,
            borderRadius: "50%", width: "110px", height: "110px",
            display: "flex", alignItems: "center", justifyContent: "center",
            textAlign: "center", fontFamily: "'Unbounded', sans-serif",
            fontWeight: 800, fontSize: "14px", lineHeight: 1.2, color: "white",
          }}>
            ОБЕД<br />ОТ 850 Р
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ background: S.dark, color: "white", padding: "16px 0", overflow: "hidden", borderBottom: S.border }}>
        <div style={{
          display: "inline-block", whiteSpace: "nowrap",
          animation: "scroll 22s linear infinite",
          fontWeight: 800, fontSize: "18px", letterSpacing: "4px", textTransform: "uppercase",
        }}>
          &nbsp; * ДОМАШНЯЯ КУХНЯ * СВОЯ ПЕКАРНЯ * КАЧЕСТВЕННЫЙ КОФЕ * ПЕРВЫЙ РАБОЧИЙ ОПЫТ * ВЛАДИВОСТОК *&nbsp;
          ДОМАШНЯЯ КУХНЯ * СВОЯ ПЕКАРНЯ * КАЧЕСТВЕННЫЙ КОФЕ * ПЕРВЫЙ РАБОЧИЙ ОПЫТ * ВЛАДИВОСТОК *
        </div>
      </div>

      {/* MENU */}
      <section id="menu" style={{ padding: "70px 60px" }}>
        <h2 style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 800, fontSize: "clamp(48px, 8vw, 96px)", lineHeight: 1, marginBottom: "48px" }}>
          МЕНЮ
        </h2>

        {/* Tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
          {Object.keys(menuData).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "10px 18px",
                border: S.border,
                background: activeTab === tab ? S.primary : "white",
                color: activeTab === tab ? "white" : S.dark,
                fontWeight: 700, fontSize: "13px", letterSpacing: "0.5px",
                textTransform: "uppercase", cursor: "pointer",
                display: "flex", alignItems: "center", gap: "8px",
              }}
            >
              <span>{tabIcons[tab]}</span> {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{ border: S.border }}>
          <div style={{
            background: S.dark, color: "white",
            display: "grid", gridTemplateColumns: "1fr auto",
            padding: "14px 24px", fontWeight: 800, fontSize: "13px", letterSpacing: "1px",
          }}>
            <span>БЛЮДО</span>
            <span>ЦЕНА</span>
          </div>
          {menuData[activeTab].map((item, i) => (
            <div
              key={i}
              style={{
                display: "grid", gridTemplateColumns: "1fr auto",
                padding: "18px 24px", alignItems: "center",
                borderTop: i === 0 ? "none" : "1px solid #ddd",
                background: "white",
              }}
            >
              <div>
                <p style={{ fontWeight: 700, fontSize: "15px", marginBottom: "2px" }}>{item.name}</p>
                {item.weight && <p style={{ color: S.muted, fontSize: "13px" }}>{item.weight}</p>}
              </div>
              <span style={{ color: S.primary, fontWeight: 800, fontSize: "16px", whiteSpace: "nowrap" }}>
                {item.price}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* VACANCIES */}
      <section id="vacancies" style={{ padding: "70px 60px" }}>
        <h2 style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 800, fontSize: "clamp(48px, 7vw, 88px)", lineHeight: 1, marginBottom: "48px" }}>
          ВАКАНСИИ
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
          {vacancies.map((v, i) => {
            const isOpen = expandedVacancy === i;
            return (
              <div key={i} style={{
                border: S.border, background: "white", padding: "28px",
                boxShadow: isOpen ? "6px 6px 0 #1a1a1a" : "none",
                transition: "box-shadow 0.2s",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <span style={{ fontSize: "32px" }}>{v.emoji}</span>
                  <span style={{ background: S.dark, color: "white", padding: "4px 12px", fontSize: "12px", fontWeight: 700 }}>
                    {v.places} места
                  </span>
                </div>
                <h3 style={{ fontWeight: 800, fontSize: "16px", textTransform: "uppercase", marginBottom: "8px" }}>{v.title}</h3>
                <p style={{ color: S.primary, fontWeight: 800, fontSize: "22px", marginBottom: isOpen ? "16px" : "20px" }}>
                  {v.salary.replace("/мес", "")} <span style={{ fontSize: "14px", fontWeight: 600, color: S.muted }}>/мес</span>
                </p>

                {isOpen && (
                  <div style={{ marginBottom: "16px" }}>
                    <p style={{ fontSize: "14px", lineHeight: 1.6, color: S.dark, marginBottom: "12px" }}>{v.desc}</p>
                    <p style={{ fontSize: "13px", marginBottom: "6px" }}>
                      <span style={{ marginRight: "6px" }}>📅</span>
                      <strong>График:</strong>{" "}
                      <span style={{ color: S.primary }}>{v.schedule}</span>
                    </p>
                    <p style={{ fontSize: "13px" }}>
                      <span style={{ marginRight: "6px" }}>✅</span>
                      <strong>Требования:</strong>{" "}
                      <span style={{ color: S.primary }}>{v.req}</span>
                    </p>
                  </div>
                )}

                <button
                  onClick={() => setExpandedVacancy(isOpen ? null : i)}
                  style={{
                    background: "none", border: "none", padding: 0,
                    color: S.primary, fontWeight: 800, fontSize: "13px",
                    letterSpacing: "0.5px", textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  {isOpen ? "СКРЫТЬ ↑" : "ПОДРОБНЕЕ ↓"}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* APPLY FORM */}
      <section id="apply" style={{ padding: "70px 60px", background: S.bg }}>
        <h2 style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 800, fontSize: "clamp(48px, 7vw, 88px)", lineHeight: 1, marginBottom: "48px" }}>
          ПОДАТЬ ЗАЯВКУ
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", border: S.border, background: "white", padding: "48px" }}>
          {/* Left */}
          <div>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: S.muted, marginBottom: "28px" }}>
              Заполните форму — и мы свяжемся с вами, чтобы обсудить подходящую вакансию и график. Опыт не нужен: мы обучаем с нуля.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
              {[
                { emoji: "🧡", text: "Официальное трудоустройство по ТК РФ" },
                { emoji: "🎓", text: "Обучение с наставником — бесплатно" },
                { emoji: "📋", text: "Запись в трудовой книжке" },
                { emoji: "💛", text: "Гибкий график для особых категорий" },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "18px" }}>{c.emoji}</span>
                  <span style={{ color: S.accent, fontSize: "14px", lineHeight: 1.5 }}>{c.text}</span>
                </div>
              ))}
            </div>
            <p style={{ color: S.muted, fontSize: "13px", marginBottom: "8px" }}>Или позвоните нам:</p>
            <a href="tel:+79940183543" style={{ color: S.dark, fontWeight: 800, fontSize: "22px", textDecoration: "none" }}>
              +7 994 018-35-43
            </a>
          </div>

          {/* Right — Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontWeight: 800, fontSize: "12px", letterSpacing: "1px", marginBottom: "8px" }}>ВАШЕ ИМЯ *</label>
              <input
                type="text" placeholder="Иван Иванов" required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ width: "100%", padding: "14px 16px", border: S.border, background: S.bg, fontSize: "14px", fontFamily: "Montserrat, sans-serif", outline: "none" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontWeight: 800, fontSize: "12px", letterSpacing: "1px", marginBottom: "8px" }}>НОМЕР ТЕЛЕФОНА *</label>
              <input
                type="tel" placeholder="+7 ___ ___-__-__" required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={{ width: "100%", padding: "14px 16px", border: S.border, background: S.bg, fontSize: "14px", fontFamily: "Montserrat, sans-serif", outline: "none" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontWeight: 800, fontSize: "12px", letterSpacing: "1px", marginBottom: "8px" }}>ЖЕЛАЕМАЯ ВАКАНСИЯ *</label>
              <select
                required
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                style={{ width: "100%", padding: "14px 16px", border: S.border, background: S.bg, fontSize: "14px", fontFamily: "Montserrat, sans-serif", outline: "none", appearance: "none", cursor: "pointer" }}
              >
                <option value="">Выберите вакансию...</option>
                {vacancies.map((v) => <option key={v.title} value={v.title}>{v.title}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontWeight: 800, fontSize: "12px", letterSpacing: "1px", marginBottom: "8px" }}>КАТЕГОРИЯ (НЕОБЯЗАТЕЛЬНО)</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={{ width: "100%", padding: "14px 16px", border: S.border, background: S.bg, fontSize: "14px", fontFamily: "Montserrat, sans-serif", outline: "none", appearance: "none", cursor: "pointer" }}
              >
                <option value="">Выберите категорию...</option>
                <option>Выпускник детского дома</option>
                <option>Человек с инвалидностью</option>
                <option>Подросток 14–18 лет</option>
                <option>Другое</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontWeight: 800, fontSize: "12px", letterSpacing: "1px", marginBottom: "8px" }}>КОММЕНТАРИЙ (НЕОБЯЗАТЕЛЬНО)</label>
              <textarea
                placeholder="Расскажите о себе, удобном графике или пожеланиях..."
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                rows={4}
                style={{ width: "100%", padding: "14px 16px", border: S.border, background: S.bg, fontSize: "14px", fontFamily: "Montserrat, sans-serif", outline: "none", resize: "vertical" }}
              />
            </div>
            <button type="submit" style={{
              background: S.primary, color: "white", padding: "16px",
              border: S.border, fontWeight: 800, fontSize: "14px",
              letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer",
            }}>
              ОТПРАВИТЬ ЗАЯВКУ →
            </button>
          </form>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "70px 60px" }}>
        <h2 style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 800, fontSize: "clamp(48px, 7vw, 88px)", lineHeight: 1, marginBottom: "48px" }}>
          О НАС
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: S.border }}>
          {[
            { emoji: "☕", title: "КТО МЫ", text: "«Набережная добра» — социальное кафе во Владивостоке с домашней кухней и собственной пекарней. Мы готовим обеды (супы, вторые блюда, салаты), печём круассаны, пирожки, булочки с корицей, блины и варим качественный кофе." },
            { emoji: "❤️", title: "НАША МИССИЯ", text: "Дать первый рабочий опыт тем, кому сложно начать. Мы трудоустраиваем выпускников детских домов, людей с инвалидностью и подростков 14–18 лет. В Приморском крае сотни людей не могут найти работу из-за отсутствия опыта — мы ломаем этот замкнутый круг." },
            { emoji: "🎓", title: "КАК ЭТО РАБОТАЕТ", text: "Каждый стажёр закреплён за наставником — опытным пекарем, поваром или администратором. Обучение проходит в реальном процессе: выпечка, приготовление блюд, работа с кассой, обслуживание гостей. После — запись в трудовой книжке." },
            { emoji: "⭐", title: "ПОЧЕМУ ВЫБИРАЮТ НАС", text: "Мы — единственное кафе во Владивостоке, которое совмещает домашнюю кухню, пекарню, кофе и системное трудоустройство трёх уязвимых групп. Приходя к нам, вы не просто обедаете — вы становитесь частью доброго дела." },
          ].map((card, i) => (
            <div key={i} style={{
              padding: "36px 32px",
              borderRight: i % 2 === 0 ? S.border : "none",
              borderBottom: i < 2 ? S.border : "none",
              background: "white",
            }}>
              <div style={{ fontSize: "32px", marginBottom: "16px" }}>{card.emoji}</div>
              <h3 style={{ fontWeight: 800, fontSize: "14px", letterSpacing: "1px", marginBottom: "12px" }}>{card.title}</h3>
              <p style={{ color: S.muted, fontSize: "14px", lineHeight: 1.7 }}>{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SLOGAN */}
      <section style={{ padding: "48px 60px", background: S.dark, color: "white" }}>
        <h2 style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 800, fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1, marginBottom: "8px" }}>
          ВЫ ЕДИТЕ —
        </h2>
        <h2 style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 800, fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1, color: S.primary, marginBottom: "24px" }}>
          ОНИ РАСТУТ.
        </h2>
        <p style={{ color: "#aaa", fontSize: "14px", lineHeight: 1.7, maxWidth: "480px" }}>
          Каждый ваш визит — это вклад в чью-то первую запись в трудовой.
          Без пожертвований и фондов. Просто приходите обедать.
        </p>
      </section>

      {/* CONTACTS */}
      <section id="contacts" style={{ padding: "70px 60px" }}>
        <h2 style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 800, fontSize: "clamp(48px, 7vw, 88px)", lineHeight: 1, marginBottom: "48px" }}>
          КОНТАКТЫ
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0", border: S.border }}>
          <div style={{ padding: "36px 32px", borderRight: S.border }}>
            <p style={{ fontWeight: 800, fontSize: "12px", letterSpacing: "1px", color: S.muted, marginBottom: "16px" }}>АДРЕС</p>
            <a
              href="https://maps.google.com/?q=Пушкинская+34+Владивосток"
              target="_blank" rel="noreferrer"
              style={{ color: S.primary, fontWeight: 700, fontSize: "16px", textDecoration: "none" }}
            >
              ул. Пушкинская, 34 →
            </a>
            <p style={{ color: S.dark, fontSize: "14px", marginTop: "4px" }}>Владивосток</p>
          </div>
          <div style={{ padding: "36px 32px", borderRight: S.border }}>
            <p style={{ fontWeight: 800, fontSize: "12px", letterSpacing: "1px", color: S.muted, marginBottom: "16px" }}>ЧАСЫ РАБОТЫ</p>
            <p style={{ fontWeight: 700, fontSize: "16px" }}>09:00 – 21:00</p>
            <p style={{ color: S.muted, fontSize: "13px", marginTop: "4px" }}>Ежедневно, без выходных</p>
          </div>
          <div style={{ padding: "36px 32px" }}>
            <p style={{ fontWeight: 800, fontSize: "12px", letterSpacing: "1px", color: S.muted, marginBottom: "16px" }}>ТЕЛЕФОН</p>
            <a href="tel:+79940183543" style={{ color: S.dark, fontWeight: 800, fontSize: "18px", textDecoration: "none" }}>
              +7 994 018-35-43
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "60px 60px", borderTop: S.border, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "40px" }}>
        <div>
          <div style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 800, fontSize: "24px", lineHeight: 1.1, marginBottom: "16px" }}>
            НАБЕРЕЖНАЯ<br />ДОБРА
          </div>
          <p style={{ color: S.muted, fontSize: "14px", lineHeight: 1.6, marginBottom: "20px" }}>
            Социальное кафе с домашней кухней и своей пекарней.<br />
            Владивосток. Где каждый обед — это чей-то первый шаг.
          </p>
          <p style={{ fontWeight: 800, fontSize: "12px", letterSpacing: "1px", color: S.muted, marginBottom: "8px" }}>КОНТАКТЫ</p>
          <p style={{ fontSize: "15px", fontWeight: 600, marginBottom: "4px" }}>+7 994 018-35-43</p>
          <a href="https://maps.google.com/?q=Пушкинская+34+Владивосток" target="_blank" rel="noreferrer"
            style={{ color: S.primary, fontSize: "14px" }}>
            ул. Пушкинская, 34 →
          </a>
          <p style={{ fontSize: "14px", color: S.muted, marginTop: "4px" }}>Владивосток</p>
        </div>
        <div>
          <p style={{ fontWeight: 800, fontSize: "12px", letterSpacing: "1px", color: S.accent, marginBottom: "16px" }}>НАВИГАЦИЯ</p>
          {[["#menu","Меню"],["#about","О нас"],["#vacancies","Вакансии"],["#apply","Стажёрам"],["#contacts","Контакты"]].map(([href, label]) => (
            <a key={href} href={href} style={{ display: "block", color: S.dark, textDecoration: "none", fontSize: "14px", marginBottom: "10px" }}>
              {label}
            </a>
          ))}
        </div>
        <div>
          <p style={{ fontWeight: 800, fontSize: "12px", letterSpacing: "1px", color: S.accent, marginBottom: "16px" }}>ЧАСЫ РАБОТЫ</p>
          <p style={{ fontSize: "15px", fontWeight: 700 }}>Ежедневно: 09:00 - 21:00</p>
        </div>
      </footer>
    </div>
  );
}