import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getLocalizedAlternates } from '@/lib/seo';
import Script from 'next/script';
import { breadcrumbSchema } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'paymentGuide' });
  return {
    title: t('metaTitle'), description: t('metaDesc'),
    alternates: getLocalizedAlternates(locale, '/guides/payment'),
    openGraph: { title: t('metaTitle'), description: t('metaDesc') },
  };
}

export default async function PaymentGuidePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'paymentGuide' });
  const baseUrl = 'https://cnrover.pages.dev';

  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema([
          { name: 'Home', url: `${baseUrl}/${locale}/` },
          { name: 'Guides', url: `${baseUrl}/${locale}/guides/` },
          { name: 'Payment Guide', url: `${baseUrl}/${locale}/guides/payment/` },
        ])),
      }} />
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 py-20 md:py-28 overflow-hidden">
        <div className="container-custom text-center relative">
          <span className="inline-block text-5xl mb-6">💳</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">{t('heroTitle')}</h1>
          <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto">{t('heroSubtitle')}</p>
        </div>
      </section>
      <div className="py-16"><div className="container-custom max-w-3xl mx-auto space-y-12">
        {/* Alipay */}
        <section>
          <div className="bg-blue-50 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('alipayTitle')}</h2>
            <p className="text-gray-600 mb-4">{t('alipayDesc')}</p>
            <h3 className="font-semibold text-gray-900 mb-3">{t('alipaySteps')}</h3>
            <ol className="space-y-2">
              {[1,2,3,4].map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-blue-500 font-medium">{s}.</span> {t(`alipayStep${s}`)}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* WeChat */}
        <section>
          <div className="bg-green-50 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('wechatTitle')}</h2>
            <p className="text-gray-600 mb-4">{t('wechatDesc')}</p>
            <h3 className="font-semibold text-gray-900 mb-3">{t('wechatSteps')}</h3>
            <ol className="space-y-2">
              {[1,2,3,4].map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-green-500 font-medium">{s}.</span> {t(`wechatStep${s}`)}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Cash */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('cashTitle')}</h2>
          <p className="text-gray-600 whitespace-pre-line leading-relaxed">{t('cashDesc')}</p>
        </section>

        {/* Tips */}
        <section className="bg-amber-50 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">💡 {t('tips')}</h2>
          <ul className="space-y-2">
            {[1,2,3,4].map((n) => (
              <li key={n} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-amber-500 mt-0.5 shrink-0">•</span> {t(`tip${n}`)}
              </li>
            ))}
          </ul>
        </section>

        <div className="text-center"><Link href="/guides" className="btn-secondary">← Back to Guides</Link></div>
      </div></div>
    </>
  );
}
