'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input } from '@photomagic/ui';
import {
  Gift,
  Award,
  TrendingUp,
  Copy,
  CheckCircle2,
  Users,
  Share2,
  ArrowUpRight,
  DollarSign,
  Zap,
} from 'lucide-react';
import { ClientReferralV10 } from '@photomagic/config';

const MOCK_REFERRALS: ClientReferralV10[] = [
  {
    id: 'ref-1',
    referrerClientId: 'cli-udr-101',
    referrerName: 'Vikram & Ananya Sharma',
    referralCode: 'ANANYA10',
    referralLink: 'https://rkstudio.photomagic.app/ref/ANANYA10',
    refereeName: 'Karan Agrawal',
    refereeEmail: 'karan.a@gmail.com',
    rewardType: 'credit_percentage',
    rewardValue: 10.0,
    status: 'converted',
    totalConversions: 4,
  },
  {
    id: 'ref-2',
    referrerClientId: 'cli-udr-102',
    referrerName: 'Rahul & Priya Verma',
    referralCode: 'VERMA2026',
    referralLink: 'https://rkstudio.photomagic.app/ref/VERMA2026',
    refereeName: 'Siddharth Roy',
    refereeEmail: 'sid.roy@luxury.in',
    rewardType: 'flat_discount',
    rewardValue: 15000,
    status: 'rewarded',
    totalConversions: 3,
  },
  {
    id: 'ref-3',
    referrerClientId: 'cli-udr-103',
    referrerName: 'Siddharth & Meera Kapoor',
    referralCode: 'MEERA_ROYAL',
    referralLink: 'https://rkstudio.photomagic.app/ref/MEERA_ROYAL',
    refereeName: 'Nitin Mehta',
    refereeEmail: 'nitin.m@techcorp.io',
    rewardType: 'bonus_prints',
    rewardValue: 1.0,
    status: 'pending',
    totalConversions: 2,
  },
  {
    id: 'ref-4',
    referrerClientId: 'cli-udr-104',
    referrerName: 'Aditya & Riya Singhania',
    referralCode: 'SINGHANIA_GOLD',
    referralLink: 'https://rkstudio.photomagic.app/ref/SINGHANIA_GOLD',
    refereeName: 'Devansh Joshi',
    refereeEmail: 'devansh.j@designstudio.io',
    rewardType: 'credit_percentage',
    rewardValue: 10.0,
    status: 'converted',
    totalConversions: 5,
  },
];

export const ClientReferralEngine: React.FC = () => {
  const [referrals, setReferrals] = useState<ClientReferralV10[]>(MOCK_REFERRALS);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const totalConversions = referrals.reduce((sum, r) => sum + r.totalConversions, 0);

  const handleCopyLink = (link: string, id: string) => {
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  return (
    <Card
      variant="elevated"
      className="p-6 border border-border-subtle bg-surface-elevated flex flex-col gap-6"
    >
      {/* Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <Gift size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-text-primary">
                Phase 10.1 — Client Referrals Engine
              </h2>
              <Badge variant="gold">10% Reward Credit</Badge>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              Unique client referral links, milestone reward ledgers, leaderboards, and viral
              booking analytics.
            </p>
          </div>
        </div>

        <Button variant="primary" className="flex items-center gap-2 font-bold text-xs">
          <Award size={16} /> Generate New Client Referral Link
        </Button>
      </div>

      {/* KPI Cards Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex items-center justify-between">
          <div>
            <span className="text-xs text-text-tertiary">Total Referral Bookings</span>
            <h3 className="text-2xl font-extrabold text-text-primary mt-1">
              {totalConversions} Bookings
            </h3>
            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp size={12} /> +24% YoY Growth
            </span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Users size={22} />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-surface-base border border-gold-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs text-gold-400 font-semibold">Total Rewards Payout</span>
            <h3 className="text-2xl font-extrabold text-gold-500 mt-1">₹3,45,000</h3>
            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
              <CheckCircle2 size={12} /> 100% Verified
            </span>
          </div>
          <div className="p-3 rounded-xl bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <DollarSign size={22} />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-surface-base border border-purple-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs text-purple-400 font-semibold">Top Advocate</span>
            <h3 className="text-lg font-bold text-text-primary mt-1">Aditya Singhania</h3>
            <span className="text-[11px] text-purple-400 font-semibold mt-1 block">
              5 Converted Clients
            </span>
          </div>
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Award size={22} />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-surface-base border border-blue-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs text-blue-400 font-semibold">Conversion Rate</span>
            <h3 className="text-2xl font-extrabold text-text-primary mt-1">68.4%</h3>
            <span className="text-[11px] text-blue-400 font-semibold mt-1 block">
              Luxury Word-of-Mouth
            </span>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Zap size={22} />
          </div>
        </div>
      </div>

      {/* Referral Leaderboard & Table */}
      <div className="overflow-x-auto border border-border-subtle rounded-xl bg-surface-base">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-subtle text-xs text-text-tertiary uppercase tracking-wider bg-surface-elevated/50">
              <th className="py-3 px-4">Referrer Client</th>
              <th className="py-3 px-4">Promo / Referral Code</th>
              <th className="py-3 px-4">Unique Shareable Link</th>
              <th className="py-3 px-4">Reward Structure</th>
              <th className="py-3 px-4">Conversions</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle text-sm">
            {referrals.map((r) => (
              <tr key={r.id} className="hover:bg-surface-elevated/30 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-text-primary">{r.referrerName}</span>
                    <span className="text-xs text-text-tertiary">
                      Referee: {r.refereeName || 'N/A'}
                    </span>
                  </div>
                </td>

                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-1 rounded bg-gold-500/10 text-gold-400 border border-gold-500/30 text-xs font-mono font-bold">
                    {r.referralCode}
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-text-secondary truncate max-w-[220px]">
                      {r.referralLink}
                    </span>
                    <button
                      onClick={() => handleCopyLink(r.referralLink, r.id!)}
                      className="p-1 rounded hover:bg-surface-elevated text-gold-500 transition-colors"
                      title="Copy Referral Link"
                    >
                      {copiedId === r.id ? (
                        <CheckCircle2 size={14} className="text-emerald-400" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>
                </td>

                <td className="py-3.5 px-4 text-xs font-medium text-text-primary capitalize">
                  {r.rewardType === 'credit_percentage' && `${r.rewardValue}% Invoice Credit`}
                  {r.rewardType === 'flat_discount' &&
                    `₹${r.rewardValue.toLocaleString('en-IN')} Cash Reward`}
                  {r.rewardType === 'bonus_prints' && `12x18 Metallic Album Spread`}
                </td>

                <td className="py-3.5 px-4 text-xs font-bold text-emerald-400">
                  {r.totalConversions} Successful Bookings
                </td>

                <td className="py-3.5 px-4 text-right">
                  <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
