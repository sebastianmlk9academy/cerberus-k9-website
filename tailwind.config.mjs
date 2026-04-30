import { tokens } from './src/styles/tokens';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				// Matches Google Fonts in BaseLayout.astro; used by LocationsSection, VideoSection, etc.
				bebas: ['"Bebas Neue"', 'Impact', 'sans-serif'],
				rajdhani: ['Rajdhani', 'Trebuchet MS', 'sans-serif'],
			},
			colors: {
				navy: tokens.brand.navyCard,
				navyDarkest: tokens.brand.navyDarkest,
				navyDeep: tokens.brand.navyDarkest,
				navyMid: tokens.brand.navyMid,
				navyDark: tokens.brand.navyDark,
				navyBorder: tokens.brand.navyBorder,
				gold: tokens.brand.gold,
				goldHover: tokens.brand.goldHover,
				goldLight: tokens.brand.goldLight,
				red: tokens.brand.red,
				redHover: tokens.brand.redHover,
				bone: tokens.text.primary,
				muted: tokens.text.muted,
				border: tokens.brand.navyBorder,
			},
		},
	},
	plugins: [],
};
