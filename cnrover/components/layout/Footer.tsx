import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function Footer() {
  const t = await getTranslations('global');

  const footerLinks = [
    { href: '/beijing', label: t('beijing') },
    { href: '/guides', label: t('guides') },
    { href: '/itineraries', label: t('itineraries') },
    { href: '/faq', label: t('faq') },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CN</span>
              </span>
              <span className="text-lg font-bold text-gray-900">Rover</span>
            </Link>
            <p className="text-gray-600 text-sm">
              {t('tagline')}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">{t('cities')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/beijing" className="text-gray-600 hover:text-gray-900">
                  {t('beijing')}
                </Link>
              </li>
              <li>
                <span className="text-gray-400">上海 (Coming Soon)</span>
              </li>
              <li>
                <span className="text-gray-400">成都 (Coming Soon)</span>
              </li>
              <li>
                <span className="text-gray-400">西安 (Coming Soon)</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">{t('guides')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/guides/visa" className="text-gray-600 hover:text-gray-900">
                  Visa Guide
                </Link>
              </li>
              <li>
                <Link href="/guides/payment" className="text-gray-600 hover:text-gray-900">
                  Payment Guide
                </Link>
              </li>
              <li>
                <Link href="/guides/sim-card" className="text-gray-600 hover:text-gray-900">
                  SIM & Internet
                </Link>
              </li>
              <li>
                <Link href="/guides/transportation" className="text-gray-600 hover:text-gray-900">
                  Transportation
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
          <p>&copy; {new Date().getFullYear()} CN Rover. {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
}
