import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import FenceCalculator from '@/components/tools/FenceCalculator';
import { getLocalizedAlternates } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'fenceCalculator' });
  return {
    title: t('pageTitle'),
    description: t('pageDesc'),
    keywords: [
      'fence calculator',
      'fence material calculator',
      'fence cost estimator',
      'fence post calculator',
      'fence picket calculator',
      'how much fencing do I need',
    ],
    alternates: getLocalizedAlternates(locale, '/tools/fence-calculator'),
    openGraph: {
      title: 'Fence Calculator - Free Online Tool',
      description: 'Calculate fence materials, posts, pickets, and costs. Free online fence material calculator with cost estimation.',
      url: 'https://appguidebook.com/tools/fence-calculator',
      type: 'website',
    },
  };
}

export default async function FenceCalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'fenceCalculator' });
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
        <FenceCalculator />

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
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-1">&#8226;</span>
              <span>{t('usePrivacy')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-1">&#8226;</span>
              <span>{t('usePicket')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-1">&#8226;</span>
              <span>{t('useGarden')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-1">&#8226;</span>
              <span>{t('usePool')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-1">&#8226;</span>
              <span>{t('usePropertyLine')}</span>
            </li>
          </ul>
        </div>

        {/* Related Guides */}
        <div className="border-t border-gray-200 pt-12 mt-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{tGuides('relatedGuides')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/guides/how-to-calculate-fence-materials" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('fenceCalcGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('fenceCalcDesc')}</p>
            </Link>
            <Link href="/guides/fence-types-and-costs" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('fenceTypesGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('fenceTypesDesc')}</p>
            </Link>
            <Link href="/guides/fence-post-spacing" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('fencePostGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('fencePostDesc')}</p>
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-200 pt-8 mt-12">
          <p className="text-sm text-gray-400 italic">{t('disclaimer')}</p>
        </div>
      </div>
    </div>
  );
}
