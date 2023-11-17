import { FC, PropsWithChildren } from 'react';
import styles from './FullBleed.module.css';
import clsx from 'clsx';

interface Props {
  className?: string;
}

const FullBleed: FC<PropsWithChildren & Props> = ({ className, children }) => (
  <div className={clsx(styles.wrapper, className)}>{children}</div>
);

export default FullBleed;
