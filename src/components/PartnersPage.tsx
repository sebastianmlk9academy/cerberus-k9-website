import { useState, type MouseEvent } from 'react';
import { Mail, Download } from 'lucide-react';

export type PartnerType = 'Strategiczny' | 'Sponsor' | 'Patron Medialny' | 'Technologiczny';

export interface Partner {
  id: number;
  name: string;
  type: PartnerType;
  description: string;
  website: string | null;
  websiteLabel: string | null;
  logo?: string | null;
}

const defaultPartners: Partner[] = [
  {
    id: 1,
    name: 'Polska Zbrojna (WIW MON)',
    type: 'Patron Medialny',
    description: 'Miesięcznik Wojska Polskiego. Patron medialny CERBERUS K9 od edycji 2025.',
    website: 'https://polska-zbrojna.pl',
    websiteLabel: 'polska-zbrojna.pl',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Polska%20Zbrojna-khEyAPmGAkhHX4IAVuiDjYLAqdTuoA.webp',
  },
  {
    id: 2,
    name: 'Special Ops',
    type: 'Patron Medialny',
    description: 'Kwartalnik Defence24 o tematyce jednostek specjalnych, wojska i służb mundurowych. Patron medialny CERBERUS K9 od edycji 2025.',
    website: 'https://www.special-ops.pl',
    websiteLabel: 'special-ops.pl',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/special-ops-logo-1-aKqs9eqCEBoNfiGfXd2COdP8qMZtns.webp',
  },
  {
    id: 3,
    name: 'Politechnika Wrocławska',
    type: 'Strategiczny',
    description: 'Katedra Mechaniki, Inżynierii Materiałowej i Biomedycznej. Partner R&D.',
    website: 'https://pwr.edu.pl',
    websiteLabel: 'pwr.edu.pl',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Politechnika%20Wroc%C5%82awska-bMf1AU1ZOaGoG2raCdKyyGazQpQI6u.webp',
  },
  {
    id: 4,
    name: 'Astriva',
    type: 'Technologiczny',
    description: 'Zaawansowana ochrona balistyczna i pancerze osobiste.',
    website: 'https://astriva.pl',
    websiteLabel: 'astriva.pl',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/astriva-logo-0p88smYLLCJekxGZrKcWgVzM5HJCj8.webp',
  },
  {
    id: 5,
    name: 'WOPR Ostrów Wlkp.',
    type: 'Strategiczny',
    description: 'Wodne Ochotnicze Pogotowie Ratunkowe. Pierwsza pomoc na CERBERUS K9.',
    website: 'https://facebook.com/profile.php?id=100064367904632',
    websiteLabel: 'Facebook',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wopr-I5BCl7zZm2JTLmXzWMKw3AChpkC4Zg.webp',
  },
  {
    id: 6,
    name: 'Rescue Team SE.A.L',
    type: 'Strategiczny',
    description: 'Szkolenia TCCC. Partnerzy modułu TCCC CERBERUS K9.',
    website: 'https://rescueteamseal.pl',
    websiteLabel: 'rescueteamseal.pl',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rescue%20Team%20SE.AL.-mSxq32Jr7TWiiO7jVs0TZzHRjUJWlG.webp',
  },
  {
    id: 7,
    name: 'Smart Target',
    type: 'Technologiczny',
    description: 'Sprzęt szkoleniowy dla zespołów K9 i służb mundurowych.',
    website: 'https://smart-target.pl',
    websiteLabel: 'smart-target.pl',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Smart%20Target-GqsRtYarx3io0nrWEQCWoTOjpm1mLv.webp',
  },
  {
    id: 8,
    name: 'Jednostka Strzelecka 3102 GRYF',
    type: 'Strategiczny',
    description: 'Organizacja proobronna.',
    website: 'https://www.jsgryf.pl',
    websiteLabel: 'jsgryf.pl',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jednostka%20Strzelecka%203102%20GRYF-IifeMDJr6xPU7yqVkJgy5UKaSjDerI.webp',
  },
  {
    id: 9,
    name: 'ObronaPowszechna.org',
    type: 'Strategiczny',
    description: 'Portal wiedzy o obronie powszechnej.',
    website: 'https://obronap.org',
    websiteLabel: 'obronap.org',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Obrona%20Powszechna-dmnnCmzvoiFfBRngRmbYdqfeDRa2d7.webp',
  },
  {
    id: 10,
    name: 'PZSO',
    type: 'Strategiczny',
    description: 'Polski Związek Strzelectwa Obronnego.',
    website: 'https://pzso.org.pl',
    websiteLabel: 'pzso.org.pl',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PZSO-yZgAaGjcQBuj54Ax83d0qlCz4fL46X.webp',
  },
  {
    id: 11,
    name: 'SOF K9 Lubliniec',
    type: 'Strategiczny',
    description: 'Szkolenia K9. Partner modułu K9 CERBERUS K9.',
    website: 'https://www.facebook.com/p/SOF-K9-Lubliniec-100088222903375/',
    websiteLabel: 'Facebook',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/K9%20SOF%20Lubliniec-artpTknhksLDSxkhJyjN82TuLV4172.webp',
  },
  {
    id: 12,
    name: 'ETO K9',
    type: 'Strategiczny',
    description: 'Szkolenia K9. Partner modułu K9 CERBERUS K9.',
    website: 'https://etok9.pl',
    websiteLabel: 'etok9.pl',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/K9%20ETO-cykwJh43PrBIrkyYV0bJOC4AXZRKQV.webp',
  },
  {
    id: 13,
    name: 'Grupa KMS K9',
    type: 'Strategiczny',
    description: 'Szkolenia K9. Partner modułu K9 CERBERUS K9.',
    website: 'https://www.facebook.com/GrupaKMSK9profesjonalneszkoleniepsow/',
    websiteLabel: 'Facebook',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Grupa%20KMS-uQtZha8d8KN8g4Agiz8VbSKYlEyFJ1.webp',
  },
  {
    id: 14,
    name: 'VALHALL K-9',
    type: 'Strategiczny',
    description: 'Szkolenia K9. Partner modułu K9 CERBERUS K9.',
    website: 'https://valhallk9.com',
    websiteLabel: 'valhallk9.com',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Valhall%20K9-qobBFVbFLarEmNDPb2waxfUzwFEiOC.webp',
  },
];

