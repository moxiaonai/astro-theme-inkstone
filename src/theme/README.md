# Inkstone theme layer

src/theme contains the reusable visual and configuration layer for Astro Theme Inkstone.

## Files

~~~txt
src/theme/
  site.ts                  # site metadata, navigation, hero copy, projects, friends
  styles/theme.css         # design tokens, light/dark themes, layouts, prose styles
  components/              # header, footer, logo, cards, divider, hero illustration
~~~

Page routes live in `src/pages`, content lives in `src/content/blog`, and shared content helpers live in `src/lib`.

## Configuration

Most site-level customization starts in `src/theme/site.ts`:

- site.title, site.description, site.url, site.author
- site.nav and site.social
- site.hero
- site.topics
- projects
- site.friends

The default build uses Astro file-format output, so public pages are generated as .html files such as /blog.html and /blog/my-post.html.

## Content conventions

Published posts need title and pubDate, and must not have `draft: true`.

~~~md
---
title: "Post title"
urlSlug: "post-slug"
category: "指南"
description: "Short summary"
pubDate: 2026-09-19
tags: ["Astro", "Obsidian"]
draft: false
cover: "/images/posts/example.png"
---
~~~

The first folder under `src/content/blog` becomes the category. A post at `src/content/blog/指南/example.md` belongs to the 指南 category. Posts directly under src/content/blog are assigned to 未分类.

Use `urlSlug` when the Markdown file name or folder name contains Chinese or other non-ASCII characters. Category and tag URLs use `taxonomySlugMap` in `src/lib/posts.ts`; add mappings there for non-ASCII category or tag names.

## Design tokens

Main tokens are defined in `src/theme/styles/theme.css` under `:root` and `:root.dark`:

- --bg, --panel, --panel-soft
- --text, --text-strong, --muted, --subtle
- --line, --line-soft, --line-strong
- --accent-orange, --accent-blue, --accent-green
- --radius-xl, --radius-2xl
- --max-w-4xl, --max-w-5xl

## Built-in pages

- Home, blog, post detail, categories, tags, archive, projects, search, about, sponsor
- RSS, sitemap, robots, `llms.txt`, and `content-index.json`
- Legacy `/posts/*` compatibility routes redirect to canonical `/blog/*.html` URLs on hosts that support `_redirects`

## 路由与分类

文章默认输出为 `/blog/{slug}.html`。`urlSlug` 可以显式控制英文永久链接；`category` 可以显式设置分类，未设置时会读取文章所在的一级文件夹，根目录文章归入“未分类”。如果新增中文分类或中文标签，请在 `src/lib/posts.ts` 的 `taxonomySlugMap` 中补充英文 slug。
