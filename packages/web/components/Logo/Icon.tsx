'use client';

import Link from 'next/link';
import styles from './Icon.module.css';
import { useEffect, useId, useState } from 'react';
import VisuallyHidden from '../VisuallyHidden';
import clsx from 'clsx';

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
    <Link
      href="/"
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
      <span className={clsx(styles.text, styles.accent)}>S</span>
      <span className={clsx(styles.text, styles.primary)}>S</span>
      <div
        className={clsx(styles.border, styles.bottomLeft)}
        style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
      />
      <div
        className={clsx(styles.border, styles.topRight)}
        style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
      />
      <VisuallyHidden>Home</VisuallyHidden>
    </Link>
  );
};

export default Icon;
