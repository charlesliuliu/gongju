import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import DrywallCalculator from '@/components/tools/DrywallCalculator';
import { getLocalizedAlternates } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'drywallCalculator' });
  return {
    title: t('pageTitle'),
    description: t('pageDesc'),
    keywords: [
      'drywall calculator',
      'drywall estimator',
      'sheetrock calculator',
      'drywall cost calculator',
      'gypsum board calculator',
      'how much drywall do I need',
    ],
    alternates: getLocalizedAlternates(locale, '/tools/drywall-calculator'),
    openGraph: {
      title: 'Drywall Calculator - Free Online Tool',
      description: 'Estimate drywall panels, joint compound, and costs. Free online drywall calculator.',
      url: 'https://appguidebook.com/tools/drywall-calculator',
      type: 'website',
    },
  };
}

export default async function DrywallCalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'drywallCalculator' });
  const tGuides = await getTranslations({ locale, namespace: 'guides' });
  const tTools = await getTranslations({ locale, namespace: 'tools' });

  return (
    <div className="py-12">
      <div className="container-custom max-w-6xl">
        <Breadcrumbs
          items={[
            { label: tTools('pageTitle'), href: '/tools' },
            { label: t('pageTitle') },
          ]}
         locale={locale}
/>
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            {t('pageTitle')}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            {t('pageDesc')}
          </p>
        </header>

        {/* Calculator */}
        <DrywallCalculator />

        {/* How to Use */}
        <div className="mt-16 card">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('howToUse')}</h2>
          <ol className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold">1</span>
              <span>{t('step1')}</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold">2</span>
              <span>{t('step2')}</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold">3</span>
              <span>{t('step3')}</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold">4</span>
              <span>{t('step4')}</span>
            </li>
          </ol>
        </div>

        {/* Common Uses */}
        <div className="mt-16 card">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('commonUses')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{t('useSingleRoom')}</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{t('useBasement')}</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{t('useGarage')}</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{t('useNewConstruction')}</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{t('useRenovation')}</h3>
            </div>
          </div>
        </div>

        {/* Related Guides */}
        <div className="border-t border-gray-200 pt-12 mt-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{tGuides('relatedGuides')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/guides/how-to-calculate-drywall" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('drywallCalcGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('drywallCalcDesc')}</p>
            </Link>
            <Link href="/guides/drywall-types-and-sizes" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('drywallTypesGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('drywallTypesDesc')}</p>
            </Link>
            <Link href="/guides/drywall-cost-estimation" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('drywallCostGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('drywallCostDesc')}</p>
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-200 pt-8 mt-12">
          <p className="text-sm text-gray-400 leading-relaxed">
            {t('disclaimer')}
          </p>
        </div>
      </div>
    </div>
  );
}
