import { languages, defaultLang, type Language } from '../content/config';

export function getLangFromUrl(url: URL): Language {
  const [, , lang] = url.pathname.split('/');
  if (languages.includes(lang as Language)) {
    return lang as Language;
  }
  return defaultLang;
}

export function getLangFromSlug(slug: string): Language {
  const lang = slug.split('/')[0];
  if (languages.includes(lang as Language)) {
    return lang as Language;
  }
  return defaultLang;
}

export function getSlugWithoutLang(slug: string): string {
  const parts = slug.split('/');
  if (languages.includes(parts[0] as Language)) {
    return parts.slice(1).join('/');
  }
  return slug;
}

export function getLocalizedPath(path: string, lang: Language): string {
  const base = import.meta.env.BASE_URL || '/web/blog';
  const cleanPath = path.replace(/^\/web\/blog/, '').replace(/^\//, '');
  return `${base}/${lang}/${cleanPath}`.replace(/\/+/g, '/').replace(/\/$/, '') || `${base}/${lang}`;
}

export function getAlternateLanguage(lang: Language): Language {
  return lang === 'en' ? 'ja' : 'en';
}

export function formatDate(date: Date, lang: Language): string {
  const locale = lang === 'ja' ? 'ja-JP' : 'en-US';
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export { languages, defaultLang, type Language };
