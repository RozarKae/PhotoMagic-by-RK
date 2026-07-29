'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import {
  Camera,
  DollarSign,
  Calendar,
  AlertCircle,
  LayoutDashboard,
  Users,
  Image as ImageIcon,
  BookOpen,
  Settings,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <main className="p-8 max-w-7xl mx-auto flex flex-col gap-8 pb-24 text-text-primary">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border-subtle pb-6">
        <div>
          <Badge variant="gold">Obsidian Dark Command Center</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">
            PhotoMagic Studio Dashboard
          </h1>
          <p className="text-sm text-text-secondary">
            Enterprise Management Hub for Royal Photography & Fine Art Cinema Studio.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/book">
            <Button variant="primary" size="sm">
              New Inquiry
            </Button>
          </Link>
        </div>
      </div>

      {/* Overview Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="glass" className="p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase text-text-tertiary">
              Total Revenue
            </span>
            <div className="p-2 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
              <DollarSign size={18} />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-text-primary">$148,500</span>
          <span className="text-xs text-status-success font-semibold mt-1">+18.4% YoY Growth</span>
        </Card>

        <Card variant="glass" className="p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase text-text-tertiary">
              Active Bookings
            </span>
            <div className="p-2 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
              <Calendar size={18} />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-text-primary">24 Events</span>
          <span className="text-xs text-text-tertiary mt-1">Confirmed for Q3/Q4</span>
        </Card>

        <Card variant="glass" className="p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase text-text-tertiary">
              Pending Payments
            </span>
            <div className="p-2 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
              <AlertCircle size={18} />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-text-primary">$12,800</span>
          <span className="text-xs text-status-warning font-semibold mt-1">
            4 Outstanding Retainers
          </span>
        </Card>

        <Card variant="glass" className="p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase text-text-tertiary">
              Upcoming Shoots
            </span>
            <div className="p-2 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
              <Camera size={18} />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-text-primary">8 Shoots</span>
          <span className="text-xs text-text-tertiary mt-1">Next 14 Days</span>
        </Card>
      </div>

      {/* Module Shortcuts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="glass" className="p-6 flex flex-col gap-3">
          <div className="flex items-center gap-3 text-gold-500 font-bold">
            <Users size={20} />
            <span>CRM & Client Directory</span>
          </div>
          <p className="text-xs text-text-secondary">
            Manage VIP clients, family event participants, custom tags, and communication history.
          </p>
        </Card>

        <Card variant="glass" className="p-6 flex flex-col gap-3">
          <div className="flex items-center gap-3 text-gold-500 font-bold">
            <BookOpen size={20} />
            <span>15-Step Production Engine</span>
          </div>
          <p className="text-xs text-text-secondary">
            Track project lifecycles from lead consultation through 4K cinema editing and album
            printing.
          </p>
        </Card>

        <Card variant="glass" className="p-6 flex flex-col gap-3">
          <div className="flex items-center gap-3 text-gold-500 font-bold">
            <Camera size={20} />
            <span>Equipment & Gear Vault</span>
          </div>
          <p className="text-xs text-text-secondary">
            QR code gear check-in/out dispatcher and hardware preventive maintenance tracking.
          </p>
        </Card>
      </div>
    </main>
  );
}
