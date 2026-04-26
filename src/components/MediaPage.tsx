import { FileText, Mail, Phone, ExternalLink } from 'lucide-react';
import { ui } from '../i18n/ui';
import type { Lang } from '../i18n/utils';

type PressKitItem = {
  title: string;
  description: string;
  href: string;
  type: 'pdf' | 'zip';
};

type PressRelease = {
  date: string;
  title: string;
  href: string;
};

type ArchiveItem = {
  outlet: string;
  type?: string;
  description?: string;
  date?: string;
  badge?: string;
  href: string;
  isPlaceholder?: boolean;
  outletLogo?: string | null;
};

const raj = "'Rajdhani', sans-serif" as const;
const bebas = "'Bebas Neue', sans-serif" as const;

interface MediaPageProps {
  lang: Lang;
  pressKitItems?: PressKitItem[];
  pressReleases?: PressRelease[];
  mediaArchive?: ArchiveItem[];
  accreditationDeadline?: string | null;
  pressKitZip?: string;
  pressPdfPolskaZbrojna?: string;
  pressPdfSpecialOps?: string;
  mediaContactName?: string;
  mediaContactPhone?: string;
  mediaContactEmail?: string;
  pressZipHref?: string;
}

type MediaLabels = {
  fullMaterials: string;
  downloadArticle: string;
  contactAccreditation: string;
  pressAccreditation: string;
  pressInfo: string;
  mediaArchive: string;
  downloadPressKit: string;
  becomeMediaPartner: string;
  contactForMedia: string;
  vicePresident: string;
  responseTime: string;
  accreditationBody: string;
  submissionDeadline: string;
  archiveDescription: string;
  linkSoon: string;
  open: string;
  downloadPdf: string;
};

const mediaLabelsMap: Partial<Record<Lang, MediaLabels>> = {
  pl: {
    fullMaterials: 'KOMPLET MATERIAŁÓW',
    downloadArticle: 'POBIERZ ARTYKUŁ',
    contactAccreditation: 'KONTAKT I AKREDYTACJA',
    pressAccreditation: 'AKREDYTACJA DZIENNIKARSKA',
    pressInfo: 'INFORMACJE PRASOWE',
    mediaArchive: 'ARCHIWUM MEDIALNE',
    downloadPressKit: 'POBIERZ PRESS KIT',
    becomeMediaPartner: 'ZOSTAŃ PATRONEM MEDIALNYM',
    contactForMedia: 'KONTAKT DLA MEDIÓW',
    vicePresident: 'Sebastian Bożek — Wiceprezes',
    responseTime: 'Czas odpowiedzi: do 24h',
    accreditationBody:
      'Akredytacja odbywa się wyłącznie drogą mailową. W wiadomości prosimy o podanie: imienia i nazwiska, redakcji, stanowiska, numeru telefonu oraz zakresu planowanej relacji (tekst, foto, wideo). Po weryfikacji otrzymasz potwierdzenie i dalsze instrukcje.',
    submissionDeadline: 'Termin zgłoszeń: 30.05.2026',
    archiveDescription: 'Wybrane relacje prasowe i materiały z ubiegłorocznej edycji.',
    linkSoon: 'LINK — WKRÓTCE',
    open: 'OTWÓRZ',
    downloadPdf: 'POBIERZ PDF',
  },
  en: {
    fullMaterials: 'FULL MATERIALS',
    downloadArticle: 'DOWNLOAD ARTICLE',
    contactAccreditation: 'CONTACT & ACCREDITATION',
    pressAccreditation: 'PRESS ACCREDITATION',
    pressInfo: 'PRESS INFORMATION',
    mediaArchive: 'MEDIA ARCHIVE',
    downloadPressKit: 'DOWNLOAD PRESS KIT',
    becomeMediaPartner: 'BECOME MEDIA PARTNER',
    contactForMedia: 'MEDIA CONTACT',
    vicePresident: 'Sebastian Bożek — Vice President',
    responseTime: 'Response time: up to 24h',
    accreditationBody:
      'Accreditation is handled only by email. Please provide: full name, newsroom, role, phone number, and the scope of planned coverage (text, photo, video). After verification, you will receive confirmation and further instructions.',
    submissionDeadline: 'Submission deadline: 30.05.2026',
    archiveDescription: 'Selected press coverage and materials from last year.',
    linkSoon: 'LINK — SOON',
    open: 'OPEN',
    downloadPdf: 'DOWNLOAD PDF',
  },
  de: {
    fullMaterials: 'VOLLSTÄNDIGE MATERIALIEN',
    downloadArticle: 'ARTIKEL HERUNTERLADEN',
    contactAccreditation: 'KONTAKT & AKKREDITIERUNG',
    pressAccreditation: 'PRESSEAKKREDITIERUNG',
    pressInfo: 'PRESSEINFORMATIONEN',
    mediaArchive: 'MEDIENARCHIV',
    downloadPressKit: 'PRESS KIT HERUNTERLADEN',
    becomeMediaPartner: 'MEDIENPARTNER WERDEN',
    contactForMedia: 'MEDIENKONTAKT',
    vicePresident: 'Sebastian Bożek — Vizepräsident',
    responseTime: 'Antwortzeit: bis zu 24h',
    accreditationBody:
      'Die Akkreditierung erfolgt ausschließlich per E-Mail. Bitte geben Sie an: Vor- und Nachname, Redaktion, Position, Telefonnummer sowie den Umfang der geplanten Berichterstattung (Text, Foto, Video). Nach der Verifizierung erhalten Sie eine Bestätigung und weitere Anweisungen.',
    submissionDeadline: 'Einreichungsfrist: 30.05.2026',
    archiveDescription: 'Ausgewählte Presseberichte und Materialien aus dem letzten Jahr.',
    linkSoon: 'LINK — BALD',
    open: 'ÖFFNEN',
    downloadPdf: 'PDF HERUNTERLADEN',
  },
  fr: {} as MediaLabels,
  hr: {} as MediaLabels,
  cs: {} as MediaLabels,
  lt: {} as MediaLabels,
  lv: {} as MediaLabels,
  sk: {} as MediaLabels,
  sl: {} as MediaLabels,
  hu: {} as MediaLabels,
  no: {} as MediaLabels,
  sv: {} as MediaLabels,
  nl: {} as MediaLabels,
  es: {} as MediaLabels,
  pt: {} as MediaLabels,
  ro: {} as MediaLabels,
  it: {} as MediaLabels,
  ko: {} as MediaLabels,
};

