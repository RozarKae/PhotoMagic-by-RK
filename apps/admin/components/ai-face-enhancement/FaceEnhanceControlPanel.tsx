'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Sparkles, Sliders, Eye, Sun, CheckCircle2 } from 'lucide-react';

export const FaceEnhanceControlPanel: React.FC = () => {
  const [masterStrength, setMasterStrength] = useState(75);
  const [skinSmoothing, setSkinSmoothing] = useState(60);
  const [blemishRemoval, setBlemishRemoval] = useState(85);
  const [eyeBrightening, setEyeBrightening] = useState(40);
  const [lipDetail, setLipDetail] = useState(30);
  const [teethWhitening, setTeethWhitening] = useState(35);
  const [relighting, setRelighting] = useState(25);

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-5">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Sliders size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Natural AI Portrait Enhancement Controls</h3>
        </div>
        <Badge variant="gold">Zero Plastic Look Guaranteed</Badge>
      </div>

      {/* Master Enhancement Strength Slider */}
      <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/30 flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-text-primary flex items-center gap-1.5">
            <Sparkles size={14} className="text-gold-500" /> Master AI Enhancement Strength
          </span>
          <span className="font-mono font-bold text-gold-500 text-sm">{masterStrength}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={masterStrength}
          onChange={(e) => setMasterStrength(Number(e.target.value))}
          className="w-full accent-gold-500 cursor-pointer"
        />
      </div>

      {/* Fine-Grained Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-text-secondary">Skin Texture & Micro-Smoothing</span>
            <span className="font-mono text-gold-500 font-bold">{skinSmoothing}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={skinSmoothing}
            onChange={(e) => setSkinSmoothing(Number(e.target.value))}
            className="w-full accent-gold-500 cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-text-secondary">Acne & Blemish Removal</span>
            <span className="font-mono text-gold-500 font-bold">{blemishRemoval}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={blemishRemoval}
            onChange={(e) => setBlemishRemoval(Number(e.target.value))}
            className="w-full accent-gold-500 cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-text-secondary">Iris Sharpening & Eye Brightness</span>
            <span className="font-mono text-gold-500 font-bold">{eyeBrightening}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={eyeBrightening}
            onChange={(e) => setEyeBrightening(Number(e.target.value))}
            className="w-full accent-gold-500 cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-text-secondary">Lip Detail & Color Richness</span>
            <span className="font-mono text-gold-500 font-bold">{lipDetail}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={lipDetail}
            onChange={(e) => setLipDetail(Number(e.target.value))}
            className="w-full accent-gold-500 cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-text-secondary">Natural Teeth Whitening</span>
            <span className="font-mono text-gold-500 font-bold">{teethWhitening}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={teethWhitening}
            onChange={(e) => setTeethWhitening(Number(e.target.value))}
            className="w-full accent-gold-500 cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-text-secondary">Intelligent Face Relighting</span>
            <span className="font-mono text-gold-500 font-bold">{relighting}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={relighting}
            onChange={(e) => setRelighting(Number(e.target.value))}
            className="w-full accent-gold-500 cursor-pointer"
          />
        </div>
      </div>
    </Card>
  );
};
