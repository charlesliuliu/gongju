import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getLocalizedAlternates } from '@/lib/seo';
import { Breadcrumbs, ArticleJsonLd } from '@/components/ui/Breadcrumbs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guides' });
  return {
    title: t('concreteCalcGuide'),
    description: t('concreteCalcDesc'),
    keywords: [
      'how to calculate concrete',
      'concrete calculation formula',
      'concrete volume calculator',
      'calculate concrete for slab',
      'concrete estimation',
      'concrete math',
    ],
    alternates: getLocalizedAlternates(locale, '/guides/how-to-calculate-concrete'),
    openGraph: {
      title: 'How to Calculate Concrete for Your Project - Complete Guide',
      description:
        'Learn how to calculate concrete volume for slabs, footings, and columns with step-by-step instructions.',
      url: 'https://appguidebook.com/guides/how-to-calculate-concrete',
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

export default async function HowToCalculateConcretePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'concreteCalcPage' });
  const tGuides = await getTranslations({ locale, namespace: 'guides' });
  const tGlobal = await getTranslations({ locale, namespace: 'global' });

  return (
    <div className="py-12">
      <article className="container-custom max-w-4xl">
        {/* Article Header */}
        <header className="mb-10">
          <Breadcrumbs
            items={[
              { label: tGuides('title'), href: '/guides' },
              { label: tGuides('concreteCalcGuide') },
            ]}
          />
          <ArticleJsonLd
            headline={tGuides('concreteCalcGuide')}
            description={tGuides('concreteCalcDesc')}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            {tGuides('concreteCalcGuide')}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            {tGuides('concreteCalcDesc')}
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
            <li><a href="#measurements" className="text-primary-600 hover:underline">{t('tocMeasurements')}</a></li>
            <li><a href="#slab" className="text-primary-600 hover:underline">{t('tocSlab')}</a></li>
            <li><a href="#footings" className="text-primary-600 hover:underline">{t('tocFootings')}</a></li>
            <li><a href="#columns" className="text-primary-600 hover:underline">{t('tocColumns')}</a></li>
            <li><a href="#bags" className="text-primary-600 hover:underline">{t('tocBags')}</a></li>
            <li><a href="#cost" className="text-primary-600 hover:underline">{t('tocCost')}</a></li>
            <li><a href="#tips" className="text-primary-600 hover:underline">{t('tocTips')}</a></li>
            <li><a href="#mistakes" className="text-primary-600 hover:underline">{t('tocMistakes')}</a></li>
          </ul>
        </nav>

        {/* Calculator CTA */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 mb-12 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="font-semibold text-white text-lg">{t('ctaBannerTitle')}</h3>
            <p className="text-primary-100 text-sm">{t('ctaBannerDesc')}</p>
          </div>
          <Link href="/tools/concrete-calculator" className="inline-flex items-center gap-2 bg-white text-primary-700 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary-50 transition-all duration-200">
            {t('ctaBannerBtn')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Introduction */}
        <p className="text-lg text-gray-700 leading-relaxed mb-12">{t('intro')}</p>

        {/* Understanding Measurements */}
        <section id="measurements" className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('measurementsTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('measurementsP1')}</p>
          <TipBox variant="info" title={t('measurementsTipTitle')}>
            <ul className="text-gray-700">
              <li><strong>{t('measurementsTip1')}</strong></li>
              <li><strong>{t('measurementsTip2')}</strong></li>
              <li><strong>{t('measurementsTip3')}</strong></li>
              <li><strong>{t('measurementsTip4')}</strong></li>
            </ul>
          </TipBox>
          <p className="text-gray-700">{t('measurementsP2')}</p>
        </section>

        {/* Slabs */}
        <section id="slab" className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('slabTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('slabP1')}</p>
          <FormulaBox formula={t('slabFormula')} note={t('slabFormulaNote')} />
          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">{t('slabExampleTitle')}</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-4">
            <Steps>
              <li><strong>{t('slabStep1')}</strong></li>
              <li><strong>{t('slabStep2')}</strong></li>
              <li><strong>{t('slabStep3')}</strong></li>
              <li><strong>{t('slabStep4')}</strong></li>
            </Steps>
          </div>
          <p className="text-gray-700">{t('slabResult')}</p>
        </section>

        {/* Footings */}
        <section id="footings" className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('footingsTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('footingsP1')}</p>
          <FormulaBox formula={t('footingsFormula')} />
          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">{t('footingsExampleTitle')}</h3>
          <p className="text-gray-700 mb-4">{t('footingsExampleDesc')}</p>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-4">
            <Steps>
              <li><strong>{t('footingsStep1')}</strong></li>
              <li><strong>{t('footingsStep2')}</strong></li>
              <li><strong>{t('footingsStep3')}</strong></li>
            </Steps>
          </div>
        </section>

        {/* Columns */}
        <section id="columns" className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('columnsTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('columnsP1')}</p>
          <FormulaBox formula={t('columnsFormula')} note={t('columnsFormulaNote')} />
          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">{t('columnsExampleTitle')}</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-4">
            <Steps>
              <li><strong>{t('columnsStep1')}</strong></li>
              <li><strong>{t('columnsStep2')}</strong></li>
              <li><strong>{t('columnsStep3')}</strong></li>
              <li><strong>{t('columnsStep4')}</strong></li>
            </Steps>
          </div>
        </section>

        {/* Bags */}
        <section id="bags" className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('bagsTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('bagsP1')}</p>
          <FormulaBox formula={t('bagsFormula')} note={t('bagsFormulaNote')} />
          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">{t('bagsExampleTitle')}</h3>
          <ComparisonTable>
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left font-semibold text-gray-900">{t('bagsHeaderBagSize')}</th>
                <th className="p-3 text-left font-semibold text-gray-900">{t('bagsHeaderCoverage')}</th>
                <th className="p-3 text-left font-semibold text-gray-900">{t('bagsHeaderNeeded')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="p-3 font-medium">{t('bags60lb')}</td>
                <td className="p-3 text-gray-600">0.45 cu ft</td>
                <td className="p-3">{t('bags60lbResult')}</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">{t('bags80lb')}</td>
                <td className="p-3 text-gray-600">0.60 cu ft</td>
                <td className="p-3">{t('bags80lbResult')}</td>
              </tr>
            </tbody>
          </ComparisonTable>
          <p className="text-gray-700 mt-4"><strong>{t('bagsAdvice')}</strong></p>
        </section>

        {/* Cost */}
        <section id="cost" className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('costTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('costP1')}</p>
          <ComparisonTable>
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left font-semibold text-gray-900">{t('costHeaderType')}</th>
                <th className="p-3 text-left font-semibold text-gray-900">{t('costHeaderPrice')}</th>
                <th className="p-3 text-left font-semibold text-gray-900">{t('costHeaderBest')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="p-3 font-medium">{t('costReadyMix')}</td>
                <td className="p-3 text-gray-600">{t('costReadyMixPrice')}</td>
                <td className="p-3 text-gray-600">{t('costReadyMixBest')}</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">{t('costBag60')}</td>
                <td className="p-3 text-gray-600">{t('costBag60Price')}</td>
                <td className="p-3 text-gray-600">{t('costBag60Best')}</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">{t('costBag80')}</td>
                <td className="p-3 text-gray-600">{t('costBag80Price')}</td>
                <td className="p-3 text-gray-600">{t('costBag80Best')}</td>
              </tr>
            </tbody>
          </ComparisonTable>
          <TipBox variant="warning" title={t('costAddTitle')}>
            <ul className="text-gray-700">
              <li>{t('costAdd1')}</li>
              <li>{t('costAdd2')}</li>
              <li>{t('costAdd3')}</li>
              <li>{t('costAdd4')}</li>
              <li>{t('costAdd5')}</li>
            </ul>
          </TipBox>
        </section>

        {/* Pro Tips */}
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

        {/* Common Mistakes */}
        <section id="mistakes" className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('mistakesTitle')}</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
                <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{t(`mistake${i}Title`)}</h3>
                  <p className="text-gray-700 text-sm mt-0.5">{t(`mistake${i}Desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('conclusionTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t('conclusionP1')}</p>
          <p className="text-gray-700 leading-relaxed">{t('conclusionP2')}</p>
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
          <h2 className="text-xl font-bold text-gray-900 mb-6">{t('relatedTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/guides/concrete-slab-cost-guide" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('slabCostGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('slabCostDesc')}</p>
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
