'use client';

import React from 'react';
import { Card, Badge } from '@photomagic/ui';
import { LeadItem } from '../app/actions/crm-actions';
import Link from 'next/link';

interface LeadKanbanBoardProps {
  leads: LeadItem[];
  onStatusChange: (leadId: string, newStatus: LeadItem['status']) => void;
}

const COLUMNS: Array<{ id: LeadItem['status']; label: string }> = [
  { id: 'new', label: 'New Inquiry' },
  { id: 'contacted', label: 'Contacted' },
  { id: 'consultation_booked', label: 'Consultation' },
  { id: 'quote_sent', label: 'Quote Sent' },
  { id: 'won', label: 'Won / Booked' },
  { id: 'lost', label: 'Lost' },
];

export const LeadKanbanBoard: React.FC<LeadKanbanBoardProps> = ({ leads, onStatusChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-6">
      {COLUMNS.map((col) => {
        const columnLeads = leads.filter((l) => l.status === col.id);

        return (
          <div
            key={col.id}
            className="flex flex-col gap-3 min-w-[240px] bg-surface-base/50 p-3 rounded-xl border border-border-subtle"
          >
            <div className="flex items-center justify-between px-1 py-1">
              <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">
                {col.label}
              </h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-surface-elevated text-text-secondary border border-border-subtle">
                {columnLeads.length}
              </span>
            </div>

            <div className="flex flex-col gap-3 min-h-[300px]">
              {columnLeads.map((lead) => (
                <Card
                  key={lead.id}
                  variant="glass"
                  className="p-4 flex flex-col gap-2 hover:border-gold-500/50 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <Link
                      href={`/leads/${lead.id}`}
                      className="text-sm font-bold text-text-primary hover:text-gold-500"
                    >
                      {lead.clientName}
                    </Link>
                    <Badge variant="gold" className="text-[10px]">
                      {lead.eventType}
                    </Badge>
                  </div>
                  <p className="text-xs text-text-tertiary">{lead.email}</p>
                  {lead.eventDate && (
                    <div className="text-xs text-text-secondary mt-1">
                      Event Date: <span className="font-medium">{lead.eventDate}</span>
                    </div>
                  )}
                  {lead.estimatedBudget && (
                    <div className="text-xs font-semibold text-gold-500">
                      Budget: ${lead.estimatedBudget.toLocaleString()}
                    </div>
                  )}
                </Card>
              ))}

              {columnLeads.length === 0 && (
                <div className="h-full flex items-center justify-center p-4 border border-dashed border-border-subtle rounded-lg text-xs text-text-tertiary">
                  No Leads
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
