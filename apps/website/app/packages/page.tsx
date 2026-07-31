'use client';

import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Container, Grid, Card, Badge, Button } from '@photomagic/ui';
import { Check, ShieldCheck, Crown, ArrowRight, UserCheck } from 'lucide-react';
import Link from 'next/link';

export default function PackagesPage() {
  const tiers = [
    {
      title: 'The Atelier Essence',
      price: '$4,500',
      audience: 'Ideal for intimate luxury celebrations and private fine art portraiture.',
      features: [
        '6 Hours Single Master Lead Photographer',
        '300 Retouched High-Res Web Proofing Collection',
        'Private Client Portal Access & 3D Pin Comments',
        'Direct Cloudflare R2 High-Speed Digital Download',
      ],
    },
    {
      title: 'The Royal Heirloom',
      price: '$8,500',
      popular: true,
      audience: 'Our signature full-day wedding experience with cinema & luxury album.',
      features: [
        '10 Hours Dual Master Lead Photographers',
        'Full Day 4K Cinema Highlight Film & Sound Score',
        '600 Color Mastered Retouched Proofing Collection',
        'Handcrafted Italian Leather Flush-Mount Album (30 Pages)',
        'Private Client Portal with Digital Approval Hub',
      ],
    },
    {
      title: 'The Imperial Legacy',
      price: '$15,000+',
      audience: 'Bespoke multi-day destination wedding coverage for royal events worldwide.',
      features: [
        'Multi-Day Master Photography & 8K Cinema Team',
        'Aerial Drone Video Choreography & 4K Cinema Scoring',
        'Unlimited Retouched Master Proofing Collection',
        'Main Italian Leather Album + Two Velvet Parent Albums',
        'Same-Day Reception Video Reel & Dedicated Concierge',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-canvas text-text-primary flex flex-col">
      <Navbar />

      <main className="flex-1 py-28">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="gold" className="uppercase tracking-widest text-[10px]">
              Transparent Investment
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mt-2">
              Curated Collections & Pricing
            </h1>
            <p className="text-sm text-text-secondary mt-2 font-light">
              Bespoke photography and cinema collections crafted for extraordinary celebrations
              worldwide.
            </p>
          </div>

          <Grid cols={3}>
            {tiers.map((tier, idx) => (
              <Card
                key={idx}
                variant="glass"
                className={`p-8 flex flex-col justify-between relative border-border-subtle hover:border-gold-500/40 transition-all ${
                  tier.popular ? 'border-gold-500/50 shadow-modal ring-1 ring-gold-500/30' : ''
                }`}
                data-analytics={`package-card-${tier.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-500 text-canvas font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-gold">
                    Most Requested Collection
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-1">{tier.title}</h3>
                  <div className="text-3xl font-extrabold text-gold-500 mb-2 font-mono">
                    {tier.price}
                  </div>

                  <div className="p-3 rounded-xl bg-surface-base border border-border-subtle mb-6 flex items-start gap-2 text-xs">
                    <UserCheck size={14} className="text-gold-500 flex-shrink-0 mt-0.5" />
                    <span className="text-text-secondary font-light text-[11px] leading-relaxed">
                      {tier.audience}
                    </span>
                  </div>

                  <ul className="flex flex-col gap-3 mb-8">
                    {tier.features.map((feat, fIdx) => (
                      <li
                        key={fIdx}
                        className="flex items-center gap-2.5 text-xs text-text-secondary font-light"
                      >
                        <Check size={14} className="text-gold-500 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/#inquiry">
                  <Button
                    variant={tier.popular ? 'primary' : 'secondary'}
                    className="w-full font-bold flex items-center justify-center gap-2"
                    data-analytics={`select-package-${tier.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    Inquire Collection Availability <ArrowRight size={14} />
                  </Button>
                </Link>
              </Card>
            ))}
          </Grid>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
