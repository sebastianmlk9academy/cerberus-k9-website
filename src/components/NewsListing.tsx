"use client";

import { useMemo, useState } from "react";
import { ui } from "../i18n/ui";
import type { Lang } from "../i18n/utils";

export type NewsListingCategory =
  | "all"
  | "news"
  | "registration"
  | "instructors"
  | "partners"
  | "media"
  | "hardestHit";

export interface NewsListingArticle {
  id: string;
  /** Filter key — must match a filter except "all" */
  category: Exclude<NewsListingCategory, "all">;
  /** Short label shown on badges (uppercase) */
  categoryLabel: string;
  title: string;
  lead: string;
  /** Display date, e.g. 15.04.2026 */
  date: string;
  href: string;
  slug?: string;
  /** WebP path; omit for no-image fallback */
  imageSrc?: string;
  readingMinutes?: number;
}

const FILTERS: { id: NewsListingCategory; label: string }[] = [
  { id: "all", label: "ALL" },
  { id: "news", label: "NEWS" },
  { id: "registration", label: "REGISTRATION" },
  { id: "instructors", label: "INSTRUCTORS" },
  { id: "partners", label: "PARTNERS" },
  { id: "media", label: "MEDIA" },
  { id: "hardestHit", label: "HARDEST HIT" },
];

function estimateReadingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return minutes;
}

function formatReadingTime(minutes: number, lang: Lang): string {
  const readingTimeLabel: Partial<Record<Lang, string>> = {
    pl: "min czytania",
    en: "min read",
    de: "Min Lesezeit",
    fr: "min de lecture",
    es: "min de lectura",
    it: "min di lettura",
    pt: "min de leitura",
    nl: "min leestijd",
    sv: "min lasning",
    no: "min lesetid",
    hr: "min citanja",
    cs: "min cteni",
    sk: "min citania",
    sl: "min branja",
    lt: "min skaitymo",
    lv: "min lasisanas",
    hu: "perc olvasas",
    ro: "min de citire",
    ko: "분 읽기",
  };
  const rtLabel = readingTimeLabel[lang] ?? "min read";
  return `${minutes} ${rtLabel}`;
}

const rajdhani = "var(--font-rajdhani), sans-serif";
const libre = "var(--font-libre), Georgia, serif";

interface NewsListingProps {
  lang: Lang;
  articles?: NewsListingArticle[];
  /** How many cards to show before "load more" */
  pageSize?: number;
}

const defaultArticles: NewsListingArticle[] = [];

function ArticleCard({ article, lang }: { article: NewsListingArticle; lang: Lang }) {
  const [isHovered, setIsHovered] = useState(false);
  const safeUi = ui[lang] ?? ui.pl;
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
        display: "grid",
        gridTemplateRows: "subgrid",
        gridRow: "span 5",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={article.slug ? `/${lang}/aktualnosci/${article.slug}` : article.href}
        className="text-inherit no-underline"
        style={{ display: "contents" }}
      >
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

          <span
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              fontFamily: "'Rajdhani', sans-serif",
              backgroundColor: "rgba(196,43,43,0.85)",
              color: "white",
              fontSize: "8px",
              letterSpacing: "2px",
              padding: "4px 8px",
              fontWeight: 700,
              zIndex: 2,
            }}
          >
            {article.categoryLabel}
          </span>

          <span
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              fontFamily: "'Rajdhani', sans-serif",
              backgroundColor: "rgba(15,23,32,0.85)",
              color: "#C4922A",
              fontSize: "12px",
              padding: "5px 10px",
              fontWeight: 600,
              zIndex: 2,
            }}
          >
            {article.date}
          </span>
        </div>

        <div style={{ display: "contents" }}>
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
              paddingRight: "16px",
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
              paddingLeft: "16px",
              paddingRight: "16px",
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
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          >
            {article.lead}
          </p>

          <div
            className="flex flex-wrap items-center justify-between gap-2"
            style={{
              paddingLeft: "16px",
              paddingRight: "16px",
              paddingBottom: "18px",
              marginTop: "12px",
            }}
          >
            <span
              className="font-[family-name:var(--font-rajdhani)] uppercase inline-block transition-opacity hover:opacity-80"
              style={{
                fontSize: "9px",
                letterSpacing: "2px",
                color: "#C4922A",
              }}
            >
              {safeUi.btn_readmore ?? "READ MORE"} →
            </span>
            <span
              className="font-[family-name:var(--font-rajdhani)]"
              style={{
                fontSize: "10px",
                color: "#5A6A7A",
              }}
            >
              {formatReadingTime(reading, lang)}
            </span>
          </div>
        </div>
      </a>
    </article>
  );
}

