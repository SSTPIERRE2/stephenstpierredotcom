'use client';

import Link from 'next/link';
import styles from './NavBar.module.css';
import { motion } from 'framer-motion';
import { useId, useState } from 'react';
import { usePathname } from 'next/navigation';
import { LINKS, slug } from '@/utils/constant';

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
      <ul className={styles.links} onMouseLeave={() => setHoveredLink(null)}>
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
                    pathName === href
                      ? 'var(--font-weight-bold)'
                      : 'var(--font-weight-medium)',
                }}
                onMouseEnter={() => setHoveredLink(slug)}
              >
                {label}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
