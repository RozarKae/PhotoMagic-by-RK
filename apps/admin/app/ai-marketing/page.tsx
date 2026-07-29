'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { SocialCopyGenerator } from '../../components/ai-marketing/SocialCopyGenerator';
import { PosterDesignerCanvas } from '../../components/ai-marketing/PosterDesignerCanvas';
import { ReelsShortsPlanner } from '../../components/ai-marketing/ReelsShortsPlanner';
import { BrandKitManager } from '../../components/ai-marketing/BrandKitManager';
import { ContentCalendarPlanner } from '../../components/ai-marketing/ContentCalendarPlanner';
import { Megaphone, Sparkles, Download, Calendar } from 'lucide-react';

export default function AIMarketingStudioPage() {
  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Phase 3.5 AI Marketing & Content Studio</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">AI Marketing & Content Studio</h1>
          <p className="text-sm text-text-secondary">Synthesize social media captions, design 300 DPI promotional posters, plan viral Reels storyboards, and schedule content calendars.</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" className="flex items-center gap-2">
            <Sparkles size={16} />
            Launch AI Campaign
          </Button>
        </div>
      </div>

      {/* Brand Kit Manager */}
      <BrandKitManager />

      {/* Social Copy Generator & Reels Storyboard Planner */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SocialCopyGenerator />
        <ReelsShortsPlanner />
      </div>

      {/* AI Poster Designer Canvas */}
      <PosterDesignerCanvas />

      {/* Content Marketing Publishing Calendar */}
      <ContentCalendarPlanner />
    </main>
  );
}
