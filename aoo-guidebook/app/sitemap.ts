import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const baseUrl = 'https://appguidebook.com';

const locales = ['en', 'zh'];

const routes = [
  { path: '', priority: 1.0, freq: 'weekly' as const },
  { path: '/guides', priority: 0.9, freq: 'weekly' as const },
  { path: '/tools', priority: 0.9, freq: 'weekly' as const },
  { path: '/faq', priority: 0.7, freq: 'monthly' as const },
  { path: '/privacy-policy', priority: 0.3, freq: 'monthly' as const },
  { path: '/terms-of-service', priority: 0.3, freq: 'monthly' as const },
  // Concrete
  { path: '/guides/how-to-calculate-concrete', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/concrete-slab-cost-guide', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/concrete-mix-ratios', priority: 0.8, freq: 'weekly' as const },
  // Roofing
  { path: '/guides/how-to-calculate-roof-pitch', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/roof-pitch-angle-conversion', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/roofing-materials-guide', priority: 0.8, freq: 'weekly' as const },
  // Flooring
  { path: '/guides/how-to-calculate-flooring-materials', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/flooring-types-comparison', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/flooring-cost-estimation', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/diy-flooring-mistakes', priority: 0.8, freq: 'weekly' as const },
  // Paint
  { path: '/guides/how-to-calculate-paint-needed', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/interior-vs-exterior-paint', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/paint-coverage-per-gallon', priority: 0.8, freq: 'weekly' as const },
  // Lumber
  { path: '/guides/how-to-calculate-lumber', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/board-feet-calculation', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/lumber-sizes-and-types', priority: 0.8, freq: 'weekly' as const },
  // Deck
  { path: '/guides/how-to-build-a-deck', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/deck-materials-calculator', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/deck-cost-estimation', priority: 0.8, freq: 'weekly' as const },
  // Drywall
  { path: '/guides/how-to-calculate-drywall', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/drywall-types-and-sizes', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/drywall-cost-estimation', priority: 0.8, freq: 'weekly' as const },
  // Fence
  { path: '/guides/how-to-calculate-fence-materials', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/fence-types-and-costs', priority: 0.8, freq: 'weekly' as const },
  { path: '/guides/fence-post-spacing', priority: 0.8, freq: 'weekly' as const },
  // Tools
  { path: '/tools/concrete-calculator', priority: 0.8, freq: 'monthly' as const },
  { path: '/tools/roof-pitch-calculator', priority: 0.8, freq: 'monthly' as const },
  { path: '/tools/flooring-calculator', priority: 0.8, freq: 'monthly' as const },
  { path: '/tools/paint-calculator', priority: 0.8, freq: 'monthly' as const },
  { path: '/tools/lumber-calculator', priority: 0.8, freq: 'monthly' as const },
  { path: '/tools/deck-calculator', priority: 0.8, freq: 'monthly' as const },
  { path: '/tools/drywall-calculator', priority: 0.8, freq: 'monthly' as const },
  { path: '/tools/fence-calculator', priority: 0.8, freq: 'monthly' as const },
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
