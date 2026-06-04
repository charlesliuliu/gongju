# AdSense 上线前待办

## 当前状态：已就绪，可提交申请

网站已完成 AdSense 审批所需的基础设施：
- ✅ 隐私政策页面（中英文）
- ✅ 服务条款页面（中英文）
- ✅ ads.txt（占位符，待替换）
- ✅ OG 元数据翻译
- ✅ 完整站点地图
- ✅ GA4 脚本注入
- ✅ JSON-LD 结构化数据

---

## 待办事项

### 1. 申请 AdSense
- [ ] 访问 https://adsense.google.com/ 提交申请
- [ ] 等待审核（通常 1-2 周）

### 2. 审批通过后
- [ ] 在 AdSense 后台找到发布商 ID（格式：`pub-xxxxxxxxxxxxx`）
- [ ] 替换 `public/ads.txt` 中的 `pub-XXXXXXXXXXXXXXXX`
- [ ] 在页面上添加广告代码（AdSense 后台提供）

### 3. GA4 跟踪 ID
- [x] 前往 https://analytics.google.com/ 创建 GA4 属性
- [x] 获取测量 ID（`G-95D2M6CGES`）
- [x] 替换 `app/layout.tsx` 中的占位符

### 4. OG 社交分享图片
- [x] 制作一张 1200×630 的网站分享图
- [x] 放到 `public/images/og-default.png`

---

## 后续优化（非紧急）

- [ ] 添加 apple-touch-icon 和 manifest.json（PWA 支持）
- [ ] 指南页添加社交分享按钮
- [ ] 修复 OG URL 应包含语言前缀（`/en/...` 格式）
- [ ] 添加多语言 sitemap hreflang 标签
