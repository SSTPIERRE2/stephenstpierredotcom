import { NextPage } from 'next';
import styles from './page.module.css';
import { MDXRemote } from 'next-mdx-remote/rsc';
import COMPONENT_MAP from '@/utils/mdx-components';
import { cache } from 'react';
import { loadBlogPost } from '@/utils/file-helpers';
import { notFound } from 'next/navigation';
import dayjs from 'dayjs';
import { Upvotes } from '@/components/Upvotes';
import { Post } from '@core/post';
import PageViews from '@/components/PageViews';


const getPostMetadata = cache(async (postSlug: string) => {
  let post, id, views, created, updated;

  try {
    post = await loadBlogPost(postSlug);
    ({ id, views, created, updated } = await Post.getBySlug(postSlug));
  } catch (err) {
    notFound();
  }

  const {
    frontmatter: { title, publishedOn, abstract },
    content,
  } = post;

  return {
    id,
    title: `${title} • StephenStPierre.com`,
    abstract,
    publishedOn,
    content,
    views,
    created,
    updated
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
  const { id, title, publishedOn, content, views, created, updated } = await getPostMetadata(postSlug);

  return (
    <main className={styles.main}>
      <h2>{title}</h2>
      <span>{dayjs(new Date(publishedOn)).format('MMMM D, YYYY')}</span>
      <Upvotes postId={id} visitorId='123' />
      <MDXRemote source={content} components={COMPONENT_MAP} />
      <div>Last Updated: {dayjs(new Date(updated || created)).format('MMMM D, YYYY')}</div>
      <PageViews id={id} initialViews={views} />
    </main>
  );
}

export default PostPage;