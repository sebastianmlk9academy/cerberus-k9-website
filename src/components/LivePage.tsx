import { useEffect, useMemo, useState } from 'react';

interface LiveUpdate {
  timestamp: Date | string;
  severity: 'info' | 'success' | 'warning' | 'danger';
  title_pl: string;
  title_en: string;
  message_pl: string;
  message_en: string;
  isPinned: boolean;
}

interface ResultItem {
  rank: number;
  competitor_name: string;
  score: number;
  country: string;
}

interface LivePageProps {
  updates: LiveUpdate[];
  results: ResultItem[];
  settings?: {
    event_date?: string;
    event_date_end?: string;
    current_competitor?: string;
  };
  lang: string;
  /** When false, show pre-event message and countdown instead of the live dashboard. */
  liveActive?: boolean;
}

const severityClass: Record<string, string> = {
  danger: 'bg-red text-bone',
  warning: 'bg-gold text-navy',
  success: 'bg-[#2f7a4a] text-bone',
  info: 'bg-navyDeep text-bone',
};

export default function LivePage({ updates, results, settings, lang, liveActive = true }: LivePageProps) {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
      fetch(window.location.href, { cache: 'no-store' }).catch(() => undefined);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!liveActive) {
    const eventDate = new Date('2026-06-13T09:00:00+02:00');
    const daysLeft = Math.max(0, Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
    const msg =
      lang === 'pl'
        ? 'Live aktywne podczas eventu 13–14 czerwca 2026'
        : 'Live feed will be active during the event on 13–14 June 2026.';
    const daysLabel = lang === 'pl' ? 'DNI DO STARTU' : 'DAYS TO GO';
    return (
      <div className="bg-navy">
        <div className="border-b border-border bg-navyDeep px-5 py-12 text-center md:px-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-gold">LIVE</p>
          <h1 className="font-bebas text-4xl uppercase tracking-wide text-bone md:text-5xl">
            {lang === 'pl' ? 'RELACJA LIVE' : 'LIVE FEED'}
          </h1>
          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-muted">CERBERUS K9 2026</p>
        </div>
        <section className="mx-auto max-w-4xl px-5 pb-16 pt-8 text-center md:px-8">
          <p className="text-lg text-bone">{msg}</p>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <p
              style={{
                color: '#C4922A',
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: '80px',
                lineHeight: 1,
              }}>
              {daysLeft}
            </p>
            <p
              style={{
                color: '#7A8A96',
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '11px',
                letterSpacing: '4px',
              }}>
              {daysLabel}
            </p>
          </div>
        </section>
      </div>
    );
  }

  const day = useMemo(() => {
    const eventStart = settings?.event_date ? new Date(settings.event_date) : null;
    const eventEnd = settings?.event_date_end ? new Date(settings.event_date_end) : null;
    if (!eventStart || !eventEnd) return 1;
    if (now >= eventEnd) return 2;
    return now >= eventStart ? 1 : 1;
  }, [now, settings?.event_date, settings?.event_date_end]);

  const sortedUpdates = [...updates].sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return (
    <div className="w-full bg-navy px-5 pb-16 pt-8 md:px-8">
      <section className="mx-auto mb-8 max-w-6xl border border-red bg-navyDeep p-4 text-center">
        <h1 className="text-lg font-bold uppercase tracking-[0.14em] text-bone">
          🔴 LIVE · CERBERUS K9 2026 · DZIEŃ {day}
        </h1>
      </section>

      <section className="mx-auto mb-8 max-w-6xl">
        <h2 className="mb-3 text-xl font-bold uppercase tracking-[0.12em] text-bone">LIVE UPDATES</h2>
        <div className="space-y-3">
          {sortedUpdates.map((u, idx) => (
            <article key={`${u.title_pl}-${idx}`} className="border border-border bg-navyDeep p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className={`px-2 py-1 text-xs font-bold uppercase ${severityClass[u.severity] ?? severityClass.info}`}>
                  {u.severity}
                </span>
                {u.isPinned ? <span className="text-xs text-gold">PINNED</span> : null}
                <span className="text-xs text-muted">{new Date(u.timestamp).toLocaleString()}</span>
              </div>
              <h3 className="mb-1 font-bold text-bone">{lang === 'pl' ? u.title_pl : u.title_en}</h3>
              <p className="text-sm text-muted">{lang === 'pl' ? u.message_pl : u.message_en}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mb-8 max-w-6xl">
        <h2 className="mb-3 text-xl font-bold uppercase tracking-[0.12em] text-bone">LIVE LEADERBOARD</h2>
        <div className="border border-border bg-navyDeep p-4">
          {results.length > 0 ? (
            <ol className="space-y-2">
              {results.map((r) => (
                <li key={`${r.rank}-${r.competitor_name}`} className="flex items-center justify-between border-b border-border pb-2 text-sm text-bone">
                  <span>#{r.rank} {r.competitor_name} ({r.country})</span>
                  <span className="font-bold text-gold">{r.score}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-muted">Wyniki live dla edycji 2026 pojawią się podczas wydarzenia.</p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl border border-gold bg-navyDeep p-4 text-center">
        <p className="text-sm uppercase tracking-[0.12em] text-muted">AKTUALNIE NA TORZE:</p>
        <p className="text-xl font-bold text-bone">{settings?.current_competitor || 'Oczekiwanie na update'}</p>
      </section>
    </div>
  );
}
