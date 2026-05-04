/** Zgodne z `ENUM_MODULE_CATEGORIES` w `content.config.ts`. */
export const MODULE_CATEGORY_KEYS = [
	'K9-Gryzienie',
	'K9-Detekcja',
	'K9-SAR',
	'TCCC',
	'Drony',
	'HARDEST HIT',
	'Konferencja',
	'BREAK',
	'CEREMONIA',
	'Inne',
] as const;

export type ModuleCategoryKey = (typeof MODULE_CATEGORY_KEYS)[number];

/** Alias dla kompatybilności z importami (np. InteractiveAgenda). */
export type Category = ModuleCategoryKey;

export type AgendaCategory = {
	key: ModuleCategoryKey;
	label_pl: string;
	label_en?: string;
	color: string;
	show_in_filter: boolean;
	show_calendar_button: boolean;
	order: number;
};

/** Fallback gdy brak wpisów `agenda_categories` z CMS. */
export const CATEGORY_META: Record<ModuleCategoryKey, { color: string; label: string }> = {
	'K9-Gryzienie': { color: '#C4922A', label: 'K9 — GRYZIENIE' },
	'K9-Detekcja': { color: '#C4922A', label: 'K9 — DETEKCJA' },
	'K9-SAR': { color: '#C4922A', label: 'K9 — SAR' },
	TCCC: { color: '#8B2020', label: 'TCCC / MEDYCYNA' },
	Drony: { color: '#2A5A8A', label: 'DRONY' },
	'HARDEST HIT': { color: '#8B4513', label: 'HARDEST HIT' },
	Konferencja: { color: '#2A6A3A', label: 'KONFERENCJA' },
	BREAK: { color: '#3A4A5A', label: 'PRZERWA' },
	CEREMONIA: { color: '#5A3A8A', label: 'CEREMONIA' },
	Inne: { color: '#5A6A7A', label: 'INNE' },
};

const LEGACY_CATEGORY_MAP: Record<string, ModuleCategoryKey> = {
	K9: 'K9-Gryzienie',
	'K9-GRYZIENIE': 'K9-Gryzienie',
	DRONY: 'Drony',
	DRONES: 'Drony',
	KONFERENCJA: 'Konferencja',
	CONFERENCE: 'Konferencja',
	CEREMONIA: 'CEREMONIA',
	CEREMONY: 'CEREMONIA',
	BREAK: 'BREAK',
	PRZERWA: 'BREAK',
	TCCC: 'TCCC',
};

function isModuleCategoryKey(s: string): s is ModuleCategoryKey {
	return (MODULE_CATEGORY_KEYS as readonly string[]).includes(s);
}

/** Kanoniczny klucz modułu (jak w CMS / `ENUM_MODULE_CATEGORIES`). */
export function normalizeCategory(raw: string): ModuleCategoryKey {
	const t = raw.trim();
	if (isModuleCategoryKey(t)) return t;
	const upper = t.toUpperCase();
	if (LEGACY_CATEGORY_MAP[upper]) return LEGACY_CATEGORY_MAP[upper];
	const ci = MODULE_CATEGORY_KEYS.find((k) => k.toLowerCase() === t.toLowerCase());
	if (ci) return ci;
	return 'Inne';
}

export function buildCategoryMeta(
	categories: AgendaCategory[],
	lang: string = 'pl',
): Record<string, { color: string; label: string }> {
	const meta: Record<string, { color: string; label: string }> = {};
	for (const cat of categories) {
		const label = lang === 'pl' ? cat.label_pl : (cat.label_en ?? cat.label_pl);
		meta[cat.key] = {
			color: cat.color,
			label,
		};
	}
	return meta;
}
