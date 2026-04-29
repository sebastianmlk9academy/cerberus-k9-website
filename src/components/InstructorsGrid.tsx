import { useState, useEffect, useRef, useMemo, type CSSProperties, type MouseEvent } from 'react';
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

export type CmsInstructorFilterRow = {
  key: string;
  label_pl: string;
  label_en?: string;
  label_de?: string;
  label_fr?: string;
  filter_field: 'specializations' | 'type' | 'module' | 'languages' | 'all';
  filter_match?: 'includes' | 'equals' | 'any_of' | 'none';
  filter_value?: string;
  filter_values?: string[];
  order?: number;
};

interface InstructorsGridProps {
  lang: Lang;
  instructors?: Instructor[];
  placeholderPhoto?: string;
  /** Z CMS (`instructor_filters`); brak = dotychczasowe stałe filtry. */
  cmsFilters?: CmsInstructorFilterRow[];
}

const FALLBACK: Instructor[] = [];

type InstructorFilter = 'all' | 'k9' | 'tccc' | 'drones' | 'conference' | 'decoy';
const LEGACY_FILTERS: InstructorFilter[] = ['all', 'k9', 'tccc', 'drones', 'conference', 'decoy'];

function cmsFilterLabel(lang: Lang, def: CmsInstructorFilterRow): string {
  if (lang === 'pl') return def.label_pl;
  if (lang === 'de' && def.label_de) return def.label_de;
  if (lang === 'fr' && def.label_fr) return def.label_fr;
  return def.label_en?.trim() || def.label_pl;
}

function applyCmsInstructorFilter(i: Instructor, def: CmsInstructorFilterRow): boolean {
  if (def.key === 'decoy') {
    const specializations = (i.specializations || []).map((s) => s.toLowerCase());
    return (
      (i.type?.toLowerCase().includes('pozorant') ?? false) ||
      (i.type?.toLowerCase().includes('decoy') ?? false) ||
      specializations.some((s) => s.includes('pozorant') || s.includes('decoy') || s.includes('figurant'))
    );
  }
  if (def.filter_field === 'all' || def.filter_match === 'none') return true;

  const specs = (i.specializations || []).map((s) => s.toLowerCase());
  const needle = (def.filter_value ?? '').toLowerCase();
  const needles = (def.filter_values ?? []).map((s) => s.toLowerCase()).filter(Boolean);
  const hayType = (i.type ?? '').toLowerCase();
  const hayModule = (i.module ?? '').toLowerCase();
  const hayLang = (i.languages ?? '').toLowerCase();
  const m = def.filter_match ?? 'includes';

  const haystack = (): string => {
    switch (def.filter_field) {
      case 'specializations':
        return specs.join(' ');
      case 'type':
        return hayType;
      case 'module':
        return hayModule;
      case 'languages':
        return hayLang;
      default:
        return '';
    }
  };
  const h = haystack();

  if (m === 'equals') return needle !== '' && h === needle;
  if (m === 'any_of') {
    if (!needles.length) return true;
    if (def.filter_field === 'specializations') {
      return needles.some((n) => specs.some((s) => s.includes(n)));
    }
    return needles.some((n) => h.includes(n));
  }
  if (m === 'includes') {
    if (!needle) return true;
    if (def.filter_field === 'specializations') {
      return specs.some((s) => s.includes(needle));
    }
    return h.includes(needle);
  }
  return true;
}

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

