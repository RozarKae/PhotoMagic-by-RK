'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Sparkles, TrendingUp, DollarSign, CheckCircle2, ArrowUpRight } from 'lucide-react';

export interface AIAdvisorRecommendation {
  id: string;
  category: string;
  title: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  expectedImpactUsd: number;
  confidenceScore: number;
  suggestedAction: string;
}

export const AIBusinessAdvisor: React.FC = () => {
  const [recommendations, setRecommendations] = useState<AIAdvisorRecommendation[]>([
    {
      id: 'rec-1',
      category: 'Pricing Strategy',
      title: 'Increase Destination Wedding Retainer Prices by 15%',
      priority: 'high',
      expectedImpactUsd: 18500,
      confidenceScore: 96,
      suggestedAction:
        'High demand in Q4 booking pipeline allows 15% rate expansion without lead drop-off.',
    },
    {
      id: 'rec-2',
      category: 'Capacity Optimization',
      title: 'Hire 1 Additional Senior Album Editor',
      priority: 'critical',
      expectedImpactUsd: 12000,
      confidenceScore: 94,
      suggestedAction:
        'Album editing turnaround time is 14 days; additional editor reduces turnaround to 5 days, accelerating milestone payouts.',
    },
  ]);

  const handleApplyAction = (id: string) => {
    setRecommendations((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            AI Business Advisor & Strategic Growth Engine
          </h3>
        </div>
        <Badge variant="gold">{recommendations.length} Strategic Recommendations</Badge>
      </div>

      <div className="flex flex-col gap-3 text-xs">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-3"
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-text-primary text-sm">{rec.title}</span>
                <span className="text-[10px] text-gold-500 font-mono font-semibold">
                  {rec.category}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    rec.priority === 'critical' || rec.priority === 'high' ? 'error' : 'gold'
                  }
                >
                  {rec.priority}
                </Badge>
                <Badge variant="success">{rec.confidenceScore}% Confidence</Badge>
              </div>
            </div>

            <p className="text-text-secondary bg-surface-elevated p-3 rounded-lg border border-border-subtle font-mono text-[11px] leading-relaxed">
              {rec.suggestedAction}
            </p>

            <div className="flex justify-between items-center pt-2 border-t border-border-subtle">
              <span className="text-status-success font-bold font-mono">
                Est. Impact: +${rec.expectedImpactUsd.toLocaleString()}
              </span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleApplyAction(rec.id)}
                className="flex items-center gap-1"
              >
                <ArrowUpRight size={14} /> Execute Action
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
