# Day 1 项目初始化指南（2026/05/30）

## 目标

完成项目搭建，网站可访问。

---

## 一、环境准备

### 1.1 检查本地环境

打开终端，依次执行：

```bash
# 检查 Node.js 版本（需要 18.17+）
node -v

# 检查 npm 版本
npm -v

# 检查 Git
git --version
```

**如果 Node.js 版本低于 18.17，需要先升级：**

- 访问 https://nodejs.org/
- 下载 LTS 版本（长期支持版）
- 安装后重新打开终端验证

---

## 二、创建 Next.js 项目

### 2.1 创建项目

```bash
# 进入你想存放项目的目录
cd ~/Desktop/Idea-work

# 创建 Next.js 项目
npx create-next-app@latest aoo-guidebook

# 创建时会问一系列问题，按以下选择：
```

```
✔ What is your project named? … aoo-guidebook
✔ Would you like to use TypeScript? … No / Yes → 选 Yes
✔ Would you like to use ESLint? … No / Yes → 选 Yes
✔ Would you like to use Tailwind CSS? … No / Yes → 选 Yes
✔ Would you like your code inside a `src/` directory? … No / Yes → 选 No
✔ Would you like to use App Router? … No / Yes → 选 Yes（推荐）
✔ Would you like to use Turbopack for `next dev`? … No / Yes → 选 Yes
✔ Would you like to customize the import alias? … No / Yes → 选 No
```

### 2.2 进入项目目录

```bash
cd aoo-guidebook
```

### 2.3 启动开发服务器测试

```bash
npm run dev
```

打开浏览器访问 http://localhost:3000

看到 Next.js 默认页面 = 项目创建成功

按 `Ctrl + C` 停止服务器

---

## 三、配置项目结构

### 3.1 创建目录结构

```bash
# 在项目根目录执行
mkdir -p app/tools
mkdir -p app/tools/concrete-calculator
mkdir -p app/tools/roof-pitch-calculator
mkdir -p app/tools/flooring-calculator
mkdir -p app/tools/paint-calculator
mkdir -p app/guides
mkdir -p app/faq
mkdir -p components/tools
mkdir -p components/ui
mkdir -p components/layout
mkdir -p lib/calculations
mkdir -p lib/utils
mkdir -p data
mkdir -p public/images
```

### 3.2 目录结构说明

```
aoo-guidebook/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # 全局布局
│   ├── page.tsx                # 首页
│   ├── globals.css             # 全局样式
│   ├── tools/                  # 工具页面
│   │   ├── concrete-calculator/
│   │   │   └── page.tsx
│   │   ├── roof-pitch-calculator/
│   │   ├── flooring-calculator/
│   │   └── paint-calculator/
│   ├── guides/                 # 内容页面
│   └── faq/                    # FAQ页面
├── components/                 # React 组件
│   ├── tools/                  # 工具组件
│   ├── ui/                     # UI 组件（按钮、输入框等）
│   └── layout/                 # 布局组件（Header、Footer等）
├── lib/                        # 工具函数
│   ├── calculations/           # 计算逻辑
│   └── utils/                  # 通用工具
├── data/                       # 静态数据
├── public/                     # 静态资源
│   └── images/
├── next.config.ts              # Next.js 配置
├── tailwind.config.ts          # Tailwind 配置
├── tsconfig.json               # TypeScript 配置
└── package.json                # 依赖配置
```

---

## 四、修改全局配置

### 4.1 修改 `next.config.ts`

打开 `next.config.ts`，替换为：

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 启用严格模式
  reactStrictMode: true,

  // 图片优化配置
  images: {
    domains: [],
    unoptimized: false,
  },

  // SEO 友好的 URL
  trailingSlash: true,
};

