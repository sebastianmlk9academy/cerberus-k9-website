import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const i18nMessages = defineCollection({
	loader: glob({ base: './src/content/i18n', pattern: '*.json' }),
	schema: z.object({
		metaTitle: z.string(),
		metaDescription: z.string(),
	}),
});

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
		}),
});

const instruktorzy = defineCollection({
	loader: glob({ base: './src/content/instruktorzy', pattern: '**/*.{md,mdx,json,yml,yaml}' }),
	schema: z.object({
		name: z.string(),
		country: z.string(),
		countryCode: z.string().length(2),
		specializations: z.array(z.string()),
		bioShort: z.string(),
		bioFull: z.string(),
		photo: z.string(),
		order: z.number().int(),
	}),
});

const partnerzy = defineCollection({
	loader: glob({ base: './src/content/partnerzy', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		name: z.string().optional(),
		type: z.enum(['Strategiczny', 'Sponsor', 'Patron-Medialny', 'Technologiczny']).optional(),
		logo: z.string().optional(),
		website: z.string().optional(),
		description: z.string().optional(),
		order: z.number().int().optional(),
		/** When true, entry is kept for tooling/CMS but excluded from the public partners page. */
		draft: z.boolean().optional(),
	}),
});

export const collections = { blog, i18nMessages, instruktorzy, partnerzy };
