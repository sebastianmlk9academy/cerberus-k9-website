import { PageHero } from './PageHero';

interface CourseItem {
  title_pl: string;
  title_en: string;
  category: string;
  description_pl: string;
  description_en: string;
  duration_hours: number;
  max_participants: number;
  target_audience: string;
  instructor_id?: string;
  price_pln?: number;
  order?: number;
}

interface SzkoleniaPageProps {
  lang: string;
  courses: CourseItem[];
  contactEmail: string;
}

const categoryColor: Record<string, string> = {
  TCCC: 'bg-red',
  'K9-Gryzienie': 'bg-gold',
  'K9-Detekcja': 'bg-gold',
  'K9-SAR': 'bg-gold',
  Drony: 'bg-gold',
  Konferencja: 'bg-navyDeep',
};

const audienceLabel: Record<string, string> = {
  sluzby: 'SŁUŻBY',
  delegacja: 'DELEGACJA',
  media: 'MEDIA',
  sponsor: 'SPONSOR',
  wszyscy: 'WSZYSCY',
  'cywil-z-psem': 'CYWIL Z PSEM',
  'cywil-bez-psa': 'CYWIL',
};

export default function SzkoleniaPage({ lang, courses, contactEmail }: SzkoleniaPageProps) {
  return (
    <div className="w-full bg-navy">
      <PageHero category="SZKOLENIA K9" title="OFERTA SZKOLEŃ" subtitle="CERBERUS K9 2026" />

      <section className="mx-auto max-w-6xl px-5 pb-16 pt-10 md:px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {courses.map((course) => {
            const title = lang === 'pl' ? course.title_pl : course.title_en;
            const description = lang === 'pl' ? course.description_pl : course.description_en;
            const categoryClass = categoryColor[course.category] ?? 'bg-navyDeep';
            return (
              <article key={`${course.title_pl}-${course.order}`} className="border border-border bg-navyDeep p-6">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className={`px-2 py-1 text-xs font-bold uppercase tracking-[0.1em] text-bone ${categoryClass}`}>
                    {course.category}
                  </span>
                  <span className="border border-border px-2 py-1 text-xs uppercase text-muted">
                    {audienceLabel[course.target_audience] ?? course.target_audience}
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-bone">{title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted">{description}</p>
                <div className="mb-4 grid grid-cols-2 gap-2 text-xs uppercase tracking-[0.08em] text-muted">
                  <p>Czas: {course.duration_hours}h</p>
                  <p>Limit: {course.max_participants}</p>
                  <p>{course.price_pln ? `Cena: ${course.price_pln} PLN` : 'Cena: ustalana'}</p>
                </div>
                <a
                  href={course.instructor_id ? `mailto:${contactEmail}?subject=Szkolenie ${encodeURIComponent(title)}` : `mailto:${contactEmail}`}
                  className="inline-block bg-red px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-bone hover:bg-[#A82424]"
                >
                  ZAPISZ SIĘ
                </a>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
