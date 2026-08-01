'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import {
  LayoutDashboard,
  Calendar,
  DollarSign,
  Users,
  GitBranch,
  Truck,
  Bell,
  Activity,
  Zap,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Scissors,
  BookOpen,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import { FinalExecutiveDashboardV10 } from '@photomagic/config';

const DASHBOARD_DATA: FinalExecutiveDashboardV10 = {
  todaysOverview: {
    activeShoots: 3,
    editingJobsInFlight: 12,
    albumsAwaitingSignature: 4,
    deliveriesPendingDownload: 5,
  },
  upcomingEventsCount: 8,
  revenueThisMonthInr: 4850000,
  recentClientsCount: 42,
  systemHealthStatus: 'optimal',
  syncLatencyMs: 84,
};

export const StudioFinalExecutiveDashboard: React.FC = () => {
  const [dashboard, setDashboard] = useState<FinalExecutiveDashboardV10>(DASHBOARD_DATA);

  return (
    <Card
      variant="elevated"
      className="p-6 border border-border-subtle bg-surface-elevated flex flex-col gap-6"
    >
      {/* Master Executive Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-text-primary">
                Phase 10.9 — PhotoMagic Master Studio Executive Dashboard
              </h2>
              <Badge variant="gold">Production OS V10</Badge>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              Single Source of Truth Command Telemetry: Today's Overview, Revenue, Pipeline,
              Deliveries, System Health, & Quick Actions.
            </p>
          </div>
        </div>

        {/* System Health Telemetry Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-base border border-border-subtle text-xs text-emerald-400 font-semibold">
            <ShieldCheck size={16} /> System Health:{' '}
            <strong className="text-text-primary uppercase">Optimal</strong> (84ms)
          </div>
          <Button variant="primary" className="flex items-center gap-2 font-bold text-xs">
            <Zap size={14} /> Studio Quick Action
          </Button>
        </div>
      </div>

      {/* 1. Today's Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-surface-base border border-gold-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs text-gold-400 font-semibold">Active Shoots Today</span>
            <h3 className="text-2xl font-extrabold text-text-primary mt-1">
              {dashboard.todaysOverview.activeShoots} Shoots
            </h3>
            <span className="text-[11px] text-text-tertiary mt-0.5 block">
              City Palace & Lake Palace
            </span>
          </div>
          <Calendar className="text-gold-500" size={24} />
        </div>

        <div className="p-4 rounded-xl bg-surface-base border border-purple-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs text-purple-400 font-semibold">Editing Jobs In-Flight</span>
            <h3 className="text-2xl font-extrabold text-text-primary mt-1">
              {dashboard.todaysOverview.editingJobsInFlight} Jobs
            </h3>
            <span className="text-[11px] text-purple-400 font-semibold mt-0.5 block">
              AI Culling & Face Enhancer
            </span>
          </div>
          <Scissors className="text-purple-400" size={24} />
        </div>

        <div className="p-4 rounded-xl bg-surface-base border border-amber-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs text-amber-400 font-semibold">Albums Pending Signature</span>
            <h3 className="text-2xl font-extrabold text-text-primary mt-1">
              {dashboard.todaysOverview.albumsAwaitingSignature} Albums
            </h3>
            <span className="text-[11px] text-amber-400 font-semibold mt-0.5 block">
              3D Digital Proofing
            </span>
          </div>
          <BookOpen className="text-amber-400" size={24} />
        </div>

        <div className="p-4 rounded-xl bg-surface-base border border-emerald-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs text-emerald-400 font-semibold">
              Deliveries Pending Download
            </span>
            <h3 className="text-2xl font-extrabold text-text-primary mt-1">
              {dashboard.todaysOverview.deliveriesPendingDownload} Deliveries
            </h3>
            <span className="text-[11px] text-emerald-400 font-semibold mt-0.5 block">
              PIN-Protected 8K ZIPs
            </span>
          </div>
          <Truck className="text-emerald-400" size={24} />
        </div>
      </div>

      {/* 2. Executive Sections Breakdown (Revenue, Pipeline, System Health) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue & Recent Clients */}
        <div className="p-5 rounded-xl bg-surface-base border border-border-subtle flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
            <span className="flex items-center gap-2 text-sm font-bold text-text-primary">
              <DollarSign size={16} className="text-gold-500" /> Revenue & Client Growth
            </span>
            <Badge variant="gold">Monthly</Badge>
          </div>

          <div>
            <span className="text-xs text-text-tertiary">July 2026 Revenue Snapshot</span>
            <h3 className="text-3xl font-extrabold text-gold-500 mt-1">₹48.50 Lakhs</h3>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp size={14} /> +22.4% vs previous month
            </span>
          </div>

          <div className="border-t border-border-subtle pt-3 text-xs text-text-secondary flex justify-between items-center">
            <span>Recent Active Clients:</span>
            <strong className="text-text-primary font-bold">
              {dashboard.recentClientsCount} Verified Clients
            </strong>
          </div>
        </div>

        {/* 15-Stage Project Pipeline */}
        <div className="p-5 rounded-xl bg-surface-base border border-border-subtle flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
            <span className="flex items-center gap-2 text-sm font-bold text-text-primary">
              <GitBranch size={16} className="text-purple-400" /> 15-Stage Production Pipeline
            </span>
            <Badge variant="info">28 Active Projects</Badge>
          </div>

          <div className="flex flex-col gap-2 text-xs">
            <div className="flex justify-between items-center p-2 rounded bg-surface-elevated/50 border border-border-subtle">
              <span>Booking Confirmed</span>
              <strong className="text-emerald-400 font-bold">5 Projects</strong>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-surface-elevated/50 border border-border-subtle">
              <span>AI Culling & Editing</span>
              <strong className="text-purple-400 font-bold">12 Projects</strong>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-surface-elevated/50 border border-border-subtle">
              <span>Album Design & Print</span>
              <strong className="text-amber-400 font-bold">6 Projects</strong>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-surface-elevated/50 border border-border-subtle">
              <span>Master Delivery</span>
              <strong className="text-gold-500 font-bold">5 Projects</strong>
            </div>
          </div>
        </div>

        {/* Quick Action Shortcuts & System Health */}
        <div className="p-5 rounded-xl bg-surface-base border border-border-subtle flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
            <span className="flex items-center gap-2 text-sm font-bold text-text-primary">
              <Zap size={16} className="text-gold-500" /> Studio Quick Actions
            </span>
            <Badge variant="gold">OS Shortcuts</Badge>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <Button variant="secondary" className="text-xs py-2 h-auto font-semibold justify-start">
              <Calendar size={14} className="mr-1 text-gold-500" /> New Booking
            </Button>
            <Button variant="secondary" className="text-xs py-2 h-auto font-semibold justify-start">
              <Scissors size={14} className="mr-1 text-purple-400" /> AI Culling Job
            </Button>
            <Button variant="secondary" className="text-xs py-2 h-auto font-semibold justify-start">
              <BookOpen size={14} className="mr-1 text-amber-400" /> 3D Album Draft
            </Button>
            <Button variant="secondary" className="text-xs py-2 h-auto font-semibold justify-start">
              <Truck size={14} className="mr-1 text-emerald-400" /> Dispatch Delivery
            </Button>
          </div>

          <div className="p-3 rounded-lg bg-surface-elevated border border-border-subtle flex items-center justify-between text-xs">
            <span className="text-text-tertiary">Cloud Infrastructure Health</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 size={14} /> 99.99% Uptime
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
