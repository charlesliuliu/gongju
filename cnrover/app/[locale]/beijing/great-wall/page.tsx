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
  const t = await getTranslations({ locale, namespace: 'greatWall' });
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: getLocalizedAlternates(locale, '/beijing/great-wall'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDesc'),
    },
  };
}

export default async function GreatWallPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'greatWall' });
  const tg = await getTranslations({ locale, namespace: 'global' });

  const baseUrl = 'https://cnrover.pages.dev';

  const sections = [
    {
      name: t('badalingTitle'),
      desc: t('badalingDesc'),
      getThere: t('badalingHowToGet'),
      ticket: t('badalingTicket'),
      emoji: '🏰',
      crowd: 'Very crowded',
    },
    {
      name: t('mutianyuTitle'),
      desc: t('mutianyuDesc'),
      getThere: t('mutianyuHowToGet'),
      ticket: t('mutianyuTicket'),
      emoji: '🏔️',
      crowd: 'Moderate',
    },
    {
      name: t('simataiTitle'),
      desc: t('simataiDesc'),
      getThere: t('simataiHowToGet'),
      ticket: t('simataiTicket'),
      emoji: '⛰️',
      crowd: 'Quiet',
    },
    {
      name: t('jinshanlingTitle'),
      desc: t('jinshanlingDesc'),
      getThere: t('jinshanlingHowToGet'),
      ticket: t('jinshanlingTicket'),
      emoji: '🏞️',
      crowd: 'Very quiet',
    },
  ];

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: 'Home', url: `${baseUrl}/${locale}/` },
            { name: 'Beijing', url: `${baseUrl}/${locale}/beijing/` },
            { name: 'Great Wall', url: `${baseUrl}/${locale}/beijing/great-wall/` },
          ])),
        }}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-stone-700 via-stone-800 to-gray-900 py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/images/great-wall.svg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-stone-800/50 to-gray-900/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-600/20 to-transparent" />
        <div className="container-custom text-center relative">
          <span className="inline-block text-5xl mb-6">🧱</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            {t('heroTitle')}
          </h1>
          <p className="text-lg md:text-xl text-stone-300 max-w-3xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-600 leading-relaxed text-lg">{t('intro')}</p>
            {/* Great Wall hero image */}
            <div className="mt-8 rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-gradient-to-br from-stone-600 to-stone-900 h-64 md:h-80">
              <img
                src="/images/great-wall.jpg"
                alt="The Great Wall of China winding through green mountains"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 text-xs text-gray-400 text-center">The Great Wall winding through the mountains</p>
          </div>
        </div>
      </section>

      {/* Section Comparison */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t('whichSection')}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">{t('whichSectionIntro')}</p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {sections.map((s, i) => (
              <div key={i} className="card overflow-hidden">
                {/* Section image */}
                <div className={`h-48 md:h-56 -mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-6 overflow-hidden ${i === 0 ? 'bg-gradient-to-br from-stone-600 to-stone-800' : i === 1 ? 'bg-gradient-to-br from-emerald-600 to-emerald-800' : i === 2 ? 'bg-gradient-to-br from-sky-600 to-indigo-800' : 'bg-gradient-to-br from-amber-600 to-orange-800'}`}>
                  <img
                    src={`/images/great-wall-${i === 0 ? 'badaling' : i === 1 ? 'mutianyu' : i === 2 ? 'simatai' : 'jinshanling'}.jpg`}
                    alt={s.name}
                    className="w-full h-full object-cover opacity-90"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-3xl mt-1">{s.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{s.name}</h3>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        s.crowd === 'Very crowded' ? 'bg-red-50 text-red-600' :
                        s.crowd === 'Moderate' ? 'bg-amber-50 text-amber-600' :
                        s.crowd === 'Quiet' ? 'bg-green-50 text-green-600' :
                        'bg-blue-50 text-blue-600'
                      }`}>
                        {s.crowd}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">{s.desc}</p>
                    <div className="bg-gray-50 rounded-xl p-4 mb-2">
                      <p className="text-sm text-gray-600"><span className="font-medium">🚌</span> {s.getThere}</p>
                    </div>
                    <p className="text-sm text-gray-500">🎫 {s.ticket}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">{t('generalTips')}</h2>
            <div className="space-y-4">
              {[1,2,3,4,5,6].map((n) => (
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
              href="/beijing/forbidden-city"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              🏛️ {tg('forbiddenCity')} →
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
