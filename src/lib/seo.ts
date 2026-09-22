import { getAllCategories, getAllTags, getCategoryPath, getPostCategory, getPostDescription, getPostPath, getPostTitle, getPublishedPosts, getTagPath } from './posts';
import { projects, site } from '../theme/site';

export const toAbsoluteUrl = (pathname: string) => new URL(pathname, site.url).toString();

export const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const normalizeText = (value: string) => value.replace(/\s+/g, ' ').trim();

export const staticPages = [
  {
    path: '/',
    title: site.title,
    description: site.description,
    changefreq: 'weekly',
    priority: '1.0'
  },
  {
    path: '/blog.html',
    title: '博客',
    description: '阅读使用 Inkstone 发布的文章、教程、笔记和写作实践。',
    changefreq: 'weekly',
    priority: '0.9'
  },
  {
    path: '/projects.html',
    title: '项目',
    description: '展示作品、工具、开源项目、内容合集或长期维护的项目卡片。',
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    path: '/tags.html',
    title: '标签',
    description: '按主题标签浏览博客文章。',
    changefreq: 'weekly',
    priority: '0.6'
  },
  {
    path: '/categories.html',
    title: '分类',
    description: '按文章分类或 Obsidian 文件夹浏览内容。',
    changefreq: 'weekly',
    priority: '0.6'
  },
  {
    path: '/archive.html',
    title: '归档',
    description: '按年份归档浏览全部博客文章。',
    changefreq: 'weekly',
    priority: '0.6'
  },
  {
    path: '/search.html',
    title: '搜索',
    description: '搜索这个博客中的文章标题、摘要、发布时间、分类和主题标签。',
    changefreq: 'monthly',
    priority: '0.5'
  },
  {
    path: '/about.html',
    title: '关于',
    description: '了解 Astro Theme Inkstone 的设计理念、适用场景和自定义方式。',
    changefreq: 'monthly',
    priority: '0.5'
  },
  {
    path: '/sponsor.html',
    title: '赞助',
    description: '为博客、项目或开源工作添加赞助与支持入口。',
    changefreq: 'yearly',
    priority: '0.3'
  }
] as const;

export const getSitemapEntries = async () => {
  const posts = await getPublishedPosts();
  const tags = getAllTags(posts);
  const categories = getAllCategories(posts);

  return [
    ...staticPages.map((page) => ({
      loc: toAbsoluteUrl(page.path),
      changefreq: page.changefreq,
      priority: page.priority
    })),
    ...tags.map(({ tag }) => ({
      loc: toAbsoluteUrl(getTagPath(tag)),
      changefreq: 'weekly',
      priority: '0.5'
    })),
    ...categories.map(({ category }) => ({
      loc: toAbsoluteUrl(getCategoryPath(category)),
      changefreq: 'weekly',
      priority: '0.5'
    })),
    ...posts.map((post) => ({
      loc: toAbsoluteUrl(getPostPath(post)),
      lastmod: (post.data.updatedDate ?? post.data.pubDate)?.toISOString(),
      changefreq: 'monthly',
      priority: '0.8'
    }))
  ];
};

export const getContentIndex = async () => {
  const posts = await getPublishedPosts();
  const tags = getAllTags(posts);
  const categories = getAllCategories(posts);

  return {
    site: {
      title: site.title,
      description: site.description,
      url: site.url,
      language: site.lang,
      author: site.author,
      rss: toAbsoluteUrl('/rss.xml'),
      sitemap: toAbsoluteUrl('/sitemap.xml')
    },
    topics: site.topics,
    pages: staticPages.map((page) => ({
      title: page.title,
      description: page.description,
      url: toAbsoluteUrl(page.path)
    })),
    tags: tags.map(({ tag, count }) => ({
      name: tag,
      count,
      url: toAbsoluteUrl(getTagPath(tag))
    })),
    categories: categories.map(({ category, count }) => ({
      name: category,
      count,
      url: toAbsoluteUrl(getCategoryPath(category))
    })),
    projects: projects.map((project) => ({
      title: project.title,
      description: project.description,
      url: toAbsoluteUrl(project.url),
      category: project.stars
    })),
    posts: posts.map((post) => ({
      title: getPostTitle(post),
      description: normalizeText(getPostDescription(post)),
      url: toAbsoluteUrl(getPostPath(post)),
      publishedAt: post.data.pubDate?.toISOString(),
      updatedAt: post.data.updatedDate?.toISOString(),
      category: getPostCategory(post),
      tags: post.data.tags,
      image: post.data.cover ? toAbsoluteUrl(post.data.cover) : toAbsoluteUrl(site.defaultImage)
    }))
  };
};
