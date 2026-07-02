import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function Footer() {
  const t = await getTranslations('global');

  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">App Guidebook</h3>
            <p className="text-gray-600 text-sm">
              {t('tagline')}
            </p>
          </div>

          {/* Guides & Resources — prioritized first */}
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
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">
                  {t('about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools — single entry, not a list */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">{t('tools')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tools" className="text-gray-600 hover:text-gray-900">
                  {t('allTools')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">{t('contact')}</h4>
            <p className="text-gray-600 text-sm">
              <a href="mailto:contact@appguidebook.com" className="hover:text-gray-900">
                contact@appguidebook.com
              </a>
            </p>
            <p className="text-gray-500 text-xs mt-2">
              {t('location')}
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
