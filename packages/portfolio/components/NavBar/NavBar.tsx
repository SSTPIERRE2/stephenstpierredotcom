'use client';

import Link from 'next/link';
import styles from './navBar.module.css';
import { SubMark } from '../Logo';
import { Rss } from 'react-feather';
import { motion } from 'framer-motion';
import { useState } from 'react';
import DarkLightToggle from '../DarkLightToggle';
import { THEME } from '@/utils/constant';

type slug = 'about' | 'snacks' | 'posts';

const NavBar = ({ theme }: { theme: THEME }) => {
  const [hoveredLink, setHoveredLink] = useState<slug>();
  const isAuthed = true;
  const path = isAuthed ? '/dashboard' : '/dashboard/public';

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement> & { target: { id: slug } }
  ) => {
    console.log(`clicked a nav item`, e.target);
    setHoveredLink(e.target.id);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Link href="/" id="logo">
          <SubMark size={48} />
        </Link>
      </div>
      <div className={styles.middle}>
        <Link
          href="/about"
          id="about"
          onClick={handleClick}
          className={styles.link}
        >
          {hoveredLink === 'about' && (
            <motion.div layoutId="link" className={styles.hoveredBorder} />
          )}
          About
        </Link>
        <Link
          href="/snacks"
          id="snacks"
          onClick={handleClick}
          className={styles.link}
        >
          {hoveredLink === 'snacks' && (
            <motion.div layoutId="link" className={styles.hoveredBorder} />
          )}
          Snacks
        </Link>
        <Link
          as="/posts"
          href={path}
          id="posts"
          onClick={handleClick}
          className={styles.link}
        >
          {hoveredLink === 'posts' && (
            <motion.div layoutId="link" className={styles.hoveredBorder} />
          )}
          Posts
        </Link>
      </div>
      <div className={styles.right}>
        <DarkLightToggle initialTheme={theme} />
        <a>
          <Rss />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
