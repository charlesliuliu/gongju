import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getLocalizedAlternates } from '@/lib/seo';
import { Breadcrumbs, ArticleJsonLd } from '@/components/ui/Breadcrumbs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('guides');
  return {
    title: t('slabCostGuide'),
    description: t('slabCostDesc'),
    keywords: [
      'concrete slab cost',
      'concrete slab price',
      'how much does a concrete slab cost',
      'concrete slab cost per square foot',
      'concrete patio cost',
      'concrete driveway cost',
    ],
    alternates: getLocalizedAlternates(locale, '/guides/concrete-slab-cost-guide'),
    openGraph: {
      title: 'Concrete Slab Cost Guide - Pricing & Estimates',
      description: 'Complete guide to concrete slab costs. Learn pricing per square foot and how to estimate your project budget.',
      url: 'https://appguidebook.com/guides/concrete-slab-cost-guide',
      type: 'article',
    },
  };
}

export default async function ConcreteSlabCostGuidePage() {
  const t = await getTranslations('slabCostPage');
  const tGuides = await getTranslations('guides');
  const tGlobal = await getTranslations('global');

  return (
    <div className="py-12">
      <article className="container-custom max-w-4xl">
        {/* Header */}
        <header className="mb-10">
          <Breadcrumbs
            items={[
              { label: tGuides('title'), href: '/guides' },
              { label: tGuides('slabCostGuide') },
            ]}
          />
          <ArticleJsonLd
            headline={tGuides('slabCostGuide')}
            description={tGuides('slabCostDesc')}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            {tGuides('slabCostGuide')}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            {tGuides('slabCostDesc')}
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-gray-400">
            <span>Updated June 2026</span>
            <span className="text-gray-200">|</span>
            <span>{t('readTime')}</span>
          </div>
        </header>

        {/* Quick Stats */}
        <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 mb-12">
          <h2 className="text-sm font-semibold text-primary-100 uppercase tracking-wider mb-6 text-center">
            {t('quickStatsTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-extrabold text-white">{t('statBasicVal')}</p>
              <p className="text-sm text-primary-200 mt-1">{t('statBasic')}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-white">{t('statReinforcedVal')}</p>
              <p className="text-sm text-primary-200 mt-1">{t('statReinforced')}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-white">{t('statStampedVal')}</p>
              <p className="text-sm text-primary-200 mt-1">{t('statStamped')}</p>
            </div>
          </div>
        </div>

        {/* Calculator CTA */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-12 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="font-semibold text-gray-900">{t('ctaBannerTitle')}</h3>
            <p className="text-sm text-gray-500">{t('ctaBannerDesc')}</p>
          </div>
          <Link href="/tools/concrete-calculator" className="btn-primary inline-flex items-center gap-2">
            {t('ctaBannerBtn')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Introduction */}
        <p className="text-lg text-gray-700 leading-relaxed mb-12">{t('intro')}</p>

        {/* Average Costs */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('avgCostsTitle')}</h2>
          <p className="text-gray-700 mb-6">{t('avgCostsDesc')}</p>

          <div className="overflow-x-auto mb-6 rounded-xl border border-gray-200">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left font-semibold text-gray-900">{t('tableSlabType')}</th>
                  <th className="p-3 text-left font-semibold text-gray-900">{t('tableCostPerSqft')}</th>
                  <th className="p-3 text-left font-semibold text-gray-900">{t('tableTypicalUse')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { type: t('slabBasic'), cost: t('slabBasicCost'), use: t('slabBasicUse') },
                  { type: t('slabStandard'), cost: t('slabStandardCost'), use: t('slabStandardUse') },
                  { type: t('slabHeavy'), cost: t('slabHeavyCost'), use: t('slabHeavyUse') },
                  { type: t('slabStamped'), cost: t('slabStampedCost'), use: t('slabStampedUse') },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="p-3 font-medium">{row.type}</td>
                    <td className="p-3 text-gray-600">{row.cost}</td>
                    <td className="p-3 text-gray-600">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm text-gray-700"><strong>{t('avgCostsNote')}</strong></p>
          </div>
        </section>

        {/* Cost Breakdown */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('breakdownTitle')}</h2>
          <p className="text-gray-700 mb-6">{t('breakdownDesc')}</p>

          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-1.5">{t(`comp${i}Title`)}</h3>
                <p className="text-gray-700 text-sm mb-1.5">{t(`comp${i}Desc`)}</p>
                <p className="text-gray-500 text-sm">{t(`comp${i}Example`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Project Examples */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('examplesTitle')}</h2>
          <p className="text-gray-700 mb-6">{t('examplesDesc')}</p>

          <div className="space-y-4">
            {[1, 2, 3].map((i) => {
              const icons = ['🏠', '🚗', '🏗️'];
              return (
                <div key={i} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-xl">{icons[i - 1]}</div>
                    <h3 className="font-semibold text-gray-900">{t(`example${i}Title`)}</h3>
                  </div>
                  <ul className="space-y-1 text-gray-600 text-sm mb-4">
                    {[1, 2, 3].map((d) => (
                      <li key={d}>{t(`example${i}Detail${d}`)}</li>
                    ))}
                  </ul>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <span className="text-gray-500 text-sm">{t('breakdownTitle')}:</span>
                    <span className="text-xl font-bold text-primary-600">{t(`example${i}Total`)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Factors */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('factorsTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { icon: '📏', key: 'Size' },
              { icon: '📐', key: 'Thick' },
              { icon: '🔧', key: 'Rebar' },
              { icon: '🎨', key: 'Finish' },
              { icon: '📍', key: 'Location' },
              { icon: '🚜', key: 'Access' },
            ].map((factor) => (
              <div key={factor.key} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-lg">{factor.icon}</span>
                  <h3 className="font-semibold text-gray-900 text-sm">{t(`factor${factor.key}Title`)}</h3>
                </div>
                <p className="text-gray-600 text-sm">{t(`factor${factor.key}Desc`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* DIY vs Pro */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('diyTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <h3 className="font-semibold text-gray-900">{t('diyProTitle')}</h3>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    {t(`diyPro${i}`)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <h3 className="font-semibold text-gray-900">{t('diyConTitle')}</h3>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-300 mt-0.5">•</span>
                    {t(`diyCon${i}`)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-gray-700 text-sm"><strong>{t('diyRecommendation')}</strong></p>
          </div>
        </section>

        {/* Getting Quotes */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('quotesTitle')}</h2>
          <ol className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <li key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold">{i}</span>
                <span className="text-gray-700 pt-0.5">{t(`quoteTip${i}`)}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Bottom CTA */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 my-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('ctaTitle')}</h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">{t('ctaDesc')}</p>
          <Link href="/tools/concrete-calculator" className="btn-primary inline-flex items-center gap-2">
            {t('ctaBtn')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Related */}
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{tGuides('relatedGuides')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/guides/how-to-calculate-concrete" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('concreteCalcGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('concreteCalcDesc')}</p>
            </Link>
            <Link href="/guides/concrete-mix-ratios" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('mixRatiosGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('mixRatiosDesc')}</p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
