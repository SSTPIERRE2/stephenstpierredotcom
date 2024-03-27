import Link from 'next/link';
import styles from './Primary.module.css';
import VisuallyHidden from '../VisuallyHidden';
import clsx from 'clsx';

const Logo = () => {
  return (
    <Link href="/" id="logo" className={styles.wrapper} prefetch={false}>
      <span className={clsx(styles.text, styles.primary)}>Stephen</span>
      <span className={clsx(styles.text, styles.accent)}>Stephen</span>
      <div className={clsx(styles.wrapper, styles.lastNameWrapper)}>
        <span className={clsx(styles.text, styles.primary)}>St.Pierre</span>
        <span className={clsx(styles.text, styles.accent)}>St.Pierre</span>
      </div>
      <VisuallyHidden>Home</VisuallyHidden>
    </Link>
  );
};

export default Logo;
