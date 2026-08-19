import React from 'react';
import type { Metadata, Viewport } from 'next';
import {
  Inter,
  Plus_Jakarta_Sans,
  IBM_Plex_Mono,
  Great_Vibes,
  Noto_Sans_Tamil,
} from 'next/font/google';
import { AppProviders } from '@photomagic/ui';
import { FloatingControls } from '../components/FloatingControls';
import { OttLoader } from '../components/OttLoader';
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
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-ibm-mono',
});

const notoTamil = Noto_Sans_Tamil({
  subsets: ['tamil'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto-tamil',
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
    default: 'PhotoMagic Studios by RK | Moments Through Our Eyes',
    template: '%s | PhotoMagic Studios by RK',
  },
  description:
    'Moments Through Our Eyes (இல்லத்தின் இன்ப நிகழ்வுகள், விழிகளின் வழியே). Photography for Indian celebrations, families, people, fashion and stories across Tamil Nadu, Pondicherry, Kerala, and all of India.',
  keywords: [
    'PhotoMagic Studios by RK',
    'Rozar Khan Photographer',
    'Moments Through Our Eyes',
    'South India Wedding Photography',
    'Tamil Nadu Wedding Cinematography',
    'Kerala Destination Weddings',
    'Project BabyBliss',
    'Indian Fashion Editorial Photography',
  ],
  authors: [{ name: 'PhotoMagic Studios by RK (Rozar Khan)' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`light ${inter.variable} ${plusJakarta.variable} ${greatVibes.variable} ${ibmMono.variable} ${notoTamil.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[var(--color-canvas,#FFF5F7)] text-[var(--color-text-primary,#1E0A3C)] antialiased min-h-screen font-body selection:bg-purple-200 selection:text-purple-900 dark:selection:bg-purple-900 dark:selection:text-purple-100">
        <AppProviders>
          <OttLoader />
          {children}
          <FloatingControls />
          <CornerArtistMascot />
        </AppProviders>
      </body>
    </html>
  );
}
