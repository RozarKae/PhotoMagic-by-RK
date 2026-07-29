'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { DollarSign, CheckCircle2, Zap, Shield } from 'lucide-react';

export const SubscriptionBillingEngine: React.FC = () => {
  const plans = [
    {
      code: 'starter',
      name: 'Starter Solo',
      price: '$49/mo',
      credits: '2,000 AI Credits/mo',
      storage: '250 GB R2 Storage',
      features: ['Single Studio', '5 Client Galleries', 'Basic AI Retouching'],
      current: false,
    },
    {
      code: 'studio',
      name: 'Studio Pro',
      price: '$299/mo',
      credits: '25,000 AI Credits/mo',
      storage: '2 TB High-Speed Storage',
      features: ['Multi-Branch Support', 'AI Album Designer', 'White-Label Portals', 'Unlimited Proofing'],
      current: true,
    },
    {
      code: 'enterprise',
      name: 'Enterprise Scale',
      price: '$1,299/mo',
      credits: 'Unlimited AI Credits',
      storage: '10 TB Storage + Custom S3',
      features: ['Dedicated Supabase DB', 'Custom Domain', 'SLA 99.99%', 'Dedicated Account Manager'],
      current: false,
    },
  ];

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-5">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <DollarSign size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">SaaS Subscription & Billing Engine</h3>
        </div>
        <Badge variant="gold">Active Tier: Studio Pro ($299/mo)</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {plans.map((p) => (
          <div
            key={p.code}
            className={`p-4 rounded-xl border flex flex-col justify-between gap-4 ${
              p.current
                ? 'bg-gold-500/10 border-gold-500 shadow-xl'
                : 'bg-surface-base border-border-subtle'
            }`}
          >
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-text-primary text-sm">{p.name}</span>
                {p.current && <Badge variant="gold" className="text-[9px]">Current Plan</Badge>}
              </div>

              <span className="text-2xl font-extrabold text-gold-500 font-mono">{p.price}</span>

              <div className="flex flex-col gap-1 text-[11px] text-text-secondary pt-2 border-t border-border-subtle">
                <span className="font-mono">{p.credits}</span>
                <span className="font-mono">{p.storage}</span>
              </div>

              <div className="flex flex-col gap-1.5 pt-2 text-[10px] text-text-tertiary">
                {p.features.map((feat, fIdx) => (
                  <span key={fIdx} className="flex items-center gap-1.5 text-text-primary">
                    <CheckCircle2 size={12} className="text-gold-500" /> {feat}
                  </span>
                ))}
              </div>
            </div>

            <Button variant={p.current ? 'primary' : 'secondary'} size="sm" className="w-full">
              {p.current ? 'Manage Subscription' : 'Upgrade Plan'}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};
