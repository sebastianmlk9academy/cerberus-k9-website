import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

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
	if (!Array.isArray(val)) return [];
	return val
		.map((x) => {
			if (typeof x === 'string') return x;
			if (x && typeof x === 'object' && 'spec' in (x as Record<string, unknown>)) {
				const s = (x as { spec?: unknown }).spec;
				return typeof s === 'string' ? s : '';
			}
			return '';
		})
		.filter(Boolean);
}

const instruktorzy = defineCollection({
	loader: glob({ base: './src/content/instruktorzy', pattern: '**/*.{md,mdx,json,yml,yaml}' }),
	schema: z.object({
		name: z.string(),
		role: z.string().optional(),
		country: z.string(),
		countryCode: z.string().length(2),
		specializations: z.preprocess(normalizeInstructorSpecializations, z.array(z.string())),
		unit: z.string().optional(),
		module: z.string().optional(),
		schedule: z.string().optional(),
		languages: z.string().optional(),
		type: z.string().optional(),
		linkedinUrl: z.string().optional(),
		showOnHomepage: z.boolean().optional(),
		confirmed: z.enum(['confirmed', 'pending', 'hidden']).optional().default('confirmed'),
		needs_review: z.boolean().optional().default(false),
		bioShort: z.string(),
		bioFull: z.string(),
		photo: z.string(),
		order: z.number().int(),
	}),
});

const partnerTypeSchema = z.preprocess(
	(val) => (val === 'Patron-Medialny' ? 'Patron Medialny' : val),
	z.enum(['Patron Medialny', 'Strategiczny', 'Sponsor', 'Technologiczny']).optional().default('Strategiczny'),
);

