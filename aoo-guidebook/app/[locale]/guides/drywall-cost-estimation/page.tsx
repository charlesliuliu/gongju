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
    title: t('drywallCostGuide'),
    description: t('drywallCostDesc'),
    keywords: [
      'drywall cost estimation',
      'drywall installation cost',
      'how much does drywall cost',
      'drywall price per sheet',
      'drywall labor cost',
      'drywall finishing cost',
      'drywall finishing levels',
      'drywall DIY cost',
      'drywall hidden costs',
      'drywall cost FAQ',
    ],
    alternates: getLocalizedAlternates(locale, '/guides/drywall-cost-estimation'),
    openGraph: {
      title: `${t('drywallCostGuide')} | App Guidebook`,
      description: t('drywallCostDesc'),
      url: `https://appguidebook.com/${locale}/guides/drywall-cost-estimation`,
      type: 'article',
    },
  };
}

export default async function DrywallCostPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'drywallCostPage' });
  const tGuides = await getTranslations({ locale, namespace: 'guides' });

  return (
    <div className="py-12">
      <article className="container-custom max-w-4xl">
        <header className="mb-10">
          <Breadcrumbs
            items={[
              { label: tGuides('title'), href: '/guides' },
              { label: tGuides('drywallCostGuide') },
            ]}
            locale={locale}
          />
          <ArticleJsonLd
            path="/guides/drywall-cost-estimation"
            locale={locale}
            headline={tGuides('drywallCostGuide')}
            description={tGuides('drywallCostDesc')}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            {tGuides('drywallCostGuide')}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            {tGuides('drywallCostDesc')}
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-gray-400">
            <span>Updated June 2026</span>
            <span className="text-gray-200">|</span>
            <span>{t('readTime')}</span>
          </div>
        </header>
        <AuthorBio locale={locale} />
        <CategoryIllustration category="drywall" caption={t('illustrationCaption')} />

        {/* Introduction */}
        <p className="text-lg text-gray-700 leading-relaxed mb-12">{t('intro')}</p>

        {/* 1. Material Costs */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('materialsTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('materialsIntro')}</p>
          <p className="text-gray-700 mb-4">{t('materialsP1')}</p>
          <p className="text-gray-700 mb-4">
            {t('materialsP2')}
          </p>
          <p className="text-sm text-gray-500 leading-relaxed border-l-3 border-primary-300 pl-4 mb-4">
            {t('materialsLinkText')}{' '}
            <Link href="/guides/drywall-types-and-sizes" className="text-primary-600 hover:text-primary-700 underline underline-offset-2 font-medium">
              {tGuides('drywallTypesGuide')}
            </Link>
          </p>
          <p className="text-sm text-gray-400 italic">{t('materialsTableNote')}</p>
        </section>

        {/* 2. Labor Costs */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('laborTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('laborIntro')}</p>
          <p className="text-gray-700 mb-4">{t('laborP1')}</p>
          <p className="text-gray-700">{t('laborP2')}</p>
        </section>

        {/* 3. Five Finishing Levels */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('finishingTitle')}</h2>
          <p className="text-gray-700 mb-6">{t('finishingIntro')}</p>

          <div className="space-y-5">
            {(['1', '2', '3', '4', '5'] as const).map((level) => (
              <div key={level} className="bg-gray-50 border border-gray-100 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  {t(`finishingLevel${level}`)}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t(`finishingLevel${level}Desc`)}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mt-6">
            <p className="text-amber-900 text-sm leading-relaxed">
              💡 {t('finishingTip')}
            </p>
          </div>
        </section>

        {/* 4. Complete Calculation Example */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('exampleTitle')}</h2>
          <p className="text-gray-700 mb-6">{t('exampleIntro')}</p>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {(['1', '2', '3', '4', '5', '6'] as const).map((step, idx) => (
              <div key={step} className={`px-6 py-5 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <h3 className="font-semibold text-primary-700 mb-1.5">
                  {t(`exampleStep${step}`)}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t(`exampleStep${step}Desc`)}
                </p>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-4 leading-relaxed">
            {t('exampleLinkText')}{' '}
            <Link href="/guides/how-to-calculate-drywall" className="text-primary-600 hover:text-primary-700 underline underline-offset-2 font-medium">
              {tGuides('drywallCalcGuide')}
            </Link>
          </p>
        </section>

        {/* 5. Hidden Costs */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('hiddenCostsTitle')}</h2>
          <p className="text-gray-700 mb-6">{t('hiddenCostsIntro')}</p>

          <div className="space-y-4">
            {(['1', '2', '3', '4', '5'] as const).map((n) => (
              <div key={n} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  {n}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {t(`hiddenCost${n}`)}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t(`hiddenCost${n}Desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. DIY vs Professional */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('diyVsProTitle')}</h2>
          <p className="text-gray-700 mb-8">{t('diyVsProIntro')}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* DIY column */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-bold text-green-800 text-lg mb-4">{t('diyTitle')}</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-green-700 mb-1">{t('prosLabel')}</p>
                  <p className="text-green-800">{t('diyPros')}</p>
                </div>
                <div>
                  <p className="font-semibold text-red-600 mb-1">{t('consLabel')}</p>
                  <p className="text-gray-700">{t('diyCons')}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700 mb-1">{t('toolkitLabel')}</p>
                  <p className="text-gray-600">{t('diyTools')}</p>
                </div>
              </div>
            </div>

            {/* Pro column */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-blue-800 text-lg mb-4">{t('proTitle')}</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-blue-700 mb-1">{t('prosLabel')}</p>
                  <p className="text-blue-800">{t('proPros')}</p>
                </div>
                <div>
                  <p className="font-semibold text-red-600 mb-1">{t('consLabel')}</p>
                  <p className="text-gray-700">{t('proCons')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary-50 border border-primary-200 rounded-xl p-5">
            <p className="text-primary-900 text-sm leading-relaxed font-medium">
              📋 {t('diyVerdict')}
            </p>
          </div>
        </section>

        {/* 7. Money-Saving Tips */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('savingTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('savingP1')}</p>
          <p className="text-gray-700 mb-4">{t('savingP2')}</p>
          <p className="text-gray-700">{t('savingP3')}</p>
        </section>

        {/* 8. Regional Variations */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('regionalTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('regionalP1')}</p>
          <p className="text-gray-700">{t('regionalP2')}</p>
        </section>

        {/* Summary */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('summaryTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t('summaryP1')}</p>
          <p className="text-gray-700 leading-relaxed">{t('summaryP2')}</p>
        </section>

        {/* FAQ — NEW: purely educational, zero promotion */}
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

        {/* Single CTA — only ONE, at the very end, minimal styling */}
        <div className="border border-gray-200 rounded-2xl p-8 my-12 text-center bg-gray-50/50">
          <p className="text-gray-600 mb-5 max-w-xl mx-auto leading-relaxed text-sm">
            {t('summaryCta')}
          </p>
          <Link
            href="/tools/drywall-calculator"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-white hover:border-gray-400 transition-colors"
          >
            {t('ctaButtonText')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Related Guides */}
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{tGuides('relatedGuides')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/guides/how-to-calculate-drywall" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('drywallCalcGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('drywallCalcDesc')}</p>
            </Link>
            <Link href="/guides/drywall-types-and-sizes" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('drywallTypesGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('drywallTypesDesc')}</p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
