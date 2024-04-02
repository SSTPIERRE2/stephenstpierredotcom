import { NextPage } from 'next';
import styles from './page.module.css';
import { MDXRemote } from 'next-mdx-remote/rsc';
import COMPONENT_MAP from '@/utils/mdx-components';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import { Upvotes } from '@/components/Upvotes';
import { Post } from '@core/post';
import PageViews from '@/components/PageViews';
import { marked } from 'marked';
import * as cheerio from 'cheerio';
import { headingLink } from '@/utils/constant';
import TableOfContents from '@/components/TableOfContents';
import SupportingLink from '@/components/SupportingLink';
import slugify from '@/utils/slugify';
import dayjs from '@/utils/extendedDayJs';
import LogRocket from 'logrocket';
import PostMetadata from './PostMetadata';

const getPostMetadata = cache(async (postSlug: string) => {
  const post = await Post.getBySlug(postSlug);

  if (post) {
    const htmlContent = await marked(post.content);
    const $ = cheerio.load(htmlContent, null, false);
    const headings = $('h2');

    const links: headingLink[] = [];

    headings
      .each((_index, heading) => {
        const text = $(heading).text();
        const id = $(heading).attr('id');

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

    return {
      ...post,
      links,
    };
  } else {
    LogRocket.captureException(new Error(`Post not found: ${postSlug}`));
    notFound();
  }
});

export const metadata = {
  title: `Loading... • StephenStPierre.com`,
  description: 'Post is loading...',
};

const PostPage: NextPage<{ params: { postSlug: string } }> = async ({
  params: { postSlug },
}) => {
  const {
    id,
    title,
    abstract,
    slug,
    publishedOn,
    content,
    views,
    created,
    updated,
    tags,
    links,
    likes,
  } = await getPostMetadata(postSlug);

  return (
    <>
      <PostMetadata title={title} abstract={abstract} tags={tags} />
      <div className={styles.hero}>
        <div className={styles.heroWrapper}>
          <h1 id="title" className={styles.title}>
            {title}
          </h1>
          <div className={styles.tagList}>
            {tags.map((tag) => (
              <SupportingLink key={tag} href={`/blog/tags/${tag}`}>
                #{tag}
              </SupportingLink>
            ))}
          </div>
        </div>
      </div>
      <main className={styles.main}>
        <aside className={styles.aside}>
          <TableOfContents slug={slug} links={links} />
          <Upvotes
            postId={id}
            initialVotes={likes}
            className={styles.upvotes}
          />
        </aside>
        <article className={styles.article}>
          <MDXRemote source={content} components={COMPONENT_MAP} />
          <div className={styles.info}>
            <div className={styles.infoLeft}>
              <h4 className={styles.infoHeading}>LAST UPDATED</h4>
              <p>
                {dayjs
                  .utc(new Date(updated || publishedOn || created))
                  .format('MMMM D, YYYY')}
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
