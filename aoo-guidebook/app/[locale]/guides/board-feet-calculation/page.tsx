import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getLocalizedAlternates } from '@/lib/seo';
import { Breadcrumbs, ArticleJsonLd } from '@/components/ui/Breadcrumbs';
import AuthorBio from '@/components/ui/AuthorBio';
import CategoryIllustration from '@/components/ui/CategoryIllustration';
import QuickCalcBar from '@/components/ui/QuickCalcBar';
import FloatingCalcNav from '@/components/ui/FloatingCalcNav';

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
      title: `${t('boardFeetGuide')} | App Guidebook`,
      description: t('boardFeetDesc'),
      url: `https://appguidebook.com/${locale}/guides/board-feet-calculation`,
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
      <FloatingCalcNav />
      <article className="container-custom max-w-4xl">
        {/* Header */}
        <header className="mb-10">
          <Breadcrumbs
            items={[
              { label: tGuides('title'), href: '/guides' },
              { label: tGuides('boardFeetGuide') },
            ]}
            locale={locale}
          />
          <ArticleJsonLd path="/guides/board-feet-calculation" locale={locale} headline={tGuides('boardFeetGuide')}
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
        <AuthorBio locale={locale} />
        <CategoryIllustration category="lumber" caption={t('illustrationCaption')} />

        {/* Introduction */}
        <section className="prose prose-gray max-w-none mb-10">
          <p>{t('intro')}</p>

          {/* Quick-access calculator bar — above the fold CTA */}
          <QuickCalcBar category="lumber" locale={locale} />
        </section>

        {/* What is a Board Foot */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('whatIsTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('whatIsP1')}</p>
          <p className="text-gray-700">{t('whatIsP2')}</p>
        </section>

        {/* Board Foot Formula */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('formulaTitle')}</h2>
          <p className="text-gray-700 mb-6">{t('formulaP1')}</p>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 my-6 text-center">
            <p className="text-lg font-mono font-semibold text-gray-900">{t('formulaBox')}</p>
          </div>
        </section>

        {/* Calculation Examples */}
        <section className="mb-10">
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
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('vsTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('vsP1')}</p>
          <p className="text-gray-700">{t('vsP2')}</p>
        </section>

        {/* Board Foot Pricing */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('pricingTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('pricingP1')}</p>
          <p className="text-gray-700">{t('pricingP2')}</p>
        </section>

        {/* Quick Reference Chart */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('chartTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('chartP1')}</p>
          <p className="text-sm text-gray-500 leading-relaxed">
            {t('chartLinkText')}{' '}
            <Link href="/guides/lumber-sizes-and-types" className="text-primary-600 hover:text-primary-700 underline underline-offset-2 font-medium">
              {tGuides('lumberSizesGuide')}
            </Link>
          </p>
        </section>

        {/* Tips for Estimating */}
        <section className="mb-10">
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
            href="/tools/lumber-calculator"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/guides/lumber-sizes-and-types" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{t('relatedGuide1Title')}</h3>
              <p className="text-sm text-gray-500">{t('relatedGuide1Desc')}</p>
            </Link>
            <Link href="/guides/how-to-calculate-lumber" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{t('relatedGuide2Title')}</h3>
              <p className="text-sm text-gray-500">{t('relatedGuide2Desc')}</p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
