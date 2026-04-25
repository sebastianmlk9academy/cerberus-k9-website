import { useState, type FormEvent } from "react";

const bebas = "'Bebas Neue', Impact, sans-serif" as const;
const raj = "'Rajdhani', sans-serif" as const;

const sectionBg = "linear-gradient(to bottom, #161F28, #1A2530, #161F28)";
const fieldBg = "#0F1420";
const fieldBorder = "#1e2838";
const textColor = "#E4DDD0";
const red = "#B2312D";

interface ContactPageProps {
  lang?: string;
  email?: string;
  phone?: string;
  address?: string;
}

const DEFAULT_EMAIL = "sebastian@pactak9.org";
const DEFAULT_PHONE_DISPLAY = "788 929 200";
const DEFAULT_PHONE_TEL = "+48788929200";

function toTelHref(display: string): string {
  const digits = display.replace(/\D/g, "");
  if (!digits) return DEFAULT_PHONE_TEL;
  if (digits.length >= 11 && digits.startsWith("48")) return `tel:+${digits}`;
  if (digits.length === 9) return `tel:+48${digits}`;
  return `tel:+${digits}`;
}
const DEFAULT_ADDRESS_LINES = [
  "Fundacja PACTA K9",
  "ul. Odolanowska 17",
  "63-400 Topola Mała",
  "woj. Wielkopolskie",
] as const;

const contactCopy: Record<
  string,
  {
    title: string;
    subtitle: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    sendBtn: string;
    addressTitle: string;
    phoneTitle: string;
    emailTitle: string;
  }
