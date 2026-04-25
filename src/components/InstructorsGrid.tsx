import { useState, useEffect, useRef } from 'react';
import InstructorCard from './InstructorCard';
import { ui } from '../i18n/ui';
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

export default function InstructorsGrid({ instructors, lang }: InstructorsGridProps) {
  const t = {
    pl: { all: 'WSZYSCY', decoy: 'POZORANT', noInstructors: 'BRAK INSTRUKTORÓW DLA WYBRANEGO FILTRA', loading: 'ŁADOWANIE...' },
    en: { all: 'ALL', decoy: 'DECOY', noInstructors: 'NO INSTRUCTORS FOR THE SELECTED FILTER', loading: 'LOADING...' },
    de: { all: 'ALLE', decoy: 'SCHEINANGREIFER', noInstructors: 'KEINE INSTRUKTOREN FÜR DIESEN FILTER', loading: 'WIRD GELADEN...' },
    fr: { all: 'TOUS', decoy: 'HOMME D’ATTAQUE', noInstructors: 'AUCUN INSTRUCTEUR POUR CE FILTRE', loading: 'CHARGEMENT...' },
    hr: { all: 'SVI', decoy: 'MAMAC', noInstructors: 'NEMA INSTRUKTORA ZA ODABRANI FILTAR', loading: 'UČITAVANJE...' },
    cs: { all: 'VŠICHNI', decoy: 'FIGURANT', noInstructors: 'PRO VYBRANÝ FILTR NEJSOU INSTRUKTOŘI', loading: 'NAČÍTÁNÍ...' },
    lt: { all: 'VISI', decoy: 'FIGŪRANTAS', noInstructors: 'ŠIAM FILTRUI NĖRA INSTRUKTORIŲ', loading: 'ĮKELIAMA...' },
    lv: { all: 'VISI', decoy: 'FIGURANTS', noInstructors: 'NAV INSTRUKTORU ŠIM FILTRAM', loading: 'IELĀDE...' },
    sk: { all: 'VŠETCI', decoy: 'FIGURANT', noInstructors: 'PRE VYBRANÝ FILTER NIE SÚ INŠTRUKTORI', loading: 'NAČÍTAVA SA...' },
    sl: { all: 'VSI', decoy: 'FIGURANT', noInstructors: 'ZA IZBRANI FILTER NI INŠTRUKTORJEV', loading: 'NALAGANJE...' },
    hu: { all: 'ÖSSZES', decoy: 'SEGÉD', noInstructors: 'NINCS OKTATÓ A KIVÁLASZTOTT SZŰRŐHÖZ', loading: 'BETÖLTÉS...' },
    no: { all: 'ALLE', decoy: 'FIGURANT', noInstructors: 'INGEN INSTRUKTØRER FOR DETTE FILTERET', loading: 'LASTER...' },
    sv: { all: 'ALLA', decoy: 'FIGURANT', noInstructors: 'INGA INSTRUKTÖRER FÖR DETTA FILTER', loading: 'LADDAR...' },
    nl: { all: 'ALLE', decoy: 'PAKWERKER', noInstructors: 'GEEN INSTRUCTEURS VOOR DIT FILTER', loading: 'LADEN...' },
    es: { all: 'TODOS', decoy: 'FIGURANTE', noInstructors: 'NO HAY INSTRUCTORES PARA ESTE FILTRO', loading: 'CARGANDO...' },
    pt: { all: 'TODOS', decoy: 'FIGURANTE', noInstructors: 'SEM INSTRUTORES PARA ESTE FILTRO', loading: 'A CARREGAR...' },
    ro: { all: 'TOȚI', decoy: 'FIGURANT', noInstructors: 'NU EXISTĂ INSTRUCTORI PENTRU ACEST FILTRU', loading: 'SE ÎNCARCĂ...' },
    it: { all: 'TUTTI', decoy: 'FIGURANTE', noInstructors: 'NESSUN ISTRUTTORE PER QUESTO FILTRO', loading: 'CARICAMENTO...' },
    ko: { all: '전체', decoy: '도우미', noInstructors: '선택한 필터에 강사가 없습니다', loading: '로딩 중...' },
  }[lang] ?? { all: 'ALL', decoy: 'DECOY', noInstructors: 'NO INSTRUCTORS FOR THE SELECTED FILTER', loading: 'LOADING...' };
  const translatedFilters = FILTERS.map((f) => {
    if (f === 'WSZYSCY') return (ui[lang] as Record<string, string>).filter_all ?? t.all;
    if (f === 'POZORANT') return t.decoy;
    return f;
  });
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
        {FILTERS.map((f, index) => (
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
            {translatedFilters[index]}
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
          {t.noInstructors}
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
                {t.loading}
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
