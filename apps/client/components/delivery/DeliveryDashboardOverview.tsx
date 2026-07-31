import * as React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Download, CheckCircle2, ShieldCheck, HardDrive } from 'lucide-react';

export const DeliveryDashboardOverview: React.FC = () => {
  return (
    <Card variant="glass" className="p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Download size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Final Deliverables & Resolution Download Center
          </h3>
        </div>
        <Badge variant="success">All Files Approved & Ready</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col justify-between">
          <span className="text-text-tertiary">Total Files Delivered</span>
          <span className="text-2xl font-extrabold text-text-primary font-mono mt-1">
            1,420 Files
          </span>
          <span className="text-[10px] text-gold-500 font-semibold mt-2">RAW + Color Mastered</span>
        </div>

        <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col justify-between">
          <span className="text-text-tertiary">Total Storage Used</span>
          <span className="text-2xl font-extrabold text-gold-500 font-mono mt-1">14.8 GB</span>
          <span className="text-[10px] text-text-tertiary mt-2">Cloudflare R2 High-Speed CDN</span>
        </div>

        <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col justify-between">
          <span className="text-text-tertiary">Download Access Expiry</span>
          <span className="text-2xl font-extrabold text-status-success font-mono mt-1">
            Unlimited
          </span>
          <span className="text-[10px] text-status-success font-semibold mt-2">
            Lifetime Studio Archive
          </span>
        </div>

        <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col justify-between">
          <span className="text-text-tertiary">PIN Protection</span>
          <span className="text-2xl font-extrabold text-gold-500 font-mono mt-1">**** 4920</span>
          <span className="text-[10px] text-text-tertiary mt-2">Encrypted Security PIN</span>
        </div>
      </div>
    </Card>
  );
};
