'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Building2, Globe, MapPin, Users, DollarSign, ArrowRight } from 'lucide-react';

export const BranchSwitcherGrid: React.FC = () => {
  const branches = [
    {
      code: 'UDPR-01',
      name: 'Udaipur Flagship Studio',
      location: 'Udaipur, Rajasthan (India)',
      currency: 'INR (₹)',
      revenue: '₹1.20 Cr',
      employees: 28,
      status: 'head_office',
    },
    {
      code: 'MUMB-02',
      name: 'Mumbai Commercial Studio',
      location: 'Bandra, Mumbai (India)',
      currency: 'INR (₹)',
      revenue: '₹85 Lakhs',
      employees: 18,
      status: 'active',
    },
    {
      code: 'DXB-03',
      name: 'Dubai Luxury International',
      location: 'Downtown Dubai (UAE)',
      currency: 'AED (د.إ)',
      revenue: 'AED 420,000',
      employees: 12,
      status: 'active',
    },
    {
      code: 'LDN-04',
      name: 'London Boutique Studio',
      location: 'Mayfair, London (UK)',
      currency: 'GBP (£)',
      revenue: '£180,000',
      employees: 8,
      status: 'active',
    },
  ];

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Building2 size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Multi-Branch Global Studio Directory
          </h3>
        </div>
        <Badge variant="gold">4 Global Locations Active</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {branches.map((b) => (
          <div
            key={b.code}
            className="p-4 rounded-xl bg-surface-base border border-border-subtle hover:border-gold-500/50 transition-all flex flex-col justify-between gap-3 text-xs"
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-text-primary text-sm">{b.name}</span>
                <span className="font-mono text-[10px] text-gold-500 font-semibold">{b.code}</span>
              </div>
              <Badge variant={b.status === 'head_office' ? 'gold' : 'success'}>
                {b.status === 'head_office' ? 'Headquarters' : 'Active Branch'}
              </Badge>
            </div>

            <div className="flex flex-col gap-1 text-[11px] text-text-secondary">
              <span className="flex items-center gap-1">
                <MapPin size={12} className="text-gold-500" /> {b.location}
              </span>
              <span className="flex items-center gap-1">
                <Users size={12} className="text-gold-500" /> {b.employees} Crew Members
              </span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-border-subtle font-mono text-[11px]">
              <span className="text-text-tertiary">Revenue:</span>
              <span className="font-bold text-gold-500">{b.revenue}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
