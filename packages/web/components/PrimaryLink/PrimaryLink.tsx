import { AnchorHTMLAttributes, FC, PropsWithChildren } from 'react';
import styles from './PrimaryLink.module.css';
import Link from 'next/link';
import clsx from 'clsx';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
}

const PrimaryLink: FC<Props & PropsWithChildren> = ({
  href = '',
  title,
  children,
  className,
  ...props
}) => {
  return (
    <Link
      className={clsx(styles.link, className)}
      href={href}
      title={title}
      prefetch={false}
      {...props}
    >
      {children}
    </Link>
  );
};

export const PrimaryNewTabLink = (props: Props & PropsWithChildren) => (
  <PrimaryLink target="_blank" rel="noreferrer noopener" {...props} />
);

export default PrimaryLink;
