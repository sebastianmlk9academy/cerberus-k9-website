import { Calendar } from "lucide-react";
import { useMemo, useState } from "react";
import type { Lang } from "../i18n/utils";
import { CATEGORY_META, normalizeCategory, type AgendaCategory, type Category } from "../lib/agendaCategories";

interface AgendaItem {
  id: string;
  start: string; // "HH:MM"
  end: string;
  title: string;
  location: string;
  locationMapUrl?: string;
  category: string;
  description: string;
  instructor?: string;
}

interface DaySchedule {
  id: string;
  label: string;
  date: string; // YYYY-MM-DD
  items: AgendaItem[];
}

/** Mirrors `src/content/program/*.md` when CMS is empty — keeps the agenda usable offline. */
const FALLBACK_AGENDA_ITEMS: DaySchedule[] = [
  {
    id: "day1",
    label: "DZIEŃ 1",
    date: "2026-06-13",
    items: [
      { id: "fallback-d1-1", start: "08:00", end: "08:30", title: "Ceremonia otwarcia", location: "Arena Główna", locationMapUrl: "https://maps.app.goo.gl/CWqX9Ahtre9hxoCi9", category: "CEREMONIA", description: "Powitanie uczestników, krótka prezentacja." },
      { id: "fallback-d1-2", start: "08:30", end: "09:00", title: "Przerwa kawowa", location: "3MK Arena", locationMapUrl: "https://maps.app.goo.gl/CWqX9Ahtre9hxoCi9", category: "BREAK", description: "Networking i rejestracja uczestników." },
      { id: "fallback-d1-3", start: "09:00", end: "10:30", title: "Taktyczne gryzienie K9 — moduł podstawowy", location: "3MK Arena", locationMapUrl: "https://maps.app.goo.gl/CWqX9Ahtre9hxoCi9", category: "K9", description: "Demonstracje i warsztaty z zakresu pracy operacyjnej psów." },
      { id: "fallback-d1-4", start: "10:45", end: "12:15", title: "TCCC dla operatorów", location: "Szkoła Mundurowa", locationMapUrl: "https://maps.app.goo.gl/R85x82c3oZypsCCg8", category: "TCCC", description: "Medycyna pola walki i procedury ratunkowe." },
      { id: "fallback-d1-5", start: "12:15", end: "13:15", title: "Lunch", location: "—", locationMapUrl: "https://maps.app.goo.gl/CWqX9Ahtre9hxoCi9", category: "BREAK", description: "" },
      { id: "fallback-d1-6", start: "13:15", end: "15:00", title: "Detekcja ładunków wybuchowych", location: "Stadion Miejski", locationMapUrl: "https://maps.app.goo.gl/WgcxvdizJJre44iX7", category: "K9", description: "Scenariusze wyszukiwania i oznaczania zagrożeń." },
      { id: "fallback-d1-7", start: "15:15", end: "16:45", title: "Drony rozpoznawcze — wprowadzenie", location: "Stadion Miejski", locationMapUrl: "https://maps.app.goo.gl/WgcxvdizJJre44iX7", category: "DRONY", description: "Taktyka UAV i bezpieczeństwo operacji." },
      { id: "fallback-d1-8", start: "17:00", end: "18:30", title: "Konferencja bezpieczeństwa — sesja I", location: "3MK Arena", locationMapUrl: "https://maps.app.goo.gl/CWqX9Ahtre9hxoCi9", category: "KONFERENCJA", description: "Panel ekspertów: interoperacyjność i gotowość." },
      { id: "fallback-d1-9", start: "18:45", end: "19:00", title: "Zamknięcie dnia", location: "3MK Arena", locationMapUrl: "https://maps.app.goo.gl/CWqX9Ahtre9hxoCi9", category: "CEREMONIA", description: "Podsumowanie i komunikaty organizacyjne." },
    ],
  },
  {
    id: "day2",
    label: "DZIEŃ 2",
    date: "2026-06-14",
    items: [
      { id: "fallback-d2-1", start: "08:30", end: "09:00", title: "Rejestracja drugiego dnia", location: "3MK Arena", locationMapUrl: "https://maps.app.goo.gl/CWqX9Ahtre9hxoCi9", category: "CEREMONIA", description: "Wejście i odprawa." },
      { id: "fallback-d2-2", start: "09:00", end: "11:00", title: "Moduł zaawansowany K9", location: "3MK Arena", locationMapUrl: "https://maps.app.goo.gl/CWqX9Ahtre9hxoCi9", category: "K9", description: "Zaawansowane scenariusze operacyjne." },
      { id: "fallback-d2-3", start: "11:15", end: "12:45", title: "Medycyna pola walki TCCC", location: "Szkoła Mundurowa", locationMapUrl: "https://maps.app.goo.gl/R85x82c3oZypsCCg8", category: "TCCC", description: "Procedury dla zespołów taktycznych." },
      { id: "fallback-d2-4", start: "13:00", end: "14:30", title: "Swarm i taktyka UAV", location: "Stadion Miejski", locationMapUrl: "https://maps.app.goo.gl/WgcxvdizJJre44iX7", category: "DRONY", description: "Koordynacja grup dronów w terenie." },
      { id: "fallback-d2-5", start: "14:45", end: "16:15", title: "Konferencja bezpieczeństwa — sesja II", location: "3MK Arena", locationMapUrl: "https://maps.app.goo.gl/CWqX9Ahtre9hxoCi9", category: "KONFERENCJA", description: "Trendy zagrożeń i odporność kryzysowa." },
      { id: "fallback-d2-6", start: "16:30", end: "17:00", title: "Ceremonia zamknięcia", location: "Arena Główna", locationMapUrl: "https://maps.app.goo.gl/CWqX9Ahtre9hxoCi9", category: "CEREMONIA", description: "Podziękowania i oficjalne zakończenie wydarzenia." },
    ],
  },
];

