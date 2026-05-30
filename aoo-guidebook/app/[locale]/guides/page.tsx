import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getLocalizedAlternates } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guides' });
  return {
    title: t('title'),
    description: t('desc'),
    alternates: getLocalizedAlternates(locale, '/guides'),
    openGraph: {
      title: `${t('title')} | App Guidebook`,
      description: t('desc'),
      type: 'website',
    },
  };
}

export default async function GuidesPage() {
  const t = await getTranslations('guides');

  const concreteGuides = [
    {
      slug: 'how-to-calculate-concrete',
      title: t('concreteCalcGuide'),
      description: t('concreteCalcDesc'),
      readTime: '10 min read',
      category: t('concreteCategory'),
    },
    {
      slug: 'concrete-slab-cost-guide',
      title: t('slabCostGuide'),
      description: t('slabCostDesc'),
      readTime: '8 min read',
      category: t('concreteCategory'),
    },
    {
      slug: 'concrete-mix-ratios',
      title: t('mixRatiosGuide'),
      description: t('mixRatiosDesc'),
      readTime: t('mixRatiosReadTime'),
      category: t('concreteCategory'),
    },
  ];

  const roofingGuides = [
    {
      slug: 'how-to-calculate-roof-pitch',
      title: t('roofPitchCalcGuide'),
      description: t('roofPitchCalcDesc'),
      readTime: t('roofPitchReadTime'),
      category: t('roofingCategory'),
    },
    {
      slug: 'roofing-materials-guide',
      title: t('roofingMaterialsGuide'),
      description: t('roofingMaterialsDesc'),
      readTime: t('roofingMaterialsReadTime'),
      category: t('roofingCategory'),
    },
    {
      slug: 'roof-pitch-angle-conversion',
      title: t('pitchAngleGuide'),
      description: t('pitchAngleDesc'),
      readTime: t('pitchAngleReadTime'),
      category: t('roofingCategory'),
    },
  ];

  const flooringGuides = [
    {
      slug: 'how-to-calculate-flooring-materials',
      title: t('flooringCalcGuide'),
      description: t('flooringCalcDesc'),
      readTime: t('flooringCalcReadTime'),
      category: t('flooringCategory'),
    },
    {
      slug: 'flooring-types-comparison',
      title: t('flooringTypesGuide'),
      description: t('flooringTypesDesc'),
      readTime: t('flooringTypesReadTime'),
      category: t('flooringCategory'),
    },
    {
      slug: 'flooring-cost-estimation',
      title: t('flooringCostGuide'),
      description: t('flooringCostDesc'),
      readTime: t('flooringCostReadTime'),
      category: t('flooringCategory'),
    },
  ];

  return (
    <div className="py-12">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {t('desc')}
          </p>
        </div>

        <div className="space-y-8">
          {/* Concrete Guides */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t('concreteCategory')}</h2>
            <div className="space-y-4">
              {concreteGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="block card hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          {guide.category}
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-1">{guide.title}</h2>
                      <p className="text-sm text-gray-500">{guide.description}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{guide.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Roofing Guides */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t('roofingCategory')}</h2>
            <div className="space-y-4">
              {roofingGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="block card hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          {guide.category}
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-1">{guide.title}</h2>
                      <p className="text-sm text-gray-500">{guide.description}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{guide.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Flooring Guides */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t('flooringCategory')}</h2>
            <div className="space-y-4">
              {flooringGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="block card hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          {guide.category}
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-1">{guide.title}</h2>
                      <p className="text-sm text-gray-500">{guide.description}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{guide.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Paint Guides */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t('paintCategory')}</h2>
            <div className="space-y-4">
              {[
                {
                  slug: 'how-to-calculate-paint-needed',
                  title: t('paintCalcGuide'),
                  description: t('paintCalcDesc'),
                  readTime: t('paintCalcReadTime'),
                  category: t('paintCategory'),
                },
                {
                  slug: 'interior-vs-exterior-paint',
                  title: t('paintTypesGuide'),
                  description: t('paintTypesDesc'),
                  readTime: t('paintTypesReadTime'),
                  category: t('paintCategory'),
                },
                {
                  slug: 'paint-coverage-per-gallon',
                  title: t('paintCoverageGuide'),
                  description: t('paintCoverageDesc'),
                  readTime: t('paintCoverageReadTime'),
                  category: t('paintCategory'),
                },
              ].map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="block card hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          {guide.category}
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-1">{guide.title}</h2>
                      <p className="text-sm text-gray-500">{guide.description}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{guide.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
