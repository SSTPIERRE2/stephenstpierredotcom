import 'react-loading-skeleton/dist/skeleton.css';
import range from '@/utils/range';
import PostCardSkeleton from '../PostCardSkeleton';
import { SkeletonTheme } from 'react-loading-skeleton';

interface Props {
  numPosts?: number;
}

const PostSkeletonGallery = ({ numPosts = 4 }: Props) => {
  return (
    <SkeletonTheme
      baseColor="var(--color-skeleton)"
      highlightColor="var(--color-skeleton-highlight)"
    >
      {range(numPosts).map((num) => (
        <PostCardSkeleton key={num} />
      ))}
    </SkeletonTheme>
  );
};

export default PostSkeletonGallery;
