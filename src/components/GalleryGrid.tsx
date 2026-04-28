import { Lock } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, MouseEvent as ReactMouseEvent } from "react";
import { ui } from "../i18n/ui";
import type { Lang } from "../i18n/utils";

/** Canonical gallery category values (aligned with CMS + content schema). */
type GalleryCategory =
  | "HARDEST_HIT"
  | "SZKOLENIA_K9"
  | "TCCC"
  | "KONFERENCJA"
  | "DRONY"
  | "CEREMONIA"
  | "SAR"
  | "OGOLNE";

type LocationFilterId = "all" | "lpg" | "gryf" | "stena" | "arena" | "school" | "stadium";

type ViewModeId = "grid" | "masonry";

type PhotoItem = {
  title: string;
  category?: GalleryCategory;
  location: string;
  edition: string;
  photo: string;
  alt: string;
  tags?: string[];
};

export interface CmsGalleryFilter {
  key: string;
  label_pl: string;
  label_en?: string;
  label_de?: string;
  category_value?: string;
}

type GalleryGridProps = {
  lang: Lang;
  photos: PhotoItem[];
  unlockDate?: string;
  videoItems?: Array<{ title?: string; url?: string; badge?: string; thumbnail?: string }>;
  pressItems?: Array<{
    outlet: string;
    outlet_logo?: string;
    url?: string;
    date?: string;
    description?: string;
    title?: string;
  }>;
  cmsFilters?: CmsGalleryFilter[];
};

type GalleryLabels = {
  allLocations: string;
  all: string;
  photos: string;
  videos: string;
  loadMore: string;
  morePhotos: string;
  edition2025: string;
  edition2026: string;
  locationLPG: string;
  locationGryf: string;
  locationStena: string;
  locationArena: string;
  locationSchool: string;
  locationStadion: string;
  viewGrid: string;
  viewMasonry: string;
  lockedTitle: string;
  lockedCountdownPrefix: string;
  registerCta: string;
  videoSectionTitle: string;
  enlarge: string;
  countdownEmpty: string;
  countdownDay: string;
  countdownHour: string;
};

const categoryBadgeClass: Record<GalleryCategory, string> = {
  HARDEST_HIT: "badge-hardest-hit",
  SZKOLENIA_K9: "badge-szkolenia-k9",
  TCCC: "badge-tccc",
  KONFERENCJA: "badge-konferencja",
  DRONY: "badge-drony",
  CEREMONIA: "badge-ceremonia",
  SAR: "badge-sar",
  OGOLNE: "badge-ogolne",
};

const CATEGORY_VALUES: GalleryCategory[] = [
  "HARDEST_HIT",
  "SZKOLENIA_K9",
  "TCCC",
  "KONFERENCJA",
  "DRONY",
  "CEREMONIA",
  "SAR",
  "OGOLNE",
];

/** Visible badge / branding text (stored value is canonical). */
const galleryCategoryDisplayText: Record<GalleryCategory, string> = {
  HARDEST_HIT: "HARDEST HIT",
  SZKOLENIA_K9: "SZKOLENIA K9",
  TCCC: "TCCC",
  KONFERENCJA: "KONFERENCJA",
  DRONY: "DRONY",
  CEREMONIA: "CEREMONIA",
  SAR: "SAR",
  OGOLNE: "OGÓLNE",
};

const MAIN_FILTER_CATEGORY_LABEL: Record<string, string> = {
  HARDEST_HIT: "HARDEST HIT",
  SZKOLENIA_K9: "SZKOLENIA K9",
  TCCC: "TCCC",
  KONFERENCJA: "KONFERENCJA",
  DRONY: "DRONY",
};

function resolveCategoryForBadge(category: string): GalleryCategory | null {
  const n = normalize(category);
  return CATEGORY_VALUES.find((c) => normalize(c) === n) ?? null;
}

