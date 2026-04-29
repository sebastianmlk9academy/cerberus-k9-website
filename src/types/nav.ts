/**
 * Normalized nav item passed from Astro (getCollection → getSortedNavLinks) into NavBar.
 * Use `path` for routes that follow `/{lang}/{slug}`; omit `path` when `href` is fixed (e.g. /en/international).
 */
export interface NavLink {
	label_pl: string;
	label_en: string;
	href: string;
	/** When set, anchor uses `/${currentLang}/${path}` so the language switcher updates the target. */
	path?: string;
	highlight?: boolean;
	icon?: string;
	flag?: string;
	target?: '_self' | '_blank';
}