export default function MediaPage({
  lang,
  pressKitItems = [],
  pressReleases = [],
  mediaArchive = [],
  accreditationDeadline,
  pressKitZip,
  pressPdfPolskaZbrojna,
  pressPdfSpecialOps,
  mediaContactName,
  mediaContactPhone,
  mediaContactEmail,
  pressZipHref,
}: MediaPageProps) {
  const defaultPressItems = [
    {
      title: 'Polska Zbrojna — Reportaż CERBERUS K9 2025',
      description: 'Reportaż Wojskowego Instytutu Wydawniczego — patrona medialnego CERBERUS K9.',
      href: '/downloads/polska-zbrojna-cerberus-k9-2025.pdf',
      type: 'pdf' as const,
    },
    {
      title: 'Special Ops — Relacja CERBERUS K9 2025',
      description: 'Relacja kwartalnika Defence24 o tematyce jednostek specjalnych.',
      href: '/downloads/special-ops-cerberus-k9-2025.pdf',
      type: 'pdf' as const,
    },
  ];
  const safeItems = (pressKitItems && pressKitItems.length > 0)
    ? pressKitItems : defaultPressItems;

  const defaultArchive = [
    {
      outlet: 'TVP — Panorama',
      description: 'Reportaż telewizyjny z CERBERUS K9 2025',
      date: '2025',
      href: 'https://youtu.be/Fo-j5vGI0m4',
      badge: 'VIDEO',
    },
    {
      outlet: 'Polska Zbrojna (WIW MON)',
      description: 'Patron medialny CERBERUS K9 2025 i 2026',
      date: '2025',
      href: 'https://polska-zbrojna.pl',
      badge: 'ARTYKUŁ',
    },
    {
      outlet: 'TVN — Fakty',
      description: 'Reportaż TVN z edycji 2025',
      date: '2025',
      href: '#',
      badge: 'VIDEO',
    },
    {
      outlet: 'Polskie Radio',
      description: 'Wywiad i reportaż z CERBERUS K9 2025',
      date: '2025',
      href: '#',
      badge: 'AUDIO',
    },
  ];
  const safeArchive = (mediaArchive && mediaArchive.length > 0)
    ? mediaArchive : defaultArchive;

  const zipHref = pressZipHref || pressKitZip || "/press/cerberus-k9-press-kit-2026.zip";
  const polskaHref = pressPdfPolskaZbrojna || "/downloads/polska-zbrojna-cerberus-k9-2025.pdf";
  const specialHref = pressPdfSpecialOps || "/downloads/special-ops-cerberus-k9-2025.pdf";
  const contactName = mediaContactName || mediaLabels.vicePresident;
  const contactPhone = mediaContactPhone || "+48 695 637 907";
  const contactEmail = mediaContactEmail || "sebastian@pactak9.org";
  const sectionTag = (ui[lang] ?? ui.pl).nav_media;
  const englishFallback = mediaLabelsMap.en as MediaLabels;
  const mediaLabels = {
    ...englishFallback,
    ...(mediaLabelsMap[lang] ?? {}),
  };
  const deadlineDate = (accreditationDeadline ?? '').trim() || '30.05.2026';
  const submissionDeadlineLine = mediaLabels.submissionDeadline.replace(
    /30\.05\.2026/g,
    deadlineDate,
  );
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #161F28, #1A2530, #161F28)',
        color: '#E4DDD0',
        fontFamily: raj,
        padding: '32px 20px 64px',
        maxWidth: '1100px',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}
    >
      {/* SECTION 1 — PRESS KIT */}
      <section
        style={{
          background: '#0F1720',
          border: '2px solid #C4922A',
          padding: '40px',
          marginBottom: '56px',
        }}
      >
        <h1
          style={{
            fontFamily: bebas,
            fontSize: '36px',
            color: '#E4DDD0',
            letterSpacing: '1px',
            margin: '0 0 12px 0',
            lineHeight: 1.15,
          }}
        >
          PRESS KIT — {sectionTag} 2026
        </h1>
        <p
          style={{
            fontFamily: raj,
            fontSize: '16px',
            color: '#B8AFA0',
            margin: '0 0 28px 0',
            fontWeight: 500,
          }}
        >
          {mediaLabels.fullMaterials}
        </p>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 0 32px 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {safeItems.map((line) => (
            <li
              key={line.title}
              style={{
                fontFamily: raj,
                fontSize: '15px',
                color: '#E4DDD0',
                lineHeight: 1.5,
                paddingLeft: '4px',
              }}
            >
              {line.title} — {line.description}
            </li>
          ))}
        </ul>
        <a
          href={zipHref}
          download
          style={{
            display: 'inline-block',
            background: '#C42B2B',
            color: '#fff',
            fontFamily: raj,
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '3px',
            padding: '18px 48px',
            textDecoration: 'none',
            textTransform: 'uppercase',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease, transform 0.15s ease',
          }}
          className="media-page-download-btn"
        >
          {mediaLabels.downloadPressKit} (ZIP) ↓
        </a>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px 16px',
            alignItems: 'center',
            marginTop: '24px',
          }}
        >
          <a
            href={polskaHref}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="media-page-cta-btn"
          >
            {mediaLabels.downloadArticle} — Polska Zbrojna
          </a>
          <a
            href={specialHref}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="media-page-cta-btn"
          >
            {mediaLabels.downloadArticle} — Special Ops
          </a>
        </div>
      </section>

      <style>{`
        .media-page-download-btn:hover {
          background: #a82424 !important;
        }
        .media-page-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          cursor: pointer;
          transition: background-color 0.2s ease, color 0.2s ease;
          background-color: transparent;
          color: #c4922a;
          font-family: ${raj};
          letter-spacing: 3px;
          font-weight: 700;
          border-radius: 0;
          border: 1px solid #c4922a;
          text-decoration: none;
          text-align: center;
          line-height: 1.35;
          max-width: 100%;
          font-size: 10px;
          padding: 12px 18px;
        }
        @media (min-width: 640px) {
          .media-page-cta-btn {
            font-size: 11px;
            padding: 14px 22px;
          }
        }
        .media-page-cta-btn:hover {
          background-color: #c4922a;
          color: #1e2b38;
        }
        .media-archive-link:hover {
          color: #E0AA44 !important;
        }
      `}</style>

      {/* SECTION 2 — MEDIA CONTACT */}
      <h2
        style={{
          fontFamily: bebas,
          fontSize: '28px',
          color: '#E4DDD0',
          letterSpacing: '2px',
          margin: '0 0 24px 0',
        }}
      >
        {mediaLabels.contactAccreditation}
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '56px',
        }}
      >
        <div
          style={{
            background: '#0F1720',
            border: '1px solid #253344',
            padding: '28px',
          }}
        >
          <h3
            style={{
              fontFamily: bebas,
              fontSize: '22px',
              color: '#C4922A',
              margin: '0 0 20px 0',
              letterSpacing: '1px',
            }}
          >
            {mediaLabels.contactForMedia}
          </h3>
          <p style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#E4DDD0', fontWeight: 600 }}>
            {contactName}
          </p>
          <a
            href={`mailto:${contactEmail}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#C4922A',
              textDecoration: 'none',
              fontSize: '14px',
              marginBottom: '10px',
            }}
          >
            <Mail size={16} aria-hidden />
            {contactEmail}
          </a>
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              margin: '10px 0 16px 0',
              fontSize: '14px',
              color: '#B8AFA0',
            }}
          >
            <Phone size={16} aria-hidden />
            {contactPhone}
          </p>
          <p style={{ margin: 0, fontSize: '13px', color: '#7A8A9A', letterSpacing: '0.5px' }}>
            {mediaLabels.responseTime}
          </p>
        </div>

        <div
          style={{
            background: '#0F1720',
            border: '1px solid #253344',
            padding: '28px',
          }}
        >
          <h3
            style={{
              fontFamily: bebas,
              fontSize: '22px',
              color: '#C4922A',
              margin: '0 0 16px 0',
              letterSpacing: '1px',
            }}
          >
            {mediaLabels.pressAccreditation}
          </h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '14px', lineHeight: 1.65, color: '#C5BCB0' }}>
            {mediaLabels.accreditationBody}
          </p>
          <a
            href={`mailto:${contactEmail}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#C4922A',
              textDecoration: 'none',
              fontSize: '14px',
              marginBottom: '12px',
            }}
          >
            <Mail size={16} aria-hidden />
            {contactEmail}
          </a>
          <p style={{ margin: 0, fontSize: '13px', color: '#7A8A9A' }}>
            {submissionDeadlineLine}
          </p>
        </div>
      </div>

      {/* SECTION 3 — PRESS RELEASES */}
      <h2
        style={{
          fontFamily: bebas,
          fontSize: '28px',
          color: '#E4DDD0',
          letterSpacing: '2px',
          margin: '0 0 24px 0',
        }}
      >
        {mediaLabels.pressInfo}
      </h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 56px 0' }}>
        {pressReleases.map((item) => (
          <li
            key={item.href}
            style={{
              borderBottom: '1px solid #253344',
              padding: '18px 0',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  color: '#C4922A',
                  display: 'block',
                  marginBottom: '6px',
                }}
              >
                {item.date}
              </span>
              <span style={{ fontSize: '16px', color: '#E4DDD0', fontWeight: 600 }}>{item.title}</span>
            </div>
            <a
              href={item.href}
              download
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '2px',
                color: '#C42B2B',
                textDecoration: 'none',
                textTransform: 'uppercase',
              }}
            >
              <FileText size={16} aria-hidden />
              PDF
            </a>
          </li>
        ))}
      </ul>

      {/* SECTION 4 — MEDIA ARCHIVE */}
      <h2
        style={{
          fontFamily: bebas,
          fontSize: '28px',
          color: '#E4DDD0',
          letterSpacing: '2px',
          margin: '0 0 12px 0',
        }}
      >
        {mediaLabels.mediaArchive}
      </h2>
      <p style={{ margin: '0 0 28px 0', fontSize: '14px', color: '#8A9AAA' }}>
        {mediaLabels.archiveDescription}
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '20px',
        }}
      >
        {safeArchive.map((item) => {
          const isExternal = item.href.startsWith('http');
          const linkStyle = {
            marginTop: '16px',
            display: 'inline-flex' as const,
            alignItems: 'center' as const,
            gap: '6px',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '1.5px',
            color: '#C4922A',
            textDecoration: 'none' as const,
            textTransform: 'uppercase' as const,
            cursor: 'pointer' as const,
          };
          return (
            <div
              key={`${item.outlet}-${item.badge ?? item.type ?? 'media'}-${item.href}`}
              style={{
                background: '#0F1720',
                border: '1px solid #253344',
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '140px',
              }}
            >
              {item.outletLogo ? (
                <img
                  src={item.outletLogo}
                  alt=""
                  style={{ maxHeight: '40px', width: 'auto', maxWidth: '180px', objectFit: 'contain', marginBottom: '12px' }}
                />
              ) : null}
              <p
                style={{
                  fontFamily: bebas,
                  fontSize: '20px',
                  color: '#E4DDD0',
                  margin: '0 0 12px 0',
                  lineHeight: 1.25,
                }}
              >
                {item.outlet}
              </p>
              <span
                style={{
                  display: 'inline-block',
                  alignSelf: 'flex-start',
                  background: 'rgba(196, 43, 43, 0.15)',
                  color: '#E4A0A0',
                  border: '1px solid rgba(196, 43, 43, 0.45)',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  padding: '4px 10px',
                  marginBottom: 'auto',
                }}
              >
                {item.badge ?? item.type ?? 'MEDIA'}
              </span>
              {item.isPlaceholder ? (
                <span
                  style={{
                    ...linkStyle,
                    color: '#5A6A7A',
                    cursor: 'default',
                  }}
                >
                  {mediaLabels.linkSoon}
                </span>
              ) : (
                <a
                  href={item.href}
                  {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : { download: true })}
                  style={linkStyle}
                  className="media-archive-link"
                >
                  {isExternal ? (
                    <>
                      {mediaLabels.open}
                      <ExternalLink size={14} aria-hidden />
                    </>
                  ) : (
                    <>
                      {mediaLabels.downloadPdf}
                      <FileText size={14} aria-hidden />
                    </>
                  )}
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { MediaPage };