function getGalleryFilterLabel(key: string, lang: Lang, cmsFilters?: CmsGalleryFilter[]): string {
  if (key === "all" || key === "ALL") {
    return lang === "pl" ? "WSZYSTKO" : lang === "en" ? "ALL" : lang === "de" ? "ALLE" : "ALL";
  }
  if (cmsFilters && cmsFilters.length > 0) {
    const f = cmsFilters.find((cf) => cf.key === key);
    if (f) {
      if (lang === "pl") return f.label_pl;
      if (lang === "en") return f.label_en ?? f.label_pl;
      if (lang === "de") return f.label_de ?? f.label_pl;
      return f.label_pl;
    }
  }
  return MAIN_FILTER_CATEGORY_LABEL[key] ?? key.replace(/_/g, " ");
}

function categoryMatchesFilter(
  itemCategory: string,
  filterKey: string,
  cmsFilters?: CmsGalleryFilter[],
): boolean {
  if (filterKey === "all" || filterKey === "ALL") return true;
  const cmsDef = cmsFilters?.find((f) => f.key === filterKey);
  const targetValue =
    cmsDef && cmsDef.category_value != null && String(cmsDef.category_value).trim() !== ""
      ? cmsDef.category_value
      : filterKey;
  const normalize = (s: string) =>
    s
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/ą/g, "a")
      .replace(/ę/g, "e")
      .replace(/ó/g, "o")
      .replace(/ś/g, "s")
      .replace(/ł/g, "l")
      .replace(/ż/g, "z")
      .replace(/ź/g, "z")
      .replace(/ć/g, "c")
      .replace(/ń/g, "n");
  return normalize(itemCategory) === normalize(String(targetValue));
}

function categoryBadgeLabel(category: string): string {
  const key = resolveCategoryForBadge(category);
  return key ? galleryCategoryDisplayText[key] : category;
}

const MAIN_FILTER_IDS_FALLBACK = [
  "all",
  "HARDEST_HIT",
  "SZKOLENIA_K9",
  "TCCC",
  "KONFERENCJA",
  "DRONY",
] as const;

const LOCATION_FILTER_IDS: LocationFilterId[] = [
  "all",
  "lpg",
  "gryf",
  "stena",
  "arena",
  "school",
  "stadium",
];

const CANONICAL_LOCATION_BY_ID: Record<Exclude<LocationFilterId, "all">, string> = {
  lpg: "Terminal LPG",
  gryf: "Muzeum Gryf",
  stena: "Stena Line",
  arena: "3MK Arena",
  school: "Szkoła Mundurowa",
  stadium: "Stadion Miejski",
};

const galleryLabelsEn: GalleryLabels = {
  allLocations: "ALL LOCATIONS",
  all: "ALL",
  photos: "PHOTOS",
  videos: "VIDEOS",
  loadMore: "LOAD MORE",
  morePhotos: "MORE PHOTOS",
  edition2025: "EDITION 2025 — TRICITY",
  edition2026: "EDITION 2026 — OSTRÓW WIELKOPOLSKI",
  locationLPG: "LPG Terminal",
  locationGryf: "Gryf Museum",
  locationStena: "Stena Line",
  locationArena: "3MK Arena",
  locationSchool: "Uniform School",
  locationStadion: "City Stadium",
  viewGrid: "GRID",
  viewMasonry: "MASONRY",
  lockedTitle: "Photos will appear after the event ends",
  lockedCountdownPrefix: "Unlocks in:",
  registerCta: "REGISTER AND YOU WILL BE HERE",
  videoSectionTitle: "VIDEO AND MEDIA COVERAGE",
  enlarge: "🔍 Enlarge",
  countdownEmpty: "0 days",
  countdownDay: "days",
  countdownHour: "hrs",
};

