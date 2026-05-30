import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import StatsViewer from './StatsViewer';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function StatsPage({ params }: Props) {
  const { locale } = await params;
  const cookieStore = await cookies();
  const authed = cookieStore.get('admin_auth')?.value === '1';

  if (!authed) {
    redirect(`/${locale}/admin/login`);
  }

  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
  let data: { total: number; pages: { path: string; views: number }[] } | null = null;

  try {
    const res = await fetch(`${baseUrl}/api/track`, { cache: 'no-store' });
    data = await res.json();
  } catch {}

  return <StatsViewer data={data} />;
}
