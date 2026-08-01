'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import {
  LayoutDashboard,
  TrendingUp,
  FolderCheck,
  Clock,
  CheckCircle2,
  Scissors,
  BookOpen,
  Truck,
  DollarSign,
  Calendar,
  HardDrive,
  Activity,
  ArrowUpRight,
  Sparkles,
  Zap,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { WorkflowDashboardMetricsV9 } from '@photomagic/config';

const METRICS_SNAPSHOT: WorkflowDashboardMetricsV9 = {
  snapshotDate: '2026-07-31',
  activeProjectsCount: 28,
  todaysTasksCount: 14,
  pendingReviewsCount: 6,
  editingQueueCount: 18,
  albumQueueCount: 9,
  deliveryQueueCount: 5,
  revenueSnapshotInr: 4850000.0,
  upcomingEventsCount: 12,
  storageUsageGb: 3420.5, // ~3.42 TB out of 5 TB allocated
  performanceLatencyMs: 84, // ultra fast real-time sync latency
};

export const WorkflowExecutiveDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<WorkflowDashboardMetricsV9>(METRICS_SNAPSHOT);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleRefreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setMetrics({
        ...metrics,
        performanceLatencyMs: Math.floor(70 + Math.random() * 30),
      });
      setIsRefreshing(false);
    }, 800);
  };

  const storagePercent = Math.min(100, Math.round((metrics.storageUsageGb / 5000) * 100));

  return (
    <Card
      variant="elevated"
      className="p-6 border border-border-subtle bg-surface-elevated flex flex-col gap-6"
    >
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-text-primary">
                Phase 9.9 — Executive Workflow Dashboard
              </h2>
              <Badge variant="gold">Real-Time Sync Active</Badge>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              Unified command telemetry: Active Projects, Today's Tasks, Editing & Album Queues,
              Revenue, & Storage Telemetry.
            </p>
          </div>
        </div>

        {/* Sync Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-base border border-border-subtle text-xs text-emerald-400">
            <Activity size={14} /> Latency:{' '}
            <strong className="text-text-primary">{metrics.performanceLatencyMs} ms</strong>
          </div>
          <Button
            variant="secondary"
            onClick={handleRefreshData}
            disabled={isRefreshing}
            className="flex items-center gap-2 text-xs font-semibold"
          >
            <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
            {isRefreshing ? 'Syncing...' : 'Sync Telemetry'}
          </Button>
        </div>
      </div>

      {/* Top Level Metric Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Projects */}
        <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex items-center justify-between">
          <div>
            <span className="text-xs text-text-tertiary">Active Studio Projects</span>
            <h3 className="text-2xl font-extrabold text-text-primary mt-1">
              {metrics.activeProjectsCount}
            </h3>
            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp size={12} /> +15% vs last month
            </span>
          </div>
          <div className="p-3 rounded-xl bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <FolderCheck size={22} />
          </div>
        </div>

        {/* Today's Tasks */}
        <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex items-center justify-between">
          <div>
            <span className="text-xs text-text-tertiary">Today's SLA Tasks</span>
            <h3 className="text-2xl font-extrabold text-text-primary mt-1">
              {metrics.todaysTasksCount}
            </h3>
            <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-1 mt-1">
              <Clock size={12} /> 4 Pending Approvals
            </span>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock size={22} />
          </div>
        </div>

        {/* Revenue Snapshot */}
        <div className="p-4 rounded-xl bg-surface-base border border-gold-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs text-gold-400 font-semibold">Monthly Revenue Snapshot</span>
            <h3 className="text-2xl font-extrabold text-gold-500 mt-1">
              ₹{(metrics.revenueSnapshotInr / 100000).toFixed(2)} Lakhs
            </h3>
            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp size={12} /> GST 18% Compliant
            </span>
          </div>
          <div className="p-3 rounded-xl bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <DollarSign size={22} />
          </div>
        </div>

        {/* Storage Usage Telemetry */}
        <div className="p-4 rounded-xl bg-surface-base border border-purple-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs text-purple-400 font-semibold">Cloudflare R2 Storage</span>
            <h3 className="text-2xl font-extrabold text-text-primary mt-1">
              {(metrics.storageUsageGb / 1000).toFixed(2)} TB
            </h3>
            <span className="text-[11px] text-text-tertiary font-medium mt-1 block">
              3,420 GB of 5,000 GB used ({storagePercent}%)
            </span>
          </div>
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <HardDrive size={22} />
          </div>
        </div>
      </div>

      {/* Production Queues Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Editing Queue */}
        <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-bold text-purple-400">
              <Scissors size={16} /> AI Editing Queue
            </span>
            <Badge variant="info">{metrics.editingQueueCount} Jobs</Badge>
          </div>
          <p className="text-xs text-text-secondary">
            AI expression culling, 68-pt landmark face enhancement, non-destructive LUT grading.
          </p>
          <div className="w-full bg-surface-elevated rounded-full h-2 overflow-hidden border border-border-subtle">
            <div className="bg-purple-500 h-full rounded-full" style={{ width: '75%' }} />
          </div>
        </div>

        {/* Album Queue */}
        <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <BookOpen size={16} /> 3D Album Design Queue
            </span>
            <Badge variant="info">{metrics.albumQueueCount} Albums</Badge>
          </div>
          <p className="text-xs text-text-secondary">
            12x18 spread layouts, gold foil embossing, digital signature approvals.
          </p>
          <div className="w-full bg-surface-elevated rounded-full h-2 overflow-hidden border border-border-subtle">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: '60%' }} />
          </div>
        </div>

        {/* Delivery Queue */}
        <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <Truck size={16} /> High-Res Delivery Queue
            </span>
            <Badge variant="info">{metrics.deliveryQueueCount} Deliveries</Badge>
          </div>
          <p className="text-xs text-text-secondary">
            PIN-protected 8K master ZIP exports, RAW archives, courier dispatch.
          </p>
          <div className="w-full bg-surface-elevated rounded-full h-2 overflow-hidden border border-border-subtle">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '90%' }} />
          </div>
        </div>
      </div>

      {/* System Telemetry & Integration Summary */}
      <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-text-primary">
              System-Wide Cross-Module Synchronization
            </h4>
            <p className="text-xs text-text-tertiary mt-0.5">
              Integrate with Website, Admin, AI Editing, Album Studio, Delivery Center, Payments, &
              Client Portal.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-gold-500/10 text-gold-400 border border-gold-500/20">
            Website Sync: Active
          </span>
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
            AI Editing Sync: Active
          </span>
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Album Studio Sync: Active
          </span>
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Client Portal Sync: Active
          </span>
        </div>
      </div>
    </Card>
  );
};
