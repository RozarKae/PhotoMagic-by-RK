import * as React from 'react';
import { Card, Badge } from '@photomagic/ui';
import { ShieldCheck, Lock, Key, HardDrive, CheckCircle2 } from 'lucide-react';

export const SecurityPostureOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">
            Security Posture
          </span>
          <div className="p-2 rounded-full bg-status-success/10 text-status-success border border-status-success/20">
            <ShieldCheck size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">98 / 100</span>
        <span className="text-xs text-status-success font-semibold mt-1">
          Grade A+ Production Rating
        </span>
      </Card>

      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">MFA Adoption</span>
          <div className="p-2 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <Key size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">100% Enrolled</span>
        <span className="text-xs text-text-tertiary mt-1">TOTP / Hardware Passkeys Active</span>
      </Card>

      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">
            Disaster Recovery
          </span>
          <div className="p-2 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <HardDrive size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">Daily Verified</span>
        <span className="text-xs text-status-success font-semibold mt-1">
          R2 Snapshot Live (02:00 AM)
        </span>
      </Card>

      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">
            Data Encryption
          </span>
          <div className="p-2 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <Lock size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">AES-256</span>
        <span className="text-xs text-text-tertiary mt-1">TLS 1.3 in Transit & at Rest</span>
      </Card>
    </div>
  );
};
