import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
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
    title: t('flooringMistakesGuide'),
    description: t('flooringMistakesDesc'),
    keywords: ['DIY flooring mistakes','flooring installation tips','common flooring errors','how to install flooring','flooring waste factor','expansion gap','subfloor preparation','flooring plank direction','flooring FAQ'],
    alternates: getLocalizedAlternates(locale, '/guides/diy-flooring-mistakes'),
    openGraph: {
      title: `${t('flooringMistakesGuide')} | App Guidebook`,
      description: t('flooringMistakesDesc'),
      url: `https://appguidebook.com/${locale}/guides/diy-flooring-mistakes`,
      type: 'article',
    },
  };
}

const SCENE_TAGS = ['The Setup','Mistake #1','Mistake #2','Mistake #3','Mistake #4','Mistake #5','Happy Ending'] as const;
const SCENE_ICONS = ['📏','😱','🫨','🌡️','🤔','💸','🏆'] as const;
const TAG_COLORS = [
  'bg-blue-100 text-blue-700','bg-red-100 text-red-700','bg-orange-100 text-orange-700',
  'bg-amber-100 text-amber-700','bg-purple-100 text-purple-700','bg-rose-100 text-rose-700',
  'bg-green-100 text-green-700',
] as const;
const BG_GRADIENTS = [
  'from-blue-50/60','from-red-50/60','from-orange-50/60','from-amber-50/60',
  'from-purple-50/60','from-rose-50/60','from-green-50/60',
] as const;

