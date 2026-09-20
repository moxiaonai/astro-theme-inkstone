import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export const getPostSlug = (post: BlogPost) =>
  String(post.slug ?? post.id).replace(/\.(md|mdx)$/i, '').replace(/\/index$/i, '');

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

export const getTagPath = (tag: string) => `/tags/${encodeURIComponent(tag)}/`;

export const groupPostsByYear = (posts: BlogPost[]) => {
  const years = new Map<string, BlogPost[]>();
  for (const post of posts) {
    const year = String(post.data.pubDate?.getFullYear() ?? '未归档');
    years.set(year, [...(years.get(year) ?? []), post]);
  }
  return [...years.entries()].sort((a, b) => Number(b[0]) - Number(a[0]));
};
