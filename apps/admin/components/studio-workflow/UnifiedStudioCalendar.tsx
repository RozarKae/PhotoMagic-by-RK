'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Filter,
  Camera,
  Scissors,
  BookOpen,
  Printer,
  Truck,
  Sun,
  UserCheck,
  CheckCircle2,
  Clock,
  Plus,
} from 'lucide-react';
import { StudioCalendarEventV9 } from '@photomagic/config';

const MOCK_EVENTS: StudioCalendarEventV9[] = [
  {
    id: 'evt-1',
    eventTitle: 'Vikram & Ananya — Main Wedding Shoot',
    eventType: 'shoot',
    startTime: '2026-08-01T09:00:00Z',
    endTime: '2026-08-01T21:00:00Z',
    photographerName: 'Vikramaditya (Lead)',
    editorName: 'Priya Sharma',
    eventStatus: 'scheduled',
    location: 'City Palace, Udaipur',
    notes: '2x 4K Cinema Rigs, Drones, Lighting Crew assigned.',
  },
  {
    id: 'evt-2',
    eventTitle: 'Rahul & Priya — Pre-Wedding Teaser Edit',
    eventType: 'editing_schedule',
    startTime: '2026-08-02T10:00:00Z',
    endTime: '2026-08-02T18:00:00Z',
    photographerName: 'Rajesh Verma',
    editorName: 'Amitabh Sen',
    eventStatus: 'in_progress',
    location: 'Studio Edit Suite A',
    notes: 'AI Smart Culling & LUT Color Grading.',
  },
  {
    id: 'evt-3',
    eventTitle: 'Siddharth & Meera — 12x18 Album Proofing Deadline',
    eventType: 'album_deadline',
    startTime: '2026-08-03T12:00:00Z',
    endTime: '2026-08-03T17:00:00Z',
    photographerName: 'Vikramaditya',
    editorName: 'Neha Kapoor',
    eventStatus: 'scheduled',
    location: 'Client Portal Proofing',
    notes: 'Digital signature approval pending.',
  },
  {
    id: 'evt-4',
    eventTitle: 'Aditya & Riya — Print Lab Batch Dispatch',
    eventType: 'print_schedule',
    startTime: '2026-08-04T08:00:00Z',
    endTime: '2026-08-04T14:00:00Z',
    photographerName: 'N/A',
    editorName: 'Ramesh Kumar',
    eventStatus: 'scheduled',
    location: 'Jaipur Print Lab',
    notes: 'Gold foil stamping and velvet album sleeve.',
  },
  {
    id: 'evt-5',
    eventTitle: 'Karan & Natasha — Deliverables Courier Handover',
    eventType: 'delivery',
    startTime: '2026-08-05T11:00:00Z',
    endTime: '2026-08-05T13:00:00Z',
    photographerName: 'N/A',
    editorName: 'Suresh Patel',
    eventStatus: 'scheduled',
    location: 'BlueDart Express Pickup',
    notes: 'PIN protected USB presentation box.',
  },
  {
    id: 'evt-6',
    eventTitle: 'Independence Day Studio Holiday',
    eventType: 'holiday',
    startTime: '2026-08-15T00:00:00Z',
    endTime: '2026-08-15T23:59:59Z',
    photographerName: 'All Staff',
    editorName: 'All Staff',
    eventStatus: 'scheduled',
    location: 'All Branches',
    notes: 'Annual Studio Observance.',
  },
  {
    id: 'evt-7',
    eventTitle: 'Staff Roster & Lens Maintenance Check',
    eventType: 'staff_availability',
    startTime: '2026-08-06T14:00:00Z',
    endTime: '2026-08-06T18:00:00Z',
    photographerName: 'Vikramaditya',
    editorName: 'Priya Sharma',
    eventStatus: 'scheduled',
    location: 'Equipment Vault',
    notes: 'Sensor cleaning and gear inspection.',
  },
];

const EVENT_TYPE_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
  booking: {
    label: 'Booking',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    icon: CalendarIcon,
  },
  shoot: {
    label: 'Shoot',
    color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    icon: Camera,
  },
  editing_schedule: {
    label: 'Editing',
    color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    icon: Scissors,
  },
  album_deadline: {
    label: 'Album Deadline',
    color: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    icon: BookOpen,
  },
  print_schedule: {
    label: 'Print Schedule',
    color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    icon: Printer,
  },
  delivery: {
    label: 'Delivery',
    color: 'bg-gold-500/10 text-gold-400 border-gold-500/20',
    icon: Truck,
  },
  holiday: {
    label: 'Holiday',
    color: 'bg-slate-500/10 text-slate-300 border-slate-500/20',
    icon: Sun,
  },
  staff_availability: {
    label: 'Staff Roster',
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    icon: UserCheck,
  },
};

