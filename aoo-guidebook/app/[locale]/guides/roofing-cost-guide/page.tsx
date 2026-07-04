import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getLocalizedAlternates } from '@/lib/seo';
import { Breadcrumbs, ArticleJsonLd } from '@/components/ui/Breadcrumbs';
import AuthorBio from '@/components/ui/AuthorBio';
import CategoryIllustration from '@/components/ui/CategoryIllustration';
import QuickCalcBar from '@/components/ui/QuickCalcBar';
import FloatingCalcNav from '@/components/ui/FloatingCalcNav';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guides' });
  return {
    title: t('roofingCostGuide'),
    description: t('roofingCostDesc'),
    keywords: ['roof replacement cost 2026','new roof cost','roofing cost per square','roof installation cost','asphalt shingle roof cost','metal roof cost','roofing cost estimator','how much does a new roof cost'],
    alternates: getLocalizedAlternates(locale, '/guides/roofing-cost-guide'),
    openGraph: {
      title: `${t('roofingCostGuide')} | App Guidebook`,
      description: t('roofingCostDesc'),
      url: `https://appguidebook.com/${locale}/guides/roofing-cost-guide`,
      type: 'article',
    },
  };
}

export default async function RoofingCostPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'roofingCostPage' });
  const tGuides = await getTranslations({ locale, namespace: 'guides' });

  const matRows = [
    { mat: t('matAsphalt'), costLow: '$3.50', costHigh: '$5.50', life: '20–30 yrs', notes: t('matAsphaltNote') },
    { mat: t('matArchitectural'), costLow: '$4.50', costHigh: '$7.50', life: '25–35 yrs', notes: t('matArchitecturalNote') },
    { mat: t('matMetal'), costLow: '$6.00', costHigh: '$12.00', life: '40–70 yrs', notes: t('matMetalNote') },
    { mat: t('matTile'), costLow: '$8.00', costHigh: '$15.00', life: '50–100 yrs', notes: t('matTileNote') },
    { mat: t('matSlate'), costLow: '$15.00', costHigh: '$30.00', life: '75–200 yrs', notes: t('matSlateNote') },
    { mat: t('matWood'), costLow: '$6.00', costHigh: '$10.00', life: '25–40 yrs', notes: t('matWoodNote') },
  ];

  return (
    <div className="py-12">
      <FloatingCalcNav />
      <article className="container-custom max-w-4xl">
        <Breadcrumbs items={[{ label: tGuides('title'), href: '/guides' }, { label: tGuides('roofingCostGuide') }]} locale={locale} />
        <ArticleJsonLd path="/guides/roofing-cost-guide" locale={locale} headline={tGuides('roofingCostGuide')} description={tGuides('roofingCostDesc')} />

        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 bg-primary-50 px-4 py-1.5 rounded-full mb-5">
            <span>💰</span><span>Cost Guide</span><span className="text-primary-300">·</span><span>2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-5 tracking-tight leading-tight">{t('title')}</h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">{t('subtitle')}</p>
          <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-400">
            <span>🕐 {t('readTime')}</span><span className="text-gray-200">·</span><span>🏷️ Roofing</span>
          </div>
        </header>
        <AuthorBio locale={locale} />
        <CategoryIllustration category="roofing" caption={t('illustrationCaption')} />

          {/* Quick-access calculator bar — above the fold CTA */}
          <QuickCalcBar category="roofing" />

        {/* Quick Stats */}
        <section className="mb-14">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { emoji: '🏠', label: t('statAvgLabel'), value: t('statAvgValue'), sub: t('statAvgSub') },
              { emoji: '📐', label: t('statSqftLabel'), value: t('statSqftValue'), sub: t('statSqftSub') },
              { emoji: '⏱️', label: t('statTimeLabel'), value: t('statTimeValue'), sub: t('statTimeSub') },
            ].map((stat, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-5 text-center">
                <div className="text-3xl mb-2">{stat.emoji}</div>
                <div className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-1">{stat.label}</div>
                <div className="text-2xl font-black text-gray-900 mb-1">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Cost by Material */}
        <Section icon="📊" title={t('materialCostTitle')}>
          <p className="text-gray-700 leading-relaxed mb-6">{t('materialCostP1')}</p>
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="text-left px-5 py-3 font-semibold">{t('thMaterial')}</th>
                  <th className="text-left px-5 py-3 font-semibold">{t('thCostPerSqft')}</th>
                  <th className="text-left px-5 py-3 font-semibold">{t('thLifespan')}</th>
                  <th className="text-left px-5 py-3 font-semibold">{t('thNotes')}</th>
                </tr>
              </thead>
              <tbody>
                {matRows.map((row, i) => (
                  <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} border-b border-gray-100`}>
                    <td className="px-5 py-3 font-semibold text-gray-800">{row.mat}</td>
                    <td className="px-5 py-3 text-gray-700">{row.costLow}–{row.costHigh}/sq ft</td>
                    <td className="px-5 py-3 text-gray-600">{row.life}</td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-5 leading-relaxed">
            {t('comparisonNote')}{' '}
            <Link href="/guides/roofing-materials-guide" className="text-primary-600 hover:text-primary-700 underline underline-offset-2 font-medium">
              {tGuides('roofingMaterialsGuide')}
            </Link>
          </p>
        </Section>

        {/* What's Included */}
        <Section icon="📦" title={t('whatsIncludedTitle')}>
          <p className="text-gray-700 leading-relaxed mb-4">{t('whatsIncludedP1')}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: t('incOldTitle'), desc: t('incOldDesc'), pct: '5–10%' },
              { title: t('incUnderlaymentTitle'), desc: t('incUnderlaymentDesc'), pct: '5–8%' },
              { title: t('incFlashingTitle'), desc: t('incFlashingDesc'), pct: '3–5%' },
              { title: t('incVentTitle'), desc: t('incVentDesc'), pct: '2–4%' },
              { title: t('incLaborTitle'), desc: t('incLaborDesc'), pct: '50–60%' },
              { title: t('incPermitTitle'), desc: t('incPermitDesc'), pct: '2–5%' },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3">
                <span className="text-xs font-black bg-primary-100 text-primary-700 px-2 py-1 rounded-full flex-shrink-0">{item.pct}</span>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{item.title}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Factors */}
        <Section icon="🔍" title={t('factorsTitle')}>
          <div className="space-y-4">
            {[
              { title: t('factorPitchTitle'), desc: t('factorPitchDesc') },
              { title: t('factorSizeTitle'), desc: t('factorSizeDesc') },
              { title: t('factorAccessTitle'), desc: t('factorAccessDesc') },
              { title: t('factorLocationTitle'), desc: t('factorLocationDesc') },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                <span className="text-2xl flex-shrink-0">{['📐','📏','🏗️','📍'][i]}</span>
                <div>
                  <div className="font-semibold text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-600 mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Save Money */}
        <Section icon="💡" title={t('saveTitle')}>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: t('saveTimingTitle'), desc: t('saveTimingDesc') },
              { title: t('saveQuotesTitle'), desc: t('saveQuotesDesc') },
              { title: t('saveOverlayTitle'), desc: t('saveOverlayDesc') },
              { title: t('saveInsuranceTitle'), desc: t('saveInsuranceDesc') },
            ].map((item, i) => (
              <div key={i} className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="font-bold text-green-800 text-sm mb-1">{item.title}</div>
                <div className="text-green-700 text-xs leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Summary — pure informational, no tool CTA */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('summaryTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {t('summaryP1')}
          </p>
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

        {/* Single neutral tool entry — only ONE, at the very end */}
        <div className="border border-gray-200 rounded-2xl p-8 my-12 text-center bg-gray-50/50">
          <p className="text-gray-600 mb-5 max-w-xl mx-auto leading-relaxed text-sm">
            {t('toolEntryDesc')}
          </p>
          <Link
            href="/tools/roof-pitch-calculator"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-white hover:border-gray-400 transition-colors"
          >
            {t('toolEntryLink')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Related */}
        <section className="mt-16">
          <h3 className="text-xl font-black text-gray-900 mb-5">{tGuides('relatedGuides')}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/guides/roofing-materials-guide" className="card hover:shadow-lg hover:-translate-y-0.5 transition-all block">
              <div className="text-sm font-bold text-primary-600 mb-1">🏠 Guide</div>
              <div className="font-semibold text-gray-900">{tGuides('roofingMaterialsGuide')}</div>
              <div className="text-xs text-gray-500 mt-1">{tGuides('roofingMaterialsDesc')}</div>
            </Link>
            <Link href="/guides/how-to-calculate-roof-pitch" className="card hover:shadow-lg hover:-translate-y-0.5 transition-all block">
              <div className="text-sm font-bold text-primary-600 mb-1">📐 Guide</div>
              <div className="font-semibold text-gray-900">{tGuides('roofPitchCalcGuide')}</div>
              <div className="text-xs text-gray-500 mt-1">{tGuides('roofPitchCalcDesc')}</div>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}

function Section({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-14">
      <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
        <span>{icon}</span> {title}
      </h2>
      {children}
    </section>
  );
}
