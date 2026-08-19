'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { CustomPackageBuilder } from '../../components/CustomPackageBuilder';
import { StudioPageRenderer } from '@photomagic/ui';
import { getPublishedPageBySlug, INITIAL_WEBSITE_PAGES } from '@photomagic/config';
import { WebsitePage } from '@photomagic/types';

export default function PackagesPage() {
  const [pageData, setPageData] = useState<WebsitePage>(() => {
    const published = getPublishedPageBySlug('/packages');
    return (published || INITIAL_WEBSITE_PAGES[5]) as WebsitePage;
  });

  useEffect(() => {
    const published = getPublishedPageBySlug('/packages');
    if (published) {
      setPageData(published as WebsitePage);
    }
  }, []);

  return (
    <main className="min-h-screen bg-[var(--color-canvas,#FFF5F7)] text-[var(--color-text-primary,#1E0A3C)] transition-colors duration-300 flex flex-col pt-16">
      <Navbar />

      {/* Unified Public Page Renderer */}
      <StudioPageRenderer page={pageData} mode="public" />

      {/* Embedded Bespoke Custom Package Estimator */}
      <div id="customize" className="max-w-7xl mx-auto px-6 pb-24 w-full">
        <CustomPackageBuilder />
      </div>

      <Footer />
    </main>
  );
}
