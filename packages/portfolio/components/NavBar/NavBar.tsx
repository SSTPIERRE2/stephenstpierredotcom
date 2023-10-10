import Link from 'next/link';
import styles from './navBar.module.css';
import { SubMark } from '../Logo';
import { Rss, Sun } from 'react-feather';

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
      <div className={styles.middle}>
        <Link href="/about" id="aboutLink">
          About
        </Link>
        <Link href="/snacks" id="snacksLink">
          Snacks
        </Link>
        <Link as="/posts" href={path} id="postsLink">
          Posts
        </Link>
      </div>
      <div className={styles.right}>
        <a>
          <Sun />
        </a>
        <a>
          <Rss />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
