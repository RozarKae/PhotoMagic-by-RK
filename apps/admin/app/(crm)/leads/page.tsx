'use client';

import React, { useState } from 'react';
import { Button, Badge, Tabs } from '@photomagic/ui';
import { LeadKanbanBoard } from '../../../components/LeadKanbanBoard';
import { CreateLeadModal } from '../../../components/CreateLeadModal';
import { LeadItem } from '../../actions/crm-actions';
import { Plus, LayoutGrid, List } from 'lucide-react';

export default function LeadsPage() {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [leads, setLeads] = useState<LeadItem[]>([
    {
      id: 'lead-1',
      workspaceId: 'ws_photomagic_demo',
      clientName: 'Eleanor Vance & Julian',
      email: 'eleanor@example.com',
      phone: '+1 (555) 019-2834',
      eventType: 'Royal Wedding',
      eventDate: '2026-10-24',
      estimatedBudget: 12500,
      status: 'new',
      tags: ['Website Inquiry', 'VIP'],
      createdAt: '2026-07-29T10:00:00Z',
    },
    {
      id: 'lead-2',
      workspaceId: 'ws_photomagic_demo',
      clientName: 'Sarah Montgomery',
      email: 'sarah@editorial.com',
      phone: '+1 (555) 092-1184',
      eventType: 'Fashion Editorial',
      eventDate: '2026-11-12',
      estimatedBudget: 8000,
      status: 'contacted',
      tags: ['Vogue', 'Commercial'],
      createdAt: '2026-07-28T14:30:00Z',
    },
    {
      id: 'lead-3',
      workspaceId: 'ws_photomagic_demo',
      clientName: 'Arthur Pendelton',
      email: 'arthur@luxuryevents.com',
      eventType: 'Studio Portrait',
      eventDate: '2026-09-05',
      estimatedBudget: 4500,
      status: 'quote_sent',
      tags: ['Portrait'],
      createdAt: '2026-07-27T09:15:00Z',
    },
  ]);

  const handleStatusChange = (leadId: string, newStatus: LeadItem['status']) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead)),
    );
  };

  const handleLeadCreated = (newLead: LeadItem) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  return (
    <main className="p-8 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="gold">CRM Engine</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">Lead Pipeline & CRM</h1>
          <p className="text-sm text-text-secondary">
            Capture, track, and convert client inquiries into confirmed bookings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-surface-elevated p-1 rounded-lg border border-border-subtle">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-md text-xs font-semibold transition-colors ${
                viewMode === 'kanban'
                  ? 'bg-gold-500 text-canvas'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md text-xs font-semibold transition-colors ${
                viewMode === 'list'
                  ? 'bg-gold-500 text-canvas'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <List size={16} />
            </button>
          </div>

          <Button
            variant="primary"
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Add Manual Lead
          </Button>
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === 'kanban' ? (
        <LeadKanbanBoard leads={leads} onStatusChange={handleStatusChange} />
      ) : (
        <div className="p-8 text-center border border-border-subtle rounded-xl bg-surface-base text-text-secondary text-sm">
          List View Active — {leads.length} Active Leads Managed.
        </div>
      )}

      <CreateLeadModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onLeadCreated={handleLeadCreated}
      />
    </main>
  );
}
