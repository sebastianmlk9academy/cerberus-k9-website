import { useEffect, useMemo, useState, type CSSProperties, type MouseEvent } from 'react';
import { ui } from '../i18n/ui';
import type { NavLink } from '@/types/nav';

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

type ResolvedNavLink = NavLink & {
  resolvedHref: string;
  label: string;
};

const normPath = (p: string) => {
  const t = p.trim();
  if (!t || t === '/') return t || '/';
  return t.endsWith('/') ? t.slice(0, -1) : t;
};

const getFlagUrl = (countryCode: string) =>
  `https://flagcdn.com/16x12/${countryCode}.png`;

type UiLang = keyof typeof ui;

function registrationLabel(code: string): string {
  const pack = (ui[code as UiLang] ?? ui.pl) as (typeof ui)['pl'];
  return pack.nav_registration;
}

function LangDropdown({
  currentLang,
  open,
  setOpen,
  onSelectLang,
}: {
  currentLang: Language;
  open: boolean;
  setOpen: (next: boolean) => void;
  onSelectLang: (next: Language) => void;
}) {
  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-[10px] py-[6px] transition-colors duration-150 xl:px-[14px] xl:py-2"
        aria-label={`Current language: ${currentLang.name}. Click to change.`}
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: 'clamp(10px, 1vw, 11px)',
          letterSpacing: 'clamp(0.5px, 0.3vw, 1.5px)',
          fontWeight: 700,
          color: open ? '#C4922A' : '#FFFFFF',
          boxShadow: open ? 'inset 0 -2px 0 #C4922A' : 'none',
        }}
        onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
          e.currentTarget.style.color = '#C4922A';
        }}
        onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
          if (!open) {
            e.currentTarget.style.color = '#FFFFFF';
          }
        }}
      >
        <span className="flex items-center gap-1.5">
          <img
            src={getFlagUrl(currentLang.countryCode)}
            alt={currentLang.name}
            className="h-3 w-4 object-cover"
          />
          <span className="hidden sm:inline">{currentLang.name.toUpperCase()}</span>
        </span>
        <svg
          className="h-3 w-3 shrink-0 transition-transform duration-150"
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden="true" />
          <div
            className="absolute right-0 top-full z-50 mt-3 max-h-[70vh] min-w-[160px] overflow-y-auto border py-2"
            style={{
              backgroundColor: '#0F1720',
              borderColor: '#C4922A',
              borderTop: '2px solid #C4922A',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            }}
          >
            {languages.map((langOpt) => {
              const isCurrentLang = langOpt.code === currentLang.code;
              return (
                <button
                  type="button"
                  key={langOpt.code}
                  onClick={() => onSelectLang(langOpt)}
                  className="flex w-full items-center gap-2 px-4 py-2 transition-colors duration-150"
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: '12px',
                    letterSpacing: '2px',
                    fontWeight: 700,
                    color: isCurrentLang ? '#C4922A' : '#7A8A96',
                    backgroundColor: isCurrentLang ? '#1A2530' : 'transparent',
                    transition: 'background-color 0.15s, color 0.15s',
                  }}
                  onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
                    e.currentTarget.style.backgroundColor = '#1E2B38';
                    e.currentTarget.style.color = '#C4922A';
                  }}
                  onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
                    const current = langOpt.code === currentLang.code;
                    e.currentTarget.style.backgroundColor = current ? '#1A2530' : 'transparent';
                    e.currentTarget.style.color = current ? '#C4922A' : '#7A8A96';
                  }}
                >
                  {isCurrentLang && (
                    <span
                      style={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: '#C4922A',
                        flexShrink: 0,
                      }}
                    />
                  )}
                  {!isCurrentLang && <span style={{ width: '4px', flexShrink: 0 }} aria-hidden />}
                  <img
                    src={getFlagUrl(langOpt.countryCode)}
                    alt={langOpt.name}
                    className="h-3 w-4 object-cover"
                  />
                  <span>{langOpt.name.toUpperCase()}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export interface NavBarProps {
  lang: 'pl' | 'en' | string;
  links: NavLink[];
  activeHref?: string;
  logoSrc?: string;
  logoAlt?: string;
  brandName?: string;
  brandTagline?: string;
  registrationActive?: boolean;
  registrationHref?: string;
}

const delegationBtnBase: CSSProperties = {
  backgroundColor: '#003F87',
  color: 'white',
  fontFamily: "'Rajdhani', sans-serif",
  fontSize: 'clamp(10px, 1vw, 11px)',
  letterSpacing: 'clamp(0.5px, 0.3vw, 1.5px)',
  fontWeight: 700,
};

