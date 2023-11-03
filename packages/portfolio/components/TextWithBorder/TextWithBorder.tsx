'use client';

import { ComponentPropsWithoutRef, PropsWithChildren, useState } from 'react';
import styles from './TextWithBorder.module.css';
import Link from 'next/link';
import { ChevronRight } from 'react-feather';

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
    ? 'polygon(7.5% 100%, 90% 100%, 90% 88.5%, 11.5% 88.5%, 11.5% 88.5%, 7.5% 88.5%)'
    : 'polygon(0% 100%, 65% 100%, 65% 88.5%, 0.4rem 88.5%, 0.4rem 35%, 0% 35%)';
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
      <div className={styles.chevronWrapper}>
        <Component {...rest}>{children}</Component>
        <ChevronRight
          size="1.5rem"
          className={styles.chevron}
          style={{
            opacity: isHovered ? 1 : 0,
            transition: `opacity ${isHovered ? 1500 : 500}ms`,
          }}
        />
      </div>
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
