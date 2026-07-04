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
    title: t('roofPitchCalcGuide'),
    description: t('roofPitchCalcDesc'),
    keywords: [
      'how to calculate roof pitch',
      'measure roof pitch',
      'roof pitch measurement',
      'find roof pitch',
      'roof slope measurement',
      'roof angle calculator',
    ],
    alternates: getLocalizedAlternates(locale, '/guides/how-to-calculate-roof-pitch'),
    openGraph: {
      title: `${t('roofPitchCalcGuide')} | App Guidebook`,
      description: t('roofPitchCalcDesc'),
      url: `https://appguidebook.com/${locale}/guides/how-to-calculate-roof-pitch`,
      type: 'article',
    },
  };
}

export default async function HowToCalculateRoofPitchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'roofPitchGuide' });
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
              { label: tGuides('roofPitchCalcGuide') },
            ]}
           locale={locale}
/>
          <ArticleJsonLd path="/guides/how-to-calculate-roof-pitch" locale={locale} headline={tGuides('roofPitchCalcGuide')}
            description={tGuides('roofPitchCalcDesc')}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            {tGuides('roofPitchCalcGuide')}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            {tGuides('roofPitchCalcDesc')}
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-gray-400">
            <span>Updated June 2026</span>
            <span className="text-gray-200">|</span>
            <span>{t('readTime')}</span>
          </div>
        </header>
          <AuthorBio locale={locale} />
          <CategoryIllustration category="roofing" caption={t('illustrationCaption')} />

        {/* Introduction */}
        <p className="text-lg text-gray-700 leading-relaxed mb-12">{t('intro')}</p>

          {/* Quick-access calculator bar — above the fold CTA */}
          <QuickCalcBar category="roofing" locale={locale} />

        {/* What Is Roof Pitch */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('whatIsTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('whatIsP1')}</p>
          <p className="text-gray-700 mb-4">{t('whatIsP2')}</p>
          <p className="text-gray-700">{t('whatIsP3')}</p>
        </section>

        {/* Method 1 */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('method1Title')}</h2>
          <p className="text-gray-700 mb-6">{t('method1Intro')}</p>
          <ol className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <li key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold">{i}</span>
                <span className="text-gray-700 pt-0.5">{t(`method1Step${i}`)}</span>
              </li>
            ))}
          </ol>
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm text-gray-700"><strong>Tip:</strong> {t('method1Tip')}</p>
          </div>
        </section>

        {/* Method 2 */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('method2Title')}</h2>
          <p className="text-gray-700 mb-6">{t('method2Intro')}</p>
          <ol className="space-y-3">
            {[1, 2, 3].map((i) => (
              <li key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold">{i}</span>
                <span className="text-gray-700 pt-0.5">{t(`method2Step${i}`)}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Method 3 */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('method3Title')}</h2>
          <p className="text-gray-700 mb-4">{t('method3P1')}</p>
          <p className="text-gray-700">{t('method3P2')}</p>
        </section>

        {/* Why Pitch Matters */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('whyMattersTitle')}</h2>
          <p className="text-gray-700 mb-6">{t('whyMattersP1')}</p>
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-gray-700 text-sm">{t('whyMattersLow')}</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-gray-700 text-sm">{t('whyMattersConventional')}</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-gray-700 text-sm">{t('whyMattersSteep')}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4 leading-relaxed">
            {t('whyMattersLinkText')}{' '}
            <Link href="/guides/roofing-materials-guide" className="text-primary-600 hover:text-primary-700 underline underline-offset-2 font-medium">
              {tGuides('roofingMaterialsGuide')}
            </Link>
          </p>
        </section>

        {/* Step by Step */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('stepByStepTitle')}</h2>
          <p className="text-gray-700 mb-6">{t('stepByStepP1')}</p>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-4">
            <ol className="space-y-3 text-gray-700">
              {[1, 2, 3, 4].map((i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold">{i}</span>
                  <span className="pt-0.5">{t(`stepByStepStep${i}`)}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-gray-700 font-medium">{t('stepByStepResult')}</p>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('mistakesTitle')}</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-red-50 border border-red-200 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{t(`mistake${i}Title`)}</h3>
                <p className="text-gray-700 text-sm">{t(`mistake${i}Desc`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('summaryTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t('summaryP1')}</p>
          <p className="text-gray-700 leading-relaxed">{t('summaryP2')}</p>
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
            href="/tools/roof-pitch-calculator"
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
            <Link href="/guides/roofing-materials-guide" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('roofingMaterialsGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('roofingMaterialsDesc')}</p>
            </Link>
            <Link href="/guides/roof-pitch-angle-conversion" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('pitchAngleGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('pitchAngleDesc')}</p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
