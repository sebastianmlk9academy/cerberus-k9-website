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

const CATEGORY_BADGE_COLORS: Record<
  Exclude<NewsListingCategory, "wszystkie">,
  string
> = {
  aktualnosci: "rgba(196, 43, 43, 0.9)",
  rejestracja: "rgba(196, 146, 42, 0.95)",
  instruktorzy: "rgba(58, 124, 165, 0.95)",
  partnerzy: "rgba(42, 157, 143, 0.95)",
  media: "rgba(123, 97, 255, 0.95)",
  "hardest-hit": "rgba(201, 74, 40, 0.95)",
};

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
  const [hovered, setHovered] = useState(false);
  const reading =
    article.readingMinutes ??
    estimateReadingMinutes(`${article.title} ${article.lead}`);

  const badgeBg = CATEGORY_BADGE_COLORS[article.category];

  return (
    <article
      className="overflow-hidden transition-[border-color] duration-300"
      style={{
        backgroundColor: "transparent",
        borderTop: hovered ? "3px solid #C4922A" : "3px solid transparent",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a href={article.href} className="block text-inherit no-underline">
        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: "16 / 9",
            backgroundColor: "transparent",
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
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300"
              style={{
                transform: hovered ? "scale(1.03)" : "scale(1)",
              }}
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center px-4 text-center transition-transform duration-300"
              style={{
                transform: hovered ? "scale(1.03)" : "scale(1)",
                fontFamily: rajdhani,
                fontSize: "10px",
                letterSpacing: "3px",
                color: "#5A6A7A",
                fontWeight: 700,
              }}
            >
              {article.categoryLabel}
            </div>
          )}

          <span
            className="absolute left-3 top-3 uppercase text-white"
            style={{
              fontFamily: rajdhani,
              fontSize: "8px",
              letterSpacing: "2px",
              padding: "4px 8px",
              backgroundColor: badgeBg,
              fontWeight: 700,
            }}
          >
            {article.categoryLabel}
          </span>

          <span
            className="absolute right-3 top-3 uppercase"
            style={{
              fontFamily: rajdhani,
              fontSize: "8px",
              letterSpacing: "2px",
              padding: "4px 8px",
              color: "#C4922A",
              backgroundColor: "rgba(15, 23, 32, 0.85)",
              fontWeight: 600,
            }}
          >
            {article.date}
          </span>
        </div>

        <div style={{ padding: "18px 16px" }}>
          <span
            className="mb-2 block uppercase"
            style={{
              fontFamily: rajdhani,
              fontSize: "8px",
              letterSpacing: "3px",
              color: "#C4922A",
              fontWeight: 700,
            }}
          >
            {article.categoryLabel}
          </span>

          <h2
            className="line-clamp-2"
            style={{
              fontFamily: rajdhani,
              fontSize: "17px",
              fontWeight: 700,
              color: "#E4DDD0",
              lineHeight: 1.3,
              marginBottom: "8px",
            }}
          >
            {article.title}
          </h2>

          <p
            className="line-clamp-3"
            style={{
              fontFamily: libre,
              fontSize: "12px",
              color: "#5A6A7A",
              lineHeight: 1.6,
              marginBottom: "12px",
            }}
          >
            {article.lead}
          </p>

          <div
            className="flex flex-wrap items-center justify-between gap-2"
            style={{ marginTop: "4px" }}
          >
            <span
              className="uppercase"
              style={{
                fontFamily: rajdhani,
                fontSize: "9px",
                letterSpacing: "2px",
                color: "#C4922A",
                fontWeight: 700,
              }}
            >
              Czytaj więcej →
            </span>
            <span
              style={{
                fontFamily: rajdhani,
                fontSize: "10px",
                color: "#5A6A7A",
                letterSpacing: "0.5px",
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
        background: "linear-gradient(to bottom, #161F28, #1A2530, #161F28)",
      }}
    >
      <div
        className="sticky top-0 z-40 border-b border-[#253344]"
        style={{ backgroundColor: "#0F1720", marginBottom: "20px" }}
      >
        <div className="mx-auto max-w-7xl overflow-x-auto px-3 py-3 sm:px-4">
          <div
            className="flex min-w-min gap-1 sm:flex-wrap sm:justify-center"
            role="tablist"
            aria-label="Filtr kategorii aktualności"
          >
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setFilter(f.id);
                    setVisible(pageSize);
                  }}
                  className="shrink-0 whitespace-nowrap px-3 py-2 transition-colors sm:px-4"
                  style={{
                    fontFamily: rajdhani,
                    fontSize: "10px",
                    letterSpacing: "2px",
                    fontWeight: 700,
                    backgroundColor: active ? "#C4922A" : "transparent",
                    color: active ? "#0F1720" : "#8A9BAE",
                    border: active ? "none" : "1px solid #253344",
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        style={{ gap: "2px", backgroundColor: "#1A2230" }}
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
