import type { CollectionEntry } from 'astro:content';
import { buildCategoryMeta, CATEGORY_META, normalizeCategory, type AgendaCategory } from './agendaCategories';

function normalizeTime(t: string | undefined, fallback: string): string {
	const raw = (t ?? fallback).trim();
	const m = raw.match(/^(\d{1,2}):(\d{2})/);
	if (!m) return fallback;
	const hh = String(Number(m[1])).padStart(2, '0');
	return `${hh}:${m[2]}`;
}

type AgendaItem = {
	id: string;
	start: string;
	end: string;
	title: string;
	location: string;
	locationMapUrl?: string;
	category: string;
	description: string;
	instructor?: string;
};

export type DaySchedule = {
	id: string;
	label: string;
	date: string;
	items: AgendaItem[];
};

function getLabelPrefix(dayIndex: number, lang: string): string {
	return lang === 'pl' ? `DZIEŃ ${dayIndex + 1}` : `DAY ${dayIndex + 1}`;
}

function getLocale(lang: string): string {
	return lang === 'pl' ? 'pl-PL' : 'en-GB';
}

function buildDayLabel(dayDate: string, dayIndex: number, lang: string): string {
	const date = new Date(`${dayDate}T00:00:00`);
	const locale = getLocale(lang);
	const weekday = date.toLocaleDateString(locale, { weekday: 'long' }).toUpperCase();
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	return `${getLabelPrefix(dayIndex, lang)} — ${weekday} ${day}.${month}`;
}

export function programEntriesToAgendaItems(
	entries: CollectionEntry<'program'>[],
	lang: string = 'pl',
	categories?: AgendaCategory[],
): { days: DaySchedule[]; categoryMeta: Record<string, { color: string; label: string }> } {
	const activeEntries = entries.filter((entry) => entry.data.active !== false);
	const sorted = [...activeEntries].sort((a, b) => {
		const daySort = (a.data.day ?? '').localeCompare(b.data.day ?? '');
		if (daySort !== 0) return daySort;
		const oa = a.data.order ?? 99;
		const ob = b.data.order ?? 99;
		if (oa !== ob) return oa - ob;
		const ta = normalizeTime(a.data.time_start, '00:00');
		const tb = normalizeTime(b.data.time_start, '00:00');
		return ta.localeCompare(tb);
	});
	const uniqueDays = Array.from(new Set(sorted.map((entry) => entry.data.day)));
	const dayMap = new Map(uniqueDays.map((day, index) => [day, index]));
	const grouped = new Map<string, AgendaItem[]>();

	for (const entry of sorted) {
		const day = entry.data.day;
		const rawCategory = (entry.data.category ?? 'K9').trim().toUpperCase();
		const categoryFromCms = categories?.find((c) => c.key === rawCategory)?.key;
		const item: AgendaItem = {
			id: entry.id,
			start: normalizeTime(entry.data.time_start, '09:00'),
			end: normalizeTime(entry.data.time_end, '10:00'),
			title: entry.data.title?.trim() || '—',
			location: entry.data.location?.trim() || '—',
			locationMapUrl: entry.data.locationMapUrl ?? '',
			category: categoryFromCms ?? normalizeCategory(rawCategory),
			description: entry.data.description?.trim() ?? '',
			instructor: entry.data.instructor?.trim() || undefined,
		};
		if (!grouped.has(day)) grouped.set(day, []);
		grouped.get(day)?.push(item);
	}

	const days: DaySchedule[] = Array.from(grouped.entries()).map(([dayDate, items]) => {
		const dayIndex = dayMap.get(dayDate) ?? 0;
		const dayId = `day${dayIndex + 1}`;
		const sortedItems = [...items].sort((a, b) => {
			const entryA = sorted.find((entry) => entry.id === a.id);
			const entryB = sorted.find((entry) => entry.id === b.id);
			const orderA = entryA?.data.order ?? 99;
			const orderB = entryB?.data.order ?? 99;
			if (orderA !== orderB) return orderA - orderB;
			return a.start.localeCompare(b.start);
		});
		return {
			id: dayId,
			label: buildDayLabel(dayDate, dayIndex, lang),
			date: dayDate,
			items: sortedItems,
		};
	});

	const categoryMeta = categories?.length ? buildCategoryMeta(categories) : CATEGORY_META;
	return { days, categoryMeta };
}
