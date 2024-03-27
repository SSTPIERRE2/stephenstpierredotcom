import 'react-loading-skeleton/dist/skeleton.css';
import styles from './PostCardSkeleton.module.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const PostCardSkeleton = () => {
  return (
    <SkeletonTheme
      baseColor="var(--color-skeleton)"
      highlightColor="var(--color-skeleton-highlight)"
    >
      <section className={styles.wrapper}>
        <h2>
          <Skeleton height={50} width={300} />
        </h2>

        {/* Publish date */}
        <span>
          <Skeleton height={20} width={100} />
        </span>

        {/* Tag list */}
        <div>
          <Skeleton height={20} width={250} />
        </div>

        {/* Abstract */}
        <p>
          <Skeleton height={100} width={400} />
        </p>

        {/* Read more */}
        <div>
          <Skeleton height={20} width={80} />
        </div>
      </section>
    </SkeletonTheme>
  );
};

export default PostCardSkeleton;
