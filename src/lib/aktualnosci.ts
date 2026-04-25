import type { CollectionEntry } from 'astro:content';
import type { NewsListingArticle } from '../components/NewsListing';
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
		const map: Record<AktualnosciCategory, NewsListingArticle['category']> = {
			Aktualności: 'aktualnosci',
			Instruktorzy: 'instruktorzy',
			Partnerzy: 'partnerzy',
			Rejestracja: 'rejestracja',
			Media: 'media',
			'HARDEST HIT': 'hardest-hit',
		};
		return map[category];
	}
	return 'aktualnosci';
}

export function categoryBadgeLabel(category: string): string {
	if (isAktualnosciCategory(category)) {
		return category === 'HARDEST HIT' ? 'HARDEST HIT' : category.toUpperCase();
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
		.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
		.map((entry) => {
			const cat = entry.data.category;
			return {
				id: entry.id,
				category: cmsCategoryToNewsListingCategory(cat),
				categoryLabel: categoryBadgeLabel(cat),
				title: entry.data.title,
				lead: entry.data.lead,
				date: formatNewsDateLabel(entry.data.date, lang),
				href: `/${lang}/aktualnosci/${entry.id}/`,
				imageSrc: entry.data.image?.trim() || undefined,
			} satisfies NewsListingArticle;
		});
}
