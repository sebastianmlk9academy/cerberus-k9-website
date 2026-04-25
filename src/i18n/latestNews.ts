import type { Lang } from './utils';

export type LatestNewsCopy = {
	sectionTag: string;
	sectionTitle: string;
	readMore: string;
	allNews: string;
};

export const latestNewsByLang: Record<Lang, LatestNewsCopy> = {
	pl: { sectionTag: 'AKTUALNOŚCI', sectionTitle: 'NAJNOWSZE INFORMACJE', readMore: 'CZYTAJ WIĘCEJ', allNews: 'WSZYSTKIE AKTUALNOŚCI' },
	en: { sectionTag: 'NEWS', sectionTitle: 'LATEST UPDATES', readMore: 'READ MORE', allNews: 'ALL NEWS' },
	de: { sectionTag: 'AKTUELLES', sectionTitle: 'NEUESTE INFORMATIONEN', readMore: 'MEHR LESEN', allNews: 'ALLE MELDUNGEN' },
	fr: { sectionTag: 'ACTUALITÉS', sectionTitle: 'DERNIÈRES INFORMATIONS', readMore: 'LIRE LA SUITE', allNews: 'TOUTES LES ACTUALITÉS' },
	hr: { sectionTag: 'VIJESTI', sectionTitle: 'NAJNOVIJE INFORMACIJE', readMore: 'ČITAJ VIŠE', allNews: 'SVE VIJESTI' },
	cs: { sectionTag: 'AKTUALITY', sectionTitle: 'NEJNOVĚJŠÍ INFORMACE', readMore: 'ČÍST VÍCE', allNews: 'VŠECHNY AKTUALITY' },
	lt: { sectionTag: 'NAUJIENOS', sectionTitle: 'NAUJAUSIA INFORMACIJA', readMore: 'SKAITYTI DAUGIAU', allNews: 'VISOS NAUJIENOS' },
	lv: { sectionTag: 'JAUNUMI', sectionTitle: 'JAUNĀKĀ INFORMĀCIJA', readMore: 'LASĪT VAIRĀK', allNews: 'VISI JAUNUMI' },
	sk: { sectionTag: 'AKTUALITY', sectionTitle: 'NAJNOVŠIE INFORMÁCIE', readMore: 'ČÍTAŤ VIAC', allNews: 'VŠETKY AKTUALITY' },
	sl: { sectionTag: 'NOVOSTI', sectionTitle: 'NAJNOVEJŠE INFORMACIJE', readMore: 'PREBERI VEČ', allNews: 'VSE NOVOSTI' },
	hu: { sectionTag: 'HÍREK', sectionTitle: 'LEGFRISSEBB INFORMÁCIÓK', readMore: 'TOVÁBB OLVASOM', allNews: 'ÖSSZES HÍR' },
	no: { sectionTag: 'NYHETER', sectionTitle: 'SISTE OPPDATERINGER', readMore: 'LES MER', allNews: 'ALLE NYHETER' },
	sv: { sectionTag: 'NYHETER', sectionTitle: 'SENASTE INFORMATIONEN', readMore: 'LÄS MER', allNews: 'ALLA NYHETER' },
	nl: { sectionTag: 'NIEUWS', sectionTitle: 'LAATSTE INFORMATIE', readMore: 'LEES MEER', allNews: 'AL HET NIEUWS' },
	es: { sectionTag: 'NOTICIAS', sectionTitle: 'ÚLTIMA INFORMACIÓN', readMore: 'LEER MÁS', allNews: 'TODAS LAS NOTICIAS' },
	pt: { sectionTag: 'NOTÍCIAS', sectionTitle: 'INFORMAÇÕES MAIS RECENTES', readMore: 'LER MAIS', allNews: 'TODAS AS NOTÍCIAS' },
	ro: { sectionTag: 'ȘTIRI', sectionTitle: 'ULTIMELE INFORMAȚII', readMore: 'CITEȘTE MAI MULT', allNews: 'TOATE ȘTIRILE' },
	it: { sectionTag: 'NOTIZIE', sectionTitle: 'ULTIME INFORMAZIONI', readMore: 'LEGGI DI PIÙ', allNews: 'TUTTE LE NOTIZIE' },
	ko: { sectionTag: '최신 소식', sectionTitle: '최신 정보', readMore: '더 읽기', allNews: '모든 소식' },
};
