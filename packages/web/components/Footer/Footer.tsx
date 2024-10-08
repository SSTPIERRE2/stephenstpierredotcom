'use client';

import useIsOnscreen from '@/hooks/useIsOnScreen';
import Logo from '../Logo/Primary';
import styles from './Footer.module.css';
import { SOCIAL_LINKS } from '@/utils/constant';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Footer = () => {
  const [isOnScreen, elementRef] = useIsOnscreen<HTMLDivElement>();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized && isOnScreen) {
      setIsInitialized(true);
    }
  }, [isOnScreen, isInitialized]);

  return (
    <footer className={styles.footer} role="contentinfo" ref={elementRef}>
      {/* container necessary for max width + background color */}
      <div className={styles.container}>
        <div>
          <Logo />
          <span
            className={styles.thanks}
            style={{ opacity: isInitialized ? 1 : 0 }}
          >
            Thanks for visiting!
          </span>
        </div>
        <div className={styles.socialContainer}>
          <h3 className={styles.linksHeading}>Links</h3>
          <div className={styles.social}>
            {SOCIAL_LINKS.map(({ slug, label, href, icon: Icon }) => (
              <Link
                key={slug}
                className={styles.link}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Icon size="1rem" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.copyrightContainer}>
        <span>&copy; 2024-present Stephen St.Pierre. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
