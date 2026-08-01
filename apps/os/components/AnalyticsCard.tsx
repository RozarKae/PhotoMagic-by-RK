'use client';

import React from 'react';
import { Card, Badge } from '@photomagic/ui';
import { BarChart3, TrendingUp } from 'lucide-react';

export const AnalyticsCard: React.FC = () => {
  // Monthly Revenue Data Points for SVG Chart
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  const values = [28000, 34000, 42000, 39000, 58000, 64000, 72000, 85000];
  const maxValue = Math.max(...values);

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <Badge variant="gold">Revenue & Booking Trends</Badge>
          <h3 className="text-xl font-bold text-text-primary mt-1">Studio Business Analytics</h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-status-success font-semibold">
          <TrendingUp size={16} />
          <span>+24.8% YoY Growth</span>
        </div>
      </div>

      {/* SVG Bar / Area Chart Representation */}
      <div className="h-48 w-full flex items-end justify-between gap-3 pt-6 border-b border-border-subtle pb-2">
        {values.map((val, idx) => {
          const heightPercent = (val / maxValue) * 100;
          return (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center gap-2 h-full justify-end group"
            >
              <div className="text-[10px] text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                ${(val / 1000).toFixed(0)}k
              </div>
              <div
                style={{ height: `${heightPercent}%` }}
                className="w-full bg-gradient-to-t from-gold-500/20 to-gold-500 rounded-t-md group-hover:brightness-125 transition-all"
              />
              <span className="text-[10px] font-semibold text-text-tertiary">{months[idx]}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
