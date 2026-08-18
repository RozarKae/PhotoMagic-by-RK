import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans, IBM_Plex_Mono } from 'next/font/google';
import { AppProviders } from '@photomagic/ui';
import { CornerArtistMascot } from '../components/CornerArtistMascot';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-plus-jakarta',
});

const ibmMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-ibm-mono',
});

export const viewport: Viewport = {
  themeColor: '#0F051D',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://batpaiyancatponnu.online/photomagic',
  ),
  title: {
    default: 'PhotoMagic by RK | Rozar Khan Fine Art Photography & Cinema',
    template: '%s | PhotoMagic by RK',
  },
  description:
    'Luxury wedding photography, Project BabyBliss heirloom portraits, and 4K cinematic films by Rozar Khan across Chennai, Bangalore, Kochi, and worldwide destinations.',
  keywords: [
    'Rozar Khan Photographer',
    'PhotoMagic by RK',
    'Project BabyBliss',
    'South India Wedding Photography',
    'Destination Wedding Cinematography',
    '12x18 Archival Photo Albums',
  ],
  authors: [{ name: 'Rozar Khan (RK)' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${plusJakarta.variable} ${ibmMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-canvas text-text-primary antialiased min-h-screen font-body">
        <AppProviders>
          {children}
          <CornerArtistMascot />
        </AppProviders>
      </body>
    </html>
  );
}
