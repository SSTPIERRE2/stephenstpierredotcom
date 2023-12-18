import { NextPage } from 'next';
import styles from './page.module.css';
import { MDXRemote } from 'next-mdx-remote/rsc';
import COMPONENT_MAP from '@/utils/mdx-components';
import { cache } from 'react';
import { loadBlogPost } from '@/utils/file-helpers';
import { notFound } from 'next/navigation';
import dayjs from 'dayjs';


const getPostMetadata = cache(async (postSlug: string) => {
  let post;

  try {
    post = await loadBlogPost(postSlug);
  } catch (err) {
    notFound();
  }

  const {
    frontmatter: { title, publishedOn, abstract },
    content,
  } = post;

  return {
    title: `${title} • StephenStPierre.com`,
    abstract,
    publishedOn,
    content,
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
  const { title, publishedOn, content } = await getPostMetadata(postSlug);

  return (
    <main className={styles.main}>
      <h2>{title}</h2>
      <span>{dayjs(new Date(publishedOn)).format('MMMM D, YYYY')}</span>
      <MDXRemote source={content} components={COMPONENT_MAP} />
    </main>
  );
}

export default PostPage;