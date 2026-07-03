import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getLocalizedAlternates } from '@/lib/seo';
import { Link } from '@/i18n/navigation';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPage' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: getLocalizedAlternates(locale, '/about'),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPage' });
  const tGlobal = await getTranslations({ locale, namespace: 'global' });

  return (
    <div className="py-12">
      <div className="container-custom max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-lg text-gray-500 mb-12">{t('subtitle')}</p>

        {/* Mission */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('missionTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t('missionP1')}</p>
          <p className="text-gray-700 leading-relaxed">{t('missionP2')}</p>

          {/* CTA: Mission → Tools/Guides */}
          <div className="mt-6 bg-gradient-to-r from-primary-50 to-construction-50 border border-primary-100 rounded-2xl p-6">
            <p className="text-gray-800 font-medium mb-4">{t('ctaMissionText')}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/tools" className="btn-primary">
                {t('ctaCalculatorsBtn')}
              </Link>
              <Link href="/guides" className="btn-secondary">
                {t('ctaGuidesBtn')}
              </Link>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('teamTitle')}</h2>
          <div className="bg-gradient-to-r from-primary-50 to-construction-50 border border-primary-100 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 rounded-full bg-primary-600 flex items-center justify-center text-white text-xl font-bold">
                AG
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{t('teamName')}</h3>
                <p className="text-sm text-gray-500">Construction Tools & Guides</p>
              </div>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">{t('teamBio')}</p>
          <p className="text-gray-700 leading-relaxed">{t('teamBio2')}</p>
        </section>

        {/* Methodology */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('methodologyTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t('methodologyP1')}</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-2">
            <li>{t('methodologyRef1')}</li>
            <li>{t('methodologyRef2')}</li>
            <li>{t('methodologyRef3')}</li>
            <li>{t('methodologyRef4')}</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">{t('methodologyP2')}</p>
        </section>

        {/* CTA: Bottom → Tools */}
        <section className="mb-12 bg-gradient-to-r from-construction-50 to-primary-50 border border-construction-200 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{t('ctaBottomTitle')}</h2>
          <p className="text-gray-700 mb-6 max-w-lg mx-auto">{t('ctaBottomDesc')}</p>
          <Link href="/tools" className="btn-primary">
            {t('ctaBottomBtn')}
          </Link>
        </section>

        {/* Contact */}
        <section className="mb-12 bg-gray-50 border border-gray-200 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{t('contactTitle')}</h2>
          <p className="text-gray-700 mb-2">
            {t('contactDesc')}{' '}
            <a href={`mailto:${tGlobal('contactEmail')}`} className="text-primary-600 hover:underline font-medium">
              {tGlobal('contactEmail')}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
