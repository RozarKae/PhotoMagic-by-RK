'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { EventProvisioningManager } from '../../components/studio-workflow/EventProvisioningManager';
import { AiPhotoCullingEngine } from '../../components/studio-workflow/AiPhotoCullingEngine';
import { EditorTaskAssignmentHub } from '../../components/studio-workflow/EditorTaskAssignmentHub';
import { ClientNotificationsCenter } from '../../components/studio-workflow/ClientNotificationsCenter';
import { DeadlineManagerHub } from '../../components/studio-workflow/DeadlineManagerHub';
import { UnifiedStudioCalendar } from '../../components/studio-workflow/UnifiedStudioCalendar';
import { WorkflowExecutiveDashboard } from '../../components/studio-workflow/WorkflowExecutiveDashboard';
import {
  GitBranch,
  Sparkles,
  LayoutDashboard,
  Calendar as CalendarIcon,
  Clock,
  Bell,
  Users,
  FolderPlus,
  CheckCircle2,
} from 'lucide-react';

export default function StudioWorkflowPage() {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'calendar' | 'deadlines' | 'notifications' | 'tasks' | 'provisioning'
  >('dashboard');

  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="gold">Phases 9.1 – 9.9 Complete Studio Automation OS</Badge>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Workflow Complete
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">
            Studio Workflow Control Center
          </h1>
          <p className="text-sm text-text-secondary mt-0.5">
            Complete studio automation system: Executive dashboard, multi-channel client
            notifications, production deadline manager, unified calendar, AI photo culling, and
            11-stage project tracking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" className="flex items-center gap-2 font-bold">
            <Sparkles size={16} /> Auto-Provision New Booking Workflow
          </Button>
        </div>
      </div>

      {/* Control Center Master Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-border-subtle overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'dashboard'
              ? 'bg-gold-500/20 text-gold-500 border border-gold-500/40 shadow-lg shadow-gold-500/5'
              : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
          }`}
        >
          <LayoutDashboard size={18} /> Executive Dashboard (9.9)
        </button>

        <button
          onClick={() => setActiveTab('calendar')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'calendar'
              ? 'bg-gold-500/20 text-gold-500 border border-gold-500/40 shadow-lg shadow-gold-500/5'
              : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
          }`}
        >
          <CalendarIcon size={18} /> Unified Calendar (9.8)
        </button>

        <button
          onClick={() => setActiveTab('deadlines')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'deadlines'
              ? 'bg-gold-500/20 text-gold-500 border border-gold-500/40 shadow-lg shadow-gold-500/5'
              : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
          }`}
        >
          <Clock size={18} /> Deadline Manager (9.7)
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'notifications'
              ? 'bg-gold-500/20 text-gold-500 border border-gold-500/40 shadow-lg shadow-gold-500/5'
              : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
          }`}
        >
          <Bell size={18} /> Client Notifications (9.6)
        </button>

        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'tasks'
              ? 'bg-gold-500/20 text-gold-500 border border-gold-500/40 shadow-lg shadow-gold-500/5'
              : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
          }`}
        >
          <Users size={18} /> Editor & Production (9.4-9.5)
        </button>

        <button
          onClick={() => setActiveTab('provisioning')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'provisioning'
              ? 'bg-gold-500/20 text-gold-500 border border-gold-500/40 shadow-lg shadow-gold-500/5'
              : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
          }`}
        >
          <FolderPlus size={18} /> Provisioning & AI Culling (9.1-9.3)
        </button>
      </div>

      {/* Tab Content Display */}
      <div className="flex flex-col gap-8">
        {activeTab === 'dashboard' && (
          <>
            <WorkflowExecutiveDashboard />
            <DeadlineManagerHub />
            <ClientNotificationsCenter />
          </>
        )}

        {activeTab === 'calendar' && <UnifiedStudioCalendar />}

        {activeTab === 'deadlines' && <DeadlineManagerHub />}

        {activeTab === 'notifications' && <ClientNotificationsCenter />}

        {activeTab === 'tasks' && <EditorTaskAssignmentHub />}

        {activeTab === 'provisioning' && (
          <>
            <EventProvisioningManager />
            <AiPhotoCullingEngine />
          </>
        )}
      </div>
    </main>
  );
}
