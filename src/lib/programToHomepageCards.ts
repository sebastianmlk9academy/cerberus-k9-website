import type { CollectionEntry } from 'astro:content';
import type { AgendaCategory } from './agendaCategories';
import type { ProgramCard } from './homepageCards';

/** Pierwsze `limit` pozycji programu jako karty sekcji „Program” na stronie głównej. */
export function programEntriesToHomepageCards(
	entries: CollectionEntry<'program'>[],
	lang: string,
	eventDateStart: string | undefined,
	opts: { limit?: number; categories?: AgendaCategory[] } = {},
): ProgramCard[] {
	const { limit = 6, categories } = opts;
	const colorByKey = new Map(
		(categories ?? []).flatMap((c) => {
			const k = c.key.trim();
			return [
				[k.toUpperCase(), c.color],
				[k, c.color],
			] as [string, string][];
		}),
	);
	const sortedDays = Array.from(new Set(entries.map((e) => e.data.day).filter(Boolean))).sort();
	const dayRank = (day: string) => {
		const i = sortedDays.indexOf(day);
		if (i >= 0) return i + 1;
		if (eventDateStart && day === eventDateStart) return 1;
		return sortedDays.length ? sortedDays.indexOf(day) + 1 : 1;
	};

	return [...entries]
		.filter((e) => e.data.active !== false && e.data.isVisible !== false && !e.data.is_break)
		.sort((a, b) => {
			const da = a.data.day ?? '';
			const db = b.data.day ?? '';
			if (da !== db) return da.localeCompare(db);
			return (a.data.order ?? 99) - (b.data.order ?? 99);
		})
		.slice(0, limit)
		.map((e) => {
			const raw = (e.data.category ?? '').trim();
			const color =
				colorByKey.get(raw) ?? colorByKey.get(raw.toUpperCase()) ?? '#C4922A';
			const dn = dayRank(e.data.day);
			const badge =
				lang === 'pl'
					? `DZIEŃ ${dn} · ${e.data.time_start}–${e.data.time_end}`
					: `DAY ${dn} · ${e.data.time_start}–${e.data.time_end}`;
			return {
				category: e.data.category,
				title: e.data.title,
				description: e.data.description?.trim() || '',
				badge,
				color,
				icon: '',
			} satisfies ProgramCard;
		});
}
