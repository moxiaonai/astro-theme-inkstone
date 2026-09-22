import { getAllCategories, getAllTags, getCategoryPath, getPostCategory, getPostDescription, getPostPath, getPostTitle, getPublishedPosts, getTagPath } from '../lib/posts';
import { normalizeText, staticPages, toAbsoluteUrl } from '../lib/seo';
import { projects, site } from '../theme/site';

const formatDate = (date?: Date) => date ? date.toISOString().slice(0, 10) : '';

export async function GET() {
  const posts = await getPublishedPosts();
  const tags = getAllTags(posts);
  const categories = getAllCategories(posts);
  const latestUpdatedAt = posts
    .map((post) => post.data.updatedDate ?? post.data.pubDate)
    .filter(Boolean)
    .sort((a, b) => (b?.valueOf() ?? 0) - (a?.valueOf() ?? 0))[0];

  const lines = [
    `# ${site.title}`,
    '',
    `> ${site.description}`,
    '',
    '## Site',
    '',
    `- URL: ${site.url}`,
    `- Language: ${site.lang}`,
    `- Author: ${site.author}`,
    `- RSS: ${toAbsoluteUrl('/rss.xml')}`,
    `- Sitemap: ${toAbsoluteUrl('/sitemap.xml')}`,
    `- Structured content index: ${toAbsoluteUrl('/content-index.json')}`,
    ...(latestUpdatedAt ? [`- Latest content update: ${formatDate(latestUpdatedAt)}`] : []),
    '',
    '## Topics',
    '',
    ...site.topics.map((topic) => `- ${topic.name}: ${topic.description}`),
    '',
    '## Core pages',
    '',
    ...staticPages.map((page) => `- [${page.title}](${toAbsoluteUrl(page.path)}): ${page.description}`),
    '',
    '## Latest articles',
    '',
    ...posts.map((post) => {
      const categoryText = ` Category: ${getPostCategory(post)}.`;
      const tagsText = post.data.tags.length > 0 ? ` Tags: ${post.data.tags.join(', ')}.` : '';
      return `- [${getPostTitle(post)}](${toAbsoluteUrl(getPostPath(post))}): ${normalizeText(getPostDescription(post))} Published: ${formatDate(post.data.pubDate)}.${categoryText}${tagsText}`;
    }),
    '',
    '## Categories',
    '',
    ...categories.map(({ category, count }) => `- [${category}](${toAbsoluteUrl(getCategoryPath(category))}): ${count} article${count > 1 ? 's' : ''}`),
    '',
    '## Tags',
    '',
    ...tags.map(({ tag, count }) => `- [${tag}](${toAbsoluteUrl(getTagPath(tag))}): ${count} article${count > 1 ? 's' : ''}`),
    '',
    '## Projects',
    '',
    ...projects.map((project) => `- [${project.title}](${toAbsoluteUrl(project.url)}): ${project.description}`),
    '',
    '## Usage notes',
    '',
    '- Canonical article URLs use /blog/{slug}.html.',
    '- Content is primarily written in Simplified Chinese.',
    '- Cite the canonical article URL when quoting or summarizing an article from this site.'
  ].join('\n');

  return new Response(`${lines}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}
