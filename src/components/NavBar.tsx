import { useState, type MouseEvent } from 'react';

const navLinks = [
  { label: 'O WYDARZENIU', href: '/pl/o-wydarzeniu' },
  { label: 'INSTRUKTORZY', href: '/pl/instruktorzy' },
  { label: 'PARTNERZY', href: '/pl/partnerzy' },
  { label: 'MEDIA', href: '/pl/media' },
  { label: 'FUNDACJA', href: '/pl/fundacja' },
  { label: 'GALERIA', href: '/pl/galeria' },
  { label: 'KONTAKT', href: '/pl/kontakt' },
];

const languages = [
  { code: 'pl', name: 'Polski', countryCode: 'pl' },
  { code: 'en', name: 'English', countryCode: 'gb' },
  { code: 'de', name: 'Deutsch', countryCode: 'de' },
  { code: 'fr', name: 'Français', countryCode: 'fr' },
  { code: 'hr', name: 'Hrvatski', countryCode: 'hr' },
  { code: 'cs', name: 'Čeština', countryCode: 'cz' },
  { code: 'lt', name: 'Lietuvių', countryCode: 'lt' },
  { code: 'lv', name: 'Latviešu', countryCode: 'lv' },
  { code: 'sk', name: 'Slovenčina', countryCode: 'sk' },
  { code: 'sl', name: 'Slovenščina', countryCode: 'si' },
  { code: 'hu', name: 'Magyar', countryCode: 'hu' },
  { code: 'no', name: 'Norsk', countryCode: 'no' },
  { code: 'sv', name: 'Svenska', countryCode: 'se' },
  { code: 'nl', name: 'Nederlands', countryCode: 'nl' },
  { code: 'es', name: 'Español', countryCode: 'es' },
  { code: 'pt', name: 'Português', countryCode: 'pt' },
  { code: 'ro', name: 'Română', countryCode: 'ro' },
  { code: 'it', name: 'Italiano', countryCode: 'it' },
  { code: 'ko', name: '한국어', countryCode: 'kr' },
] as const;

type Language = (typeof languages)[number];

const getFlagUrl = (countryCode: string) =>
  `https://flagcdn.com/16x12/${countryCode}.png`;

interface NavBarProps {
  activeLink?: string;
}

