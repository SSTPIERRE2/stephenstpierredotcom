'use client';

import styles from './MobileMenu.module.css';
import { Portal } from '@headlessui/react';
import { Menu, X } from 'react-feather';
import { useToggle } from '@uidotdev/usehooks';
import { LINKS } from '@/utils/constant';
import Link from 'next/link';
import DarkLightToggle from '../DarkLightToggle';
import VisuallyHidden from '../VisuallyHidden';
import clsx from 'clsx';
import { useEffect } from 'react';

const MobileMenu = () => {
  const [isMobileMenuOpen, toggleMobileMenu] = useToggle(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.position = 'fixed';
      document.body.style.top = '0px';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <button
        className={styles.mobileMenuButton}
        onClick={() => toggleMobileMenu()}
        style={{
          opacity: isMobileMenuOpen ? 0 : 1,
          transition: `opacity ${isMobileMenuOpen ? '200ms' : '800ms'}`,
        }}
      >
        <Menu size="2rem" />
        <VisuallyHidden>Open menu</VisuallyHidden>
      </button>
      <Portal>
        <div className={styles.portal}>
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
            <button
              className={clsx(styles.mobileMenuButton, styles.closeButton)}
              onClick={() => toggleMobileMenu()}
              style={{
                opacity: isMobileMenuOpen ? 1 : 0,
                transition: `opacity ${isMobileMenuOpen ? '800ms' : '200ms'}`,
              }}
            >
              <X size="2.25rem" />
              <VisuallyHidden>Close menu</VisuallyHidden>
            </button>
            <nav className={styles.mobileNavContainer}>
              <div>
                {LINKS.map(({ slug, label, href }, index) => (
                  <div
                    key={slug}
                    className={styles.mobileNavItem}
                    style={{
                      transform:
                        isMobileMenuOpen ? 'translateX(0%)' : (
                          'translateX(-100%)'
                        ),
                      transition: 'transform 300ms',
                      transitionDelay:
                        isMobileMenuOpen ? `${index * 100}ms` : '0ms',
                    }}
                  >
                    <Link
                      key={slug}
                      href={href}
                      onClick={() => toggleMobileMenu()}
                    >
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
        </div>
      </Portal>
    </>
  );
};

export default MobileMenu;