> = {
  pl: {
    title: "KONTAKT", subtitle: "Skontaktuj się z nami",
    nameLabel: "IMIĘ I NAZWISKO", emailLabel: "ADRES E-MAIL",
    messageLabel: "TREŚĆ WIADOMOŚCI", sendBtn: "WYŚLIJ WIADOMOŚĆ",
    addressTitle: "ADRES", phoneTitle: "TELEFON", emailTitle: "E-MAIL"
  },
  en: {
    title: "CONTACT", subtitle: "Get in touch with us",
    nameLabel: "FULL NAME", emailLabel: "EMAIL ADDRESS",
    messageLabel: "MESSAGE", sendBtn: "SEND MESSAGE",
    addressTitle: "ADDRESS", phoneTitle: "PHONE", emailTitle: "EMAIL"
  },
  de: {
    title: "KONTAKT", subtitle: "Nehmen Sie Kontakt auf",
    nameLabel: "VOR- UND NACHNAME", emailLabel: "E-MAIL-ADRESSE",
    messageLabel: "NACHRICHT", sendBtn: "NACHRICHT SENDEN",
    addressTitle: "ADRESSE", phoneTitle: "TELEFON", emailTitle: "E-MAIL"
  },
  fr: {
    title: "CONTACT", subtitle: "Contactez-nous",
    nameLabel: "NOM ET PRÉNOM", emailLabel: "ADRESSE E-MAIL",
    messageLabel: "MESSAGE", sendBtn: "ENVOYER LE MESSAGE",
    addressTitle: "ADRESSE", phoneTitle: "TÉLÉPHONE", emailTitle: "E-MAIL"
  },
  cs: {
    title: "KONTAKT", subtitle: "Kontaktujte nás",
    nameLabel: "JMÉNO A PŘÍJMENÍ", emailLabel: "E-MAILOVÁ ADRESA",
    messageLabel: "ZPRÁVA", sendBtn: "ODESLAT ZPRÁVU",
    addressTitle: "ADRESA", phoneTitle: "TELEFON", emailTitle: "E-MAIL"
  },
  sk: {
    title: "KONTAKT", subtitle: "Kontaktujte nás",
    nameLabel: "MENO A PRIEZVISKO", emailLabel: "E-MAILOVÁ ADRESA",
    messageLabel: "SPRÁVA", sendBtn: "ODOSLAŤ SPRÁVU",
    addressTitle: "ADRESA", phoneTitle: "TELEFÓN", emailTitle: "E-MAIL"
  },
  hu: {
    title: "KAPCSOLAT", subtitle: "Lépjen kapcsolatba velünk",
    nameLabel: "TELJES NÉV", emailLabel: "E-MAIL CÍM",
    messageLabel: "ÜZENET", sendBtn: "ÜZENET KÜLDÉSE",
    addressTitle: "CÍM", phoneTitle: "TELEFON", emailTitle: "E-MAIL"
  },
  hr: {
    title: "KONTAKT", subtitle: "Kontaktirajte nas",
    nameLabel: "IME I PREZIME", emailLabel: "E-MAIL ADRESA",
    messageLabel: "PORUKA", sendBtn: "POŠALJI PORUKU",
    addressTitle: "ADRESA", phoneTitle: "TELEFON", emailTitle: "E-MAIL"
  },
  sl: {
    title: "KONTAKT", subtitle: "Stopite v stik z nami",
    nameLabel: "IME IN PRIIMEK", emailLabel: "E-POŠTNI NASLOV",
    messageLabel: "SPOROČILO", sendBtn: "POŠLJI SPOROČILO",
    addressTitle: "NASLOV", phoneTitle: "TELEFON", emailTitle: "E-POŠTA"
  },
  lt: {
    title: "KONTAKTAI", subtitle: "Susisiekite su mumis",
    nameLabel: "VARDAS IR PAVARDĖ", emailLabel: "EL. PAŠTO ADRESAS",
    messageLabel: "ŽINUTĖ", sendBtn: "SIŲSTI ŽINUTĘ",
    addressTitle: "ADRESAS", phoneTitle: "TELEFONAS", emailTitle: "EL. PAŠTAS"
  },
  lv: {
    title: "KONTAKTI", subtitle: "Sazinieties ar mums",
    nameLabel: "VĀRDS UN UZVĀRDS", emailLabel: "E-PASTA ADRESE",
    messageLabel: "ZIŅOJUMS", sendBtn: "NOSŪTĪT ZIŅU",
    addressTitle: "ADRESE", phoneTitle: "TĀLRUNIS", emailTitle: "E-PASTS"
  },
  no: {
    title: "KONTAKT", subtitle: "Ta kontakt med oss",
    nameLabel: "FULLT NAVN", emailLabel: "E-POSTADRESSE",
    messageLabel: "MELDING", sendBtn: "SEND MELDING",
    addressTitle: "ADRESSE", phoneTitle: "TELEFON", emailTitle: "E-POST"
  },
  sv: {
    title: "KONTAKT", subtitle: "Kontakta oss",
    nameLabel: "FULLSTÄNDIGT NAMN", emailLabel: "E-POSTADRESS",
    messageLabel: "MEDDELANDE", sendBtn: "SKICKA MEDDELANDE",
    addressTitle: "ADRESS", phoneTitle: "TELEFON", emailTitle: "E-POST"
  },
  nl: {
    title: "CONTACT", subtitle: "Neem contact met ons op",
    nameLabel: "VOOR- EN ACHTERNAAM", emailLabel: "E-MAILADRES",
    messageLabel: "BERICHT", sendBtn: "BERICHT VERSTUREN",
    addressTitle: "ADRES", phoneTitle: "TELEFOON", emailTitle: "E-MAIL"
  },
  es: {
    title: "CONTACTO", subtitle: "Póngase en contacto con nosotros",
    nameLabel: "NOMBRE COMPLETO", emailLabel: "DIRECCIÓN DE CORREO",
    messageLabel: "MENSAJE", sendBtn: "ENVIAR MENSAJE",
    addressTitle: "DIRECCIÓN", phoneTitle: "TELÉFONO", emailTitle: "CORREO"
  },
  pt: {
    title: "CONTACTO", subtitle: "Entre em contacto connosco",
    nameLabel: "NOME COMPLETO", emailLabel: "ENDEREÇO DE E-MAIL",
    messageLabel: "MENSAGEM", sendBtn: "ENVIAR MENSAGEM",
    addressTitle: "ENDEREÇO", phoneTitle: "TELEFONE", emailTitle: "E-MAIL"
  },
  ro: {
    title: "CONTACT", subtitle: "Contactați-ne",
    nameLabel: "NUME COMPLET", emailLabel: "ADRESĂ DE E-MAIL",
    messageLabel: "MESAJ", sendBtn: "TRIMITEȚI MESAJUL",
    addressTitle: "ADRESĂ", phoneTitle: "TELEFON", emailTitle: "E-MAIL"
  },
  it: {
    title: "CONTATTO", subtitle: "Contattaci",
    nameLabel: "NOME E COGNOME", emailLabel: "INDIRIZZO E-MAIL",
    messageLabel: "MESSAGGIO", sendBtn: "INVIA MESSAGGIO",
    addressTitle: "INDIRIZZO", phoneTitle: "TELEFONO", emailTitle: "E-MAIL"
  },
  ko: {
    title: "문의", subtitle: "저희에게 연락하세요",
    nameLabel: "성명", emailLabel: "이메일 주소",
    messageLabel: "메시지", sendBtn: "메시지 보내기",
    addressTitle: "주소", phoneTitle: "전화", emailTitle: "이메일"
  },
};

