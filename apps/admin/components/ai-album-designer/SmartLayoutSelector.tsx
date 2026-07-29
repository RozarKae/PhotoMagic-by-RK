'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { LayoutGrid, Image as ImageIcon, Sparkles, BookOpen } from 'lucide-react';

export const SmartLayoutSelector: React.FC = () => {
  const layouts = [
    { id: 'l-1', name: 'Panoramic Full Bleed', count: '1 Hero Photo', tag: 'High Impact' },
    { id: 'l-2', name: 'Dual Portrait Spread', count: '2 Photos', tag: 'Ceremony Duo' },
    { id: 'l-3', name: '4-Grid Collage', count: '4 Photos', tag: 'Candid Moments' },
    { id: 'l-4', name: 'Vogue Magazine Editorial', count: '3 Photos + Text', tag: 'Luxury Story' },
  ];

  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <LayoutGrid size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Smart AI Page Layout Templates</h3>
        </div>
        <Badge variant="gold">Composition Engine</Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        {layouts.map((l) => (
          <div key={l.id} className="p-3 rounded-xl bg-surface-base border border-border-subtle hover:border-gold-500/50 transition-all cursor-pointer flex flex-col justify-between gap-2">
            <div className="flex flex-col">
              <span className="font-bold text-text-primary text-[11px]">{l.name}</span>
              <span className="text-[9px] text-text-tertiary">{l.count}</span>
            </div>
            <Badge variant="gold" className="text-[9px]">{l.tag}</Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};
