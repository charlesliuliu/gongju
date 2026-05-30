import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getLocalizedAlternates } from '@/lib/seo';
import { Breadcrumbs, ArticleJsonLd } from '@/components/ui/Breadcrumbs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guides' });
  return {
    title: t('paintCoverageGuide'),
    description: t('paintCoverageDesc'),
    keywords: [
      'paint coverage per gallon',
      'how much does a gallon of paint cover',
      'paint coverage calculator',
      'paint square footage per gallon',
      'how much paint for walls',
      'paint coverage guide',
    ],
    alternates: getLocalizedAlternates(locale, '/guides/paint-coverage-per-gallon'),
    openGraph: {
      title: 'Paint Coverage per Gallon Guide',
      description: 'Learn how much area a gallon of paint covers and what factors affect paint coverage rates.',
      url: 'https://appguidebook.com/guides/paint-coverage-per-gallon',
      type: 'article',
    },
  };
}

export default async function PaintCoveragePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'paintCoveragePage' });
  const tGuides = await getTranslations({ locale, namespace: 'guides' });
  const tGlobal = await getTranslations({ locale, namespace: 'global' });

  return (
    <div className="py-12">
      <article className="container-custom max-w-4xl">
        {/* Header */}
        <header className="mb-10">
          <Breadcrumbs
            items={[
              { label: tGuides('title'), href: '/guides' },
              { label: tGuides('paintCoverageGuide') },
            ]}
          />
          <ArticleJsonLd
            headline={tGuides('paintCoverageGuide')}
            description={tGuides('paintCoverageDesc')}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            {tGuides('paintCoverageGuide')}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            {tGuides('paintCoverageDesc')}
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-gray-400">
            <span>Updated June 2026</span>
            <span className="text-gray-200">|</span>
            <span>{t('readTime')}</span>
          </div>
        </header>

        {/* Intro */}
        <section className="prose prose-gray max-w-none mb-10">
          <p>{t('intro')}</p>
        </section>

        {/* Standard Coverage */}
        <section className="mb-10 p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('standardTitle')}</h2>
          <p className="text-gray-500 mb-4">{t('standardDesc')}</p>
          <div className="space-y-2 text-gray-700">
            <p className="font-semibold">{t('standardGallon')}</p>
            <p className="font-semibold">{t('standardQuart')}</p>
            <p className="font-semibold">{t('standardPint')}</p>
          </div>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800">
            💡 {t('standardNote')}
          </div>
        </section>

        {/* Factors */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('factorsTitle')}</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-4 border border-gray-200 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-1">{t(`factor${i}Title`)}</h3>
                <p className="text-sm text-gray-600">{t(`factor${i}Desc`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How to Calculate */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('howToTitle')}</h2>
          <div className="prose prose-gray max-w-none space-y-3">
            <p>{t('howToP1')}</p>
            <p className="font-medium text-gray-700">→ {t('howToP2')}</p>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center font-mono text-base text-primary-700">
              {t('howToExample')}
            </div>
          </div>
        </section>

        {/* Brand Coverage */}
        <section className="mb-10 p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{t('brandsTitle')}</h2>
          <p className="text-sm text-gray-500 mb-4">{t('brandsDesc')}</p>
          <ul className="space-y-2 text-gray-700">
            {['SherwinWilliams', 'BenjaminMoore', 'Behr', 'Valspar'].map((brand) => (
              <li key={brand} className="flex items-start gap-2">
                <span className="text-primary-500 mt-0.5">•</span>
                <span>{t(`brand${brand}`)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-lg text-sm text-amber-800">
            💡 {t('brandNote')}
          </div>
        </section>

        {/* Tips */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('tipsTitle')}</h2>
          <ul className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <li key={i} className="flex items-start gap-3 p-3 border border-gray-200 rounded-xl">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold">{i}</span>
                <span className="text-gray-700">{t(`tip${i}`)}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Summary */}
        <section className="mb-10 p-6 bg-primary-50 border border-primary-100 rounded-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{t('summaryTitle')}</h2>
          <div className="prose prose-gray max-w-none space-y-2">
            <p>{t('summaryP1')}</p>
            <p>{t('summaryP2')}</p>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{tGuides('paintCalcGuide')}</h3>
          <p className="text-gray-600 mb-4">{tGuides('paintCalcDesc')}</p>
          <Link href="/tools/paint-calculator" className="btn-primary inline-block">
            {tGuides('paintCalcGuide')}
          </Link>
        </div>
      </article>
    </div>
  );
}
