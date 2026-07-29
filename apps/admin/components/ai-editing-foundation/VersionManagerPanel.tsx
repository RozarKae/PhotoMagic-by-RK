'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Layers, Copy, CheckCircle2, Shield } from 'lucide-react';

export interface ImageVersionRecord {
  id: string;
  versionName: string;
  filename: string;
  size: string;
  isOriginal: boolean;
  active: boolean;
}

export const VersionManagerPanel: React.FC = () => {
  const [versions, setVersions] = useState<ImageVersionRecord[]>([
    { id: 'v-1', versionName: 'v1.0 Original RAW', filename: 'DSC_0042.NEF', size: '48.2 MB', isOriginal: true, active: false },
    { id: 'v-2', versionName: 'v1.1 Auto Color & Exposure', filename: 'DSC_0042_v1.1.png', size: '12.4 MB', isOriginal: false, active: false },
    { id: 'v-3', versionName: 'v1.2 AI Retouched Master', filename: 'DSC_0042_v1.2.png', size: '14.8 MB', isOriginal: false, active: true },
  ]);

  const handleSelectVersion = (id: string) => {
    setVersions((prev) =>
      prev.map((v) => ({ ...v, active: v.id === id }))
    );
  };

  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Layers size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Non-Destructive Version Manager</h3>
        </div>
        <Badge variant="gold">{versions.length} Versions Saved</Badge>
      </div>

      <div className="flex flex-col gap-2.5 text-xs">
        {versions.map((v) => (
          <div
            key={v.id}
            className={`p-3.5 rounded-xl border flex justify-between items-center ${
              v.active
                ? 'bg-gold-500/10 border-gold-500'
                : 'bg-surface-base border-border-subtle'
            }`}
          >
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-text-primary">{v.versionName}</span>
                {v.isOriginal && <Badge variant="gold" className="text-[9px]">RAW Immutable</Badge>}
              </div>
              <span className="text-[10px] text-text-tertiary font-mono">{v.filename} • {v.size}</span>
            </div>

            <Button
              variant={v.active ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => handleSelectVersion(v.id)}
            >
              {v.active ? 'Active Version' : 'Switch Version'}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};
