import 'react-loading-skeleton/dist/skeleton.css';
import styles from './TagSkeletonSidebar.module.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import range from '@/utils/range';

const TagSkeletonSidebar = () => {
  const min = 30;
  const max = 100;

  return (
    <SkeletonTheme
      baseColor="var(--color-skeleton)"
      highlightColor="var(--color-skeleton-highlight)"
    >
      <aside className={styles.aside}>
        <h2>Tags</h2>
        <div className={styles.flexRow}>
          {range(10).map((num) => (
            <Skeleton
              key={num}
              height={20}
              width={Math.random() * (max - min) + min}
            />
          ))}
        </div>
      </aside>
    </SkeletonTheme>
  );
};

export default TagSkeletonSidebar;
