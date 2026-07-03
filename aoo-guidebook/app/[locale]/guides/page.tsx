import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getLocalizedAlternates } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guides' });
  return {
    title: t('title'),
    description: t('desc'),
    alternates: getLocalizedAlternates(locale, '/guides'),
    openGraph: {
      title: `${t('title')} | App Guidebook`,
      description: t('desc'),
      type: 'website',
    },
  };
}

export default async function GuidesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guides' });
  const tTools = await getTranslations({ locale, namespace: 'tools' });

  const concreteGuides = [
    { slug: 'how-to-calculate-concrete', title: t('concreteCalcGuide'), description: t('concreteCalcDesc'), readTime: t('concreteCalcReadTime'), category: t('concreteCategory') },
    { slug: 'concrete-slab-cost-guide', title: t('slabCostGuide'), description: t('slabCostDesc'), readTime: t('slabCostReadTime'), category: t('concreteCategory') },
    { slug: 'concrete-mix-ratios', title: t('mixRatiosGuide'), description: t('mixRatiosDesc'), readTime: t('mixRatiosReadTime'), category: t('concreteCategory') },
    { slug: 'diy-concrete-mistakes', title: t('concreteMistakesGuide'), description: t('concreteMistakesDesc'), readTime: t('concreteMistakesReadTime'), category: t('concreteCategory') },
    { slug: 'asphalt-vs-concrete-driveway', title: t('asphaltConcreteGuide'), description: t('asphaltConcreteDesc'), readTime: t('asphaltConcreteReadTime'), category: t('concreteCategory') },
  ];

  const roofingGuides = [
    { slug: 'how-to-calculate-roof-pitch', title: t('roofPitchCalcGuide'), description: t('roofPitchCalcDesc'), readTime: t('roofPitchReadTime'), category: t('roofingCategory') },
    { slug: 'roofing-materials-guide', title: t('roofingMaterialsGuide'), description: t('roofingMaterialsDesc'), readTime: t('roofingMaterialsReadTime'), category: t('roofingCategory') },
    { slug: 'roof-pitch-angle-conversion', title: t('pitchAngleGuide'), description: t('pitchAngleDesc'), readTime: t('pitchAngleReadTime'), category: t('roofingCategory') },
    { slug: 'roofing-cost-guide', title: t('roofingCostGuide'), description: t('roofingCostDesc'), readTime: t('roofingCostReadTime'), category: t('roofingCategory') },
  ];

  const flooringGuides = [
    { slug: 'how-to-calculate-flooring-materials', title: t('flooringCalcGuide'), description: t('flooringCalcDesc'), readTime: t('flooringCalcReadTime'), category: t('flooringCategory') },
    { slug: 'flooring-types-comparison', title: t('flooringTypesGuide'), description: t('flooringTypesDesc'), readTime: t('flooringTypesReadTime'), category: t('flooringCategory') },
    { slug: 'flooring-cost-estimation', title: t('flooringCostGuide'), description: t('flooringCostDesc'), readTime: t('flooringCostReadTime'), category: t('flooringCategory') },
    { slug: 'diy-flooring-mistakes', title: t('flooringMistakesGuide'), description: t('flooringMistakesDesc'), readTime: t('flooringMistakesReadTime'), category: t('flooringCategory') },
  ];

  const paintGuides = [
    { slug: 'how-to-calculate-paint-needed', title: t('paintCalcGuide'), description: t('paintCalcDesc'), readTime: t('paintCalcReadTime'), category: t('paintCategory') },
    { slug: 'interior-vs-exterior-paint', title: t('paintTypesGuide'), description: t('paintTypesDesc'), readTime: t('paintTypesReadTime'), category: t('paintCategory') },
    { slug: 'paint-coverage-per-gallon', title: t('paintCoverageGuide'), description: t('paintCoverageDesc'), readTime: t('paintCoverageReadTime'), category: t('paintCategory') },
  ];

  const lumberGuides = [
    { slug: 'how-to-calculate-lumber', title: t('lumberCalcGuide'), description: t('lumberCalcDesc'), readTime: t('lumberCalcReadTime'), category: t('lumberCategory') },
    { slug: 'lumber-sizes-and-types', title: t('lumberSizesGuide'), description: t('lumberSizesDesc'), readTime: t('lumberSizesReadTime'), category: t('lumberCategory') },
    { slug: 'board-feet-calculation', title: t('boardFeetCalcGuide'), description: t('boardFeetCalcDesc'), readTime: t('boardFeetReadTime'), category: t('lumberCategory') },
  ];

  const deckGuides = [
    { slug: 'how-to-build-a-deck', title: t('deckBuildGuide'), description: t('deckBuildDesc'), readTime: t('deckBuildReadTime'), category: t('deckCategory') },
    { slug: 'deck-materials-calculator', title: t('deckMaterialsGuide'), description: t('deckMaterialsDesc'), readTime: t('deckMaterialsReadTime'), category: t('deckCategory') },
    { slug: 'deck-cost-estimation', title: t('deckCostGuide'), description: t('deckCostDesc'), readTime: t('deckCostReadTime'), category: t('deckCategory') },
    { slug: 'diy-deck-mistakes', title: t('deckMistakesGuide'), description: t('deckMistakesDesc'), readTime: t('deckMistakesReadTime'), category: t('deckCategory') },
  ];

  const fenceGuides = [
    { slug: 'how-to-calculate-fence-materials', title: t('fenceCalcGuide'), description: t('fenceCalcDesc'), readTime: t('fenceCalcReadTime'), category: t('fenceCategory') },
    { slug: 'fence-types-and-costs', title: t('fenceTypesGuide'), description: t('fenceTypesDesc'), readTime: t('fenceTypesReadTime'), category: t('fenceCategory') },
    { slug: 'fence-post-spacing', title: t('fencePostGuide'), description: t('fencePostDesc'), readTime: t('fencePostReadTime'), category: t('fenceCategory') },
  ];

  const drywallGuides = [
    { slug: 'how-to-calculate-drywall', title: t('drywallCalcGuide'), description: t('drywallCalcDesc'), readTime: t('drywallCalcReadTime'), category: t('drywallCategory') },
    { slug: 'drywall-types-and-sizes', title: t('drywallTypesGuide'), description: t('drywallTypesDesc'), readTime: t('drywallTypesReadTime'), category: t('drywallCategory') },
    { slug: 'drywall-cost-estimation', title: t('drywallCostGuide'), description: t('drywallCostDesc'), readTime: t('drywallCostReadTime'), category: t('drywallCategory') },
  ];

  const allCategories = [
    { key: 'concrete', label: t('concreteCategory'), guides: concreteGuides },
    { key: 'roofing', label: t('roofingCategory'), guides: roofingGuides },
    { key: 'flooring', label: t('flooringCategory'), guides: flooringGuides },
    { key: 'paint', label: t('paintCategory'), guides: paintGuides },
    { key: 'lumber', label: t('lumberCategory'), guides: lumberGuides },
    { key: 'deck', label: t('deckCategory'), guides: deckGuides },
    { key: 'fence', label: t('fenceCategory'), guides: fenceGuides },
    { key: 'drywall', label: t('drywallCategory'), guides: drywallGuides },
  ];

  return (
    <div className="py-12">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {t('pageH1')}
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {t('pageIntro')}
          </p>
        </div>

        <div className="space-y-8">
          {allCategories.map((cat) => (
            <div key={cat.key}>
              <h2 className="text-xl font-bold text-gray-900 mb-4">{cat.label}</h2>
              <div className="space-y-4">
                {cat.guides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="block card hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            {guide.category}
                          </span>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-1">{guide.title}</h2>
                        <p className="text-sm text-gray-500">{guide.description}</p>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap">{guide.readTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-gray-200 pt-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {t('calcCTA')}
            </h2>
            <p className="text-gray-500">
              {t('calcCTADesc')}
            </p>
          </div>

          {/* Scene-grouped tool CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Foundation & Concrete */}
            <div className="card text-center">
              <div className="text-2xl mb-2">🏗️</div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                {t('calcGroupFoundation')}
              </h3>
              <Link
                href="/tools/concrete-calculator"
                className="btn-primary inline-flex items-center gap-1 text-sm"
              >
                {tTools('concreteTitle')} →
              </Link>
            </div>

            {/* Roofing, Fence & Deck */}
            <div className="card text-center">
              <div className="text-2xl mb-2">🏠</div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                {t('calcGroupOutdoor')}
              </h3>
              <div className="flex flex-col gap-2">
                <Link
                  href="/tools/roof-pitch-calculator"
                  className="btn-primary inline-flex items-center gap-1 text-sm"
                >
                  {tTools('roofingTitle')} →
                </Link>
                <Link
                  href="/tools/fence-calculator"
                  className="btn-secondary inline-flex items-center gap-1 text-sm"
                >
                  {tTools('fenceTitle')} →
                </Link>
                <Link
                  href="/tools/deck-calculator"
                  className="btn-secondary inline-flex items-center gap-1 text-sm"
                >
                  {tTools('deckTitle')} →
                </Link>
              </div>
            </div>

            {/* Flooring, Paint & Drywall */}
            <div className="card text-center">
              <div className="text-2xl mb-2">🪵</div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                {t('calcGroupInterior')}
              </h3>
              <div className="flex flex-col gap-2">
                <Link
                  href="/tools/flooring-calculator"
                  className="btn-primary inline-flex items-center gap-1 text-sm"
                >
                  {tTools('flooringTitle')} →
                </Link>
                <Link
                  href="/tools/paint-calculator"
                  className="btn-secondary inline-flex items-center gap-1 text-sm"
                >
                  {tTools('paintTitle')} →
                </Link>
                <Link
                  href="/tools/drywall-calculator"
                  className="btn-secondary inline-flex items-center gap-1 text-sm"
                >
                  {tTools('drywallTitle')} →
                </Link>
              </div>
            </div>

            {/* Lumber & Woodworking */}
            <div className="card text-center">
              <div className="text-2xl mb-2">🪵</div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                {t('calcGroupWoodworking')}
              </h3>
              <Link
                href="/tools/lumber-calculator"
                className="btn-primary inline-flex items-center gap-1 text-sm"
              >
                {tTools('lumberTitle')} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
