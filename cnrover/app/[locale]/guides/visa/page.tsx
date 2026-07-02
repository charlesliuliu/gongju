import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getLocalizedAlternates } from '@/lib/seo';
import Script from 'next/script';
import { breadcrumbSchema } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'visaGuide' });
  return {
    title: t('metaTitle'), description: t('metaDesc'),
    alternates: getLocalizedAlternates(locale, '/guides/visa'),
    openGraph: { title: t('metaTitle'), description: t('metaDesc') },
  };
}

export default async function VisaGuidePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'visaGuide' });
  const baseUrl = 'https://cnrover.pages.dev';

  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema([
          { name: 'Home', url: `${baseUrl}/${locale}/` },
          { name: 'Guides', url: `${baseUrl}/${locale}/guides/` },
          { name: 'Visa Guide', url: `${baseUrl}/${locale}/guides/visa/` },
        ])),
      }} />
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-20 md:py-28 overflow-hidden">
        <div className="container-custom text-center relative">
          <span className="inline-block text-5xl mb-6">🛂</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">{t('heroTitle')}</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">{t('heroSubtitle')}</p>
        </div>
      </section>
      <div className="py-16"><div className="container-custom max-w-3xl mx-auto space-y-12">
        {/* Visa Types */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('visaTypes')}</h2>
          <div className="space-y-4">
            {['L','M','X'].map((type) => (
              <div key={type} className="card">
                <h3 className="font-semibold text-gray-900 mb-1">{t(`type${type}`)}</h3>
                <p className="text-gray-500 text-sm">{t(`type${type}Desc`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Application Process */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('applicationProcess')}</h2>
          <div className="space-y-3">
            {[1,2,3,4,5].map((s) => (
              <div key={s} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <span className="w-7 h-7 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium shrink-0">{s}</span>
                <p className="text-gray-600 text-sm">{t(`step${s}`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Required Docs */}
        <section className="bg-amber-50 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{t('requiredDocs')}</h2>
          <ul className="space-y-2">
            {[1,2,3,4,5,6].map((d) => (
              <li key={d} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span> {t(`doc${d}`)}
              </li>
            ))}
          </ul>
        </section>

        {/* Visa Free */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('visaFree')}</h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">{t('visaFreeText')}</p>
        </section>

        {/* Transit */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('transit')}</h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">{t('transitText')}</p>
        </section>

        {/* Important */}
        <section className="bg-red-50 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">⚠️ {t('important')}</h2>
          <ul className="space-y-2">
            {[1,2,3,4].map((n) => (
              <li key={n} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-red-500 mt-0.5">•</span> {t(`tip${n}`)}
              </li>
            ))}
          </ul>
        </section>

        <div className="text-center pt-4">
          <Link href="/guides" className="btn-secondary">← Back to Guides</Link>
        </div>
      </div></div>
    </>
  );
}
