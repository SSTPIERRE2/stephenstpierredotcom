import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import range from '@/utils/range';

const TagSkeleton = () => {
  const min = 30;
  const max = 100;

  return (
    <SkeletonTheme
      baseColor="var(--color-skeleton)"
      highlightColor="var(--color-skeleton-highlight)"
    >
      {range(10).map((num) => (
        <Skeleton
          key={num}
          height={20}
          width={Math.random() * (max - min) + min}
        />
      ))}
    </SkeletonTheme>
  );
};

export default TagSkeleton;
