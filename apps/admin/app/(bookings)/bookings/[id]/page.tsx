'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import {
  CheckCircle2,
  ShieldCheck,
  DollarSign,
  Calendar,
  FileText,
  User,
  Camera,
} from 'lucide-react';
import Link from 'next/link';

export default function BookingDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className="p-8 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Header Bar */}
      <div className="flex justify-between items-center">
        <Link href="/bookings" className="text-xs text-gold-500 font-semibold hover:underline">
          ← Back to Booking Engine
        </Link>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            Download Signed Contract
          </Button>
          <Button variant="primary" size="sm">
            Open Production Project Hub →
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Card */}
        <Card variant="glass" className="p-6 flex flex-col gap-6">
          <div className="flex items-center gap-4 pb-6 border-b border-border-subtle">
            <div className="rounded-full bg-gold-500/10 p-3 text-gold-500 border border-gold-500/20">
              <Calendar size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-text-primary">Eleanor Vance & Julian</h1>
              <Badge variant="success" className="mt-1">
                Confirmed Booking
              </Badge>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-sm text-text-secondary">
            <div className="flex items-center gap-3">
              <Camera size={16} className="text-gold-500" />
              <span>Royal Heirloom Collection</span>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign size={16} className="text-gold-500" />
              <span>Total Investment: $8,500 ($2,500 Deposit Paid)</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck size={16} className="text-gold-500" />
              <span>Contract Status: Signed via Legal e-Sign</span>
            </div>
          </div>
        </Card>

        {/* Project Auto-Initialization Card */}
        <Card variant="glass" className="lg:col-span-2 p-6 flex flex-col gap-6">
          <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
            <h3 className="text-lg font-bold text-text-primary">
              Auto-Initialized Production Project
            </h3>
            <Badge variant="gold">Project ID: prj-101</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-surface-base border border-border-subtle flex flex-col gap-1">
              <span className="text-xs text-text-tertiary">Proofing Limit</span>
              <span className="text-base font-bold text-text-primary">75 Selected Photos</span>
            </div>
            <div className="p-4 rounded-lg bg-surface-base border border-border-subtle flex flex-col gap-1">
              <span className="text-xs text-text-tertiary">Direct Storage Bucket</span>
              <span className="text-base font-bold text-gold-500">Cloudflare R2 Direct</span>
            </div>
            <div className="p-4 rounded-lg bg-surface-base border border-border-subtle flex flex-col gap-1">
              <span className="text-xs text-text-tertiary">Client Portal Link</span>
              <span className="text-base font-bold text-status-success">Active & Dispatch</span>
            </div>
          </div>

          <div className="pt-4 border-t border-border-subtle flex flex-col gap-2 text-xs text-text-secondary">
            <h4 className="font-bold text-text-primary uppercase tracking-wider mb-1">
              Assigned Studio Crew
            </h4>
            <div className="flex items-center justify-between p-3 rounded bg-surface-elevated">
              <span>Lead Photographer: Arthur Pendelton (Master Shooter)</span>
              <Badge variant="gold">Assigned</Badge>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
