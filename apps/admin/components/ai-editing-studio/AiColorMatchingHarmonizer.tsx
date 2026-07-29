'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Sliders, Sun, Camera, Sparkles, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

export const AiColorMatchingHarmonizer: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState('Luxury Gold');
  const [sceneType, setSceneType] = useState('golden_hour');
  const [warmthShift, setWarmthShift] = useState(15);
  const [tintShift, setTintShift] = useState(-5);

  const presets = [
    'Wedding Warm', 'Luxury Gold', 'Moody', 'Cinematic', 'Editorial', 'Natural', 'Vintage', 'Film', 'Premium Studio'
  ];

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-5">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Sliders size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Phase 4.6 AI Color Harmonization & Reference Matching</h3>
        </div>
        <Badge variant="gold">Scene: Golden Hour Outdoor Detected</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Preset LUT Selector */}
        <div className="flex flex-col gap-3">
          <label className="font-bold text-text-primary">Master Color Grading LUT Presets</label>
          <div className="grid grid-cols-3 gap-2">
            {presets.map((preset) => (
              <Button
                key={preset}
                variant={selectedPreset === preset ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedPreset(preset)}
                className="text-[11px] font-medium"
              >
                {preset}
              </Button>
            ))}
          </div>
        </div>

        {/* Reference Image Copy & Fine Adjustments */}
        <div className="flex flex-col gap-4">
          <div className="p-3 rounded-xl bg-surface-base border border-border-subtle flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ImageIcon size={16} className="text-gold-500" />
              <span className="font-semibold text-text-primary">Copy Color Grade from Reference Photo</span>
            </div>
            <Button variant="secondary" size="sm" className="text-xs">
              Upload Reference
            </Button>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-text-secondary">AI Color Warmth Balance</span>
              <span className="font-mono text-gold-500 font-bold">+{warmthShift}K</span>
            </div>
            <input
              type="range"
              min={-50}
              max={50}
              value={warmthShift}
              onChange={(e) => setWarmthShift(Number(e.target.value))}
              className="accent-gold-500 cursor-pointer"
            />

            <div className="flex justify-between items-center">
              <span className="font-semibold text-text-secondary">Magenta / Green Tint Shift</span>
              <span className="font-mono text-gold-500 font-bold">{tintShift}</span>
            </div>
            <input
              type="range"
              min={-50}
              max={50}
              value={tintShift}
              onChange={(e) => setTintShift(Number(e.target.value))}
              className="accent-gold-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
