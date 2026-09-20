import { escapeXml, getSitemapEntries } from '../lib/seo';

export async function GET() {
  const entries = await getSitemapEntries();
  const urls = entries
    .map((entry) => {
      const lastmod = entry.lastmod ? `<lastmod>${escapeXml(entry.lastmod)}</lastmod>` : '';
      return [
        '<url>',
        `<loc>${escapeXml(entry.loc)}</loc>`,
        lastmod,
        `<changefreq>${entry.changefreq}</changefreq>`,
        `<priority>${entry.priority}</priority>`,
        '</url>'
      ].filter(Boolean).join('');
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
}
