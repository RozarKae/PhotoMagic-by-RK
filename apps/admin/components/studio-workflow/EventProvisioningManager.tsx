'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import {
  FolderPlus,
  Calendar,
  HardDrive,
  ShieldCheck,
  CheckCircle2,
  Folder,
  FileText,
  Wand2,
} from 'lucide-react';

export const EventProvisioningManager: React.FC = () => {
  const [projectCode, setProjectCode] = useState('PM-PRJ-2026-9901');
  const [clientName, setClientName] = useState('Eleanor Vance & Julian');
  const [allocatedStorage, setAllocatedStorage] = useState(250);

  const folderStructure = [
    {
      name: '01_RAW_Capture (300 GB)',
      sub: ['Camera_A_SonyA7IV', 'Camera_B_CanonR5', 'Drone_DJI_Mavic3'],
    },
    { name: '02_AI_Culling_Selection', sub: ['Approved_Favorites', 'Rejected_Outtakes'] },
    { name: '03_Edited_Master_Photos', sub: ['High_Res_JPEG', 'Print_300DPI_TIFF'] },
    { name: '04_Album_Design_Spreads', sub: ['Spreads_12x18', 'Cover_Foil_Artwork'] },
  ];

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <FolderPlus size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Phase 9.1 Automated Event Creation & Folder Provisioning
          </h3>
        </div>
        <Badge variant="gold">Auto-Provisioned ID: {projectCode}</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
        {/* Provisioning Details */}
        <div className="flex flex-col gap-4">
          <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-2">
            <span className="text-text-tertiary font-semibold">Event Project Metadata</span>
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-text-primary">{clientName}</span>
              <Badge variant="gold">Royal Udaipur Wedding</Badge>
            </div>
            <span className="text-[10px] text-text-tertiary font-mono">
              Date: July 15, 2026 • Allocated: {allocatedStorage} GB R2 Storage
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-text-primary">
              Storage Allocation Limit ({allocatedStorage} GB)
            </label>
            <input
              type="range"
              min={100}
              max={1000}
              step={50}
              value={allocatedStorage}
              onChange={(e) => setAllocatedStorage(Number(e.target.value))}
              className="accent-gold-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Provisioned Directory Tree */}
        <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-3">
          <span className="font-bold text-text-primary flex items-center gap-1.5">
            <Folder size={14} className="text-gold-500" /> Automated Directory Structure
          </span>
          <div className="flex flex-col gap-2 font-mono text-[11px]">
            {folderStructure.map((f, i) => (
              <div key={i} className="flex flex-col gap-1 pl-2 border-l border-gold-500/30">
                <span className="font-bold text-gold-500">{f.name}</span>
                <div className="flex flex-wrap gap-2 text-[10px] text-text-tertiary pl-3">
                  {f.sub.map((s) => (
                    <span
                      key={s}
                      className="bg-canvas px-2 py-0.5 rounded border border-border-subtle"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
