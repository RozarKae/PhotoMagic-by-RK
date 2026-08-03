'use client';

import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { DashboardHeader } from '../components/DashboardHeader';
import { DashboardCard } from '../components/DashboardCard';
import { AnalyticsCard } from '../components/AnalyticsCard';
import { ActivityTimeline } from '../components/ActivityTimeline';
import { NotificationPanel } from '../components/NotificationPanel';
import { CalendarWidget } from '../components/CalendarWidget';
import { QuickActions } from '../components/QuickActions';
import { StudioFinalExecutiveDashboard } from '../components/studio-intelligence/StudioFinalExecutiveDashboard';
import { DollarSign, Calendar, AlertCircle, Camera } from 'lucide-react';

export default function StudioDashboardPage() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="flex h-screen bg-[#090909] text-[#F5F3EF] overflow-hidden film-grain selection:bg-gold-500 selection:text-black">
      {/* Collapsible Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Navigation Bar */}
        <DashboardHeader onToggleNotifications={() => setShowNotifications(!showNotifications)} />

        {/* Dashboard Body */}
        <main className="p-8 max-w-[1600px] mx-auto w-full flex flex-col gap-8 pb-24 relative">
          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-8 top-4 w-96 z-50">
              <NotificationPanel onClose={() => setShowNotifications(false)} />
            </div>
          )}

          {/* Master Final Executive Dashboard (Phase 10.9) */}
          <StudioFinalExecutiveDashboard />

          {/* Quick Actions Bar */}
          <QuickActions />

          {/* Overview Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardCard
              title="Total Studio Revenue"
              value="₹48.50 Lakhs"
              trend="+18.4%"
              trendDirection="up"
              subtitle="vs. previous quarter"
              icon={<DollarSign size={20} />}
            />
            <DashboardCard
              title="Active Productions"
              value="28 Feature Films"
              trend="+4.2%"
              trendDirection="up"
              subtitle="In production across 4 states"
              icon={<Calendar size={20} />}
            />
            <DashboardCard
              title="Pending Ledger"
              value="₹6.50 Lakhs"
              trend="-2.1%"
              trendDirection="down"
              subtitle="4 Pending Ledger Manifests"
              icon={<AlertCircle size={20} />}
            />
            <DashboardCard
              title="Upcoming Photography"
              value="8 Shoots"
              subtitle="Principal Photography in Next 14 Days"
              icon={<Camera size={20} />}
            />
          </div>

          {/* Middle Layout: Business Analytics & Calendar Widget */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AnalyticsCard />
            </div>
            <div className="lg:col-span-1">
              <CalendarWidget />
            </div>
          </div>

          {/* Bottom Layout: Activity Timeline */}
          <div className="grid grid-cols-1 gap-8">
            <ActivityTimeline />
          </div>
        </main>
      </div>
    </div>
  );
}
