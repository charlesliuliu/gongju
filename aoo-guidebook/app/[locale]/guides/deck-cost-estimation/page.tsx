import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getLocalizedAlternates } from '@/lib/seo';
import { Breadcrumbs, ArticleJsonLd } from '@/components/ui/Breadcrumbs';
import AuthorBio from '@/components/ui/AuthorBio';
import CategoryIllustration from '@/components/ui/CategoryIllustration';
import QuickCalcBar from '@/components/ui/QuickCalcBar';
import FloatingCalcNav from '@/components/ui/FloatingCalcNav';

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
      <FloatingCalcNav />
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
        <AuthorBio locale={locale} />
        <CategoryIllustration category="deck" caption={t('illustrationCaption')} />

        {/* Introduction — pure educational, no tool promotion */}
        <p className="text-lg text-gray-700 leading-relaxed mb-12">{t('intro')}</p>

          {/* Quick-access calculator bar — above the fold CTA */}
          <QuickCalcBar category="deck" />

        {/* Section 1: Material Costs */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('materialsTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('materialsP1')}</p>
          <p className="text-gray-700 mb-4">{t('materialsP2')}</p>
          <p className="text-sm text-gray-500 mt-5 leading-relaxed">
            {t('materialsLinkText')}{' '}
            <Link href="/guides/deck-materials-calculator" className="text-primary-600 hover:text-primary-700 underline underline-offset-2 font-medium">
              {tGuides('deckMaterialsGuide')}
            </Link>
          </p>
        </section>

        {/* Section 2: Labor Costs */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('laborTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('laborP1')}</p>
        </section>

        {/* Section 3: Permits and Fees */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('permitsTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('permitsP1')}</p>
        </section>

        {/* Section 4: Cost by Deck Size */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('costBySizeTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('costBySizeP1')}</p>
        </section>

        {/* Section 5: Money-Saving Tips */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('savingTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('savingP1')}</p>
          <p className="text-gray-700">{t('savingP2')}</p>
        </section>

        {/* Summary — pure educational text, no tool button */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('summaryTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t('summaryP1')}</p>
        </section>

        {/* FAQ — NEW: purely educational */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('faqTitle')}</h2>
          <div className="space-y-4">
            {(['1', '2', '3', '4', '5'] as const).map((n) => (
              <details key={n} className="bg-white border border-gray-200 rounded-xl group">
                <summary className="px-6 py-4 cursor-pointer font-medium text-gray-900 hover:text-primary-700 transition-colors list-none [&::-webkit-details-marker]:hidden flex items-center justify-between">
                  {t(`faqQ${n}`)}
                  <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                  {t(`faqA${n}`)}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Single neutral tool entry — only ONE, at the very end */}
        <div className="border border-gray-200 rounded-2xl p-8 my-12 text-center bg-gray-50/50">
          <p className="text-gray-600 mb-5 max-w-xl mx-auto leading-relaxed text-sm">
            {t('toolEntryText')}
          </p>
          <Link
            href="/tools/deck-calculator"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-white hover:border-gray-400 transition-colors"
          >
            {t('toolEntryLink')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Related Guides — pure articles, no tool cards */}
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