export const UnifiedStudioCalendar: React.FC = () => {
  const [events, setEvents] = useState<StudioCalendarEventV9[]>(MOCK_EVENTS);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedPhotographer, setSelectedPhotographer] = useState<string>('all');
  const [selectedEditor, setSelectedEditor] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredEvents = events.filter((e) => {
    if (selectedType !== 'all' && e.eventType !== selectedType) return false;
    if (selectedPhotographer !== 'all' && e.photographerName !== selectedPhotographer) return false;
    if (selectedEditor !== 'all' && e.editorName !== selectedEditor) return false;
    if (selectedStatus !== 'all' && e.eventStatus !== selectedStatus) return false;
    return true;
  });

  return (
    <Card
      variant="elevated"
      className="p-6 border border-border-subtle bg-surface-elevated flex flex-col gap-6"
    >
      {/* Title & Navigation Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <CalendarIcon size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-text-primary">
                Phase 9.8 — Unified Studio Calendar
              </h2>
              <Badge variant="gold">August 2026</Badge>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              Unified master schedule for Bookings, Shoots, Editing, Album Deadlines, Print, and
              Deliveries.
            </p>
          </div>
        </div>

        {/* Date Navigation & Add Event */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-surface-base rounded-lg border border-border-subtle p-1">
            <button className="p-1.5 rounded hover:bg-surface-elevated text-text-secondary hover:text-text-primary">
              <ChevronLeft size={16} />
            </button>
            <span className="px-3 text-xs font-bold text-text-primary">August 2026</span>
            <button className="p-1.5 rounded hover:bg-surface-elevated text-text-secondary hover:text-text-primary">
              <ChevronRight size={16} />
            </button>
          </div>

          <Button variant="primary" className="flex items-center gap-2 text-xs font-bold">
            <Plus size={16} /> Schedule Studio Event
          </Button>
        </div>
      </div>

      {/* Multi-Dimensional Filter Toolbar */}
      <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-wrap items-center justify-between gap-4">
        {/* Event Category Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={16} className="text-text-tertiary" />
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1 rounded-md text-xs font-semibold ${
              selectedType === 'all'
                ? 'bg-gold-500/20 text-gold-500 border border-gold-500/30'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            All Event Types
          </button>

          {Object.entries(EVENT_TYPE_CONFIG).map(([key, config]) => {
            const Icon = config.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedType(key)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${
                  selectedType === key
                    ? 'bg-gold-500/20 text-gold-500 border-gold-500/40'
                    : 'bg-surface-elevated text-text-secondary border-border-subtle hover:text-text-primary'
                }`}
              >
                <Icon size={12} /> {config.label}
              </button>
            );
          })}
        </div>

        {/* Dropdown Filters: Photographer, Editor, Status */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Photographer Filter */}
          <select
            value={selectedPhotographer}
            onChange={(e) => setSelectedPhotographer(e.target.value)}
            className="bg-surface-elevated text-text-primary text-xs px-2.5 py-1.5 rounded-lg border border-border-subtle focus:outline-none focus:border-gold-500"
          >
            <option value="all">Photographer: All</option>
            <option value="Vikramaditya (Lead)">Vikramaditya (Lead)</option>
            <option value="Rajesh Verma">Rajesh Verma</option>
            <option value="All Staff">All Staff</option>
          </select>

          {/* Editor Filter */}
          <select
            value={selectedEditor}
            onChange={(e) => setSelectedEditor(e.target.value)}
            className="bg-surface-elevated text-text-primary text-xs px-2.5 py-1.5 rounded-lg border border-border-subtle focus:outline-none focus:border-gold-500"
          >
            <option value="all">Editor: All</option>
            <option value="Priya Sharma">Priya Sharma</option>
            <option value="Amitabh Sen">Amitabh Sen</option>
            <option value="Neha Kapoor">Neha Kapoor</option>
            <option value="Ramesh Kumar">Ramesh Kumar</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-surface-elevated text-text-primary text-xs px-2.5 py-1.5 rounded-lg border border-border-subtle focus:outline-none focus:border-gold-500"
          >
            <option value="all">Status: All</option>
            <option value="scheduled">Scheduled</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="postponed">Postponed</option>
          </select>
        </div>
      </div>

      {/* Calendar Agenda Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((evt) => {
          const typeMeta = EVENT_TYPE_CONFIG[evt.eventType] || {
            label: evt.eventType,
            color: 'bg-surface-base text-text-primary border-border-subtle',
            icon: CalendarIcon,
          };
          const Icon = typeMeta.icon;

          return (
            <div
              key={evt.id}
              className="p-4 rounded-xl bg-surface-base border border-border-subtle hover:border-gold-500/40 transition-all flex flex-col justify-between gap-3 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${typeMeta.color}`}
                  >
                    <Icon size={14} /> {typeMeta.label}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {evt.eventStatus}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-text-primary group-hover:text-gold-400 transition-colors">
                  {evt.eventTitle}
                </h3>
                <p className="text-xs text-text-secondary mt-1">{evt.notes}</p>
              </div>

              <div className="border-t border-border-subtle pt-3 text-xs text-text-tertiary flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span>Location:</span>
                  <span className="text-text-primary font-medium">{evt.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Photographer:</span>
                  <span className="text-gold-500 font-medium">{evt.photographerName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Editor:</span>
                  <span className="text-purple-400 font-medium">{evt.editorName}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
