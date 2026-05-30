import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import ConcreteCalculator from '@/components/tools/ConcreteCalculator';
import { getLocalizedAlternates } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'calcPage' });

  return {
    title: t('title'),
    description: t('desc'),
    keywords: [
      'concrete calculator',
      'concrete volume calculator',
      'concrete slab calculator',
      'how much concrete do I need',
      'concrete cost calculator',
      'concrete bags calculator',
    ],
    alternates: getLocalizedAlternates(locale, '/tools/concrete-calculator'),
    openGraph: {
      title: `${t('title')} | App Guidebook`,
      description: t('desc'),
      url: 'https://appguidebook.com/tools/concrete-calculator',
    },
  };
}

export default async function ConcreteCalculatorPage() {
  const t = await getTranslations('calcPage');
  const tTools = await getTranslations('tools');

  return (
    <div className="py-12">
      <div className="container-custom">
        <Breadcrumbs
          items={[
            { label: tTools('pageTitle'), href: '/tools' },
            { label: t('title') },
          ]}
        />
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('desc')}
          </p>
        </div>

        {/* Calculator Component */}
        <ConcreteCalculator />

        {/* Information Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t('howToUse')}
            </h2>
            <ol className="space-y-3 text-gray-600">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </span>
                <span>{t('step1')}</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </span>
                <span>{t('step2')}</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </span>
                <span>{t('step3')}</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium">
                  4
                </span>
                <span>{t('step4')}</span>
              </li>
            </ol>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t('commonUses')}
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-primary-500">✓</span>
                <span>{t('usePatio')}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary-500">✓</span>
                <span>{t('useDriveway')}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary-500">✓</span>
                <span>{t('useFooting')}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary-500">✓</span>
                <span>{t('useDeck')}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary-500">✓</span>
                <span>{t('useRetaining')}</span>
              </li>
            </ul>
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
