import { getContentIndex } from '../lib/seo';

export async function GET() {
  const index = await getContentIndex();

  return new Response(JSON.stringify(index, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}
