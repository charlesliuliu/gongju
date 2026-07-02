import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'zh'] as const;

export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always',
});

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
};