export default nextConfig;
```

### 4.2 修改 `tailwind.config.ts`

打开 `tailwind.config.ts`，替换为：

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 品牌色
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // 建筑主题色（橙色系）
        construction: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 五、创建全局布局

### 5.1 修改 `app/globals.css`

打开 `app/globals.css`，替换为：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* 基础样式 */
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-white text-gray-900 antialiased;
  }

  /* 链接样式 */
  a {
    @apply text-primary-600 hover:text-primary-700 transition-colors;
  }
}

@layer components {
  /* 按钮样式 */
  .btn-primary {
    @apply bg-primary-600 text-white px-6 py-3 rounded-lg font-medium
           hover:bg-primary-700 transition-colors duration-200
           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2;
  }

  .btn-secondary {
    @apply bg-white text-gray-700 px-6 py-3 rounded-lg font-medium
           border border-gray-300 hover:bg-gray-50 transition-colors duration-200
           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2;
  }

  /* 输入框样式 */
  .input-field {
    @apply w-full px-4 py-3 border border-gray-300 rounded-lg
           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
           transition-all duration-200;
  }

  /* 卡片样式 */
  .card {
    @apply bg-white rounded-xl shadow-sm border border-gray-100 p-6;
  }

  /* 容器 */
  .container-custom {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
}

@layer utilities {
  /* 文字渐变 */
  .text-gradient {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-construction-500;
  }
}
```

### 5.2 创建 Header 组件

创建文件 `components/layout/Header.tsx`：

```typescript
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <nav className="container-custom flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-gray-900 hover:text-gray-900">
          <span className="text-2xl font-bold">Aoo</span>
          <span className="text-lg text-gray-600">Guidebook</span>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/tools" className="text-gray-600 hover:text-gray-900">
            Tools
          </Link>
          <Link href="/guides" className="text-gray-600 hover:text-gray-900">
            Guides
          </Link>
          <Link href="/faq" className="text-gray-600 hover:text-gray-900">
            FAQ
          </Link>
        </div>

        {/* Mobile menu button - 简化版 */}
        <button className="md:hidden p-2 text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </header>
  );
}
```

### 5.3 创建 Footer 组件

创建文件 `components/layout/Footer.tsx`：

```typescript
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Aoo Guidebook</h3>
            <p className="text-gray-600 text-sm">
              Free online construction calculators for contractors and DIY enthusiasts.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Popular Tools</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tools/concrete-calculator" className="text-gray-600 hover:text-gray-900">
                  Concrete Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/roof-pitch-calculator" className="text-gray-600 hover:text-gray-900">
                  Roof Pitch Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/flooring-calculator" className="text-gray-600 hover:text-gray-900">
                  Flooring Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/paint-calculator" className="text-gray-600 hover:text-gray-900">
                  Paint Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/guides" className="text-gray-600 hover:text-gray-900">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-gray-900">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
            <p className="text-gray-600 text-sm">
              <a href="mailto:l15670751903@163.com" className="hover:text-gray-900">
                l15670751903@163.com
              </a>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Aoo Guidebook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
```

### 5.4 修改全局布局 `app/layout.tsx`

打开 `app/layout.tsx`，替换为：

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Aoo Guidebook - Free Construction Calculators",
    template: "%s | Aoo Guidebook",
  },
  description: "Free online construction calculators for concrete, roofing, flooring, paint and more. Perfect for contractors and DIY enthusiasts.",
  keywords: ["construction calculator", "concrete calculator", "roofing calculator", "flooring calculator", "paint calculator", "DIY tools"],
  authors: [{ name: "Aoo Guidebook" }],
  creator: "Aoo Guidebook",
  publisher: "Aoo Guidebook",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aooguidebook.com",
    siteName: "Aoo Guidebook",
    title: "Aoo Guidebook - Free Construction Calculators",
    description: "Free online construction calculators for concrete, roofing, flooring, paint and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aoo Guidebook - Free Construction Calculators",
    description: "Free online construction calculators for concrete, roofing, flooring, paint and more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

---

## 六、创建首页

### 6.1 修改首页 `app/page.tsx`

