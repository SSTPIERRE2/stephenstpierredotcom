'use client';

import useIsOnscreen from '@/hooks/useIsOnScreen';
import Logo from '../Logo/Primary';
import styles from './Footer.module.css';

const Footer = () => {
  const [isOnScreen, elementRef] = useIsOnscreen<HTMLDivElement>();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div
          className={styles.leftContainer}
          ref={elementRef}
          style={{ visibility: isOnScreen ? 'revert' : 'hidden' }}
        >
          <Logo key={isOnScreen ? 'visible' : 'invisible'} />
        </div>
        <div className={styles.rightContainer}>
          <h2>Links</h2>
          <div className={styles.social}>
            <a href="https://github.com/SSTPIERRE2">Github</a>
            <a href="https://www.linkedin.com/in/stevecstpierre/">LinkedIn</a>
            <a href="https://stackoverflow.com/users/8183576/steve">
              Stack Overflow
            </a>
            <a href="https://twitter.com/nothisisSteve">Twitter</a>
            <a href="mailto:stephencstpierre@gmail.com">Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
