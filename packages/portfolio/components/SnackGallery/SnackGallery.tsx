import range from '@/utils/range';
import TextWithBorder from '../TextWithBorder';
import styles from './snackGallery.module.css';

const SnackGallery = () => {
  return (
    <div className={styles.container}>
      <TextWithBorder>Code Snacks</TextWithBorder>
      <div className={styles.gallery}>
        {range(10).map((num) => (
          <div className={styles.box} key={num} />
        ))}
      </div>
    </div>
  );
};

export default SnackGallery;
