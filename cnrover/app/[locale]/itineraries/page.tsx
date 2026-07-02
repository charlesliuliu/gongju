import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getLocalizedAlternates } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'itineraries' });
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: getLocalizedAlternates(locale, '/itineraries'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDesc'),
    },
  };
}

export default async function ItinerariesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'itineraries' });

  const days = [
    { title: t('day1Title'), am: t('day1Am'), pm: t('day1Pm'), evening: t('day1Evening'), note: t('day1Note'), number: 1 },
    { title: t('day2Title'), am: t('day2Am'), pm: t('day2Pm'), evening: t('day2Evening'), note: t('day2Note'), number: 2 },
    { title: t('day3Title'), am: t('day3Am'), pm: t('day3Pm'), evening: t('day3Evening'), note: t('day3Note'), number: 3 },
    { title: t('day4Title'), am: t('day4Am'), pm: t('day4Pm'), evening: t('day4Evening'), note: t('day4Note'), number: 4 },
    { title: t('day5Title'), am: t('day5Am'), pm: t('day5Pm'), evening: t('day5Evening'), number: 5 },
  ];

  const summaries = [
    { text: t('summaryDay1'), duration: t('summaryDay1Duration') },
    { text: t('summaryDay2'), duration: t('summaryDay2Duration') },
    { text: t('summaryDay3'), duration: t('summaryDay3Duration') },
    { text: t('summaryDay4'), duration: t('summaryDay4Duration') },
    { text: t('summaryDay5'), duration: t('summaryDay5Duration') },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-20 md:py-28 overflow-hidden">
        <div className="container-custom text-center relative">
          <span className="inline-block text-5xl mb-6">🗺️</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            {t('heroTitle')}
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Travel Banner */}
      <section className="relative h-56 md:h-72 overflow-hidden">
        <img
          src="/images/itinerary-beijing.jpg"
          alt="Travel in China"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white">
            <p className="text-2xl md:text-3xl font-bold tracking-wide mb-2">🗺️ Plan Your Beijing Adventure</p>
            <p className="text-white/70 text-sm">Choose your itinerary based on how much time you have</p>
          </div>
        </div>
      </section>

      {/* Day by Day */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-8">
            {days.map((day) => (
              <div key={day.number} className="card relative">
                <div className="absolute -left-3 top-6 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {day.number}
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">{day.title}</h2>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <span className="text-sm font-medium text-amber-600 w-20 shrink-0">☀️ Morning</span>
                      <span className="text-gray-600 text-sm">{day.am}</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-sm font-medium text-sky-600 w-20 shrink-0">🌤️ Afternoon</span>
                      <span className="text-gray-600 text-sm">{day.pm}</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-sm font-medium text-purple-600 w-20 shrink-0">🌙 Evening</span>
                      <span className="text-gray-600 text-sm">{day.evening}</span>
                    </div>
                    {day.note && (
                      <div className="mt-3 bg-blue-50 rounded-xl p-3">
                        <p className="text-xs text-blue-700">💡 {day.note}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Summary Table */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t('summaryTitle')}</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {summaries.map((s, i) => (
                <div key={i} className={`flex items-center justify-between px-6 py-4 ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <span className="text-sm text-gray-700">{s.text}</span>
                  <span className="text-xs text-gray-400 shrink-0 ml-4">{s.duration}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-primary-50 rounded-2xl">
              <p className="text-sm text-gray-700 leading-relaxed">
                💡 <strong>Recommendation:</strong> {t('recommendation')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-custom text-center">
          <Link href="/beijing" className="btn-secondary inline-flex items-center gap-2">
            ← Back to Beijing Guide
          </Link>
        </div>
      </section>
    </div>
  );
}
