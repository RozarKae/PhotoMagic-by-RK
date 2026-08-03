'use client';

import React from 'react';
import { Card, Badge, Button, Select } from '@photomagic/ui';
import { Sliders, Sun, Palette, Sparkles } from 'lucide-react';

interface ColorGradingPanelProps {
  exposure: number;
  contrast: number;
  highlights: number;
  shadows: number;
  temperature: number;
  presetLut: string;
  onChange: (field: string, value: number | string) => void;
}

export const ColorGradingPanel: React.FC<ColorGradingPanelProps> = ({
  exposure,
  contrast,
  highlights,
  shadows,
  temperature,
  presetLut,
  onChange,
}) => {
  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Palette size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Color Grading & Wedding LUT Presets
          </h3>
        </div>
        <Badge variant="gold">Non-Destructive Stack</Badge>
      </div>

      <div className="flex flex-col gap-1.5 text-xs">
        <label className="font-semibold text-text-secondary">
          Wedding Studio Preset (.CUBE LUT)
        </label>
        <Select
          value={presetLut}
          onChange={(val: string) => onChange('presetLut', val)}
          options={[
            { value: 'Luxury Wedding', label: 'Luxury Wedding (Gold Glow)' },
            { value: 'Royal Wedding', label: 'Royal Wedding (Deep Emerald & Velvet)' },
            { value: 'South Indian Wedding', label: 'South Indian Silk Gold' },
            { value: 'Reception Glow', label: 'Reception Glow (Warm Ambient)' },
            { value: 'Pastel Dream', label: 'Pastel Dream (Soft Editorial)' },
            { value: 'Dark Moody', label: 'Dark Moody Cinematic' },
          ]}
        />
      </div>

      <div className="flex flex-col gap-3 text-xs pt-2">
        {/* Exposure Slider */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[11px]">
            <span className="font-semibold text-text-primary">Exposure EV</span>
            <span className="font-mono text-gold-500">
              {exposure > 0 ? `+${exposure}` : exposure}
            </span>
          </div>
          <input
            type="range"
            min="-5"
            max="5"
            step="0.1"
            value={exposure}
            onChange={(e) => onChange('exposure', Number(e.target.value))}
            className="w-full h-1.5 bg-surface-base rounded-lg appearance-none cursor-pointer accent-gold-500"
          />
        </div>

        {/* Contrast Slider */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[11px]">
            <span className="font-semibold text-text-primary">Contrast</span>
            <span className="font-mono text-gold-500">{contrast}</span>
          </div>
          <input
            type="range"
            min="-100"
            max="100"
            value={contrast}
            onChange={(e) => onChange('contrast', Number(e.target.value))}
            className="w-full h-1.5 bg-surface-base rounded-lg appearance-none cursor-pointer accent-gold-500"
          />
        </div>

        {/* Temperature Slider */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[11px]">
            <span className="font-semibold text-text-primary">Color Temp (Kelvin)</span>
            <span className="font-mono text-gold-500">{temperature}</span>
          </div>
          <input
            type="range"
            min="-100"
            max="100"
            value={temperature}
            onChange={(e) => onChange('temperature', Number(e.target.value))}
            className="w-full h-1.5 bg-surface-base rounded-lg appearance-none cursor-pointer accent-gold-500"
          />
        </div>
      </div>
    </Card>
  );
};
