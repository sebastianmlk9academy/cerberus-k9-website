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
}

const severityClass: Record<string, string> = {
  danger: 'bg-red text-bone',
  warning: 'bg-gold text-navy',
  success: 'bg-[#2f7a4a] text-bone',
  info: 'bg-navyDeep text-bone',
};

export default function LivePage({ updates, results, settings, lang }: LivePageProps) {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
      fetch(window.location.href, { cache: 'no-store' }).catch(() => undefined);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

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
