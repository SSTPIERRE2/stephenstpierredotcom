import styles from './page.module.css';
import Image from 'next/image';
import avatar from '../../content/assets/crossed_arms_nowatermark.png';

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <div className={styles.greeting}>
        <div className={styles.greetingLeft}>
          <h2>Hi, I'm Stephen</h2>
          <p>I'm a Full Stack Developer from Boston, Massachusetts.</p>
        </div>
        <div className={styles.greetingRight}>
          <div className={styles.flourish} />
          <Image
            src={avatar}
            alt="Stephen's avatar"
            sizes="100vw"
            width={427 * 0.8356}
            height={511}
            style={{
              filter: `drop-shadow(
              2px 4px 32px hsl(0deg 0% 0% / 0.4)
            )`,
              width: '100%',
              height: 'auto',
              maxHeight: '400px',
              maxWidth: 400 * 0.8356, // height-width ratio
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </main>
  );
}
