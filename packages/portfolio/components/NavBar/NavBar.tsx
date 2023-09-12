import Link from 'next/link';
import styles from './navBar.module.css';
import { SubMark } from '../Logo';

const NavBar = () => {
  const isAuthed = true;
  const path = isAuthed ? '/dashboard' : '/dashboard/public';

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Link href="/" id="logo">
          <SubMark size={48} />
        </Link>
      </div>
      <Link href="/blog" id="blogLink">
        Blog
      </Link>
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
