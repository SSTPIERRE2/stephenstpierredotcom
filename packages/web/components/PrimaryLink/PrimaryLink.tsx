import {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  FC,
  PropsWithChildren,
} from 'react';
import styles from './PrimaryLink.module.css';
import Link from 'next/link';
import clsx from 'clsx';

interface Props
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  className?: string;
}

const PrimaryLink: FC<Props & PropsWithChildren> = ({
  href = '',
  title,
  children,
  className,
}) => {
  return (
    <Link
      className={clsx(styles.link, className)}
      href={href}
      title={title}
      target="_blank"
      rel="noreferrer noopener"
    >
      {children}
    </Link>
  );
};

export default PrimaryLink;
