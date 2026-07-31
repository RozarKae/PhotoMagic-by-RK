'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { SmartDeliveryLinkManager } from '../../components/delivery-center/SmartDeliveryLinkManager';
import { WatermarkPreviewEngine } from '../../components/delivery-center/WatermarkPreviewEngine';
import { VideoDeliveryStreamingCenter } from '../../components/delivery-center/VideoDeliveryStreamingCenter';
import { QrSharingAnalyticsHub } from '../../components/delivery-center/QrSharingAnalyticsHub';
import { ProjectArchiveSearchVault } from '../../components/delivery-center/ProjectArchiveSearchVault';
import { DeliveryCompletionChecklist } from '../../components/delivery-center/DeliveryCompletionChecklist';
import { Send, ShieldCheck, Download, Film, HardDrive, QrCode, Archive } from 'lucide-react';

export default function DeliveryCenterPage() {
  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Phases 8.1 – 8.9 Complete Master Delivery Center Platform</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">
            Branded Smart Delivery & Archival Platform
          </h1>
          <p className="text-sm text-text-secondary">
            Secure client delivery links, 8K RAW file download center, dynamic watermark protection
            engine, adaptive 4K video HLS streaming platform, vector QR code sharing, project
            archival vault, and automated closeout checklist.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" className="flex items-center gap-2 font-bold">
            <Send size={16} /> Dispatch Client Delivery Package
          </Button>
        </div>
      </div>

      {/* Phase 8.9 Automated Delivery Completion Checklist */}
      <DeliveryCompletionChecklist />

      {/* Phase 8.1 Smart Delivery Links */}
      <SmartDeliveryLinkManager />

      {/* Phase 8.6 QR Sharing & Analytics */}
      <QrSharingAnalyticsHub />

      {/* Phase 8.3 Dynamic Watermark Engine & Phase 8.5 Video Platform */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <WatermarkPreviewEngine />
        <VideoDeliveryStreamingCenter />
      </div>

      {/* Phase 8.7 & 8.8 Project Archive & History Vault */}
      <ProjectArchiveSearchVault />
    </main>
  );
}
