'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { AICullingTimeline } from '../../components/ai-album-designer/AICullingTimeline';
import { AlbumCanvasEditor } from '../../components/ai-album-designer/AlbumCanvasEditor';
import { AlbumCoverDesigner } from '../../components/ai-album-designer/AlbumCoverDesigner';
import { SmartLayoutSelector } from '../../components/ai-album-designer/SmartLayoutSelector';
import { ClientProofingModal } from '../../components/ai-album-designer/ClientProofingModal';
import { BookOpen, Sparkles, Printer, Download, Share2 } from 'lucide-react';

export default function AIAlbumDesignerWorkspacePage() {
  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Phase 3.3 AI Wedding Album Designer</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">
            AI Wedding Album Designer Studio
          </h1>
          <p className="text-sm text-text-secondary">
            Automated photo culling, 15-chapter ceremony timeline, 12x18 spread canvas editing, and
            CMYK 300 DPI print lab exports.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" className="flex items-center gap-1.5">
            <Share2 size={16} /> Share Proof Link
          </Button>
          <Button variant="primary" className="flex items-center gap-2">
            <Printer size={16} />
            Dispatch Print Package ZIP
          </Button>
        </div>
      </div>

      {/* Main Interactive 12x18 Spread Canvas Editor */}
      <AlbumCanvasEditor />

      {/* AI Photo Culling & 15-Chapter Ceremony Timeline */}
      <AICullingTimeline />

      {/* Smart Layouts & Cover Designer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SmartLayoutSelector />
        <AlbumCoverDesigner />
      </div>

      {/* Client Digital Proofing Modal */}
      <ClientProofingModal />
    </main>
  );
}
