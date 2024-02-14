import styles from './page.module.css';
import PostGallery from '@/components/PostGallery';
import RetroGrid from '@/components/RetroGrid';
import Oasis from '@/components/Oasis';
import FullBleed from '@/components/FullBleed';
import PrimaryLink from '@/components/PrimaryLink';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.greeting}>
        <div className={styles.greetingLeft}>
          <h1 className={styles.mainHeading}>Hey, I'm Stephen!</h1>
          <p>
            I'm a full stack JavaScript developer from{' '}
            <em className={styles.emphasized}>Boston, Massachusetts.</em>
          </p>

          <p>
            Welcome to my <em className={styles.emphasized}>digital oasis,</em>{' '}
            a curated collection of programming tips and tricks. Please enjoy,
            vote on what you like, and share with your friends and colleagues!
          </p>

          <h2 className={styles.heading}>Looking for work!</h2>
          <p>
            <PrimaryLink href="/about">Read more about me here</PrimaryLink> or{' '}
            <PrimaryLink
              href="/Resume2023.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              view my resume
            </PrimaryLink>
          </p>
        </div>
        <div className={styles.greetingRight}>
          <div className={styles.retroSunWrapper}>
            <div className={styles.retroSun} />
          </div>
          <Oasis className={styles.oasis} />
        </div>
      </div>

      <PostGallery />

      <FullBleed>
        <RetroGrid />
      </FullBleed>
    </main>
  );
}
