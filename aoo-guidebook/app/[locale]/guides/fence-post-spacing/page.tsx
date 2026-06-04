import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getLocalizedAlternates } from '@/lib/seo';
import { Breadcrumbs, ArticleJsonLd } from '@/components/ui/Breadcrumbs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guides' });
  return {
    title: t('fencePostGuide'),
    description: t('fencePostDesc'),
    keywords: [
      'fence post spacing',
      'fence post distance',
      'how far apart fence posts',
      'post spacing guide',
      'fence post installation',
      'setting fence posts',
    ],
    alternates: getLocalizedAlternates(locale, '/guides/fence-post-spacing'),
    openGraph: {
      title: `${t('fencePostGuide')} | App Guidebook`,
      description: t('fencePostDesc'),
      url: `https://appguidebook.com/${locale}/guides/fence-post-spacing`,
      type: 'article',
    },
  };
}

export default async function FencePostPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'fencePostPage' });
  const tGuides = await getTranslations({ locale, namespace: 'guides' });

  return (
    <div className="py-12">
      <article className="container-custom max-w-4xl">
        <header className="mb-10">
          <Breadcrumbs
            items={[
              { label: tGuides('title'), href: '/guides' },
              { label: tGuides('fencePostGuide') },
            ]}
           locale={locale}
/>
          <ArticleJsonLd path="/guides/fence-post-spacing" locale={locale} headline={tGuides('fencePostGuide')}
            description={tGuides('fencePostDesc')}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            {tGuides('fencePostGuide')}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            {tGuides('fencePostDesc')}
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-gray-400">
            <span>Updated June 2026</span>
            <span className="text-gray-200">|</span>
            <span>{t('readTime')}</span>
          </div>
        </header>

        {/* Calculator CTA */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 mb-12 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="font-semibold text-white text-lg">{t('ctaTitle')}</h3>
            <p className="text-primary-100 text-sm">{t('ctaDesc')}</p>
          </div>
          <Link href="/tools/fence-calculator" className="inline-flex items-center gap-2 bg-white text-primary-700 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary-50 transition-all duration-200">
            Open Fence Calculator
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-12">{t('intro')}</p>

        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('standardTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('standardP1')}</p>
          <p className="text-gray-700">{t('standardP2')}</p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('byFenceTypeTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('byFenceTypeP1')}</p>
          <p className="text-gray-700">{t('byFenceTypeP2')}</p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('soilTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('soilP1')}</p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('concreteTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('concreteP1')}</p>
          <p className="text-gray-700">{t('concreteP2')}</p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('calculatingTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('calculatingP1')}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('summaryTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t('summaryP1')}</p>
        </section>

        {/* Bottom CTA */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 my-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('ctaTitle')}</h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">{t('ctaDesc')}</p>
          <Link href="/tools/fence-calculator" className="btn-primary inline-flex items-center gap-2">
            Open Fence Calculator
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
            <Link href="/guides/fence-types-and-costs" className="card hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-gray-900 mb-1.5">{tGuides('fenceTypesGuide')}</h3>
              <p className="text-sm text-gray-500">{tGuides('fenceTypesDesc')}</p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