const FILTERS: { key: "ALL" | string; label: string }[] = [
  { key: "ALL", label: "ALL" },
  { key: "K9", label: "K9" },
  { key: "TCCC", label: "TCCC" },
  { key: "DRONY", label: "DRONY" },
  { key: "KONFERENCJA", label: "KONFERENCJA" },
  { key: "CEREMONIA", label: "CEREMONIA" },
];

type AgendaLabels = {
  all: string;
  addToCalendar: string;
  noEvents: string;
  day1: string;
  day2: string;
  instructor: string;
  location: string;
  download: string;
  share: string;
  categories: {
    k9: string;
    tccc: string;
    drones: string;
    conference: string;
    ceremony: string;
    break: string;
  };
};

const AGENDA_LABELS: Partial<Record<Lang, AgendaLabels>> = {
  pl: {
    all: "WSZYSTKO",
    addToCalendar: "DODAJ DO KALENDARZA",
    noEvents: "BRAK WYDARZEŃ",
    day1: "DZIEŃ 1",
    day2: "DZIEŃ 2",
    instructor: "INSTRUKTOR",
    location: "LOKALIZACJA",
    download: "POBIERZ",
    share: "UDOSTĘPNIJ",
    categories: {
      k9: "K9",
      tccc: "TCCC",
      drones: "DRONY",
      conference: "KONFERENCJA",
      ceremony: "CEREMONIA",
      break: "PRZERWA",
    },
  },
  en: {
    all: "ALL",
    addToCalendar: "ADD TO CALENDAR",
    noEvents: "NO EVENTS",
    day1: "DAY 1",
    day2: "DAY 2",
    instructor: "INSTRUCTOR",
    location: "LOCATION",
    download: "DOWNLOAD",
    share: "SHARE",
    categories: {
      k9: "K9",
      tccc: "TCCC",
      drones: "DRONES",
      conference: "CONFERENCE",
      ceremony: "CEREMONY",
      break: "BREAK",
    },
  },
  de: {
    all: "ALLE",
    addToCalendar: "ZUM KALENDER HINZUFÜGEN",
    noEvents: "KEINE VERANSTALTUNGEN",
    day1: "TAG 1",
    day2: "TAG 2",
    instructor: "INSTRUKTEUR",
    location: "STANDORT",
    download: "HERUNTERLADEN",
    share: "TEILEN",
    categories: {
      k9: "K9",
      tccc: "TCCC",
      drones: "DROHNEN",
      conference: "KONFERENZ",
      ceremony: "ZEREMONIE",
      break: "PAUSE",
    },
  },
  fr: {
    all: "TOUT",
    addToCalendar: "AJOUTER AU CALENDRIER",
    noEvents: "AUCUN ÉVÉNEMENT",
    day1: "JOUR 1",
    day2: "JOUR 2",
    instructor: "INSTRUCTEUR",
    location: "LIEU",
    download: "TÉLÉCHARGER",
    share: "PARTAGER",
    categories: {
      k9: "K9",
      tccc: "TCCC",
      drones: "DRONES",
      conference: "CONFÉRENCE",
      ceremony: "CÉRÉMONIE",
      break: "PAUSE",
    },
  },
  es: {
    all: "TODO",
    addToCalendar: "AÑADIR AL CALENDARIO",
    noEvents: "SIN EVENTOS",
    day1: "DÍA 1",
    day2: "DÍA 2",
    instructor: "INSTRUCTOR",
    location: "UBICACIÓN",
    download: "DESCARGAR",
    share: "COMPARTIR",
    categories: {
      k9: "K9",
      tccc: "TCCC",
      drones: "DRONES",
      conference: "CONFERENCIA",
      ceremony: "CEREMONIA",
      break: "PAUSA",
    },
  },
  it: {
    all: "TUTTO",
    addToCalendar: "AGGIUNGI AL CALENDARIO",
    noEvents: "NESSUN EVENTO",
    day1: "GIORNO 1",
    day2: "GIORNO 2",
    instructor: "ISTRUTTORE",
    location: "POSIZIONE",
    download: "SCARICA",
    share: "CONDIVIDI",
    categories: {
      k9: "K9",
      tccc: "TCCC",
      drones: "DRONI",
      conference: "CONFERENZA",
      ceremony: "CERIMONIA",
      break: "PAUSA",
    },
  },
  pt: {
    all: "TUDO",
    addToCalendar: "ADICIONAR AO CALENDÁRIO",
    noEvents: "SEM EVENTOS",
    day1: "DIA 1",
    day2: "DIA 2",
    instructor: "INSTRUTOR",
    location: "LOCAL",
    download: "BAIXAR",
    share: "PARTILHAR",
    categories: {
      k9: "K9",
      tccc: "TCCC",
      drones: "DRONES",
      conference: "CONFERÊNCIA",
      ceremony: "CERIMÓNIA",
      break: "PAUSA",
    },
  },
  nl: {
    all: "ALLES",
    addToCalendar: "AAN KALENDER TOEVOEGEN",
    noEvents: "GEEN EVENEMENTEN",
    day1: "DAG 1",
    day2: "DAG 2",
    instructor: "INSTRUCTEUR",
    location: "LOCATIE",
    download: "DOWNLOADEN",
    share: "DELEN",
    categories: {
      k9: "K9",
      tccc: "TCCC",
      drones: "DRONES",
      conference: "CONFERENTIE",
      ceremony: "CEREMONIE",
      break: "PAUZE",
    },
  },
  sv: {
    all: "ALLT",
    addToCalendar: "LÄGG TILL I KALENDERN",
    noEvents: "INGA EVENEMANG",
    day1: "DAG 1",
    day2: "DAG 2",
    instructor: "INSTRUKTÖR",
    location: "PLATS",
    download: "LADDA NED",
    share: "DELA",
    categories: {
      k9: "K9",
      tccc: "TCCC",
      drones: "DRÖNARE",
      conference: "KONFERENS",
      ceremony: "CEREMONI",
      break: "PAUS",
    },
  },
  no: {
    all: "ALLE",
    addToCalendar: "LEGG TIL I KALENDER",
    noEvents: "INGEN ARRANGEMENTER",
    day1: "DAG 1",
    day2: "DAG 2",
    instructor: "INSTRUKTØR",
    location: "STED",
    download: "LAST NED",
    share: "DEL",
    categories: {
      k9: "K9",
      tccc: "TCCC",
      drones: "DRONER",
      conference: "KONFERANSE",
      ceremony: "SEREMONI",
      break: "PAUSE",
    },
  },
  hr: {
    all: "SVE",
    addToCalendar: "DODAJ U KALENDAR",
    noEvents: "NEMA DOGAĐAJA",
    day1: "DAN 1",
    day2: "DAN 2",
    instructor: "INSTRUKTOR",
    location: "LOKACIJA",
    download: "PREUZMI",
    share: "PODIJELI",
    categories: {
      k9: "K9",
      tccc: "TCCC",
      drones: "DRONOVI",
      conference: "KONFERENCIJA",
      ceremony: "CEREMONIJA",
      break: "PAUZA",
    },
  },
  cs: {
    all: "VŠE",
    addToCalendar: "PŘIDAT DO KALENDÁŘE",
    noEvents: "ŽÁDNÉ UDÁLOSTI",
    day1: "DEN 1",
    day2: "DEN 2",
    instructor: "INSTRUKTOR",
    location: "LOKACE",
    download: "STÁHNOUT",
    share: "SDÍLET",
    categories: {
      k9: "K9",
      tccc: "TCCC",
      drones: "DRONY",
      conference: "KONFERENCE",
      ceremony: "CEREMONIE",
      break: "PŘESTÁVKA",
    },
  },
  sk: {
    all: "VŠETKO",
    addToCalendar: "PRIDAŤ DO KALENDÁRA",
    noEvents: "ŽIADNE UDALOSTI",
    day1: "DEŇ 1",
    day2: "DEŇ 2",
    instructor: "INŠTRUKTOR",
    location: "LOKALITA",
    download: "STIAHNUŤ",
    share: "ZDIEĽAŤ",
    categories: {
      k9: "K9",
      tccc: "TCCC",
      drones: "DRONY",
      conference: "KONFERENCIA",
      ceremony: "CEREMÓNIA",
      break: "PRESTÁVKA",
    },
  },
  sl: {
    all: "VSE",
    addToCalendar: "DODAJ V KOLEDAR",
    noEvents: "NI DOGODKOV",
    day1: "DAN 1",
    day2: "DAN 2",
    instructor: "INŠTRUKTOR",
    location: "LOKACIJA",
    download: "PRENESI",
    share: "DELI",
    categories: {
      k9: "K9",
      tccc: "TCCC",
      drones: "DRONI",
      conference: "KONFERENCA",
      ceremony: "CEREMONIJA",
      break: "ODMOR",
    },
  },
  lt: {
    all: "VISKAS",
    addToCalendar: "PRIDĖTI Į KALENDORIŲ",
    noEvents: "NĖRA RENGINIŲ",
    day1: "1 DIENA",
    day2: "2 DIENA",
    instructor: "INSTRUKTORIUS",
    location: "VIETA",
    download: "ATSISIŲSTI",
    share: "BENDRINTI",
    categories: {
      k9: "K9",
      tccc: "TCCC",
      drones: "DRONAI",
      conference: "KONFERENCIJA",
      ceremony: "CEREMONIJA",
      break: "PERTRAUKA",
    },
  },
  lv: {
    all: "VISS",
    addToCalendar: "PIEVIENOT KALENDĀRAM",
    noEvents: "NAV PASĀKUMU",
    day1: "1. DIENA",
    day2: "2. DIENA",
    instructor: "INSTRUKTORS",
    location: "VIETA",
    download: "LEJUPIELĀDĒT",
    share: "DALĪTIES",
    categories: {
      k9: "K9",
      tccc: "TCCC",
      drones: "DRONI",
      conference: "KONFERENCE",
      ceremony: "CEREMONIJA",
      break: "PĀRTRAUKUMS",
    },
  },
  hu: {
    all: "ÖSSZES",
    addToCalendar: "HOZZÁADÁS A NAPTÁRHOZ",
    noEvents: "NINCS ESEMÉNY",
    day1: "1. NAP",
    day2: "2. NAP",
    instructor: "OKTATÓ",
    location: "HELYSZÍN",
    download: "LETÖLTÉS",
    share: "MEGOSZTÁS",
    categories: {
      k9: "K9",
      tccc: "TCCC",
      drones: "DRÓNOK",
      conference: "KONFERENCIA",
      ceremony: "CEREMÓNIA",
      break: "SZÜNET",
    },
  },
  ro: {
    all: "TOT",
    addToCalendar: "ADAUGĂ ÎN CALENDAR",
    noEvents: "FĂRĂ EVENIMENTE",
    day1: "ZIUA 1",
    day2: "ZIUA 2",
    instructor: "INSTRUCTOR",
    location: "LOCAȚIE",
    download: "DESCARCĂ",
    share: "PARTAJEAZĂ",
    categories: {
      k9: "K9",
      tccc: "TCCC",
      drones: "DRONE",
      conference: "CONFERINȚĂ",
      ceremony: "CEREMONIE",
      break: "PAUZĂ",
    },
  },
  ko: {
    all: "전체",
    addToCalendar: "캘린더에 추가",
    noEvents: "이벤트 없음",
    day1: "1일차",
    day2: "2일차",
    instructor: "강사",
    location: "위치",
    download: "다운로드",
    share: "공유",
    categories: {
      k9: "K9",
      tccc: "TCCC",
      drones: "드론",
      conference: "컨퍼런스",
      ceremony: "세리머니",
      break: "휴식",
    },
  },
};

