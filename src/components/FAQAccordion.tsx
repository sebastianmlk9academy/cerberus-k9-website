import { useState, useRef, useEffect } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'Czy wydarzenie jest płatne?',
    answer:
      'Wstęp na CERBERUS K9 2026 jest całkowicie bezpłatny dla wszystkich uczestników — zarówno służb mundurowych, jak i cywilów. Rejestracja jest obowiązkowa ze względu na ograniczoną liczbę miejsc. Rejestruj się na: pretix.eu/MLK9-LLK9/CERBERUS',
  },
  {
    question: 'Czy mogę przyjść z psem?',
    answer:
      'Tak. Kategoria uczestnictwa z psem dostępna jest dla służb (psy służbowe) oraz cywilów (psy prywatne). Wymagane jest: potwierdzenie szczepień, mikrochip, smycz. Szczegóły w formularzu rejestracyjnym.',
  },
  {
    question: 'Jakie są wymagania dla psa-uczestnika?',
    answer:
      'Pies musi posiadać aktualne szczepienia (w tym wścieklizna), mikrochip, dokumentację weterynaryjną. Dla psów gryzących obowiązkowy kaganiec podczas poruszania się po terenie eventu (poza modułami szkoleniowymi).',
  },
  {
    question: 'Czy mogę uczestniczyć jako widz bez psa?',
    answer:
      'Tak. Możesz uczestniczyć w konferencji, obserwować pokazy, wziąć udział w szkoleniu z pierwszej pomocy i dronowym bez posiadania psa.',
  },
  {
    question: 'Jaki jest język eventu?',
    answer:
      'Językiem roboczym jest język polski. Moduły z instruktorami zagranicznymi prowadzone są w języku angielskim z tłumaczeniem. Prezentacje i materiały dostępne będą w języku polskim i angielskim.',
  },
  {
    question: 'Czy są noclegi?',
    answer:
      'Organizator nie zapewnia noclegów bezpośrednio, jednak w formularzu rejestracyjnym Pretix znajdziesz informacje o polecanych hotelach w Ostrowie Wielkopolskim z preferencyjnymi stawkami.',
  },
  {
    question: 'Jak dojechać do Ostrowa Wielkopolskiego?',
    answer:
      'Ostrów Wlkp. leży przy A2 (exit Ostrów). Pociągi z Poznania (45 min), Wrocławia (1.5h), Łodzi (2h). Szczegółowa mapa dojazdu dostępna na stronie /kontakt.',
  },
  {
    question: 'Czy jest parking?',
    answer:
      'Tak, przy 3MK Arena dostępny jest bezpłatny parking. Dla uczestników z psami przygotowane zostaną wyznaczone strefy.',
  },
];

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

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="w-full"
      style={{ background: 'linear-gradient(to bottom, #161F28, #1A2530, #161F28)', padding: '80px 5%' }}
    >
      <div className="mx-auto" style={{ maxWidth: '800px' }}>
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C42B2B]/40 to-transparent" />
          <span className="font-[family-name:var(--font-rajdhani)] text-[12px] font-medium tracking-[5px] text-[#C42B2B]">
            FAQ
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
          NAJCZĘSTSZE PYTANIA
        </h2>
        <div>
          {faqItems.map((item, index) => (
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
