import * as React from 'react';
import { Card, Badge } from '@photomagic/ui';
import { Globe, Building2, Users, DollarSign, Cpu, ShieldCheck } from 'lucide-react';

export const GlobalPlatformStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">
            Active Tenant Studios
          </span>
          <div className="p-2 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <Building2 size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">142 Studios</span>
        <span className="text-xs text-status-success font-semibold mt-1">
          +12 Onboarded This Month
        </span>
      </Card>

      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">
            Platform MRR Revenue
          </span>
          <div className="p-2 rounded-full bg-status-success/10 text-status-success border border-status-success/20">
            <DollarSign size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">$68,400</span>
        <span className="text-xs text-status-success font-semibold mt-1">
          Monthly Recurring Revenue
        </span>
      </Card>

      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">
            Monthly API Throughput
          </span>
          <div className="p-2 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <Cpu size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">4.2 Million</span>
        <span className="text-xs text-text-tertiary mt-1">REST & GraphQL Requests</span>
      </Card>

      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">
            SaaS System Health
          </span>
          <div className="p-2 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <ShieldCheck size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">99.99%</span>
        <span className="text-xs text-status-success font-semibold mt-1">
          Multi-Tenant High Availability
        </span>
      </Card>
    </div>
  );
};
