'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { ClientReferralEngine } from '../../components/business-growth/ClientReferralEngine';
import { GiftCardManager } from '../../components/business-growth/GiftCardManager';
import { StudioOffersManager } from '../../components/business-growth/StudioOffersManager';
import { ReviewModerationHub } from '../../components/business-growth/ReviewModerationHub';
import { SocialShareGenerator } from '../../components/business-growth/SocialShareGenerator';
import { TrendingUp, Gift, CreditCard, Tag, Star, Share2, Sparkles } from 'lucide-react';

export default function BusinessGrowthPage() {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'referrals' | 'giftcards' | 'offers' | 'reviews' | 'social'
  >('overview');

  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="gold">Phases 10.1 – 10.5 Business Growth Suite</Badge>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Luxury Client Acquisition
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">
            Studio Business Growth Command Center
          </h1>
          <p className="text-sm text-text-secondary mt-0.5">
            Client referrals, digital gift cards, promotional marketing offers, review moderation,
            and branded social share link generator.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" className="flex items-center gap-2 font-bold">
            <Sparkles size={16} /> Launch Growth Campaign
          </Button>
        </div>
      </div>

      {/* Master Business Growth Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-border-subtle overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-gold-500/20 text-gold-500 border border-gold-500/40 shadow-lg shadow-gold-500/5'
              : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
          }`}
        >
          <TrendingUp size={18} /> Growth Suite Overview
        </button>

        <button
          onClick={() => setActiveTab('referrals')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'referrals'
              ? 'bg-gold-500/20 text-gold-500 border border-gold-500/40 shadow-lg shadow-gold-500/5'
              : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
          }`}
        >
          <Gift size={18} /> Client Referrals (10.1)
        </button>

        <button
          onClick={() => setActiveTab('giftcards')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'giftcards'
              ? 'bg-gold-500/20 text-gold-500 border border-gold-500/40 shadow-lg shadow-gold-500/5'
              : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
          }`}
        >
          <CreditCard size={18} /> Gift Cards & QR (10.2)
        </button>

        <button
          onClick={() => setActiveTab('offers')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'offers'
              ? 'bg-gold-500/20 text-gold-500 border border-gold-500/40 shadow-lg shadow-gold-500/5'
              : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
          }`}
        >
          <Tag size={18} /> Studio Offers (10.3)
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'reviews'
              ? 'bg-gold-500/20 text-gold-500 border border-gold-500/40 shadow-lg shadow-gold-500/5'
              : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
          }`}
        >
          <Star size={18} /> Review Moderation (10.4)
        </button>

        <button
          onClick={() => setActiveTab('social')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'social'
              ? 'bg-gold-500/20 text-gold-500 border border-gold-500/40 shadow-lg shadow-gold-500/5'
              : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
          }`}
        >
          <Share2 size={18} /> Social Share Cards (10.5)
        </button>
      </div>

      {/* Tab Content Display */}
      <div className="flex flex-col gap-8">
        {activeTab === 'overview' && (
          <>
            <ClientReferralEngine />
            <GiftCardManager />
            <StudioOffersManager />
            <ReviewModerationHub />
            <SocialShareGenerator />
          </>
        )}

        {activeTab === 'referrals' && <ClientReferralEngine />}

        {activeTab === 'giftcards' && <GiftCardManager />}

        {activeTab === 'offers' && <StudioOffersManager />}

        {activeTab === 'reviews' && <ReviewModerationHub />}

        {activeTab === 'social' && <SocialShareGenerator />}
      </div>
    </main>
  );
}
