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
    title: t('drywallTypesGuide'),
    description: t('drywallTypesDesc'),
    keywords: [
      'drywall types',
      'drywall sizes',
      'drywall thickness',
      'sheetrock types',
      'drywall comparison',
      'best drywall for walls',
    ],
    alternates: getLocalizedAlternates(locale, '/guides/drywall-types-and-sizes'),
    openGraph: {
      title: `${t('drywallTypesGuide')} | App Guidebook`,
      description: t('drywallTypesDesc'),
      url: `https://appguidebook.com/${locale}/guides/drywall-types-and-sizes`,
      type: 'article',
    },
  };
}

export default async function DrywallTypesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'drywallTypesPage' });
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
              { label: tGuides('drywallTypesGuide') },
            ]}
           locale={locale}
/>
          <ArticleJsonLd path="/guides/drywall-types-and-sizes" locale={locale} headline={tGuides('drywallTypesGuide')}
            description={tGuides('drywallTypesDesc')}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            {tGuides('drywallTypesGuide')}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            {tGuides('drywallTypesDesc')}
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

          {/* Quick-access calculator bar — above the fold CTA */}
          <QuickCalcBar category="drywall" />

        {/* Standard Sizes */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('sizesTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('sizesP1')}</p>
          <p className="text-gray-700">{t('sizesP2')}</p>
        </section>

        {/* Thickness Options */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('thicknessTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('thicknessP1')}</p>
          <p className="text-gray-700">{t('thicknessP2')}</p>
        </section>

        {/* Specialty Types */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('specialtyTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('specialtyP1')}</p>
          <p className="text-sm text-gray-500 leading-relaxed">
            {t('specialtyLinkText')}{' '}
            <Link href="/guides/how-to-calculate-drywall" className="text-primary-600 hover:text-primary-700 underline underline-offset-2 font-medium">
              {tGuides('drywallCalcGuide')}
            </Link>
          </p>
        </section>

        {/* Choosing the Right Type */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('choosingTitle')}</h2>
          <p className="text-gray-700">{t('choosingP1')}</p>
        </section>

        {/* Summary */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('summaryTitle')}</h2>
          <p className="text-gray-700 leading-relaxed">{t('summaryP1')}</p>
        </section>

        {/* FAQ */}
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

        {/* Single neutral tool entry — only ONE, at the very end */}
        <div className="border border-gray-200 rounded-2xl p-8 my-12 text-center bg-gray-50/50">
          <p className="text-gray-600 mb-5 max-w-xl mx-auto leading-relaxed text-sm">
            {t('toolEntryText')}
          </p>
          <Link
            href="/tools/drywall-calculator"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-white hover:border-gray-400 transition-colors"
          >
            {t('toolEntryLink')}
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
            <Link href="/guides/drywall-cost-estimation" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('drywallCostGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('drywallCostDesc')}</p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
