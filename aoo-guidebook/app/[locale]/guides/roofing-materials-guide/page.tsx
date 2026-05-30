import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getLocalizedAlternates } from '@/lib/seo';
import { Breadcrumbs, ArticleJsonLd } from '@/components/ui/Breadcrumbs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('guides');
  return {
    title: t('roofingMaterialsGuide'),
    description: t('roofingMaterialsDesc'),
    keywords: [
      'roofing materials',
      'best roofing materials',
      'asphalt shingles vs metal roofing',
      'roofing material comparison',
      'roof replacement materials',
      'types of roofing',
    ],
    alternates: getLocalizedAlternates(locale, '/guides/roofing-materials-guide'),
    openGraph: {
      title: 'Roofing Materials Guide 2024 - Complete Comparison',
      description: 'Compare asphalt shingles, metal roofing, clay tiles, wood shakes, slate, and synthetic materials. Find the best roof for your home.',
      url: 'https://appguidebook.com/guides/roofing-materials-guide',
      type: 'article',
    },
  };
}

export default async function RoofingMaterialsGuidePage() {
  const t = await getTranslations('roofingMaterialsGuide');
  const tGuides = await getTranslations('guides');

  const materials = [
    { key: 'asphalt', label: t('compAsphalt'), cost: t('compAsphaltCost'), life: t('compAsphaltLife'), weight: t('compAsphaltWeight'), pitch: t('compAsphaltPitch') },
    { key: 'metal', label: t('compMetal'), cost: t('compMetalCost'), life: t('compMetalLife'), weight: t('compMetalWeight'), pitch: t('compMetalPitch') },
    { key: 'tile', label: t('compTile'), cost: t('compTileCost'), life: t('compTileLife'), weight: t('compTileWeight'), pitch: t('compTilePitch') },
    { key: 'wood', label: t('compWood'), cost: t('compWoodCost'), life: t('compWoodLife'), weight: t('compWoodWeight'), pitch: t('compWoodPitch') },
    { key: 'slate', label: t('compSlate'), cost: t('compSlateCost'), life: t('compSlateLife'), weight: t('compSlateWeight'), pitch: t('compSlatePitch') },
  ];

  const sections = [
    { key: 'asphalt', title: t('asphaltTitle') },
    { key: 'metal', title: t('metalTitle') },
    { key: 'tile', title: t('tileTitle') },
    { key: 'wood', title: t('woodTitle') },
    { key: 'slate', title: t('slateTitle') },
    { key: 'synthetic', title: t('syntheticTitle') },
  ];

  return (
    <div className="py-12">
      <article className="container-custom max-w-4xl">
        {/* Header */}
        <header className="mb-10">
          <Breadcrumbs
            items={[
              { label: tGuides('title'), href: '/guides' },
              { label: tGuides('roofingMaterialsGuide') },
            ]}
          />
          <ArticleJsonLd
            headline={tGuides('roofingMaterialsGuide')}
            description={tGuides('roofingMaterialsDesc')}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            {tGuides('roofingMaterialsGuide')}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            {tGuides('roofingMaterialsDesc')}
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-gray-400">
            <span>Updated June 2026</span>
            <span className="text-gray-200">|</span>
            <span>{t('readTime')}</span>
          </div>
        </header>

        {/* Introduction */}
        <p className="text-lg text-gray-700 leading-relaxed mb-12">{t('intro')}</p>

        {/* Material Sections */}
        {sections.map(({ key, title }) => (
          <section key={key} className="mb-14">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">{title}</h2>
            <p className="text-gray-700 mb-3">{t(`${key}P1`)}</p>
            <p className="text-gray-700 mb-3">{t(`${key}P2`)}</p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-gray-700 text-sm">{t(`${key}P3`)}</p>
            </div>
          </section>
        ))}

        {/* Comparison Table */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('comparisonTitle')}</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left font-semibold text-gray-900">{t('compMaterial')}</th>
                  <th className="p-3 text-left font-semibold text-gray-900">{t('compCost')}</th>
                  <th className="p-3 text-left font-semibold text-gray-900">{t('compLifespan')}</th>
                  <th className="p-3 text-left font-semibold text-gray-900">{t('compWeight')}</th>
                  <th className="p-3 text-left font-semibold text-gray-900">{t('compPitch')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {materials.map((m) => (
                  <tr key={m.key} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 font-semibold text-gray-900">{m.label}</td>
                    <td className="p-3 text-gray-600">{m.cost}</td>
                    <td className="p-3 text-gray-600">{m.life}</td>
                    <td className="p-3 text-gray-600">{m.weight}</td>
                    <td className="p-3 text-gray-600">{m.pitch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Climate */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('climateTitle')}</h2>
          <p className="text-gray-700 mb-6">{t('climateP1')}</p>
          <div className="space-y-3">
            {['snow', 'heat', 'rain', 'wind', 'fire'].map((c) => (
              <div key={c} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="text-gray-700 text-sm">{t(`climate${c.charAt(0).toUpperCase() + c.slice(1)}`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('summaryTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t('summaryP1')}</p>
          <p className="text-gray-700 leading-relaxed">{t('summaryP2')}</p>
        </section>

        {/* CTA */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 my-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('ctaTitle')}</h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">{t('ctaDesc')}</p>
          <Link href="/tools/roof-pitch-calculator" className="btn-primary inline-flex items-center gap-2">
            Open Roof Pitch Calculator
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Related */}
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{tGuides('relatedGuides')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/guides/how-to-calculate-roof-pitch" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('roofPitchCalcGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('roofPitchCalcDesc')}</p>
            </Link>
            <Link href="/guides/roof-pitch-angle-conversion" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('pitchAngleGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('pitchAngleDesc')}</p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
