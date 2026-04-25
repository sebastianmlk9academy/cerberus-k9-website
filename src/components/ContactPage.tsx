import { useState, type FormEvent } from "react";

const bebas = "'Bebas Neue', Impact, sans-serif" as const;
const raj = "'Rajdhani', sans-serif" as const;

const sectionBg = "#1E2B38";
const fieldBg = "#0F1420";
const fieldBorder = "#1e2838";
const textColor = "#E4DDD0";
const red = "#B2312D";

export function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasError(false);

    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: if bot fills hidden field, silently accept and stop.
    if ((data.get("company-website") || "").toString().trim()) {
      setIsSuccess(true);
      form.reset();
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setIsSuccess(true);
      form.reset();
    } catch {
      setHasError(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="ck9-contact-page" aria-labelledby="contact-title">
      <style>{`
        .ck9-contact-page {
          background: ${sectionBg};
          padding: 80px 5%;
          color: ${textColor};
        }
        .ck9-contact-grid {
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 55% 45%;
          gap: 28px;
        }
        .ck9-contact-title {
          margin: 0 0 20px;
          font-family: ${bebas};
          font-size: 36px;
          line-height: 1;
          letter-spacing: 0.06em;
          color: ${textColor};
        }
        .ck9-contact-form {
          display: grid;
          gap: 12px;
        }
        .ck9-contact-form label {
          display: block;
          margin-bottom: 6px;
          font: 600 12px/1.2 ${raj};
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: ${textColor};
        }
        .ck9-contact-input,
        .ck9-contact-select,
        .ck9-contact-textarea {
          width: 100%;
          border: 1px solid ${fieldBorder};
          background: ${fieldBg};
          color: ${textColor};
          border-radius: 10px;
          font: 500 14px/1.45 ${raj};
          padding: 12px 14px;
          outline: none;
        }
        .ck9-contact-input::placeholder,
        .ck9-contact-textarea::placeholder {
          color: rgba(228, 221, 208, 0.6);
        }
        .ck9-contact-input:focus,
        .ck9-contact-select:focus,
        .ck9-contact-textarea:focus {
          border-color: #2d3f56;
          box-shadow: 0 0 0 2px rgba(45, 63, 86, 0.25);
        }
        .ck9-contact-textarea {
          min-height: 140px;
          resize: vertical;
        }
        .ck9-checkbox {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin: 4px 0 8px;
        }
        .ck9-checkbox input {
          margin-top: 2px;
          accent-color: ${red};
        }
        .ck9-checkbox span {
          font: 500 13px/1.45 ${raj};
          color: ${textColor};
        }
        .ck9-contact-btn {
          width: 100%;
          border: 0;
          border-radius: 10px;
          background: ${red};
          color: #fff;
          padding: 14px 16px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font: 700 12px/1 ${raj};
          cursor: pointer;
          transition: filter 0.2s ease;
        }
        .ck9-contact-btn:hover { filter: brightness(1.08); }
        .ck9-contact-btn:disabled { opacity: 0.75; cursor: wait; }
        .ck9-contact-status {
          margin: 4px 0 0;
          font: 500 14px/1.4 ${raj};
        }
        .ck9-contact-status--ok { color: #7cd991; }
        .ck9-contact-status--err { color: #ff8f8f; }
        .ck9-honeypot {
          position: absolute !important;
          left: -5000px !important;
          top: auto !important;
          width: 1px !important;
          height: 1px !important;
          overflow: hidden !important;
        }
        .ck9-info-column {
          display: grid;
          gap: 14px;
        }
        .ck9-info-card {
          border: 1px solid ${fieldBorder};
          background: #162230;
          border-radius: 12px;
          padding: 16px;
        }
        .ck9-card-title {
          margin: 0 0 10px;
          font: 700 12px/1.2 ${raj};
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: ${textColor};
        }
        .ck9-card-line,
        .ck9-card-link,
        .ck9-card-note {
          margin: 0 0 6px;
          font: 500 14px/1.5 ${raj};
          color: ${textColor};
        }
        .ck9-card-note { color: rgba(228, 221, 208, 0.8); }
        .ck9-card-link {
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 2px;
        }
        .ck9-card-link:hover { color: #ffffff; }
        .ck9-map {
          width: 100%;
          height: 190px;
          border: 1px solid ${fieldBorder};
          border-radius: 10px;
        }
        .ck9-social-list {
          display: grid;
          gap: 8px;
        }
        @media (max-width: 980px) {
          .ck9-contact-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="ck9-contact-grid">
        <div>
          <h2 id="contact-title" className="ck9-contact-title">
            NAPISZ DO NAS
          </h2>

          <form
            className="ck9-contact-form"
            name="contact"
            method="POST"
            action="/kontakt"
            netlify
            data-netlify="true"
            data-netlify-honeypot="company-website"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="ck9-honeypot" aria-hidden>
              <label>
                Do not fill this field
                <input name="company-website" tabIndex={-1} autoComplete="off" />
              </label>
            </p>

            <div>
              <label htmlFor="fullName">Imię i Nazwisko</label>
              <input
                id="fullName"
                className="ck9-contact-input"
                name="fullName"
                type="text"
                placeholder="Jan Kowalski"
                required
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input id="email" className="ck9-contact-input" name="email" type="email" required />
            </div>

            <div>
              <label htmlFor="organization">Organizacja / Jednostka</label>
              <input id="organization" className="ck9-contact-input" name="organization" type="text" />
            </div>

            <div>
              <label htmlFor="subject">Temat</label>
              <select id="subject" className="ck9-contact-select" name="subject">
                <option>Rejestracja</option>
                <option>Sponsoring</option>
                <option>Patronat Medialny</option>
                <option>Instruktorzy</option>
                <option>Prasa i Media</option>
                <option>Inne</option>
              </select>
            </div>

            <div>
              <label htmlFor="message">Wiadomość</label>
              <textarea id="message" className="ck9-contact-textarea" name="message" required />
            </div>

            <label className="ck9-checkbox" htmlFor="privacyConsent">
              <input id="privacyConsent" name="privacyConsent" type="checkbox" required />
              <span>
                Zapoznałem/am się z Polityką Prywatności i wyrażam zgodę na przetwarzanie danych
              </span>
            </label>

            <button className="ck9-contact-btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "WYSYŁANIE..." : "WYŚLIJ WIADOMOŚĆ →"}
            </button>

            {isSuccess ? (
              <p className="ck9-contact-status ck9-contact-status--ok">
                Dziękujemy! Odpiszemy w ciągu 24 godzin.
              </p>
            ) : null}
            {hasError ? (
              <p className="ck9-contact-status ck9-contact-status--err">
                Nie udało się wysłać formularza. Spróbuj ponownie za chwilę.
              </p>
            ) : null}
          </form>
        </div>

        <aside className="ck9-info-column" aria-label="Dane kontaktowe">
          <article className="ck9-info-card">
            <h3 className="ck9-card-title">DANE FUNDACJI</h3>
            <p className="ck9-card-line">Fundacja PACTA K9</p>
            <p className="ck9-card-line">ul. Odolanowska 17</p>
            <p className="ck9-card-line">63-400 Topola Mała</p>
            <p className="ck9-card-line">woj. Wielkopolskie</p>
          </article>

          <article className="ck9-info-card">
            <h3 className="ck9-card-title">KONTAKT BEZPOŚREDNI</h3>
            <p className="ck9-card-line">
              Email:{" "}
              <a className="ck9-card-link" href="mailto:sebastian@pactak9.org">
                sebastian@pactak9.org
              </a>
            </p>
            <p className="ck9-card-line">
              Prezes:{" "}
              <a className="ck9-card-link" href="mailto:mariusz@pactak9.org">
                mariusz@pactak9.org
              </a>
            </p>
            <p className="ck9-card-line">
              Tel:{" "}
              <a className="ck9-card-link" href="tel:+48788929200">
                788 929 200
              </a>
            </p>
          </article>

          <article className="ck9-info-card">
            <h3 className="ck9-card-title">LOKALIZACJA EVENTU — CERBERUS K9 2026</h3>
            <iframe
              className="ck9-map"
              title="Lokalizacja eventu CERBERUS K9 2026"
              src="https://www.openstreetmap.org/export/embed.html?bbox=17.79,51.63,17.86,51.68&layer=mapnik&marker=51.655,17.820"
              loading="lazy"
            />
            <p className="ck9-card-line">Ostrów Wielkopolski, woj. Wielkopolskie</p>
            <p className="ck9-card-note">
              Szczegółowa mapa dojazdu dostępna w materiałach rejestracyjnych
            </p>
          </article>

          <article className="ck9-info-card">
            <h3 className="ck9-card-title">SOCIAL MEDIA</h3>
            <div className="ck9-social-list">
              <a className="ck9-card-link" href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                Facebook
              </a>
              <a className="ck9-card-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a className="ck9-card-link" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="ck9-card-link" href="https://www.youtube.com/" target="_blank" rel="noreferrer">
                YouTube
              </a>
            </div>
          </article>
        </aside>
      </div>
    </section>
  );
}
