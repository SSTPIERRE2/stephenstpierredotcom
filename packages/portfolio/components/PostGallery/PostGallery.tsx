import range from '@/utils/range';
import TextWithBorder from '../TextWithBorder';
import styles from './PostGallery.module.css';
import Link from 'next/link';

const PostGallery = () => {
  return (
    <div className={styles.container}>
      <TextWithBorder as={Link} href="/posts" className={styles.link}>
        Blog Posts
      </TextWithBorder>
      <div className={styles.gallery}>
        {range(10).map((num) => (
          <div className={styles.box} key={num} />
        ))}
      </div>
    </div>
  );
};

export default PostGallery;
