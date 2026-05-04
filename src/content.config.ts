import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Konwertuje wartość daty na string YYYY-MM-DD.
 * YAML parsuje gołe daty (2026-06-13) jako obiekty Date.
 * Decap CMS z format: "YYYY-MM-DD" też może zwrócić Date.
 * Zwykły string przechodzi bez zmian.
 */
function dateToString(val: unknown): unknown {
	if (val instanceof Date) {
		const y = val.getUTCFullYear();
		const m = String(val.getUTCMonth() + 1).padStart(2, '0');
		const d = String(val.getUTCDate()).padStart(2, '0');
		return `${y}-${m}-${d}`;
	}
	if (typeof val === 'number') {
		return String(val);
	}
	return val;
}

const ENUM_MODULE_CATEGORIES = [
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

const ENUM_FAQ_CATEGORIES = [
	'Rejestracja',
	'Program',
	'Logistyka',
	'K9',
	'TCCC',
	'Drony',
	'HARDEST HIT',
	'Inne',
] as const;

const ENUM_PARTNER_TYPES = ['strategic', 'partner', 'technical', 'media', 'honorary', 'sponsor'] as const;
const COUNTRY_CODE = z.string().length(2).regex(/^[A-Z]{2}$/);
const ENUM_AUDIENCE_TYPES = [
	'sluzby', 'cywil-z-psem', 'cywil-bez-psa',
	'delegacja', 'media', 'sponsor', 'wszyscy',
] as const;

const ENUM_PARTNER_TIERS = ['strategic', 'partner', 'technical', 'media', 'honorary'] as const;

const ENUM_LANG_CODES = [
	'pl', 'en', 'de', 'fr', 'hr', 'cs', 'lt', 'lv', 'sk', 'sl', 'hu', 'no', 'sv', 'nl', 'es', 'pt', 'ro', 'it', 'ko',
] as const;

const ENUM_LIVE_SEVERITY = ['info', 'success', 'warning', 'danger'] as const;
const ENUM_LIVE_SOURCE = ['jury', 'operations', 'kameralna', 'press'] as const;
const ENUM_LICENSE = ['free', 'attribution', 'press_only'] as const;
const ENUM_SPONSOR_MATERIAL_CATEGORY = ['brief', 'deck', 'onepager', 'logo_pack', 'case_study'] as const;
const ENUM_SPONSOR_TARGET = ['prospect', 'confirmed', 'partner'] as const;
const ENUM_EDITION = ['2025', '2026'] as const;
const ENUM_MEDIA_ARCHIVE_TYPE = ['print', 'tv', 'radio', 'online', 'podcast'] as const;

const i18n_strings = defineCollection({
	loader: glob({ base: './src/content/i18n', pattern: '*.json' }),
	schema: z.object({
		metaTitle: z.string().optional().default(''),
		metaDescription: z.string().optional().default(''),
		nav: z
			.object({
				event: z.string(),
				instructors: z.string(),
				partners: z.string(),
				media: z.string(),
				foundation: z.string(),
				gallery: z.string(),
				contact: z.string(),
				news: z.string(),
				register: z.string(),
			})
			.optional(),
		buttons: z
			.object({
				register: z.string(),
				program: z.string(),
				video: z.string(),
				all_news: z.string(),
				become_partner: z.string(),
				read_more: z.string(),
				load_more: z.string(),
			})
			.optional(),
		labels: z
			.object({
				free_admission: z.string(),
				confirmed: z.string(),
				expand_bio: z.string(),
				collapse_bio: z.string(),
				back_to_news: z.string(),
				share: z.string(),
				module: z.string(),
				schedule: z.string(),
				instructor_label: z.string(),
			})
			.optional(),
	}),
});

function normalizeInstructorSpecializations(val: unknown): string[] {
	if (typeof val === 'string') {
		return val
			.split(',')
			.map((s) => s.trim())
			.filter(Boolean);
	}
	if (!Array.isArray(val)) return [];
	return val
		.map((x) => {
			if (typeof x === 'string') return x.trim();
			if (x && typeof x === 'object') {
				const o = x as Record<string, unknown>;
				for (const k of ['spec', 'value', 'name', 'label', 'title'] as const) {
					const v = o[k];
					if (typeof v === 'string' && v.trim()) return v.trim();
				}
			}
			return '';
		})
		.filter(Boolean);
}

/** CMS list widget writes YAML arrays; legacy content uses a single comma-separated string. */
function normalizeInstructorLanguages(val: unknown): string | undefined {
	if (val == null || val === '') return undefined;
	if (typeof val === 'string') {
		const t = val.trim();
		return t || undefined;
	}
	if (Array.isArray(val)) {
		const parts = val
			.map((x) => {
				if (typeof x === 'string') return x.trim();
				if (x && typeof x === 'object') {
					const o = x as Record<string, unknown>;
					for (const k of ['lang', 'language', 'value', 'name', 'label', 'spec'] as const) {
						const v = o[k];
						if (typeof v === 'string' && v.trim()) return v.trim();
					}
					const first = Object.values(o).find((v) => typeof v === 'string' && String(v).trim());
					return typeof first === 'string' ? first.trim() : '';
				}
				return '';
			})
			.filter(Boolean);
		return parts.length ? parts.join(', ') : undefined;
	}
	if (val && typeof val === 'object') {
		return normalizeInstructorLanguages(Object.values(val as Record<string, unknown>));
	}
	return undefined;
}

/** Ścieżka w `public/` musi zaczynać się od `/`, inaczej przeglądarka rozwiąże ją względem `/pl/instruktorzy/`. */
function normalizeInstructorPhoto(val: unknown): string {
	if (val == null || val === '') return '';
	if (typeof val === 'string') {
		const s = val.trim();
		if (!s) return '';
		if (/^https?:\/\//i.test(s) || s.startsWith('data:')) return s;
		if (s.startsWith('/')) return s;
		return `/${s.replace(/^\/+/, '')}`;
	}
	if (val && typeof val === 'object' && !Array.isArray(val)) {
		const o = val as Record<string, unknown>;
		for (const k of ['url', 'path', 'src'] as const) {
			const inner = o[k];
			if (typeof inner === 'string' && inner.trim()) return normalizeInstructorPhoto(inner);
		}
	}
	return '';
}

/** YAML / CMS sometimes emits booleans as strings. */
function normalizeBoolish(val: unknown): unknown {
	if (val === undefined || val === null || val === '') return val;
	if (typeof val === 'boolean') return val;
	if (val === 'true' || val === '1' || val === 1) return true;
	if (val === 'false' || val === '0' || val === 0) return false;
	return val;
}

function normalizeInstructorOrder(val: unknown): number {
	if (val === undefined || val === null || val === '') return 99;
	const n = typeof val === 'number' ? val : Number(String(val).trim());
	if (!Number.isFinite(n)) return 99;
	return Math.trunc(n);
}

/** Netlify/Decap `public/admin/config.yml` uses snake_case; build uses camelCase. */
function mapInstruktorCmsKeys(raw: unknown): unknown {
	if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return raw;
	const o = { ...(raw as Record<string, unknown>) };
	const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

	const existingCode = str(o.countryCode);
	if (!existingCode && str(o.country_code)) {
		o.countryCode = str(o.country_code).toUpperCase();
	}

	const existingRole = str(o.role);
	if (!existingRole) {
		const pl = str(o.role_pl);
		const en = str(o.role_en);
		if (pl) o.role = pl;
		else if (en) o.role = en;
	}

	if (!str(o.bioShort)) {
		const pl = str(o.bio_short_pl);
		const en = str(o.bio_short_en);
		o.bioShort = pl || en || '';
	}
	if (!str(o.bioFull)) {
		const pl = typeof o.bio_full_pl === 'string' ? o.bio_full_pl : '';
		const en = typeof o.bio_full_en === 'string' ? o.bio_full_en : '';
		if (pl.trim() && en.trim()) o.bioFull = `${pl}\n\n---\n\n${en}`;
		else o.bioFull = pl || en || '';
	}

	if (!str(o.type) && str(o.instructor_type)) {
		o.type = str(o.instructor_type);
	}

	if (!str(o.linkedinUrl)) {
		const primary = str(o.linkedin_url);
		const social = str(o.social_linkedin);
		if (primary) o.linkedinUrl = primary;
		else if (social) o.linkedinUrl = social;
	}

	if (str(o.social_facebook) && !str(o.socialFacebook)) {
		o.socialFacebook = str(o.social_facebook);
	}
	if (str(o.social_instagram) && !str(o.socialInstagram)) {
		o.socialInstagram = str(o.social_instagram);
	}

	if (o.active === undefined && o.isVisible !== undefined) {
		const v = normalizeBoolish(o.isVisible);
		if (v === true || v === false) o.active = v;
		else if (typeof o.isVisible === 'boolean') o.active = o.isVisible;
	}
	return o;
}

const instruktorzy = defineCollection({
	loader: glob({ base: './src/content/instruktorzy', pattern: '**/*.{md,mdx,json,yml,yaml}' }),
	schema: z.preprocess(
		mapInstruktorCmsKeys,
		z.object({
			name: z.string(),
			role: z.string().optional(),
			country: z.string(),
			countryCode: z.string().length(2),
			specializations: z.preprocess(normalizeInstructorSpecializations, z.array(z.string())),
			unit: z.string().optional(),
			module: z.string().optional(),
			schedule: z.string().optional(),
			languages: z.preprocess(normalizeInstructorLanguages, z.string().optional()),
			type: z.string().optional(),
			linkedinUrl: z.string().optional(),
			/** Z CMS (`social_facebook`); zachowane na przyszłe linki w karcie. */
			socialFacebook: z.string().optional(),
			/** Z CMS (`social_instagram`); zachowane na przyszłe linki w karcie. */
			socialInstagram: z.string().optional(),
			showOnHomepage: z.preprocess(normalizeBoolish, z.boolean().optional()),
			confirmed: z.enum(['confirmed', 'pending', 'hidden']).optional().default('confirmed'),
			needs_review: z.preprocess(normalizeBoolish, z.boolean().optional().default(false)),
			bioShort: z.string(),
			bioFull: z.string(),
			photo: z.preprocess(normalizeInstructorPhoto, z.string()),
			order: z.preprocess(normalizeInstructorOrder, z.number().int()),
			active: z.preprocess(normalizeBoolish, z.boolean().optional().default(true)),
		}),
	),
});

const PARTNER_TYPE_PL_TO_EN: Record<string, (typeof ENUM_PARTNER_TYPES)[number]> = {
	Strategiczny: 'strategic',
	Partner: 'partner',
	Technologiczny: 'technical',
	'Patron Medialny': 'media',
	'Patron-Medialny': 'media',
	Honorowy: 'honorary',
	Sponsor: 'sponsor',
};

const partnerTypeSchema = z.preprocess((value) => {
	if (typeof value !== 'string') return value;
	const normalized = value.trim();
	return PARTNER_TYPE_PL_TO_EN[normalized] ?? normalized;
}, z.enum(ENUM_PARTNER_TYPES).optional().default('strategic'));

const partnerzy = defineCollection({
	loader: glob({ base: './src/content/partnerzy', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		name: z.string().optional(),
		type: partnerTypeSchema,
		country: z.string().optional(),
		country_code: COUNTRY_CODE.optional(),
		logo: z.string().optional(),
		website: z.string().optional(),
		website_label: z.string().optional(),
		description: z.string().optional(),
		order: z.number().int().optional(),
		show_in_strip: z.boolean().optional().default(true),
		strip_order: z.number().optional().default(99),
		active: z.boolean().optional().default(true),
		needs_review: z.boolean().optional().default(false),
	}),
});

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			draft: z.boolean().optional().default(false),
		}),
});

