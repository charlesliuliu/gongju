import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getLocalizedAlternates } from '@/lib/seo';
import Script from 'next/script';
import { breadcrumbSchema } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'forbiddenCity' });
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: getLocalizedAlternates(locale, '/beijing/forbidden-city'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDesc'),
    },
  };
}

export default async function ForbiddenCityPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'forbiddenCity' });
  const tg = await getTranslations({ locale, namespace: 'global' });

  const baseUrl = 'https://cnrover.pages.dev';

  const routes = [
    { title: t('route2h'), desc: t('route2hDesc'), duration: '2 hours' },
    { title: t('route4h'), desc: t('route4hDesc'), duration: '4 hours' },
    { title: t('routeFull'), desc: t('routeFullDesc'), duration: '6-8 hours' },
  ];

  const highlights = [
    { title: t('highlight1Title'), desc: t('highlight1Desc') },
    { title: t('highlight2Title'), desc: t('highlight2Desc') },
    { title: t('highlight3Title'), desc: t('highlight3Desc') },
    { title: t('highlight4Title'), desc: t('highlight4Desc') },
  ];

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: 'Home', url: `${baseUrl}/${locale}/` },
            { name: 'Beijing', url: `${baseUrl}/${locale}/beijing/` },
            { name: 'Forbidden City', url: `${baseUrl}/${locale}/beijing/forbidden-city/` },
          ])),
        }}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-red-700 via-red-800 to-yellow-900 py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/images/forbidden-city.svg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-red-800/40 to-yellow-900/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-500/10 to-transparent" />
        <div className="container-custom text-center relative">
          <span className="inline-block text-5xl mb-6">🏛️</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            {t('heroTitle')}
          </h1>
          <p className="text-lg md:text-xl text-red-100 max-w-3xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-600 leading-relaxed text-lg">{t('intro')}</p>
            <div className="mt-8 rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-gradient-to-br from-red-700 via-red-800 to-yellow-900 h-64 md:h-80">
              <img
                src="/images/forbidden-city.jpg"
                alt="Forbidden City - Hall of Supreme Harmony"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 text-xs text-gray-400 text-center">The Hall of Supreme Harmony, the largest hall in the Forbidden City</p>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section className="py-16 bg-amber-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">🎫 {t('booking')}</h2>
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{t('bookingText')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Routes */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t('routeTitle')}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">{t('routeOptions')}</p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {routes.map((route, i) => (
              <div key={i} className="card overflow-hidden">
                {/* Route header image */}
                <div className={`h-36 md:h-40 -mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-4 overflow-hidden ${i === 0 ? 'bg-blue-100' : i === 1 ? 'bg-amber-100' : 'bg-green-100'}`}>
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    {i === 0 ? '⚡' : i === 1 ? '⭐' : '🎯'}
                  </div>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{route.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{route.desc}</p>
                  </div>
                  <span className="shrink-0 text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                    {route.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          {/* Highlights banner image */}
          <div className="max-w-4xl mx-auto mb-8 rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-gradient-to-br from-red-600 via-red-700 to-amber-800 h-48 md:h-64">
            <img
              src="/images/forbidden-city-hall.jpg"
              alt="Forbidden City architecture - intricate roof details"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">✨ {t('highlights')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {highlights.map((h, i) => (
              <div key={i} className="card">
                <h3 className="font-semibold text-gray-900 mb-2">{h.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">💡 {t('tips')}</h2>
            <div className="space-y-4">
              {[1,2,3,4,5].map((n) => (
                <div key={n} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <span className="w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-medium shrink-0 mt-0.5">
                    {n}
                  </span>
                  <p className="text-gray-600 text-sm">{t(`tip${n}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/itineraries"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              🗺️ {tg('itineraries')} →
            </Link>
            <Link
              href="/beijing"
              className="btn-secondary inline-flex items-center justify-center gap-2"
            >
              ← {tg('beijing')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
