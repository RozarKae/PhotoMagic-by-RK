'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Users, User, CheckCircle2, Sparkles } from 'lucide-react';

export const MultiFaceBatchSelector: React.FC = () => {
  const [selectedFace, setSelectedFace] = useState(0);

  const detectedFaces = [
    { id: 0, name: 'Bride (Eleanor)', role: 'Primary Target', status: 'Enhanced' },
    { id: 1, name: 'Groom (Julian)', role: 'Secondary Target', status: 'Enhanced' },
    { id: 2, name: 'Bridesmaid #1', role: 'Group Member', status: 'Pending' },
    { id: 3, name: 'Bridesmaid #2', role: 'Group Member', status: 'Pending' },
  ];

  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Multi-Face Group Portrait Detector
          </h3>
        </div>
        <Badge variant="gold">4 Faces Auto-Detected</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {detectedFaces.map((face) => (
          <div
            key={face.id}
            onClick={() => setSelectedFace(face.id)}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${
              selectedFace === face.id
                ? 'bg-gold-500/10 border-gold-500 shadow-lg'
                : 'bg-surface-base border-border-subtle hover:border-gold-500/50'
            }`}
          >
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-text-primary">{face.name}</span>
                <Badge variant="gold" className="text-[9px]">
                  {face.role}
                </Badge>
              </div>
              <span className="text-[10px] text-text-tertiary">Face #{face.id + 1} Bounds</span>
            </div>

            <Badge variant={face.status === 'Enhanced' ? 'success' : 'info'}>{face.status}</Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};
