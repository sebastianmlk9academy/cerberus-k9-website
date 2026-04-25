import { useState, useEffect, useRef, type CSSProperties, type MouseEvent } from 'react';
import InstructorCard from './InstructorCard';
import type { Lang } from '../i18n/utils';

interface Instructor {
  name: string;
  country: string;
  countryCode: string;
  specializations: string[];
  bioShort: string;
  bioFull: string;
  photo: string;
  order: number;
  type?: string;
  module?: string;
  schedule?: string;
  languages?: string;
  linkedinUrl?: string;
  unit?: string;
}

interface InstructorsGridProps {
  lang: Lang;
  instructors?: Instructor[];
}

const FALLBACK: Instructor[] = [];

type InstructorFilter = 'all' | 'k9' | 'tccc' | 'drones' | 'conference' | 'decoy';
const FILTERS: InstructorFilter[] = ['all', 'k9', 'tccc', 'drones', 'conference', 'decoy'];

const partnerButtonStyle: CSSProperties = {
  backgroundColor: 'transparent',
  color: '#C4922A',
  fontFamily: 'var(--font-rajdhani), sans-serif',
  letterSpacing: '3px',
  fontWeight: 700,
  borderRadius: 0,
  border: '1px solid #C4922A',
  transition: 'background-color 150ms ease, color 150ms ease',
  cursor: 'pointer',
};

const handlePartnerButtonMouseEnter = (
  e: MouseEvent<HTMLButtonElement>,
) => {
  e.currentTarget.style.backgroundColor = '#C4922A';
  e.currentTarget.style.color = '#1E2B38';
};

const handlePartnerButtonMouseLeave = (
  e: MouseEvent<HTMLButtonElement>,
) => {
  e.currentTarget.style.backgroundColor = 'transparent';
  e.currentTarget.style.color = '#C4922A';
};

