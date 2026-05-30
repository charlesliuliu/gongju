# 内容查重与发布指南

## 一、查重工具使用

### 1.1 Copyscape（推荐，专业级）

**网址：** https://www.copyscape.com/

**价格：** $0.03/次查询

**使用步骤：**

```
1. 注册 Copyscape 账号
2. 充值（建议先充 $10，够用300次）
3. 选择 "Copyscape Premium"（网页内容查重）
4. 粘贴文章内容或输入URL
5. 点击 "Go"
6. 查看结果：
   - 绿色：无重复
   - 黄色：部分相似（需修改）
   - 红色：高度重复（必须重写）
```

**结果解读：**

| 相似度 | 处理方式 |
|--------|----------|
| 0-5% | 可以直接发布 |
| 5-10% | 小幅修改即可 |
| 10-20% | 需要改写重复段落 |
| 20%+ | 建议重写该部分 |

---

### 1.2 Grammarly（语法+查重）

**网址：** https://www.grammarly.com/

**免费版功能：**
- 语法检查
- 拼写检查
- 基础风格建议

**付费版（Premium）：**
- 抄袭检测
- 高级风格建议
- $12/月

**使用步骤：**

```
1. 注册 Grammarly
2. 打开 Grammarly Editor
3. 粘贴文章内容
4. 查看右侧建议面板
5. 逐条修改
6. 如有 Premium，点击 "Plagiarism" 检查抄袭
```

---

### 1.3 Quetext（免费选项）

**网址：** https://www.quetext.com/

**免费额度：** 每月可查一定字数

**使用步骤：**

```
1. 访问 quetext.com
2. 粘贴文本
3. 点击 "Check Plagiarism"
4. 查看结果
```

---

## 二、内容修改技巧

### 2.1 如何改写重复内容

**方法1：改变句式结构**

```
原文：
"Concrete is measured in cubic yards in the United States."

改写：
"In the US, the standard unit for measuring concrete is the cubic yard."
```

**方法2：使用同义词**

```
原文：
"Calculate the volume of concrete needed for your project."

改写：
"Determine the amount of concrete required for your construction project."
```

**方法3：拆分或合并句子**

```
原文：
"A concrete slab is the most common project type. Patios, driveways, and walkways all use this calculation."

改写：
"The concrete slab calculation applies to the most common projects, including patios, driveways, and walkways."
```

**方法4：添加个人见解**

```
原文：
"Always add 10% extra for waste."

改写：
"From our experience working with contractors, adding 10% extra for waste is a good rule of thumb. This accounts for spillage and minor variations in the subgrade."
```

---

### 2.2 让内容更独特的方法

| 方法 | 示例 |
|------|------|
| 添加实际案例 | "For a recent 20×30 foot patio project..." |
| 使用对话语气 | "Here's the thing about concrete..." |
| 加入本地信息 | "In most US markets, you'll find..." |
| 添加数据来源 | "According to the American Concrete Institute..." |
| 制作原创表格 | 自己整理的对比表格 |
| 添加注意事项 | "One thing many DIYers overlook..." |

---

## 三、发布前检查清单

### 3.1 内容质量检查

```
□ 字数达到目标（1500-2000字）
□ 段落结构清晰（有H2/H3标题）
□ 至少2个实际案例/例子
□ 包含数据或数字
□ 有表格或列表（提高可读性）
□ 语气一致（专业但友好）
□ 无语法错误（Grammarly检查通过）
```

### 3.2 查重检查

```
□ Copyscape 查重通过（相似度 < 10%）
□ 标题无重复（搜索标题确认）
□ 核心段落无重复
```

### 3.3 SEO检查

```
□ 标题包含主关键词
□ Meta description 包含关键词
□ H1 标题与页面title一致
□ 图片有 alt 标签
□ 内链到相关工具页
□ 内链到相关文章
□ URL 简洁（/guides/how-to-calculate-concrete）
```

### 3.4 技术检查

```
□ 页面正常渲染（无报错）
□ 移动端显示正常
□ 页面加载速度正常
□ 结构化数据正确（如有）
```

---

## 四、发布流程

### 4.1 创建文章页面

```bash
# 1. 创建文章目录
mkdir -p app/guides/how-to-calculate-concrete

# 2. 创建文章文件
# 将文章内容写入 app/guides/how-to-calculate-concrete/page.tsx
```

### 4.2 更新文章列表

在 `app/guides/page.tsx` 中添加新文章：

```typescript
const guides = [
  {
    slug: 'how-to-calculate-concrete',
    title: 'How to Calculate Concrete for Your Project',
    excerpt: 'A complete guide to calculating concrete volume for slabs, footings, and columns.',
    category: 'Concrete',
    readTime: '10 min',
  },
  // ... 其他文章
];
```

### 4.3 提交并部署

```bash
# 添加文件
git add .

# 提交
git commit -m "Add guide: How to Calculate Concrete"

# 推送
git push
```

### 4.4 验证发布

```
□ 访问文章URL确认正常
□ 检查移动端显示
□ 检查内链正常工作
□ Google Search Console 提交URL（可选）
```

---

## 五、内容日程安排

### Week 1 内容（混凝土计算器配套）

| 日期 | 文章 | 状态 |
|------|------|------|
| 06/01 | How to Calculate Concrete | 待发布 |
| 06/02 | Concrete Slab Cost Guide 2024 | 待生成 |
| 06/03 | Understanding Concrete Mix Ratios | 待生成 |

### Week 2 内容（屋顶计算器配套）

| 日期 | 文章 | 状态 |
|------|------|------|
| 06/08 | How to Calculate Roof Pitch | 待生成 |
| 06/09 | Roofing Materials Guide | 待生成 |
| 06/10 | Roof Pitch Conversion Chart | 待生成 |

---

## 六、查重预算

### 6.1 预估费用

```
每周：3篇文章
每篇：查重2次（初稿1次 + 修改后1次）
每次：$0.03

每周费用：3 × 2 × $0.03 = $0.18
8周费用：8 × $0.18 = $1.44
12周费用：12 × $0.18 = $2.16
```

**建议充值：$10（足够使用半年）**

---

## 七、常见问题

### Q: 查重显示10%相似度，能发布吗？

**A:** 可以，但建议修改相似部分。10%以下通常被认为是安全的。

### Q: 公式和数字也被标红怎么办？

**A:** 公式和标准数据（如"1 cubic yard = 27 cubic feet"）是公共知识，无法避免相似。改写周围的解释文字即可。

### Q: 如何避免AI生成的内容被识别？

**A:**
1. 人工改写关键段落
2. 添加个人经验和案例
3. 调整语气和表达方式
4. 使用查重工具验证

### Q: Grammarly Premium值得买吗？

**A:** 对于英文内容创作，值得。它能显著提高文章质量和可读性。

---

## 八、下一步

Day 3 完成后，继续生成：

1. **Day 4：** 第二篇文章 - Concrete Slab Cost Guide 2024
2. **Day 5：** 第三篇文章 - Understanding Concrete Mix Ratios

每篇文章遵循相同流程：
```
生成 → 查重 → 修改 → 再查重 → 发布
```