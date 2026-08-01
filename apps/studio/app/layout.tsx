'use client';

import React from 'react';
import { AppProviders } from '@photomagic/ui';
import '@photomagic/ui/src/styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-canvas text-text-primary antialiased min-h-screen">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
