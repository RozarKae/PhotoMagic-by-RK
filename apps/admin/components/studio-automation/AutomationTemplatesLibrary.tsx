'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Layers, Sparkles, Plus, Copy } from 'lucide-react';

export const AutomationTemplatesLibrary: React.FC = () => {
  const templates = [
    {
      title: 'Destination Wedding End-to-End Workflow',
      triggers: 'Booking Confirmed',
      actions: '5 Automated Steps',
      popular: true,
    },
    {
      title: 'New Lead Instant Qualification & Proposal',
      triggers: 'Web Inquiry Received',
      actions: 'AI Score + Email',
      popular: true,
    },
    {
      title: 'Overdue Retainer Payment Follow-Up',
      triggers: 'Invoice Overdue 3 Days',
      actions: 'WhatsApp Alert',
      popular: false,
    },
    {
      title: 'Client Album Approval to Italian Print Lab',
      triggers: 'Client Approved Album',
      actions: 'Print ZIP Dispatch',
      popular: true,
    },
  ];

  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Layers size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Pre-Built Automation Workflow Templates
          </h3>
        </div>
        <Badge variant="gold">4 Industry Standard Templates</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {templates.map((tpl, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-surface-base border border-border-subtle flex flex-col justify-between gap-3"
          >
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-text-primary text-xs">{tpl.title}</span>
                {tpl.popular && (
                  <Badge variant="gold" className="text-[9px]">
                    Popular
                  </Badge>
                )}
              </div>
              <span className="text-[10px] text-text-tertiary">
                Trigger: {tpl.triggers} • {tpl.actions}
              </span>
            </div>

            <Button
              variant="secondary"
              size="sm"
              className="w-full flex items-center justify-center gap-1"
            >
              <Copy size={12} /> Use Template
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};