export default function InstructorsGrid({
  instructors,
  lang,
  placeholderPhoto,
  cmsFilters,
}: InstructorsGridProps) {
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
  const filterLabelsByLang: Record<string, Record<string, string>> = {
    pl: { all: 'WSZYSCY', k9: 'K9', tccc: 'TCCC',
      drones: 'DRONY', conference: 'KONFERENCJA', decoy: 'POZORANT' },
    en: { all: 'ALL', k9: 'K9', tccc: 'TCCC',
      drones: 'DRONES', conference: 'CONFERENCE', decoy: 'DECOY' },
    de: { all: 'ALLE', k9: 'K9', tccc: 'TCCC',
      drones: 'DROHNEN', conference: 'KONFERENZ', decoy: 'FIGURANT' },
    fr: { all: 'TOUS', k9: 'K9', tccc: 'TCCC',
      drones: 'DRONES', conference: 'CONFÉRENCE', decoy: 'FIGURANT' },
    cs: { all: 'VŠICHNI', k9: 'K9', tccc: 'TCCC',
      drones: 'DRONY', conference: 'KONFERENCE', decoy: 'FIGURANT' },
    sk: { all: 'VŠETCI', k9: 'K9', tccc: 'TCCC',
      drones: 'DRONY', conference: 'KONFERENCIA', decoy: 'FIGURANT' },
    hu: { all: 'MINDENKI', k9: 'K9', tccc: 'TCCC',
      drones: 'DRÓNOK', conference: 'KONFERENCIA', decoy: 'FIGURÁNS' },
    hr: { all: 'SVI', k9: 'K9', tccc: 'TCCC',
      drones: 'DRONOVI', conference: 'KONFERENCIJA', decoy: 'FIGURANT' },
    sl: { all: 'VSI', k9: 'K9', tccc: 'TCCC',
      drones: 'BREZPILOTNIKI', conference: 'KONFERENCA', decoy: 'FIGURANT' },
    lt: { all: 'VISI', k9: 'K9', tccc: 'TCCC',
      drones: 'DRONAI', conference: 'KONFERENCIJA', decoy: 'FIGURANTAS' },
    lv: { all: 'VISI', k9: 'K9', tccc: 'TCCC',
      drones: 'DRONI', conference: 'KONFERENCE', decoy: 'FIGURANTS' },
    no: { all: 'ALLE', k9: 'K9', tccc: 'TCCC',
      drones: 'DRONER', conference: 'KONFERANSE', decoy: 'FIGURANT' },
    sv: { all: 'ALLA', k9: 'K9', tccc: 'TCCC',
      drones: 'DRÖNARE', conference: 'KONFERENS', decoy: 'FIGURANT' },
    nl: { all: 'ALLEN', k9: 'K9', tccc: 'TCCC',
      drones: 'DRONES', conference: 'CONFERENTIE', decoy: 'FIGURANT' },
    es: { all: 'TODOS', k9: 'K9', tccc: 'TCCC',
      drones: 'DRONES', conference: 'CONFERENCIA', decoy: 'FIGURANTE' },
    pt: { all: 'TODOS', k9: 'K9', tccc: 'TCCC',
      drones: 'DRONES', conference: 'CONFERÊNCIA', decoy: 'FIGURANTE' },
    ro: { all: 'TOȚI', k9: 'K9', tccc: 'TCCC',
      drones: 'DRONE', conference: 'CONFERINȚĂ', decoy: 'FIGURANT' },
    it: { all: 'TUTTI', k9: 'K9', tccc: 'TCCC',
      drones: 'DRONI', conference: 'CONFERENZA', decoy: 'FIGURANTE' },
    ko: { all: '전체', k9: 'K9', tccc: 'TCCC',
      drones: '드론', conference: '컨퍼런스', decoy: '조력자' },
  };
  const fl = filterLabelsByLang[lang] ?? filterLabelsByLang['en'];
  const useCms = (cmsFilters?.length ?? 0) > 0;
  const sortedCms = useMemo(
    () => [...(cmsFilters ?? [])].sort((a, b) => (a.order ?? 10) - (b.order ?? 10)),
    [cmsFilters],
  );
  const filterKeys = useMemo(
    () => (useCms ? sortedCms.map((f) => f.key) : [...LEGACY_FILTERS]),
    [useCms, sortedCms],
  );
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState(4);
  const loaderRef = useRef<HTMLDivElement>(null);
  const data = (instructors && instructors.length > 0) ? instructors : FALLBACK;

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return data;
    if (!useCms) {
      return data.filter((i) => {
        const specializations = i.specializations.map((s) => s.toLowerCase());
        const legacy = activeFilter as InstructorFilter;
        if (legacy === 'decoy') {
          return (
            i.type?.toLowerCase().includes('pozorant') ||
            i.type?.toLowerCase().includes('decoy') ||
            specializations.some((s) => s.includes('pozorant') || s.includes('decoy') || s.includes('figurant'))
          );
        }
        if (legacy === 'drones') {
          return specializations.some((s) =>
            s.includes('dron') ||
            s.includes('drone') ||
            s.includes('drony') ||
            s.includes('bsp') ||
            s.includes('uav'),
          );
        }
        if (legacy === 'conference') {
          return specializations.some((s) => s.includes('konfer') || s.includes('conference'));
        }
        return specializations.some((s) => s.includes(legacy));
      });
    }
    const def = sortedCms.find((d) => d.key === activeFilter);
    if (!def) return data;
    if (def.filter_field === 'all' || def.filter_match === 'none') return data;
    return data.filter((i) => applyCmsInstructorFilter(i, def));
  }, [data, activeFilter, useCms, sortedCms]);

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
  const sectionTags: Record<string, string> = {
    pl: 'TEAM LEADERZY · INSTRUKTORZY · POZORANCI · PRELEGENCI',
    en: 'TEAM LEADERS · INSTRUCTORS · DECOYS · SPEAKERS',
    de: 'TEAMLEITER · INSTRUKTEURE · FIGURANTEN · REFERENTEN',
    fr: 'CHEFS D\'ÉQUIPE · INSTRUCTEURS · FIGURANTS · INTERVENANTS',
    cs: 'VEDOUCÍ TÝMU · INSTRUKTOŘI · FIGURANTI · PŘEDNÁŠEJÍCÍ',
    sk: 'VEDÚCI TÍMU · INŠTRUKTORI · FIGURANTI · PREDNÁŠAJÚCI',
    hu: 'CSAPATVEZETŐK · OKTATÓK · FIGURÁNSOK · ELŐADÓK',
    hr: 'VOĐE TIMA · INSTRUKTORI · FIGURANTI · PREDAVAČI',
    sl: 'VODJE EKIPE · INŠTRUKTORJI · FIGURANTI · PREDAVATELJI',
    lt: 'KOMANDŲ VADOVAI · INSTRUKTORIAI · FIGURANTAI · PRANEŠĖJAI',
    lv: 'KOMANDAS VADĪTĀJI · INSTRUKTORI · FIGURANTI · LEKTORI',
    no: 'TEAMLEDERE · INSTRUKTØRER · FIGURANTER · FOREDRAGSHOLDERE',
    sv: 'TEAMLEDARE · INSTRUKTÖRER · FIGURANTER · FÖRELÄSARE',
    nl: 'TEAMLEIDERS · INSTRUCTEURS · FIGURANTEN · SPREKERS',
    es: 'LÍDERES DE EQUIPO · INSTRUCTORES · FIGURANTES · PONENTES',
    pt: 'LÍDERES DE EQUIPA · INSTRUTORES · FIGURANTES · ORADORES',
    ro: 'LIDERI DE ECHIPĂ · INSTRUCTORI · FIGURANȚI · VORBITORI',
    it: 'RESPONSABILI DI TEAM · ISTRUTTORI · FIGURANTI · RELATORI',
    ko: '팀 리더 · 강사 · 보조훈련사 · 발표자',
  };
  const sectionTag = sectionTags[lang] ?? sectionTags['en'];
  const firstFilterRow = filterKeys.slice(0, 6);
  const secondFilterRow = filterKeys.slice(6);

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
          {sectionTag}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C42B2B]/40 to-transparent" />
      </div>
      {/* Filter bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '48px', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', justifyContent: 'center' }}>
          {firstFilterRow.map((f) => {
            const def = useCms ? sortedCms.find((row) => row.key === f) : undefined;
            const label = useCms && def ? cmsFilterLabel(lang, def) : fl[f as InstructorFilter];
            return (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f)}
                style={{
                  ...partnerButtonStyle,
                  backgroundColor: activeFilter === f ? '#C4922A' : 'transparent',
                  color: activeFilter === f ? '#1E2B38' : '#C4922A',
                  padding: '8px 14px',
                  fontSize: 11,
                }}
                onMouseEnter={handlePartnerButtonMouseEnter}
                onMouseLeave={(e) => {
                  if (activeFilter === f) return;
                  handlePartnerButtonMouseLeave(e);
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
        {secondFilterRow.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', justifyContent: 'center' }}>
            {secondFilterRow.map((f) => {
              const def = useCms ? sortedCms.find((row) => row.key === f) : undefined;
              const label = useCms && def ? cmsFilterLabel(lang, def) : fl[f as InstructorFilter];
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveFilter(f)}
                  style={{
                    ...partnerButtonStyle,
                    backgroundColor: activeFilter === f ? '#C4922A' : 'transparent',
                    color: activeFilter === f ? '#1E2B38' : '#C4922A',
                    padding: '8px 14px',
                    fontSize: 11,
                  }}
                  onMouseEnter={handlePartnerButtonMouseEnter}
                  onMouseLeave={(e) => {
                    if (activeFilter === f) return;
                    handlePartnerButtonMouseLeave(e);
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        ) : null}
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
              <InstructorCard
                key={instructor.name + i}
                {...instructor as any}
                placeholderPhoto={placeholderPhoto}
                lang={lang}
              />
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
