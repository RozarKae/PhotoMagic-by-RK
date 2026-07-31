'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input } from '@photomagic/ui';
import {
  Tag,
  Percent,
  Calendar,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Sparkles,
} from 'lucide-react';
import { MarketingOfferV10 } from '@photomagic/config';

const MOCK_OFFERS: MarketingOfferV10[] = [
  {
    id: 'off-1',
    promoCode: 'UDAIPUR_ROYAL_2026',
    offerTitle: 'Royal Palace Season Early Bird Package',
    offerType: 'early_bird',
    discountMode: 'percentage',
    discountValue: 15.0,
    maxUsageLimit: 20,
    currentUsageCount: 14,
    minOrderValue: 200000.0,
    startDate: '2026-06-01',
    expiryDate: '2026-09-30',
    isActive: true,
  },
  {
    id: 'off-2',
    promoCode: 'MONSOON_LOVE',
    offerTitle: 'Monsoon Pre-Wedding Shoot Promo',
    offerType: 'seasonal_offer',
    discountMode: 'flat_inr',
    discountValue: 25000.0,
    maxUsageLimit: 50,
    currentUsageCount: 42,
    minOrderValue: 100000.0,
    startDate: '2026-07-01',
    expiryDate: '2026-08-31',
    isActive: true,
  },
  {
    id: 'off-3',
    promoCode: 'VIP_ALBUM_VIP',
    offerTitle: 'Complimentary 12x18 Gold Foil Album Upgrade',
    offerType: 'limited_time',
    discountMode: 'percentage',
    discountValue: 100.0,
    maxUsageLimit: 10,
    currentUsageCount: 8,
    minOrderValue: 350000.0,
    startDate: '2026-07-15',
    expiryDate: '2026-08-15',
    isActive: true,
  },
  {
    id: 'off-4',
    promoCode: 'WELCOME_2026',
    offerTitle: 'First Time Consultation Booking Coupon',
    offerType: 'coupon',
    discountMode: 'flat_inr',
    discountValue: 10000.0,
    maxUsageLimit: 100,
    currentUsageCount: 68,
    minOrderValue: 75000.0,
    startDate: '2026-01-01',
    expiryDate: '2026-12-31',
    isActive: true,
  },
];

