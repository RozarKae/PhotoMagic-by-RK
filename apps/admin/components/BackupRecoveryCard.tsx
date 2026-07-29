'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { HardDrive, Download, RefreshCw, ShieldCheck } from 'lucide-react';

export const BackupRecoveryCard: React.FC = () => {
  return (
    <Card variant="glass" className="p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <HardDrive size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Disaster Recovery & Automated Database Snapshots
          </h3>
        </div>
        <Badge variant="success">Cloudflare R2 Encrypted</Badge>
      </div>

      <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-text-primary">
            Daily Automated Database & R2 Assets Snapshot
          </span>
          <span className="text-text-tertiary">
            Last Snapshot: Today at 02:00 AM UTC • Retention: 30 Days
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="flex items-center gap-1">
            <RefreshCw size={14} />
            Trigger Manual Backup
          </Button>
        </div>
      </div>
    </Card>
  );
};
