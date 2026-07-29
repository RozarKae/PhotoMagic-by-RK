'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { ProjectTimelineStepper } from '../../components/support/ProjectTimelineStepper';
import { ClientNotificationCenter } from '../../components/support/ClientNotificationCenter';
import { StudioAnnouncementsBanner } from '../../components/support/StudioAnnouncementsBanner';
import { ClientMessageCenter } from '../../components/support/ClientMessageCenter';
import { SupportTicketsFaqHub } from '../../components/support/SupportTicketsFaqHub';
import { ProjectActivityLog } from '../../components/support/ProjectActivityLog';
import { Clock, Bell, MessageSquare, HelpCircle } from 'lucide-react';

export default function ClientSupportTimelinePage() {
  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Phase C8 Client Portal</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">Project Timeline, Notifications & Support</h1>
          <p className="text-sm text-text-secondary">Stay informed with live 15-stage project tracking, direct studio chat, announcements, and FAQs.</p>
        </div>
      </div>

      {/* Studio Announcements Banner */}
      <StudioAnnouncementsBanner />

      {/* 15-Stage Master Project Completion Timeline */}
      <ProjectTimelineStepper />

      {/* In-App Notification Center & Direct Message Thread */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ClientNotificationCenter />
        <ClientMessageCenter />
      </div>

      {/* Support Center FAQs & Project Activity Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SupportTicketsFaqHub />
        <ProjectActivityLog />
      </div>
    </main>
  );
}
