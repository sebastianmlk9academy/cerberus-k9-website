import { FileText, Mail, Phone, ExternalLink } from 'lucide-react';
import { ui } from '../i18n/ui';
import type { Lang } from '../i18n/utils';

const pressKitItems = [
  '✓ Logo CERBERUS K9 (PNG, SVG, białe/czarne/kolorowe)',
  '✓ Logo Fundacji PACTA K9',
  '✓ Zdjęcia prasowe w rozdzielczości do druku (min. 300 DPI)',
  '✓ Key facts — liczby i fakty o wydarzeniu',
  '✓ Biogramy Prezesa i Wiceprezesa',
  '✓ Notka prasowa CERBERUS K9 2026',
  '✓ Regulamin użycia materiałów (CC BY-NC)',
] as const;

const pressReleases = [
  {
    date: '[Data]',
    title: 'Zaproszenie mediów na CERBERUS K9 2026',
    href: '/press/zaproszenie-mediow-cerberus-k9-2026.pdf',
  },
  {
    date: '[Data]',
    title: 'Informacja prasowa — Potwierdzony udział US Police K9',
    href: '/press/ip-us-police-k9-2026.pdf',
  },
  {
    date: '[Data]',
    title: 'Informacja prasowa — Marynarka Wojenna Portugalia',
    href: '/press/ip-marynarka-portugalia-2026.pdf',
  },
] as const;

type MediaArchiveItem = {
  outlet: string;
  type: string;
  href: string;
  isPlaceholder?: boolean;
};

const mediaArchive2025: MediaArchiveItem[] = [
  {
    outlet: 'Polska Zbrojna',
    type: 'VIDEO',
    href: 'https://www.youtube.com/watch?v=kUhqmGhrbas',
  },
  {
    outlet: 'TVP — PANORAMA',
    type: 'VIDEO',
    href: 'https://youtu.be/Fo-j5vGI0m4',
  },
  {
    outlet: 'TVN — FAKTY',
    type: 'VIDEO',
    href: 'https://youtu.be/Fo-j5vGI0m4',
  },
  {
    outlet: 'Polskie Radio',
    type: 'REPORTAŻ AUDIO',
    href: 'https://youtu.be/lf-Aek_TSzI',
  },
  {
    outlet: 'Czeska Telewizja Publiczna',
    type: 'VIDEO',
    href: 'https://youtu.be/YAsXbzL3PWs',
  },
  {
    outlet: 'Special-Ops.pl',
    type: 'ARTYKUŁ',
    href: '/downloads/special-ops-cerberus-k9-2025.pdf',
  },
  {
    outlet: 'Polska Zbrojna',
    type: 'ARTYKUŁ',
    href: '/downloads/polska-zbrojna-cerberus-k9-2025.pdf',
  },
];

const raj = "'Rajdhani', sans-serif" as const;
const bebas = "'Bebas Neue', sans-serif" as const;

interface MediaPageProps {
  lang: Lang;
}

