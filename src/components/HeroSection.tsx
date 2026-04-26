"use client";

import { useEffect, useState } from "react";
import type { Lang } from "../i18n/utils";
import type { HomeHeroCopy } from "../i18n/homeHero";
import { homeHeroCopyByLang } from "../i18n/homeHero";
import { ui } from "../i18n/ui";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(eventDateIso: string): TimeLeft {
  const targetDate = new Date(`${eventDateIso}T10:00:00+02:00`);
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

interface HeroSectionProps {
  lang: Lang;
  copy: HomeHeroCopy;
  /** ISO date `YYYY-MM-DD` for countdown (event start 10:00 Europe/Warsaw). */
  eventDate?: string;
  heroImage?: string;
  heroOpacity?: number;
}

export function HeroSection({ lang, copy, eventDate, heroImage, heroOpacity }: HeroSectionProps) {
  const safeCopy: HomeHeroCopy = copy ?? homeHeroCopyByLang.pl;
  const eventDateIso = eventDate?.trim() || "2026-06-13";
  const bgUrl = heroImage?.trim() || "/images/page_hero_graph.webp";
  const bgOpacity = heroOpacity ?? 0.4;
  const safeUi = ui[lang] ?? ui.pl;
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft(eventDateIso));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(eventDateIso));
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDateIso]);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <section
      className="relative w-full min-h-screen sm:min-h-[90vh] flex flex-col justify-center px-4 sm:px-[5%] py-[80px] overflow-hidden"
      style={{
        backgroundColor: "#1E2B38",
      }}
    >
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
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `
            linear-gradient(to right, rgba(30,43,56,0.95) 0%, rgba(30,43,56,0.7) 50%, rgba(30,43,56,0.4) 100%),
            radial-gradient(circle at 85% 15%, rgba(196,146,42,0.1) 0%, transparent 60%),
            radial-gradient(circle at 40% 85%, rgba(196,43,43,0.08) 0%, transparent 50%)
          `,
        }}
      />
      {/* Section 1: Top Tagline */}
      <div className="relative z-10 flex items-center mb-3 sm:mb-4">
        <span
          className="inline-block w-5 sm:w-7 h-px mr-2 sm:mr-2.5"
          style={{ backgroundColor: "#C42B2B" }}
        />
        <span
          className="text-[7px] sm:text-[8px] md:text-[9px]"
          style={{
            fontFamily: "var(--font-rajdhani), sans-serif",
            letterSpacing: "3px",
            fontWeight: 700,
            color: "#C42B2B",
          }}
        >
          {(ui[lang] as any)?.hero_tag ?? safeCopy.tagline}
        </span>
      </div>

      {/* Section 2: Main Headline */}
      <div className="relative z-10 mb-0">
        <h1
          className="text-[clamp(40px,12vw,96px)] sm:text-[clamp(56px,10vw,96px)]"
          style={{
            fontFamily: "var(--font-bebas-neue), sans-serif",
            color: "#E4DDD0",
            lineHeight: 0.88,
            letterSpacing: "2px",
            margin: 0,
          }}
        >
          CERBERUS
        </h1>
        <h1
          className="text-[clamp(40px,12vw,96px)] sm:text-[clamp(56px,10vw,96px)]"
          style={{
            fontFamily: "var(--font-bebas-neue), sans-serif",
            lineHeight: 0.88,
            letterSpacing: "2px",
            margin: 0,
          }}
        >
          <span style={{ color: "#C42B2B" }}>K9</span>
          <span style={{ color: "#E4DDD0" }}> 2026</span>
        </h1>
      </div>

      {/* Section 3: Sub-headline */}
      <p
        className="relative z-10 mt-3 sm:mt-4 mb-5 sm:mb-7 text-[9px] sm:text-[10px] md:text-[11px]"
        style={{
          fontFamily: "var(--font-rajdhani), sans-serif",
          letterSpacing: "3px",
          fontWeight: 700,
          color: "#7A8A96",
        }}
      >
        {((ui[lang] as any)?.hero_free ?? safeCopy.dateLocation)}
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

      {/* Section 5: Meta Info Row */}
      <div className="relative z-10 flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
        <MetaInfoItem
          label={safeCopy.metaRow1}
          value={safeCopy.metaRow1Value}
        />
        <MetaInfoItem
          label={safeCopy.metaRow2}
          value={safeCopy.metaRow2Value}
        />
        <MetaInfoItem
          label={safeCopy.metaRow3}
          value={safeCopy.metaRow3Value}
        />
      </div>

      {/* Section 6: CTA Buttons Row */}
      <div className="relative z-10 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-3">
        <a
          href={`/${lang}/rejestracja`}
          className="inline-block text-center cursor-pointer transition-colors w-full sm:w-auto text-[10px] sm:text-[11px] px-5 py-3 sm:px-8 sm:py-3.5 no-underline"
          style={{
            backgroundColor: "#C42B2B",
            color: "white",
            fontFamily: "var(--font-rajdhani), sans-serif",
            letterSpacing: "3px",
            fontWeight: 700,
            borderRadius: 0,
            border: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#9E1F1F")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#C42B2B")}
        >
          {safeCopy.ctaRegister}
        </a>
        <a
          href={safeCopy.ctaProgramHref}
          className="inline-block text-center cursor-pointer transition-colors w-full sm:w-auto text-[10px] sm:text-[11px] px-5 py-3 sm:px-6 sm:py-3.5 no-underline"
          style={{
            backgroundColor: "transparent",
            color: "#C4922A",
            fontFamily: "var(--font-rajdhani), sans-serif",
            letterSpacing: "3px",
            fontWeight: 700,
            borderRadius: 0,
            border: "1px solid #C4922A",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#C4922A";
            e.currentTarget.style.color = "#1E2B38";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#C4922A";
          }}
        >
          {safeCopy.ctaProgram}
        </a>
        <a
          href={safeCopy.ctaVideoHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-center cursor-pointer transition-colors w-full sm:w-auto text-[10px] sm:text-[11px] px-5 py-3 sm:px-5 sm:py-3.5 no-underline"
          style={{
            backgroundColor: "transparent",
            color: "#7A8A96",
            fontFamily: "var(--font-rajdhani), sans-serif",
            letterSpacing: "3px",
            fontWeight: 700,
            borderRadius: 0,
            border: "1px solid #253344",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#253344";
            e.currentTarget.style.color = "#E4DDD0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#7A8A96";
          }}
        >
          {safeCopy.ctaVideo}
        </a>
      </div>
    </section>
  );
}

function CountdownBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative text-center px-3 py-2.5 sm:px-4 sm:py-3 md:px-5 md:py-4 min-w-[56px] sm:min-w-[70px] md:min-w-[80px]"
        style={{
          background: "linear-gradient(135deg, rgba(15,23,32,0.95) 0%, rgba(30,43,56,0.9) 100%)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(196,146,42,0.3)",
          borderRadius: "8px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-6 sm:w-8"
          style={{
            background: "linear-gradient(90deg, transparent, #C4922A, transparent)",
          }}
        />
        <div
          className="text-[32px] sm:text-[40px] md:text-[48px]"
          style={{
            fontFamily: "var(--font-bebas-neue), sans-serif",
            background: "linear-gradient(180deg, #D4A84A 0%, #C4922A 50%, #A67B1E 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1,
            textShadow: "0 2px 20px rgba(196,146,42,0.3)",
          }}
        >
          {value}
        </div>
      </div>
      <div
        className="mt-1.5 sm:mt-2 text-[8px] sm:text-[9px] md:text-[10px]"
        style={{
          fontFamily: "var(--font-rajdhani), sans-serif",
          letterSpacing: "2px",
          color: "#7A8A96",
          fontWeight: 700,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function Separator() {
  return (
    <span
      className="self-start mt-2.5 sm:mt-3 md:mt-4 text-[24px] sm:text-[28px] md:text-[32px]"
      style={{
        fontFamily: "var(--font-bebas-neue), sans-serif",
        color: "#C4922A",
        opacity: 0.5,
      }}
    >
      :
    </span>
  );
}

function MetaInfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="pl-2.5 sm:pl-3 max-w-full sm:max-w-[280px] md:max-w-none"
      style={{
        borderLeft: "2px solid #C4922A",
      }}
    >
      <div
        className="text-[7px] sm:text-[8px] mb-0.5"
        style={{
          fontFamily: "var(--font-rajdhani), sans-serif",
          letterSpacing: "3px",
          color: "#7A8A96",
          fontWeight: 700,
        }}
      >
        {label}
      </div>
      <div
        className="text-[11px] sm:text-[12px] md:text-[13px] leading-tight"
        style={{
          fontFamily: "var(--font-rajdhani), sans-serif",
          color: "#E4DDD0",
          fontWeight: 700,
        }}
      >
        {value}
      </div>
    </div>
  );
}