const DEFAULT_AGENDA_LABELS: AgendaLabels = {
  all: "ALL",
  addToCalendar: "ADD TO CALENDAR",
  noEvents: "NO EVENTS",
  day1: "DAY 1",
  day2: "DAY 2",
  instructor: "INSTRUCTOR",
  location: "LOCATION",
  download: "DOWNLOAD",
  share: "SHARE",
  categories: {
    k9: "K9",
    tccc: "TCCC",
    drones: "DRONES",
    conference: "CONFERENCE",
    ceremony: "CEREMONY",
    break: "BREAK",
  },
};

const navigateLabels: Record<string, string> = {
  pl: "NAWIGUJ",
  en: "NAVIGATE",
  de: "NAVIGIEREN",
  fr: "NAVIGUER",
  cs: "NAVIGOVAT",
  sk: "NAVIGOVAŤ",
  hu: "NAVIGÁLÁS",
  hr: "NAVIGIRAJ",
  sl: "NAVIGIRAJ",
  lt: "NARŠYTI",
  lv: "NAVIGĒT",
  no: "NAVIGER",
  sv: "NAVIGERA",
  nl: "NAVIGEREN",
  es: "NAVEGAR",
  pt: "NAVEGAR",
  ro: "NAVIGAȚI",
  it: "NAVIGA",
  ko: "길 안내",
};

