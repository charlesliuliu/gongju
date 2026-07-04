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
    title: t('paintTypesGuide'),
    description: t('paintTypesDesc'),
    keywords: [
      'interior vs exterior paint',
      'difference between interior and exterior paint',
      'best interior paint sheen',
      'exterior paint types',
      'choosing paint for home',
      'interior paint guide',
      'exterior paint guide',
    ],
    alternates: getLocalizedAlternates(locale, '/guides/interior-vs-exterior-paint'),
    openGraph: {
      title: `${t('paintTypesGuide')} | App Guidebook`,
      description: t('paintTypesDesc'),
      url: `https://appguidebook.com/${locale}/guides/interior-vs-exterior-paint`,
      type: 'article',
    },
  };
}

export default async function PaintTypesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'paintTypesPage' });
  const tGuides = await getTranslations({ locale, namespace: 'guides' });
  const tGlobal = await getTranslations({ locale, namespace: 'global' });

  return (
    <div className="py-12">
      <FloatingCalcNav />
      <article className="container-custom max-w-4xl">
        {/* Header */}
        <header className="mb-10">
          <Breadcrumbs
            items={[
              { label: tGuides('title'), href: '/guides' },
              { label: tGuides('paintTypesGuide') },
            ]}
           locale={locale}
/>
          <ArticleJsonLd path="/guides/interior-vs-exterior-paint" locale={locale} headline={tGuides('paintTypesGuide')}
            description={tGuides('paintTypesDesc')}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            {tGuides('paintTypesGuide')}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            {tGuides('paintTypesDesc')}
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

          {/* Quick-access calculator bar — above the fold CTA */}
          <QuickCalcBar category="paint" locale={locale} />
        </section>

        {/* Why Different */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('whyDiffTitle')}</h2>
          <div className="prose prose-gray max-w-none space-y-3">
            <p>{t('whyDiffP1')}</p>
            <p>{t('whyDiffP2')}</p>
          </div>
        </section>

        {/* Interior Guide */}
        <section className="mb-10 p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('interiorTitle')}</h2>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('interiorSheenTitle')}</h3>
          <p className="text-sm text-gray-500 mb-3">{t('interiorSheenDesc')}</p>
          <ul className="space-y-2 text-gray-700 mb-6">
            {['Flat', 'Eggshell', 'Satin', 'Semi', 'Gloss'].map((sheen) => (
              <li key={sheen} className="flex items-start gap-2">
                <span className="text-primary-500 mt-0.5">•</span>
                <span>{t(`sheen${sheen}`)}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('interiorPrepTitle')}</h3>
          <p className="text-sm text-gray-500 mb-3">{t('interiorPrepP1')}</p>
          <ul className="space-y-2 text-gray-700">
            {['Patch', 'Clean', 'Prime', 'Protect'].map((prep) => (
              <li key={prep} className="flex items-start gap-2">
                <span className="text-primary-500 mt-0.5">•</span>
                <span>{t(`prep${prep}`)}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Exterior Guide */}
        <section className="mb-10 p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('exteriorTitle')}</h2>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('exteriorTypesTitle')}</h3>
          <p className="text-sm text-gray-500 mb-3">{t('exteriorTypesDesc')}</p>
          <ul className="space-y-2 text-gray-700 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-0.5">•</span>
              <span>{t('typeAcrylic')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-0.5">•</span>
              <span>{t('typeOil')}</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('exteriorPrepTitle')}</h3>
          <p className="text-sm text-gray-500 mb-3">{t('exteriorPrepP1')}</p>
          <ul className="space-y-2 text-gray-700">
            {['PowerWash', 'Scrape', 'Caulk', 'Prime', 'Weather'].map((prep) => (
              <li key={prep} className="flex items-start gap-2">
                <span className="text-primary-500 mt-0.5">•</span>
                <span>{t(`extPrep${prep}`)}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* How to Choose */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('howToChooseTitle')}</h2>
          <div className="prose prose-gray max-w-none space-y-3">
            <p>{t('howToChooseP1')}</p>
            <p>{t('howToChooseP2')}</p>
          </div>
        </section>

        {/* Can You Use Exterior Indoors */}
        <section className="mb-10 p-6 bg-amber-50 border border-amber-100 rounded-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{t('canYouUseTitle')}</h2>
          <div className="prose prose-gray max-w-none space-y-2">
            <p>{t('canYouUseP1')}</p>
            <p>{t('canYouUseP2')}</p>
          </div>
        </section>

        {/* Summary */}
        <section className="mb-10 p-6 bg-primary-50 border border-primary-100 rounded-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{t('summaryTitle')}</h2>
          <div className="prose prose-gray max-w-none space-y-2">
            <p>{t('summaryP1')}</p>
            <p className="text-sm text-gray-500">{t('summaryP2')}</p>
          </div>
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

        {/* Single neutral tool CTA — only ONE, after FAQ */}
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
          <h2 className="text-xl font-bold text-gray-900 mb-6">{tGuides('relatedGuides')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/guides/how-to-calculate-paint-needed" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('paintCalcGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('paintCalcDesc')}</p>
            </Link>
            <Link href="/guides/paint-coverage-per-gallon" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('paintCoverageGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('paintCoverageDesc')}</p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
