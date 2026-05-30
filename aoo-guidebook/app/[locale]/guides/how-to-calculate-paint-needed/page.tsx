import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getLocalizedAlternates } from '@/lib/seo';
import { Breadcrumbs, ArticleJsonLd } from '@/components/ui/Breadcrumbs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guides' });
  return {
    title: t('paintCalcGuide'),
    description: t('paintCalcDesc'),
    keywords: [
      'how to calculate paint needed',
      'paint calculator guide',
      'how much paint for a room',
      'paint coverage formula',
      'calculate paint gallons',
      'wall paint estimation',
    ],
    alternates: getLocalizedAlternates(locale, '/guides/how-to-calculate-paint-needed'),
    openGraph: {
      title: 'How to Calculate Paint Needed - Complete Guide',
      description: 'Learn how to calculate exactly how much paint you need for any room.',
      url: 'https://appguidebook.com/guides/how-to-calculate-paint-needed',
      type: 'article',
    },
  };
}

export default async function PaintCalcPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'paintCalcPage' });
  const tGuides = await getTranslations({ locale, namespace: 'guides' });
  const tGlobal = await getTranslations({ locale, namespace: 'global' });

  return (
    <div className="py-12">
      <article className="container-custom max-w-4xl">
        {/* Header */}
        <header className="mb-10">
          <Breadcrumbs
            items={[
              { label: tGuides('title'), href: '/guides' },
              { label: tGuides('paintCalcGuide') },
            ]}
          />
          <ArticleJsonLd
            headline={tGuides('paintCalcGuide')}
            description={tGuides('paintCalcDesc')}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            {tGuides('paintCalcGuide')}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            {tGuides('paintCalcDesc')}
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-gray-400">
            <span>Updated June 2026</span>
            <span className="text-gray-200">|</span>
            <span>{t('readTime')}</span>
          </div>
        </header>

        {/* Intro */}
        <section className="prose prose-gray max-w-none mb-10">
          <p>{t('intro')}</p>
        </section>

        {/* Why Accurate */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('whyAccurateTitle')}</h2>
          <div className="prose prose-gray max-w-none space-y-3">
            <p>{t('whyAccurateP1')}</p>
            <p>{t('whyAccurateP2')}</p>
          </div>
        </section>

        {/* Step 1 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('step1Title')}</h2>
          <div className="prose prose-gray max-w-none space-y-3">
            <p>{t('step1P1')}</p>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center font-mono text-lg font-semibold text-primary-700">
              {t('step1Formula')}
            </div>
            <p className="font-medium text-gray-700">→ {t('step1Example')}</p>
            <p>{t('step1Ceilings')}</p>
          </div>
        </section>

        {/* Step 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('step2Title')}</h2>
          <div className="prose prose-gray max-w-none space-y-3">
            <p>{t('step2P1')}</p>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center font-mono text-lg font-semibold text-primary-700">
              {t('step2Formula')}
            </div>
            <p className="font-medium text-gray-700">→ {t('step2Example')}</p>
          </div>
        </section>

        {/* Step 3 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('step3Title')}</h2>
          <div className="prose prose-gray max-w-none space-y-3">
            <p>{t('step3P1')}</p>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center font-mono text-lg font-semibold text-primary-700">
              {t('step3Formula')}
            </div>
            <p className="font-medium text-gray-700">→ {t('step3Example')}</p>
          </div>
        </section>

        {/* Step 4 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('step4Title')}</h2>
          <div className="prose prose-gray max-w-none space-y-3">
            <p>{t('step4P1')}</p>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center font-mono text-lg font-semibold text-primary-700">
              {t('step4Formula')}
            </div>
            <p className="font-medium text-gray-700">→ {t('step4Example')}</p>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
              <strong>💡 {t('step4Note')}</strong>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="mb-10 p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{t('summaryTitle')}</h2>
          <div className="prose prose-gray max-w-none space-y-2">
            <p>{t('summaryP1')}</p>
            <p>{t('summaryP2')}</p>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-primary-50 border border-primary-100 rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{t('ctaTitle')}</h3>
          <p className="text-gray-600 mb-4">{t('ctaDesc')}</p>
          <Link href="/tools/paint-calculator" className="btn-primary inline-block">
            {tGuides('paintCalcGuide')}
          </Link>
        </div>
      </article>
    </div>
  );
}