export function NavBar({ activeLink }: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>(languages[0]);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const selectLang = (lang: Language) => {
    setCurrentLang(lang);
    setLangDropdownOpen(false);

    // Navigate to the same page in the selected language
    const currentPath = window.location.pathname;
    // Extract current path without language prefix
    // e.g. /pl/o-wydarzeniu → /en/o-wydarzeniu
    const pathParts = currentPath.split('/');
    if (pathParts.length >= 2) {
      pathParts[1] = lang.code;
      window.location.href = pathParts.join('/') || '/' + lang.code;
    } else {
      window.location.href = '/' + lang.code;
    }
  };

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        background: 'linear-gradient(to bottom, #161F28, #1A2530, #161F28)',
        borderBottomColor: '#253344',
      }}
    >
      <div
        className="h-14 md:h-16 max-w-7xl mx-auto px-3 md:px-4 flex items-center justify-between"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        {/* LEFT SIDE — LOGO AREA */}
        <a href="/pl" className="flex items-center gap-2 md:gap-3 shrink-0">
          <img
            src="/images/cerberus-k9-logo.png"
            alt="CERBERUS K9"
            className="h-10 md:h-12 object-contain"
          />
          <div className="hidden sm:flex flex-col leading-none">
            <span
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(18px, 2.2vw, 24px)',
                letterSpacing: '2px',
                color: '#E4DDD0',
              }}
            >
              CERBERUS <span style={{ color: '#C42B2B' }}>K9</span>
            </span>
            <span
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: 'clamp(6px, 0.75vw, 8px)',
                letterSpacing: '1.8px',
                fontWeight: 700,
                color: '#4A5A6A',
                marginTop: '-1px',
              }}
            >
              INTERNATIONAL DEFENSE PLATFORM
            </span>
          </div>
        </a>

        {/* CENTER — NAVIGATION LINKS (desktop only) */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6" style={{ alignItems: 'center', height: '100%' }}>
          {navLinks.map((link) => {
            const isActive = activeLink === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors duration-150 whitespace-nowrap"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '10px',
                  letterSpacing: '2px',
                  fontWeight: 700,
                  color: isActive ? '#C4922A' : '#FFFFFF',
                  boxShadow: isActive ? 'inset 0 -2px 0 #C4922A' : 'none',
                }}
                onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#C4922A';
                  }
                }}
                onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#FFFFFF';
                  }
                }}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* RIGHT SIDE */}
        <div
          className="flex items-center gap-2 md:gap-4"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {/* Language Switcher - Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 transition-colors duration-150"
              aria-label={`Current language: ${currentLang.name}. Click to change.`}
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: '10px',
                letterSpacing: '2px',
                fontWeight: 700,
                color: langDropdownOpen ? '#C4922A' : '#4A5A6A',
              }}
              onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.color = '#C4922A';
              }}
              onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
                if (!langDropdownOpen) {
                  e.currentTarget.style.color = '#4A5A6A';
                }
              }}
            >
              <img
                src={getFlagUrl(currentLang.countryCode)}
                alt={currentLang.name}
                className="w-4 h-3 object-cover"
              />
              <span className="hidden sm:inline" style={{ color: '#FFFFFF' }}>
                {currentLang.name.toUpperCase()}
              </span>
              <svg
                className="w-3 h-3 transition-transform duration-150"
                style={{
                  transform: langDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {langDropdownOpen && (
              <>
                {/* Backdrop to close dropdown */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setLangDropdownOpen(false)}
                  aria-hidden="true"
                />
                <div
                  className="absolute top-full right-0 mt-3 py-2 min-w-[160px] border z-50 max-h-[70vh] overflow-y-auto"
                  style={{
                    backgroundColor: '#0F1720',
                    borderColor: '#253344',
                  }}
                >
                  {languages.map((lang) => (
                    <button
                      type="button"
                      key={lang.code}
                      onClick={() => selectLang(lang)}
                      className="w-full flex items-center gap-2.5 px-4 py-2 transition-colors duration-150"
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: '10px',
                        letterSpacing: '2px',
                        fontWeight: 700,
                        color: '#FFFFFF',
                      }}
                      onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
                        e.currentTarget.style.color = '#FFFFFF';
                      }}
                      onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
                        e.currentTarget.style.color = '#FFFFFF';
                      }}
                    >
                      <img
                        src={getFlagUrl(lang.countryCode)}
                        alt={lang.name}
                        className="w-4 h-3 object-cover"
                      />
                      <span>{lang.name.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* CTA Button - Always visible */}
          <a
            href="/pl/rejestracja"
            className="block transition-colors duration-150 shrink-0"
            style={{
              backgroundColor: '#C42B2B',
              color: 'white',
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: 'clamp(8px, 2vw, 10px)',
              letterSpacing: 'clamp(1px, 0.5vw, 2px)',
              fontWeight: 700,
              padding: '8px 14px',
            }}
            onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.backgroundColor = '#A82424';
            }}
            onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.backgroundColor = '#C42B2B';
            }}
          >
            REJESTRACJA
          </a>

          {/* Mobile Hamburger Menu */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 h-0.5 transition-transform duration-200"
              style={{
                backgroundColor: '#C4922A',
                transform: mobileMenuOpen ? 'rotate(45deg) translateY(6px)' : 'none',
              }}
            />
            <span
              className="block w-6 h-0.5 transition-opacity duration-200"
              style={{
                backgroundColor: '#C4922A',
                opacity: mobileMenuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-0.5 transition-transform duration-200"
              style={{
                backgroundColor: '#C4922A',
                transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none',
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden w-full border-b"
          style={{
            backgroundColor: '#0F1720',
            borderBottomColor: '#253344',
          }}
        >
          {navLinks.map((link) => {
            const isActive = activeLink === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center h-12 border-b"
                style={{
                  paddingLeft: '16px',
                  borderBottomColor: '#253344',
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '3px',
                  fontWeight: 700,
                  color: isActive ? '#C4922A' : '#FFFFFF',
                }}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
}
