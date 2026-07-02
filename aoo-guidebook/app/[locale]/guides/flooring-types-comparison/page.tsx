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
    title: t('flooringTypesGuide'),
    description: t('flooringTypesDesc'),
    keywords: [
      'flooring types comparison',
      'hardwood vs laminate vs vinyl',
      'best flooring for bathrooms',
      'best flooring for kitchens',
      'flooring material comparison',
      'luxury vinyl vs hardwood',
    ],
    alternates: getLocalizedAlternates(locale, '/guides/flooring-types-comparison'),
    openGraph: {
      title: `${t('flooringTypesGuide')} | App Guidebook`,
      description: t('flooringTypesDesc'),
      url: `https://appguidebook.com/${locale}/guides/flooring-types-comparison`,
      type: 'article',
    },
  };
}

export default async function FlooringTypesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'flooringTypesPage' });
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
              { label: tGuides('flooringTypesGuide') },
            ]}
           locale={locale}
/>
          <ArticleJsonLd path="/guides/flooring-types-comparison" locale={locale} headline={tGuides('flooringTypesGuide')}
            description={tGuides('flooringTypesDesc')}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            {tGuides('flooringTypesGuide')}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            {tGuides('flooringTypesDesc')}
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
        </section>

        {/* Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('comparisonTitle')}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">{t('tableType')}</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">{t('tableCost')}</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">{t('tableDurability')}</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">{t('tableWaterResistance')}</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">{t('tableComfort')}</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">{t('tableBestFor')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {([
                  { title: t('hardwoodTitle'), cost: t('hardwoodCost'), durability: t('hardwoodDurability'), water: t('hardwoodWater'), comfort: t('hardwoodComfort'), best: t('hardwoodBest'), id: 'hardwood' } as const,
                  { title: t('laminateTitle'), cost: t('laminateCost'), durability: t('laminateDurability'), water: t('laminateWater'), comfort: t('laminateComfort'), best: t('laminateBest'), id: 'laminate' } as const,
                  { title: t('vinylTitle'), cost: t('vinylCost'), durability: t('vinylDurability'), water: t('vinylWater'), comfort: t('vinylComfort'), best: t('vinylBest'), id: 'vinyl' } as const,
                  { title: t('tileTitle'), cost: t('tileCost'), durability: t('tileDurability'), water: t('tileWater'), comfort: t('tileComfort'), best: t('tileBest'), id: 'tile' } as const,
                  { title: t('carpetTitle'), cost: t('carpetCost'), durability: t('carpetDurability'), water: t('carpetWater'), comfort: t('carpetComfort'), best: t('carpetBest'), id: 'carpet' } as const,
                ]).map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/50">
                    <td className="py-3 px-4 font-medium text-gray-900">{row.title}</td>
                    <td className="py-3 px-4 text-gray-600">{row.cost}</td>
                    <td className="py-3 px-4 text-gray-600">{row.durability}</td>
                    <td className="py-3 px-4 text-gray-600">{row.water}</td>
                    <td className="py-3 px-4 text-gray-600">{row.comfort}</td>
                    <td className="py-3 px-4 text-gray-600">{row.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Hardwood */}
        <section className="mb-10 p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t('hardwoodTitle')}</h2>
          <p className="text-sm text-gray-500 mb-3">{t('hardwoodCost')} per sq ft</p>
          <div className="prose prose-gray max-w-none space-y-2">
            <p>{t('hardwoodP1')}</p>
            <p>{t('hardwoodP2')}</p>
          </div>
        </section>

        {/* Laminate */}
        <section className="mb-10 p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t('laminateTitle')}</h2>
          <p className="text-sm text-gray-500 mb-3">{t('laminateCost')} per sq ft</p>
          <div className="prose prose-gray max-w-none space-y-2">
            <p>{t('laminateP1')}</p>
            <p>{t('laminateP2')}</p>
          </div>
        </section>

        {/* Vinyl */}
        <section className="mb-10 p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t('vinylTitle')}</h2>
          <p className="text-sm text-gray-500 mb-3">{t('vinylCost')} per sq ft</p>
          <div className="prose prose-gray max-w-none space-y-2">
            <p>{t('vinylP1')}</p>
            <p>{t('vinylP2')}</p>
          </div>
        </section>

        {/* Tile */}
        <section className="mb-10 p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t('tileTitle')}</h2>
          <p className="text-sm text-gray-500 mb-3">{t('tileCost')} per sq ft</p>
          <div className="prose prose-gray max-w-none space-y-2">
            <p>{t('tileP1')}</p>
            <p>{t('tileP2')}</p>
          </div>
        </section>

        {/* Carpet */}
        <section className="mb-10 p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t('carpetTitle')}</h2>
          <p className="text-sm text-gray-500 mb-3">{t('carpetCost')} per sq ft</p>
          <div className="prose prose-gray max-w-none space-y-2">
            <p>{t('carpetP1')}</p>
            <p>{t('carpetP2')}</p>
          </div>
        </section>

        {/* How to Choose */}
        <section className="mb-10 p-6 bg-primary-50 border border-primary-100 rounded-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{t('howToChooseTitle')}</h2>
          <div className="prose prose-gray max-w-none space-y-2">
            <p>{t('howToChooseP1')}</p>
            <p>{t('howToChooseP2')}</p>
          </div>
        </section>

        {/* Inline guide reference — natural transition, no hard CTA */}
        <p className="text-sm text-gray-500 leading-relaxed mb-10">
          {t('calcGuideInlineText')}
        </p>

        {/* FAQ */}
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

        {/* Single neutral tool CTA — only ONE, after FAQ */}
        <div className="border border-gray-200 rounded-2xl p-8 my-12 text-center bg-gray-50/50">
          <p className="text-gray-600 mb-5 max-w-xl mx-auto leading-relaxed text-sm">
            {t('ctaDesc')}
          </p>
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

        {/* Related Guides */}
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{tGuides('relatedGuides')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/guides/how-to-calculate-flooring-materials" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('flooringCalcGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('flooringCalcDesc')}</p>
            </Link>
            <Link href="/guides/diy-flooring-mistakes" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('flooringMistakesGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('flooringMistakesDesc')}</p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
