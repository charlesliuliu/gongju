import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getLocalizedAlternates } from '@/lib/seo';
import Script from 'next/script';
import { breadcrumbSchema } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'transportGuide' });
  return {
    title: t('metaTitle'), description: t('metaDesc'),
    alternates: getLocalizedAlternates(locale, '/guides/transportation'),
    openGraph: { title: t('metaTitle'), description: t('metaDesc') },
  };
}

export default async function TransportPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'transportGuide' });
  const baseUrl = 'https://cnrover.pages.dev';

  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema([
          { name: 'Home', url: `${baseUrl}/${locale}/` },
          { name: 'Guides', url: `${baseUrl}/${locale}/guides/` },
          { name: 'Transportation', url: `${baseUrl}/${locale}/guides/transportation/` },
        ])),
      }} />
      <section className="relative bg-gradient-to-br from-amber-600 via-amber-700 to-orange-800 py-20 md:py-28 overflow-hidden">
        <div className="container-custom text-center relative">
          <span className="inline-block text-5xl mb-6">🚄</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">{t('heroTitle')}</h1>
          <p className="text-lg md:text-xl text-amber-100 max-w-2xl mx-auto">{t('heroSubtitle')}</p>
        </div>
      </section>
      <div className="py-16"><div className="container-custom max-w-3xl mx-auto space-y-12">
        {['highSpeedRail','subway','taxi','bike','app'].map((section) => (
          <section key={section}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t(`${section}Title`)}</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{t(`${section}Desc`)}</p>
          </section>
        ))}
        <div className="text-center"><Link href="/guides" className="btn-secondary">← Back to Guides</Link></div>
      </div></div>
    </>
  );
}
