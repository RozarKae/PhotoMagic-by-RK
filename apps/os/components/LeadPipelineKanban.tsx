'use client';

import React from 'react';
import { Card, Badge } from '@photomagic/ui';
import {
  User,
  MessageSquare,
  Phone,
  Calendar,
  DollarSign,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

export interface LeadPipelineItem {
  id: string;
  leadId: string;
  clientName: string;
  source: string;
  estimatedBudget: number;
  assignedExecutive: string;
  leadScore: number;
  stage:
    | 'new_lead'
    | 'contacted'
    | 'follow_up_scheduled'
    | 'consultation_booked'
    | 'quotation_sent'
    | 'negotiation'
    | 'won'
    | 'booked'
    | 'lost';
  lostReason?: string;
}

const PIPELINE_STAGES: Array<{ id: LeadPipelineItem['stage']; label: string }> = [
  { id: 'new_lead', label: 'New Lead' },
  { id: 'contacted', label: 'Contacted' },
  { id: 'follow_up_scheduled', label: 'Follow-Up' },
  { id: 'consultation_booked', label: 'Consultation' },
  { id: 'quotation_sent', label: 'Quotation Sent' },
  { id: 'negotiation', label: 'Negotiation' },
  { id: 'won', label: 'Won' },
  { id: 'booked', label: 'Booked' },
];

interface LeadPipelineKanbanProps {
  leads: LeadPipelineItem[];
}

export const LeadPipelineKanban: React.FC<LeadPipelineKanbanProps> = ({ leads }) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-6">
      {PIPELINE_STAGES.map((stage) => {
        const stageLeads = leads.filter((l) => l.stage === stage.id);

        return (
          <div
            key={stage.id}
            className="flex flex-col gap-3 w-72 flex-shrink-0 bg-surface-base/40 p-3 rounded-xl border border-border-subtle"
          >
            <div className="flex items-center justify-between px-1 py-1">
              <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">
                {stage.label}
              </h4>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-surface-elevated text-text-secondary border border-border-subtle">
                {stageLeads.length}
              </span>
            </div>

            <div className="flex flex-col gap-3 min-h-[300px]">
              {stageLeads.map((lead) => (
                <Card
                  key={lead.id}
                  variant="glass"
                  className="p-4 flex flex-col gap-2 hover:border-gold-500/50 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-bold text-text-primary">{lead.clientName}</span>
                    <Badge variant="gold" className="text-[10px]">
                      Score: {lead.leadScore}
                    </Badge>
                  </div>
                  <span className="text-xs text-text-secondary">Source: {lead.source}</span>
                  <div className="flex justify-between items-center text-[11px] text-gold-500 font-semibold mt-1">
                    <span>Budget: ${lead.estimatedBudget.toLocaleString()}</span>
                    <span className="text-text-tertiary">{lead.assignedExecutive}</span>
                  </div>
                </Card>
              ))}

              {stageLeads.length === 0 && (
                <div className="h-full flex items-center justify-center p-4 border border-dashed border-border-subtle rounded-lg text-xs text-text-tertiary">
                  Empty Stage
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
