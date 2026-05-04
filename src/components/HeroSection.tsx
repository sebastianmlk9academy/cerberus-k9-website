"use client";

import { useEffect, useState } from "react";
import LiveRegistrationCounter from "./LiveRegistrationCounter";
import type { Lang } from "../i18n/utils";
import { isLang } from "../i18n/utils";
import type { HomeHeroCopy } from "../i18n/homeHero";
import { homeHeroCopyByLang } from "../i18n/homeHero";
import { ui } from "../i18n/ui";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(
  eventDateIso: string | undefined,
  timeStr: string,
  tzOffset: string
): TimeLeft {
  const targetDate = eventDateIso
    ? new Date(`${eventDateIso}T${timeStr}:00${tzOffset}`)
    : new Date("2026-06-13T10:00:00+02:00");
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export interface HeroSectionProps {
  lang?: string;
  eventDate?: string;
  eventDateISO?: string;
  location?: string;
  tagline?: string;
  subtitle?: string;
  registrationUrl?: string;
  registrationActive?: boolean;
  showLiveCounter?: boolean;
  /** Maks. miejsc na liczniku rejestracji (np. z CMS `participants_count`). */
  participantsMax?: number;
  eventTimeStart?: string;
  eventTimezone?: string;
  heroImage?: string;
  heroOpacity?: number;
  heroTitle?: string;
  heroTitleLine2?: string;
  heroYear?: string;
  heroSublinePl?: string;
  heroVideoHref?: string;
  heroVideoTitle?: string;
  heroCloseLabelPl?: string;
  heroMetaDelegations?: string;
  heroMetaEntry?: string;
  ctaProgramHref?: string;
}

export function HeroSection(props: HeroSectionProps) {
  const {
    lang: langProp,
    eventDate,
    eventDateISO,
    location,
    tagline,
    subtitle,
    registrationUrl,
    registrationActive = true,
    showLiveCounter = false,
    participantsMax,
    eventTimeStart = "10:00",
    eventTimezone = "Europe/Warsaw",
    heroImage,
    heroOpacity,
    heroTitle,
    heroTitleLine2,
    heroYear,
    heroSublinePl,
    heroVideoHref,
    heroVideoTitle,
    heroCloseLabelPl = "ZAMKNIJ",
    heroMetaDelegations,
    heroMetaEntry,
    ctaProgramHref,
  } = props;

  const lang: Lang = langProp && isLang(langProp) ? langProp : "pl";
  const safeCopy: HomeHeroCopy = homeHeroCopyByLang[lang] ?? homeHeroCopyByLang.pl;
  const metaRow1Value = location?.trim() || safeCopy.metaRow1Value;
  const metaRow2Value =
    heroMetaDelegations?.trim() || eventDate?.trim() || safeCopy.metaRow2Value;
  const metaRow3Value = heroMetaEntry?.trim() || safeCopy.metaRow3Value;
  const timeStr = eventTimeStart ?? "10:00";
  const tzOffset = eventTimezone === "Europe/Warsaw" ? "+02:00" : "+00:00";
  const eventDateIso = eventDateISO?.trim() || undefined;
  const bgUrl = heroImage?.trim() || "/images/page_hero_graph.webp";
  const bgOpacity = heroOpacity ?? 0.4;
  const safeUi = ui[lang] ?? ui.pl;
  const registerCtaLabel =
    (safeUi as { btn_register?: string }).btn_register ?? safeCopy.ctaRegister;
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [hoverRegister, setHoverRegister] = useState(false);
  const [hoverProgram, setHoverProgram] = useState(false);
  const [hoverVideo, setHoverVideo] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft(eventDateIso, timeStr, tzOffset));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(eventDateIso, timeStr, tzOffset));
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDateIso, timeStr, tzOffset]);

  useEffect(() => {
    document.body.style.overflow = videoOpen ? "hidden" : "";
    if (!videoOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVideoOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [videoOpen]);

  const formatNumber = (num: number) => String(num).padStart(2, "0");
  const resolvedYear =
    heroYear?.trim() ||
    (eventDateIso ? String(new Date(`${eventDateIso}T12:00:00Z`).getFullYear()) : "2026");
  const registerHref = registrationUrl?.trim() || `/${lang}/rejestracja`;
  const programHref = ctaProgramHref?.trim() || `/${lang}/o-wydarzeniu#agenda`;
  const videoHref = heroVideoHref?.trim() || safeCopy.ctaVideoHref;

  return (
    <section className="relative w-full min-h-screen sm:min-h-[90vh] flex flex-col justify-center px-4 sm:px-[5%] py-[80px] overflow-hidden bg-navy">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${bgUrl.replace(/'/g, "\\'")}')`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: bgOpacity,
        }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/70 to-navy/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,theme(colors.gold)/10,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_85%,theme(colors.red)/8,transparent_50%)]" />
      </div>
      {/* Section 1: Top Tagline */}
      <div className="relative z-10 flex items-center mb-3 sm:mb-4">
        <span className="inline-block w-5 sm:w-7 h-px mr-2 sm:mr-2.5 bg-red" />
        <span
          className="text-[10px] sm:text-[11px] md:text-[12px] text-red font-bold tracking-[3px]"
          style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
        >
          {tagline ?? (ui[lang] as { hero_tag?: string }).hero_tag ?? safeCopy.tagline}
        </span>
      </div>

      {/* Section 2: Main Headline */}
      <div className="relative z-10 mb-0">
        <h1
          className="text-[clamp(40px,12vw,96px)] sm:text-[clamp(56px,10vw,96px)] text-bone m-0"
          style={{
            fontFamily: "var(--font-bebas-neue), sans-serif",
            lineHeight: 0.88,
            letterSpacing: "2px",
          }}
        >
          {heroTitle?.trim() || "CERBERUS"}
        </h1>
        <h1
          className="text-[clamp(40px,12vw,96px)] sm:text-[clamp(56px,10vw,96px)] m-0"
          style={{
            fontFamily: "var(--font-bebas-neue), sans-serif",
            lineHeight: 0.88,
            letterSpacing: "2px",
          }}
        >
          <span className="text-red">{heroTitleLine2 ?? subtitle ?? "K9"}</span>
          <span className="text-bone"> {resolvedYear}</span>
        </h1>
      </div>

      {/* Section 3: Sub-headline */}
      <p
        className="relative z-10 mt-3 sm:mt-4 mb-5 sm:mb-7 text-[11px] sm:text-[12px] md:text-[12px] text-muted font-bold tracking-[3px]"
        style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
      >
        {heroSublinePl ??
          (ui[lang] as { hero_free?: string }).hero_free ??
          "WSTĘP BEZPŁATNY"}
      </p>

      {/* Section 4: Countdown Timer */}
      <div className="relative z-10 flex items-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 flex-wrap">
        {mounted && (
          <>
            <CountdownBlock value={formatNumber(timeLeft.days)} label={safeUi.countdown_days} />
            <Separator />
            <CountdownBlock value={formatNumber(timeLeft.hours)} label={safeUi.countdown_hours} />
            <Separator />
            <CountdownBlock value={formatNumber(timeLeft.minutes)} label={safeUi.countdown_minutes} />
            <Separator />
            <CountdownBlock value={formatNumber(timeLeft.seconds)} label={safeUi.countdown_seconds} />
          </>
        )}
        {!mounted && (
          <>
            <CountdownBlock value="--" label={safeUi.countdown_days} />
            <Separator />
            <CountdownBlock value="--" label={safeUi.countdown_hours} />
            <Separator />
            <CountdownBlock value="--" label={safeUi.countdown_minutes} />
            <Separator />
            <CountdownBlock value="--" label={safeUi.countdown_seconds} />
          </>
        )}
      </div>

      {showLiveCounter && (
        <LiveRegistrationCounter
          maxCount={participantsMax ?? 250}
          lang={lang}
        />
      )}

      {/* Section 5: Meta Info Row */}
      <div className="relative z-10 flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
        <MetaInfoItem label={safeCopy.metaRow1} value={metaRow1Value} />
        <MetaInfoItem label={safeCopy.metaRow2} value={metaRow2Value} />
        <MetaInfoItem label={safeCopy.metaRow3} value={metaRow3Value} />
      </div>

      {/* Section 6: CTA Buttons Row */}
      <div className="relative z-10 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-3">
        {registrationActive !== false && (
          <a
            href={registerHref}
            className="inline-block text-center cursor-pointer transition-colors duration-200 w-full sm:w-auto text-[11px] sm:text-[12px] px-5 py-3 sm:px-8 sm:py-3.5 no-underline font-bold tracking-[3px] rounded-none border-0"
            style={{
              fontFamily: "var(--font-rajdhani), sans-serif",
              backgroundColor: hoverRegister ? "#9E1F1F" : "#C42B2B",
              color: "white",
            }}
            onMouseEnter={() => setHoverRegister(true)}
            onMouseLeave={() => setHoverRegister(false)}
          >
            {registerCtaLabel}
          </a>
        )}
        <a
          href={programHref}
          className="inline-block text-center cursor-pointer transition-colors duration-200 w-full sm:w-auto text-[11px] sm:text-[12px] px-5 py-3 sm:px-6 sm:py-3.5 no-underline font-bold tracking-[3px] rounded-none"
          style={{
            fontFamily: "var(--font-rajdhani), sans-serif",
            backgroundColor: hoverProgram ? "#C4922A" : "transparent",
            color: hoverProgram ? "#1E2B38" : "#C4922A",
            border: "1px solid #C4922A",
          }}
          onMouseEnter={() => setHoverProgram(true)}
          onMouseLeave={() => setHoverProgram(false)}
        >
          {safeCopy.ctaProgram}
        </a>
        <button
          type="button"
          onClick={() => setVideoOpen(true)}
          className="inline-block text-center cursor-pointer transition-colors duration-200 w-full sm:w-auto text-[11px] sm:text-[12px] px-5 py-3 sm:px-8 sm:py-3.5 no-underline font-bold tracking-[3px] rounded-none border-0"
          style={{
            fontFamily: "var(--font-rajdhani), sans-serif",
            backgroundColor: hoverVideo ? "#005B99" : "#253344",
            color: hoverVideo ? "#B0BEC5" : "#FFFFFF",
          }}
          onMouseEnter={() => setHoverVideo(true)}
          onMouseLeave={() => setHoverVideo(false)}
        >
          {safeCopy.ctaVideo}
        </button>
      </div>
      {videoOpen && (
        <>
          <div
            onClick={() => setVideoOpen(false)}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-navyDeep/85 backdrop-blur-md"
            role="presentation"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-[90vw] max-w-[960px] aspect-video bg-navyDeep border border-gold/30 shadow-[0_24px_80px_rgba(0,0,0,0.8)]"
            >
              <button
                type="button"
                onClick={() => setVideoOpen(false)}
                className="absolute -top-10 right-0 bg-transparent border-0 text-bone cursor-pointer flex items-center gap-2 text-xs font-bold tracking-[3px]"
                style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
              >
                {heroCloseLabelPl ?? "ZAMKNIJ"} ✕
              </button>

              <iframe
                src={`${videoHref.replace("watch?v=", "embed/").replace("youtu.be/", "www.youtube.com/embed/")}?autoplay=1&rel=0&modestbranding=1`}
                title={heroVideoTitle ?? "CERBERUS K9 2026 — Relacja"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
}

function CountdownBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative text-center px-3 py-2.5 sm:px-4 sm:py-3 md:px-5 md:py-4 min-w-[56px] sm:min-w-[70px] md:min-w-[80px] rounded-lg border border-gold/30 shadow-[0_4px_24px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-[10px] bg-gradient-to-br from-navyDeep/95 to-navy/90"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-6 sm:w-8 bg-[linear-gradient(90deg,transparent,theme(colors.gold),transparent)]" />
        <div
          className="text-[32px] sm:text-[40px] md:text-[48px] leading-none"
          style={{ fontFamily: "var(--font-bebas-neue), sans-serif", color: "#C4922A" }}
        >
          {value}
        </div>
      </div>
      <div
        className="mt-1.5 sm:mt-2 text-[10px] sm:text-[10px] md:text-[11px] font-bold tracking-[2px]"
        style={{ fontFamily: "var(--font-rajdhani), sans-serif", color: "#7A8A96" }}
      >
        {label}
      </div>
    </div>
  );
}

function Separator() {
  return (
    <span
      className="self-start mt-2.5 sm:mt-3 md:mt-4 text-[24px] sm:text-[28px] md:text-[32px] text-gold/50"
      style={{ fontFamily: "var(--font-bebas-neue), sans-serif" }}
    >
      :
    </span>
  );
}

function MetaInfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="pl-2.5 sm:pl-3 max-w-full sm:max-w-[280px] md:max-w-none border-l-2 border-gold">
      <div
        className="text-[10px] sm:text-[10px] mb-0.5 text-muted font-bold tracking-[3px]"
        style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
      >
        {label}
      </div>
      <div
        className="text-[11px] sm:text-[12px] md:text-[13px] leading-tight text-bone font-bold"
        style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
      >
        {value}
      </div>
    </div>
  );
}
