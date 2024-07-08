import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './provider';
import { Header } from './header';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'DevOrbit',
  description: 'An application for pair programming with random devs!',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <Providers>
            <Toaster />
            <NextTopLoader />
            <Header />
            <div className="container mx-auto">{children}</div>
          </Providers>
        </body>
      </html>
    </>
  );
}
