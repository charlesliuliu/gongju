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

function ToolIcon({ color }: { color: string }) {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  );
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  const tt = await getTranslations({ locale, namespace: 'tools' });
  const tg = await getTranslations({ locale, namespace: 'guides' });

  const tools = [
    { slug: 'concrete-calculator', title: tt('concreteTitle'), desc: tt('concreteDesc'), color: '#2563EB' },
    { slug: 'roof-pitch-calculator', title: tt('roofingTitle'), desc: tt('roofingDesc'), color: '#EA580C' },
    { slug: 'flooring-calculator', title: tt('flooringTitle'), desc: tt('flooringDesc'), color: '#D97706' },
    { slug: 'paint-calculator', title: tt('paintTitle'), desc: tt('paintDesc'), color: '#7C3AED' },
    { slug: 'lumber-calculator', title: tt('lumberTitle'), desc: tt('lumberDesc'), color: '#059669' },
    { slug: 'deck-calculator', title: tt('deckTitle'), desc: tt('deckDesc'), color: '#B45309' },
    { slug: 'drywall-calculator', title: tt('drywallTitle'), desc: tt('drywallDesc'), color: '#4F46E5' },
    { slug: 'fence-calculator', title: tt('fenceTitle'), desc: tt('fenceDesc'), color: '#0891B2' },
  ];

  return (
    <div>
      {/* Hero — content-first, no calculator pitch */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-14 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent" />
        <div className="container-custom text-center relative">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
            {t('heroTitle')}
            <span className="text-construction-300"> {t('heroTitleAccent')}</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-100 max-w-3xl mx-auto mb-8 leading-relaxed">
            {t('heroSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/guides"
              className="inline-flex items-center justify-center bg-white text-primary-700 px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-primary-50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              {t('startCalculating')}
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center justify-center border-2 border-primary-300 text-white px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-white/10 transition-all duration-200"
            >
              {t('viewGuides')}
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar — no "Free" language */}
      <section className="bg-white border-b border-gray-100">
        <div className="container-custom py-5">
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <svg className="w-5 h-5 text-primary-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span>{t('freeTitle')}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>{t('mobileTitle')}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>{t('accurateTitle')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Guides — FIRST, above tools */}
      <section className="py-16 md:py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {t('trendingTitle')}
            </h2>
            <p className="text-gray-500 text-base max-w-2xl mx-auto">
              {t('trendingSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              { slug: 'diy-flooring-mistakes', title: tg('flooringMistakesGuide'), desc: tg('flooringMistakesDesc'), color: '#E11D48' },
              { slug: 'how-to-calculate-concrete', title: tg('concreteCalcGuide'), desc: tg('concreteCalcDesc'), color: '#2563EB' },
              { slug: 'concrete-slab-cost-guide', title: tg('slabCostGuide'), desc: tg('slabCostDesc'), color: '#059669' },
              { slug: 'roofing-materials-guide', title: tg('roofingMaterialsGuide'), desc: tg('roofingMaterialsDesc'), color: '#D97706' },
            ].map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: guide.color }} />
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {guide.title}
                  </h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed ml-5">
                  {guide.desc}
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/guides" className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
              {t('viewAllGuides')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Grid — SECOND, compact, no colorful CTAs */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {t('popularTitle')}
            </h2>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto">
              {t('popularSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group bg-white rounded-xl border border-gray-100 p-4 hover:border-gray-200 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: tool.color + '12' }}>
                    <ToolIcon color={tool.color} />
                  </div>
                  <h3 className="font-medium text-gray-800 text-sm group-hover:text-primary-600 transition-colors leading-tight">
                    {tool.title}
                  </h3>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                  {tool.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom — neutral dual-entry, no single-tool push */}
      <section className="py-16">
        <div className="container-custom text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {t('readyTitle')}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            {t('readyDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/guides" className="btn-primary text-sm">
              {t('tryCalculator')}
            </Link>
            <Link href="/tools" className="inline-flex items-center justify-center border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors">
              {t('bottomToolsBtn')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
