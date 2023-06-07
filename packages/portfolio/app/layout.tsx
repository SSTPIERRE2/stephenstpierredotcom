import './globals.css';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from './lib/registry';
import GlobalStyles from '../components/GlobalStyles/GlobalStyles';
import { ReactNode } from 'react';
import UrqlProvider from './UrqlProvider';
import AnalyticsWrapper from './AnalyticsWrapper';

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
            <AnalyticsWrapper>
              {children}
              <GlobalStyles />
            </AnalyticsWrapper>
          </StyledComponentsRegistry>
        </UrqlProvider>
      </body>
    </html>
  );
}
