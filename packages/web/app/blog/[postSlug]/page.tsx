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
import SupportingLink from '@/components/SupportingLink';
import slugify from '@/utils/slugify';

const getPostMetadata = cache(async (postSlug: string) => {
  let post, tags;

  console.log(`getPostMetadata`, postSlug);

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
    updated,
  } = post;

  const htmlContent = await marked(content);
  const $ = cheerio.load(htmlContent, null, false);
  const headings = $('h2');

  const links: headingLink[] = [];

  headings
    .each((_index, heading) => {
      const text = $(heading).text();
      const id = $(heading).attr('id');

      console.log(text, $(heading).attr('id'));
      // Ignore h2's in demos
      if (id?.includes('demo')) {
        return;
      }

      links.push({
        text,
        id: slugify(text),
      });
    })
    .toArray();

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
    links,
  };
});

export async function generateMetadata({
  params: { postSlug },
}: {
  params: { postSlug: string };
}) {
  const { title, abstract } = await getPostMetadata(postSlug);

  return {
    title: `${title} • StephenStPierre.com`,
    description: abstract,
  };
}

const PostPage: NextPage<{ params: { postSlug: string } }> = async ({
  params: { postSlug },
}) => {
  console.log(`Hello PostPage`, postSlug);

  const test = await getPostMetadata(postSlug);
  const {
    id,
    title,
    slug,
    publishedOn,
    content,
    views,
    created,
    updated,
    tags,
    links,
  } = test;

  return (
    <>
      <div className={styles.hero}>
        <div className={styles.heroWrapper}>
          <h1 id="title" className={styles.title}>
            {title}
          </h1>
          <div className={styles.tagList}>
            {tags.map((tag) => (
              <SupportingLink key={tag.id} href={`/blog/tags/${tag.name}`}>
                #{tag.name}
              </SupportingLink>
            ))}
          </div>
        </div>
      </div>
      <main className={styles.main}>
        <aside className={styles.aside}>
          <TableOfContents slug={slug} links={links} />
          <Upvotes postId={id} visitorId="123" className={styles.upvotes} />
        </aside>
        <article className={styles.article}>
          <MDXRemote source={content} components={COMPONENT_MAP} />
          <div className={styles.info}>
            <div className={styles.infoLeft}>
              <h4 className={styles.infoHeading}>LAST UPDATED</h4>
              <p>
                {dayjs(new Date(updated || publishedOn || created)).format(
                  'MMMM D, YYYY',
                )}
              </p>
            </div>

            <div className={styles.infoRight}>
              <h4 className={styles.infoHeading}>HITS</h4>
              <PageViews id={id} initialViews={views} />
            </div>
          </div>
        </article>
      </main>
    </>
  );
};

export default PostPage;
