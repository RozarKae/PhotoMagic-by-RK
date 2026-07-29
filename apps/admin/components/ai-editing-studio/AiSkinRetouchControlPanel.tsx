'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Sparkles, Sliders, Users, Smile, Eye, Heart, ShieldCheck } from 'lucide-react';

export const AiSkinRetouchControlPanel: React.FC = () => {
  const [beautyPreset, setBeautyPreset] = useState('Luxury Editorial');
  const [skinSmoothing, setSkinSmoothing] = useState(45);
  const [blemishRemoval, setBlemishRemoval] = useState(80);
  const [wrinkleReduction, setWrinkleReduction] = useState(30);
  const [underEyeCorrection, setUnderEyeCorrection] = useState(50);
  const [teethWhitening, setTeethWhitening] = useState(40);
  const [eyeEnhancement, setEyeEnhancement] = useState(60);
  const [lipEnhancement, setLipEnhancement] = useState(35);
  const [opacity, setOpacity] = useState(100);

  const presets = ['Natural', 'Studio', 'Luxury Editorial', 'Wedding', 'High Fashion'];

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-5">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Phase 4.5 AI Skin Retouch & Natural Portrait Controls</h3>
        </div>
        <Badge variant="success">Pore Texture Lock Active (Zero Plastic Look)</Badge>
      </div>

      {/* Beauty Preset Selector */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-text-primary text-xs">Retouching Style Preset</label>
        <div className="flex flex-wrap gap-2 text-xs">
          {presets.map((preset) => (
            <Button
              key={preset}
              variant={beautyPreset === preset ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setBeautyPreset(preset)}
              className="text-xs font-medium"
            >
              {preset}
            </Button>
          ))}
        </div>
      </div>

      {/* Portrait Fine-Grained Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2 border-t border-border-subtle">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-text-secondary">Natural Skin Smoothing</span>
            <span className="font-mono text-gold-500 font-bold">{skinSmoothing}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={skinSmoothing}
            onChange={(e) => setSkinSmoothing(Number(e.target.value))}
            className="accent-gold-500 cursor-pointer"
          />

          <div className="flex justify-between items-center">
            <span className="font-semibold text-text-secondary">Acne & Blemish Removal</span>
            <span className="font-mono text-gold-500 font-bold">{blemishRemoval}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={blemishRemoval}
            onChange={(e) => setBlemishRemoval(Number(e.target.value))}
            className="accent-gold-500 cursor-pointer"
          />

          <div className="flex justify-between items-center">
            <span className="font-semibold text-text-secondary">Wrinkle Reduction</span>
            <span className="font-mono text-gold-500 font-bold">{wrinkleReduction}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={wrinkleReduction}
            onChange={(e) => setWrinkleReduction(Number(e.target.value))}
            className="accent-gold-500 cursor-pointer"
          />

          <div className="flex justify-between items-center">
            <span className="font-semibold text-text-secondary">Under-Eye Correction</span>
            <span className="font-mono text-gold-500 font-bold">{underEyeCorrection}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={underEyeCorrection}
            onChange={(e) => setUnderEyeCorrection(Number(e.target.value))}
            className="accent-gold-500 cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-text-secondary">Natural Teeth Whitening</span>
            <span className="font-mono text-gold-500 font-bold">{teethWhitening}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={teethWhitening}
            onChange={(e) => setTeethWhitening(Number(e.target.value))}
            className="accent-gold-500 cursor-pointer"
          />

          <div className="flex justify-between items-center">
            <span className="font-semibold text-text-secondary">Iris & Eye Enhancement</span>
            <span className="font-mono text-gold-500 font-bold">{eyeEnhancement}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={eyeEnhancement}
            onChange={(e) => setEyeEnhancement(Number(e.target.value))}
            className="accent-gold-500 cursor-pointer"
          />

          <div className="flex justify-between items-center">
            <span className="font-semibold text-text-secondary">Lip Detail & Richness</span>
            <span className="font-mono text-gold-500 font-bold">{lipEnhancement}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={lipEnhancement}
            onChange={(e) => setLipEnhancement(Number(e.target.value))}
            className="accent-gold-500 cursor-pointer"
          />

          <div className="flex justify-between items-center">
            <span className="font-semibold text-text-secondary">Global Layer Opacity</span>
            <span className="font-mono text-gold-500 font-bold">{opacity}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="accent-gold-500 cursor-pointer"
          />
        </div>
      </div>
    </Card>
  );
};
