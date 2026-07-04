import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

type CalcCategory = 'concrete' | 'flooring' | 'paint' | 'roofing' | 'drywall' | 'lumber' | 'deck' | 'fence';

interface QuickCalcBarProps {
  category: CalcCategory;
}

/** Map each guide category to its primary companion calculator */
const CATEGORY_MAP: Record<CalcCategory, { labelKey: string; href: string; primary?: boolean }[]> = {
  concrete: [
    { labelKey: 'quickCalcBarConcrete', href: '/tools/concrete-calculator', primary: true },
  ],
  flooring: [
    { labelKey: 'quickCalcBarFlooring', href: '/tools/flooring-calculator', primary: true },
  ],
  paint: [
    { labelKey: 'quickCalcBarPaint', href: '/tools/paint-calculator', primary: true },
  ],
  roofing: [
    { labelKey: 'quickCalcBarRoofing', href: '/tools/roof-pitch-calculator', primary: true },
  ],
  drywall: [
    { labelKey: 'quickCalcBarDrywall', href: '/tools/drywall-calculator', primary: true },
  ],
  lumber: [
    { labelKey: 'quickCalcBarLumber', href: '/tools/lumber-calculator', primary: true },
  ],
  deck: [
    { labelKey: 'quickCalcBarDeck', href: '/tools/deck-calculator', primary: true },
  ],
  fence: [
    { labelKey: 'quickCalcBarFence', href: '/tools/fence-calculator', primary: true },
  ],
};

export default async function QuickCalcBar({ category }: QuickCalcBarProps) {
  const t = await getTranslations('global');

  const calculators = CATEGORY_MAP[category];
  const primary = calculators.filter((c) => c.primary);
  const secondary = calculators.filter((c) => !c.primary);

  return (
    <div className="bg-gradient-to-r from-construction-50 to-primary-50 border border-construction-200 rounded-2xl p-5 my-8">
      <p className="text-sm font-semibold text-gray-700 mb-3">
        ⚡ {t('quickCalcBarTitle')}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {primary.map((calc) => (
          <Link
            key={calc.href}
            href={calc.href as `/${string}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-600 !text-white text-sm font-semibold rounded-lg hover:bg-primary-700 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <span>{t(calc.labelKey)}</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
        {secondary.map((calc) => (
          <Link
            key={calc.href}
            href={calc.href as `/${string}`}
            className="inline-flex items-center gap-1 px-3.5 py-2 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:border-primary-400 hover:text-primary-700 hover:shadow-sm transition-all duration-200"
          >
            <span>{t(calc.labelKey)}</span>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
