'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Star, Gift, Share2, Copy, Heart, CheckCircle2 } from 'lucide-react';

export default function ClientFeedbackReferralPage() {
  const [referralCode] = useState('ELEANOR-ROYAL-2026');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Phase C14 Client Portal</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">Feedback, Reviews & Referral Program</h1>
          <p className="text-sm text-text-secondary">Share your royal wedding experience, review studio services, and refer friends to earn luxury rewards.</p>
        </div>
      </div>

      {/* Referral Program Hub */}
      <Card variant="glass" className="p-6 flex flex-col gap-5">
        <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <Gift size={18} className="text-gold-500" />
            <h3 className="text-sm font-bold text-text-primary">Client Personal Referral Code & Rewards</h3>
          </div>
          <Badge variant="gold">10% Credit Per Successful Booking</Badge>
        </div>

        <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold text-text-secondary">Your Personal Referral Code</span>
            <span className="font-extrabold font-mono text-gold-500 text-lg">{referralCode}</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="secondary" size="sm" onClick={handleCopy} className="flex items-center gap-1">
              <Copy size={14} /> {copied ? 'Copied!' : 'Copy Referral Link'}
            </Button>
            <Button variant="primary" size="sm" className="flex items-center gap-1">
              <Share2 size={14} /> Share via WhatsApp
            </Button>
          </div>
        </div>
      </Card>
    </main>
  );
}
