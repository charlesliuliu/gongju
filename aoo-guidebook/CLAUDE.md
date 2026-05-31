# App Guidebook — 项目介绍

## 项目概述

中英双语的建筑计算器与指南网站。提供免费的混凝土、屋顶、地板、油漆等建筑计算器，以及相关的施工指南文章。

---

## 技术栈

| 技术 | 版本 | 备注 |
|------|------|------|
| Next.js | **16.2.6** | ⚠️ 与旧版差异较大，编码前查阅 `node_modules/next/dist/docs/` |
| React | **19.2.4** | |
| TypeScript | ^5 | 严格模式 (`strict: true`) |
| next-intl | ^4.13.0 | 国际化方案 |
| Tailwind CSS | **v4** | 使用 `@import "tailwindcss"` 而非旧的 `@tailwind` 指令 |
| PostCSS | | Tailwind v4 通过 PostCSS 插件集成 |

### 关键配置

- `tsconfig.json`: `target: ES2017`, `moduleResolution: bundler`, `jsx: react-jsx`, `paths: @/* → ./*`
- `next.config.ts`: `trailingSlash: true`, `reactStrictMode: true`
- Tailwind v4 自定义主题在 `app/globals.css` 中通过 `@theme inline` 定义

---

## 项目结构

```
aoo-guidebook/
├── app/
│   ├── globals.css              # Tailwind v4 全局样式 + 自定义主题
│   ├── layout.tsx               # 根布局 (NextIntlClientProvider + Header + Footer)
│   └── [locale]/
│       ├── layout.tsx           # 本地化布局 (generateStaticParams)
│       ├── page.tsx             # 首页
│       ├── guides/
│       │   ├── page.tsx         # 指南列表页
│       │   ├── board-feet-calculation/page.tsx
│       │   ├── concrete-mix-ratios/page.tsx
│       │   ├── concrete-slab-cost-guide/page.tsx
│       │   ├── flooring-cost-estimation/page.tsx
│       │   ├── flooring-types-comparison/page.tsx
│       │   ├── how-to-calculate-concrete/page.tsx
│       │   ├── how-to-calculate-flooring-materials/page.tsx
│       │   ├── how-to-calculate-lumber/page.tsx
│       │   ├── how-to-calculate-paint-needed/page.tsx
│       │   ├── how-to-calculate-roof-pitch/page.tsx
│       │   ├── interior-vs-exterior-paint/page.tsx
│       │   ├── lumber-sizes-and-types/page.tsx
│       │   ├── paint-coverage-per-gallon/page.tsx
│       │   ├── roof-pitch-angle-conversion/page.tsx
│       │   └── roofing-materials-guide/page.tsx
│       ├── tools/
│       │   ├── page.tsx         # 工具列表页
│       │   ├── concrete-calculator/page.tsx
│       │   ├── deck-calculator/page.tsx
│       │   ├── drywall-calculator/page.tsx
│       │   ├── fence-calculator/page.tsx
│       │   ├── paint-calculator/page.tsx
│       │   ├── flooring-calculator/page.tsx
│       │   ├── lumber-calculator/page.tsx
│       │   └── roof-pitch-calculator/page.tsx
│       └── faq/
│           └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx           # 导航栏，'use client'
│   │   ├── Footer.tsx           # 页脚
│   │   └── LocaleSwitcher.tsx   # 语言切换器，'use client'
│   ├── tools/
│   │   ├── ConcreteCalculator.tsx
│   │   ├── DeckCalculator.tsx
│   │   ├── DrywallCalculator.tsx
│   │   ├── FenceCalculator.tsx
│   │   ├── RoofPitchCalculator.tsx
│   │   ├── FlooringCalculator.tsx
│   │   └── PaintCalculator.tsx
│   └── ui/
│       ├── NumberInput.tsx
│       ├── ResultCard.tsx
│       └── SelectInput.tsx
├── i18n/
│   ├── routing.ts               # 语言配置 (中英文)
│   ├── navigation.ts            # 导航工具 (Link, redirect 等)
│   ├── request.ts               # 消息加载
│   └── messages/                # 翻译文件 (en.json + zh.json)
├── lib/
│   ├── calculations/
│   │   └── concrete.ts          # 混凝土计算逻辑
│   └── utils/
│       └── analytics.ts
├── middleware.ts                 # next-intl 中间件
├── next.config.ts
├── tsconfig.json
├── package.json
└── postcss.config.mjs
```

---

## 国际化 (i18n) 系统

### 支持语言

- **en** (English) — 默认语言
- **zh** (中文)
- URL 前缀: `always` (如 `/zh/guides/concrete-mix-ratios/`)

### 翻译文件

位于 `i18n/messages/{locale}.json`，按命名空间组织：

```json
{
  "global": { "brand": "...", "tools": "...", "guides": "...", "faq": "..." },
  "home": { "heroTitle": "...", ... },
  "tools": { "pageTitle": "...", ... },
  "calculator": { "enterDimensions": "...", ... },
  "calcPage": { "title": "...", ... },
  "guides": { "title": "...", "mixRatiosGuide": "...", ... },
  "mixRatiosPage": { "intro": "...", ... },
  "faq": { "title": "...", ... }
}
```

### 在代码中使用翻译

**Server Component:**
```tsx
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('namespace');
  return <h1>{t('key')}</h1>;
}
```

