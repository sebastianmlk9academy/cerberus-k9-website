"use client";

import { useMemo, useState } from "react";

export type NewsListingCategory =
  | "wszystkie"
  | "aktualnosci"
  | "rejestracja"
  | "instruktorzy"
  | "partnerzy"
  | "media"
  | "hardest-hit";

export interface NewsListingArticle {
  id: string;
  /** Filter key — must match a filter except "wszystkie" */
  category: Exclude<NewsListingCategory, "wszystkie">;
  /** Short label shown on badges (uppercase) */
  categoryLabel: string;
  title: string;
  lead: string;
  /** Display date, e.g. 15.04.2026 */
  date: string;
  href: string;
  /** WebP path; omit for no-image fallback */
  imageSrc?: string;
  readingMinutes?: number;
}

const FILTERS: { id: NewsListingCategory; label: string }[] = [
  { id: "wszystkie", label: "WSZYSTKIE" },
  { id: "aktualnosci", label: "AKTUALNOŚCI" },
  { id: "rejestracja", label: "REJESTRACJA" },
  { id: "instruktorzy", label: "INSTRUKTORZY" },
  { id: "partnerzy", label: "PARTNERZY" },
  { id: "media", label: "MEDIA" },
  { id: "hardest-hit", label: "HARDEST HIT" },
];

function estimateReadingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return minutes;
}

function formatReadingTime(minutes: number): string {
  if (minutes === 1) return "1 min czytania";
  return `${minutes} min czytania`;
}

const rajdhani = "var(--font-rajdhani), sans-serif";
const libre = "var(--font-libre), Georgia, serif";

interface NewsListingProps {
  articles?: NewsListingArticle[];
  /** How many cards to show before "load more" */
  pageSize?: number;
}

const defaultArticles: NewsListingArticle[] = [
  {
    id: "1",
    category: "aktualnosci",
    categoryLabel: "AKTUALNOŚCI",
    title: "Potwierdzony udział US Police K9 SWAT na CERBERUS K9 2026",
    date: "15.04.2026",
    lead: "Oficjalnie potwierdzamy udział przewodnika K9 SWAT z USA wraz z pozorantem szkolącym jednostki specjalne.",
    href: "#",
    imageSrc: "/images/news-swat-k9.webp",
  },
  {
    id: "2",
    category: "rejestracja",
    categoryLabel: "REJESTRACJA",
    title: "Rejestracja otwarta — 250 miejsc, wstęp bezpłatny",
    date: "01.04.2026",
    lead: "Rejestracja na CERBERUS K9 2026 jest już dostępna. Liczba miejsc ograniczona. Wejście bezpłatne dla wszystkich uczestników.",
    href: "#",
    imageSrc: "/images/news-registration.webp",
  },
  {
    id: "3",
    category: "partnerzy",
    categoryLabel: "PARTNERZY",
    title: "Marynarka Wojenna Portugalii dołącza do CERBERUS K9 2026",
    date: "20.03.2026",
    lead: "Jednostka K9 Marinha Portuguesa potwierdza udział — dwa zespoły z psami bojowymi z Lizbony.",
    href: "#",
    imageSrc: "/images/news-portugal-navy.webp",
  },
  {
    id: "4",
    category: "media",
    categoryLabel: "MEDIA",
    title: "Relacja wideo z poprzedniej edycji — pełna galeria",
    date: "10.02.2026",
    lead: "Materiały filmowe i zdjęcia z zeszłorocznego wydarzenia w jednym miejscu.",
    href: "#",
  },
  {
    id: "5",
    category: "instruktorzy",
    categoryLabel: "INSTRUKTORZY",
    title: "Nowi instruktorzy na scenie HARDEST HIT",
    date: "28.01.2026",
    lead: "Poznaj prowadzących warsztaty taktyczne i scenariusze bojowe przygotowane na 2026 rok.",
    href: "#",
    imageSrc: "/images/news-swat-k9.webp",
  },
  {
    id: "6",
    category: "hardest-hit",
    categoryLabel: "HARDEST HIT",
    title: "Scenariusz nocny — limity miejsc i wymagania",
    date: "05.01.2026",
    lead: "Zapisy na blok nocny otwarte; obowiązuje wcześniejsza weryfikacja umiejętności zespołu.",
    href: "#",
  },
];

