import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getLocalizedAlternates, faqPageSchema } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq' });
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: getLocalizedAlternates(locale, '/faq'),
    openGraph: {
      title: `${t('title')} | App Guidebook`,
      description: t('subtitle'),
      type: 'website',
    },
  };
}

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq' });

  const qas = [
    { question: t('q1'), answer: t('a1') },
    { question: t('q2'), answer: t('a2') },
    { question: t('q3'), answer: t('a3') },
  ];

  return (
    <div className="py-12">
      <div className="container-custom">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          {t('title')}
        </h1>
        <p className="text-xl text-gray-600 text-center mb-12">
          {t('subtitle')}
        </p>
        <div className="max-w-3xl mx-auto space-y-6">
          {qas.map((qa, i) => (
            <div key={i} className="card">
              <h3 className="font-semibold text-gray-900 mb-2">
                {qa.question}
              </h3>
              <p className="text-gray-600">
                {qa.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageSchema(qas)),
        }}
      />
    </div>
  );
}
