'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { LeadPipelineKanban, LeadPipelineItem } from '../../components/LeadPipelineKanban';
import { MessageTemplateManager } from '../../components/MessageTemplateManager';
import { CampaignAnalyticsCards } from '../../components/CampaignAnalyticsCards';
import { Target, Plus, MessageSquare, Users, TrendingUp } from 'lucide-react';

export default function MarketingPage() {
  const [leads] = useState<LeadPipelineItem[]>([
    {
      id: 'ld-101',
      leadId: 'LEAD-2026-001',
      clientName: 'Eleanor Vance',
      source: 'Instagram Editorial Campaign',
      estimatedBudget: 15000,
      assignedExecutive: 'Sarah Jenkins',
      leadScore: 92,
      stage: 'consultation_booked',
    },
    {
      id: 'ld-102',
      leadId: 'LEAD-2026-002',
      clientName: 'Arthur Pendelton',
      source: 'Vogue Referral Partner',
      estimatedBudget: 8500,
      assignedExecutive: 'Michael Chang',
      leadScore: 84,
      stage: 'quotation_sent',
    },
  ]);

  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Lead Generation & Sales Engine</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">
            Marketing & CRM Automation
          </h1>
          <p className="text-sm text-text-secondary">
            Track 8-stage sales pipelines, campaign ROIs, referral partner commissions, and
            automated messaging.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" className="flex items-center gap-2">
            <Plus size={16} />
            Create Campaign
          </Button>
        </div>
      </div>

      {/* Campaign Analytics Metrics */}
      <CampaignAnalyticsCards />

      {/* 8-Stage Lead Pipeline Kanban */}
      <Card variant="glass" className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-text-primary">8-Stage Sales Pipeline Kanban</h3>
          <Badge variant="gold">{leads.length} Active Leads</Badge>
        </div>

        <LeadPipelineKanban leads={leads} />
      </Card>

      {/* WhatsApp & Email Templates */}
      <MessageTemplateManager />
    </main>
  );
}
