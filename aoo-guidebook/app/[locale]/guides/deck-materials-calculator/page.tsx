import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getLocalizedAlternates } from '@/lib/seo';
import { Breadcrumbs, ArticleJsonLd } from '@/components/ui/Breadcrumbs';
import AuthorBio from '@/components/ui/AuthorBio';
import CategoryIllustration from '@/components/ui/CategoryIllustration';

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
          <AuthorBio locale={locale} />
          <CategoryIllustration category="deck" caption={t('illustrationCaption')} />

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
          <p className="text-gray-700 mb-4">{t('joistsP2')}</p>
          <p className="text-gray-600 text-sm">
            {t('joistsLinkText')}{' '}
            <Link href="/guides/deck-cost-estimation" className="text-primary-600 hover:text-primary-700 underline font-medium">
              {tGuides('deckCostGuide')}
            </Link>
          </p>
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

        {/* FAQ Section */}
        <section className="mb-12 border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('faqTitle')}</h2>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <details key={i} className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-gray-900 pr-4">{t(`faqQ${i}`)}</span>
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-4">
                  <p className="text-gray-600 leading-relaxed">{t(`faqA${i}`)}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Single neutral CTA — only ONE, at the very end */}
        <div className="border border-gray-200 rounded-2xl p-8 my-12 text-center bg-gray-50/50">
          <p className="text-gray-600 mb-5 max-w-xl mx-auto leading-relaxed text-sm">{t('toolEntryText')}</p>
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

        {/* Related Guides */}
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
