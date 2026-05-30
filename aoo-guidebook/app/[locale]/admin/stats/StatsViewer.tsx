'use client';

type PageStat = { path: string; views: number };

export default function StatsViewer({ data }: { data: { total: number; pages: PageStat[] } | null }) {
  return (
    <div className="py-12">
      <div className="container-custom max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Page Views</h1>
            <p className="text-gray-500">
              Total: <strong>{data?.total ?? 0}</strong> views · {data?.pages.length ?? 0} pages
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {data?.pages.map((p) => (
            <div key={p.path} className="flex items-center justify-between card py-3 px-5">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xs text-gray-400 font-mono w-4 text-right">
                  #{data.pages.indexOf(p) + 1}
                </span>
                <span className="text-sm text-gray-700 font-mono truncate">{p.path}</span>
              </div>
              <span className="text-lg font-bold text-primary-600 ml-4 tabular-nums">{p.views}</span>
            </div>
          ))}
          {(!data || data.pages.length === 0) && (
            <p className="text-gray-400 text-center py-12">No data yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
