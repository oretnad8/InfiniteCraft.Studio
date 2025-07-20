
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '../hooks/useCart';
import CartWrapper from '../components/CartProvider';

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '8craft - Figuras 3D Personalizadas',
  description: 'Creamos figuras 3D únicas personalizadas con la más alta calidad de impresión',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          <CartWrapper>
            {children}
          </CartWrapper>
        </CartProvider>
      </body>
    </html>
  );
}