const aktualnosci = defineCollection({
	loader: glob({ base: './src/content/aktualnosci', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		category: z.enum([
			'Aktualności',
			'Instruktorzy',
			'Partnerzy',
			'Rejestracja',
			'Media',
			'HARDEST HIT',
		]),
		lead: z.string().max(500),
		image: z.string().optional(),
		image_alt: z.string().optional(),
		tags: z.array(z.string()).optional(),
		heroImageFocalX: z.number().optional(),
		heroImageFocalY: z.number().optional(),
		share_url: z.string().optional(),
		draft: z.boolean().optional().default(false),
		featured: z.boolean().optional().default(false),
		seo_title: z.string().optional(),
		seo_description: z.string().optional(),
		og_image_override: z.string().optional(),
		reading_time_override: z.number().optional(),
		needs_review: z.boolean().optional().default(false),
	}),
});

const media_archive = defineCollection({
	loader: glob({ base: './src/content/media_archive', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		outlet: z.string(),
		description: z.string().optional(),
		date: z.string().optional(),
		link: z.string().optional(),
		badge: z
			.enum(['VIDEO', 'ARTYKUŁ', 'AUDIO', 'PODCAST', 'REPORTAŻ'])
			.optional()
			.default('VIDEO'),
		outlet_logo: z.string().optional(),
		order: z.number().optional().default(99),
		active: z.boolean().optional().default(true),
	}),
});

const press_releases = defineCollection({
	loader: glob({ base: './src/content/press_releases', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		date: z.preprocess(dateToString, z.string()).optional(),
		file_url: z.string(),
		order: z.number().optional().default(99),
		active: z.boolean().optional().default(true),
	}),
});

const program = defineCollection({
	loader: glob({ base: './src/content/program', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		day: z.string(),
		time_start: z.string().regex(/^\d{2}:\d{2}$/),
		time_end: z.string().regex(/^\d{2}:\d{2}$/),
		title_pl: z.string(),
		title_en: z.string().optional().default(''),
		title: z.string().optional(),
		location: z.string().optional().default(''),
		locationMapUrl: z.string().optional().default(''),
		category: z.string(),
		description: z.string().optional().default(''),
		instructor: z.string().optional().default(''),
		instructor_id: z.string().optional(),
		is_break: z.boolean().optional().default(false),
		order: z.number().optional().default(99),
		isVisible: z.boolean().optional().default(true),
		active: z.boolean().optional(),
		needs_review: z.boolean().optional().default(false),
		audience: z.union([z.array(z.string()), z.string()]).optional(),
		maxParticipants: z.number().optional(),
		color: z.string().optional(),
		icon: z.string().optional(),
		module: z.string().optional(),
		schedule: z.string().optional(),
	}),
});