export default function InstructorsGrid({ instructors, lang }: InstructorsGridProps) {
  const gridLabels = {
    pl: { all: 'WSZYSCY', decoy: 'POZORANT', noResults: 'BRAK INSTRUKTORÓW', loading: 'ŁADOWANIE...' },
    en: { all: 'ALL', decoy: 'DECOY', noResults: 'NO INSTRUCTORS FOUND', loading: 'LOADING...' },
    de: { all: 'ALLE', decoy: 'FIGURANT', noResults: 'KEINE INSTRUKTEURE', loading: 'LADEN...' },
    fr: { all: 'TOUS', decoy: 'FIGURANT', noResults: 'AUCUN INSTRUCTEUR', loading: 'CHARGEMENT...' },
    es: { all: 'TODOS', decoy: 'FIGURANTE', noResults: 'SIN INSTRUCTORES', loading: 'CARGANDO...' },
    it: { all: 'TUTTI', decoy: 'FIGURANTE', noResults: 'NESSUN ISTRUTTORE', loading: 'CARICAMENTO...' },
    pt: { all: 'TODOS', decoy: 'FIGURANTE', noResults: 'SEM INSTRUTORES', loading: 'CARREGANDO...' },
    nl: { all: 'ALLE', decoy: 'FIGURANT', noResults: 'GEEN INSTRUCTEURS', loading: 'LADEN...' },
    sv: { all: 'ALLA', decoy: 'FIGURANT', noResults: 'INGA INSTRUKTÖRER', loading: 'LADDAR...' },
    no: { all: 'ALLE', decoy: 'FIGURANT', noResults: 'INGEN INSTRUKTØRER', loading: 'LASTER...' },
    hr: { all: 'SVI', decoy: 'FIGURANT', noResults: 'NEMA INSTRUKTORA', loading: 'UČITAVANJE...' },
    cs: { all: 'VŠICHNI', decoy: 'FIGURANT', noResults: 'ŽÁDNÍ INSTRUKTOŘI', loading: 'NAČÍTÁNÍ...' },
    sk: { all: 'VŠETCI', decoy: 'FIGURANT', noResults: 'ŽIADNI INŠTRUKTORI', loading: 'NAČÍTAVA SA...' },
    sl: { all: 'VSI', decoy: 'FIGURANT', noResults: 'NI INŠTRUKTORJEV', loading: 'NALAGANJE...' },
    lt: { all: 'VISI', decoy: 'FIGURANTAS', noResults: 'INSTRUKTORIŲ NĖRA', loading: 'KRAUNAMA...' },
    lv: { all: 'VISI', decoy: 'FIGURANTS', noResults: 'NAV INSTRUKTORU', loading: 'IELĀDĒ...' },
    hu: { all: 'MIND', decoy: 'FIGURA', noResults: 'NINCS OKTATÓ', loading: 'BETÖLTÉS...' },
    ro: { all: 'TOȚI', decoy: 'FIGURANT', noResults: 'NICIUN INSTRUCTOR', loading: 'SE ÎNCARCĂ...' },
    ko: { all: '전체', decoy: '디코이', noResults: '강사 없음', loading: '로딩 중...' },
  }[lang] ?? { all: 'ALL', decoy: 'DECOY', noResults: 'NO INSTRUCTORS FOUND', loading: 'LOADING...' };
  const filterLabels: Record<InstructorFilter, string> = {
    all: gridLabels.all,
    k9: 'K9',
    tccc: 'TCCC',
    drones: 'DRONES',
    conference: 'CONFERENCE',
    decoy: gridLabels.decoy,
  };
  const [activeFilter, setActiveFilter] = useState<InstructorFilter>('all');
  const [visibleCount, setVisibleCount] = useState(4);
  const loaderRef = useRef<HTMLDivElement>(null);
  const data = (instructors && instructors.length > 0) ? instructors : FALLBACK;

  const filtered = activeFilter === 'all'
    ? data
    : data.filter((i) => {
        const specializations = i.specializations.map((s) => s.toLowerCase());
        if (activeFilter === 'decoy') {
          return (
            i.type?.toLowerCase().includes('pozorant') ||
            i.type?.toLowerCase().includes('decoy') ||
            specializations.some((s) => s.includes('pozorant') || s.includes('decoy') || s.includes('figurant'))
          );
        }
        if (activeFilter === 'drones') {
          return specializations.some((s) => s.includes('dron') || s.includes('drone'));
        }
        if (activeFilter === 'conference') {
          return specializations.some((s) => s.includes('konfer') || s.includes('conference'));
        }
        return specializations.some((s) => s.includes(activeFilter));
      });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount(prev => Math.min(prev + 4, filtered.length));
        }
      },
      { threshold: 0.1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [filtered.length]);

  // Reset visible count when filter changes
  useEffect(() => {
    setVisibleCount(4);
  }, [activeFilter]);

  const visibleCards = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <section
      id="instructors-grid"
      style={{
        background: 'linear-gradient(to bottom, #161F28, #1A2530, #161F28)',
        paddingTop: '0px',
        paddingBottom: '10px',
        paddingLeft: '5%',
        paddingRight: '5%',
      }}
    >
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C42B2B]/40 to-transparent" />
        <span className="font-[family-name:var(--font-rajdhani)] text-[12px] font-medium tracking-[5px] text-[#C42B2B]">
          TEAM LEADERZY · INSTRUKTORZY · POZORANCI · PRELEGENCI
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C42B2B]/40 to-transparent" />
      </div>
      {/* Filter bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '48px', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{
          fontFamily: 'Rajdhani, sans-serif',
          fontSize: '9px',
          letterSpacing: '3px',
          color: '#4A5A6A',
          fontWeight: 700,
          marginRight: '8px',
        }}>
        </span>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              ...partnerButtonStyle,
              backgroundColor: activeFilter === f ? '#C4922A' : 'transparent',
              color: activeFilter === f ? '#1E2B38' : '#C4922A',
              padding: '8px 14px',
              fontSize: 11,
            }}
            onMouseEnter={handlePartnerButtonMouseEnter}
            onMouseLeave={e => {
              if (activeFilter === f) return;
              handlePartnerButtonMouseLeave(e);
            }}
          >
            {filterLabels[f]}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p style={{
          fontFamily: 'Rajdhani, sans-serif',
          color: '#4A5A6A',
          fontSize: '12px',
          letterSpacing: '2px',
          textAlign: 'center',
          padding: '48px 0',
        }}>
          {gridLabels.noResults}
        </p>
      ) : (
        <>
          <div
            className="instructors-grid-layout"
            style={{
              display: 'grid',
              gap: '10px',
              padding: '5px',
            }}
          >
            {visibleCards.map((instructor, i) => (
              <InstructorCard key={instructor.name + i} {...instructor as any} />
            ))}
          </div>
          {hasMore && (
            <div
              ref={loaderRef}
              style={{
                width: '100%',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '16px',
              }}
            >
              <span style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '9px',
                letterSpacing: '3px',
                color: '#4A5A6A',
              }}>
                {gridLabels.loading}
              </span>
            </div>
          )}
        </>
      )}
      <style>{`
        .instructors-grid-layout {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        @media (max-width: 1200px) {
          .instructors-grid-layout {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 900px) {
          .instructors-grid-layout {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 600px) {
          .instructors-grid-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
