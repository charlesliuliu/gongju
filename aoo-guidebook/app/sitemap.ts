import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const baseUrl = 'https://appguidebook.com';

const locales = ['en', 'zh'];

const routes = [
  { path: '', priority: 1.0, freq: 'weekly' as const },
  { path: '/guides', priority: 0.9, freq: 'weekly' as const },
  { path: '/tools', priority: 0.9, freq: 'weekly' as const },
  { path: '/faq', priority: 0.7, freq: 'monthly' as const },
  { path: '/guides/how-to-calculate-concrete', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/concrete-slab-cost-guide', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/concrete-mix-ratios', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/how-to-calculate-flooring-materials', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/flooring-types-comparison', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/flooring-cost-estimation', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/how-to-calculate-paint-needed', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/interior-vs-exterior-paint', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/paint-coverage-per-gallon', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/how-to-calculate-roof-pitch', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/roof-pitch-angle-conversion', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/roofing-materials-guide', priority: 0.8, freq: 'weekly' as const },
  { path: '/tools/concrete-calculator', priority: 0.8, freq: 'monthly' as const },
  { path: '/tools/roof-pitch-calculator', priority: 0.8, freq: 'monthly' as const },
  { path: '/tools/flooring-calculator', priority: 0.8, freq: 'monthly' as const },
  { path: '/tools/paint-calculator', priority: 0.8, freq: 'monthly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const lastModified = new Date('2026-05-31');

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
