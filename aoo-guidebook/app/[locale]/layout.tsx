import { routing } from '@/i18n/routing';
import type { ReactNode } from 'react';
import PageTracker from '@/components/admin/PageTracker';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <PageTracker />
    </>
  );
}
