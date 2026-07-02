import type { Locale } from '@/i18n/routing';

export const OG_IMAGE = '/images/og-image.jpg';

const baseUrl = 'https://cnrover.pages.dev';

export function getLocalizedAlternates(locale: string, path: string) {
  const locales: Locale[] = ['en', 'zh'];
  const alternates: Record<string, string> = {};

  for (const l of locales) {
    alternates[l] = `${baseUrl}/${l}${path}/`;
  }
  alternates['x-default'] = `${baseUrl}/en${path}/`;

  return {
    canonical: `${baseUrl}/${locale}${path}/`,
    languages: alternates,
  };
}

export function websiteSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CN Rover',
    description: 'China travel guide for international visitors',
    url: 'https://cnrover.pages.dev',
    inLanguage: locale,
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CN Rover',
    url: 'https://cnrover.pages.dev',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'l15670751903@163.com',
      contactType: 'customer support',
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
