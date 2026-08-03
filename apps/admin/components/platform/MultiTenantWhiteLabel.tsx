'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input } from '@photomagic/ui';
import { Globe, Palette, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

export const MultiTenantWhiteLabel: React.FC = () => {
  const [subdomain, setSubdomain] = useState('rkstudio');
  const [customDomain, setCustomDomain] = useState('studio.rkphotomagic.com');
  const [whiteLabelActive, setWhiteLabelActive] = useState(true);

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-5">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Globe size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Multi-Tenant Subdomain & White-Label Domain Manager
          </h3>
        </div>
        <Badge variant={whiteLabelActive ? 'gold' : 'info'}>
          {whiteLabelActive ? 'White-Label Enterprise Mode' : 'Standard SaaS Mode'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-text-secondary">Platform Subdomain Slug</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={subdomain}
              onChange={(e) => setSubdomain(e.target.value)}
              className="flex-1 h-9 px-3 rounded-lg bg-surface-base border border-border-subtle text-xs text-text-primary font-mono focus:outline-none focus:ring-1 focus:ring-gold-500"
            />
            <span className="font-mono text-text-tertiary">.photomagic.app</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-text-secondary">Custom CNAME Domain Binding</label>
          <input
            type="text"
            value={customDomain}
            onChange={(e) => setCustomDomain(e.target.value)}
            className="w-full h-9 px-3 rounded-lg bg-surface-base border border-border-subtle text-xs text-text-primary font-mono focus:outline-none focus:ring-1 focus:ring-gold-500"
          />
        </div>
      </div>

      <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
        <div className="flex flex-col gap-0.5">
          <span className="font-bold text-text-primary">
            Remove "Powered by PhotoMagic" Footer Watermark
          </span>
          <span className="text-[10px] text-text-tertiary">
            Applies custom CSS variables, studio logo, and custom login screens for client portal.
          </span>
        </div>
        <Button
          variant={whiteLabelActive ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setWhiteLabelActive(!whiteLabelActive)}
        >
          {whiteLabelActive ? 'White-Label Active' : 'Enable White-Label'}
        </Button>
      </div>
    </Card>
  );
};
