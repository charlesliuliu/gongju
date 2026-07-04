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
    title: t('paintCalcGuide'),
    description: t('paintCalcDesc'),
    keywords: [
      'how to calculate paint needed',
      'paint calculator guide',
      'how much paint for a room',
      'paint coverage formula',
      'calculate paint gallons',
      'wall paint estimation',
    ],
    alternates: getLocalizedAlternates(locale, '/guides/how-to-calculate-paint-needed'),
    openGraph: {
      title: `${t('paintCalcGuide')} | App Guidebook`,
      description: t('paintCalcDesc'),
      url: `https://appguidebook.com/${locale}/guides/how-to-calculate-paint-needed`,
      type: 'article',
    },
  };
}

export default async function PaintCalcPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'paintCalcPage' });
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
              { label: tGuides('paintCalcGuide') },
            ]}
           locale={locale}
/>
          <ArticleJsonLd path="/guides/how-to-calculate-paint-needed" locale={locale} headline={tGuides('paintCalcGuide')}
            description={tGuides('paintCalcDesc')}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            {tGuides('paintCalcGuide')}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            {tGuides('paintCalcDesc')}
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
          <QuickCalcBar category="paint" />
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
            <p>{t('step1Ceilings')}</p>
          </div>
        </section>

        {/* Step 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('step2Title')}</h2>
          <div className="prose prose-gray max-w-none space-y-3">
            <p>{t('step2P1')}</p>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center font-mono text-lg font-semibold text-primary-700">
              {t('step2Formula')}
            </div>
            <p className="font-medium text-gray-700">→ {t('step2Example')}</p>
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

        {/* Summary */}
        <section className="mb-10 p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{t('summaryTitle')}</h2>
          <div className="prose prose-gray max-w-none space-y-2">
            <p>{t('summaryP1')}</p>
            <p>{t('summaryP2')}</p>
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
      </article>
    </div>
  );
}
