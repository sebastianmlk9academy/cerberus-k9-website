import type { CollectionEntry } from 'astro:content';
import type { NewsListingArticle, NewsListingCategory } from '../components/NewsListing';
import type { Lang } from '../i18n/ui';

const CMS_CATEGORIES = [
	'Aktualności',
	'Instruktorzy',
	'Partnerzy',
	'Rejestracja',
	'Media',
	'HARDEST HIT',
] as const;

export type AktualnosciCategory = (typeof CMS_CATEGORIES)[number];

function isAktualnosciCategory(value: unknown): value is AktualnosciCategory {
	return typeof value === 'string' && (CMS_CATEGORIES as readonly string[]).includes(value);
}

export function cmsCategoryToNewsListingCategory(
	category: string,
): NewsListingArticle['category'] {
	if (isAktualnosciCategory(category)) {
		const map: Record<AktualnosciCategory, Exclude<NewsListingCategory, 'all'>> = {
			'Aktualności': 'news',
			'Instruktorzy': 'instructors',
			'Partnerzy': 'partners',
			'Rejestracja': 'registration',
			'Media': 'media',
			'HARDEST HIT': 'hardestHit',
		};
		return map[category];
	}
	return 'news';
}

const BADGE_TRANSLATIONS: Record<string, Record<AktualnosciCategory, string>> = {
	pl: {
		'Aktualności': 'AKTUALNOŚCI',
		'Instruktorzy': 'INSTRUKTORZY',
		'Partnerzy': 'PARTNERZY',
		'Rejestracja': 'REJESTRACJA',
		'Media': 'MEDIA',
		'HARDEST HIT': 'HARDEST HIT',
	},
	en: {
		'Aktualności': 'NEWS',
		'Instruktorzy': 'INSTRUCTORS',
		'Partnerzy': 'PARTNERS',
		'Rejestracja': 'REGISTRATION',
		'Media': 'MEDIA',
		'HARDEST HIT': 'HARDEST HIT',
	},
	de: {
		'Aktualności': 'AKTUELLES',
		'Instruktorzy': 'INSTRUKTEURE',
		'Partnerzy': 'PARTNER',
		'Rejestracja': 'ANMELDUNG',
		'Media': 'MEDIEN',
		'HARDEST HIT': 'HARDEST HIT',
	},
	fr: {
		'Aktualności': 'ACTUALITÉS',
		'Instruktorzy': 'INSTRUCTEURS',
		'Partnerzy': 'PARTENAIRES',
		'Rejestracja': 'INSCRIPTION',
		'Media': 'MÉDIAS',
		'HARDEST HIT': 'HARDEST HIT',
	},
	cs: {
		'Aktualności': 'AKTUALITY',
		'Instruktorzy': 'INSTRUKTOŘI',
		'Partnerzy': 'PARTNEŘI',
		'Rejestracja': 'REGISTRACE',
		'Media': 'MÉDIA',
		'HARDEST HIT': 'HARDEST HIT',
	},
	sk: {
		'Aktualności': 'AKTUALITY',
		'Instruktorzy': 'INŠTRUKTORI',
		'Partnerzy': 'PARTNERI',
		'Rejestracja': 'REGISTRÁCIA',
		'Media': 'MÉDIÁ',
		'HARDEST HIT': 'HARDEST HIT',
	},
	hu: {
		'Aktualności': 'HÍREK',
		'Instruktorzy': 'OKTATÓK',
		'Partnerzy': 'PARTNEREK',
		'Rejestracja': 'REGISZTRÁCIÓ',
		'Media': 'MÉDIA',
		'HARDEST HIT': 'HARDEST HIT',
	},
	hr: {
		'Aktualności': 'VIJESTI',
		'Instruktorzy': 'INSTRUKTORI',
		'Partnerzy': 'PARTNERI',
		'Rejestracja': 'REGISTRACIJA',
		'Media': 'MEDIJI',
		'HARDEST HIT': 'HARDEST HIT',
	},
	sl: {
		'Aktualności': 'NOVOSTI',
		'Instruktorzy': 'INŠTRUKTORJI',
		'Partnerzy': 'PARTNERJI',
		'Rejestracja': 'REGISTRACIJA',
		'Media': 'MEDIJI',
		'HARDEST HIT': 'HARDEST HIT',
	},
	lt: {
		'Aktualności': 'NAUJIENOS',
		'Instruktorzy': 'INSTRUKTORIAI',
		'Partnerzy': 'PARTNERIAI',
		'Rejestracja': 'REGISTRACIJA',
		'Media': 'ŽINIASKLAIDA',
		'HARDEST HIT': 'HARDEST HIT',
	},
	lv: {
		'Aktualności': 'JAUNUMI',
		'Instruktorzy': 'INSTRUKTORI',
		'Partnerzy': 'PARTNERI',
		'Rejestracja': 'REĢISTRĀCIJA',
		'Media': 'MEDIJI',
		'HARDEST HIT': 'HARDEST HIT',
	},
	no: {
		'Aktualności': 'NYHETER',
		'Instruktorzy': 'INSTRUKTØRER',
		'Partnerzy': 'PARTNERE',
		'Rejestracja': 'REGISTRERING',
		'Media': 'MEDIER',
		'HARDEST HIT': 'HARDEST HIT',
	},
	sv: {
		'Aktualności': 'NYHETER',
		'Instruktorzy': 'INSTRUKTÖRER',
		'Partnerzy': 'PARTNERS',
		'Rejestracja': 'REGISTRERING',
		'Media': 'MEDIA',
		'HARDEST HIT': 'HARDEST HIT',
	},
	nl: {
		'Aktualności': 'NIEUWS',
		'Instruktorzy': 'INSTRUCTEURS',
		'Partnerzy': 'PARTNERS',
		'Rejestracja': 'REGISTRATIE',
		'Media': 'MEDIA',
		'HARDEST HIT': 'HARDEST HIT',
	},
	es: {
		'Aktualności': 'NOTICIAS',
		'Instruktorzy': 'INSTRUCTORES',
		'Partnerzy': 'SOCIOS',
		'Rejestracja': 'REGISTRO',
		'Media': 'MEDIOS',
		'HARDEST HIT': 'HARDEST HIT',
	},
	pt: {
		'Aktualności': 'NOTÍCIAS',
		'Instruktorzy': 'INSTRUTORES',
		'Partnerzy': 'PARCEIROS',
		'Rejestracja': 'REGISTO',
		'Media': 'MÉDIA',
		'HARDEST HIT': 'HARDEST HIT',
	},
	ro: {
		'Aktualności': 'ȘTIRI',
		'Instruktorzy': 'INSTRUCTORI',
		'Partnerzy': 'PARTENERI',
		'Rejestracja': 'ÎNREGISTRARE',
		'Media': 'MEDIA',
		'HARDEST HIT': 'HARDEST HIT',
	},
	it: {
		'Aktualności': 'NOTIZIE',
		'Instruktorzy': 'ISTRUTTORI',
		'Partnerzy': 'PARTNER',
		'Rejestracja': 'REGISTRAZIONE',
		'Media': 'MEDIA',
		'HARDEST HIT': 'HARDEST HIT',
	},
	ko: {
		'Aktualności': '뉴스',
		'Instruktorzy': '강사진',
		'Partnerzy': '파트너',
		'Rejestracja': '등록',
		'Media': '미디어',
		'HARDEST HIT': 'HARDEST HIT',
	},
};