type FilterTab = 'WSZYSCY' | 'STRATEGICZNI' | 'SPONSORZY' | 'PATRONI MEDIALNI' | 'TECHNOLOGICZNI';

const filterTabs: FilterTab[] = [
  'WSZYSCY',
  'STRATEGICZNI',
  'SPONSORZY',
  'PATRONI MEDIALNI',
  'TECHNOLOGICZNI',
];

function handlePartnersFilterMouseEnter(e: MouseEvent<HTMLButtonElement>) {
  e.currentTarget.style.backgroundColor = '#C4922A';
  e.currentTarget.style.color = '#1E2B38';
}

function handlePartnersFilterMouseLeave(e: MouseEvent<HTMLButtonElement>) {
  e.currentTarget.style.backgroundColor = 'transparent';
  e.currentTarget.style.color = '#C4922A';
}

const typeToFilter: Record<PartnerType, FilterTab> = {
  Strategiczny: 'STRATEGICZNI',
  Sponsor: 'SPONSORZY',
  'Patron Medialny': 'PATRONI MEDIALNI',
  Technologiczny: 'TECHNOLOGICZNI',
};

const typeBadge: Record<PartnerType, { label: string; bg: string; text: string; border: string }> = {
  Strategiczny: {
    label: 'STRATEGICZNY',
    bg: 'rgba(196,146,42,0.12)',
    text: '#C4922A',
    border: 'rgba(196,146,42,0.35)',
  },
  Sponsor: {
    label: 'SPONSOR',
    bg: 'rgba(180,30,30,0.12)',
    text: '#C0392B',
    border: 'rgba(180,30,30,0.35)',
  },
  'Patron Medialny': {
    label: 'PATRON MEDIALNY',
    bg: 'rgba(32,160,150,0.12)',
    text: '#20A096',
    border: 'rgba(32,160,150,0.35)',
  },
  Technologiczny: {
    label: 'TECHNOLOGICZNY',
    bg: 'rgba(58,120,200,0.12)',
    text: '#4A90D9',
    border: 'rgba(58,120,200,0.35)',
  },
};

