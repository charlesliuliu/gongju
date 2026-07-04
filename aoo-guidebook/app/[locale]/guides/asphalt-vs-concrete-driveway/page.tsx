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
    title: t('asphaltConcreteGuide'),
    description: t('asphaltConcreteDesc'),
    keywords: ['asphalt vs concrete driveway','concrete vs asphalt cost','driveway material comparison','asphalt driveway cost','concrete driveway cost','best driveway material','driveway paving options'],
    alternates: getLocalizedAlternates(locale, '/guides/asphalt-vs-concrete-driveway'),
    openGraph: {
      title: `${t('asphaltConcreteGuide')} | App Guidebook`,
      description: t('asphaltConcreteDesc'),
      url: `https://appguidebook.com/${locale}/guides/asphalt-vs-concrete-driveway`,
      type: 'article',
    },
  };
}

export default async function AsphaltVsConcretePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'asphaltConcretePage' });
  const tGuides = await getTranslations({ locale, namespace: 'guides' });

  const rows = [
    { label: t('rowCost'), asphalt: t('asphaltCost'), concrete: t('concreteCost'), winner: 'asphalt' as const },
    { label: t('rowLifespan'), asphalt: t('asphaltLifespan'), concrete: t('concreteLifespan'), winner: 'concrete' as const },
    { label: t('rowMaintenance'), asphalt: t('asphaltMaintenance'), concrete: t('concreteMaintenance'), winner: 'concrete' as const },
    { label: t('rowInstallation'), asphalt: t('asphaltInstallation'), concrete: t('concreteInstallation'), winner: 'asphalt' as const },
    { label: t('rowWeather'), asphalt: t('asphaltWeather'), concrete: t('concreteWeather'), winner: 'concrete' as const },
    { label: t('rowLooks'), asphalt: t('asphaltLooks'), concrete: t('concreteLooks'), winner: 'concrete' as const },
    { label: t('rowRepair'), asphalt: t('asphaltRepair'), concrete: t('concreteRepair'), winner: 'asphalt' as const },
    { label: t('rowResale'), asphalt: t('asphaltResale'), concrete: t('concreteResale'), winner: 'concrete' as const },
  ];

  return (
    <div className="py-12">
      <FloatingCalcNav />
      <article className="container-custom max-w-4xl">
        <Breadcrumbs items={[{ label: tGuides('title'), href: '/guides' }, { label: tGuides('asphaltConcreteGuide') }]} locale={locale} />
        <ArticleJsonLd path="/guides/asphalt-vs-concrete-driveway" locale={locale} headline={tGuides('asphaltConcreteGuide')} description={tGuides('asphaltConcreteDesc')} />

        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 bg-primary-50 px-4 py-1.5 rounded-full mb-5">
            <span>🆚</span><span>Comparison Guide</span><span className="text-primary-300">·</span><span>June 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-5 tracking-tight leading-tight">{t('title')}</h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">{t('subtitle')}</p>
          <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-400">
            <span>🕐 {t('readTime')}</span>
            <span className="text-gray-200">·</span>
            <span>🏷️ Driveway / Paving</span>
          </div>
        </header>
        <AuthorBio locale={locale} />
        <CategoryIllustration category="concrete" caption={t('illustrationCaption')} />

          {/* Quick-access calculator bar — above the fold CTA */}
          <QuickCalcBar category="concrete" />

        {/* Quick Comparison Table */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('quickTitle')}</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="text-left px-5 py-3 font-semibold">{t('thFactor')}</th>
                  <th className="text-left px-5 py-3 font-semibold">🛣️ {t('thAsphalt')}</th>
                  <th className="text-left px-5 py-3 font-semibold">🏗️ {t('thConcrete')}</th>
                  <th className="text-center px-5 py-3 font-semibold">🏆 {t('thWinner')}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} border-b border-gray-100`}>
                    <td className="px-5 py-3 font-semibold text-gray-700">{row.label}</td>
                    <td className="px-5 py-3 text-gray-600">{row.asphalt}</td>
                    <td className="px-5 py-3 text-gray-600">{row.concrete}</td>
                    <td className="px-5 py-3 text-center">
                      <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${row.winner === 'asphalt' ? 'bg-gray-100 text-gray-700' : 'bg-blue-50 text-blue-700'}`}>
                        {row.winner === 'asphalt' ? '🛣️ Asphalt' : '🏗️ Concrete'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Cost Section */}
        <Section title={t('costTitle')} icon="💰">
          <p className="text-gray-700 leading-relaxed mb-4">{t('costP1')}</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h4 className="font-bold text-gray-900 mb-2">🛣️ {t('asphaltCostTitle')}</h4>
              <p className="text-3xl font-black text-gray-900 mb-1">{t('asphaltCostRange')}</p>
              <p className="text-sm text-gray-500">{t('asphaltCostNote')}</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <h4 className="font-bold text-gray-900 mb-2">🏗️ {t('concreteCostTitle')}</h4>
              <p className="text-3xl font-black text-blue-700 mb-1">{t('concreteCostRange')}</p>
              <p className="text-sm text-blue-600">{t('concreteCostNote')}</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">{t('costP2')}</p>
        </Section>

        {/* Lifespan */}
        <Section title={t('lifespanTitle')} icon="⏳">
          <p className="text-gray-700 leading-relaxed mb-4">{t('lifespanP1')}</p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4">
            <p className="text-amber-800 leading-relaxed">
              <strong>{t('lifespanHighlight')}</strong> {t('lifespanP2')}
            </p>
          </div>
        </Section>

        {/* Maintenance */}
        <Section title={t('maintenanceTitle')} icon="🔧">
          <p className="text-gray-700 leading-relaxed mb-4">{t('maintenanceP1')}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h4 className="font-bold text-gray-900 mb-2">🛣️ {t('asphaltMaintenanceTitle')}</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {[t('asphaltMaint1'), t('asphaltMaint2'), t('asphaltMaint3')].map((item, i) => (
                  <li key={i} className="flex items-start gap-2"><span className="text-gray-400">•</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <h4 className="font-bold text-gray-900 mb-2">🏗️ {t('concreteMaintenanceTitle')}</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {[t('concreteMaint1'), t('concreteMaint2'), t('concreteMaint3')].map((item, i) => (
                  <li key={i} className="flex items-start gap-2"><span className="text-blue-400">•</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Climate */}
        <Section title={t('climateTitle')} icon="🌡️">
          <p className="text-gray-700 leading-relaxed mb-4">{t('climateP1')}</p>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { emoji: '❄️', title: t('climateColdTitle'), desc: t('climateColdDesc') },
              { emoji: '☀️', title: t('climateHotTitle'), desc: t('climateHotDesc') },
              { emoji: '🌧️', title: t('climateRainTitle'), desc: t('climateRainDesc') },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="text-2xl mb-2">{item.emoji}</div>
                <div className="font-bold text-gray-900 text-sm mb-1">{item.title}</div>
                <div className="text-gray-500 text-xs leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Verdict */}
        <Section title={t('verdictTitle')} icon="🏆">
          <p className="text-gray-700 leading-relaxed mb-4">{t('verdictP1')}</p>
          <div className="space-y-3">
            {[
              { pick: t('pickAsphalt'), desc: t('pickAsphaltDesc') },
              { pick: t('pickConcrete'), desc: t('pickConcreteDesc') },
              { pick: t('pickBoth'), desc: t('pickBothDesc') },
            ].map((item, i) => (
              <div key={i} className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                <span className="text-xl flex-shrink-0">{['💰','🏗️','🤷'][i]}</span>
                <div>
                  <div className="font-bold text-green-800">{item.pick}</div>
                  <div className="text-sm text-green-700 mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

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

        {/* Single neutral CTA */}
        <div className="border border-gray-200 rounded-2xl p-8 my-12 text-center bg-gray-50/50">
          <p className="text-gray-600 mb-5 max-w-xl mx-auto leading-relaxed text-sm">
            {t('ctaDesc')}
          </p>
          <Link
            href="/tools/concrete-calculator"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-white hover:border-gray-400 transition-colors"
          >
            {t('ctaBtn')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Related Guides (guides only, no tool cards) */}
        <section className="border-t border-gray-200 pt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{tGuides('relatedGuides')}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/guides/concrete-slab-cost-guide" className="card hover:shadow-lg hover:-translate-y-0.5 transition-all block">
              <div className="text-sm font-bold text-primary-600 mb-1">💰 Guide</div>
              <div className="font-semibold text-gray-900">{tGuides('slabCostGuide')}</div>
              <div className="text-xs text-gray-500 mt-1">{tGuides('slabCostDesc')}</div>
            </Link>
            <Link href="/guides/diy-concrete-mistakes" className="card hover:shadow-lg hover:-translate-y-0.5 transition-all block">
              <div className="text-sm font-bold text-primary-600 mb-1">🎬 Comic Diary</div>
              <div className="font-semibold text-gray-900">{tGuides('concreteMistakesGuide')}</div>
              <div className="text-xs text-gray-500 mt-1">{tGuides('concreteMistakesDesc')}</div>
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
