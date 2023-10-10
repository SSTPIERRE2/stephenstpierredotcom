import Image from 'next/image';
import styles from './page.module.css';
import avatar from '../content/assets/Avatar_2_2_2.png';
import SnackGallery from '@/components/SnackGallery/SnackGallery';
import PostGallery from '@/components/PostGallery/PostGallery';
import { AVATAR_HEIGHT_WIDTH_RATIO } from '@/utils/constant';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.greeting}>
        <div className={styles.greetingLeft}>
          <h2>Hi, I'm Stephen</h2>
          <p>I'm a Full Stack Developer from Boston, Massachusetts.</p>
        </div>
        <div className={styles.greetingRight}>
          <Image
            src={avatar}
            alt="Stephen's avatar"
            sizes="100vw"
            width={500 * AVATAR_HEIGHT_WIDTH_RATIO}
            height={500}
            style={{
              filter: `drop-shadow(
              2px 4px 32px hsl(0deg 0% 0% / 0.4)
            )`,
              width: '100%',
              height: 'auto',
              maxHeight: '400px',
              maxWidth: 400 * AVATAR_HEIGHT_WIDTH_RATIO,
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
      <SnackGallery />
      <PostGallery />
    </main>
  );
}
