import { getCollection, getEntry } from 'astro:content';
import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
	const settings = await getEntry('ustawienia', 'ustawienia');
	const siteUrl = settings?.data.site_url ?? 'https://cerberusk9.org';

	const entries = await getCollection('aktualnosci');

	return rss({
		title: 'CERBERUS K9 — Aktualności',
		description: 'Najnowsze aktualności CERBERUS K9',
		site: new URL(siteUrl),
		items: entries
			.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
			.map((entry) => ({
				title: entry.data.title,
				pubDate: entry.data.date,
				description: entry.data.lead ?? '',
				link: `${siteUrl}/pl/aktualnosci/${entry.id}/`,
				categories: [entry.data.category],
			})),
	});
};
