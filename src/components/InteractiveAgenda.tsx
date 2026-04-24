import { useMemo, useState } from "react";

type Category = "K9" | "TCCC" | "DRONY" | "KONFERENCJA" | "CEREMONIA" | "BREAK";

interface AgendaItem {
  id: string;
  start: string; // "HH:MM"
  end: string;
  title: string;
  location: string;
  category: Category;
  description: string;
  instructor?: string;
}

interface DaySchedule {
  id: string;
  label: string;
  date: string; // YYYY-MM-DD
  items: AgendaItem[];
}

const CATEGORY_META: Record<Category, { color: string; label: string }> = {
  K9: { color: "#C4922A", label: "K9" },
  TCCC: { color: "#8B2020", label: "TCCC / MEDYCYNA" },
  DRONY: { color: "#2A5A8A", label: "DRONY" },
  KONFERENCJA: { color: "#2A6A3A", label: "KONFERENCJA" },
  CEREMONIA: { color: "#5A3A8A", label: "CEREMONIA" },
  BREAK: { color: "#3A4A5A", label: "PRZERWA" },
};

const DAYS: DaySchedule[] = [
  {
    id: "day1",
    label: "DZIEŃ 1 — CZWARTEK 13.06",
    date: "2026-06-13",
    items: [
      {
        id: "d1-1",
        start: "08:00",
        end: "08:30",
        title: "Ceremonia otwarcia",
        location: "Arena Główna",
        category: "CEREMONIA",
        description: "Powitanie uczestników, krótka prezentacja.",
      },
      {
        id: "d1-2",
        start: "09:00",
        end: "12:30",
        title: "Szkolenia K9 Blok 1 — Gryzaki",
        location: "3MK Arena + Szkoła Mundurowa",
        category: "K9",
        description:
          "Pary pies-przewodnik w specjalizacji ataku i kontroli. Dla służb i cywilów.",
        instructor: "JWK Lubliniec, US Police K9 SWAT",
      },
      {
        id: "d1-3",
        start: "09:00",
        end: "12:30",
        title: "Szkolenia K9 Blok 1 — Detekcja",
        location: "Szkoła Mundurowa",
        category: "K9",
        description:
          "Wykrywanie narkotyków i materiałów wybuchowych. Metody szkoleniowe NATO.",
        instructor: "Pozorant z USA",
      },
      {
        id: "d1-4",
        start: "12:30",
        end: "13:30",
        title: "Przerwa obiadowa",
        location: "—",
        category: "BREAK",
        description: "Lunch dla uczestników zapewniony przez organizatora.",
      },
      {
        id: "d1-5",
        start: "13:30",
        end: "16:00",
        title: "TCCC i TCCC-K9",
        location: "3MK Arena",
        category: "TCCC",
        description:
          "Tactical Combat Casualty Care. Obsługa ran bojowych psów.",
        instructor: "Rescue Team Se.a.l. + WOPR Ostrów",
      },
      {
        id: "d1-6",
        start: "13:30",
        end: "16:00",
        title: "Szkolenie Dronowe",
        location: "Stadion Miejski",
        category: "DRONY",
        description:
          "Pilotaż dronów BSP, zastosowania w bezpieczeństwie.",
        instructor: "Fundacja Polska Armia Dronów",
      },
      {
        id: "d1-7",
        start: "16:30",
        end: "18:00",
        title: "HARDEST HIT — Eliminacje",
        location: "Arena Główna",
        category: "K9",
        description:
          "Pierwsza w Polsce konkurencja sprawdzająca psa w konfrontacji z pozorantem. Atak i kontrola. Obowiązkowa dokumentacja foto/video.",
      },
      {
        id: "d1-8",
        start: "17:30",
        end: "19:30",
        title: "Konferencja ZK — Panel 1",
        location: "Sala Konferencyjna",
        category: "KONFERENCJA",
        description:
          "Bezpieczeństwo wewnętrzne i publiczne. Case Study: Powiat Pruszkowski. Dla JST Wielkopolski.",
      },
    ],
  },
  {
    id: "day2",
    label: "DZIEŃ 2 — PIĄTEK 14.06",
    date: "2026-06-14",
    items: [
      {
        id: "d2-1",
        start: "09:00",
        end: "12:00",
        title: "Szkolenia K9 Blok 2 — Tropienie i SAR",
        location: "Stadion Miejski",
        category: "K9",
        description:
          "Search and Rescue. Tropienie śladów. Lokalizacja osób zaginionych.",
        instructor: "Marinha Portuguesa, Szkoły K9 EU",
      },
      {
        id: "d2-2",
        start: "09:00",
        end: "12:00",
        title: "Pierwsza Pomoc Przedmedyczna",
        location: "3MK Arena",
        category: "TCCC",
        description:
          "Kurs pierwszej pomocy dla każdego uczestnika i przechodnia. Certyfikaty.",
        instructor: "WOPR Ostrów Wlkp.",
      },
      {
        id: "d2-3",
        start: "12:00",
        end: "13:00",
        title: "Przerwa obiadowa",
        location: "—",
        category: "BREAK",
        description: "",
      },
      {
        id: "d2-4",
        start: "13:00",
        end: "15:30",
        title: "HARDEST HIT — Finały",
        location: "Arena Główna",
        category: "K9",
        description:
          "Finał konkurencji HARDEST HIT. Ogłoszenie wyników. Nagrody.",
      },
      {
        id: "d2-5",
        start: "15:30",
        end: "17:00",
        title: "Konferencja ZK — Panel 2 i 3",
        location: "Sala Konferencyjna",
        category: "KONFERENCJA",
        description:
          "Obrona Powszechna + Bezpieczeństwo Infrastruktury Krytycznej z użyciem dronów. Prelegenci z WOT i RCB.",
      },
      {
        id: "d2-6",
        start: "17:00",
        end: "17:30",
        title: "Ceremonia zamknięcia",
        location: "Arena Główna",
        category: "CEREMONIA",
        description:
          "Wręczenie dyplomów i nagród. Oficjalne zamknięcie CERBERUS K9 2026. Seans grupowy.",
      },
    ],
  },
];

