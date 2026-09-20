# Astro Theme Inkstone

> 一款面向 **Obsidian 本地写作 + Astro 静态发布** 的优雅个人博客主题。  
> 像砚台一样安静、耐看，适合长期写作与持续沉淀。

![Astro](https://img.shields.io/badge/Astro-5.x-ff5d01?logo=astro&logoColor=white)
![Markdown](https://img.shields.io/badge/Markdown%20%2F%20MDX-ready-111827?logo=markdown&logoColor=white)
![Obsidian](https://img.shields.io/badge/Obsidian-friendly-7c3aed?logo=obsidian&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-10b981)

Astro Theme Inkstone 是一个为中文技术博客、个人知识库和长期写作设计的 Astro 主题。你可以直接把仓库作为 Obsidian vault 使用，在本地用 Markdown / MDX 写文章，再通过 Astro 构建成可部署到 Cloudflare Pages、Vercel、Netlify、GitHub Pages 等平台的纯静态站点。

它的视觉风格偏现代极简：克制的留白、细腻的网格背景、卡片式文章列表、中文友好的阅读宽度、Light / Dark 双主题，以及从切换按钮处像墨水一样展开的主题切换动画。

## 为什么叫 Inkstone？

Inkstone 是“砚台”。这个名字想表达的是：一个博客主题不需要一直追逐短期热闹，它更应该像一个稳定、耐看的写作器物，陪你长期记录、打磨、发布。

- **Ink**：写作、表达、知识流动。
- **Stone**：稳定、克制、可以长期维护。
- **Obsidian-friendly**：适合把本地 Markdown 知识库发布成静态博客。

如果你想要一个既能写技术文章，也能沉淀个人项目、笔记和长期思考的博客主题，Inkstone 会很适合。

## 特性

- **Obsidian 写作友好**：项目根目录可以直接作为 Obsidian vault 打开，文章放在 `src/content/blog`，图片放在 `public/images/posts`，使用标准 Markdown 图片路径即可发布。
- **Astro 5 + Content Collections**：基于 Astro 内容集合管理 Markdown / MDX，支持标题、摘要、发布日期、更新日期、标签、封面图、草稿状态等 frontmatter。
- **完整博客页面**：内置首页、博客列表、文章详情、标签页、归档页、项目页、搜索页、关于页、赞助页、RSS、sitemap、robots、`llms.txt` 和结构化内容索引。
- **本地搜索**：构建时生成文章索引，前端直接搜索标题、摘要、日期和标签，不依赖 Algolia、数据库或第三方服务。
- **标签与归档**：自动聚合标签，按年份生成归档，适合长期内容积累。
- **SEO 友好**：内置 canonical URL、Open Graph、Twitter Card、文章 JSON-LD、RSS、sitemap 和 robots.txt。
- **LLM / AI 友好**：提供 `/llms.txt` 和 `/content-index.json`，方便 AI 工具、搜索引擎和内容聚合工具理解站点结构。
- **Light / Dark 双主题**：支持系统偏好、用户本地选择和 `localStorage` 持久化。
- **墨水扩散式主题切换动画**：使用自绘 DOM 遮罩实现从按钮位置展开 / 收起的圆形过渡，并兼容 `prefers-reduced-motion`。
- **中文阅读体验优化**：适合中文博客的正文宽度、行距、标题层级、代码块、引用、卡片和响应式布局。
- **纯静态部署**：构建产物是 `dist`，无需后端服务。

## 预览

你可以先在本地启动预览。正式开源时，建议在这里补上在线 Demo 和浅色 / 深色截图。

```txt
Demo: https://your-domain.com
Repository: https://github.com/your-name/astro-theme-inkstone
```

## 快速开始

推荐使用 Node.js 20+ 和 pnpm 10+。

```bash
pnpm install
pnpm dev
```

启动后访问：

```txt
http://127.0.0.1:4321/
```

常用命令：

```bash
pnpm dev       # 本地开发，默认 127.0.0.1:4321
pnpm build     # 构建静态站点到 dist
pnpm preview   # 本地预览构建结果，默认 127.0.0.1:4322
pnpm obsidian  # macOS 下用 Obsidian 打开当前目录
```

## 用 Obsidian 写文章

你可以直接把项目根目录作为 Obsidian vault 打开。仓库里已经带了一份最小 Obsidian 配置：

```txt
.obsidian/app.json
```

默认约定：

| 内容 | 位置 |
| --- | --- |
| 文章 | `src/content/blog` |
| 文章图片 | `public/images/posts` |
| 项目图片 | `public/images/projects` |
| 站点图片 | `public/images/site` |
| 主题图片 | `public/images/theme` |

在文章中引用图片时，建议使用从 `public` 根目录开始的路径：

```md
![图片说明](/images/posts/example.png)
```

这样 Obsidian 中容易维护，Astro 构建后也能正常访问。

## 文章 frontmatter

新建文章时建议使用下面的格式：

```md
---
title: "文章标题"
description: "一句话摘要"
pubDate: 2026-09-19
updatedDate: 2026-09-20
tags: ["Astro", "Obsidian", "Markdown"]
draft: false
cover: "/images/posts/example.png"
featured: false
---

这里开始写正文。
```

字段说明：

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `title` | `string` | 发布时必填 | 文章标题 |
| `description` | `string` | 否 | 摘要，会显示在列表、搜索结果和 SEO 描述中 |
| `pubDate` | `date` | 发布时必填 | 发布日期 |
| `updatedDate` | `date` | 否 | 更新日期 |
| `tags` | `string[]` | 否 | 标签，默认空数组 |
| `draft` | `boolean` | 否 | 为 `true` 时不会出现在公开文章列表 |
| `cover` | `string` | 否 | 文章封面图路径 |
| `featured` | `boolean` | 否 | 预留字段，可用于扩展精选文章 |

为了方便在 Obsidian 中先写草稿，缺少 `title`、缺少 `pubDate` 或设置了 `draft: true` 的文章不会进入公开博客列表。

## 个性化配置

主题配置集中在 `src/theme/site.ts`。你通常只需要改这个文件，就能完成大部分站点定制。

| 想修改 | 文件 |
| --- | --- |
| 站点标题、副标题、描述、域名 | `src/theme/site.ts` |
| 作者名、作者页地址 | `src/theme/site.ts` |
| 首页 Hero 文案 | `src/theme/site.ts` |
| 导航菜单 | `src/theme/site.ts` |
| 社交链接 | `src/theme/site.ts` |
| 首页主题方向说明 | `src/theme/site.ts` |
| 项目卡片 | `src/theme/site.ts` |
| 友情链接 | `src/theme/site.ts` |
| 颜色、字体、间距、圆角 | `src/theme/styles/theme.css` |
| Header、Footer、Logo、卡片组件 | `src/theme/components/*` |

部署到线上前，记得把 `site.url` 和 `astro.config.mjs` 里的 `site` 改成你的真实域名。它会影响 canonical URL、RSS、sitemap、Open Graph 图片和 `llms.txt` 中的链接。

## 页面路由

| 路由 | 说明 |
| --- | --- |
| `/` | 首页 |
| `/blog/` | 全部文章 |
| `/blog/:slug/` | 文章详情 |
| `/posts/:slug/` | 文章详情兼容路由 |
| `/tags/` | 标签列表 |
| `/tags/:tag/` | 标签文章列表 |
| `/archive/` | 年份归档 |
| `/projects/` | 项目页 |
| `/search/` | 本地搜索 |
| `/about/` | 关于页 |
| `/sponsor/` | 赞助页 |
| `/rss.xml` | RSS Feed |
| `/sitemap.xml` | Sitemap |
| `/robots.txt` | Robots |
| `/llms.txt` | 面向 AI / LLM 的站点说明 |
| `/content-index.json` | 结构化内容索引 |

## 项目结构

```txt
.
├── .obsidian/
│   └── app.json
├── public/
│   ├── _redirects
│   ├── favicon.svg
│   └── images/
│       ├── posts/       # 文章封面与正文图片
│       ├── projects/    # 项目卡片图片
│       ├── site/        # 社交分享图、关于页图片等
│       └── theme/       # Logo、头像、首页插画
├── src/
│   ├── content/
│   │   └── blog/        # Markdown / MDX 文章
│   ├── layouts/         # 页面布局
│   ├── lib/             # 文章、SEO、索引等工具函数
│   ├── pages/           # Astro 页面路由
│   └── theme/
│       ├── components/  # 主题组件
│       ├── styles/      # 全局主题样式
│       ├── site.ts      # 站点配置
│       └── README.md    # 主题层说明
├── astro.config.mjs
├── package.json
└── README.md
```

## SEO 与内容发现

Inkstone 默认生成这些面向搜索引擎、社交平台和 AI 工具的内容：

- `canonical` URL
- Open Graph meta
- Twitter Card
- 文章 JSON-LD
- `rss.xml`
- `sitemap.xml`
- `robots.txt`
- `llms.txt`
- `content-index.json`

其中 `/llms.txt` 会输出站点简介、核心页面、文章、标签和项目列表；`/content-index.json` 会输出结构化索引，便于 AI 工具读取和引用。

## 部署

构建命令：

```bash
pnpm build
```

构建产物：

```txt
dist
```

常见部署平台配置：

| 平台配置 | 值 |
| --- | --- |
| Install command | `pnpm install` |
| Build command | `pnpm build` |
| Output directory | `dist` |

如果你把主题放在 monorepo 的子目录中，记得在部署平台设置对应的 Root directory。

Cloudflare Pages 可以使用仓库里的 `public/_redirects`。如果你不需要 `/posts/*` 到 `/blog/*` 的兼容跳转，可以删除这条规则。

## 从这个主题开始写自己的博客

你可以按这个顺序初始化：

1. 修改 `src/theme/site.ts` 中的站点信息、作者、域名、导航和社交链接。
2. 替换 `public/favicon.svg`。
3. 替换 `public/images/site/social-card.svg`。
4. 替换 `public/images/theme/site-logo.svg`、头像和首页插画。
5. 删除或改写 `src/content/blog` 中的示例文章。
6. 修改 `src/pages/about.md`。
7. 如果不需要赞助页，可以从导航里移除 `/sponsor/`。
8. 运行 `pnpm build` 检查构建是否通过。
9. 部署到你喜欢的静态托管平台。

## 设计理念

Inkstone 的目标不是做一个塞满功能的博客系统，而是提供一个清晰、稳定、可长期维护的写作起点。

它更关注这些事情：

- 写文章时尽量简单。
- 改站点信息时有明确入口。
- 页面结构清晰，不把内容藏在复杂配置里。
- 静态站点优先，降低部署和维护成本。
- 中文阅读体验优先。
- 默认对搜索引擎和 AI 工具友好。
- 视觉上安静，但有一点记忆点。

## 开源前建议

如果你准备把自己的版本继续开源，建议检查：

- `package.json` 中的 `name`、`description`、`license` 字段。
- `astro.config.mjs` 中的 `site`。
- `src/theme/site.ts` 中是否仍有个人域名、昵称或社交链接。
- `public/_redirects` 中是否仍有旧域名。
- `public/images` 中是否包含不希望公开的图片。
- 是否已经添加 `LICENSE` 文件。
- README 中是否已经补充 Demo 地址和截图。

## 贡献

欢迎提交 issue 和 pull request。适合贡献的方向：

- 修复构建、样式或可访问性问题。
- 改进中文排版和移动端体验。
- 增加更清晰的文档和示例。
- 优化 SEO、RSS、sitemap、`llms.txt` 等内容发现能力。
- 提供不同风格的示例配置。

为了保持主题轻量，建议优先使用 Astro、标准 Markdown、CSS 和少量原生 JavaScript。新增依赖前请先说明使用场景和取舍。

## License

[MIT](./LICENSE)
