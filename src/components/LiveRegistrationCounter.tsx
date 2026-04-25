import { FormEvent, useState } from 'react';

const bebas = "'Bebas Neue', Impact, sans-serif" as const;
const raj = "'Rajdhani', sans-serif" as const;

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

function encode(data: FormData) {
  const params = new URLSearchParams();
  data.forEach((value, key) => {
    params.append(key, String(value));
  });
  return params.toString();
}

export function ContactPage() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Honeypot field should stay empty; bots often fill hidden inputs.
    if (String(formData.get('company') ?? '').trim().length > 0) {
      return;
    }

    setSubmitState('submitting');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: encode(formData),
      });

      if (!response.ok) {
        throw new Error('Form submission failed.');
      }

      setSubmitState('success');
      form.reset();
    } catch {
      setSubmitState('error');
    }
  }

  return (
    <section
      style={{
        background: '#1E2B38',
        padding: '80px 5%',
        boxSizing: 'border-box',
      }}
    >
      <style>{`
        .ck9-contact-grid {
          max-width: 1260px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 55fr 45fr;
          gap: 28px;
        }
        .ck9-contact-card {
          background: rgba(15, 20, 32, 0.7);
          border: 1px solid #1e2838;
          border-radius: 8px;
          padding: 22px;
        }
        .ck9-contact-input,
        .ck9-contact-select,
        .ck9-contact-textarea {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #1e2838;
          background: #0F1420;
          color: #E4DDD0;
          border-radius: 4px;
          padding: 12px 14px;
          font-family: ${raj};
          font-size: 14px;
          line-height: 1.35;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .ck9-contact-input::placeholder,
        .ck9-contact-textarea::placeholder {
          color: #7A8A96;
        }
        .ck9-contact-input:focus,
        .ck9-contact-select:focus,
        .ck9-contact-textarea:focus {
          outline: none;
          border-color: #C54A37;
          box-shadow: 0 0 0 2px rgba(197, 74, 55, 0.22);
        }
        .ck9-contact-map {
          width: 100%;
          min-height: 220px;
          border: 1px solid #1e2838;
          border-radius: 6px;
        }
        .ck9-contact-submit {
          width: 100%;
          border: 1px solid #C54A37;
          background: #C54A37;
          color: #E4DDD0;
          padding: 14px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-family: ${raj};
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: background 0.2s, border-color 0.2s;
        }
        .ck9-contact-submit:hover {
          background: #b84332;
          border-color: #b84332;
        }
        .ck9-contact-submit:disabled {
          opacity: 0.65;
          cursor: wait;
        }
        .ck9-contact-honeypot {
          position: absolute;
          left: -99999px;
          width: 1px;
          height: 1px;
          overflow: hidden;
        }
        @media (max-width: 980px) {
          .ck9-contact-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="ck9-contact-grid">
        <div className="ck9-contact-card">
          <h2
            style={{
              margin: '0 0 22px',
              color: '#E4DDD0',
              fontFamily: bebas,
              fontSize: 36,
              lineHeight: 1,
              letterSpacing: '0.03em',
            }}
          >
            NAPISZ DO NAS
          </h2>

          <form
            name="contact"
            method="POST"
            action="/"
            data-netlify="true"
            netlify-honeypot="company"
            onSubmit={handleSubmit}
            style={{ display: 'grid', gap: 14 }}
          >
            <input type="hidden" name="form-name" value="contact" />

            <div className="ck9-contact-honeypot" aria-hidden="true">
              <label htmlFor="company">Firma</label>
              <input id="company" name="company" tabIndex={-1} autoComplete="off" />
            </div>

            <label style={{ display: 'grid', gap: 8 }}>
              <span style={{ color: '#E4DDD0', fontFamily: raj, fontSize: 13, fontWeight: 600 }}>
                Imię i Nazwisko
              </span>
              <input
                className="ck9-contact-input"
                name="name"
                type="text"
                placeholder="Jan Kowalski"
                required
              />
            </label>

            <label style={{ display: 'grid', gap: 8 }}>
              <span style={{ color: '#E4DDD0', fontFamily: raj, fontSize: 13, fontWeight: 600 }}>Email</span>
              <input className="ck9-contact-input" name="email" type="email" required />
            </label>

            <label style={{ display: 'grid', gap: 8 }}>
              <span style={{ color: '#E4DDD0', fontFamily: raj, fontSize: 13, fontWeight: 600 }}>
                Organizacja / Jednostka
              </span>
              <input className="ck9-contact-input" name="organization" type="text" />
            </label>

            <label style={{ display: 'grid', gap: 8 }}>
              <span style={{ color: '#E4DDD0', fontFamily: raj, fontSize: 13, fontWeight: 600 }}>Temat</span>
              <select className="ck9-contact-select" name="subject" defaultValue="Rejestracja" required>
                <option value="Rejestracja">Rejestracja</option>
                <option value="Sponsoring">Sponsoring</option>
                <option value="Patronat Medialny">Patronat Medialny</option>
                <option value="Instruktorzy">Instruktorzy</option>
                <option value="Prasa i Media">Prasa i Media</option>
                <option value="Inne">Inne</option>
              </select>
            </label>

            <label style={{ display: 'grid', gap: 8 }}>
              <span style={{ color: '#E4DDD0', fontFamily: raj, fontSize: 13, fontWeight: 600 }}>Wiadomość</span>
              <textarea
                className="ck9-contact-textarea"
                name="message"
                required
                style={{ minHeight: 140, resize: 'vertical' }}
              />
            </label>

            <label
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                color: '#A0A8B0',
                fontFamily: raj,
                fontSize: 13,
                lineHeight: 1.45,
              }}
            >
              <input name="privacy" type="checkbox" required style={{ marginTop: 2 }} />
              <span>
                Zapoznałem/am się z Polityką Prywatności i wyrażam zgodę na przetwarzanie danych
              </span>
            </label>

            <button className="ck9-contact-submit" type="submit" disabled={submitState === 'submitting'}>
              {submitState === 'submitting' ? 'WYSYŁANIE...' : 'WYŚLIJ WIADOMOŚĆ →'}
            </button>

            {submitState === 'success' && (
              <p style={{ margin: 0, color: '#B8D8C2', fontFamily: raj, fontSize: 14 }}>
                Dziękujemy! Odpiszemy w ciągu 24 godzin.
              </p>
            )}

            {submitState === 'error' && (
              <p style={{ margin: 0, color: '#FF9A9A', fontFamily: raj, fontSize: 14 }}>
                Nie udało się wysłać formularza. Spróbuj ponownie.
              </p>
            )}
          </form>
        </div>

        <aside style={{ display: 'grid', gap: 18 }}>
          <article className="ck9-contact-card">
            <h3
              style={{
                margin: '0 0 10px',
                fontFamily: raj,
                fontSize: 18,
                letterSpacing: '0.08em',
                color: '#C4922A',
                textTransform: 'uppercase',
              }}
            >
              DANE FUNDACJI
            </h3>
            <p style={{ margin: 0, color: '#E4DDD0', fontFamily: raj, lineHeight: 1.6 }}>
              Fundacja PACTA K9
              <br />
              ul. Odolanowska 17
              <br />
              63-400 Topola Mała
              <br />
              woj. Wielkopolskie
            </p>
          </article>

          <article className="ck9-contact-card">
            <h3
              style={{
                margin: '0 0 10px',
                fontFamily: raj,
                fontSize: 18,
                letterSpacing: '0.08em',
                color: '#C4922A',
                textTransform: 'uppercase',
              }}
            >
              KONTAKT BEZPOŚREDNI
            </h3>
            <p style={{ margin: 0, color: '#E4DDD0', fontFamily: raj, lineHeight: 1.8 }}>
              Email:{' '}
              <a href="mailto:sebastian@pactak9.org" style={{ color: '#E4DDD0' }}>
                sebastian@pactak9.org
              </a>
              <br />
              Prezes:{' '}
              <a href="mailto:mariusz@pactak9.org" style={{ color: '#E4DDD0' }}>
                mariusz@pactak9.org
              </a>
              <br />
              Tel:{' '}
              <a href="tel:+48788929200" style={{ color: '#E4DDD0' }}>
                788 929 200
              </a>
            </p>
          </article>

          <article className="ck9-contact-card">
            <h3
              style={{
                margin: '0 0 10px',
                fontFamily: raj,
                fontSize: 18,
                letterSpacing: '0.08em',
                color: '#C4922A',
                textTransform: 'uppercase',
              }}
            >
              LOKALIZACJA EVENTU — CERBERUS K9 2026
            </h3>
            <iframe
              className="ck9-contact-map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=17.79,51.63,17.86,51.68&layer=mapnik&marker=51.655,17.820"
              title="Mapa lokalizacji eventu CERBERUS K9 2026"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <p style={{ margin: '12px 0 0', color: '#E4DDD0', fontFamily: raj, lineHeight: 1.6 }}>
              City: Ostrów Wielkopolski, woj. Wielkopolskie
              <br />
              Szczegółowa mapa dojazdu dostępna w materiałach rejestracyjnych
            </p>
          </article>

          <article className="ck9-contact-card">
            <h3
              style={{
                margin: '0 0 10px',
                fontFamily: raj,
                fontSize: 18,
                letterSpacing: '0.08em',
                color: '#C4922A',
                textTransform: 'uppercase',
              }}
            >
              SOCIAL MEDIA
            </h3>
            <p style={{ margin: 0, color: '#E4DDD0', fontFamily: raj, lineHeight: 1.8 }}>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#E4DDD0' }}>
                Facebook
              </a>
              <br />
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#E4DDD0' }}>
                Instagram
              </a>
              <br />
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#E4DDD0' }}>
                LinkedIn
              </a>
            </p>
          </article>
        </aside>
      </div>
    </section>
  );
}
