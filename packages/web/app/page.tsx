import styles from './page.module.css';
import RetroGrid from '@/components/RetroGrid';
import Oasis from '@/components/Oasis';
import FullBleed from '@/components/FullBleed';
import PrimaryLink, { PrimaryNewTabLink } from '@/components/PrimaryLink';
import TextWithBorder from '@/components/TextWithBorder';
import Link from 'next/link';
import PostGalleryContainer from '@/components/PostGalleryContainer';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.greeting}>
        <div className={styles.greetingLeft}>
          <h1 className={styles.mainHeading}>Hey, I'm Stephen!</h1>
          <p>
            I'm a full-stack JavaScript developer from{' '}
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
            <PrimaryNewTabLink href="/Resume2024.pdf">
              view my resume
            </PrimaryNewTabLink>
          </p>
        </div>
        <div className={styles.greetingRight}>
          <div className={styles.retroSunWrapper}>
            <div className={styles.retroSun} />
          </div>
          <Oasis className={styles.oasis} />
        </div>
      </div>

      <div className={styles.postsContainer}>
        <TextWithBorder as={Link} href="/blog" className={styles.postsLink}>
          Blog Posts
        </TextWithBorder>
        <PostGalleryContainer />
      </div>

      <FullBleed>
        <RetroGrid />
      </FullBleed>
    </main>
  );
}
