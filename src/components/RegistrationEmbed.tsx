import { useState } from "react";
import { Calendar, MapPin, Ticket, AlertCircle, Mail, Phone, ExternalLink, ChevronDown } from "lucide-react";

const PretixWidget = "pretix-widget" as unknown as React.ComponentType<{
  event: string;
  "skip-ssl-check"?: string;
  "single-item-select"?: string;
}>;

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
              <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
                Rejestracja na Cerberus K9 2026
              </h2>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-cerberus-gold">
                Wstęp bezpłatny · Wymagana rejestracja
              </p>
            </div>

            {/* Step-by-step notice */}
            <div className="mb-3 rounded-lg border border-cerberus-gold/40 bg-white/5 p-3 backdrop-blur-sm sm:mb-4 sm:p-5">
              <button
                type="button"
                onClick={() => setShowInstructions((v) => !v)}
                aria-expanded={showInstructions}
                aria-controls="registration-steps"
                className="flex w-full items-center justify-between gap-2 text-left sm:pointer-events-none sm:cursor-default"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-cerberus-gold sm:text-xs sm:tracking-[0.2em]">
                  Jak się zarejestrować — 3 kroki
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-cerberus-gold transition-transform sm:hidden ${
                    showInstructions ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              <ol
                id="registration-steps"
                className={`${
                  showInstructions ? "mt-2 block" : "hidden"
                } space-y-1.5 text-[13px] leading-snug text-white/90 sm:mt-3 sm:block sm:space-y-2 sm:text-sm sm:leading-normal`}
              >
                <li className="flex gap-2 sm:gap-3">
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cerberus-gold text-[11px] font-bold sm:h-6 sm:w-6 sm:text-xs"
                    style={{ color: "#1E2B38" }}
                  >
                    1
                  </span>
                  <span>
                    Wybierz bilet i kliknij{" "}
                    <strong>„Zarejestruj"</strong> / <strong>„Dalej"</strong>.
                  </span>
                </li>
                <li className="flex gap-2 sm:gap-3">
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cerberus-gold text-[11px] font-bold sm:h-6 sm:w-6 sm:text-xs"
                    style={{ color: "#1E2B38" }}
                  >
                    2
                  </span>
                  <span>
                    Finalizacja otworzy się w nowym oknie Pretix — zezwól na
                    wyskakujące okna.
                  </span>
                </li>
                <li className="flex gap-2 sm:gap-3">
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cerberus-gold text-[11px] font-bold sm:h-6 sm:w-6 sm:text-xs"
                    style={{ color: "#1E2B38" }}
                  >
                    3
                  </span>
                  <span>
                    Jeśli przyciski nie reagują, użyj linku{" "}
                    <strong className="text-cerberus-gold">
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
                className="mt-3 inline-flex items-center gap-2 rounded-md bg-cerberus-gold px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-cerberus-gold/90 sm:mt-4 sm:text-[13px]"
                style={{ color: "#1E2B38" }}
              >
                Otwórz pełny formularz rejestracji
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div
              className="rounded-lg bg-white p-4 sm:p-6"
              style={{ minHeight: 600 }}
            >
              <PretixWidget event="https://pretix.eu/MLK9-LLK9/CERBERUS/" />
              <noscript>
                Rejestruj się na:{" "}
                <a
                  href="https://pretix.eu/MLK9-LLK9/CERBERUS/"
                  className="text-cerberus-gold underline"
                >
                  https://pretix.eu/MLK9-LLK9/CERBERUS/
                </a>
              </noscript>
            </div>

            <div className="mt-4 rounded-lg border border-cerberus-gold/40 bg-cerberus-gold/10 p-4">
              <p className="mb-3 text-sm text-white/90">
                <strong className="text-cerberus-gold">Wskazówka:</strong> Po
                wybraniu biletu, finalizacja zamówienia (dane osobowe,
                potwierdzenie) odbywa się na stronie Pretix. Jeśli przycisk
                „Dalej / Kontynuuj" nie działa w osadzonym formularzu, otwórz
                rejestrację w nowym oknie:
              </p>
              <a
                href="https://pretix.eu/MLK9-LLK9/CERBERUS/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-cerberus-gold px-5 py-3 text-sm font-bold uppercase tracking-wider text-cerberus-dark transition-colors hover:bg-cerberus-gold/90"
                style={{ color: "#1E2B38" }}
              >
                Otwórz pełny formularz rejestracji
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* RIGHT — Info sidebar */}
          <aside className="flex flex-col gap-4">
            {/* Card 1 — TERMIN */}
            <div className="rounded-lg border-l-4 border-cerberus-gold bg-white/5 p-5 backdrop-blur-sm">
              <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-cerberus-gold">
                <Calendar className="h-4 w-4" />
                Termin
              </div>
              <p className="font-display text-2xl font-bold text-white">
                13–14 czerwca 2026
              </p>
              <p className="mt-1 text-sm text-white/70">
                Dzień przygotowawczy: 12 czerwca
              </p>
            </div>

            {/* Card 2 — MIEJSCE */}
            <div className="rounded-lg bg-white/5 p-5 backdrop-blur-sm">
              <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                <MapPin className="h-4 w-4" />
                Miejsce
              </div>
              <p className="text-base font-semibold leading-relaxed text-white">
                3MK Arena, Szkoła Mundurowa, Stadion Miejski
              </p>
              <p className="mt-1 text-sm text-white/70">Ostrów Wielkopolski</p>
            </div>

            {/* Card 3 — WSTĘP */}
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-5">
              <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
                <Ticket className="h-4 w-4" />
                Wstęp
              </div>
              <p className="font-display text-3xl font-bold uppercase text-cerberus-gold">
                Bezpłatny
              </p>
              <p className="mt-2 text-xs leading-relaxed text-white/70">
                Finansowany z dotacji samorządowych art. 19a UPPP
              </p>
            </div>

            {/* Card 4 — DEADLINE */}
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-5">
              <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-red-300">
                <AlertCircle className="h-4 w-4" />
                Uwaga
              </div>
              <p className="font-display text-lg font-bold uppercase text-white">
                Liczba miejsc ograniczona
              </p>
              <p className="mt-1 text-sm text-white/80">Zarejestruj się teraz</p>
            </div>

            {/* Card 5 — KONTAKT */}
            <div className="rounded-lg bg-white/5 p-5 backdrop-blur-sm">
              <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                Kontakt — rejestracja
              </div>
              <div className="space-y-2">
                <a
                  href="mailto:rejestracja@cerberusk9.pl"
                  className="flex items-center gap-2 text-sm text-white transition-colors hover:text-cerberus-gold"
                >
                  <Mail className="h-4 w-4 text-cerberus-gold" />
                  rejestracja@cerberusk9.pl
                </a>
                <a
                  href="tel:+48000000000"
                  className="flex items-center gap-2 text-sm text-white transition-colors hover:text-cerberus-gold"
                >
                  <Phone className="h-4 w-4 text-cerberus-gold" />
                  +48 000 000 000
                </a>
              </div>
            </div>

            {/* Below sidebar */}
            <div className="mt-2 rounded-lg border border-white/10 p-5 text-center">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                Masz pytania o rejestrację?
              </p>
              <a
                href="/kontakt"
                className="inline-flex items-center gap-2 text-sm font-semibold text-cerberus-gold transition-colors hover:text-cerberus-gold/80"
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
