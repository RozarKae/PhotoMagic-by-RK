'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Modal } from '@photomagic/ui';
import { Sparkles, Sliders, Check, Wand2, RefreshCw } from 'lucide-react';

interface AutoAlbumBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (config: any) => void;
}

export const AutoAlbumBuilderModal: React.FC<AutoAlbumBuilderModalProps> = ({
  isOpen,
  onClose,
  onGenerate,
}) => {
  const [selectedStyle, setSelectedStyle] = useState('Luxury');
  const [targetSpreads, setTargetSpreads] = useState(15);
  const [avoidDuplicates, setAvoidDuplicates] = useState(true);
  const [balanceOrientation, setBalanceOrientation] = useState(true);
  const [isBuilding, setIsBuilding] = useState(false);

  const stylePresets = [
    { name: 'Minimal', desc: 'Clean single-image focal points & abundant white space.' },
    { name: 'Classic', desc: 'Balanced grid alignments with traditional margin borders.' },
    { name: 'Luxury', desc: 'Full-bleed hero spreads with gold foil accents & 300 DPI clarity.' },
    { name: 'Cinematic', desc: 'Panoramic 12x18 widescreen spreads with 8K film grain overlays.' },
    {
      name: 'Storytelling',
      desc: 'Sequential chronological moment grouping from prep to fireworks.',
    },
    { name: 'Magazine', desc: 'Editorial Vogue-style text overlays & dynamic asymmetric frames.' },
    {
      name: 'Traditional Wedding',
      desc: 'Heritage courtyard mandap focus with ceremonial detail spreads.',
    },
    {
      name: 'Modern Wedding',
      desc: 'High-contrast fashion portraiture with dynamic spread breaks.',
    },
  ];

  const handleBuild = async () => {
    setIsBuilding(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsBuilding(false);
    onGenerate({ stylePreset: selectedStyle, targetSpreads, avoidDuplicates, balanceOrientation });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI-Assisted Album Auto Builder">
      <div className="flex flex-col gap-6 p-2 text-xs">
        <div className="flex items-center gap-2 p-3 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-500">
          <Wand2 size={18} />
          <span>
            Analyzing 120 client favorite photos for orientation, lighting & chronological grouping.
          </span>
        </div>

        {/* Style Presets */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-text-primary text-xs">
            Select Album Design Aesthetic Style
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {stylePresets.map((style) => (
              <div
                key={style.name}
                onClick={() => setSelectedStyle(style.name)}
                className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                  selectedStyle === style.name
                    ? 'bg-gold-500/20 border-gold-500 text-gold-500 ring-1 ring-gold-500'
                    : 'bg-surface-base border-border-subtle hover:border-gold-500/40 text-text-secondary'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-xs text-text-primary">{style.name}</span>
                  {selectedStyle === style.name && <Check size={14} className="text-gold-500" />}
                </div>
                <p className="text-[10px] text-text-tertiary leading-tight">{style.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Configuration Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border-subtle">
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-text-secondary">
              Target Spreads (2 Pages per Spread)
            </label>
            <input
              type="number"
              value={targetSpreads}
              onChange={(e) => setTargetSpreads(Number(e.target.value))}
              min={5}
              max={50}
              className="h-9 px-3 rounded-lg bg-surface-base border border-border-subtle text-xs text-text-primary font-mono focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2 justify-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={avoidDuplicates}
                onChange={(e) => setAvoidDuplicates(e.target.checked)}
                className="accent-gold-500"
              />
              <span className="text-text-primary font-medium">
                Automatically Filter Near-Duplicates
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={balanceOrientation}
                onChange={(e) => setBalanceOrientation(e.target.checked)}
                className="accent-gold-500"
              />
              <span className="text-text-primary font-medium">
                Balance Portrait vs Landscape Layouts
              </span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border-subtle">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleBuild}
            disabled={isBuilding}
            className="flex items-center gap-1.5 font-bold"
          >
            {isBuilding ? <RefreshCw size={14} className="animate-spin" /> : <Wand2 size={14} />}
            {isBuilding ? 'Synthesizing Spreads...' : 'Generate Auto Album Layout'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
