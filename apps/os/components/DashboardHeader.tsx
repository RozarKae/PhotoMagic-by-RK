'use client';

import React, { useState } from 'react';
import { Search, Bell, Sparkles } from 'lucide-react';
import { Input, Avatar } from '@photomagic/ui';

interface DashboardHeaderProps {
  onToggleNotifications: () => void;
  unreadCount?: number;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onToggleNotifications,
  unreadCount = 3,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userRole, setUserRole] = useState<string>('Studio Owner');
  const [userEmail, setUserEmail] = useState<string>('admin@photomagic.studio');

  React.useEffect(() => {
    const roleMatch = document.cookie.match(/photomagic_user_role=([^;]+)/);
    const emailMatch = document.cookie.match(/photomagic_user_email=([^;]+)/);

    if (roleMatch) {
      const r = roleMatch[1];
      const roleLabels: Record<string, string> = {
        super_admin: 'Studio Owner',
        studio_manager: 'Studio Manager',
        photographer: 'Lead Photographer',
        editor: 'Fine Art Editor',
        client: 'Client Portal User',
      };
      setUserRole(roleLabels[r] || r);
    }
    if (emailMatch) {
      setUserEmail(decodeURIComponent(emailMatch[1]));
    }
  }, []);

  return (
    <header className="h-16 px-8 bg-surface-glass/80 backdrop-blur-2xl border-b border-border-subtle flex items-center justify-between sticky top-0 z-30">
      {/* Search Input */}
      <div className="relative w-80">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold-500/70" />
        <input
          type="text"
          placeholder="Search leads, bookings, galleries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-10 pl-10 pr-4 rounded-xl bg-surface-base/90 text-xs text-ivory placeholder:text-silver/50 border border-border-subtle focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 transition-all shadow-inner"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 text-xs font-semibold">
          <Sparkles size={14} />
          <span>Gemini AI Engine Active</span>
        </div>

        {/* Notifications Bell */}
        <button
          onClick={onToggleNotifications}
          aria-label="Toggle Notifications"
          className="relative p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
          )}
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-3 border-l border-border-subtle">
          <Avatar name={userEmail.split('@')[0]} size="sm" />
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-bold text-text-primary truncate max-w-[140px]">
              {userEmail}
            </span>
            <span className="text-[10px] text-gold-400 font-mono tracking-wider font-semibold uppercase">
              {userRole}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
