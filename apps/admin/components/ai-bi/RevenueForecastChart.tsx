import * as React from 'react';
import { Card, Badge } from '@photomagic/ui';
import { TrendingUp, BarChart2, Calendar } from 'lucide-react';

export const RevenueForecastChart: React.FC = () => {
  const months = ['May', 'Jun', 'Jul', 'Aug (AI Forecast)', 'Sep (AI Forecast)', 'Oct (AI Forecast)'];
  const values = ['$112K', '$135K', '$148.5K', '$165K', '$182K', '$210K'];

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">6-Month AI Revenue & Booking Forecast</h3>
        </div>
        <Badge variant="gold">Predicted Peak: October 2026</Badge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 text-xs pt-2">
        {months.map((m, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-surface-base border border-border-subtle flex flex-col justify-between items-center text-center gap-2">
            <span className="font-mono text-[10px] text-text-tertiary">{m}</span>
            <span className="font-extrabold text-gold-500 text-sm font-mono">{values[idx]}</span>
            <div className="w-full bg-surface-elevated h-1.5 rounded-full overflow-hidden">
              <div className="bg-gold-500 h-full" style={{ width: `${(idx + 1) * 16.6}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
