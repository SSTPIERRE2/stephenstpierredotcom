import { PropsWithChildren } from 'react';
import styles from './textWithBorder.module.css';

const TextWithBorder = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.wrapper}>
      <h2>{children}</h2>
      <div className={styles.border} />
    </div>
  );
};

export default TextWithBorder;
