// @ts-check

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig, fontProviders } from 'astro/config';
import { locales } from './locales.mjs';

// https://astro.build/config
export default defineConfig({
	output: 'static',
	site: 'https://cerberusk9.org',
	redirects: {
		'/fundacja': '/pl/fundacja',
		'/foundation': '/pl/fundacja',
	},
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => !page.includes('/blog/') && !page.includes('/about'),
		}),
		react(),
		tailwind(),
	],
	i18n: {
		locales: [...locales],
		defaultLocale: 'pl',
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: false,
		},
	},
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
