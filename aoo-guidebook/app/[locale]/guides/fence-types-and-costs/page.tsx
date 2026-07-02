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
    title: t('fenceTypesGuide'),
    description: t('fenceTypesDesc'),
    keywords: [
      'fence types',
      'fencing materials comparison',
      'wood vs vinyl fence',
      'chain link fence cost',
      'aluminum fence',
      'best fence material',
      'fence cost comparison',
    ],
    alternates: getLocalizedAlternates(locale, '/guides/fence-types-and-costs'),
    openGraph: {
      title: `${t('fenceTypesGuide')} | App Guidebook`,
      description: t('fenceTypesDesc'),
      url: `https://appguidebook.com/${locale}/guides/fence-types-and-costs`,
      type: 'article',
    },
  };
}

export default async function FenceTypesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'fenceTypesPage' });
  const tGuides = await getTranslations({ locale, namespace: 'guides' });

  const comparisonData = [
    { key: 'chainLink', label: t('chainLinkTitle'), cost: '$8–15', life: '15–25 yrs', privacy: '✕', maintenance: 'Low' },
    { key: 'wood', label: t('woodTitle'), cost: '$12–30', life: '10–15 yrs', privacy: '✓', maintenance: 'High' },
    { key: 'aluminum', label: t('aluminumTitle'), cost: '$20–30', life: '30+ yrs', privacy: '✕', maintenance: 'Minimal' },
    { key: 'vinyl', label: t('vinylTitle'), cost: '$20–35', life: '20–30 yrs', privacy: '✓', maintenance: 'None' },
  ];

  const sections = [
    { key: 'wood', title: t('woodTitle') },
    { key: 'vinyl', title: t('vinylTitle') },
    { key: 'chainLink', title: t('chainLinkTitle') },
    { key: 'aluminum', title: t('aluminumTitle') },
  ];

  return (
    <div className="py-12">
      <article className="container-custom max-w-4xl">
        {/* Header */}
        <header className="mb-10">
          <Breadcrumbs
            items={[
              { label: tGuides('title'), href: '/guides' },
              { label: tGuides('fenceTypesGuide') },
            ]}
           locale={locale}
/>
          <ArticleJsonLd path="/guides/fence-types-and-costs" locale={locale} headline={tGuides('fenceTypesGuide')}
            description={tGuides('fenceTypesDesc')}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            {tGuides('fenceTypesGuide')}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            {tGuides('fenceTypesDesc')}
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-gray-400">
            <span>Updated June 2026</span>
            <span className="text-gray-200">|</span>
            <span>{t('readTime')}</span>
          </div>
        </header>
          <AuthorBio locale={locale} />
          <CategoryIllustration category="fence" caption={t('illustrationCaption')} />

        {/* Introduction */}
        <p className="text-lg text-gray-700 leading-relaxed mb-12">{t('intro')}</p>

        {/* Material Sections */}
        {sections.map(({ key, title }) => (
          <section key={key} className="mb-14">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">{title}</h2>
            <p className="text-gray-700 mb-3">{t(`${key}P1`)}</p>
            <p className="text-gray-700 mb-3">{t(`${key}P2`)}</p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-gray-700 text-sm">{t(`${key}P3`)}</p>
            </div>
          </section>
        ))}

        {/* Comparison Table */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('comparisonTitle')}</h2>
          <p className="text-gray-700 mb-6">{t('comparisonP1')}</p>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left font-semibold text-gray-900">Material</th>
                  <th className="p-3 text-left font-semibold text-gray-900">Cost/Linear Ft</th>
                  <th className="p-3 text-left font-semibold text-gray-900">Lifespan</th>
                  <th className="p-3 text-left font-semibold text-gray-900">Privacy</th>
                  <th className="p-3 text-left font-semibold text-gray-900">Maintenance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {comparisonData.map((m) => (
                  <tr key={m.key} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 font-semibold text-gray-900">{m.label}</td>
                    <td className="p-3 text-gray-600">{m.cost}</td>
                    <td className="p-3 text-gray-600">{m.life}</td>
                    <td className="p-3 text-gray-600">{m.privacy}</td>
                    <td className="p-3 text-gray-600">{m.maintenance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-5 leading-relaxed">
            {t('comparisonNote')}{' '}
            <Link href="/guides/fence-post-spacing" className="text-primary-600 hover:text-primary-700 underline underline-offset-2 font-medium">
              {tGuides('fencePostGuide')}
            </Link>
          </p>
        </section>

        {/* Budget Analysis */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('budgetTitle')}</h2>
          <p className="text-gray-700 leading-relaxed">{t('budgetP1')}</p>
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
            href="/tools/fence-calculator"
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
            <Link href="/guides/how-to-calculate-fence-materials" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('fenceCalcGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('fenceCalcDesc')}</p>
            </Link>
            <Link href="/guides/fence-post-spacing" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('fencePostGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('fencePostDesc')}</p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
