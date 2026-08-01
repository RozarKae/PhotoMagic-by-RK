'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input } from '@photomagic/ui';
import {
  Clock,
  AlertTriangle,
  CalendarCheck,
  Zap,
  Bell,
  Share2,
  ShieldAlert,
  UserCheck,
  CheckCircle2,
  Calendar as CalendarIcon,
  Filter,
  ArrowUpRight,
} from 'lucide-react';
import { StudioDeadlineV9 } from '@photomagic/config';

const INITIAL_DEADLINES: StudioDeadlineV9[] = [
  {
    id: 'dl-1',
    projectId: 'proj-udr-901',
    projectName: 'Udaipur Royal Palace Wedding',
    taskName: 'RAW Upload & Directory Provisioning',
    assigneeName: 'Vikramaditya (Lead Photographer)',
    assigneeRole: 'photographer',
    dueDate: '2026-08-01',
    priorityLevel: 'urgent',
    status: 'in_progress',
    slaHoursRemaining: 18,
    isEscalated: false,
    reminderSentCount: 2,
    icalSyncToken: 'ical_token_udr901_raw',
  },
  {
    id: 'dl-2',
    projectId: 'proj-udr-902',
    projectName: 'Lake Palace Pre-Wedding Shoot',
    taskName: 'AI Expression Photo Culling',
    assigneeName: 'Priya Sharma (Senior Editor)',
    assigneeRole: 'editor',
    dueDate: '2026-08-02',
    priorityLevel: 'high',
    status: 'pending',
    slaHoursRemaining: 42,
    isEscalated: false,
    reminderSentCount: 1,
    icalSyncToken: 'ical_token_udr902_cull',
  },
  {
    id: 'dl-3',
    projectId: 'proj-udr-903',
    projectName: 'Jagmandir Island Reception',
    taskName: 'Color Grading & Batch Export',
    assigneeName: 'Amitabh Sen (Colorist)',
    assigneeRole: 'editor',
    dueDate: '2026-07-30',
    priorityLevel: 'urgent',
    status: 'overdue',
    slaHoursRemaining: -14,
    isEscalated: true,
    reminderSentCount: 4,
    icalSyncToken: 'ical_token_udr903_color',
  },
  {
    id: 'dl-4',
    projectId: 'proj-udr-904',
    projectName: 'City Palace Destination Wedding',
    taskName: '12x18 Metallic Gold Album Layout Design',
    assigneeName: 'Neha Kapoor (Album Specialist)',
    assigneeRole: 'album_designer',
    dueDate: '2026-08-04',
    priorityLevel: 'medium',
    status: 'in_progress',
    slaHoursRemaining: 90,
    isEscalated: false,
    reminderSentCount: 0,
    icalSyncToken: 'ical_token_udr904_album',
  },
  {
    id: 'dl-5',
    projectId: 'proj-udr-905',
    projectName: 'Fateh Garh Sunset Portraits',
    taskName: 'Jaipur Print Lab Dispatch',
    assigneeName: 'Ramesh Kumar (Print Supervisor)',
    assigneeRole: 'printer',
    dueDate: '2026-08-05',
    priorityLevel: 'high',
    status: 'pending',
    slaHoursRemaining: 114,
    isEscalated: false,
    reminderSentCount: 0,
    icalSyncToken: 'ical_token_udr905_print',
  },
];

