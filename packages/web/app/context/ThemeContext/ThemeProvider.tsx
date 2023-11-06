'use client';

import { ReactNode, useState } from 'react';
import ThemeContext from './ThemeContext';
import { THEME } from '@/utils/constant';

interface Props {
  initialTheme: THEME;
  children: ReactNode;
}

const ThemeProvider = ({ initialTheme, children }: Props) => {
  const [theme, setTheme] = useState(initialTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
