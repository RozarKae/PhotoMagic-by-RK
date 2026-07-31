'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { CheckCircle2, Award, Download, Archive, Truck, ShieldCheck, FileText } from 'lucide-react';

export const AlbumFinalDeliveryCenter: React.FC = () => {
  const [deliveryStage, setDeliveryStage] = useState<
    | 'approved'
    | 'print_ready'
    | 'printing'
    | 'quality_check'
    | 'completed'
    | 'delivered'
    | 'archived'
  >('delivered');

  const certificateCode = 'PM-ALBUM-2026-8842-CERT';

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Award size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Phase 7.9 Final Album Delivery & Certificate Verification
          </h3>
        </div>
        <Badge variant="success">Handcrafted Delivery Completed</Badge>
      </div>

      {/* Certificate Card Preview */}
      <div className="p-6 rounded-2xl bg-canvas border border-gold-500/40 shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-widest text-gold-500 font-mono font-bold">
            Certificate of Authenticity
          </span>
          <h4 className="text-lg font-extrabold text-text-primary">
            Eleanor Vance & Julian Montgomery
          </h4>
          <span className="text-[10px] text-text-tertiary font-mono">
            Verification Code: {certificateCode}
          </span>
          <span className="text-[10px] text-text-secondary">
            Printed on Italian Fine Art Paper @ 600 DPI • Hand-Bound Leather
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="secondary" size="sm" className="flex items-center gap-1.5 text-xs">
            <FileText size={14} /> Download Certificate PDF
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="flex items-center gap-1.5 text-xs font-bold"
          >
            <Archive size={14} /> Archive Master Package
          </Button>
        </div>
      </div>
    </Card>
  );
};
