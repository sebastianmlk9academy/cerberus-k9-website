import type { CollectionEntry } from 'astro:content';

export type StatItem = {
	value: string;
	label: string;
	accent?: 'gold' | 'red';
};

export function statsEntriesToStatItems(
	entries: CollectionEntry<'homepage_stats'>[],
	lang: string,
	settings?: { participants_count?: string; countries_count?: string },
): StatItem[] {
	return entries
		.filter((e) => e.data.active !== false)
		.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99))
		.map((e) => {
			let value = e.data.value;
			if (e.data.stat_key === 'participants' && settings?.participants_count) {
				value = settings.participants_count;
			}
			if (e.data.stat_key === 'countries' && settings?.countries_count) {
				value = settings.countries_count;
			}
			return {
				value,
				label:
					(e.data.labels as Record<string, string>)[lang] ??
					e.data.labels.en ??
					e.data.labels.pl,
				accent: e.data.accent,
			};
		});
}
