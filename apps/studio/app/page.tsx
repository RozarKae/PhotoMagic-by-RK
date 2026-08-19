'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { StudioPageRenderer } from '@photomagic/ui';
import { getPublishedPageBySlug, INITIAL_WEBSITE_PAGES } from '@photomagic/config';
import { WebsitePage } from '@photomagic/types';

const StructuredData = dynamic(
  () => import('../components/StructuredData').then((m) => m.StructuredData),
  { ssr: true },
);

export default function HomePage() {
  const [pageData, setPageData] = useState<WebsitePage>(() => {
    const published = getPublishedPageBySlug('/');
    return (published || INITIAL_WEBSITE_PAGES[0]) as WebsitePage;
  });

  useEffect(() => {
    const published = getPublishedPageBySlug('/');
    if (published) {
      setPageData(published as WebsitePage);
    }
  }, []);

  return (
    <main className="min-h-screen bg-[var(--color-canvas,#FFF5F7)] text-[var(--color-text-primary,#1E0A3C)] transition-colors duration-300 flex flex-col">
      <StructuredData />
      <Navbar />

      {/* Unified Public Page Renderer */}
      <StudioPageRenderer page={pageData} mode="public" />

      <Footer />
    </main>
  );
}
