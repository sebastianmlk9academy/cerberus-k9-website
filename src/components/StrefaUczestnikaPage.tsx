import { PageHero } from './PageHero';
import FAQAccordion from './FAQAccordion';
import type { Lang } from '../i18n/utils';

interface OfferItem {
  offer_title_pl: string;
  offer_description_pl: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface StrefaUczestnikaPageProps {
  lang: Lang;
  mapEmbedUrl?: string;
  partnerOffers: OfferItem[];
  faqItems: FaqItem[];
  contactEmail: string;
}

export default function StrefaUczestnikaPage({
  lang,
  mapEmbedUrl,
  partnerOffers,
  faqItems,
  contactEmail,
}: StrefaUczestnikaPageProps) {
  return (
    <div className="w-full bg-navy">
      <PageHero category="DLA UCZESTNIKÓW" title="STREFA UCZESTNIKA" subtitle="CERBERUS K9 2026" />

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-5 pb-12 pt-10 md:grid-cols-2 md:px-8">
        <article className="border border-border bg-navyDeep p-5">
          <h3 className="mb-2 text-lg font-bold text-gold">📍 DOJAZD I PARKING</h3>
          <p className="mb-3 text-sm text-muted">3MK Arena, Ostrów Wielkopolski</p>
          {mapEmbedUrl ? (
            <iframe
              src={mapEmbedUrl}
              title="Mapa dojazdu"
              className="h-56 w-full border border-border"
              loading="lazy"
            />
          ) : (
            <p className="text-sm text-muted">Mapa będzie dostępna wkrótce.</p>
          )}
        </article>

        <article className="border border-border bg-navyDeep p-5">
          <h3 className="mb-2 text-lg font-bold text-gold">🏨 NOCLEG</h3>
          <div className="space-y-2 text-sm text-muted">
            {partnerOffers.length > 0 ? (
              partnerOffers.map((offer) => (
                <div key={offer.offer_title_pl}>
                  <p className="font-semibold text-bone">{offer.offer_title_pl}</p>
                  <p>{offer.offer_description_pl}</p>
                </div>
              ))
            ) : (
              <p>Lista hoteli partnerskich pojawi się przed eventem.</p>
            )}
          </div>
        </article>

        <article className="border border-border bg-navyDeep p-5">
          <h3 className="mb-2 text-lg font-bold text-gold">📋 CO ZABRAĆ</h3>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
            <li>Dowód tożsamości</li>
            <li>Wygodne obuwie</li>
            <li>Woda</li>
            <li>Aparat</li>
          </ul>
        </article>

        <article className="border border-border bg-navyDeep p-5">
          <h3 className="mb-2 text-lg font-bold text-gold">📅 HARMONOGRAM</h3>
          <p className="mb-3 text-sm text-muted">Sprawdź agendę i zbuduj własny plan dnia.</p>
          <a
            className="inline-block bg-red px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-bone hover:bg-[#A82424]"
            href={`/${lang}/o-wydarzeniu#program`}
          >
            PRZEJDŹ DO PROGRAMU
          </a>
        </article>
      </section>

      <FAQAccordion lang={lang} faqItems={faqItems} />

      <section className="pb-16 pt-8 text-center">
        <h2 className="mb-2 text-xl font-bold uppercase tracking-[0.12em] text-bone">MASZ PYTANIE?</h2>
        <a className="text-gold hover:underline" href={`mailto:${contactEmail}`}>
          {contactEmail}
        </a>
      </section>
    </div>
  );
}
