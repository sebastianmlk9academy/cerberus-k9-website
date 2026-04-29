import { getCollection } from 'astro:content';
import type { NavLink } from '../types/nav';

function normalizePathSegment(path: string | undefined): string | undefined {
	if (!path?.trim()) return undefined;
	return path.replace(/^\//, '').replace(/\/$/, '');
}

function normalizeHref(href: string): string {
	const t = href.trim();
	return t.startsWith('/') ? t : `/${t}`;
}

type NavLinkRow = {
	label_pl: string;
	label_en: string;
	path?: string | undefined;
	href?: string | undefined;
	target?: '_self' | '_blank';
	highlight?: boolean | undefined;
	icon?: string | undefined;
	flag?: string | undefined;
	order: number;
	active?: boolean | undefined;
};

function rowToNavLink(row: NavLinkRow, pageLang: string): NavLink {
	const path = normalizePathSegment(row.path);
	const hrefRaw = row.href?.trim();
	if (hrefRaw) {
		return {
			label_pl: row.label_pl,
			label_en: row.label_en,
			href: normalizeHref(hrefRaw),
			highlight: row.highlight,
			icon: row.icon,
			flag: row.flag,
			target: row.target ?? '_self',
		};
	}
	if (!path) {
		throw new Error(`nav_links: entry "${row.label_pl}" needs path or href`);
	}
	return {
		label_pl: row.label_pl,
		label_en: row.label_en,
		href: `/${pageLang}/${path}`,
		path,
		highlight: row.highlight,
		icon: row.icon,
		flag: row.flag,
		target: row.target ?? '_self',
	};
}

/** Loads all `nav_links` YAML files, merges `links` arrays, filters inactive, sorts by `order`. */
export async function getSortedNavLinks(pageLang: string): Promise<NavLink[]> {
	const entries = await getCollection('nav_links');
	const rows: NavLinkRow[] = entries.flatMap((e) =>
		e.data.links.filter((l) => l.active !== false).map((l) => ({
			label_pl: l.label_pl,
			label_en: l.label_en,
			path: l.path,
			href: l.href,
			target: l.target,
			highlight: l.highlight,
			icon: l.icon,
			flag: l.flag,
			order: l.order,
			active: l.active,
		})),
	);
	rows.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
	return rows.map((r) => rowToNavLink(r, pageLang));
}
