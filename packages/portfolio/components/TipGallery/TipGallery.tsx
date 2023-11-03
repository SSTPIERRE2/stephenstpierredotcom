import range from '@/utils/range';
import TextWithBorder from '../TextWithBorder';
import styles from './TipGallery.module.css';
import Link from 'next/link';

const TipGallery = () => {
  return (
    <div className={styles.container}>
      <TextWithBorder as={Link} href="/snacks" className={styles.link}>
        Coding Tips
      </TextWithBorder>
      <div className={styles.gallery}>
        {range(10).map((num) => (
          <div className={styles.box} key={num} />
        ))}
      </div>
    </div>
  );
};

export default TipGallery;
