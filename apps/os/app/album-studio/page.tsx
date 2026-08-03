'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import {
  AlbumStudioDashboard,
  AlbumProjectItem,
} from '../../components/album-studio/AlbumStudioDashboard';
import { AutoAlbumBuilderModal } from '../../components/album-studio/AutoAlbumBuilderModal';
import { ManualAlbumCanvasEditor } from '../../components/album-studio/ManualAlbumCanvasEditor';
import { AlbumReviewSystemModal } from '../../components/album-studio/AlbumReviewSystemModal';
import { PrintProductionExportCenter } from '../../components/album-studio/PrintProductionExportCenter';
import { AlbumTemplatesManager } from '../../components/album-studio/AlbumTemplatesManager';
import { Album3dCoverDesigner } from '../../components/album-studio/Album3dCoverDesigner';
import { AlbumApprovalWorkflowTracker } from '../../components/album-studio/AlbumApprovalWorkflowTracker';
import { AlbumPrintLabPackageGenerator } from '../../components/album-studio/AlbumPrintLabPackageGenerator';
import { AlbumRevisionHistoryTimeline } from '../../components/album-studio/AlbumRevisionHistoryTimeline';
import { AlbumFinalDeliveryCenter } from '../../components/album-studio/AlbumFinalDeliveryCenter';
import { BookOpen, SlidersHorizontal, Eye, Printer, Wand2 } from 'lucide-react';

export default function AlbumStudioPage() {
  const [selectedProject, setSelectedProject] = useState<AlbumProjectItem | null>({
    id: 'alb-1',
    clientName: 'Eleanor Vance & Julian',
    eventTitle: 'Royal Udaipur Destination Wedding',
    albumSize: '12x18 Inches',
    totalPages: 30,
    status: 'awaiting_approval',
    coverImage:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    assignedDesigner: 'Vikram Sethi (Lead Designer)',
    lastUpdated: '10 mins ago',
  });

  const [autoBuilderOpen, setAutoBuilderOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Final Cut Suite v7.0</Badge>
          <h1 className="text-3xl font-extrabold text-ivory font-hero tracking-wide mt-1">
            Final Cut Suite & Archival Book Designer
          </h1>
          <p className="text-sm text-silver font-mono">
            AI auto-scene layout builder, spread canvas, 3D cover designer with 24K gold foil
            stamping, client digital proof review, approval workflow locking, and 600 DPI CMYK print
            lab export engine.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={() => setReviewModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Eye size={16} /> Open Final Cut Review Hub
          </Button>
          <Button
            variant="primary"
            onClick={() => setAutoBuilderOpen(true)}
            className="flex items-center gap-2 font-bold"
          >
            <Wand2 size={16} /> AI Auto Final Cut Builder
          </Button>
        </div>
      </div>

      {/* Phase 7.5 Approval Workflow Tracker */}
      <AlbumApprovalWorkflowTracker />

      {/* Phase 7.9 Final Delivery Center & Certificate Generator */}
      <AlbumFinalDeliveryCenter />

      {/* Album Dashboard */}
      <AlbumStudioDashboard
        onSelectProject={(p) => setSelectedProject(p)}
        onOpenAutoBuilder={() => setAutoBuilderOpen(true)}
      />

      {/* Phase 7.3 3D Cover Designer */}
      <Album3dCoverDesigner />

      {/* Manual 12x18 Canvas Editor */}
      <ManualAlbumCanvasEditor />

      {/* Phase 7.7 Print Lab Package Generator */}
      <AlbumPrintLabPackageGenerator />

      {/* Phase 7.8 Revision History Timeline */}
      <AlbumRevisionHistoryTimeline />

      {/* Print Production & Export Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PrintProductionExportCenter />
        <AlbumTemplatesManager />
      </div>

      {/* Modals */}
      <AutoAlbumBuilderModal
        isOpen={autoBuilderOpen}
        onClose={() => setAutoBuilderOpen(false)}
        onGenerate={(config) => console.log('Auto generated:', config)}
      />

      <AlbumReviewSystemModal isOpen={reviewModalOpen} onClose={() => setReviewModalOpen(false)} />
    </main>
  );
}
