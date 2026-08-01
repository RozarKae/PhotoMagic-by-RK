import * as React from 'react';
import { Card, Badge } from '@photomagic/ui';
import { Target, TrendingUp, Users, DollarSign } from 'lucide-react';

export const CampaignAnalyticsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">
            Active Campaigns
          </span>
          <div className="p-2 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <Target size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">4 Live Campaigns</span>
        <span className="text-xs text-text-tertiary mt-1">Instagram, Google, Vogue</span>
      </Card>

      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">
            Leads Generated
          </span>
          <div className="p-2 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <Users size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">142 Leads</span>
        <span className="text-xs text-status-success font-semibold mt-1">
          +34.2% Conversion Rate
        </span>
      </Card>

      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">Campaign ROI</span>
          <div className="p-2 rounded-full bg-status-success/10 text-status-success border border-status-success/20">
            <TrendingUp size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">482% ROI</span>
        <span className="text-xs text-status-success font-semibold mt-1">
          4.82x Return on Ad Spend
        </span>
      </Card>

      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">
            Avg. Booking Value
          </span>
          <div className="p-2 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <DollarSign size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">$6,200</span>
        <span className="text-xs text-text-tertiary mt-1">Per Confirmed Project</span>
      </Card>
    </div>
  );
};