function ArticleCard({ article }: { article: NewsListingArticle }) {
  const [isHovered, setIsHovered] = useState(false);
  const reading =
    article.readingMinutes ??
    estimateReadingMinutes(`${article.title} ${article.lead}`);

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
      <a href={article.href} className="block text-inherit no-underline">
        <div
          className="relative overflow-hidden w-full"
          style={{
            backgroundColor: "#151E28",
            aspectRatio: "16 / 9",
          }}
        >
          {article.imageSrc ? (
            <img
              src={article.imageSrc}
              alt={article.title}
              width={640}
              height={360}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
              style={{
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center px-4 text-center transition-transform duration-500"
              style={{
                backgroundColor: "#151E28",
                transform: isHovered ? "scale(1.05)" : "scale(1)",
                fontFamily: "var(--font-rajdhani), sans-serif",
                fontSize: "8px",
                letterSpacing: "2px",
                color: "white",
              }}
            >
              {article.categoryLabel}
            </div>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <span
              className="font-[family-name:var(--font-rajdhani)] uppercase"
              style={{
                backgroundColor: "rgba(196, 43, 43, 0.85)",
                color: "white",
                fontSize: "8px",
                letterSpacing: "2px",
                padding: "4px 8px",
              }}
            >
              {article.categoryLabel}
            </span>

            <span
              className="font-[family-name:var(--font-rajdhani)]"
              style={{
                backgroundColor: "rgba(15, 23, 32, 0.85)",
                color: "#C4922A",
                fontSize: "12px",
                padding: "5px 10px",
              }}
            >
              {article.date}
            </span>
          </div>
        </div>

        <div style={{ padding: "18px 16px" }}>
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
            {article.categoryLabel}
          </span>

          <h2
            className="font-[family-name:var(--font-rajdhani)]"
            style={{
              fontSize: "17px",
              color: "#E4DDD0",
              fontWeight: 700,
              lineHeight: 1.3,
              marginBottom: "8px",
            }}
          >
            {article.title}
          </h2>

          <p
            className="font-[family-name:var(--font-libre)]"
            style={{
              fontSize: "12px",
              color: "#5A6A7A",
              lineHeight: 1.6,
            }}
          >
            {article.lead}
          </p>

          <div
            className="flex flex-wrap items-center justify-between gap-2"
            style={{ marginTop: "12px" }}
          >
            <span
              className="font-[family-name:var(--font-rajdhani)] uppercase inline-block transition-opacity hover:opacity-80"
              style={{
                fontSize: "9px",
                letterSpacing: "2px",
                color: "#C4922A",
              }}
            >
              Czytaj więcej →
            </span>
            <span
              className="font-[family-name:var(--font-rajdhani)]"
              style={{
                fontSize: "10px",
                color: "#5A6A7A",
              }}
            >
              {formatReadingTime(reading)}
            </span>
          </div>
        </div>
      </a>
    </article>
  );
}

export function NewsListing({
  articles = defaultArticles,
  pageSize = 6,
}: NewsListingProps) {
  const [filter, setFilter] = useState<NewsListingCategory>("wszystkie");
  const [visible, setVisible] = useState(pageSize);

  const filtered = useMemo(() => {
    if (filter === "wszystkie") return articles;
    return articles.filter((a) => a.category === filter);
  }, [articles, filter]);

  const visibleArticles = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const showLoadMore = hasMore;

  return (
    <div
      className="w-full"
      style={{
        paddingTop: "20px",
        paddingBottom: "20px",
        background: "#161F28",
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '32px', marginTop: '0' }}>
        {/* Red lines + AKTUALNOŚCI tag */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '16px',
        }}>
          <div style={{
            height: '1px',
            flex: 1,
            background: 'linear-gradient(to right, transparent, rgba(196,43,43,0.4), transparent)',
          }} />
          <span style={{
            fontFamily: 'var(--font-rajdhani), sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '5px',
            color: '#C42B2B',
          }}>
            AKTUALNOŚCI
          </span>
          <div style={{
            height: '1px',
            flex: 1,
            background: 'linear-gradient(to right, transparent, rgba(196,43,43,0.4), transparent)',
          }} />
        </div>

        {/* WSZYSTKIE WIADOMOŚCI title */}
        <h2 style={{
          fontFamily: 'var(--font-rajdhani), sans-serif',
          fontSize: 'clamp(24px, 3vw, 32px)',
          fontWeight: 700,
          color: '#E4DDD0',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          margin: 0,
        }}>
          WSZYSTKIE WIADOMOŚCI
        </h2>
      </div>

      <div
        role="tablist"
        aria-label="Filtr kategorii aktualności"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          padding: "20px 0",
          marginTop: "16px",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {FILTERS.map((f) => {
          const isActive = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setFilter(f.id);
                setVisible(pageSize);
              }}
              style={{
                backgroundColor: isActive ? "#C4922A" : "transparent",
                color: isActive ? "#1E2B38" : "#C4922A",
                fontFamily: "'Rajdhani', sans-serif",
                letterSpacing: "3px",
                fontWeight: 700,
                border: "1px solid #C4922A",
                transition: "background-color 150ms ease, color 150ms ease",
                cursor: "pointer",
                padding: "8px 14px",
                fontSize: "11px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#C4922A";
                e.currentTarget.style.color = "#1E2B38";
              }}
              onMouseLeave={(e) => {
                if (isActive) return;
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#C4922A";
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div
        className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        style={{ gap: "2px", backgroundColor: "transparent" }}
      >
        {visibleArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {showLoadMore && (
        <div className="mx-auto max-w-7xl px-3 py-6 sm:px-4">
          <button
            type="button"
            onClick={() => setVisible((v) => v + pageSize)}
            className="w-full cursor-pointer py-4 transition-colors"
            style={{
              fontFamily: rajdhani,
              fontSize: "11px",
              letterSpacing: "3px",
              fontWeight: 700,
              color: "#C4922A",
              backgroundColor: "transparent",
              border: "1px solid #C4922A",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(196, 146, 42, 0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            ZAŁADUJ WIĘCEJ ARTYKUŁÓW
          </button>
        </div>
      )}
    </div>
  );
}
