import type { CollectionEntry } from 'astro:content';

export type ProgramCard = {
	category: string;
	title: string;
	description: string;
	badge?: string;
	color?: string;
	icon?: string;
};

export function cardEntriesToProgramCards(
	entries: CollectionEntry<'homepage_cards'>[],
	lang: string,
): ProgramCard[] {
	return entries
		.filter((e) => e.data.active !== false)
		.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99))
		.map((e) => {
			const d = e.data as Record<string, string | boolean | number | undefined>;
			const title =
				(d[`title_${lang}`] as string) ??
				(d['title_en'] as string) ??
				(d['title_pl'] as string) ??
				'';
			const description =
				(d[`description_${lang}`] as string) ??
				(d['description_en'] as string) ??
				(d['description_pl'] as string) ??
				'';
			const badge =
				(d[`badge_${lang}`] as string) ??
				(d['badge_en'] as string) ??
				(d['badge_pl'] as string) ??
				'';
			return {
				category: e.data.category,
				title,
				description,
				badge,
				color: e.data.color ?? '#C4922A',
				icon: e.data.icon ?? '',
			};
		});
}
