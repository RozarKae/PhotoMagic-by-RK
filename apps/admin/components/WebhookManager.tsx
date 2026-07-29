import * as React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Radio, RefreshCw, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const WebhookManager: React.FC = () => {
  const webhookLogs = [
    {
      id: 'wh-101',
      event: 'payment.captured',
      provider: 'Razorpay',
      status: '200 OK',
      timestamp: '12:42 PM',
      signatureVerified: true,
    },
    {
      id: 'wh-102',
      event: 'r2.object.created',
      provider: 'Cloudflare R2',
      status: '200 OK',
      timestamp: '11:15 AM',
      signatureVerified: true,
    },
  ];

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Radio size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Webhook Dispatch & Signature Audit Center
          </h3>
        </div>
        <Badge variant="gold">HMAC SHA-256 Verified</Badge>
      </div>

      <div className="flex flex-col gap-3">
        {webhookLogs.map((log) => (
          <div
            key={log.id}
            className="p-3 rounded-lg bg-surface-base border border-border-subtle flex justify-between items-center text-xs"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck size={16} className="text-status-success flex-shrink-0" />
              <div className="flex flex-col">
                <span className="font-bold font-mono text-text-primary">{log.event}</span>
                <span className="text-text-tertiary">
                  {log.provider} • {log.timestamp}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="success">{log.status}</Badge>
              <Button variant="ghost" size="sm">
                <RefreshCw size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
