import { Lock } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Category =
  | "HARDEST HIT"
  | "SZKOLENIA K9"
  | "TCCC"
  | "KONFERENCJA"
  | "DRONY";

type PhotoItem = {
  title: string;
  category: Category;
  location: string;
  edition: "2025" | "2026";
  photo: string;
  alt: string;
  tags?: string[];
};

type GalleryGridProps = {
  photos: PhotoItem[];
};

const RELEASE_2026_DATE = new Date("2026-06-14T00:00:00");

const categoryBadgeClass: Record<Category, string> = {
  "HARDEST HIT": "badge-hardest-hit",
  "SZKOLENIA K9": "badge-szkolenia-k9",
  TCCC: "badge-tccc",
  KONFERENCJA: "badge-konferencja",
  DRONY: "badge-drony",
};

const locationFilters = [
  "WSZYSTKIE LOKALIZACJE",
  "TERMINAL LPG",
  "MUZEUM GRYF",
  "STENA LINE",
];

const mainFilters = [
  "WSZYSTKO",
  "HARDEST HIT",
  "SZKOLENIA K9",
  "TCCC",
  "KONFERENCJA",
  "DRONY",
];

const videoItems = [
  {
    title: "CERBERUS K9 2025 - Główna relacja",
    badge: "POLSKA ZBROJNA · PATRON MEDIALNY",
    embedUrl: "https://www.youtube.com/embed/kUhqmGhrbas",
    id: "kUhqmGhrbas",
  },
  {
    title: "TVP — Relacja z CERBERUS K9 2025",
    badge: "TVP",
    embedUrl: "https://www.youtube.com/embed/Fo-j5vGI0m4",
    id: "Fo-j5vGI0m4",
  },
  {
    title: "Polskie Radio — Reportaż i wywiad",
    badge: "Polskie Radio",
    embedUrl: "https://www.youtube.com/embed/lf-Aek_TSzI",
    id: "lf-Aek_TSzI",
  },
  {
    title: "TVN — Fakty",
    badge: "TVN",
    embedUrl: "https://www.youtube.com/embed/aNG1UVyOqNA",
    id: "aNG1UVyOqNA",
  },
];

declare global {
  interface Window {
    GLightbox?: (config: Record<string, unknown>) => { destroy: () => void };
  }
}

function normalize(text: string): string {
  return text.trim().toLowerCase();
}

function toJpgFallback(photo: string): string {
  if (photo.toLowerCase().endsWith(".webp")) {
    return photo.slice(0, -5) + ".jpg";
  }
  return photo;
}

