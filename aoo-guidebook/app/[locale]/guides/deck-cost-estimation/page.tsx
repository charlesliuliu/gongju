import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getLocalizedAlternates } from '@/lib/seo';
import { Breadcrumbs, ArticleJsonLd } from '@/components/ui/Breadcrumbs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guides' });
  return {
    title: t('deckCostGuide'),
    description: t('deckCostDesc'),
    keywords: [
      'deck cost estimation',
      'how much does a deck cost',
      'deck building cost',
      'deck material prices',
      'deck labor cost',
      'deck budget calculator',
    ],
    alternates: getLocalizedAlternates(locale, '/guides/deck-cost-estimation'),
    openGraph: {
      title: `${t('deckCostGuide')} | App Guidebook`,
      description: t('deckCostDesc'),
      url: `https://appguidebook.com/${locale}/guides/deck-cost-estimation`,
      type: 'article',
    },
  };
}

export default async function DeckCostPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'deckCostPage' });
  const tGuides = await getTranslations({ locale, namespace: 'guides' });

  return (
    <div className="py-12">
      <article className="container-custom max-w-4xl">
        <header className="mb-10">
          <Breadcrumbs
            items={[
              { label: tGuides('title'), href: '/guides' },
              { label: tGuides('deckCostGuide') },
            ]}
           locale={locale}
/>
          <ArticleJsonLd path="/guides/deck-cost-estimation" locale={locale} headline={tGuides('deckCostGuide')}
            description={tGuides('deckCostDesc')}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            {tGuides('deckCostGuide')}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            {tGuides('deckCostDesc')}
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-gray-400">
            <span>Updated June 2026</span>
            <span className="text-gray-200">|</span>
            <span>{t('readTime')}</span>
          </div>
        </header>

        {/* Calculator CTA */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 mb-12 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="font-semibold text-white text-lg">{t('ctaTitle')}</h3>
            <p className="text-primary-100 text-sm">{t('ctaDesc')}</p>
          </div>
          <Link href="/tools/deck-calculator" className="inline-flex items-center gap-2 bg-white text-primary-700 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary-50 transition-all duration-200">
            Open Deck Calculator
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-12">{t('intro')}</p>

        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('materialsTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('materialsP1')}</p>
          <p className="text-gray-700">{t('materialsP2')}</p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('laborTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('laborP1')}</p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('permitsTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('permitsP1')}</p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('costBySizeTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('costBySizeP1')}</p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('savingTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('savingP1')}</p>
          <p className="text-gray-700">{t('savingP2')}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('summaryTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t('summaryP1')}</p>
        </section>

        {/* Bottom CTA */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 my-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('ctaTitle')}</h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">{t('ctaDesc')}</p>
          <Link href="/tools/deck-calculator" className="btn-primary inline-flex items-center gap-2">
            Open Deck Calculator
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Related */}
        <div className="border-t border-gray-200 pt-12">
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
          </div>
        </div>
      </article>
    </div>
  );
}