const agenda_categories = defineCollection({
	loader: glob({ base: './src/content/agenda_categories', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		key: z.string(),
		label_pl: z.string(),
		label_en: z.string().optional(),
		color: z.string().default('#C4922A'),
		show_in_filter: z.boolean().default(true),
		show_calendar_button: z.boolean().default(true),
		order: z.number().optional().default(99),
		active: z.boolean().optional().default(true),
	}),
});

/** CMS (Decap) grouped `sekcja_*` objects → flat keys expected by the site schema. */
const USTAWIENIA_SECTION_KEYS = [
	'sekcja_wydarzenie',
	'sekcja_hero',
	'sekcja_statystyki',
	'sekcja_wideo',
	'sekcja_rejestracja',
	'sekcja_live',
	'sekcja_social',
	'sekcja_kontakt',
	'sekcja_dane_rejestrowe',
	'sekcja_seo',
	'sekcja_analityka_trackery',
	'sekcja_grafika',
] as const;

function flattenUstawieniaCmsInput(raw: unknown): unknown {
	if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return raw;
	const o = { ...(raw as Record<string, unknown>) };
	const fromSections: Record<string, unknown> = {};
	for (const sk of USTAWIENIA_SECTION_KEYS) {
		const nest = o[sk];
		if (nest && typeof nest === 'object' && !Array.isArray(nest)) {
			// Recursively flatten sub-objects (e.g. sekcja_linki_stopki inside sekcja_kontakt)
			for (const [subKey, subVal] of Object.entries(nest as Record<string, unknown>)) {
				if (subVal && typeof subVal === 'object' && !Array.isArray(subVal) && !(subVal instanceof Date)) {
					Object.assign(fromSections, subVal as Record<string, unknown>);
				} else {
					fromSections[subKey] = subVal;
				}
			}
			delete o[sk];
		}
	}
	const merged = { ...o, ...fromSections } as Record<string, unknown>;
	// Keep historical aliases used by older YAML snapshots/build scripts.
	const aliases: [string, string][] = [
		['video_2_url', 'video_url_2'],
		['video_3_url', 'video_url_3'],
		['video_2_badge', 'video_badge_2'],
		['video_3_badge', 'video_badge_3'],
	];
	for (const [from, to] of aliases) {
		if (merged[to] == null && merged[from] != null) merged[to] = merged[from];
	}
	for (const k of ['participants_count', 'countries_count', 'dogs_count', 'modules_count'] as const) {
		const v = merged[k];
		if (typeof v === 'number') {
			const n = v as number;
			merged[k] = k === 'modules_count' ? String(n) : `${n}+`;
		}
	}
	const plEmpty =
		typeof merged.notification_bar_text_pl !== 'string' || String(merged.notification_bar_text_pl).trim() === '';
	const legacyText =
		typeof merged.notification_bar_text === 'string' ? String(merged.notification_bar_text).trim() : '';
	if (plEmpty && legacyText !== '') {
		merged.notification_bar_text_pl = merged.notification_bar_text;
	}
	return merged;
}

