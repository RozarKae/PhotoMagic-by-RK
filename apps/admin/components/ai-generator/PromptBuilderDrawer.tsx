'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Sliders, Plus, Sparkles } from 'lucide-react';

interface PromptBuilderDrawerProps {
  onInsertParameter: (paramText: string) => void;
}

export const PromptBuilderDrawer: React.FC<PromptBuilderDrawerProps> = ({ onInsertParameter }) => {
  const promptTokens = [
    { category: 'Subject', options: ['Royal Indian Bride', 'Haute Couture Model', 'Groom in Tuxedo', 'Fine Art Studio Model'] },
    { category: 'Clothing', options: ['Raw Silk Gold Sherwani', 'Velvet Lehenga', 'Italian Tailored Tuxedo', 'Minimalist Linen'] },
    { category: 'Pose', options: ['Candid Over-the-Shoulder Glance', 'Symmetrical Studio Stance', 'Elegantly Walking', 'Seated Regal Pose'] },
    { category: 'Lighting', options: ['Cinematic Golden Hour Sunset', 'Softbox Studio Key Light', 'Dramatic Rim Lighting', 'Soft Ambient Daylight'] },
    { category: 'Background', options: ['Udaipur Heritage City Palace', 'Paris Eiffel Tower View', 'Obsidian Black Studio Drop', 'Ornate Marble Courtyard'] },
    { category: 'Mood & Color', options: ['Warm Vintage Film Tones', 'Monochrome High-Contrast', 'Rich Emerald & Gold Palette', 'Pastel Soft Dream'] },
  ];

  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Sliders size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">1-Click Professional Prompt Builder</h3>
        </div>
        <Badge variant="gold">Photography Modifiers</Badge>
      </div>

      <div className="flex flex-col gap-4 text-xs">
        {promptTokens.map((group, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <span className="font-semibold text-gold-500 uppercase tracking-wider text-[10px]">{group.category}</span>
            <div className="flex flex-wrap gap-1.5">
              {group.options.map((token, tIdx) => (
                <button
                  key={tIdx}
                  type="button"
                  onClick={() => onInsertParameter(token)}
                  className="px-2.5 py-1 rounded-lg bg-surface-base hover:bg-gold-500/20 border border-border-subtle hover:border-gold-500/50 text-text-secondary hover:text-text-primary transition-all flex items-center gap-1 text-[11px]"
                >
                  <Plus size={12} className="text-gold-500" />
                  {token}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
