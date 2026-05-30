export const SITE_URL = process.env.NEXT_PUBLIC_URL || 'https://appguidebook.com';

const locales = ['en', 'zh'] as const;

export function getLocalizedAlternates(locale: string, path: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${SITE_URL}/${l}${path}/`;
  }
  return {
    languages,
    canonical: `${SITE_URL}/${locale}${path}/`,
  };
}

export function articleSchema(headline: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    author: { '@type': 'Organization', name: 'App Guidebook' },
    url: `${SITE_URL}${path}/`,
  };
}

export function faqPageSchema(qas: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qas.map((qa) => ({
      '@type': 'Question',
      name: qa.question,
      acceptedAnswer: { '@type': 'Answer', text: qa.answer },
    })),
  };
}

export function webAppSchema(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    applicationCategory: 'Tool',
    operatingSystem: 'All',
    url: `${SITE_URL}${path}/`,
  };
}
