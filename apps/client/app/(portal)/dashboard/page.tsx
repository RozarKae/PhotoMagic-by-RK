'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { ClientProjectTracker } from '../../../components/ClientProjectTracker';
import { Calendar, Camera, FileText, CreditCard, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ClientDashboardPage() {
  const steps = [
    { id: '1', label: 'Booking Confirmed', status: 'completed' as const },
    { id: '2', label: 'Pre-Shoot Planning', status: 'active' as const },
    { id: '3', label: 'Event Shoot', status: 'upcoming' as const },
    { id: '4', label: 'Proofing Active', status: 'upcoming' as const },
    { id: '5', label: 'Album Approval', status: 'upcoming' as const },
    { id: '6', label: 'High-Res Delivered', status: 'upcoming' as const },
  ];

  return (
    <main className="p-8 max-w-7xl mx-auto flex flex-col gap-8 pb-24">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface-glass p-8 rounded-2xl border border-border-subtle backdrop-blur-2xl">
        <div>
          <Badge variant="gold">Private Client Portal</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">Welcome, Eleanor Vance</h1>
          <p className="text-sm text-text-secondary">Royal Palace Wedding — Udaipur, Rajasthan</p>
        </div>

        <div className="flex items-center gap-4 bg-surface-elevated px-4 py-3 rounded-xl border border-border-subtle">
          <Calendar size={20} className="text-gold-500" />
          <div className="flex flex-col">
            <span className="text-[10px] text-text-tertiary uppercase tracking-wider font-semibold">
              Event Countdown
            </span>
            <span className="text-sm font-bold text-gold-500">87 Days Remaining</span>
          </div>
        </div>
      </div>

      {/* Project Progress Tracker */}
      <Card variant="glass" className="p-6">
        <h3 className="text-lg font-bold text-text-primary mb-2">Production Milestone Progress</h3>
        <ClientProjectTracker steps={steps} />
      </Card>

      {/* Quick Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="glass" className="p-6 flex flex-col justify-between">
          <div>
            <div className="rounded-full bg-gold-500/10 w-10 h-10 flex items-center justify-center text-gold-500 mb-4 border border-gold-500/20">
              <Camera size={20} />
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-1">Proofing Gallery</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Access your digital proofing collection to heart favorite selections for your album.
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="mt-4 w-full flex items-center justify-between"
          >
            <span>Enter Proofing Engine</span>
            <ArrowRight size={14} />
          </Button>
        </Card>

        <Card variant="glass" className="p-6 flex flex-col justify-between">
          <div>
            <div className="rounded-full bg-gold-500/10 w-10 h-10 flex items-center justify-center text-gold-500 mb-4 border border-gold-500/20">
              <Sparkles size={20} />
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-1">Album Approval Hub</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Review 3D flush-mount album layout spreads and pin spatial revision notes.
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="mt-4 w-full flex items-center justify-between"
          >
            <span>Review Album Spreads</span>
            <ArrowRight size={14} />
          </Button>
        </Card>

        <Card variant="glass" className="p-6 flex flex-col justify-between">
          <div>
            <div className="rounded-full bg-gold-500/10 w-10 h-10 flex items-center justify-center text-gold-500 mb-4 border border-gold-500/20">
              <CreditCard size={20} />
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-1">Billing & Invoices</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              View upcoming balance payments and download official tax receipts.
            </p>
          </div>
          <Link href="/invoices">
            <Button
              variant="secondary"
              size="sm"
              className="mt-4 w-full flex items-center justify-between"
            >
              <span>View Billing Hub</span>
              <ArrowRight size={14} />
            </Button>
          </Link>
        </Card>
      </div>
    </main>
  );
}