export function categoryBadgeLabel(category: string, lang: string = 'pl'): string {
	if (isAktualnosciCategory(category)) {
		const langMap = BADGE_TRANSLATIONS[lang] ?? BADGE_TRANSLATIONS.pl;
		return langMap[category];
	}
	return category.toUpperCase();
}

/** Display date for cards (dd.mm.yyyy) */
export function formatNewsDateLabel(d: Date, lang: Lang): string {
	try {
		return new Intl.DateTimeFormat(lang === 'pl' ? 'pl-PL' : lang, {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		}).format(d);
	} catch {
		return d.toISOString().slice(0, 10);
	}
}

export function aktualnosciToListingArticles(
	entries: CollectionEntry<'aktualnosci'>[],
	lang: Lang,
): NewsListingArticle[] {
	return [...entries]
		.filter((entry) => entry.data.draft !== true)
		.sort((a, b) => {
			if (a.data.featured && !b.data.featured) return -1;
			if (!a.data.featured && b.data.featured) return 1;
			return b.data.date.valueOf() - a.data.date.valueOf();
		})
		.map((entry) => {
			const cat = entry.data.category;
			return {
				id: entry.id,
				category: cmsCategoryToNewsListingCategory(cat),
				categoryLabel: categoryBadgeLabel(cat, lang),
				title: entry.data.title,
				lead: entry.data.lead,
				date: formatNewsDateLabel(entry.data.date, lang),
				href: `/${lang}/aktualnosci/${entry.id}/`,
				slug: entry.id,
				imageSrc: entry.data.image?.trim() || undefined,
			} satisfies NewsListingArticle;
		});
}
