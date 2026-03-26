import { useState } from "react";
import Icon from "@/components/ui/icon";

const menuData = {
  "Супы": [
    { name: "Суп куриный с лапшой", weight: "300 мл", price: "250 ₽" },
    { name: "Борщ с говядиной и сметаной", weight: "300 мл", price: "320 ₽" },
    { name: "Суп рыбный с лососем и укропом", weight: "300 мл", price: "290 ₽" },
    { name: "Суп-пюре из тыквы с семечками", weight: "300 мл", price: "220 ₽" },
  ],
  "Вторые блюда": [
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

const vacancies = [
  { icon: "ChefHat", title: "Пекарь", places: 2, salary: "55 000 ₽/мес" },
  { icon: "UtensilsCrossed", title: "Повар", places: 2, salary: "60 000 ₽/мес" },
  { icon: "Users", title: "Официант", places: 2, salary: "40 000 ₽/мес" },
  { icon: "ClipboardList", title: "Администратор", places: 1, salary: "60 000 ₽/мес" },
  { icon: "GraduationCap", title: "Стажёр (оплачиваемая стажировка)", places: 4, salary: "20 000 ₽/мес" },
  { icon: "Sparkles", title: "Уборщик", places: 1, salary: "35 000 ₽/мес" },
];

const aboutCards = [
  {
    icon: "Heart",
    title: "Кто мы",
    text: "«Набережная добра» — социальное кафе во Владивостоке с домашней кухней и собственной пекарней. Готовим обеды, печём круассаны, пирожки, булочки с корицей, блины, варим качественный кофе.",
  },
  {
    icon: "Rocket",
    title: "Наша миссия",
    text: "Дать первый рабочий опыт тем, кому сложно начать. Трудоустраиваем выпускников детских домов, людей с инвалидностью и подростков 14–18 лет. Ломаем замкнутый круг «нет опыта — нет работы».",
  },
  {
    icon: "BookOpen",
    title: "Как это работает",
    text: "Каждый стажёр закреплён за наставником — опытным пекарем, поваром или администратором. Обучение в реальном процессе: выпечка, приготовление блюд, работа с кассой, обслуживание гостей. После — запись в трудовой.",
  },
  {
    icon: "Star",
    title: "Почему выбирают нас",
    text: "Единственное кафе во Владивостоке, которое совмещает домашнюю кухню, пекарню, кофе и системное трудоустройство трёх уязвимых групп. Приходя к нам, вы становитесь частью доброго дела.",
  },
];

const trainingSteps = [
  { step: "01", title: "Направление кандидатов", who: "Центр занятости, детские дома, школы", duration: "" },
  { step: "02", title: "Собеседование", who: "Администратор", duration: "1 день" },
  { step: "03", title: "Подписание договора о стажировке", who: "Юрист, родители для подростков", duration: "1 день" },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState("Супы");
  const [formData, setFormData] = useState({ name: "", phone: "", position: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
    setFormData({ name: "", phone: "", position: "" });
  };

  return (
    <>
      <div className="grain-overlay" />

      {/* Header */}
      <header className="header">
        <div className="logo">НАБЕРЕЖНАЯ<br className="block md:hidden" /> ДОБРА</div>
        <nav>
          <a href="#menu">Меню</a>
          <a href="#about">О нас</a>
          <a href="#vacancies">Вакансии</a>
          <a href="#contacts">Контакты</a>
        </nav>
        <a href="#contacts" className="btn-cta">Контакты</a>
      </header>

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              ТАМ, ГДЕ
              <br />
              СЕРДЦУ <span>ТЕПЛО</span>
            </h1>
            <p className="text-base md:text-lg mb-6 leading-relaxed" style={{ color: "#555" }}>
              Домашняя кухня и своя пекарня во Владивостоке. Средний чек — <strong>850 ₽</strong>.
              <br />
              <em>Каждый обед здесь — это чей-то первый рабочий опыт.</em>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#menu" className="btn-cta" style={{ background: "var(--primary)", color: "white" }}>
                Смотреть меню
              </a>
              <a href="#about" className="btn-cta" style={{ background: "white" }}>
                О нас
              </a>
            </div>
          </div>
          <div className="hero-img" style={{ background: "url('https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80') center center / cover" }}>
            <div className="sticker">
              850 ₽
              <br />
              средний чек
            </div>
            <div className="floating-tag hidden md:block" style={{ top: "20%", left: "10%" }}>
              #ДОМАШНЯЯ КУХНЯ
            </div>
            <div className="floating-tag hidden md:block" style={{ bottom: "30%", right: "20%" }}>
              СВОЯ ПЕКАРНЯ
            </div>
          </div>
        </section>

        {/* Marquee */}
        <div className="marquee">
          <div className="marquee-content">
            &nbsp; * ДОМАШНЯЯ КУХНЯ * СВОЯ ПЕКАРНЯ * КАЧЕСТВЕННЫЙ КОФЕ * ПЕРВЫЙ РАБОЧИЙ ОПЫТ * ВЛАДИВОСТОК *
            ДОМАШНЯЯ КУХНЯ * СВОЯ ПЕКАРНЯ * КАЧЕСТВЕННЫЙ КОФЕ * ПЕРВЫЙ РАБОЧИЙ ОПЫТ * ВЛАДИВОСТОК *
          </div>
        </div>

        {/* Menu with tabs */}
        <section className="section-padding" id="menu">
          <div className="section-header">
            <h2 className="section-title">НАШЕ МЕНЮ</h2>
            <p style={{ color: "#666", fontWeight: 700, textTransform: "uppercase", fontSize: "14px" }}>
              Домашняя кухня каждый день
            </p>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "40px" }}>
            {Object.keys(menuData).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="btn-cta"
                style={{
                  background: activeTab === tab ? "var(--primary)" : "white",
                  color: activeTab === tab ? "white" : "var(--dark)",
                  fontSize: "13px",
                  padding: "8px 16px",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Menu items */}
          <div style={{ display: "grid", gap: "12px" }}>
            {menuData[activeTab as keyof typeof menuData].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px 20px",
                  border: "var(--border)",
                  background: "white",
                  boxShadow: "4px 4px 0 var(--dark)",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                <div>
                  <p style={{ fontWeight: 700, fontSize: "15px" }}>{item.name}</p>
                  {item.weight && <p style={{ color: "#888", fontSize: "13px", marginTop: "2px" }}>{item.weight}</p>}
                </div>
                <span className="price">{item.price}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Training plan */}
        <section className="retro-vibe">
          <div>
            <h2 className="vibe-title">ПЛАН ОБУЧЕНИЯ СТАЖЁРОВ</h2>
            <p className="vibe-text">
              Системный подход к трудоустройству: от первого звонка до записи в трудовой книжке.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "30px" }}>
              {trainingSteps.map((step) => (
                <div key={step.step} style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                  <div
                    style={{
                      minWidth: "50px",
                      height: "50px",
                      background: "var(--accent)",
                      border: "var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "Unbounded, sans-serif",
                      fontWeight: 800,
                      fontSize: "18px",
                    }}
                  >
                    {step.step}
                  </div>
                  <div>
                    <p style={{ fontWeight: 800, textTransform: "uppercase", fontSize: "15px" }}>{step.title}</p>
                    <p style={{ color: "#555", fontSize: "13px", marginTop: "4px" }}>{step.who}</p>
                    {step.duration && (
                      <p style={{ color: "var(--primary)", fontSize: "12px", fontWeight: 700, marginTop: "2px" }}>
                        {step.duration}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="vibe-img"></div>
        </section>

        {/* Vacancies */}
        <section className="section-padding" id="vacancies">
          <div className="section-header">
            <h2 className="section-title">ВАКАНСИИ</h2>
            <p style={{ color: "#666", fontWeight: 700, textTransform: "uppercase", fontSize: "14px" }}>
              Официальное трудоустройство по ТК РФ
            </p>
          </div>
          <div className="menu-grid">
            {vacancies.map((v, i) => (
              <div key={i} className="menu-card" style={{ cursor: "default" }}>
                <div
                  style={{
                    padding: "30px 20px 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      background: "var(--accent)",
                      border: "var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon name={v.icon} size={28} fallback="Briefcase" />
                  </div>
                  <h3 style={{ fontSize: "16px", fontWeight: 800, textTransform: "uppercase", lineHeight: 1.2 }}>
                    {v.title}
                  </h3>
                  <p style={{ color: "#666", fontSize: "13px" }}>Мест: {v.places}</p>
                  <span className="price" style={{ fontSize: "20px" }}>{v.salary}</span>
                  <a href="#apply" className="btn-cta" style={{ textAlign: "center", textDecoration: "none", display: "block" }}>
                    Подробнее
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Apply form */}
        <section className="section-padding" id="apply" style={{ background: "var(--dark)", color: "white" }}>
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2 className="section-title" style={{ color: "white", marginBottom: "12px" }}>
              ПОДАТЬ ЗАЯВКУ
            </h2>
            <p style={{ color: "#aaa", marginBottom: "32px", lineHeight: 1.6 }}>
              Телефон для связи: <strong style={{ color: "white" }}>+7 (994) 018-35-43</strong>
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <input
                type="text"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{
                  padding: "14px 16px",
                  border: "3px solid white",
                  background: "transparent",
                  color: "white",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  outline: "none",
                }}
              />
              <input
                type="tel"
                placeholder="Телефон"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                style={{
                  padding: "14px 16px",
                  border: "3px solid white",
                  background: "transparent",
                  color: "white",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  outline: "none",
                }}
              />
              <input
                type="text"
                placeholder="Желаемая должность"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                required
                style={{
                  padding: "14px 16px",
                  border: "3px solid white",
                  background: "transparent",
                  color: "white",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                className="btn-cta"
                style={{ background: "var(--accent)", color: "var(--dark)", marginTop: "8px", fontSize: "15px" }}
              >
                Отправить заявку
              </button>
            </form>

            <div style={{ marginTop: "32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {[
                "Официальное трудоустройство по ТК РФ",
                "Обучение с наставником бесплатно",
                "Запись в трудовой книжке",
                "Гибкий график для особых категорий",
              ].map((cond, i) => (
                <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                  <Icon name="CheckCircle" size={18} style={{ color: "var(--accent)", marginTop: "2px", flexShrink: 0 }} />
                  <p style={{ color: "#ccc", fontSize: "13px", lineHeight: 1.4 }}>{cond}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section className="section-padding" id="about">
          <h2 className="section-title" style={{ marginBottom: "40px", textAlign: "center" }}>
            О НАС
          </h2>
          <div className="social-grid">
            {aboutCards.map((card, i) => (
              <div
                key={i}
                style={{
                  border: "var(--border)",
                  background: "white",
                  boxShadow: "var(--shadow)",
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "var(--primary)",
                    border: "var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                  }}
                >
                  <Icon name={card.icon} size={24} style={{ color: "white" }} />
                </div>
                <h3 style={{ fontFamily: "Unbounded, sans-serif", fontWeight: 800, fontSize: "14px", textTransform: "uppercase", marginBottom: "10px" }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.6 }}>{card.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final slogan */}
        <section className="retro-vibe" style={{ flexDirection: "column", textAlign: "center" }}>
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <h2 className="vibe-title" style={{ fontSize: "clamp(40px, 8vw, 96px)" }}>
              ВЫ ЕДИТЕ —<br />ОНИ РАСТУТ.
            </h2>
            <p className="vibe-text">
              Каждый ваш визит — это вклад в чью-то первую запись в трудовой. Без пожертвований и фондов.
              Просто приходите обедать.
            </p>
          </div>
        </section>

        {/* Contacts */}
        <section className="section-padding" id="contacts">
          <h2 className="section-title" style={{ marginBottom: "40px", textAlign: "center" }}>
            КОНТАКТЫ
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            <div style={{ border: "var(--border)", background: "white", boxShadow: "var(--shadow)", padding: "24px" }}>
              <div style={{ width: "44px", height: "44px", background: "var(--accent)", border: "var(--border)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
                <Icon name="MapPin" size={22} />
              </div>
              <p style={{ fontWeight: 800, textTransform: "uppercase", fontSize: "13px", marginBottom: "6px" }}>Адрес</p>
              <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.5 }}>ул. Пушкинская, 34, Владивосток</p>
            </div>
            <div style={{ border: "var(--border)", background: "white", boxShadow: "var(--shadow)", padding: "24px" }}>
              <div style={{ width: "44px", height: "44px", background: "var(--accent)", border: "var(--border)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
                <Icon name="Clock" size={22} />
              </div>
              <p style={{ fontWeight: 800, textTransform: "uppercase", fontSize: "13px", marginBottom: "6px" }}>Часы работы</p>
              <p style={{ color: "#555", fontSize: "14px" }}>09:00 – 21:00</p>
              <p style={{ color: "#888", fontSize: "12px" }}>Без выходных</p>
            </div>
            <div style={{ border: "var(--border)", background: "white", boxShadow: "var(--shadow)", padding: "24px" }}>
              <div style={{ width: "44px", height: "44px", background: "var(--accent)", border: "var(--border)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
                <Icon name="Phone" size={22} />
              </div>
              <p style={{ fontWeight: 800, textTransform: "uppercase", fontSize: "13px", marginBottom: "6px" }}>Телефон</p>
              <a href="tel:+79940183543" style={{ color: "var(--primary)", fontWeight: 700, fontSize: "15px" }}>
                +7 (994) 018-35-43
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div>
          <div className="footer-logo">НАБЕРЕЖНАЯ ДОБРА</div>
          <p style={{ color: "#666", lineHeight: 1.6 }}>
            Социальное кафе во Владивостоке. Домашняя кухня, своя пекарня и первый рабочий опыт для тех, кто в этом нуждается.
          </p>
        </div>
        <div className="footer-links">
          <h4>Навигация</h4>
          <ul>
            <li><a href="#menu" style={{ color: "inherit", textDecoration: "none" }}>Меню</a></li>
            <li><a href="#about" style={{ color: "inherit", textDecoration: "none" }}>О нас</a></li>
            <li><a href="#vacancies" style={{ color: "inherit", textDecoration: "none" }}>Вакансии</a></li>
            <li><a href="#apply" style={{ color: "inherit", textDecoration: "none" }}>Подать заявку</a></li>
            <li><a href="#contacts" style={{ color: "inherit", textDecoration: "none" }}>Контакты</a></li>
          </ul>
        </div>
        <div>
          <h4>Контакты</h4>
          <p style={{ color: "#666", marginTop: "10px" }}>09:00 – 21:00, без выходных</p>
          <p style={{ color: "#666" }}>Владивосток</p>
          <p style={{ marginTop: "10px" }}>
            <a href="tel:+79940183543" style={{ color: "var(--primary)", fontWeight: 700 }}>
              +7 (994) 018-35-43
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}