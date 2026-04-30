import { PageHero } from './PageHero';

interface MaterialItem {
  title: string;
  file: string;
  category: string;
  language: string;
}

interface SponsoringPageProps {
  lang: string;
  materials: MaterialItem[];
  settings?: {
    sponsor_contact_email?: string;
  };
}

const packages = [
  {
    name: 'PAKIET GOLD',
    body: 'Logo na banerach + stronie + materiałach + stoisko 6m²',
  },
  {
    name: 'PAKIET SILVER',
    body: 'Logo na stronie + materiałach + stoisko 3m²',
  },
  {
    name: 'PAKIET BRONZE',
    body: 'Logo na stronie + materiałach prasowych',
  },
];

export default function SponsoringPage({ materials, settings }: SponsoringPageProps) {
  const sponsorEmail = settings?.sponsor_contact_email || 'sebastian@pactak9.org';
  const stats = ['250+ uczestników', '15+ krajów', '80+ psów K9', '8 modułów'];

  return (
    <div className="w-full bg-navy">
      <PageHero
        category="PARTNERSTWO"
        title="SPONSORING"
        subtitle="ZOSTAŃ PARTNEREM CERBERUS K9 2026"
      />

      <section className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 pb-12 pt-8 md:grid-cols-4 md:px-8">
        {stats.map((item) => (
          <div key={item} className="border border-border bg-navyDeep p-5 text-center">
            <p className="text-2xl font-bold text-gold">{item.split(' ')[0]}</p>
            <p className="mt-1 text-sm text-muted">{item.replace(item.split(' ')[0], '').trim()}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-12 md:px-8">
        <h2 className="mb-4 text-center text-2xl font-bold uppercase tracking-[0.16em] text-bone">
          PAKIETY SPONSORSKIE
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {packages.map((pkg) => (
            <article key={pkg.name} className="border border-border bg-navyDeep p-6">
              <h3 className="mb-2 text-lg font-bold text-gold">{pkg.name}</h3>
              <p className="mb-4 text-sm text-muted">{pkg.body}</p>
              <a
                className="inline-block bg-red px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-bone hover:bg-[#A82424]"
                href={`mailto:${sponsorEmail}`}
              >
                Zapytaj o cennik
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-12 md:px-8">
        <h2 className="mb-4 text-center text-2xl font-bold uppercase tracking-[0.16em] text-bone">
          MATERIAŁY DO POBRANIA
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {materials.map((material) => (
            <article key={`${material.title}-${material.file}`} className="border border-border bg-navyDeep p-5">
              <h3 className="mb-2 text-base font-bold text-bone">{material.title}</h3>
              <p className="text-xs uppercase tracking-[0.1em] text-muted">
                {material.language} · {material.category}
              </p>
              <a
                className="mt-4 inline-block bg-gold px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-navy hover:bg-[#d6a944]"
                href={material.file}
                target="_blank"
                rel="noopener noreferrer"
              >
                POBIERZ PDF
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-16 text-center">
        <h2 className="mb-2 text-xl font-bold uppercase tracking-[0.14em] text-bone">KONTAKT SPONSORSKI</h2>
        <a className="text-gold hover:underline" href={`mailto:${sponsorEmail}`}>
          {sponsorEmail}
        </a>
      </section>
    </div>
  );
}
