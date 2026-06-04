import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function Footer() {
  const t = await getTranslations('global');
  const tt = await getTranslations('tools');

  const footerTools = [
    { slug: 'concrete-calculator', label: tt('concreteTitle') },
    { slug: 'roof-pitch-calculator', label: tt('roofingTitle') },
    { slug: 'flooring-calculator', label: tt('flooringTitle') },
    { slug: 'paint-calculator', label: tt('paintTitle') },
    { slug: 'lumber-calculator', label: tt('lumberTitle') },
    { slug: 'deck-calculator', label: tt('deckTitle') },
    { slug: 'drywall-calculator', label: tt('drywallTitle') },
    { slug: 'fence-calculator', label: tt('fenceTitle') },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">App Guidebook</h3>
            <p className="text-gray-600 text-sm">
              {t('tagline')}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">{t('popularTools')}</h4>
            <ul className="space-y-2 text-sm">
              {footerTools.map((tool) => (
                <li key={tool.slug}>
                  <Link href={`/tools/${tool.slug}`} className="text-gray-600 hover:text-gray-900">
                    {tool.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">{t('resources')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/guides" className="text-gray-600 hover:text-gray-900">
                  {t('guides')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-gray-900">
                  {t('faq')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">{t('contact')}</h4>
            <p className="text-gray-600 text-sm">
              <a href="mailto:l15670751903@163.com" className="hover:text-gray-900">
                l15670751903@163.com
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
          <p className="mb-2 space-x-4">
            <Link href="/privacy-policy" className="hover:text-gray-900">
              {t('privacyPolicy')}
            </Link>
            <Link href="/terms-of-service" className="hover:text-gray-900">
              {t('termsOfService')}
            </Link>
          </p>
          <p>&copy; {new Date().getFullYear()} App Guidebook. {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
}
