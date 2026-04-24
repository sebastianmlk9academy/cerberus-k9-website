import { useState, useEffect, useRef } from 'react';
import InstructorCard from './InstructorCard';

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
  instructors?: Instructor[];
}

const FALLBACK: Instructor[] = [
  {
    name: 'Mariusz Lis',
    country: 'Polska',
    countryCode: 'PL',
    specializations: ['K9 Gryzienie', 'K9 Detekcja'],
    bioShort: 'Wieloletni operator JWK. Prezes Fundacji PACTA K9. Twórca CERBERUS K9.',
    bioFull: 'Wieloletni operator Jednostki Wojskowej Komandosów. Współzałożyciel i Prezes Fundacji PACTA K9.',
    photo: '/images/instruktorzy/placeholder.jpg',
    order: 1,
    type: 'Instruktor',
    module: 'Dyrekcja Programowa — oba dni',
  },
  {
    name: 'Brandon M.',
    country: 'USA',
    countryCode: 'US',
    specializations: ['Pozorant', 'K9 Gryzienie'],
    bioShort: 'Aktywny pozorant K9 dla SWAT i Policji USA.',
    bioFull: 'Aktywny pozorant i instruktor K9 dla departamentów policji USA i SWAT.',
    photo: '/images/instruktorzy/placeholder.jpg',
    order: 2,
    type: 'Pozorant',
    module: 'K9-Gryzanie + HARDEST HIT',
  },
  {
    name: 'Instruktor TCCC',
    country: 'Polska',
    countryCode: 'PL',
    specializations: ['TCCC', 'TCCC-K9'],
    bioShort: 'Ratownik medyczny JWK. Twórca programu TCCC-K9.',
    bioFull: 'Ratownik medyczny z doświadczeniem operacyjnym JWK.',
    photo: '/images/instruktorzy/placeholder.jpg',
    order: 3,
    type: 'Instruktor',
    module: 'TCCC Dzień 1: 13:30-16:00',
  },
  {
    name: 'Delegacja Marinha Portuguesa',
    country: 'Portugalia',
    countryCode: 'PT',
    specializations: ['K9 Detekcja', 'K9 Gryzienie'],
    bioShort: 'Marynarka Wojenna Portugalia. Specjaliści NATO K9.',
    bioFull: 'Oficjalna delegacja Marynarki Wojennej Portugalia — NATO K9.',
    photo: '/images/instruktorzy/placeholder.jpg',
    order: 4,
    type: 'Instruktor',
    module: 'K9-Detekcja + pokaz NATO K9',
  },
];

const FILTERS = ['WSZYSCY', 'K9', 'TCCC', 'DRONY', 'KONFERENCJA', 'POZORANT'];

const partnerButtonStyle: React.CSSProperties = {
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
  e: React.MouseEvent<HTMLButtonElement>,
) => {
  e.currentTarget.style.backgroundColor = '#C4922A';
  e.currentTarget.style.color = '#1E2B38';
};

const handlePartnerButtonMouseLeave = (
  e: React.MouseEvent<HTMLButtonElement>,
) => {
  e.currentTarget.style.backgroundColor = 'transparent';
  e.currentTarget.style.color = '#C4922A';
};

export default function InstructorsGrid({ instructors }: InstructorsGridProps) {
  const [activeFilter, setActiveFilter] = useState('WSZYSCY');
  const [visibleCount, setVisibleCount] = useState(4);
  const loaderRef = useRef<HTMLDivElement>(null);
  const data = (instructors && instructors.length > 0) ? instructors : FALLBACK;

  const filtered = activeFilter === 'WSZYSCY'
    ? data
    : data.filter(i =>
        i.specializations.some(s =>
          s.toLowerCase().includes(activeFilter.toLowerCase())
        ) || (activeFilter === 'POZORANT' && i.type === 'Pozorant')
      );

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
        {FILTERS.map(f => (
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
            {f}
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
          BRAK INSTRUKTORÓW DLA WYBRANEGO FILTRA
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
                ŁADOWANIE...
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