const ustawienia = defineCollection({
	loader: glob({ base: './src/content', pattern: 'ustawienia.{yml,yaml}' }),
	schema: z.preprocess(flattenUstawieniaCmsInput, z.object({
		event_date: z.preprocess(dateToString, z.string()),
		event_date_end: z.preprocess(dateToString, z.string()),
		event_time_start: z.string().regex(/^\d{2}:\d{2}$/).optional().default('09:00'),
		event_time_end: z.string().regex(/^\d{2}:\d{2}$/).optional().default('18:00'),
		event_city: z.string(),
		event_venue: z.string(),
		/** Wyświetlana data hero (np. „13–14 CZERWCA 2026”); opcjonalnie — fallback z i18n. */
		event_date_display: z.string().optional(),
		/** Jedna linia lokalizacji hero (np. arena · miasto). */
		event_location: z.string().optional(),
		/** Alternatywa dla `hero_tagline` w hero strony głównej. */
		event_tagline: z.string().optional(),
		/** URL rejestracji; gdy pusty — `pretix_url` / `hero_cta_registration_href`. */
		registration_url: z.string().optional(),
		show_live_counter: z.boolean().default(false),
		participants_count: z.string(),
		countries_count: z.string(),
		dogs_count: z.string(),
		modules_count: z.string(),
		hero_title: z.string().optional().default('CERBERUS'),
		hero_subtitle: z.string().optional().default('K9'),
		hero_year: z.string().optional().default('2026'),
		pretix_url: z.string(),
		hero_video_url: z.string().optional(),
		hero_video_href: z.string().optional(),
		hero_video_title: z.string().optional(),
		hero_close_label_pl: z.string().optional().default('ZAMKNIJ'),
		hero_background_image: z.string().optional(),
		hero_background_opacity: z.coerce.number().optional().default(0.4),
		plausible_domain: z.string().optional(),
		notification_bar_active: z.boolean().default(false),
		notification_bar_severity: z.enum(['urgent', 'info', 'success']).default('info'),
		notification_bar_text_pl: z.string().optional(),
		notification_bar_text_en: z.string().optional(),
		notification_bar_link_text_pl: z.string().optional(),
		notification_bar_link_text_en: z.string().optional(),
		notification_bar_url: z.preprocess(
			(v) => (v === '' || v == null ? undefined : v),
			z.string().url().optional(),
		),
		mobile_sticky_cta_active: z.boolean().optional().default(false),
		ga4_id: z.string().optional(),
		facebook_pixel_id: z.string().optional(),
		microsoft_clarity_id: z.string().optional(),
		consent_version: z.number().int().min(1).optional().default(1),
		registration_active: z.boolean().default(true),
		hero_cta_registration_href: z.string().optional(),
		hero_cta_program_href: z.string().optional(),
		hardest_hit_active: z.boolean().default(true),
		notification_bar_text: z.string().optional(),
		live_mode_active: z.boolean().default(false),
		footer_email: z.string(),
		footer_phone: z.string(),
		social_facebook: z.string(),
		social_youtube: z.string(),
		social_instagram: z.string().optional().default(''),
		social_linkedin: z.string().optional().default(''),
		social_twitter: z.string().optional().default(''),
		twitter_handle: z.string().optional().default('@cerberusk9'),
		statute_pdf: z.string(),
		krs_url: z.string(),
		main_video_youtube: z.string().optional(),
		main_video_title: z.string().optional(),
		video_badge_1: z.string().optional(),
		video_badge_2: z.string().optional(),
		video_badge_3: z.string().optional(),
		video_badge_4: z.string().optional(),
		video_url_2: z.string().optional(),
		video_url_3: z.string().optional(),
		video_url_4: z.string().optional(),
		registration_date_display: z.string().optional(),
		registration_prep_day: z.string().optional(),
		registration_venues: z.string().optional(),
		registration_city: z.string().optional(),
		registration_contact_email: z.string().optional(),
		registration_contact_phone: z.string().optional(),
		accreditation_deadline: z.string().optional(),
		partner_cta_href: z.string().optional(),
		partner_cta_href_full: z.string().optional(),
		nav_logo: z.string().optional().default('/images/cerberus-k9-logo.png'),
		nav_logo_alt: z.string().optional().default('CERBERUS K9 Logo'),
		brand_name: z.string().optional().default('CERBERUS K9'),
		brand_tagline: z.string().optional().default('INTERNATIONAL DEFENSE PLATFORM'),
		footer_address: z.string().optional().default('ul. Odolanowska 17, 63-400 Topola Mała'),
		footer_foundation_name: z.string().optional().default('Fundacja PACTA K9'),
		footer_domains: z.string().optional().default('cerberusk9.org | pactak9.org'),
		footer_link_about: z.string().optional().default('o-wydarzeniu'),
		footer_link_instructors: z.string().optional().default('instruktorzy'),
		footer_link_registration: z.string().optional().default('rejestracja'),
		footer_link_program: z.string().optional().default('o-wydarzeniu#program'),
		footer_link_gallery: z.string().optional().default('galeria'),
		footer_link_media: z.string().optional().default('media'),
		footer_link_news: z.string().optional().default('aktualnosci'),
		footer_link_foundation: z.string().optional().default('fundacja'),
		footer_link_partners: z.string().optional().default('partnerzy'),
		footer_link_contact: z.string().optional().default('kontakt'),
		footer_instagram_url: z.string().optional(),
		krs_number: z.string().optional().default('0001219121'),
		nip_number: z.string().optional().default('6222869581'),
		regon_number: z.string().optional().default('543799847'),
		default_news_image: z.string().optional().default('/images/cerberus-k9-logo.png'),
		instructor_placeholder_photo: z.string().optional(),
		press_kit_zip: z.string().optional().default(''),
		press_pdf_polska_zbrojna: z.string().optional().default(''),
		press_pdf_special_ops: z.string().optional().default(''),
		media_contact_name: z.string().optional().default('Sebastian Bożek — Wiceprezes'),
		media_contact_phone: z.string().optional().default('+48 695 637 907'),
		media_contact_email: z.string().optional().default('sebastian@pactak9.org'),
		media_label_full_materials_pl: z.string().optional().default('KOMPLET MATERIAŁÓW'),
		media_label_contact_accreditation_pl: z.string().optional().default('KONTAKT I AKREDYTACJA'),
		media_label_press_info_pl: z.string().optional().default('INFORMACJE PRASOWE'),
		media_label_media_archive_pl: z.string().optional().default('ARCHIWUM MEDIALNE'),
		media_label_archive_description_pl: z.string().optional().default('Wybrane relacje prasowe i materiały z ubiegłorocznej edycji.'),
		president_email: z.string().optional().default('mariusz@pactak9.org'),
		map_embed_url: z.string().optional().default(''),
		venue_address: z.string().optional().default(''),
		contact_phone_sebastian: z.string().optional(),
		contact_phone_mariusz: z.string().optional(),
		contact_president_email: z.string().optional(),
		contact_address_street: z.string().optional(),
		contact_address_country_pl: z.string().optional(),
		contact_address_country_en: z.string().optional(),
		contact_address_city: z.string().optional(),
		contact_address_zip: z.string().optional(),
		contact_map_embed_url: z.string().optional(),
		contact_venue_address: z.string().optional(),
		contact_form_endpoint: z.string().optional().default(''),
		contact_form_recipient: z.string().optional().default('sebastian@pactak9.org'),
		contact_gdpr_text_pl: z
			.string()
			.optional()
			.default('Wyrażam zgodę na przetwarzanie danych osobowych zgodnie z RODO.'),
		contact_gdpr_text_en: z
			.string()
			.optional()
			.default('I consent to processing of personal data in accordance with GDPR.'),
		agenda_page_url: z.string().optional().default('https://cerberusk9.org/pl/o-wydarzeniu'),
		nav_registration_active: z.boolean().optional(),
		site_url: z.string().optional().default('https://cerberusk9.org'),
		pwa_name: z.string().optional().default('CERBERUS K9'),
		pwa_short_name: z.string().optional().default('CERBERUS K9'),
		pwa_description: z
			.string()
			.optional()
			.default('Międzynarodowa Platforma Obrony K9'),
		pwa_theme_color: z.string().optional().default('#0F1720'),
		pwa_background_color: z.string().optional().default('#0F1720'),
		cookie_consent_active: z.boolean().optional().default(false),
		apple_touch_icon: z.string().optional().default('/apple-touch-icon.png'),
		favicon_svg: z.string().optional().default('/favicon.svg'),
		favicon_ico: z.string().optional().default('/favicon.ico'),
		og_image_default: z.string().optional().default('/og-cerberus-k9-2026.jpg'),
		og_image_width: z.string().optional().default('1200'),
		og_image_height: z.string().optional().default('630'),
		og_image_alt: z
			.string()
			.optional()
			.default('CERBERUS K9 2026 — Międzynarodowa Platforma Obrony'),
		og_site_name: z.string().optional().default('CERBERUS K9'),
		og_locale: z.string().optional().default('pl_PL'),
		event_timezone: z.string().optional().default('Europe/Warsaw'),
		gallery_unlock_date: z.preprocess(dateToString, z.string()).optional().default('2026-06-14'),
		sponsor_offer_pdf: z.string().optional().default(''),
		sponsor_contact_email: z.string().optional().default('sebastian@pactak9.org'),
		gallery_video_1_title: z.string().optional().default(''),
		gallery_video_1_url: z.string().optional().default(''),
		gallery_video_1_badge: z.string().optional().default(''),
		gallery_video_2_title: z.string().optional().default(''),
		gallery_video_2_url: z.string().optional().default(''),
		gallery_video_2_badge: z.string().optional().default(''),
		gallery_video_3_title: z.string().optional().default(''),
		gallery_video_3_url: z.string().optional().default(''),
		gallery_video_3_badge: z.string().optional().default(''),
		gallery_video_4_title: z.string().optional().default(''),
		gallery_video_4_url: z.string().optional().default(''),
		gallery_video_4_badge: z.string().optional().default(''),
		hero_tagline: z.string().optional(),
		hero_subline_pl: z.string().optional(),
		/** Opcjonalny podział tytułu H1; gdy puste — użyj `hero_title` z CMS. */
		hero_title_line1: z.string().optional(),
		hero_title_line2: z.string().optional(),
		hero_meta_locations: z.string().optional(),
		hero_meta_delegations: z.string().optional(),
		hero_meta_entry: z.string().optional(),
		pagehero_media_category_pl: z.string().optional(),
		pagehero_media_title_pl: z.string().optional(),
		pagehero_media_subtitle_pl: z.string().optional(),
		pagehero_gallery_category_pl: z.string().optional(),
		pagehero_gallery_title_pl: z.string().optional(),
		pagehero_gallery_subtitle_pl: z.string().optional(),
		pagehero_instructors_category_pl: z.string().optional(),
		pagehero_instructors_title_pl: z.string().optional(),
		pagehero_instructors_subtitle_pl: z.string().optional(),
		pagehero_partners_category_pl: z.string().optional(),
		pagehero_partners_title_pl: z.string().optional(),
		pagehero_partners_subtitle_pl: z.string().optional(),
		pagehero_contact_category_pl: z.string().optional(),
		pagehero_contact_title_pl: z.string().optional(),
		pagehero_contact_subtitle_pl: z.string().optional(),
		pagehero_registration_category_pl: z.string().optional(),
		pagehero_registration_title_pl: z.string().optional(),
		pagehero_registration_subtitle_pl: z.string().optional(),
		pagehero_news_category_pl: z.string().optional(),
		pagehero_news_title_pl: z.string().optional(),
		pagehero_news_subtitle_pl: z.string().optional(),
		pagehero_foundation_category_pl: z.string().optional(),
		pagehero_foundation_title_pl: z.string().optional(),
		pagehero_foundation_subtitle_pl: z.string().optional(),
		participants_registered: z.number().optional(),
		registration_deadline_text: z.string().optional(),
		current_competitor: z.string().optional(),
		grants_approved: z.number().optional(),
		volunteers_count: z.number().optional(),
	}).strict()),
});

