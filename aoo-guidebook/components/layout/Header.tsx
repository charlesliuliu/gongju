'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LocaleSwitcher from './LocaleSwitcher';
import { ALL_TOOLS } from '@/lib/tools-data';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const t = useTranslations('global');
  const tTools = useTranslations('tools');

  // Close desktop dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    }
    if (toolsOpen) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [toolsOpen]);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <nav className="container-custom flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 text-gray-900 hover:text-gray-900">
          <span className="text-2xl font-bold">App</span>
          <span className="text-lg text-gray-600">Guidebook</span>
          <span className="hidden sm:inline text-xs text-construction-600 bg-construction-50 px-2 py-0.5 rounded-full font-medium ml-1">
            {t('constructionTagline')}
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {/* Tools dropdown */}
          <li className="relative list-none" ref={dropdownRef}>
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              onMouseEnter={() => setToolsOpen(true)}
              className="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-sm cursor-pointer"
            >
              {t('tools')}
              <svg
                className={`w-3 h-3 transition-transform ${toolsOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {toolsOpen && (
              <div
                className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg py-2 w-56 z-50"
                onMouseLeave={() => setToolsOpen(false)}
              >
                <Link
                  href="/tools"
                  className="block px-4 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-50"
                  onClick={() => setToolsOpen(false)}
                >
                  {t('allTools')}
                </Link>
                <div className="border-t border-gray-100 my-1" />
                {ALL_TOOLS.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                    onClick={() => setToolsOpen(false)}
                  >
                    <span className="text-base">{tool.icon}</span>
                    {tTools(tool.titleKey)}
                  </Link>
                ))}
              </div>
            )}
          </li>

          <Link href="/guides" className="text-gray-600 hover:text-gray-900 text-sm">
            {t('guides')}
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-900 text-sm">
            {t('about')}
          </Link>
          <Link href="/faq" className="text-gray-600 hover:text-gray-900 text-sm">
            {t('faq')}
          </Link>
          <LocaleSwitcher />
        </div>

        {/* Mobile toggle */}
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <button
            onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
            className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50"
          >
            <span>{t('tools')}</span>
            <svg
              className={`w-3 h-3 transition-transform ${mobileToolsOpen ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {mobileToolsOpen && (
            <div className="bg-gray-50 px-4 py-1">
              <Link
                href="/tools"
                className="block px-3 py-2 text-sm font-semibold text-primary-600"
                onClick={() => setMenuOpen(false)}
              >
                {t('allTools')}
              </Link>
              {ALL_TOOLS.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600"
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{tool.icon}</span>
                  {tTools(tool.titleKey)}
                </Link>
              ))}
            </div>
          )}
          <Link
            href="/guides"
            className="block px-4 py-3 text-gray-600 hover:bg-gray-50"
            onClick={() => setMenuOpen(false)}
          >
            {t('guides')}
          </Link>
          <Link
            href="/about"
            className="block px-4 py-3 text-gray-600 hover:bg-gray-50"
            onClick={() => setMenuOpen(false)}
          >
            {t('about')}
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
