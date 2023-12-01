'use client';

import useIsOnscreen from '@/hooks/useIsOnScreen';
import Logo from '../Logo/Primary';
import styles from './Footer.module.css';
import { SOCIAL_LINKS } from '@/utils/constant';
import { useEffect, useState } from 'react';

const Footer = () => {
  const [isOnScreen, elementRef] = useIsOnscreen<HTMLDivElement>();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized && isOnScreen) {
      setIsInitialized(true);
    }
  }, [isOnScreen]);

  return (
    <footer className={styles.footer} role="contentinfo">
      {/* container necessary for max width + background color */}
      <div className={styles.container}>
        <div
          ref={elementRef}
          style={{ visibility: isOnScreen ? 'revert' : 'hidden' }}
        >
          <Logo key={!isInitialized && isOnScreen ? 'logo' : 'invisibleLogo'} />
          <span
            className={styles.thanks}
            key={!isInitialized && isOnScreen ? 'thanks' : 'invisible'}
          >
            Thanks for visiting!
          </span>
        </div>

        <div>
          <h2 className={styles.linksHeading}>Links</h2>
          <div className={styles.social}>
            {SOCIAL_LINKS.map(({ slug, label, href }) => (
              <a
                key={slug}
                className={styles.link}
                href={href}
                data-text={label}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
