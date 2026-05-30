import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import PaintCalculator from '@/components/tools/PaintCalculator';
import { getLocalizedAlternates } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'paintCalculator' });
  return {
    title: t('pageTitle'),
    description: t('pageDesc'),
    keywords: [
      'paint calculator',
      'how much paint do I need',
      'paint coverage calculator',
      'wall paint calculator',
      'paint estimation tool',
      'interior paint calculator',
      'calculate paint gallons needed',
    ],
    alternates: getLocalizedAlternates(locale, '/tools/paint-calculator'),
    openGraph: {
      title: 'Paint Calculator - Free Online Tool',
      description: 'Calculate exactly how much paint you need for any room. Includes windows, doors, number of coats, and cost estimation.',
      url: 'https://appguidebook.com/tools/paint-calculator',
      type: 'website',
    },
  };
}

export default async function PaintCalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'paintCalculator' });
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
        <PaintCalculator />

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
            <Link href="/guides/how-to-calculate-paint-needed" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('paintCalcGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('paintCalcDesc')}</p>
            </Link>
            <Link href="/guides/interior-vs-exterior-paint" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('paintTypesGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('paintTypesDesc')}</p>
            </Link>
            <Link href="/guides/paint-coverage-per-gallon" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('paintCoverageGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('paintCoverageDesc')}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
