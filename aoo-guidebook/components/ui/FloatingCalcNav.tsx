'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const CORE_CALCULATORS = [
  { labelKey: 'floatingNav.concrete', href: '/tools/concrete-calculator', emoji: '🏗️' },
  { labelKey: 'floatingNav.flooring', href: '/tools/flooring-calculator', emoji: '🪵' },
  { labelKey: 'floatingNav.paint', href: '/tools/paint-calculator', emoji: '🎨' },
  { labelKey: 'floatingNav.roofing', href: '/tools/roof-pitch-calculator', emoji: '🏠' },
  { labelKey: 'floatingNav.drywall', href: '/tools/drywall-calculator', emoji: '🧱' },
  { labelKey: 'floatingNav.lumber', href: '/tools/lumber-calculator', emoji: '📐' },
];

export default function FloatingCalcNav() {
  const t = useTranslations('global');

  return (
    <aside
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-1.5"
      aria-label={t('floatingNav.label')}
    >
      <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-2 flex flex-col gap-1">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider text-center px-1 pt-1 pb-0.5">
          {t('floatingNav.title')}
        </p>
        {CORE_CALCULATORS.map((calc) => (
          <Link
            key={calc.href}
            href={calc.href as `/${string}`}
            className="group flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-gray-600 hover:text-primary-700 hover:bg-primary-50 transition-all duration-200 whitespace-nowrap"
            title={t(calc.labelKey)}
          >
            <span className="text-base leading-none">{calc.emoji}</span>
            <span className="group-hover:translate-x-0.5 transition-transform duration-200">
              {t(calc.labelKey)}
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
