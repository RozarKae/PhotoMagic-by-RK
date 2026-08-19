import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans, IBM_Plex_Mono, Great_Vibes } from 'next/font/google';
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

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-calligraphy',
});

const ibmMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-ibm-mono',
});

export const viewport: Viewport = {
  themeColor: '#FFF5F7',
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
      className={`light ${inter.variable} ${plusJakarta.variable} ${greatVibes.variable} ${ibmMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[#FFF5F7] text-[#1E0A3C] antialiased min-h-screen font-body selection:bg-purple-200 selection:text-purple-900">
        <AppProviders>
          {children}
          <CornerArtistMascot />
        </AppProviders>
      </body>
    </html>
  );
}