const noMapLabels: Record<string, string> = {
  pl: "BRAK PODPIĘTEJ LOKALIZACJI",
  en: "NO LOCATION LINKED",
  de: "KEIN STANDORT VERKNÜPFT",
  fr: "AUCUN LIEU LIÉ",
  cs: "ŽÁDNÁ POLOHA PROPOJENA",
  sk: "ŽIADNA POLOHA PREPOJENÁ",
  hu: "NINCS HELYSZÍN CSATOLVA",
  hr: "NEMA POVEZANE LOKACIJE",
  sl: "NI POVEZANE LOKACIJE",
  lt: "NĖRA SUSIETOS VIETOS",
  lv: "NAV PIESAISTĪTAS ATRAŠANĀS VIETAS",
  no: "INGEN PLASSERING TILKOBLET",
  sv: "INGEN PLATS LÄNKAD",
  nl: "GEEN LOCATIE GEKOPPELD",
  es: "SIN UBICACIÓN VINCULADA",
  pt: "SEM LOCALIZAÇÃO ASSOCIADA",
  ro: "NICIO LOCAȚIE ASOCIATĂ",
  it: "NESSUNA POSIZIONE COLLEGATA",
  ko: "연결된 위치 없음",
};

interface CalendarEvent {
  id: string;
  title: string;
  location: string;
  description: string;
  startDate: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endDate: string;
  endTime: string;
}

function formatICSDateTime(date: string, time: string) {
  // date: YYYY-MM-DD, time: HH:MM, treat as Europe/Warsaw local floating (no Z)
  const [y, m, d] = date.split("-");
  const [hh, mm] = time.split(":");
  return `${y}${m}${d}T${hh}${mm}00`;
}

