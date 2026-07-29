'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { DeliveryDashboardOverview } from '../../components/delivery/DeliveryDashboardOverview';
import { CategorizedDownloadCenter } from '../../components/delivery/CategorizedDownloadCenter';
import { ProjectCompletionFeedback } from '../../components/delivery/ProjectCompletionFeedback';
import { Download, CheckCircle2, Heart } from 'lucide-react';

export default function ClientDeliveryPage() {
  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Phase C10 Client Portal</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">Final Delivery & Resolution Downloads</h1>
          <p className="text-sm text-text-secondary">Access high-resolution RAW photos, 8K cinematic films, social media kits, and print-ready album master PDFs.</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" className="flex items-center gap-2">
            <Download size={16} /> Download All Files (ZIP 14.8 GB)
          </Button>
        </div>
      </div>

      {/* Delivery Dashboard Overview */}
      <DeliveryDashboardOverview />

      {/* Categorized Download Center */}
      <CategorizedDownloadCenter />

      {/* Project Completion & Testimonial Review */}
      <ProjectCompletionFeedback />
    </main>
  );
}
