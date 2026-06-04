import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getLocalizedAlternates } from '@/lib/seo';
import { Breadcrumbs, ArticleJsonLd } from '@/components/ui/Breadcrumbs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guides' });
  return {
    title: t('deckMaterialsGuide'),
    description: t('deckMaterialsDesc'),
    keywords: [
      'deck materials calculator',
      'deck material list',
      'how much material for deck',
      'deck lumber calculator',
      'deck building materials',
      'deck board calculator',
    ],
    alternates: getLocalizedAlternates(locale, '/guides/deck-materials-calculator'),
    openGraph: {
      title: `${t('deckMaterialsGuide')} | App Guidebook`,
      description: t('deckMaterialsDesc'),
      url: `https://appguidebook.com/${locale}/guides/deck-materials-calculator`,
      type: 'article',
    },
  };
}

export default async function DeckMaterialsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'deckMaterialsPage' });
  const tGuides = await getTranslations({ locale, namespace: 'guides' });

  return (
    <div className="py-12">
      <article className="container-custom max-w-4xl">
        <header className="mb-10">
          <Breadcrumbs
            items={[
              { label: tGuides('title'), href: '/guides' },
              { label: tGuides('deckMaterialsGuide') },
            ]}
           locale={locale}
/>
          <ArticleJsonLd path="/guides/deck-materials-calculator" locale={locale} headline={tGuides('deckMaterialsGuide')}
            description={tGuides('deckMaterialsDesc')}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            {tGuides('deckMaterialsGuide')}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            {tGuides('deckMaterialsDesc')}
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
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('measuringTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('measuringP1')}</p>
          <p className="text-gray-700">{t('measuringP2')}</p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('deckingTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('deckingP1')}</p>
          <p className="text-gray-700">{t('deckingP2')}</p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('joistsTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('joistsP1')}</p>
          <p className="text-gray-700">{t('joistsP2')}</p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('fastenersTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('fastenersP1')}</p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('wasteTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('wasteP1')}</p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('tipsTitle')}</h2>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-green-50 border border-green-200 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-2">{t(`tip${i}Title`)}</h3>
                <p className="text-gray-700 text-sm">{t(`tip${i}Desc`)}</p>
              </div>
            ))}
          </div>
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
            <Link href="/guides/deck-cost-estimation" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('deckCostGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('deckCostDesc')}</p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
