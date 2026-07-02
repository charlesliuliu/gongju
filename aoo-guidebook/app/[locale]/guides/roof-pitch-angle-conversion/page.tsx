import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getLocalizedAlternates } from '@/lib/seo';
import { Breadcrumbs, ArticleJsonLd } from '@/components/ui/Breadcrumbs';
import AuthorBio from '@/components/ui/AuthorBio';
import CategoryIllustration from '@/components/ui/CategoryIllustration';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guides' });
  return {
    title: t('pitchAngleGuide'),
    description: t('pitchAngleDesc'),
    keywords: [
      'roof pitch to angle',
      'roof pitch angle conversion',
      'convert roof pitch to degrees',
      'roof slope to angle',
      'pitch to angle chart',
      'roof angle calculator degrees',
    ],
    alternates: getLocalizedAlternates(locale, '/guides/roof-pitch-angle-conversion'),
    openGraph: {
      title: `${t('pitchAngleGuide')} | App Guidebook`,
      description: t('pitchAngleDesc'),
      url: `https://appguidebook.com/${locale}/guides/roof-pitch-angle-conversion`,
      type: 'article',
    },
  };
}

export default async function PitchAngleConversionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pitchAngleGuide' });
  const tGuides = await getTranslations({ locale, namespace: 'guides' });

  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <div className="py-12">
      <article className="container-custom max-w-4xl">
        {/* Header */}
        <header className="mb-10">
          <Breadcrumbs
            items={[
              { label: tGuides('title'), href: '/guides' },
              { label: tGuides('pitchAngleGuide') },
            ]}
           locale={locale}
/>
          <ArticleJsonLd path="/guides/roof-pitch-angle-conversion" locale={locale} headline={tGuides('pitchAngleGuide')}
            description={tGuides('pitchAngleDesc')}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            {tGuides('pitchAngleGuide')}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            {tGuides('pitchAngleDesc')}
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-gray-400">
            <span>Updated June 2026</span>
            <span className="text-gray-200">|</span>
            <span>{t('readTime')}</span>
          </div>
        </header>
          <AuthorBio locale={locale} />
          <CategoryIllustration category="roofing" caption={t('illustrationCaption')} />

        {/* Introduction */}
        <p className="text-lg text-gray-700 leading-relaxed mb-12">{t('intro')}</p>

        {/* Relationship */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('relationshipTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('relationshipP1')}</p>
          <ul className="space-y-2 text-gray-700 mb-4">
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-1">•</span>
              <span>{t('relationshipPitch')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-1">•</span>
              <span>{t('relationshipAngle')}</span>
            </li>
          </ul>
          <p className="text-gray-700">{t('relationshipP3')}</p>
        </section>

        {/* Formula */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('formulaTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('formulaP1')}</p>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 my-6 text-center">
            <p className="text-lg font-mono font-semibold text-gray-900">{t('formulaPitch')}</p>
          </div>

          <p className="text-gray-700 mb-3">{t('formulaP2')}</p>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 my-4">
            <p className="text-gray-700 font-mono text-sm">{t('formulaExample')}</p>
          </div>

          <p className="text-gray-700 mb-3 mt-8">{t('formulaP3')}</p>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 my-6 text-center">
            <p className="text-lg font-mono font-semibold text-gray-900">{t('formulaAngle')}</p>
          </div>

          <p className="text-gray-700 mb-3">{t('formulaP4')}</p>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 my-4">
            <p className="text-gray-700 font-mono text-sm">{t('formulaExample2')}</p>
          </div>
        </section>

        {/* Conversion Table */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('tableTitle')}</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left font-semibold text-gray-900">{t('tablePitch')}</th>
                  <th className="p-3 text-left font-semibold text-gray-900">{t('tableAngle')}</th>
                  <th className="p-3 text-left font-semibold text-gray-900">{t('tableSlope')}</th>
                  <th className="p-3 text-left font-semibold text-gray-900">{t('tableDesc')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rows.map((i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 font-semibold text-gray-900">{t(`row${i}`)}</td>
                    <td className="p-3 text-gray-600">{t(`row${i}Angle`)}</td>
                    <td className="p-3 text-gray-600">{t(`row${i}Slope`)}</td>
                    <td className="p-3 text-gray-600">{t(`row${i}Desc`)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Why Matters */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('whyMattersTitle')}</h2>
          <p className="text-gray-700 mb-6">{t('whyMattersP1')}</p>
          <div className="space-y-3">
            {['architects', 'contractors', 'suppliers', 'building'].map((item) => (
              <div key={item} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="text-gray-700 text-sm">{t(`whyMatters${item.charAt(0).toUpperCase() + item.slice(1)}`)}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-700 mt-4">
            {t.rich('whyMattersHowTo', {
              link: (chunks: React.ReactNode) => (
                <Link href="/guides/how-to-calculate-roof-pitch" className="text-primary-600 hover:text-primary-700 underline font-medium">
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </section>

        {/* Summary */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('summaryTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t('summaryP1')}</p>
          <p className="text-gray-700 leading-relaxed">{t('summaryP2')}</p>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('faqTitle')}</h2>
          <div className="space-y-4">
            {(['1', '2', '3', '4', '5'] as const).map((n) => (
              <details key={n} className="bg-white border border-gray-200 rounded-xl group">
                <summary className="px-6 py-4 cursor-pointer font-medium text-gray-900 hover:text-primary-700 transition-colors list-none [&::-webkit-details-marker]:hidden flex items-center justify-between">
                  {t(`faqQ${n}`)}
                  <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                  {t(`faqA${n}`)}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Single neutral CTA — only ONE, at the very end */}
        <div className="border border-gray-200 rounded-2xl p-8 my-12 text-center bg-gray-50/50">
          <p className="text-gray-600 mb-5 max-w-xl mx-auto leading-relaxed text-sm">
            {t('ctaDesc')}
          </p>
          <Link
            href="/tools/roof-pitch-calculator"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-white hover:border-gray-400 transition-colors"
          >
            {t('ctaBtn')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Related */}
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{tGuides('relatedGuides')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/guides/how-to-calculate-roof-pitch" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('roofPitchCalcGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('roofPitchCalcDesc')}</p>
            </Link>
            <Link href="/guides/roofing-materials-guide" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('roofingMaterialsGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('roofingMaterialsDesc')}</p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
