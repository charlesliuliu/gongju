import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    domains: [],
    unoptimized: true,
  },
  trailingSlash: true,
  turbopack: {
    root: '/Users/liuyaoyu/Desktop/gongju/cnrover',
  },
};

export default withNextIntl(nextConfig);
