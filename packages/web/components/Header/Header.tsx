import { PropsWithChildren } from 'react';
import styles from './Header.module.css';

const Header: React.FC<PropsWithChildren> = ({ children }) => {
  return <header className={styles.header}>{children}</header>;
};

export default Header;
