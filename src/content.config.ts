import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: ['**/*.{md,mdx}', '!_templates/**/*.{md,mdx}'] }),
  schema: z.object({
    title: z.string().optional(),
    urlSlug: z.string().optional(),
    category: z.string().optional(),
    description: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
    featured: z.boolean().default(false)
  })
});

export const collections = { blog };