function formatUTCStamp(date: string, time: string) {
  // Treat the local Warsaw time and convert to a UTC stamp for providers that need it.
  // Warsaw in June is UTC+2 (CEST). Fixed offset is acceptable here since dates are in June 2026.
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const utcMs = Date.UTC(y, m - 1, d, hh - 2, mm); // subtract +2h offset
  const dt = new Date(utcMs);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${dt.getUTCFullYear()}${pad(dt.getUTCMonth() + 1)}${pad(dt.getUTCDate())}T${pad(dt.getUTCHours())}${pad(dt.getUTCMinutes())}00Z`;
}

function buildICSEvent(ev: CalendarEvent) {
  const uid = `${ev.id}@cerberus-k9-2026`;
  const dtStart = formatICSDateTime(ev.startDate, ev.startTime);
  const dtEnd = formatICSDateTime(ev.endDate, ev.endTime);
  const now = new Date();
  const dtStamp =
    now.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const desc = ev.description.replace(/\n/g, "\\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CERBERUS K9 2026//PL",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART;TZID=Europe/Warsaw:${dtStart}`,
    `DTEND;TZID=Europe/Warsaw:${dtEnd}`,
    `SUMMARY:${ev.title}`,
    `LOCATION:${ev.location}`,
    `DESCRIPTION:${desc}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function downloadICSEvent(ev: CalendarEvent) {
  const blob = new Blob([buildICSEvent(ev)], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${ev.id}-${ev.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function googleCalendarLink(ev: CalendarEvent) {
  const dtStart = formatICSDateTime(ev.startDate, ev.startTime);
  const dtEnd = formatICSDateTime(ev.endDate, ev.endTime);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: ev.title,
    dates: `${dtStart}/${dtEnd}`,
    details: ev.description,
    location: ev.location,
    ctz: "Europe/Warsaw",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function outlookWebLink(ev: CalendarEvent, host: "outlook" | "office") {
  // Outlook.live (personal) and Office 365 use the same param shape with ISO datetimes.
  const toIso = (d: string, t: string) => `${d}T${t}:00`;
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: ev.title,
    startdt: toIso(ev.startDate, ev.startTime),
    enddt: toIso(ev.endDate, ev.endTime),
    body: ev.description,
    location: ev.location,
  });
  const base =
    host === "outlook"
      ? "https://outlook.live.com/calendar/0/deeplink/compose"
      : "https://outlook.office.com/calendar/0/deeplink/compose";
  return `${base}?${params.toString()}`;
}

function yahooCalendarLink(ev: CalendarEvent) {
  const params = new URLSearchParams({
    v: "60",
    title: ev.title,
    st: formatUTCStamp(ev.startDate, ev.startTime),
    et: formatUTCStamp(ev.endDate, ev.endTime),
    desc: ev.description,
    in_loc: ev.location,
  });
  return `https://calendar.yahoo.com/?${params.toString()}`;
}

function getAgendaUrl(agendaUrl?: string) {
  if (agendaUrl?.trim()) return agendaUrl;
  if (typeof window === "undefined") return "https://cerberusk9.org/pl/o-wydarzeniu";
  return `${window.location.origin}${window.location.pathname}`;
}

function itemToEvent(
  item: AgendaItem,
  dayDate: string,
  labels: AgendaLabels,
  categoryMeta: Record<string, { color: string; label: string }>,
  agendaUrl?: string,
  eventName?: string,
): CalendarEvent {
  const agendaPublicUrl = agendaUrl ?? "https://cerberusk9.org/pl/o-wydarzeniu";
  const eventNameStr = eventName ?? "CERBERUS K9 2026";
  const location = item.location === "—" ? "" : item.location;
  const category = categoryLabel(item.category, labels, categoryMeta);
  const lines = [
    item.description,
    "",
    "— DETAILS —",
    `Event: ${eventNameStr}`,
    `Category: ${category}`,
    location && `${labels.location}: ${location}`,
    `Time: ${item.start}-${item.end} (${dayDate})`,
    item.instructor && `${labels.instructor}: ${item.instructor}`,
    "",
    `Full agenda: ${getAgendaUrl(agendaPublicUrl)}`,
  ].filter(Boolean) as string[];

  return {
    id: item.id,
    title: `[${category}] ${item.title}`,
    location,
    description: lines.join("\n"),
    startDate: dayDate,
    startTime: item.start,
    endDate: dayDate,
    endTime: item.end,
  };
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
  e: React.MouseEvent<HTMLButtonElement>,
) => {
  e.currentTarget.style.backgroundColor = "#C4922A";
  e.currentTarget.style.color = "#1E2B38";
};

const handlePartnerButtonMouseLeave = (
  e: React.MouseEvent<HTMLButtonElement>,
) => {
  e.currentTarget.style.backgroundColor = "transparent";
  e.currentTarget.style.color = "#C4922A";
};

function CalendarMenu({
  event,
  open,
  onClose,
  labels,
  align = "left",
}: {
  event: CalendarEvent;
  open: boolean;
  onClose: () => void;
  labels: AgendaLabels;
  align?: "left" | "center";
}) {
  if (!open) return null;
  const itemStyle: React.CSSProperties = {
    background: "transparent",
    border: "none",
    color: "#E4DDD0",
    padding: "8px 12px",
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: 11,
    letterSpacing: 1,
    cursor: "pointer",
    textAlign: "left",
    textDecoration: "none",
    display: "block",
    fontWeight: 700,
  };
  return (
    <div
      style={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: "#1E2B38",
        border: "1px solid #253344",
        padding: 6,
        width: "fit-content",
        minWidth: 220,
        marginLeft: align === "center" ? "auto" : 0,
        marginRight: align === "center" ? "auto" : 0,
      }}
    >
      <a
        href={googleCalendarLink(event)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClose}
        style={itemStyle}
      >
        ↗ GOOGLE CALENDAR ({labels.share})
      </a>
      <button
        onClick={() => {
          downloadICSEvent(event);
          onClose();
        }}
        style={itemStyle}
      >
        ↗ APPLE / ICAL ({labels.download})
      </button>
      <button
        onClick={() => {
          downloadICSEvent(event);
          onClose();
        }}
        style={itemStyle}
      >
        ⬇ .ICS ({labels.download})
      </button>
    </div>
  );
}

