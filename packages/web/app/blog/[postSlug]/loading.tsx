import 'react-loading-skeleton/dist/skeleton.css';
import range from '@/utils/range';
import styles from './loading.module.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function Loading() {
  return (
    <SkeletonTheme
      baseColor="var(--color-skeleton)"
      highlightColor="var(--color-skeleton-highlight)"
    >
      <div className={styles.hero}>
        <div className={styles.heroWrapper}>
          <h1>
            <Skeleton height={50} width="70%" />
          </h1>
          <div className={styles.tagList}>
            {range(5).map((num) => (
              <Skeleton
                key={num}
                height={20}
                width={Math.random() * (100 - 30) + 30}
              />
            ))}
          </div>
        </div>
      </div>
      <main className={styles.main}>
        <aside className={styles.aside}>
          <h3>TABLE OF CONTENTS</h3>
          {range(4).map((num) => (
            <Skeleton
              key={num}
              height={20}
              width={Math.random() * (240 - 80) + 80}
            />
          ))}
        </aside>
        <article className={styles.article}>
          <Skeleton height={60} width="90%" />
          <Skeleton height={120} width="90%" />
          <Skeleton height={80} width="90%" />
          <Skeleton height={40} width="90%" />
          <Skeleton height={60} width="90%" />
          <Skeleton height={120} width="90%" />
        </article>
      </main>
    </SkeletonTheme>
  );
}
