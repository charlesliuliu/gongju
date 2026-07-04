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
    title: t('deckBuildGuide'),
    description: t('deckBuildDesc'),
    keywords: [
      'how to build a deck',
      'deck building guide',
      'DIY deck construction',
      'deck planning',
      'deck framing',
      'deck installation steps',
    ],
    alternates: getLocalizedAlternates(locale, '/guides/how-to-build-a-deck'),
    openGraph: {
      title: `${t('deckBuildGuide')} | App Guidebook`,
      description: t('deckBuildDesc'),
      url: `https://appguidebook.com/${locale}/guides/how-to-build-a-deck`,
      type: 'article',
    },
  };
}

export default async function HowToBuildADeckPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'deckBuildPage' });
  const tGuides = await getTranslations({ locale, namespace: 'guides' });

  return (
    <div className="py-12">
      <FloatingCalcNav />
      <article className="container-custom max-w-4xl">
        {/* Header: Breadcrumbs + H1 + Meta */}
        <header className="mb-10">
          <Breadcrumbs
            items={[
              { label: tGuides('title'), href: '/guides' },
              { label: tGuides('deckBuildGuide') },
            ]}
            locale={locale}
          />
          <ArticleJsonLd
            path="/guides/how-to-build-a-deck"
            locale={locale}
            headline={tGuides('deckBuildGuide')}
            description={tGuides('deckBuildDesc')}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            {tGuides('deckBuildGuide')}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            {tGuides('deckBuildDesc')}
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-gray-400">
            <span>Updated June 2026</span>
            <span className="text-gray-200">|</span>
            <span>{t('readTime')}</span>
          </div>
        </header>

        {/* Author Bio */}
        <AuthorBio locale={locale} />

        {/* Illustration with Professional Annotation */}
        <CategoryIllustration category="deck" />
        <p className="text-sm text-gray-500 mt-3 mb-12 leading-relaxed italic">
          {t('imageCaption')}
        </p>

        {/* Intro (纯科普，无工具推销) */}
        <p className="text-lg text-gray-700 leading-relaxed mb-12">{t('intro')}</p>

          {/* Quick-access calculator bar — above the fold CTA */}
          <QuickCalcBar category="deck" />

        {/* Section 1: Planning and Permits */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('planningTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('planningP1')}</p>
          <p className="text-gray-700">{t('planningP2')}</p>
        </section>

        {/* Section 2: Choosing Materials */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('materialsTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('materialsP1')}</p>
          <p className="text-gray-700">{t('materialsP2')}</p>
        </section>

        {/* Section 3: Foundation and Framing */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('foundationTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('foundationP1')}</p>
          <p className="text-gray-700 mb-4">{t('foundationP2')}</p>
          <p className="text-gray-700">
            {t('foundationLinkPrefix')}
            <Link href="/guides/deck-materials-calculator" className="text-primary-600 hover:text-primary-700 underline font-medium">
              {tGuides('deckMaterialsGuide')}
            </Link>
            {t('foundationLinkSuffix')}
          </p>
        </section>

        {/* Section 4: Installing Decking Boards */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('deckingTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('deckingP1')}</p>
        </section>

        {/* Section 5: Railings and Stairs */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('railingsTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('railingsP1')}</p>
        </section>

        {/* Section 6: Finishing and Sealing */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('finishingTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('finishingP1')}</p>
        </section>

        {/* Section 7: Pro Tips */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('tipsTitle')}</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-green-50 border border-green-200 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-2">{t(`tip${i}Title`)}</h3>
                <p className="text-gray-700 text-sm">{t(`tip${i}Desc`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Summary (纯科普，无工具按钮) */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('summaryTitle')}</h2>
          <p className="text-gray-700 leading-relaxed">{t('summaryP1')}</p>
        </section>

        {/* FAQ Section (新增独立板块) */}
        <section className="mb-14 border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('faqTitle')}</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <details key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-5 group">
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  {t(`faqQ${i}`)}
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="text-gray-700 text-sm mt-3 leading-relaxed">{t(`faqA${i}`)}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Neutral Tool Entry (全文唯一工具入口，无营销话术) */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 my-12 text-center">
          <p className="text-gray-600 mb-5 max-w-2xl mx-auto leading-relaxed">
            {t('neutralToolText')}
          </p>
          <Link
            href="/tools/deck-calculator"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-white hover:border-gray-400 transition-colors"
          >
            {t('neutralToolButton')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Related Guides (仅纯科普文章，无工具卡片) */}
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{tGuides('relatedGuides')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </article>
    </div>
  );
}
