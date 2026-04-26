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

const instruktorzy = defineCollection({
	loader: glob({ base: './src/content/instruktorzy', pattern: '**/*.{md,mdx,json,yml,yaml}' }),
	schema: z.object({
		name: z.string(),
		role: z.string().optional(),
		country: z.string(),
		countryCode: z.string().length(2),
		countryFlag: z.string().optional(),
		specializations: z.array(z.string()),
		unit: z.string().optional(),
		module: z.string().optional(),
		schedule: z.string().optional(),
		languages: z.string().optional(),
		type: z.string().optional(),
		linkedinUrl: z.string().optional(),
		showOnHomepage: z.boolean().optional(),
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
		/** When true, entry is kept for tooling/CMS but excluded from the public partners page. */
		draft: z.boolean().optional(),
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
		category: z.string(),
		description: z.string().optional().default(''),
		instructor: z.string().optional().default(''),
		order: z.number().optional().default(99),
		active: z.boolean().optional().default(true),
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

const ustawienia = defineCollection({
	loader: glob({ base: './src/content', pattern: 'ustawienia.{yml,yaml}' }),
	schema: z.object({
		event_date: z.string(),
		event_date_end: z.string(),
		event_city: z.string(),
		event_venue: z.string(),
		participants_count: z.string(),
		countries_count: z.string(),
		dogs_count: z.string(),
		modules_count: z.string(),
		pretix_url: z.string(),
		hero_video_url: z.string().optional(),
		hero_background_image: z.string().optional(),
		hero_background_opacity: z.coerce.number().optional().default(0.4),
		plausible_domain: z.string(),
		registration_active: z.boolean().default(true),
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
		president_email: z.string().optional().default('mariusz@pactak9.org'),
		map_embed_url: z.string().optional().default(''),
		venue_address: z.string().optional().default(''),
		agenda_page_url: z.string().optional().default('https://cerberusk9.org/pl/o-wydarzeniu'),
		site_url: z.string().optional().default('https://cerberusk9.org'),
		og_image_default: z.string().optional().default('/og-cerberus-k9-2026.jpg'),
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
		order: z.number().optional().default(99),
	}),
});

const galeria = defineCollection({
	loader: glob({ base: './src/content/galeria', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		date: z.string().optional(),
		category: z.enum(['SZKOLENIA K9', 'HARDEST HIT', 'CEREMONIA', 'KONFERENCJA', 'DRONY', 'SAR', 'OGÓLNE']),
		location: z.string(),
		edition: z.enum(['2025', '2026']),
		photo: z.string(),
		alt: z.string(),
		tags: z.array(z.string()).optional(),
		order: z.number().int().optional(),
	}),
});

const homepage_cards = defineCollection({
	loader: glob({ base: './src/content/homepage_cards', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		category: z.enum(['K9', 'TCCC', 'DRONY', 'KONFERENCJA']),
		title_pl: z.string(),
		description_pl: z.string(),
		badge_pl: z.string().optional(),
		title_en: z.string().optional(),
		description_en: z.string().optional(),
		badge_en: z.string().optional(),
		order: z.number().optional().default(1),
		active: z.boolean().optional().default(true),
	}),
});

const locations = defineCollection({
	loader: glob({ base: './src/content/locations', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		name: z.string(),
		address: z.string().optional(),
		description_pl: z.string(),
		description_en: z.string().optional(),
		status: z.enum(['POTWIERDZONE', 'W TRAKCIE ROZMÓW', 'PLANOWANE']).optional().default('POTWIERDZONE'),
		modules_pl: z.string().optional(),
		image: z.string().optional(),
		order: z.number().optional().default(1),
		active: z.boolean().optional().default(true),
	}),
});

export const collections = {
	i18n_strings,
	instruktorzy,
	partnerzy,
	aktualnosci,
	galeria,
	program,
	ustawienia,
	faq,
	team,
	homepage_cards,
	locations,
	agenda_categories,
};
