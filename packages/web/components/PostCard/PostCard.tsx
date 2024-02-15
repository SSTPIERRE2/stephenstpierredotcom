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
      <Link href={`/blog/${slug}`} className={styles.content}>
        <h2>{title}</h2>
        <span>{publishedOn}</span>
        <div className={styles.tagList}>
          {tags.map((tag) => (
            <SupportingLink key={tag} href={`/blog/tags/${tag}`}>
              #{tag}
            </SupportingLink>
          ))}
        </div>
        <p>{abstract}</p>
        <div className={styles.readMore}>
          Read more{' '}
          <ArrowRight className={styles.readMoreArrow} size="1.25rem" />
        </div>
      </Link>
    </article>
  );
};

export default PostCard;
