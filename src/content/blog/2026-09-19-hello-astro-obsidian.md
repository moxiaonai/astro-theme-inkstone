---
title: "用 Obsidian 写作，用 Astro 发布"
description: "这是第一篇示例文章，用来验证 Markdown、frontmatter、图片和标签是否工作正常。"
pubDate: 2026-09-19
tags: ["Astro", "Obsidian", "Markdown"]
draft: false
cover: "/images/posts/hello-astro-obsidian.png"
---

这篇文章位于 <code>src/content/blog/</code>。你可以在 Obsidian 中直接编辑它，Astro 会在构建时把它发布成静态页面。

## 写文章时的约定

每篇文章开头保留一段 frontmatter：

~~~md
---
title: "文章标题"
description: "一句话摘要"
pubDate: 2026-09-19
tags: ["Astro", "Obsidian"]
draft: false
---
~~~

图片建议放到 <code>public/images/posts/</code>，然后用标准 Markdown 引用：

~~~md
![图片说明](/images/posts/example.png)
~~~

站点会忽略 <code>draft: true</code> 的草稿，适合先在 Obsidian 里慢慢写，准备发布时再改成 <code>false</code>。

## 本地预览

在博客目录运行：

~~~bash
pnpm dev
~~~

发布前运行：

~~~bash
pnpm build
~~~
