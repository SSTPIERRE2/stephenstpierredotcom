import Link from 'next/link';
import Logo from '../Logo/Logo';
import styles from './navBar.module.css';

const NavBar = () => {
  const isAuthed = true;
  const path = isAuthed ? '/dashboard' : '/dashboard/public';

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Logo />
      </div>
      <Link href="/projects" id="projectsLink">
        Projects
      </Link>
      <Link as="/dashboard" href={path} id="dashboardLink">
        Dashboard
      </Link>
    </nav>
  );
};

export default NavBar;
