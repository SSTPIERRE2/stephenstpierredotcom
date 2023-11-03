import styles from './page.module.css';
import SnackGallery from '@/components/TipGallery/TipGallery';
import PostGallery from '@/components/PostGallery/PostGallery';
import RetroGrid from '@/components/RetroGrid';
import FullBleed from '@/components/FullBleed';
import Oasis from '@/components/Oasis';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.greeting}>
        <div className={styles.greetingLeft}>
          <h2 style={{ marginBottom: '1rem' }}>Hey, I'm Stephen!</h2>
          <p>
            I'm a full stack JavaScript developer from{' '}
            <span className={styles.gradientText}>Boston, Massachusetts.</span>
          </p>

          <p
            style={{
              margin: '1rem 0',
            }}
          >
            Welcome to my{' '}
            <span className={styles.gradientText}>digital oasis,</span> a
            curated collection of programming tips and tricks. Please enjoy and
            vote on what you like!
          </p>

          <h2
            className={styles.gradientText}
            style={{ fontSize: '1.5rem', marginBottom: '0.2rem' }}
          >
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

      <SnackGallery />

      <PostGallery />

      <FullBleed>
        <RetroGrid />
      </FullBleed>
    </main>
  );
}