export default async function FlooringMistakesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'flooringMistakesPage' });
  const tGuides = await getTranslations({ locale, namespace: 'guides' });

  return (
    <div className="py-12">
      <FloatingCalcNav />
      <article className="container-custom max-w-4xl">
        <Breadcrumbs items={[{ label: tGuides('title'), href: '/guides' }, { label: tGuides('flooringMistakesGuide') }]} locale={locale} />
        <ArticleJsonLd path="/guides/diy-flooring-mistakes" locale={locale} headline={tGuides('flooringMistakesGuide')} description={tGuides('flooringMistakesDesc')} />

        {/* ── Hero ── */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 bg-primary-50 px-4 py-1.5 rounded-full mb-5">
            <span>📖</span><span>Comic Diary</span><span className="text-primary-300">·</span><span>June 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-5 tracking-tight leading-tight">{t('title')}</h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">{t('subtitle')}</p>
          <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-400"><span>🕐 {t('readTime')}</span><span className="text-gray-200">·</span><span>🏷️ Flooring</span></div>
        </header>
        <AuthorBio locale={locale} />
        <CategoryIllustration category="flooring" caption={t('illustrationCaption')} />

        {/* ── TL;DR ── */}
        <section className="mb-14 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-yellow-300 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-black text-yellow-800 mb-4">{t('tldrTitle')}</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[t('tldr1'), t('tldr2'), t('tldr3'), t('tldr4'), t('tldr5')].map((item, i) => (
              <div key={i} className="flex items-start gap-2 bg-white/70 rounded-xl p-3 border border-yellow-200">
                <span className="text-lg">{['📏','🔧','🌡️','👁️','🧮'][i]}</span>
                <span className="text-sm font-semibold text-gray-800">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Scene 0: Intro ── */}
        <SceneCard tag={SCENE_TAGS[0]} icon={SCENE_ICONS[0]} tagColor={TAG_COLORS[0]} bgGradient={BG_GRADIENTS[0]} index={0}>
          <div className="bg-white rounded-2xl border-2 border-dashed border-blue-300 p-6 text-center mb-5">
            <div className="text-7xl mb-2">🏠</div>
            <div className="text-2xl font-black text-blue-600">{t('introTitle')}</div>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">{t('introText')}</p>

            <QuickCalcBar category="flooring" locale={locale} />        </SceneCard>

        {/* ── Scene 1: Measured Wrong ── */}
        <SceneCard tag={SCENE_TAGS[1]} icon={SCENE_ICONS[1]} tagColor={TAG_COLORS[1]} bgGradient={BG_GRADIENTS[1]} index={1} cost={t('wasteCost1')}>
          <QuoteBubble text={t('scene1Bubble')} mood="bad" />
          <div className="mt-5">
            <p className="text-gray-700 leading-relaxed">{t('scene1Text')}</p>
          </div>
        </SceneCard>

        {/* ── Scene 2: Subfloor ── */}
        <SceneCard tag={SCENE_TAGS[2]} icon={SCENE_ICONS[2]} tagColor={TAG_COLORS[2]} bgGradient={BG_GRADIENTS[2]} index={2} cost={t('wasteCost2')}>
          <QuoteBubble text={t('scene2Bubble')} mood="bad" />
          <div className="mt-5">
            <p className="text-gray-700 leading-relaxed">{t('scene2Text')}</p>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              {t.rich('scene2ExtraText', {
                link: (chunks) => (
                  <Link href="/guides/how-to-calculate-flooring-materials" className="text-primary-600 underline hover:text-primary-800 transition-colors font-medium">
                    {chunks}
                  </Link>
                ),
              })}
            </p>
          </div>
        </SceneCard>

        {/* ── Scene 3: Expansion Gap ── */}
        <SceneCard tag={SCENE_TAGS[3]} icon={SCENE_ICONS[3]} tagColor={TAG_COLORS[3]} bgGradient={BG_GRADIENTS[3]} index={3} cost={t('wasteCost3')}>
          <QuoteBubble text={t('scene3Bubble')} mood="bad" />
          <div className="mt-5">
            <p className="text-gray-700 leading-relaxed">{t('scene3Text')}</p>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center mt-4">
              <span className="text-3xl block mb-2">📐</span>
              <p className="text-lg font-bold text-amber-800">{t('scene3CalloutTitle')}</p>
              <p className="text-sm text-amber-600 mt-1">{t('scene3CalloutDesc')}</p>
            </div>
          </div>
        </SceneCard>

        {/* ── Scene 4: Wrong Direction ── */}
        <SceneCard tag={SCENE_TAGS[4]} icon={SCENE_ICONS[4]} tagColor={TAG_COLORS[4]} bgGradient={BG_GRADIENTS[4]} index={4} cost={t('wasteCost4')}>
          <QuoteBubble text={t('scene4Bubble')} mood="bad" />
          <div className="mt-5">
            <p className="text-gray-700 leading-relaxed">{t('scene4Text')}</p>
          </div>
        </SceneCard>

        {/* ── Scene 5: Mental Math ── */}
        <SceneCard tag={SCENE_TAGS[5]} icon={SCENE_ICONS[5]} tagColor={TAG_COLORS[5]} bgGradient={BG_GRADIENTS[5]} index={5} cost={t('wasteCost5')}>
          <QuoteBubble text={t('scene5Bubble')} mood="bad" />
          <div className="mt-5">
            <p className="text-gray-700 leading-relaxed">{t('scene5Text')}</p>
          </div>
        </SceneCard>

        {/* ── Scene 6: Happy Ending + Scoreboard ── */}
        <SceneCard tag={SCENE_TAGS[6]} icon={SCENE_ICONS[6]} tagColor={TAG_COLORS[6]} bgGradient={BG_GRADIENTS[6]} index={6}>
          <div className="space-y-5">
            <QuoteBubble text={t('outroBubble')} mood="good" />
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
              <h3 className="text-xl font-bold text-green-800 mb-2">✅ {t('outroTitle')}</h3>
              <p className="text-green-700 leading-relaxed">{t('outroText')}</p>
            </div>

            {/* Scoreboard */}
            <div>
              <h3 className="text-lg font-black text-gray-900 mb-3">{t('scoreTitle')}</h3>
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-900 text-white">
                      <th className="text-left px-4 py-2.5 font-semibold">{t('scoreCheck')}</th>
                      <th className="text-left px-4 py-2.5 font-semibold text-red-300">{t('round1')}</th>
                      <th className="text-left px-4 py-2.5 font-semibold text-green-300">{t('round2')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {([
                      ['scoreRow1Check','scoreRow1Bad','scoreRow1Good'],
                      ['scoreRow2Check','scoreRow2Bad','scoreRow2Good'],
                      ['scoreRow3Check','scoreRow3Bad','scoreRow3Good'],
                      ['scoreRow4Check','scoreRow4Bad','scoreRow4Good'],
                      ['scoreRow5Check','scoreRow5Bad','scoreRow5Good'],
                      ['scoreRow6Check','scoreRow6Bad','scoreRow6Good'],
                    ] as const).map(([checkKey, badKey, goodKey], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                        <td className="px-4 py-2.5 font-semibold text-gray-700">{t(checkKey)}</td>
                        <td className="px-4 py-2.5 text-red-600">{t(badKey)}</td>
                        <td className="px-4 py-2.5 text-green-600 font-semibold">{t(goodKey)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </SceneCard>

        {/* ── FAQ ── */}
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

        {/* ── Single neutral CTA ── */}
        <div className="border border-gray-200 rounded-2xl p-8 my-12 text-center bg-gray-50/50">
          <p className="text-gray-600 mb-5 max-w-xl mx-auto leading-relaxed text-sm">
            {t('ctaDesc')}
          </p>
          <Link
            href="/tools/flooring-calculator"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-white hover:border-gray-400 transition-colors"
          >
            {t('ctaBtn')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* ── Related Guides (guides only, no tool cards) ── */}
        <section className="border-t border-gray-200 pt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{t('relatedTitle')}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/guides/how-to-calculate-flooring-materials" className="card hover:shadow-lg hover:-translate-y-0.5 transition-all block">
              <div className="text-sm font-bold text-primary-600 mb-1">📐 Guide</div>
              <div className="font-semibold text-gray-900">{tGuides('flooringCalcGuide')}</div>
              <div className="text-xs text-gray-500 mt-1">{tGuides('flooringCalcDesc')}</div>
            </Link>
            <Link href="/guides/flooring-types-comparison" className="card hover:shadow-lg hover:-translate-y-0.5 transition-all block">
              <div className="text-sm font-bold text-primary-600 mb-1">🔍 Guide</div>
              <div className="font-semibold text-gray-900">{tGuides('flooringTypesGuide')}</div>
              <div className="text-xs text-gray-500 mt-1">{tGuides('flooringTypesDesc')}</div>
            </Link>
            <Link href="/guides/flooring-cost-estimation" className="card hover:shadow-lg hover:-translate-y-0.5 transition-all block">
              <div className="text-sm font-bold text-primary-600 mb-1">💰 Guide</div>
              <div className="font-semibold text-gray-900">{tGuides('flooringCostGuide')}</div>
              <div className="text-xs text-gray-500 mt-1">{tGuides('flooringCostDesc')}</div>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}

/* ─── Reusable Components ─── */

function SceneCard({ tag, icon, tagColor, bgGradient, index, cost, children }: {
  tag: string; icon: string; tagColor: string; bgGradient: string; index: number; cost?: string; children: ReactNode;
}) {
  return (
    <section className={`mb-14 bg-gradient-to-br ${bgGradient} to-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm`}>
      <div className="px-5 py-3 border-b border-gray-100 bg-white/80 flex items-center gap-3">
        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-900 text-white text-xs font-black">{index + 1}</span>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${tagColor}`}>{tag}</span>
        <span className="text-xl ml-auto">{icon}</span>
        {cost && (
          <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full ml-2">💸 {cost}</span>
        )}
      </div>
      <div className="p-5 md:p-6">{children}</div>
    </section>
  );
}

function QuoteBubble({ text, mood }: { text: string; mood: 'bad' | 'good' }) {
  const c = mood === 'bad'
    ? { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' }
    : { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' };
  const emoji = mood === 'bad' ? '💭' : '🎉';
  return (
    <div className={`relative rounded-2xl border-2 p-4 text-center ${c.bg} ${c.border}`}>
      <div className="absolute -top-2.5 left-6 w-5 h-5 bg-inherit border-l-2 border-t-2 border-inherit rotate-45" style={{ borderColor: 'inherit' }} />
      <p className={`text-lg md:text-xl font-semibold italic leading-relaxed ${c.text}`}>
        {emoji} &ldquo;{text}&rdquo;
      </p>
    </div>
  );
}
