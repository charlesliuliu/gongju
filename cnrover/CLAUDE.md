# CN Rover — 项目介绍

## 项目概述

面向外国游客的中国旅游攻略网站。提供城市指南、景点介绍、行程规划和实用攻略。英文为主+中文地名对照。

---

## 技术栈

| 技术 | 版本 | 备注 |
|------|------|------|
| Next.js | **16.2.6** | |
| React | **19.2.4** | |
| TypeScript | ^5 | 严格模式 |
| next-intl | ^4.13.0 | 国际化（en/zh） |
| Tailwind CSS | **v4** | `@import "tailwindcss"` |
| PostCSS | | Tailwind v4 集成 |

## 项目结构

```
cnrover/
├── app/
│   ├── globals.css          # Tailwind v4 + 自定义主题
│   ├── layout.tsx           # 根布局（含 AdSense + GA）
│   ├── page.tsx             # 重定向到 /en/
│   ├── sitemap.ts
│   ├── robots.ts
│   └── [locale]/
│       ├── layout.tsx       # 本地化布局
│       ├── page.tsx         # 首页
│       ├── beijing/
│       │   ├── page.tsx     # 北京概览
│       │   ├── great-wall/page.tsx
│       │   └── forbidden-city/page.tsx
│       ├── itineraries/page.tsx
│       ├── guides/
│       │   ├── page.tsx
│       │   ├── visa/page.tsx
│       │   ├── payment/page.tsx
│       │   ├── sim-card/page.tsx
│       │   └── transportation/page.tsx
│       ├── faq/page.tsx
│       └── about/page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── LocaleSwitcher.tsx
├── i18n/
│   ├── routing.ts
│   ├── navigation.ts
│   ├── request.ts
│   └── messages/{en,zh}.json
├── lib/
│   └── seo.ts
├── next.config.ts
├── tsconfig.json
├── wrangler.toml
└── package.json
```

## 国际化

- **en** (English) — 默认语言
- **zh** (中文) — 用户写中文内容，我翻译到英文
- URL 前缀: `always`（如 `/zh/beijing/`）

## 构建与部署

```bash
npm run dev        # 开发服务器
npm run build      # 生产构建
npm run deploy     # 构建 + 部署到 Cloudflare Pages
```

## 内容约定

- 所有内容在 `i18n/messages/zh.json` 写中文
- 在 `i18n/messages/en.json` 写对应的英文
- 地名/景点名保留中文+拼音，方便外国人实地使用
- 新增城市：在 zh.json/en.json 添加命名空间，在首页城市列表注册
