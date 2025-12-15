import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'Vocalis Studio Blog',
    description: 'Vocalis Studioの開発ブログ。アプリのアップデート情報や音楽制作のヒントをお届けします。',
    site: context.site ?? 'https://vocalisstudio.github.io',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/web/blog/posts/${post.slug}/`,
    })),
    customData: `<language>ja</language>`,
  });
}
