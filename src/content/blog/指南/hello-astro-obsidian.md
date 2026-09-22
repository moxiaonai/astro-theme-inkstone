---
title: "用 Obsidian 写作，用 Astro 发布"
urlSlug: hello-astro-obsidian
description: "这篇示例文章展示 Inkstone 的 Markdown 写作约定、文件夹分类和静态发布流程。"
pubDate: 2026-09-19
tags: ["Astro", "Obsidian", "Markdown"]
draft: false
cover: "/images/posts/hello-astro-obsidian.png"
featured: false
---

这篇文章位于 src/content/blog/指南/。Inkstone 会把 src/content/blog 下的一级文件夹当作分类，所以它会出现在“指南”分类里。

## 写文章时的约定

每篇文章开头保留一段 frontmatter：

~~~md
---
title: "文章标题"
urlSlug: "article-slug"
description: "一句话摘要"
pubDate: 2026-09-19
tags: ["Astro", "Obsidian"]
draft: false
---
~~~

urlSlug 用来生成英文链接。这样文章可以放在中文文件夹里，也能生成稳定、适合分享的 URL。

图片建议放到 public/images/posts/，然后用标准 Markdown 引用：

~~~md
![图片说明](/images/posts/example.png)
~~~

站点会忽略 draft: true 的草稿，适合先在 Obsidian 里慢慢写，准备发布时再改成 false。

## 本地预览

在项目目录运行：

~~~bash
pnpm dev
~~~

发布前运行：

~~~bash
pnpm build
~~~
