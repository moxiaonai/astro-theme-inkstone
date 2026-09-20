# Inkstone Theme Layer

这是 Astro Theme Inkstone 的主题层。它负责站点配置、主题组件、全局样式 token、首页视觉、文章卡片、项目卡片和深浅色切换体验。

## 目录

```txt
src/theme/
  site.ts                  # 站点标题、导航、首页文案、项目、友情链接
  styles/theme.css         # 设计 tokens、深浅色、布局、卡片、文章排版
  components/              # 导航、页脚、Logo、卡片、分割线、首页插画
```

页面入口在 `src/pages`，文章内容在 `src/content/blog`，内容与主题层保持相对清晰的边界。

## 常用修改

| 想修改 | 文件 |
| --- | --- |
| 站点标题、描述、作者、域名 | `site.ts` |
| 首页 Hero 文案和 CTA | `site.ts` |
| 导航、社交链接、友链 | `site.ts` |
| 项目卡片 | `site.ts` |
| 颜色、字体、圆角、阴影、布局宽度 | `styles/theme.css` |
| Header、Footer、Logo、文章卡片、项目卡片 | `components/*` |

## 设计 tokens

主要 token 在 `src/theme/styles/theme.css` 的 `:root` 和 `:root.dark` 中维护：

- `--bg` / `--panel` / `--panel-soft`：页面和卡片背景
- `--text` / `--text-strong` / `--muted` / `--subtle`：正文层级
- `--line` / `--line-soft` / `--line-strong`：边框、虚线和分割线
- `--accent-orange` / `--accent-blue` / `--accent-green`：渐变和项目卡强调色
- `--radius-xl` / `--radius-2xl`：圆角系统
- `--max-w-4xl` / `--max-w-5xl`：内容宽度

## 写作约定

发布文章需要 frontmatter：

```md
---
title: "文章标题"
description: "一句话摘要"
pubDate: 2026-09-19
tags: ["Astro", "Obsidian"]
draft: false
cover: "/images/posts/example.png"
---
```

空白笔记、缺少 `title` / `pubDate` 的文件，或设置了 `draft: true` 的文件不会进入公开博客列表，方便先在 Obsidian 中慢慢写草稿。
