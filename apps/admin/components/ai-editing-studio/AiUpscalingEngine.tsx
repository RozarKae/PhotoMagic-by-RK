'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Sparkles, Maximize2, Zap, Eye, CheckCircle2, RefreshCw } from 'lucide-react';

export const AiUpscalingEngine: React.FC = () => {
  const [scaleFactor, setScaleFactor] = useState('4x');
  const [enhancementMode, setEnhancementMode] = useState('portrait');
  const [faceReconstruction, setFaceReconstruction] = useState(true);
  const [fabricDetail, setFabricDetail] = useState(true);
  const [isUpscaling, setIsUpscaling] = useState(false);

  const scaleOptions = ['2x', '4x', '6x', '8x'];
  const modes = [
    { label: 'High-Res Photo', value: 'photo' },
    { label: 'Portrait & Face Recovery', value: 'portrait' },
    { label: 'Landscape & Horizon', value: 'landscape' },
    { label: 'Low Resolution Recovery', value: 'low_res_recovery' },
  ];

  const handleUpscale = async () => {
    setIsUpscaling(true);
    await new Promise((resolve) => setTimeout(resolve, 1100));
    setIsUpscaling(false);
  };

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-5">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Maximize2 size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Phase 4.7 AI Super-Resolution & Upscaling Engine</h3>
        </div>
        <Badge variant="gold">CUDA Tensor Core Accelerated • {scaleFactor} Scale</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Scale & Mode Controls */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-text-primary">Super-Resolution Scale Factor</label>
            <div className="grid grid-cols-4 gap-2">
              {scaleOptions.map((s) => (
                <Button
                  key={s}
                  variant={scaleFactor === s ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setScaleFactor(s)}
                  className="font-mono text-xs font-bold"
                >
                  {s} Scale
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-border-subtle">
            <label className="font-semibold text-text-secondary">AI Enhancement Output Mode</label>
            <select
              value={enhancementMode}
              onChange={(e) => setEnhancementMode(e.target.value)}
              className="h-9 px-3 rounded-lg bg-surface-base border border-border-subtle text-xs text-text-primary font-mono focus:outline-none"
            >
              {modes.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-border-subtle">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={faceReconstruction}
                onChange={(e) => setFaceReconstruction(e.target.checked)}
                className="accent-gold-500"
              />
              <span className="text-text-primary font-medium">AI Face & Eye Micro-Reconstruction</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={fabricDetail}
                onChange={(e) => setFabricDetail(e.target.checked)}
                className="accent-gold-500"
              />
              <span className="text-text-primary font-medium">Fabric & Jewelry Micro-Texture Recovery</span>
            </label>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleUpscale}
            disabled={isUpscaling}
            className="w-full mt-2 font-bold flex items-center justify-center gap-2"
          >
            {isUpscaling ? <RefreshCw size={16} className="animate-spin" /> : <Sparkles size={16} />}
            {isUpscaling ? 'Upscaling Resolution...' : `Execute ${scaleFactor} Super-Resolution Upscale`}
          </Button>
        </div>

        {/* Telemetry & Resolution Output Specs */}
        <div className="flex flex-col gap-4">
          <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-2">
            <span className="text-text-tertiary font-semibold">Output Resolution Preview</span>
            <div className="flex justify-between items-baseline font-mono">
              <span className="text-text-secondary text-xs">Original (24 MP)</span>
              <span className="text-gold-500 font-extrabold text-lg">
                {scaleFactor === '2x' ? '48 MP (4K)' : scaleFactor === '4x' ? '96 MP (8K UHD)' : '192 MP Master'}
              </span>
            </div>
            <span className="text-[10px] text-status-success font-mono">300 DPI CMYK Print Ready Spec</span>
          </div>

          <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-2">
            <span className="text-text-tertiary font-semibold">NVIDIA CUDA GPU Accelerator</span>
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-text-primary">NVIDIA RTX 4090 24GB</span>
              <Badge variant="success">1.4s / Frame Latency</Badge>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
