import Link from 'next/link';
import SupportingLink from '../SupportingLink';
import styles from './PostCard.module.css';
import { ArrowRight } from 'react-feather';
import dayjs from '@/utils/extendedDayJs';
import VisuallyHidden from '../VisuallyHidden';

interface Props {
  title: string;
  slug: string;
  abstract: string;
  publishedOn: number;
  tags: string[];
  // Only use updated for big updates
  updated: string | undefined;
}

const PostCard = ({ title, slug, abstract, publishedOn, tags }: Props) => {
  const newThreshold = dayjs().subtract(2, 'weeks');
  const isNew = dayjs(publishedOn).isSameOrAfter(newThreshold);

  return (
    <article className={styles.wrapper}>
      <div className={styles.content}>
        <Link href={`/blog/${slug}`}>
          <h2 className={styles.title}>{title}</h2>
        </Link>

        <span className={styles.publishDate}>
          {dayjs.utc(new Date(publishedOn)).format('MMMM D, YYYY')}
        </span>
        <div className={styles.tagList}>
          {tags.map((tag) => (
            <SupportingLink key={tag} href={`/blog/tags/${tag}`}>
              #{tag}
            </SupportingLink>
          ))}
        </div>
        <p>{abstract}</p>
        <div className={styles.bottomRow}>
          <Link
            href={`/blog/${slug}`}
            className={styles.readMore}
            prefetch={false}
          >
            Read more <VisuallyHidden>about this post</VisuallyHidden>
            <ArrowRight className={styles.readMoreArrow} size="1.25rem" />
          </Link>
          {isNew && <div className={styles.newIndicator}>New!</div>}
        </div>
      </div>
    </article>
  );
};

export default PostCard;
