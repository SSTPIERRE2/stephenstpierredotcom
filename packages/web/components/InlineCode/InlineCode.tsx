import { ReactNode } from 'react';
import styles from './InlineCode.module.css';

interface Props {
  children: ReactNode;
}

const InlineCode = ({ children }: Props) => {
  return <code className={styles.code}>{children}</code>;
};

export default InlineCode;
