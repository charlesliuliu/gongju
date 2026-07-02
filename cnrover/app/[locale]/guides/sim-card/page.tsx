import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getLocalizedAlternates } from '@/lib/seo';
import Script from 'next/script';
import { breadcrumbSchema } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'simGuide' });
  return {
    title: t('metaTitle'), description: t('metaDesc'),
    alternates: getLocalizedAlternates(locale, '/guides/sim-card'),
    openGraph: { title: t('metaTitle'), description: t('metaDesc') },
  };
}

export default async function SimCardPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'simGuide' });
  const baseUrl = 'https://cnrover.pages.dev';

  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema([
          { name: 'Home', url: `${baseUrl}/${locale}/` },
          { name: 'Guides', url: `${baseUrl}/${locale}/guides/` },
          { name: 'SIM & Internet', url: `${baseUrl}/${locale}/guides/sim-card/` },
        ])),
      }} />
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 py-20 md:py-28 overflow-hidden">
        <div className="container-custom text-center relative">
          <span className="inline-block text-5xl mb-6">📱</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">{t('heroTitle')}</h1>
          <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">{t('heroSubtitle')}</p>
        </div>
      </section>
      <div className="py-16"><div className="container-custom max-w-3xl mx-auto space-y-12">
        {/* Options */}
        {[1,2,3].map((n) => (
          <section key={n}>
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{t(`option${n}Title`)}</h2>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{t(`option${n}Desc`)}</p>
            </div>
          </section>
        ))}

        {/* VPN */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('vpnTitle')}</h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">{t('vpnDesc')}</p>
        </section>

        {/* Recommendation */}
        <section className="bg-primary-50 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🏆 {t('recommendation')}</h2>
          <ul className="space-y-2">
            {[1,2,3].map((n) => (
              <li key={n} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-primary-500 mt-0.5 shrink-0">•</span> {t(`rec${n}`)}
              </li>
            ))}
          </ul>
        </section>

        <div className="text-center"><Link href="/guides" className="btn-secondary">← Back to Guides</Link></div>
      </div></div>
    </>
  );
}
