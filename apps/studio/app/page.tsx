'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { StructuredData } from '../components/StructuredData';
import { InquiryForm } from '../components/InquiryForm';
import { Button, Card, Container, Grid } from '@photomagic/ui';
import {
  Sparkles,
  Crown,
  Gem,
  Compass,
  CheckCircle2,
  Award,
  ArrowUpRight,
  Globe,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { ROUTES } from '@photomagic/config';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'weddings' | 'portraits' | 'events'>('all');

  const featuredStories = [
    {
      id: 'story-1',
      title: 'Royal Palace Celebration',
      subtitle: 'City Palace • Udaipur, India',
      category: 'weddings',
      categoryLabel: 'Royal Weddings',
      frames: '48 Master Frames',
      image:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85',
    },
    {
      id: 'story-2',
      title: 'Editorial Haute Couture',
      subtitle: 'Hôtel de Crillon • Paris, France',
      category: 'portraits',
      categoryLabel: 'Haute Couture',
      frames: '36 Master Frames',
      image:
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=85',
    },
    {
      id: 'story-3',
      title: 'Fine Art Master Portraiture',
      subtitle: 'Private Atelier • Beverly Hills',
      category: 'portraits',
      categoryLabel: 'Fine Art',
      frames: '24 Master Frames',
      image:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85',
    },
    {
      id: 'story-4',
      title: 'Private Estate Gala',
      subtitle: 'Villa d’Este • Lake Como, Italy',
      category: 'events',
      categoryLabel: 'High-Society Gala',
      frames: '52 Master Frames',
      image:
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=85',
    },
  ];

  const filteredStories =
    activeTab === 'all' ? featuredStories : featuredStories.filter((s) => s.category === activeTab);

  const processRooms = [
    {
      step: '01',
      room: 'Alignment & Creative Reconnaissance',
      desc: 'Private consultation, venue lighting analysis, and master shot-list manifest curation.',
    },
    {
      step: '02',
      room: 'On-Location Fine Art Production',
      desc: 'Discreet, unscripted photography execution backed by redundant dual-camera crews.',
    },
    {
      step: '03',
      room: 'Spatial Proofing & Curation',
      desc: 'Private digital concierge portal reveal with side-by-side zoom and favorite selection.',
    },
    {
      step: '04',
      room: 'Hand-Bound Heirloom Delivery',
      desc: 'White-glove unboxing of custom leather-bound albums with archival handling gloves.',
    },
  ];

  const collections = [
    {
      title: 'Essential Collection',
      price: 'Bespoke Quote',
      desc: 'Designed for intimate milestone sessions and single-day luxury coverage.',
      features: [
        '6 Hours Unrestricted Coverage',
        'Lead Creative Director + Assistant',
        'High-Resolution Digital Vault Access',
        'Private Spatial Proofing Portal',
        '4-Week Complete Gallery SLA',
      ],
      popular: false,
    },
    {
      title: 'Editorial Collection',
      price: 'Most Requested',
      desc: 'The gold standard for multi-day weddings and international galas.',
      features: [
        '10 Hours Coverage',
        '2 Lead Creative Directors + Cinema Crew',
        '24-to-48 Hour Highlight Teaser Reel',
        '10" Handcrafted Italian Leather Album',
        'Encrypted Lifetime Cloud Vault',
        'Full Commercial & Personal Rights',
      ],
      popular: true,
    },
    {
      title: 'Heirloom Master Collection',
      price: 'Ultimate Legacy',
      desc: 'Complete multi-day royal house and destination estate documentation.',
      features: [
        'Unrestricted Multi-Day Coverage',
        'Master Director + Full Atelier Cinema Team',
        '14" Master Leather Heirloom Album',
        '2 Parent Replica Handcrafted Albums',
        'Bespoke Orchestral Soundtrack Scoring',
        'White-Glove In-Person Delivery Ceremony',
      ],
      popular: false,
    },
  ];

  const testimonials = [
    {
      quote:
        'PhotoMagic captured our Udaipur palace wedding with breathtaking artistic grace. The digital album co-design experience was pure perfection.',
      client: 'Eleanor Vance & Julian Montgomery',
      event: 'Royal Palace Wedding • City Palace, Udaipur',
    },
    {
      quote:
        'The tonal richness and editorial precision of their work is unmatched. They preserved our family legacy with incredible sophistication.',
      client: 'Lady Sarah Sterling',
      event: 'Private Estate Gala • Beverly Hills',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#F6F3EE] flex flex-col selection:bg-amber-500 selection:text-black relative">
      <StructuredData />
      <Navbar />

      {/* SCENE ONE: BREATHTAKING CINEMATIC HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
        {/* Full-Screen Photography Hero Canvas */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=90"
            alt="Royal Palace Wedding Photography"
            className="w-full h-full object-cover object-center hover-scale-slow brightness-90 opacity-60"
          />
          <div className="absolute inset-0 vignette-hero" />
        </div>

        <Container className="relative z-10 text-center flex flex-col items-center max-w-5xl px-6">
          {/* Atelier Badge */}
          <div className="mb-6 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/30 text-amber-300 font-mono text-[10px] uppercase tracking-[0.25em]">
            <Sparkles size={13} className="text-amber-400" />
            <span>International Fine Art Atelier • Udaipur • Paris • Beverly Hills</span>
          </div>

          {/* Large Hero Headline */}
          <h1 className="font-hero text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-[0.03em] leading-[1.05] text-white mb-6">
            DOCUMENTING{' '}
            <span className="text-gold-gradient italic font-normal font-heading">LEGACY</span>
            <br />
            ACROSS GENERATIONS
          </h1>

          <p className="text-base sm:text-xl text-gray-200 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Fine art editorial photography, 8K cinema, and private portraiture for royal houses,
            luxury estates, and international celebrations.
          </p>

          {/* Single Primary Call to Action */}
          <Link href={ROUTES.PUBLIC.BOOKING}>
            <Button
              variant="primary"
              size="lg"
              className="font-nav text-xs font-bold uppercase tracking-[0.25em] bg-gradient-to-r from-amber-500 via-[#F8F3E6] to-amber-400 text-black border border-amber-300/40 shadow-[0_0_35px_rgba(212,175,55,0.35)] hover:shadow-[0_0_50px_rgba(212,175,55,0.55)] transition-all duration-500 py-5 px-9"
            >
              Request Private Concierge Consultation
            </Button>
          </Link>
        </Container>
      </section>

      {/* SCENE TWO: FULL-BLEED EDITORIAL PORTFOLIO (70% PHOTOGRAPHY FOCUS) */}
      <section className="py-32 relative bg-[#0D0D10] border-t border-amber-500/20">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="font-nav text-[10px] text-amber-400 uppercase tracking-[0.25em] block mb-2">
                01 / CURATED EXHIBITION
              </span>
              <h2 className="font-heading text-4xl sm:text-6xl font-semibold text-white">
                Masterpiece Portfolio Archives
              </h2>
            </div>
            <Link href={ROUTES.PUBLIC.PORTFOLIO}>
              <Button
                variant="ghost"
                size="sm"
                className="font-nav text-xs text-amber-400 hover:text-white flex items-center gap-2"
              >
                <span>View Full Archive</span>
                <ArrowUpRight size={14} />
              </Button>
            </Link>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-3 mb-12 font-nav text-xs">
            {(['all', 'weddings', 'portraits', 'events'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full uppercase tracking-[0.2em] transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-black font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                    : 'bg-white/5 text-gray-300 hover:text-white border border-white/10'
                }`}
              >
                {tab === 'all' ? 'All Exhibition Stories' : tab}
              </button>
            ))}
          </div>

          {/* Large Editorial Image Spreads */}
          <Grid cols={2} className="gap-10">
            {filteredStories.map((story) => (
              <Card
                key={story.id}
                variant="glass"
                className="p-0 group overflow-hidden luxury-glass luxury-glass-hover rounded-2xl relative border-amber-500/20"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 vignette-card opacity-90" />

                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 font-mono text-[10px] text-amber-300">
                    {story.frames}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-1.5">
                    <span className="font-nav text-[9px] uppercase text-amber-400 tracking-[0.25em]">
                      {story.categoryLabel}
                    </span>
                    <h3 className="font-heading text-3xl font-bold text-white group-hover:text-amber-300 transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-xs text-gray-300 font-light">{story.subtitle}</p>
                  </div>
                </div>
              </Card>
            ))}
          </Grid>
        </Container>
      </section>

      {/* SCENE THREE: THE STUDIO ETHOS & CRAFT */}
      <section className="py-32 relative border-t border-amber-500/20 bg-[#0A0A0C]">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <span className="font-nav text-[10px] text-amber-400 uppercase tracking-[0.25em] block">
              02 / OUR CRAFT & PHILOSOPHY
            </span>

            <h2 className="font-heading text-4xl sm:text-6xl font-light text-white leading-tight">
              "We do not capture poses. We preserve the quiet pause before the bow, the tear before
              the smile, the unscripted legacy that outlives us all."
            </h2>

            <p className="text-base text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
              PhotoMagic Studio exists at the intersection of fine art editorial discipline and raw
              human authenticity. We strip away the unnecessary to let truth and beauty breathe.
            </p>
          </div>
        </Container>
      </section>

      {/* SCENE FOUR: THE CONCIERGE PATHWAY (THE 4-STEP JOURNEY) */}
      <section className="py-32 relative border-t border-amber-500/20 bg-[#0D0D10]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="font-nav text-[10px] text-amber-400 uppercase tracking-[0.25em] block mb-2">
              03 / CONCIERGE EXPERIENCE
            </span>
            <h2 className="font-heading text-4xl sm:text-6xl font-semibold text-white">
              The Four-Stage Atelier Journey
            </h2>
          </div>

          <Grid cols={4} className="gap-6">
            {processRooms.map((p, idx) => (
              <Card
                key={idx}
                variant="glass"
                className="p-8 luxury-glass luxury-glass-hover rounded-2xl flex flex-col justify-between gap-8 group border-amber-500/20"
              >
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="font-hero text-2xl font-bold text-gold-gradient">{p.step}</span>
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {p.room}
                  </h3>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">{p.desc}</p>
                </div>
              </Card>
            ))}
          </Grid>
        </Container>
      </section>

      {/* SCENE FIVE: ATELIER COLLECTIONS & HEIRLOOM CRAFT */}
      <section className="py-32 relative border-t border-amber-500/20 bg-[#0A0A0C]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="font-nav text-[10px] text-amber-400 uppercase tracking-[0.25em] block mb-2">
              04 / BESPOKE INVESTMENT
            </span>
            <h2 className="font-heading text-4xl sm:text-6xl font-semibold text-white">
              Curated Atelier Collections
            </h2>
          </div>

          <Grid cols={3} className="gap-8">
            {collections.map((col, idx) => (
              <Card
                key={idx}
                variant="glass"
                className={`p-8 rounded-2xl flex flex-col justify-between gap-8 transition-all duration-500 relative border-amber-500/20 ${
                  col.popular
                    ? 'luxury-glass bg-[#121216] border-amber-500/50 scale-105 z-20 shadow-[0_0_40px_rgba(212,175,55,0.15)]'
                    : 'luxury-glass luxury-glass-hover'
                }`}
              >
                {col.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 font-nav text-[9px] font-bold text-black uppercase tracking-[0.2em] shadow-lg">
                    Most Requested Collection
                  </div>
                )}

                <div>
                  <h3 className="font-heading text-3xl font-bold text-white mb-2">{col.title}</h3>
                  <div className="font-mono text-xs font-bold text-amber-400 mb-4">{col.price}</div>
                  <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
                    {col.desc}
                  </p>

                  <div className="space-y-3.5 text-xs border-t border-white/10 pt-6">
                    {col.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-3 text-gray-300 font-light">
                        <CheckCircle2 size={14} className="text-amber-400 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link href={ROUTES.PUBLIC.BOOKING}>
                  <Button
                    variant={col.popular ? 'primary' : 'secondary'}
                    className={`w-full font-nav text-xs font-bold uppercase tracking-[0.2em] py-4 ${
                      col.popular
                        ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                        : 'luxury-glass text-white'
                    }`}
                  >
                    Request Collection Scope
                  </Button>
                </Link>
              </Card>
            ))}
          </Grid>
        </Container>
      </section>

      {/* SCENE SIX: PATRONS OF DISTINCTION (AUTHENTIC TESTIMONIALS) */}
      <section className="py-32 relative border-t border-amber-500/20 bg-[#0D0D10]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="font-nav text-[10px] text-amber-400 uppercase tracking-[0.25em] block mb-2">
              05 / LEGACY RECOGNITION
            </span>
            <h2 className="font-heading text-4xl sm:text-6xl font-semibold text-white">
              Patrons of Distinction
            </h2>
          </div>

          <Grid cols={2} className="gap-8">
            {testimonials.map((t, idx) => (
              <Card
                key={idx}
                variant="glass"
                className="p-8 luxury-glass luxury-glass-hover rounded-2xl flex flex-col justify-between gap-6 border-amber-500/20"
              >
                <p className="font-heading text-xl italic text-gray-200 leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="border-t border-white/10 pt-4">
                  <h4 className="font-mono font-bold text-xs text-amber-400">{t.client}</h4>
                  <span className="text-xs text-gray-400 font-mono">{t.event}</span>
                </div>
              </Card>
            ))}
          </Grid>
        </Container>
      </section>

      {/* SCENE SEVEN: PRIVATE CONSULTATION BOOKING */}
      <section className="py-32 relative border-t border-amber-500/20 bg-[#0A0A0C]">
        <Container className="max-w-3xl">
          <div className="text-center mb-16">
            <span className="font-nav text-[10px] text-amber-400 uppercase tracking-[0.25em] block mb-2">
              06 / PRIVATE CONCIERGE
            </span>
            <h2 className="font-heading text-4xl sm:text-6xl font-semibold text-white mb-4">
              Commence Your Legacy Commission
            </h2>
            <p className="text-xs font-mono text-gray-400 max-w-xl mx-auto">
              Inquire regarding availability for royal wedding commissions, private studio ateliers,
              or international editorial assignments.
            </p>
          </div>

          <Card
            variant="glass"
            className="p-8 sm:p-12 luxury-glass rounded-3xl border-amber-500/30"
          >
            <InquiryForm />
          </Card>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
