import { Post } from '@core/post-dynamo';
import RSS from 'rss';
import { Table } from 'sst/node/table';

const PostTable = Table.Post.tableName;

export default async function generateRssFeed() {
  const site_url =
    process.env.NODE_ENV === 'production' ?
      'https://StephenStPierre.com'
    : 'localhost:3000';

  const posts = await Post.queryPublished(PostTable);

  const feedOptions = {
    title: 'Stephen St.Pierre Codes',
    description: "Stephen St.Pierre's Developer Blog",
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    image_url: `${site_url}/logo.png`,
    managingEditor: 'stephencstpierre@gmail.com (Stephen St.Pierre)',
    webMaster: 'stephencstpierre@gmail.com (Stephen St.Pierre)',
    pubDate: new Date(),
    copyright: `Copyright ${new Date().getFullYear().toString()}, Stephen St.Pierre`,
  };

  const feed = new RSS(feedOptions);

  posts.map((post) => {
    feed.item({
      title: post.title,
      description: post.abstract,
      url: `${site_url}/blog/${post.slug}`,
      date: post.publishedOn,
      categories: post.tags || [],
      author: 'Stephen St.Pierre',
    });
  });

  return feed;
}
