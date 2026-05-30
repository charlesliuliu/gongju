import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getLocalizedAlternates } from '@/lib/seo';
import { Breadcrumbs, ArticleJsonLd } from '@/components/ui/Breadcrumbs';

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
      title: 'Flooring Cost Estimation Guide',
      description: 'Estimate flooring costs with per-square-foot pricing for all major flooring types.',
      url: 'https://appguidebook.com/guides/flooring-cost-estimation',
      type: 'article',
    },
  };
}

export default async function FlooringCostPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'flooringCostPage' });
  const tGuides = await getTranslations({ locale, namespace: 'guides' });
  const tGlobal = await getTranslations({ locale, namespace: 'global' });

  return (
    <div className="py-12">
      <article className="container-custom max-w-4xl">
        {/* Header */}
        <header className="mb-10">
          <Breadcrumbs
            items={[
              { label: tGuides('title'), href: '/guides' },
              { label: tGuides('flooringCostGuide') },
            ]}
          />
          <ArticleJsonLd
            headline={tGuides('flooringCostGuide')}
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

        {/* Intro */}
        <section className="prose prose-gray max-w-none mb-10">
          <p>{t('intro')}</p>
        </section>

        {/* Cost Overview */}
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
                {[
                  { title: t('costHardwood'), mat: t('costHardwood'), install: t('costHardwoodInstall'), life: t('hardwoodLife') },
                  { title: t('costLaminate'), mat: t('costLaminate'), install: t('costLaminateInstall'), life: t('laminateLife') },
                  { title: t('costVinyl'), mat: t('costVinyl'), install: t('costVinylInstall'), life: t('vinylLife') },
                  { title: t('costTile'), mat: t('costTile'), install: t('costTileInstall'), life: t('tileLife') },
                  { title: t('costCarpet'), mat: t('costCarpet'), install: t('costCarpetInstall'), life: t('carpetLife') },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/50">
                    <td className="py-3 px-4 font-medium text-gray-900">{row.title}</td>
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

        {/* CTA */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{tGuides('flooringCalcGuide')}</h3>
          <p className="text-gray-600 mb-4">{tGuides('flooringCalcDesc')}</p>
          <Link href="/tools/flooring-calculator" className="btn-primary inline-block">
            {tGuides('flooringCalcGuide')}
          </Link>
        </div>
      </article>
    </div>
  );
}
