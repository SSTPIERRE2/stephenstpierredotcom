import styles from './PostCardSkeleton.module.css';
import Skeleton from 'react-loading-skeleton';

const PostCardSkeleton = () => {
  return (
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
  );
};

export default PostCardSkeleton;
