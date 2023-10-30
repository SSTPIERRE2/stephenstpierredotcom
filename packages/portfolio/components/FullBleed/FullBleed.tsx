import { FC, PropsWithChildren } from 'react';
import styles from './FullBleed.module.css';

const FullBleed: FC<PropsWithChildren> = ({ children }) => (
  <div className={styles.wrapper}>{children}</div>
);

export default FullBleed;
