import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getLocalizedAlternates } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: getLocalizedAlternates(locale, ''),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDesc'),
      type: 'website',
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  const tt = await getTranslations({ locale, namespace: 'tools' });

  const tools = [
    {
      slug: 'concrete-calculator',
      title: tt('concreteTitle'),
      description: tt('concreteDesc'),
      icon: '🏗️',
    },
    {
      slug: 'roof-pitch-calculator',
      title: tt('roofingTitle'),
      description: tt('roofingDesc'),
      icon: '🏠',
    },
    {
      slug: 'flooring-calculator',
      title: tt('flooringTitle'),
      description: tt('flooringDesc'),
      icon: '🪵',
    },
    {
      slug: 'paint-calculator',
      title: tt('paintTitle'),
      description: tt('paintDesc'),
      icon: '🎨',
    },
    {
      slug: 'lumber-calculator',
      title: tt('lumberTitle'),
      description: tt('lumberDesc'),
      icon: '🪵',
    },
    {
      slug: 'deck-calculator',
      title: tt('deckTitle'),
      description: tt('deckDesc'),
      icon: '🪵',
    },
    {
      slug: 'drywall-calculator',
      title: tt('drywallTitle'),
      description: tt('drywallDesc'),
      icon: '🧱',
    },
    {
      slug: 'fence-calculator',
      title: tt('fenceTitle'),
      description: tt('fenceDesc'),
      icon: '🏡',
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent" />
        <div className="container-custom text-center relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            {t('heroTitle')}
            <span className="text-construction-300"> {t('heroTitleAccent')}</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('heroSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tools/concrete-calculator"
              className="inline-flex items-center justify-center bg-white text-primary-700 px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-primary-50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              {t('startCalculating')}
            </Link>
            <Link
              href="/guides"
              className="inline-flex items-center justify-center border-2 border-primary-300 text-white px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-white/10 transition-all duration-200"
            >
              {t('viewGuides')}
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('popularTitle')}
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {t('popularSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-primary-100 transition-colors">
                  {tool.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Use */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('whyUse')}
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {t('whyUseSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-8">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('freeTitle')}</h3>
              <p className="text-gray-500 text-sm">{t('freeDesc')}</p>
            </div>
            <div className="text-center p-8">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('mobileTitle')}</h3>
              <p className="text-gray-500 text-sm">{t('mobileDesc')}</p>
            </div>
            <div className="text-center p-8">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('accurateTitle')}</h3>
              <p className="text-gray-500 text-sm">{t('accurateDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('readyTitle')}
          </h2>
          <p className="text-gray-500 text-lg mb-8">
            {t('readyDesc')}
          </p>
          <Link
            href="/tools/concrete-calculator"
            className="btn-primary inline-flex items-center gap-2"
          >
            {t('tryCalculator')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
