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
    title: t('flooringCalcGuide'),
    description: t('flooringCalcDesc'),
    keywords: [
      'calculate flooring materials',
      'how much flooring do I need',
      'flooring calculator guide',
      'measure room for flooring',
      'flooring waste factor',
      'flooring boxes needed',
    ],
    alternates: getLocalizedAlternates(locale, '/guides/how-to-calculate-flooring-materials'),
    openGraph: {
      title: `${t('flooringCalcGuide')} | App Guidebook`,
      description: t('flooringCalcDesc'),
      url: `https://appguidebook.com/${locale}/guides/how-to-calculate-flooring-materials`,
      type: 'article',
    },
  };
}

export default async function FlooringCalcPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'flooringCalcPage' });
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
              { label: tGuides('flooringCalcGuide') },
            ]}
            locale={locale}
          />
          <ArticleJsonLd path="/guides/how-to-calculate-flooring-materials" locale={locale} headline={tGuides('flooringCalcGuide')}
            description={tGuides('flooringCalcDesc')}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            {tGuides('flooringCalcGuide')}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            {tGuides('flooringCalcDesc')}
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-gray-400">
            <span>Updated June 2026</span>
            <span className="text-gray-200">|</span>
            <span>{t('readTime')}</span>
          </div>
        </header>
        <AuthorBio locale={locale} />
        <CategoryIllustration category="flooring" caption={t('illustrationCaption')} />

        {/* Intro */}
        <section className="prose prose-gray max-w-none mb-10">
          <p>{t('intro')}</p>
        </section>

        {/* Why Accurate */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('whyAccurateTitle')}</h2>
          <div className="prose prose-gray max-w-none space-y-3">
            <p>{t('whyAccurateP1')}</p>
            <p>{t('whyAccurateP2')}</p>
          </div>
        </section>

        {/* Step 1 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('step1Title')}</h2>
          <div className="prose prose-gray max-w-none space-y-3">
            <p>{t('step1P1')}</p>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center font-mono text-lg font-semibold text-primary-700">
              {t('step1Formula')}
            </div>
            <p className="font-medium text-gray-700">→ {t('step1Example')}</p>
            <p>{t('step1LShape')}</p>
          </div>
        </section>

        {/* Step 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('step2Title')}</h2>
          <div className="prose prose-gray max-w-none space-y-3">
            <p>{t('step2P1')}</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>{t('step2Standard')}</li>
              <li>{t('step2Diagonal')}</li>
              <li>{t('step2Multiple')}</li>
            </ul>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center font-mono text-lg font-semibold text-primary-700">
              {t('step2Formula')}
            </div>
            <p className="font-medium text-gray-700">→ {t('step2Example')}</p>
            <p className="text-sm text-gray-500 italic">
              📖 <Link href="/guides/flooring-cost-estimation" className="text-primary-600 hover:text-primary-700 underline">
                {t('step2LinkText')}
              </Link>
            </p>
          </div>
        </section>

        {/* Step 3 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('step3Title')}</h2>
          <div className="prose prose-gray max-w-none space-y-3">
            <p>{t('step3P1')}</p>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center font-mono text-lg font-semibold text-primary-700">
              {t('step3Formula')}
            </div>
            <p className="font-medium text-gray-700">→ {t('step3Example')}</p>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
              <strong>💡 {t('step3Note')}</strong>
            </div>
          </div>
        </section>

        {/* Step 4 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('step4Title')}</h2>
          <div className="prose prose-gray max-w-none space-y-3">
            <p>{t('step4P1')}</p>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center font-mono text-lg font-semibold text-primary-700">
              {t('step4Formula')}
            </div>
            <p className="font-medium text-gray-700">→ {t('step4Example')}</p>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
              <strong>💡 {t('step4Note')}</strong>
            </div>
          </div>
        </section>

        {/* Summary — pure educational, no tool buttons */}
        <section className="mb-10 p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{t('summaryTitle')}</h2>
          <div className="prose prose-gray max-w-none space-y-2">
            <p>{t('summaryP1')}</p>
            <p>{t('summaryP2')}</p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('faqTitle')}</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <details key={i} className="bg-white border border-gray-200 rounded-xl p-5 group">
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                  <span>{t(`faqQ${i}` as keyof typeof t)}</span>
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  {t(`faqA${i}` as keyof typeof t)}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Single neutral CTA — only ONE, at the very end */}
        <div className="border border-gray-200 rounded-2xl p-8 my-12 text-center bg-gray-50/50">
          <p className="text-gray-600 mb-5 max-w-xl mx-auto leading-relaxed text-sm">{t('newCtaDesc')}</p>
          <Link
            href="/tools/flooring-calculator"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-white hover:border-gray-400 transition-colors"
          >
            {t('newCtaBtn')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Related Guides */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('relatedTitle')}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/guides/diy-flooring-mistakes"
              className="block p-5 bg-white border border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-1">{t('relatedGuide1Title')}</h3>
              <p className="text-sm text-gray-500">{t('relatedGuide1Desc')}</p>
            </Link>
            <Link
              href="/guides/flooring-cost-estimation"
              className="block p-5 bg-white border border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-1">{tGuides('flooringCostGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('flooringCostDesc')}</p>
            </Link>
            <Link
              href="/guides/flooring-types-comparison"
              className="block p-5 bg-white border border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-1">{tGuides('flooringTypesGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('flooringTypesDesc')}</p>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
