import Link from 'next/link';
import styles from './Icon.module.css';
import VisuallyHidden from '../VisuallyHidden';
import clsx from 'clsx';

const Icon = () => {
  return (
    <Link href="/" className={styles.wrapper} prefetch={false}>
      <span className={clsx(styles.text, styles.accent)}>S</span>
      <span className={clsx(styles.text, styles.primary)}>S</span>
      <div className={clsx(styles.border, styles.bottomLeft)} />
      <div className={clsx(styles.border, styles.topRight)} />
      <VisuallyHidden>Home</VisuallyHidden>
    </Link>
  );
};

export default Icon;