function categoryLabel(
  category: string,
  labels: AgendaLabels,
  categoryMeta: Record<string, { color: string; label: string }>,
) {
  if (categoryMeta[category]?.label) return categoryMeta[category].label;
  const normalizedCategory = normalizeCategory(category);
  switch (normalizedCategory) {
    case "K9":
      return labels.categories.k9;
    case "TCCC":
      return labels.categories.tccc;
    case "DRONY":
      return labels.categories.drones;
    case "KONFERENCJA":
      return labels.categories.conference;
    case "CEREMONIA":
      return labels.categories.ceremony;
    case "BREAK":
      return labels.categories.break;
  }
}

function buildFullEventCalendarEvent(
  days: DaySchedule[],
  labels: AgendaLabels,
  categoryMeta: Record<string, { color: string; label: string }>,
  agendaUrl?: string,
  city?: string,
  eventName?: string,
): CalendarEvent {
  const eventCity = city ?? "Ostrów Wielkopolski";
  const agendaPublicUrl = agendaUrl ?? "https://cerberusk9.org/pl/o-wydarzeniu";
  const eventNameStr = eventName ?? "CERBERUS K9 2026";
  const nonEmptyDays = days.filter((d) => d.items.length > 0);
  const first = nonEmptyDays[0] ?? days[0];
  const last = nonEmptyDays[nonEmptyDays.length - 1] ?? days[days.length - 1];
  const firstStart = first.items.reduce(
    (acc, i) => (i.start < acc ? i.start : acc),
    first.items[0]?.start ?? "08:00",
  );
  const lastEnd = last.items.reduce(
    (acc, i) => (i.end > acc ? i.end : acc),
    last.items[0]?.end ?? "18:00",
  );
  const agendaLines = days.map((d) => {
    const lines = d.items
      .map((i) => {
        const tag = categoryLabel(i.category, labels, categoryMeta);
        const loc = i.location !== "—" ? ` — ${i.location}` : "";
        return `  ${i.start}–${i.end}  [${tag}] ${i.title}${loc}${i.instructor ? ` (${i.instructor})` : ""}`;
      })
      .join("\n");
    return `${d.label}\n${lines}`;
  }).join("\n\n");

  const description = [
    `${eventNameStr} — full event agenda.`,
    "",
    "— AGENDA —",
    agendaLines,
    "",
    `Full online agenda: ${getAgendaUrl(agendaPublicUrl)}`,
  ].join("\n");

  return {
    id: `${eventNameStr.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-full`,
    title: `${eventNameStr} — full event`,
    location: eventCity,
    description,
    startDate: first.date,
    startTime: firstStart,
    endDate: last.date,
    endTime: lastEnd,
  };
}

interface InteractiveAgendaProps {
  items?: DaySchedule[];
  categoryMeta?: Record<string, { color: string; label: string }>;
  filters?: { key: string; label: string }[];
  categories?: AgendaCategory[];
  lang?: string;
  agendaHeading?: string;
  eventName?: string;
  city?: string;
  agendaUrl?: string;
}

