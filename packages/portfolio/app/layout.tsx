import './globals.css';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import UrqlProvider from './UrqlProvider';
import AnalyticsWrapper from './AnalyticsWrapper';
import Header from '@/components/Header/Header';
import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';
import AuthProvider from './context/AuthContext/AuthProvider';
import { DARK_COLORS, LIGHT_COLORS, THEME } from '@/utils/constant';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Steve St.Pierre',
  description: 'Personal Portfolio',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const savedTheme = cookies().get('color-theme');
  const theme = savedTheme?.value || 'light';

  const themeColors = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;

  return (
    <html
      lang="en"
      data-color-theme={theme}
      style={themeColors as React.CSSProperties}
    >
      <body className={inter.className}>
        <UrqlProvider>
          <AuthProvider>
            <AnalyticsWrapper>
              <Header>
                <NavBar theme={theme as THEME} />
              </Header>
              <main>{children}</main>
              <Footer />
            </AnalyticsWrapper>
          </AuthProvider>
        </UrqlProvider>
      </body>
    </html>
  );
}
