'use client';

import React, { useState } from 'react';
import { Card, Badge, Switch } from '@photomagic/ui';
import { ToggleLeft, Zap, ShieldAlert, Sparkles } from 'lucide-react';

export const FeatureFlagsManager: React.FC = () => {
  const [flags, setFlags] = useState([
    {
      key: 'FEATURE_AI_QUALITY_SCORING',
      name: 'Gemini AI Quality Scoring',
      enabled: true,
      rollout: 100,
      description: 'Automatically flags blurry or duplicate RAW photos during R2 upload.',
    },
    {
      key: 'FEATURE_3D_SPATIAL_PROOFING',
      name: '3D Spatial Album Co-Design',
      enabled: true,
      rollout: 100,
      description: 'Allows clients to place spatial pin comments on flush-mount album spreads.',
    },
    {
      key: 'FEATURE_RAZORPAY_AUTOPAY',
      name: 'Razorpay Autopay Retainers',
      enabled: false,
      rollout: 25,
      description: 'Gradual rollout of recurring retainer subscriptions.',
    },
  ]);

  const handleToggle = (key: string) => {
    setFlags((prev) => prev.map((f) => (f.key === key ? { ...f, enabled: !f.enabled } : f)));
  };

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <ToggleLeft size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Feature Flags & Gradual Rollout Switcher
          </h3>
        </div>
        <Badge variant="gold">Emergency Kill Switch Enabled</Badge>
      </div>

      <div className="flex flex-col gap-3">
        {flags.map((flag) => (
          <div
            key={flag.key}
            className="p-4 rounded-xl bg-surface-base border border-border-subtle flex justify-between items-center text-xs"
          >
            <div className="flex flex-col gap-1 max-w-lg">
              <div className="flex items-center gap-2">
                <span className="font-bold text-text-primary text-sm">{flag.name}</span>
                <span className="font-mono text-[10px] text-gold-500 font-semibold">
                  {flag.key}
                </span>
              </div>
              <p className="text-text-secondary">{flag.description}</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-text-tertiary font-semibold">Rollout: {flag.rollout}%</span>
              <Switch checked={flag.enabled} onChange={() => handleToggle(flag.key)} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