function flattenRegistrationInfoCmsInput(raw: unknown): unknown {
	if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return raw;
	const o = { ...(raw as Record<string, unknown>) };
	const nested = o['sekcja_3_kroki_rejestracji'];
	if (nested && typeof nested === 'object' && !Array.isArray(nested)) {
		Object.assign(o, nested as Record<string, unknown>);
		delete o['sekcja_3_kroki_rejestracji'];
	}
	return o;
}

const registration_info = defineCollection({
	loader: glob({ base: './src/content', pattern: 'registration_info.{yml,yaml}' }),
	schema: z.preprocess(flattenRegistrationInfoCmsInput, z.object({
		reg_date_display: z.string(),
		reg_prep_day: z.string().optional().default(''),
		reg_venues: z.string(),
		reg_city: z.string(),
		reg_contact_email: z.string(),
		reg_contact_phone: z.string(),
		reg_entry_text: z.string().optional().default(''),
		reg_deadline_text: z.string().optional().default(''),
		reg_limit_text: z.string().optional().default(''),
		reg_step_1_pl: z.string().optional().default(''),
		reg_step_2_pl: z.string().optional().default(''),
		reg_step_3_pl: z.string().optional().default(''),
	})),
});

function flattenKontaktCmsInput(raw: unknown): unknown {
	if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return raw;
	const o = { ...(raw as Record<string, unknown>) };
	const nested = o['sekcja_formularz'];
	if (nested && typeof nested === 'object' && !Array.isArray(nested)) {
		Object.assign(o, nested as Record<string, unknown>);
		delete o['sekcja_formularz'];
	}
	return o;
}

const kontakt_content = defineCollection({
	loader: glob({ base: './src/content', pattern: 'kontakt_content.{yml,yaml}' }),
	schema: z.preprocess(flattenKontaktCmsInput, z.object({
		contact_address: z.string(),
		contact_email: z.string(),
		contact_phone: z.string(),
		contact_map_embed_url: z.string().optional().default(''),
		contact_gdpr_text_pl: z.string(),
		contact_gdpr_text_en: z.string(),
		contact_form_endpoint: z.string().optional().default(''),
		contact_form_recipient: z.string(),
		media_contact_name: z.string().optional().default(''),
		media_contact_phone: z.string().optional().default(''),
		media_contact_email: z.string().optional().default(''),
		president_email: z.string().optional().default(''),
		accreditation_deadline: z.string().optional().default(''),
		partner_cta_href: z.string().optional().default(''),
		sponsor_offer_pdf: z.string().optional().default(''),
		sponsor_contact_email: z.string().optional().default(''),
		form_name_label_pl: z.string().optional().default('IMIĘ I NAZWISKO'),
		form_email_label_pl: z.string().optional().default('ADRES E-MAIL'),
		form_subject_label_pl: z.string().optional().default('TEMAT'),
		form_message_label_pl: z.string().optional().default('TREŚĆ WIADOMOŚCI'),
		form_submit_label_pl: z.string().optional().default('WYŚLIJ WIADOMOŚĆ'),
		form_success_pl: z.string().optional().default('Dziękujemy! Odpowiemy w ciągu 24 godzin.'),
		form_error_pl: z.string().optional().default('Nie udało się wysłać formularza. Spróbuj ponownie za chwilę.'),
		form_subject_options_pl: z.string().optional().default('Rejestracja,Sponsorowanie,Patronat medialny,Instruktorzy,Prasa i media,Inne'),
		section_media_title_pl: z.string().optional().default('BEZPOŚREDNI KONTAKT'),
		section_partnership_title_pl: z.string().optional().default('Zostań partnerem'),
	})),
});

const international_hero = defineCollection({
	loader: glob({ base: './src/content/international', pattern: 'hero.{yml,yaml}' }),
	schema: z.object({
		tag_en: z.string(),
		tag_pl: z.string().optional(),
		title_en: z.string(),
		subtitle_en: z.string(),
		body_en: z.string(),
		cta_register_en: z.string(),
		cta_program_en: z.string(),
	}),
});

const international_protocol = defineCollection({
	loader: glob({ base: './src/content/international', pattern: 'protocol.{yml,yaml}' }),
	schema: z.object({
		items: z.array(
			z.object({
				title_en: z.string(),
				title_pl: z.string().optional(),
				body_en: z.string(),
				body_pl: z.string().optional(),
			}),
		),
	}),
});

const international_contact = defineCollection({
	loader: glob({ base: './src/content/international', pattern: 'contact.{yml,yaml}' }),
	schema: z.object({
		name: z.string(),
		title_en: z.string(),
		email: z.string(),
		phone: z.string(),
		response_time_en: z.string(),
	}),
});

const international_faq = defineCollection({
	loader: glob({ base: './src/content/international_faq', pattern: '*.{yml,yaml}' }),
	schema: z.object({
		question_en: z.string(),
		answer_en: z.string(),
		order: z.number().int().optional().default(99),
	}),
});

const delegations = defineCollection({
	loader: glob({ base: './src/content/delegations', pattern: '*.{yml,yaml}' }),
	schema: z.object({
		country: z.string(),
		country_code: z.string().length(2),
		unit: z.string().optional(),
		specialization: z.string().optional(),
		year_participating: z.number().int().optional(),
		confirmed: z.boolean().default(true),
		order: z.number().int().default(99),
	}).strict(),
});

const faq = defineCollection({
	loader: glob({ base: './src/content/faq', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		question_pl: z.string(),
		answer_pl: z.string(),
		question_en: z.string().optional(),
		answer_en: z.string().optional(),
		category: z.enum(ENUM_FAQ_CATEGORIES).optional().default('Inne'),
		order: z.number().optional().default(99),
		active: z.boolean().optional().default(true),
	}),
});

const team = defineCollection({
	loader: glob({ base: './src/content/team', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		name: z.string(),
		role: z.string(),
		photo: z.string().optional(),
		unit: z.string().optional(),
		bio_short: z.string(),
		email: z.string().optional(),
		linkedin: z.string().optional(),
		active: z.boolean().optional().default(true),
		order: z.number().optional().default(99),
	}),
});

const galleryCategoryValues = [
	'HARDEST_HIT',
	'SZKOLENIA_K9',
	'PIERWSZA_POMOC',
	'TCCC',
	'KONFERENCJA',
	'DRONY',
	'CEREMONIA',
	'SAR',
	'OGOLNE',
] as const;

