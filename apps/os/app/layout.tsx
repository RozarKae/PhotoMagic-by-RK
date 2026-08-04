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
  title: {
    default: 'PhotoMagic Executive OS | Studio Management & Client Portal Platform',
    template: '%s | PhotoMagic OS',
  },
  description:
    'Private client portal, AI album designer, high-res proofing suite, and studio operations workflow engine.',
  robots: {
    index: false,
    follow: false,
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
