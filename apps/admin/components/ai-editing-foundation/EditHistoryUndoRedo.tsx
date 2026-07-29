'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Undo2, Redo2, History, CheckCircle2 } from 'lucide-react';

export interface EditHistoryItem {
  id: string;
  step: number;
  action: string;
  active: boolean;
  time: string;
}

export const EditHistoryUndoRedo: React.FC = () => {
  const [history, setHistory] = useState<EditHistoryItem[]>([
    { id: 'h-1', step: 1, action: 'Initial RAW Import', active: false, time: '10:00 AM' },
    { id: 'h-2', step: 2, action: 'Crop 16:9 Aspect Ratio', active: false, time: '10:02 AM' },
    { id: 'h-3', step: 3, action: 'Auto White Balance & Exposure', active: false, time: '10:05 AM' },
    { id: 'h-4', step: 4, action: 'Royal Gold Skin Tone Retouching', active: true, time: '10:08 AM' },
  ]);

  const handleUndo = () => {
    const activeIdx = history.findIndex((h) => h.active);
    if (activeIdx > 0) {
      setHistory((prev) =>
        prev.map((item, idx) => ({ ...item, active: idx === activeIdx - 1 }))
      );
    }
  };

  const handleRedo = () => {
    const activeIdx = history.findIndex((h) => h.active);
    if (activeIdx < history.length - 1) {
      setHistory((prev) =>
        prev.map((item, idx) => ({ ...item, active: idx === activeIdx + 1 }))
      );
    }
  };

  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <History size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Edit History & State Stack (Undo / Redo)</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleUndo} className="flex items-center gap-1">
            <Undo2 size={14} /> Undo
          </Button>
          <Button variant="ghost" size="sm" onClick={handleRedo} className="flex items-center gap-1">
            <Redo2 size={14} /> Redo
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-xs">
        {history.map((item) => (
          <div
            key={item.id}
            className={`p-3 rounded-lg border flex justify-between items-center ${
              item.active
                ? 'bg-gold-500/10 border-gold-500 font-bold'
                : 'bg-surface-base border-border-subtle text-text-tertiary'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-gold-500">#{item.step}</span>
              <span className="text-text-primary">{item.action}</span>
            </div>
            <span className="text-[10px] font-mono">{item.time}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