type GalleryCategoryValue = (typeof galleryCategoryValues)[number];

/** Maps legacy frontmatter (pre-canonical) and CMS values to the canonical enum. */
function preprocessGalleryCategory(val: unknown): GalleryCategoryValue | undefined {
	if (val === undefined || val === null) return undefined;
	const raw = String(val).trim();
	if (!raw) return undefined;
	if ((galleryCategoryValues as readonly string[]).includes(raw)) {
		return raw as GalleryCategoryValue;
	}
	const legacy: Record<string, GalleryCategoryValue> = {
		'HARDEST HIT': 'HARDEST_HIT',
		'SZKOLENIA K9': 'SZKOLENIA_K9',
		'PIERWSZA POMOC': 'PIERWSZA_POMOC',
		'OGÓLNE': 'OGOLNE',
	};
	return legacy[raw];
}

const galleryCategorySchema = z.preprocess(
	preprocessGalleryCategory,
	z.enum(galleryCategoryValues).optional(),
);

function normalizeGalleryTags(val: unknown): string[] {
	if (!Array.isArray(val)) return [];
	return val
		.map((item) => {
			if (typeof item === 'string') return item;
			if (item && typeof item === 'object' && 'tag' in (item as Record<string, unknown>)) {
				const t = (item as { tag?: unknown }).tag;
				return typeof t === 'string' ? t : '';
			}
			return '';
		})
		.filter(Boolean);
}

const galeria = defineCollection({
	loader: glob({ base: './src/content/galeria', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string().optional().default(''),
		date: z.preprocess(dateToString, z.string()).optional(),
		category: galleryCategorySchema,
		location: z.string().optional().default(''),
		edition: z.string().default('2026'),
		photo: z.string().optional().default(''),
		alt: z.string().optional().default(''),
		tags: z.preprocess(normalizeGalleryTags, z.array(z.string()).optional()),
		order: z.number().int().optional(),
		active: z.boolean().optional().default(true),
		needs_review: z.boolean().optional().default(false),
		media_type: z.enum(['photo', 'video', 'press']).optional().default('photo'),
		video_url: z.string().optional(),
		video_platform: z.enum(['youtube', 'vimeo']).optional().default('youtube'),
		video_thumbnail: z.string().optional(),
		press_outlet: z.string().optional(),
		press_outlet_logo: z.string().optional(),
		press_url: z.string().optional(),
		press_date: z.string().optional(),
		press_description: z.string().optional(),
	}),
});

const galleryEditions = defineCollection({
	loader: glob({ pattern: '**/*.yml', base: './src/content/gallery_editions' }),
	schema: z.object({
		value: z.string(),
		label_pl: z.string(),
		label_en: z.string().optional(),
		date_start: z.preprocess(dateToString, z.string()).optional(),
		order: z.number().optional().default(10),
		active: z.boolean().optional().default(true),
	}),
});

const galleryLocations = defineCollection({
	loader: glob({ pattern: '**/*.yml', base: './src/content/gallery_locations' }),
	schema: z.object({
		value: z.string(),
		label_pl: z.string(),
		label_en: z.string().optional(),
		address: z.string().optional(),
		map_url: z.string().optional(),
		order: z.number().optional().default(10),
		active: z.boolean().optional().default(true),
	}),
});

const galleryTags = defineCollection({
	loader: glob({ pattern: '**/*.yml', base: './src/content/gallery_tags' }),
	schema: z.object({
		key: z.string(),
		label_pl: z.string(),
		label_en: z.string().optional(),
		label_de: z.string().optional(),
		color: z.string().optional(),
		active: z.boolean().optional().default(true),
	}),
});

const ambasadorzy = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: './src/content/ambasadorzy' }),
  schema: z.object({
    name: z.string(),
    role_pl: z.string(),
    role_en: z.string(),
    country: z.string(),
    country_code: COUNTRY_CODE,
    photo: z.string(),
    bio_short_pl: z.string(),
    bio_short_en: z.string(),
    bio_full_pl: z.string().optional(),
    bio_full_en: z.string().optional(),
    order: z.number().int().nonnegative().default(99),
    tags: z.array(z.string()).default([]),
    isVisible: z.boolean().optional().default(true),
    social_facebook: z.string().optional(),
    social_linkedin: z.string().optional(),
    social_instagram: z.string().optional(),
    linkedin_url: z.string().optional(),
  }).strict(),
});

const certyfikaty = defineCollection({
	loader: glob({ pattern: '**/*.yml', base: './src/content/certyfikaty' }),
	schema: z.object({
		certificate_id: z.string(),
		participant_name: z.string(),
		participant_email: z.string(),
		module: z.enum(ENUM_MODULE_CATEGORIES),
		issue_date: z.coerce.date(),
		valid_until: z.coerce.date().optional(),
		instructor_name: z.string().optional(),
		qr_data: z.string(),
		signature_url: z.string().optional(),
	}).strict(),
});

const szkolenia = defineCollection({
  loader: glob({ pattern: '**/*.{md,yml}', base: './src/content/szkolenia' }),
  schema: z.object({
    title_pl: z.string(),
    title_en: z.string(),
    category: z.enum(ENUM_MODULE_CATEGORIES),
    description_pl: z.string(),
    description_en: z.string(),
    duration_hours: z.number().nonnegative(),
    max_participants: z.number().int().nonnegative(),
    target_audience: z.enum(ENUM_AUDIENCE_TYPES),
    instructor_id: z.string().optional(),
    schedule: z.array(z.object({
      day: z.coerce.date(),
      time_start: z.string(),
      time_end: z.string(),
    }).strict()).default([]),
    price_pln: z.number().nonnegative().optional(),
    photo: z.string(),
    order: z.number().int().nonnegative().default(99),
    isVisible: z.boolean().default(true),
  }).strict(),
});

const liveUpdates = defineCollection({
	loader: glob({ pattern: '**/*.yml', base: './src/content/live_updates' }),
	schema: z.object({
		timestamp: z.coerce.date(),
		severity: z.enum(ENUM_LIVE_SEVERITY),
		title_pl: z.string(),
		title_en: z.string(),
		message_pl: z.string(),
		message_en: z.string(),
		source: z.enum(ENUM_LIVE_SOURCE),
		photo: z.string().optional(),
		isPinned: z.boolean().default(false),
		isPublic: z.boolean().default(true),
	}).strict(),
});

const hardestHitResults = defineCollection({
	loader: glob({ pattern: '**/*.yml', base: './src/content/hardest_hit_results' }),
	schema: z.object({
		edition: z.enum(ENUM_EDITION),
		competitor_name: z.string(),
		country: z.string(),
		country_code: COUNTRY_CODE,
		category: z.enum(ENUM_MODULE_CATEGORIES),
		score: z.number(),
		time_seconds: z.number().nonnegative().optional(),
		rank: z.number().int().nonnegative(),
		dog_name: z.string().optional(),
		dog_breed: z.string().optional(),
		photo: z.string().optional(),
		video_url: z.string().optional(),
	}).strict(),
});

