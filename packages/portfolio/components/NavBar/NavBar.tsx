'use client';

import Link from 'next/link';
import styles from './navBar.module.css';
import { Rss } from 'react-feather';
import { motion } from 'framer-motion';
import { useId, useState } from 'react';
import DarkLightToggle from '../DarkLightToggle';
import Icon from '../Logo/Icon';
import { usePathname } from 'next/navigation';
import { LINKS, slug } from '@/utils/constant';
import MobileMenu from '../MobileMenu';

const NavBar = () => {
  const [hoveredLink, setHoveredLink] = useState<slug | null>();

  const pathName = usePathname();
  const backdropId = useId();
  const underlineId = useId();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement> & { target: { id: slug } }
  ) => {
    setHoveredLink(e.target.id);
  };

  return (
    <nav className={styles.nav}>
      <Icon />

      <ul className={styles.middle} onMouseLeave={() => setHoveredLink(null)}>
        {LINKS.map(({ slug, label, href }) => (
          <li
            key={slug}
            style={{
              zIndex: hoveredLink === slug ? 1 : 2,
              position: 'relative',
            }}
          >
            {hoveredLink === slug && (
              <motion.div
                layoutId={backdropId}
                className={styles.hoveredBackdrop}
                initial={{ borderRadius: '8px' }}
              />
            )}
            <div>
              {pathName === href && (
                <motion.div
                  layoutId={underlineId}
                  className={styles.underline}
                />
              )}
              <Link
                href={href}
                id={slug}
                onClick={handleClick}
                className={styles.link}
                data-text={label}
                style={{
                  fontWeight:
                    pathName === href ? 'var(--font-weight-bold)' : 'revert',
                }}
                onMouseEnter={() => setHoveredLink(slug)}
              >
                {label}
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.right}>
        <DarkLightToggle />
        <button className={styles.action}>
          <Rss size="1.5rem" />
        </button>
      </div>

      <MobileMenu />
    </nav>
  );
};

export default NavBar;
