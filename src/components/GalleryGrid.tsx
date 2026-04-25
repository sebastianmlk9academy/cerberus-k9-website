import { useEffect, useMemo, useRef } from "react";

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
  { title: "Polska Zbrojna", href: "https://www.youtube.com/watch?v=kUhqmGhrbas", id: "kUhqmGhrbas" },
  { title: "TVP – Panorama", href: "https://youtu.be/Fo-j5vGI0m4", id: "Fo-j5vGI0m4" },
  { title: "Polskie Radio", href: "https://youtu.be/lf-Aek_TSzI", id: "lf-Aek_TSzI" },
  { title: "TVN - Fakty", href: "https://youtu.be/aNG1UVyOqNA", id: "aNG1UVyOqNA" },
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

export function GalleryGrid({ photos }: GalleryGridProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const visibleLimitRef = useRef<number>(12);

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
    const filterButtons = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-filter]"));
    const locationButtons = Array.from(
      root.querySelectorAll<HTMLButtonElement>("[data-location-filter]"),
    );
    const tabButtons = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-edition]"));
    const viewButtons = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-view]"));
    const loadMoreButton = root.querySelector<HTMLButtonElement>("[data-load-more]");
    const loadMoreText = root.querySelector<HTMLElement>("[data-load-more-count]");
    const lockedSection = root.querySelector<HTMLElement>("[data-locked-section]");
    const countdownText = root.querySelector<HTMLElement>("[data-countdown]");

    if (!grid || !loadMoreButton || !loadMoreText || !lockedSection || !countdownText) return;

    let activeCategory = "WSZYSTKO";
    let activeLocation = "WSZYSTKIE LOKALIZACJE";
    let activeEdition = "2025";
    let activeView = "SIATKA";

    const is2026Unlocked = new Date().getTime() >= RELEASE_2026_DATE.getTime();
    countdownText.textContent = formatCountdown(RELEASE_2026_DATE);

    const setActiveButton = (
      buttons: HTMLButtonElement[],
      key: "filter" | "locationFilter" | "edition" | "view",
      value: string,
    ) => {
      buttons.forEach((button) => {
        const buttonValue = button.dataset[key];
        const isActive = buttonValue === value;
        button.classList.toggle("is-active", isActive);
      });
    };

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

    const bindClick = (button: HTMLButtonElement, handler: () => void) => {
      button.addEventListener("click", handler);
      return () => button.removeEventListener("click", handler);
    };

    const cleanupFns: Array<() => void> = [];

    filterButtons.forEach((button) => {
      cleanupFns.push(
        bindClick(button, () => {
          activeCategory = button.dataset.filter || "WSZYSTKO";
          visibleLimitRef.current = 12;
          setActiveButton(filterButtons, "filter", activeCategory);
          updateVisibility();
        }),
      );
    });

    locationButtons.forEach((button) => {
      cleanupFns.push(
        bindClick(button, () => {
          activeLocation = button.dataset.locationFilter || "WSZYSTKIE LOKALIZACJE";
          visibleLimitRef.current = 12;
          setActiveButton(locationButtons, "locationFilter", activeLocation);
          updateVisibility();
        }),
      );
    });

    tabButtons.forEach((button) => {
      cleanupFns.push(
        bindClick(button, () => {
          const edition = button.dataset.edition || "2025";
          if (edition === "2026" && !is2026Unlocked) {
            activeEdition = "2026";
            setActiveButton(tabButtons, "edition", "2026");
            updateVisibility();
            return;
          }
          activeEdition = edition;
          visibleLimitRef.current = 12;
          setActiveButton(tabButtons, "edition", activeEdition);
          updateVisibility();
        }),
      );
    });

    viewButtons.forEach((button) => {
      cleanupFns.push(
        bindClick(button, () => {
          activeView = button.dataset.view || "SIATKA";
          setActiveButton(viewButtons, "view", activeView);
          grid.classList.toggle("view-masonry", activeView === "MASONRY");
        }),
      );
    });

    cleanupFns.push(
      bindClick(loadMoreButton, () => {
        visibleLimitRef.current += 12;
        updateVisibility();
      }),
    );

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
  }, [sortedPhotos]);

  const is2026Unlocked = new Date().getTime() >= RELEASE_2026_DATE.getTime();

  return (
    <div className="gallery-grid-wrap" ref={rootRef}>
      <div className="edition-tabs">
        <button type="button" className="edition-tab is-active" data-edition="2025">
          EDYCJA 2025 — TRÓJMIASTO
        </button>
        <button type="button" className="edition-tab" data-edition="2026">
          EDYCJA 2026 — OSTRÓW WIELKOPOLSKI {!is2026Unlocked ? " [AFTER 14.06.2026] 🔒" : ""}
        </button>
      </div>

      <div className="filter-bar">
        <div className="main-filter-list">
          {mainFilters.map((filter, idx) => (
            <button
              key={filter}
              type="button"
              className={`filter-pill ${idx === 0 ? "is-active" : ""}`}
              data-filter={filter}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="view-toggle">
          <button type="button" className="view-btn is-active" data-view="SIATKA">
            SIATKA
          </button>
          <button type="button" className="view-btn" data-view="MASONRY">
            MASONRY
          </button>
        </div>
      </div>

      <div className="location-filters">
        {locationFilters.map((location, idx) => (
          <button
            key={location}
            type="button"
            className={`location-pill ${idx === 0 ? "is-active" : ""}`}
            data-location-filter={location}
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

      <button type="button" className="load-more-btn" data-load-more>
        ZAŁADUJ WIĘCEJ — <span data-load-more-count>12</span> KOLEJNYCH ZDJĘĆ
      </button>

      <section className="video-section">
        <h3>WIDEO I RELACJE MEDIALNE</h3>
        <div className="video-grid">
          {videoItems.map((video) => (
            <a key={video.id} href={video.href} target="_blank" rel="noreferrer" className="video-card">
              <img
                src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                alt={video.title}
                loading="lazy"
              />
              <span className="video-play">▶</span>
              <span className="video-title">{video.title}</span>
            </a>
          ))}
        </div>
      </section>

      <style>{`
        .gallery-grid-wrap {
          color: #e4ddd0;
        }
        .edition-tabs {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }
        .edition-tab {
          border: none;
          background: transparent;
          color: #8898a6;
          padding: 8px 0;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          font-size: 14px;
        }
        .edition-tab.is-active {
          color: #e4ddd0;
          border-bottom-color: #c4922a;
        }
        .filter-bar {
          position: sticky;
          top: 0;
          z-index: 10;
          background: #0f1720;
          border-bottom: 1px solid #253344;
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
        .view-btn {
          border: 1px solid #253344;
          background: transparent;
          color: #4a5a6a;
          padding: 7px 11px;
          font-size: 12px;
          border-radius: 999px;
          cursor: pointer;
        }
        .filter-pill.is-active,
        .view-btn.is-active,
        .location-pill.is-active {
          background: #253344;
          color: #c4922a;
          border-color: #c4922a;
        }
        .location-filters {
          margin: 12px 0 14px;
        }
        .location-pill {
          border: 1px solid #253344;
          background: #111a24;
          color: #8a96a2;
          font-size: 11px;
          padding: 5px 10px;
          border-radius: 999px;
          cursor: pointer;
        }
        .edition-locked {
          background: rgba(14, 21, 29, 0.88);
          border: 1px solid #253344;
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
          background: #151e28;
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
          width: 100%;
          margin-top: 10px;
          border: 1px solid #253344;
          background: transparent;
          color: #c4922a;
          padding: 12px 16px;
          cursor: pointer;
        }
        .video-section {
          margin-top: 28px;
        }
        .video-section h3 {
          margin-bottom: 12px;
          letter-spacing: 0.2px;
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
          background: #151e28;
          border: 1px solid #253344;
          overflow: hidden;
        }
        .video-card img {
          display: block;
          width: 100%;
          height: auto;
        }
        .video-play {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: rgba(12, 18, 26, 0.8);
          border: 1px solid #c4922a;
          width: 44px;
          height: 44px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          color: #c4922a;
        }
        .video-title {
          display: block;
          padding: 8px 10px;
          font-size: 13px;
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
