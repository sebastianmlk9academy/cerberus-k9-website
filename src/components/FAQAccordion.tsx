import { useState, useRef, useEffect } from 'react';
import { ui } from '../i18n/ui';
import type { Lang } from '../i18n/utils';
import { faqByLang } from '../i18n/faq';

interface FAQItem {
  question: string;
  answer: string;
}

function AccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState('0px');

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight('0px');
    }
  }, [isOpen]);

  return (
    <div
      className="border-b"
      style={{ borderColor: '#253344' }}
    >
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span
          className="transition-colors duration-200 pr-4"
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: '14px',
            fontWeight: 700,
            color: isOpen ? '#C4922A' : '#E4DDD0',
          }}
          onMouseEnter={(e) => {
            if (!isOpen) (e.currentTarget as HTMLElement).style.color = '#C4922A';
          }}
          onMouseLeave={(e) => {
            if (!isOpen) (e.currentTarget as HTMLElement).style.color = '#E4DDD0';
          }}
        >
          {item.question}
        </span>
        <span
          className="flex-shrink-0 transition-transform duration-300"
          style={{
            color: '#C4922A',
            fontSize: '20px',
            lineHeight: 1,
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight, opacity: isOpen ? 1 : 0 }}
      >
        <div ref={contentRef}>
          <p
            className="pb-6"
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: '13px',
              color: '#5A6A7A',
              lineHeight: 1.7,
            }}
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

interface FAQAccordionProps {
  lang: Lang;
  faqItems?: FAQItem[];
}

export default function FAQAccordion({ lang, faqItems }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const resolvedFaqItems =
    faqItems && faqItems.length > 0 ? faqItems : (faqByLang[lang] ?? faqByLang.pl);
  const localizedFaqBadge = ((ui[lang] ?? ui.pl) as Record<string, string>).faq ?? 'FAQ';
  const t = {
    pl: { title: 'NAJCZĘSTSZE PYTANIA' },
    en: { title: 'FREQUENTLY ASKED QUESTIONS' },
    de: { title: 'HÄUFIG GESTELLTE FRAGEN' },
    fr: { title: 'QUESTIONS FRÉQUENTES' },
    hr: { title: 'NAJČEŠĆA PITANJA' },
    cs: { title: 'NEJČASTĚJŠÍ DOTAZY' },
    lt: { title: 'DAŽNIAUSI KLAUSIMAI' },
    lv: { title: 'BIEŽĀK UZDOTIE JAUTĀJUMI' },
    sk: { title: 'NAJČASTEJŠIE OTÁZKY' },
    sl: { title: 'POGOSTA VPRAŠANJA' },
    hu: { title: 'GYAKRAN ISMÉTELT KÉRDÉSEK' },
    no: { title: 'OFTE STILTE SPØRSMÅL' },
    sv: { title: 'VANLIGA FRÅGOR' },
    nl: { title: 'VEELGESTELDE VRAGEN' },
    es: { title: 'PREGUNTAS FRECUENTES' },
    pt: { title: 'PERGUNTAS FREQUENTES' },
    ro: { title: 'ÎNTREBĂRI FRECVENTE' },
    it: { title: 'DOMANDE FREQUENTI' },
    ko: { title: '자주 묻는 질문' },
  }[lang] ?? { title: 'FREQUENTLY ASKED QUESTIONS' };

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="w-full"
      style={{
        background: 'linear-gradient(to bottom, #161F28, #1A2530, #161F28)',
        paddingTop: '80px',
        paddingBottom: '10px',
        paddingLeft: '5%',
        paddingRight: '5%',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: '800px' }}>
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C42B2B]/40 to-transparent" />
          <span className="font-[family-name:var(--font-rajdhani)] text-[12px] font-medium tracking-[5px] text-[#C42B2B]">
            {localizedFaqBadge}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C42B2B]/40 to-transparent" />
        </div>
        <h2
          className="text-center mb-12 mt-3 font-[family-name:var(--font-rajdhani)] uppercase text-2xl sm:text-3xl lg:text-[32px]"
          style={{
            fontWeight: 700,
            color: "#E4DDD0",
            letterSpacing: "2px",
          }}
        >
          {t.title}
        </h2>
        <div>
          {resolvedFaqItems.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
