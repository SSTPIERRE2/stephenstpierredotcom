import StackCarousel from '@/components/StackCarousel';
import styles from './page.module.css';
import Avatar from '@/components/Avatar';
import FullBleed from '@/components/FullBleed';

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <div className={styles.greeting}>
        <div className={styles.greetingLeft}>
          <h2>Hey, I'm Stephen!</h2>
          <p>I'm a Full Stack Developer from Boston, Massachusetts.</p>
        </div>
        <div className={styles.greetingRight}>
          <div className={styles.flourish} />
          <Avatar />
        </div>
      </div>

      <h2 style={{ margin: '1rem 0' }}>Tech Stack</h2>
      <FullBleed className={styles.carouselWrapper}>
        <StackCarousel />
      </FullBleed>
    </main>
  );
}
