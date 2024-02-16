import styles from './Avatar.module.css';
import avatar from '../../content/assets/avatar.png';
import Image from 'next/image';

const Avatar = () => {
  return (
    <Image
      src={avatar}
      alt="Stephen's avatar"
      sizes="100vw"
      className={styles.base}
      priority
    />
  );
};

export default Avatar;
