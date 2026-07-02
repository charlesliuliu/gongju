import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getLocalizedAlternates } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: getLocalizedAlternates(locale, '/about'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDesc'),
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const tg = await getTranslations({ locale, namespace: 'global' });

  return (
    <div>
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-emerald-800 py-20 md:py-28 overflow-hidden">
        <div className="container-custom text-center relative">
          <span className="inline-block text-5xl mb-6">🌏</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            {t('heroTitle')}
          </h1>
          <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('storyTitle')}</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{t('storyText')}</p>
            </section>

            <section className="bg-primary-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('missionTitle')}</h2>
              <ul className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <li key={n} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium shrink-0 mt-0.5">
                      {n}
                    </span>
                    <span className="text-gray-700">{t(`mission${n}`)}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('contactTitle')}</h2>
              <p className="text-gray-600 mb-4">{t('contactText')}</p>
              <a
                href={`mailto:${tg('emailContact')}`}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                {tg('emailContact')}
              </a>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
