import { defineCollection, z } from 'astro:content';

export const languages = ['en', 'ja'] as const;
export type Language = (typeof languages)[number];
export const defaultLang: Language = 'en';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
