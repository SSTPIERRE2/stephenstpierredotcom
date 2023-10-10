import range from '@/utils/range';
import TextWithBorder from '../TextWithBorder';
import styles from './postGallery.module.css';

const PostGallery = () => {
  return (
    <div className={styles.container}>
      <TextWithBorder>Blog Posts</TextWithBorder>
      <div className={styles.gallery}>
        {range(10).map((num) => (
          <div className={styles.box} key={num} />
        ))}
      </div>
    </div>
  );
};

export default PostGallery;
