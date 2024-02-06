import { NextPage } from 'next';
import styles from './page.module.css';
import { MDXRemote } from 'next-mdx-remote/rsc';
import COMPONENT_MAP from '@/utils/mdx-components';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import dayjs from 'dayjs';
import { Upvotes } from '@/components/Upvotes';
import { Post } from '@core/post';
import { Tag } from '@core/tag';
import PageViews from '@/components/PageViews';
import { marked } from 'marked';
import * as cheerio from 'cheerio';
import { headingLink } from '@/utils/constant';
import TableOfContents from '@/components/TableOfContents';

const getPostMetadata = cache(async (postSlug: string) => {
  let post, tags;

  try {
    post = await Post.getBySlug(postSlug);
    tags = await Tag.getAllByPostId(post.id);
    console.log(`got the post`, post);
  } catch (err) {
    console.log(`error getting post`, err);
    notFound();
  }

  const {
    id,
    title,
    slug,
    published_on: publishedOn,
    abstract,
    content,
    views,
    created,
    updated
  } = post;


  const htmlContent = await marked(content);
  const $ = cheerio.load(htmlContent, null, false);
  const headings = $('h2');

  const links: headingLink[] = [];

  headings.each((_index, heading) => {
    console.log($(heading).text(), $(heading).attr('id'));
    links.push({
      text: $(heading).text(),
      id: $(heading).attr('id') as string
    })
  }).toArray();

  console.log(`links`, links);


  return {
    id,
    title,
    slug,
    abstract,
    publishedOn,
    content,
    views,
    created,
    updated,
    tags,
    links
  };
});

export async function generateMetadata({ params: { postSlug } }: { params: { postSlug: string } }) {
  const { title, abstract } = await getPostMetadata(postSlug);

  return {
    title: `${title} • StephenStPierre.com`,
    description: abstract,
  };
}

const PostPage: NextPage<{ params: { postSlug: string; } }> = async ({ params: { postSlug } }) => {
  const test = await getPostMetadata(postSlug)
  const { id, title, slug, publishedOn, content, views, created, updated, tags, links } = test;

  return (
    <>
      <div className={styles.hero}>
        <div className={styles.heroWrapper}>
          <h1 id="section-title">{title}</h1>
          {tags.map((tag) => <span key={tag.id}>#{tag.name}</span>)}
        </div>
      </div>
      <main className={styles.main}>
        <aside className={styles.aside}>
          <div className={styles.sticky}>
            <TableOfContents slug={slug} links={links} />
            <Upvotes postId={id} visitorId='123' className={styles.upvotes} />
          </div>
        </aside>
        <article className={styles.article}>
          <MDXRemote source={content} components={COMPONENT_MAP} />
          <div>Last Updated: {dayjs(new Date(updated || created)).format('MMMM D, YYYY')}</div>
          <span>{dayjs(new Date(publishedOn || new Date())).format('MMMM D, YYYY')}</span>
          <PageViews id={id} initialViews={views} />
        </article>
      </main>
    </>
  );
}

export default PostPage;