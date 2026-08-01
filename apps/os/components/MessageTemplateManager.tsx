'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input } from '@photomagic/ui';
import { MessageSquare, Mail, Send, Sparkles } from 'lucide-react';

export const MessageTemplateManager: React.FC = () => {
  const [templates] = useState([
    {
      id: 'tmpl-1',
      title: 'Booking Confirmation (WhatsApp)',
      type: 'whatsapp',
      trigger: 'booking_confirmation',
      body: 'Dear {{client_name}}, your photoshoot booking for {{event_date}} is officially confirmed! Studio details: {{link}}',
    },
    {
      id: 'tmpl-2',
      title: 'Retainer Payment Reminder (Email)',
      type: 'email',
      trigger: 'payment_reminder',
      body: 'Hi {{client_name}}, a quick reminder that your balance invoice #{{invoice_id}} is due on {{due_date}}.',
    },
  ]);

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <MessageSquare size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            WhatsApp & Email Automation Templates
          </h3>
        </div>
        <Badge variant="gold">4 Automation Hooks</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((t) => (
          <div
            key={t.id}
            className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-2 text-xs"
          >
            <div className="flex justify-between items-center">
              <span className="font-bold text-text-primary">{t.title}</span>
              <Badge variant="gold" className="uppercase text-[9px]">
                {t.type}
              </Badge>
            </div>
            <span className="text-text-tertiary">Trigger: {t.trigger}</span>
            <p className="text-text-secondary bg-surface-elevated p-3 rounded-lg border border-border-subtle font-mono text-[11px] leading-relaxed">
              {t.body}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};