function PartnerCard({ partner }: { partner: Partner }) {
  const badge = typeBadge[partner.type];
  return (
    <div
      style={{
        background: '#0F1720',
        border: '1px solid #253344',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        transition: 'border-color 200ms ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#C4922A';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#253344';
      }}
    >
      {/* Logo area */}
      <div
        style={{
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0F1720',
          borderBottom: '1px solid #253344',
          margin: '0 -24px 16px',
          padding: '0 24px',
        }}
      >
        {partner.logo ? (
          <img
            src={partner.logo}
            alt={partner.name}
            style={{ maxHeight: '64px', maxWidth: '160px', width: 'auto', objectFit: 'contain' }}
          />
        ) : (
          <span
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '1.5px',
              color: '#3A4A5A',
              textAlign: 'center',
              textTransform: 'uppercase',
              lineHeight: 1.3,
              maxWidth: '160px',
            }}
          >
            {partner.name}
          </span>
        )}
      </div>

      {/* Badge */}
      <div style={{ marginBottom: '10px' }}>
        <span
          style={{
            display: 'inline-block',
            background: badge.bg,
            color: badge.text,
            border: `1px solid ${badge.border}`,
            fontSize: '9px',
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 700,
            letterSpacing: '1.8px',
            padding: '3px 8px',
          }}
        >
          {badge.label}
        </span>
      </div>

      {/* Name */}
      <p
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '20px',
          letterSpacing: '1px',
          color: '#E4DDD0',
          marginBottom: '8px',
          marginTop: '0',
          lineHeight: 1.3,
        }}
      >
        {partner.name}
      </p>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Libre Baskerville', serif",
          fontSize: '12px',
          color: '#5A6A7A',
          lineHeight: '1.6',
          margin: '0 0 16px 0',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          flexGrow: 1,
        }}
      >
        {partner.description}
      </p>

      {/* Website */}
      {partner.website && (
        <a
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '2px',
            color: '#C4922A',
            textDecoration: 'none',
            textTransform: 'uppercase',
            transition: 'color 0.2s',
            marginTop: 'auto',
          }}
          className="partner-link"
        >
          WEBSITE →
        </a>
      )}
    </div>
  );
}

function SectionDivider({ label }: { label: string }) {
  const lineStyle = {
    height: '1px',
    flex: 1,
    background: 'linear-gradient(to right, transparent, rgba(196, 43, 43, 0.4), transparent)',
  } as const;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        marginBottom: '48px',
      }}
    >
      <div style={lineStyle} />
      <span
        style={{
          fontFamily: "var(--font-rajdhani), 'Rajdhani', sans-serif",
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '5px',
          color: '#C42B2B',
        }}
      >
        {label}
      </span>
      <div style={lineStyle} />
    </div>
  );
}

type PartnersPageProps = {
  /** When set, replaces the built-in demo list (e.g. from `getCollection('partnerzy')`). */
  partners?: Partner[];
  /** Omit the built-in page hero when the route already renders `PageHero` above. */
  embedded?: boolean;
};

