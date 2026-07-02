import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getLocalizedAlternates } from '@/lib/seo';
import { Breadcrumbs, ArticleJsonLd } from '@/components/ui/Breadcrumbs';
import AuthorBio from '@/components/ui/AuthorBio';
import CategoryIllustration from '@/components/ui/CategoryIllustration';

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
      title: `${t('paintCoverageGuide')} | App Guidebook`,
      description: t('paintCoverageDesc'),
      url: `https://appguidebook.com/${locale}/guides/paint-coverage-per-gallon`,
      type: 'article',
    },
  };
}

export default async function PaintCoveragePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'paintCoveragePage' });
  const tGuides = await getTranslations({ locale, namespace: 'guides' });

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
            locale={locale}
          />
          <ArticleJsonLd path="/guides/paint-coverage-per-gallon" locale={locale} headline={tGuides('paintCoverageGuide')}
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
        <AuthorBio locale={locale} />
        <CategoryIllustration category="paint" caption={t('illustrationCaption')} />

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
                {i === 2 && (
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                    {t('factor2LinkText')}{' '}
                    <Link href="/guides/interior-vs-exterior-paint" className="text-primary-600 hover:text-primary-700 underline underline-offset-2 font-medium">
                      {tGuides('paintTypesGuide')}
                    </Link>
                  </p>
                )}
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

        {/* Summary — purely educational, no tool pitch */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('summaryTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t('summaryP1')}</p>
          <p className="text-gray-700 leading-relaxed">{t('summaryP2')}</p>
        </section>

        {/* FAQ — NEW: purely educational */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('faqTitle')}</h2>
          <div className="space-y-4">
            {(['1', '2', '3', '4', '5'] as const).map((n) => (
              <details key={n} className="bg-white border border-gray-200 rounded-xl group">
                <summary className="px-6 py-4 cursor-pointer font-medium text-gray-900 hover:text-primary-700 transition-colors list-none [&::-webkit-details-marker]:hidden flex items-center justify-between">
                  {t(`faqQ${n}`)}
                  <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                  {t(`faqA${n}`)}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Single neutral CTA — only ONE, at the very end */}
        <div className="border border-gray-200 rounded-2xl p-8 my-12 text-center bg-gray-50/50">
          <p className="text-gray-600 mb-5 max-w-xl mx-auto leading-relaxed text-sm">
            {t('ctaDesc')}
          </p>
          <Link
            href="/tools/paint-calculator"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-white hover:border-gray-400 transition-colors"
          >
            {t('ctaBtn')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Related Guides */}
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{t('relatedTitle')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/guides/interior-vs-exterior-paint" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{t('relatedGuide1Title')}</h3>
              <p className="text-sm text-gray-500">{t('relatedGuide1Desc')}</p>
            </Link>
            <Link href="/guides/how-to-calculate-paint-needed" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{t('relatedGuide2Title')}</h3>
              <p className="text-sm text-gray-500">{t('relatedGuide2Desc')}</p>
            </Link>
            <Link href="/guides/how-to-calculate-paint-needed" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{t('relatedGuide3Title')}</h3>
              <p className="text-sm text-gray-500">{t('relatedGuide3Desc')}</p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
