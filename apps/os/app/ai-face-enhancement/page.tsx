'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { FaceLandmarkInspector } from '../../components/ai-face-enhancement/FaceLandmarkInspector';
import { FaceEnhanceControlPanel } from '../../components/ai-face-enhancement/FaceEnhanceControlPanel';
import { MultiFaceBatchSelector } from '../../components/ai-face-enhancement/MultiFaceBatchSelector';
import { GpuProcessingStatus } from '../../components/ai-face-enhancement/GpuProcessingStatus';
import { ScanFace, Sparkles, Download, Zap, Users } from 'lucide-react';

export default function AIFaceEnhancementPage() {
  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Phase 4.1 AI Face Enhancement Engine</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">
            AI Face Enhancement Engine
          </h1>
          <p className="text-sm text-text-secondary">
            68-point facial landmark mesh detection, non-destructive pore texture preservation,
            single & multi-face group portrait retouching, and CUDA GPU acceleration.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" className="flex items-center gap-2">
            <Sparkles size={16} />
            Apply Master Enhancement
          </Button>
        </div>
      </div>

      {/* GPU Acceleration Telemetry */}
      <GpuProcessingStatus />

      {/* Facial Landmark Inspector & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FaceLandmarkInspector />
        <div className="flex flex-col gap-8">
          <FaceEnhanceControlPanel />
          <MultiFaceBatchSelector />
        </div>
      </div>
    </main>
  );
}
