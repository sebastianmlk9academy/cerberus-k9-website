"use client";

import { useState } from "react";
import type { Lang } from "../i18n/utils";
import type { LatestNewsCopy } from "../i18n/latestNews";
import { latestNewsByLang } from "../i18n/latestNews";

interface ButtonProps {
  children: React.ReactNode;
  href: string;
}

function CTAButton({ children, href }: ButtonProps) {
  return (
    <a
      href={href}
      className="cursor-pointer transition-colors w-full sm:w-auto text-[10px] sm:text-[11px] px-5 py-3 sm:px-6 sm:py-3.5"
      style={{
        display: "inline-block",
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
      {children}
    </a>
  );
}

interface LatestNewsProps {
  lang: Lang;
  copy?: LatestNewsCopy;
  articles?: any[];
}

function NewsCardComponent({
  card,
  lang,
  readMore,
}: {
  card: any;
  lang: Lang;
  readMore: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const articleHref = `/${lang}/aktualnosci/${card.slug}`;

  return (
    <a
      href={articleHref}
      className="block cursor-pointer"
      style={{ textDecoration: "none", display: "contents" }}
    >
      <article
        className="cursor-pointer overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: "#1E2B38",
          borderTop: isHovered ? "3px solid #C4922A" : "3px solid transparent",
          transform: isHovered ? "scale(1.005)" : "scale(1)",
          display: "grid",
          gridTemplateRows: "subgrid",
          gridRow: "span 5",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Area */}
        <div
          className="relative overflow-hidden w-full"
          style={{
            backgroundColor: "#151E28",
            aspectRatio: "16 / 9",
          }}
        >
          {/* Article Image */}
          <img
            src={card.image}
            alt={card.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
            style={{
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />

          {/* Category Badge Top-Left */}
          <span
            className="absolute top-3 left-3 font-[family-name:var(--font-rajdhani)] uppercase"
            style={{
              backgroundColor: "rgba(196, 43, 43, 0.85)",
              color: "white",
              fontSize: "8px",
              letterSpacing: "2px",
              padding: "4px 8px",
            }}
          >
            {card.category}
          </span>

          {/* Date Badge Top-Right */}
          <span
            className="absolute top-3 right-3 font-[family-name:var(--font-rajdhani)]"
            style={{
              backgroundColor: "rgba(15, 23, 32, 0.85)",
              color: "#C4922A",
              fontSize: "10px",
              padding: "4px 8px",
            }}
          >
            {card.date}
          </span>
        </div>

        {/* Content Area */}
        <div style={{ padding: "18px 16px", display: "contents" }}>
          {/* Category Small Text */}
          <span
            className="block font-[family-name:var(--font-rajdhani)] uppercase"
            style={{
              fontSize: "8px",
              letterSpacing: "3px",
              color: "#C4922A",
              fontWeight: 700,
              marginBottom: "8px",
              paddingLeft: "16px",
              paddingTop: "18px",
            }}
          >
            {card.category}
          </span>

          {/* Title */}
          <h3
            className="font-[family-name:var(--font-rajdhani)]"
            style={{
              fontSize: "17px",
              color: "#E4DDD0",
              fontWeight: 700,
              lineHeight: 1.3,
              marginBottom: "8px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          >
            {card.title}
          </h3>

          {/* Lead Text */}
          <p
            className="font-[family-name:var(--font-libre)]"
            style={{
              fontSize: "12px",
              color: "#5A6A7A",
              lineHeight: 1.6,
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          >
            {card.lead}
          </p>

          {/* Read More Link */}
          <span
            className="font-[family-name:var(--font-rajdhani)] uppercase inline-block transition-opacity hover:opacity-80"
            style={{
              fontSize: "9px",
              letterSpacing: "2px",
              color: "#C4922A",
              marginTop: "12px",
              paddingLeft: "16px",
              paddingBottom: "18px",
            }}
          >
            {readMore} →
          </span>
        </div>
      </article>
    </a>
  );
}

export default function LatestNews({ lang, copy, articles }: LatestNewsProps) {
  const safeCopy = copy ?? latestNewsByLang[lang] ?? latestNewsByLang.pl;
  const safeArticles = (articles ?? [])
    .slice()
    .sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 3);
  return (
    <section
      className="bg-gradient-to-b from-[#161F28] via-[#1A2530] to-[#161F28] px-4 sm:px-6 lg:px-[5%]"
      style={{ paddingTop: "80px", paddingBottom: "10px" }}
    >
      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-12">
        {/* Tag */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C42B2B]/40 to-transparent" />
          <span 
            className="font-[family-name:var(--font-rajdhani)] text-[12px] font-medium tracking-[5px] text-[#C42B2B]"
          >
            {safeCopy.sectionTag}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C42B2B]/40 to-transparent" />
        </div>

        {/* Title */}
        <h2
          className="font-[family-name:var(--font-rajdhani)] uppercase text-2xl sm:text-3xl lg:text-[32px]"
          style={{
            fontWeight: 700,
            color: "#E4DDD0",
            letterSpacing: "2px",
          }}
        >
          {safeCopy.sectionTitle}
        </h2>
      </div>

      {/* News Cards Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto"
        style={{
          gap: "2px",
          backgroundColor: "#1A2230",
          maxWidth: "1200px",
        }}
      >
        {safeArticles.map((card, index) => (
          <NewsCardComponent key={index} card={card} lang={lang} readMore={safeCopy.readMore} />
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center mt-8 sm:mt-12">
        <CTAButton href={`/${lang}/aktualnosci`}>{safeCopy.allNews} →</CTAButton>
      </div>
    </section>
  );
}
