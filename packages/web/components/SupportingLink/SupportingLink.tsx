import styles from './SupportingLink.module.css';
import Link from 'next/link';
import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';

interface Props {
  href: string;
  title?: string;
  active?: boolean;
}

const SupportingLink: FC<Props & PropsWithChildren> = ({
  active,
  href,
  children,
  ...props
}) => {
  return (
    <Link
      className={clsx(styles.link, active && styles.active)}
      href={href}
      prefetch={false}
      {...props}
    >
      {children}
    </Link>
  );
};

export default SupportingLink;
