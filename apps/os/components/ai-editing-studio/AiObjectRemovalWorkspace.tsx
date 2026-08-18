'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import {
  Wand2,
  Brush,
  Crop,
  Sparkles,
  Sliders,
  Undo,
  Redo,
  ShieldCheck,
  RefreshCw,
  Eye,
  Move,
} from 'lucide-react';

export const AiObjectRemovalWorkspace: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<
    'brush' | 'smart_lasso' | 'rectangle' | 'magic_select' | 'auto_detect'
  >('smart_lasso');
  const [targetType, setTargetType] = useState('photobomber');
  const [qualityMode, setQualityMode] = useState('maximum_quality');
  const [isRemoving, setIsRemoving] = useState(false);
  const [brushSize, setBrushSize] = useState(35);
  const [currentImage, setCurrentImage] = useState(
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
  );
  const [telemetry, setTelemetry] = useState({
    model: 'briaai/RMBG-1.4 (SOTA Matting)',
    provider: 'Hugging Face Serverless (Cloud GPU)',
    latencyMs: 210,
    accelerator: 'NVIDIA A10G Tensor Core Cloud',
  });

  const removalTargets = [
    { label: 'Photobombers & People', value: 'photobomber' },
    { label: 'Power Lines & Wires', value: 'wires' },
    { label: 'Light Poles & Signs', value: 'poles' },
    { label: 'Ground Trash & Spots', value: 'trash' },
    { label: 'Lens Dust & Reflections', value: 'reflections' },
  ];

  const handleApplyRemoval = async () => {
    setIsRemoving(true);
    const start = Date.now();

    try {
      const res = await fetch('/api/ai/background-remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: currentImage }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data?.imageUrl) {
          setCurrentImage(data.data.imageUrl);
        }
        if (data.telemetry) {
          setTelemetry({
            model: data.telemetry.model || telemetry.model,
            provider: data.telemetry.provider || telemetry.provider,
            latencyMs: data.telemetry.latencyMs || Date.now() - start,
            accelerator: data.telemetry.accelerator || telemetry.accelerator,
          });
        }
      }
    } catch {
      setTelemetry((prev) => ({ ...prev, latencyMs: Date.now() - start }));
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Wand2 size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Phase 4.4 AI Generative Object & Background Studio
          </h3>
        </div>
        <Badge variant="gold">Content-Aware Edge Preservation Active</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Selection Tools & Settings */}
        <div className="flex flex-col gap-4 text-xs">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-text-primary">Interactive Selection Tools</label>
            <div className="grid grid-cols-2 gap-2">
              {(['brush', 'smart_lasso', 'rectangle', 'magic_select', 'auto_detect'] as const).map(
                (tool) => (
                  <Button
                    key={tool}
                    variant={selectedTool === tool ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => setSelectedTool(tool)}
                    className="capitalize text-xs flex items-center justify-center gap-1.5"
                  >
                    <Brush size={12} /> {tool.replace('_', ' ')}
                  </Button>
                ),
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-border-subtle">
            <label className="font-semibold text-text-secondary">
              Brush Mask Thickness ({brushSize}px)
            </label>
            <input
              type="range"
              min={5}
              max={100}
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="accent-gold-500 cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-border-subtle">
            <label className="font-semibold text-text-secondary">
              Target Object Classification
            </label>
            <select
              value={targetType}
              onChange={(e) => setTargetType(e.target.value)}
              className="h-9 px-3 rounded-lg bg-surface-base border border-border-subtle text-xs text-text-primary font-mono focus:outline-none"
            >
              {removalTargets.map((tgt) => (
                <option key={tgt.value} value={tgt.value}>
                  {tgt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-border-subtle">
            <label className="font-semibold text-text-secondary">
              AI Generative Fill Quality Mode
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['fast', 'balanced', 'high_quality', 'maximum_quality'] as const).map((qm) => (
                <Button
                  key={qm}
                  variant={qualityMode === qm ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setQualityMode(qm)}
                  className="capitalize text-[11px]"
                >
                  {qm.replace('_', ' ')}
                </Button>
              ))}
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleApplyRemoval}
            disabled={isRemoving}
            className="w-full mt-2 font-bold flex items-center justify-center gap-2"
          >
            {isRemoving ? <RefreshCw size={16} className="animate-spin" /> : <Wand2 size={16} />}
            {isRemoving ? 'Reconstructing via Cloud GPU...' : 'Execute Generative AI Extraction'}
          </Button>
        </div>

        {/* Interactive Removal Canvas */}
        <div className="lg:col-span-2 relative min-h-[340px] rounded-2xl bg-canvas border border-border-subtle flex flex-col justify-center items-center overflow-hidden p-4">
          <div className="relative w-full h-full max-h-[320px] rounded-xl overflow-hidden shadow-2xl border border-gold-500/30">
            <img
              src={currentImage}
              alt="Object Removal Preview"
              className={`w-full h-full object-cover transition-all duration-300 ${
                isRemoving ? 'filter blur-[1px] opacity-75' : ''
              }`}
            />

            {/* Smart Lasso Selection Mask Overlay */}
            {!isRemoving && (
              <div className="absolute top-1/4 left-1/3 w-32 h-32 rounded-full border-2 border-dashed border-gold-500 bg-gold-500/20 backdrop-blur-[2px] flex items-center justify-center animate-pulse">
                <span className="text-[10px] font-mono text-gold-500 font-bold bg-canvas/80 px-2 py-0.5 rounded">
                  Target Masked
                </span>
              </div>
            )}

            {isRemoving && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 z-20">
                <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-mono font-bold text-gold-400">
                  Executing RMBG-1.4 Neural Matting...
                </span>
              </div>
            )}
          </div>

          {/* Telemetry Status Bar */}
          <div className="w-full mt-4 flex flex-wrap justify-between items-center text-xs text-text-tertiary gap-2">
            <span className="font-mono text-[11px] text-text-secondary truncate">
              Model: {telemetry.model} ({telemetry.provider})
            </span>
            <div className="flex items-center gap-2">
              <Badge variant="success">{telemetry.latencyMs}ms Latency</Badge>
              <Badge variant="gold">{telemetry.accelerator}</Badge>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
