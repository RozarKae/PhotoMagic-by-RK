'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Lock, Link as LinkIcon, MessageSquare, CheckCircle2, Copy } from 'lucide-react';

export const ClientProofingModal: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const proofUrl = 'https://client.photomagic.studio/proof/album-eleanor-alexander-2026';

  const handleCopy = () => {
    navigator.clipboard.writeText(proofUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Lock size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Client Digital Proofing & Approval Portal
          </h3>
        </div>
        <Badge variant="success">Password Protected</Badge>
      </div>

      <div className="p-3.5 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-2 text-xs">
        <span className="font-semibold text-text-primary">Client Interactive Proof Link</span>
        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={proofUrl}
            className="flex-1 h-8 px-3 rounded-lg bg-surface-elevated border border-border-subtle text-xs text-gold-500 font-mono"
          />
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopy}
            className="flex items-center gap-1"
          >
            <Copy size={12} />
            {copied ? 'Copied' : 'Copy Link'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
