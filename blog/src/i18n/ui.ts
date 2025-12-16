import type { Language } from '../content/config';

export const ui = {
  en: {
    // Site
    'site.title': 'Vocalis Studio Blog',
    'site.description': 'Development blog for Vocalis Studio - updates, guides, and music production tips.',

    // Navigation
    'nav.home': 'Blog Home',
    'nav.back': '← Back to posts',

    // Index page
    'index.title': 'Blog',
    'index.description': 'App updates, user guides, and music production tips.',

    // Post
    'post.published': 'Published',
    'post.updated': 'Updated',

    // Footer
    'footer.links': 'Links',
    'footer.social': 'Social',
    'footer.appStore': 'App Store',
    'footer.copyright': '© 2025 Vocalis Studio. All rights reserved.',

    // Language
    'lang.switch': 'Language',
    'lang.ja': '日本語',
    'lang.en': 'English',
  },
  ja: {
    // Site
    'site.title': 'Vocalis Studio ブログ',
    'site.description': 'Vocalis Studioの開発ブログ - アップデート情報、使い方ガイド、音楽制作Tips。',

    // Navigation
    'nav.home': 'ブログホーム',
    'nav.back': '← 記事一覧に戻る',

    // Index page
    'index.title': 'ブログ',
    'index.description': 'アプリのアップデート情報、使い方ガイド、音楽制作Tipsをお届けします。',

    // Post
    'post.published': '公開日',
    'post.updated': '更新日',

    // Footer
    'footer.links': 'リンク',
    'footer.social': 'ソーシャル',
    'footer.appStore': 'App Store',
    'footer.copyright': '© 2025 Vocalis Studio. All rights reserved.',

    // Language
    'lang.switch': '言語',
    'lang.ja': '日本語',
    'lang.en': 'English',
  },
} as const;

export type UIKey = keyof (typeof ui)['en'];

export function useTranslations(lang: Language) {
  return function t(key: UIKey): string {
    return ui[lang][key] || ui['en'][key];
  };
}
