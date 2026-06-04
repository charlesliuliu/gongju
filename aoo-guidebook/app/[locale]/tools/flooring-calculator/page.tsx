import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import FlooringCalculator from '@/components/tools/FlooringCalculator';
import { getLocalizedAlternates } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'flooringCalculator' });
  return {
    title: t('pageTitle'),
    description: t('pageDesc'),
    keywords: [
      'flooring calculator',
      'flooring materials calculator',
      'calculate flooring needed',
      'floor area calculator',
      'hardwood flooring calculator',
      'laminate flooring calculator',
      'vinyl flooring calculator',
    ],
    alternates: getLocalizedAlternates(locale, '/tools/flooring-calculator'),
    openGraph: {
      title: 'Flooring Calculator - Free Online Tool',
      description: 'Calculate how much flooring material you need for any room. Includes waste factor and cost estimation.',
      url: 'https://appguidebook.com/tools/flooring-calculator',
      type: 'website',
    },
  };
}

export default async function FlooringCalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'flooringCalculator' });
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
        <FlooringCalculator />

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

        {/* Related Guides */}
        <div className="border-t border-gray-200 pt-12 mt-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{t('relatedGuides')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/guides/how-to-calculate-flooring-materials" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('flooringCalcGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('flooringCalcDesc')}</p>
            </Link>
            <Link href="/guides/flooring-types-comparison" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('flooringTypesGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('flooringTypesDesc')}</p>
            </Link>
            <Link href="/guides/flooring-cost-estimation" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('flooringCostGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('flooringCostDesc')}</p>
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
