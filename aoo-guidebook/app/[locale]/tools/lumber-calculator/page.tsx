import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import LumberCalculator from '@/components/tools/LumberCalculator';
import { getLocalizedAlternates } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'lumberCalculator' });
  return {
    title: t('pageTitle'),
    description: t('pageDesc'),
    keywords: [
      'lumber calculator',
      'board foot calculator',
      'lumber cost calculator',
      'wood calculator',
      'lumber estimator',
      'timber calculator',
      'calculate lumber needed',
    ],
    alternates: getLocalizedAlternates(locale, '/tools/lumber-calculator'),
    openGraph: {
      title: 'Lumber Calculator - Free Online Tool',
      description: 'Calculate lumber board feet, cost, and quantity needed for your project. Free online lumber and timber calculator.',
      url: 'https://appguidebook.com/tools/lumber-calculator',
      type: 'website',
    },
  };
}

export default async function LumberCalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'lumberCalculator' });
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
        <LumberCalculator />

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
        <div className="mt-10 card">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('commonUses')}</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <span className="text-primary-500">✓</span>
              <span>{t('useDecking')}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary-500">✓</span>
              <span>{t('useFraming')}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary-500">✓</span>
              <span>{t('useShelving')}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary-500">✓</span>
              <span>{t('useFencing')}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary-500">✓</span>
              <span>{t('useTrimWork')}</span>
            </li>
          </ul>
        </div>

        {/* Related Guides */}
        <div className="border-t border-gray-200 pt-12 mt-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{tGuides('relatedGuides')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/guides/how-to-calculate-lumber" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('lumberCalcGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('lumberCalcDesc')}</p>
            </Link>
            <Link href="/guides/lumber-sizes-and-types" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('lumberSizesGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('lumberSizesDesc')}</p>
            </Link>
            <Link href="/guides/board-feet-calculation" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('boardFeetGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('boardFeetDesc')}</p>
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center text-sm text-gray-600">
          <p>{t('disclaimer')}</p>
        </div>
      </div>
    </div>
  );
}
