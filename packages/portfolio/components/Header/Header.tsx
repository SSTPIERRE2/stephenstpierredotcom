import { PropsWithChildren } from 'react';
import styles from './header.module.css';

const Header: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <header className={`${styles.sticky} ${styles.header}`}>{children}</header>
  );
};

export default Header;
