import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const baseUrl = 'https://cnrover.pages.dev';

const locales = ['en', 'zh'];

const routes = [
  { path: '', priority: 1.0, freq: 'weekly' as const },
  { path: '/beijing', priority: 0.9, freq: 'weekly' as const },
  { path: '/beijing/great-wall', priority: 0.9, freq: 'weekly' as const },
  { path: '/beijing/forbidden-city', priority: 0.9, freq: 'weekly' as const },
  { path: '/itineraries', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/visa', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/payment', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/sim-card', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/transportation', priority: 0.8, freq: 'weekly' as const },
  { path: '/faq', priority: 0.7, freq: 'monthly' as const },
  { path: '/about', priority: 0.5, freq: 'monthly' as const },
  { path: '/privacy-policy', priority: 0.3, freq: 'monthly' as const },
  { path: '/terms-of-service', priority: 0.3, freq: 'monthly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const lastModified = new Date('2026-06-06');

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${baseUrl}/${locale}${route.path}/`,
        lastModified,
        changeFrequency: route.freq,
        priority: route.priority,
      });
    }
  }

  return entries;
}