**Client Component:**
```tsx
'use client';
import { useTranslations } from 'next-intl';

export default function Component() {
  const t = useTranslations('namespace');
  return <h1>{t('key')}</h1>;
}
```

### 添加新语言

1. 在 `i18n/routing.ts` 的 `locales` 数组和 `localeLabels` 中添加
2. 创建 `i18n/messages/{locale}.json` 翻译文件

### 添加新指南文章

1. 在 `en.json` 和 `zh.json` 的 `guides` 命名空间中添加 `mixRatiosGuide` 和 `mixRatiosDesc`
2. 创建独立的页面内容命名空间（如 `mixRatiosPage`）存储所有正文翻译
3. 在 `app/[locale]/guides/{slug}/page.tsx` 创建页面，使用 `getTranslations` 读取翻译

---

## 路由系统

| 路由 | 说明 |
|------|------|
| `/[locale]` | 首页 |
| `/[locale]/guides` | 指南列表 |
| `/[locale]/guides/{slug}` | 指南详情 |
| `/[locale]/tools` | 工具列表 |
| `/[locale]/tools/{slug}` | 工具页面 |
| `/[locale]/faq` | 常见问题 |

- 所有页面通过 `generateStaticParams` 为中英文生成静态页面
- 链接使用 `i18n/navigation.ts` 导出的 `Link` 组件（自动处理 locale 前缀）

---

## 样式规范

- 使用 **Tailwind CSS v4**（`@import "tailwindcss"` 语法）
- 自定义颜色在 `app/globals.css` 的 `@theme inline` 中定义：
  - `primary-*`（蓝色系）— 主色
  - `construction-*`（橙色系）— 强调色
- 常用工具类（也在 `globals.css` 中定义）：
  - `btn-primary` — 主按钮
  - `btn-secondary` — 次按钮
  - `input-field` — 输入框
  - `card` — 卡片容器
  - `container-custom` — 最大宽度容器
  - `text-gradient` — 渐变色文字

---

## 代码约定

### 指南页面模式

每个指南页面是一个 **async server component**，使用 `getTranslations` 获取翻译：
- 导出的 `generateMetadata` 使用 `getTranslations('guides')`
- 页面组件使用 `getTranslations('{slug}Page')` 获取正文内容

### 工具页面模式

工具页面使用客户端组件（`'use client'`），通过 `useTranslations` 获取翻译。计算逻辑放在 `lib/calculations/` 中。

### 组件规范

- 布局组件: `components/layout/`
- 工具组件: `components/tools/`
- UI 组件: `components/ui/`

### Tailwind v4 注意事项

- 使用 `@import "tailwindcss"` 而非 `@tailwind base/components/utilities`
- 使用 `@theme inline` 而非 `@layer base` 定义主题
- 不使用 `@apply` 在 CSS 文件中（已在 globals.css 中使用），优先用内联类

### 构建命令

```bash
npm run dev      # 开发服务器
npm run build    # 生产构建（推送前必须执行，可捕获 MISSING_MESSAGE 等错误）
npm run start    # 生产启动
npm run lint     # ESLint 检查
```

---

## ⚠️ Cloudflare Pages 构建注意事项

### 平台特有的原生包

Cloudflare Pages 构建环境是 **Linux x64**，而本地开发是 macOS ARM64。

- 不要在 `dependencies` 中添加平台特定的原生包（如 `@parcel/watcher-darwin-arm64`、`@tailwindcss/oxide-darwin-arm64`）
- 这些包由上级包（如 `@parcel/watcher`）自动通过 `optionalDependencies` 按需引入，Linux 上会自动跳过
- 项目根已有 `.npmrc` 配置 `ignore-platform-reqs=true` 作为保险
- 修改 `package-lock.json`（如删除 `node_modules` 后 `npm install`）后，确认锁文件中平台包标记为 `"optional": true`

### 推送前必做检查

1. **`npm run build`** — 本地构建通过再推送。如果本地都过不了，Cloudflare 必然失败
2. **检查 `app/[locale]/tools/page.tsx`** — 新增工具计算器时记得把工具条目加到 `tools` 数组里
3. **检查翻译键** — 新增页面/组件引用的 `t('xxx')` 必须在 `en.json` 和 `zh.json` 中都存在

---

## 添加新工具的检查清单

添加新计算器工具时，按以下步骤操作：

1. **创建计算器组件** `components/tools/NewToolCalculator.tsx`（'use client'）
2. **创建工具页面** `app/[locale]/tools/new-tool/page.tsx`（server component，使用 `getTranslations`）
3. **添加翻译命名空间** — 在 `i18n/messages/en.json` 和 `zh.json` 中添加完整的 `newToolCalculator` 命名空间（所有 UI 标签）
4. **注册到工具列表页** — 在 `app/[locale]/tools/page.tsx` 的 `tools` 数组中添加新条目
5. **可选：添加指南关联** — 在 `guides` 命名空间中添加 `newToolGuide` 和 `newToolDesc` 等
6. **本地 `npm run build` 验证** — 确认没有 `MISSING_MESSAGE` 错误

### 翻译键命名规范

- 计算器命名空间：使用小驼峰，如 `deckCalculator`、`fenceCalculator`
- 指南命名空间键：使用小驼峰，如 `deckBuildGuide`、`deckBuildDesc`
- 页面内容命名空间：使用小驼峰，如 `mixRatiosPage`、`slabCostPage`
- 所有键名使用小驼峰，如 `pageTitle`、`howToUse`、`enterDimensions`
