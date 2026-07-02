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
  const t = await getTranslations({ locale, namespace: 'beijing' });
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: getLocalizedAlternates(locale, '/beijing'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDesc'),
    },
  };
}

export default async function BeijingPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'beijing' });
  const tg = await getTranslations({ locale, namespace: 'global' });
  const tf = await getTranslations({ locale, namespace: 'greatWall' });
  const tfc = await getTranslations({ locale, namespace: 'forbiddenCity' });

  const baseUrl = 'https://cnrover.pages.dev';

  const attractions = [
    {
      slug: 'great-wall',
      title: tg('greatWall'),
      desc: tf('heroSubtitle'),
      emoji: '🧱',
      time: 'Full day',
    },
    {
      slug: 'forbidden-city',
      title: tg('forbiddenCity'),
      desc: tfc('heroSubtitle'),
      emoji: '🏛️',
      time: 'Half day',
    },
    {
      slug: '../itineraries',
      title: tg('itineraries'),
      desc: 'Curated 3-day and 5-day Beijing itineraries',
      emoji: '🗺️',
      time: 'Plan your trip',
    },
  ];

  const foods = [
    { name: t('foodPekingDuck'), desc: t('foodPekingDuckDesc') },
    { name: t('foodZhajiangmian'), desc: t('foodZhajiangmianDesc') },
    { name: t('foodDumplings'), desc: t('foodDumplingsDesc') },
    { name: t('foodHotpot'), desc: t('foodHotpotDesc') },
  ];

  const tips = [
    { title: t('tip1Title'), desc: t('tip1Desc') },
    { title: t('tip2Title'), desc: t('tip2Desc') },
    { title: t('tip3Title'), desc: t('tip3Desc') },
    { title: t('tip4Title'), desc: t('tip4Desc') },
  ];

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: 'Home', url: `${baseUrl}/${locale}/` },
            { name: 'Beijing', url: `${baseUrl}/${locale}/beijing/` },
          ])),
        }}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-amber-700 via-rose-700 to-primary-800 py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/images/beijing.svg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-800/40 to-primary-900/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-white/10 to-transparent" />
        <div className="container-custom text-center relative">
          <span className="inline-block text-5xl mb-6">🏛️</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            {t('heroTitle')}
          </h1>
          <p className="text-lg md:text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{t('overview')}</h2>
            <p className="text-gray-600 leading-relaxed mb-6">{t('overviewText')}</p>

            {/* Beijing city image */}
            <div className="mb-8 rounded-2xl overflow-hidden shadow-md border border-gray-100 h-56 md:h-72">
              <img
                src="/images/beijing-hero.jpg"
                alt="Beijing cityscape - modern city skyline"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            {/* Quick Facts */}
            <div className="bg-primary-50 rounded-2xl p-6 md:p-8 mb-12">
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">{t('quickFacts')}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: t('population'), value: t('populationValue') },
                  { label: t('language'), value: t('languageValue') },
                  { label: t('bestTime'), value: t('bestTimeValue') },
                  { label: t('currency'), value: t('currencyValue') },
                ].map((fact, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 text-center">
                    <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">{fact.label}</div>
                    <div className="font-semibold text-gray-900 text-sm">{fact.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Attractions */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t('topAttractions')}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">{t('topAttractionsText')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {attractions.map((a) => (
              <Link
                key={a.slug}
                href={`/beijing/${a.slug}`}
                className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Attraction image header */}
                <div className={`h-40 overflow-hidden relative ${a.slug === 'great-wall' ? 'bg-gradient-to-br from-stone-600 to-stone-800' : a.slug === 'forbidden-city' ? 'bg-gradient-to-br from-red-700 to-amber-800' : 'bg-gradient-to-br from-amber-100 to-amber-200'}`}>
                  {a.slug === 'great-wall' || a.slug === 'forbidden-city' ? (
                    <img
                      src={a.slug === 'great-wall'
                        ? '/images/great-wall.jpg'
                        : '/images/forbidden-city.jpg'}
                      alt={a.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-5xl">{a.emoji}</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">{a.desc}</p>
                  <span className="text-xs text-gray-400">{a.time}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Food Image Banner */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img
          src="/images/beijing-food.jpg"
          alt="Chinese cuisine - Peking duck and local dishes"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white text-2xl md:text-3xl font-bold tracking-wide">
            🥟 Taste of Beijing 🥟
          </p>
        </div>
      </section>

      {/* Food */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t('mustTryFood')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {foods.map((food, i) => (
              <div key={i} className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{food.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{food.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transport Hub */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{t('transportHub')}</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{t('transportHubText')}</p>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">💡 Travel Tips</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {tips.map((tip, i) => (
              <div key={i} className="card">
                <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/beijing/great-wall"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              🧱 {tg('greatWall')}
            </Link>
            <Link
              href="/beijing/forbidden-city"
              className="btn-secondary inline-flex items-center justify-center gap-2"
            >
              🏛️ {tg('forbiddenCity')}
            </Link>
            <Link
              href="/itineraries"
              className="btn-secondary inline-flex items-center justify-center gap-2"
            >
              🗺️ {tg('itineraries')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