const galleryLabelsPl: GalleryLabels = {
  allLocations: "WSZYSTKIE LOKALIZACJE",
  all: "WSZYSTKO",
  photos: "ZDJĘCIA",
  videos: "FILMY",
  loadMore: "ZAŁADUJ WIĘCEJ",
  morePhotos: "KOLEJNYCH ZDJĘĆ",
  edition2025: "EDYCJA 2025 — TRÓJMIASTO",
  edition2026: "EDYCJA 2026 — OSTRÓW WIELKOPOLSKI",
  locationLPG: "Terminal LPG",
  locationGryf: "Muzeum Gryf",
  locationStena: "Stena Line",
  locationArena: "3MK Arena",
  locationSchool: "Szkoła Mundurowa",
  locationStadion: "Stadion Miejski",
  viewGrid: "SIATKA",
  viewMasonry: "MASONRY",
  lockedTitle: "Zdjęcia pojawią się po zakończeniu eventu",
  lockedCountdownPrefix: "Odblokowanie za:",
  registerCta: "ZAREJESTRUJ SIĘ I BĘDZIESZ TUTAJ",
  videoSectionTitle: "WIDEO I RELACJE MEDIALNE",
  enlarge: "🔍 Powiększ",
  countdownEmpty: "0 dni",
  countdownDay: "dni",
  countdownHour: "godz.",
};

const galleryLabelsDe: GalleryLabels = {
  allLocations: "ALLE STANDORTE",
  all: "ALLE",
  photos: "FOTOS",
  videos: "VIDEOS",
  loadMore: "MEHR LADEN",
  morePhotos: "WEITERE FOTOS",
  edition2025: "AUSGABE 2025 — DREISTADT",
  edition2026: "AUSGABE 2026 — OSTRÓW WIELKOPOLSKI",
  locationLPG: "LPG-Terminal",
  locationGryf: "Gryf-Museum",
  locationStena: "Stena Line",
  locationArena: "3MK Arena",
  locationSchool: "Uniformschule",
  locationStadion: "Stadtstadion",
  viewGrid: "RASTER",
  viewMasonry: "MASONRY",
  lockedTitle: "Fotos erscheinen nach Ende der Veranstaltung",
  lockedCountdownPrefix: "Freischaltung in:",
  registerCta: "JETZT ANMELDEN UND DABEI SEIN",
  videoSectionTitle: "VIDEOS UND MEDIENBERICHTE",
  enlarge: "🔍 Vergrößern",
  countdownEmpty: "0 Tage",
  countdownDay: "Tage",
  countdownHour: "Std.",
};

