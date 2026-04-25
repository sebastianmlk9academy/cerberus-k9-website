import type { Lang } from './ui';

type NewsSeoCopy = {
	title: string;
	description: string;
	/** Breadcrumb label for the news index link */
	breadcrumbNews: string;
};

export const newsSeoByLang: Record<Lang, NewsSeoCopy> = {
	pl: {
		title: 'Aktualności — CERBERUS K9',
		description:
			'Najnowsze wiadomości, komunikaty i relacje z przygotowań do CERBERUS K9 — szkolenia K9, rejestracja, partnerzy i program wydarzenia.',
		breadcrumbNews: 'Aktualności',
	},
	en: {
		title: 'News — CERBERUS K9',
		description:
			'Latest updates, announcements, and stories from CERBERUS K9 — K9 training, registration, partners, and event programme.',
		breadcrumbNews: 'News',
	},
	de: {
		title: 'Aktuelles — CERBERUS K9',
		description:
			'Aktuelle Meldungen und Hintergruende zu CERBERUS K9 — K9-Ausbildung, Anmeldung, Partner und Programm.',
		breadcrumbNews: 'Aktuelles',
	},
	fr: {
		title: 'Actualites — CERBERUS K9',
		description:
			'Dernieres nouvelles et annonces sur CERBERUS K9 — formation K9, inscription, partenaires et programme.',
		breadcrumbNews: 'Actualites',
	},
	hr: {
		title: 'Novosti — CERBERUS K9',
		description:
			'Najnovije vijesti i obavijesti o CERBERUS K9 — K9 obuka, registracija, partneri i program događaja.',
		breadcrumbNews: 'Novosti',
	},
	cs: {
		title: 'Aktuality — CERBERUS K9',
		description:
			'Nejnovejsi zpravy a oznameni o CERBERUS K9 — vycvik K9, registrace, partneri a program akce.',
		breadcrumbNews: 'Aktuality',
	},
	lt: {
		title: 'Naujienos — CERBERUS K9',
		description:
			'Naujausios zinios ir pranesimai apie CERBERUS K9 — K9 mokymai, registracija, partneriai ir renginio programa.',
		breadcrumbNews: 'Naujienos',
	},
	lv: {
		title: 'Jaunumi — CERBERUS K9',
		description:
			'Jaunakas zinas un pazinojumi par CERBERUS K9 — K9 apmaciba, registracija, partneri un pasakuma programma.',
		breadcrumbNews: 'Jaunumi',
	},
	sk: {
		title: 'Aktuality — CERBERUS K9',
		description:
			'Najnovsie spravy a oznamenia o CERBERUS K9 — vycvik K9, registracia, partneri a program podujatia.',
		breadcrumbNews: 'Aktuality',
	},
	sl: {
		title: 'Novice — CERBERUS K9',
		description:
			'Najnovejse novice in obvestila o CERBERUS K9 — usposabljanje K9, registracija, partnerji in program dogodka.',
		breadcrumbNews: 'Novice',
	},
	hu: {
		title: 'Hirek — CERBERUS K9',
		description:
			'Legfrissebb hirek es kozlemenyek a CERBERUS K9-rol — K9 kepzes, regisztracio, partnerek es esemenyprogram.',
		breadcrumbNews: 'Hirek',
	},
	no: {
		title: 'Nyheter — CERBERUS K9',
		description:
			'Siste nytt og meldinger om CERBERUS K9 — K9-opplaering, pamelding, partnere og program.',
		breadcrumbNews: 'Nyheter',
	},
	sv: {
		title: 'Nyheter — CERBERUS K9',
		description:
			'Senaste nytt om CERBERUS K9 — K9-utbildning, anmalan, partners och program.',
		breadcrumbNews: 'Nyheter',
	},
	nl: {
		title: 'Nieuws — CERBERUS K9',
		description:
			'Het laatste nieuws over CERBERUS K9 — K9-training, registratie, partners en programma.',
		breadcrumbNews: 'Nieuws',
	},
	es: {
		title: 'Noticias — CERBERUS K9',
		description:
			'Ultimas noticias y comunicados sobre CERBERUS K9 — formacion K9, registro, socios y programa del evento.',
		breadcrumbNews: 'Noticias',
	},
	pt: {
		title: 'Noticias — CERBERUS K9',
		description:
			'Ultimas noticias e comunicados sobre o CERBERUS K9 — formacao K9, inscricoes, parceiros e programa do evento.',
		breadcrumbNews: 'Noticias',
	},
	ro: {
		title: 'Stiri — CERBERUS K9',
		description:
			'Ultimele stiri si comunicate despre CERBERUS K9 — instruire K9, inregistrare, parteneri si programul evenimentului.',
		breadcrumbNews: 'Stiri',
	},
	it: {
		title: 'Notizie — CERBERUS K9',
		description:
			"Ultime notizie e comunicazioni su CERBERUS K9 — addestramento K9, iscrizioni, partner e programma dell'evento.",
		breadcrumbNews: 'Notizie',
	},
	ko: {
		title: '소식 — CERBERUS K9',
		description:
			'CERBERUS K9 관련 최신 소식과 공지 — K9 훈련, 등록, 파트너 및 행사 프로그램.',
		breadcrumbNews: '소식',
	},
};
