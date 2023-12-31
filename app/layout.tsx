import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import RainbowKit from './rainbowkit';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '800'],
});

export const metadata: Metadata = {
  title: 'LUCKYBUCKS',
  description: 'Games. DEX. Launchpad',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='dark'>
      <body className={`dark:bg-gray-900 dark:text-gray-100 ${inter.className} scrollbar-hide`}>
        <RainbowKit>{children}</RainbowKit>
      </body>
    </html>
  );
}
