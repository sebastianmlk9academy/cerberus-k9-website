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

export const collections = {
	blog,
	instruktorzy,
};
