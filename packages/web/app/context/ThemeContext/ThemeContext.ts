import { THEME } from '@/utils/constant';
import { createContext } from 'react';

const ThemeContext = createContext<
  | {
      theme: THEME;
      setTheme: (theme: THEME) => void;
    }
  | undefined
>(undefined);

export default ThemeContext;
