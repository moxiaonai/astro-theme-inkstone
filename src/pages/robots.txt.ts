import { site } from '../theme/site';

export function GET() {
  const sitemapUrl = new URL('/sitemap.xml', site.url).toString();
  const llmsUrl = new URL('/llms.txt', site.url).toString();
  const contentIndexUrl = new URL('/content-index.json', site.url).toString();
  const host = new URL(site.url).host;
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${sitemapUrl}`,
    `Host: ${host}`,
    '',
    '# GEO / LLM discovery',
    `# LLM guide: ${llmsUrl}`,
    `# Structured content index: ${contentIndexUrl}`
  ].join('\n');

  return new Response(`${body}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}
