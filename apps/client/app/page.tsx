'use client';

import React from 'react';
import { Card, Button, Badge } from '@photomagic/ui';
import { useAuth } from '@photomagic/auth';

export default function ClientPortalPage() {
  const { session } = useAuth();

  return (
    <main className="p-8 max-w-5xl mx-auto flex flex-col gap-8">
      {/* Header Banner */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Badge variant="gold">Client Experience Portal</Badge>
          <span className="text-xs text-text-tertiary">Phase 1.0 Infrastructure Active</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          Welcome Back, {session?.fullName || 'Valued Client'}
        </h1>
        <p className="text-sm text-text-secondary">
          Manage your event timeline, review initial web proofs, select album favorites, and approve
          layouts.
        </p>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="glass" className="flex flex-col justify-between">
          <div>
            <Badge variant="warning">Action Required</Badge>
            <h3 className="text-lg font-semibold text-text-primary mt-3">Gallery Selection</h3>
            <p className="text-xs text-text-secondary mt-1">
              Select 75 photos for initial album proofing.
            </p>
          </div>
          <Button variant="primary" className="mt-6">
            Continue Selection
          </Button>
        </Card>

        <Card variant="glass" className="flex flex-col justify-between">
          <div>
            <Badge variant="info">In Review</Badge>
            <h3 className="text-lg font-semibold text-text-primary mt-3">Album Layout Proof</h3>
            <p className="text-xs text-text-secondary mt-1">
              Review 18 spreads & drop visual pin comments.
            </p>
          </div>
          <Button variant="secondary" className="mt-6">
            Review Spreads
          </Button>
        </Card>

        <Card variant="glass" className="flex flex-col justify-between">
          <div>
            <Badge variant="success">Deposit Verified</Badge>
            <h3 className="text-lg font-semibold text-text-primary mt-3">Contract & Billing</h3>
            <p className="text-xs text-text-secondary mt-1">
              View signed agreements & payment receipts.
            </p>
          </div>
          <Button variant="secondary" className="mt-6">
            View Ledger
          </Button>
        </Card>
      </div>
    </main>
  );
}
