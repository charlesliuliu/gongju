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
    title: t('flooringCostGuide'),
    description: t('flooringCostDesc'),
    keywords: [
      'flooring cost estimation',
      'flooring installation cost',
      'how much does flooring cost',
      'flooring cost per square foot',
      'hardwood flooring cost',
      'vinyl flooring installation cost',
      'flooring budget guide',
    ],
    alternates: getLocalizedAlternates(locale, '/guides/flooring-cost-estimation'),
    openGraph: {
      title: `${t('flooringCostGuide')} | App Guidebook`,
      description: t('flooringCostDesc'),
      url: `https://appguidebook.com/${locale}/guides/flooring-cost-estimation`,
      type: 'article',
    },
  };
}

export default async function FlooringCostPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'flooringCostPage' });
  const tGuides = await getTranslations({ locale, namespace: 'guides' });
  const tGlobal = await getTranslations({ locale, namespace: 'global' });

  const tableRows = [
    { type: t('tableTypeHardwood'), mat: t('costHardwood'), install: t('costHardwoodInstall'), life: t('hardwoodLife') },
    { type: t('tableTypeLaminate'), mat: t('costLaminate'), install: t('costLaminateInstall'), life: t('laminateLife') },
    { type: t('tableTypeVinyl'), mat: t('costVinyl'), install: t('costVinylInstall'), life: t('vinylLife') },
    { type: t('tableTypeTile'), mat: t('costTile'), install: t('costTileInstall'), life: t('tileLife') },
    { type: t('tableTypeCarpet'), mat: t('costCarpet'), install: t('costCarpetInstall'), life: t('carpetLife') },
  ];

  return (
    <div className="py-12">
      <FloatingCalcNav />
      <article className="container-custom max-w-4xl">
        {/* Breadcrumbs + Header */}
        <header className="mb-10">
          <Breadcrumbs
            items={[
              { label: tGuides('title'), href: '/guides' },
              { label: tGuides('flooringCostGuide') },
            ]}
            locale={locale}
          />
          <ArticleJsonLd path="/guides/flooring-cost-estimation" locale={locale} headline={tGuides('flooringCostGuide')}
            description={tGuides('flooringCostDesc')}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            {tGuides('flooringCostGuide')}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            {tGuides('flooringCostDesc')}
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-gray-400">
            <span>Updated June 2026</span>
            <span className="text-gray-200">|</span>
            <span>{t('readTime')}</span>
          </div>
        </header>

        <AuthorBio locale={locale} />
        <CategoryIllustration category="flooring" caption={t('illustrationCaption')} />

        {/* Intro */}
        <section className="prose prose-gray max-w-none mb-10">
          <p>{t('intro')}</p>

          {/* Quick-access calculator bar — above the fold CTA */}
          <QuickCalcBar category="flooring" />
        </section>

        {/* Cost Overview Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('overviewTitle')}</h2>
          <p className="text-gray-500 mb-5">{t('overviewDesc')}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">{t('tableType')}</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">{t('matOnly')}</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">{t('withInstall')}</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">{t('lifespan')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tableRows.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/50">
                    <td className="py-3 px-4 font-medium text-gray-900">{row.type}</td>
                    <td className="py-3 px-4 text-gray-600">{row.mat}</td>
                    <td className="py-3 px-4 text-gray-600">{row.install}</td>
                    <td className="py-3 px-4 text-gray-600">{row.life}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Installation Cost Factors */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('installCostsTitle')}</h2>
          <div className="prose prose-gray max-w-none space-y-3">
            <p>{t('installCostsP1')}</p>
            <ul className="list-disc pl-6 space-y-1.5 text-gray-700">
              <li>{t('installFactor1')}</li>
              <li>{t('installFactor2')}</li>
              <li>{t('installFactor3')}</li>
              <li>{t('installFactor4')}</li>
              <li>{t('installFactor5')}</li>
            </ul>
          </div>
        </section>

        {/* Additional Costs */}
        <section className="mb-10 p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{t('additionalTitle')}</h2>
          <div className="prose prose-gray max-w-none space-y-1.5">
            <p>{t('additionalP1')}</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>{t('additionalItem1')}</li>
              <li>{t('additionalItem2')}</li>
              <li>{t('additionalItem3')}</li>
              <li>{t('additionalItem4')}</li>
              <li>{t('additionalItem5')}</li>
              <li>{t('additionalItem6')}</li>
            </ul>
          </div>
        </section>

        {/* Saving Tips */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('saveTitle')}</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-4 border border-gray-200 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-1">{t(`save${i}Title`)}</h3>
                <p className="text-sm text-gray-600">{t(`save${i}Desc`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section className="mb-10 p-6 bg-primary-50 border border-primary-100 rounded-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{t('summaryTitle')}</h2>
          <div className="prose prose-gray max-w-none space-y-2">
            <p>{t('summaryP1')}</p>
            <p>{t('summaryP2')}</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('faqTitle')}</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <details key={i} className="group border border-gray-200 rounded-xl p-5 cursor-pointer hover:border-gray-300 transition-colors">
                <summary className="font-semibold text-gray-900 list-none flex items-center justify-between gap-3">
                  {t(`faqQ${i}`)}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform text-lg flex-shrink-0">▾</span>
                </summary>
                <p className="text-gray-600 text-sm leading-relaxed mt-3 pl-0">{t(`faqA${i}`)}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Single neutral CTA — only ONE, at the very end */}
        <div className="border border-gray-200 rounded-2xl p-8 my-12 text-center bg-gray-50/50">
          <p className="text-gray-600 mb-5 max-w-xl mx-auto leading-relaxed text-sm">{t('ctaDesc')}</p>
          <Link
            href="/tools/flooring-calculator"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-white hover:border-gray-400 transition-colors"
          >
            {t('ctaBtn')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Related Guides — pure article links, no tool cards */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('relatedTitle')}</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link href="/guides/how-to-calculate-flooring-materials" className="card hover:shadow-lg hover:-translate-y-0.5 transition-all block">
              <div className="text-sm font-bold text-primary-600 mb-1">{tGlobal('guides')}</div>
              <div className="font-semibold text-gray-900">{tGuides('flooringCalcGuide')}</div>
              <div className="text-xs text-gray-500 mt-1">{tGuides('flooringCalcDesc')}</div>
            </Link>
            <Link href="/guides/flooring-types-comparison" className="card hover:shadow-lg hover:-translate-y-0.5 transition-all block">
              <div className="text-sm font-bold text-primary-600 mb-1">{tGlobal('guides')}</div>
              <div className="font-semibold text-gray-900">{tGuides('flooringTypesGuide')}</div>
              <div className="text-xs text-gray-500 mt-1">{tGuides('flooringTypesDesc')}</div>
            </Link>
            <Link href="/guides/diy-flooring-mistakes" className="card hover:shadow-lg hover:-translate-y-0.5 transition-all block">
              <div className="text-sm font-bold text-primary-600 mb-1">{tGlobal('guides')}</div>
              <div className="font-semibold text-gray-900">{tGuides('flooringMistakesGuide')}</div>
              <div className="text-xs text-gray-500 mt-1">{tGuides('flooringMistakesDesc')}</div>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
