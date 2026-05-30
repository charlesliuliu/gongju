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
      title: 'Concrete Calculator',
      description: t('concreteDesc'),
      icon: '🏗️',
      features: ['Slab calculations', 'Footing estimates', 'Cost estimation'],
    },
    {
      slug: 'roof-pitch-calculator',
      title: 'Roof Pitch Calculator',
      description: t('roofingDesc'),
      icon: '🏠',
      features: ['Pitch calculation', 'Angle conversion', 'Material estimates'],
    },
    {
      slug: 'flooring-calculator',
      title: 'Flooring Calculator',
      description: t('flooringDesc'),
      icon: '🪵',
      features: ['Room area', 'Box quantity', 'Cost estimation'],
    },
    {
      slug: 'paint-calculator',
      title: 'Paint Calculator',
      description: t('paintDesc'),
      icon: '🎨',
      features: ['Wall area', 'Gallon calculation', 'Cost estimation'],
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
