import { useState, type MouseEvent } from "react";
import { Calendar, MapPin, Ticket, AlertCircle, Mail, Phone, ExternalLink, ChevronDown } from "lucide-react";

interface RegistrationEmbedProps {
  lang?: string;
}

const regCopy: Record<
  string,
  {
    title: string;
    subtitle: string;
    howTitle: string;
    step1: string;
    step2: string;
    step3: string;
    openForm: string;
    tip: string;
    deadline: string;
    dateLabel: string;
    placeLabel: string;
    admissionLabel: string;
    admissionValue: string;
    limitLabel: string;
    limitValue: string;
    contactLabel: string;
    questionsLabel: string;
    contactUs: string;
  }
> = {
  pl: {
    title: "Rejestracja na Cerberus",
    subtitle: "WSTĘP BEZPŁATNY · WYMAGANA REJESTRACJA",
    howTitle: "JAK SIĘ ZAREJESTROWAĆ — 3 KROKI",
    step1: "Wybierz bilet i kliknij „Zarejestruj\" / „Dalej\".",
    step2: "Finalizacja otworzy się w nowym oknie Pretix — zezwól na wyskakujące okna.",
    step3: "Jeśli przyciski nie reagują, użyj linku „Otwórz pełny formularz\" pod widgetem.",
    openForm: "OTWÓRZ PEŁNY FORMULARZ REJESTRACJI",
    tip: "Po wybraniu biletu, finalizacja zamówienia odbywa się na stronie Pretix.",
    deadline: "Dzień przygotowawczy: 12 czerwca",
    dateLabel: "TERMIN", placeLabel: "MIEJSCE",
    admissionLabel: "WSTĘP", admissionValue: "BEZPŁATNY",
    limitLabel: "UWAGA", limitValue: "LICZBA MIEJSC OGRANICZONA",
    contactLabel: "KONTAKT — REJESTRACJA",
    questionsLabel: "MASZ PYTANIA O REJESTRACJĘ?",
    contactUs: "SKONTAKTUJ SIĘ Z NAMI",
  },
  en: {
    title: "Register for Cerberus",
    subtitle: "FREE ADMISSION · REGISTRATION REQUIRED",
    howTitle: "HOW TO REGISTER — 3 STEPS",
    step1: "Select a ticket and click \"Register\" / \"Next\".",
    step2: "Checkout will open in a new Pretix window — allow pop-ups.",
    step3: "If buttons don't respond, use the \"Open full form\" link below the widget.",
    openForm: "OPEN FULL REGISTRATION FORM",
    tip: "After selecting a ticket, order finalisation takes place on the Pretix website.",
    deadline: "Preparation day: June 12",
    dateLabel: "DATE", placeLabel: "VENUE",
    admissionLabel: "ADMISSION", admissionValue: "FREE",
    limitLabel: "NOTE", limitValue: "LIMITED PLACES AVAILABLE",
    contactLabel: "CONTACT — REGISTRATION",
    questionsLabel: "QUESTIONS ABOUT REGISTRATION?",
    contactUs: "CONTACT US",
  },
};

const partnerCtaBase = {
  border: "1px solid #C4922A",
  background: "transparent",
  color: "#C4922A",
  fontFamily: "'Rajdhani', sans-serif",
  fontSize: "11px",
  letterSpacing: "3px",
  fontWeight: 700,
  padding: "12px 24px",
  cursor: "pointer",
  transition: "all 200ms ease",
} as const;

function setPartnerCtaHover(e: MouseEvent<HTMLAnchorElement>) {
  e.currentTarget.style.background = "#C4922A";
  e.currentTarget.style.color = "#0F1720";
}

function setPartnerCtaLeave(e: MouseEvent<HTMLAnchorElement>) {
  e.currentTarget.style.background = "transparent";
  e.currentTarget.style.color = "#C4922A";
}