const partnerzy = defineCollection({
	loader: glob({ base: './src/content/partnerzy', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		name: z.string().optional(),
		type: partnerTypeSchema,
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

const program = defineCollection({
	loader: glob({ base: './src/content/program', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		day: z.string(),
		time_start: z.string().regex(/^\d{2}:\d{2}$/),
		time_end: z.string().regex(/^\d{2}:\d{2}$/),
		title: z.string(),
		location: z.string().optional().default(''),
		locationMapUrl: z.string().optional().default(''),
		category: z.string(),
		description: z.string().optional().default(''),
		instructor: z.string().optional().default(''),
		is_break: z.boolean().optional().default(false),
		order: z.number().optional().default(99),
		active: z.boolean().optional().default(true),
		needs_review: z.boolean().optional().default(false),
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
	'sekcja_grafika',
] as const;

function flattenUstawieniaCmsInput(raw: unknown): unknown {
	if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return raw;
	const o = { ...(raw as Record<string, unknown>) };
	const fromSections: Record<string, unknown> = {};
	for (const sk of USTAWIENIA_SECTION_KEYS) {
		const nest = o[sk];
		if (nest && typeof nest === 'object' && !Array.isArray(nest)) {
			Object.assign(fromSections, nest as Record<string, unknown>);
			delete o[sk];
		}
	}
	const merged = { ...o, ...fromSections } as Record<string, unknown>;
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
	return merged;
}

const ustawienia = defineCollection({
	loader: glob({ base: './src/content', pattern: 'ustawienia.{yml,yaml}' }),
	schema: z.preprocess(flattenUstawieniaCmsInput, z.object({
		event_date: z.string(),
		event_date_end: z.string(),
		event_time_start: z.string().regex(/^\d{2}:\d{2}$/).optional().default('09:00'),
		event_time_end: z.string().regex(/^\d{2}:\d{2}$/).optional().default('18:00'),
		event_city: z.string(),
		event_venue: z.string(),
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
		plausible_domain: z.string(),
		registration_active: z.boolean().default(true),
		hero_cta_registration_href: z.string().optional(),
		hero_cta_program_href: z.string().optional(),
		hardest_hit_active: z.boolean().default(true),
		notification_bar_active: z.boolean().default(false),
		notification_bar_text: z.string().optional(),
		notification_bar_url: z.string().optional(),
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
		gallery_unlock_date: z.string().optional().default('2026-06-14'),
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
		participants_registered: z.number().optional(),
		registration_deadline_text: z.string().optional(),
		current_competitor: z.string().optional(),
		grants_approved: z.number().optional(),
		volunteers_count: z.number().optional(),
	})),
});

const registration_info = defineCollection({
	loader: glob({ base: './src/content', pattern: 'registration_info.{yml,yaml}' }),
	schema: z.object({
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
	}),
});

const kontakt_content = defineCollection({
	loader: glob({ base: './src/content', pattern: 'kontakt_content.{yml,yaml}' }),
	schema: z.object({
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
	}),
});

const faq = defineCollection({
	loader: glob({ base: './src/content/faq', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		question_pl: z.string(),
		answer_pl: z.string(),
		question_en: z.string().optional(),
		answer_en: z.string().optional(),
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
		date: z.string().optional(),
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
		date_start: z.string().optional(),
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
		country: z.string(),
		countryCode: z.string(),
		role: z.string().optional(),
		unit: z.string().optional(),
		photo: z.string().optional(),
		bio: z.string().optional(),
		linkedinUrl: z.string().optional(),
		instagram_url: z.string().optional(),
		order: z.number().optional().default(99),
		active: z.boolean().optional().default(true),
		needs_review: z.boolean().optional().default(false),
	}),
});

const certyfikaty = defineCollection({
	loader: glob({ pattern: '**/*.yml', base: './src/content/certyfikaty' }),
	schema: z.object({
		certificate_id: z.string(),
		participant_name: z.string(),
		module: z.string(),
		event_edition: z.string().default('2026'),
		issue_date: z.string(),
		instructor_name: z.string().optional(),
		active: z.boolean().optional().default(true),
	}),
});

const szkolenia = defineCollection({
	loader: glob({ pattern: '**/*.{md,yml}', base: './src/content/szkolenia' }),
	schema: z.object({
		title: z.string(),
		category: z.string(),
		description: z.string().optional(),
		instructor: z.string().optional(),
		date_start: z.string().optional(),
		date_end: z.string().optional(),
		location: z.string().optional(),
		price: z.number().optional(),
		places_total: z.number().optional(),
		registration_url: z.string().optional(),
		image: z.string().optional(),
		featured: z.boolean().optional().default(false),
		order: z.number().optional().default(99),
		active: z.boolean().optional().default(true),
	}),
});

const liveUpdates = defineCollection({
	loader: glob({ pattern: '**/*.yml', base: './src/content/live_updates' }),
	schema: z.object({
		timestamp: z.string(),
		message: z.string(),
		type: z.enum(['info', 'warning', 'result', 'urgent']).default('info'),
		active: z.boolean().optional().default(true),
	}),
});

const hardestHitResults = defineCollection({
	loader: glob({ pattern: '**/*.yml', base: './src/content/hardest_hit_results' }),
	schema: z.object({
		competitor_name: z.string(),
		country: z.string(),
		countryCode: z.string(),
		category: z.string(),
		score: z.string(),
		rank: z.number(),
		round: z.enum(['elimination', 'semifinal', 'final']).default('final'),
		edition: z.string().default('2026'),
		active: z.boolean().optional().default(true),
		needs_review: z.boolean().optional().default(false),
	}),
});

const sponsorMaterials = defineCollection({
	loader: glob({ pattern: '**/*.yml', base: './src/content/sponsor_materials' }),
	schema: z.object({
		title: z.string(),
		file: z.string(),
		description: z.string().optional(),
		edition: z.string().optional(),
		language: z.enum(['pl', 'en', 'de']).default('pl'),
		order: z.number().optional().default(10),
		active: z.boolean().optional().default(true),
	}),
});

const pressPhotos = defineCollection({
	loader: glob({ pattern: '**/*.yml', base: './src/content/press_photos' }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		preview_image: z.string().optional(),
		download_url: z.string(),
		photo_count: z.number().optional(),
		file_size: z.string().optional(),
		author: z.string().optional(),
		license: z.string().optional(),
		edition: z.string().optional(),
		order: z.number().optional().default(10),
		active: z.boolean().optional().default(true),
	}),
});

const partnerOffers = defineCollection({
	loader: glob({ pattern: '**/*.yml', base: './src/content/partner_offers' }),
	schema: z.object({
		partner_name: z.string(),
		offer_title: z.string(),
		offer_description: z.string(),
		discount_code: z.string().optional(),
		offer_url: z.string().optional(),
		valid_until: z.string().optional(),
		category: z.string().optional(),
		order: z.number().optional().default(99),
		active: z.boolean().optional().default(true),
	}),
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

const fundacja_content = defineCollection({
	loader: glob({ base: './src/content/fundacja_content', pattern: '*.{yml,yaml}' }),
	schema: z.object({
		mission_pl: z.string(),
		mission_en: z.string().optional(),
		vision_pl: z.string(),
		vision_en: z.string().optional(),
		goals_pl: fundacjaGoalsList,
		goals_en: fundacjaGoalsList.optional(),
		registration_court: z.string(),
		registration_date: z.string(),
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
	}),
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

const nav_links = defineCollection({
	loader: glob({ base: './src/content/nav_links', pattern: '*.{yml,yaml}' }),
	schema: z.object({
		links: z.array(
			z.object({
				key: z.string(),
				label_pl: z.string(),
				label_en: z.string(),
				path: z.string(),
				target: z.boolean().optional().default(false),
				icon: z.string().optional(),
				label_de: z.string().optional(),
				label_fr: z.string().optional(),
				order: z.number(),
				active: z.boolean().optional().default(true),
			}),
		),
	}),
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
};
