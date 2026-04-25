import type { CollectionEntry } from 'astro:content';

type AgendaCategory = 'K9' | 'TCCC' | 'DRONY' | 'KONFERENCJA' | 'CEREMONIA' | 'BREAK';

function mapProgramCategory(c?: string): AgendaCategory {
	switch (c) {
		case 'K9':
			return 'K9';
		case 'TCCC':
			return 'TCCC';
		case 'Drony':
		case 'DRONY':
			return 'DRONY';
		case 'Konferencja':
		case 'KONFERENCJA':
			return 'KONFERENCJA';
		case 'Ceremonia':
		case 'CEREMONIA':
			return 'CEREMONIA';
		case 'Przerwa':
		case 'BREAK':
			return 'BREAK';
		default:
			return 'KONFERENCJA';
	}
}

function dayToDayId(day: string | undefined): 'day1' | 'day2' {
	const d = (day ?? '').trim();
	if (d === 'Dzień 2' || d === '2026-06-14') return 'day2';
	return 'day1';
}

function normalizeTime(t: string | undefined, fallback: string): string {
	const raw = (t ?? fallback).trim();
	const m = raw.match(/^(\d{1,2}):(\d{2})/);
	if (!m) return fallback;
	const hh = String(Number(m[1])).padStart(2, '0');
	return `${hh}:${m[2]}`;
}

/** Map CMS `program` collection entries to InteractiveAgenda `items`. */
export function programEntriesToAgendaItems(
	entries: CollectionEntry<'program'>[],
): {
	id: string;
	start: string;
	end: string;
	title: string;
	location: string;
	category: AgendaCategory;
	description: string;
	instructor?: string;
	dayId?: 'day1' | 'day2';
}[] {
	const sorted = [...entries].sort((a, b) => {
		const oa = a.data.order ?? 99;
		const ob = b.data.order ?? 99;
		if (oa !== ob) return oa - ob;
		const ta = normalizeTime(a.data.time_start, '00:00');
		const tb = normalizeTime(b.data.time_start, '00:00');
		return ta.localeCompare(tb);
	});
	return sorted.map((e) => {
		const d = e.data;
		const dayId = dayToDayId(typeof d.day === 'string' ? d.day : undefined);
		return {
			id: e.id,
			start: normalizeTime(d.time_start, '09:00'),
			end: normalizeTime(d.time_end, '10:00'),
			title: d.title?.trim() || '—',
			location: d.location?.trim() || '—',
			category: mapProgramCategory(d.category),
			description: d.description?.trim() ?? '',
			instructor: d.instructor?.trim() || undefined,
			dayId,
		};
	});
}
