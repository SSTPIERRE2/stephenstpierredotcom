import './globals.css';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from './lib/registry';
import GlobalStyles from '../components/GlobalStyles/GlobalStyles';
import { ReactNode } from 'react';
import UrqlProvider from './UrqlProvider';
import AnalyticsWrapper from './AnalyticsWrapper';
import Header from '@/components/Header/Header';
import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';
import AuthProvider from './context/AuthContext/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Steve St.Pierre',
  description: 'Personal Portfolio',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UrqlProvider>
          <StyledComponentsRegistry>
            <AuthProvider>
              <AnalyticsWrapper>
                <Header>
                  <NavBar />
                </Header>
                {children}
                <Footer />
                <GlobalStyles />
              </AnalyticsWrapper>
            </AuthProvider>
          </StyledComponentsRegistry>
        </UrqlProvider>
      </body>
    </html>
  );
}
