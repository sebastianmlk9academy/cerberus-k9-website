import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

function toAbsolute(linkPath: string, site: string): string {
	return new URL(linkPath, site).href;
}

export const GET: APIRoute = async (context) => {
	const [blogPosts, news, settings] = await Promise.all([
		getCollection('blog'),
		getCollection('aktualnosci'),
		getCollection('ustawienia'),
	]);
	const s = settings[0]?.data;
	const siteUrl = s?.site_url ?? 'https://cerberusk9.org';

	const blogItems = blogPosts.map((post) => ({
		title: post.data.title,
		description: post.data.description,
		pubDate: post.data.pubDate,
		link: toAbsolute(`/blog/${post.id}/`, siteUrl),
	}));

	const newsItems = news.map((entry) => ({
		title: entry.data.title,
		description: entry.data.lead,
		pubDate: entry.data.date,
		link: `${siteUrl}/pl/aktualnosci/${entry.id}/`,
	}));

	const items = [...blogItems, ...newsItems].sort(
		(a, b) => b.pubDate.valueOf() - a.pubDate.valueOf(),
	);

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: new URL(siteUrl),
		items,
	});
};