打开 `app/page.tsx`，替换为：

```typescript
import Link from 'next/link';

// 工具数据
const tools = [
  {
    slug: 'concrete-calculator',
    title: 'Concrete Calculator',
    description: 'Calculate concrete volume, bags needed, and cost for slabs, footings, and columns.',
    icon: '🏗️',
  },
  {
    slug: 'roof-pitch-calculator',
    title: 'Roof Pitch Calculator',
    description: 'Calculate roof pitch, angle, and estimate roofing materials needed.',
    icon: '🏠',
  },
  {
    slug: 'flooring-calculator',
    title: 'Flooring Calculator',
    description: 'Calculate flooring materials needed for your room including waste factor.',
    icon: '🪵',
  },
  {
    slug: 'paint-calculator',
    title: 'Paint Calculator',
    description: 'Calculate how much paint you need for your walls and estimate cost.',
    icon: '🎨',
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Free Construction
            <span className="text-gradient"> Calculators</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Professional-grade calculators for contractors and DIY enthusiasts.
            Get accurate estimates for concrete, roofing, flooring, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools/concrete-calculator" className="btn-primary">
              Start Calculating
            </Link>
            <Link href="/guides" className="btn-secondary">
              View Guides
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Popular Calculators
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Choose a calculator below to get started. All tools are free and work on mobile devices.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="card hover:shadow-md transition-shadow group"
              >
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Use Aoo Guidebook?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="font-semibold text-gray-900 mb-2">100% Free</h3>
              <p className="text-gray-600 text-sm">All calculators are completely free to use. No registration required.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="font-semibold text-gray-900 mb-2">Mobile Friendly</h3>
              <p className="text-gray-600 text-sm">Use on the job site with your phone or tablet.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-semibold text-gray-900 mb-2">Accurate Results</h3>
              <p className="text-gray-600 text-sm">Professional formulas used by contractors.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start?
          </h2>
          <p className="text-gray-600 mb-8">
            Choose a calculator above or browse our guides to learn more.
          </p>
          <Link href="/tools/concrete-calculator" className="btn-primary">
            Try Concrete Calculator
          </Link>
        </div>
      </section>
    </div>
  );
}
```

---

## 七、创建工具列表页

### 7.1 创建 `app/tools/page.tsx`

