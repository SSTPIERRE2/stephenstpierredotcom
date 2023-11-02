import styles from './page.module.css';
import SnackGallery from '@/components/SnackGallery/SnackGallery';
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
          <h2>Hey, I'm Stephen!</h2>
          <p>
            I'm a full stack JavaScript developer from{' '}
            <h2 className={styles.gradientText}>Boston, Massachusetts.</h2>
          </p>
          <br></br>
          <p>
            Welcome to my{' '}
            <h2 className={styles.gradientText}>digital oasis,</h2>
          </p>
          <p>
            a curated collection of programming tips and tricks. Please enjoy
            and vote on what you like!
          </p>
          <br></br>
          <h2 className={styles.gradientText}>Looking for work!</h2>
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
