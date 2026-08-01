import * as React from 'react';
import { Card, Badge } from '@photomagic/ui';
import { Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export const SmartSchedulingCard: React.FC = () => {
  return (
    <Card variant="glass" className="p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Smart AI Scheduling & Workload Predictor
          </h3>
        </div>
        <Badge variant="gold">AI Engine</Badge>
      </div>

      <div className="flex flex-col gap-3 text-xs">
        <div className="p-3 rounded-lg bg-surface-base border border-status-warning/30 flex gap-3">
          <AlertTriangle size={18} className="text-status-warning flex-shrink-0 mt-0.5" />
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-text-primary">
              Scheduling Conflict Detected (Oct 24, 2026)
            </span>
            <span className="text-text-secondary">
              Alexander Ross assigned to 2 overlapping shoots. AI recommends re-assigning Paris
              session to Elena Rostova.
            </span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-surface-base border border-border-subtle flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gold-500" />
            <span className="font-semibold text-text-primary">
              Predicted Album Delivery Date: Nov 18, 2026
            </span>
          </div>
          <Badge variant="success">98.4% Confidence</Badge>
        </div>
      </div>
    </Card>
  );
};
