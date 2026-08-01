import * as React from 'react';
import { Card } from '@photomagic/ui';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface DashboardCardProps {
  title: string;
  value: string;
  trend?: string;
  trendDirection?: 'up' | 'down';
  subtitle?: string;
  icon: React.ReactNode;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  trend,
  trendDirection = 'up',
  subtitle,
  icon,
}) => {
  return (
    <Card
      variant="glass"
      className="p-6 flex flex-col justify-between relative overflow-hidden group"
    >
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-gold-500/10 transition-colors" />

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
          {title}
        </span>
        <div className="rounded-full bg-gold-500/10 p-2.5 text-gold-500 border border-gold-500/20">
          {icon}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="text-3xl font-extrabold text-text-primary tracking-tight">{value}</div>
        <div className="flex items-center justify-between text-xs mt-1">
          {subtitle && <span className="text-text-tertiary">{subtitle}</span>}
          {trend && (
            <div
              className={`flex items-center gap-1 font-semibold ${
                trendDirection === 'up' ? 'text-status-success' : 'text-status-error'
              }`}
            >
              {trendDirection === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span>{trend}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
