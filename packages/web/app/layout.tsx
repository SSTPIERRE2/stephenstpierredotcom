import './globals.css';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthProvider from './context/AuthContext/AuthProvider';
import { DARK_COLORS, LIGHT_COLORS, THEME } from '@/utils/constant';
import { ThemeProvider } from './context/ThemeContext';
import MobileMenu from '@/components/MobileMenu';
import styles from './layout.module.css';
import Logrocket from '@/components/Logrocket';
import { Config } from 'sst/node/config';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Stephen St.Pierre',
  description: 'Personal Blog',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const savedTheme = cookies().get('color-theme') as
    | {
        value: THEME;
      }
    | undefined;
  const theme = savedTheme?.value || 'dark';

  const themeColors = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;

  return (
    <html
      lang="en"
      data-color-theme={theme}
      style={themeColors as React.CSSProperties}
    >
      <body className={inter.className}>
        <Logrocket appId={Config.LOGROCKET_APP_ID} />
        <AuthProvider>
          <ThemeProvider initialTheme={theme}>
            <div className={styles.maxWidthWrapper}>
              <Header />
              <MobileMenu />
              {children}
              <Footer />
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
