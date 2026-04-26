import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const TAG_STYLES: Record<string, { bg: string; border: string; color: string }> = {
  'K9 Gryzienie': { bg: 'rgba(196,146,42,0.15)', border: 'rgba(196,146,42,0.4)', color: '#C4922A' },
  'K9 Detekcja': { bg: 'rgba(196,146,42,0.15)', border: 'rgba(196,146,42,0.4)', color: '#C4922A' },
  'K9 Tropienie/SAR': { bg: 'rgba(196,146,42,0.15)', border: 'rgba(196,146,42,0.4)', color: '#C4922A' },
  'TCCC': { bg: 'rgba(196,43,43,0.15)', border: 'rgba(196,43,43,0.35)', color: '#C42B2B' },
  'TCCC-K9': { bg: 'rgba(196,43,43,0.15)', border: 'rgba(196,43,43,0.35)', color: '#C42B2B' },
  'Pierwsza Pomoc Przedmedyczna': { bg: 'rgba(196,43,43,0.15)', border: 'rgba(196,43,43,0.35)', color: '#C42B2B' },
  'Pozorant': { bg: 'rgba(90,58,138,0.15)', border: 'rgba(90,58,138,0.35)', color: '#8A5ACA' },
  'Konferencja - Prelegent': { bg: 'rgba(42,106,58,0.15)', border: 'rgba(42,106,58,0.35)', color: '#3A8A4A' },
  'Behawiorysta': { bg: 'rgba(42,90,138,0.15)', border: 'rgba(42,90,138,0.35)', color: '#3A7ACA' },
};

const DEFAULT_TAG = { bg: 'rgba(196,146,42,0.15)', border: 'rgba(196,146,42,0.4)', color: '#C4922A' };


interface InstructorCardProps {
  name: string;
  country: string;
  countryCode: string;
  specializations: string[];
  bioShort: string;
  bioFull: string;
  photo: string;
  order: number;
  module?: string;
  schedule?: string;
  linkedinUrl?: string;
  placeholderPhoto?: string;
}

export default function InstructorCard({
  name,
  country,
  countryCode,
  specializations,
  bioShort,
  bioFull,
  photo,
  module,
  schedule,
  linkedinUrl,
  placeholderPhoto,
}: InstructorCardProps) {
  const [expanded, setExpanded] = useState(false);
  const fallbackPhoto = placeholderPhoto ?? '/images/instruktorzy/test_instruktor_photo.webp';
  const photoSrc = photo || fallbackPhoto;

  return (
    <div
      className="group overflow-hidden cursor-pointer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#1E2B38',
        border: '1px solid #253344',
        transition: 'border-color 200ms ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#C4922A')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#253344')}
    >
      {/* Photo area */}
      <div className="relative w-full" style={{ aspectRatio: '1/1', flexShrink: 0, background: '#253344' }}>
        <img
          src={photoSrc}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = fallbackPhoto;
          }}
        />
        {/* Bottom gradient overlay */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: '40%',
            background: 'linear-gradient(to top, #1E2B38, transparent)',
          }}
        />
      </div>

      {/* Content area */}
      <div
        style={{
          padding: '20px',
          display: 'grid',
          gridTemplateRows: 'auto auto 80px auto auto',
          gap: '0px',
          alignItems: 'start',
        }}
      >
        {/* Name */}
        <h3
          style={{
            flexShrink: 0,
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '22px',
            color: '#E4DDD0',
            letterSpacing: '1px',
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {name}
        </h3>

        {/* Country name with flag */}
        <p
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexShrink: 0,
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: '10px',
            letterSpacing: '3px',
            color: '#7A8A96',
            margin: '0 0 12px 0',
            textTransform: 'uppercase',
          }}
        >
          <img
            src={'https://flagcdn.com/24x18/' + countryCode.toLowerCase() + '.png'}
            srcSet={'https://flagcdn.com/48x36/' + countryCode.toLowerCase() + '.png 2x'}
            width="24"
            height="18"
            alt={country}
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
          />
          {country}
        </p>

        {/* Specialization tags */}
        <div
          className="flex flex-wrap"
          style={{ gap: '6px', marginBottom: '14px', flexShrink: 0, height: '80px', overflow: 'hidden', alignContent: 'start', alignItems: 'start', alignSelf: 'start' }}
        >
          {specializations.map((spec) => {
            const style = TAG_STYLES[spec] ?? DEFAULT_TAG;
            return (
              <span
                key={spec}
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '8px',
                  letterSpacing: '2px',
                  fontWeight: 700,
                  padding: '3px 10px',
                  background: style.bg,
                  border: `1px solid ${style.border}`,
                  color: style.color,
                  textTransform: 'uppercase',
                  lineHeight: 1.4,
                }}
              >
                {spec}
              </span>
            );
          })}
        </div>

        <div style={{ alignSelf: 'start', height: 'auto' }}>
          {!expanded ? (
            /* COLLAPSED */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: '12px',
                  color: '#5A6A7A',
                  lineHeight: 1.6,
                  margin: 0,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical' as const,
                  overflow: 'hidden',
                  height: '96px',
                }}
              >
                {bioShort}
              </p>
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="flex items-center gap-1 bg-transparent border-none"
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '9px',
                  letterSpacing: '2px',
                  color: '#C4922A',
                  fontWeight: 700,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                ROZWIŃ BIO
                <ChevronDown size={12} style={{ transform: 'rotate(0deg)', transition: 'transform 300ms ease' }} />
              </button>
            </div>
          ) : (
            /* EXPANDED */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="flex items-center gap-1 bg-transparent border-none"
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '9px',
                  letterSpacing: '2px',
                  color: '#C4922A',
                  fontWeight: 700,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                ZWIŃ BIO
                <ChevronDown size={12} style={{ transform: 'rotate(180deg)', transition: 'transform 300ms ease' }} />
              </button>
              <p
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: '13px',
                  color: '#7A8A96',
                  lineHeight: 1.75,
                  margin: 0,
                  borderTop: '1px solid #253344',
                  paddingTop: '12px',
                }}
              >
                {bioFull}
              </p>
              {module && (
                <p
                  style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    fontSize: '9px',
                    letterSpacing: '2px',
                    color: '#C4922A',
                    margin: '4px 0 0 0',
                  }}
                >
                  MODUŁ: {module}
                </p>
              )}
              {schedule && (
                <p
                  style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    fontSize: '9px',
                    letterSpacing: '2px',
                    color: '#7A8A96',
                    margin: '2px 0 0 0',
                  }}
                >
                  HARMONOGRAM: {schedule}
                </p>
              )}
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    fontSize: '9px',
                    letterSpacing: '2px',
                    color: '#3A7ACA',
                    marginTop: '4px',
                    display: 'block',
                  }}
                >
                  LINKEDIN →
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export type { InstructorCardProps };
