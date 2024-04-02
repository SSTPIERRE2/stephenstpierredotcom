import styles from './PostCardSkeleton.module.css';
import Skeleton from 'react-loading-skeleton';

const PostCardSkeleton = () => {
  return (
    <section className={styles.wrapper}>
      <h2>
        <Skeleton height={50} width="85%" />
      </h2>

      {/* Publish date */}
      <span>
        <Skeleton height={20} width={100} />
      </span>

      {/* Tag list */}
      <div>
        <Skeleton height={20} width="60%" />
      </div>

      {/* Abstract */}
      <p>
        <Skeleton height={100} />
      </p>

      {/* Read more */}
      <div>
        <Skeleton height={20} width={80} />
      </div>
    </section>
  );
};

export default PostCardSkeleton;
