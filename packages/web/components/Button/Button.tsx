'use client';

import { PropsWithChildren } from 'react';
import styles from './Button.module.css';
import clsx from 'clsx';
import { useTheme } from '@/app/context/ThemeContext';

interface Props {
  variant?: 'fill' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const SIZES = {
  small: {
    '--borderRadius': 2 + 'px',
    '--fontSize': 16 / 16 + 'rem',
    '--padding': '6px 12px',
  },
  medium: {
    '--borderRadius': 2 + 'px',
    '--fontSize': 18 / 16 + 'rem',
    '--padding': '14px 20px',
  },
  large: {
    '--borderRadius': 4 + 'px',
    '--fontSize': 21 / 16 + 'rem',
    '--padding': '18px 32px',
  },
};

const Button = ({
  variant = 'fill',
  size = 'small',
  className,
  children,
}: Props & PropsWithChildren) => {
  const sizeStyles = SIZES[size];
  const { theme } = useTheme();

  return (
    <button
      className={clsx(styles.base, styles[variant], className)}
      style={
        {
          ...(sizeStyles as React.CSSProperties),
          '--color-ghost-hover-text':
            theme === 'light'
              ? 'var(--color-gray-1000)'
              : 'var(--color-gray-300)',
          '--color-fill-base-text':
            theme === 'light'
              ? 'var(--color-gray-0)'
              : 'var(--color-gray-1000)',
        } as React.CSSProperties
      }
    >
      {children}
    </button>
  );
};

export default Button;