const sponsorMaterials = defineCollection({
	loader: glob({ pattern: '**/*.yml', base: './src/content/sponsor_materials' }),
	schema: z.object({
		title: z.string(),
		file: z.string(),
		category: z.enum(ENUM_SPONSOR_MATERIAL_CATEGORY),
		description: z.string().optional(),
		target_audience: z.enum(ENUM_SPONSOR_TARGET),
		file_size_mb: z.number().nonnegative(),
		language: z.enum(['pl', 'en', 'both']),
	}).strict(),
});

const pressPhotos = defineCollection({
	loader: glob({ pattern: '**/*.yml', base: './src/content/press_photos' }),
	schema: z.object({
		title_pl: z.string(),
		title_en: z.string(),
		photo: z.string(),
		photo_high_res: z.string().optional(),
		caption_pl: z.string().optional(),
		caption_en: z.string().optional(),
		photographer: z.string().optional(),
		license: z.enum(ENUM_LICENSE),
		download_url: z.string(),
		file_size_mb: z.number().nonnegative().optional(),
		dimensions: z.string().optional(),
	}).strict(),
});

const partnerOffers = defineCollection({
	loader: glob({ pattern: '**/*.yml', base: './src/content/partner_offers' }),
	schema: z.object({
		partner_name: z.string(),
		partner_id: z.string(),
		offer_title_pl: z.string(),
		offer_title_en: z.string(),
		offer_description_pl: z.string(),
		offer_description_en: z.string(),
		discount_value: z.string().optional(),
		discount_code: z.string().optional(),
		valid_from: z.coerce.date(),
		valid_until: z.coerce.date(),
		target_audience: z.enum(ENUM_AUDIENCE_TYPES),
		claim_link: z.string().optional(),
	}).strict(),
});

const homepage_cards = defineCollection({
	loader: glob({ base: './src/content/homepage_cards', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		category: z.enum(['K9', 'TCCC', 'DRONY', 'KONFERENCJA']),
		icon: z.string().optional(),
		color: z.string().optional(),
		title_pl: z.string(),
		description_pl: z.string(),
		badge_pl: z.string().optional(),
		title_en: z.string().optional(),
		description_en: z.string().optional(),
		badge_en: z.string().optional(),
		title_de: z.string().optional(),
		description_de: z.string().optional(),
		badge_de: z.string().optional(),
		title_fr: z.string().optional(),
		description_fr: z.string().optional(),
		badge_fr: z.string().optional(),
		title_hr: z.string().optional(),
		description_hr: z.string().optional(),
		badge_hr: z.string().optional(),
		title_cs: z.string().optional(),
		description_cs: z.string().optional(),
		badge_cs: z.string().optional(),
		title_lt: z.string().optional(),
		description_lt: z.string().optional(),
		badge_lt: z.string().optional(),
		title_lv: z.string().optional(),
		description_lv: z.string().optional(),
		badge_lv: z.string().optional(),
		title_sk: z.string().optional(),
		description_sk: z.string().optional(),
		badge_sk: z.string().optional(),
		title_sl: z.string().optional(),
		description_sl: z.string().optional(),
		badge_sl: z.string().optional(),
		title_hu: z.string().optional(),
		description_hu: z.string().optional(),
		badge_hu: z.string().optional(),
		title_no: z.string().optional(),
		description_no: z.string().optional(),
		badge_no: z.string().optional(),
		title_sv: z.string().optional(),
		description_sv: z.string().optional(),
		badge_sv: z.string().optional(),
		title_nl: z.string().optional(),
		description_nl: z.string().optional(),
		badge_nl: z.string().optional(),
		title_es: z.string().optional(),
		description_es: z.string().optional(),
		badge_es: z.string().optional(),
		title_pt: z.string().optional(),
		description_pt: z.string().optional(),
		badge_pt: z.string().optional(),
		title_ro: z.string().optional(),
		description_ro: z.string().optional(),
		badge_ro: z.string().optional(),
		title_it: z.string().optional(),
		description_it: z.string().optional(),
		badge_it: z.string().optional(),
		title_ko: z.string().optional(),
		description_ko: z.string().optional(),
		badge_ko: z.string().optional(),
		order: z.number().optional().default(1),
		active: z.boolean().optional().default(true),
	}),
});

const homepage_stats = defineCollection({
	loader: glob({ base: './src/content/homepage_stats', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		stat_key: z.string(),
		value: z.string(),
		labels: z.object({
			pl: z.string(),
			en: z.string(),
			de: z.string().optional(),
			fr: z.string().optional(),
			hr: z.string().optional(),
			cs: z.string().optional(),
			lt: z.string().optional(),
			lv: z.string().optional(),
			sk: z.string().optional(),
			sl: z.string().optional(),
			hu: z.string().optional(),
			no: z.string().optional(),
			sv: z.string().optional(),
			nl: z.string().optional(),
			es: z.string().optional(),
			pt: z.string().optional(),
			ro: z.string().optional(),
			it: z.string().optional(),
			ko: z.string().optional(),
		}),
		accent: z.enum(['gold', 'red']).optional().default('gold'),
		order: z.number().optional().default(99),
		active: z.boolean().optional().default(true),
	}),
});

const agenda_ui = defineCollection({
	loader: glob({ base: './src/content/agenda_ui', pattern: '*.{yml,yaml}' }),
	schema: z.object({
		add_to_calendar: z.record(z.string(), z.string()).optional(),
		navigate: z.record(z.string(), z.string()).optional(),
		no_location: z.record(z.string(), z.string()).optional(),
		no_events: z.record(z.string(), z.string()).optional(),
		google_calendar: z.record(z.string(), z.string()).optional(),
		apple_ical: z.record(z.string(), z.string()).optional(),
		instructor_label: z.record(z.string(), z.string()).optional(),
		ics_organizer_name: z.string().optional(),
		ics_organizer_email: z.string().optional(),
		ics_prodid: z.string().optional(),
	}),
});

const fundacjaGoalRow = z.object({ goal: z.string() });
const fundacjaGoalsList = z.preprocess((val) => {
	if (!Array.isArray(val)) return [];
	return val.map((item) => (typeof item === 'string' ? { goal: item } : item));
}, z.array(fundacjaGoalRow));

function flattenFundacjaCmsInput(raw: unknown): unknown {
	if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return raw;
	const o = { ...(raw as Record<string, unknown>) };
	const nested = o['sekcja_o_wydarzeniu'];
	if (nested && typeof nested === 'object' && !Array.isArray(nested)) {
		Object.assign(o, nested as Record<string, unknown>);
		delete o['sekcja_o_wydarzeniu'];
	}
	return o;
}

const fundacja_content = defineCollection({
	loader: glob({ base: './src/content/fundacja_content', pattern: '*.{yml,yaml}' }),
	schema: z.preprocess(flattenFundacjaCmsInput, z.object({
		mission_pl: z.string(),
		mission_en: z.string().optional(),
		vision_pl: z.string(),
		vision_en: z.string().optional(),
		goals_pl: fundacjaGoalsList,
		goals_en: fundacjaGoalsList.optional(),
		registration_court: z.string(),
		registration_date: z.preprocess(dateToString, z.string()),
		legal_status_pl: z.string(),
		about_body_p1_pl: z.string().optional(),
		about_body_p2_pl: z.string().optional(),
		about_stat_1_value: z.string().optional(),
		about_stat_1_label_pl: z.string().optional(),
		about_stat_2_value: z.string().optional(),
		about_stat_2_label_pl: z.string().optional(),
		about_stat_3_value: z.string().optional(),
		about_stat_3_label_pl: z.string().optional(),
		about_stat_4_value: z.string().optional(),
		about_stat_4_label_pl: z.string().optional(),
	})),
});

