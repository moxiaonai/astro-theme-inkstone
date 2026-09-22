import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export const uncategorizedCategory = '未分类';

const taxonomySlugMap: Record<string, string> = {
  未分类: 'uncategorized',
  博客: 'blog',
  指南: 'guide',
  设计: 'design',
  主题: 'theme',
  写作: 'writing',
  项目: 'projects',
  随笔: 'notes',
  工作: 'work',
  前端: 'frontend',
  技术: 'tech',
  博客主题: 'blog-theme',
  开源: 'open-source',
  中文博客: 'chinese-blog',
  静态站点: 'static-site'
};

const normalizeSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, '')
    .replace(/\.html$/i, '');

const ensureAsciiSlug = (slug: string, post: BlogPost) => {
  if (/^[a-z0-9][a-z0-9/-]*$/.test(slug)) return slug;

  throw new Error(
    `文章 ${post.id} 需要配置英文 urlSlug。当前会生成非英文 URL：${slug || '(empty)'}`
  );
};

const slugifyText = (value: string) => {
  const mapped = taxonomySlugMap[value];
  if (mapped) return mapped;

  if (/[^\x00-\x7F]/.test(value)) {
    throw new Error(`分类或标签 “${value}” 需要先在 taxonomySlugMap 里配置英文 URL slug。`);
  }

  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  if (slug) return slug;

  throw new Error(`分类或标签 “${value}” 无法生成有效的英文 URL slug。`);
};

export const getPostSlug = (post: BlogPost) =>
  ensureAsciiSlug(
    normalizeSlug(
      post.data.urlSlug ||
      String(post.slug ?? post.id).replace(/\.(md|mdx)$/i, '').replace(/\/index$/i, '')
    ),
    post
  );

export const getPostRouteSlug = (post: BlogPost) => getPostSlug(post);

export const getPostPath = (post: BlogPost) => '/blog/' + getPostSlug(post) + '.html';

const getPostSourceSegments = (post: BlogPost) =>
  String(post.slug ?? post.id).replace(/\.(md|mdx)$/i, '').split('/').filter(Boolean);

export const isPublishedPost = (post: BlogPost) =>
  !post.data.draft && Boolean(post.data.title) && Boolean(post.data.pubDate);

export const getPostTitle = (post: BlogPost) => post.data.title ?? getPostSlug(post);

export const getPostDescription = (post: BlogPost) => post.data.description ?? '';

export const getPublishedPosts = async () => {
  const posts = await getCollection('blog');
  return posts
    .filter(isPublishedPost)
    .sort((a, b) => (b.data.pubDate?.valueOf() ?? 0) - (a.data.pubDate?.valueOf() ?? 0));
};

export const formatDate = (date?: Date) => {
  if (!date) return '';
  return new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
};

export const getReadingTime = (post: BlogPost) => {
  const body = post.body ?? '';
  const chineseChars = body.match(/[\u4e00-\u9fff]/g)?.length ?? 0;
  const latinWords = body.replace(/[\u4e00-\u9fff]/g, ' ').match(/[A-Za-z0-9_]+/g)?.length ?? 0;
  return `${Math.max(1, Math.ceil((chineseChars / 450) + (latinWords / 220)))} 分钟`;
};

export const getAllTags = (posts: BlogPost[]) => {
  const counts = new Map<string, number>();
  for (const post of posts) for (const tag of post.data.tags ?? []) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  return [...counts.entries()].map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, 'zh-CN'));
};

export const getTagSlug = (tag: string) => slugifyText(tag);

export const getTagPath = (tag: string) => '/tags/' + getTagSlug(tag) + '.html';

const getContentFolderCategories = () => {
  try {
    return readdirSync(resolve(process.cwd(), 'src/content/blog'), { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.') && !entry.name.startsWith('_'))
      .map((entry) => entry.name);
  } catch {
    return [];
  }
};

export const getPostCategory = (post: BlogPost) => {
  if (post.data.category) return post.data.category;

  const [category, ...rest] = getPostSourceSegments(post);
  return category && rest.length > 0 ? category : uncategorizedCategory;
};

export const getAllCategories = (posts: BlogPost[]) => {
  const counts = new Map<string, number>();
  for (const category of getContentFolderCategories()) counts.set(category, 0);
  for (const post of posts) {
    const category = getPostCategory(post);
    counts.set(category, (counts.get(category) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category, 'zh-CN'));
};

export const getCategorySlug = (category: string) => slugifyText(category);

export const getCategoryPath = (category: string) => '/categories/' + getCategorySlug(category) + '.html';

export const groupPostsByYear = (posts: BlogPost[]) => {
  const years = new Map<string, BlogPost[]>();
  for (const post of posts) {
    const year = String(post.data.pubDate?.getFullYear() ?? '未归档');
    years.set(year, [...(years.get(year) ?? []), post]);
  }
  return [...years.entries()].sort((a, b) => Number(b[0]) - Number(a[0]));
};
