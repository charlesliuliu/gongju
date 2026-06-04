import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getLocalizedAlternates } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'termsPage' });
  return {
    title: t('title'),
    description: t('intro'),
    alternates: getLocalizedAlternates(locale, '/terms-of-service'),
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'termsPage' });

  return (
    <div className="py-12">
      <div className="container-custom max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-sm text-gray-500 mb-8">{t('lastUpdated')}</p>

        <p className="text-gray-700 mb-8">{t('intro')}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{t('useTitle')}</h2>
          <p className="text-gray-700">{t('useDesc')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{t('accuracyTitle')}</h2>
          <p className="text-gray-700">{t('accuracyDesc')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{t('noLiabilityTitle')}</h2>
          <p className="text-gray-700">{t('noLiabilityDesc')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{t('intellectualTitle')}</h2>
          <p className="text-gray-700">{t('intellectualDesc')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{t('externalTitle')}</h2>
          <p className="text-gray-700">{t('externalDesc')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{t('changesTitle')}</h2>
          <p className="text-gray-700">{t('changesDesc')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{t('contactTitle')}</h2>
          <p className="text-gray-700">
            {t('contactDesc')}{' '}
            <a href="mailto:l15670751903@163.com" className="text-primary-600 hover:underline">
              l15670751903@163.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
