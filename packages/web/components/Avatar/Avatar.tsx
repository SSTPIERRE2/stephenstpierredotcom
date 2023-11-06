'use client';

import styles from './Avatar.module.css';
import avatar from '../../content/assets/crossed_arms_nowatermark.png';
import yes from '../../content/assets/yes_transparent.png';
import no from '../../content/assets/no_transparent.png';
import Image from 'next/image';
import { useState } from 'react';

const Avatar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();

  const handleMouseEnter = () => {
    console.log(`mouse entered!`);

    setIsHovered(true);
    setIsRunning(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);

    console.log(`mouse left!`);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const id: ReturnType<typeof setTimeout> = setTimeout(() => {
      setIsRunning(false);
      console.log(`3 seconds passed`);
    }, 2000);

    setTimeoutId(id);
  };

  console.log(`avatar `, isHovered, isRunning);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative' }}
    >
      <Image
        src={avatar}
        alt="Stephen's avatar"
        sizes="100vw"
        width={427 * 0.8356}
        height={511}
        style={{
          filter: `drop-shadow(
      2px 4px 32px hsl(0deg 0% 0% / 0.4)
    )`,
          width: '100%',
          height: 'auto',
          maxHeight: '400px',
          maxWidth: 400 * 0.8356, // height-width ratio
          objectFit: 'cover',
          opacity: !isHovered && !isRunning ? 1 : 0,
          transition: 'opacity 500ms',
          position: 'relative',
        }}
      />
      <Image
        src={no}
        alt="Stephen's avatar"
        sizes="100vw"
        width={427 * 0.8356}
        height={511}
        style={{
          filter: `drop-shadow(
              2px 4px 32px hsl(0deg 0% 0% / 0.4)
            )`,
          width: '100%',
          height: 'auto',
          maxHeight: '400px',
          maxWidth: 400 * 0.8356, // height-width ratio
          objectFit: 'cover',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 500ms',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />

      <Image
        src={yes}
        alt="Stephen's avatar"
        sizes="100vw"
        width={427 * 0.8356}
        height={511}
        style={{
          filter: `drop-shadow(
        2px 4px 32px hsl(0deg 0% 0% / 0.4)
      )`,
          width: '100%',
          height: 'auto',
          maxHeight: '400px',
          maxWidth: 400 * 0.8356, // height-width ratio
          objectFit: 'cover',
          opacity: !isHovered && isRunning ? 1 : 0,
          transition: 'opacity 500ms',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
};

export default Avatar;
