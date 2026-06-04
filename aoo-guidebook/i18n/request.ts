import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

// Module-level variable to store the current locale during static rendering.
// During static export, each page is rendered sequentially within a worker,
// so there's no risk of concurrent access. The layout calls setCurrentLocale()
// before any components that need getRequestConfig.
// This avoids next-intl's `requestLocale` which internally uses `headers()`
// — a dynamic API forbidden in static export mode.
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
