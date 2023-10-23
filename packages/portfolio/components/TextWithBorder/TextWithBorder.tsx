'use client';

import { ComponentPropsWithoutRef, PropsWithChildren, useState } from 'react';
import styles from './textWithBorder.module.css';
import Link from 'next/link';

interface Props<C extends React.ElementType> {
  as?: C;
}

const TextWithBorder = <C extends React.ElementType = 'h2'>({
  as,
  children,
  ...rest
}: PropsWithChildren<Props<C>> &
  Omit<ComponentPropsWithoutRef<C>, keyof Props<C>>) => {
  const [isHovered, setIsHovered] = useState(false);
  const clipPath = isHovered
    ? 'polygon(0% 0%, 0% 75%, 3.5% 75%, 3.5% 11.5%, 90% 11.5%, 90% 0%)'
    : 'polygon(0% 0%, 0% 50%, 3.5% 50%, 3.5% 11.5%, 50% 11.5%, 50% 0%)';
  const Component = as || 'h2';

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        cursor: as === 'a' || typeof as === typeof Link ? 'pointer' : 'default',
      }}
    >
      <Component {...rest}>{children}</Component>
      <div
        className={styles.border}
        style={{
          clipPath,
        }}
      />
    </div>
  );
};

export default TextWithBorder;
