import { PageHero } from './PageHero';
import FAQAccordion from './FAQAccordion';
import type { Lang } from '../i18n/utils';

export interface InternationalHero {
  tag_en: string;
  title_en: string;
  subtitle_en: string;
  body_en: string;
  cta_register_en: string;
  cta_program_en: string;
}

export interface ProtocolItem {
  icon: string;
  title_en: string;
  body_en: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContactData {
  name: string;
  title_en: string;
  email: string;
  phone: string;
  response_time_en: string;
}

export interface InternationalPageProps {
  hero: InternationalHero;
  protocol: ProtocolItem[];
  faq: FAQItem[];
  contact: ContactData;
  lang: Lang;
  registrationHref: string;
  programHref: string;
  confirmedCountries?: string[];
}

function isoToFlag(code: string): string {
  return code
    .trim()
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

const countryNameByCode: Record<string, string> = {
  PL: 'Poland',
  EN: 'United Kingdom',
  GB: 'United Kingdom',
  US: 'United States',
  DE: 'Germany',
  FR: 'France',
  PT: 'Portugal',
  CZ: 'Czech Republic',
  SK: 'Slovakia',
  LT: 'Lithuania',
  LV: 'Latvia',
  IT: 'Italy',
  ES: 'Spain',
  RO: 'Romania',
  HU: 'Hungary',
  NO: 'Norway',
  SE: 'Sweden',
  NL: 'Netherlands',
  HR: 'Croatia',
  SI: 'Slovenia',
};

export default function InternationalPage({
  hero,
  protocol,
  faq,
  contact,
  lang,
  registrationHref,
  programHref,
  confirmedCountries = [],
}: InternationalPageProps) {
  const countryPills = confirmedCountries
    .map((code) => code.trim().toUpperCase())
    .filter((code, idx, arr) => code.length === 2 && arr.indexOf(code) === idx)
    .sort((a, b) => a.localeCompare(b))
    .map((code) => ({
      code,
      flag: isoToFlag(code),
      label: countryNameByCode[code] ?? code,
    }));

  return (
    <div
      className="w-full"
      style={{ background: 'linear-gradient(to bottom, #161F28, #1A2530, #161F28)' }}
    >
      <PageHero
        category={hero.tag_en}
        title={hero.title_en}
        subtitle={hero.subtitle_en}
      />

      <section className="mx-auto max-w-6xl px-5 pb-10 pt-8 md:px-8">
        <p className="mx-auto max-w-4xl text-center text-sm leading-relaxed text-muted">
          {hero.body_en}
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={registrationHref}
            className="inline-flex items-center justify-center rounded-none bg-red px-6 py-3 text-xs font-bold tracking-[0.18em] text-bone transition-colors hover:bg-[#A82424]"
          >
            {hero.cta_register_en}
          </a>
          <a
            href={programHref}
            className="inline-flex items-center justify-center rounded-none bg-gold px-6 py-3 text-xs font-bold tracking-[0.18em] text-navy transition-colors hover:bg-[#d6a944]"
          >
            {hero.cta_program_en}
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-12 md:px-8">
        <h2 className="mb-6 text-center text-2xl font-bold uppercase tracking-[0.18em] text-bone">
          DELEGATION PROTOCOL
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {protocol.map((item, idx) => (
            <article
              key={`${item.title_en}-${idx}`}
              className="border border-border p-6"
              style={{ backgroundColor: '#1E2B38', borderTop: '2px solid #C4922A' }}
            >
              <div className="mb-3 text-[32px] leading-none">{item.icon}</div>
              <h3 className="mb-2 text-lg font-bold text-bone">{item.title_en}</h3>
              <p className="text-sm leading-relaxed text-muted">{item.body_en}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-12 md:px-8">
        <h2 className="mb-4 text-center text-2xl font-bold uppercase tracking-[0.18em] text-bone">
          DELEGATIONS CONFIRMED
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {countryPills.length > 0 ? (
            countryPills.map((country) => (
              <div
                key={country.code}
                className="inline-flex items-center gap-2 border border-border bg-navy px-3 py-2 text-sm text-bone"
              >
                <span aria-hidden>{country.flag}</span>
                <span>{country.label}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted">Confirmed delegation list will be updated shortly.</p>
          )}
        </div>
      </section>

      <FAQAccordion lang={lang} faqItems={faq} />

      <section className="mx-auto max-w-6xl px-5 pb-16 pt-10 md:px-8">
        <div className="mx-auto max-w-2xl border border-gold bg-navyDeep p-6 text-center">
          <h2 className="mb-2 text-2xl font-bold uppercase tracking-[0.18em] text-bone">
            DELEGATION CONTACT
          </h2>
          <p className="text-lg font-bold text-bone">{contact.name}</p>
          <p className="mb-4 text-sm text-muted">{contact.title_en}</p>
          <p className="text-sm text-bone">
            <a className="text-gold hover:underline" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </p>
          <p className="mt-1 text-sm text-bone">
            <a
              className="text-gold hover:underline"
              href={`tel:${contact.phone.replace(/\s+/g, '')}`}
            >
              {contact.phone}
            </a>
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.16em] text-muted">
            {contact.response_time_en}
          </p>
        </div>
      </section>
    </div>
  );
}
