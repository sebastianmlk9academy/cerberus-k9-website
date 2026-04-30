import { PageHero } from './PageHero';
import FAQAccordion from './FAQAccordion';
import type { Lang } from '../i18n/utils';
import { useState } from 'react';
import { tokens } from '../styles/tokens';

export interface InternationalHero {
  tag_en: string;
  title_en: string;
  subtitle_en: string;
  body_en: string;
  cta_register_en: string;
  cta_program_en: string;
}

export interface ProtocolItem {
  title_en: string;
  title_pl?: string;
  body_en: string;
  body_pl?: string;
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

export interface DelegationItem {
  country: string;
  country_code: string;
  unit?: string;
  specialization?: string;
  year_participating?: number;
}

export interface InternationalPageProps {
  hero: InternationalHero;
  protocol: ProtocolItem[];
  faq: FAQItem[];
  contact: ContactData;
  lang: Lang;
  registrationHref: string;
  programHref: string;
  confirmedDelegations?: DelegationItem[];
}

const countryCodeToFlag = (code: string) =>
  code
    .toUpperCase()
    .split('')
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join('');

export default function InternationalPage({
  hero,
  protocol,
  faq,
  contact,
  lang,
  registrationHref,
  programHref,
  confirmedDelegations = [],
}: InternationalPageProps) {
  const [showAllDelegations, setShowAllDelegations] = useState(false);
  const isPolish = lang === 'pl';
  const uniqueDelegations = confirmedDelegations.filter(
    (item, idx, arr) =>
      item.country_code?.length === 2 &&
      arr.findIndex((entry) => entry.country_code.toUpperCase() === item.country_code.toUpperCase()) === idx,
  );
  const visibleDelegations = showAllDelegations ? uniqueDelegations : uniqueDelegations.slice(0, 4);
  const hasHiddenDelegations = uniqueDelegations.length > 4;

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
              style={{
                backgroundColor: '#1E2B38',
                borderTop: '2px solid #C4922A',
                borderLeft: `3px solid ${tokens.brand.gold}`,
              }}
            >
              <h3 className="mb-2 text-lg font-bold text-bone">
                {isPolish && item.title_pl ? item.title_pl : item.title_en}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {isPolish && item.body_pl ? item.body_pl : item.body_en}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-12 md:px-8">
        <h2 className="mb-4 text-center text-2xl font-bold uppercase tracking-[0.18em] text-bone">
          DELEGATIONS CONFIRMED
        </h2>
        <div className="grid grid-cols-1 gap-[2px] lg:grid-cols-2">
          {visibleDelegations.length > 0 ? (
            visibleDelegations.map((delegation) => (
              <article
                key={`${delegation.country_code}-${delegation.country}`}
                className="border border-navyBorder bg-navyCard px-6 py-5 transition-colors duration-200 hover:border-gold"
              >
                <div className="mb-2 flex items-center gap-3">
                  <span aria-hidden className="text-3xl leading-none">
                    {countryCodeToFlag(delegation.country_code)}
                  </span>
                  <p className="font-rajdhani text-[13px] uppercase tracking-[3px] text-bone">
                    {delegation.country}
                  </p>
                </div>
                {delegation.unit ? (
                  <p className="font-rajdhani text-[14px] font-bold text-bone">{delegation.unit}</p>
                ) : null}
                <hr className="my-[10px] border-navyBorder" />
                {delegation.specialization ? (
                  <p className="font-rajdhani text-[11px] uppercase tracking-[2px] text-muted">
                    {delegation.specialization}
                  </p>
                ) : null}
                <p className="mt-1 font-rajdhani text-[11px] tracking-[1px] text-gold">
                  CERBERUS K9 {delegation.year_participating ?? 2026}
                </p>
              </article>
            ))
          ) : (
            <p className="text-sm text-muted">Confirmed delegation list will be updated shortly.</p>
          )}
        </div>
        {hasHiddenDelegations ? (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setShowAllDelegations((prev) => !prev)}
              className="font-rajdhani text-xs uppercase tracking-[2px] text-gold transition-colors hover:text-bone"
            >
              {showAllDelegations ? 'Pokaż mniej' : 'Pokaż wszystkie'}
            </button>
          </div>
        ) : null}
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
