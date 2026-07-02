'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const t = useTranslations('global');

  return (
    <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden">
      <Link
        href={pathname}
        locale="en"
        className="px-2.5 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50"
      >
        EN
      </Link>
      <Link
        href={pathname}
        locale="zh"
        className="px-2.5 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 border-l border-gray-200"
      >
        中文
      </Link>
    </div>
  );
}
