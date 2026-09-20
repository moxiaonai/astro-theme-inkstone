---
layout: ../layouts/MarkdownPageLayout.astro
title: "关于"
description: "关于 Astro Theme Inkstone：一个适合 Obsidian 写作与 Astro 静态发布的主题。"
---

![一张由砚台、代码窗口和网格线条组成的关于页顶图](/images/site/about-hero.svg)

Inkstone 是一个为长期写作准备的 Astro 主题。它把内容放在第一位：你可以在 Obsidian 里写 Markdown，把图片和附件保存在本地目录，再用 Astro 生成一个轻量、快速、好部署的静态站点。

这个页面是示例关于页。你可以把它改成个人介绍、博客说明、项目履历、联系方式，或者保留为主题说明。

## 适合谁使用

- 想把 Obsidian 笔记发布成个人博客的人。
- 想搭一个轻量、可控、没有后端依赖的技术博客的人。
- 想要中文阅读体验、标签、归档、RSS 和本地搜索的人。
- 想把文章、项目和长期思考放在同一个静态站点里的人。

## 这个主题强调什么

- **写作路径清晰**：文章在 `src/content/blog`，图片在 `public/images/posts`。
- **配置入口集中**：站点标题、导航、社交链接和项目卡片都在 `src/theme/site.ts`。
- **页面完整**：博客、标签、归档、搜索、RSS、sitemap、`llms.txt` 都已准备好。
- **视觉克制**：细网格、卡片、留白和深浅色切换让页面保持安静，但不显得空。
- **静态优先**：构建产物可以部署到常见静态托管平台。

## 使用前建议

正式发布前，建议你修改这些内容：

1. 把 `src/theme/site.ts` 改成自己的站点信息。
2. 替换 `public/images/site/social-card.svg` 和 `public/images/theme/site-logo.svg`。
3. 删除或改写 `src/content/blog` 里的示例文章。
4. 把这个关于页改成自己的介绍。
5. 运行 `pnpm build` 检查构建结果。

愿这个主题像一方砚台，安静地承载你的文字、代码和想法。
