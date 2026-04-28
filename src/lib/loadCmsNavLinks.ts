import { getEntry } from 'astro:content';

export type CmsNavBarLink = {
	key: string;
	label_pl: string;
	label_en: string;
	path: string;
	target?: boolean;
};

export async function loadCmsNavLinks(): Promise<CmsNavBarLink[] | null> {
	try {
		const navLinksData = await getEntry('nav_links', 'links');
		const raw = navLinksData?.data.links;
		if (!raw?.length) return null;
		return raw
			.filter((l) => l.active !== false)
			.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
			.map((l) => ({
				key: l.key,
				label_pl: l.label_pl,
				label_en: l.label_en,
				path: String(l.path ?? '')
					.replace(/^\//, '')
					.replace(/\/$/, ''),
				target: l.target === true,
			}))
			.filter((l) => l.path.length > 0);
	} catch {
		return null;
	}
}
