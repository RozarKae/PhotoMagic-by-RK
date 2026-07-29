'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { SmartGalleryMasonry } from '../../components/ai-proofing/SmartGalleryMasonry';
import { SideBySideCompare } from '../../components/ai-proofing/SideBySideCompare';
import { EditRequestManager } from '../../components/ai-proofing/EditRequestManager';
import { ApprovalDownloadCenter } from '../../components/ai-proofing/ApprovalDownloadCenter';
import { ProofingAnalyticsTimeline } from '../../components/ai-proofing/ProofingAnalyticsTimeline';
import { ShieldCheck, Heart, Download, Share2, Sparkles } from 'lucide-react';

export default function AIProofingSuitePage() {
  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Phase 3.4 AI Client Proofing Suite</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">AI Client Selection & Proofing Suite</h1>
          <p className="text-sm text-text-secondary">Smart photo star ratings, synchronized side-by-side comparison, edit request workflow, and digital signature approvals.</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" className="flex items-center gap-1.5">
            <Share2 size={16} /> Share Proofing Portal
          </Button>
          <Button variant="primary" className="flex items-center gap-2">
            <ShieldCheck size={16} />
            View Approved Collections
          </Button>
        </div>
      </div>

      {/* Project Milestone Stepper & Client Analytics */}
      <ProofingAnalyticsTimeline />

      {/* Smart Proofing Gallery Masonry Grid */}
      <SmartGalleryMasonry />

      {/* Side-by-Side Comparison Stage */}
      <SideBySideCompare />

      {/* Edit Requests Manager & Digital Approval / Download Center */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <EditRequestManager />
        <ApprovalDownloadCenter />
      </div>
    </main>
  );
}
