import range from '@/utils/range';
import styles from './PostSkeletonGallery.module.css';
import PostCardSkeleton from '../PostCardSkeleton';

interface Props {
  numPosts?: number;
}

const PostSkeletonGallery = ({ numPosts = 4 }: Props) => {
  return (
    <div className={styles.gallery}>
      {range(numPosts).map((num) => (
        <PostCardSkeleton key={num} />
      ))}
    </div>
  );
};

export default PostSkeletonGallery;
