'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { QrCode, Share2, BarChart2, Eye, Download, ShieldCheck, RefreshCw } from 'lucide-react';

export const QrSharingAnalyticsHub: React.FC = () => {
  const [shareScope, setShareScope] = useState<
    'entire_gallery' | 'albums' | 'favorites' | 'videos' | 'downloads'
  >('entire_gallery');
  const [expiryDays, setExpiryDays] = useState(30);

  const scopes = [
    { label: 'Entire Event Gallery', value: 'entire_gallery' },
    { label: 'Printed Album Proofs', value: 'albums' },
    { label: 'Client Favorites', value: 'favorites' },
    { label: '4K Feature Videos', value: 'videos' },
  ];

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <QrCode size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Phase 8.6 Instant QR Code Sharing & Scan Telemetry
          </h3>
        </div>
        <Badge variant="gold">482 Total Scans Tracked</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Scope Selector */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-text-primary">QR Code Scope Selection</label>
            <div className="grid grid-cols-2 gap-2">
              {scopes.map((s) => (
                <Button
                  key={s.value}
                  variant={shareScope === s.value ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setShareScope(s.value as any)}
                  className="text-[11px] font-medium"
                >
                  {s.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1 pt-2 border-t border-border-subtle">
            <label className="font-semibold text-text-secondary">
              Custom QR Access Expiry (Days)
            </label>
            <input
              type="number"
              value={expiryDays}
              onChange={(e) => setExpiryDays(Number(e.target.value))}
              className="h-9 px-3 rounded-lg bg-surface-base border border-border-subtle text-xs text-text-primary font-mono focus:outline-none"
            />
          </div>
        </div>

        {/* QR Vector Preview & Telemetry */}
        <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-32 h-32 bg-canvas p-2 rounded-xl border border-gold-500/40 flex items-center justify-center shadow-xl">
            {/* SVG QR Code Simulation */}
            <div className="w-full h-full border-2 border-dashed border-gold-500 rounded flex flex-col items-center justify-center p-2 text-center">
              <QrCode size={40} className="text-gold-500" />
              <span className="text-[8px] font-mono text-gold-500 mt-1">Scan for 8K</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-xs">
            <span className="font-bold text-text-primary">Live Scan Telemetry</span>
            <span className="text-[10px] text-text-secondary">
              Scan Location: Udaipur, Rajasthan (84%)
            </span>
            <span className="text-[10px] text-text-secondary">Device: iOS Safari (92%)</span>
            <Button
              variant="secondary"
              size="sm"
              className="mt-1 flex items-center gap-1 text-[11px]"
            >
              <Download size={12} /> Download Vector Vector QR SVG
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
