'use client';

import styles from './Avatar.module.css';
import avatar from '../../content/assets/crossed_arms_nowatermark.png';
import yes from '../../content/assets/yes_transparent.png';
import no from '../../content/assets/no_transparent.png';
import Image from 'next/image';
import { useState } from 'react';

const Avatar = () => {
  const sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
  const alt = "Stephen's avatar";
  const [isHovered, setIsHovered] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsRunning(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const id: ReturnType<typeof setTimeout> = setTimeout(() => {
      setIsRunning(false);
    }, 2000);

    setTimeoutId(id);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={styles.wrapper}
    >
      <Image
        src={avatar}
        alt={alt}
        sizes={sizes}
        className={styles.base}
        style={{
          opacity: !isHovered && !isRunning ? 1 : 0,
        }}
      />

      <Image
        src={no}
        alt={alt}
        sizes={sizes}
        className={`${styles.base} ${styles.stacked}`}
        style={{
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 500ms',
        }}
      />

      <Image
        src={yes}
        alt={alt}
        sizes={sizes}
        className={`${styles.base} ${styles.stacked}`}
        style={{
          opacity: !isHovered && isRunning ? 1 : 0,
        }}
      />
    </div>
  );
};

export default Avatar;
