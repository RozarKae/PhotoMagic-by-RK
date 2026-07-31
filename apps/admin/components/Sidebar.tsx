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
      className={`relative h-screen bg-surface-elevated border-r border-border-subtle flex flex-col justify-between transition-all duration-300 z-40 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="p-4 flex items-center justify-between border-b border-border-subtle">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="rounded-full bg-gold-500/10 p-2.5 text-gold-500 border border-gold-500/20 flex-shrink-0">
            <Camera size={22} />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-text-primary text-sm tracking-tight">PHOTOMAGIC</span>
              <span className="text-[10px] text-gold-500 uppercase tracking-widest font-semibold">
                Studio OS
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface-base transition-colors"
          aria-label="Toggle Sidebar"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-6 flex flex-col gap-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gold-500/15 text-gold-500 border border-gold-500/30'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-base'
              }`}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer Profile Shortcut */}
      <div className="p-4 border-t border-border-subtle flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-500 flex items-center justify-center font-bold text-xs flex-shrink-0">
          RK
        </div>
        {!isCollapsed && (
          <div className="flex flex-col truncate">
            <span className="text-xs font-bold text-text-primary truncate">RK Studio Owner</span>
            <span className="text-[10px] text-text-tertiary truncate">Super Admin</span>
          </div>
        )}
      </div>
    </aside>
  );
};
