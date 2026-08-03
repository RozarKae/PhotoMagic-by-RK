'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import {
  CreditCard,
  HardDrive,
  Calendar,
  Mail,
  Calculator,
  MapPin,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

export interface IntegrationProvider {
  id: string;
  name: string;
  category:
    'Payments' | 'Storage' | 'Calendar' | 'Messaging' | 'Accounting' | 'Maps' | 'AI Providers';
  icon: React.ReactNode;
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
  description: string;
}

export const IntegrationCardGrid: React.FC = () => {
  const providers: IntegrationProvider[] = [
    {
      id: 'rzp',
      name: 'Razorpay Payment Gateway',
      category: 'Payments',
      icon: <CreditCard size={20} className="text-gold-500" />,
      status: 'connected',
      lastSync: '2 mins ago',
      description: 'INR/USD instant retainers, UPI, net banking, and automatic webhooks.',
    },
    {
      id: 'r2',
      name: 'Cloudflare R2 Direct S3',
      category: 'Storage',
      icon: <HardDrive size={20} className="text-gold-500" />,
      status: 'connected',
      lastSync: 'Live S3 Presigned',
      description: 'Zero-egress cost high-resolution RAW & WebP photo proofing storage.',
    },
    {
      id: 'gcal',
      name: 'Google Calendar Two-Way Sync',
      category: 'Calendar',
      icon: <Calendar size={20} className="text-gold-500" />,
      status: 'connected',
      lastSync: '10 mins ago',
      description: 'Automatic shoot booking calendar event creation & crew invitation dispatch.',
    },
    {
      id: 'resend',
      name: 'Resend & WhatsApp Business API',
      category: 'Messaging',
      icon: <Mail size={20} className="text-gold-500" />,
      status: 'connected',
      lastSync: 'Instant Triggers',
      description:
        'Transactional email notifications, client portal magic links & WhatsApp alerts.',
    },
    {
      id: 'zoho',
      name: 'Zoho Books & QuickBooks Sync',
      category: 'Accounting',
      icon: <Calculator size={20} className="text-gold-500" />,
      status: 'connected',
      lastSync: '1 hour ago',
      description: 'Automated 18% GST tax invoice synchronization & accounting ledger entry.',
    },
    {
      id: 'gemini',
      name: 'Google Gemini 1.5 Flash Vision',
      category: 'AI Providers',
      icon: <Sparkles size={20} className="text-gold-500" />,
      status: 'connected',
      lastSync: 'Active Engine',
      description: 'AI photo blur detection, duplicate grouping, and quality scoring (0.0 - 1.0).',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {providers.map((p) => (
        <Card
          key={p.id}
          variant="glass"
          className="p-6 flex flex-col justify-between gap-4 group hover:border-gold-500/40 transition-all"
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-surface-elevated border border-border-subtle flex-shrink-0">
                {p.icon}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-text-primary text-base">{p.name}</span>
                <span className="text-xs text-text-tertiary">{p.category}</span>
              </div>
            </div>
            <Badge variant="success" className="text-[10px]">
              {p.status}
            </Badge>
          </div>

          <p className="text-xs text-text-secondary leading-relaxed">{p.description}</p>

          <div className="flex justify-between items-center pt-3 border-t border-border-subtle text-[11px]">
            <span className="text-text-tertiary">Last Sync: {p.lastSync}</span>
            <Button variant="secondary" size="sm">
              Configure
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
