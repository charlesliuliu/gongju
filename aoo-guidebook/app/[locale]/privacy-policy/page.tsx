import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getLocalizedAlternates } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacyPage' });
  return {
    title: t('title'),
    description: t('intro'),
    alternates: getLocalizedAlternates(locale, '/privacy-policy'),
  };
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacyPage' });

  return (
    <div className="py-12">
      <div className="container-custom max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-sm text-gray-500 mb-8">{t('lastUpdated')}</p>

        <p className="text-gray-700 mb-8">{t('intro')}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{t('noPersonalData')}</h2>
          <p className="text-gray-700">{t('noPersonalDataDesc')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{t('analytics')}</h2>
          <p className="text-gray-700">{t('analyticsDesc')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{t('cookies')}</h2>
          <p className="text-gray-700">{t('cookiesDesc')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{t('ads')}</h2>
          <p className="text-gray-700">{t('adsDesc')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{t('thirdParty')}</h2>
          <p className="text-gray-700">{t('thirdPartyDesc')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{t('children')}</h2>
          <p className="text-gray-700">{t('childrenDesc')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{t('changes')}</h2>
          <p className="text-gray-700">{t('changesDesc')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{t('contact')}</h2>
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
