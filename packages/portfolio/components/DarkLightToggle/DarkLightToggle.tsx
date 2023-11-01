'use client';

import styles from './DarkLightToggle.module.css';
import { Moon, Sun } from 'react-feather';
import VisuallyHidden from '../VisuallyHidden';
import Cookie from 'js-cookie';
import { DARK_COLORS, LIGHT_COLORS } from '@/utils/constant';
import { useTheme } from '@/app/context/ThemeContext';

const DarkLightToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    // 1 — Change the state variable, for the sun/moon icon
    setTheme(nextTheme);

    // 2 — Update the cookie, for the user's next visit
    Cookie.set('color-theme', nextTheme, {
      expires: 1000,
    });

    // 3 — Update the DOM to present the new colors
    const root = document.documentElement;
    const colors = nextTheme === 'light' ? LIGHT_COLORS : DARK_COLORS;

    // 3.1 — Edit the data-attribute, so that we can apply CSS
    // conditionally based on the theme.
    root.setAttribute('data-color-theme', nextTheme);

    // 3.2 — Swap out the actual colors on the <html> tag.
    //       We do this by iterating over each CSS variable
    //       and setting it as a new inline style.
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  return (
    <button className={styles.action} onClick={handleClick}>
      {theme === 'light' ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
      <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
    </button>
  );
};

export default DarkLightToggle;
