import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getLocalizedAlternates } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq' });
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: getLocalizedAlternates(locale, '/faq'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDesc'),
    },
  };
}

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq' });

  const faqs = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
    q: t(`q${n}`),
    a: t(`a${n}`),
  }));

  return (
    <div>
      <section className="relative bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 py-20 md:py-28 overflow-hidden">
        <div className="container-custom text-center relative">
          <span className="inline-block text-5xl mb-6">❓</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            {t('pageTitle')}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {t('pageSubtitle')}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group card cursor-pointer">
                <summary className="text-gray-900 font-medium list-none flex items-center justify-between">
                  <span>{faq.q}</span>
                  <svg
                    className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
