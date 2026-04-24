import { useState, type MouseEvent } from "react";
import { Calendar, MapPin, Ticket, AlertCircle, Mail, Phone, ExternalLink, ChevronDown } from "lucide-react";

const PretixWidget = "pretix-widget" as unknown as React.ComponentType<{
  event: string;
  "skip-ssl-check"?: string;
  "single-item-select"?: string;
}>;

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

export default function RegistrationEmbed() {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <section
      id="rejestracja"
      className="w-full"
      style={{ backgroundColor: "#1E2B38", padding: "80px 5%" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[65%_35%] lg:gap-8">
          {/* LEFT — Pretix iframe */}
          <div>
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
                Rejestracja na Cerberus K9 2026
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
                Wstęp bezpłatny · Wymagana rejestracja
              </p>
            </div>

            {/* Step-by-step notice */}
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
                  Jak się zarejestrować — 3 kroki
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
                    Wybierz bilet i kliknij{" "}
                    <strong>„Zarejestruj"</strong> / <strong>„Dalej"</strong>.
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
                    Finalizacja otworzy się w nowym oknie Pretix — zezwól na
                    wyskakujące okna.
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
                    Jeśli przyciski nie reagują, użyj linku{" "}
                    <strong style={{ color: "#C4922A" }}>
                      „Otwórz pełny formularz"
                    </strong>{" "}
                    pod widgetem.
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
                Otwórz pełny formularz rejestracji
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div
              style={{
                background: "#0F1720",
                padding: "4px",
                minHeight: "600px",
              }}
            >
              <PretixWidget event="https://pretix.eu/MLK9-LLK9/CERBERUS/" />
              <noscript>
                Rejestruj się na:{" "}
                <a
                  href="https://pretix.eu/MLK9-LLK9/CERBERUS/"
                  style={{ color: "#C4922A", textDecoration: "underline" }}
                >
                  https://pretix.eu/MLK9-LLK9/CERBERUS/
                </a>
              </noscript>
            </div>

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
                <strong style={{ color: "#C4922A" }}>Wskazówka:</strong> Po
                wybraniu biletu, finalizacja zamówienia (dane osobowe,
                potwierdzenie) odbywa się na stronie Pretix. Jeśli przycisk
                „Dalej / Kontynuuj" nie działa w osadzonym formularzu, otwórz
                rejestrację w nowym oknie:
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
                Otwórz pełny formularz rejestracji
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* RIGHT — Info sidebar */}
          <aside className="flex flex-col gap-4">
            {/* Card 1 — TERMIN */}
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
                Termin
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
                13–14 czerwca 2026
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
                Dzień przygotowawczy: 12 czerwca
              </p>
            </div>

            {/* Card 2 — MIEJSCE */}
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
                Miejsce
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
                Ostrów Wielkopolski
              </p>
            </div>

            {/* Card 3 — WSTĘP */}
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
                Wstęp
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
                Bezpłatny
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
                Finansowany z dotacji samorządowych art. 19a UPPP
              </p>
            </div>

            {/* Card 4 — DEADLINE */}
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
                Uwaga
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
                Liczba miejsc ograniczona
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
                Zarejestruj się teraz
              </p>
            </div>

            {/* Card 5 — KONTAKT */}
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
                Kontakt — rejestracja
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

            {/* Below sidebar */}
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
                Masz pytania o rejestrację?
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
                Skontaktuj się z nami
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </aside>
        </div>
      </div>

      {/* Pretix widget responsive override */}
      <style>{`
        pretix-widget { display: block; width: 100%; }
        .pretix-widget-wrapper { max-width: 100% !important; }
      `}</style>
    </section>
  );
}
