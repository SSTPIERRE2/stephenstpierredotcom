'use client';

import styles from './MobileMenu.module.css';
import { Portal } from '@headlessui/react';
import { Menu, X } from 'react-feather';
import { useToggle } from '@uidotdev/usehooks';
import { LINKS } from '@/utils/constant';
import Link from 'next/link';
import DarkLightToggle from '../DarkLightToggle';

const MobileMenu = () => {
  const [isMobileMenuOpen, toggleMobileMenu] = useToggle(false);

  return (
    <div className={styles.portal}>
      <Portal>
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
              {LINKS.map(({ slug, label, href }, index) => (
                <div
                  key={slug}
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
      </Portal>
    </div>
  );
};

export default MobileMenu;