const FILTERS: { key: "ALL" | Category; label: string }[] = [
  { key: "ALL", label: "WSZYSTKO" },
  { key: "K9", label: "K9" },
  { key: "TCCC", label: "TCCC" },
  { key: "DRONY", label: "DRONY" },
  { key: "KONFERENCJA", label: "KONFERENCJA" },
  { key: "CEREMONIA", label: "CEREMONIA" },
];

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

function getAgendaUrl() {
  if (typeof window === "undefined") return "https://cerberus-k9.pl/agenda";
  return `${window.location.origin}${window.location.pathname}`;
}

function itemToEvent(item: AgendaItem, dayDate: string): CalendarEvent {
  const meta = CATEGORY_META[item.category];
  const location = item.location === "—" ? "" : item.location;
  const lines = [
    item.description,
    "",
    "— SZCZEGÓŁY —",
    `Wydarzenie: CERBERUS K9 2026`,
    `Kategoria: ${meta.label}`,
    location && `Lokalizacja: ${location}`,
    `Czas: ${item.start}–${item.end} (${dayDate})`,
    item.instructor && `Prowadzący: ${item.instructor}`,
    "",
    `Pełna agenda: ${getAgendaUrl()}`,
  ].filter(Boolean) as string[];

  return {
    id: item.id,
    title: `[${meta.label}] ${item.title}`,
    location,
    description: lines.join("\n"),
    startDate: dayDate,
    startTime: item.start,
    endDate: dayDate,
    endTime: item.end,
  };
}

function CalendarMenu({
  event,
  open,
  onClose,
  align = "left",
}: {
  event: CalendarEvent;
  open: boolean;
  onClose: () => void;
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
        ↗ GOOGLE CALENDAR
      </a>
      <a
        href={outlookWebLink(event, "outlook")}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClose}
        style={itemStyle}
      >
        ↗ OUTLOOK.COM
      </a>
      <a
        href={outlookWebLink(event, "office")}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClose}
        style={itemStyle}
      >
        ↗ OFFICE 365
      </a>
      <a
        href={yahooCalendarLink(event)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClose}
        style={itemStyle}
      >
        ↗ YAHOO CALENDAR
      </a>
      <button
        onClick={() => {
          downloadICSEvent(event);
          onClose();
        }}
        style={itemStyle}
      >
        🍎 APPLE / ICAL (.ICS)
      </button>
      <button
        onClick={() => {
          downloadICSEvent(event);
          onClose();
        }}
        style={itemStyle}
      >
        ⬇ PLIK .ICS (INNY KALENDARZ)
      </button>
    </div>
  );
}

function buildFullEventCalendarEvent(): CalendarEvent {
  const first = DAYS[0];
  const last = DAYS[DAYS.length - 1];
  const firstStart = first.items.reduce(
    (acc, i) => (i.start < acc ? i.start : acc),
    first.items[0].start,
  );
  const lastEnd = last.items.reduce(
    (acc, i) => (i.end > acc ? i.end : acc),
    last.items[0].end,
  );
  const agendaLines = DAYS.map((d) => {
    const lines = d.items
      .map((i) => {
        const meta = CATEGORY_META[i.category];
        const loc = i.location !== "—" ? ` — ${i.location}` : "";
        return `  ${i.start}–${i.end}  [${meta.label}] ${i.title}${loc}${i.instructor ? ` (${i.instructor})` : ""}`;
      })
      .join("\n");
    return `${d.label}\n${lines}`;
  }).join("\n\n");

  const description = [
    "CERBERUS K9 2026 — pełny program wydarzenia.",
    "",
    "— PROGRAM —",
    agendaLines,
    "",
    `Pełna agenda online: ${getAgendaUrl()}`,
  ].join("\n");

  return {
    id: "cerberus-k9-2026-full",
    title: "CERBERUS K9 2026 — całe wydarzenie",
    location: "Ostrów Wielkopolski",
    description,
    startDate: first.date,
    startTime: firstStart,
    endDate: last.date,
    endTime: lastEnd,
  };
}