const instructor_filters = defineCollection({
	loader: glob({ base: './src/content/instructor_filters', pattern: '**/*.yml' }),
	schema: z.object({
		key: z.string(),
		label_pl: z.string(),
		label_en: z.string().optional().default(''),
		label_de: z.string().optional().default(''),
		label_fr: z.string().optional().default(''),
		filter_field: z.enum(['specializations', 'type', 'module', 'languages', 'all']),
		filter_match: z.enum(['includes', 'equals', 'any_of', 'none']).optional().default('includes'),
		filter_value: z.string().optional().default(''),
		filter_values: z.array(z.string()).optional().default([]),
		order: z.number().optional().default(10),
		active: z.boolean().optional().default(true),
	}),
});

const partner_sections = defineCollection({
	loader: glob({ base: './src/content/partner_sections', pattern: '**/*.yml' }),
	schema: z.object({
		key: z.string(),
		label_pl: z.string(),
		label_en: z.string().optional().default(''),
		label_de: z.string().optional().default(''),
		cms_type_value: z.string().optional().default(''),
		show_if_empty: z.boolean().optional().default(false),
		order: z.number().optional().default(10),
		active: z.boolean().optional().default(true),
	}),
});

const gallery_filters = defineCollection({
	loader: glob({ base: './src/content/gallery_filters', pattern: '**/*.yml' }),
	schema: z.object({
		key: z.string(),
		label_pl: z.string(),
		label_en: z.string().optional().default(''),
		label_de: z.string().optional().default(''),
		category_value: z.string().optional().default(''),
		order: z.number().optional().default(10),
		active: z.boolean().optional().default(true),
	}),
});

const navLinkTargetSchema = z
	.union([z.enum(['_self', '_blank']), z.boolean()])
	.optional()
	.transform((v): '_self' | '_blank' => {
		if (v === true || v === '_blank') return '_blank';
		return '_self';
	});

const navLinkItemSchema = z
	.object({
		key: z.string(),
		label_pl: z.string(),
		label_en: z.string(),
		path: z.string().optional(),
		href: z.string().optional(),
		target: navLinkTargetSchema,
		highlight: z.boolean().optional(),
		icon: z.string().optional(),
		flag: z.string().optional(),
		label_de: z.string().optional(),
		label_fr: z.string().optional(),
		order: z.number(),
		active: z.boolean().optional().default(true),
	})
	.refine((d) => {
		const p = d.path?.trim();
		const h = d.href?.trim();
		return Boolean((p && p.length > 0) || (h && h.length > 0));
	}, 'Each nav link needs a non-empty path or href');

const nav_links = defineCollection({
	loader: glob({ base: './src/content/nav_links', pattern: '*.{yml,yaml}' }),
	schema: z.object({
		links: z.array(navLinkItemSchema),
	}),
});

const registration_paths = defineCollection({
	loader: glob({ base: './src/content/registration_paths', pattern: '**/*.yml' }),
	schema: z
		.object({
			slug: z.string(),
			ticket_type: z.string(),
			tag_pl: z.string(),
			tag_en: z.string(),
			title_pl: z.string(),
			title_en: z.string(),
			audience_pl: z.string(),
			audience_en: z.string(),
			color_token: z.enum(['red', 'blue', 'green', 'purple', 'orange', 'gold']),
			max_participants: z.number().int().nullable().optional(),
			items_pl: z.array(z.string()),
			items_en: z.array(z.string()),
			pretix_direct_url: z.string().optional(),
			order: z.number().int().default(99),
			isVisible: z.boolean().default(true),
		})
		.strict(),
});

const timeline = defineCollection({
	loader: glob({ base: './src/content/timeline', pattern: '**/*.yml' }),
	schema: z
		.object({
			year: z.number().int(),
			status: z.enum(['completed', 'current', 'planned', 'vision']),
			color_token: z.enum(['gold', 'red', 'navyBorder', 'blue', 'green', 'purple', 'orange']),
			pulse: z.boolean().default(false),
			order: z.number().int().default(99),
			isVisible: z.boolean().default(true),
			title_pl: z.string(),
			title_en: z.string(),
			subtitle_pl: z.string().optional(),
			subtitle_en: z.string().optional(),
		})
		.strict(),
});

const testimonials = defineCollection({
	loader: glob({ base: './src/content/testimonials', pattern: '**/*.yml' }),
	schema: z
		.object({
			quote_pl: z.string(),
			quote_en: z.string(),
			name_pl: z.string(),
			name_en: z.string().optional(),
			initials: z.string().optional(),
			photo: z.string().optional(),
			order: z.number().int().optional().default(99),
			isVisible: z.boolean().optional().default(true),
		})
		.strict(),
});

const locations = defineCollection({
	loader: glob({ base: './src/content/locations', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		name: z.string(),
		address: z.string().optional(),
		description_pl: z.string(),
		description_en: z.string().optional(),
		description_de: z.string().optional(),
		description_fr: z.string().optional(),
		description_hr: z.string().optional(),
		description_cs: z.string().optional(),
		description_lt: z.string().optional(),
		description_lv: z.string().optional(),
		description_sk: z.string().optional(),
		description_sl: z.string().optional(),
		description_hu: z.string().optional(),
		description_no: z.string().optional(),
		description_sv: z.string().optional(),
		description_nl: z.string().optional(),
		description_es: z.string().optional(),
		description_pt: z.string().optional(),
		description_ro: z.string().optional(),
		description_it: z.string().optional(),
		description_ko: z.string().optional(),
		modules_pl: z.string().optional(),
		modules_en: z.string().optional(),
		modules_de: z.string().optional(),
		modules_fr: z.string().optional(),
		status: z.enum(['POTWIERDZONE', 'W TRAKCIE ROZMÓW', 'PLANOWANE']).optional().default('POTWIERDZONE'),
		image: z.string().optional(),
		map_url: z.string().optional(),
		order: z.number().optional().default(1),
		active: z.boolean().optional().default(true),
	}),
});

export const collections = {
	i18n_strings,
	instructor_filters,
	partner_sections,
	registration_paths,
	timeline,
	testimonials,
	gallery_filters,
	galleryEditions,
	galleryLocations,
	galleryTags,
	ambasadorzy,
	certyfikaty,
	szkolenia,
	liveUpdates,
	hardestHitResults,
	sponsorMaterials,
	pressPhotos,
	partnerOffers,
	instruktorzy,
	partnerzy,
	blog,
	aktualnosci,
	media_archive,
	press_releases,
	galeria,
	program,
	ustawienia,
	faq,
	team,
	homepage_cards,
	homepage_stats,
	locations,
	agenda_categories,
	agenda_ui,
	fundacja_content,
	nav_links,
	registration_info,
	kontakt_content,
	international_hero,
	international_protocol,
	international_contact,
	international_faq,
	delegations,
};
