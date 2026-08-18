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

  // Read role from cookie
  const [userRole, setUserRole] = useState<string>('super_admin');

  React.useEffect(() => {
    const match = document.cookie.match(/photomagic_user_role=([^;]+)/);
    if (match) {
      setUserRole(match[1]);
    }
  }, []);

  const allNavGroups: NavGroup[] = [
    {
      groupName: 'Photography Studio Command',
      items: [
        { label: 'Studio Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { label: 'Executive OS Admin', href: '/admin', icon: ShieldCheck },
      ],
    },
    {
      groupName: 'Clients & Projects',
      items: [
        { label: 'Clients Directory', href: '/clients', icon: Users },
        { label: 'Photography Projects', href: '/projects', icon: Calendar },
        { label: 'Event Booking Schedule', href: '/bookings', icon: Calendar },
        { label: 'Financials & Ledger', href: '/financials', icon: DollarSign },
      ],
    },
    {
      groupName: 'Media & Album Suite',
      items: [
        { label: 'Client Portal Vault', href: '/portal', icon: Sparkles },
        { label: 'Photo Proofing Vault', href: '/gallery', icon: ImageIcon },
        { label: 'Album Design Studio', href: '/albums', icon: BookOpen },
        { label: 'Client Delivery Hub', href: '/delivery', icon: Send },
      ],
    },
    {
      groupName: 'AI Photography Suite',
      items: [
        { label: 'AI Studio Assistant', href: '/ai', icon: Bot },
        { label: 'AI Album Layout Engine', href: '/ai-album-designer', icon: BookMarked },
        { label: 'AI Color & Edit Engine', href: '/ai-editing-studio', icon: Wand2 },
        { label: 'AI Face Enhancement', href: '/ai-face-enhancement', icon: ScanFace },
        { label: 'AI Backdrop & Relighting', href: '/ai-background-removal', icon: Sparkles },
      ],
    },
    {
      groupName: 'Studio Workflow & Crew',
      items: [
        { label: 'Studio Workflow', href: '/studio-workflow', icon: GitBranch },
        { label: 'Crew Automation', href: '/automation', icon: GitBranch },
        { label: 'Photography Equipment', href: '/equipment', icon: HardDrive },
      ],
    },
    {
      groupName: 'Studio Intelligence',
      items: [
        { label: 'Analytics & Reports', href: '/analytics', icon: BarChart2 },
        { label: 'Studio Intelligence', href: '/studio-intelligence', icon: BarChart2 },
        { label: 'Business Growth', href: '/business-growth', icon: TrendingUp },
      ],
    },
    {
      groupName: 'System & Vault Security',
      items: [
        { label: 'Studio Settings', href: '/settings', icon: Settings },
        { label: 'Integrations Hub', href: '/integrations', icon: Radio },
        { label: 'Vault Access Control', href: '/security', icon: ShieldCheck },
        { label: 'DevOps & Deploy', href: '/devops', icon: Server },
      ],
    },
  ];

  // Filter navigation items by role
  const navGroups = allNavGroups
    .map((group) => {
      const filteredItems = group.items.filter((item) => {
        if (userRole === 'client') {
          return ['/portal', '/gallery', '/albums', '/delivery'].includes(item.href);
        }
        if (userRole === 'photographer' || userRole === 'editor') {
          return !['/admin', '/financials', '/security', '/devops'].includes(item.href);
        }
        if (userRole === 'studio_manager') {
          return !['/security', '/devops'].includes(item.href);
        }
        return true;
      });
      return { ...group, items: filteredItems };
    })
    .filter((group) => group.items.length > 0);

  return (
    <aside
      className={`relative h-screen bg-[#090909] border-r border-gold-500/20 flex flex-col justify-between transition-all duration-300 z-40 selection:bg-gold-500 selection:text-black film-grain ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Hallmark Header */}
      <div className="p-4 flex items-center justify-between border-b border-gold-500/20">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="rounded-lg bg-[#1D1D1D] p-2 text-gold-400 border border-gold-500/40 flex-shrink-0 shadow-kodakGlow">
            <Camera size={20} />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-hero font-bold text-ivory text-sm tracking-wider">
                PHOTOMAGIC
              </span>
              <span className="font-mono text-[9px] text-gold-500 uppercase tracking-widest font-semibold">
                Photography Studio OS
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg text-silver hover:text-ivory hover:bg-[#1D1D1D] transition-colors"
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
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold-500/80 px-3 py-1 font-semibold">
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
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg font-nav text-[11px] uppercase tracking-wider font-semibold transition-all ${
                    isActive
                      ? 'bg-[#1D1D1D] text-gold-400 border border-gold-500/50 shadow-kodakGlow'
                      : 'text-silver hover:text-ivory hover:bg-[#141414]'
                  }`}
                >
                  <Icon
                    size={16}
                    className={`flex-shrink-0 ${isActive ? 'text-gold-400' : 'text-silver'}`}
                  />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer Profile Hallmark */}
      <div className="p-4 border-t border-gold-500/20 flex items-center gap-3 bg-[#141414]">
        <div className="w-9 h-9 rounded-lg bg-[#1D1D1D] border border-gold-500/40 text-gold-400 flex items-center justify-center font-bold text-xs flex-shrink-0 font-mono shadow-kodakGlow">
          RK
        </div>
        {!isCollapsed && (
          <div className="flex flex-col truncate">
            <span className="text-xs font-bold text-ivory truncate">PhotoMagic Studio</span>
            <span className="font-mono text-[9px] text-gold-500 uppercase tracking-wider truncate">
              Master Executive OS
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};
