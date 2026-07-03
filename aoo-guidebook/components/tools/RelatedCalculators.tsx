import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getOtherTools, ALL_TOOLS } from '@/lib/tools-data';

type Props = {
  /** Slug of the current tool to exclude. Omit to show all 8 tools. */
  currentSlug?: string;
  locale: string;
};

export default async function RelatedCalculators({ currentSlug, locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'tools' });

  const otherTools = currentSlug ? getOtherTools(currentSlug) : ALL_TOOLS;

  return (
    <div className="border-t border-gray-200 pt-12 mt-16">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {t('relatedCalculators')}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {otherTools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="card hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center py-4 px-3 group"
          >
            <div className="text-2xl mb-2">{tool.icon}</div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
              {t(tool.titleKey)}
            </h3>
            <p className="text-xs text-gray-500 line-clamp-2">
              {t(tool.descKey)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
