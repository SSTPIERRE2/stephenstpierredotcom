import { FC, PropsWithChildren } from 'react';
import styles from './PrimaryLink.module.css';
import Link from 'next/link';

interface Props {
  href: string;
  title?: string;
}

const PrimaryLink: FC<Props & PropsWithChildren> = ({
  href,
  children,
  ...props
}) => {
  return (
    <Link className={styles.link} href={href} {...props}>
      {children}
    </Link>
  );
};

export default PrimaryLink;
