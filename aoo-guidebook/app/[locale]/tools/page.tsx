import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getLocalizedAlternates } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'tools' });
  return {
    title: t('pageTitle'),
    description: t('pageDesc'),
    alternates: getLocalizedAlternates(locale, '/tools'),
    openGraph: {
      title: `${t('pageTitle')} | App Guidebook`,
      description: t('pageDesc'),
      type: 'website',
    },
  };
}

export default async function ToolsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'tools' });

  const tools = [
    {
      slug: 'concrete-calculator',
      title: t('concreteTitle'),
      description: t('concreteDesc'),
      icon: '🏗️',
      features: [t('concreteFeature1'), t('concreteFeature2'), t('concreteFeature3')],
    },
    {
      slug: 'roof-pitch-calculator',
      title: t('roofingTitle'),
      description: t('roofingDesc'),
      icon: '🏠',
      features: [t('roofingFeature1'), t('roofingFeature2'), t('roofingFeature3')],
    },
    {
      slug: 'flooring-calculator',
      title: t('flooringTitle'),
      description: t('flooringDesc'),
      icon: '🪵',
      features: [t('flooringFeature1'), t('flooringFeature2'), t('flooringFeature3')],
    },
    {
      slug: 'paint-calculator',
      title: t('paintTitle'),
      description: t('paintDesc'),
      icon: '🎨',
      features: [t('paintFeature1'), t('paintFeature2'), t('paintFeature3')],
    },
    {
      slug: 'lumber-calculator',
      title: t('lumberTitle'),
      description: t('lumberDesc'),
      icon: '🪵',
      features: [t('lumberFeature1'), t('lumberFeature2'), t('lumberFeature3')],
    },
    {
      slug: 'deck-calculator',
      title: t('deckTitle'),
      description: t('deckDesc'),
      icon: '🪵',
      features: [t('deckFeature1'), t('deckFeature2'), t('deckFeature3')],
    },
    {
      slug: 'drywall-calculator',
      title: t('drywallTitle'),
      description: t('drywallDesc'),
      icon: '🧱',
      features: [t('drywallFeature1'), t('drywallFeature2'), t('drywallFeature3')],
    },
    {
      slug: 'fence-calculator',
      title: t('fenceTitle'),
      description: t('fenceDesc'),
      icon: '🏡',
      features: [t('fenceFeature1'), t('fenceFeature2'), t('fenceFeature3')],
    },
  ];

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('pageTitle')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('pageDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="card hover:shadow-lg transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{tool.icon}</div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {tool.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {tool.description}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {tool.features.map((feature) => (
                      <li
                        key={feature}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
