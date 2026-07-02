import { getTranslations } from 'next-intl/server';

type AuthorBioProps = {
  locale: string;
};

export default async function AuthorBio({ locale }: AuthorBioProps) {
  const t = await getTranslations({ locale, namespace: 'global' });
  const tAbout = await getTranslations({ locale, namespace: 'aboutPage' });

  return (
    <div className="flex items-center gap-3 mb-8 p-4 bg-gray-50 border border-gray-200 rounded-xl">
      <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
        AG
      </div>
      <div>
        <p className="text-sm text-gray-500">{t('writtenBy')}</p>
        <p className="text-sm text-gray-700 font-medium">{tAbout('teamName')}</p>
      </div>
    </div>
  );
}