export function NavBar({
  lang = 'pl',
  links,
  activeHref,
  logoSrc,
  logoAlt,
  brandName,
  brandTagline,
  registrationActive = true,
  registrationHref,
}: NavBarProps) {
  const resolvedLogoSrc = logoSrc?.trim() || '/images/cerberus-k9-logo.png';
  const resolvedLogoAlt = logoAlt?.trim() || 'CERBERUS K9 Logo';
  const resolvedBrandName = brandName?.trim() || 'CERBERUS K9';
  const resolvedBrandTagline = brandTagline?.trim() || 'INTERNATIONAL DEFENSE PLATFORM';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>(
    () => languages.find((l) => l.code === lang) ?? languages[0],
  );
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    const pathLang = window.location.pathname.split('/')[1];
    const found = languages.find((l) => l.code === pathLang);
    if (found) setCurrentLang(found);
    setCurrentPath(window.location.pathname);
  }, []);

  const resolved = useMemo((): ResolvedNavLink[] => {
    return links.map((link) => {
      const resolvedHref = link.path
        ? `/${currentLang.code}/${link.path}`
        : link.href;
      const label = currentLang.code === 'pl' ? link.label_pl : link.label_en;
      return { ...link, resolvedHref, label };
    });
  }, [links, currentLang.code]);

  const { regularLinks, highlightLinks } = useMemo(() => {
    const regular = resolved.filter((l) => !l.highlight);
    const hi = resolved.filter((l) => l.highlight);
    return { regularLinks: regular, highlightLinks: hi };
  }, [resolved]);

  const isLinkActive = (href: string) => {
    const h = normPath(href);
    const probe = normPath(activeHref ?? currentPath);
    return probe === h || probe === `${h}/`;
  };

  const renderDelegationsButton = (link: ResolvedNavLink) => {
    const go = () => {
      if (link.target === '_blank') {
        window.open(link.resolvedHref, '_blank', 'noopener,noreferrer');
      } else {
        window.location.assign(link.resolvedHref);
      }
    };
    const shortPl = 'DLA DEL';
    const shortEn = 'FOR DEL';
    const short = currentLang.code === 'pl' ? shortPl : shortEn;
    return (
      <button
        key={`deleg-${link.resolvedHref}-${link.label_pl}`}
        type="button"
        onClick={go}
        aria-label={link.label}
        className="inline-flex shrink-0 items-center justify-center px-[10px] py-[6px] transition-colors duration-150 xl:px-[14px] xl:py-2"
        style={delegationBtnBase}
        onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
          e.currentTarget.style.backgroundColor = '#002A5C';
        }}
        onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
          e.currentTarget.style.backgroundColor = '#003F87';
        }}
      >
        <span className="sm:hidden">{short}</span>
        <span className="hidden sm:inline">{link.label}</span>
      </button>
    );
  };

  const renderLinkAnchor = (link: ResolvedNavLink, mobile: boolean) => {
    const isActive = isLinkActive(link.resolvedHref);
    const blank = link.target === '_blank';
    const inactiveColor = '#FFFFFF';

    const labelNode = (
      <>
        {link.icon ? <span className="mr-1">{link.icon}</span> : null}
        {link.label}
      </>
    );

    if (mobile) {
      return (
        <a
          key={`m-${link.resolvedHref}-${link.label_pl}`}
          href={link.resolvedHref}
          target={blank ? '_blank' : undefined}
          rel={blank ? 'noopener noreferrer' : undefined}
          onClick={() => setMobileMenuOpen(false)}
          className="flex h-12 items-center border-b"
          style={{
            paddingLeft: '13px',
            borderBottomColor: '#253344',
            borderLeft: isActive ? '3px solid #C4922A' : '3px solid transparent',
            borderBottom: isActive ? '2px solid #C4922A' : undefined,
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: 'clamp(11px, 1.1vw, 12px)',
            letterSpacing: 'clamp(1px, 0.5vw, 2px)',
            fontWeight: 700,
            color: isActive ? '#C4922A' : inactiveColor,
            transition: 'border-color 0.15s, color 0.15s',
          }}
        >
          {labelNode}
        </a>
      );
    }

    return (
      <a
        key={`d-${link.resolvedHref}-${link.label_pl}`}
        href={link.resolvedHref}
        target={blank ? '_blank' : undefined}
        rel={blank ? 'noopener noreferrer' : undefined}
        className="whitespace-nowrap transition-colors duration-150"
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: 'clamp(11px, 1.1vw, 12px)',
          letterSpacing: 'clamp(1px, 0.5vw, 2px)',
          fontWeight: 700,
          color: isActive ? '#C4922A' : inactiveColor,
          borderBottom: isActive ? '2px solid #C4922A' : '2px solid transparent',
          boxSizing: 'border-box',
          paddingBottom: '2px',
        }}
        onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
          if (!isActive) {
            e.currentTarget.style.color = '#C4922A';
          }
        }}
        onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => {
          if (!isActive) {
            e.currentTarget.style.color = inactiveColor;
          }
        }}
      >
        {labelNode}
      </a>
    );
  };

  const selectLang = (next: Language) => {
    setCurrentLang(next);
    setLangDropdownOpen(false);
    setMobileMenuOpen(false);
    const pathParts = window.location.pathname.split('/');
    pathParts[1] = next.code;
    const newPath = pathParts.join('/') || '/' + next.code;
    window.location.href = newPath;
  };

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        background: 'linear-gradient(to bottom, #161F28, #1A2530, #161F28)',
        borderBottomColor: '#253344',
      }}
    >
      <div className="flex h-14 w-full flex-row items-center justify-between gap-1 px-3 sm:gap-2 sm:px-4 md:h-16 md:px-6">
        <a
          href={`/${currentLang.code}`}
          className="flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-2 md:gap-3"
        >
          <img
            src={resolvedLogoSrc}
            alt={resolvedLogoAlt}
            className="h-9 object-contain sm:h-10 md:h-12"
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
              {resolvedBrandName.replace('K9', '').trim()}{' '}
              <span style={{ color: '#C42B2B' }}>K9</span>
            </span>
            <p
              className="m-0 hidden xl:block"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: 'clamp(8px, 0.9vw, 10px)',
                letterSpacing: '1.8px',
                fontWeight: 700,
                color: '#4A5A6A',
                marginTop: '-1px',
              }}
            >
              {resolvedBrandTagline}
            </p>
          </div>
        </a>

        <div className="hidden min-w-0 flex-1 items-center justify-center gap-2 self-stretch xl:flex xl:gap-4">
          {regularLinks.map((link) => renderLinkAnchor(link, false))}
        </div>

        <div className="flex-1 xl:hidden" aria-hidden="true" />

        <div className="flex min-w-0 shrink-0 flex-row items-center justify-end gap-1 xl:gap-2">
          <div className="flex min-w-0 items-center gap-1 xl:gap-2">
            {highlightLinks.map((link) => renderDelegationsButton(link))}
            <LangDropdown
              currentLang={currentLang}
              open={langDropdownOpen}
              setOpen={setLangDropdownOpen}
              onSelectLang={selectLang}
            />
          </div>

          {registrationActive !== false && (
            <a
              href={registrationHref || `/${currentLang.code}/rejestracja`}
              className="inline-flex shrink-0 items-center justify-center px-[10px] py-[6px] transition-colors duration-150 xl:px-[14px] xl:py-2"
              style={{
                backgroundColor: '#C42B2B',
                color: 'white',
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: 'clamp(10px, 1vw, 11px)',
                letterSpacing: 'clamp(0.5px, 0.3vw, 1.5px)',
                fontWeight: 700,
              }}
              onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.backgroundColor = '#A82424';
              }}
              onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.backgroundColor = '#C42B2B';
              }}
            >
              {registrationLabel(currentLang.code)}
            </a>
          )}

          <button
            type="button"
            onClick={() => {
              setLangDropdownOpen(false);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="flex h-8 w-8 shrink-0 flex-col items-center justify-center gap-1.5 xl:hidden"
            aria-label="Toggle menu"
          >
            <span
              className="block h-0.5 w-6 transition-transform duration-200"
              style={{
                backgroundColor: '#C4922A',
                transform: mobileMenuOpen ? 'rotate(45deg) translateY(6px)' : 'none',
              }}
            />
            <span
              className="block h-0.5 w-6 transition-opacity duration-200"
              style={{
                backgroundColor: '#C4922A',
                opacity: mobileMenuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-0.5 w-6 transition-transform duration-200"
              style={{
                backgroundColor: '#C4922A',
                transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none',
              }}
            />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className="w-full border-b xl:hidden"
          style={{
            backgroundColor: '#0F1720',
            borderBottomColor: '#253344',
          }}
        >
          {regularLinks.map((link) => renderLinkAnchor(link, true))}
        </div>
      )}
    </nav>
  );
}
