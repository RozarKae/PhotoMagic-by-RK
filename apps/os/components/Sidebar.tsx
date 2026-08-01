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
  Send,
  HardDrive,
  LucideIcon,
} from 'lucide-react';

interface NavGroup {
  groupName: string;
  items: { label: string; href: string; icon: LucideIcon }[];
}

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const navGroups: NavGroup[] = [
    {
      groupName: 'Workspace',
      items: [
        { label: 'Command HUD', href: '/dashboard', icon: LayoutDashboard },
        { label: 'Executive Admin', href: '/admin', icon: ShieldCheck },
      ],
    },
    {
      groupName: 'Clients & CRM',
      items: [
        { label: 'Clients & Leads', href: '/clients', icon: Users },
        { label: 'Projects & Pipeline', href: '/projects', icon: Calendar },
        { label: 'Bookings & Schedule', href: '/bookings', icon: Calendar },
        { label: 'Financials & Invoices', href: '/financials', icon: DollarSign },
      ],
    },
    {
      groupName: 'Media & Deliverables',
      items: [
        { label: 'Gallery Management', href: '/gallery', icon: ImageIcon },
        { label: 'Album Studio', href: '/albums', icon: BookOpen },
        { label: 'Smart Delivery Center', href: '/delivery', icon: Send },
      ],
    },
    {
      groupName: 'AI Studio Suite',
      items: [
        { label: 'AI Command Hub', href: '/ai', icon: Bot },
        { label: 'AI Album Designer', href: '/ai-album-designer', icon: BookMarked },
        { label: 'AI Editing Engine', href: '/ai-editing-studio', icon: Wand2 },
        { label: 'AI Face Enhancement', href: '/ai-face-enhancement', icon: ScanFace },
      ],
    },
    {
      groupName: 'Production & Workflow',
      items: [
        { label: 'Studio Workflow', href: '/studio-workflow', icon: GitBranch },
        { label: 'Workflow Automation', href: '/automation', icon: GitBranch },
        { label: 'Equipment & Gear', href: '/equipment', icon: HardDrive },
      ],
    },
    {
      groupName: 'Business Intelligence',
      items: [
        { label: 'Analytics & Reports', href: '/analytics', icon: BarChart2 },
        { label: 'Studio Intelligence', href: '/studio-intelligence', icon: BarChart2 },
        { label: 'Business Growth', href: '/business-growth', icon: TrendingUp },
      ],
    },
    {
      groupName: 'System & Security',
      items: [
        { label: 'Studio Settings', href: '/settings', icon: Settings },
        { label: 'Integrations Hub', href: '/integrations', icon: Radio },
        { label: 'Security & Access Control', href: '/security', icon: ShieldCheck },
        { label: 'DevOps & Deploy', href: '/devops', icon: Server },
      ],
    },
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
                Studio OS Headquarters
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

      {/* Grouped Navigation Items List */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-5 overflow-y-auto">
        {navGroups.map((group, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            {!isCollapsed && (
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold-500/70 px-3 py-1 font-semibold">
                {group.groupName}
              </span>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== '/dashboard' &&
                  item.href !== '/admin' &&
                  pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl font-nav text-[11px] uppercase tracking-wider font-semibold transition-all ${
                    isActive
                      ? 'bg-gold-500/15 text-gold-400 border border-gold-500/40 shadow-watch'
                      : 'text-silver hover:text-ivory hover:bg-surface-elevated/60'
                  }`}
                >
                  <Icon
                    size={16}
                    className={`flex-shrink-0 ${isActive ? 'text-gold-500' : 'text-silver'}`}
                  />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer Profile Hallmark */}
      <div className="p-4 border-t border-gold-500/20 flex items-center gap-3 bg-surface-base/50">
        <div className="w-9 h-9 rounded-full bg-gold-500/15 border border-gold-500/40 text-gold-400 flex items-center justify-center font-bold text-xs flex-shrink-0 font-mono">
          RK
        </div>
        {!isCollapsed && (
          <div className="flex flex-col truncate">
            <span className="text-xs font-bold text-ivory truncate">RK Studio Headquarters</span>
            <span className="font-mono text-[9px] text-gold-500 uppercase tracking-wider truncate">
              Master Admin OS
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};
