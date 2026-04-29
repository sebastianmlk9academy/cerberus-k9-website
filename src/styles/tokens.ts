export const tokens = {
	brand: {
		navyDarkest: '#0F1720',
		navyDark: '#161F28',
		navyMid: '#1A2530',
		navyCard: '#1E2B38',
		navyBorder: '#253344',
		gold: '#C4922A',
		goldHover: '#A67B1E',
		goldLight: '#D4A84A',
		red: '#C42B2B',
		redHover: '#9E1F1F',
		redMuted: '#8B2020',
	},
	text: {
		primary: '#E4DDD0',
		muted: '#7A8A96',
		disabled: '#5A6A7A',
		faint: '#4A5A6A',
		dark: '#3A4A5A',
	},
	background: {
		page: '#0F1720',
		pageMid: '#0C1018',
		card: '#1E2B38',
		cardDark: '#151E28',
		section: '#161F28',
		sectionAlt: '#1A2430',
	},
} as const;

export type Tokens = typeof tokens;
