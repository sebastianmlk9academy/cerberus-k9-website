/**
 * One-off helper: reads flat ustawienia fields from config.yml and prints grouped object widgets.
 * Run: node scripts/build-ustawienia-cms-groups.mjs > /tmp/out.yml
 */
import fs from 'node:fs';

const path = 'public/admin/config.yml';
const lines = fs.readFileSync(path, 'utf8').split(/\r?\n/);
const start = 31; // line 32 0-based
const end = 814; // line 815
const slice = lines.slice(start, end + 1);

const blocks = [];
let buf = [];
for (const line of slice) {
	if (/^          - name: /.test(line) && buf.length) {
		blocks.push(buf.join('\n'));
		buf = [line];
	} else buf.push(line);
}
if (buf.length) blocks.push(buf.join('\n'));

const byName = new Map();
for (const b of blocks) {
	const m = b.match(/^          - name: "([^"]+)"/m);
	if (m) byName.set(m[1], b);
}

const groups = [
	{
		name: 'sekcja_wydarzenie',
		label: '📅 Wydarzenie (data, miejsce, strefa)',
		collapsed: false,
		keys: [
			'event_date',
			'event_date_end',
			'event_city',
			'event_venue',
			'event_time_start',
			'event_time_end',
			'event_timezone',
		],
	},
	{
		name: 'sekcja_hero',
		label: '🦁 Hero strony głównej',
		collapsed: false,
		keys: [
			'hero_tagline',
			'hero_title',
			'hero_subtitle',
			'hero_year',
			'event_location',
			'event_date_display',
			'hero_meta_locations',
			'hero_meta_delegations',
			'hero_meta_entry',
			'hero_background_image',
			'hero_background_opacity',
			'registration_active',
			'hero_cta_registration_href',
			'hero_cta_program_href',
			'hero_video_href',
			'hero_video_title',
			'hero_close_label_pl',
			'hero_video_url',
		],
	},
	{
		name: 'sekcja_statystyki',
		label: '📊 Statystyki (liczby na stronie głównej)',
		collapsed: true,
		keys: [
			'participants_count',
			'countries_count',
			'dogs_count',
			'modules_count',
			'participants_registered',
			'grants_approved',
			'volunteers_count',
		],
	},
	{
		name: 'sekcja_wideo',
		label: '🎬 Wideo (strona główna + fallback galerii)',
		collapsed: true,
		keys: [
			'main_video_youtube',
			'main_video_title',
			'video_url_2',
			'video_badge_2',
			'video_url_3',
			'video_badge_3',
			'video_url_4',
			'video_badge_4',
			'video_badge_1',
			'gallery_video_1_title',
			'gallery_video_1_url',
			'gallery_video_1_badge',
			'gallery_video_2_title',
			'gallery_video_2_url',
			'gallery_video_2_badge',
			'gallery_video_3_title',
			'gallery_video_3_url',
			'gallery_video_3_badge',
			'gallery_video_4_title',
			'gallery_video_4_url',
			'gallery_video_4_badge',
		],
	},
	{
		name: 'sekcja_rejestracja',
		label: '🎟️ Rejestracja i partner CTA',
		collapsed: true,
		keys: [
			'pretix_url',
			'registration_deadline_text',
			'registration_date_display',
			'registration_prep_day',
			'registration_venues',
			'registration_city',
			'registration_contact_email',
			'registration_contact_phone',
			'partner_cta_href',
			'partner_cta_href_full',
			'accreditation_deadline',
		],
	},
	{
		name: 'sekcja_live',
		label: '🔴 Tryb LIVE i powiadomienia',
		collapsed: true,
		keys: [
			'live_mode_active',
			'current_competitor',
			'notification_bar_active',
			'notification_bar_text',
			'notification_bar_url',
			'gallery_unlock_date',
		],
	},
	{
		name: 'sekcja_social',
		label: '🌐 Social media',
		collapsed: true,
		keys: [
			'social_facebook',
			'social_youtube',
			'social_instagram',
			'social_linkedin',
			'social_twitter',
			'twitter_handle',
		],
	},
	{
		name: 'sekcja_kontakt',
		label: '✉️ Stopka, kontakt, media, sponsor',
		collapsed: true,
		keys: [
			'footer_email',
			'footer_phone',
			'footer_address',
			'footer_foundation_name',
			'footer_domains',
			'media_contact_name',
			'media_contact_phone',
			'media_contact_email',
			'president_email',
			'press_kit_zip',
			'press_pdf_polska_zbrojna',
			'press_pdf_special_ops',
			'sponsor_offer_pdf',
			'sponsor_contact_email',
			'contact_map_embed_url',
			'contact_form_endpoint',
			'contact_form_recipient',
			'contact_gdpr_text_pl',
			'contact_gdpr_text_en',
			'venue_address',
			'map_embed_url',
			'contact_phone_sebastian',
			'contact_phone_mariusz',
			'contact_president_email',
			'contact_address_street',
			'contact_address_city',
			'contact_address_zip',
			'contact_venue_address',
			'agenda_page_url',
		],
	},
	{
		name: 'sekcja_dane_rejestrowe',
		label: '📋 Dane rejestrowe (KRS, NIP, statut)',
		collapsed: true,
		keys: ['krs_number', 'nip_number', 'regon_number', 'statute_pdf', 'krs_url'],
	},
	{
		name: 'sekcja_seo',
		label: '🔍 SEO, OG, analytics, cookies',
		collapsed: true,
		keys: [
			'site_url',
			'og_image_default',
			'og_site_name',
			'plausible_domain',
			'og_image_width',
			'og_image_height',
			'og_image_alt',
			'og_locale',
			'cookie_consent_active',
		],
	},
	{
		name: 'sekcja_grafika',
		label: '🖼️ Logo, ikony, PWA, marka, galeria',
		collapsed: true,
		keys: [
			'nav_logo',
			'nav_logo_alt',
			'apple_touch_icon',
			'favicon_svg',
			'favicon_ico',
			'pwa_name',
			'pwa_short_name',
			'pwa_description',
			'pwa_theme_color',
			'pwa_background_color',
			'brand_name',
			'brand_tagline',
			'default_news_image',
			'instructor_placeholder_photo',
			'hardest_hit_active',
		],
	},
];

const used = new Set();
let out = '';
for (const g of groups) {
	out += `          - name: "${g.name}"\n`;
	out += `            label: "${g.label}"\n`;
	out += `            widget: "object"\n`;
	out += `            collapsed: ${g.collapsed}\n`;
	out += `            fields:\n`;
	for (const k of g.keys) {
		const b = byName.get(k);
		if (!b) throw new Error(`Missing field block: ${k}`);
		used.add(k);
		const inner = b
			.split('\n')
			.map((ln) => (ln ? ln.replace(/^          /, '              ') : ln))
			.join('\n');
		out += inner + '\n';
	}
	out += '\n';
}

const all = [...byName.keys()];
const missing = all.filter((k) => !used.has(k));
if (missing.length) throw new Error('Fields not placed in any group: ' + missing.join(', '));

const outPath = process.argv[2] || 'scripts/_ustawienia-grouped.yml';
fs.writeFileSync(outPath, out, 'utf8');
console.error('Wrote', outPath, Buffer.byteLength(out, 'utf8'), 'bytes');
