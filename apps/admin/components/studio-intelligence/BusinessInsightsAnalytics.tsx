'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import {
  TrendingUp,
  Award,
  Calendar,
  Users,
  Clock,
  Scissors,
  BookOpen,
  HardDrive,
  CheckCircle2,
  Zap,
  BarChart2,
  PieChart,
} from 'lucide-react';
import { BusinessInsightV10 } from '@photomagic/config';

const INSIGHTS_MOCK: BusinessInsightV10 = {
  snapshotDate: '2026-07-31',
  topPerformingService: 'Royal Destination Wedding Photography & 8K Cinema',
  peakBookingMonth: 'November - February (Rajasthan Wedding Season)',
  leadConversionRate: 68.5,
  referralSuccessRate: 42.0,
  clientRetentionRate: 88.0,
  avgEditingTurnaroundHrs: 36,
  avgAlbumCompletionDays: 7,
  storageGrowthGb: 120.5,
};

export const BusinessInsightsAnalytics: React.FC = () => {
  const [insights, setInsights] = useState<BusinessInsightV10>(INSIGHTS_MOCK);

  return (
    <Card
      variant="elevated"
      className="p-6 border border-border-subtle bg-surface-elevated flex flex-col gap-6"
    >
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <BarChart2 size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-text-primary">
                Phase 10.8 — Studio Business Insights & Operational Analytics
              </h2>
              <Badge variant="gold">Real-Time Telemetry</Badge>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              Actionable business intelligence: Top services, peak booking seasons, conversion
              rates, editing turnaround SLA, and storage growth.
            </p>
          </div>
        </div>
      </div>

      {/* Primary Analytics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Top Performing Service */}
        <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-tertiary">Top Performing Service</span>
            <Award className="text-gold-500" size={20} />
          </div>
          <h3 className="text-base font-bold text-text-primary mt-1">
            {insights.topPerformingService}
          </h3>
          <span className="text-[11px] text-gold-400 font-semibold">
            Generates 64% of total studio revenue
          </span>
        </div>

        {/* Peak Booking Months */}
        <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-tertiary">Peak Booking Season</span>
            <Calendar className="text-purple-400" size={20} />
          </div>
          <h3 className="text-base font-bold text-text-primary mt-1">
            {insights.peakBookingMonth}
          </h3>
          <span className="text-[11px] text-purple-400 font-semibold">
            98% Slot Capacity Filled
          </span>
        </div>

        {/* Lead Conversion & Referral Success */}
        <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-tertiary">Lead & Referral Performance</span>
            <TrendingUp className="text-emerald-400" size={20} />
          </div>
          <div className="flex items-center gap-4 mt-1">
            <div>
              <span className="text-xs text-text-tertiary">Conversion</span>
              <h4 className="text-xl font-extrabold text-emerald-400">
                {insights.leadConversionRate}%
              </h4>
            </div>
            <div className="border-l border-border-subtle pl-4">
              <span className="text-xs text-text-tertiary">Referrals</span>
              <h4 className="text-xl font-extrabold text-gold-500">
                {insights.referralSuccessRate}%
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Operational SLA Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex items-center justify-between">
          <div>
            <span className="text-xs text-text-tertiary">Client Retention Rate</span>
            <h3 className="text-2xl font-extrabold text-text-primary mt-1">
              {insights.clientRetentionRate}%
            </h3>
            <span className="text-[11px] text-emerald-400 font-semibold mt-0.5 block">
              Repeat Family & Corporate
            </span>
          </div>
          <Users className="text-emerald-400" size={24} />
        </div>

        <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex items-center justify-between">
          <div>
            <span className="text-xs text-text-tertiary">Avg Editing Turnaround</span>
            <h3 className="text-2xl font-extrabold text-text-primary mt-1">
              {insights.avgEditingTurnaroundHrs} Hours
            </h3>
            <span className="text-[11px] text-gold-400 font-semibold mt-0.5 block">
              AI Culling SLA Active
            </span>
          </div>
          <Scissors className="text-gold-500" size={24} />
        </div>

        <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex items-center justify-between">
          <div>
            <span className="text-xs text-text-tertiary">Album Completion Time</span>
            <h3 className="text-2xl font-extrabold text-text-primary mt-1">
              {insights.avgAlbumCompletionDays} Days
            </h3>
            <span className="text-[11px] text-amber-400 font-semibold mt-0.5 block">
              Digital Approval SLA
            </span>
          </div>
          <BookOpen className="text-amber-400" size={24} />
        </div>

        <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex items-center justify-between">
          <div>
            <span className="text-xs text-text-tertiary">Storage Growth Rate</span>
            <h3 className="text-2xl font-extrabold text-text-primary mt-1">
              +{insights.storageGrowthGb} GB/mo
            </h3>
            <span className="text-[11px] text-purple-400 font-semibold mt-0.5 block">
              Cloudflare R2 Telemetry
            </span>
          </div>
          <HardDrive className="text-purple-400" size={24} />
        </div>
      </div>
    </Card>
  );
};