/** Left column: heading + registration steps (Pretix widget is rendered between this and RegistrationTip via Astro). */
export function RegistrationIntro({ lang }: RegistrationEmbedProps) {
  const [showInstructions, setShowInstructions] = useState(false);
  const c = regCopy[lang ?? "pl"] ?? regCopy["en"];

  return (
    <>
      <div className="mb-6">
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "44px",
            color: "#E4DDD0",
            letterSpacing: "1px",
            margin: 0,
          }}
        >
          <span>{c.title} </span>
          <span style={{ color: '#C42B2B' }}>K9</span>
        </h2>
        <p
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "9px",
            letterSpacing: "5px",
            color: "#C4922A",
            fontWeight: 700,
            marginTop: "8px",
          }}
        >
          {c.subtitle}
        </p>
      </div>

      <div
        className="mb-3 sm:mb-4"
        style={{
          border: "1px solid rgba(196,146,42,0.4)",
          background: "#1A2430",
          padding: "20px",
        }}
      >
        <button
          type="button"
          onClick={() => setShowInstructions((v) => !v)}
          aria-expanded={showInstructions}
          aria-controls="registration-steps"
          className="flex w-full items-center justify-between gap-2 text-left sm:pointer-events-none sm:cursor-default"
        >
          <span
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "9px",
              letterSpacing: "4px",
              color: "#C4922A",
              fontWeight: 700,
            }}
          >
            {c.howTitle}
          </span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 transition-transform sm:hidden ${
              showInstructions ? "rotate-180" : ""
            }`}
            style={{ color: "#C4922A" }}
            aria-hidden="true"
          />
        </button>
        <ol
          id="registration-steps"
          className={`${
            showInstructions ? "mt-2 block" : "hidden"
          } space-y-1.5 sm:mt-3 sm:block sm:space-y-2`}
        >
          <li className="flex gap-2 sm:gap-3">
            <span
              style={{
                width: "20px",
                height: "20px",
                background: "#C4922A",
                color: "#0F1720",
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              1
            </span>
            <span
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "14px",
                lineHeight: 1.45,
                color: "rgba(228,221,208,0.92)",
              }}
            >
              {c.step1}
            </span>
          </li>
          <li className="flex gap-2 sm:gap-3">
            <span
              style={{
                width: "20px",
                height: "20px",
                background: "#C4922A",
                color: "#0F1720",
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              2
            </span>
            <span
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "14px",
                lineHeight: 1.45,
                color: "rgba(228,221,208,0.92)",
              }}
            >
              {c.step2}
            </span>
          </li>
          <li className="flex gap-2 sm:gap-3">
            <span
              style={{
                width: "20px",
                height: "20px",
                background: "#C4922A",
                color: "#0F1720",
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              3
            </span>
            <span
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "14px",
                lineHeight: 1.45,
                color: "rgba(228,221,208,0.92)",
              }}
            >
              {c.step3}
            </span>
          </li>
        </ol>

        <a
          href="https://pretix.eu/MLK9-LLK9/CERBERUS/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 sm:mt-4"
          style={partnerCtaBase}
          onMouseEnter={setPartnerCtaHover}
          onMouseLeave={setPartnerCtaLeave}
        >
          {c.openForm}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* PretixWidget is rendered below via Astro component */}
    </>
  );
}

export function RegistrationTip({ lang }: RegistrationEmbedProps) {
  const c = regCopy[lang ?? "pl"] ?? regCopy["en"];
  return (
    <div
      className="mt-4"
      style={{
        border: "1px solid rgba(196,146,42,0.3)",
        background: "rgba(196,146,42,0.08)",
        padding: "20px",
      }}
    >
      <p
        style={{
          fontFamily: "'Libre Baskerville', serif",
          fontSize: "14px",
          lineHeight: 1.55,
          color: "rgba(228,221,208,0.92)",
          margin: "0 0 12px 0",
        }}
      >
        <strong style={{ color: "#C4922A" }}>Tip:</strong> {c.tip}
      </p>
      <a
        href="https://pretix.eu/MLK9-LLK9/CERBERUS/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2"
        style={partnerCtaBase}
        onMouseEnter={setPartnerCtaHover}
        onMouseLeave={setPartnerCtaLeave}
      >
        {c.openForm}
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
}

export function RegistrationAside({ lang }: RegistrationEmbedProps) {
  const c = regCopy[lang ?? "pl"] ?? regCopy["en"];
  return (
    <aside className="flex flex-col gap-4">
      <div
        style={{
          borderLeft: "3px solid #C4922A",
          background: "#1A2430",
          padding: "20px",
        }}
      >
        <div
          className="mb-2 flex items-center gap-2"
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "9px",
            letterSpacing: "4px",
            color: "#C4922A",
            fontWeight: 700,
          }}
        >
          <Calendar className="h-4 w-4 shrink-0" />
          {c.dateLabel}
        </div>
        <p
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "28px",
            color: "#E4DDD0",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          {(c as any).dateValue ?? "June 13-14, 2026"}
        </p>
        <p
          className="mt-1"
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: "14px",
            color: "rgba(228,221,208,0.7)",
            margin: 0,
            marginTop: "4px",
          }}
        >
          {c.deadline}
        </p>
      </div>

      <div
        style={{
          borderLeft: "3px solid #253344",
          background: "#1A2430",
          padding: "20px",
        }}
      >
        <div
          className="mb-2 flex items-center gap-2"
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "9px",
            letterSpacing: "4px",
            color: "#7A8A96",
            fontWeight: 700,
          }}
        >
          <MapPin className="h-4 w-4 shrink-0" />
          {c.placeLabel}
        </div>
        <p
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: 1.5,
            color: "#E4DDD0",
            margin: 0,
          }}
        >
          3MK Arena, Szkoła Mundurowa, Stadion Miejski
        </p>
        <p
          className="mt-1"
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: "14px",
            color: "rgba(228,221,208,0.7)",
            margin: 0,
            marginTop: "4px",
          }}
        >
          {(c as any).placeValue ?? "Ostrow Wielkopolski"}
        </p>
      </div>

      <div
        style={{
          border: "1px solid rgba(42,122,58,0.4)",
          background: "rgba(42,122,58,0.1)",
          padding: "20px",
        }}
      >
        <div
          className="mb-2 flex items-center gap-2"
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "9px",
            letterSpacing: "4px",
            color: "#3A8A4A",
            fontWeight: 700,
          }}
        >
          <Ticket className="h-4 w-4 shrink-0" />
          {c.admissionLabel}
        </div>
        <p
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "36px",
            color: "#C4922A",
            margin: 0,
            lineHeight: 1,
          }}
        >
          {c.admissionValue}
        </p>
        <p
          className="mt-2"
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: "12px",
            lineHeight: 1.5,
            color: "rgba(228,221,208,0.7)",
            margin: 0,
            marginTop: "8px",
          }}
        >
          {(c as any).admissionNote ?? "Funded by local government grants"}
        </p>
      </div>

      <div
        style={{
          border: "1px solid rgba(196,43,43,0.4)",
          background: "rgba(196,43,43,0.1)",
          padding: "20px",
        }}
      >
        <div
          className="mb-2 flex items-center gap-2"
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "9px",
            letterSpacing: "4px",
            color: "#C42B2B",
            fontWeight: 700,
          }}
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          {c.limitLabel}
        </div>
        <p
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "22px",
            color: "#E4DDD0",
            margin: 0,
            lineHeight: 1.15,
          }}
        >
          {c.limitValue}
        </p>
        <p
          className="mt-1"
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: "14px",
            color: "rgba(228,221,208,0.8)",
            margin: 0,
            marginTop: "4px",
          }}
        >
          {(c as any).registerNow ?? "Register now"}
        </p>
      </div>

      <div style={{ background: "#1A2430", padding: "20px" }}>
        <div
          className="mb-3"
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "9px",
            letterSpacing: "4px",
            color: "#7A8A96",
            fontWeight: 700,
          }}
        >
          {c.contactLabel}
        </div>
        <div className="space-y-2">
          <a
            href="mailto:rejestracja@cerberusk9.pl"
            className="flex items-center gap-2 transition-colors duration-200"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "11px",
              color: "#E4DDD0",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#C4922A";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#E4DDD0";
            }}
          >
            <Mail className="h-4 w-4 shrink-0" style={{ color: "#C4922A" }} />
            rejestracja@cerberusk9.pl
          </a>
          <a
            href="tel:+48000000000"
            className="flex items-center gap-2 transition-colors duration-200"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "11px",
              color: "#E4DDD0",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#C4922A";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#E4DDD0";
            }}
          >
            <Phone className="h-4 w-4 shrink-0" style={{ color: "#C4922A" }} />
            +48 000 000 000
          </a>
        </div>
      </div>

      <div
        className="mt-2 text-center"
        style={{
          background: "#1A2430",
          padding: "20px",
          border: "1px solid rgba(37,51,68,0.9)",
        }}
      >
        <p
          className="mb-2"
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "9px",
            letterSpacing: "4px",
            color: "#7A8A96",
            fontWeight: 700,
            margin: 0,
            marginBottom: "8px",
          }}
        >
          {c.questionsLabel}
        </p>
        <a
          href="/kontakt"
          className="inline-flex items-center gap-2 transition-colors duration-200"
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            color: "#C4922A",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "rgba(196,146,42,0.85)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#C4922A";
          }}
        >
          {c.contactUs}
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </aside>
  );
}