const PRIORITY_BADGES: Record<string, { label: string; color: string }> = {
  urgent: { label: 'URGENT SLA', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
  high: { label: 'HIGH PRIORITY', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  medium: { label: 'MEDIUM', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  low: { label: 'LOW', color: 'bg-slate-500/10 text-slate-400 border-slate-500/20' },
};

export const DeadlineManagerHub: React.FC = () => {
  const [deadlines, setDeadlines] = useState<StudioDeadlineV9[]>(INITIAL_DEADLINES);
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  const filteredDeadlines =
    selectedPriority === 'all'
      ? deadlines
      : deadlines.filter((d) => d.priorityLevel === selectedPriority);

  const overdueCount = deadlines.filter(
    (d) => d.status === 'overdue' || d.slaHoursRemaining < 0,
  ).length;
  const urgentCount = deadlines.filter((d) => d.priorityLevel === 'urgent').length;

  const handleTriggerEscalation = (id: string) => {
    setDeadlines(
      deadlines.map((d) =>
        d.id === id ? { ...d, isEscalated: true, reminderSentCount: d.reminderSentCount + 1 } : d,
      ),
    );
  };

  const handleGenerateIcalSync = () => {
    setSyncNotice(
      'iCal / Google Calendar Sync Feed URL generated! Syncing 5 active studio deadlines to external calendar.',
    );
    setTimeout(() => setSyncNotice(null), 5000);
  };

  return (
    <Card
      variant="elevated"
      className="p-6 border border-border-subtle bg-surface-elevated flex flex-col gap-6"
    >
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <Clock size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-text-primary">
                Phase 9.7 — Deadline Manager & Auto Escalation
              </h2>
              {overdueCount > 0 && <Badge variant="error">{overdueCount} Overdue SLA Alert</Badge>}
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              Production SLA tracking, auto-escalations, priority assignment, and 1-click Google
              Calendar sync.
            </p>
          </div>
        </div>

        {/* Sync & Reminder Quick Action */}
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={handleGenerateIcalSync}
            className="flex items-center gap-2 text-xs font-semibold"
          >
            <Share2 size={14} /> iCal / Google Calendar Sync
          </Button>
          <Button variant="primary" className="flex items-center gap-2 text-xs font-bold">
            <Bell size={14} /> Trigger SLA Reminders
          </Button>
        </div>
      </div>

      {syncNotice && (
        <div className="p-3 rounded-lg bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 size={16} /> {syncNotice}
        </div>
      )}

      {/* KPI Cards Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex items-center justify-between">
          <div>
            <span className="text-xs text-text-tertiary">Active Deadlines</span>
            <h3 className="text-2xl font-extrabold text-text-primary mt-1">{deadlines.length}</h3>
          </div>
          <CalendarIcon className="text-gold-500" size={24} />
        </div>

        <div className="p-4 rounded-xl bg-surface-base border border-rose-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs text-rose-400 font-semibold">Overdue Projects</span>
            <h3 className="text-2xl font-extrabold text-rose-400 mt-1">{overdueCount}</h3>
          </div>
          <AlertTriangle className="text-rose-400" size={24} />
        </div>

        <div className="p-4 rounded-xl bg-surface-base border border-amber-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs text-amber-400 font-semibold">Urgent Priority Tasks</span>
            <h3 className="text-2xl font-extrabold text-amber-400 mt-1">{urgentCount}</h3>
          </div>
          <Zap className="text-amber-400" size={24} />
        </div>

        <div className="p-4 rounded-xl bg-surface-base border border-emerald-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs text-emerald-400 font-semibold">SLA Health Score</span>
            <h3 className="text-2xl font-extrabold text-emerald-400 mt-1">94.8%</h3>
          </div>
          <ShieldAlert className="text-emerald-400" size={24} />
        </div>
      </div>

      {/* Priority Filter */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-text-tertiary" />
          <span className="text-xs text-text-secondary font-medium">Priority Level:</span>
          {['all', 'urgent', 'high', 'medium', 'low'].map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPriority(p)}
              className={`px-3 py-1 rounded-md text-xs font-semibold capitalize transition-all ${
                selectedPriority === p
                  ? 'bg-gold-500/20 text-gold-500 border border-gold-500/30'
                  : 'bg-surface-base text-text-secondary hover:text-text-primary'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Deadlines Table */}
      <div className="overflow-x-auto border border-border-subtle rounded-xl bg-surface-base">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-subtle text-xs text-text-tertiary uppercase tracking-wider bg-surface-elevated/50">
              <th className="py-3 px-4">Project & Task</th>
              <th className="py-3 px-4">Assignee & Role</th>
              <th className="py-3 px-4">Due Date</th>
              <th className="py-3 px-4">SLA Countdown</th>
              <th className="py-3 px-4">Priority Level</th>
              <th className="py-3 px-4">Reminders / Escalation</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle text-sm">
            {filteredDeadlines.map((d) => {
              const priorityMeta = PRIORITY_BADGES[d.priorityLevel] || {
                label: d.priorityLevel,
                color: 'bg-surface-base text-text-primary border-border-subtle',
              };

              const isOverdue = d.status === 'overdue' || d.slaHoursRemaining < 0;

              return (
                <tr
                  key={d.id}
                  className={`hover:bg-surface-elevated/30 transition-colors ${
                    isOverdue ? 'bg-rose-500/5' : ''
                  }`}
                >
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-text-primary">{d.projectName}</span>
                      <span className="text-xs text-gold-500">{d.taskName}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-xs text-text-secondary">
                    <div className="flex items-center gap-1.5">
                      <UserCheck size={14} className="text-text-tertiary" />
                      <span>{d.assigneeName}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-xs font-semibold text-text-primary whitespace-nowrap">
                    {d.dueDate}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {isOverdue ? (
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse">
                        Overdue by {Math.abs(d.slaHoursRemaining)} hrs
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-emerald-400">
                        {d.slaHoursRemaining} hours left
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-md text-xs font-bold border ${priorityMeta.color}`}
                    >
                      {priorityMeta.label}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-xs">
                    <div className="flex flex-col">
                      <span className="text-text-tertiary">
                        {d.reminderSentCount} reminders sent
                      </span>
                      {d.isEscalated ? (
                        <span className="text-xs font-bold text-rose-400 flex items-center gap-1 mt-0.5">
                          <ShieldAlert size={12} /> Auto Escalated to Admin
                        </span>
                      ) : (
                        <span className="text-xs text-text-secondary">Standard Monitoring</span>
                      )}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    {!d.isEscalated ? (
                      <Button
                        variant="danger"
                        onClick={() => handleTriggerEscalation(d.id!)}
                        className="text-xs py-1 px-2.5 h-auto font-semibold"
                      >
                        Escalate
                      </Button>
                    ) : (
                      <span className="text-xs text-text-tertiary italic">Escalated</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
