import styles from './Avatar.module.css';
import Image from 'next/image';

const Avatar = () => {
  return (
    <Image
      src="/avatar.png"
      alt="Picture of Stephen"
      sizes="33vw"
      className={styles.base}
      width={250}
      height={350}
      priority
    />
  );
};

export default Avatar;
