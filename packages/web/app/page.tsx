import styles from './page.module.css';
import TipGallery from '@/components/TipGallery/TipGallery';
import PostGallery from '@/components/PostGallery/PostGallery';
import RetroGrid from '@/components/RetroGrid';
import Oasis from '@/components/Oasis';
import Link from 'next/link';
import FullBleed from '@/components/FullBleed';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.greeting}>
        <div className={styles.greetingLeft}>
          <h2 className={styles.mainHeading}>Hey, I'm Stephen!</h2>
          <p>
            I'm a full stack JavaScript developer from{' '}
            <span className={styles.gradientText}>Boston, Massachusetts.</span>
          </p>

          <p>
            Welcome to my{' '}
            <span className={styles.gradientText}>digital oasis,</span> a
            curated collection of programming tips and tricks. Please enjoy,
            vote on what you like, and share with your friends and colleagues!
          </p>

          <h2 className={`${styles.gradientText} ${styles.heading}`}>
            Looking for work!
          </h2>
          <p>
            <Link href="/about" className={styles.simpleLink}>
              Read more about me here
            </Link>{' '}
            or{' '}
            <Link
              href="/Resume2023.pdf"
              className={styles.simpleLink}
              target="_blank"
              rel="noopener noreferrer"
              locale={false}
            >
              view my resume
            </Link>
          </p>
        </div>
        <div className={styles.greetingRight}>
          <div className={styles.retroSunWrapper}>
            <div className={styles.retroSun} />
          </div>
          <Oasis className={styles.oasis} />
        </div>
      </div>

      <TipGallery />

      <PostGallery />

      <FullBleed>
        <RetroGrid />
      </FullBleed>
    </main>
  );
}
