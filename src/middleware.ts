import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
	const url = new URL(context.request.url);
	const host = url.hostname;

	// Redirect pactak9.org to fundacja page
	if (host === 'pactak9.org' || host === 'www.pactak9.org') {
		return context.redirect('/pl/fundacja', 301);
	}

	return next();
});