function formatCountdown(targetDate: Date): string {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();
  if (diff <= 0) {
    return "0 dni";
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  return `${days} dni ${hours} godz.`;
}

const partnerButtonStyle: React.CSSProperties = {
  backgroundColor: "transparent",
  color: "#C4922A",
  fontFamily: "var(--font-rajdhani), sans-serif",
  letterSpacing: "3px",
  fontWeight: 700,
  borderRadius: 0,
  border: "1px solid #C4922A",
  transition: "background-color 150ms ease, color 150ms ease",
  cursor: "pointer",
};

const handlePartnerButtonMouseEnter = (
  e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
) => {
  e.currentTarget.style.backgroundColor = "#C4922A";
  e.currentTarget.style.color = "#1E2B38";
};

const handlePartnerButtonMouseLeave = (
  e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
) => {
  e.currentTarget.style.backgroundColor = "transparent";
  e.currentTarget.style.color = "#C4922A";
};

export function GalleryGrid({ photos }: GalleryGridProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const visibleLimitRef = useRef<number>(12);
  const [activeCategory, setActiveCategory] = useState("WSZYSTKO");
  const [activeLocation, setActiveLocation] = useState("WSZYSTKIE LOKALIZACJE");
  const [activeView, setActiveView] = useState("SIATKA");
  const [activeEdition, setActiveEdition] = useState("2025");
  const [modalVideo, setModalVideo] = useState<string | null>(null);

  const closeModal = useCallback(() => {
    setModalVideo(null);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (modalVideo) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [modalVideo, closeModal]);

  const sortedPhotos = useMemo(
    () =>
      photos.map((item, index) => ({
        ...item,
        id: `${item.edition}-${index}`,
      })),
    [photos],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const linkId = "glightbox-css";
    if (!document.getElementById(linkId)) {
      const link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      link.href = "https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css";
      document.head.appendChild(link);
    }

    let lightboxInstance: { destroy: () => void } | null = null;
    let detached = false;

    const ensureScript = async () => {
      if (window.GLightbox) return;
      await new Promise<void>((resolve, reject) => {
        const existing = document.querySelector<HTMLScriptElement>(
          'script[src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js"]',
        );
        if (existing) {
          existing.addEventListener("load", () => resolve(), { once: true });
          existing.addEventListener("error", () => reject(new Error("GLightbox load failed")), {
            once: true,
          });
          if ((existing as HTMLScriptElement).dataset.ready === "true") resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js";
        script.async = true;
        script.addEventListener(
          "load",
          () => {
            script.dataset.ready = "true";
            resolve();
          },
          { once: true },
        );
        script.addEventListener("error", () => reject(new Error("GLightbox load failed")), {
          once: true,
        });
        document.body.appendChild(script);
      });
    };

    const grid = root.querySelector<HTMLElement>("[data-gallery-grid]");
    const photoItems = Array.from(root.querySelectorAll<HTMLElement>("[data-photo-item]"));
    const tabButtons = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-edition]"));
    const loadMoreButton = root.querySelector<HTMLAnchorElement>("[data-load-more]");
    const loadMoreText = root.querySelector<HTMLElement>("[data-load-more-count]");
    const lockedSection = root.querySelector<HTMLElement>("[data-locked-section]");
    const countdownText = root.querySelector<HTMLElement>("[data-countdown]");

    if (!grid || !loadMoreButton || !loadMoreText || !lockedSection || !countdownText) return;

    const is2026Unlocked = new Date().getTime() >= RELEASE_2026_DATE.getTime();
    countdownText.textContent = formatCountdown(RELEASE_2026_DATE);

    const updateVisibility = () => {
      if (detached) return;
      grid.classList.add("is-fading");

      window.setTimeout(() => {
        let visibleCount = 0;
        let totalMatchingCount = 0;

        photoItems.forEach((item) => {
          const category = item.dataset.category || "";
          const location = item.dataset.location || "";
          const edition = item.dataset.edition || "";

          const categoryMatch = activeCategory === "WSZYSTKO" || category === activeCategory;
          const locationMatch =
            activeLocation === "WSZYSTKIE LOKALIZACJE" || normalize(location) === normalize(activeLocation);
          const editionMatch = edition === activeEdition;

          const shouldShow = categoryMatch && locationMatch && editionMatch;
          if (shouldShow) {
            totalMatchingCount += 1;
            const withinLimit = totalMatchingCount <= visibleLimitRef.current;
            item.classList.toggle("is-hidden", !withinLimit);
            if (withinLimit) visibleCount += 1;
          } else {
            item.classList.add("is-hidden");
          }
        });

        const remaining = Math.max(totalMatchingCount - visibleCount, 0);
        loadMoreText.textContent = String(Math.min(remaining, 12));
        loadMoreButton.style.display = remaining > 0 ? "block" : "none";

        if (activeEdition === "2026" && !is2026Unlocked) {
          lockedSection.style.display = "flex";
          grid.style.display = "none";
          loadMoreButton.style.display = "none";
        } else {
          lockedSection.style.display = "none";
          grid.style.display = "grid";
        }

        grid.classList.remove("is-fading");
        if (window.GLightbox) {
          lightboxInstance?.destroy();
          lightboxInstance = window.GLightbox({
            selector: ".glightbox",
            touchNavigation: true,
            loop: true,
          });
        }
      }, 200);
    };

    const bindClick = (button: HTMLElement, handler: (event: MouseEvent) => void) => {
      button.addEventListener("click", handler);
      return () => button.removeEventListener("click", handler);
    };

    const cleanupFns: Array<() => void> = [];

    tabButtons.forEach((button) => {
      cleanupFns.push(
        bindClick(button, () => {
          const edition = button.dataset.edition || "2025";
          if (edition === "2026" && !is2026Unlocked) {
            setActiveEdition("2026");
            return;
          }
          setActiveEdition(edition);
          visibleLimitRef.current = 12;
        }),
      );
    });

    cleanupFns.push(
      bindClick(loadMoreButton, (event) => {
        event.preventDefault();
        visibleLimitRef.current += 12;
        updateVisibility();
      }),
    );

    tabButtons.forEach((button) => {
      const buttonValue = button.dataset.edition || "2025";
      button.classList.toggle("is-active", buttonValue === activeEdition);
    });
    grid.classList.toggle("view-masonry", activeView === "MASONRY");

    ensureScript()
      .then(() => {
        if (window.GLightbox) {
          lightboxInstance = window.GLightbox({
            selector: ".glightbox",
            touchNavigation: true,
            loop: true,
          });
        }
        updateVisibility();
      })
      .catch(() => {
        updateVisibility();
      });

    return () => {
      detached = true;
      cleanupFns.forEach((fn) => fn());
      lightboxInstance?.destroy();
    };
  }, [sortedPhotos, activeCategory, activeLocation, activeEdition, activeView]);

  const is2026Unlocked = new Date().getTime() >= RELEASE_2026_DATE.getTime();
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="gallery-grid-wrap mb-5" ref={rootRef}>
      <div className="mt-[40px] mb-8 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C42B2B]/40 to-transparent" />
          <span className="font-[family-name:var(--font-rajdhani)] text-[12px] font-medium tracking-[5px] text-[#C42B2B]">
            ZDJĘCIA
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C42B2B]/40 to-transparent" />
        </div>
      </div>
      <div className="edition-tabs">
        <button type="button" className="edition-tab is-active" data-edition="2025">
          EDYCJA 2025 — TRÓJMIASTO
        </button>
        <button type="button" className="edition-tab" data-edition="2026">
          EDYCJA 2026 — OSTRÓW WIELKOPOLSKI
          {!is2026Unlocked ? (
            <Lock
              size={12}
              style={{ display: "inline", verticalAlign: "middle", marginLeft: "6px" }}
            />
          ) : null}
        </button>
      </div>

      <div className="filter-bar">
        <div className="main-filter-list">
          {mainFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              className="filter-pill"
              data-filter={filter}
              onClick={() => {
                setActiveCategory(filter);
                visibleLimitRef.current = 12;
              }}
              style={{
                ...partnerButtonStyle,
                backgroundColor: activeCategory === filter ? "#C4922A" : "transparent",
                color: activeCategory === filter ? "#1E2B38" : "#C4922A",
                padding: "8px 14px",
                fontSize: 11,
              }}
              onMouseEnter={handlePartnerButtonMouseEnter}
              onMouseLeave={(e) => {
                if (activeCategory === filter) return;
                handlePartnerButtonMouseLeave(e);
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="view-toggle">
          <button
            type="button"
            className="view-btn"
            data-view="SIATKA"
            onClick={() => setActiveView("SIATKA")}
            style={{
              ...partnerButtonStyle,
              backgroundColor: activeView === "SIATKA" ? "#C4922A" : "transparent",
              color: activeView === "SIATKA" ? "#1E2B38" : "#C4922A",
              padding: "8px 14px",
              fontSize: 11,
            }}
            onMouseEnter={handlePartnerButtonMouseEnter}
            onMouseLeave={(e) => {
              if (activeView === "SIATKA") return;
              handlePartnerButtonMouseLeave(e);
            }}
          >
            SIATKA
          </button>
          <button
            type="button"
            className="view-btn"
            data-view="MASONRY"
            onClick={() => setActiveView("MASONRY")}
            style={{
              ...partnerButtonStyle,
              backgroundColor: activeView === "MASONRY" ? "#C4922A" : "transparent",
              color: activeView === "MASONRY" ? "#1E2B38" : "#C4922A",
              padding: "8px 14px",
              fontSize: 11,
            }}
            onMouseEnter={handlePartnerButtonMouseEnter}
            onMouseLeave={(e) => {
              if (activeView === "MASONRY") return;
              handlePartnerButtonMouseLeave(e);
            }}
          >
            MASONRY
          </button>
        </div>
      </div>

      <div className="location-filters">
        {locationFilters.map((location) => (
          <button
            key={location}
            type="button"
            className="location-pill"
            data-location-filter={location}
            onClick={() => {
              setActiveLocation(location);
              visibleLimitRef.current = 12;
            }}
            style={{
              ...partnerButtonStyle,
              backgroundColor: activeLocation === location ? "#C4922A" : "transparent",
              color: activeLocation === location ? "#1E2B38" : "#C4922A",
              padding: "8px 14px",
              fontSize: 11,
            }}
            onMouseEnter={handlePartnerButtonMouseEnter}
            onMouseLeave={(e) => {
              if (activeLocation === location) return;
              handlePartnerButtonMouseLeave(e);
            }}
          >
            {location}
          </button>
        ))}
      </div>

      <section className="edition-locked" data-locked-section>
        <p className="locked-title">Zdjęcia pojawią się po zakończeniu eventu</p>
        <p className="locked-countdown">
          Odblokowanie za: <strong data-countdown>0 dni</strong>
        </p>
        <a href="/rejestracja" className="locked-cta">
          Zarejestruj się i będziesz tutaj ↗
        </a>
      </section>

      <div className="photo-grid" data-gallery-grid>
        {sortedPhotos.map((item, index) => {
          const isWide = index % 9 === 0 || item.tags?.some((tag) => normalize(tag) === "wide");
          const jpgFallback = toJpgFallback(item.photo);
          return (
            <article
              key={item.id}
              className={`photo-item ${isWide ? "wide" : ""}`}
              data-photo-item
              data-category={item.category}
              data-location={item.location}
              data-edition={item.edition}
            >
              <a
                className="glightbox"
                href={item.photo}
                data-title={item.title}
                data-description={item.location}
              >
                <div className="photo-ratio">
                  <picture>
                    <source srcSet={item.photo} type="image/webp" />
                    <img src={jpgFallback} alt={item.alt} loading="lazy" width="1000" height="750" />
                  </picture>
                </div>
                <div className="photo-overlay">
                  <p className="photo-title">{item.title}</p>
                  <p className="photo-location">{item.location}</p>
                  <span className="photo-zoom">🔍 Powiększ</span>
                </div>
                <span className={`category-badge ${categoryBadgeClass[item.category]}`}>{item.category}</span>
                <span className="webp-badge">WebP</span>
              </a>
            </article>
          );
        })}
      </div>

      <a
        href="#"
        className="load-more-btn flex items-center justify-center cursor-pointer transition-colors w-full sm:w-auto text-[10px] sm:text-[11px] px-5 py-3 sm:px-6 sm:py-3.5"
        style={partnerButtonStyle}
        onMouseEnter={handlePartnerButtonMouseEnter}
        onMouseLeave={handlePartnerButtonMouseLeave}
        data-load-more
      >
        ZAŁADUJ WIĘCEJ — <span data-load-more-count>12</span> KOLEJNYCH ZDJĘĆ
      </a>

      <section className="video-section">
        <div className="video-pretitle-wrap">
          <div className="video-pretitle-line" />
          <span className="video-pretitle">FILMY</span>
          <div className="video-pretitle-line" />
        </div>
        <h3>WIDEO I RELACJE MEDIALNE</h3>
        <div className="video-grid">
          {videoItems.map((video) => (
            <button
              key={video.id}
              type="button"
              onClick={() => setModalVideo(video.embedUrl)}
              className="video-card text-left w-full group cursor-pointer"
            >
              <div className="video-thumb">
                <img
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  loading="lazy"
                />
                <div className="video-play-overlay">
                  <div
                    className="flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      border: "2px solid rgba(196, 43, 43, 0.7)",
                    }}
                  >
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: "10px solid #C42B2B",
                        borderTop: "6px solid transparent",
                        borderBottom: "6px solid transparent",
                        marginLeft: "3px",
                      }}
                    />
                  </div>
                </div>
                <div
                  className="video-badge absolute bottom-2 left-2 transition-colors duration-200 bg-[#C42B2B] group-hover:bg-[#8B1A1A] text-white text-[8px] font-bold px-1.5 py-0.5"
                  style={{ fontFamily: "'Rajdhani', Trebuchet MS, sans-serif" }}
                >
                  {video.badge}
                </div>
              </div>
              <span className="video-title">{video.title}</span>
            </button>
          ))}
        </div>
      </section>

      {modalVideo && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{
            backgroundColor: "rgba(15, 23, 32, 0.92)",
            backdropFilter: "blur(8px)",
            zIndex: 50,
          }}
          onClick={handleBackdropClick}
        >
          <div className="relative w-[90%]" style={{ maxWidth: "860px" }}>
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 cursor-pointer"
              style={{
                fontFamily: "'Rajdhani', Trebuchet MS, sans-serif",
                fontSize: "20px",
                color: "#E4DDD0",
                background: "transparent",
                border: "none",
                padding: "8px",
              }}
            >
              ✕
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={`${modalVideo}?autoplay=1`}
                title="Video Player"
                className="w-full h-full"
                style={{ border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        .gallery-grid-wrap {
          background: linear-gradient(to bottom, #161F28, #1A2530, #161F28);
          color: #e4ddd0;
        }
        .edition-tabs {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }
        .edition-tab {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: transparent;
          color: #8898a6;
          padding: 8px 0;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          font-family: var(--font-rajdhani), sans-serif;
          font-size: clamp(1.5rem, 3vw, 32px);
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        .edition-tab.is-active {
          color: #e4ddd0;
          border-bottom-color: #c4922a;
        }
        .filter-bar {
          position: sticky;
          top: 0;
          z-index: 10;
          background: transparent;
          padding: 12px 5%;
          display: flex;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }
        .main-filter-list,
        .view-toggle,
        .location-filters {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .filter-pill,
        .view-btn,
        .location-pill {
          border: 1px solid #c4922a;
          background: transparent;
          color: #c4922a;
          font-family: var(--font-rajdhani), sans-serif;
          letter-spacing: 3px;
          font-weight: 700;
          border-radius: 0;
          transition: background-color 150ms ease, color 150ms ease;
          cursor: pointer;
          padding: 8px 14px;
          font-size: 11px;
        }
        .filter-pill.is-active,
        .view-btn.is-active,
        .location-pill.is-active {
          background: #c4922a;
          color: #1e2b38;
          border-color: #c4922a;
        }
        .location-filters {
          margin: 12px 0 14px;
          justify-content: center;
        }
        .edition-locked {
          background: transparent;
          border-radius: 8px;
          padding: 24px;
          min-height: 220px;
          margin-bottom: 12px;
          display: none;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
        }
        .locked-title {
          margin: 0 0 8px;
          font-size: 20px;
        }
        .locked-countdown {
          margin: 0 0 12px;
          color: #9ca9b4;
        }
        .locked-cta {
          color: #c4922a;
          text-decoration: none;
        }
        .photo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 3px;
          opacity: 1;
          transition: opacity 200ms ease;
        }
        .photo-grid.is-fading {
          opacity: 0.2;
        }
        .photo-grid.view-masonry {
          grid-auto-flow: dense;
          grid-auto-rows: 8px;
        }
        .photo-item {
          position: relative;
          overflow: hidden;
          background: transparent;
        }
        .photo-item.is-hidden {
          display: none;
        }
        .photo-item.wide {
          grid-column: span 2;
        }
        .photo-ratio {
          position: relative;
          width: 100%;
          padding-top: 75%;
        }
        .photo-ratio picture,
        .photo-ratio img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .photo-ratio img {
          object-fit: cover;
        }
        .photo-overlay {
          position: absolute;
          inset: 0;
          background: rgba(30, 43, 56, 0.85);
          opacity: 0;
          transition: opacity 200ms ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 14px;
        }
        .photo-item:hover .photo-overlay {
          opacity: 1;
        }
        .photo-title {
          margin: 0;
          font-size: 14px;
          color: #e4ddd0;
        }
        .photo-location {
          margin: 2px 0 0;
          color: #c4922a;
          font-size: 12px;
        }
        .photo-zoom {
          margin-top: 8px;
          font-size: 12px;
          color: #d7ccbc;
        }
        .category-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          padding: 3px 8px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2px;
        }
        .badge-hardest-hit {
          background: #8f2430;
          color: #ffe3e6;
        }
        .badge-szkolenia-k9 {
          background: #c4922a;
          color: #101010;
        }
        .badge-tccc {
          background: #5b1f1f;
          color: #ffe5e5;
        }
        .badge-konferencja {
          background: #1f6a42;
          color: #d4ffe9;
        }
        .badge-drony {
          background: #1f4f8a;
          color: #d9ecff;
        }
        .webp-badge {
          position: absolute;
          bottom: 8px;
          right: 8px;
          font-size: 7px;
          padding: 2px 4px;
          border-radius: 999px;
          background: rgba(15, 23, 32, 0.8);
          color: #253344;
        }
        .load-more-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin-top: 10px;
          text-decoration: none;
        }
        .video-section {
          margin-top: 28px;
          background: transparent;
        }
        .video-pretitle-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 16px;
        }
        .video-pretitle-line {
          height: 1px;
          flex: 1;
          background: linear-gradient(to right, transparent, rgba(196, 43, 43, 0.4), transparent);
        }
        .video-pretitle {
          margin-top: 40px;
          font-family: var(--font-rajdhani), sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 5px;
          color: #C42B2B;
        }
        .video-section h3 {
          margin: 0 0 12px;
          font-family: var(--font-rajdhani), sans-serif;
          font-size: clamp(1.5rem, 3vw, 32px);
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #E4DDD0;
          text-align: center;
        }
        .video-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 10px;
        }
        .video-card {
          position: relative;
          display: block;
          color: inherit;
          text-decoration: none;
          background: transparent;
          border: 1px solid #253344;
          overflow: hidden;
          padding: 0;
        }
        .video-thumb {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #151E28;
        }
        .video-card img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .video-play-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .video-title {
          display: block;
          margin-top: 8px;
          font-size: 11px;
          color: #E4DDD0;
          font-family: 'Rajdhani', Trebuchet MS, sans-serif;
        }
        .video-badge {
          letter-spacing: 0.2px;
        }
        @media (max-width: 720px) {
          .photo-item.wide {
            grid-column: span 1;
          }
        }
      `}</style>
    </div>
  );
}