/** Core strings per language; merged with English defaults for missing keys. */
const galleryLabelsCore: Partial<Record<Lang, Partial<GalleryLabels>>> = {
  fr: {
    allLocations: "TOUS LES LIEUX",
    all: "TOUT",
    photos: "PHOTOS",
    videos: "VIDÉOS",
    loadMore: "CHARGER PLUS",
    morePhotos: "AUTRES PHOTOS",
  },
  hr: {
    allLocations: "SVE LOKACIJE",
    all: "SVE",
    photos: "FOTOGRAFIJE",
    videos: "VIDEO",
    loadMore: "UČITAJ VIŠE",
    morePhotos: "SLJEDEĆIH FOTOGRAFIJA",
  },
  cs: {
    allLocations: "VŠECHNY LOKALITY",
    all: "VŠE",
    photos: "FOTKY",
    videos: "VIDEA",
    loadMore: "NAČÍST VÍCE",
    morePhotos: "DALŠÍCH FOTEK",
  },
  lt: {
    allLocations: "VISOS VIETOS",
    all: "VISKAS",
    photos: "NUOTRAUKOS",
    videos: "VAIZDO ĮRAŠAI",
    loadMore: "ĮKELTI DAUGIAU",
    morePhotos: "KITŲ NUOTRAUKŲ",
  },
  lv: {
    allLocations: "VISAS LOKĀCIJAS",
    all: "VISS",
    photos: "FOTO",
    videos: "VIDEO",
    loadMore: "IELĀDĒT VAIRĀK",
    morePhotos: "NĀKAMO FOTO",
  },
  sk: {
    allLocations: "VŠETKY LOKALITY",
    all: "VŠETKO",
    photos: "FOTKY",
    videos: "VIDEÁ",
    loadMore: "NAČÍTAŤ VIAC",
    morePhotos: "ĎALŠÍCH FOTIEK",
  },
  sl: {
    allLocations: "VSE LOKACIJE",
    all: "VSE",
    photos: "FOTOGRAFIJE",
    videos: "VIDEI",
    loadMore: "NALOŽI VEČ",
    morePhotos: "NASLEDNJIH FOTOGRAFIJ",
  },
  hu: {
    allLocations: "ÖSSZES HELYSZÍN",
    all: "ÖSSZES",
    photos: "FOTÓK",
    videos: "VIDEÓK",
    loadMore: "TÖBB BETÖLTÉSE",
    morePhotos: "TOVÁBBI FOTÓ",
  },
  no: {
    allLocations: "ALLE STEDER",
    all: "ALLE",
    photos: "BILDER",
    videos: "VIDEOER",
    loadMore: "LAST INN FLERE",
    morePhotos: "FLERE BILDER",
  },
  sv: {
    allLocations: "ALLA PLATSER",
    all: "ALLT",
    photos: "BILDER",
    videos: "VIDEOR",
    loadMore: "LADDA FLER",
    morePhotos: "FLER BILDER",
  },
  nl: {
    allLocations: "ALLE LOCATIES",
    all: "ALLES",
    photos: "FOTO'S",
    videos: "VIDEO'S",
    loadMore: "MEER LADEN",
    morePhotos: "VOLGENDE FOTO'S",
  },
  es: {
    allLocations: "TODAS LAS UBICACIONES",
    all: "TODO",
    photos: "FOTOS",
    videos: "VIDEOS",
    loadMore: "CARGAR MÁS",
    morePhotos: "MÁS FOTOS",
  },
  pt: {
    allLocations: "TODOS OS LOCAIS",
    all: "TUDO",
    photos: "FOTOS",
    videos: "VÍDEOS",
    loadMore: "CARREGAR MAIS",
    morePhotos: "PRÓXIMAS FOTOS",
  },
  ro: {
    allLocations: "TOATE LOCAȚIILE",
    all: "TOT",
    photos: "FOTOGRAFII",
    videos: "VIDEO",
    loadMore: "ÎNCARCĂ MAI MULT",
    morePhotos: "URMĂTOARELE FOTOGRAFII",
  },
  it: {
    allLocations: "TUTTE LE SEDI",
    all: "TUTTO",
    photos: "FOTO",
    videos: "VIDEO",
    loadMore: "CARICA ALTRO",
    morePhotos: "ALTRE FOTO",
  },
  ko: {
    allLocations: "모든 장소",
    all: "전체",
    photos: "사진",
    videos: "영상",
    loadMore: "더 불러오기",
    morePhotos: "다음 사진",
  },
};

function resolveGalleryLabels(lang: Lang): GalleryLabels {
  if (lang === "pl") return galleryLabelsPl;
  if (lang === "de") return galleryLabelsDe;
  if (lang === "en") return galleryLabelsEn;
  const core = galleryLabelsCore[lang];
  return { ...galleryLabelsEn, ...core };
}

