import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { getLocalizedAlternates } from '@/lib/seo';
import { Breadcrumbs, ArticleJsonLd } from '@/components/ui/Breadcrumbs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guides' });
  return {
    title: t('flooringMistakesGuide'),
    description: t('flooringMistakesDesc'),
    keywords: ['DIY flooring mistakes','flooring installation tips','common flooring errors','how to install flooring','flooring waste factor','expansion gap','subfloor preparation','flooring plank direction','flooring calculator'],
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
        </SceneCard>

        {/* ── Scene 1: Measured Wrong ── */}
        <SceneCard tag={SCENE_TAGS[1]} icon={SCENE_ICONS[1]} tagColor={TAG_COLORS[1]} bgGradient={BG_GRADIENTS[1]} index={1} cost={t('wasteCost1')}>
          <QuoteBubble text={t('scene1Bubble')} mood="bad" />
          <div className="grid md:grid-cols-5 gap-4 mt-5">
            <div className="md:col-span-3 space-y-4">
              <MistakeBlock wrong={t('scene1Text').split('.')[0] + '.'} right="Measure twice. Always add 10-15% waste factor for cuts, mistakes, and odd corners. Let the calculator handle the math." />
            </div>
            <div className="md:col-span-2 bg-primary-50 border border-primary-200 rounded-xl p-4 text-center flex flex-col justify-center">
              <span className="text-3xl mb-1">🧮</span>
              <div className="text-sm font-bold text-primary-800 mb-2">{t('calculatorName')}</div>
              <Link href="/tools/flooring-calculator" className="btn-primary text-xs">Try Now →</Link>
            </div>
          </div>
        </SceneCard>

        {/* ── Scene 2: Subfloor ── */}
        <SceneCard tag={SCENE_TAGS[2]} icon={SCENE_ICONS[2]} tagColor={TAG_COLORS[2]} bgGradient={BG_GRADIENTS[2]} index={2} cost={t('wasteCost2')}>
          <QuoteBubble text={t('scene2Bubble')} mood="bad" />
          <div className="mt-5 space-y-4">
            <MistakeBlock
              wrong="Skipped subfloor prep. The old floor looked flat enough."
              right="Check level (3/16″ max variation over 10 ft), test moisture, use self-leveling compound. $15 now > $500 redo later."
            />
            <div className="grid sm:grid-cols-3 gap-3">
              {['Check level with long straightedge','Test moisture (concrete: &lt; 4%)','Clean thoroughly before laying'].map((item, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-3 flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </SceneCard>

        {/* ── Scene 3: Expansion Gap ── */}
        <SceneCard tag={SCENE_TAGS[3]} icon={SCENE_ICONS[3]} tagColor={TAG_COLORS[3]} bgGradient={BG_GRADIENTS[3]} index={3} cost={t('wasteCost3')}>
          <QuoteBubble text={t('scene3Bubble')} mood="bad" />
          <div className="mt-5 space-y-4">
            <MistakeBlock
              wrong="Butted planks tight against every wall. Looked clean for 3 months."
              right="Leave 1/4″ (6mm) gap around all walls, doorways, transitions. Baseboards hide the gap — that's their entire purpose."
            />
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center">
              <span className="text-3xl block mb-2">📐</span>
              <p className="text-lg font-bold text-amber-800">A 20-ft oak floor expands over ½″ between winter and summer.</p>
              <p className="text-sm text-amber-600 mt-1">That gap isn't optional — it's physics.</p>
            </div>
          </div>
        </SceneCard>

        {/* ── Scene 4: Wrong Direction ── */}
        <SceneCard tag={SCENE_TAGS[4]} icon={SCENE_ICONS[4]} tagColor={TAG_COLORS[4]} bgGradient={BG_GRADIENTS[4]} index={4} cost={t('wasteCost4')}>
          <QuoteBubble text={t('scene4Bubble')} mood="bad" />
          <div className="mt-5 space-y-4">
            <MistakeBlock
              wrong="Ran planks parallel to the long wall. Room looked like a bowling alley."
              right="Run perpendicular to the main window light source, parallel to primary sight line when entering. Rooms feel wider, seams vanish in natural light."
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-50/70 border border-red-200 rounded-xl p-4 text-center">
                <div className="text-3xl mb-1">⬆️⬇️</div>
                <div className="font-bold text-red-700 text-sm">Wrong: Parallel to long wall</div>
                <div className="text-xs text-red-500 mt-1">Narrows the room. Seams catch light.</div>
              </div>
              <div className="bg-green-50/70 border border-green-200 rounded-xl p-4 text-center">
                <div className="text-3xl mb-1">⬅️➡️</div>
                <div className="font-bold text-green-700 text-sm">Right: Perpendicular to window</div>
                <div className="text-xs text-green-600 mt-1">Widens the room. Seams invisible.</div>
              </div>
            </div>
          </div>
        </SceneCard>

        {/* ── Scene 5: Mental Math ── */}
        <SceneCard tag={SCENE_TAGS[5]} icon={SCENE_ICONS[5]} tagColor={TAG_COLORS[5]} bgGradient={BG_GRADIENTS[5]} index={5} cost={t('wasteCost5')}>
          <QuoteBubble text={t('scene5Bubble')} mood="bad" />
          <div className="mt-5 space-y-4">
            <MistakeBlock
              wrong="Mental math at the hardware store. Bought nearly 30% too many boxes."
              right="Enter room dimensions once → get the exact box count. The calculator factors in waste percentage automatically."
            />
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-2xl p-5 flex items-center gap-4">
              <span className="text-5xl">🧮</span>
              <div className="flex-1">
                <div className="font-bold text-gray-900 text-lg">{t('calculatorName')}</div>
                <div className="text-sm text-gray-600">{t('calculatorDesc')}</div>
              </div>
              <Link href="/tools/flooring-calculator" className="btn-primary whitespace-nowrap">Try Now →</Link>
            </div>
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
                      <th className="text-left px-4 py-2.5 font-semibold">Check</th>
                      <th className="text-left px-4 py-2.5 font-semibold text-red-300">{t('round1')}</th>
                      <th className="text-left px-4 py-2.5 font-semibold text-green-300">{t('round2')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Measured','✗ Guessed once','✓ Twice + waste factor'],
                      ['Subfloor','✗ Skipped entirely','✓ Leveled & moisture-tested'],
                      ['Expansion','✗ Tight to wall','✓ 1/4″ gap all around'],
                      ['Direction','✗ Parallel to long wall','✓ Perpendicular to window'],
                      ['Materials','✗ Mental math','✓ Calculator — exact count'],
                      ['Total Cost','Hundreds wasted','On budget + leftovers for repairs'],
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                        <td className="px-4 py-2.5 font-semibold text-gray-700">{row[0]}</td>
                        <td className="px-4 py-2.5 text-red-600">{row[1]}</td>
                        <td className="px-4 py-2.5 text-green-600 font-semibold">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </SceneCard>

        {/* ── Related Guides ── */}
        <section className="mt-16">
          <h3 className="text-xl font-black text-gray-900 mb-5">{t('relatedTitle')}</h3>
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
            <Link href="/tools/flooring-calculator" className="card hover:shadow-lg hover:-translate-y-0.5 transition-all block bg-primary-50 border-primary-200">
              <div className="text-sm font-bold text-primary-600 mb-1">🧮 Tool</div>
              <div className="font-semibold text-gray-900">{t('calculatorName')}</div>
              <div className="text-xs text-gray-500 mt-1">{t('calculatorDesc')}</div>
            </Link>
          </div>
        </section>

        {/* ── CTA ── */}
        <div className="mt-14 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 md:p-10 text-center text-white shadow-xl">
          <span className="text-5xl block mb-4">🛠️</span>
          <h3 className="text-2xl md:text-3xl font-black mb-3">{t('ctaTitle')}</h3>
          <p className="text-primary-100 mb-6 max-w-md mx-auto">{t('ctaDesc')}</p>
          <Link href="/tools/flooring-calculator" className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold py-3.5 px-10 rounded-xl text-lg transition-all hover:bg-primary-50 hover:shadow-2xl hover:-translate-y-0.5">
            {t('tryCalculator')}
          </Link>
        </div>
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

function MistakeBlock({ wrong, right }: { wrong: string; right: string }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <div className="text-xs font-black text-red-500 uppercase tracking-wide mb-1">❌ What I Did</div>
        <p className="text-red-800 text-sm leading-relaxed">{wrong}</p>
      </div>
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="text-xs font-black text-green-500 uppercase tracking-wide mb-1">✅ Do This Instead</div>
        <p className="text-green-800 text-sm leading-relaxed">{right}</p>
      </div>
    </div>
  );
}
