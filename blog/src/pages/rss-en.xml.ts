import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts', ({ data, slug }) =>
    !data.draft && slug.startsWith('en/')
  )).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'Vocalis Studio Blog',
    description: 'Development blog for Vocalis Studio - updates, guides, and music production tips.',
    site: context.site ?? 'https://vocalisstudio.github.io',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/web/blog/en/posts/${post.slug.replace(/^en\//, '')}/`,
    })),
    customData: `<language>en</language>`,
  });
}
