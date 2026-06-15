import { useState } from "react";

function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    consentPhone: false,
    consentEmail: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Произошла ошибка при отправке запроса на сервер.");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Ответ сервера:", data);
        alert("Спасибо! Ваша заявка успешно отправлена.");

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
          consentPhone: false,
          consentEmail: false,
        });
      })
      .catch((err) => {
        console.error("Ошибка при отправке формы:", err);
        alert(
          "К сожалению, произошла ошибка. Пожалуйста, попробуйте отправить позже.",
        );
      });
  };

  return (
    <>
      <section className="contact-hero-wood">
        <div className="contact-header">
          <h1>Свяжитесь с нами</h1>
          <p>СЕГОДНЯ</p>
        </div>

        <div className="contact-form-container">
          <h2>Обратная связь</h2>
          <p className="required-text">
            Поля, отмеченные <span className="required-star">*</span>,
            обязательны для заполнения
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                <span className="required-star">*</span> Имя
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                <span className="required-star">*</span> Фамилия
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                <span className="required-star">*</span> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                <span className="required-star">*</span> Номер телефона
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                <span className="required-star">*</span> Как мы можем помочь?
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="consentPhone"
                name="consentPhone"
                checked={formData.consentPhone}
                onChange={handleChange}
              />
              <label htmlFor="consentPhone">
                Я согласен(на) получать SMS и звонки от нутрициолога Анны
                Неверовой.
                <span>
                  Могут применяться стандартные тарифы на передачу данных.
                  Отправьте СТОП для отписки. Подробнее см.{" "}
                  <a href="/privacy">Политику конфиденциальности</a>.
                </span>
              </label>
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="consentEmail"
                name="consentEmail"
                checked={formData.consentEmail}
                onChange={handleChange}
              />
              <label htmlFor="consentEmail">
                Я согласен(на) получать email-рассылку от Анны Неверовой. Я
                понимаю, что могу отписаться в любое время.
              </label>
            </div>

            <div className="submit-btn-container">
              <button type="submit" className="btn-primary">
                Отправить
              </button>
            </div>
          </form>

          <div className="form-footer">
            Вы также можете позвонить нам по номеру{" "}
            <a href="tel:+79991234567">+7 (999) 123-45-67</a>. Этот сайт защищен
            reCAPTCHA, применяются <a href="#">Политика конфиденциальности</a> и{" "}
            <a href="#">Условия использования</a> Google.
          </div>
        </div>
      </section>

      <section className="contact-location-split">
        <div className="address-side">
          <h3
            style={{ color: "#7ab53b", fontSize: "24px", marginBottom: "15px" }}
          >
            Московский Офис
          </h3>

          <div
            className="address-details"
            style={{
              textAlign: "center",
              marginBottom: "30px",
              lineHeight: "1.6",
            }}
          >
            <p>Пресненская наб., 12</p>
            <p>Башня Федерация, офис 274</p>
            <p>Москва, Россия 123317</p>
            <br />
            <p>Открыто сегодня: 9:00 - 18:00</p>
            <p style={{ fontSize: "12px", marginTop: "10px" }}>
              *Доступны очные и виртуальные консультации
            </p>
          </div>

          <div
            className="address-buttons"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              width: "100%",
              maxWidth: "250px",
            }}
          >
            <button className="btn-primary">+7 (495) 907-6149</button>
          </div>
        </div>

        <div className="map-side">
          <iframe
            title="Офис нутрициолога"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.385412431872!2d37.53427381593051!3d55.74951168055271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54bdc5d141e17%3A0x6bba84b3d36b856!2z0JzQvtGB0LrQstCwLdCh0LjRgtC4!5e0!3m2!1sru!2sru!4v1700000000000!5m2!1sru!2sru"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "400px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
