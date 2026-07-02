import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

let _currentLocale = '';

export function setCachedLocale(locale: string) {
  _currentLocale = locale;
}

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = _currentLocale;
  }
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