export function ContactPage({ lang, email, phone, address }: ContactPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);
  const c = contactCopy[lang ?? "pl"] ?? contactCopy["pl"];
  const contactEmail = (email ?? "").trim() || DEFAULT_EMAIL;
  const phoneDisplay = (phone ?? "").trim() || DEFAULT_PHONE_DISPLAY;
  const phoneTel = toTelHref(phoneDisplay);
  const addressBlock =
    (address ?? "").trim() ||
    DEFAULT_ADDRESS_LINES.join("\n");
  const addressLines = addressBlock.includes("\n")
    ? addressBlock.split("\n").filter(Boolean)
    : [addressBlock];

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
          gap: 8px;
          margin: 4px 0 8px;
          cursor: pointer;
        }
        .ck9-checkbox input {
          flex-shrink: 0;
          margin-right: 4px;
          margin-top: 3px;
          accent-color: ${red};
          cursor: pointer;
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
        @media (max-width: 980px) {
          .ck9-contact-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="ck9-contact-grid">
        <div>
          <h2 id="contact-title" className="ck9-contact-title">
            {c.title}
          </h2>
          <p style={{ margin: "0 0 14px", fontFamily: raj, fontSize: "14px", color: "#7A8A96" }}>{c.subtitle}</p>

          <form
            className="ck9-contact-form"
            name="contact"
            method="POST"
            action="/kontakt"
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
              <label htmlFor="fullName">{c.nameLabel}</label>
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
              <label htmlFor="email">{c.emailLabel}</label>
              <input id="email" className="ck9-contact-input" name="email" type="email" required />
            </div>

            <div>
              <label htmlFor="organization">{(c as any).organizationLabel ?? "ORGANIZATION / UNIT"}</label>
              <input id="organization" className="ck9-contact-input" name="organization" type="text" />
            </div>

            <div>
              <label htmlFor="subject">{(c as any).subjectLabel ?? "SUBJECT"}</label>
              <select id="subject" className="ck9-contact-select" name="subject">
                <option>{(c as any).subjectRegistration ?? "Registration"}</option>
                <option>{(c as any).subjectSponsoring ?? "Sponsoring"}</option>
                <option>{(c as any).subjectMediaPatronage ?? "Media Partnership"}</option>
                <option>{(c as any).subjectInstructors ?? "Instructors"}</option>
                <option>{(c as any).subjectPress ?? "Press & Media"}</option>
                <option>{(c as any).subjectOther ?? "Other"}</option>
              </select>
            </div>

            <div>
              <label htmlFor="message">{c.messageLabel}</label>
              <textarea id="message" className="ck9-contact-textarea" name="message" required />
            </div>

            <label className="ck9-checkbox" htmlFor="privacyConsent">
              <input id="privacyConsent" name="privacyConsent" type="checkbox" required />
              <span>
                {(c as any).privacyConsent ??
                  "I have read the Privacy Policy and consent to personal data processing"}
              </span>
            </label>

            <button className="ck9-contact-btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? ((c as any).sending ?? "SENDING...") : `${c.sendBtn} →`}
            </button>

            {isSuccess ? (
              <p className="ck9-contact-status ck9-contact-status--ok">
                {(c as any).successMessage ?? "Thank you! We will reply within 24 hours."}
              </p>
            ) : null}
            {hasError ? (
              <p className="ck9-contact-status ck9-contact-status--err">
                {(c as any).errorMessage ?? "Failed to send the form. Please try again shortly."}
              </p>
            ) : null}
          </form>
        </div>

        <aside className="ck9-info-column" aria-label="Dane kontaktowe">
          <article className="ck9-info-card">
            <h3 className="ck9-card-title">{c.addressTitle}</h3>
            {addressLines.map((line) => (
              <p key={line} className="ck9-card-line">
                {line}
              </p>
            ))}
          </article>

          <article className="ck9-info-card">
            <h3 className="ck9-card-title">{(c as any).directContactTitle ?? "DIRECT CONTACT"}</h3>
            <p className="ck9-card-line">
              {c.emailTitle}:{" "}
              <a className="ck9-card-link" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
            </p>
            <p className="ck9-card-line">
              {(c as any).presidentLabel ?? "President"}:{" "}
              <a className="ck9-card-link" href="mailto:mariusz@pactak9.org">
                mariusz@pactak9.org
              </a>
            </p>
            <p className="ck9-card-line">
              {c.phoneTitle}:{" "}
              <a className="ck9-card-link" href={`tel:${phoneTel}`}>
                {phoneDisplay}
              </a>
            </p>
          </article>

          <article className="ck9-info-card">
            <h3 className="ck9-card-title">{(c as any).eventLocationTitle ?? "EVENT LOCATION — CERBERUS K9 2026"}</h3>
            <iframe
              className="ck9-map"
              title={(c as any).eventLocationTitle ?? "EVENT LOCATION — CERBERUS K9 2026"}
              src="https://www.openstreetmap.org/export/embed.html?bbox=17.7985,51.6409,17.8185,51.6609&layer=mapnik&marker=51.6509,17.8085"
              loading="lazy"
            />
            <p className="ck9-card-line">3MK Arena, ul. Andrzeja Kowalczyka 1, Ostrów Wielkopolski, Polska</p>
            <p className="ck9-card-note">
              {(c as any).mapNote ?? "Detailed route map is available in registration materials"}
            </p>
          </article>

        </aside>
      </div>
    </section>
  );
}
