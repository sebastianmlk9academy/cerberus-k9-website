"use client";

import { useState } from "react";

interface ButtonProps {
  children: React.ReactNode;
}

function CTAButton({ children }: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className="font-[family-name:var(--font-rajdhani)] uppercase transition-all duration-300"
      style={{
        fontSize: "11px",
        letterSpacing: "2px",
        color: isHovered ? "#151E28" : "#E4DDD0",
        border: "1px solid #C4922A",
        padding: "14px 32px",
        backgroundColor: isHovered ? "#C4922A" : "transparent",
        cursor: "pointer",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
}

interface NewsCard {
  category: string;
  title: string;
  date: string;
  lead: string;
  image: string;
}

const newsData: NewsCard[] = [
  {
    category: "AKTUALNOŚCI",
    title: "Potwierdzony udział US Police K9 SWAT na CERBERUS K9 2026",
    date: "15.04.2026",
    lead: "Oficjalnie potwierdzamy udział przewodnika K9 SWAT z USA wraz z pozorantem szkolącym jednostki specjalne.",
    image: "/images/news-swat-k9.jpg",
  },
  {
    category: "REJESTRACJA",
    title: "Rejestracja otwarta — 250 miejsc, wstęp bezpłatny",
    date: "01.04.2026",
    lead: "Rejestracja na CERBERUS K9 2026 jest już dostępna. Liczba miejsc ograniczona. Wejście bezpłatne dla wszystkich uczestników.",
    image: "/images/news-registration.jpg",
  },
  {
    category: "PARTNERZY",
    title: "Marynarka Wojenna Portugalii dołącza do CERBERUS K9 2026",
    date: "20.03.2026",
    lead: "Jednostka K9 Marinha Portuguesa potwierdza udział — dwa zespoły z psami bojowymi z Lizbony.",
    image: "/images/news-portugal-navy.jpg",
  },
];

function NewsCardComponent({ card }: { card: NewsCard }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className="cursor-pointer overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: "#1E2B38",
        borderTop: isHovered ? "3px solid #C4922A" : "3px solid transparent",
        transform: isHovered ? "scale(1.005)" : "scale(1)",
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
            fontSize: "8px",
            padding: "4px 8px",
          }}
        >
          {card.date}
        </span>
      </div>

      {/* Content Area */}
      <div style={{ padding: "18px 16px" }}>
        {/* Category Small Text */}
        <span
          className="block font-[family-name:var(--font-rajdhani)] uppercase"
          style={{
            fontSize: "8px",
            letterSpacing: "3px",
            color: "#C4922A",
            fontWeight: 700,
            marginBottom: "8px",
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
          }}
        >
          {card.lead}
        </p>

        {/* Read More Link */}
        <a
          href="#"
          className="font-[family-name:var(--font-rajdhani)] uppercase inline-block transition-opacity hover:opacity-80"
          style={{
            fontSize: "9px",
            letterSpacing: "2px",
            color: "#C4922A",
            marginTop: "12px",
          }}
        >
          Czytaj więcej →
        </a>
      </div>
    </article>
  );
}

export default function LatestNews() {
  return (
    <section
      className="px-4 sm:px-6 lg:px-[5%] py-12 sm:py-16 lg:py-20"
      style={{
        backgroundColor: "#151E28",
      }}
    >
      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-12">
        {/* Tag */}
        <span
          className="inline-block font-[family-name:var(--font-rajdhani)] uppercase mb-3 sm:mb-4 text-[9px] sm:text-[10px]"
          style={{
            letterSpacing: "3px",
            color: "#C4922A",
            border: "1px solid #253344",
            padding: "6px 12px",
          }}
        >
          AKTUALNOŚCI CERBERUS K9 2026
        </span>

        {/* Title */}
        <h2
          className="font-[family-name:var(--font-rajdhani)] uppercase text-2xl sm:text-3xl lg:text-[32px]"
          style={{
            fontWeight: 700,
            color: "#E4DDD0",
            letterSpacing: "2px",
          }}
        >
          NAJNOWSZE INFORMACJE
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
        {newsData.map((card, index) => (
          <NewsCardComponent key={index} card={card} />
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center mt-8 sm:mt-12">
        <CTAButton>WSZYSTKIE AKTUALNOŚCI →</CTAButton>
      </div>
    </section>
  );
}
