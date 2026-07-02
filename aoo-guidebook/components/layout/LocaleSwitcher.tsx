'use client';

import { useLocale } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { localeLabels, locales } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';

export default function LocaleSwitcher() {
  const currentLocale = useLocale();
  const pathname = usePathname();

  const getUrl = (locale: Locale) => `/${locale}${pathname === '/' ? '' : pathname}/`;

  return (
    <div className="flex items-center gap-1 text-sm">
      {locales.map((loc) => (
        <a
          key={loc}
          href={getUrl(loc)}
          className={`px-2 py-1 rounded-md transition-colors ${
            loc === currentLocale
              ? 'bg-primary-100 text-primary-700 font-semibold'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
        >
          {localeLabels[loc]}
        </a>
      ))}
    </div>
  );
}
