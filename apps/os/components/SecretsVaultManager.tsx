import * as React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Lock, Key, ShieldCheck, RefreshCw } from 'lucide-react';

export const SecretsVaultManager: React.FC = () => {
  const secrets = [
    {
      id: 'sec-1',
      name: 'SUPABASE_SERVICE_ROLE_KEY',
      maskedValue: '••••••••••••••••3a9b',
      lastRotated: '2026-06-15',
      environment: 'Production',
    },
    {
      id: 'sec-2',
      name: 'CLOUDFLARE_R2_SECRET_ACCESS_KEY',
      maskedValue: '••••••••••••••••881f',
      lastRotated: '2026-07-01',
      environment: 'Production',
    },
    {
      id: 'sec-3',
      name: 'RAZORPAY_KEY_SECRET',
      maskedValue: '••••••••••••••••7c2e',
      lastRotated: '2026-05-20',
      environment: 'Production',
    },
  ];

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Lock size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Encrypted Studio Secrets Vault</h3>
        </div>
        <Badge variant="gold">AES-256 Encrypted</Badge>
      </div>

      <div className="flex flex-col gap-3">
        {secrets.map((s) => (
          <div
            key={s.id}
            className="p-3 rounded-lg bg-surface-base border border-border-subtle flex justify-between items-center text-xs"
          >
            <div className="flex items-center gap-3">
              <Key size={16} className="text-gold-500 flex-shrink-0" />
              <div className="flex flex-col">
                <span className="font-bold text-text-primary font-mono">{s.name}</span>
                <span className="text-text-tertiary font-mono">
                  {s.maskedValue} • Rotated {s.lastRotated}
                </span>
              </div>
            </div>

            <Button variant="secondary" size="sm" className="flex items-center gap-1">
              <RefreshCw size={12} />
              Rotate Key
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};
