import * as React from 'react';
import { Card, Badge } from '@photomagic/ui';
import { DollarSign, TrendingUp, Users, Activity, CheckCircle2 } from 'lucide-react';

export const ExecutiveKPICards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">
            Monthly Revenue
          </span>
          <div className="p-2 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <DollarSign size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">$148,500</span>
        <span className="text-xs text-status-success font-semibold mt-1">
          +18.4% vs Previous Month
        </span>
      </Card>

      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">
            Net Profit Margin
          </span>
          <div className="p-2 rounded-full bg-status-success/10 text-status-success border border-status-success/20">
            <TrendingUp size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">64.2%</span>
        <span className="text-xs text-status-success font-semibold mt-1">
          High Profitability Benchmark
        </span>
      </Card>

      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">
            Lead Conversion Rate
          </span>
          <div className="p-2 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <Users size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">34.8%</span>
        <span className="text-xs text-text-tertiary mt-1">142 Inquiries / 49 Bookings</span>
      </Card>

      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">
            Team Utilization
          </span>
          <div className="p-2 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <Activity size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">88.5%</span>
        <span className="text-xs text-status-success font-semibold mt-1">
          Optimal Crew Allocation
        </span>
      </Card>
    </div>
  );
};
