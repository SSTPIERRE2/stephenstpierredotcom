import styles from './page.module.css';
import Avatar from '@/components/Avatar';

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
    </main>
  );
}
