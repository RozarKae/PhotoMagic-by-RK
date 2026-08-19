'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { StudioPageRenderer } from '@photomagic/ui';
import { getPublishedPageBySlug, INITIAL_WEBSITE_PAGES } from '@photomagic/config';
import { WebsitePage } from '@photomagic/types';

export default function PortfolioPage() {
  const [pageData, setPageData] = useState<WebsitePage>(() => {
    const published = getPublishedPageBySlug('/portfolio');
    return (published || INITIAL_WEBSITE_PAGES[2]) as WebsitePage;
  });

  useEffect(() => {
    const published = getPublishedPageBySlug('/portfolio');
    if (published) {
      setPageData(published as WebsitePage);
    }
  }, []);

  return (
    <main className="min-h-screen bg-[var(--color-canvas,#FFF5F7)] text-[var(--color-text-primary,#1E0A3C)] transition-colors duration-300 flex flex-col pt-16">
      <Navbar />

      {/* Unified Public Page Renderer */}
      <StudioPageRenderer page={pageData} mode="public" />

      <Footer />
    </main>
  );
}
