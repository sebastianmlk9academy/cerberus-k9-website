import type { Lang } from './utils';

type FAQItem = {
  question: string;
  answer: string;
};

const pl: FAQItem[] = [
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

const en: FAQItem[] = [
  {
    question: 'Is the event paid?',
    answer:
      'Admission to CERBERUS K9 2026 is completely free for all attendees, both uniformed services and civilians. Registration is required due to limited capacity. Register at: pretix.eu/MLK9-LLK9/CERBERUS',
  },
  {
    question: 'Can I come with my dog?',
    answer:
      'Yes. Participation with a dog is available for services (service dogs) and civilians (private dogs). Required: vaccination proof, microchip, leash. More details are in the registration form.',
  },
  {
    question: 'What are the requirements for a participating dog?',
    answer:
      'The dog must have current vaccinations (including rabies), a microchip, and veterinary documentation. For biting dogs, a muzzle is mandatory while moving around the event area (outside training modules).',
  },
  {
    question: 'Can I attend as a spectator without a dog?',
    answer:
      'Yes. You can attend the conference, watch demonstrations, and join first aid and drone training without owning a dog.',
  },
  {
    question: 'What is the event language?',
    answer:
      'The working language is Polish. Modules with international instructors are conducted in English with interpretation. Presentations and materials are available in Polish and English.',
  },
  {
    question: 'Are accommodations available?',
    answer:
      'The organizer does not provide accommodation directly, but the Pretix registration form includes recommended hotels in Ostrów Wielkopolski with preferred rates.',
  },
  {
    question: 'How to get to Ostrów Wielkopolski?',
    answer:
      'Ostrów Wlkp. is near the A2 route (Ostrów exit). Trains run from Poznań (45 min), Wrocław (1.5h), and Łódź (2h). A detailed map is available on /kontakt.',
  },
  {
    question: 'Is parking available?',
    answer:
      'Yes, free parking is available at 3MK Arena. Designated zones will be prepared for participants with dogs.',
  },
];

export const faqByLang: Record<Lang, FAQItem[]> = {
  pl,
  en,
  de: en,
  fr: en,
  hr: en,
  cs: en,
  lt: en,
  lv: en,
  sk: en,
  sl: en,
  hu: en,
  no: en,
  sv: en,
  nl: en,
  es: en,
  pt: en,
  ro: en,
  it: en,
  ko: en,
};

