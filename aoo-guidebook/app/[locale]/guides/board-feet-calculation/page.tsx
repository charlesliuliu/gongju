import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getLocalizedAlternates } from '@/lib/seo';
import { Breadcrumbs, ArticleJsonLd } from '@/components/ui/Breadcrumbs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guides' });
  return {
    title: t('boardFeetGuide'),
    description: t('boardFeetDesc'),
    keywords: [
      'board feet calculation',
      'board foot calculator',
      'calculate board feet',
      'board feet formula',
      'lumber measurement',
      'board foot vs linear foot',
      'board foot pricing',
      'wood volume calculator',
    ],
    alternates: getLocalizedAlternates(locale, '/guides/board-feet-calculation'),
    openGraph: {
      title: 'Board Feet Calculation - Complete Guide',
      description: 'Learn how to calculate board feet for lumber. Board foot formula, examples, pricing tips, and a quick reference chart.',
      url: 'https://appguidebook.com/guides/board-feet-calculation',
      type: 'article',
    },
  };
}

export default async function BoardFeetCalculationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'boardFeetPage' });
  const tGuides = await getTranslations({ locale, namespace: 'guides' });

  return (
    <div className="py-12">
      <article className="container-custom max-w-4xl">
        {/* Header */}
        <header className="mb-10">
          <Breadcrumbs
            items={[
              { label: tGuides('title'), href: '/guides' },
              { label: tGuides('boardFeetGuide') },
            ]}
          />
          <ArticleJsonLd
            headline={tGuides('boardFeetGuide')}
            description={tGuides('boardFeetDesc')}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            {tGuides('boardFeetGuide')}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            {tGuides('boardFeetDesc')}
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-gray-400">
            <span>Updated June 2026</span>
            <span className="text-gray-200">|</span>
            <span>{t('readTime')}</span>
          </div>
        </header>

        {/* Calculator CTA */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 mb-12 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="font-semibold text-white text-lg">{t('ctaTitle')}</h3>
            <p className="text-primary-100 text-sm">{t('ctaDesc')}</p>
          </div>
          <Link
            href="/tools/lumber-calculator"
            className="inline-flex items-center gap-2 bg-white text-primary-700 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary-50 transition-all duration-200"
          >
            Open Lumber Calculator
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Introduction */}
        <p className="text-lg text-gray-700 leading-relaxed mb-12">{t('intro')}</p>

        {/* What is a Board Foot */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('whatIsTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('whatIsP1')}</p>
          <p className="text-gray-700">{t('whatIsP2')}</p>
        </section>

        {/* Board Foot Formula */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('formulaTitle')}</h2>
          <p className="text-gray-700 mb-6">{t('formulaP1')}</p>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 my-6 text-center">
            <p className="text-lg font-mono font-semibold text-gray-900">{t('formulaBox')}</p>
          </div>
        </section>

        {/* Calculation Examples */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('examplesTitle')}</h2>

          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{t('example1Title')}</h3>
              <p className="text-gray-700 text-sm">{t('example1Desc')}</p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{t('example2Title')}</h3>
              <p className="text-gray-700 text-sm">{t('example2Desc')}</p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{t('example3Title')}</h3>
              <p className="text-gray-700 text-sm">{t('example3Desc')}</p>
            </div>
          </div>
        </section>

        {/* Board Feet vs Linear Feet */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('vsTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('vsP1')}</p>
          <p className="text-gray-700">{t('vsP2')}</p>
        </section>

        {/* Board Foot Pricing */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('pricingTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('pricingP1')}</p>
          <p className="text-gray-700">{t('pricingP2')}</p>
        </section>

        {/* Quick Reference Chart */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('chartTitle')}</h2>
          <p className="text-gray-700 mb-6">{t('chartP1')}</p>
        </section>

        {/* Tips for Estimating */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('tipsTitle')}</h2>
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{t('tip1Title')}</h3>
              <p className="text-gray-700 text-sm">{t('tip1Desc')}</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{t('tip2Title')}</h3>
              <p className="text-gray-700 text-sm">{t('tip2Desc')}</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{t('tip3Title')}</h3>
              <p className="text-gray-700 text-sm">{t('tip3Desc')}</p>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('summaryTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t('summaryP1')}</p>
          <p className="text-gray-700 leading-relaxed">{t('summaryP2')}</p>
        </section>

        {/* Bottom CTA */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 my-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('ctaTitle')}</h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">{t('ctaDesc')}</p>
          <Link href="/tools/lumber-calculator" className="btn-primary inline-flex items-center gap-2">
            Open Lumber Calculator
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Related Guides */}
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{tGuides('relatedGuides')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/guides/how-to-calculate-lumber" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('howToCalculateLumberGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('howToCalculateLumberDesc')}</p>
            </Link>
            <Link href="/guides/lumber-sizes-and-types" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('lumberSizesGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('lumberSizesDesc')}</p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
