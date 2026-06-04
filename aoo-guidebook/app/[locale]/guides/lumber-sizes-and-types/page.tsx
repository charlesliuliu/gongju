import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getLocalizedAlternates } from '@/lib/seo';
import { Breadcrumbs, ArticleJsonLd } from '@/components/ui/Breadcrumbs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guides' });
  return {
    title: t('lumberSizesGuide'),
    description: t('lumberSizesDesc'),
    keywords: [
      'lumber sizes',
      'nominal vs actual lumber',
      'lumber dimensions chart',
      '2x4 actual size',
      'lumber grades explained',
      'softwood vs hardwood',
      'pressure treated lumber',
      'lumber types guide',
    ],
    alternates: getLocalizedAlternates(locale, '/guides/lumber-sizes-and-types'),
    openGraph: {
      title: `${t('lumberSizesGuide')} | App Guidebook`,
      description: t('lumberSizesDesc'),
      url: `https://appguidebook.com/${locale}/guides/lumber-sizes-and-types`,
      type: 'article',
    },
  };
}

export default async function LumberSizesAndTypesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'lumberSizesPage' });
  const tGuides = await getTranslations({ locale, namespace: 'guides' });

  const dimensionRows = [
    { key: '2x4', nominal: '2 × 4', actual: '1½″ × 3½″' },
    { key: '2x6', nominal: '2 × 6', actual: '1½″ × 5½″' },
    { key: '2x8', nominal: '2 × 8', actual: '1½″ × 7¼″' },
    { key: '2x10', nominal: '2 × 10', actual: '1½″ × 9¼″' },
    { key: '2x12', nominal: '2 × 12', actual: '1½″ × 11¼″' },
  ];

  const grades = [
    { key: 'grade1', titleKey: 'grade1Title', descKey: 'grade1Desc' },
    { key: 'grade2', titleKey: 'grade2Title', descKey: 'grade2Desc' },
    { key: 'grade3', titleKey: 'grade3Title', descKey: 'grade3Desc' },
    { key: 'grade4', titleKey: 'grade4Title', descKey: 'grade4Desc' },
  ];

  return (
    <div className="py-12">
      <article className="container-custom max-w-4xl">
        {/* Header */}
        <header className="mb-10">
          <Breadcrumbs
            items={[
              { label: tGuides('title'), href: '/guides' },
              { label: tGuides('lumberSizesGuide') },
            ]}
           locale={locale}
/>
          <ArticleJsonLd path="/guides/lumber-sizes-and-types" locale={locale} headline={tGuides('lumberSizesGuide')}
            description={tGuides('lumberSizesDesc')}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            {tGuides('lumberSizesGuide')}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            {tGuides('lumberSizesDesc')}
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-gray-400">
            <span>Updated June 2026</span>
            <span className="text-gray-200">|</span>
            <span>{t('readTime')}</span>
          </div>
        </header>

        {/* Introduction */}
        <p className="text-lg text-gray-700 leading-relaxed mb-12">
          {t('intro')}
        </p>

        {/* Understanding Nominal vs Actual Sizes */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">
            {t('nominalTitle')}
          </h2>
          <p className="text-gray-700 mb-4">
            {t('nominalP1')}
          </p>
          <p className="text-gray-700 mb-6">
            {t('nominalP2')}
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <p className="text-gray-700 text-sm">
              {t('nominalProTip')}
            </p>
          </div>
        </section>

        {/* Common Lumber Dimensions */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">
            {t('dimensionsTitle')}
          </h2>
          <p className="text-gray-700 mb-6">
            {t('dimensionsIntro')}
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left font-semibold text-gray-900">{t('dimensionsHeaderNominal')}</th>
                  <th className="p-3 text-left font-semibold text-gray-900">{t('dimensionsHeaderActual')}</th>
                  <th className="p-3 text-left font-semibold text-gray-900">{t('dimensionsHeaderUses')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dimensionRows.map((row) => (
                  <tr key={row.key} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 font-semibold text-gray-900">{row.nominal}</td>
                    <td className="p-3 text-gray-600">{row.actual}</td>
                    <td className="p-3 text-gray-600">{t(row.key)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Softwood vs Hardwood */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">
            {t('softHardTitle')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">{t('softwoodLabel')}</h3>
              <p className="text-gray-700 text-sm">
                {t('softwoodP1')}
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">{t('hardwoodLabel')}</h3>
              <p className="text-gray-700 text-sm">
                {t('hardwoodP1')}
              </p>
            </div>
          </div>
        </section>

        {/* Pressure Treated Lumber */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">
            {t('treatedTitle')}
          </h2>
          <p className="text-gray-700 mb-4">
            {t('treatedP1')}
          </p>
          <p className="text-gray-700 mb-6">
            {t('treatedP2')}
          </p>

          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
            <p className="text-gray-700 text-sm">
              {t('softwoodSafetyNote')}
            </p>
          </div>
        </section>

        {/* Common Lumber Grades */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">
            {t('gradesTitle')}
          </h2>

          <div className="space-y-3">
            {grades.map(({ key, titleKey, descKey }) => (
              <div key={key} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-1">{t(titleKey)}</h3>
                <p className="text-gray-600 text-sm">{t(descKey)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Choosing the Right Lumber */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">
            {t('chooseTitle')}
          </h2>
          <p className="text-gray-700 mb-4">
            {t('chooseP1')}
          </p>
          <p className="text-gray-700 mb-6">
            {t('chooseP2')}
          </p>

          <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-3">
              <span className="text-primary-600 font-bold text-lg leading-none mt-0.5">1</span>
              <div>
                <span className="font-semibold text-gray-900">{t('chooseStep1Title')}</span>
                <p className="text-gray-600 text-sm mt-0.5">{t('chooseStep1Desc')}</p>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-3">
              <span className="text-primary-600 font-bold text-lg leading-none mt-0.5">2</span>
              <div>
                <span className="font-semibold text-gray-900">{t('chooseStep2Title')}</span>
                <p className="text-gray-600 text-sm mt-0.5">{t('chooseStep2Desc')}</p>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-3">
              <span className="text-primary-600 font-bold text-lg leading-none mt-0.5">3</span>
              <div>
                <span className="font-semibold text-gray-900">{t('chooseStep3Title')}</span>
                <p className="text-gray-600 text-sm mt-0.5">{t('chooseStep3Desc')}</p>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-3">
              <span className="text-primary-600 font-bold text-lg leading-none mt-0.5">4</span>
              <div>
                <span className="font-semibold text-gray-900">{t('chooseStep4Title')}</span>
                <p className="text-gray-600 text-sm mt-0.5">{t('chooseStep4Desc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('summaryTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t('summaryP1')}</p>
          <p className="text-gray-700 leading-relaxed">{t('summaryP2')}</p>
        </section>

        {/* Bottom CTA */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 my-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('ctaTitle')}</h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">{t('ctaDesc')}</p>
          <Link href="/tools/lumber-calculator" className="btn-primary inline-flex items-center gap-2">
            Open Lumber Calculator
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Related Guides */}
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{tGuides('relatedGuides')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/guides/how-to-calculate-lumber" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{t('relatedGuide1Title')}</h3>
              <p className="text-sm text-gray-500">{t('relatedGuide1Desc')}</p>
            </Link>
            <Link href="/guides/board-feet-calculation" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{t('relatedGuide2Title')}</h3>
              <p className="text-sm text-gray-500">{t('relatedGuide2Desc')}</p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