```typescript
import Link from 'next/link';

const tools = [
  {
    slug: 'concrete-calculator',
    title: 'Concrete Calculator',
    description: 'Calculate concrete volume, bags needed, and cost for slabs, footings, and columns.',
    icon: '🏗️',
    features: ['Slab calculations', 'Footing estimates', 'Cost estimation'],
  },
  {
    slug: 'roof-pitch-calculator',
    title: 'Roof Pitch Calculator',
    description: 'Calculate roof pitch, angle, and estimate roofing materials needed.',
    icon: '🏠',
    features: ['Pitch calculation', 'Angle conversion', 'Material estimates'],
  },
  {
    slug: 'flooring-calculator',
    title: 'Flooring Calculator',
    description: 'Calculate flooring materials needed for your room including waste factor.',
    icon: '🪵',
    features: ['Room area', 'Box quantity', 'Cost estimation'],
  },
  {
    slug: 'paint-calculator',
    title: 'Paint Calculator',
    description: 'Calculate how much paint you need for your walls and estimate cost.',
    icon: '🎨',
    features: ['Wall area', 'Gallon calculation', 'Cost estimation'],
  },
];

export default function ToolsPage() {
  return (
    <div className="py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Construction Calculators
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Free online calculators for all your construction needs.
            Select a tool below to get started.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="card hover:shadow-lg transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{tool.icon}</div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {tool.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {tool.description}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {tool.features.map((feature) => (
                      <li
                        key={feature}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## 八、创建占位页面

### 8.1 创建 Guides 列表页 `app/guides/page.tsx`

```typescript
export default function GuidesPage() {
  return (
    <div className="py-12">
      <div className="container-custom">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          Construction Guides
        </h1>
        <p className="text-xl text-gray-600 text-center mb-12">
          Coming soon! Detailed guides for construction projects.
        </p>
        <div className="text-center text-gray-500">
          <p>Guides will be added as tools are developed.</p>
        </div>
      </div>
    </div>
  );
}
```

### 8.2 创建 FAQ 页 `app/faq/page.tsx`

```typescript
export default function FAQPage() {
  return (
    <div className="py-12">
      <div className="container-custom">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-gray-600 text-center mb-12">
          Common questions about our construction calculators.
        </p>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-2">
              Are these calculators free to use?
            </h3>
            <p className="text-gray-600">
              Yes! All calculators on Aoo Guidebook are completely free to use with no registration required.
            </p>
          </div>
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-2">
              How accurate are the calculations?
            </h3>
            <p className="text-gray-600">
              Our calculators use industry-standard formulas. However, results are estimates and should be verified for critical projects.
            </p>
          </div>
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-2">
              Can I use these on my phone?
            </h3>
            <p className="text-gray-600">
              Yes! All tools are mobile-friendly and work great on smartphones and tablets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 九、Git 配置与推送

### 9.1 初始化 Git（如果还没有）

```bash
# 检查是否已经是 git 仓库
git status

# 如果报错，说明需要初始化
git init
```

### 9.2 创建 .gitignore

创建或确认 `.gitignore` 文件：

```gitignore
# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

### 9.3 提交代码

```bash
# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: project setup with basic structure"
```

### 9.4 创建 GitHub 仓库并推送

1. 打开 https://github.com/
2. 点击 "New repository"
3. 仓库名：`aoo-guidebook`
4. 设为 Private 或 Public
5. **不要**勾选 "Add a README file"
6. 点击 "Create repository"

然后执行：

```bash
# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/aoo-guidebook.git

# 推送到 GitHub
git push -u origin main
```

---

## 十、Vercel 部署

### 10.1 注册 Vercel

1. 访问 https://vercel.com/
2. 点击 "Sign Up"
3. 选择 "Continue with GitHub"
4. 授权 Vercel 访问你的 GitHub

### 10.2 导入项目

1. 在 Vercel Dashboard 点击 "Add New..." → "Project"
2. 选择 `aoo-guidebook` 仓库
3. 点击 "Import"

### 10.3 配置项目

```
Framework Preset: Next.js（自动检测）
Root Directory: ./
Build Command: npm run build（默认）
Output Directory: .next（默认）
Install Command: npm install（默认）
```

点击 "Deploy"

### 10.4 等待部署

- 部署通常需要 1-3 分钟
- 完成后会显示 "Congratulations!" 页面
- 点击 "Continue to Dashboard"

---

## 十一、绑定自定义域名

### 11.1 添加域名

1. 在 Vercel 项目页面，点击 "Settings"
2. 左侧菜单选择 "Domains"
3. 输入域名：`aooguidebook.com`
4. 点击 "Add"

### 11.2 配置 DNS

Vercel 会显示需要配置的 DNS 记录：

**方式一：使用 Vercel DNS（推荐）**
1. 在域名注册商（Namecheap）修改 nameservers 为：
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`

**方式二：使用 A 记录**
1. 在 Namecheap DNS 设置添加：
   - Type: A
   - Host: @
   - Value: 76.76.21.21
   - TTL: Automatic

2. 添加 CNAME：
   - Type: CNAME
   - Host: www
   - Value: cname.vercel-dns.com
   - TTL: Automatic

### 11.3 等待生效

- DNS 生效需要几分钟到几小时
- Vercel 会自动配置 SSL 证书
- 完成后访问 https://aooguidebook.com

---

## 十二、配置 Google Analytics

### 12.1 创建 GA4 账号

1. 访问 https://analytics.google.com/
2. 点击 "Start measuring"
3. 账号名称：`Aoo Guidebook`
4. 创建媒体资源：
   - 媒体资源名称：`aooguidebook.com`
   - 报告时区：United States
   - 货币：US Dollar ($)
5. 关于您的商家：
   - 行业类别：Construction
   - 企业规模：Small
6. 接受服务条款

### 12.2 获取衡量 ID

1. 设置数据流 → Web
2. 网站网址：`https://aooguidebook.com`
3. 数据流名称：`Aoo Guidebook Web`
4. 复制 **衡量 ID**（格式：G-XXXXXXXX）

### 12.3 添加到项目

创建文件 `lib/utils/analytics.ts`：

```typescript
// Google Analytics 配置
export const GA_MEASUREMENT_ID = 'G-XXXXXXXX'; // 替换为你的衡量 ID

// 页面浏览追踪
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// 事件追踪
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
```

修改 `app/layout.tsx`，在 `<head>` 中添加：

```typescript
// 在文件顶部添加
import Script from 'next/script';
import { GA_MEASUREMENT_ID } from '@/lib/utils/analytics';

// 在 return 的 <html> 内添加
<html lang="en">
  <head>
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      strategy="afterInteractive"
    />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}');
      `}
    </Script>
  </head>
  {/* ... */}
</html>
```

---

## 十三、配置 Google Search Console

### 13.1 添加网站

1. 访问 https://search.google.com/search-console
2. 点击 "Add property"
3. 选择 "URL prefix"
4. 输入：`https://aooguidebook.com`
5. 点击 "Continue"

### 13.2 验证网站

**方式一：HTML 文件验证（推荐）**
1. 下载验证 HTML 文件
2. 放到 `public/` 目录
3. 重新部署
4. 点击 "Verify"

**方式二：DNS 验证**
1. 选择 "DNS verification"
2. 在 Namecheap 添加 TXT 记录
3. 等待生效后验证

### 13.3 提交 sitemap

稍后创建 sitemap 后提交。

---

## 十四、测试清单

### 14.1 本地测试

```bash
# 启动开发服务器
npm run dev

# 访问以下页面确认正常
```

- [ ] http://localhost:3000 （首页）
- [ ] http://localhost:3000/tools （工具列表）
- [ ] http://localhost:3000/guides （指南页）
- [ ] http://localhost:3000/faq （FAQ页）

### 14.2 生产构建测试

```bash
# 构建
npm run build

# 启动生产服务器
npm run start

# 访问 http://localhost:3000 测试
```

### 14.3 部署后测试

- [ ] https://aooguidebook.com 可访问
- [ ] 首页显示正常
- [ ] Header/Footer 显示正常
- [ ] 移动端访问正常
- [ ] Google Analytics 正常（查看实时数据）

---

## 十五、常见问题

### Q: npm install 很慢怎么办？

```bash
# 使用国内镜像
npm config set registry https://registry.npmmirror.com

# 或使用 pnpm
npm install -g pnpm
pnpm install
```

### Q: Vercel 部署失败？

检查 `npm run build` 是否本地能成功，修复错误后重新推送。

### Q: 域名无法访问？

DNS 生效需要时间，最多等待 48 小时（通常几分钟）。

### Q: Google Analytics 没数据？

等待 24-48 小时，数据有延迟。

---

## 完成标志

Day 1 完成标志：

- [ ] Next.js 项目创建成功
- [ ] 本地开发服务器正常运行
- [ ] 代码推送到 GitHub
- [ ] Vercel 部署成功
- [ ] 域名绑定成功（https://aooguidebook.com 可访问）
- [ ] Google Analytics 配置完成
- [ ] Google Search Console 验证完成

---

## 下一步（Day 2）

Day 2 将开始实现第一个工具：**混凝土计算器**

包括：
- 计算逻辑实现
- UI 界面设计
- 输入验证
- 结果展示
- 移动端适配