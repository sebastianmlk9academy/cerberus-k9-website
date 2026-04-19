import { locales } from '../../locales.mjs';
import type { Lang, UiKey, UiStrings } from './ui';
import { ui } from './ui';

export { locales };

export function getLangFromUrl(url: URL): Lang {
	const segment = url.pathname.split('/').filter(Boolean)[0];
	if (segment && isLang(segment)) return segment;
	return 'pl';
}

export function isLang(value: string): value is Lang {
	return (locales as readonly string[]).includes(value);
}

/**
 * Strips the leading locale segment from a pathname when it matches a configured locale.
 */
export function getPathWithoutLocale(pathname: string): string {
	const parts = pathname.split('/').filter(Boolean);
	if (parts.length === 0) return '';
	if (isLang(parts[0]!)) return parts.slice(1).join('/');
	return parts.join('/');
}

/**
 * Astro `getStaticPaths` helper for dynamic `[lang]` routes.
 */
export function getStaticPaths() {
	return locales.map((lang) => ({ params: { lang } }));
}

export function useTranslations(lang: string) {
	const resolved: Lang = isLang(lang) ? lang : 'pl';
	const strings: UiStrings = ui[resolved];

	return function t(key: UiKey): string {
		return strings[key];
	};
}
