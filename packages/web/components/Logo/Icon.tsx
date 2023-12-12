'use client';

import Link from 'next/link';
import styles from './Icon.module.css';
import { useEffect, useId, useState } from 'react';

const Icon = () => {
  const [key, setKey] = useState(useId());
  const [isPlaying, setIsPlaying] = useState(true);
  const [turn, setTurn] = useState(-0.75);
  const [delay, setDelay] = useState(1000);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      setTimeout(() => {
        setIsPlaying(false);
        if (!initialized) {
          setInitialized(true);
        }
      }, 1500);
    }
  }, [isPlaying, initialized]);

  useEffect(() => {
    if (initialized) {
      setDelay(0);
    }
  }, [initialized]);

  return (
    <Link href="/" id="icon">
      <div
        key={key}
        className={styles.wrapper}
        onMouseEnter={() => {
          if (!isPlaying) {
            setKey(crypto.randomUUID());
            setTurn((t) => t + 0.75);
            setIsPlaying(true);
          }
        }}
        style={
          {
            '--icon-logo-border-turn': turn + 'turn',
            '--animation-delay': delay + 'ms',
          } as React.CSSProperties
        }
      >
        <span className={`${styles.text} ${styles.accent}`}>S</span>
        <span className={`${styles.text} ${styles.primary}`}>S</span>
        <div
          className={`${styles.border} ${styles.bottomLeft}`}
          style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
        />
        <div
          className={`${styles.border} ${styles.topRight}`}
          style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
        />
      </div>
    </Link>
  );
};

export default Icon;
