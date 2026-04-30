import { PageHero } from './PageHero';

interface ServicesPageProps {
  lang: string;
  registrationHref: string;
  settings?: Record<string, unknown>;
}

const benefits = [
  { icon: '🆓', title: 'WSTĘP BEZPŁATNY', body: 'Dla wszystkich aktywnych funkcjonariuszy.' },
  { icon: '🔒', title: 'ZAMKNIĘTE SESJE', body: 'Briefingi niedostępne dla cywilów.' },
  { icon: '🏅', title: 'CERTYFIKATY', body: 'Honorowane przez KGP, ŻW i SP.' },
  { icon: '🌍', title: 'KONTAKTY NATO', body: 'Bezpośredni networking z zagranicznymi służbami.' },
  { icon: '📋', title: 'AKREDYTACJA', body: 'Dedykowany formularz dla grup służbowych.' },
  { icon: '🐕', title: 'POKAZY K9', body: 'US SWAT i Marynarka PT w pokazach specjalnych.' },
];

const services = [
  'Policja',
  'Wojsko',
  'Straż Graniczna',
  'BOR/SOP',
  'CBA',
  'ABW',
  'Straż Pożarna',
  'Służba Więzienna',
  'Żandarmeria Wojskowa',
];

export default function ServicesPage({ registrationHref }: ServicesPageProps) {
  return (
    <div className="w-full bg-navy">
      <PageHero
        category="STREFA SŁUŻB MUNDUROWYCH"
        title="DLA SŁUŻB"
        subtitle="CERBERUS K9 2026 · BEZPŁATNY WSTĘP DLA MUNDUROWYCH"
      />

      <section className="mx-auto max-w-6xl px-5 pb-8 pt-8 md:px-8">
        <p className="mx-auto max-w-4xl text-center text-sm leading-relaxed text-muted">
          CERBERUS K9 to jedyne w Polsce wydarzenie K9 dedykowane służbom. Policja, wojsko,
          straż, BOR, CBA, ABW — bezpłatna rejestracja, specjalne moduły zamknięte, bezpośredni
          kontakt z instruktorami.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-12 md:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {benefits.map((item) => (
            <article
              key={item.title}
              className="border border-border p-6"
              style={{ backgroundColor: '#1E2B38', borderTop: '2px solid #C4922A' }}
            >
              <div className="mb-3 text-[32px] leading-none">{item.icon}</div>
              <h3 className="mb-2 text-lg font-bold text-bone">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-12 md:px-8">
        <h2 className="mb-4 text-center text-2xl font-bold uppercase tracking-[0.16em] text-bone">
          KTO UCZESTNICZY
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service} className="border border-border bg-navyDeep px-4 py-3 text-bone">
              {service}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-red px-5 py-10 text-center md:px-8">
        <a
          href={registrationHref}
          className="inline-block border border-bone px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-bone hover:bg-[#A82424]"
        >
          ZAREJESTRUJ SWOJĄ JEDNOSTKĘ
        </a>
        <p className="mt-3 text-sm text-bone">
          Rejestracja grupowa dla 3+ osób — napisz na{' '}
          <a className="underline" href="mailto:kontakt@cerberusk9.org">
            kontakt@cerberusk9.org
          </a>
        </p>
      </section>
    </div>
  );
}
