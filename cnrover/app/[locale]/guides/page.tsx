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
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: getLocalizedAlternates(locale, '/guides'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDesc'),
    },
  };
}

export default async function GuidesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guides' });

  const guides = [
    { slug: 'visa', title: t('visaTitle'), desc: t('visaDesc'), emoji: '🛂', color: 'bg-blue-50' },
    { slug: 'payment', title: t('paymentTitle'), desc: t('paymentDesc'), emoji: '💳', color: 'bg-green-50' },
    { slug: 'sim-card', title: t('simTitle'), desc: t('simDesc'), emoji: '📱', color: 'bg-purple-50' },
    { slug: 'transportation', title: t('transportTitle'), desc: t('transportDesc'), emoji: '🚄', color: 'bg-amber-50' },
  ];

  return (
    <div>
      <section className="relative bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 py-20 md:py-28 overflow-hidden">
        <div className="container-custom text-center relative">
          <span className="inline-block text-5xl mb-6">📖</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            {t('pageTitle')}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {t('pageSubtitle')}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-14 h-14 ${guide.color} rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
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
    </div>
  );
}
