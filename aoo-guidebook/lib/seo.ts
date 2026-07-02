export const SITE_URL = process.env.NEXT_PUBLIC_URL || 'https://appguidebook.com';
export const OG_IMAGE = `${SITE_URL}/images/og-default.png`;

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

export function websiteSchema(locale: string) {
  const url = `${SITE_URL}/${locale}/`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'App Guidebook',
    url,
    description: 'Free online construction calculators for contractors and DIY enthusiasts.',
    inLanguage: locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/${locale}/guides?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'App Guidebook',
    url: SITE_URL,
    logo: `${SITE_URL}/images/og-default.png`,
    email: 'contact@appguidebook.com',
    description: 'Free online construction calculators and expert DIY guides for contractors and homeowners.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    sameAs: [],
  };
}

export function howToSchema(steps: { name: string; text: string }[], locale: string, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: steps.length > 0 ? steps[0].name : '',
    step: steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function webApplicationSchema(name: string, description: string, locale: string, slug: string) {
  const url = `${SITE_URL}/${locale}/tools/${slug}/`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    url,
    description,
    applicationCategory: 'ConstructionApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}