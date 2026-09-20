import { getPublishedPosts, getPostDescription, getPostSlug, getPostTitle } from '../lib/posts';
import { escapeXml, toAbsoluteUrl } from '../lib/seo';
import { site } from '../theme/site';

export async function GET() {
  const posts = await getPublishedPosts();
  const rssUrl = toAbsoluteUrl('/rss.xml');
  const latestPostDate = posts
    .map((post) => post.data.updatedDate ?? post.data.pubDate)
    .filter(Boolean)
    .sort((a, b) => (b?.valueOf() ?? 0) - (a?.valueOf() ?? 0))[0];
  const items = posts
    .map((post) => {
      const href = toAbsoluteUrl(`/blog/${getPostSlug(post)}/`);
      const categories = post.data.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('');

      return [
        '<item>',
        `<title>${escapeXml(getPostTitle(post))}</title>`,
        `<link>${escapeXml(href)}</link>`,
        `<guid isPermaLink="true">${escapeXml(href)}</guid>`,
        `<pubDate>${post.data.pubDate?.toUTCString()}</pubDate>`,
        post.data.updatedDate ? `<atom:updated>${post.data.updatedDate.toISOString()}</atom:updated>` : '',
        `<dc:creator>${escapeXml(site.author)}</dc:creator>`,
        categories,
        `<description>${escapeXml(getPostDescription(post))}</description>`,
        '</item>'
      ].filter(Boolean).join('');
    })
    .join('');
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    '<channel>',
    `<title>${escapeXml(site.title)}</title>`,
    `<link>${escapeXml(site.url)}</link>`,
    `<atom:link href="${escapeXml(rssUrl)}" rel="self" type="application/rss+xml" />`,
    `<description>${escapeXml(site.description)}</description>`,
    `<language>${escapeXml(site.lang)}</language>`,
    `<copyright>© ${new Date().getFullYear()} ${escapeXml(site.author)}</copyright>`,
    latestPostDate ? `<lastBuildDate>${latestPostDate.toUTCString()}</lastBuildDate>` : '',
    '<ttl>60</ttl>',
    items,
    '</channel>',
    '</rss>'
  ].filter(Boolean).join('');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8'
    }
  });
}
