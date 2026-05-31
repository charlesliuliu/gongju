import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getLocalizedAlternates, faqPageSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import FAQAccordion from '@/components/faq/FAQAccordion';

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
    keywords: [
      'construction FAQ',
      'concrete calculator questions',
      'roof pitch FAQ',
      'flooring calculator help',
      'paint calculator FAQ',
      'DIY construction questions',
      'building material FAQ',
    ],
  };
}

type FAQItemRaw = {
  q: string;
  a: string;
  cat: string;
  tool?: string;
  guide?: string;
};

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq' });
  const tGlobal = await getTranslations({ locale, namespace: 'global' });

  const items = t.raw('items') as FAQItemRaw[];

  const categories = [
    { key: 'usage', label: t('categoryUsage'), icon: '🛠️' },
    { key: 'materials', label: t('categoryMaterials'), icon: '📐' },
    { key: 'cost', label: t('categoryCost'), icon: '💰' },
    { key: 'trust', label: t('categoryTrust'), icon: '✅' },
  ];

  const qasForSchema = items.map((item) => ({
    question: item.q,
    answer: item.a,
  }));

  return (
    <div className="py-12">
      <div className="container-custom">
        {/* Breadcrumb */}
        <Breadcrumbs items={[{ label: tGlobal('faq') }]} />

        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          {t('title')}
        </h1>
        <p className="text-xl text-gray-500 text-center mb-10 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>

        {/* FAQ accordion with categories */}
        <FAQAccordion items={items} categories={categories} />

        {/* Bottom CTA */}
        <div className="text-center mt-16 bg-gray-50 border border-gray-200 rounded-2xl p-8 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Still have questions?
          </h2>
          <p className="text-gray-500 mb-5">
            Try our calculators or browse the detailed guides for step-by-step
            instructions.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/tools" className="btn-primary">
              Browse Calculators
            </Link>
            <Link href="/guides" className="btn-secondary">
              View Guides
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageSchema(qasForSchema)),
        }}
      />
    </div>
  );
}
