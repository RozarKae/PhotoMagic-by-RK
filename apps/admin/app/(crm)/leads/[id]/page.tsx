'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input, Select, Tabs } from '@photomagic/ui';
import {
  User,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  CheckCircle2,
  Clock,
  MessageSquare,
  Tag,
} from 'lucide-react';
import Link from 'next/link';

export default function LeadDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('activity');
  const [newNote, setNewNote] = useState('');
  const [notesList, setNotesList] = useState([
    {
      id: '1',
      author: 'Studio Director',
      text: 'Client requested initial price quote for 10 hour coverage in Udaipur.',
      date: '2026-07-29 10:30',
    },
  ]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setNotesList([
      ...notesList,
      {
        id: Date.now().toString(),
        author: 'Studio Director',
        text: newNote,
        date: new Date().toLocaleString(),
      },
    ]);
    setNewNote('');
  };

  return (
    <main className="p-8 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Back Link & Header */}
      <div className="flex justify-between items-center">
        <Link href="/leads" className="text-xs text-gold-500 font-semibold hover:underline">
          ← Back to Lead Pipeline
        </Link>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            Create Quotation
          </Button>
          <Button variant="primary" size="sm">
            Convert to Booking
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Card: Client & Event Profile */}
        <Card variant="glass" className="p-6 flex flex-col gap-6">
          <div className="flex items-center gap-4 pb-6 border-b border-border-subtle">
            <div className="rounded-full bg-gold-500/10 p-3 text-gold-500 border border-gold-500/20">
              <User size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-text-primary">Eleanor Vance & Julian</h1>
              <Badge variant="gold" className="mt-1">
                New Inquiry
              </Badge>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-sm text-text-secondary">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-gold-500" />
              <span>eleanor@example.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-gold-500" />
              <span>+1 (555) 019-2834</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={16} className="text-gold-500" />
              <span>Event Date: Oct 24, 2026</span>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign size={16} className="text-gold-500" />
              <span>Estimated Budget: $12,500</span>
            </div>
          </div>

          <div className="pt-4 border-t border-border-subtle">
            <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-2">
              Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="gold">Royal Wedding</Badge>
              <Badge variant="info">VIP Client</Badge>
              <Badge variant="warning">Destination</Badge>
            </div>
          </div>
        </Card>

        {/* Right Section: Timeline, Notes, & Tasks */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Tabs
            tabs={[
              { id: 'activity', label: 'Activity & Audit Log' },
              { id: 'notes', label: 'Internal Notes', count: notesList.length },
              { id: 'tasks', label: 'Follow-Up Tasks', count: 2 },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          {activeTab === 'notes' && (
            <Card variant="glass" className="p-6 flex flex-col gap-6">
              <form onSubmit={handleAddNote} className="flex flex-col gap-3">
                <textarea
                  rows={3}
                  placeholder="Add internal note regarding consultation or custom requirements..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="w-full rounded-md bg-surface-base p-3 text-sm text-text-primary placeholder:text-text-tertiary border border-border-subtle focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
                <div className="flex justify-end">
                  <Button variant="primary" size="sm" type="submit">
                    Post Note
                  </Button>
                </div>
              </form>

              <div className="flex flex-col gap-4 divide-y divide-border-subtle">
                {notesList.map((note) => (
                  <div key={note.id} className="pt-4 first:pt-0">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-semibold text-gold-500">{note.author}</span>
                      <span className="text-text-tertiary">{note.date}</span>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">{note.text}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === 'activity' && (
            <Card variant="glass" className="p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-xs text-text-secondary pb-3 border-b border-border-subtle">
                <Clock size={16} className="text-gold-500" />
                <span>2026-07-29 10:00 AM — Lead created from Website Priority Inquiry Form</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-text-secondary pb-3 border-b border-border-subtle">
                <Mail size={16} className="text-gold-500" />
                <span>2026-07-29 10:05 AM — Automated consultation welcome email dispatched</span>
              </div>
            </Card>
          )}

          {activeTab === 'tasks' && (
            <Card variant="glass" className="p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-surface-base border border-border-subtle">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-gold-500" />
                  <span className="text-sm text-text-primary">
                    Schedule phone consultation call with client
                  </span>
                </div>
                <Badge variant="warning">Due Tomorrow</Badge>
              </div>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
}
