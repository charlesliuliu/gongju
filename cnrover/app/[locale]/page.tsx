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

  const cities = [
    {
      slug: 'beijing',
      title: t('beijingTitle'),
      desc: t('beijingDesc'),
      emoji: '🏛️',
      image: 'great-wall',
    },
    {
      slug: '#',
      title: t('shanghaiTitle'),
      desc: t('shanghaiDesc'),
      emoji: '🌆',
      coming: true,
    },
    {
      slug: '#',
      title: t('chengduTitle'),
      desc: t('chengduDesc'),
      emoji: '🐼',
      coming: true,
    },
    {
      slug: '#',
      title: t('xianTitle'),
      desc: t('xianDesc'),
      emoji: '🏯',
      coming: true,
    },
  ];

  const guideCards = [
    { slug: 'visa', title: t('visaGuide'), desc: t('visaDesc'), emoji: '🛂' },
    { slug: 'payment', title: t('paymentGuide'), desc: t('paymentDesc'), emoji: '💳' },
    { slug: 'sim-card', title: t('simGuide'), desc: t('simDesc'), emoji: '📱' },
    { slug: 'transportation', title: t('transportGuide'), desc: t('transportDesc'), emoji: '🚄' },
  ];

  const features = [
    { title: t('localTitle'), desc: t('localDesc'), emoji: '🇨🇳' },
    { title: t('practicalTitle'), desc: t('practicalDesc'), emoji: '✅' },
    { title: t('bilingualTitle'), desc: t('bilingualDesc'), emoji: '🌏' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-emerald-800 py-20 md:py-28 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/images/beijing-hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700/60 to-emerald-900/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent" />
        <div className="container-custom text-center relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            {t('heroTitle')}
            <span className="text-accent-300"> {t('heroTitleAccent')}</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('heroSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/beijing"
              className="inline-flex items-center justify-center bg-white text-primary-700 px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-primary-50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              {t('startExploring')}
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

      {/* Cities Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('cityTitle')}
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {t('citySubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities.map((city) => {
              const cardContent = (
                <>
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-primary-100 transition-colors">
                    {city.emoji}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {city.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {city.desc}
                  </p>
                  {city.coming && (
                    <span className="inline-block mt-3 text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      Coming Soon
                    </span>
                  )}
                </>
              );

              if (city.coming) {
                return (
                  <div
                    key={city.slug}
                    className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 opacity-60 cursor-not-allowed"
                  >
                    {cardContent}
                  </div>
                );
              }

              return (
                <Link
                  key={city.slug}
                  href={`/beijing`}
                  className="group bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {cardContent}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('guideTitle')}
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {t('guideSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {guideCards.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-amber-100 transition-colors">
                  {guide.emoji}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {guide.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('whyTitle')}
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {t('whySubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((f, i) => (
              <div key={i} className="text-center p-8">
                <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl">
                  {f.emoji}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
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
            href="/beijing"
            className="btn-primary inline-flex items-center gap-2"
          >
            {t('startExploring')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
