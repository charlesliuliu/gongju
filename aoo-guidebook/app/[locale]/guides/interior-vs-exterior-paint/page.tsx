import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getLocalizedAlternates } from '@/lib/seo';
import { Breadcrumbs, ArticleJsonLd } from '@/components/ui/Breadcrumbs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('guides');
  return {
    title: t('paintTypesGuide'),
    description: t('paintTypesDesc'),
    keywords: [
      'interior vs exterior paint',
      'difference between interior and exterior paint',
      'best interior paint sheen',
      'exterior paint types',
      'choosing paint for home',
      'interior paint guide',
      'exterior paint guide',
    ],
    alternates: getLocalizedAlternates(locale, '/guides/interior-vs-exterior-paint'),
    openGraph: {
      title: 'Interior vs Exterior Paint Guide',
      description: 'Understand the differences between interior and exterior paints and how to choose the right type.',
      url: 'https://appguidebook.com/guides/interior-vs-exterior-paint',
      type: 'article',
    },
  };
}

export default async function PaintTypesPage() {
  const t = await getTranslations('paintTypesPage');
  const tGuides = await getTranslations('guides');
  const tGlobal = await getTranslations('global');

  return (
    <div className="py-12">
      <article className="container-custom max-w-4xl">
        {/* Header */}
        <header className="mb-10">
          <Breadcrumbs
            items={[
              { label: tGuides('title'), href: '/guides' },
              { label: tGuides('paintTypesGuide') },
            ]}
          />
          <ArticleJsonLd
            headline={tGuides('paintTypesGuide')}
            description={tGuides('paintTypesDesc')}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            {tGuides('paintTypesGuide')}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            {tGuides('paintTypesDesc')}
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

        {/* Why Different */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('whyDiffTitle')}</h2>
          <div className="prose prose-gray max-w-none space-y-3">
            <p>{t('whyDiffP1')}</p>
            <p>{t('whyDiffP2')}</p>
          </div>
        </section>

        {/* Interior Guide */}
        <section className="mb-10 p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('interiorTitle')}</h2>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('interiorSheenTitle')}</h3>
          <p className="text-sm text-gray-500 mb-3">{t('interiorSheenDesc')}</p>
          <ul className="space-y-2 text-gray-700 mb-6">
            {['Flat', 'Eggshell', 'Satin', 'Semi', 'Gloss'].map((sheen) => (
              <li key={sheen} className="flex items-start gap-2">
                <span className="text-primary-500 mt-0.5">•</span>
                <span>{t(`sheen${sheen}`)}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('interiorPrepTitle')}</h3>
          <p className="text-sm text-gray-500 mb-3">{t('interiorPrepP1')}</p>
          <ul className="space-y-2 text-gray-700">
            {['Patch', 'Clean', 'Prime', 'Protect'].map((prep) => (
              <li key={prep} className="flex items-start gap-2">
                <span className="text-primary-500 mt-0.5">•</span>
                <span>{t(`prep${prep}`)}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Exterior Guide */}
        <section className="mb-10 p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('exteriorTitle')}</h2>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('exteriorTypesTitle')}</h3>
          <p className="text-sm text-gray-500 mb-3">{t('exteriorTypesDesc')}</p>
          <ul className="space-y-2 text-gray-700 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-0.5">•</span>
              <span>{t('typeAcrylic')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-0.5">•</span>
              <span>{t('typeOil')}</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('exteriorPrepTitle')}</h3>
          <p className="text-sm text-gray-500 mb-3">{t('exteriorPrepP1')}</p>
          <ul className="space-y-2 text-gray-700">
            {['PowerWash', 'Scrape', 'Caulk', 'Prime', 'Weather'].map((prep) => (
              <li key={prep} className="flex items-start gap-2">
                <span className="text-primary-500 mt-0.5">•</span>
                <span>{t(`extPrep${prep}`)}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* How to Choose */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('howToChooseTitle')}</h2>
          <div className="prose prose-gray max-w-none space-y-3">
            <p>{t('howToChooseP1')}</p>
            <p>{t('howToChooseP2')}</p>
          </div>
        </section>

        {/* Can You Use Exterior Indoors */}
        <section className="mb-10 p-6 bg-amber-50 border border-amber-100 rounded-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{t('canYouUseTitle')}</h2>
          <div className="prose prose-gray max-w-none space-y-2">
            <p>{t('canYouUseP1')}</p>
            <p>{t('canYouUseP2')}</p>
          </div>
        </section>

        {/* Summary */}
        <section className="mb-10 p-6 bg-primary-50 border border-primary-100 rounded-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{t('summaryTitle')}</h2>
          <div className="prose prose-gray max-w-none space-y-2">
            <p>{t('summaryP1')}</p>
            <p>{t('summaryP2')}</p>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{tGuides('paintCalcGuide')}</h3>
          <p className="text-gray-600 mb-4">{tGuides('paintCalcDesc')}</p>
          <Link href="/tools/paint-calculator" className="btn-primary inline-block">
            {tGuides('paintCalcGuide')}
          </Link>
        </div>
      </article>
    </div>
  );
}
