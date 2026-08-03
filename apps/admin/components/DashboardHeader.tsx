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

  return (
    <header className="h-16 px-8 bg-surface-glass/80 backdrop-blur-2xl border-b border-border-subtle flex items-center justify-between sticky top-0 z-30">
      {/* Search Input */}
      <div className="relative w-72">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
        <input
          type="text"
          placeholder="Search leads, bookings, galleries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-base text-xs text-text-primary placeholder:text-text-tertiary border border-border-subtle focus:outline-none focus:ring-1 focus:ring-gold-500 transition-all"
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
          <Avatar name="RK Director" size="sm" />
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-bold text-text-primary">RK Director</span>
            <span className="text-[10px] text-text-tertiary">Studio Owner</span>
          </div>
        </div>
      </div>
    </header>
  );
};