export default function MediaPage({ lang }: MediaPageProps) {
  const sectionTag = ui[lang].nav_media;
  const t = {
    pl: {
      mediaPack: 'Komplet materiałów dla mediów w jednym pliku',
      downloadArticle: 'Pobierz artykuł',
      contactAccreditation: 'KONTAKT I AKREDYTACJA',
      journalistAccreditation: 'AKREDYTACJA DZIENNIKARSKA',
      pressInfo: 'INFORMACJE PRASOWE',
      mediaArchive: 'ARCHIWUM MEDIALNE — RELACJE 2025',
    },
    en: { mediaPack: 'Complete media materials in one file', downloadArticle: 'Download article', contactAccreditation: 'CONTACT & ACCREDITATION', journalistAccreditation: 'MEDIA ACCREDITATION', pressInfo: 'PRESS INFORMATION', mediaArchive: 'MEDIA ARCHIVE — 2025 COVERAGE' },
    de: { mediaPack: 'Komplette Medienmaterialien in einer Datei', downloadArticle: 'Artikel herunterladen', contactAccreditation: 'KONTAKT & AKKREDITIERUNG', journalistAccreditation: 'PRESSEAKKREDITIERUNG', pressInfo: 'PRESSEINFORMATIONEN', mediaArchive: 'MEDIENARCHIV — BERICHTE 2025' },
    fr: { mediaPack: 'Pack médias complet dans un seul fichier', downloadArticle: "Télécharger l'article", contactAccreditation: 'CONTACT & ACCRÉDITATION', journalistAccreditation: 'ACCRÉDITATION JOURNALISTE', pressInfo: 'INFORMATIONS PRESSE', mediaArchive: 'ARCHIVES MÉDIAS — COUVERTURE 2025' },
    hr: { mediaPack: 'Komplet materijala za medije u jednoj datoteci', downloadArticle: 'Preuzmi članak', contactAccreditation: 'KONTAKT I AKREDITACIJA', journalistAccreditation: 'NOVINARSKA AKREDITACIJA', pressInfo: 'PRIOPĆENJA ZA MEDIJE', mediaArchive: 'MEDIJSKA ARHIVA — IZVJEŠĆA 2025' },
    cs: { mediaPack: 'Kompletní mediální materiály v jednom souboru', downloadArticle: 'Stáhnout článek', contactAccreditation: 'KONTAKT A AKREDITACE', journalistAccreditation: 'NOVINÁŘSKÁ AKREDITACE', pressInfo: 'TISKOVÉ INFORMACE', mediaArchive: 'MEDIÁLNÍ ARCHIV — REPORTÁŽE 2025' },
    lt: { mediaPack: 'Visa medijos medžiaga viename faile', downloadArticle: 'Atsisiųsti straipsnį', contactAccreditation: 'KONTAKTAI IR AKREDITACIJA', journalistAccreditation: 'ŽURNALISTŲ AKREDITACIJA', pressInfo: 'PRANEŠIMAI SPAUDAI', mediaArchive: 'MEDIJOS ARCHYVAS — 2025 APŽVALGOS' },
    lv: { mediaPack: 'Pilns mediju materiālu komplekts vienā failā', downloadArticle: 'Lejupielādēt rakstu', contactAccreditation: 'KONTAKTS UN AKREDITĀCIJA', journalistAccreditation: 'ŽURNĀLISTU AKREDITĀCIJA', pressInfo: 'PRESĒ INFORMĀCIJA', mediaArchive: 'MEDIJU ARHĪVS — 2025 MATERIĀLI' },
    sk: { mediaPack: 'Kompletné mediálne materiály v jednom súbore', downloadArticle: 'Stiahnuť článok', contactAccreditation: 'KONTAKT A AKREDITÁCIA', journalistAccreditation: 'NOVINÁRSKA AKREDITÁCIA', pressInfo: 'TLAČOVÉ INFORMÁCIE', mediaArchive: 'MEDIÁLNY ARCHÍV — SPRÁVY 2025' },
    sl: { mediaPack: 'Celoten medijski paket v eni datoteki', downloadArticle: 'Prenesi članek', contactAccreditation: 'KONTAKT IN AKREDITACIJA', journalistAccreditation: 'NOVINARSKA AKREDITACIJA', pressInfo: 'INFORMACIJE ZA MEDIJE', mediaArchive: 'MEDIJSKI ARHIV — POROČILA 2025' },
    hu: { mediaPack: 'Teljes médiacsomag egy fájlban', downloadArticle: 'Cikk letöltése', contactAccreditation: 'KAPCSOLAT ÉS AKKREDITÁCIÓ', journalistAccreditation: 'SAJTÓAKKREDITÁCIÓ', pressInfo: 'SAJTÓINFORMÁCIÓK', mediaArchive: 'MÉDIAARCHÍVUM — 2025-ÖS ANYAGOK' },
    no: { mediaPack: 'Komplett mediepakke i én fil', downloadArticle: 'Last ned artikkel', contactAccreditation: 'KONTAKT OG AKKREDITERING', journalistAccreditation: 'PRESSEAKKREDITERING', pressInfo: 'PRESSEINFORMASJON', mediaArchive: 'MEDIEARKIV — DEKNING 2025' },
    sv: { mediaPack: 'Komplett mediepaket i en fil', downloadArticle: 'Ladda ner artikel', contactAccreditation: 'KONTAKT OCH ACKREDITERING', journalistAccreditation: 'PRESSACKREDITERING', pressInfo: 'PRESSINFORMATION', mediaArchive: 'MEDIEARKIV — RAPPORTERING 2025' },
    nl: { mediaPack: 'Volledig mediapakket in één bestand', downloadArticle: 'Artikel downloaden', contactAccreditation: 'CONTACT EN ACCREDITATIE', journalistAccreditation: 'PERSACCREDITATIE', pressInfo: 'PERSINFORMATIE', mediaArchive: 'MEDIA-ARCHIEF — VERSLAGGEVING 2025' },
    es: { mediaPack: 'Paquete completo de medios en un archivo', downloadArticle: 'Descargar artículo', contactAccreditation: 'CONTACTO Y ACREDITACIÓN', journalistAccreditation: 'ACREDITACIÓN DE PRENSA', pressInfo: 'INFORMACIÓN DE PRENSA', mediaArchive: 'ARCHIVO DE MEDIOS — COBERTURA 2025' },
    pt: { mediaPack: 'Pacote completo de media num único ficheiro', downloadArticle: 'Transferir artigo', contactAccreditation: 'CONTACTO E ACREDITAÇÃO', journalistAccreditation: 'ACREDITAÇÃO JORNALÍSTICA', pressInfo: 'INFORMAÇÃO DE IMPRENSA', mediaArchive: 'ARQUIVO DE MEDIA — COBERTURA 2025' },
    ro: { mediaPack: 'Pachet media complet într-un singur fișier', downloadArticle: 'Descarcă articolul', contactAccreditation: 'CONTACT ȘI ACREDITARE', journalistAccreditation: 'ACREDITARE JURNALIȘTI', pressInfo: 'INFORMAȚII DE PRESĂ', mediaArchive: 'ARHIVĂ MEDIA — RELATĂRI 2025' },
    it: { mediaPack: 'Pacchetto media completo in un unico file', downloadArticle: 'Scarica articolo', contactAccreditation: 'CONTATTI E ACCREDITO', journalistAccreditation: 'ACCREDITO GIORNALISTICO', pressInfo: 'INFORMAZIONI STAMPA', mediaArchive: 'ARCHIVIO MEDIA — COPERTURA 2025' },
    ko: { mediaPack: '미디어 자료 전체를 하나의 파일로 제공', downloadArticle: '기사 다운로드', contactAccreditation: '연락처 및 취재 승인', journalistAccreditation: '언론 취재 승인', pressInfo: '보도 자료', mediaArchive: '미디어 아카이브 — 2025 보도' },
  }[lang] ?? {
    mediaPack: 'Complete media materials in one file',
    downloadArticle: 'Download article',
    contactAccreditation: 'CONTACT & ACCREDITATION',
    journalistAccreditation: 'MEDIA ACCREDITATION',
    pressInfo: 'PRESS INFORMATION',
    mediaArchive: 'MEDIA ARCHIVE — 2025 COVERAGE',
  };
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
          {t.mediaPack}
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
          {pressKitItems.map((line) => (
            <li
              key={line}
              style={{
                fontFamily: raj,
                fontSize: '15px',
                color: '#E4DDD0',
                lineHeight: 1.5,
                paddingLeft: '4px',
              }}
            >
              {line}
            </li>
          ))}
        </ul>
        <a
          href="/press/cerberus-k9-press-kit-2026.zip"
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
          POBIERZ PRESS KIT (ZIP) ↓
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
            href="/downloads/polska-zbrojna-cerberus-k9-2025.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="media-page-cta-btn"
          >
            {t.downloadArticle} — Polska Zbrojna
          </a>
          <a
            href="/downloads/special-ops-cerberus-k9-2025.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="media-page-cta-btn"
          >
            {t.downloadArticle} — Special Ops
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
        {t.contactAccreditation}
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
            KONTAKT DLA MEDIÓW
          </h3>
          <p style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#E4DDD0', fontWeight: 600 }}>
            Sebastian Bożek — Wiceprezes
          </p>
          <a
            href="mailto:sebastian@pactak9.org"
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
            sebastian@pactak9.org
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
            +48 695 637 907
          </p>
          <p style={{ margin: 0, fontSize: '13px', color: '#7A8A9A', letterSpacing: '0.5px' }}>
            Czas odpowiedzi: do 24h
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
            {t.journalistAccreditation}
          </h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '14px', lineHeight: 1.65, color: '#C5BCB0' }}>
            Akredytacja odbywa się wyłącznie drogą mailową. W wiadomości prosimy o podanie: imienia i
            nazwiska, redakcji, stanowiska, numeru telefonu oraz zakresu planowanej relacji (tekst,
            foto, wideo). Po weryfikacji otrzymasz potwierdzenie i dalsze instrukcje.
          </p>
          <a
            href="mailto:sebastian@pactak9.org"
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
            sebastian@pactak9.org
          </a>
          <p style={{ margin: 0, fontSize: '13px', color: '#7A8A9A' }}>
            Termin zgłoszeń: 30.05.2026
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
        {t.pressInfo}
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
        {t.mediaArchive}
      </h2>
      <p style={{ margin: '0 0 28px 0', fontSize: '14px', color: '#8A9AAA' }}>
        Wybrane relacje prasowe i materiały z ubiegłorocznej edycji.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '20px',
        }}
      >
        {mediaArchive2025.map((item) => {
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
              key={`${item.outlet}-${item.type}-${item.href}`}
              style={{
                background: '#0F1720',
                border: '1px solid #253344',
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '140px',
              }}
            >
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
                {item.type}
              </span>
              {item.isPlaceholder ? (
                <span
                  style={{
                    ...linkStyle,
                    color: '#5A6A7A',
                    cursor: 'default',
                  }}
                >
                  LINK — WKRÓTCE
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
                      OTWÓRZ
                      <ExternalLink size={14} aria-hidden />
                    </>
                  ) : (
                    <>
                      POBIERZ PDF
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
