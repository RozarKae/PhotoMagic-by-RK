'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input } from '@photomagic/ui';
import { ShieldCheck, Download, Lock, CheckCircle2, FileCheck } from 'lucide-react';

export const ApprovalDownloadCenter: React.FC = () => {
  const [signatureName, setSignatureName] = useState('Eleanor Vance');
  const [isApproved, setIsApproved] = useState(false);

  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <ShieldCheck size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Digital Signature Approval & ZIP Download Center
          </h3>
        </div>
        <Badge variant={isApproved ? 'success' : 'gold'}>
          {isApproved ? 'Gallery Approved' : 'Pending Signature'}
        </Badge>
      </div>

      {/* Signature Approval Panel */}
      <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-3 text-xs">
        <span className="font-bold text-text-primary">
          Client Final Album & Gallery Signature Approval
        </span>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            value={signatureName}
            onChange={(e) => setSignatureName(e.target.value)}
            placeholder="Type Full Name to Sign"
            className="flex-1 h-9 px-3 rounded-lg bg-surface-elevated border border-border-subtle text-xs text-text-primary font-mono focus:outline-none focus:ring-1 focus:ring-gold-500"
          />
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsApproved(true)}
            className="w-full sm:w-auto flex items-center gap-1.5"
          >
            <FileCheck size={14} />
            Sign & Approve Gallery
          </Button>
        </div>
      </div>

      {/* Resolution Download Center */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center justify-center gap-2 p-3 h-auto"
        >
          <Download size={14} className="text-gold-500" />
          <div className="flex flex-col text-left">
            <span className="font-bold">Original RAW ZIP</span>
            <span className="text-[9px] text-text-tertiary">300 DPI High-Res (4.2 GB)</span>
          </div>
        </Button>

        <Button
          variant="secondary"
          size="sm"
          className="flex items-center justify-center gap-2 p-3 h-auto"
        >
          <Download size={14} className="text-gold-500" />
          <div className="flex flex-col text-left">
            <span className="font-bold">Web Proofs ZIP</span>
            <span className="text-[9px] text-text-tertiary">Optimized WebP (350 MB)</span>
          </div>
        </Button>

        <Button
          variant="secondary"
          size="sm"
          className="flex items-center justify-center gap-2 p-3 h-auto"
        >
          <Download size={14} className="text-gold-500" />
          <div className="flex flex-col text-left">
            <span className="font-bold">Social Media Kit</span>
            <span className="text-[9px] text-text-tertiary">Instagram / Reels Sizes</span>
          </div>
        </Button>
      </div>
    </Card>
  );
};
