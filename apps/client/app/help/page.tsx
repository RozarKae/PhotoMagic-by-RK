'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { HelpCircle, Video, Search, Ticket, PhoneCall, MessageSquare, BookOpen } from 'lucide-react';

export default function ClientHelpCenterPage() {
  const videoGuides = [
    { title: 'How to Mark Favorites in Smart Proofing Gallery', duration: '2 mins', category: 'Gallery' },
    { title: 'How to Review & Approve Italian Album Spreads', duration: '3 mins', category: 'Album' },
    { title: 'How to Download High-Res RAW ZIP Archives', duration: '1 min', category: 'Delivery' },
  ];

  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Phase C13 Client Portal</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">Help Center & Knowledge Base</h1>
          <p className="text-sm text-text-secondary">Smart FAQ search, video guides, support ticket creation, and direct studio concierge contacts.</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" className="flex items-center gap-2">
            <Ticket size={16} /> Raise Support Ticket
          </Button>
        </div>
      </div>

      {/* Video Guides Library */}
      <Card variant="glass" className="p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <Video size={18} className="text-gold-500" />
            <h3 className="text-sm font-bold text-text-primary">Interactive Client Video Guides</h3>
          </div>
          <Badge variant="gold">3 Video Tutorials</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {videoGuides.map((guide, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col justify-between gap-3">
              <div className="flex flex-col gap-1">
                <Badge variant="gold" className="text-[9px] w-fit">{guide.category}</Badge>
                <span className="font-bold text-text-primary text-sm pt-1">{guide.title}</span>
                <span className="text-[10px] text-text-tertiary">Duration: {guide.duration}</span>
              </div>
              <Button variant="secondary" size="sm" className="w-full flex items-center justify-center gap-1">
                <Video size={12} /> Watch Video Guide
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Studio Direct Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <Card variant="glass" className="p-5 flex flex-col gap-2">
          <span className="font-semibold text-text-tertiary">Call Studio Hotline</span>
          <span className="font-bold text-text-primary text-sm">+91 98765 43210</span>
          <span className="text-[10px] text-gold-500">Mon - Sat (10:00 AM - 07:00 PM)</span>
        </Card>

        <Card variant="glass" className="p-5 flex flex-col gap-2">
          <span className="font-semibold text-text-tertiary">WhatsApp Concierge</span>
          <span className="font-bold text-status-success text-sm">+91 98765 43211</span>
          <span className="text-[10px] text-status-success">Instant Mobile Support</span>
        </Card>

        <Card variant="glass" className="p-5 flex flex-col gap-2">
          <span className="font-semibold text-text-tertiary">Studio Office Address</span>
          <span className="font-bold text-text-primary text-sm">City Palace Road, Udaipur</span>
          <span className="text-[10px] text-text-tertiary">Rajasthan 313001 (India)</span>
        </Card>
      </div>
    </main>
  );
}