export default function InteractiveAgenda() {
  const [activeDayId, setActiveDayId] = useState<string>(DAYS[0].id);
  const [filter, setFilter] = useState<"ALL" | Category>("ALL");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [calendarMenuFor, setCalendarMenuFor] = useState<string | null>(null);
  const [fullEventMenuOpen, setFullEventMenuOpen] = useState(false);
  const fullEvent = useMemo(() => buildFullEventCalendarEvent(), []);

  const activeDay = useMemo(
    () => DAYS.find((d) => d.id === activeDayId)!,
    [activeDayId],
  );

  const visibleItems = useMemo(() => {
    if (filter === "ALL") return activeDay.items;
    return activeDay.items.filter((i) => i.category === filter);
  }, [activeDay, filter]);

  const toggle = (id: string) =>
    setExpanded((s) => ({ ...s, [id]: !s[id] }));

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #161F28, #1A2530, #161F28)",
        color: "#E4DDD0",
        minHeight: "100vh",
        padding: "32px 16px",
        fontFamily: "'Libre Baskerville', Georgia, serif",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <header style={{ marginBottom: 32, textAlign: "center" }}>
          <h1
            style={{
              fontFamily: "'Bebas Neue', Impact, sans-serif",
              fontSize: 42,
              letterSpacing: 4,
              margin: 0,
              color: "#E4DDD0",
            }}
          >
            CERBERUS K9 <span style={{ color: "#C4922A" }}>2026</span>
          </h1>
          <p
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: 12,
              letterSpacing: 3,
              color: "#3A4A5A",
              marginTop: 8,
            }}
          >
            AGENDA WYDARZENIA — 13–14 CZERWCA 2026
          </p>
        </header>

        {/* Day Tabs */}
        <div
          style={{
            display: "flex",
            backgroundColor: "#0C1018",
            borderBottom: "1px solid #253344",
          }}
        >
          {DAYS.map((day) => {
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
          }}
        >
          {FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                style={{
                  padding: "8px 14px",
                  backgroundColor: active ? "#1E2B38" : "transparent",
                  color: active ? "#C4922A" : "#3A4A5A",
                  border: `1px solid ${active ? "#C4922A" : "#253344"}`,
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 2,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
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
              BRAK WYDARZEŃ DLA WYBRANEGO FILTRA
            </div>
          )}

          {visibleItems.map((item) => {
            const meta = CATEGORY_META[item.category];
            const isOpen = !!expanded[item.id];
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
                  <span style={{ opacity: 0.5 }}>{item.end}</span>
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
                        {meta.label}
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
                            PROWADZĄCY: {item.instructor.toUpperCase()}
                          </p>
                        )}

                        {item.category !== "BREAK" && (
                          <div
                            style={{ position: "relative", marginTop: 14 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() =>
                                setCalendarMenuFor(
                                  calendarMenuFor === item.id ? null : item.id,
                                )
                              }
                              style={{
                                background: "transparent",
                                border: "1px solid #253344",
                                color: "#C4922A",
                                padding: "6px 12px",
                                fontFamily: "'Rajdhani', sans-serif",
                                fontSize: 11,
                                letterSpacing: 1,
                                fontWeight: 700,
                                cursor: "pointer",
                              }}
                            >
                              📅 DODAJ DO KALENDARZA
                            </button>

                            <CalendarMenu
                              event={itemToEvent(item, activeDay.date)}
                              open={calendarMenuFor === item.id}
                              onClose={() => setCalendarMenuFor(null)}
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
            borderTop: "1px solid #253344",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: 11,
              letterSpacing: 3,
              color: "#3A4A5A",
              marginTop: 0,
              marginBottom: 14,
              fontWeight: 700,
            }}
          >
            CAŁE WYDARZENIE — OD CEREMONII OTWARCIA DO ZAMKNIĘCIA
          </p>
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
                background: "#1E2B38",
                border: "1px solid #C4922A",
                color: "#C4922A",
                padding: "12px 24px",
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: 13,
                letterSpacing: 2,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              📅 DODAJ DO KALENDARZA
            </button>
            <CalendarMenu
              event={fullEvent}
              open={fullEventMenuOpen}
              onClose={() => setFullEventMenuOpen(false)}
              align="center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { InteractiveAgenda };
