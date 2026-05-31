import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import DeckCalculator from '@/components/tools/DeckCalculator';
import { getLocalizedAlternates } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'deckCalculator' });
  return {
    title: t('pageTitle'),
    description: t('pageDesc'),
    keywords: [
      'deck calculator',
      'deck material calculator',
      'deck cost calculator',
      'deck board calculator',
      'deck joist calculator',
      'build a deck calculator',
    ],
    alternates: getLocalizedAlternates(locale, '/tools/deck-calculator'),
    openGraph: {
      title: 'Deck Calculator - Free Online Tool',
      description: 'Calculate deck materials, boards, joists, and cost. Free online deck building calculator.',
      url: 'https://appguidebook.com/tools/deck-calculator',
      type: 'website',
    },
  };
}

export default async function DeckCalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'deckCalculator' });
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
        <DeckCalculator />

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
        <div className="mt-8 card">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('commonUses')}</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <span className="text-primary-500">✓</span>
              <span>{t('useGroundLevel')}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary-500">✓</span>
              <span>{t('useRaised')}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary-500">✓</span>
              <span>{t('usePoolDeck')}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary-500">✓</span>
              <span>{t('useBalcony')}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary-500">✓</span>
              <span>{t('useRooftop')}</span>
            </li>
          </ul>
        </div>

        {/* Related Guides */}
        <div className="border-t border-gray-200 pt-12 mt-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{tGuides('relatedGuides')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/guides/how-to-build-a-deck" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('deckBuildGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('deckBuildDesc')}</p>
            </Link>
            <Link href="/guides/deck-materials-calculator" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('deckMaterialsGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('deckMaterialsDesc')}</p>
            </Link>
            <Link href="/guides/deck-cost-estimation" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('deckCostGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('deckCostDesc')}</p>
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
