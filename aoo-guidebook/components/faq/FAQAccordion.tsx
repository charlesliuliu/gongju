'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';

type FAQItem = {
  q: string;
  a: string;
  cat: string;
  tool?: string;
  guide?: string;
};

type CategoryMeta = {
  key: string;
  label: string;
  icon: string;
};

export default function FAQAccordion({
  items,
  categories,
}: {
  items: FAQItem[];
  categories: CategoryMeta[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === 'all'
      ? items
      : items.filter((item) => item.cat === activeCategory);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
            activeCategory === 'all'
              ? 'bg-primary-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {items.length === 0 ? '' : `All (${items.length})`}
        </button>
        {categories.map((cat) => {
          const count = items.filter((i) => i.cat === cat.key).length;
          if (count === 0) return null;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.key
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.icon} {cat.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Q&A list */}
      <div className="max-w-3xl mx-auto space-y-3">
        {filtered.map((item, i) => {
          const realIndex = items.indexOf(item);
          const isOpen = openIndex === realIndex;
          return (
            <div
              key={realIndex}
              className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 hover:border-gray-300"
            >
              <button
                onClick={() => toggle(realIndex)}
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">
                  {item.q}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isOpen && (
                <div className="px-5 pb-5 border-t border-gray-100">
                  <p className="text-gray-600 mt-4 leading-relaxed">
                    {item.a}
                  </p>
                  {/* Related links */}
                  {(item.tool || item.guide) && (
                    <div className="flex flex-wrap gap-4 mt-4">
                      {item.tool && (
                        <Link
                          href={item.tool}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                          Try the Calculator →
                        </Link>
                      )}
                      {item.guide && (
                        <Link
                          href={item.guide}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700"
                        >
                          Read the Guide →
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No questions in this category yet.</p>
          <p className="text-sm mt-1">Try selecting a different category.</p>
        </div>
      )}
    </div>
  );
}
