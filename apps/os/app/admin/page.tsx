'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  LayoutDashboard,
  Users,
  Calendar,
  DollarSign,
  BookOpen,
  Send,
  Bot,
  GitBranch,
  BarChart2,
  Settings,
  Radio,
  Server,
  Sparkles,
  Search,
  Bell,
  Plus,
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
  Camera,
  Download,
  Lock,
  Zap,
  Film,
  Clapperboard,
} from 'lucide-react';
import { Card, Badge, Button, Input } from '@photomagic/ui';
import { Sidebar } from '../../components/Sidebar';
import { DashboardHeader } from '../../components/DashboardHeader';
import { StudioFinalExecutiveDashboard } from '../../components/studio-intelligence/StudioFinalExecutiveDashboard';
import { LeadKanbanBoard } from '../../components/LeadKanbanBoard';
import { ProjectKanbanBoard } from '../../components/ProjectKanbanBoard';
import { InvoiceListTable } from '../../components/InvoiceListTable';

export default function ExecutiveAdminOSPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'financials' | 'system'>(
    'overview',
  );

  return (
    <div className="flex min-h-screen bg-[#090909] text-[#F5F3EF] selection:bg-gold-500 selection:text-black film-grain">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Executive Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header Bar */}
        <DashboardHeader onToggleNotifications={() => {}} />

        {/* Executive Admin Body */}
        <main className="p-8 max-w-[1600px] w-full mx-auto flex flex-col gap-8 pb-24">
          {/* Executive Header Banner */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="gold">FILM STUDIO EXECUTIVE COMMAND</Badge>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Studio 100% Operational
                </span>
              </div>
              <h1 className="font-hero text-3xl font-bold text-ivory mt-2 tracking-wide flex items-center gap-3">
                <Clapperboard className="text-gold-400" size={28} />
                <span>Executive Studio Admin</span>
              </h1>
              <p className="text-xs text-silver/80 font-mono mt-1">
                Film Studio Headquarters • Productions Pipeline, Cast & Crew Roster, Vault Security
                & AI Director Engine
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/portal">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <span>Private Screening Room</span>
                  <ArrowUpRight size={14} />
                </Button>
              </Link>

              <Button variant="primary" size="sm" className="flex items-center gap-2 font-bold">
                <Plus size={16} />
                <span>New Production Commission</span>
              </Button>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Card
              variant="glass"
              className="p-5 flex flex-col justify-between shadow-museum film-case"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-silver uppercase tracking-widest">
                  Total Studio Revenue
                </span>
                <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400 border border-gold-500/20">
                  <DollarSign size={18} />
                </div>
              </div>
              <div className="mt-3">
                <span className="font-mono text-2xl font-bold text-ivory">₹48.50 Lakhs</span>
                <div className="flex items-center gap-1 text-xs text-emerald-400 font-mono mt-1">
                  <TrendingUp size={13} />
                  <span>+18.4% Q3 Growth</span>
                </div>
              </div>
            </Card>

            <Card
              variant="glass"
              className="p-5 flex flex-col justify-between shadow-museum film-case"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-silver uppercase tracking-widest">
                  Active Productions
                </span>
                <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400 border border-gold-500/20">
                  <Film size={18} />
                </div>
              </div>
              <div className="mt-3">
                <span className="font-mono text-2xl font-bold text-ivory">28 Feature Films</span>
                <span className="text-xs text-silver block mt-1 font-mono">
                  In production across 4 states
                </span>
              </div>
            </Card>

            <Card
              variant="glass"
              className="p-5 flex flex-col justify-between shadow-museum film-case"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-silver uppercase tracking-widest">
                  Pending Receivables
                </span>
                <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400 border border-gold-500/20">
                  <AlertCircle size={18} />
                </div>
              </div>
              <div className="mt-3">
                <span className="font-mono text-2xl font-bold text-gold-400">₹6.50 Lakhs</span>
                <span className="text-xs text-silver block mt-1 font-mono">
                  4 Pending Ledger Manifests
                </span>
              </div>
            </Card>

            <Card
              variant="glass"
              className="p-5 flex flex-col justify-between shadow-museum film-case"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-silver uppercase tracking-widest">
                  AI Director Engine
                </span>
                <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400 border border-gold-500/20">
                  <Sparkles size={18} />
                </div>
              </div>
              <div className="mt-3">
                <span className="font-mono text-2xl font-bold text-ivory">99.4%</span>
                <span className="text-xs text-emerald-400 block mt-1 font-mono">
                  35mm Smart Culling Active
                </span>
              </div>
            </Card>
          </div>

          {/* Navigation Control Tabs */}
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            {[
              { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard },
              { id: 'projects', label: 'Productions & Pipeline', icon: GitBranch },
              { id: 'financials', label: 'Production Ledger', icon: DollarSign },
              { id: 'system', label: 'Vault & System Security', icon: Server },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-nav font-semibold tracking-wider transition-all ${
                    isActive
                      ? 'bg-[#1D1D1D] text-gold-400 border border-gold-500/50 shadow-kodakGlow'
                      : 'text-silver hover:text-ivory hover:bg-[#141414]'
                  }`}
                >
                  <Icon size={15} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: Executive Overview */}
          {activeTab === 'overview' && (
            <div className="flex flex-col gap-8">
              <StudioFinalExecutiveDashboard />
            </div>
          )}

          {/* Tab 2: Productions & Pipeline */}
          {activeTab === 'projects' && (
            <div className="flex flex-col gap-6">
              <h3 className="font-heading text-xl font-bold text-ivory">
                Active Productions Pipeline
              </h3>
              <ProjectKanbanBoard
                projects={[
                  {
                    id: 'p1',
                    title: 'Arifa & Rozar Nikkah Production',
                    clientName: 'Arifa Bivi (Lead Cast)',
                    packageName: 'Master Feature Film',
                    eventDate: '30 Aug 2026',
                    paymentStatus: 'advance_paid',
                    status: 'shoot_completed',
                  },
                  {
                    id: 'p2',
                    title: 'Sterling Gala Feature',
                    clientName: 'Lady Sarah Sterling',
                    packageName: 'Feature Film Production',
                    eventDate: '15 Sep 2026',
                    paymentStatus: 'paid',
                    status: 'planning',
                  },
                  {
                    id: 'p3',
                    title: 'Montgomery Royal Production',
                    clientName: 'Julian Montgomery',
                    packageName: 'Master Blockbuster Collection',
                    eventDate: '04 Oct 2026',
                    paymentStatus: 'pending',
                    status: 'quotation_sent',
                  },
                ]}
                onStatusChange={() => {}}
              />
            </div>
          )}

          {/* Tab 3: Production Ledger */}
          {activeTab === 'financials' && (
            <div className="flex flex-col gap-6">
              <h3 className="font-heading text-xl font-bold text-ivory">
                Production Ledger & Invoices
              </h3>
              <InvoiceListTable
                invoices={[
                  {
                    id: 'inv-101',
                    invoiceNumber: 'INV-2026-001',
                    clientName: 'Arifa Bivi',
                    projectName: 'Arifa & Rozar Nikkah Production',
                    subtotal: 400000,
                    taxAmount: 50000,
                    totalAmount: 450000,
                    paidAmount: 450000,
                    dueDate: '30 Aug 2026',
                    status: 'paid',
                  },
                  {
                    id: 'inv-102',
                    invoiceNumber: 'INV-2026-002',
                    clientName: 'Lady Sarah Sterling',
                    projectName: 'Sterling Gala Feature',
                    subtotal: 520000,
                    taxAmount: 80000,
                    totalAmount: 600000,
                    paidAmount: 600000,
                    dueDate: '15 Sep 2026',
                    status: 'paid',
                  },
                  {
                    id: 'inv-103',
                    invoiceNumber: 'INV-2026-003',
                    clientName: 'Julian Montgomery',
                    projectName: 'Montgomery Royal Production',
                    subtotal: 300000,
                    taxAmount: 50000,
                    totalAmount: 350000,
                    paidAmount: 0,
                    dueDate: '10 Oct 2026',
                    status: 'unpaid',
                  },
                ]}
              />
            </div>
          )}

          {/* Tab 4: Vault & System Security */}
          {activeTab === 'system' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card variant="glass" className="p-6 flex flex-col gap-4 film-case">
                <div className="flex items-center gap-3">
                  <Lock className="text-gold-400" size={22} />
                  <h4 className="font-heading text-lg font-bold text-ivory">
                    PostgreSQL Vault Row Level Security
                  </h4>
                </div>
                <p className="text-xs text-silver font-light">
                  Enforcing strict multi-tenant isolation filtered by `workspace_id` across all
                  database models.
                </p>
                <Badge variant="success" className="w-fit">
                  100% Vault Protected
                </Badge>
              </Card>

              <Card variant="glass" className="p-6 flex flex-col gap-4 film-case">
                <div className="flex items-center gap-3">
                  <Zap className="text-gold-400" size={22} />
                  <h4 className="font-heading text-lg font-bold text-ivory">
                    Cloudflare R2 8K Media Vault
                  </h4>
                </div>
                <p className="text-xs text-silver font-light">
                  Expiring S3 presigned asset URLs for high-resolution 8K media delivery.
                </p>
                <Badge variant="gold" className="w-fit">
                  Presigned Vault Active
                </Badge>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
