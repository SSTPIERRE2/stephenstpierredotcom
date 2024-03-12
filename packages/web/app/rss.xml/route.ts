import generateRssFeed from '@/utils/generateRSSFeed';

export async function GET() {
  const feed = await generateRssFeed();

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
