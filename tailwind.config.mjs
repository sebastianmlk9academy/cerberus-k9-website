/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				navy: '#1E2B38',
				navyDeep: '#0F1720',
				gold: '#C4922A',
				red: '#C42B2B',
				bone: '#E4DDD0',
				muted: '#7A8A96',
				border: '#253344',
			},
		},
	},
	plugins: [],
};
