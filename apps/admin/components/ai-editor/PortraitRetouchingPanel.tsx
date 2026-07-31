'use client';

import React from 'react';
import { Card, Badge } from '@photomagic/ui';
import { User, Sparkles, Eye, Smile } from 'lucide-react';

interface PortraitRetouchingPanelProps {
  skinSmoothing: number;
  blemishRemoval: number;
  teethWhitening: number;
  eyeEnhancement: number;
  faceLighting: number;
  onChange: (field: string, value: number) => void;
}

export const PortraitRetouchingPanel: React.FC<PortraitRetouchingPanelProps> = ({
  skinSmoothing,
  blemishRemoval,
  teethWhitening,
  eyeEnhancement,
  faceLighting,
  onChange,
}) => {
  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <User size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            AI Portrait Retouching & Beauty Mode
          </h3>
        </div>
        <Badge variant="gold">Face Detection Active</Badge>
      </div>

      <div className="flex flex-col gap-3 text-xs">
        {/* Skin Smoothing */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[11px]">
            <span className="font-semibold text-text-primary">
              Skin Smoothing (Texture Preserved)
            </span>
            <span className="font-mono text-gold-500">{skinSmoothing}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={skinSmoothing}
            onChange={(e) => onChange('skinSmoothing', Number(e.target.value))}
            className="w-full h-1.5 bg-surface-base rounded-lg appearance-none cursor-pointer accent-gold-500"
          />
        </div>

        {/* Blemish Removal */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[11px]">
            <span className="font-semibold text-text-primary">AI Blemish & Acne Removal</span>
            <span className="font-mono text-gold-500">{blemishRemoval}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={blemishRemoval}
            onChange={(e) => onChange('blemishRemoval', Number(e.target.value))}
            className="w-full h-1.5 bg-surface-base rounded-lg appearance-none cursor-pointer accent-gold-500"
          />
        </div>

        {/* Teeth Whitening */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[11px]">
            <span className="font-semibold text-text-primary">Teeth Whitening</span>
            <span className="font-mono text-gold-500">{teethWhitening}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={teethWhitening}
            onChange={(e) => onChange('teethWhitening', Number(e.target.value))}
            className="w-full h-1.5 bg-surface-base rounded-lg appearance-none cursor-pointer accent-gold-500"
          />
        </div>

        {/* Eye Enhancement */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[11px]">
            <span className="font-semibold text-text-primary">Eye Catchlight & Clarity</span>
            <span className="font-mono text-gold-500">{eyeEnhancement}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={eyeEnhancement}
            onChange={(e) => onChange('eyeEnhancement', Number(e.target.value))}
            className="w-full h-1.5 bg-surface-base rounded-lg appearance-none cursor-pointer accent-gold-500"
          />
        </div>
      </div>
    </Card>
  );
};
