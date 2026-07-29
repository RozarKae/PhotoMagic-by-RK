import * as React from 'react';
import { Card, Badge } from '@photomagic/ui';
import { Server, Cpu, HardDrive, Activity, CheckCircle2 } from 'lucide-react';

export const DevOpsMonitoringCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">
            Server Response Time
          </span>
          <div className="p-2 rounded-full bg-status-success/10 text-status-success border border-status-success/20">
            <Activity size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">42 ms</span>
        <span className="text-xs text-status-success font-semibold mt-1">99.99% Uptime SLA</span>
      </Card>

      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">CPU & RAM Load</span>
          <div className="p-2 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <Cpu size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">18% Usage</span>
        <span className="text-xs text-text-tertiary mt-1">Docker Container Healthy</span>
      </Card>

      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">
            R2 S3 Storage Vault
          </span>
          <div className="p-2 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <HardDrive size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">1.42 TB</span>
        <span className="text-xs text-status-success font-semibold mt-1">
          Zero Egress Cost Active
        </span>
      </Card>

      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">
            Redis Job Queue
          </span>
          <div className="p-2 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <Server size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">0 Pending</span>
        <span className="text-xs text-text-tertiary mt-1">Background Automations Sync</span>
      </Card>
    </div>
  );
};
