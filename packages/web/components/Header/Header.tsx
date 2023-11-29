import styles from './Header.module.css';
import Icon from '../Logo/Icon';
import { Rss } from 'react-feather';
import DarkLightToggle from '../DarkLightToggle';
import VisuallyHidden from '../VisuallyHidden';
import NavBar from '../NavBar';

const Header = () => {
  return (
    <header className={styles.header}>
      <Icon />

      <NavBar />

      <div className={styles.right}>
        <DarkLightToggle />
        <button className={styles.action}>
          <Rss size="1.5rem" />
          <VisuallyHidden>RSS Feed</VisuallyHidden>
        </button>
      </div>
    </header>
  );
};

export default Header;