export default function PartnersPage({ partners: partnersProp, embedded = false }: PartnersPageProps) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('WSZYSCY');

  const partners = (partnersProp && partnersProp.length > 0)
    ? partnersProp
    : defaultPartners;

  const filtered =
    activeFilter === 'WSZYSCY'
      ? partners
      : partners.filter((p) => typeToFilter[p.type] === activeFilter);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #161F28, #1A2530, #161F28)',
        color: '#E4DDD0',
        fontFamily: "'Rajdhani', sans-serif",
      }}
    >
      <style>{`
        .partner-link:hover {
          color: #E0AA44 !important;
        }
        .filter-tab {
          background: transparent;
          border: 1px solid #C4922A;
          color: #C4922A;
          font-family: var(--font-rajdhani), sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
          padding: 8px 14px;
          cursor: pointer;
          border-radius: 0;
          transition: background-color 150ms ease, color 150ms ease;
          white-space: nowrap;
        }
        .filter-tab:hover {
          border: 1px solid #C4922A;
          background: #C4922A;
          color: #1E2B38;
        }
        .filter-tab.active {
          border: 1px solid #C4922A;
          background: #C4922A;
          color: #1E2B38;
        }
        @media (max-width: 900px) {
          .partners-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .cta-cards {
            flex-direction: column !important;
          }
        }
        @media (max-width: 600px) {
          .partners-grid {
            grid-template-columns: 1fr !important;
          }
          .filter-tabs-scroll {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>

      {!embedded && (
        <div
          style={{
            borderBottom: '1px solid #253344',
            padding: '64px 0 48px',
            background: 'linear-gradient(180deg, #111D2A 0%, #0D1520 100%)',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '2px', background: '#C4922A' }} />
              <span
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '4px',
                  color: '#C4922A',
                }}
              >
                CERBERUS K9
              </span>
            </div>
            <h1
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: 'clamp(48px, 7vw, 80px)',
                fontWeight: 400,
                letterSpacing: '4px',
                color: '#E4DDD0',
                margin: '0 0 16px 0',
                lineHeight: 1,
              }}
            >
              PARTNERZY
            </h1>
            <p
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: '15px',
                color: '#5A6A7A',
                maxWidth: '560px',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Instytucje, organizacje i firmy, które tworzą ekosystem CERBERUS K9 — najwyżej cenionego
              szkolenia służb K9 i mundurowych w Polsce.
            </p>
          </div>
        </div>
      )}

      {/* Main content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: embedded ? '48px 32px 64px' : '64px 32px' }}>

        {/* Section 1 — Partners Grid */}
        <SectionDivider label="AKTUALNI PARTNERZY" />

        {/* Filter tabs */}
        <div className="filter-tabs-scroll" style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              padding: '20px 0',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveFilter(tab)}
                  style={{
                    backgroundColor: isActive ? '#C4922A' : 'transparent',
                    color: isActive ? '#1E2B38' : '#C4922A',
                    fontFamily: 'var(--font-rajdhani), sans-serif',
                    letterSpacing: '3px',
                    fontWeight: 700,
                    borderRadius: 0,
                    border: '1px solid #C4922A',
                    transition: 'background-color 150ms ease, color 150ms ease',
                    cursor: 'pointer',
                    padding: '8px 14px',
                    fontSize: 11,
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={handlePartnersFilterMouseEnter}
                  onMouseLeave={(e) => {
                    if (isActive) return;
                    handlePartnersFilterMouseLeave(e);
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div
          className="partners-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2px',
            background: '#1A2230',
            marginBottom: '80px',
          }}
        >
          {filtered.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
          {filtered.length === 0 && (
            <div
              style={{
                gridColumn: '1 / -1',
                padding: '64px',
                textAlign: 'center',
                background: 'transparent',
                color: '#3A4A5A',
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: '13px',
                letterSpacing: '2px',
              }}
            >
              BRAK PARTNERÓW W TEJ KATEGORII
            </div>
          )}
        </div>

        {/* Section 2 — CTA Cards */}
        <SectionDivider label="ZOSTAŃ PARTNEREM" />

        <div
          className="cta-cards"
          style={{
            display: 'flex',
            gap: '2px',
          }}
        >
          {/* Card A — Sponsor */}
          <div
            style={{
              flex: 1,
              background: '#1E2B38',
              border: '1px solid #C4922A',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Gold accent bar */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #C4922A 0%, rgba(196,146,42,0.2) 100%)',
              }}
            />

            <div style={{ marginBottom: '8px' }}>
              <span
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '9px',
                  fontWeight: 700,
                  letterSpacing: '2.5px',
                  color: '#C4922A',
                  background: 'rgba(196,146,42,0.1)',
                  border: '1px solid rgba(196,146,42,0.3)',
                  padding: '3px 8px',
                }}
              >
                PAKIET KORPORACYJNY
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: '28px',
                fontWeight: 400,
                letterSpacing: '3px',
                color: '#C4922A',
                margin: '12px 0 20px',
              }}
            >
              ZOSTAŃ SPONSOREM
            </h2>

            <p
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: '14px',
                color: '#5A6A7A',
                lineHeight: 1.75,
                margin: '0 0 32px 0',
                flexGrow: 1,
              }}
            >
              Dotrzyj do elity służb mundurowych, ekspertów bezpieczeństwa i środowisk K9 z Polski
              i całej Europy. Pakiety sponsorskie od{' '}
              <strong style={{ color: '#C4922A' }}>5 000 PLN</strong>.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
              <a
                href="mailto:sebastian@pactak9.org"
                className="cursor-pointer transition-colors w-full sm:w-auto text-[10px] sm:text-[11px] px-5 py-3 sm:px-8 sm:py-3.5 inline-flex items-center gap-2 no-underline"
                style={{
                  backgroundColor: '#C42B2B',
                  color: 'white',
                  fontFamily: 'var(--font-rajdhani), sans-serif',
                  letterSpacing: '3px',
                  fontWeight: 700,
                  borderRadius: 0,
                  border: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#9E1F1F';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#C42B2B';
                }}
              >
                <Download size={13} />
                POBIERZ OFERTĘ SPONSORSKĄ
              </a>

              <a
                href="mailto:sebastian@pactak9.org"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  color: '#5A6A7A',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                className="mailto-link"
              >
                <Mail size={11} />
                Lub napisz: sebastian@pactak9.org
              </a>
            </div>
          </div>

          {/* Card B — Patron medialny */}
          <div
            style={{
              flex: 1,
              background: '#1E2B38',
              border: '1px solid #253344',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Navy accent bar */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #20A096 0%, rgba(32,160,150,0.15) 100%)',
              }}
            />

            <div style={{ marginBottom: '8px' }}>
              <span
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '9px',
                  fontWeight: 700,
                  letterSpacing: '2.5px',
                  color: '#20A096',
                  background: 'rgba(32,160,150,0.1)',
                  border: '1px solid rgba(32,160,150,0.3)',
                  padding: '3px 8px',
                }}
              >
                DLA MEDIÓW
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: '28px',
                fontWeight: 400,
                letterSpacing: '3px',
                color: '#E4DDD0',
                margin: '12px 0 20px',
              }}
            >
              PATRONAT MEDIALNY
            </h2>

            <p
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: '14px',
                color: '#5A6A7A',
                lineHeight: 1.75,
                margin: '0 0 32px 0',
                flexGrow: 1,
              }}
            >
              Oferujemy wzajemną promocję, akredytację dziennikarską, materiały prasowe i ekskluzywny
              dostęp mediów do CERBERUS K9.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
              <a
                href="mailto:sebastian@pactak9.org"
                style={{
                  backgroundColor: 'transparent',
                  color: '#C4922A',
                  fontFamily: 'var(--font-rajdhani), sans-serif',
                  letterSpacing: '3px',
                  fontWeight: 700,
                  borderRadius: 0,
                  border: '1px solid #C4922A',
                  transition: 'background-color 150ms ease, color 150ms ease',
                  cursor: 'pointer',
                  padding: '12px 24px',
                  fontSize: 13,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#C4922A';
                  e.currentTarget.style.color = '#1E2B38';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#C4922A';
                }}
              >
                <Mail size={13} />
                NAPISZ DO NAS
              </a>

              <p
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: '12px',
                  color: '#3A4A5A',
                  margin: 0,
                  fontStyle: 'italic',
                  lineHeight: 1.6,
                }}
              >
                Akredytacje i zapytania medialne przyjmujemy przez cały rok.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
