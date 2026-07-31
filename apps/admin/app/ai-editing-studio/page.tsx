'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { AiObjectRemovalWorkspace } from '../../components/ai-editing-studio/AiObjectRemovalWorkspace';
import { AiSkinRetouchControlPanel } from '../../components/ai-editing-studio/AiSkinRetouchControlPanel';
import { AiColorMatchingHarmonizer } from '../../components/ai-editing-studio/AiColorMatchingHarmonizer';
import { AiUpscalingEngine } from '../../components/ai-editing-studio/AiUpscalingEngine';
import { AiBatchProcessingQueue } from '../../components/ai-editing-studio/AiBatchProcessingQueue';
import { AiExportCenterHub } from '../../components/ai-editing-studio/AiExportCenterHub';
import { Wand2, Sparkles, Sliders, ShieldCheck, Download, Maximize2, Cpu } from 'lucide-react';

export default function AiEditingStudioPage() {
  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Phases 4.4 – 4.9 Master AI Editing Studio Suite</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">
            Professional AI Post-Production Workspace
          </h1>
          <p className="text-sm text-text-secondary">
            Generative object removal, non-destructive skin retouching, color grade matching, 8K
            super-resolution upscaling, batch processing queue, and master export center.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" className="flex items-center gap-2 font-bold">
            <Sparkles size={16} /> Batch Render Master Edits
          </Button>
        </div>
      </div>

      {/* Phase 4.4 AI Object Removal Canvas */}
      <AiObjectRemovalWorkspace />

      {/* Phase 4.5 AI Skin Retouch & Phase 4.6 AI Color Match */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AiSkinRetouchControlPanel />
        <AiColorMatchingHarmonizer />
      </div>

      {/* Phase 4.7 AI Super-Resolution Upscaling */}
      <AiUpscalingEngine />

      {/* Phase 4.8 AI Batch Editing Queue */}
      <AiBatchProcessingQueue />

      {/* Phase 4.9 Master Export Center */}
      <AiExportCenterHub />
    </main>
  );
}