export function NewsListing({
  lang,
  articles = defaultArticles,
  pageSize = 6,
}: NewsListingProps) {
  const safeUi = ui[lang] ?? ui.pl;
  const t = {
    pl: { allNews: "WSZYSTKIE WIADOMOŚCI", loadMoreArticles: "ZAŁADUJ WIĘCEJ ARTYKUŁÓW" },
    en: { allNews: "ALL NEWS", loadMoreArticles: "LOAD MORE ARTICLES" },
    de: { allNews: "ALLE NACHRICHTEN", loadMoreArticles: "MEHR ARTIKEL LADEN" },
    fr: { allNews: "TOUTES LES ACTUALITÉS", loadMoreArticles: "CHARGER PLUS D'ARTICLES" },
    hr: { allNews: "SVE VIJESTI", loadMoreArticles: "UČITAJ VIŠE ČLANAKA" },
    cs: { allNews: "VŠECHNY NOVINKY", loadMoreArticles: "NAČÍST DALŠÍ ČLÁNKY" },
    lt: { allNews: "VISOS NAUJIENOS", loadMoreArticles: "ĮKELTI DAUGIAU STRAIPSNIŲ" },
    lv: { allNews: "VISAS ZIŅAS", loadMoreArticles: "IELĀDĒT VAIRĀK RAKSTU" },
    sk: { allNews: "VŠETKY NOVINKY", loadMoreArticles: "NAČÍTAŤ ĎALŠIE ČLÁNKY" },
    sl: { allNews: "VSE NOVICE", loadMoreArticles: "NALOŽI VEČ ČLANKOV" },
    hu: { allNews: "ÖSSZES HÍR", loadMoreArticles: "TÖBB CIKK BETÖLTÉSE" },
    no: { allNews: "ALLE NYHETER", loadMoreArticles: "LAST INN FLERE ARTIKLER" },
    sv: { allNews: "ALLA NYHETER", loadMoreArticles: "LADDA FLER ARTIKLAR" },
    nl: { allNews: "AL HET NIEUWS", loadMoreArticles: "MEER ARTIKELEN LADEN" },
    es: { allNews: "TODAS LAS NOTICIAS", loadMoreArticles: "CARGAR MÁS ARTÍCULOS" },
    pt: { allNews: "TODAS AS NOTÍCIAS", loadMoreArticles: "CARREGAR MAIS ARTIGOS" },
    ro: { allNews: "TOATE ȘTIRILE", loadMoreArticles: "ÎNCARCĂ MAI MULTE ARTICOLE" },
    it: { allNews: "TUTTE LE NOTIZIE", loadMoreArticles: "CARICA ALTRI ARTICOLI" },
    ko: { allNews: "전체 뉴스", loadMoreArticles: "기사 더 불러오기" },
  }[lang] ?? { allNews: "ALL NEWS", loadMoreArticles: "LOAD MORE ARTICLES" };

  const filterLabels: Record<Lang, Record<string, string>> = {
    pl: { all: "WSZYSTKIE", news: "AKTUALNOŚCI", instructors: "INSTRUKTORZY", partners: "PARTNERZY", registration: "REJESTRACJA", media: "MEDIA", hardestHit: "HARDEST HIT" },
    en: { all: "ALL", news: "NEWS", instructors: "INSTRUCTORS", partners: "PARTNERS", registration: "REGISTRATION", media: "MEDIA", hardestHit: "HARDEST HIT" },
    de: { all: "ALLE", news: "NACHRICHTEN", instructors: "INSTRUKTEURE", partners: "PARTNER", registration: "ANMELDUNG", media: "MEDIEN", hardestHit: "HARDEST HIT" },
    fr: { all: "TOUT", news: "ACTUALITÉS", instructors: "INSTRUCTEURS", partners: "PARTENAIRES", registration: "INSCRIPTION", media: "MÉDIAS", hardestHit: "HARDEST HIT" },
    es: { all: "TODO", news: "NOTICIAS", instructors: "INSTRUCTORES", partners: "SOCIOS", registration: "REGISTRO", media: "MEDIOS", hardestHit: "HARDEST HIT" },
    it: { all: "TUTTI", news: "NOTIZIE", instructors: "ISTRUTTORI", partners: "PARTNER", registration: "REGISTRAZIONE", media: "MEDIA", hardestHit: "HARDEST HIT" },
    pt: { all: "TUDO", news: "NOTÍCIAS", instructors: "INSTRUTORES", partners: "PARCEIROS", registration: "REGISTRO", media: "MÍDIA", hardestHit: "HARDEST HIT" },
    nl: { all: "ALLES", news: "NIEUWS", instructors: "INSTRUCTEURS", partners: "PARTNERS", registration: "REGISTRATIE", media: "MEDIA", hardestHit: "HARDEST HIT" },
    sv: { all: "ALLT", news: "NYHETER", instructors: "INSTRUKTÖRER", partners: "PARTNERS", registration: "REGISTRERING", media: "MEDIA", hardestHit: "HARDEST HIT" },
    no: { all: "ALT", news: "NYHETER", instructors: "INSTRUKTØRER", partners: "PARTNERE", registration: "REGISTRERING", media: "MEDIA", hardestHit: "HARDEST HIT" },
    hr: { all: "SVE", news: "VIJESTI", instructors: "INSTRUKTORI", partners: "PARTNERI", registration: "REGISTRACIJA", media: "MEDIJI", hardestHit: "HARDEST HIT" },
    cs: { all: "VŠE", news: "AKTUALITY", instructors: "INSTRUKTOŘI", partners: "PARTNEŘI", registration: "REGISTRACE", media: "MÉDIA", hardestHit: "HARDEST HIT" },
    sk: { all: "VŠETKO", news: "AKTUALITY", instructors: "INŠTRUKTORI", partners: "PARTNERI", registration: "REGISTRÁCIA", media: "MÉDIÁ", hardestHit: "HARDEST HIT" },
    sl: { all: "VSE", news: "NOVICE", instructors: "INŠTRUKTORJI", partners: "PARTNERJI", registration: "REGISTRACIJA", media: "MEDIJI", hardestHit: "HARDEST HIT" },
    lt: { all: "VISKAS", news: "NAUJIENOS", instructors: "INSTRUKTORIAI", partners: "PARTNERIAI", registration: "REGISTRACIJA", media: "ŽINIASKLAIDA", hardestHit: "HARDEST HIT" },
    lv: { all: "VISS", news: "ZIŅAS", instructors: "INSTRUKTORI", partners: "PARTNERI", registration: "REĢISTRĀCIJA", media: "MEDIJI", hardestHit: "HARDEST HIT" },
    hu: { all: "MIND", news: "HÍREK", instructors: "OKTATÓK", partners: "PARTNEREK", registration: "REGISZTRÁCIÓ", media: "MÉDIA", hardestHit: "HARDEST HIT" },
    ro: { all: "TOATE", news: "ȘTIRI", instructors: "INSTRUCTORI", partners: "PARTENERI", registration: "ÎNREGISTRARE", media: "MEDIA", hardestHit: "HARDEST HIT" },
    ko: { all: "전체", news: "뉴스", instructors: "강사", partners: "파트너", registration: "등록", media: "미디어", hardestHit: "HARDEST HIT" },
  };
  const labels = filterLabels[lang] ?? filterLabels.en;
  const ariaLabels: Partial<Record<Lang, string>> = {
    pl: "Filtr kategorii aktualności",
    en: "News category filter",
    de: "Nachrichtenkategorie-Filter",
    fr: "Filtre de catégorie d'actualités",
    es: "Filtro de categoría de noticias",
    it: "Filtro categoria notizie",
    pt: "Filtro de categoria de notícias",
    nl: "Nieuws categoriefilter",
    sv: "Filter för nyhetskategori",
    no: "Filter for nyhetskategori",
    hr: "Filtar kategorije vijesti",
    cs: "Filtr kategorie novinek",
    sk: "Filter kategórie noviniek",
    sl: "Filter kategorij novic",
    lt: "Naujienų kategorijos filtras",
    lv: "Ziņu kategorijas filtrs",
    hu: "Hírkategória-szűrő",
    ro: "Filtru categorie știri",
    ko: "뉴스 카테고리 필터",
  };
  const [filter, setFilter] = useState<NewsListingCategory>("all");
  const [visible, setVisible] = useState(pageSize);

  const filtered = useMemo(() => {
    if (filter === "all") return articles;
    return articles.filter((a) => a.category === filter);
  }, [articles, filter]);

  const visibleArticles = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const showLoadMore = hasMore;

  return (
    <div
      className="w-full"
      style={{
        paddingTop: "40px",
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
            {safeUi.nav_news}
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
          {t.allNews}
        </h2>
      </div>

      <div
        role="tablist"
        aria-label={ariaLabels[lang] ?? "News category filter"}
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
              {labels[f.id] ?? f.label}
            </button>
          );
        })}
      </div>

      <div
        className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        style={{ gap: "2px", backgroundColor: "transparent", gridAutoRows: "auto auto auto auto auto" }}
      >
        {visibleArticles.map((article) => (
          <ArticleCard key={article.id} article={article} lang={lang} />
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
            {t.loadMoreArticles}
          </button>
        </div>
      )}
    </div>
  );
}
