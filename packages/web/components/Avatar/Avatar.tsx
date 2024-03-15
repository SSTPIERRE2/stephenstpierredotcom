import styles from './Avatar.module.css';
import Image from 'next/image';

const aspectRatio = 704 / 1031;

const Avatar = () => {
  return (
    <Image
      src="/avatar.png"
      alt="Picture of Stephen"
      sizes="33vw"
      className={styles.base}
      width={350 * aspectRatio}
      height={350}
      style={{
        width: '100%',
        height: 'auto',
      }}
      priority
    />
  );
};

export default Avatar;
