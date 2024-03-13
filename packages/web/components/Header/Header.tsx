import styles from './Header.module.css';
import Icon from '../Logo/Icon';
import { Rss } from 'react-feather';
import DarkLightToggle from '../DarkLightToggle';
import VisuallyHidden from '../VisuallyHidden';
import NavBar from '../NavBar';
import Link from 'next/link';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Icon />

        <NavBar />

        <div className={styles.right}>
          <DarkLightToggle />
          <Link href="/rss.xml" className={styles.action}>
            <Rss size="1.5rem" />
            <VisuallyHidden>RSS Feed</VisuallyHidden>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
