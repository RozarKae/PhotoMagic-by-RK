import * as React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Layers, Bookmark, Plus, CheckCircle2 } from 'lucide-react';

export const AlbumTemplatesManager: React.FC = () => {
  const templatePresets = [
    {
      name: 'Royal Heritage Wedding',
      category: 'Wedding',
      pages: 30,
      paper: 'Italian Velvet Lustre',
      ratio: '12x18 Inches',
    },
    {
      name: 'Sunset Yacht Pre-Wedding',
      category: 'Pre-Wedding',
      pages: 20,
      paper: 'Fuji Fine Art Matte',
      ratio: '10x14 Inches',
    },
    {
      name: 'High-Fashion Editorial',
      category: 'Fashion',
      pages: 16,
      paper: 'Metallic Gloss Pearl',
      ratio: '12x12 Square',
    },
    {
      name: 'Corporate Gala & Awards',
      category: 'Corporate',
      pages: 24,
      paper: 'Deep Matte Silk',
      ratio: '12x18 Inches',
    },
  ];

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-5">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Bookmark size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Studio Reusable Album Templates & Layout Presets
          </h3>
        </div>
        <Button variant="secondary" size="sm" className="flex items-center gap-1 text-xs">
          <Plus size={12} /> Save Current Layout as Preset
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {templatePresets.map((tpl, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col justify-between gap-3"
          >
            <div className="flex flex-col gap-1">
              <Badge variant="gold" className="text-[9px] w-fit uppercase">
                {tpl.category}
              </Badge>
              <span className="font-bold text-text-primary text-sm pt-1">{tpl.name}</span>
              <span className="text-[10px] text-text-tertiary font-mono">
                {tpl.ratio} • {tpl.pages} Pages
              </span>
              <span className="text-[10px] text-text-tertiary">{tpl.paper}</span>
            </div>

            <Button variant="secondary" size="sm" className="w-full text-xs">
              Apply Template
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};