const fallbackVideoItems: Array<{
  title: string;
  badge: string;
  embedUrl: string;
  id: string;
  thumbUrl: string | null;
}> = [
  {
    title: "CERBERUS K9 2025 - Główna relacja",
    badge: "POLSKA ZBROJNA · PATRON MEDIALNY",
    embedUrl: "https://www.youtube.com/embed/kUhqmGhrbas",
    id: "kUhqmGhrbas",
    thumbUrl: null,
  },
  {
    title: "TVP — Relacja z CERBERUS K9 2025",
    badge: "TVP",
    embedUrl: "https://www.youtube.com/embed/Fo-j5vGI0m4",
    id: "Fo-j5vGI0m4",
    thumbUrl: null,
  },
  {
    title: "Polskie Radio — Reportaż i wywiad",
    badge: "Polskie Radio",
    embedUrl: "https://www.youtube.com/embed/lf-Aek_TSzI",
    id: "lf-Aek_TSzI",
    thumbUrl: null,
  },
  {
    title: "TVN — Fakty",
    badge: "TVN",
    embedUrl: "https://www.youtube.com/embed/aNG1UVyOqNA",
    id: "aNG1UVyOqNA",
    thumbUrl: null,
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

function formatCountdown(targetDate: Date, labels: GalleryLabels): string {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();
  if (diff <= 0) {
    return labels.countdownEmpty;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  return `${days} ${labels.countdownDay} ${hours} ${labels.countdownHour}`;
}

function locationLabelForId(id: LocationFilterId, labels: GalleryLabels): string {
  switch (id) {
    case "all":
      return labels.allLocations;
    case "lpg":
      return labels.locationLPG;
    case "gryf":
      return labels.locationGryf;
    case "stena":
      return labels.locationStena;
    case "arena":
      return labels.locationArena;
    case "school":
      return labels.locationSchool;
    case "stadium":
      return labels.locationStadion;
    default:
      return labels.allLocations;
  }
}

function locationMatchesFilter(photoLocation: string, filterId: LocationFilterId): boolean {
  if (filterId === "all") return true;
  const canonical = CANONICAL_LOCATION_BY_ID[filterId];
  return normalize(photoLocation) === normalize(canonical);
}

const partnerButtonStyle: CSSProperties = {
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

const handlePartnerButtonMouseEnter = (e: ReactMouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
  e.currentTarget.style.backgroundColor = "#C4922A";
  e.currentTarget.style.color = "#1E2B38";
};

const handlePartnerButtonMouseLeave = (e: ReactMouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
  e.currentTarget.style.backgroundColor = "transparent";
  e.currentTarget.style.color = "#C4922A";
};

function toYoutubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) return parsed.pathname.replace("/", "") || null;
    if (parsed.hostname.includes("youtube.com")) return parsed.searchParams.get("v");
  } catch {
    return null;
  }
  return null;
}

export function GalleryGrid({
  photos,
  lang,
  unlockDate,
  videoItems,
  cmsFilters,
  pressItems = [],
}: GalleryGridProps) {
  const mainFilterIds: string[] =
    cmsFilters && cmsFilters.length > 0
      ? cmsFilters.map((f) => f.key)
      : [...MAIN_FILTER_IDS_FALLBACK];

  const [activeCategory, setActiveCategory] = useState<string>(() => {
    const allKey = mainFilterIds.find((k) => k === "all" || k === "ALL");
    return allKey ?? mainFilterIds[0] ?? "all";
  });
  const releaseDate = unlockDate
    ? new Date(unlockDate)
    : new Date('2026-06-14T00:00:00');
  const normalizedVideoItems =
    (videoItems && videoItems.length > 0
      ? videoItems
          .filter((v) => (v.url ?? "").trim())
          .map((v) => {
            const url = (v.url ?? "").trim();
            const id = toYoutubeVideoId(url) ?? "";
            const thumb = (v.thumbnail ?? "").trim();
            return {
              title: v.title?.trim() || "Video",
              badge: v.badge?.trim() || "",
              embedUrl: id ? `https://www.youtube.com/embed/${id}` : url,
              id: id || url,
              thumbUrl: thumb || null,
            };
          })
      : fallbackVideoItems);
  const galleryLabels = resolveGalleryLabels(lang);
  const safeUi = ui[lang] ?? ui.pl;

  const translatedMainFilterLabels = mainFilterIds.map((filterId) =>
    filterId === "all" || filterId === "ALL"
      ? ((safeUi as Record<string, string>).filter_all ?? galleryLabels.all)
      : getGalleryFilterLabel(filterId, lang, cmsFilters),
  );

  const rootRef = useRef<HTMLDivElement | null>(null);
  const visibleLimitRef = useRef<number>(12);
  const [activeLocation, setActiveLocation] = useState<LocationFilterId>("all");
  const [activeView, setActiveView] = useState<ViewModeId>("grid");
  const [activeEdition, setActiveEdition] = useState<string>("2025");
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

    const is2026Unlocked = new Date().getTime() >= releaseDate.getTime();
    countdownText.textContent = formatCountdown(releaseDate, galleryLabels);

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

          const categoryMatch = categoryMatchesFilter(category, activeCategory, cmsFilters);
          const locationMatch = locationMatchesFilter(location, activeLocation);
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

    const bindClick = (button: HTMLElement, handler: (event: globalThis.MouseEvent) => void) => {
      button.addEventListener("click", handler);
      return () => button.removeEventListener("click", handler);
    };

    const cleanupFns: Array<() => void> = [];

    tabButtons.forEach((button) => {
      cleanupFns.push(
        bindClick(button, () => {
          const editionRaw = button.dataset.edition || "2025";
          const edition: string = editionRaw === "2026" ? "2026" : editionRaw === "2025" ? "2025" : editionRaw;
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
    grid.classList.toggle("view-masonry", activeView === "masonry");

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
  }, [
    sortedPhotos,
    activeCategory,
    activeLocation,
    activeEdition,
    activeView,
    galleryLabels,
    releaseDate,
    cmsFilters,
  ]);

  const is2026Unlocked = new Date().getTime() >= releaseDate.getTime();
  const handleBackdropClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="gallery-grid-wrap mb-5 w-full overflow-x-hidden" ref={rootRef}>
      <div className="mt-[40px] mb-8 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C42B2B]/40 to-transparent" />
          <span className="font-[family-name:var(--font-rajdhani)] text-[12px] font-medium tracking-[5px] text-[#C42B2B]">
            {galleryLabels.photos}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C42B2B]/40 to-transparent" />
        </div>
      </div>
      <div className="edition-tabs">
        <button type="button" className="edition-tab is-active" data-edition="2025">
          {galleryLabels.edition2025}
        </button>
        <button type="button" className="edition-tab" data-edition="2026">
          {galleryLabels.edition2026}
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
          {mainFilterIds.map((filterId, index) => (
            <button
              key={filterId}
              type="button"
              className="filter-pill"
              data-filter={filterId}
              onClick={() => {
                setActiveCategory(filterId);
                visibleLimitRef.current = 12;
              }}
              style={{
                ...partnerButtonStyle,
                backgroundColor: activeCategory === filterId ? "#C4922A" : "transparent",
                color: activeCategory === filterId ? "#1E2B38" : "#C4922A",
                padding: "8px 14px",
                fontSize: 11,
              }}
              onMouseEnter={handlePartnerButtonMouseEnter}
              onMouseLeave={(e) => {
                if (activeCategory === filterId) return;
                handlePartnerButtonMouseLeave(e);
              }}
            >
              {translatedMainFilterLabels[index]}
            </button>
          ))}
        </div>

        <div className="view-toggle">
          <button
            type="button"
            className="view-btn"
            data-view="grid"
            onClick={() => setActiveView("grid")}
            style={{
              ...partnerButtonStyle,
              backgroundColor: activeView === "grid" ? "#C4922A" : "transparent",
              color: activeView === "grid" ? "#1E2B38" : "#C4922A",
              padding: "8px 14px",
              fontSize: 11,
            }}
            onMouseEnter={handlePartnerButtonMouseEnter}
            onMouseLeave={(e) => {
              if (activeView === "grid") return;
              handlePartnerButtonMouseLeave(e);
            }}
          >
            {galleryLabels.viewGrid}
          </button>
          <button
            type="button"
            className="view-btn"
            data-view="masonry"
            onClick={() => setActiveView("masonry")}
            style={{
              ...partnerButtonStyle,
              backgroundColor: activeView === "masonry" ? "#C4922A" : "transparent",
              color: activeView === "masonry" ? "#1E2B38" : "#C4922A",
              padding: "8px 14px",
              fontSize: 11,
            }}
            onMouseEnter={handlePartnerButtonMouseEnter}
            onMouseLeave={(e) => {
              if (activeView === "masonry") return;
              handlePartnerButtonMouseLeave(e);
            }}
          >
            {galleryLabels.viewMasonry}
          </button>
        </div>
      </div>

      <div className="location-filters">
        {LOCATION_FILTER_IDS.map((locationId) => (
          <button
            key={locationId}
            type="button"
            className="location-pill"
            data-location-filter={locationId}
            onClick={() => {
              setActiveLocation(locationId);
              visibleLimitRef.current = 12;
            }}
            style={{
              ...partnerButtonStyle,
              backgroundColor: activeLocation === locationId ? "#C4922A" : "transparent",
              color: activeLocation === locationId ? "#1E2B38" : "#C4922A",
              padding: "8px 14px",
              fontSize: 11,
            }}
            onMouseEnter={handlePartnerButtonMouseEnter}
            onMouseLeave={(e) => {
              if (activeLocation === locationId) return;
              handlePartnerButtonMouseLeave(e);
            }}
          >
            {locationLabelForId(locationId, galleryLabels)}
          </button>
        ))}
      </div>

      <section className="edition-locked" data-locked-section>
        <p className="locked-title">{galleryLabels.lockedTitle}</p>
        <p className="locked-countdown">
          {galleryLabels.lockedCountdownPrefix}{" "}
          <strong data-countdown>{galleryLabels.countdownEmpty}</strong>
        </p>
        <a
          href={`/${lang}/rejestracja`}
          className="flex items-center justify-center cursor-pointer transition-colors w-full sm:w-auto text-[10px] sm:text-[11px] px-5 py-3 sm:px-6 sm:py-3.5 text-decoration-none"
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
          {galleryLabels.registerCta} <span className="ml-1">↗</span>
        </a>
      </section>

      <div className="photo-grid" data-gallery-grid>
        {sortedPhotos.map((item, index) => {
          const isWide = index % 9 === 0 || item.tags?.some((tag) => normalize(tag) === "wide");
          const jpgFallback = toJpgFallback(item.photo);
          const categoryKey = resolveCategoryForBadge(item.category ?? "");
          const badgeClass = categoryKey ? categoryBadgeClass[categoryKey] : "badge-hardest-hit";
          return (
            <article
              key={item.id}
              className={`photo-item ${isWide ? "wide" : ""}`}
              data-photo-item
              data-category={item.category ?? ""}
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
                  <span className="photo-zoom">{galleryLabels.enlarge}</span>
                </div>
                <span className={`category-badge ${badgeClass}`}>
                  {categoryBadgeLabel(item.category ?? "")}
                </span>
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
        {galleryLabels.loadMore} — <span data-load-more-count>12</span> {galleryLabels.morePhotos}
      </a>

      <section className="video-section">
        <div className="video-pretitle-wrap">
          <div className="video-pretitle-line" />
          <span className="video-pretitle">{galleryLabels.videos}</span>
          <div className="video-pretitle-line" />
        </div>
        <h3>{galleryLabels.videoSectionTitle}</h3>
        <div className="video-grid">
          {normalizedVideoItems.map((video) => (
            <button
              key={video.id}
              type="button"
              onClick={() => setModalVideo(video.embedUrl)}
              className="video-card text-left w-full group cursor-pointer"
            >
              <div className="video-thumb">
                <img
                  src={
                    video.thumbUrl ||
                    (video.id && !String(video.id).includes("/")
                      ? `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`
                      : "")
                  }
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

      {pressItems.length > 0 && (
        <div className="press-section">
          <div className="video-pretitle-wrap">
            <div className="video-pretitle-line" />
            <span className="video-pretitle">
              {lang === "pl" ? "PRASA" : lang === "en" ? "PRESS" : lang === "de" ? "MEDIEN" : "PRESS"}
            </span>
            <div className="video-pretitle-line" />
          </div>
          <h3 className="press-section-heading">
            {lang === "pl"
              ? "RELACJE MEDIALNE"
              : lang === "en"
                ? "MEDIA COVERAGE"
                : lang === "de"
                  ? "MEDIENBERICHTE"
                  : "MEDIA COVERAGE"}
          </h3>
          <div className="press-grid">
            {pressItems.map((item, idx) => (
              <a
                key={idx}
                href={item.url?.trim() ? item.url : "#"}
                target={item.url?.trim() ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="press-card"
              >
                {item.outlet_logo ? (
                  <img src={item.outlet_logo} alt={item.outlet} className="press-logo" loading="lazy" />
                ) : null}
                <div className="press-info">
                  {item.outlet ? <span className="press-outlet">{item.outlet}</span> : null}
                  {item.date ? <span className="press-date">{item.date}</span> : null}
                  {item.title ? <p className="press-title">{item.title}</p> : null}
                  {item.description ? <p className="press-description">{item.description}</p> : null}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

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
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
          box-sizing: border-box;
        }
        .gallery-grid-wrap *,
        .gallery-grid-wrap *::before,
        .gallery-grid-wrap *::after {
          box-sizing: border-box;
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
        .photo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
          gap: clamp(6px, 1.2vw, 14px);
          opacity: 1;
          transition: opacity 200ms ease;
          width: 100%;
          min-width: 0;
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
          width: 100%;
          min-width: 0;
        }
        .photo-item.is-hidden {
          display: none;
        }
        .photo-item.wide {
          grid-column: span 2;
        }
        .photo-item > a {
          display: block;
          width: 100%;
        }
        .photo-ratio {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
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
        .badge-ceremonia {
          background: #4a2d6e;
          color: #efe5ff;
        }
        .badge-sar {
          background: #2d5a4e;
          color: #dff5ec;
        }
        .badge-ogolne {
          background: #3d4550;
          color: #e4ddd0;
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
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
          gap: clamp(8px, 1.4vw, 16px);
          width: 100%;
          min-width: 0;
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
          width: 100%;
          min-width: 0;
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
        .press-section {
          margin-top: 28px;
          background: transparent;
        }
        .press-section-heading {
          margin: 0 0 12px;
          font-family: var(--font-rajdhani), sans-serif;
          font-size: clamp(1.5rem, 3vw, 32px);
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #e4ddd0;
          text-align: center;
        }
        .press-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
          gap: clamp(8px, 1.4vw, 16px);
          width: 100%;
          min-width: 0;
        }
        .press-card {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 14px;
          border: 1px solid #253344;
          background: transparent;
          color: inherit;
          text-decoration: none;
          min-height: 120px;
        }
        .press-logo {
          max-height: 48px;
          width: auto;
          object-fit: contain;
          align-self: flex-start;
        }
        .press-info {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .press-outlet {
          font-weight: 700;
          color: #c4922a;
          font-size: 12px;
          letter-spacing: 0.5px;
        }
        .press-date {
          font-size: 11px;
          color: #9ca9b4;
        }
        .press-title {
          margin: 0;
          font-size: 13px;
          color: #e4ddd0;
        }
        .press-description {
          margin: 0;
          font-size: 11px;
          color: #b8c0c8;
          line-height: 1.4;
        }
        @media (min-width: 1024px) {
          .gallery-grid-wrap {
            width: 100%;
            max-width: 100%;
            margin-left: 0;
            margin-right: 0;
            padding-left: 0;
            padding-right: 0;
          }
          .photo-grid {
            grid-template-columns: repeat(5, minmax(0, 1fr));
            gap: clamp(8px, 0.9vw, 14px);
          }
          .video-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: clamp(10px, 1vw, 16px);
          }
          .press-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: clamp(10px, 1vw, 16px);
          }
        }
        @media (max-width: 720px) {
          .photo-item.wide {
            grid-column: span 1;
          }
        }
        @media (max-width: 960px) {
          .photo-item.wide {
            grid-column: span 1;
          }
        }
      `}</style>
    </div>
  );
}
