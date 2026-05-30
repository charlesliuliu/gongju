import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getLocalizedAlternates } from '@/lib/seo';
import { Breadcrumbs, ArticleJsonLd } from '@/components/ui/Breadcrumbs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guides' });
  return {
    title: t('mixRatiosGuide'),
    description: t('mixRatiosDesc'),
    keywords: [
      'concrete mix ratio',
      'concrete mix types',
      'concrete strength grades',
      'what concrete mix to use',
      'concrete psi ratings',
      'concrete mix design',
    ],
    alternates: getLocalizedAlternates(locale, '/guides/concrete-mix-ratios'),
    openGraph: {
      title: 'Understanding Concrete Mix Ratios - Complete Guide',
      description: 'Learn about concrete mix ratios, strength grades, and when to use each type.',
      url: 'https://appguidebook.com/guides/concrete-mix-ratios',
      type: 'article',
    },
  };
}

export default async function ConcreteMixRatiosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'mixRatiosPage' });
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
              { label: tGuides('mixRatiosGuide') },
            ]}
          />
          <ArticleJsonLd
            headline={tGuides('mixRatiosGuide')}
            description={tGuides('mixRatiosDesc')}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            {tGuides('mixRatiosGuide')}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            {tGuides('mixRatiosDesc')}
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-gray-400">
            <span>Updated June 2026</span>
            <span className="text-gray-200">|</span>
            <span>{t('readTime')}</span>
          </div>
        </header>

        {/* Quick Mix Reference */}
        <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 mb-12">
          <h2 className="text-sm font-semibold text-primary-100 uppercase tracking-wider mb-6 text-center">
            {t('quickRefTitle')}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-primary-400">
                  <th className="text-left p-2 text-primary-100 font-medium">{t('quickRefUseCase')}</th>
                  <th className="text-left p-2 text-primary-100 font-medium">{t('quickRefMix')}</th>
                  <th className="text-left p-2 text-primary-100 font-medium">{t('quickRefPsi')}</th>
                </tr>
              </thead>
              <tbody className="text-white">
                <tr className="border-b border-primary-500">
                  <td className="p-2">{t('quickRefPatio')}</td>
                  <td className="p-2">{t('quickRef3000')}</td>
                  <td className="p-2">3,000</td>
                </tr>
                <tr className="border-b border-primary-500">
                  <td className="p-2">{t('quickRefDriveway')}</td>
                  <td className="p-2">{t('quickRef3500')}</td>
                  <td className="p-2">3,500–4,000</td>
                </tr>
                <tr className="border-b border-primary-500">
                  <td className="p-2">{t('quickRefFoundation')}</td>
                  <td className="p-2">{t('quickRef3000_3500')}</td>
                  <td className="p-2">3,000–3,500</td>
                </tr>
                <tr>
                  <td className="p-2">{t('quickRefGarage')}</td>
                  <td className="p-2">{t('quickRef4000')}</td>
                  <td className="p-2">4,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Introduction */}
        <p className="text-lg text-gray-700 leading-relaxed mb-12">
          {t('intro')}
        </p>

        {/* What Is a Mix Ratio */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">
            {t('whatIsTitle')}
          </h2>
          <p className="text-gray-700 mb-4">
            {t('whatIsDesc')}
            <strong>{t('whatIsItems')}</strong>
            {t('whatIsSuffix')}
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-6">
            <h3 className="font-semibold text-gray-900 mb-3">{t('exampleTitle')}</h3>
            <ul className="space-y-2 text-gray-700">
              <li><strong>1 part</strong> {t('exampleCement')}</li>
              <li><strong>2 parts</strong> {t('exampleSand')}</li>
              <li><strong>3 parts</strong> {t('exampleGravel')}</li>
            </ul>
            <p className="text-sm text-gray-500 mt-3">
              {t('exampleNote')}
            </p>
          </div>
        </section>

        {/* Strength Grades */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">
            {t('strengthTitle')}
          </h2>
          <p className="text-gray-700 mb-6">
            {t('strengthDesc')}
          </p>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-green-100 text-green-700 px-2.5 py-0.5 rounded-lg text-sm font-semibold">{t('grade2500Label')}</span>
                <h3 className="font-semibold text-gray-900">{t('grade2500Title')}</h3>
              </div>
              <p className="text-gray-600 text-sm mb-1">{t('grade2500Use')}</p>
              <p className="text-gray-400 text-sm">{t('grade2500Mix')}</p>
            </div>

            <div className="border border-gray-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-lg text-sm font-semibold">{t('grade3000Label')}</span>
                <h3 className="font-semibold text-gray-900">{t('grade3000Title')}</h3>
              </div>
              <p className="text-gray-600 text-sm mb-1">{t('grade3000Use')}</p>
              <p className="text-gray-400 text-sm">{t('grade3000Mix')}</p>
            </div>

            <div className="border border-gray-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-lg text-sm font-semibold">{t('grade3500Label')}</span>
                <h3 className="font-semibold text-gray-900">{t('grade3500Title')}</h3>
              </div>
              <p className="text-gray-600 text-sm mb-1">{t('grade3500Use')}</p>
              <p className="text-gray-400 text-sm">{t('grade3500Mix')}</p>
            </div>

            <div className="border border-gray-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-red-100 text-red-700 px-2.5 py-0.5 rounded-lg text-sm font-semibold">{t('grade5000Label')}</span>
                <h3 className="font-semibold text-gray-900">{t('grade5000Title')}</h3>
              </div>
              <p className="text-gray-600 text-sm mb-1">{t('grade5000Use')}</p>
              <p className="text-gray-400 text-sm">{t('grade5000Mix')}</p>
            </div>
          </div>
        </section>

        {/* Common Pre-Mixed Options */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">
            {t('premixedTitle')}
          </h2>
          <p className="text-gray-700 mb-6">
            {t('premixedDesc')}
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left font-semibold text-gray-900">{t('premixedProduct')}</th>
                  <th className="p-3 text-left font-semibold text-gray-900">{t('premixedPsi')}</th>
                  <th className="p-3 text-left font-semibold text-gray-900">{t('premixedBestFor')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="p-3 font-medium">{t('premixedQuikrete')}</td>
                  <td className="p-3 text-gray-600">4,000 PSI</td>
                  <td className="p-3 text-gray-600">{t('premixedQuikreteUse')}</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">{t('premixedQuikrete5000')}</td>
                  <td className="p-3 text-gray-600">5,000 PSI</td>
                  <td className="p-3 text-gray-600">{t('premixedQuikrete5000Use')}</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">{t('premixedSakrete')}</td>
                  <td className="p-3 text-gray-600">4,000 PSI</td>
                  <td className="p-3 text-gray-600">{t('premixedSakreteUse')}</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">{t('premixedHighStrength')}</td>
                  <td className="p-3 text-gray-600">5,000+ PSI</td>
                  <td className="p-3 text-gray-600">{t('premixedHighStrengthUse')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* How to Choose */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">
            {t('chooseTitle')}
          </h2>

          <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-3">
              <span className="text-primary-600 font-bold text-lg leading-none mt-0.5">→</span>
              <div>
                <span className="font-semibold text-gray-900">{t('chooseFootTraffic')}</span>
                <p className="text-gray-600 text-sm mt-0.5">{t('chooseFootTrafficDesc')}</p>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-3">
              <span className="text-primary-600 font-bold text-lg leading-none mt-0.5">→</span>
              <div>
                <span className="font-semibold text-gray-900">{t('chooseVehicle')}</span>
                <p className="text-gray-600 text-sm mt-0.5">{t('chooseVehicleDesc')}</p>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-3">
              <span className="text-primary-600 font-bold text-lg leading-none mt-0.5">→</span>
              <div>
                <span className="font-semibold text-gray-900">{t('chooseFreeze')}</span>
                <p className="text-gray-600 text-sm mt-0.5">{t('chooseFreezeDesc')}</p>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-3">
              <span className="text-primary-600 font-bold text-lg leading-none mt-0.5">→</span>
              <div>
                <span className="font-semibold text-gray-900">{t('chooseStructural')}</span>
                <p className="text-gray-600 text-sm mt-0.5">{t('chooseStructuralDesc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Additives */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">
            {t('additivesTitle')}
          </h2>
          <p className="text-gray-700 mb-6">
            {t('additivesDesc')}
          </p>

          <div className="space-y-3">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-1">{t('additiveAirTitle')}</h3>
              <p className="text-gray-600 text-sm">{t('additiveAirDesc')}</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-1">{t('additiveAccelTitle')}</h3>
              <p className="text-gray-600 text-sm">{t('additiveAccelDesc')}</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-1">{t('additiveRetardTitle')}</h3>
              <p className="text-gray-600 text-sm">{t('additiveRetardDesc')}</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-1">{t('additiveFiberTitle')}</h3>
              <p className="text-gray-600 text-sm">{t('additiveFiberDesc')}</p>
            </div>
          </div>
        </section>

        {/* Mixing Tips */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">
            {t('tipsTitle')}
          </h2>

          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">{t('tipWaterTitle')}</h3>
                <p className="text-gray-600 text-sm mt-0.5">{t('tipWaterDesc')}</p>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">{t('tipMixTitle')}</h3>
                <p className="text-gray-600 text-sm mt-0.5">{t('tipMixDesc')}</p>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">{t('tipWorkTitle')}</h3>
                <p className="text-gray-600 text-sm mt-0.5">{t('tipWorkDesc')}</p>
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">{t('tipNoWaterTitle')}</h3>
                <p className="text-gray-600 text-sm mt-0.5">{t('tipNoWaterDesc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('summaryTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t('summaryP1')}</p>
          <p className="text-gray-700 leading-relaxed">{t('summaryP2')}</p>
        </section>

        {/* Bottom CTA */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 my-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('ctaTitle')}</h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">{t('ctaDesc')}</p>
          <Link href="/tools/concrete-calculator" className="btn-primary inline-flex items-center gap-2">
            Open Concrete Calculator
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Related Guides */}
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{tGuides('relatedGuides')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/guides/how-to-calculate-concrete" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{t('relatedGuide1Title')}</h3>
              <p className="text-sm text-gray-500">{t('relatedGuide1Desc')}</p>
            </Link>
            <Link href="/guides/concrete-slab-cost-guide" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{t('relatedGuide2Title')}</h3>
              <p className="text-sm text-gray-500">{t('relatedGuide2Desc')}</p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
