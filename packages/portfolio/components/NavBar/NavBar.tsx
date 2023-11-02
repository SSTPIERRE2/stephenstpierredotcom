'use client';

import Link from 'next/link';
import styles from './navBar.module.css';
import { Menu, Rss, X } from 'react-feather';
import { motion } from 'framer-motion';
import { useId, useState } from 'react';
import DarkLightToggle from '../DarkLightToggle';
import Icon from '../Logo/Icon';
import { usePathname } from 'next/navigation';
import * as Portal from '@radix-ui/react-portal';
import { useToggle } from '@uidotdev/usehooks';

type slug = 'about' | 'snacks' | 'posts';
type label = 'About' | 'Snacks' | 'Posts';
type href = '/about' | '/snacks' | '/posts';

const LINKS: { slug: slug; label: label; href: href }[] = [
  {
    slug: 'about',
    label: 'About',
    href: '/about',
  },
  {
    slug: 'snacks',
    label: 'Snacks',
    href: '/snacks',
  },
  {
    slug: 'posts',
    label: 'Posts',
    href: '/posts',
  },
];

const NavBar = () => {
  const [hoveredLink, setHoveredLink] = useState<slug | null>();
  const [isMobileMenuOpen, toggleMobileMenu] = useToggle(false);
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

      <Portal.Root>
        <button
          className={styles.mobileMenuButton}
          onClick={() => toggleMobileMenu()}
        >
          <div
            className={styles.mobileMenuIcon}
            style={{
              opacity: isMobileMenuOpen ? 1 : 0,
              transition: `opacity ${isMobileMenuOpen ? '800ms' : '200ms'}`,
            }}
          >
            <X size="2rem" />
          </div>
          <div
            style={{
              opacity: isMobileMenuOpen ? 0 : 1,
              transition: `opacity ${isMobileMenuOpen ? '200ms' : '800ms'}`,
            }}
          >
            <Menu size="2rem" />
          </div>
        </button>

        <div
          className={styles.mobileNavWrapper}
          style={{ pointerEvents: isMobileMenuOpen ? 'auto' : 'none' }}
        >
          <button
            className={styles.mobileMenuCatchAll}
            style={{
              opacity: isMobileMenuOpen ? 1 : 0,
              touchAction: isMobileMenuOpen ? 'none' : 'auto',
            }}
            onClick={() => (isMobileMenuOpen ? toggleMobileMenu() : {})}
            tabIndex={-1}
            aria-hidden
          />
          <nav className={styles.mobileNavContainer}>
            <div className={styles.mainMobileNav}>
              <div>
                {LINKS.map(({ slug, label, href }, index) => (
                  <div
                    className={styles.mobileNavItem}
                    style={{
                      transform: isMobileMenuOpen
                        ? 'translateX(0%)'
                        : 'translateX(-100%)',
                      transition: 'transform 500ms',
                      transitionDelay: isMobileMenuOpen
                        ? `${index * 100}ms`
                        : '0ms',
                    }}
                  >
                    <Link key={slug} href={href}>
                      {label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={styles.mobileNavSettings}
              style={{
                opacity: isMobileMenuOpen ? 1 : 0,
                transition: `opacity ${
                  isMobileMenuOpen ? '250ms ease 500ms' : '250ms ease 0ms'
                }`,
              }}
            >
              <DarkLightToggle />
            </div>
          </nav>
        </div>
      </Portal.Root>
    </nav>
  );
};

export default NavBar;
