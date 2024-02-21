import Link from 'next/link';
import SupportingLink from '../SupportingLink';
import styles from './PostCard.module.css';
import { ArrowRight } from 'react-feather';

interface Props {
  title: string;
  slug: string;
  abstract: string;
  publishedOn: string | null;
  tags: string[];
}

const PostCard = ({ title, slug, abstract, publishedOn, tags }: Props) => {
  return (
    <article className={styles.wrapper}>
      <div className={styles.content}>
        <Link href={`/blog/${slug}`}>
          <h2 className={styles.title}>{title}</h2>
        </Link>

        <span>{publishedOn}</span>
        <div className={styles.tagList}>
          {tags.map((tag) => (
            <SupportingLink key={tag} href={`/blog/tags/${tag}`}>
              #{tag}
            </SupportingLink>
          ))}
        </div>
        <p>{abstract}</p>
        <Link href={`/blog/${slug}`} className={styles.readMore}>
          Read more{' '}
          <ArrowRight className={styles.readMoreArrow} size="1.25rem" />
        </Link>
      </div>
    </article>
  );
};

export default PostCard;
