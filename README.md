# Astro Theme Inkstone

**用 Obsidian 写作，用 Astro 发布。**

Inkstone 是一款面向中文技术博客和个人项目记录的 Astro 静态博客主题。把项目目录作为 Obsidian vault 打开，在本地写 Markdown、整理文章和图片，再构建成静态站点发布。

Inkstone 意为「砚台」：一个安静、耐看、可以长期使用的写作器物。主题采用留白、网格背景和卡片布局，提供适合中文阅读的正文排版，以及从按钮位置展开的深浅色切换动画。

![Astro](https://img.shields.io/badge/Astro-5.x-ff5d01?logo=astro&logoColor=white)
![Markdown](https://img.shields.io/badge/Markdown-ready-111827?logo=markdown&logoColor=white)
![Obsidian](https://img.shields.io/badge/Obsidian-friendly-7c3aed?logo=obsidian&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-10b981)

![Inkstone 首页的浅色与深色主题预览](public/images/site/light-dark-preview.png)

## 你可以用它做什么

- **在本地写作**：文章、草稿和图片保存在项目中，附带 Obsidian 配置和文章模板，也可以使用其他 Markdown 编辑器。
- **整理和查找文章**：支持文件夹分类、标签、年份归档和本地搜索。搜索覆盖标题、摘要、日期、分类和标签，无需接入外部搜索服务。
- **搭建个人站点**：内置首页、文章页、项目页、关于页和赞助页，站点信息、导航、项目和友链集中配置。
- **保持阅读体验**：提供响应式布局、自动目录、代码高亮、封面图和深浅色主题。主题选择会保存在本地，切换动画兼容减少动态效果的系统偏好。
- **分享和发布内容**：生成 RSS、sitemap、robots.txt、canonical、社交分享元信息和文章 JSON-LD；另提供 `llms.txt` 与 `content-index.json` 供工具读取。
- **部署静态站点**：构建结果输出到 `dist/`，无需运行后端服务。

## 快速开始

使用 pnpm 10，版本约定见 [package.json](package.json)。准备好可运行项目所用 Astro 5 的 Node.js 环境后，克隆仓库并启动：

```bash
git clone https://github.com/moxiaonai/astro-theme-inkstone.git
cd astro-theme-inkstone
pnpm install
pnpm dev
```

打开 <http://127.0.0.1:4321/> 查看站点。

| 命令 | 用途 |
| --- | --- |
| `pnpm dev` | 启动开发服务，默认端口 `4321` |
| `pnpm build` | 构建静态站点，输出到 `dist/` |
| `pnpm preview` | 预览构建结果，默认端口 `4322`；需先执行构建 |
| `pnpm obsidian` | 在 macOS 上用已安装的 Obsidian 打开项目目录 |

### 先改成自己的站点

1. 修改 [src/theme/site.ts](src/theme/site.ts) 中的站点信息、作者、导航、社交链接、项目和友链。
2. 将该文件中的 `site.url` 和 [astro.config.mjs](astro.config.mjs) 中的 `site` 改为同一个真实站点地址。
3. 替换 `public/favicon.svg`、`public/images/theme/` 中的 Logo、头像和首页插画，以及 `public/images/site/social-card.svg` 分享图。
4. 修改 [关于页](src/pages/about.md)，删除或改写 `src/content/blog/` 中的示例文章。不需要赞助页时，可从导航中移除对应入口。
5. 运行 `pnpm build`，确认文章、分类和链接配置可以完成构建。

## 写第一篇文章

将项目根目录作为 Obsidian vault 打开，或直接在 `src/content/blog/` 下新建 Markdown 文件。仓库中的 `.obsidian/` 配置将新笔记目录、附件目录和模板目录分别设为：

| 内容 | 位置 |
| --- | --- |
| 文章与草稿 | `src/content/blog/` |
| 文章模板 | `src/content/blog/_templates/` |
| 图片附件 | `public/images/posts/` |

例如，创建 `src/content/blog/指南/第一篇文章.md`：

```md
---
title: "用 Obsidian 写第一篇博客"
urlSlug: "first-post"
description: "从本地 Markdown 到静态博客的写作流程。"
pubDate: 2026-11-12
tags: ["Obsidian", "Markdown"]
draft: false
---

这里开始写正文。
```

这篇文章会归入「指南」分类，发布地址为 `/blog/first-post.html`。写作期间可以设置 `draft: true`，准备发布后再改为 `false`。

### Frontmatter 字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `title` | `string` | 发布必填：文章标题 |
| `pubDate` | `date` | 发布必填：发布日期，如 `2026-11-12` |
| `urlSlug` | `string` | 文章固定链接；建议明确填写，含中文的文件路径通常需要此字段 |
| `description` | `string` | 可选：用于文章列表、搜索结果和 SEO 的摘要 |
| `updatedDate` | `date` | 可选：更新日期 |
| `category` | `string` | 可选：覆盖根据文件夹推导的分类 |
| `tags` | `string[]` | 可选：标签，默认 `[]` |
| `draft` | `boolean` | 可选：设为 `true` 时不公开，默认 `false` |
| `cover` | `string` | 可选：封面路径，如 `/images/posts/example.png` |
| `featured` | `boolean` | 预留字段，默认 `false`，可用于扩展精选文章 |

公开文章需要同时满足：有 `title`、有 `pubDate`，且 `draft` 不是 `true`。缺少这些发布条件的笔记不会进入公开内容；`_templates/` 目录也会被内容集合排除。

当前配置以标准 Markdown 为主。内容加载器包含 `.mdx` 文件匹配规则，但项目尚未配置 MDX integration；使用 MDX 前需要自行补充集成。

### 图片怎么放

把图片放到 `public/images/posts/`，网页中的引用路径省略 `public`：

```md
![图片说明](/images/posts/example.png)
```

这是网站发布时的路径。Obsidian 自动插入的附件链接可能使用文件相对路径，发布前需要检查并调整；不能假定同一个路径在两端都能直接预览。

## 分类、标签与固定链接

### 用文件夹整理分类

默认取文章所在的一级文件夹作为分类：

```text
src/content/blog/
├── 指南/
│   └── 第一篇文章.md       # 分类：指南
├── 设计/
│   └── 深浅色主题.md       # 分类：设计
└── 项目记录.md             # 分类：未分类
```

文章中的 `category` 字段优先于文件夹名称。分类列表也会收录一级分类文件夹，因此空文件夹可能显示为文章数为零的分类。

### 为中文内容设置英文 URL

文章链接采用 `/blog/:slug.html`。明确填写 `urlSlug`，可以让文章链接在调整中文标题或移动文件后保持稳定：

```yaml
urlSlug: "obsidian-writing"
```

未填写时，slug 从文件路径生成。文章 slug 会转为小写，必须以英文或数字开头，其余字符只允许英文、数字、连字符和斜杠；不符合规则会导致构建报错。避免为不同文章设置相同的 slug。

分类和标签共用 [src/lib/posts.ts](src/lib/posts.ts) 中的 `taxonomySlugMap`。已有「指南」「设计」「写作」「前端」等映射；新增非 ASCII 名称时，需要在现有映射中补充英文 slug，例如：

```ts
const taxonomySlugMap: Record<string, string> = {
  // 保留已有映射，在这里追加：
  读书: 'reading',
  工具: 'tools'
};
```

「读书」作为分类时对应 `/categories/reading.html`，作为标签时对应 `/tags/reading.html`。缺少非 ASCII 名称的映射会导致构建报错。

## 定制主题

大部分内容配置集中在 [src/theme/site.ts](src/theme/site.ts)，视觉样式集中在 [src/theme/styles/theme.css](src/theme/styles/theme.css)。

| 想修改的内容 | 文件或目录 |
| --- | --- |
| 站点信息、作者、首页文案、导航、社交链接 | `src/theme/site.ts` |
| 项目卡片、友情链接 | `src/theme/site.ts` |
| 颜色、字体、间距、圆角、文章排版 | `src/theme/styles/theme.css` |
| Header、Footer、Logo、卡片等组件 | `src/theme/components/` |
| 分类映射、文章 URL 和内容处理 | `src/lib/posts.ts` |
| 页面元信息、主题初始化、切换动画 | `src/layouts/BaseLayout.astro` |
| 关于页正文 | `src/pages/about.md` |

主题层的进一步说明见 [src/theme/README.md](src/theme/README.md)。

## 部署

部署前，将 `src/theme/site.ts` 的 `site.url` 与 `astro.config.mjs` 的 `site` 配置为真实站点地址。这些配置用于生成 canonical、RSS、sitemap、社交分享图片和内容索引中的绝对链接。

```bash
pnpm build
pnpm preview
```

检查构建结果后，将 `dist/` 发布到静态托管平台。使用支持 Astro 的构建平台时，可按以下配置填写：

| 配置项 | 值 |
| --- | --- |
| Framework preset | `Astro` |
| Build command | `pnpm build` |
| Output directory | `dist` |
| Root directory | 项目所在目录；位于 monorepo 子目录时需单独指定 |

主题使用 `.html` 路由。仓库中的 [public/_redirects](public/_redirects) 提供旧斜杠路径和 `/posts/*` 到 `/blog/*` 的跳转规则；部署平台需要支持该文件或配置等价跳转。兼容文章页也会生成在 `/posts/:slug.html`。

## 页面与内容接口

| 地址 | 内容 |
| --- | --- |
| `/` | 首页 |
| `/blog.html`、`/blog/:slug.html` | 文章列表与详情 |
| `/categories.html`、`/categories/:category.html` | 分类列表与详情 |
| `/tags.html`、`/tags/:tag.html` | 标签列表与详情 |
| `/archive.html` | 年份归档 |
| `/projects.html` | 项目展示 |
| `/search.html` | 本地搜索 |
| `/about.html`、`/sponsor.html` | 关于与赞助 |
| `/rss.xml` | RSS 订阅 |
| `/sitemap.xml`、`/robots.txt` | 站点地图与爬虫规则 |
| `/llms.txt` | 站点简介及页面、文章、分类、标签和项目链接 |
| `/content-index.json` | 结构化内容索引 |

`llms.txt` 和内容索引提供可读取的站点信息，是否使用这些信息由访问工具决定。

## 项目结构

```text
.
├── .obsidian/             # Obsidian 写作配置
├── public/
│   ├── _redirects         # 路由跳转规则
│   ├── favicon.svg
│   └── images/
│       ├── posts/         # 文章图片
│       ├── projects/      # 项目图片
│       ├── site/          # 分享图、预览图、关于页图片
│       └── theme/         # Logo、头像、首页插画
├── src/
│   ├── content/blog/      # 文章、草稿与模板
│   ├── content.config.ts  # 内容加载规则与字段定义
│   ├── layouts/           # 页面布局
│   ├── lib/               # 文章、SEO、索引工具
│   ├── pages/             # 页面路由与内容接口
│   └── theme/             # 主题配置、组件与样式
├── astro.config.mjs
├── package.json
└── README.md
```

## 贡献

欢迎提交 issue 和 pull request，改进构建、中文排版、移动端体验、可访问性、文档和内容发现能力。

Inkstone 以 Astro、标准 Markdown、CSS 和少量原生 JavaScript 为基础。新增依赖时，请说明它解决的具体问题及维护成本，帮助主题保持简单、易于定制。

## 许可证

[MIT](LICENSE)
