'use client';

import React from 'react';
import { AppProviders, MobileNavigationDock } from '@photomagic/ui';
import '@photomagic/ui/src/styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-canvas text-text-primary antialiased min-h-screen flex flex-col">
        <AppProviders>
          <div className="flex-1">{children}</div>
          <MobileNavigationDock />
        </AppProviders>
      </body>
    </html>
  );
}
