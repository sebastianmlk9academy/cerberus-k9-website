import type { Lang } from "../i18n/utils";

type PartnerType =
  | "strategic"
  | "partner"
  | "technical"
  | "media"
  | "honorary"
  | "sponsor";

type OfferItem = {
  partner_id: string;
  offer_title_pl: string;
  offer_title_en: string;
  offer_description_pl: string;
  offer_description_en: string;
  discount_value?: string;
  discount_code?: string;
  claim_link?: string;
  valid_until?: Date | string;
};

type PartnerDetailPageProps = {
  lang?: Lang | "pl";
  partnerId: string;
  partner: {
    name?: string;
    type?: PartnerType;
    logo?: string;
    website?: string;
    description?: string;
  };
  offers: OfferItem[];
};

const typeLabel: Record<PartnerType, string> = {
  strategic: "Partner strategiczny",
  partner: "Partner",
  technical: "Partner technologiczny",
  media: "Patron medialny",
  honorary: "Partner honorowy",
  sponsor: "Sponsor",
};

function normalizeHref(url?: string): string | null {
  if (!url?.trim()) return null;
  return /^https?:\/\//i.test(url) ? url : `https://${url.trim()}`;
}

export default function PartnerDetailPage({
  lang = "pl",
  partnerId,
  partner,
  offers,
}: PartnerDetailPageProps) {
  const name = partner.name?.trim() || partnerId;
  const websiteHref = normalizeHref(partner.website);
  const backHref = `/${lang}/partnerzy`;
  const showOffers = offers.filter((o) => o.partner_id === partnerId);

  return (
    <section className="bg-navyDeep px-6 py-10 text-bone md:px-8 md:py-14">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="inline-flex border border-gold/50 bg-gold/10 px-2.5 py-1 text-[10px] uppercase tracking-[2px] text-gold">
            {partner.type ? (typeLabel[partner.type] ?? "Partner") : "Partner"}
          </span>
        </div>

        {partner.logo ? (
          <div className="mb-8">
            <img
              src={partner.logo}
              alt={name}
              className="h-auto max-w-[200px] object-contain"
            />
          </div>
        ) : null}

        {partner.description ? (
          <p className="mb-6 text-[15px] leading-7 text-bone/90">{partner.description}</p>
        ) : null}

        {websiteHref ? (
          <p className="mb-10">
            <a
              href={websiteHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm uppercase tracking-[2px] text-gold hover:text-gold/80"
            >
              Odwiedź stronę partnera
            </a>
          </p>
        ) : null}

        <div className="mb-10 border-t border-white/10 pt-8">
          <h2 className="mb-4 font-rajdhani text-lg uppercase tracking-[3px] text-gold">
            Oferty partnera
          </h2>
          {showOffers.length === 0 ? (
            <p className="text-sm text-bone/70">Brak aktywnych ofert dla tego partnera.</p>
          ) : (
            <div className="space-y-4">
              {showOffers.map((offer) => (
                <article key={`${offer.partner_id}-${offer.offer_title_pl}`} className="border border-white/10 bg-navy/50 p-4">
                  <h3 className="mb-2 font-rajdhani text-base uppercase tracking-[2px] text-bone">
                    {lang === "pl" ? offer.offer_title_pl : offer.offer_title_en}
                  </h3>
                  <p className="mb-3 text-sm leading-6 text-bone/85">
                    {lang === "pl" ? offer.offer_description_pl : offer.offer_description_en}
                  </p>
                  {offer.discount_code ? (
                    <p className="text-xs uppercase tracking-[1px] text-gold">
                      Kod: {offer.discount_code}
                    </p>
                  ) : null}
                  {offer.claim_link ? (
                    <a
                      href={offer.claim_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-xs uppercase tracking-[2px] text-gold hover:text-gold/80"
                    >
                      Odbierz ofertę
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </div>

        <a href={backHref} className="text-xs uppercase tracking-[2px] text-muted hover:text-gold">
          Powrót do /partnerzy
        </a>
      </div>
    </section>
  );
}
