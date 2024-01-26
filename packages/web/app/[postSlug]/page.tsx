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

const getPostMetadata = cache(async (postSlug: string) => {
  let post, tags;

  try {
    post = await Post.getBySlug(postSlug);
    tags = await Tag.getAllByPostId(post.id);
    console.log(`got the post`, post);
  } catch (err) {
    notFound();
  }

  const {
    id,
    title,
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

  headings.each((_index, heading) => {
    console.log($(heading).text());
  })

  return {
    id,
    title: `${title} • StephenStPierre.com`,
    abstract,
    publishedOn,
    content,
    views,
    created,
    updated,
    tags
  };
});

export async function generateMetadata({ params: { postSlug } }: { params: { postSlug: string } }) {
  const { title, abstract } = await getPostMetadata(postSlug);

  return {
    title,
    description: abstract,
  };
}

const PostPage: NextPage<{ params: { postSlug: string; } }> = async ({ params: { postSlug } }) => {
  const test = await getPostMetadata(postSlug)
  const { id, title, publishedOn, content, views, created, updated, tags } = test;

  console.log(`Hello PostPage`, test);


  return (
    <main className={styles.main}>
      <h2>{title}</h2>
      <span>{dayjs(new Date(publishedOn || new Date())).format('MMMM D, YYYY')}</span>
      <Upvotes postId={id} visitorId='123' />
      <div>
        <h3>Tags</h3>
        {tags.map((tag) => <span key={tag.id}>#{tag.name}</span>)}
      </div>
      <MDXRemote source={content} components={COMPONENT_MAP} />
      <div>Last Updated: {dayjs(new Date(updated || created)).format('MMMM D, YYYY')}</div>
      <PageViews id={id} initialViews={views} />
    </main>
  );
}

export default PostPage;