import * as React from 'react';
import { Card, Badge } from '@photomagic/ui';
import { Coins, DollarSign, Activity, Clock } from 'lucide-react';

export const AIUsageAnalytics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">
            Today's Generation Count
          </span>
          <div className="p-2 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <Activity size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">142 Generations</span>
        <span className="text-xs text-status-success font-semibold mt-1">+12.4% vs Yesterday</span>
      </Card>

      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">
            Monthly API Cost
          </span>
          <div className="p-2 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <DollarSign size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">$48.20</span>
        <span className="text-xs text-text-tertiary mt-1">Budget Limit: $250.00</span>
      </Card>

      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">
            Avg. Processing Time
          </span>
          <div className="p-2 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <Clock size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">1,120 ms</span>
        <span className="text-xs text-status-success font-semibold mt-1">High-Speed Execution</span>
      </Card>

      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">
            Credits Consumed
          </span>
          <div className="p-2 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <Coins size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">1,550 Credits</span>
        <span className="text-xs text-text-tertiary mt-1">Monthly Allocation: 10,000</span>
      </Card>
    </div>
  );
};
