// @ts-check

import { fileURLToPath } from 'node:url';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig, fontProviders } from 'astro/config';
import { locales } from './locales.mjs';

// https://astro.build/config
export default defineConfig({
	vite: {
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
	},
	output: 'static',
	site: 'https://cerberusk9.org',
	redirects: {
		'/fundacja': '/pl/fundacja',
		'/foundation': '/pl/fundacja',
	},
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => {
				if (page.includes('/blog/') || page.includes('/about')) return false;
				const excluded = [
					'/pl/admin/operacje',
					'/en/admin/operacje',
					'/pl/live',
					'/en/live',
				];
				return !excluded.some((ex) => page.includes(ex));
			},
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
