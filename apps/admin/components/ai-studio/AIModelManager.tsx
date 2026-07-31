'use client';

import React, { useState } from 'react';
import { Card, Badge, Switch, Button } from '@photomagic/ui';
import { Cpu, Key, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export interface AIModelProviderItem {
  id: string;
  provider: 'gemini' | 'openai' | 'claude' | 'stability' | 'flux' | 'ideogram' | 'midjourney';
  name: string;
  enabled: boolean;
  isDefault: boolean;
  costPerRequest: number;
  healthStatus: 'healthy' | 'degraded' | 'offline';
}

export const AIModelManager: React.FC = () => {
  const [models, setModels] = useState<AIModelProviderItem[]>([
    {
      id: 'm-1',
      provider: 'gemini',
      name: 'Google Gemini 1.5 Flash Vision',
      enabled: true,
      isDefault: true,
      costPerRequest: 0.02,
      healthStatus: 'healthy',
    },
    {
      id: 'm-2',
      provider: 'openai',
      name: 'OpenAI GPT-4o Vision',
      enabled: true,
      isDefault: false,
      costPerRequest: 0.04,
      healthStatus: 'healthy',
    },
    {
      id: 'm-3',
      provider: 'claude',
      name: 'Anthropic Claude 3.5 Sonnet',
      enabled: true,
      isDefault: false,
      costPerRequest: 0.03,
      healthStatus: 'healthy',
    },
    {
      id: 'm-4',
      provider: 'stability',
      name: 'Stability AI SDXL 1.0',
      enabled: true,
      isDefault: false,
      costPerRequest: 0.025,
      healthStatus: 'healthy',
    },
    {
      id: 'm-5',
      provider: 'flux',
      name: 'Flux 1.1 Pro Schnell',
      enabled: true,
      isDefault: false,
      costPerRequest: 0.05,
      healthStatus: 'healthy',
    },
    {
      id: 'm-6',
      provider: 'ideogram',
      name: 'Ideogram v2',
      enabled: true,
      isDefault: false,
      costPerRequest: 0.04,
      healthStatus: 'healthy',
    },
    {
      id: 'm-7',
      provider: 'midjourney',
      name: 'Midjourney v6.1 (Placeholder Connector)',
      enabled: false,
      isDefault: false,
      costPerRequest: 0.06,
      healthStatus: 'offline',
    },
  ]);

  const handleToggle = (id: string) => {
    setModels((prev) => prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m)));
  };

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Cpu size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Multi-Provider AI Model Manager & API Keys
          </h3>
        </div>
        <Badge variant="gold">7 Provider Connectors Registered</Badge>
      </div>

      <div className="flex flex-col gap-3">
        {models.map((model) => (
          <div
            key={model.id}
            className="p-3.5 rounded-xl bg-surface-base border border-border-subtle flex justify-between items-center text-xs"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-surface-elevated text-gold-500 border border-border-subtle">
                <Sparkles size={16} />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-text-primary">{model.name}</span>
                  {model.isDefault && (
                    <Badge variant="gold" className="text-[9px]">
                      Default Model
                    </Badge>
                  )}
                </div>
                <span className="text-text-tertiary">
                  ${model.costPerRequest.toFixed(3)} per request • Health: {model.healthStatus}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Switch checked={model.enabled} onChange={() => handleToggle(model.id)} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