export default function InteractiveAgenda({
  lang,
  items,
  categoryMeta,
  filters,
  categories,
  agendaUrl,
  city,
  agendaHeading,
  eventName,
}: InteractiveAgendaProps) {
  const langKey: Lang = (lang as Lang) ?? "pl";
  const navigateLabel = navigateLabels[lang ?? "pl"] ?? "NAWIGUJ";
  const noMapLabel = noMapLabels[lang ?? "pl"] ?? "BRAK PODPIĘTEJ LOKALIZACJI";
  const agendaLabels = AGENDA_LABELS[langKey] ?? DEFAULT_AGENDA_LABELS;
  const DAYS_TO_USE = (items && items.length > 0) ? items : FALLBACK_AGENDA_ITEMS;
  const ACTIVE_CATEGORY_META = categoryMeta ?? CATEGORY_META;
  const ACTIVE_FILTERS = filters ?? FILTERS;
  const translatedFilters = ACTIVE_FILTERS.map((f) =>
    f.key === "ALL"
      ? { ...f, label: f.label || agendaLabels.all }
      : { ...f, label: f.label || ACTIVE_CATEGORY_META[f.key]?.label || f.key },
  );
  const [activeDayId, setActiveDayId] = useState<string>(DAYS_TO_USE[0]?.id ?? "day1");
  const [filter, setFilter] = useState<string>("ALL");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [calendarMenuFor, setCalendarMenuFor] = useState<string | null>(null);
  const [fullEventMenuOpen, setFullEventMenuOpen] = useState(false);
  const scheduleDays = useMemo(() => DAYS_TO_USE, [DAYS_TO_USE]);
  const fullEvent = useMemo(
    () => buildFullEventCalendarEvent(scheduleDays, agendaLabels, ACTIVE_CATEGORY_META, agendaUrl, city, eventName),
    [agendaLabels, scheduleDays, ACTIVE_CATEGORY_META, agendaUrl, city, eventName],
  );

  const activeDay = useMemo(
    () => scheduleDays.find((d) => d.id === activeDayId) ?? scheduleDays[0],
    [activeDayId, scheduleDays],
  );

  const visibleItems = useMemo(() => {
    if (filter === "ALL") return activeDay.items;
    return activeDay.items.filter(
      (i) => i.category === filter || normalizeCategory(i.category) === normalizeCategory(filter),
    );
  }, [activeDay, filter]);

  const toggle = (id: string) =>
    setExpanded((s) => ({ ...s, [id]: !s[id] }));

  return (
    <div
      id="agenda"
      style={{
        background: "linear-gradient(to bottom, #161F28, #1A2530, #161F28)",
        color: "#E4DDD0",
        minHeight: "100vh",
        paddingTop: "80px",
        paddingBottom: "10px",
        paddingLeft: "16px",
        paddingRight: "16px",
        fontFamily: "'Libre Baskerville', Georgia, serif",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <header style={{ marginBottom: 32, textAlign: "center" }}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C42B2B]/40 to-transparent" />
            <span className="font-[family-name:var(--font-rajdhani)] text-[12px] font-medium tracking-[5px] text-[#C42B2B]">
              {agendaHeading ?? "AGENDA WYDARZENIA — 13–14 CZERWCA 2026"}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C42B2B]/40 to-transparent" />
          </div>
          <h1
            className="mt-3 font-[family-name:var(--font-rajdhani)] uppercase text-2xl sm:text-3xl lg:text-[32px]"
            style={{
              fontWeight: 700,
              color: "#E4DDD0",
              letterSpacing: "2px",
            }}
          >
            <span>CERBERUS </span><span style={{ color: "#C42B2B" }}>K9</span>
          </h1>
        </header>

        {/* Day Tabs */}
        <div
          style={{
            display: "flex",
            backgroundColor: "#0C1018",
            borderBottom: "1px solid #253344",
          }}
        >
          {DAYS_TO_USE.map((day) => {
            const active = day.id === activeDayId;
            return (
              <button
                key={day.id}
                onClick={() => setActiveDayId(day.id)}
                style={{
                  flex: 1,
                  padding: "16px 20px",
                  cursor: "pointer",
                  border: "none",
                  borderTop: active
                    ? "3px solid #C4922A"
                    : "3px solid transparent",
                  backgroundColor: active ? "#1E2B38" : "#0F1720",
                  color: active ? "#E4DDD0" : "#3A4A5A",
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: 2,
                  transition: "all 0.2s ease",
                }}
              >
                {day.label}
              </button>
            );
          })}
        </div>

        {/* Filters */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            padding: "20px 0",
            marginTop: 16,
            justifyContent: "center",
          }}
        >
          {translatedFilters.map((f) => {
            const isActive = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                style={{
                  ...partnerButtonStyle,
                  backgroundColor: isActive ? "#C4922A" : "transparent",
                  color: isActive ? "#1E2B38" : "#C4922A",
                  padding: "8px 14px",
                  fontSize: 11,
                }}
                onMouseEnter={handlePartnerButtonMouseEnter}
                onMouseLeave={(e) => {
                  if (isActive) return;
                  handlePartnerButtonMouseLeave(e);
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        <div style={{ position: "relative", paddingLeft: 80 }}>
          {/* vertical line */}
          <div
            style={{
              position: "absolute",
              left: 80,
              top: 0,
              bottom: 0,
              width: 1,
              backgroundColor: "#253344",
            }}
          />

          {visibleItems.length === 0 && (
            <div
              style={{
                padding: 40,
                textAlign: "center",
                color: "#3A4A5A",
                fontFamily: "'Rajdhani', sans-serif",
                letterSpacing: 2,
              }}
            >
              {agendaLabels.noEvents}
            </div>
          )}

          {visibleItems.map((item) => {
            const normalizedCategory = normalizeCategory(item.category);
            const meta = ACTIVE_CATEGORY_META[item.category] ?? ACTIVE_CATEGORY_META[normalizedCategory] ?? CATEGORY_META[normalizedCategory];
            const catData = categories?.find((c) => c.key === item.category);
            const showCalendarBtn = catData
              ? catData.show_calendar_button
              : item.category !== "BREAK";
            const isOpen = !!expanded[item.id];
            const isCalendarMenuOpen = calendarMenuFor === item.id;
            return (
              <div
                key={item.id}
                style={{
                  position: "relative",
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "stretch",
                }}
              >
                {/* Time column */}
                <div
                  style={{
                    position: "absolute",
                    left: -80,
                    width: 80,
                    paddingRight: 20,
                    paddingTop: 18,
                    textAlign: "right",
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#3A4A5A",
                    lineHeight: 1.4,
                  }}
                >
                  {item.start}
                  <br />
                  <span
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#3A4A5A",
                      letterSpacing: 0,
                    }}
                  >
                    {item.end}
                  </span>
                </div>

                {/* Dot on timeline */}
                <div
                  style={{
                    position: "absolute",
                    left: -4,
                    top: 22,
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    backgroundColor: meta.color,
                    border: "2px solid #0C1018",
                  }}
                />

                {/* Block */}
                <div
                  onClick={() => toggle(item.id)}
                  style={{
                    flex: 1,
                    marginLeft: 20,
                    backgroundColor: "#0F1720",
                    border: "1px solid #253344",
                    cursor: "pointer",
                    display: "flex",
                    transition: "all 0.2s ease",
                  }}
                >
                  {/* Accent bar */}
                  <div
                    style={{
                      width: 3,
                      backgroundColor: meta.color,
                      flexShrink: 0,
                    }}
                  />
                  {/* Content */}
                  <div style={{ padding: "16px 20px", flex: 1 }}>
                    {/* Row 1 */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        flexWrap: "wrap",
                        marginBottom: 8,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Rajdhani', sans-serif",
                          fontSize: 10,
                          color: "#C4922A",
                          fontWeight: 700,
                          letterSpacing: 1,
                        }}
                      >
                        {item.start}–{item.end}
                      </span>
                      {item.location !== "—" && (
                        <span
                          style={{
                            fontFamily: "'Rajdhani', sans-serif",
                            fontSize: 7,
                            letterSpacing: 2,
                            padding: "2px 8px",
                            border: "1px solid #253344",
                            color: "#5A6A7A",
                            fontWeight: 700,
                            textTransform: "uppercase",
                          }}
                        >
                          {item.location}
                        </span>
                      )}
                      <span
                        style={{
                          fontFamily: "'Rajdhani', sans-serif",
                          fontSize: 7,
                          letterSpacing: 2,
                          padding: "2px 8px",
                          backgroundColor: meta.color,
                          color: "#0C1018",
                          fontWeight: 700,
                        }}
                      >
                        {categoryLabel(item.category, agendaLabels, ACTIVE_CATEGORY_META)}
                      </span>
                    </div>
                    {/* Row 2 */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "'Bebas Neue', Impact, sans-serif",
                          fontSize: 18,
                          color: "#E4DDD0",
                          letterSpacing: 1,
                          margin: 0,
                          fontWeight: 400,
                        }}
                      >
                        {item.title}
                      </h3>
                      <span
                        style={{
                          color: "#3A4A5A",
                          fontSize: 14,
                          transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                          transition: "transform 0.2s ease",
                          flexShrink: 0,
                        }}
                      >
                        ▾
                      </span>
                    </div>
                    {/* Row 3 expanded */}
                    {isOpen && (
                      <div style={{ marginTop: 14 }}>
                        {item.description && (
                          <p
                            style={{
                              fontFamily: "'Libre Baskerville', Georgia, serif",
                              fontSize: 13,
                              color: "#5A6A7A",
                              lineHeight: 1.6,
                              margin: 0,
                            }}
                          >
                            {item.description}
                          </p>
                        )}
                        {item.instructor && (
                          <p
                            style={{
                              fontFamily: "'Rajdhani', sans-serif",
                              fontSize: 11,
                              letterSpacing: 2,
                              color: "#C4922A",
                              marginTop: 8,
                              marginBottom: 0,
                              fontWeight: 700,
                            }}
                          >
                            {agendaLabels.instructor}: {item.instructor.toUpperCase()}
                          </p>
                        )}

                        {showCalendarBtn && (
                          <div
                            style={{ position: "relative", marginTop: 14 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                              <button
                                onClick={() =>
                                  setCalendarMenuFor(
                                    calendarMenuFor === item.id ? null : item.id,
                                  )
                                }
                                style={{
                                  ...partnerButtonStyle,
                                  backgroundColor: isCalendarMenuOpen
                                    ? "#C4922A"
                                    : "transparent",
                                  color: isCalendarMenuOpen ? "#1E2B38" : "#C4922A",
                                  padding: "6px 12px",
                                  fontSize: 11,
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 6,
                                }}
                                onMouseEnter={handlePartnerButtonMouseEnter}
                                onMouseLeave={(e) => {
                                  if (isCalendarMenuOpen) return;
                                  handlePartnerButtonMouseLeave(e);
                                }}
                              >
                                <Calendar size={14} />
                                {agendaLabels.addToCalendar}
                              </button>
                              {item.locationMapUrl && item.locationMapUrl.trim() !== "" && (
                                <a
                                  href={item.locationMapUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  style={{
                                    ...partnerButtonStyle,
                                    padding: "6px 12px",
                                    fontSize: 11,
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 6,
                                    textDecoration: "none",
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
                                  {navigateLabel} ↗
                                </a>
                              )}
                              {(!item.locationMapUrl || item.locationMapUrl.trim() === "") && (
                                <span
                                  style={{
                                    ...partnerButtonStyle,
                                    padding: "6px 12px",
                                    fontSize: 11,
                                    display: "inline-flex",
                                    alignItems: "center",
                                    opacity: 0.75,
                                    cursor: "not-allowed",
                                  }}
                                >
                                  {noMapLabel}
                                </span>
                              )}
                            </div>

                            <CalendarMenu
                              event={itemToEvent(item, activeDay.date, agendaLabels, ACTIVE_CATEGORY_META, agendaUrl, eventName)}
                              open={calendarMenuFor === item.id}
                              onClose={() => setCalendarMenuFor(null)}
                              labels={agendaLabels}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full event add-to-calendar */}
        <div
          style={{
            marginTop: 40,
            padding: "32px 20px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => setFullEventMenuOpen((v) => !v)}
              style={{
                ...partnerButtonStyle,
                backgroundColor: fullEventMenuOpen ? "#C4922A" : "transparent",
                color: fullEventMenuOpen ? "#1E2B38" : "#C4922A",
                padding: "12px 24px",
                fontSize: 13,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
              onMouseEnter={handlePartnerButtonMouseEnter}
              onMouseLeave={(e) => {
                if (fullEventMenuOpen) return;
                handlePartnerButtonMouseLeave(e);
              }}
            >
              <Calendar size={14} />
              {agendaLabels.addToCalendar}
            </button>
            <CalendarMenu
              event={fullEvent}
              open={fullEventMenuOpen}
              onClose={() => setFullEventMenuOpen(false)}
              labels={agendaLabels}
              align="center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { InteractiveAgenda };
