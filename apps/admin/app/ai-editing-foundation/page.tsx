'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { EditingWorkspaceCanvas } from '../../components/ai-editing-foundation/EditingWorkspaceCanvas';
import { EditHistoryUndoRedo } from '../../components/ai-editing-foundation/EditHistoryUndoRedo';
import { VersionManagerPanel } from '../../components/ai-editing-foundation/VersionManagerPanel';
import { ProcessingQueueMonitor } from '../../components/ai-editing-foundation/ProcessingQueueMonitor';
import { ExportManagerSkeleton } from '../../components/ai-editing-foundation/ExportManagerSkeleton';
import { Sliders, Download, Layers, Sparkles, Cpu } from 'lucide-react';

export default function AIEditingFoundationPage() {
  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Phase 4.0 AI Editing Engine Foundation</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">
            AI Editing Engine Foundation Workspace
          </h1>
          <p className="text-sm text-text-secondary">
            Non-destructive editing infrastructure, interactive Before/After split slider stage,
            undo/redo state stacks, non-destructive versioning, and async job queues.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" className="flex items-center gap-2">
            <Download size={16} />
            Export Master Version
          </Button>
        </div>
      </div>

      {/* Interactive Canvas & Split Slider Stage */}
      <EditingWorkspaceCanvas />

      {/* State Stack Undo/Redo & Version Tree */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <EditHistoryUndoRedo />
        <VersionManagerPanel />
      </div>

      {/* Async Processing Job Queue & Export Manager */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProcessingQueueMonitor />
        <ExportManagerSkeleton />
      </div>
    </main>
  );
}
