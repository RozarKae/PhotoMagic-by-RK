'use client';

import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Container, Grid, Card, Badge, Button } from '@photomagic/ui';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function PackagesPage() {
  const tiers = [
    {
      title: 'Studio Essence',
      price: '$4,500',
      desc: 'Ideal for intimate luxury celebrations and portrait sessions.',
      features: [
        '6 Hours Single Lead Photographer',
        '300 High-Res Web Proofing Collection',
        'Private Client Portal Access',
        'Digital High-Res Delivery',
      ],
    },
    {
      title: 'Royal Heirloom',
      price: '$8,500',
      popular: true,
      desc: 'Our most sought-after full-day wedding experience.',
      features: [
        '10 Hours Dual Master Photographers',
        'Full Day 4K Cinema Highlight Film',
        '600 Retouched Proofing Collection',
        'Italian Leather Flush-Mount Album (30 Pages)',
        'Direct Cloudflare R2 Direct Downloads',
      ],
    },
    {
      title: 'Imperial Legacy',
      price: '$15,000+',
      desc: 'Multi-day destination wedding coverage for royal events.',
      features: [
        'Multi-Day Master Photography & Cinema Team',
        'Aerial Drone Video Choreography',
        'Unlimited Retouched Proofing Collection',
        'Two Parent Velvet Albums + Main Italian Album',
        'Same-Day Edit Video Reel for Reception',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-canvas text-text-primary flex flex-col">
      <Navbar />

      <main className="flex-1 py-28">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="gold">Transparent Investment</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mt-2">
              Collections & Pricing
            </h1>
            <p className="text-sm text-text-secondary mt-2">
              Bespoke collections crafted for extraordinary celebrations worldwide.
            </p>
          </div>

          <Grid cols={3}>
            {tiers.map((tier, idx) => (
              <Card
                key={idx}
                variant="glass"
                className={`p-8 flex flex-col justify-between relative ${
                  tier.popular ? 'border-gold-500/50 shadow-modal' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-500 text-canvas font-bold text-xs uppercase px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-1">{tier.title}</h3>
                  <div className="text-3xl font-extrabold text-gold-500 mb-2">{tier.price}</div>
                  <p className="text-xs text-text-tertiary mb-6">{tier.desc}</p>
                  <ul className="flex flex-col gap-3 mb-8">
                    {tier.features.map((feat, fIdx) => (
                      <li
                        key={fIdx}
                        className="flex items-center gap-2.5 text-xs text-text-secondary"
                      >
                        <Check size={14} className="text-gold-500 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/contact">
                  <Button variant={tier.popular ? 'primary' : 'secondary'} className="w-full">
                    Book Collection
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
