import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home-page-wrapper">
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-subtitle-top">Нутрициолог в Москве</p>
          <h1 className="hero-title">
            Экспертная забота. Доказанный результат.
            <br />
            Здоровая версия тебя.
          </h1>

          <div className="hero-buttons">
            <Link to="/contacts" className="btn-primary">
              Позвонить
            </Link>
            <Link to="/contacts" className="btn-primary">
              Записаться онлайн
            </Link>
          </div>
        </div>
      </section>

      
      <section className="why-choose-section">
        <h2 className="section-heading">Почему выбирают Анну Неверову?</h2>

        <div className="cards-grid">
          <div className="card-red">
            <h3>Сертифицированный специалист</h3>
            <p>Диплом ведущего медицинского ВУЗа и годы практики.</p>
          </div>

          <div className="card-red">
            <h3>Высокий рейтинг</h3>
            <p>Сотни довольных клиентов, достигших своих целей.</p>
          </div>

          <div className="card-red">
            <h3>Индивидуальный подход</h3>
            <p>Планы питания, адаптированные под ваши анализы и ритм жизни.</p>
          </div>
        </div>
      </section>

      
      <section
        style={{ display: "flex", padding: "40px", alignItems: "center" }}
      >
        <div style={{ flex: 1 }}>
          <img
            src="/public/original_anna-nutrition-virtual-consultation.jpg"
            alt="Онлайн консультация"
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ flex: 1, paddingLeft: "40px" }}>
          <h2>Свяжитесь с нутрициологом онлайн</h2>
          <p>
            Я провожу виртуальные консультации для вашего удобства. Получите
            профессиональную оценку состояния здоровья, не выходя из дома.
          </p>
          <br/>
          <div
            style={{
              display: "flex",
              gap: "15px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link to="/contacts" className="btn-primary">
              Позвонить
            </Link>
            <Link to="/contacts" className="btn-primary">
              Записаться онлайн
            </Link>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "40px",
          textAlign: "center",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2>Долгосрочные преимущества</h2>
        <p style={{ color: "#7ab53b" }}>От работы с Анной</p>
        <div
          className="cards-container"
          style={{ backgroundColor: "transparent" }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              width: "30%",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ color: "#7ab53b" }}>Психическое здоровье</h3>
            <p>
              Связь кишечника и мозга доказана научно. Правильное питание
              снижает тревожность.
            </p>
          </div>
          <div
            style={{
              background: "white",
              padding: "20px",
              width: "30%",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ color: "#7ab53b" }}>Уверенность в себе</h3>
            <p>
              Достижение целей по весу и самочувствию кардинально меняет
              самооценку.
            </p>
          </div>
          <div
            style={{
              background: "white",
              padding: "20px",
              width: "30%",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ color: "#7ab53b" }}>Экономия</h3>
            <p>
              Грамотное планирование рациона избавляет от импульсивных покупок
              фастфуда.
            </p>
          </div>
        </div>
        <Link to="/contacts" className="btn-primary">
          Записаться онлайн
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
