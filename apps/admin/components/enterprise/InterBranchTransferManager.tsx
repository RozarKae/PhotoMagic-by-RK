'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { ArrowLeftRight, Camera, CheckCircle2, Clock } from 'lucide-react';

export interface InterBranchTransferItem {
  id: string;
  assetName: string;
  assetCode: string;
  fromBranch: string;
  toBranch: string;
  status: 'pending' | 'in_transit' | 'completed';
  requestedAt: string;
}

export const InterBranchTransferManager: React.FC = () => {
  const [transfers, setTransfers] = useState<InterBranchTransferItem[]>([
    {
      id: 'tr-101',
      assetName: 'Leica M11 Body + 50mm f/1.4 Lens',
      assetCode: 'CAM-UDPR-088',
      fromBranch: 'Udaipur Flagship',
      toBranch: 'Dubai Luxury International',
      status: 'in_transit',
      requestedAt: 'Today at 09:30 AM',
    },
    {
      id: 'tr-102',
      assetName: 'RED V-Raptor 8K Cinema Rig',
      assetCode: 'CAM-MUMB-012',
      fromBranch: 'Mumbai Commercial',
      toBranch: 'Udaipur Flagship',
      status: 'completed',
      requestedAt: 'Yesterday at 02:15 PM',
    },
  ]);

  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <ArrowLeftRight size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Inter-Branch Equipment & Asset Transfer Engine
          </h3>
        </div>
        <Badge variant="gold">{transfers.length} Transfers Tracked</Badge>
      </div>

      <div className="flex flex-col gap-3 text-xs">
        {transfers.map((tr) => (
          <div
            key={tr.id}
            className="p-3.5 rounded-xl bg-surface-base border border-border-subtle flex justify-between items-center"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-text-primary">{tr.assetName}</span>
                <span className="font-mono text-[10px] text-gold-500 font-semibold">
                  {tr.assetCode}
                </span>
              </div>
              <span className="text-[10px] text-text-tertiary">
                Transfer: {tr.fromBranch} ➔ {tr.toBranch}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant={tr.status === 'completed' ? 'success' : 'gold'}>{tr.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
