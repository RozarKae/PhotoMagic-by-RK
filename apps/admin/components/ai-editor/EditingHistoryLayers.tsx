'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Layers, History, RotateCcw, Download, Eye, ShieldCheck } from 'lucide-react';

export const EditingHistoryLayers: React.FC = () => {
  const layerStack = [
    { id: 'lay-1', name: 'Luxury Wedding LUT Presets (.CUBE)', type: 'Adjustment', visible: true },
    { id: 'lay-2', name: 'AI Skin Smoothing & Blemish Mask', type: 'Retouch', visible: true },
    { id: 'lay-3', name: 'Original Master RAW Image', type: 'Base Image', visible: true },
  ];

  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Layers size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Non-Destructive Layers & Undo Stack</h3>
        </div>
        <Badge variant="gold">3 Layers Active</Badge>
      </div>

      {/* Layer List */}
      <div className="flex flex-col gap-2">
        {layerStack.map((layer) => (
          <div key={layer.id} className="p-2.5 rounded-lg bg-surface-base border border-border-subtle flex justify-between items-center text-xs">
            <div className="flex items-center gap-2">
              <Eye size={14} className="text-gold-500 flex-shrink-0" />
              <div className="flex flex-col">
                <span className="font-bold text-text-primary text-[11px]">{layer.name}</span>
                <span className="text-[9px] text-text-tertiary">{layer.type} Layer</span>
              </div>
            </div>
            <Badge variant="gold" className="text-[9px]">Normal</Badge>
          </div>
        ))}
      </div>

      {/* Export System Controls */}
      <div className="pt-2 border-t border-border-subtle flex items-center gap-2">
        <Button variant="primary" size="sm" className="flex-1 flex items-center justify-center gap-1.5">
          <Download size={14} /> Export 16-Bit Master
        </Button>
        <Button variant="secondary" size="sm" className="flex items-center gap-1">
          <RotateCcw size={14} /> Snapshot
        </Button>
      </div>
    </Card>
  );
};
