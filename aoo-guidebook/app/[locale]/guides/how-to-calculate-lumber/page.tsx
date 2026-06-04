import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getLocalizedAlternates } from '@/lib/seo';
import { Breadcrumbs, ArticleJsonLd } from '@/components/ui/Breadcrumbs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guides' });
  return {
    title: t('lumberCalcGuide'),
    description: t('lumberCalcDesc'),
    keywords: [
      'how to calculate lumber',
      'lumber calculation formula',
      'board feet calculator',
      'calculate board feet',
      'lumber estimation',
      'lumber math',
      'wood volume calculation',
      'board foot formula',
    ],
    alternates: getLocalizedAlternates(locale, '/guides/how-to-calculate-lumber'),
    openGraph: {
      title: `${t('howToCalculateLumberGuide')} | App Guidebook`,
      description: t('howToCalculateLumberDesc'),
      url: `https://appguidebook.com/${locale}/guides/how-to-calculate-lumber`,
      type: 'article',
    },
  };
}

function Steps({ children }: { children: React.ReactNode }) {
  return <ol className="space-y-3 text-gray-700 my-4">{children}</ol>;
}

function TipBox({ variant = 'info', title, children }: { variant?: 'info' | 'tip' | 'warning' | 'error'; title?: string; children: React.ReactNode }) {
  const colors = {
    info: 'bg-blue-50 border-blue-200 text-blue-900',
    tip: 'bg-green-50 border-green-200 text-green-900',
    warning: 'bg-amber-50 border-amber-200 text-amber-900',
    error: 'bg-red-50 border-red-200 text-red-900',
  };
  return (
    <div className={`${colors[variant]} border rounded-xl p-5 my-6`}>
      {title && <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>}
      <div className="text-sm [&_ul]:space-y-1 [&_ol]:space-y-2">{children}</div>
    </div>
  );
}

function FormulaBox({ formula, note }: { formula: string; note?: string }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 my-6 text-center">
      <p className="text-lg font-mono font-semibold text-gray-900">{formula}</p>
      {note && <p className="text-sm text-gray-500 mt-2">{note}</p>}
    </div>
  );
}

function ComparisonTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto my-4 rounded-xl border border-gray-200">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  );
}

