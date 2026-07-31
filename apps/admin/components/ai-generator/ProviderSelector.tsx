'use client';

import React from 'react';
import { Card, Badge, Select } from '@photomagic/ui';
import { Sparkles, DollarSign, Clock, CheckCircle2 } from 'lucide-react';

interface ProviderSelectorProps {
  provider: string;
  aspectRatio: string;
  onChange: (field: string, value: string) => void;
}

export const ProviderSelector: React.FC<ProviderSelectorProps> = ({
  provider,
  aspectRatio,
  onChange,
}) => {
  const getProviderInfo = (prov: string) => {
    switch (prov) {
      case 'flux':
        return { name: 'Flux 1.1 Pro (Black Forest Labs)', cost: '$0.040', speed: '1.2s' };
      case 'openai':
        return { name: 'OpenAI DALL-E 3 HD', cost: '$0.080', speed: '4.5s' };
      case 'gemini':
        return { name: 'Google Gemini 1.5 Flash Vision', cost: '$0.020', speed: '0.9s' };
      case 'stability':
        return { name: 'Stability AI SDXL 1.0', cost: '$0.025', speed: '2.1s' };
      case 'ideogram':
        return { name: 'Ideogram v2 Text Render', cost: '$0.045', speed: '2.8s' };
      case 'replicate':
        return { name: 'Replicate SOTA Pipeline', cost: '$0.035', speed: '1.8s' };
      case 'fal':
        return { name: 'Fal.ai Lightning GPU', cost: '$0.015', speed: '0.6s' };
      default:
        return { name: 'Flux 1.1 Pro', cost: '$0.040', speed: '1.2s' };
    }
  };

  const info = getProviderInfo(provider);

  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Multi-Provider AI Engine & Resolution
          </h3>
        </div>
        <Badge variant="gold">High-Performance Adapter</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-text-secondary">AI Generation Provider</label>
          <Select
            value={provider}
            onChange={(val: string) => onChange('provider', val)}
            options={[
              { value: 'flux', label: 'Flux 1.1 Pro (BFL)' },
              { value: 'openai', label: 'OpenAI DALL-E 3 HD' },
              { value: 'gemini', label: 'Google Gemini 1.5 Flash' },
              { value: 'stability', label: 'Stability AI SDXL 1.0' },
              { value: 'ideogram', label: 'Ideogram v2 Typography' },
              { value: 'replicate', label: 'Replicate Multi-Model' },
              { value: 'fal', label: 'Fal.ai Realtime GPU' },
            ]}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-text-secondary">Aspect Ratio</label>
          <Select
            value={aspectRatio}
            onChange={(val: string) => onChange('aspectRatio', val)}
            options={[
              { value: '16:9', label: '16:9 Landscape Widescreen' },
              { value: '1:1', label: '1:1 Square Album/Instagram' },
              { value: '9:16', label: '9:16 Story/Reels Vertical' },
              { value: '4:3', label: '4:3 Studio Format' },
              { value: '3:2', label: '3:2 35mm Film Format' },
            ]}
          />
        </div>
      </div>

      <div className="p-3 rounded-lg bg-surface-base border border-border-subtle flex justify-between items-center text-xs">
        <span className="font-semibold text-text-primary">{info.name}</span>
        <div className="flex items-center gap-4 text-text-tertiary">
          <span>
            Est. Cost: <strong className="text-gold-500">{info.cost}</strong>
          </span>
          <span>
            Est. Latency: <strong className="text-status-success">{info.speed}</strong>
          </span>
        </div>
      </div>
    </Card>
  );
};
