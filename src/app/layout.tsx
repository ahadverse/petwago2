import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import SiteChrome from '@/components/layout/SiteChrome';

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://petwago.com'),
  title: { default: 'PetWago — Premium Pet Food & Supplies', template: '%s | PetWago' },
  description: 'Shop premium dog and cat food, treats, and supplies at PetWago. Real ingredients, trusted brands, fast delivery.',
  keywords: ['pet food', 'dog food', 'cat food', 'pet supplies', 'premium pet', 'PetWago'],
  openGraph: {
    siteName: 'PetWago',
    type: 'website',
    images: ['/logo.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-light text-foreground">
        <CartProvider>
          <AuthProvider>
            <SiteChrome>{children}</SiteChrome>
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