export default async function HowToCalculateLumberPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'lumberCalcPage' });
  const tGuides = await getTranslations({ locale, namespace: 'guides' });

  return (
    <div className="py-12">
      <article className="container-custom max-w-4xl">
        {/* Article Header */}
        <header className="mb-10">
          <Breadcrumbs
            items={[
              { label: tGuides('title'), href: '/guides' },
              { label: tGuides('lumberCalcGuide') },
            ]}
           locale={locale}
/>
          <ArticleJsonLd path="/guides/how-to-calculate-lumber" locale={locale} headline={tGuides('lumberCalcGuide')}
            description={tGuides('lumberCalcDesc')}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            {tGuides('lumberCalcGuide')}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            {tGuides('lumberCalcDesc')}
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-gray-400">
            <span>Updated June 2026</span>
            <span className="text-gray-200">|</span>
            <span>{t('readTime')}</span>
          </div>
        </header>

        {/* Table of Contents */}
        <nav className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-12">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">{t('tocTitle')}</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <li><a href="#what-is" className="text-primary-600 hover:underline">{t('tocWhatIs')}</a></li>
            <li><a href="#how-to" className="text-primary-600 hover:underline">{t('tocHowTo')}</a></li>
            <li><a href="#steps" className="text-primary-600 hover:underline">{t('tocSteps')}</a></li>
            <li><a href="#sizes" className="text-primary-600 hover:underline">{t('tocSizes')}</a></li>
            <li><a href="#tips" className="text-primary-600 hover:underline">{t('tocTips')}</a></li>
            <li><a href="#summary" className="text-primary-600 hover:underline">{t('tocSummary')}</a></li>
          </ul>
        </nav>

        {/* Calculator CTA */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 mb-12 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="font-semibold text-white text-lg">{t('ctaBannerTitle')}</h3>
            <p className="text-primary-100 text-sm">{t('ctaBannerDesc')}</p>
          </div>
          <Link href="/tools/lumber-calculator" className="inline-flex items-center gap-2 bg-white text-primary-700 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary-50 transition-all duration-200">
            {t('ctaBannerBtn')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* What is Board Feet */}
        <section id="what-is" className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('whatIsTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('whatIsP1')}</p>
          <p className="text-gray-700">{t('whatIsP2')}</p>
          <TipBox variant="info" title={t('whatIsTipTitle')}>
            <p className="text-gray-700">{t('whatIsTip')}</p>
          </TipBox>
        </section>

        {/* How to Calculate Board Feet */}
        <section id="how-to" className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('howToTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('howToP1')}</p>
          <FormulaBox formula={t('formulaTitle')} note={t('formulaDesc')} />
          <p className="text-gray-700 mt-6">{t('howToP2')}</p>
        </section>

        {/* Step-by-Step Guide */}
        <section id="steps" className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('stepsTitle')}</h2>
          <p className="text-gray-700 mb-6">{t('stepsIntro')}</p>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-4">
            <Steps>
              <li><strong>{t('step1Title')}:</strong> {t('step1Desc')}</li>
              <li><strong>{t('step2Title')}:</strong> {t('step2Desc')}</li>
              <li><strong>{t('step3Title')}:</strong> {t('step3Desc')}</li>
              <li><strong>{t('step4Title')}:</strong> {t('step4Desc')}</li>
            </Steps>
          </div>
        </section>

        {/* Common Lumber Sizes */}
        <section id="sizes" className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('sizesTitle')}</h2>
          <p className="text-gray-700 mb-6">{t('sizesP1')}</p>
          <ComparisonTable>
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left font-semibold text-gray-900">{t('sizesHeaderNominal')}</th>
                <th className="p-3 text-left font-semibold text-gray-900">{t('sizesHeaderActual')}</th>
                <th className="p-3 text-left font-semibold text-gray-900">{t('sizesHeaderBoardFeet')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="p-3 font-medium">1 x 4</td>
                <td className="p-3 text-gray-600">3/4" x 3-1/2"</td>
                <td className="p-3 text-gray-600">0.33 BF/ft</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">1 x 6</td>
                <td className="p-3 text-gray-600">3/4" x 5-1/2"</td>
                <td className="p-3 text-gray-600">0.5 BF/ft</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">1 x 8</td>
                <td className="p-3 text-gray-600">3/4" x 7-1/4"</td>
                <td className="p-3 text-gray-600">0.67 BF/ft</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">2 x 4</td>
                <td className="p-3 text-gray-600">1-1/2" x 3-1/2"</td>
                <td className="p-3 text-gray-600">0.67 BF/ft</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">2 x 6</td>
                <td className="p-3 text-gray-600">1-1/2" x 5-1/2"</td>
                <td className="p-3 text-gray-600">1.0 BF/ft</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">2 x 8</td>
                <td className="p-3 text-gray-600">1-1/2" x 7-1/4"</td>
                <td className="p-3 text-gray-600">1.33 BF/ft</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">2 x 10</td>
                <td className="p-3 text-gray-600">1-1/2" x 9-1/4"</td>
                <td className="p-3 text-gray-600">1.67 BF/ft</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">4 x 4</td>
                <td className="p-3 text-gray-600">3-1/2" x 3-1/2"</td>
                <td className="p-3 text-gray-600">1.33 BF/ft</td>
              </tr>
            </tbody>
          </ComparisonTable>
        </section>

        {/* Tips for Accurate Calculation */}
        <section id="tips" className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('tipsTitle')}</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{t(`tip${i}Title`)}</h3>
                  <p className="text-gray-700 text-sm mt-0.5">{t(`tip${i}Desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section id="summary" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('summaryTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t('summaryP1')}</p>
          <p className="text-gray-700 leading-relaxed">{t('summaryP2')}</p>
        </section>

        {/* Bottom CTA */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 my-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('ctaTitle')}</h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">{t('ctaDesc')}</p>
          <Link href="/tools/lumber-calculator" className="btn-primary inline-flex items-center gap-2">
            {t('ctaBtn')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Related */}
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{t('relatedTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/guides/lumber-sizes-and-types" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('lumberSizesGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('lumberSizesDesc')}</p>
            </Link>
            <Link href="/guides/board-feet-calculation" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('boardFeetCalcGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('boardFeetCalcDesc')}</p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
