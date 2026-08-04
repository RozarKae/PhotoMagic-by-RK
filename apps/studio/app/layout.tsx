import React from 'react';
import type { Metadata, Viewport } from 'next';
import { AppProviders } from '@photomagic/ui';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#090909',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://photomagic.studio'),
  title: {
    default: 'PhotoMagic Studio | Luxury Wedding Photography & Fine Art Films',
    template: '%s | PhotoMagic Studio',
  },
  description:
    'Luxury wedding photography, candid portraits, and fine art cinematic films across Madurai, Chennai, Kochi, and South India.',
  keywords: [
    'Wedding Photography',
    'Cinematography',
    'Madurai Wedding Photographer',
    'South India Wedding Films',
    'Candid Photography',
    'Luxury Wedding Atelier',
  ],
  authors: [{ name: 'PhotoMagic Studio Team' }],
  openGraph: {
    title: 'PhotoMagic Studio | Luxury Wedding Photography & Fine Art Films',
    description:
      'Luxury wedding photography, candid portraits, and fine art cinematic films across Madurai, Chennai, Kochi, and South India.',
    url: 'https://photomagic.studio',
    siteName: 'PhotoMagic Studio',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/hero_wedding_banner.png',
        width: 1200,
        height: 630,
        alt: 'PhotoMagic Studio Luxury Wedding Showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PhotoMagic Studio | Luxury Wedding Photography',
    description:
      'Luxury wedding photography, candid portraits, and fine art cinematic films across South India.',
    images: ['/images/hero_wedding_banner.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="bg-canvas text-text-primary antialiased min-h-screen">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
