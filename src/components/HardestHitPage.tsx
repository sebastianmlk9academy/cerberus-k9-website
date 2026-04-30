import { useMemo, useState } from 'react';
import { PageHero } from './PageHero';

interface ResultItem {
  rank: number;
  competitor_name: string;
  country: string;
  country_code: string;
  dog_name?: string;
  score: number;
}

interface HardestHitPageProps {
  lang: string;
  results: ResultItem[];
  registrationHref: string;
}

const toFlag = (code: string) =>
  code
    .trim()
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));

export default function HardestHitPage({ results }: HardestHitPageProps) {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [category, setCategory] = useState('PRO');
  const [email, setEmail] = useState('');

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent('HARDEST HIT 2026 - Zgloszenie teamu');
    const body = encodeURIComponent(
      `Imie i nazwisko: ${name}\nKraj: ${country}\nKategoria: ${category}\nEmail: ${email}`,
    );
    return `mailto:hardesthit@cerberusk9.org?subject=${subject}&body=${body}`;
  }, [name, country, category, email]);

  return (
    <div className="w-full bg-navy">
      <PageHero category="ZAWODY" title="HARDEST HIT" subtitle="K9 FORCE COMPETITION · CERBERUS K9 2026" />

      <section className="mx-auto max-w-6xl px-5 pb-10 pt-8 md:px-8">
        <p className="mx-auto max-w-4xl text-center text-sm leading-relaxed text-muted">
          Najbardziej wymagające zawody K9 w Polsce. Psy służbowe i sportowe rywalizują w gryzieni
          obronnej, detekcji i przeszukaniu terenu. Ocenia jury międzynarodowe.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-5 pb-12 md:grid-cols-3 md:px-8">
        <div className="border border-border bg-navyDeep p-5">
          <h3 className="mb-2 font-bold text-gold">Kategorie</h3>
          <p className="text-sm text-muted">PRO (psy służbowe) / OPEN (psy sportowe) / JUNIOR (do 3 lat stażu)</p>
        </div>
        <div className="border border-border bg-navyDeep p-5">
          <h3 className="mb-2 font-bold text-gold">Format</h3>
          <p className="text-sm text-muted">Eliminacje → półfinał → finał</p>
        </div>
        <div className="border border-border bg-navyDeep p-5">
          <h3 className="mb-2 font-bold text-gold">Ocena</h3>
          <p className="text-sm text-muted">Siła, precyzja, czas, posłuszeństwo (skala 0-100)</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-12 md:px-8">
        <h2 className="mb-1 text-2xl font-bold uppercase tracking-[0.16em] text-bone">WYNIKI 2025</h2>
        <p className="mb-4 text-xs text-muted">Dane archiwalne. Wyniki 2026 po evencie.</p>
        <div className="overflow-x-auto border border-border">
          <table className="w-full min-w-[700px] border-collapse bg-navyDeep">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-[0.12em] text-gold">
                <th className="px-3 py-3">Miejsce</th>
                <th className="px-3 py-3">Zawodnik</th>
                <th className="px-3 py-3">Kraj</th>
                <th className="px-3 py-3">Pies</th>
                <th className="px-3 py-3">Wynik</th>
              </tr>
            </thead>
            <tbody>
              {results.map((row) => (
                <tr key={`${row.rank}-${row.competitor_name}`} className="border-b border-border text-sm text-bone">
                  <td className="px-3 py-3">{row.rank}</td>
                  <td className="px-3 py-3">{row.competitor_name}</td>
                  <td className="px-3 py-3">
                    {toFlag(row.country_code)} {row.country}
                  </td>
                  <td className="px-3 py-3">{row.dog_name || '—'}</td>
                  <td className="px-3 py-3 font-bold text-gold">{row.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-16 md:px-8">
        <h2 className="mb-5 text-center text-xl font-bold uppercase tracking-[0.12em] text-bone">
          ZGŁOŚ SWÓJ TEAM DO HARDEST HIT 2026
        </h2>
        <div className="grid grid-cols-1 gap-3">
          <input className="border border-border bg-navyDeep px-4 py-3 text-bone" placeholder="Imię i nazwisko" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="border border-border bg-navyDeep px-4 py-3 text-bone" placeholder="Kraj" value={country} onChange={(e) => setCountry(e.target.value)} />
          <select className="border border-border bg-navyDeep px-4 py-3 text-bone" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>PRO</option>
            <option>OPEN</option>
            <option>JUNIOR</option>
          </select>
          <input className="border border-border bg-navyDeep px-4 py-3 text-bone" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <a href={mailtoHref} className="mt-2 inline-flex justify-center bg-red px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-bone hover:bg-[#A82424]">
            WYŚLIJ ZGŁOSZENIE
          </a>
        </div>
      </section>
    </div>
  );
}
