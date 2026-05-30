'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LocaleSwitcher from './LocaleSwitcher';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations('global');

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <nav className="container-custom flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 text-gray-900 hover:text-gray-900">
          <span className="text-2xl font-bold">App</span>
          <span className="text-lg text-gray-600">Guidebook</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/tools" className="text-gray-600 hover:text-gray-900 text-sm">
            {t('tools')}
          </Link>
          <Link href="/guides" className="text-gray-600 hover:text-gray-900 text-sm">
            {t('guides')}
          </Link>
          <Link href="/faq" className="text-gray-600 hover:text-gray-900 text-sm">
            {t('faq')}
          </Link>
          <LocaleSwitcher />
        </div>

        <div className="flex md:hidden items-center gap-2">
          <LocaleSwitcher />
          <button
            className="p-2 text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <Link
            href="/tools"
            className="block px-4 py-3 text-gray-600 hover:bg-gray-50"
            onClick={() => setMenuOpen(false)}
          >
            {t('tools')}
          </Link>
          <Link
            href="/guides"
            className="block px-4 py-3 text-gray-600 hover:bg-gray-50"
            onClick={() => setMenuOpen(false)}
          >
            {t('guides')}
          </Link>
          <Link
            href="/faq"
            className="block px-4 py-3 text-gray-600 hover:bg-gray-50"
            onClick={() => setMenuOpen(false)}
          >
            {t('faq')}
          </Link>
        </div>
      )}
    </header>
  );
}
