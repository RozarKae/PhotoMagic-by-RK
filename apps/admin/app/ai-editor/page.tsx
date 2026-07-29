'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { EditingCanvasStage } from '../../components/ai-editor/EditingCanvasStage';
import { ColorGradingPanel } from '../../components/ai-editor/ColorGradingPanel';
import { PortraitRetouchingPanel } from '../../components/ai-editor/PortraitRetouchingPanel';
import { AIBackgroundObjectTools } from '../../components/ai-editor/AIBackgroundObjectTools';
import { EditingHistoryLayers } from '../../components/ai-editor/EditingHistoryLayers';
import { SlidersHorizontal, Wand2, Download, RefreshCw, Undo, Redo } from 'lucide-react';

export default function AIEditorWorkspacePage() {
  const [originalUrl] = useState(
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
  );
  const [editedUrl] = useState(
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80'
  );

  const [colorGrading, setColorGrading] = useState({
    exposure: 0.4,
    contrast: 15,
    highlights: -10,
    shadows: 10,
    temperature: 12,
    presetLut: 'Luxury Wedding',
  });

  const [retouching, setRetouching] = useState({
    skinSmoothing: 35,
    blemishRemoval: 80,
    teethWhitening: 25,
    eyeEnhancement: 40,
    faceLighting: 30,
  });

  const handleColorChange = (field: string, val: number | string) => {
    setColorGrading((prev) => ({ ...prev, [field]: val }));
  };

  const handleRetouchChange = (field: string, val: number) => {
    setRetouching((prev) => ({ ...prev, [field]: val }));
  };

  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Phase 3.2 AI Editing Studio</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">AI Photo Editing Studio Workspace</h1>
          <p className="text-sm text-text-secondary">Non-destructive 16-bit color grading, AI portrait beauty retouching, background removal, and layer stacks.</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" className="flex items-center gap-1">
            <Undo size={14} /> Undo
          </Button>
          <Button variant="secondary" size="sm" className="flex items-center gap-1">
            <Redo size={14} /> Redo
          </Button>
          <Button variant="primary" className="flex items-center gap-2">
            <Download size={16} />
            Export Master TIFF / PSD
          </Button>
        </div>
      </div>

      {/* Main Interactive Stage Canvas */}
      <EditingCanvasStage originalUrl={originalUrl} editedUrl={editedUrl} />

      {/* Editing Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ColorGradingPanel
          exposure={colorGrading.exposure}
          contrast={colorGrading.contrast}
          highlights={colorGrading.highlights}
          shadows={colorGrading.shadows}
          temperature={colorGrading.temperature}
          presetLut={colorGrading.presetLut}
          onChange={handleColorChange}
        />

        <PortraitRetouchingPanel
          skinSmoothing={retouching.skinSmoothing}
          blemishRemoval={retouching.blemishRemoval}
          teethWhitening={retouching.teethWhitening}
          eyeEnhancement={retouching.eyeEnhancement}
          faceLighting={retouching.faceLighting}
          onChange={handleRetouchChange}
        />

        <AIBackgroundObjectTools />
        <EditingHistoryLayers />
      </div>
    </main>
  );
}
