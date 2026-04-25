import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const blog = defineCollection({
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

const instruktorzy = defineCollection({
	type: 'content',
	schema: z.object({
		name: z.string(),
		country: z.string(),
		countryCode: z.string().min(2).max(2),
		specializations: z.array(z.string()),
		bioShort: z.string(),
		bioFull: z.string(),
		photo: z.string(),
		order: z.number().int(),
	}),
});

const galeria = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		category: z.enum(['HARDEST HIT', 'SZKOLENIA K9', 'TCCC', 'KONFERENCJA', 'DRONY']),
		location: z.string(),
		edition: z.enum(['2025', '2026']),
		photo: z.string(),
		alt: z.string(),
		tags: z.array(z.string()).optional(),
		order: z.number().int().optional(),
	}),
});

export const collections = {
	blog,
	instruktorzy,
	galeria,
};