const OFFER_TYPE_LABELS: Record<string, { label: string; color: string }> = {
  coupon: { label: 'Coupon', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  discount_code: {
    label: 'Discount Code',
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  seasonal_offer: {
    label: 'Seasonal Offer',
    color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
  early_bird: {
    label: 'Early Bird Package',
    color: 'bg-gold-500/10 text-gold-400 border-gold-500/20',
  },
  limited_time: {
    label: 'Limited Time Flash',
    color: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  },
};

export const StudioOffersManager: React.FC = () => {
  const [offers, setOffers] = useState<MarketingOfferV10[]>(MOCK_OFFERS);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>('');
  const [offerTitle, setOfferTitle] = useState<string>('');
  const [offerType, setOfferType] = useState<any>('seasonal_offer');
  const [discountValue, setDiscountValue] = useState<number>(15);

  const handleCreateOffer = () => {
    if (!promoCode || !offerTitle) return;

    const newOffer: MarketingOfferV10 = {
      id: `off-${Date.now()}`,
      promoCode: promoCode.toUpperCase(),
      offerTitle,
      offerType,
      discountMode: 'percentage',
      discountValue,
      maxUsageLimit: 50,
      currentUsageCount: 0,
      minOrderValue: 150000,
      startDate: '2026-08-01',
      expiryDate: '2026-12-31',
      isActive: true,
    };

    setOffers([newOffer, ...offers]);
    setShowCreateModal(false);
    setPromoCode('');
    setOfferTitle('');
  };

  return (
    <Card
      variant="elevated"
      className="p-6 border border-border-subtle bg-surface-elevated flex flex-col gap-6"
    >
      {/* Title & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <Tag size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-text-primary">
                Phase 10.3 — Studio Marketing Offers & Campaign Manager
              </h2>
              <Badge variant="gold">4 Active Campaigns</Badge>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              Promotional codes, seasonal campaign offers, early-bird package locks, and usage
              metrics.
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 font-bold text-xs"
        >
          <Plus size={16} /> Create Promotional Campaign
        </Button>
      </div>

      {/* Modal Sandbox */}
      {showCreateModal && (
        <div className="p-5 rounded-xl bg-surface-base border border-gold-500/40 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gold-400 flex items-center gap-2">
              <Sparkles size={16} /> Create New Campaign Offer
            </h3>
            <button
              onClick={() => setShowCreateModal(false)}
              className="text-xs text-text-tertiary hover:text-text-primary"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <Input
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promo Code (e.g. WINTER_PALACE)"
            />
            <Input
              value={offerTitle}
              onChange={(e) => setOfferTitle(e.target.value)}
              placeholder="Offer Title (e.g. Winter Wedding Special)"
            />
            <select
              value={offerType}
              onChange={(e) => setOfferType(e.target.value)}
              className="bg-surface-elevated text-text-primary text-sm px-3 py-2 rounded-lg border border-border-subtle focus:outline-none focus:border-gold-500"
            >
              <option value="coupon">Coupon</option>
              <option value="discount_code">Discount Code</option>
              <option value="seasonal_offer">Seasonal Offer</option>
              <option value="early_bird">Early Bird Package</option>
              <option value="limited_time">Limited Time Flash</option>
            </select>
            <Input
              type="number"
              value={discountValue}
              onChange={(e) => setDiscountValue(Number(e.target.value))}
              placeholder="Discount Value (% or INR)"
            />
          </div>

          <div className="flex justify-end">
            <Button variant="primary" onClick={handleCreateOffer} className="font-bold text-xs">
              Publish Campaign Code
            </Button>
          </div>
        </div>
      )}

      {/* Offers Table */}
      <div className="overflow-x-auto border border-border-subtle rounded-xl bg-surface-base">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-subtle text-xs text-text-tertiary uppercase tracking-wider bg-surface-elevated/50">
              <th className="py-3 px-4">Promo Code & Title</th>
              <th className="py-3 px-4">Campaign Type</th>
              <th className="py-3 px-4">Discount Value</th>
              <th className="py-3 px-4">Usage Counter</th>
              <th className="py-3 px-4">Validity Period</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle text-sm">
            {offers.map((off) => {
              const typeMeta = OFFER_TYPE_LABELS[off.offerType] || {
                label: off.offerType,
                color: 'bg-surface-base text-text-primary border-border-subtle',
              };

              const usagePercent = Math.round((off.currentUsageCount / off.maxUsageLimit) * 100);

              return (
                <tr key={off.id} className="hover:bg-surface-elevated/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col">
                      <span className="font-mono font-bold text-gold-400 text-sm">
                        {off.promoCode}
                      </span>
                      <span className="text-xs text-text-secondary">{off.offerTitle}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold border ${typeMeta.color}`}
                    >
                      {typeMeta.label}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-text-primary">
                    {off.discountMode === 'percentage'
                      ? `${off.discountValue}% OFF`
                      : `₹${off.discountValue.toLocaleString('en-IN')} FLAT OFF`}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-text-primary">
                        {off.currentUsageCount} / {off.maxUsageLimit} redeemed ({usagePercent}%)
                      </span>
                      <div className="w-32 bg-surface-elevated rounded-full h-1.5 overflow-hidden border border-border-subtle mt-1">
                        <div
                          className="bg-gold-500 h-full rounded-full"
                          style={{ width: `${usagePercent}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-xs text-text-tertiary whitespace-nowrap">
                    {off.startDate} to {off.expiryDate}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
                      <CheckCircle2 size={14} /> Active
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
