'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Camera,
  LayoutDashboard,
  Users,
  Calendar,
  Image as ImageIcon,
  BookOpen,
  DollarSign,
  Settings,
  Sparkles,
  Radio,
  ShieldCheck,
  Server,
  Bot,
  Wand2,
  SlidersHorizontal,
  BookMarked,
  CheckCircle2,
  TrendingUp,
  Megaphone,
  BarChart2,
  GitBranch,
  Building2,
  Globe,
  Sliders,
  ScanFace,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: 'Command Center', href: '/admin', icon: LayoutDashboard },
    { label: 'Studio Intelligence', href: '/studio-intelligence', icon: BarChart2 },
    { label: 'Business Growth Hub', href: '/business-growth', icon: TrendingUp },
    { label: 'Album Studio', href: '/album-studio', icon: BookOpen },
    { label: 'Delivery Center', href: '/delivery-center', icon: ImageIcon },
    { label: 'Studio Workflow', href: '/studio-workflow', icon: GitBranch },
    { label: 'AI Face Enhancer', href: '/ai-face-enhancement', icon: ScanFace },
    { label: 'AI Editing Engine', href: '/ai-editing-foundation', icon: Sliders },
    { label: 'AI Post-Production Studio', href: '/ai-editing-studio', icon: Wand2 },
    { label: 'SaaS Platform Engine', href: '/platform', icon: Globe },
    { label: 'Enterprise & Branches', href: '/enterprise', icon: Building2 },
    { label: 'Studio Automation', href: '/automation', icon: GitBranch },
    { label: 'Business Intelligence', href: '/analytics', icon: BarChart2 },
    { label: 'AI Marketing Studio', href: '/ai-marketing', icon: Megaphone },
    { label: 'AI Client Proofing', href: '/ai-proofing', icon: CheckCircle2 },
    { label: 'AI Album Designer', href: '/ai-album-designer', icon: BookMarked },
    { label: 'AI Photo Editor', href: '/ai-editor', icon: SlidersHorizontal },
    { label: 'AI Photo Generator', href: '/ai-generator', icon: Wand2 },
    { label: 'AI Studio Hub', href: '/ai-studio', icon: Bot },
    { label: 'DevOps & Deploy', href: '/devops', icon: Server },
    { label: 'AI Assistant', href: '/ai-assistant', icon: Sparkles },
    { label: 'Integrations Hub', href: '/integrations', icon: Radio },
    { label: 'Security & RBAC', href: '/security', icon: ShieldCheck },
    { label: 'CRM & Leads', href: '/leads', icon: Users },
    { label: 'Bookings & Projects', href: '/projects', icon: Calendar },
    { label: 'Galleries & Media', href: '/galleries', icon: ImageIcon },
    { label: 'Album Production', href: '/albums', icon: BookOpen },
    { label: 'Financials & Invoices', href: '/financials', icon: DollarSign },
    { label: 'Studio Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside
      className={`relative h-screen bg-canvas border-r border-gold-500/20 flex flex-col justify-between transition-all duration-300 z-40 selection:bg-gold-500 selection:text-canvas ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Hallmark Header */}
      <div className="p-4 flex items-center justify-between border-b border-gold-500/20">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="rounded-full bg-gold-500/10 p-2 text-gold-500 border border-gold-500/30 flex-shrink-0">
            <Camera size={20} />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-hero font-bold text-ivory text-sm tracking-wider">
                PHOTOMAGIC
              </span>
              <span className="font-nav text-[9px] text-gold-500 uppercase tracking-widest font-semibold">
                Executive Studio OS
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg text-silver hover:text-ivory hover:bg-surface-elevated transition-colors"
          aria-label="Toggle Sidebar"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation Items List */}
      <nav className="flex-1 px-3 py-6 flex flex-col gap-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-nav text-[11px] uppercase tracking-widest font-semibold transition-all ${
                isActive
                  ? 'bg-gold-500/15 text-gold-400 border border-gold-500/40 shadow-watch'
                  : 'text-silver hover:text-ivory hover:bg-surface-elevated/60'
              }`}
            >
              <Icon
                size={18}
                className={`flex-shrink-0 ${isActive ? 'text-gold-500' : 'text-silver'}`}
              />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer Profile Hallmark */}
      <div className="p-4 border-t border-gold-500/20 flex items-center gap-3 bg-surface-base/50">
        <div className="w-9 h-9 rounded-full bg-gold-500/15 border border-gold-500/40 text-gold-400 flex items-center justify-center font-bold text-xs flex-shrink-0 font-mono">
          RK
        </div>
        {!isCollapsed && (
          <div className="flex flex-col truncate">
            <span className="text-xs font-bold text-ivory truncate">RK Studio Owner</span>
            <span className="font-mono text-[9px] text-gold-500 uppercase tracking-wider truncate">
              Master Admin
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};
