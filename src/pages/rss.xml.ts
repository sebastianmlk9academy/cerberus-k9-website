import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

function toAbsolute(linkPath: string, site: URL | undefined): string {
	return new URL(linkPath, site).href;
}

export const GET: APIRoute = async (context) => {
	const site = context.site;
	const [blogPosts, news] = await Promise.all([
		getCollection('blog'),
		getCollection('aktualnosci'),
	]);

	const blogItems = blogPosts.map((post) => ({
		title: post.data.title,
		description: post.data.description,
		pubDate: post.data.pubDate,
		link: toAbsolute(`/blog/${post.id}/`, site),
	}));

	const newsItems = news.map((entry) => ({
		title: entry.data.title,
		description: entry.data.lead,
		pubDate: entry.data.date,
		link: toAbsolute(`/pl/aktualnosci/${entry.id}/`, site),
	}));

	const items = [...blogItems, ...newsItems].sort(
		(a, b) => b.pubDate.valueOf() - a.pubDate.valueOf(),
	);

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: site ?? 'https://cerberusk9.eu',
		items,
	});
};
